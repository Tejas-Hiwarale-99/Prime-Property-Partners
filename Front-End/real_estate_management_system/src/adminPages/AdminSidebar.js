import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = ({ isOpen }) => {
    return (
        <div
            className={`shadow-lg ${isOpen ? 'open' : 'closed'}`}
            style={{
                width: '250px',
                backgroundColor: '#014591', // Navy blue (same as original)
                color: '#ffffff',
                fontFamily: "'Poppins', sans-serif",
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: isOpen ? '0' : '-250px',
                zIndex: 999,
                overflowY: 'auto',
                minHeight: '100vh',
                transition: 'left 0.3s ease-in-out',
                padding: '1rem',
            }}
        >
            <div style={{ paddingTop: '70px' }}>
                <div className="mb-4 border-bottom pb-2">
                    <h5 className="fw-bold mb-0 text-warning d-flex align-items-center gap-2">
                    <img
                            src="https://img.icons8.com/?size=100&id=KxtY3rktVoKg&format=png&color=000000"
                            alt="User icon"
                            style={{ width: '30px', height: '30px' }}
                        /> Admin Control
                    </h5>
                </div>

                <ul className="nav flex-column gap-3">
                    {/* Admin Dashboard Link */}
                    <li className="nav-item">
                        <NavLink
                            to="/admin/dashboard"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '0.5rem 0.75rem',
                                color: '#ffffff',
                                fontWeight: 600,
                                borderRadius: '0.375rem',
                                transition: 'all 0.3s ease-in-out',
                                textDecoration: 'none',
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
                            Admin Dashboard
                        </NavLink>
                    </li>

                    {/* All Users Link */}
                    <li className="nav-item">
                        <NavLink
                            to="/admin/dashboard/user-table"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '0.5rem 0.75rem',
                                color: '#ffffff',
                                fontWeight: 600,
                                borderRadius: '0.375rem',
                                transition: 'all 0.3s ease-in-out',
                                textDecoration: 'none',
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
                                src="https://img.icons8.com/?size=100&id=102261&format=png&color=ffffff"
                                alt="Users"
                                style={{ width: '25px', height: '25px' }}
                            />
                            All Users
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AdminSidebar;
