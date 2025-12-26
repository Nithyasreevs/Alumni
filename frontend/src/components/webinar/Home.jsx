import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const AlumniDashboard = ({ onOpenPlacementDashboard, onOpenWebinarDashboard, onOpenMentorshipDashboard }) => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('webinars');
  const [selectedItem, setSelectedItem] = useState(null);
  const [webinarStats, setWebinarStats] = useState([
    { value: '6', label: 'Total Webinars' },
    { value: '4', label: 'Approved' },
    { value: '2', label: 'On Hold' }
  ]);

  // Data arrays
  const webinars = [
    { id: 1, title: 'AI in Healthcare', status: 'APPROVED', conducted: 12, postponed: 2, topic: 'Healthcare Technology & AI Applications', speakers: 3, date: '2024-12-15' },
    { id: 2, title: 'Data Science Career Roadmap', status: 'APPROVED', conducted: 8, postponed: 1, topic: 'Career Paths in Data Science', speakers: 2, date: '2024-11-20' },
    { id: 3, title: 'Cybersecurity Trends 2025', status: 'HOLD', conducted: 0, postponed: 1, topic: 'Latest Cybersecurity Threats', speakers: 4, date: '2025-01-10' },
  ];

  const mentorships = [
    { id: 1, mentor: 'Dr. A. Ramesh', mentee: 'Priya S.', meetings: 3, status: 'ACTIVE', topic: 'Research Methodology', postponed: 0, duration: '6 months' },
    { id: 2, mentor: 'Mr. Karthik Raj', mentee: 'Deepak M.', meetings: 1, status: 'SCHEDULED', topic: 'Software Engineering', postponed: 2, duration: '3 months' },
    { id: 3, mentor: 'Ms. Divya L.', mentee: 'Harini V.', meetings: 5, status: 'ACTIVE', topic: 'Data Analytics', postponed: 1, duration: '4 months' },
  ];

  const placements = [
    { id: 1, alumni: 'Rahul Sharma', company: 'Infosys', status: 'OFFERED', package: '12 LPA', position: 'Software Engineer', date: '2024-03-15', location: 'Bangalore' },
    { id: 2, alumni: 'Ananya Iyer', company: 'TCS', status: 'IN PROGRESS', package: 'Pending', position: 'Data Analyst', date: '2024-04-20', location: 'Chennai' },
    { id: 3, alumni: 'Vignesh Kumar', company: 'Amazon', status: 'REJECTED', package: '-', position: 'SDE-1', date: '2024-02-10', location: 'Hyderabad' },
  ];

  const statusConfig = {
    'APPROVED': { class: 'status-approved', icon: '✓', label: 'Approved' },
    'HOLD': { class: 'status-hold', icon: '⏸', label: 'On Hold' },
    'ACTIVE': { class: 'status-active', icon: '●', label: 'Active' },
    'SCHEDULED': { class: 'status-scheduled', icon: '📅', label: 'Scheduled' },
    'ON HOLD': { class: 'status-onhold', icon: '⏸', label: 'On Hold' },
    'OFFERED': { class: 'status-offered', icon: '🎉', label: 'Offered' },
    'IN PROGRESS': { class: 'status-progress', icon: '⏳', label: 'In Progress' },
    'REJECTED': { class: 'status-rejected', icon: '✕', label: 'Rejected' }
  };

  const DashboardCard = ({ icon, title, description, onClick, buttonText = "Go to Dashboard", stats = [] }) => (
    <div className="dashboard-access-card">
      <div className="dashboard-card-header">
        <div className="dashboard-icon">{icon}</div>
        <h3>{title}</h3>
      </div>
      <p className="dashboard-description">{description}</p>
      {stats.length > 0 && (
        <div className="dashboard-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      )}
      <button className="dashboard-button" onClick={onClick}>
        {buttonText} →
      </button>
    </div>
  );

  const renderDashboardAccess = () => {
    switch(selectedTab) {
      case 'webinars':
        return (
          <DashboardCard
            icon="🎓"
            title="Webinar Dashboard"
            description="Manage webinar requests, speaker assignments, and topic approvals in the comprehensive management portal."
            onClick={() => navigate('/login')}
            stats={webinarStats}
          />
        );
      case 'mentorships':
        return (
          <DashboardCard
            icon="🤝"
            title="Mentorship Dashboard"
            description="Manage mentorship programs, track progress, and handle mentor-mentee assignments."
            onClick={() => navigate('/login1')}
            stats={[
              { value: '5', label: 'Active Programs' },
              { value: '12', label: 'Total Meetings' },
              { value: '4', label: 'On Track' }
            ]}
          />
        );
      case 'placements':
        return (
          <DashboardCard
            icon="💼"
            title="Placement Dashboard"
            description="View and manage placement data, company registrations, and alumni employment records."
            onClick={() => navigate('/placement-dashboard')}
            stats={[
              { value: '6', label: 'Placements' },
              { value: '3', label: 'Offered' },
              { value: '10.5', label: 'Avg Package (LPA)' }
            ]}
          />
        );
      default:
        return null;
    }
  };

  const DataCard = ({ item, type, onClick }) => {
    const getCardContent = () => {
      switch(type) {
        case 'webinars':
          return (
            <>
              <div className="data-card-header">
                <h4>{item.title}</h4>
                <span className={`status-badge ${statusConfig[item.status]?.class}`}>
                  {statusConfig[item.status]?.icon} {statusConfig[item.status]?.label}
                </span>
              </div>
              <div className="data-card-body">
                <div className="data-info">
                  <span className="info-icon">🎤</span>
                  <span>{item.speakers} Speakers</span>
                </div>
                <div className="data-info">
                  <span className="info-icon">✅</span>
                  <span>{item.conducted} Conducted</span>
                </div>
                <div className="data-info">
                  <span className="info-icon">📅</span>
                  <span>{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
            </>
          );
        case 'mentorships':
          return (
            <>
              <div className="data-card-header">
                <h4>{item.topic}</h4>
                <span className={`status-badge ${statusConfig[item.status]?.class}`}>
                  {statusConfig[item.status]?.icon} {statusConfig[item.status]?.label}
                </span>
              </div>
              <div className="data-card-body">
                <div className="data-info">
                  <span className="info-icon">👨‍🏫</span>
                  <span>{item.mentor}</span>
                </div>
                <div className="data-info">
                  <span className="info-icon">👨‍🎓</span>
                  <span>{item.mentee}</span>
                </div>
                <div className="data-info">
                  <span className="info-icon">✅</span>
                  <span>{item.meetings} Meetings</span>
                </div>
              </div>
            </>
          );
        case 'placements':
          return (
            <>
              <div className="data-card-header">
                <h4>{item.alumni}</h4>
                <span className={`status-badge ${statusConfig[item.status]?.class}`}>
                  {statusConfig[item.status]?.icon} {statusConfig[item.status]?.label}
                </span>
              </div>
              <div className="data-card-body">
                <div className="data-info">
                  <span className="info-icon">🏢</span>
                  <span>{item.company}</span>
                </div>
                <div className="data-info">
                  <span className="info-icon">💼</span>
                  <span>{item.position}</span>
                </div>
                <div className="data-info">
                  <span className="info-icon">💰</span>
                  <span>{item.package}</span>
                </div>
              </div>
            </>
          );
        default:
          return null;
      }
    };

    return (
      <div className="data-card" onClick={() => onClick(item)}>
        {getCardContent()}
        <div className="data-card-footer">
          <span className="view-details">View Details →</span>
        </div>
      </div>
    );
  };

  const renderDataGrid = () => {
    const data = selectedTab === 'webinars' ? webinars : 
                 selectedTab === 'mentorships' ? mentorships : 
                 placements;
    
    return (
      <div className="data-grid">
        {data.map(item => (
          <DataCard
            key={item.id}
            item={item}
            type={selectedTab}
            onClick={setSelectedItem}
          />
        ))}
      </div>
    );
  };

  const renderDetailsModal = () => {
    if (!selectedItem) return null;

    const getModalContent = () => {
      switch(selectedTab) {
        case 'webinars':
          return (
            <>
              <h3>{selectedItem.title}</h3>
              <div className="modal-grid">
                <div className="modal-item">
                  <span className="modal-label">Status</span>
                  <span className={`modal-value ${statusConfig[selectedItem.status]?.class}`}>
                    {statusConfig[selectedItem.status]?.icon} {selectedItem.status}
                  </span>
                </div>
                <div className="modal-item">
                  <span className="modal-label">Date</span>
                  <span className="modal-value">
                    {new Date(selectedItem.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="modal-item">
                  <span className="modal-label">Speakers</span>
                  <span className="modal-value">{selectedItem.speakers} Experts</span>
                </div>
                <div className="modal-item">
                  <span className="modal-label">Conducted Sessions</span>
                  <span className="modal-value highlight">{selectedItem.conducted}</span>
                </div>
                <div className="modal-item">
                  <span className="modal-label">Postponed Sessions</span>
                  <span className="modal-value">{selectedItem.postponed}</span>
                </div>
                <div className="modal-item full-width">
                  <span className="modal-label">Topic</span>
                  <p className="modal-description">{selectedItem.topic}</p>
                </div>
              </div>
            </>
          );
        case 'mentorships':
          return (
            <>
              <h3>Mentorship Program</h3>
              <div className="modal-grid">
                <div className="modal-item">
                  <span className="modal-label">Mentor</span>
                  <span className="modal-value highlight">{selectedItem.mentor}</span>
                </div>
                <div className="modal-item">
                  <span className="modal-label">Mentee</span>
                  <span className="modal-value highlight">{selectedItem.mentee}</span>
                </div>
                <div className="modal-item">
                  <span className="modal-label">Status</span>
                  <span className={`modal-value ${statusConfig[selectedItem.status]?.class}`}>
                    {statusConfig[selectedItem.status]?.icon} {selectedItem.status}
                  </span>
                </div>
                <div className="modal-item">
                  <span className="modal-label">Duration</span>
                  <span className="modal-value">{selectedItem.duration}</span>
                </div>
                <div className="modal-item">
                  <span className="modal-label">Meetings</span>
                  <span className="modal-value highlight">{selectedItem.meetings}</span>
                </div>
                <div className="modal-item">
                  <span className="modal-label">Postponed</span>
                  <span className="modal-value">{selectedItem.postponed}</span>
                </div>
                <div className="modal-item full-width">
                  <span className="modal-label">Focus Area</span>
                  <p className="modal-description">{selectedItem.topic}</p>
                </div>
              </div>
            </>
          );
        case 'placements':
          return (
            <>
              <h3>Placement Details</h3>
              <div className="modal-grid">
                <div className="modal-item">
                  <span className="modal-label">Alumni</span>
                  <span className="modal-value highlight">{selectedItem.alumni}</span>
                </div>
                <div className="modal-item">
                  <span className="modal-label">Company</span>
                  <span className="modal-value highlight">{selectedItem.company}</span>
                </div>
                <div className="modal-item">
                  <span className="modal-label">Status</span>
                  <span className={`modal-value ${statusConfig[selectedItem.status]?.class}`}>
                    {statusConfig[selectedItem.status]?.icon} {selectedItem.status}
                  </span>
                </div>
                <div className="modal-item">
                  <span className="modal-label">Position</span>
                  <span className="modal-value">{selectedItem.position}</span>
                </div>
                <div className="modal-item">
                  <span className="modal-label">Package</span>
                  <span className="modal-value highlight">{selectedItem.package}</span>
                </div>
                <div className="modal-item">
                  <span className="modal-label">Location</span>
                  <span className="modal-value">{selectedItem.location}</span>
                </div>
                <div className="modal-item">
                  <span className="modal-label">Date</span>
                  <span className="modal-value">
                    {new Date(selectedItem.date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      year: 'numeric', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </>
          );
        default:
          return null;
      }
    };

    return (
      <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setSelectedItem(null)}>×</button>
          {getModalContent()}
          <div className="modal-actions">
            <button 
              className="modal-button secondary"
              onClick={() => setSelectedItem(null)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="alumni-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">NEC</div>
            <div>
              <h1>Alumni Association Dashboard</h1>
              <p className="subtitle">Empowering Connections, Inspiring Success</p>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <nav className="dashboard-tabs">
        <div className="tabs-container">
          {['webinars', 'mentorships', 'placements'].map(tab => (
            <button
              key={tab}
              className={`tab ${selectedTab === tab ? 'active' : ''}`}
              onClick={() => setSelectedTab(tab)}
            >
              <span className="tab-icon">
                {tab === 'webinars' ? '🎓' : tab === 'mentorships' ? '🤝' : '💼'}
              </span>
              <span className="tab-text">
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-container">
          {/* Dashboard Access Section */}
          <section className="dashboard-access-section">
            <div className="section-header">
              <h2>Management Portal</h2>
              <p>Access comprehensive management tools for each module</p>
            </div>
            {renderDashboardAccess()}
          </section>

          {/* Data Preview Section */}
          <section className="data-preview-section">
            <div className="section-header">
              <h2>Recent {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}</h2>
              <p>Click on any item to view detailed information</p>
            </div>
            {renderDataGrid()}
          </section>
        </div>
      </main>

      {/* Details Modal */}
      {renderDetailsModal()}
    </div>
  );
};

export default AlumniDashboard;