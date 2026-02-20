// ✅ Final working Signup page with backend functionality, toast & navigation integration

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/authService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Component mounted');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      toast.success('✅ Account created successfully..!', { position: 'top-center', theme: 'colored' });
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error creating account 😔', { position: 'top-center', theme: 'colored' });
    }
  };

  const goHome = () => navigate('/');

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
      {/* Toasts */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          background: 'rgba(255, 255, 255, 0.05)',
          color: '#f3f4f6',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '16px',
          boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
          fontWeight: '500',
          fontFamily: 'system-ui',
          textAlign: 'center'
        }}
        bodyStyle={{ fontSize: '16px' }}
        progressStyle={{
          background: 'linear-gradient(90deg, #a855f7, #ec4899)'
        }}
      />

      {/* Gradient background blobs */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '200px', height: '200px', background: '#a855f7', borderRadius: '50%', filter: 'blur(60px)', opacity: 0.3, animation: 'pulse 3s ease-in-out infinite' }}></div>
        <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '200px', height: '200px', background: '#ec4899', borderRadius: '50%', filter: 'blur(60px)', opacity: 0.3, animation: 'pulse 3s ease-in-out infinite', animationDelay: '1s' }}></div>
      </div>

      {/* Signup card */}
      <div style={{
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
      }}>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '64px', height: '64px', margin: '0 auto 16px', background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src="https://img.icons8.com/?size=100&id=46774&format=png&color=000000"
              alt="Building Icon"
              width={39}
              height={39}
            />
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: '700', background: 'linear-gradient(135deg, #ffffff 0%, #e879f9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0 0 8px 0' }}>Prime Properties</h2>
          <p style={{ color: '#d1d5db', fontSize: '16px' }}>Create Your Account</p>
          <div style={{ width: '60px', height: '3px', background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)', margin: '0 auto', borderRadius: '2px' }}></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <>
            <style>
              {`
      input::placeholder {
        color: #f3f4f6; 
        opacity: 1;     /* ensures it's fully visible */
      }
    `}
            </style>

            {['name', 'email', 'phone', 'password'].map((field, i) => (
              <div key={i} style={{ marginBottom: '24px' }}>
                <label
                  style={{
                    display: 'block',
                    color: '#f3f4f6',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '8px',
                  }}
                >
                  {field === 'name'
                    ? 'Full Name'
                    : field === 'email'
                      ? 'Email Address'
                      : field === 'phone'
                        ? 'Phone Number'
                        : 'Password'}
                </label>
                <input
                  type={
                    field === 'password'
                      ? 'password'
                      : field === 'email'
                        ? 'email'
                        : field === 'phone'
                          ? 'tel'
                          : 'text'
                  }
                  placeholder={`Enter your ${field}`}
                  required
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
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
            ))}
          </>
          <button
            type="submit"
            style={{
              width: '100%', padding: '16px', background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)', border: 'none', borderRadius: '12px', color: 'white', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease', marginBottom: '20px', boxShadow: '0 10px 25px -5px rgba(168, 85, 247, 0.5)'
            }}
          >
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <p style={{ textAlign: 'center', color: '#d1d5db', fontSize: '16px', marginBottom: '20px' }}>
          Already have an account?{' '}
          <span
            style={{ color: '#a855f7', fontWeight: '600', cursor: 'pointer' }}
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>

        {/* Home Button */}
        <button
          style={{
            width: '100%', padding: '14px', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '12px', color: 'white', fontSize: '16px', fontWeight: '600', cursor: 'pointer', backdropFilter: 'blur(10px)'
          }}
          onClick={goHome}
        >
          Back to Home
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
};

export default Signup;