import React, { useState } from 'react';
import { useRwa } from '../context/RwaContext';
import { ApartmentBadge, StatusPill } from '../components/CommonUI';
import { 
  Calendar, 
  Clock, 
  Dumbbell, 
  Trophy, 
  Trees, 
  CheckCircle2, 
  AlertCircle, 
  Users, 
  ShieldCheck,
  CalendarCheck
} from 'lucide-react';

export const FacilityBooking = () => {
  const { facilities, bookings, addBooking, currentUser, setActiveTab } = useRwa();

  const [selectedFacilityId, setSelectedFacilityId] = useState(facilities[0]?.id || 'fac-gym');
  
  // Default date to tomorrow's date YYYY-MM-DD
  const tomorrowStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState(tomorrowStr());
  const [selectedSlot, setSelectedSlot] = useState('');
  const [purpose, setPurpose] = useState('Sports practice');
  const [participants, setParticipants] = useState(2);
  const [confirmationBooking, setConfirmationBooking] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const facility = facilities.find(f => f.id === selectedFacilityId) || facilities[0];

  // Check which slots are already booked on the selected date for this facility
  const bookedSlotsOnDate = bookings
    .filter(b => b.facilityId === facility.id && b.date === selectedDate && b.status === 'Confirmed')
    .map(b => b.timeSlot);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!selectedSlot) {
      setErrorMessage('Please select an available time slot');
      return;
    }

    if (facility.status !== 'Available') {
      setErrorMessage(`${facility.name} is currently under maintenance or closed.`);
      return;
    }

    const result = addBooking({
      facilityId: facility.id,
      date: selectedDate,
      timeSlot: selectedSlot,
      purpose,
      participants
    });

    if (result.success) {
      setConfirmationBooking(result.booking);
    } else {
      setErrorMessage(result.error);
    }
  };

  if (confirmationBooking) {
    return (
      <div className="glass-card" style={{ maxWidth: '600px', margin: '40px auto', textAlign: 'center', padding: '36px' }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'rgba(16, 185, 129, 0.15)',
          color: 'var(--success)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px'
        }}>
          <CheckCircle2 size={38} />
        </div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '6px' }}>Booking Confirmed!</h2>
        <span className="badge badge-success" style={{ fontSize: '0.875rem', padding: '6px 14px', marginBottom: '16px' }}>
          Pass ID: {confirmationBooking.id}
        </span>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '24px' }}>
          Your session for <strong>{confirmationBooking.facilityName}</strong> has been secured and logged into the access turnstiles.
        </p>

        <div style={{ backgroundColor: 'var(--bg-hover)', padding: '16px', borderRadius: 'var(--radius-md)', textAlign: 'left', marginBottom: '24px', fontSize: '0.8125rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Reserved Date:</span>
            <strong>{confirmationBooking.date}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Time Slot:</span>
            <strong style={{ color: 'var(--electric-blue)' }}>{confirmationBooking.timeSlot}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Booked By:</span>
            <span>{confirmationBooking.bookedBy} ({confirmationBooking.flatNumber})</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Attendees:</span>
            <span>{confirmationBooking.participants} Person(s)</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={() => setActiveTab('my-bookings')}>
            View in My Bookings
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => {
              setConfirmationBooking(null);
              setSelectedSlot('');
            }}
          >
            Book Another Slot
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Reserve Facility Slot</h1>
      </div>

      <div className="glass-card">
        <form onSubmit={handleBookingSubmit}>
          {/* Step 1: Select Facility */}
          <div className="form-group">
            <label className="form-label required">1. Choose Amenity / Facility</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              {facilities.map(fac => {
                const isSelected = selectedFacilityId === fac.id;
                return (
                  <div
                    key={fac.id}
                    onClick={() => {
                      setSelectedFacilityId(fac.id);
                      setSelectedSlot('');
                      setErrorMessage('');
                    }}
                    style={{
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      border: isSelected ? '2px solid var(--electric-blue)' : '1px solid var(--border-color)',
                      backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.08)' : 'var(--bg-elevated)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{fac.name}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{fac.location}</div>
                    <div style={{ marginTop: '8px' }}>
                      <StatusPill status={fac.status} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Maintenance Warning Banner if Selected Facility is Closed */}
          {facility.status !== 'Available' && (
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid var(--error)',
              padding: '14px 18px',
              borderRadius: 'var(--radius-md)',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: 'var(--error)'
            }}>
              <AlertCircle size={22} />
              <div>
                <strong style={{ fontSize: '0.875rem' }}>Facility Currently Unavailable:</strong>
                <p style={{ fontSize: '0.8125rem', marginTop: '2px' }}>{facility.maintenanceNotes}</p>
              </div>
            </div>
          )}

          {/* Step 2: Select Date & Attendees */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label required">2. Choose Booking Date</label>
              <input 
                type="date" 
                className="form-control"
                value={selectedDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => {
                  setSelectedDate(e.target.value);
                  setSelectedSlot('');
                }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label required">Number of Attendees</label>
              <select 
                className="form-control"
                value={participants}
                onChange={e => setParticipants(e.target.value)}
              >
                {[1, 2, 3, 4, 6, 8].map(num => (
                  <option key={num} value={num}>{num} Person(s)</option>
                ))}
              </select>
            </div>
          </div>

          {/* Step 3: Slot Selection Grid */}
          <div className="form-group">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label className="form-label required" style={{ marginBottom: 0 }}>
                3. Select Time Slot ({selectedDate})
              </label>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--electric-blue)' }} /> Available
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--error)' }} /> Already Booked
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(135px, 1fr))', gap: '10px' }}>
              {facility.slots?.map((slot, idx) => {
                const isBooked = bookedSlotsOnDate.includes(slot);
                const isSelected = selectedSlot === slot;

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isBooked || facility.status !== 'Available'}
                    onClick={() => {
                      setSelectedSlot(slot);
                      setErrorMessage('');
                    }}
                    style={{
                      padding: '12px 10px',
                      borderRadius: '8px',
                      border: isSelected 
                        ? '2px solid var(--electric-blue)' 
                        : isBooked 
                          ? '1px solid rgba(239, 68, 68, 0.3)' 
                          : '1px solid var(--border-color)',
                      backgroundColor: isSelected 
                        ? 'var(--electric-blue)' 
                        : isBooked 
                          ? 'rgba(239, 68, 68, 0.08)' 
                          : 'var(--bg-elevated)',
                      color: isSelected 
                        ? '#FFFFFF' 
                        : isBooked 
                          ? 'var(--error)' 
                          : 'var(--text-primary)',
                      fontWeight: isSelected ? 700 : 500,
                      fontSize: '0.8125rem',
                      cursor: isBooked ? 'not-allowed' : 'pointer',
                      textAlign: 'center',
                      opacity: isBooked ? 0.6 : 1,
                      transition: 'all 0.15s ease'
                    }}
                    title={isBooked ? 'This slot has already been reserved by another resident' : 'Available for booking'}
                  >
                    <div>{slot}</div>
                    <div style={{ fontSize: '0.625rem', marginTop: '2px', fontWeight: 600 }}>
                      {isBooked ? 'OCCUPIED' : isSelected ? 'SELECTED' : 'AVAILABLE'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Purpose */}
          <div className="form-group">
            <label className="form-label">Activity Purpose / Notes</label>
            <input 
              type="text" 
              className="form-control"
              placeholder="e.g. Doubles practice, cardio warmup, coaching session..."
              value={purpose}
              onChange={e => setPurpose(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div style={{ color: 'var(--error)', fontSize: '0.875rem', marginBottom: '16px', fontWeight: 600 }}>
              ⚠️ {errorMessage}
            </div>
          )}

          {/* Resident Identity Banner */}
          <div style={{ backgroundColor: 'var(--bg-hover)', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '20px', fontSize: '0.8125rem' }}>
            Booker: <strong>{currentUser.name}</strong> • Flat: <strong>{currentUser.flatNumber} ({currentUser.apartment})</strong>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ flex: 1, padding: '12px' }}
              disabled={facility.status !== 'Available'}
            >
              <CalendarCheck size={18} /> Confirm & Reserve Time Slot
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setActiveTab('facilities')}>
              Back to Overview
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
