import React from 'react';
import '../styles/App.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="logo">ResumeEcosystem</h1>
        <nav className="nav-menu">
          <button className="nav-button">Dashboard</button>
          <button className="nav-button active">Resume Builder</button>
          <button className="nav-button">Integrations</button>
          <button className="nav-button">Profile</button>
        </nav>
        <div className="user-actions">
          <button className="btn-secondary">Save Draft</button>
          <button className="btn-primary">Export PDF</button>
        </div>
      </div>
    </header>
  );
};

export default Header;