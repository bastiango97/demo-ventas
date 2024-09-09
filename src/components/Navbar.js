import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
    const location = useLocation();

    // Define the routes where the Navbar should be hidden
    const hiddenNavRoutes = [
        '/complete-task/accept',
        '/complete-task/reject',
        '/complete-task/request-changes',
    ];

    // Check if the current path matches any hiddenNavRoutes
    const hideNav = hiddenNavRoutes.some(route => location.pathname.includes(route));

    // If the current route is in the hiddenNavRoutes, do not render the Navbar
    if (hideNav) {
        return null;
    }

    return (
        <nav className="navbar">
            <div className="logo-container">
                <img src={logo} alt="Summit58 Logo" className="logo" />
            </div>
            <ul className="nav-links">
                <li><Link to="/procesos">Procesos</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
