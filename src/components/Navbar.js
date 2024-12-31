// Navbar.js
import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import logo from '../images/logo.png';

export const Navbar = () => {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/profile');
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src={logo} alt="Logo" className="navbar-logo" />
                <span className="navbar-company-name">Food Recipe</span>
            </div>
            <div className="navbar-right">
                <div className="search-container">
                    <i className="bx bx-search search-icon"></i>
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder="Search recipe" 
                    />
                </div>
                <i 
                    className="bx bxs-user-circle profile-icon" 
                    onClick={handleProfileClick}
                    title="Profile"
                ></i>
            </div>
        </nav>
    );
};

