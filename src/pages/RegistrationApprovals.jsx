import React, { useState } from 'react';
import { useRwa } from '../context/RwaContext';
import { ApartmentBadge, StatusPill, Modal } from '../components/CommonUI';
import { 
  UserCheck, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Clock, 
  ShieldAlert, 
  Search, 
  Check, 
  X,
  FileCheck,
  Eye
} from 'lucide-react';

export const RegistrationApprovals = () => {
  const { 
    registrationRequests, 
    approveRequest, 
    rejectRequest, 
    selectedApartment,
    currentUser,
    currentRoleKey
  } = useRwa();

  const [activeFilter, setActiveFilter] = useState('Pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReq, setSelectedReq] = useState(null);
  const [rejectModalReq, setRejectModalReq] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [approvalNotes, setApprovalNotes] = useState('');

  // Filter requests
  const filteredRequests = registrationRequests.filter(req => {
    const matchesApt = selectedApartment === 'All' || 
      req.apartment === selectedApartment ||
      (selectedApartment === 'Golden Apartment' && (
        req.apartment === 'Golden Apartment' ||
        req.apartment?.toLowerCase().includes('tower') ||
        req.apartment?.toLowerCase().includes('golden')
      ));
    const matchesFilter = activeFilter === 'All' || req.status === activeFilter;
    const matchesSearch = 
      req.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.flatNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.phone.includes(searchTerm);
    return matchesApt && matchesFilter && matchesSearch;
  });

  const pendingCount = registrationRequests.filter(r => r.status === 'Pending').length;
  const approvedCount = registrationRequests.filter(r => r.status === 'Approved').length;
  const rejectedCount = registrationRequests.filter(r => r.status === 'Rejected').length;

  const handleApprove = (req) => {
    approveRequest(req.id, approvalNotes || 'Approved by President upon document audit.');
    setSelectedReq(null);
    setApprovalNotes('');
  };

  const handleReject = () => {
    if (!rejectModalReq) return;
    rejectRequest(rejectModalReq.id, rejectionReason || 'Documentation unverified or incomplete.');
    setRejectModalReq(null);
    setRejectionReason('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Resident Registration Approvals</h1>
            <span className="badge badge-warning">President Sign-off Desk</span>
          </div>
        </div>

        {/* Status Counters */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setActiveFilter('Pending')}
            className={`btn btn-sm ${activeFilter === 'Pending' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Pending ({pendingCount})
          </button>
          <button 
            onClick={() => setActiveFilter('Approved')}
            className={`btn btn-sm ${activeFilter === 'Approved' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Approved ({approvedCount})
          </button>
          <button 
            onClick={() => setActiveFilter('Rejected')}
            className={`btn btn-sm ${activeFilter === 'Rejected' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Rejected ({rejectedCount})
          </button>
          <button 
            onClick={() => setActiveFilter('All')}
            className={`btn btn-sm ${activeFilter === 'All' ? 'btn-primary' : 'btn-secondary'}`}
          >
            All Requests ({registrationRequests.length})
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="glass-card">
        {/* Search Bar */}
        <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ position: 'relative', width: '320px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search applicant name, flat, ID..."
              className="form-control"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '36px' }}
            />
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            Showing <strong>{filteredRequests.length}</strong> application(s)
          </div>
        </div>

        {filteredRequests.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--text-secondary)' }}>
            <CheckCircle2 size={42} style={{ color: 'var(--success)', margin: '0 auto 12px' }} />
            <h4 style={{ fontSize: '1.125rem', fontWeight: 700 }}>No Applications Found</h4>
            <p style={{ fontSize: '0.875rem', marginTop: '4px' }}>
              There are no registration requests matching "{activeFilter}" filter.
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Applicant Name</th>
                  <th>Apartment & Flat</th>
                  <th>Resident Type</th>
                  <th>Contact Details</th>
                  <th>Documentation Proof</th>
                  <th>Date Logged</th>
                  <th>Status</th>
                  <th>President Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map(req => (
                  <tr key={req.id}>
                    <td style={{ fontWeight: 700, color: 'var(--electric-blue)' }}>{req.id}</td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{req.applicantName}</div>
                      {req.ownerName && (
                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                          Landlord: {req.ownerName}
                        </div>
                      )}
                    </td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{req.flatNumber}</div>
                      <ApartmentBadge apartment={req.apartment} />
                    </td>
                    <td>
                      <span className={`badge ${req.residentType === 'Flat Owner' ? 'badge-indigo' : 'badge-neutral'}`}>
                        {req.residentType}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8125rem' }}>
                      <div>{req.phone}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{req.email}</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 500 }}>
                        <FileCheck size={14} style={{ color: 'var(--success)' }} />
                        <span style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={req.documentStatus}>
                          {req.documentStatus}
                        </span>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                      {req.submittedAt}
                    </td>
                    <td><StatusPill status={req.status} /></td>
                    <td>
                      {req.status === 'Pending' ? (
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button 
                            className="btn btn-success btn-sm"
                            style={{ padding: '4px 10px' }}
                            onClick={() => {
                              setSelectedReq(req);
                              setApprovalNotes('Sale deed verified with builder manifest. Granted access.');
                            }}
                          >
                            <Check size={14} /> Review & Approve
                          </button>
                          <button 
                            className="btn btn-danger btn-sm"
                            style={{ padding: '4px 10px' }}
                            onClick={() => setRejectModalReq(req)}
                          >
                            <X size={14} /> Reject
                          </button>
                        </div>
                      ) : (
                        <button 
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '4px 8px' }}
                          onClick={() => setSelectedReq(req)}
                        >
                          <Eye size={14} /> Audit Trail
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Review & Approve Modal */}
      <Modal
        isOpen={!!selectedReq}
        onClose={() => setSelectedReq(null)}
        title={selectedReq?.status === 'Pending' ? 'President Review & Access Authorization' : 'Application Audit Dossier'}
        subtitle={`Application ID: ${selectedReq?.id}`}
      >
        {selectedReq && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ backgroundColor: 'var(--bg-hover)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Applicant:</span>
                <strong style={{ fontSize: '1rem' }}>{selectedReq.applicantName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Apartment Unit:</span>
                <strong>{selectedReq.apartment} — Flat {selectedReq.flatNumber}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Resident Classification:</span>
                <span className="badge badge-indigo">{selectedReq.residentType}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Contact Phone & Email:</span>
                <span>{selectedReq.phone} • {selectedReq.email}</span>
              </div>
            </div>

            <div style={{ border: '1px solid var(--border-color)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
              <h5 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '6px' }}>Uploaded Verification Proof</h5>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--electric-blue)', fontSize: '0.8125rem' }}>
                <FileCheck size={18} />
                <span>{selectedReq.documentStatus}</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Applicant remarks: "{selectedReq.notes}"
              </div>
            </div>

            {selectedReq.status === 'Pending' ? (
              <div className="form-group">
                <label className="form-label">President Approval Endorsement / Review Notes:</label>
                <textarea 
                  rows={3}
                  className="form-control"
                  value={approvalNotes}
                  onChange={e => setApprovalNotes(e.target.value)}
                  placeholder="Enter remarks or flat allotment clearance..."
                />
                <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                  <button 
                    className="btn btn-success" 
                    style={{ flex: 1 }}
                    onClick={() => handleApprove(selectedReq)}
                  >
                    Confirm & Grant Resident Access
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setSelectedReq(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ backgroundColor: 'var(--bg-hover)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700 }}>Resolution Dossier:</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Status: <strong>{selectedReq.status}</strong>
                </div>
                {selectedReq.approvedBy && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Authorizer: {selectedReq.approvedBy} on {selectedReq.approvedAt}
                  </div>
                )}
                {selectedReq.rejectedBy && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--error)', marginTop: '2px' }}>
                    Rejected by: {selectedReq.rejectedBy} on {selectedReq.rejectedAt}
                  </div>
                )}
                <div style={{ fontSize: '0.75rem', marginTop: '6px', fontStyle: 'italic' }}>
                  Notes: "{selectedReq.notes}"
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Reject Modal */}
      <Modal
        isOpen={!!rejectModalReq}
        onClose={() => setRejectModalReq(null)}
        title="Reject Resident Access Request"
        subtitle={`Applicant: ${rejectModalReq?.applicantName} (${rejectModalReq?.flatNumber})`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Please state the grounds for rejection so the applicant can submit corrected documents:
          </p>
          <div className="form-group">
            <label className="form-label required">Reason for Rejection</label>
            <textarea 
              rows={3}
              className="form-control"
              value={rejectionReason}
              onChange={e => setRejectionReason(e.target.value)}
              placeholder="e.g. Sale deed stamp page missing, police verification unverified, owner name mismatch..."
            />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-danger" style={{ flex: 1 }} onClick={handleReject}>
              Confirm Rejection
            </button>
            <button className="btn btn-secondary" onClick={() => setRejectModalReq(null)}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
