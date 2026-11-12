import React, { useState } from 'react';
import { useRwa } from '../context/RwaContext';
import { StatusPill, ApartmentBadge, Modal } from '../components/CommonUI';
import { 
  Dumbbell, 
  Trees, 
  Trophy, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2, 
  Wrench, 
  AlertCircle,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export const FacilityOverview = () => {
  const { 
    facilities, 
    toggleFacilityStatus, 
    currentRoleKey, 
    currentUser, 
    bookings,
    setActiveTab 
  } = useRwa();

  const [maintenanceModalFacility, setMaintenanceModalFacility] = useState(null);
  const [targetStatus, setTargetStatus] = useState('Maintenance');
  const [maintenanceNotes, setMaintenanceNotes] = useState('');

  const isManagement = ['president', 'vice_president'].includes(currentRoleKey);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Gym': return Dumbbell;
      case 'Parks': return Trees;
      case 'Indoor Sports': return Trophy;
      default: return Dumbbell;
    }
  };

  const handleStatusChange = () => {
    if (!maintenanceModalFacility) return;
    toggleFacilityStatus(maintenanceModalFacility.id, targetStatus, maintenanceNotes);
    setMaintenanceModalFacility(null);
    setMaintenanceNotes('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Community Facilities & Sports Amenities</h1>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('book-facility')}>
            <Calendar size={16} /> Book Facility Slot
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('my-bookings')}>
            My Reservations
          </button>
        </div>
      </div>

      {/* Facilities Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {facilities.map(fac => {
          const Icon = getCategoryIcon(fac.category);
          const activeBookingsCount = bookings.filter(b => b.facilityId === fac.id && b.status === 'Confirmed').length;

          return (
            <div 
              key={fac.id} 
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderTop: fac.status === 'Available' ? '4px solid var(--success)' : '4px solid var(--warning)'
              }}
            >
              <div>
                {/* Header info */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(59, 130, 246, 0.12)',
                      color: 'var(--electric-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>{fac.name}</h3>
                      <ApartmentBadge apartment={fac.apartment} />
                    </div>
                  </div>
                  <StatusPill status={fac.status} />
                </div>

                {/* Timing & Capacity */}
                <div style={{ 
                  backgroundColor: 'var(--bg-hover)', 
                  padding: '12px 14px', 
                  borderRadius: 'var(--radius-md)', 
                  marginBottom: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.8125rem'
                }}>
                  <div>
                    <span style={{ color: 'var(--text-secondary)' }}>Operating Timings:</span>
                    <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      <Clock size={13} style={{ color: 'var(--electric-blue)' }} /> {fac.hours}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Live Occupancy:</span>
                    <div style={{ fontWeight: 700, marginTop: '2px', color: 'var(--success)' }}>
                      {fac.currentOccupancy} / {fac.capacity} Max
                    </div>
                  </div>
                </div>

                {/* Maintenance Notes */}
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.4 }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Status Report: </strong>
                  {fac.maintenanceNotes}
                </div>

                {/* Features / Amenities */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Features & Equipment
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {fac.amenities?.map((am, idx) => (
                      <span key={idx} className="badge badge-neutral" style={{ fontSize: '0.6875rem' }}>
                        ✓ {am}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Rules */}
                <div style={{ marginBottom: '16px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>Community Rules:</div>
                  <ul style={{ paddingLeft: '16px' }}>
                    {fac.rules?.slice(0, 2).map((r, idx) => (
                      <li key={idx} style={{ marginBottom: '2px' }}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ 
                borderTop: '1px solid var(--border-color)', 
                paddingTop: '14px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                gap: '8px'
              }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Active Bookings: <strong>{activeBookingsCount}</strong>
                </span>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {isManagement && (
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setMaintenanceModalFacility(fac);
                        setTargetStatus(fac.status === 'Available' ? 'Maintenance' : 'Available');
                        setMaintenanceNotes(fac.maintenanceNotes);
                      }}
                      title="Toggle operational status / schedule closure"
                    >
                      <Wrench size={13} /> Status Toggle
                    </button>
                  )}

                  <button 
                    className="btn btn-primary btn-sm"
                    disabled={fac.status !== 'Available'}
                    onClick={() => setActiveTab('book-facility')}
                  >
                    Reserve Slot
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* VP / Management Maintenance Status Modal */}
      <Modal
        isOpen={!!maintenanceModalFacility}
        onClose={() => setMaintenanceModalFacility(null)}
        title="Update Facility Operational Status"
        subtitle={`Facility: ${maintenanceModalFacility?.name}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label required">Set Operational Mode</label>
            <select 
              className="form-control"
              value={targetStatus}
              onChange={e => setTargetStatus(e.target.value)}
            >
              <option value="Available">Available (Open for resident bookings)</option>
              <option value="Maintenance">Maintenance (Temporarily closed for repairs / servicing)</option>
              <option value="Closed">Closed (Closed for sanitization or emergency)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label required">Maintenance / Closure Advisory Note</label>
            <textarea 
              rows={3}
              className="form-control"
              value={maintenanceNotes}
              onChange={e => setMaintenanceNotes(e.target.value)}
              placeholder="e.g. Scheduled quarterly equipment servicing on Sunday. Reopening 5 PM."
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleStatusChange}>
              Save Facility Status
            </button>
            <button className="btn btn-secondary" onClick={() => setMaintenanceModalFacility(null)}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
