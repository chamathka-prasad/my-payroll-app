import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faBell,
    faDownload,
    faUser,
    faTh,
    faCaretDown,
    faMoon,
    faSun
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = ({ onMenuClick }) => {
  const { theme, toggleTheme, isDark } = useTheme();
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const getFormattedDate = () => {
    const today = new Date();
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
    const dayNum = today.getDate();
    const monthName = today.toLocaleDateString('en-US', { month: 'long' }).toUpperCase();
    const yearNum = today.getFullYear();
    return `${dayName} ${dayNum} ${monthName} ${yearNum}`;
  };

  const handleGridClick = () => alert('Grid icon clicked!');
  const handleDownloadClick = () => alert('Download icon clicked!');
  const handleBellClick = () => alert('Notifications clicked!');
  const handleLogout = () => alert('Logout clicked!');

  return (
    <nav className="custom-navbar p-3 d-flex align-items-center justify-content-between">
      
      {/* Left side: Date */}
      <div className="d-flex align-items-center">
        <button className="btn btn-outline-light d-lg-none me-3" type="button" onClick={onMenuClick}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <span className="navbar-date">{getFormattedDate()}</span>
      </div>

      {/* Right side: Icons and User Info */}
      <div className="d-flex align-items-center">

        {/* Theme Toggle Button */}
        <button
          className="icon-button theme-toggle me-3"
          onClick={toggleTheme}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          <FontAwesomeIcon
            icon={isDark ? faSun : faMoon}
            className="text-white theme-icon"
            size="lg"
          />
        </button>

        {/* Clickable Icons */}
        <button className="icon-button me-3" onClick={handleGridClick}>
          <FontAwesomeIcon icon={faTh} className="text-white" size="lg" />
        </button>
        <button className="icon-button me-3" onClick={handleDownloadClick}>
          <FontAwesomeIcon icon={faDownload} className="text-white" size="lg" />
        </button>
        <button className="icon-button notification-icon me-3" onClick={handleBellClick}>
          <FontAwesomeIcon icon={faBell} className="text-white" size="lg" />
          <span className="notification-badge">3</span>
        </button>
        
        {/* Profile Dropdown Section */}
        <div className="profile-dropdown-wrapper">
          
          <div 
            className="d-flex align-items-center profile-section ms-2" 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
              <div className="navbar-separator me-3"></div>
              
              <div className="profile-image-container me-2">
                  <FontAwesomeIcon icon={faUser} className="profile-user-icon" /> 
              </div>
              
              <div className="text-end text-white profile-details">
                  <small className="d-block" style={{ lineHeight: '1' }}>0771154849</small>
                  <small className="d-block" style={{ lineHeight: '1' }}>SUPER_ADMIN</small>
              </div>
              
              <FontAwesomeIcon 
                icon={faCaretDown} 
                className={`profile-caret ${isProfileOpen ? 'open' : ''}`} 
              />
              
          </div>

          {/* Logout Dropdown Menu */}
          {isProfileOpen && (
            <div className="logout-dropdown-menu">
              <a href="#logout" className="logout-dropdown-item" onClick={handleLogout}>
                Logout
              </a>
            </div>
          )}
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;