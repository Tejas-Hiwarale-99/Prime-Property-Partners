import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Component mounted');
  }, []);

  const handleUserTypeSelection = (type) => {
    localStorage.setItem("userType", type);
    navigate('/signup');
  };

  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute',
          top: '-160px',
          right: '-160px',
          width: '320px',
          height: '320px',
          background: '#a855f7',
          borderRadius: '50%',
          filter: 'blur(80px)',
          opacity: 0.2,
          animation: 'pulse 2s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-160px',
          left: '-160px',
          width: '320px',
          height: '320px',
          background: '#ec4899',
          borderRadius: '50%',
          filter: 'blur(80px)',
          opacity: 0.2,
          animation: 'pulse 2s ease-in-out infinite',
          animationDelay: '1s'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '384px',
          height: '384px',
          background: '#3b82f6',
          borderRadius: '50%',
          filter: 'blur(80px)',
          opacity: 0.1,
          animation: 'pulse 2s ease-in-out infinite',
          animationDelay: '1.5s'
        }}></div>
      </div>

      {/* Admin Button */}
      <div style={{
        position: 'absolute',
        top: '32px',
        right: '32px',
        zIndex: 20
      }}>
        <button
          style={{
            position: 'relative',
            padding: '12px 24px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '16px',
            color: 'white',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px'
          }}
          onClick={() => navigate('/admin/login')}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* PNG Icon (from Icons8) */}
            <img
              src="https://img.icons8.com/?size=100&id=9XcGFWDvUMi7&format=png&color=000000"
              alt="Top Icon"
              width={24}
              height={24}
            />
          </div>

          Admin Login
        </button>
      </div>

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}>
        {/* Brand Logo/Icon */}
        <div style={{
          marginBottom: '32px',
          transition: 'transform 0.3s ease'
        }}>
          <div style={{
            width: '96px',
            height: '96px',
            margin: '0 auto 16px',
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            cursor: 'pointer'
          }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            <img
              src="https://img.icons8.com/?size=100&id=46774&format=png&color=000000"
              alt="Building Icon"
              width={50}
              height={50}
            />
          </div>
        </div>

        {/* Main Heading */}
        <div style={{
          textAlign: 'center',
          marginBottom: '35px',
          maxWidth: '800px'
        }}>
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            fontWeight: '700',
            marginBottom: '24px',
            background: 'linear-gradient(135deg, #ffffff 0%, #e879f9 50%, #fbbf24 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: '1.1',
            letterSpacing: '-0.025em'
          }}>
            Prime Properties
          </h1>
          <p style={{
            fontSize: 'clamp(1.125rem, 4vw, 1.5rem)',
            color: '#d1d5db',
            fontWeight: '300',
            lineHeight: '1.6',
            margin: '0 0 24px 0'
          }}>
            Premium Property Management System
          </p>
          <div style={{
            width: '96px',
            height: '4px',
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
            margin: '0 auto',
            borderRadius: '2px'
          }}></div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: window.innerWidth < 640 ? 'column' : 'row',
          gap: '24px',
          maxWidth: '512px',
          width: '100%'
        }}>
          {/* Post Property Button */}
          <button
            style={{
              position: 'relative',
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
              color: 'white',
              fontWeight: '600',
              borderRadius: '16px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              flex: 1,
              fontSize: '16px',
              boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.5)'
            }}
            onClick={() => handleUserTypeSelection('post')}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.background = 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.background = 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)';
            }}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Post Your Property
          </button>

          {/* Find Property Button */}
          <button
            style={{
              position: 'relative',
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #db2777 0%, #be185d 100%)',
              color: 'white',
              fontWeight: '600',
              borderRadius: '16px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              flex: 1,
              fontSize: '16px',
              boxShadow: '0 10px 25px -5px rgba(219, 39, 119, 0.5)'
            }}
            onClick={() => handleUserTypeSelection('find')}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.background = 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.background = 'linear-gradient(135deg, #db2777 0%, #be185d 100%)';
            }}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Find a Property
          </button>
        </div>

        {/* Features Section */}
        <div style={{
          marginTop: '64px',
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(3, 1fr)',
          gap: '32px',
          maxWidth: '896px',
          width: '100%'
        }}>
          {[
            {
              icon: (
                <svg width="32" height="32" fill="none" stroke="#a855f7" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              title: 'Lightning Fast',
              description: 'Quick property search and listing'
            },
            {
              icon: (
                <svg width="32" height="32" fill="none" stroke="#ec4899" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: 'Secure Platform',
              description: 'Your data is always protected'
            },
            {
              icon: (
                <svg width="32" height="32" fill="none" stroke="#3b82f6" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ),
              title: 'Trusted Community',
              description: 'Connect with verified users'
            }
          ].map((feature, index) => (
            <div key={index} style={{
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 16px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: 'white',
                marginBottom: '8px',
                margin: '0 0 8px 0'
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: '#9ca3af',
                fontSize: '14px',
                margin: 0
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Toast Container Placeholder */}
      <div style={{
        position: 'fixed',
        top: '16px',
        right: '16px',
        zIndex: 50
      }}>
        {/* Toast notifications would appear here */}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.2;
          }
          50% { 
            transform: scale(1.1);
            opacity: 0.3;
          }
        }
        
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}

export default Home;