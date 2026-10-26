import React, { useState } from 'react';
import { useRwa } from '../context/RwaContext';
import { 
  PlusCircle, 
  Upload, 
  AlertTriangle, 
  Building2, 
  MapPin, 
  ShieldAlert, 
  CheckCircle2,
  FileCheck,
  Building,
  Home,
  Clock,
  Zap,
  Camera,
  X,
  Smartphone
} from 'lucide-react';

export const SubmitComplaint = () => {
  const { apartments, currentUser, currentRoleKey, submitComplaint, setActiveTab } = useRwa();

  const isRwaUser = ['president', 'vice_president', 'admin'].includes(currentRoleKey);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Lift / Elevator',
    apartment: currentUser?.apartment || 'Golden Apartment',
    location: '',
    priority: 'Medium',
    description: '',
    complaintScope: 'Common Area',
    hasAttachment: false,
    photoUrl: null
  });

  const [errors, setErrors] = useState({});
  const [submittedId, setSubmittedId] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const categories = [
    'Lift / Elevator',
    'Water Supply',
    'Plumbing',
    'Electricity and Lighting',
    'Park and Garden',
    'Gym Equipment',
    'Indoor Sports',
    'Cleanliness',
    'Security',
    'Function Hall',
    'Other'
  ];

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Complaint Title is required';
    if (!formData.location.trim()) errs.location = 'Specific location / affected area is required';
    if (!formData.description.trim() || formData.description.length < 15) {
      errs.description = 'Please provide detailed description (at least 15 characters)';
    }
    return errs;
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPhotoPreview(ev.target.result);
        setFormData(prev => ({
          ...prev,
          photoUrl: ev.target.result,
          hasAttachment: true
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrs = validate();
    if (Object.keys(validationErrs).length > 0) {
      setErrors(validationErrs);
      return;
    }
    setErrors({});

    const newId = submitComplaint({
      ...formData,
      photoUrl: photoPreview || formData.photoUrl
    });

    setSubmittedId(newId);
  };

  if (submittedId) {
    const isCommonArea = formData.complaintScope === 'Common Area';
    const awaitingApproval = !isRwaUser && isCommonArea;

    return (
      <div className="glass-card" style={{ maxWidth: '640px', margin: '40px auto', textAlign: 'center', padding: '36px' }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: awaitingApproval ? '#FEF3C7' : 'rgba(16, 185, 129, 0.15)',
          color: awaitingApproval ? '#D97706' : 'var(--success)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px'
        }}>
          {awaitingApproval ? <Clock size={36} /> : <CheckCircle2 size={38} />}
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '6px' }}>
          {awaitingApproval ? 'Complaint Logged • Awaiting RWA Approval' : 'Complaint Registered & Dispatched!'}
        </h2>
        <span className="badge badge-warning" style={{ fontSize: '0.875rem', padding: '6px 14px', marginBottom: '16px' }}>
          Ticket #{submittedId}
        </span>
        
        {awaitingApproval ? (
          <div style={{
            backgroundColor: '#FFFBEB',
            border: '1px solid #FCD34D',
            borderRadius: '8px',
            padding: '12px 16px',
            margin: '0 auto 24px',
            textAlign: 'left',
            fontSize: '0.84rem',
            color: '#92400E',
            lineHeight: 1.5
          }}>
            <strong>📋 Common Area Approval Flow:</strong> As per resident policy, this common area complaint has been queued for RWA executive review. Once approved by the RWA President or Vice President, it will automatically move to the Agent App for technician dispatch.
          </div>
        ) : (
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '24px' }}>
            {isRwaUser 
              ? 'As an RWA executive, your complaint has been directly transmitted to the Agent App with zero approvals needed!'
              : 'Your personal flat maintenance request has been recorded and scheduled for technical inspection.'}
          </p>
        )}

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button 
            className="btn btn-primary"
            onClick={() => setActiveTab('complaints')}
          >
            Track in Complaints Board
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => {
              setSubmittedId(null);
              setPhotoPreview(null);
              setFormData({
                title: '',
                category: 'Lift / Elevator',
                apartment: currentUser?.apartment || 'Golden Apartment',
                location: '',
                priority: 'Medium',
                description: '',
                complaintScope: 'Common Area',
                hasAttachment: false,
                photoUrl: null
              });
            }}
          >
            Log Another Complaint
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Register Service Complaint</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Log issues regarding lifts, water pumps, corridors, lighting, security, or flat maintenance
        </p>
      </div>

      <div className="glass-card">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Req 5 & Req 6: Complaint Scope Selection (Common Area vs Personal Flat) */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label required" style={{ fontSize: '0.8125rem', fontWeight: 700 }}>
              Complaint Scope / Jurisdiction
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div
                onClick={() => setFormData({ ...formData, complaintScope: 'Common Area' })}
                style={{
                  border: formData.complaintScope === 'Common Area' ? '2px solid var(--electric-blue)' : '1px solid var(--border-color)',
                  backgroundColor: formData.complaintScope === 'Common Area' ? 'rgba(59, 130, 246, 0.05)' : '#FFFFFF',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  transition: 'all 0.15s ease'
                }}
              >
                <Building size={20} style={{ color: 'var(--electric-blue)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.84rem', color: 'var(--text-primary)' }}>
                    Common Area Issue
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Lifts, water pumps, corridors, lighting, gardens, gates & security
                  </div>
                </div>
              </div>

              <div
                onClick={() => setFormData({ ...formData, complaintScope: 'Personal / Flat' })}
                style={{
                  border: formData.complaintScope === 'Personal / Flat' ? '2px solid var(--electric-blue)' : '1px solid var(--border-color)',
                  backgroundColor: formData.complaintScope === 'Personal / Flat' ? 'rgba(59, 130, 246, 0.05)' : '#FFFFFF',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  transition: 'all 0.15s ease'
                }}
              >
                <Home size={20} style={{ color: '#10B981', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.84rem', color: 'var(--text-primary)' }}>
                    Personal / Flat Issue
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Inside flat unit (electrical switchboard, bathroom tap, internal seep)
                  </div>
                </div>
              </div>
            </div>

            {/* Explanatory Policy Banner based on User Role & Scope */}
            <div style={{ marginTop: '10px' }}>
              {!isRwaUser && formData.complaintScope === 'Common Area' ? (
                <div style={{
                  backgroundColor: '#FEF3C7',
                  border: '1px solid #FCD34D',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  fontSize: '0.78rem',
                  color: '#92400E',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Clock size={15} style={{ flexShrink: 0 }} />
                  <span>
                    <strong>Resident Approval Policy:</strong> As a resident raising a <strong>Common Area</strong> complaint, this ticket requires RWA approval before it is dispatched to the Agent App.
                  </span>
                </div>
              ) : isRwaUser ? (
                <div style={{
                  backgroundColor: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  fontSize: '0.78rem',
                  color: '#1E40AF',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Smartphone size={15} style={{ flexShrink: 0 }} />
                  <span>
                    <strong>⚡ RWA Direct Authority:</strong> As an RWA user ({currentUser?.roleTitle || 'Executive'}), you can send complaints directly to the Agent App without any approvals.
                  </span>
                </div>
              ) : null}
            </div>
          </div>

          {/* Title */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label required">Complaint Title</label>
            <input 
              type="text" 
              placeholder="e.g. Passenger Lift #2 sensor door glitch or Low pressure pump failure" 
              className="form-control"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
            {errors.title && <div className="form-error">{errors.title}</div>}
          </div>

          {/* Category & Priority */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label required">Category</label>
              <select 
                className="form-control"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label required">Severity / Priority</label>
              <select 
                className="form-control"
                value={formData.priority}
                onChange={e => setFormData({ ...formData, priority: e.target.value })}
              >
                <option value="Urgent">🚨 Urgent (Immediate safety or service hazard)</option>
                <option value="High">⚠️ High (Significant disruption to residents)</option>
                <option value="Medium">⚡ Medium (Standard repair order)</option>
                <option value="Low">🌱 Low (Cosmetic, non-urgent)</option>
              </select>
            </div>
          </div>

          {/* Apartment & Location */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label required">Apartment Complex</label>
              <select 
                className="form-control"
                value={formData.apartment}
                onChange={e => setFormData({ ...formData, apartment: e.target.value })}
              >
                {apartments.map(apt => (
                  <option key={apt.id} value={apt.name}>
                    {apt.name} ({apt.towerCode})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label required">Specific Location / Asset</label>
              <input 
                type="text" 
                placeholder="e.g. Tower 1 - Floor 7 Lift Lobby or Sump Pump Room" 
                className="form-control"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
              />
              {errors.location && <div className="form-error">{errors.location}</div>}
            </div>
          </div>

          {/* Detailed Description */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label required">Detailed Description of Problem</label>
            <textarea 
              rows={4}
              className="form-control"
              placeholder="Describe symptoms, when it started, error codes on display, or any safety precautions taken..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
            {errors.description && <div className="form-error">{errors.description}</div>}
          </div>

          {/* Photo Evidence Upload (Clear Photo, NO PDF format) */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Attach Photo Evidence (Clear Image with Zoom)</label>
            
            {photoPreview ? (
              <div style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid #CBD5E1',
                height: '180px',
                backgroundColor: '#0F172A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src={photoPreview} 
                  alt="Uploaded preview" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                  type="button"
                  onClick={() => {
                    setPhotoPreview(null);
                    setFormData(prev => ({ ...prev, photoUrl: null, hasAttachment: false }));
                  }}
                  className="btn btn-secondary btn-icon"
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: 'rgba(15, 23, 42, 0.75)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '50%'
                  }}
                  title="Remove photo"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div style={{
                border: '2px dashed var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                textAlign: 'center',
                backgroundColor: 'var(--bg-hover)',
                cursor: 'pointer'
              }}>
                <Camera size={26} style={{ color: 'var(--electric-blue)', margin: '0 auto 6px' }} />
                <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>
                  Upload clear image evidence (PNG, JPG, WebP)
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  No PDF format required — image will be rendered with interactive zoom
                </div>
                <input 
                  type="file" 
                  accept="image/*"
                  style={{ display: 'none' }} 
                  id="complaint-photo-file"
                  onChange={handlePhotoUpload}
                />
                <label 
                  htmlFor="complaint-photo-file" 
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: '10px', display: 'inline-block', cursor: 'pointer' }}
                >
                  <Upload size={13} style={{ marginRight: '4px' }} />
                  <span>Select Image</span>
                </label>
              </div>
            )}
          </div>

          {/* Submitter Note */}
          <div style={{ backgroundColor: 'var(--bg-hover)', padding: '10px 14px', borderRadius: 'var(--radius-md)', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            Logged by: <strong>{currentUser?.name || 'User'}</strong> ({currentUser?.flatNumber || 'RWA Office'} - {currentUser?.apartment || 'Golden Apartment'})
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '12px', fontWeight: 700 }}>
              <PlusCircle size={18} />
              <span>
                {!isRwaUser && formData.complaintScope === 'Common Area' 
                  ? 'Submit for RWA Approval' 
                  : isRwaUser 
                    ? 'Directly Submit & Dispatch to Agent App' 
                    : 'Submit Complaint Ticket'}
              </span>
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setActiveTab('complaints')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
