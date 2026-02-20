import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService'; // ✅ your actual login function
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Component mounted');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      const userData = res.data;

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("userId", userData.id);

      toast.success("Login Successful..!", { position: "top-center" });

      setTimeout(() => {
        const userType = localStorage.getItem("userType");
        if (userType === "post") navigate('/PostDashboard');
        else if (userType === "find") navigate('/FindDashboard');
        else navigate('/');
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data || "Login failed! 😔", {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Blur Effects */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        overflow: 'hidden', pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute', top: '-100px', right: '-100px',
          width: '200px', height: '200px', background: '#a855f7',
          borderRadius: '50%', filter: 'blur(60px)', opacity: 0.3,
          animation: 'pulse 3s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute', bottom: '-100px', left: '-100px',
          width: '200px', height: '200px', background: '#ec4899',
          borderRadius: '50%', filter: 'blur(60px)', opacity: 0.3,
          animation: 'pulse 3s ease-in-out infinite', animationDelay: '1s'
        }} />
      </div>

      {/* Toast Container */}
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
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '16px',
        boxShadow: '0 15px 25px rgba(0,0,0,0.5)',
        fontWeight: '500',
        fontFamily: 'system-ui',
        textAlign: 'center'
      }}
      bodyStyle={{ fontSize: '16px' }}
      progressStyle={{
        background: 'linear-gradient(90deg, #a855f7, #ec4899)'
      }}
      />

      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '24px',
        padding: '40px',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Logo & Heading */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px', height: '64px', margin: '0 auto 16px',
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
            borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 10px 25px -5px rgba(168, 85, 247, 0.5)'
          }}>
             <img
              src="https://img.icons8.com/?size=100&id=46774&format=png&color=000000"
              alt="Building Icon"
              width={39}
              height={39}
            />
          </div>
          <h2 style={{
            fontSize: '28px', fontWeight: '700',
            background: 'linear-gradient(135deg, #ffffff 0%, #e879f9 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', margin: '0 0 8px 0'
          }}>Welcome Back</h2>
          <p style={{ color: '#d1d5db', fontSize: '16px', marginBottom: '8px' }}>
            Login to Your Account
          </p>
          <div style={{
            width: '60px', height: '3px',
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
            margin: '0 auto', borderRadius: '2px'
          }} />
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block', color: '#f3f4f6', fontSize: '14px',
              fontWeight: '600', marginBottom: '8px'
            }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                placeholder="Enter your email"
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
                style={inputStyle}
              />
              <svg style={iconStyle} width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{
              display: 'block', color: '#f3f4f6', fontSize: '14px',
              fontWeight: '600', marginBottom: '8px'
            }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                placeholder="Enter your password"
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
                style={inputStyle}
              />
              <svg style={iconStyle} width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={e => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 15px 35px -5px rgba(168, 85, 247, 0.6)';
            }}
            onMouseLeave={e => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 25px -5px rgba(168, 85, 247, 0.5)';
            }}
          >
            Login
          </button>
        </form>

        {/* Sign Up */}
        <p style={{ textAlign: 'center', color: '#d1d5db', fontSize: '16px', margin: '0' }}>
          Don't have an account?{' '}
          <span
            style={{ color: '#a855f7', fontWeight: '600', cursor: 'pointer' }}
            onClick={() => navigate('/signup')}
            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
          >Sign Up</span>
        </p>
      </div>

      {/* Pulse animation */}
      <style jsx="true">{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }
        input::placeholder {
          color: rgba(156, 163, 175, 0.8);
        }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 30px rgba(255, 255, 255, 0.1) inset !important;
          -webkit-text-fill-color: white !important;
        }
      `}</style>
    </div>
  );
};

// 🔧 Common styles
const inputStyle = {
  width: '100%',
  padding: '14px 16px 14px 48px',
  background: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '12px',
  color: 'white',
  fontSize: '16px',
  outline: 'none',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease',
  boxSizing: 'border-box'
};

const iconStyle = {
  position: 'absolute',
  left: '16px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#9ca3af'
};

const buttonStyle = {
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
};

export default Login;
