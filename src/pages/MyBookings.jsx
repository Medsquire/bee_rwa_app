import React, { useState } from 'react';
import { useRwa } from '../context/RwaContext';
import { StatusPill, ApartmentBadge, EmptyState } from '../components/CommonUI';
import { 
  Bookmark, 
  Calendar, 
  Clock, 
  Users, 
  XCircle, 
  CheckCircle2, 
  Dumbbell, 
  AlertCircle,
  PlusCircle
} from 'lucide-react';

export const MyBookings = () => {
  const { bookings, cancelBooking, currentUser, currentRoleKey, setActiveTab } = useRwa();
  const [filterStatus, setFilterStatus] = useState('All');

  // Filter personal bookings for resident or view all for management
  const isManagement = ['president', 'vice_president'].includes(currentRoleKey);

  const displayedBookings = bookings.filter(b => {
    const isMine = isManagement 
      ? true 
      : (b.bookedBy.includes(currentUser.name) || b.flatNumber === currentUser.flatNumber);

    const matchesStatus = filterStatus === 'All' || b.status === filterStatus;
    return isMine && matchesStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
            {isManagement ? 'All Community Facility Bookings' : 'My Facility Bookings'}
          </h1>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('book-facility')}>
          <PlusCircle size={16} /> New Slot Reservation
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {['All', 'Confirmed', 'Cancelled'].map(st => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`btn btn-sm ${filterStatus === st ? 'btn-primary' : 'btn-secondary'}`}
          >
            {st} ({bookings.filter(b => st === 'All' || b.status === st).length})
          </button>
        ))}
      </div>

      {/* Bookings Grid */}
      {displayedBookings.length === 0 ? (
        <EmptyState 
          icon={Calendar}
          title="No Bookings Found"
          description="You don't have any facility reservations under this filter. Enjoy the gym or badminton court anytime!"
          actionText="Reserve a Facility Slot"
          onAction={() => setActiveTab('book-facility')}
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
          {displayedBookings.map(bk => (
            <div 
              key={bk.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderLeft: bk.status === 'Confirmed' ? '4px solid var(--success)' : '4px solid var(--border-color)',
                opacity: bk.status === 'Cancelled' ? 0.75 : 1
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--electric-blue)' }}>{bk.id}</span>
                  <StatusPill status={bk.status} />
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>{bk.facilityName}</h3>
                
                <div style={{ 
                  backgroundColor: 'var(--bg-hover)', 
                  padding: '10px 12px', 
                  borderRadius: 'var(--radius-md)', 
                  marginBottom: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  fontSize: '0.8125rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} style={{ color: 'var(--electric-blue)' }} />
                    <span>Date: <strong>{bk.date}</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} style={{ color: 'var(--cyan-blue)' }} />
                    <span>Slot: <strong>{bk.timeSlot}</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={14} style={{ color: 'var(--text-muted)' }} />
                    <span>Attendees: {bk.participants} Person(s)</span>
                  </div>
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  <strong>Resident: </strong> {bk.bookedBy} ({bk.flatNumber} - {bk.apartment})
                  {bk.purpose && <div style={{ marginTop: '2px', fontStyle: 'italic' }}>Purpose: "{bk.purpose}"</div>}
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                  Logged: {bk.bookedAt}
                </span>

                {bk.status === 'Confirmed' && (
                  <button 
                    className="btn btn-danger btn-sm"
                    style={{ padding: '3px 8px', fontSize: '0.75rem' }}
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to cancel booking ${bk.id} for ${bk.facilityName}?`)) {
                        cancelBooking(bk.id);
                      }
                    }}
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
