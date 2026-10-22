import React, { useState } from 'react';
import { useRwa } from '../context/RwaContext';
import { Modal, StatusPill, PriorityBadge, ApartmentBadge } from '../components/CommonUI';
import { 
  AlertTriangle, 
  Clock, 
  User, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Send, 
  Paperclip,
  Wrench,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export const ComplaintDetailsModal = ({ complaint, isOpen, onClose }) => {
  const { 
    currentRoleKey, 
    currentUser, 
    updateComplaintStatus, 
    assignComplaint 
  } = useRwa();

  const [selectedStatus, setSelectedStatus] = useState(complaint?.status || 'Submitted');
  const [selectedTech, setSelectedTech] = useState(complaint?.assignedTo || 'Unassigned');
  const [timelineNote, setTimelineNote] = useState('');

  if (!complaint) return null;

  const isManagement = ['president', 'vice_president'].includes(currentRoleKey);
  const isVP = currentRoleKey === 'vice_president';

  const techniciansList = [
    'Sanjay Kumar (Otis AMC Lead Engineer)',
    'Ramesh Babu (Chief Plumbing Contractor)',
    'Rajesh Verma (Senior Electrician)',
    'Sunita Devi (CleanPro Housekeeping Supervisor)',
    'Vikram Singh (Security Chief)',
    'Mahendra Joshi (Sports Annex Caretaker)',
    'Raghavan Pillai (Golden Tower 1 Supervisor)',
    'Suresh Nayak (Golden Tower 3 Supervisor)'
  ];

  const allStatuses = [
    'Submitted', 
    'Acknowledged', 
    'Assigned', 
    'In Progress', 
    'Resolved', 
    'Closed', 
    'Reopened'
  ];

  const handleUpdate = () => {
    if (selectedStatus !== complaint.status) {
      updateComplaintStatus(complaint.id, selectedStatus, timelineNote || `Status updated to ${selectedStatus} by ${currentUser.name}`);
    }
    if (selectedTech !== complaint.assignedTo && selectedTech !== 'Unassigned') {
      assignComplaint(complaint.id, selectedTech);
    }
    setTimelineNote('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={complaint.title}
      subtitle={`Ticket #${complaint.id} • Registered on ${complaint.createdAt}`}
      maxWidth="720px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Top Badges */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <StatusPill status={complaint.status} />
            <PriorityBadge priority={complaint.priority} />
            <span className="badge badge-indigo">{complaint.category}</span>
          </div>
          <ApartmentBadge apartment={complaint.apartment} />
        </div>

        {/* Location & Reported Info */}
        <div style={{ 
          backgroundColor: 'var(--bg-hover)', 
          padding: '14px 18px', 
          borderRadius: 'var(--radius-md)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          fontSize: '0.8125rem'
        }}>
          <div>
            <span style={{ color: 'var(--text-secondary)' }}>Affected Location:</span>
            <div style={{ fontWeight: 600, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={13} style={{ color: 'var(--electric-blue)' }} /> {complaint.location}
            </div>
          </div>
          <div>
            <span style={{ color: 'var(--text-secondary)' }}>Reported By:</span>
            <div style={{ fontWeight: 600, marginTop: '2px' }}>
              {complaint.submittedBy} ({complaint.submittedByRole})
            </div>
          </div>
          <div>
            <span style={{ color: 'var(--text-secondary)' }}>Assigned Technician / Lead:</span>
            <div style={{ fontWeight: 600, marginTop: '2px', color: 'var(--electric-blue)' }}>
              {complaint.assignedTo || 'Unassigned'}
            </div>
          </div>
          <div>
            <span style={{ color: 'var(--text-secondary)' }}>Last Activity:</span>
            <div style={{ fontWeight: 600, marginTop: '2px' }}>
              {complaint.updatedAt}
            </div>
          </div>
        </div>

        {/* Issue Description */}
        <div>
          <h5 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '6px' }}>Detailed Complaint Description</h5>
          <div style={{
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            fontSize: '0.875rem',
            lineHeight: 1.5
          }}>
            {complaint.description}
          </div>
        </div>

        {complaint.hasAttachment && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 14px',
            borderRadius: 'var(--radius-md)',
            border: '1px dashed var(--electric-blue)',
            backgroundColor: 'rgba(59, 130, 246, 0.05)',
            fontSize: '0.8125rem'
          }}>
            <Paperclip size={16} style={{ color: 'var(--electric-blue)' }} />
            <span>Attachment on file: <strong>site_photo_evidence_oct26.jpg</strong> (Verified by RWA Security Desk)</span>
          </div>
        )}

        {/* Management Controls: Status Updater & Technician Assignment */}
        {isManagement && (
          <div style={{
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-elevated)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Wrench size={16} style={{ color: 'var(--electric-blue)' }} />
              <h5 style={{ fontSize: '0.875rem', fontWeight: 700 }}>Management Dispatch Desk</h5>
              <span className="badge badge-warning" style={{ fontSize: '0.6875rem' }}>Vice President / President</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.75rem' }}>Update Status</label>
                <select 
                  className="form-control"
                  value={selectedStatus}
                  onChange={e => setSelectedStatus(e.target.value)}
                  style={{ height: '36px', fontSize: '0.8125rem' }}
                >
                  {allStatuses.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.75rem' }}>Assign Technician / Lead</label>
                <select 
                  className="form-control"
                  value={selectedTech}
                  onChange={e => setSelectedTech(e.target.value)}
                  style={{ height: '36px', fontSize: '0.8125rem' }}
                >
                  <option value="Unassigned">-- Select Technician --</option>
                  {techniciansList.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: '0.75rem' }}>Progress Note / Action Taken</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="e.g. Technician arrived on site, spare part ordered..."
                value={timelineNote}
                onChange={e => setTimelineNote(e.target.value)}
                style={{ height: '36px', fontSize: '0.8125rem' }}
              />
            </div>

            <button 
              className="btn btn-primary btn-sm"
              onClick={handleUpdate}
              style={{ alignSelf: 'flex-start' }}
            >
              Save Dispatch Updates
            </button>
          </div>
        )}

        {/* Resident Actions (e.g. Reopen or Close if resolved) */}
        {!isManagement && complaint.status === 'Resolved' && (
          <div style={{ display: 'flex', gap: '10px', padding: '12px', borderRadius: '8px', backgroundColor: 'var(--bg-hover)' }}>
            <button 
              className="btn btn-success btn-sm" 
              style={{ flex: 1 }}
              onClick={() => {
                updateComplaintStatus(complaint.id, 'Closed', 'Resident verified resolution and closed ticket.');
                onClose();
              }}
            >
              <CheckCircle2 size={14} /> Confirm & Close Ticket
            </button>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => {
                updateComplaintStatus(complaint.id, 'Reopened', 'Resident reported issue recurring. Reopened.');
                onClose();
              }}
            >
              <RotateCcw size={14} /> Reopen Ticket
            </button>
          </div>
        )}

        {/* Complaint History & Timeline */}
        <div>
          <h5 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '10px' }}>Resolution Timeline & Audit Trail</h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderLeft: '2px solid var(--border-color)', paddingLeft: '16px', marginLeft: '6px' }}>
            {complaint.history?.map((h, idx) => (
              <div key={idx} style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '-23px',
                  top: '4px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--electric-blue)',
                  boxShadow: '0 0 0 3px var(--bg-card-solid)'
                }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{h.timestamp}</span>
                  <span className="badge badge-neutral" style={{ fontSize: '0.625rem' }}>{h.author}</span>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', marginTop: '2px' }}>
                  {h.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
