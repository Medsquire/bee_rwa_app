import React from 'react';
import { useRwa } from '../context/RwaContext';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  UserCheck, 
  UserPlus, 
  AlertTriangle, 
  PlusCircle, 
  Dumbbell, 
  CalendarCheck, 
  Bookmark, 
  Wallet, 
  Receipt, 
  ArrowLeftRight, 
  Megaphone, 
  Bell, 
  User, 
  Settings,
  ChevronRight,
  Shield,
  Home
} from 'lucide-react';

export const Sidebar = () => {
  const { 
    activeTab, 
    setActiveTab, 
    isSidebarOpen, 
    currentUser, 
    currentRoleKey,
    registrationRequests,
    complaints,
    maintenanceDues,
    announcements
  } = useRwa();

  // Badges
  const pendingApprovalsCount = registrationRequests.filter(r => r.status === 'Pending').length;
  const openComplaintsCount = complaints.filter(c => ['Submitted', 'Assigned', 'In Progress'].includes(c.status)).length;
  const overdueDuesCount = maintenanceDues.filter(d => d.status === 'Overdue').length;

  const navGroups = [
    {
      title: 'OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'register', label: 'New Resident Registration', icon: UserPlus }
      ]
    },
    {
      title: 'APARTMENTS & ACCESS',
      roleRestrict: ['president', 'vice_president', 'finance_manager'],
      items: [
        { id: 'apartments', label: 'Apartment Complexes', icon: Building2 },
        { id: 'residents', label: 'Resident Directory', icon: Users },
        { 
          id: 'approvals', 
          label: 'Registration Approvals', 
          icon: UserCheck, 
          badge: pendingApprovalsCount, 
          badgeColor: 'var(--warning)',
          roleRestrict: ['president'] 
        }
      ]
    },
    {
      title: 'COMPLAINTS & HELPDESK',
      items: [
        { 
          id: 'complaints', 
          label: 'Complaints Register', 
          icon: AlertTriangle, 
          badge: openComplaintsCount, 
          badgeColor: 'var(--electric-blue)' 
        },
        { id: 'submit-complaint', label: 'Submit Complaint', icon: PlusCircle }
      ]
    },
    {
      title: 'FACILITIES & SPORTS',
      items: [
        { id: 'facilities', label: 'Facilities & Status', icon: Dumbbell },
        { id: 'book-facility', label: 'Book a Slot', icon: CalendarCheck },
        { id: 'my-bookings', label: 'My Bookings', icon: Bookmark }
      ]
    },
    {
      title: 'FINANCE & ACCOUNTS',
      roleRestrict: ['president', 'finance_manager'],
      items: [
        { id: 'finance', label: 'Finance Dashboard', icon: Wallet },
        { 
          id: 'maintenance', 
          label: 'Maintenance Dues', 
          icon: Receipt,
          badge: overdueDuesCount,
          badgeColor: 'var(--error)'
        },
        { id: 'transactions', label: 'Ledger & Expenses', icon: ArrowLeftRight }
      ]
    },
    {
      title: 'COMMUNITY & SYSTEM',
      items: [
        { id: 'announcements', label: 'Announcements', icon: Megaphone },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'profile', label: 'My Profile', icon: User },
        { id: 'settings', label: 'System Settings', icon: Settings }
      ]
    }
  ];

  if (!isSidebarOpen) {
    return null;
  }

  return (
    <aside style={{
      width: '280px',
      backgroundColor: 'var(--sidebar-bg)',
      color: 'var(--sidebar-text)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      borderRight: '1px solid var(--border-color)',
      height: 'calc(100vh - 61px)',
      position: 'sticky',
      top: '61px',
      overflowY: 'auto'
    }}>
      {/* Current Role Identity Card in Sidebar */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(255, 255, 255, 0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'var(--grad-royal)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.875rem'
          }}>
            {currentUser.avatar}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ 
              fontWeight: 700, 
              fontSize: '0.875rem', 
              color: '#FFFFFF', 
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              whiteSpace: 'nowrap' 
            }}>
              {currentUser.name}
            </div>
            <div style={{ 
              fontSize: '0.6875rem', 
              color: 'var(--cyan-blue)', 
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Shield size={11} /> {currentUser.roleTitle.split(' ')[0]}
            </div>
          </div>
        </div>

        <div style={{ 
          marginTop: '10px', 
          fontSize: '0.6875rem', 
          color: 'var(--sidebar-text-muted)',
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
          padding: '6px 10px',
          borderRadius: '6px'
        }}>
          <span>{currentUser.apartment.split(' ')[0]} Apt</span>
          <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{currentUser.flatNumber}</span>
        </div>
      </div>

      {/* Navigation Sections */}
      <div style={{ padding: '16px 12px', flex: 1 }}>
        {navGroups.map((group, gIdx) => {
          // Check role restrictions for group
          if (group.roleRestrict && !group.roleRestrict.includes(currentRoleKey)) {
            return null;
          }

          return (
            <div key={gIdx} style={{ marginBottom: '20px' }}>
              <div style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                color: 'var(--sidebar-text-muted)',
                letterSpacing: '0.08em',
                padding: '0 12px',
                marginBottom: '8px'
              }}>
                {group.title}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {group.items.map(item => {
                  if (item.roleRestrict && !item.roleRestrict.includes(currentRoleKey)) {
                    return null;
                  }

                  const isActive = activeTab === item.id;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '9px 12px',
                        borderRadius: '8px',
                        border: 'none',
                        background: isActive ? 'var(--sidebar-active)' : 'transparent',
                        color: isActive ? '#FFFFFF' : 'var(--sidebar-text)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8125rem',
                        fontWeight: isActive ? 600 : 500,
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={e => {
                        if (!isActive) e.currentTarget.style.backgroundColor = 'var(--sidebar-hover)';
                      }}
                      onMouseLeave={e => {
                        if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Icon size={17} style={{ color: isActive ? '#FFFFFF' : 'var(--sidebar-text-muted)' }} />
                        <span>{item.label}</span>
                      </div>

                      {item.badge !== undefined && item.badge > 0 && (
                        <span style={{
                          backgroundColor: item.badgeColor || 'var(--electric-blue)',
                          color: '#FFFFFF',
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          padding: '2px 7px',
                          borderRadius: '10px',
                          lineHeight: 1
                        }}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer */}
      <div style={{
        padding: '14px 16px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        fontSize: '0.6875rem',
        color: 'var(--sidebar-text-muted)',
        textAlign: 'center'
      }}>
        <span>BEE PROPERTY RWA v1.0</span>
        <div style={{ color: 'var(--cyan-blue)', marginTop: '2px' }}>
          Zivion Management System
        </div>
      </div>
    </aside>
  );
};
