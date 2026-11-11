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
  FileCheck
} from 'lucide-react';

export const SubmitComplaint = () => {
  const { apartments, currentUser, submitComplaint, setActiveTab } = useRwa();

  const getInitialApartment = () => {
    if (currentUser?.tower?.includes('2')) return 'Tower-2';
    if (currentUser?.tower?.includes('3')) return 'Tower-3';
    return 'Tower-1';
  };

  const [formData, setFormData] = useState({
    title: '',
    category: 'Lift / Elevator',
    apartment: getInitialApartment(),
    location: '',
    priority: 'Medium',
    description: '',
    hasAttachment: false,
    attachmentFile: null
  });

  const [errors, setErrors] = useState({});
  const [submittedId, setSubmittedId] = useState(null);

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
      tower: formData.apartment.includes('1') ? 'Golden Tower 1' :
             formData.apartment.includes('2') ? 'Golden Tower 2' :
             formData.apartment.includes('3') ? 'Golden Tower 3' : 'Common Area',
      hasAttachment: !!formData.attachmentFile || formData.hasAttachment
    });

    setSubmittedId(newId);
  };

  if (submittedId) {
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
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '6px' }}>Complaint Registered!</h2>
        <span className="badge badge-warning" style={{ fontSize: '0.875rem', padding: '6px 14px', marginBottom: '16px' }}>
          Ticket #{submittedId}
        </span>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '24px' }}>
          Your service request has been transmitted to Vice President Operations and technical maintenance contractors.
        </p>

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
              setFormData({
                title: '',
                category: 'Lift / Elevator',
                apartment: getInitialApartment(),
                location: '',
                priority: 'Medium',
                description: '',
                hasAttachment: false,
                attachmentFile: null
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
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Submit Common Area Complaint</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Log issues regarding lifts, water pumps, lighting, parks, sports gear, or security
        </p>
      </div>

      <div className="glass-card">
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="form-group">
            <label className="form-label required">Complaint Title</label>
            <input 
              type="text" 
              placeholder="e.g. Passenger Lift #2 sensor error or Water pressure low in B-Wing" 
              className="form-control"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
            {errors.title && <div className="form-error">{errors.title}</div>}
          </div>

          {/* Category & Priority */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
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

            <div className="form-group">
              <label className="form-label required">Severity / Priority</label>
              <select 
                className="form-control"
                value={formData.priority}
                onChange={e => setFormData({ ...formData, priority: e.target.value })}
              >
                <option value="Urgent">🚨 Urgent (Immediate safety or outage hazard)</option>
                <option value="High">⚠️ High (Significant disruption to residents)</option>
                <option value="Medium">⚡ Medium (Standard maintenance repair)</option>
                <option value="Low">🌱 Low (Cosmetic, non-critical enhancement)</option>
              </select>
            </div>
          </div>

          {/* Apartment & Location */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label required">Apartment Complex</label>
              <select 
                className="form-control"
                value={formData.apartment}
                onChange={e => setFormData({ ...formData, apartment: e.target.value })}
              >
                <option value="Tower-1">Tower-1</option>
                <option value="Tower-2">Tower-2</option>
                <option value="Tower-3">Tower-3</option>
                <option value="Golden Apartment (All Towers)">Golden Apartment (All Towers)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label required">Specific Location / Affected Zone</label>
              <input 
                type="text" 
                placeholder="e.g. Tower A Floor 6 Lift Lobby, Central Park North" 
                className="form-control"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
              />
              {errors.location && <div className="form-error">{errors.location}</div>}
            </div>
          </div>

          {/* Detailed Description */}
          <div className="form-group">
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

          {/* Image Attachment UI */}
          <div className="form-group">
            <label className="form-label">Attach Photo / Video Evidence (Optional)</label>
            <div style={{
              border: '2px dashed var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              textAlign: 'center',
              backgroundColor: 'var(--bg-hover)',
              cursor: 'pointer'
            }}>
              <Upload size={24} style={{ color: 'var(--electric-blue)', margin: '0 auto 6px' }} />
              <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>
                {formData.attachmentFile ? formData.attachmentFile.name : 'Click to attach image or snapshot (PNG, JPG)'}
              </div>
              <input 
                type="file" 
                accept="image/*"
                style={{ display: 'none' }} 
                id="complaint-photo"
                onChange={e => {
                  if (e.target.files?.[0]) {
                    setFormData({ 
                      ...formData, 
                      attachmentFile: e.target.files[0],
                      hasAttachment: true 
                    });
                  }
                }}
              />
              <label 
                htmlFor="complaint-photo" 
                className="btn btn-secondary btn-sm"
                style={{ marginTop: '10px', display: 'inline-block', cursor: 'pointer' }}
              >
                Browse Photo
              </label>
            </div>
          </div>

          {/* Submitter Note */}
          <div style={{ backgroundColor: 'var(--bg-hover)', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '20px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            Logged by: <strong>{currentUser.name}</strong> ({currentUser.flatNumber} - {currentUser.apartment})
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '12px' }}>
              <PlusCircle size={18} /> Submit Complaint Ticket
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
