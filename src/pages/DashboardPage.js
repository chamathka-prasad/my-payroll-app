import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faMoneyBillWave,
  faUserCheck,
  faCalendarCheck,
  faChartLine,
  faArrowUp,
  faArrowDown
} from '@fortawesome/free-solid-svg-icons';
import './DashboardPage.css';

const DashboardPage = () => {
  const stats = [
    {
      title: 'Total Employees',
      value: '248',
      change: '+12%',
      trend: 'up',
      icon: faUsers,
      color: 'primary',
      bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'Monthly Payroll',
      value: '$245,890',
      change: '+8%',
      trend: 'up',
      icon: faMoneyBillWave,
      color: 'success',
      bgGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    },
    {
      title: 'Active Staff',
      value: '235',
      change: '+5%',
      trend: 'up',
      icon: faUserCheck,
      color: 'info',
      bgGradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
    },
    {
      title: 'Attendance Rate',
      value: '94.5%',
      change: '-2%',
      trend: 'down',
      icon: faCalendarCheck,
      color: 'warning',
      bgGradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
    }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h2 className="dashboard-title">Dashboard Overview</h2>
          <p className="dashboard-subtitle">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="dashboard-date-badge">
          <FontAwesomeIcon icon={faChartLine} className="me-2" />
          Real-time Data
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-card-header">
              <div className="stat-icon-wrapper" style={{ background: stat.bgGradient }}>
                <FontAwesomeIcon icon={stat.icon} className="stat-icon" />
              </div>
              <div className={`stat-trend ${stat.trend}`}>
                <FontAwesomeIcon icon={stat.trend === 'up' ? faArrowUp : faArrowDown} />
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="stat-card-body">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.title}</p>
            </div>
            <div className="stat-card-footer">
              <FontAwesomeIcon icon={faChartLine} className="me-2" />
              <span>vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h3 className="section-title">Quick Actions</h3>
        <div className="quick-actions-grid">
          <button className="action-card">
            <div className="action-icon primary">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <div className="action-content">
              <h4>Manage Employees</h4>
              <p>View and manage employee records</p>
            </div>
          </button>
          <button className="action-card">
            <div className="action-icon success">
              <FontAwesomeIcon icon={faMoneyBillWave} />
            </div>
            <div className="action-content">
              <h4>Process Payroll</h4>
              <p>Run monthly payroll calculations</p>
            </div>
          </button>
          <button className="action-card">
            <div className="action-icon info">
              <FontAwesomeIcon icon={faCalendarCheck} />
            </div>
            <div className="action-content">
              <h4>Track Attendance</h4>
              <p>Monitor employee attendance</p>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="activity-section">
        <h3 className="section-title">Recent Activity</h3>
        <div className="activity-card">
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-dot success"></div>
              <div className="activity-content">
                <p className="activity-text">Payroll processed for <strong>March 2025</strong></p>
                <span className="activity-time">2 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-dot info"></div>
              <div className="activity-content">
                <p className="activity-text">New employee <strong>John Doe</strong> registered</p>
                <span className="activity-time">5 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-dot warning"></div>
              <div className="activity-content">
                <p className="activity-text">Leave request pending approval from <strong>Sarah Smith</strong></p>
                <span className="activity-time">1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;