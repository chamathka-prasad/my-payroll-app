import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faClipboardList, faUsers, faCalendarAlt, faWalking,
  faBuilding, faCog, faChevronLeft, faChevronDown, faArrowRight,
  faArrowLeft, faTimes
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const [isEmployeeMenuOpen, setIsEmployeeMenuOpen] = useState(true);

  const getNavLinkClass = ({ isActive }) => 
    isActive ? 'nav-link d-flex align-items-center active' : 'nav-link d-flex align-items-center';

  const getSubNavLinkClass = ({ isActive }) => 
    isActive ? 'nav-link active' : 'nav-link';

  return (
    <div className={`sidebar p-3 d-flex flex-column ${isOpen ? 'active' : ''}`}>
      {/* Updated Header with Icon */}
      <div className="sidebar-header d-flex justify-content-between align-items-center mb-3">
        <h5 className="sidebar-title mb-0">DART-PAYROLL</h5>
        <button className="sidebar-close-btn" onClick={onClose} aria-label="Close sidebar">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      
      <ul className="nav flex-column flex-grow-1">
        <li className="nav-item mb-2">
          <NavLink to="/" className={getNavLinkClass} end>
            <FontAwesomeIcon icon={faHome} className="me-2" /> DASHBOARD
            <FontAwesomeIcon icon={faChevronLeft} className="ms-auto sidebar-chevron" />
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/registrations" className={getNavLinkClass}>
            <FontAwesomeIcon icon={faClipboardList} className="me-2" /> REGISTRATIONS 
            <FontAwesomeIcon icon={faChevronLeft} className="ms-auto sidebar-chevron" />
          </NavLink>
        </li>
        
        {/* Collapsible Menu Item */}
        <li className="nav-item mb-2">
          <a 
            href="#" 
            className={`nav-link d-flex align-items-center ${isEmployeeMenuOpen ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setIsEmployeeMenuOpen(!isEmployeeMenuOpen);
            }}
            aria-expanded={isEmployeeMenuOpen}
          >
            <FontAwesomeIcon icon={faUsers} className="me-2" /> EMPLOYEE MANAGEMENT 
            <FontAwesomeIcon 
              icon={faChevronDown} 
              className={`ms-auto sidebar-chevron transition-transform ${isEmployeeMenuOpen ? 'rotate-180' : ''}`} 
            />
          </a>
          
          {/* Sub-menu with new icons */}
          {isEmployeeMenuOpen && (
            <ul className="nav flex-column ps-3 mt-2 sub-nav">
              <li className="nav-item">
                <NavLink to="/employees" className={getSubNavLinkClass}>
                  <FontAwesomeIcon icon={faArrowRight} className="me-2" /> EMPLOYEE
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register-employee" className={getSubNavLinkClass}>
                  <FontAwesomeIcon icon={faArrowRight} className="me-2" /> REGISTER EMPLOYEE
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/salary-master" className={getSubNavLinkClass}>
                  <FontAwesomeIcon icon={faArrowRight} className="me-2" /> SALARY MASTER
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/manage-teams" className={getSubNavLinkClass}>
                  <FontAwesomeIcon icon={faArrowRight} className="me-2" /> MANAGE TEAMS
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        
        {/* Other menu items */}
        <li className="nav-item mb-2">
          <NavLink to="/attendance" className={getNavLinkClass}>
            <FontAwesomeIcon icon={faCalendarAlt} className="me-2" /> ATTENDANCE MANAGEMENT 
            <FontAwesomeIcon icon={faChevronLeft} className="ms-auto sidebar-chevron" />
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/leave" className={getNavLinkClass}>
            <FontAwesomeIcon icon={faWalking} className="me-2" /> LEAVE MANAGEMENT 
            <FontAwesomeIcon icon={faChevronLeft} className="ms-auto sidebar-chevron" />
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/salary" className={getNavLinkClass}>
            <FontAwesomeIcon icon={faBuilding} className="me-2" /> SALARY MANAGEMENT 
            <FontAwesomeIcon icon={faChevronLeft} className="ms-auto sidebar-chevron" />
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/settings" className={getNavLinkClass}>
            <FontAwesomeIcon icon={faCog} className="me-2" /> SYSTEM SETTINGS 
            <FontAwesomeIcon icon={faChevronLeft} className="ms-auto sidebar-chevron" />
          </NavLink>
        </li>
      </ul>
      
      {/* Footer */}
      <div className="mt-auto text-center py-3">
        <small className="sidebar-footer">COPYRIGHT © 2023. ALL RIGHT RESERVED.</small>
      </div>
    </div>
  );
};

export default Sidebar;