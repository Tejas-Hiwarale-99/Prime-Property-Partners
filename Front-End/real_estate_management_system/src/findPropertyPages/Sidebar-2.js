import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Sidebar2 = ({ isOpen }) => {
    const [userName, setUserName] = useState('');
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (!userId) return;

        axios.get(`http://localhost:8080/api/users/${userId}`)
            .then((res) => {
                setUserName(res.data.name);
            })
            .catch((err) => {
                console.error("Failed to fetch user name:", err);
                setUserName('User');
            });
    }, [userId]);

    return (
        <div
            className={`shadow-lg ${isOpen ? 'open' : 'closed'}`}
            style={{
                width: '250px',
                backgroundColor: '#014591', // updated to navbar background
                color: '#ffffff',
                fontFamily: "'Poppins', sans-serif", // updated to match navbar font
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: isOpen ? '0' : '-250px',
                zIndex: 999,
                overflowY: 'auto',
                minHeight: '100vh',
                transition: 'left 0.3s ease-in-out',
                padding: '1rem'
            }}
        >
            <div style={{ paddingTop: '70px' }}>
                <div className="mb-4 border-bottom pb-2">
                    <h5 className="fw-bold mb-0 text-warning d-flex align-items-center gap-2">
                        <img
                            src="https://img.icons8.com/?size=100&id=Ib9FADThtmSf&format=png&color=ffffff"
                            alt="User"
                            style={{ width: '25px', height: '25px' }}
                        />
                        Hello, {userName || 'User'}
                    </h5>
                </div>

                <ul className="nav flex-column gap-3">
                    <li className="nav-item">
                        <NavLink
                            to="/FindDashboard"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '0.5rem 0.75rem',
                                color: '#ffffff',
                                fontWeight: 600,
                                borderRadius: '0.375rem',
                                transition: 'all 0.3s ease-in-out',
                                textDecoration: 'none'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.backgroundColor = '#00BFFF';
                                e.currentTarget.style.color = '#ffffff';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 191, 255, 0.4)';
                                e.currentTarget.style.transform = 'translateX(4px)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = '#ffffff';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.transform = 'translateX(0)';
                            }}
                        >
                            <img
                                src="https://img.icons8.com/?size=100&id=92zOGOmxGkWj&format=png&color=ffffff"
                                alt="Dashboard"
                                style={{ width: '25px', height: '25px' }}
                            />
                            Dashboard
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink
                            to="/FindDashboard/update-profile-2"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '0.5rem 0.75rem',
                                color: '#ffffff',
                                fontWeight: 600,
                                borderRadius: '0.375rem',
                                transition: 'all 0.3s ease-in-out',
                                textDecoration: 'none'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.backgroundColor = '#00BFFF';
                                e.currentTarget.style.color = '#ffffff';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 191, 255, 0.4)';
                                e.currentTarget.style.transform = 'translateX(4px)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = '#ffffff';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.transform = 'translateX(0)';
                            }}
                        >
                            <img
                                src="https://img.icons8.com/?size=100&id=771&format=png&color=ffffff"
                                alt="Update Profile"
                                style={{ width: '25px', height: '25px' }}
                            />
                            Update Profile
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink
                            to="/FindDashboard/rental-properties"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '0.5rem 0.75rem',
                                color: '#ffffff',
                                fontWeight: 600,
                                borderRadius: '0.375rem',
                                transition: 'all 0.3s ease-in-out',
                                textDecoration: 'none'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.backgroundColor = '#00BFFF';
                                e.currentTarget.style.color = '#ffffff';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 191, 255, 0.4)';
                                e.currentTarget.style.transform = 'translateX(4px)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = '#ffffff';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.transform = 'translateX(0)';
                            }}
                        >
                            <img
                                src="https://img.icons8.com/?size=100&id=CkDCLnCn9D7C&format=png&color=ffffff"
                                alt="Update Profile"
                                style={{ width: '25px', height: '25px' }}
                            />
                            Find Rentals
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink
                            to="/FindDashboard/Buy-properties"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '0.5rem 0.75rem',
                                color: '#ffffff',
                                fontWeight: 600,
                                borderRadius: '0.375rem',
                                transition: 'all 0.3s ease-in-out',
                                textDecoration: 'none'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.backgroundColor = '#00BFFF';
                                e.currentTarget.style.color = '#ffffff';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 191, 255, 0.4)';
                                e.currentTarget.style.transform = 'translateX(4px)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = '#ffffff';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.transform = 'translateX(0)';
                            }}
                        >
                            <img
                                src="https://img.icons8.com/?size=100&id=wz9HLSghirWG&format=png&color=ffffff"
                                alt="Update Profile"
                                style={{ width: '25px', height: '25px' }}
                            />
                            Buy Property
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink
                            to="/FindDashboard/my-bookings"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '0.5rem 0.75rem',
                                color: '#ffffff',
                                fontWeight: 600,
                                borderRadius: '0.375rem',
                                transition: 'all 0.3s ease-in-out',
                                textDecoration: 'none'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.backgroundColor = '#00BFFF';
                                e.currentTarget.style.color = '#ffffff';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 191, 255, 0.4)';
                                e.currentTarget.style.transform = 'translateX(4px)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = '#ffffff';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.transform = 'translateX(0)';
                            }}
                        >
                            <img
                                src="https://img.icons8.com/?size=100&id=YrKo1pckYPRz&format=png&color=ffffff"
                                alt="Update Profile"
                                style={{ width: '25px', height: '25px' }}
                            />
                            My Bookings
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink
                            to="/FindDashboard/my-transactions"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '0.5rem 0.75rem',
                                color: '#ffffff',
                                fontWeight: 600,
                                borderRadius: '0.375rem',
                                transition: 'all 0.3s ease-in-out',
                                textDecoration: 'none'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.backgroundColor = '#00BFFF';
                                e.currentTarget.style.color = '#ffffff';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 191, 255, 0.4)';
                                e.currentTarget.style.transform = 'translateX(4px)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = '#ffffff';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.transform = 'translateX(0)';
                            }}
                        >
                            <img
                                src="https://img.icons8.com/?size=100&id=bwLcDQQog5cM&format=png&color=ffffff"
                                alt="Update Profile"
                                style={{ width: '25px', height: '25px' }}
                            />
                           My Transaction
                        </NavLink>
                    </li>   
                </ul>
            </div>
        </div>
    );
};

export default Sidebar2;
