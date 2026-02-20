// 📁 src/components/RentProperties.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';


const RentProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalImage, setModalImage] = useState(null);
  const location = useLocation();
  const propertyType = location.state?.type || 'RENT';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/property/type-with-owner/${propertyType}`,
          { withCredentials: true }
        );
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [propertyType]);

  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl);
  };

  const closeModal = () => {
    setModalImage(null);
  };

   // ✅ Updated: Pass userId + propertyId
   const handleBookNow = (propertyId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not logged in. Please log in to proceed.");
      return;
    }

    navigate("/FindDashboard/booking", {
      state: {
        userId,
        propertyId,
      },
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }}>
      <div
        style={{
          width: '100%',
          maxWidth: '1000px',
          padding: '30px',
          backgroundColor: '#f9f9f9',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          boxSizing: 'content-box',
        }}
      >
        <h2
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '50px',
            fontWeight: 700,
            fontSize: '2.2rem',
            color: '#222',
            letterSpacing: '0.5px',
            boxSizing: 'content-box',
          }}
        >
          <img
            src="https://img.icons8.com/?size=100&id=46774&format=png&color=000000"
            alt="Start Icon"
            style={{ width: '35px', height: '35px' }}
          />
          Available {propertyType === 'RENT' ? 'Rental' : 'Buy'} Properties
          <img
            src="https://img.icons8.com/?size=100&id=46774&format=png&color=000000"
            alt="End Icon"
            style={{ width: '35px', height: '35px' }}
          />
        </h2>

        {loading ? (
          <div style={{ textAlign: 'center', fontWeight: 600 }}>Loading properties...</div>
        ) : properties.length === 0 ? (
          <div style={{ textAlign: 'center', fontWeight: 600, color: '#666' }}>
            No properties found.
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            {properties.map((property) => (
              <div
                key={property.id}
                style={{
                  width: '300px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#fff',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: 'pointer',
                  boxSizing: 'content-box',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.03)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.12)';
                }}
              >
                <img
                  src={`http://localhost:8080/api/property/image/${property.id}`}
                  alt="Property"
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  onClick={() =>
                    handleImageClick(`http://localhost:8080/api/property/image/${property.id}`)
                  }
                />
                <div style={{ padding: '16px', boxSizing: 'content-box' }}>
                  <h5
                    style={{
                      margin: '0 0 10px',
                      fontSize: '19px',
                      fontWeight: 800,
                      color: '#2c3e50',
                      letterSpacing: '0.3px',
                    }}
                  >
                    {property.title}
                  </h5>

                  <p style={{ margin: 0, color: '#8e44ad', fontWeight: 700, fontSize: '15px' }}>
                    Property Type:- <span style={{ fontWeight: 800 }}>{property.type}</span>
                  </p>

                  <p
                    style={{
                      fontSize: '14px',
                      marginTop: '8px',
                      color: '#444',
                      fontWeight: 600,
                      lineHeight: '1.5',
                    }}
                  >
                    <strong>Address:</strong> {property.address}, {property.city}, {property.state} - {property.pincode}
                  </p>

                  <p
                    style={{
                      fontSize: '13.5px',
                      color: '#616161',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      marginBottom: '10px',
                      fontWeight: 600,
                    }}
                  >
                    <strong>Description:</strong> {property.description}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '10px',
                    }}
                  >
                    <span style={{ fontSize: '19px', fontWeight: 700, color: '#2e7d32' }}>
                      ₹{property.price.toLocaleString()}
                    </span>
                    <span
                      style={{
                        padding: '5px 10px',
                        backgroundColor:
                          property.status === 'PENDING'
                            ? '#fbc02d'
                            : property.status === 'APPROVED'
                              ? '#4caf50'
                              : '#f44336',
                        color: '#000000',
                        borderRadius: '5px',
                        fontSize: '12px',
                        fontWeight: 700,
                      }}
                    >
                      {property.status}
                    </span>
                  </div>

                  <div style={{ marginTop: '8px', fontSize: '12px', color: '#757575', fontWeight: 600 }}>
                    Posted on:{' '}
                    {property.postedAt
                      ? new Date(property.postedAt).toLocaleDateString()
                      : 'N/A'}
                  </div>

                  {/* ATTRACTIVE OWNER INFO SECTION */}
                  {property.user && (
                    <div
                      style={{
                        marginTop: '15px',
                        padding: '12px 15px',
                        backgroundColor: '#e3f2fd', // Light blue background
                        borderRadius: '8px',
                        border: '1px solid #90caf9', // Slightly darker blue border
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      }}
                    >
                      <h6 style={{ margin: '0 0 10px', fontSize: '16px', color: '#1565c0', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                        <img src="https://img.icons8.com/material-rounded/24/1565c0/user--v1.png" alt="Owner Icon" style={{ width: '18px', height: '18px' }} />
                        Owner Details :-
                      </h6>
                      <p style={{ margin: '5px 0', fontSize: '14px', color: '#1e88e5', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <img src="https://img.icons8.com/material-sharp/18/1e88e5/name.png" alt="Name Icon" style={{ width: '14px', height: '14px' }} />
                        <strong>{property.user.name}</strong>
                      </p>
                      <p style={{ margin: '5px 0', fontSize: '14px', color: '#1e88e5', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <img src="https://img.icons8.com/material-sharp/18/1e88e5/phone--v1.png" alt="Phone Icon" style={{ width: '14px', height: '14px' }} />
                        <a href={`tel:${property.user.phone}`} style={{ color: '#1e88e5', textDecoration: 'none' }}>
                          {property.user.phone}
                        </a>
                      </p>
                      <p style={{ margin: '5px 0 10px', fontSize: '14px', color: '#1e88e5', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <img src="https://img.icons8.com/material-sharp/18/1e88e5/new-post.png" alt="Email Icon" style={{ width: '14px', height: '14px' }} />
                        <a href={`mailto:${property.user.email}`} style={{ color: '#1e88e5', textDecoration: 'none' }}>
                          {property.user.email}
                        </a>
                      </p>
                    </div>
                  )}

                  {/* 👇 NEW: BOOK NOW BUTTON */}
                  <button
                    onClick={() => handleBookNow(property.id)}
                    style={{
                      marginTop: '15px', // Space above the button
                      width: '100%',    // Full width
                      background: '#4CAF50', // Green button
                      color: 'white',
                      border: 'none',
                      padding: '12px 20px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center', // Center content
                      gap: '8px',
                      transition: 'background 0.3s ease, transform 0.2s',
                      boxShadow: '0 4px 10px rgba(0, 128, 0, 0.2)', // Subtle shadow
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#45a049'; // Darker green on hover
                      e.currentTarget.style.transform = 'translateY(-2px)'; // Slight lift
                      e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 128, 0, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#4CAF50';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 128, 0, 0.2)';
                    }}
                  >
                    <img src="https://img.icons8.com/material-outlined/24/ffffff/calendar--v1.png" alt="Book Icon" style={{ width: '20px', height: '20px' }} />
                    Book Now
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modalImage && (
        <div
          onClick={closeModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.85)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'zoom-out',
          }}
        >
          <img
            src={modalImage}
            alt="Zoomed"
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              borderRadius: '10px',
              boxShadow: '0 0 25px rgba(255,255,255,0.3)',
              transform: 'scale(1.03)',
              transition: 'transform 0.2s',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default RentProperties;