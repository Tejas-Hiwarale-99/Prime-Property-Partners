import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const Navbar2 = ({ toggleSidebar }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        toggleSidebar();
    };

    const handleLogout = () => {
        axios.post('http://localhost:8080/api/auth/logout', {}, { withCredentials: true })
            .then(() => {
                localStorage.removeItem('user');
                sessionStorage.clear();
                toast.success("Logged out successfully..!");
                setTimeout(() => navigate('/login'), 2000);
            })
            .catch((err) => {
                console.error("Logout failed:", err);
                toast.error("❌ Logout Failed...!");
                //setTimeout(() => navigate('/login'), 1500);
            });
    };

    return (
        <nav
            style={{
                backgroundColor: '#002B5B',
                fontFamily: 'Poppins, sans-serif',
                color: '#ffffff',
                position: 'fixed',
                zIndex: 1030,
                width: '100%',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                padding: '1rem 1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                    onClick={handleToggleSidebar}
                    style={{
                        background: 'transparent',
                        border: '2px solid #ffffff',
                        color: '#ffffff',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease-in-out',
                        cursor: 'pointer'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#00BFFF';
                        e.currentTarget.style.color = '#ffffff';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 191, 255, 0.4)';
                        e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#ffffff';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    {isSidebarOpen ? '×' : '☰'}
                </button>

                <Link
                    to="/"
                    className="navbar-brand text-decoration-none d-flex align-items-center gap-2"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
                >
                    <img
                        src="https://img.icons8.com/?size=100&id=46774&format=png&color=000000"
                        alt="Logo"
                        style={{ width: '35px', height: '35px' }}
                    />
                    <span
                        style={{
                            fontWeight: 600,
                            fontSize: '1.2rem',
                            color: '#00BFFF',
                            transition: 'color 0.3s ease-in-out'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
                        onMouseOut={(e) => e.currentTarget.style.color = '#00DAFF'}
                    >
                        Real Estate Portal
                    </span>
                </Link>
            </div>

            <button
                onClick={handleLogout}
                style={{
                    border: '2px solid #ffffff',
                    color: '#ffffff',
                    padding: '6px 20px',
                    fontWeight: 600,
                    borderRadius: '30px',
                    background: 'transparent',
                    transition: 'all 0.3s ease-in-out',
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#00BFFF';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 191, 255, 0.4)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'scale(1)';
                }}
            >
                Logout
            </button>

            <ToastContainer position="top-center" autoClose={2000} />
        </nav>
    );
};

export default Navbar2;
