import React from 'react';
import { useRwa } from '../context/RwaContext';
import { Moon, Sun } from 'lucide-react';

export const Header = () => {
  const {
    currentUser,
    activeTab,
    setActiveTab,
    theme,
    toggleTheme
  } = useRwa();

  const tabTitles = {
    'dashboard': 'Dashboard',
    'property': 'Property',
    'apartments': 'Property',
    'complaints': 'Complaint',
    'complaint': 'Complaint',
    'submit-complaint': 'Submit Complaint',
    'residence': 'Residence (Tower & Floor & Flat)',
    'residents': 'Residence (Tower & Floor & Flat)',
    'announcements': 'Announcements',
    'annouments': 'Announcements',
    'users': 'Executive Users (President & Vice President)',
    'userss': 'Executive Users (President & Vice President)',
    'approvals': 'Registration Approvals',
    'agency': 'Agencies & Assigned Contractors',
    'agencies': 'Agencies & Assigned Contractors',
    'profile': 'My Profile'
  };

  const currentTitle = tabTitles[activeTab] || 'Dashboard';

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      backgroundColor: '#0B1B3D',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '14px 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      color: '#FFFFFF'
    }}>
      {/* Left: Breadcrumb matching parallel app */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem' }}>
        <span style={{ color: 'rgba(255, 255, 255, 0.55)', fontWeight: 500 }}>
          BEE Property Management
        </span>
        <span style={{ color: 'rgba(255, 255, 255, 0.35)' }}>/</span>
        <strong style={{ color: '#FFFFFF', fontWeight: 700, letterSpacing: '-0.01em' }}>
          {currentTitle}
        </strong>
      </div>

      {/* Right: Theme toggle & User profile pill */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Theme toggle circle button */}
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: '#FDE047',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.14)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
        >
          {theme === 'light' ? <Moon size={15} color="#93C5FD" /> : <Sun size={15} color="#FDE047" />}
        </button>

        {/* User Profile Pill matching parallel app */}
        <div
          onClick={() => setActiveTab('profile')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '4px 12px 4px 6px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255, 255, 255, 0.07)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.11)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.07)'}
          title="User Profile"
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#2563EB',
            border: '2px solid rgba(255, 255, 255, 0.25)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.75rem'
          }}>
            {currentUser.avatar || 'JD'}
          </div>

          <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#FFFFFF' }}>
              {currentUser.name}
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'rgba(255, 255, 255, 0.55)' }}>
              {currentUser.email}
            </div>
          </div>

          <span style={{
            fontSize: '0.5625rem',
            fontWeight: 800,
            backgroundColor: '#1D4ED8',
            color: '#FFFFFF',
            padding: '2px 6px',
            borderRadius: '4px',
            letterSpacing: '0.05em',
            marginLeft: '4px'
          }}>
            {currentUser.roleKey === 'president' ? 'ADMIN' : 'VP'}
          </span>
        </div>
      </div>
    </header>
  );
};
