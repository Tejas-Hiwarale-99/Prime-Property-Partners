import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Removed 'bootstrap/dist/css/bootstrap.min.css' as inline styles are used

const PaymentSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Define custom styles to match the PaymentPage component's card size and overall layout
  const customStyles = `
    .payment-success-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(to bottom right, #f0f2f5, #e0e4eb);
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin-top: 60px; /* To align with the PaymentPage's top margin */
    }

    .payment-card, .error-card {
      width: 100%;
      max-width: 700px; /* Increased max-width for a wider card and payment details */
      padding: 30px; /* Matches PaymentPage card padding */
      border-radius: 16px; /* Matches PaymentPage card border-radius */
      background-color: #ffffff; /* Matches PaymentPage card background */
      box-shadow: 0 10px 30px rgba(0,0,0,0.15); /* Matches PaymentPage card shadow */
      text-align: left; /* Matches PaymentPage card text-align */
      color: #333; /* Matches PaymentPage card color */
      border: 1px solid #e0e0e0; /* Matches PaymentPage card border */
      box-sizing: border-box; /* Matches PaymentPage card box-sizing */
      overflow: hidden; /* Keep original overflow property */
    }
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-10px);
      }
      60% {
        transform: translateY(-5px);
      }
    }

    .success-title {
      color: #28a745;
      font-weight: 700;
      font-size: 2.5rem;
      margin-bottom: 30px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .payment-details {
      background: linear-gradient(145deg, #f8f9fa, #e9ecef);
      border-radius: 15px;
      padding: 25px;
      margin: 25px 0;
      border-left: 5px solid #28a745;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #dee2e6;
      transition: all 0.3s ease;
    }

    .detail-row:last-child {
      border-bottom: none;
    }

    .detail-row:hover {
      background-color: rgba(40, 167, 69, 0.1);
      border-radius: 8px;
      margin: 0 -10px;
      padding: 12px 10px;
    }

    .detail-label {
      font-weight: 600;
      color: #495057;
      font-size: 1.1rem;
    }

    .detail-value {
      font-weight: 500;
      color: #212529;
      font-size: 1.1rem;
    }

    .amount-highlight {
      color: #28a745;
      font-weight: 700;
      font-size: 1.3rem;
    }

    .status-badge {
      background: linear-gradient(45deg, #28a745, #20c997);
      color: white;
      padding: 5px 15px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .home-btn {
      background: linear-gradient(45deg, #007bff, #0056b3);
      border: none;
      color: white;
      padding: 15px 40px;
      font-size: 1.1rem;
      font-weight: 600;
      border-radius: 50px;
      box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .home-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(0, 123, 255, 0.4);
      background: linear-gradient(45deg, #0056b3, #004085);
    }

    .home-btn:active {
      transform: translateY(-1px);
    }

    .error-icon {
      font-size: 3rem;
      color: #dc3545;
      margin-bottom: 20px;
    }

    .error-title {
      color: #dc3545;
      font-weight: 600;
      font-size: 1.5rem;
      margin-bottom: 20px;
    }

    @media (max-width: 768px) {
      .success-title {
        font-size: 2rem;
      }
      
      .payment-card, .error-card {
        margin: 10px;
        border-radius: 15px;
        padding: 20px; /* Adjust padding for smaller screens */
      }
      
      .detail-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
      }
      
      .home-btn {
        padding: 12px 30px;
        font-size: 1rem;
      }
    }
  `;

  if (!state) {
    return (
      <>
        <style>{customStyles}</style>
        <div className="payment-success-container">
          <div className="error-card">
            <div className="text-center">
              <div className="error-icon">❌</div>
              <h2 className="error-title">No payment data found</h2>
              <button
                onClick={() => navigate('/')}
                className="home-btn mt-3"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const {
    transactionId,
    bookingId,
    amount,
    paymentMethod,
    paymentStatus,
    transactionDate
  } = state;

  return (
    <>
      <style>{customStyles}</style>
      <div className="payment-success-container">
        <div className="payment-card">
          <div className="p-4 p-md-5"> {/* Using p-4 and p-md-5 for responsive padding */}
            <div className="text-center mb-4">
              <h1 className="success-title">Payment Successful!</h1>
            </div>

            <div className="payment-details">
              <div className="detail-row">
                <span className="detail-label">Transaction ID:</span>
                <span className="detail-value">{transactionId}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Booking ID:</span>
                <span className="detail-value">{bookingId}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Amount Paid:</span>
                <span className="detail-value amount-highlight">₹{amount}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Payment Method:</span>
                <span className="detail-value">{paymentMethod}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className="status-badge">{paymentStatus}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Date:</span>
                <span className="detail-value">
                  {new Date(transactionDate).toLocaleString('en-IN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </span>

              </div>
            </div>

            <div className="text-center mt-4">
              <button
                onClick={() => navigate('/FindDashboard/my-bookings')}
                className="home-btn"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
