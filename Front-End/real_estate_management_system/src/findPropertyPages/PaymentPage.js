import React, { useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
  const location = useLocation();
  // Ensure default values to prevent errors if state is undefined during direct navigation
  const { bookingId, totalPrice } = location.state || { bookingId: 'N/A', totalPrice: 0 };

  // State to manage the currently selected payment mode (for UI tabs)
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('UPI');
  // State to manage the loading status during payment processing
  const [loading, setLoading] = useState(false);

  // States for mock payment input data (not sent to backend in this mock scenario)
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  // State for custom success/error message modal
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Function to show the custom message modal
  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    // Auto-hide message after a few seconds
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 4000);
  };

  const navigate = useNavigate();
  const handlePayment = async () => {
    setLoading(true);
    try {
      const payload = {
        bookingId,
        amount: totalPrice,
        paymentMethod: selectedPaymentMode
      };
  
      const response = await axios.post('http://localhost:8080/api/payments', payload);
  
      // ✅ Show success message
      showMessage('✅ Payment Successful: ' + (response.data.message || 'Transaction Completed.'), 'success');
  
      // ⏳ Wait 2.5 seconds before redirecting
      setTimeout(() => {
        navigate('/FindDashboard/payment-success', { state: response.data });
      }, 1000); // 1 seconds delay
  
    } catch (err) {
      console.error(err);
      showMessage('Payment Failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };
  

  // Helper function for rendering input fields
  const renderInputField = (label, value, onChange, type = 'text', placeholder = '', maxLength = 50) => (
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555' }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #ddd',
          fontSize: '1rem',
          boxSizing: 'border-box',
          transition: 'border-color 0.2s',
        }}
        onFocus={(e) => e.target.style.borderColor = '#007bff'}
        onBlur={(e) => e.target.style.borderColor = '#ddd'}
      />
    </div>
  );

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #f0f2f5, #e0e4eb)',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      marginTop: '60px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '600px', // Adjusted max-width for better form layout
        padding: '30px',
        borderRadius: '16px',
        backgroundColor: '#ffffff',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        textAlign: 'left',
        color: '#333',
        border: '1px solid #e0e0e0',
        boxSizing: 'border-box',
      }}>
        {/* Header */}
        <h2 style={{
          textAlign: 'center',
          marginBottom: '30px',
          color: '#2c3e50',
          fontSize: '2.2rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
        }}>
          <img src="https://img.icons8.com/ios-filled/50/2c3e50/cash-app.png" alt="Payment Icon" style={{ width: '35px', height: '35px' }} />
          Secure Payment
        </h2>

        {/* Booking and Amount Summary */}
        <div style={{
          backgroundColor: '#e8f5e9', // Light green for summary
          padding: '18px 25px',
          borderRadius: '12px',
          marginBottom: '30px',
          border: '1px solid #c8e6c9',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap', // Allow wrapping on small screens
          gap: '10px'
        }}>
          <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600', color: '#333' }}>
            Booking ID: <span style={{ fontWeight: '700', color: '#1a73e8' }}>{bookingId}</span>
          </p>
          <p style={{ margin: 0, fontSize: '1.4rem', fontWeight: '800', color: '#28a745' }}>
            Amount: ₹{totalPrice.toLocaleString()}
          </p>
        </div>

        {/* Payment Mode Selection Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: '25px',
          borderBottom: '2px solid #e0e0e0',
          paddingBottom: '10px',
        }}>
          <button
            onClick={() => setSelectedPaymentMode('UPI')}
            style={{
              padding: '12px 20px',
              border: 'none',
              borderRadius: '8px 8px 0 0',
              backgroundColor: selectedPaymentMode === 'UPI' ? '#007bff' : '#f0f0f0',
              color: selectedPaymentMode === 'UPI' ? 'white' : '#555',
              fontWeight: '600',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s, color 0.3s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flex: 1, // Make buttons take equal width
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => { if (selectedPaymentMode !== 'UPI') e.currentTarget.style.backgroundColor = '#e0e0e0'; }}
            onMouseLeave={(e) => { if (selectedPaymentMode !== 'UPI') e.currentTarget.style.backgroundColor = '#f0f0f0'; }}
          >
            <img src="https://img.icons8.com/?size=100&id=112309&format=png&color=#f0f0f0" alt="UPI Icon" style={{ width: '50px', height: '5', filter: selectedPaymentMode === 'UPI' ? 'brightness(0) invert(1)' : 'none' }} />
            UPI
          </button>
          <button
            onClick={() => setSelectedPaymentMode('CARD')}
            style={{
              padding: '12px 20px',
              border: 'none',
              borderRadius: '8px 8px 0 0',
              backgroundColor: selectedPaymentMode === 'CARD' ? '#007bff' : '#f0f0f0',
              color: selectedPaymentMode === 'CARD' ? 'white' : '#555',
              fontWeight: '600',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s, color 0.3s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flex: 1,
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => { if (selectedPaymentMode !== 'CARD') e.currentTarget.style.backgroundColor = '#e0e0e0'; }}
            onMouseLeave={(e) => { if (selectedPaymentMode !== 'CARD') e.currentTarget.style.backgroundColor = '#f0f0f0'; }}
          >
            <img src={selectedPaymentMode === 'CARD' ? "https://img.icons8.com/?size=100&id=22187&format=png&color=FFFFFF" : "https://img.icons8.com/?size=100&id=22187&format=png&color=000000"}alt="Card Icon" style={{ width: '50px', height: '50px' }}/>
            Card
          </button>
          <button
            onClick={() => setSelectedPaymentMode('NET_BANKING')}
            style={{
              padding: '12px 20px',
              border: 'none',
              borderRadius: '8px 8px 0 0',
              backgroundColor: selectedPaymentMode === 'NET_BANKING' ? '#007bff' : '#f0f0f0',
              color: selectedPaymentMode === 'NET_BANKING' ? 'white' : '#555',
              fontWeight: '600',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s, color 0.3s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flex: 1,
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => { if (selectedPaymentMode !== 'NET_BANKING') e.currentTarget.style.backgroundColor = '#e0e0e0'; }}
            onMouseLeave={(e) => { if (selectedPaymentMode !== 'NET_BANKING') e.currentTarget.style.backgroundColor = '#f0f0f0'; }}
          >
            <img src="https://img.icons8.com/?size=100&id=32187&format=png&color=#555" alt="Net Banking Icon" style={{ width: '40px', height: '40', filter: selectedPaymentMode === 'NET_BANKING' ? 'brightness(0) invert(1)' : 'none' }} />
            Net Banking
          </button>
        </div>

        {/* Payment Form Sections (Conditional Rendering) */}
        <div style={{ padding: '0 10px 20px 10px' }}>
          {selectedPaymentMode === 'UPI' && (
            <div>
              <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#777', marginBottom: '20px' }}>
                Enter your UPI ID or use the QR code.
              </p>
              {renderInputField('UPI ID', upiId, (e) => setUpiId(e.target.value), 'text', 'e.g., yourname@bankname')}
              <button
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  backgroundColor: '#28a745', // Green for QR
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#218838'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
              >
                <img src="https://img.icons8.com/ios-filled/50/ffffff/qr-code--v1.png" alt="QR Icon" style={{ width: '20px', height: '20px' }} />
                Generate QR Code (Mock)
              </button>
            </div>
          )}

          {selectedPaymentMode === 'CARD' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" style={{ height: '30px' }} />
                <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" style={{ height: '30px' }} />
                {/* Add more card logos as needed */}
              </div>
              {renderInputField('Card Number', cardNumber, (e) => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim()), 'text', 'XXXX XXXX XXXX XXXX', 19)}
              <div style={{ display: 'flex', gap: '15px' }}>
                {renderInputField('Expiry Month (MM)', expiryMonth, (e) => setExpiryMonth(e.target.value.replace(/\D/g, '').slice(0, 2)), 'text', 'MM', 2)}
                {renderInputField('Expiry Year (YY)', expiryYear, (e) => setExpiryYear(e.target.value.replace(/\D/g, '').slice(0, 2)), 'text', 'YY', 2)}
                {renderInputField('CVV', cvv, (e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4)), 'password', 'XXX', 4)}
              </div>
              {renderInputField('Cardholder Name', cardHolderName, (e) => setCardHolderName(e.target.value))}
            </div>
          )}

          {selectedPaymentMode === 'NET_BANKING' && (
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555' }}>Select Your Bank:</label>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                  backgroundColor: 'white',
                  boxSizing: 'border-box',
                  marginBottom: '15px',
                  appearance: 'none', // Remove default arrow
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  backgroundSize: '16px',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              >
                <option value="">-- Select Bank --</option>
                <option value="SBI">State Bank of India</option>
                <option value="HDFC">HDFC Bank</option>
                <option value="ICICI">ICICI Bank</option>
                <option value="AXIS">Axis Bank</option>
                <option value="PNB">Punjab National Bank</option>
                <option value="OTHER">Other Bank</option>
              </select>
              <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#777' }}>
                You will be redirected to your bank's portal for secure payment.
              </p>
            </div>
          )}
        </div>

        {/* Pay Now Button */}
        <button
          onClick={handlePayment}
          disabled={loading}
          style={{
            marginTop: '20px',
            width: '100%',
            backgroundColor: '#007bff', // Primary blue for action
            color: '#fff',
            border: 'none',
            padding: '15px 20px',
            borderRadius: '10px',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 15px rgba(0, 123, 255, 0.25)',
            transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
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
          {loading ? (
            <>
              <img src="https://img.icons8.com/?size=100&id=39323&format=png&color=000000" alt="Loading" style={{ width: '20px', height: '20px', animation: 'spin 1s linear infinite' }} />
              Processing...
            </>
          ) : (
            <>
              <img src="https://img.icons8.com/?size=100&id=x9U4HcNp4Tv2&format=png&color=000000" alt="Pay Icon" style={{ width: '40px', height: '40px' }} />
              Pay Now
            </>
          )}
        </button>

        {/* Custom Message Modal */}
        {message && (
          <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '15px 25px',
            backgroundColor: messageType === 'success' ? '#d4edda' : '#f8d7da',
            color: messageType === 'success' ? '#155724' : '#721c24',
            border: `1px solid ${messageType === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            zIndex: 1000,
            fontSize: '1rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            animation: 'slideIn 0.5s forwards',
          }}>
            {messageType === 'success' ? '✔' : '✖'} {message}
          </div>
        )}

        {/* CSS for animations (spin, slideIn) */}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes slideIn {
              from { transform: translateX(100%); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default PaymentPage;