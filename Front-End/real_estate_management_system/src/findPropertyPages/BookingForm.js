import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * BookingForm Component
 *
 * This component allows users to confirm and initiate a booking for a property.
 * It fetches user and property details based on IDs passed via navigation state,
 * calculates the total price including an admin margin, and handles the booking submission
 * to a backend API.
 */
const BookingForm = () => {
  // Hook to access the current location object, which contains state passed during navigation.
  const location = useLocation();
  // Hook to programmatically navigate to different routes.
  const navigate = useNavigate();

  // Extract propertyId and userId from the navigation state. These are expected to be
  // passed from a previous component, likely 'RentProperties'.
  const { propertyId, userId } = location.state;

  // State variables to store user and property data fetched from the API.
  const [user, setUser] = useState({});
  const [property, setProperty] = useState({});
  // State variable to manage the loading state during API calls, preventing multiple submissions.
  const [loading, setLoading] = useState(false);

  // Get the current date in 'YYYY-MM-DD' format for display as the booking date.
  const bookingDate = new Date().toISOString().split('T')[0];

  // Calculate prices based on the property's base price.
  // Default to 0 if property.price is not yet available to prevent NaN.
  const basePrice = property.price || 0;
  // Define the admin margin percentage.
  const adminMarginPercentage = 0.25;
  // Calculate the absolute amount of the admin margin.
  const adminMarginAmount = basePrice * adminMarginPercentage;
  // Calculate the total price, including the base price and admin margin.
  const totalPrice = basePrice + adminMarginAmount;
  
  /**
   * useEffect Hook
   *
   * This hook runs when the component mounts and whenever `propertyId` or `userId` changes.
   * It is responsible for fetching both user and property data concurrently from the backend.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true while fetching data.
        setLoading(true);
        // Use Promise.all to fetch user and property data in parallel for efficiency.
        const [userRes, propertyRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/users/${userId}`), // Fetch user details by userId.
          axios.get(`http://localhost:8080/api/property/${propertyId}`), // Fetch property details by propertyId.
        ]);
        // Update state with the fetched user and property data.
        setUser(userRes.data);
        setProperty(propertyRes.data);
      } catch (error) {
        // Log any errors that occur during data fetching.
        console.error('Error loading booking data:', error);
      } finally {
        // Set loading back to false once fetching is complete (whether successful or not).
        setLoading(false);
      }
    };

    fetchData();
    // Dependency array: re-run the effect if propertyId or userId changes.
  }, [propertyId, userId]);

  /**
   * handleBooking Function
   *
   * This asynchronous function is called when the "Confirm Booking" button is clicked.
   * It constructs a booking payload and sends it to the backend API.
   * On successful booking, it navigates to the payment page.
   */
  const handleBooking = async () => {
    try {
      setLoading(true); // Start loading spinner or disable booking button
  
      // Create the payload for booking
      const payload = {
        userId: user.id,
        propertyId: property.id,

        //totalAmount: Math.floor(totalPrice), // ✅ Send the total amount (rounded if needed)
        // ❌ Do not send totalAmount anymore
      };

      console.log("User ID:", user.id);
      console.log("Property ID:", property.id);

      
      // Send API request to backend to create booking
      const response = await axios.post('http://localhost:8080/api/bookings', payload);
      console.log("🚀 Booking payload:", payload);

      // Fetch booking ID and totalAmount from bookingResponse
      const bookingId = response.data.id;
      const totalAmount = response.data.totalAmount;
  
      // Show preview alert for confirmation (optional UX feedback)
      alert(`Booking confirmed for "${property.title}" by ${user.name} for a total of ₹${totalPrice.toLocaleString()}!`);
  
      // Redirect to payment page with bookingId and totalPrice
      navigate('/FindDashboard/payment', {
        state: {
          bookingId,
          totalPrice: totalAmount
        }
      });
  
    } catch (err) {
    console.error('Booking failed:', err);

    // ✅ Check for custom error message from backend
    if (
      err.response &&
      err.response.data &&
      typeof err.response.data === 'string' &&
      err.response.data.includes('You cannot book your own property')
    ) {
      alert('❌ Booking Failed: You cannot book your own property.');
    } else {
      alert('Something went wrong. Please try again.');
    }
  } finally {
    setLoading(false);
  }
};
  
  // Render the booking confirmation form.
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #f0f2f5, #e0e4eb)',
      padding: '25px',
      marginTop: '50px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '900px', /* Increased maxWidth to accommodate two columns */
        padding: '30px',
        borderRadius: '16px',
        backgroundColor: '#ffffff',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        textAlign: 'left',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#333',
        border: '1px solid #e0e0e0',
        boxSizing: 'border-box',
        display: 'flex', /* Enable flexbox for internal layout */
        flexDirection: 'column', /* Arrange content vertically by default */
        gap: '10px' /* Space between sections */
      }}>
        {/* Booking form title */}
        <h3 style={{
          textAlign: 'center',
          marginBottom: '5px',
          color: '#2c3e50',
          fontSize: '1.8rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
        }}>
          <img src="https://img.icons8.com/ios-filled/50/2c3e50/document.png" alt="Booking Icon" style={{ width: '30px', height: '30px' }} />
          Confirm Your Booking
        </h3>

        {/* Container for user and property details, arranged horizontally */}
        <div style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          justifyContent: 'space-between'
        }}>
          {/* User Details Section */}
          <div style={{
            flex: '1',
            minWidth: '300px',
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            border: '1px solid #e9ecef'
          }}>
            <h4 style={{ marginBottom: '10px', color: '#555', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src="https://img.icons8.com/ios-filled/50/555555/user-male-circle.png" alt="User Icon" style={{ width: '20px', height: '20px' }} />
              Your Details
            </h4>
            <p style={{ margin: '8px 0', fontSize: '1.05rem', color: '#444' }}>
              <strong>Name:-</strong> {user.name}
            </p>
            <p style={{ margin: '8px 0', fontSize: '1.05rem', color: '#444' }}>
              <strong>Email:-</strong> {user.email}
            </p>
            <p style={{ margin: '8px 0', fontSize: '1.05rem', color: '#444' }}>
              <strong>Phone:-</strong> {user.phone}
            </p>
          </div>

          {/* Property Details Section */}
          <div style={{
            flex: '1',
            minWidth: '300px',
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            border: '1px solid #e9ecef'
          }}>
            <h4 style={{ marginBottom: '10px', color: '#555', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src="https://img.icons8.com/ios-filled/50/555555/home.png" alt="Property Icon" style={{ width: '20px', height: '20px' }} />
              Property Details
            </h4>
            <p style={{ margin: '8px 0', fontSize: '1.05rem', color: '#444' }}>
              <strong>Title:-</strong> {property.description}
            </p>
            <p style={{ margin: '8px 0', fontSize: '1.05rem', color: '#444' }}>
              <strong>Location:-</strong> {property.address}, {property.city}
            </p>
            <p style={{ margin: '8px 0', fontSize: '1.05rem', color: '#444' }}>
              <strong>Base Price:-</strong> <span style={{ fontWeight: 'bold', color: '#28a745' }}>₹{basePrice.toLocaleString()}</span>
            </p>
            <p style={{ margin: '8px 0', fontSize: '1.05rem', color: '#444' }}>
              <strong>Admin Margin (25%):-</strong> <span style={{ fontWeight: 'bold', color: '#dc3545' }}>+ ₹{adminMarginAmount.toLocaleString()}</span>
            </p>
          </div>
        </div>

        {/* Booking Information Section */}
        <div style={{
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '10px',
          border: '1px solid #e9ecef',
          width: '100%'
        }}>
          <h4 style={{ marginBottom: '10px', color: '#555', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="https://img.icons8.com/ios-filled/50/555555/calendar.png" alt="Date Icon" style={{ width: '20px', height: '20px' }} />
            Booking Information
          </h4>
          <p style={{ margin: '8px 0', fontSize: '1.05rem', color: '#444', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <strong>Booking Date:</strong>
            <input
              type="text"
              value={bookingDate}
              readOnly // Make the input read-only as it's pre-filled.
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #ced4da',
                fontSize: '1rem',
                backgroundColor: '#e9ecef',
                color: '#495057',
                width: 'calc(60% - 20px)',
                textAlign: 'right'
              }}
            />
          </p>
          <p style={{ margin: '8px 0', fontSize: '1.05rem', color: '#444', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <strong>Status:</strong>
            <input
              type="text"
              value="PENDING" // Always displays "PENDING" for new bookings.
              readOnly
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #ced4da',
                fontSize: '1rem',
                backgroundColor: '#ffeeba',
                color: '#856404',
                fontWeight: 'bold',
                width: 'calc(60% - 20px)',
                textAlign: 'right'
              }}
            />
          </p>
          {/* Total Payable Amount */}
          <p style={{ margin: '15px 0 0', fontSize: '1.3rem', color: '#2c3e50', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #dee2e6', paddingTop: '10px' }}>
            <span>Total Payable:</span>
            <span style={{ color: '#007bff' }}>₹{totalPrice.toLocaleString()}</span>
          </p>
        </div>

        {/* Confirm Booking Button */}
        <button
          onClick={handleBooking} // Calls the handleBooking function on click.
          disabled={loading} // Disables the button while an API call is in progress.
          style={{
            marginTop: '0px',
            width: '100%',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            padding: '15px 20px',
            borderRadius: '10px',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            cursor: loading ? 'not-allowed' : 'pointer', // Change cursor based on loading state.
            boxShadow: '0 4px 15px rgba(0, 123, 255, 0.25)',
            transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
          // Hover effects for the button.
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.backgroundColor = '#0056b3';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 123, 255, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.currentTarget.style.backgroundColor = '#007bff';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 123, 255, 0.25)';
            }
          }}
        >
          {/* Conditional rendering for button content based on loading state */}
          {loading ? (
            <>
              {/* Loading spinner and text when loading */}
              <img src="https://img.icons8.com/material-outlined/24/ffffff/spinner-circle.png" alt="Loading" style={{ width: '20px', height: '20px', animation: 'spin 1s linear infinite' }} />
              Processing...
            </>
          ) : (
            <>
              {/* Confirm icon and text when not loading */}
              <img src="https://img.icons8.com/ios-filled/50/ffffff/checked--v1.png" alt="Confirm" style={{ width: '20px', height: '20px' }} />
              Confirm Booking
            </>
          )}
        </button>

        {/* CSS for the spin animation */}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default BookingForm;