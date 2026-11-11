import React from 'react';
import { useRwa } from '../context/RwaContext';
import logoImg from '../assets/logo.jpg';
import {
  LayoutDashboard,
  Building2,
  AlertTriangle,
  Megaphone,
  Home,
  Briefcase,
  Users,
  ShieldCheck,
  UserCheck,
  LogOut
} from 'lucide-react';

export const Sidebar = () => {
  const {
    activeTab,
    setActiveTab,
    currentUser,
    complaints,
    registrationRequests,
    logout
  } = useRwa();

  const openComplaintsCount = (complaints || []).filter(c => ['Submitted', 'Assigned', 'In Progress'].includes(c.status)).length;
  const pendingApprovalsCount = (registrationRequests || []).filter(r => r.status === 'Pending').length;

  const isTabActive = (itemId) => {
    if (activeTab === itemId) return true;
    if (itemId === 'residence' && (activeTab === 'residents' || activeTab === 'residence')) return true;
    if (itemId === 'complaints' && (activeTab === 'complaint' || activeTab === 'complaints')) return true;
    if (itemId === 'approvals' && (activeTab === 'approvals' || activeTab === 'approval')) return true;
    if (itemId === 'agency' && (activeTab === 'agency' || activeTab === 'agencies')) return true;
    if ((itemId === 'users' || itemId === 'employee') && (activeTab === 'userss' || activeTab === 'users' || activeTab === 'employee' || activeTab === 'employees')) return true;
    if (itemId === 'announcements' && (activeTab === 'annouments' || activeTab === 'announcements')) return true;
    return false;
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'residence', label: 'Residence', icon: Home },
    {
      id: 'complaints',
      label: 'Complaints',
      icon: AlertTriangle,
      badge: openComplaintsCount,
      badgeColor: '#2563EB'
    },
    {
      id: 'approvals',
      label: 'Approvals',
      icon: UserCheck,
      badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : undefined,
      badgeColor: '#F59E0B'
    },
    { id: 'agency', label: 'Agencies', icon: ShieldCheck },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'announcements', label: 'Announcements', icon: Megaphone }
  ];

  return (
    <aside style={{
      width: '260px',
      backgroundColor: '#0B1B3D',
      color: '#CBD5E1',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      borderRight: '1px solid rgba(255, 255, 255, 0.08)',
      height: '100vh',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      {/* Brand Header matching parallel application */}
      <div style={{
        padding: '20px 22px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
      }}>
        {/* BEE PROPERTY Website Logo */}
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '9px',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
          padding: '2px',
          flexShrink: 0
        }}>
          <img 
            src={logoImg} 
            alt="BEE PROPERTY" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain' 
            }} 
          />
        </div>

        <div>
          <div style={{ fontWeight: 900, fontSize: '1.125rem', letterSpacing: '-0.02em', color: '#FFFFFF', lineHeight: 1.1 }}>
            Bee Property
          </div>
          <div style={{ fontSize: '0.625rem', fontWeight: 700, color: '#93C5FD', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '2px' }}>
            RWA PORTAL
          </div>
        </div>
      </div>

      {/* Navigation section */}
      <div style={{ padding: '20px 14px', flex: 1, overflowY: 'auto' }}>
        <div style={{
          fontSize: '0.6875rem',
          fontWeight: 700,
          color: '#64748B',
          letterSpacing: '0.08em',
          padding: '0 10px',
          marginBottom: '10px',
          textTransform: 'uppercase'
        }}>
          NAVIGATION
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map(item => {
            const isActive = isTabActive(item.id);
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: isActive ? '#2563EB' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#CBD5E1',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 500,
                  transition: 'all 0.15s ease',
                  width: '100%'
                }}
                onMouseEnter={e => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                }}
                onMouseLeave={e => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                  <Icon size={18} strokeWidth={1.5} style={{ color: isActive ? '#FFFFFF' : '#94A3B8', flexShrink: 0 }} />
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.label}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span style={{
                      backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : '#2563EB',
                      color: '#FFFFFF',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      minWidth: '20px',
                      height: '20px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0 6px',
                      borderRadius: '9999px',
                      lineHeight: 1
                    }}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF'
                    }} />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Profile & Logout matching parallel application */}
      <div style={{
        padding: '16px 14px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {/* User profile card */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 10px',
          borderRadius: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#2563EB',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.75rem',
            flexShrink: 0
          }}>
            {currentUser.avatar || 'JD'}
          </div>

          <div style={{ flex: 1, minWidth: 0, lineHeight: 1.2 }}>
            <div style={{
              fontWeight: 700,
              fontSize: '0.8125rem',
              color: '#FFFFFF',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {currentUser.name}
            </div>
            <div style={{
              fontSize: '0.6875rem',
              color: '#94A3B8',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {currentUser.email}
            </div>
          </div>

          <span style={{
            fontSize: '0.5625rem',
            fontWeight: 800,
            backgroundColor: '#1D4ED8',
            color: '#FFFFFF',
            padding: '2px 5px',
            borderRadius: '4px',
            letterSpacing: '0.05em'
          }}>
            {currentUser.roleKey === 'president' ? 'ADMIN' : 'VP'}
          </span>
        </div>

        {/* Dedicated Red Logout Button matching parallel application */}
        <button
          onClick={logout}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '9px 12px',
            borderRadius: '8px',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            color: '#F87171',
            cursor: 'pointer',
            fontSize: '0.8125rem',
            fontWeight: 600,
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.18)';
            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.6)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.08)';
            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.35)';
          }}
        >
          <LogOut size={15} strokeWidth={1.5} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
