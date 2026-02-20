import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalImage, setModalImage] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/admin/user/${userId}`,
          { withCredentials: true }
        );
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProperties();
    } else {
      setLoading(false);
    }
  }, [userId]);

  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const updateStatus = async (propertyId, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:8080/api/admin/property/${propertyId}/status?status=${newStatus}`,
        {},
        { withCredentials: true }
      );
      setProperties((prev) =>
        prev.map((p) => (p.id === propertyId ? { ...p, status: newStatus } : p))
      );
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status.');
    }
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
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '50px',
            fontWeight: 700,
            fontSize: '2.2rem',
            color: '#222',
          }}
        >
          <img
            src="https://img.icons8.com/?size=100&id=46774&format=png&color=000000"
            alt="Icon"
            style={{ width: '35px', height: '35px', marginRight: '10px' }}
          />
          My Properties
          <img
            src="https://img.icons8.com/?size=100&id=46774&format=png&color=000000"
            alt="Icon"
            style={{ width: '35px', height: '35px', marginLeft: '10px' }}
          />
        </h2>

        {loading ? (
          <div style={{ textAlign: 'center', fontWeight: 600 }}>Loading properties...</div>
        ) : properties.length === 0 ? (
          <div style={{ textAlign: 'center', fontWeight: 600, color: '#666' }}>
            No properties found for this user...
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
                  src={`http://localhost:8080/api/admin/image/${property.id}`}
                  alt="Property"
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  onClick={() =>
                    handleImageClick(`http://localhost:8080/api/admin/image/${property.id}`)
                  }
                />
                <div style={{ padding: '16px' }}>
                  <h5 style={{ fontSize: '19px', fontWeight: 800, color: '#2c3e50' }}>
                    {property.title}
                  </h5>

                  <p style={{ margin: 0, color: '#8e44ad', fontWeight: 700, fontSize: '15px' }}>
                    Property Type: <span>{property.type}</span>
                  </p>

                  <p style={{ fontSize: '14px', marginTop: '8px', color: '#444', fontWeight: 600 }}>
                    <strong>Address:</strong> {property.address}, {property.city}, {property.state} - {property.pincode}
                  </p>

                  <p
                    style={{
                      fontSize: '13.5px',
                      color: '#616161',
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

                    {property.status === 'PENDING' ? (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => updateStatus(property.id, 'APPROVED')}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#4caf50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#388e3c')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4caf50')}
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => updateStatus(property.id, 'REJECTED')}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#f44336',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d32f2f')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f44336')}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span
                        style={{
                          padding: '5px 10px',
                          backgroundColor:
                            property.status === 'APPROVED' ? '#64dd17' : '#ff1744',
                          color: '#fff',
                          borderRadius: '5px',
                          fontSize: '12px',
                          fontWeight: 700,
                        }}
                      >
                        {property.status}
                      </span>
                    )}
                  </div>
                  <div style={{ marginTop: '8px', fontSize: '12px', color: '#757575', fontWeight: 600 }}>
                    Posted on:{' '}
                    {property.postedAt
                      ? new Date(property.postedAt).toLocaleDateString()
                      : 'N/A'}
                  </div>
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

export default UsersProperties;
