import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../services/adminService';
import AOS from 'aos';
import 'aos/dist/aos.css';

function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ text: "", type: "" }); // ✅ for inbuilt message

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await adminLogin(form);
      localStorage.setItem("admin", JSON.stringify(res.data));
      setMessage({ text: "Admin Login successful..!", type: "success" }); // ✅ Success Message
      setTimeout(() => {
        setMessage({ text: "", type: "" }); // Clear message
        navigate("/admin/dashboard");
      }, 1500);
    } catch (err) {
      setMessage({ text: err.response?.data?.message || "Invalid Admin Credentials 😔", type: "error" }); // ✅ Error Message
      setTimeout(() => setMessage({ text: "", type: "" }), 2000);
    }
  };

  const goHome = () => {
    navigate("/"); // Navigate to Home Page
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Gradient background blobs */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '200px', height: '200px', background: '#a855f7', borderRadius: '50%', filter: 'blur(60px)', opacity: 0.3, animation: 'pulse 3s ease-in-out infinite' }}></div>
        <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '200px', height: '200px', background: '#ec4899', borderRadius: '50%', filter: 'blur(60px)', opacity: 0.3, animation: 'pulse 3s ease-in-out infinite', animationDelay: '1s' }}></div>
      </div>

      {/* Admin Login card */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '24px',
          padding: '40px',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          zIndex: 10
        }}
        data-aos="fade-up"
      >
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '64px', height: '64px', margin: '0 auto 16px', background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '32px' }}>💼</span>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: '700', background: 'linear-gradient(135deg, #ffffff 0%, #e879f9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0 0 8px 0' }}>Admin Login</h2>
          <p style={{ color: '#d1d5db', fontSize: '16px' }}>Access Administrative Panel</p>
          <div style={{ width: '60px', height: '3px', background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)', margin: '0 auto', borderRadius: '2px' }}></div>
        </div>

        {/* ✅ Show Message */}
        {message.text && (
          <div
            style={{
              background: message.type === "success" 
                ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%)'
                : 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.1) 100%)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${message.type === "success" ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
              borderRadius: '12px',
              padding: '14px',
              textAlign: 'center',
              color: message.type === "success" ? '#4ade80' : '#f87171',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '24px',
              transition: 'all 0.5s ease',
              boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
            }}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin}>
          <style>
            {`
              input::placeholder {
                color: #f3f4f6; 
                opacity: 1;
              }
            `}
          </style>

          <div style={{ marginBottom: '24px' }}>
            <label
              style={{
                display: 'block',
                color: '#f3f4f6',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label
              style={{
                display: 'block',
                color: '#f3f4f6',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
              }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              marginBottom: '20px',
              boxShadow: '0 10px 25px -5px rgba(168, 85, 247, 0.5)'
            }}
          >
            Login
          </button>
        </form>

        {/* ✅ Home Button */}
        <button
          type="button"
          onClick={goHome}
          style={{
            width: '100%',
            padding: '14px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease'
          }}
        >
          Go to Home
        </button>
      </div>

      {/* Pulse Animation */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

export default AdminLogin;