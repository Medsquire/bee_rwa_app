import React, { useState } from 'react';
import { useRwa } from '../context/RwaContext';
import { 
  Bell, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Calendar, 
  Receipt, 
  UserCheck, 
  Check, 
  Trash2,
  ExternalLink
} from 'lucide-react';

export const NotificationsPage = () => {
  const { 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead, 
    setActiveTab, 
    showToast 
  } = useRwa();

  const [filterType, setFilterType] = useState('All');

  const filteredNotifs = notifications.filter(n => {
    if (filterType === 'Unread') return !n.read;
    if (filterType === 'Read') return n.read;
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'approval': return UserCheck;
      case 'complaint': return AlertTriangle;
      case 'facility': return Calendar;
      case 'finance': return Receipt;
      default: return Bell;
    }
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Notifications Center</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            System alerts, complaint progress milestones, dues reminders, and committee updates
          </p>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={markAllNotificationsRead}>
          <Check size={14} /> Mark All as Read
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {['All', 'Unread', 'Read'].map(st => (
          <button
            key={st}
            onClick={() => setFilterType(st)}
            className={`btn btn-sm ${filterType === st ? 'btn-primary' : 'btn-secondary'}`}
          >
            {st} ({st === 'All' ? notifications.length : notifications.filter(n => st === 'Unread' ? !n.read : n.read).length})
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        {filteredNotifs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--text-secondary)' }}>
            <Bell size={36} style={{ color: 'var(--text-muted)', margin: '0 auto 8px' }} />
            <h4 style={{ fontSize: '1.125rem', fontWeight: 600 }}>No Notifications</h4>
            <p style={{ fontSize: '0.875rem', marginTop: '2px' }}>You are completely caught up!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filteredNotifs.map(notif => {
              const Icon = getIcon(notif.type);
              return (
                <div
                  key={notif.id}
                  style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid var(--border-color)',
                    backgroundColor: notif.read ? 'transparent' : 'rgba(59, 130, 246, 0.05)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '16px',
                    transition: 'background-color 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      backgroundColor: notif.read ? 'var(--bg-hover)' : 'rgba(59, 130, 246, 0.15)',
                      color: notif.read ? 'var(--text-muted)' : 'var(--electric-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={18} />
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: notif.read ? 600 : 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                          {notif.title}
                        </span>
                        {!notif.read && (
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--electric-blue)' }} />
                        )}
                      </div>

                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                        {notif.message}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                        <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={11} /> {notif.timestamp}
                        </span>

                        {notif.actionTab && (
                          <button
                            onClick={() => {
                              markNotificationRead(notif.id);
                              setActiveTab(notif.actionTab);
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'var(--electric-blue)',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '3px'
                            }}
                          >
                            Open Details <ExternalLink size={11} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {!notif.read && (
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '3px 8px', fontSize: '0.6875rem' }}
                      onClick={() => markNotificationRead(notif.id)}
                    >
                      Mark read
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
