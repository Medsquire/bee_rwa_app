import React from 'react';
import { useRwa } from '../context/RwaContext';
import { Shield, Sparkles, AlertCircle, Info, ChevronRight, CheckCircle } from 'lucide-react';

export const RoleBanner = () => {
  const { currentRoleKey, currentUser, roles, switchRole, setActiveTab } = useRwa();

  const roleDescriptions = {
    president: {
      role: 'President (Executive Head)',
      summary: 'Highest executive authority with full oversight across Golden Apartment (Golden Tower 1, 2, and 3).',
      capabilities: 'Approve/reject resident registrations, assign roles, monitor community complaints, inspect facility bookings, publish broadcasts, and oversee treasury accounts.',
      badgeBg: '#1E3A8A',
      accent: '#22D3EE'
    },
    vice_president: {
      role: 'Vice President (Operations & Facilities)',
      summary: 'Field operational commander responsible for swift complaints resolution and facilities uptime.',
      capabilities: 'Assign complaints to technical staff (Otis, Electrician, Plumber), track resolution milestones, toggle facility maintenance closures, and broadcast operational alerts.',
      badgeBg: '#065F46',
      accent: '#10B981'
    },
  };

  const currentInfo = roleDescriptions[currentRoleKey] || roleDescriptions.president;

  return (
    <div style={{
      marginBottom: '24px',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      padding: '16px 20px',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '16px'
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1, minWidth: '280px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          backgroundColor: currentInfo.badgeBg,
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}>
          <Shield size={22} style={{ color: currentInfo.accent }} />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
              Viewing As: {currentInfo.role}
            </span>
            <span className="badge" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--electric-blue)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
              User: {currentUser.name} ({currentUser.apartment.split(' ')[0]} - {currentUser.flatNumber})
            </span>
            <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Info size={11} /> Mock Demo State
            </span>
          </div>

          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
            <strong style={{ color: 'var(--text-primary)' }}>Privileges: </strong> 
            {currentInfo.capabilities}
          </p>
        </div>
      </div>

      {/* Quick shortcuts based on role */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {currentRoleKey === 'president' && (
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => setActiveTab('approvals')}
          >
            Review Registration Queue
          </button>
        )}
        {currentRoleKey === 'vice_president' && (
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => setActiveTab('complaints')}
          >
            Dispatch Complaints
          </button>
        )}
      </div>
    </div>
  );
};
