import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredButtonId, setHoveredButtonId] = useState(null); // To track hover

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString();
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/allUsers');
        setUsers(response.data);
      } catch (err) {
        setError(`Failed to fetch users: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Inside UsersTable component
  const navigate = useNavigate();

  // Replace handleAddProperties with this:
  const handleAddProperties = (userId) => {
    localStorage.setItem('userId', userId); // ✅ Store selected userId
    navigate('/admin/dashboard/userProperties'); // ✅ Go to userProperties page without param
  };
  
  
  return (
    <div className="container" style={{ marginTop: '90px' }}>
      <h2 className="mb-4 text-center fw-bold" style={{ fontFamily: 'Poppins, sans-serif', color: '#002B5B' }}>
        📋 All Users Table
      </h2>

      {error && (
        <div className="text-center my-4 fw-bold text-danger" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {error}
        </div>
      )}

      <div className="table-responsive shadow rounded" style={{ backgroundColor: '#ffffff' }}>
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center fw-bold py-4" style={{ fontFamily: 'Poppins, sans-serif', color: '#002B5B' }}>
                  Loading Users...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center fw-bold py-4" style={{ fontFamily: 'Poppins, sans-serif', color: '#6c757d' }}>
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{formatDate(user.createdAt)}</td>
                  <td>{formatDate(user.updatedAt)}</td>
                  <td>
                    <span className="badge bg-secondary">{user.role}</span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm"
                      style={{
                        fontWeight: 'bold',
                        fontFamily: 'Poppins, sans-serif',
                        backgroundColor: hoveredButtonId === user.id ? '#157347' : '#198754',
                        borderColor: hoveredButtonId === user.id ? '#157347' : '#198754',
                        color: '#ffffff',
                        transition: 'all 0.3s ease',
                        boxShadow: hoveredButtonId === user.id ? '0 0 10px rgba(21,115,71,0.4)' : 'none',
                        transform: hoveredButtonId === user.id ? 'scale(1.03)' : 'scale(1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                      }}
                      onClick={() => handleAddProperties(user.id)}
                      onMouseEnter={() => setHoveredButtonId(user.id)}
                      onMouseLeave={() => setHoveredButtonId(null)}
                    >
                      <img
                        src="https://img.icons8.com/?size=100&id=46774&format=png&color=ffffff"
                        alt="Property Icon"
                        style={{ width: '20px', height: '20px', }}
                      />
                      Show Properties
                    </button>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
