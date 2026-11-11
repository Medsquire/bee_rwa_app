import React from 'react';
import { useRwa } from '../context/RwaContext';
import { ApartmentBadge } from '../components/CommonUI';
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Car, 
  ShieldCheck, 
  Key, 
  Calendar, 
  Clock, 
  CheckCircle2,
  FileText
} from 'lucide-react';

export const UserProfile = () => {
  const { currentUser, currentRoleKey, switchRole, roles } = useRwa();

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>User Profile & Association Membership</h1>
        
      </div>

      {/* Profile Overview Card */}
      <div className="glass-card" style={{ borderTop: '4px solid var(--electric-blue)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'var(--grad-royal)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            fontWeight: 800,
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.35)'
          }}>
            {currentUser.avatar}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{currentUser.name}</h2>
              <span className="badge badge-indigo">{currentUser.roleTitle}</span>
              <span className="badge badge-success">Active Member</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Member ID: RWA-2026-M{currentUser.flatNumber.replace('-', '')} 
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid-cols-2" style={{ gap: '16px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: 'var(--bg-hover)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>
              Residence & Property Allotment
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8125rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Apartment Complex:</span>
                <strong>{currentUser.apartment}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Flat / Unit No:</span>
                <strong style={{ color: 'var(--electric-blue)' }}>{currentUser.flatNumber}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Resident Status:</span>
                <strong>{currentUser.residentType}</strong>
              </div>
              {currentUser.flatSize && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Carpet Area:</span>
                  <strong>{currentUser.flatSize}</strong>
                </div>
              )}
              {currentUser.landlordName && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Flat Owner / Landlord:</span>
                  <strong>{currentUser.landlordName}</strong>
                </div>
              )}
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--bg-hover)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>
              Contact & Parking Allocations
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8125rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Registered Email:</span>
                <strong>{currentUser.email}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Phone Number:</span>
                <strong>{currentUser.phone}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Parking Bay Allotted:</span>
                <strong>{currentUser.parkingSlot || 'Basement Bay 14'}</strong>
              </div>
              {currentUser.term && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Committee Tenure:</span>
                  <strong>{currentUser.term}</strong>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Assigned Permissions */}
        <div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '10px' }}>
            System Permissions & Feature Access
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {currentUser.permissions.map((p, idx) => (
              <span key={idx} className="badge badge-cyan" style={{ padding: '6px 12px' }}>
                <ShieldCheck size={12} /> {p.replace('_', ' ').toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Demo Switcher Section */}
      <div className="glass-card">
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '4px' }}>
          Evaluate as Another Role
        </h3>
       

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          {Object.entries(roles).map(([k, r]) => {
            const isCurrent = currentRoleKey === k;
            return (
              <div
                key={k}
                onClick={() => switchRole(k)}
                style={{
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  border: isCurrent ? '2px solid var(--electric-blue)' : '1px solid var(--border-color)',
                  backgroundColor: isCurrent ? 'rgba(59, 130, 246, 0.08)' : 'var(--bg-elevated)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--electric-blue)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.75rem'
                }}>
                  {r.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{r.name.split(' ')[0]}</div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>{r.roleTitle.split(' ')[0]}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
