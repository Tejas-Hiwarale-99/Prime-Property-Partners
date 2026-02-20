import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateProfile = () => {
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  useEffect(() => {
    if (!userId) {
      setError("User not logged in.");
      return;
    }

    axios.get(`http://localhost:8080/api/users/${userId}`)
      .then(res => {
        setFormData(prev => ({
          ...prev,
          ...res.data,
          password: '',
          confirmPassword: ''
        }));
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load user data.");
      });
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const updatedData = {
      ...formData,
      id: userId,
    };

    axios.put(`http://localhost:8080/api/users/update/${userId}`, updatedData)
      .then(res => {
        setMessage("Profile updated successfully..!");
        setFormData({ ...formData, password: '', confirmPassword: '' });
      })
      .catch(err => {
        console.error(err);
        setError("Error updating profile. Please try again.");
      });
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card shadow p-4 mt-5" style={{ width: '100%', maxWidth: '600px' }}>
        <h4 className="text-center mb-4">Update Profile</h4>

        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email (read-only)</label>
            <input
              name="email"
              className="form-control"
              value={formData.email}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">New Password</label>
            <div className="input-group">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave blank to keep old password"
              />
              <button
                type="button"
                className="btn"
                style={{
                  border: "1px solid #6c757d",
                  backgroundColor: "transparent",
                  color: "#6c757d",
                  padding: "0.375rem 0.75rem",
                  fontSize: "1rem",
                  borderRadius: "0.25rem",
                }}
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                <img
                  src={passwordVisible ? "https://img.icons8.com/?size=100&id=7877&format=png&color=000000" : "https://img.icons8.com/?size=100&id=34226&format=png&color=000000"}
                  alt={passwordVisible ? "Hide" : "Show"}
                  style={{ width: "20px", height: "20px" }}
                />
              </button>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <div className="input-group">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                className="form-control"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="btn"
                style={{
                  border: "1px solid #6c757d",
                  backgroundColor: "transparent",
                  color: "#6c757d",
                  padding: "0.375rem 0.75rem",
                  fontSize: "1rem",
                  borderRadius: "0.25rem",
                }}
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              >
                <img
                  src={confirmPasswordVisible ? "https://img.icons8.com/?size=100&id=7877&format=png&color=000000" : "https://img.icons8.com/?size=100&id=34226&format=png&color=000000"}
                  alt={confirmPasswordVisible ? "Hide" : "Show"}
                  style={{ width: "20px", height: "20px" }}
                />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold"
            style={{
              backgroundColor: "#007bff",
              borderColor: "#007bff",
              color: "#fff",
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              borderRadius: "0.25rem",
            }}
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
