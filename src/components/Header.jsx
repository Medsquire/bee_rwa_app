import React, { useState, useEffect, useRef } from 'react';
import { useRwa } from '../context/RwaContext';
import { 
  Moon, 
  Sun, 
  Bell, 
  Check, 
  Wrench, 
  ShieldCheck, 
  UserCheck, 
  Megaphone, 
  Calendar, 
  CheckCircle2 
} from 'lucide-react';

export const Header = () => {
  const {
    currentUser,
    activeTab,
    setActiveTab,
    theme,
    toggleTheme,
    notifications,
    markNotificationRead,
    markAllNotificationsRead
  } = useRwa();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef(null);

  const unreadCount = (notifications || []).filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
    };
    if (isNotifOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNotifOpen]);

  const tabTitles = {
    'dashboard': 'Dashboard',
    'property': 'Property',
    'apartments': 'Property',
    'complaints': 'Complaints',
    'complaint': 'Complaints',
    'submit-complaint': 'Submit Complaint',
    'residence': 'Residence',
    'residents': 'Residence',
    'announcements': 'Announcements',
    'annouments': 'Announcements',
    'users': 'Users',
    'userss': 'Users',
    'approvals': 'Approvals',
    'agency': 'Agencies',
    'agencies': 'Agencies',
    'notifications': 'Notifications',
    'profile': 'Profile'
  };

  const currentTitle = tabTitles[activeTab] || 'Dashboard';

  const getNotifIcon = (type) => {
    switch (type) {
      case 'approval':
        return <UserCheck size={14} strokeWidth={1.5} color="#D97706" />;
      case 'complaint':
        return <Wrench size={14} strokeWidth={1.5} color="#2563EB" />;
      case 'facility':
        return <Calendar size={14} strokeWidth={1.5} color="#10B981" />;
      case 'announcement':
        return <Megaphone size={14} strokeWidth={1.5} color="#8B5CF6" />;
      default:
        return <Bell size={14} strokeWidth={1.5} color="#3B82F6" />;
    }
  };

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
      {/* Left: Page Title only (Logo removed as requested) */}
      <div>
        <h2 style={{
          color: '#FFFFFF',
          fontSize: '1.25rem',
          fontWeight: 600,
          margin: 0,
          letterSpacing: '-0.01em',
          lineHeight: 1.2
        }}>
          {currentTitle}
        </h2>
      </div>

      {/* Right: Dark/Light Mode Toggle | Notification Bell | User Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* 1. Theme toggle circle button */}
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          style={{
            width: '36px',
            height: '36px',
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
          {theme === 'light' ? <Moon size={16} strokeWidth={1.5} color="#93C5FD" /> : <Sun size={16} strokeWidth={1.5} color="#FDE047" />}
        </button>

        {/* 2. Notification Bell Icon with Dropdown */}
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setIsNotifOpen(prev => !prev)}
            title="Notifications"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: isNotifOpen ? 'rgba(59, 130, 246, 0.25)' : 'rgba(255, 255, 255, 0.08)',
              border: isNotifOpen ? '1px solid #3B82F6' : '1px solid rgba(255, 255, 255, 0.12)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={e => {
              if (!isNotifOpen) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.14)';
            }}
            onMouseLeave={e => {
              if (!isNotifOpen) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
            }}
          >
            <Bell size={16} strokeWidth={1.5} color="#E2E8F0" />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                minWidth: '17px',
                height: '17px',
                borderRadius: '9999px',
                backgroundColor: '#EF4444',
                color: '#FFFFFF',
                fontSize: '0.625rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 4px',
                border: '2px solid #0B1B3D',
                lineHeight: 1
              }}>
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Dropdown Panel */}
          {isNotifOpen && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 10px)',
              right: 0,
              width: '360px',
              maxHeight: '460px',
              backgroundColor: 'var(--card-bg, #FFFFFF)',
              color: 'var(--text-primary)',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.28)',
              zIndex: 100,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              {/* Header */}
              <div style={{
                padding: '12px 16px',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'var(--bg-hover)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Notifications
                  </span>
                  {unreadCount > 0 && (
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      backgroundColor: 'rgba(37, 99, 235, 0.15)',
                      color: 'var(--electric-blue)',
                      padding: '2px 7px',
                      borderRadius: '10px'
                    }}>
                      {unreadCount} unread
                    </span>
                  )}
                </div>

                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#2563EB',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: 0
                    }}
                  >
                    <Check size={12} strokeWidth={1.5} /> Mark All Read
                  </button>
                )}
              </div>

              {/* Scrollable List */}
              <div style={{
                overflowY: 'auto',
                maxHeight: '320px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {(notifications || []).length === 0 ? (
                  <div style={{
                    padding: '32px 16px',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '0.8rem'
                  }}>
                    No notifications
                  </div>
                ) : (
                  (notifications || []).slice(0, 8).map(notif => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        markNotificationRead(notif.id);
                        if (notif.actionTab) setActiveTab(notif.actionTab);
                        setIsNotifOpen(false);
                      }}
                      style={{
                        padding: '11px 16px',
                        borderBottom: '1px solid var(--border-color)',
                        backgroundColor: notif.read ? 'transparent' : 'rgba(59, 130, 246, 0.05)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        transition: 'background-color 0.12s ease'
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = notif.read ? 'transparent' : 'rgba(59, 130, 246, 0.05)';
                      }}
                    >
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        backgroundColor: 'var(--bg-hover)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}>
                        {getNotifIcon(notif.type)}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: '0.78rem',
                          fontWeight: notif.read ? 600 : 750,
                          color: 'var(--text-primary)',
                          lineHeight: 1.3,
                          marginBottom: '2px'
                        }}>
                          {notif.title}
                        </div>
                        <div style={{
                          fontSize: '0.71rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.35,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {notif.message}
                        </div>
                        <div style={{
                          fontSize: '0.65rem',
                          color: 'var(--text-muted)',
                          marginTop: '4px'
                        }}>
                          {notif.timestamp}
                        </div>
                      </div>

                      {!notif.read && (
                        <span style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: '#2563EB',
                          flexShrink: 0,
                          marginTop: '6px'
                        }} />
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div style={{
                padding: '10px 16px',
                borderTop: '1px solid var(--border-color)',
                textAlign: 'center',
                backgroundColor: 'var(--card-bg, #FFFFFF)'
              }}>
                <button
                  onClick={() => {
                    setActiveTab('notifications');
                    setIsNotifOpen(false);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#2563EB',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  View All Notifications →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 3. User Profile Pill */}
        <div
          onClick={() => setActiveTab('profile')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 10px 4px 5px',
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
            width: '28px',
            height: '28px',
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

          <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1 }}>
            {currentUser.name}
          </div>

          <span style={{
            fontSize: '0.5625rem',
            fontWeight: 800,
            backgroundColor: '#1D4ED8',
            color: '#FFFFFF',
            padding: '2px 6px',
            borderRadius: '4px',
            letterSpacing: '0.05em',
            marginLeft: '2px'
          }}>
            {currentUser.roleKey === 'president' ? 'ADMIN' : 'VP'}
          </span>
        </div>
      </div>
    </header>
  );
};
