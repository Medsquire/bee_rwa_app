import React, { useState } from 'react';
import { useRwa } from '../context/RwaContext';
import { 
  Building2, 
  Bell, 
  Sun, 
  Moon, 
  Menu, 
  Check, 
  User, 
  ShieldCheck, 
  ChevronDown,
  Sparkles,
  RefreshCw,
  LogOut
} from 'lucide-react';

export const Header = () => {
  const { 
    currentUser, 
    currentRoleKey, 
    switchRole, 
    roles, 
    selectedApartment, 
    setSelectedApartment,
    apartments,
    theme, 
    toggleTheme,
    isSidebarOpen,
    setIsSidebarOpen,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setActiveTab,
    resetAllData
  } = useRwa();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const unreadNotifications = notifications.filter(n => !n.read);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      backgroundColor: 'var(--header-bg)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      padding: '10px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px'
    }}>
      {/* Left: Hamburger & Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <button 
          className="btn btn-secondary btn-icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle Navigation Sidebar"
          style={{ width: '36px', height: '36px' }}
        >
          <Menu size={18} />
        </button>

        <div 
          onClick={() => setActiveTab('dashboard')} 
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #1D4ED8 0%, #22D3EE 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 4px 12px rgba(34, 211, 238, 0.3)'
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.125rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                BEE PROPERTY
              </span>
              <span style={{ 
                fontSize: '0.6875rem', 
                fontWeight: 700, 
                backgroundColor: 'rgba(59, 130, 246, 0.15)', 
                color: 'var(--electric-blue)', 
                padding: '2px 6px', 
                borderRadius: '4px',
                letterSpacing: '0.05em'
              }}>
                RWA PORTAL
              </span>
            </div>
            <p style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              Golden • Silver • Diamond Enclave
            </p>
          </div>
        </div>
      </div>

      {/* Middle: Apartment Scope Filter & Role Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        {/* Apartment Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Building2 size={13} /> Complex:
          </span>
          <select 
            value={selectedApartment} 
            onChange={(e) => setSelectedApartment(e.target.value)}
            className="form-control"
            style={{ 
              padding: '6px 12px', 
              fontSize: '0.8125rem', 
              fontWeight: 600,
              borderRadius: 'var(--radius-md)', 
              width: 'auto',
              minWidth: '160px',
              cursor: 'pointer',
              backgroundColor: 'var(--bg-elevated)'
            }}
          >
            <option value="All">All 3 Apartments (Unified)</option>
            {apartments.map(apt => (
              <option key={apt.id} value={apt.name}>
                {apt.name} ({apt.towerCode})
              </option>
            ))}
          </select>
        </div>

        {/* Demo Role Switcher Bar */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          backgroundColor: 'var(--bg-hover)', 
          padding: '4px', 
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-color)',
          gap: '2px'
        }}>
          {Object.entries(roles).map(([key, roleObj]) => {
            const isActive = currentRoleKey === key;
            return (
              <button
                key={key}
                onClick={() => switchRole(key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '5px 10px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  fontSize: '0.75rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  backgroundColor: isActive ? 'var(--electric-blue)' : 'transparent',
                  color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                  boxShadow: isActive ? '0 2px 6px rgba(59, 130, 246, 0.4)' : 'none'
                }}
                title={`Switch demo view to ${roleObj.roleTitle}`}
              >
                <span style={{ 
                  width: '18px', 
                  height: '18px', 
                  borderRadius: '50%', 
                  backgroundColor: isActive ? '#FFFFFF' : 'rgba(0,0,0,0.1)', 
                  color: isActive ? 'var(--electric-blue)' : 'var(--text-secondary)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '0.625rem',
                  fontWeight: 800
                }}>
                  {roleObj.avatar}
                </span>
                <span>{roleObj.roleKey.replace('_', ' ').toUpperCase()}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Notifications, Theme, Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Reset Demo Data Button */}
        <button
          className="btn btn-secondary btn-icon"
          onClick={() => {
            if (window.confirm('Reset all demo state (complaints, approvals, bookings, expenses) back to initial default?')) {
              resetAllData();
            }
          }}
          title="Reset Demo Data to Initial State"
          style={{ width: '36px', height: '36px' }}
        >
          <RefreshCw size={16} />
        </button>

        {/* Theme Toggle */}
        <button 
          className="btn btn-secondary btn-icon"
          onClick={toggleTheme}
          aria-label="Toggle Color Theme"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          style={{ width: '36px', height: '36px' }}
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        {/* Notifications Dropdown Toggle */}
        <div style={{ position: 'relative' }}>
          <button 
            className="btn btn-secondary btn-icon"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            style={{ position: 'relative', width: '36px', height: '36px' }}
          >
            <Bell size={16} />
            {unreadNotifications.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-3px',
                right: '-3px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: 'var(--error)',
                color: '#FFFFFF',
                fontSize: '0.625rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 0 2px var(--header-bg)'
              }}>
                {unreadNotifications.length}
              </span>
            )}
          </button>

          {/* Notifications Panel */}
          {showNotifications && (
            <div style={{
              position: 'absolute',
              top: '46px',
              right: 0,
              width: '360px',
              backgroundColor: 'var(--bg-card-solid)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 100,
              overflow: 'hidden',
              animation: 'modalSlideUp 0.2s ease-out'
            }}>
              <div style={{
                padding: '12px 16px',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>Notifications</span>
                {unreadNotifications.length > 0 && (
                  <button 
                    onClick={markAllNotificationsRead} 
                    style={{ background: 'none', border: 'none', color: 'var(--electric-blue)', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
                    No notifications
                  </div>
                ) : (
                  notifications.slice(0, 6).map(notif => (
                    <div 
                      key={notif.id}
                      onClick={() => {
                        markNotificationRead(notif.id);
                        if (notif.actionTab) setActiveTab(notif.actionTab);
                        setShowNotifications(false);
                      }}
                      style={{
                        padding: '12px 16px',
                        borderBottom: '1px solid var(--border-color)',
                        backgroundColor: notif.read ? 'transparent' : 'rgba(59, 130, 246, 0.06)',
                        cursor: 'pointer',
                        transition: 'background-color 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                        <span style={{ fontWeight: notif.read ? 500 : 700, fontSize: '0.8125rem', color: 'var(--text-primary)' }}>
                          {notif.title}
                        </span>
                        <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{notif.timestamp}</span>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                        {notif.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
              <div style={{ padding: '8px 16px', textAlign: 'center', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-hover)' }}>
                <button 
                  onClick={() => { setActiveTab('notifications'); setShowNotifications(false); }}
                  style={{ background: 'none', border: 'none', color: 'var(--electric-blue)', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  View All Notifications →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <div 
          onClick={() => setActiveTab('profile')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 8px 4px 4px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-elevated)',
            cursor: 'pointer'
          }}
          title="Click to view full user profile"
        >
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'var(--grad-royal)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.6875rem',
            fontWeight: 800
          }}>
            {currentUser.avatar}
          </div>
          <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {currentUser.name.split(' ')[0]}
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--electric-blue)', fontWeight: 600 }}>
              {currentUser.flatNumber.split(' ')[0]}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
