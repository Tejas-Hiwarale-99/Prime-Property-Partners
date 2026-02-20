import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';

// 📸 Utility function to convert image URL to base64
const getBase64ImageFromURL = async (imageUrl) => {
  const res = await fetch(imageUrl);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

// Helper function to add wrapped text to PDF
const addWrappedText = (doc, text, x, y, maxWidth, lineHeight = 10) => {
  const lines = doc.splitTextToSize(text, maxWidth);
  for (let i = 0; i < lines.length; i++) {
    doc.text(lines[i], x, y + (i * lineHeight));
  }
  return y + (lines.length * lineHeight); // Return the Y position after the text
};

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userId = localStorage.getItem('userId');

  // 📊 Fetch bookings function
  const fetchBookings = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/bookings/user/${userId}`);
      const sorted = response.data.sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));
      setBookings(sorted);
    } catch (err) {
      console.error(err);
      Swal.fire('Error', '❌ Failed to load bookings.', 'error');
      setError('❌ Failed to load bookings.');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // 📄 Download invoice function with proper text wrapping
  const handleDownloadInvoice = useCallback(async (booking, isAuto = false) => {
    try {
      if (!isAuto) {
        Swal.fire({
          title: 'Generating Invoice...',
          text: 'Please wait while we generate your invoice',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
      }

      const imageUrl = `http://localhost:8080/api/property/image/${booking.propertyId}`;
      const base64Image = await getBase64ImageFromURL(imageUrl);

      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const maxTextWidth = pageWidth - 40; // Leave 20px margin on each side
      let currentY = 20;

      // Enhanced invoice with real-time data
      doc.setFontSize(18);
      doc.text("Real Estate Booking Invoice", 20, currentY);
      currentY += 15;
      
      // Add timestamp
      doc.setFontSize(10);
      doc.text(`Generated: ${new Date().toLocaleString('en-GB')}`, 20, currentY);
      currentY += 20;

      // Add image
      doc.addImage(base64Image, 'JPEG', 20, currentY, 170, 90);
      currentY += 100;

      // Set font size for content
      doc.setFontSize(12);
      const lineHeight = 10;

      // Add booking details with text wrapping
      currentY = addWrappedText(doc, `Booking ID: ${booking.id}`, 20, currentY, maxTextWidth, lineHeight);
      currentY += 5;

      currentY = addWrappedText(doc, `Property Title: ${booking.propertyTitle}`, 20, currentY, maxTextWidth, lineHeight);
      currentY += 5;

      currentY = addWrappedText(doc, `Type: ${booking.propertyType}`, 20, currentY, maxTextWidth, lineHeight);
      currentY += 5;

      currentY = addWrappedText(doc, `Location: ${booking.propertyLocation}`, 20, currentY, maxTextWidth, lineHeight);
      currentY += 5;

      currentY = addWrappedText(doc, `Date: ${new Date(booking.bookingDate).toLocaleDateString('en-GB')}`, 20, currentY, maxTextWidth, lineHeight);
      currentY += 5;

      currentY = addWrappedText(doc, `Status: ${booking.status}`, 20, currentY, maxTextWidth, lineHeight);
      currentY += 5;

      currentY = addWrappedText(doc, `Amount Paid: Rs.${booking.totalAmount}`, 20, currentY, maxTextWidth, lineHeight);
      currentY += 10;
      
      // Add footer text
      doc.setFont("helvetica", "italic");
      currentY = addWrappedText(doc, "Thank you for booking with us!", 20, currentY, maxTextWidth, 8);

      const fileName = `Invoice_${booking.id}_${Date.now()}.pdf`;
      doc.save(fileName);

      if (!isAuto) {
        Swal.fire('Success!', 'Invoice downloaded successfully', 'success');
      }

    } catch (err) {
      console.error("Error generating invoice:", err);
      Swal.fire("Error", "❌ Failed to generate invoice.", "error");
    }
  }, []);

  // 📚 Initial fetch of bookings
  useEffect(() => {
    if (userId) {
      fetchBookings();
    } else {
      setError("User not logged in.");
      setLoading(false);
    }
  }, [userId, fetchBookings]);

  // ❌ Handle booking cancellation
  const handleCancel = async (bookingId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You want to cancel this booking!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!'
    });

    if (!result.isConfirmed) return;

    try {
      await axios.put(`http://localhost:8080/api/bookings/cancel/${bookingId}`);

      Swal.fire('Cancelled!', '✅ Booking cancelled successfully.', 'success');

      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: "CANCELLED" } : b))
      );
    } catch (err) {
      console.error(err);
      Swal.fire('Error!', '❌ Failed to cancel booking.', 'error');
    }
  };

  // 📊 Get booking analytics
  const getBookingStats = () => {
    const confirmed = bookings.filter(b => b.status === 'CONFIRMED').length;
    const cancelled = bookings.filter(b => b.status === 'CANCELLED').length;
    const pending = bookings.filter(b => b.status === 'PENDING').length;
    const total = bookings.length;
    
    return { confirmed, cancelled, pending, total };
  };

  if (loading) return <div style={styles.center}>Loading bookings...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  const stats = getBookingStats();

  return (
    <div style={styles.container}>
      {/* Status Bar */}
      <div style={styles.statusBar}>
        <div style={styles.statusItem}>
          📊 Total: {stats.total} | ✅ Confirmed: {stats.confirmed} | ❌ Cancelled: {stats.cancelled} | ⏳ Pending: {stats.pending}
        </div>
      </div>

      <h2 style={styles.heading}>📦 My Booked Properties</h2>

      {bookings.length === 0 ? (
        <div style={styles.center}>No bookings found.</div>
      ) : (
        bookings.map((booking) => (
          <div key={booking.id} style={styles.card}>
             {/* ✅ Property Image */}
          <img
            src={`http://localhost:8080/api/property/image/${booking.propertyId}`}
            alt="Property"
            style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }}
          />

            <h3 style={styles.title}>{booking.propertyTitle}</h3>
            <p><strong>📄 Booking ID:</strong> {booking.id}</p>
            <p><strong>🏠 Property Type:</strong> {booking.propertyType}</p>
            <p><strong>📍 Location:</strong> {booking.propertyLocation}</p>
            <p><strong>📅 Date:</strong> {new Date(booking.bookingDate).toLocaleString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })}</p>
            <p><strong>Status:</strong> 
              <span style={{
                ...styles.statusBadge,
                backgroundColor: booking.status === 'CONFIRMED' ? '#28a745' : 
                                booking.status === 'CANCELLED' ? '#dc3545' : '#ffc107'
              }}>
                {booking.status}
              </span>
            </p>
            <p><strong>💰 Amount:</strong> ₹{booking.totalAmount}</p>

            <div style={styles.buttonGroup}>
              {booking.status !== "CANCELLED" && (
                <button onClick={() => handleCancel(booking.id)} style={styles.cancelButton}>
                  Cancel Booking
                </button>
              )}
              <button onClick={() => handleDownloadInvoice(booking)} style={styles.invoiceButton}>
                📄 Download Invoice
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: "'Segoe UI', sans-serif"
  },
  statusBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: '10px 15px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px',
    marginTop: '60px'
  },
  statusItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '2rem',
    color: '#333',
    
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
  },
  image: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '15px'
  },
  title: {
    marginBottom: '10px',
    color: '#007bff'
  },
  statusBadge: {
    marginLeft: '10px',
    padding: '4px 8px',
    borderRadius: '12px',
    color: 'white',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  center: {
    textAlign: 'center',
    padding: '50px',
    color: '#777',
    marginTop: '60px'
  },
  error: {
    textAlign: 'center',
    padding: '50px',
    color: 'red'
  },
  buttonGroup: {
    marginTop: '15px',
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap'
  },
  cancelButton: {
    padding: '10px 15px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  invoiceButton: {
    padding: '10px 15px',
    backgroundColor: '#17a2b8',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default MyBookings;