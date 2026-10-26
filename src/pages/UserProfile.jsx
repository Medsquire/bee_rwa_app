import React, { useState } from 'react';
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
  FileText,
  Edit3,
  Save,
  X
} from 'lucide-react';

export const UserProfile = () => {
  const { currentUser, currentRoleKey, switchRole, roles, showToast } = useRwa();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    email: currentUser.email || '',
    phone: currentUser.phone || '',
    flatNumber: currentUser.flatNumber || '',
    parkingSlot: currentUser.parkingSlot || 'Basement Bay 14'
  });

  const handleSave = (e) => {
    e.preventDefault();
    currentUser.name = formData.name;
    currentUser.email = formData.email;
    currentUser.phone = formData.phone;
    currentUser.flatNumber = formData.flatNumber;
    currentUser.parkingSlot = formData.parkingSlot;
    if (showToast) {
      showToast('Profile information updated successfully!', 'success');
    }
    setIsEditing(false);
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>User Profile & Association Membership</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Registered resident credentials, apartment allotment, parking tags, and role governance privileges
          </p>
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => {
            if (!isEditing) {
              setFormData({
                name: currentUser.name || '',
                email: currentUser.email || '',
                phone: currentUser.phone || '',
                flatNumber: currentUser.flatNumber || '',
                parkingSlot: currentUser.parkingSlot || 'Basement Bay 14'
              });
            }
            setIsEditing(!isEditing);
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}
        >
          {isEditing ? <><X size={15} /> Cancel</> : <><Edit3 size={15} color="var(--electric-blue)" /> Edit Profile Info</>}
        </button>
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
              {isEditing ? (
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  style={{ fontSize: '1.25rem', fontWeight: 800, maxWidth: '280px', padding: '4px 10px' }}
                  required
                />
              ) : (
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>{currentUser.name}</h2>
              )}
              <span className="badge badge-indigo">{currentUser.roleTitle}</span>
              <span className="badge badge-success">Active Member</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px', margin: 0 }}>
              Member ID: RWA-2026-M{currentUser.flatNumber.replace('-', '')} • Enclave Resident since 2023
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Apartment Complex:</span>
                <strong>{currentUser.apartment}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Flat / Unit No:</span>
                {isEditing ? (
                  <input
                    type="text"
                    className="form-input"
                    value={formData.flatNumber}
                    onChange={e => setFormData({ ...formData, flatNumber: e.target.value })}
                    style={{ maxWidth: '140px', padding: '2px 8px', fontSize: '0.8125rem', fontWeight: 700 }}
                  />
                ) : (
                  <strong style={{ color: 'var(--electric-blue)' }}>{currentUser.flatNumber}</strong>
                )}
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Registered Email:</span>
                {isEditing ? (
                  <input
                    type="email"
                    className="form-input"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    style={{ maxWidth: '220px', padding: '2px 8px', fontSize: '0.8125rem' }}
                  />
                ) : (
                  <strong>{currentUser.email}</strong>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Phone Number:</span>
                {isEditing ? (
                  <input
                    type="tel"
                    className="form-input"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    style={{ maxWidth: '160px', padding: '2px 8px', fontSize: '0.8125rem' }}
                  />
                ) : (
                  <strong>{currentUser.phone}</strong>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Parking Bay Allotted:</span>
                {isEditing ? (
                  <input
                    type="text"
                    className="form-input"
                    value={formData.parkingSlot}
                    onChange={e => setFormData({ ...formData, parkingSlot: e.target.value })}
                    style={{ maxWidth: '180px', padding: '2px 8px', fontSize: '0.8125rem' }}
                  />
                ) : (
                  <strong>{currentUser.parkingSlot || 'Basement Bay 14'}</strong>
                )}
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

        {/* Edit Action Save / Cancel */}
        {isEditing && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
            <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Save size={14} /> Save Profile Changes
            </button>
          </div>
        )}

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
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Click any persona below to instantaneously experience the application through their viewpoint:
        </p>

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

export default UserProfile;
