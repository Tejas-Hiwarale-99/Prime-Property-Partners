import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import UpdateProfile2 from './UpdateProfile-2';
import FindPropertyDashboard from './FindPropertyDashboard';
import FindProtectedRoute from './FindProtectedRoute';
import RentProperties from './RentProperties';
import BuyProperties from './BuyProperties';
import BookingForm from './BookingForm';
import PaymentPage from './PaymentPage';
import PaymentSuccess from './PaymentSuccess';
import MyBookings from './MyBookings';
import TransactionHistory from './TransactionHistory';

const FindDashboard = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/FindDashboard/*" element={<FindProtectedRoute element={<FindPropertyDashboard />} />} >
        <Route
          index
          element={
            // Outer box - NOT CHANGED
            <div className="d-flex justify-content-center" style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }}>
              {/* Inner card - STYLING MODIFIED FOR ATTRACTIVENESS AND COMPACTNESS */}
              <div style={{
                width: '100%',
                maxWidth: '650px', // Reduced max-width for a smaller box
                padding: '40px', // Adjusted padding for the smaller box
                backgroundColor: '#ffffff',
                borderRadius: '20px', // More pronounced rounded corners
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)', // Deeper, softer shadow
                border: '1px solid #e0e0e0',
                textAlign: 'center', // Center all text content
                boxSizing: 'border-box'
              }}>
                <h1 style={{
                  color: '#2c3e50',
                  fontSize: '2.2rem', // Reduced font size for primary heading
                  fontWeight: '800', // Bolder
                  letterSpacing: '0.04em',
                  marginBottom: '20px', // Adjusted margin
                  lineHeight: '1.3'
                }}>
                  Discover Your Dream Property
                </h1>
                <p style={{
                  fontSize: '1.2rem', // Reduced font size for description
                  lineHeight: '1.5',
                  color: '#666', // Softer grey for body text
                  marginBottom: '30px', // Adjusted margin
                }}>
                  Welcome! Start your journey to find the perfect home that suits your lifestyle and budget.
                  Our platform makes it easy to browse, compare, and make informed decisions.
                </p>

                {/* Removed the second descriptive paragraph to keep the box compact */}
                {/* <h4 className="text-center mt-5" style={{ color: '#34495e', fontWeight: '600', fontSize: '1.6rem' }}>
                  Seamless Property Search and Exploration
                </h4> */}
                <p className="text-center text-muted" style={{ fontSize: '1.2rem', lineHeight: '1.7' }}>
                  Whether you're looking to rent or buy, our comprehensive listings and intuitive tools simplify your property search. Explore diverse options, view high-quality images, and connect with sellers and landlords with ease.
                </p>

                <div style={{
                  marginTop: '40px', // Space above buttons
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '25px', // Gap between buttons
                  flexWrap: 'wrap', // Allow buttons to wrap on smaller screens
                }}>
                  <button
                    onClick={() => navigate('/FindDashboard/rental-properties', { state: { type: 'RENT' } })}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#6c5ce7';
                      e.currentTarget.style.transform = 'translateY(-3px)'; // More pronounced lift
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)'; // Deeper shadow on hover
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#8e44ad';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
                    }}
                    style={{
                      backgroundColor: '#8e44ad', // Deep Amethyst
                      color: '#ffffff',
                      border: 'none',
                      padding: '12px 28px', // Slightly smaller padding for compact buttons
                      fontSize: '1.1rem', // Slightly smaller font size
                      fontWeight: '600',
                      borderRadius: '10px', // More rounded buttons
                      cursor: 'pointer',
                      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                      transition: 'all 0.3s ease',
                      letterSpacing: '0.02em',
                      minWidth: '180px' // Ensure buttons have a minimum width
                    }}
                  >
                    Find Rentals
                  </button>

                  <button
                    onClick={() => navigate('/FindDashboard/Buy-properties', { state: { type: 'SELL' } })}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#2ecc71';
                      e.currentTarget.style.transform = 'translateY(-3px)'; // More pronounced lift
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)'; // Deeper shadow on hover
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#27ae60';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
                    }}
                    style={{
                      backgroundColor: '#27ae60', // Emerald Green
                      color: '#ffffff',
                      border: 'none',
                      padding: '12px 28px', // Slightly smaller padding for compact buttons
                      fontSize: '1.1rem', // Slightly smaller font size
                      fontWeight: '600',
                      borderRadius: '10px', // More rounded buttons
                      cursor: 'pointer',
                      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                      transition: 'all 0.3s ease',
                      letterSpacing: '0.02em',
                      minWidth: '180px' // Ensure buttons have a minimum width
                    }}
                  >
                    Buy Property
                  </button>
                </div>
              </div>
            </div>
          }
        />
        <Route path="update-profile-2" element={<FindProtectedRoute element={<UpdateProfile2 />} />} />
        <Route path="rental-properties" element={<FindProtectedRoute element={<RentProperties />} />} />
        <Route path="Buy-properties" element={<FindProtectedRoute element={<BuyProperties />} />} />
        <Route path="booking" element={<FindProtectedRoute element={<BookingForm />} />} 
        />
        <Route path="payment" element={<FindProtectedRoute element={<PaymentPage/>} />} 
        />
        <Route path="payment-success" element={<FindProtectedRoute element={<PaymentSuccess/>} />} 
        />
         <Route path="my-bookings" element={<FindProtectedRoute element={<MyBookings/>} />} 
        />
         <Route path="my-transactions" element={<FindProtectedRoute element={<TransactionHistory/>} />} 
        />
        
      </Route>
    </Routes>
  );
};

export default FindDashboard;