import React, { useState, useMemo } from 'react';
import { useRwa } from '../context/RwaContext';
import { ApartmentBadge } from '../components/CommonUI';
import { getFlatsForTower, UN_OCCUPIED_FLATS_SET, TOWERS_CONFIG } from '../data/initialData';
import { 
  UserPlus, 
  CheckCircle2, 
  Upload, 
  FileText, 
  Building2, 
  ShieldCheck, 
  AlertCircle,
  ArrowRight,
  Info
} from 'lucide-react';

export const ResidentRegistration = () => {
  const { apartments, residents, submitRegistration, setActiveTab } = useRwa();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    residentType: 'Flat Owner',
    apartment: 'Tower-1',
    flatNumber: '',
    ownerName: '',
    docType: 'Sale Deed / Title Deed',
    docFile: null,
    remarks: '',
    agreed: false
  });

  const [selectedFloor, setSelectedFloor] = useState('All');
  const [isCustomFlat, setIsCustomFlat] = useState(false);
  const [errors, setErrors] = useState({});
  const [submittedId, setSubmittedId] = useState(null);

  // Available flats for the selected tower / apartment
  const availableFlats = useMemo(() => {
    return getFlatsForTower(formData.apartment);
  }, [formData.apartment]);

  // Max floors in the currently selected tower
  const maxFloors = useMemo(() => {
    if (availableFlats.length === 0) return 38;
    return Math.max(...availableFlats.map(f => f.floor));
  }, [availableFlats]);

  // Filter flats by floor if selected
  const filteredFlats = useMemo(() => {
    if (selectedFloor === 'All') return availableFlats;
    return availableFlats.filter(f => f.floor.toString() === selectedFloor);
  }, [availableFlats, selectedFloor]);

  // Fast resident map by flat number
  const residentMap = useMemo(() => {
    const map = new Map();
    if (residents && Array.isArray(residents)) {
      residents.forEach(r => {
        if (r.flat) map.set(r.flat, r);
      });
    }
    return map;
  }, [residents]);

  const handleApartmentChange = (e) => {
    const newApt = e.target.value;
    setFormData(prev => ({
      ...prev,
      apartment: newApt,
      flatNumber: ''
    }));
    setSelectedFloor('All');
    setIsCustomFlat(false);
  };

  const handleFlatSelect = (e) => {
    const val = e.target.value;
    if (val === '__custom__') {
      setIsCustomFlat(true);
      setFormData(prev => ({ ...prev, flatNumber: '' }));
      return;
    }
    setIsCustomFlat(false);

    // Look up resident if tenant registering
    const existingResident = residentMap.get(val);
    const ownerName = existingResident?.type === 'Flat Owner' ? existingResident.name : '';

    setFormData(prev => ({
      ...prev,
      flatNumber: val,
      ownerName: (prev.residentType === 'Tenant' && ownerName && !prev.ownerName) ? ownerName : prev.ownerName
    }));

    if (errors.flatNumber) {
      setErrors(prev => ({ ...prev, flatNumber: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid Email is required';
    if (!formData.phone.trim() || formData.phone.length < 10) errs.phone = 'Valid 10-digit Phone Number is required';
    if (!formData.flatNumber.trim()) errs.flatNumber = 'Please select your Flat / Unit Number from the dropdown';
    if (formData.residentType === 'Tenant' && !formData.ownerName.trim()) {
      errs.ownerName = 'Landlord / Flat Owner name is required for tenant verification';
    }
    if (!formData.agreed) errs.agreed = 'You must accept RWA bylaws and verification terms';
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

    const docDescription = `${formData.docType} (${formData.docFile ? formData.docFile.name : 'Proof Attached'})`;
    const newId = submitRegistration({
      ...formData,
      docName: docDescription
    });

    setSubmittedId(newId);
  };

  if (submittedId) {
    return (
      <div className="glass-card" style={{ maxWidth: '650px', margin: '40px auto', textAlign: 'center', padding: '40px 32px' }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: 'rgba(16, 185, 129, 0.15)',
          color: 'var(--success)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px'
        }}>
          <CheckCircle2 size={44} />
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '8px' }}>Registration Submitted!</h2>
        <span className="badge badge-warning" style={{ fontSize: '0.875rem', padding: '6px 14px', marginBottom: '16px' }}>
          Application ID: {submittedId} (Pending President Sign-off)
        </span>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '24px' }}>
          Thank you, <strong>{formData.fullName}</strong>. Your application for <strong>{formData.flatNumber} ({formData.apartment})</strong> has been placed in the President's approval desk. You will receive an SMS and email notification once verified.
        </p>

        <div style={{ backgroundColor: 'var(--bg-hover)', padding: '16px', borderRadius: 'var(--radius-md)', textAlign: 'left', marginBottom: '28px', fontSize: '0.8125rem' }}>
          <div style={{ fontWeight: 700, marginBottom: '6px' }}>Submission Summary:</div>
          <div>• Resident Type: <strong>{formData.residentType}</strong></div>
          <div>• Apartment: <strong>{formData.apartment}</strong></div>
          <div>• Contact: <strong>{formData.phone} | {formData.email}</strong></div>
          <div>• Document Proof: <strong>{formData.docType}</strong></div>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button 
            className="btn btn-primary"
            onClick={() => {
              setSubmittedId(null);
              setFormData({
                fullName: '',
                email: '',
                phone: '',
                residentType: 'Flat Owner',
                apartment: 'Tower-1',
                flatNumber: '',
                ownerName: '',
                docType: 'Sale Deed / Title Deed',
                docFile: null,
                remarks: '',
                agreed: false
              });
              setSelectedFloor('All');
              setIsCustomFlat(false);
            }}
          >
            Submit Another Request
          </button>
          <button className="btn btn-secondary" onClick={() => setActiveTab('dashboard')}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Resident Access Registration</h1>
      </div>

      <div className="glass-card">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Resident Type */}
          <div style={{ marginBottom: '24px' }}>
            <label className="form-label required">Select Resident Category</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div 
                onClick={() => setFormData({ ...formData, residentType: 'Flat Owner', docType: 'Sale Deed / Title Deed' })}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: formData.residentType === 'Flat Owner' ? '2px solid var(--electric-blue)' : '1px solid var(--border-color)',
                  backgroundColor: formData.residentType === 'Flat Owner' ? 'rgba(59, 130, 246, 0.08)' : 'var(--bg-elevated)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <input 
                  type="radio" 
                  checked={formData.residentType === 'Flat Owner'} 
                  readOnly 
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>Flat Owner (Purchaser)</div>
                </div>
              </div>

              <div 
                onClick={() => {
                  const existingResident = formData.flatNumber ? residentMap.get(formData.flatNumber) : null;
                  const owner = existingResident?.type === 'Flat Owner' ? existingResident.name : '';
                  setFormData({ 
                    ...formData, 
                    residentType: 'Tenant', 
                    docType: 'Rental Agreement (11 Months)',
                    ownerName: (!formData.ownerName && owner) ? owner : formData.ownerName
                  });
                }}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: formData.residentType === 'Tenant' ? '2px solid var(--electric-blue)' : '1px solid var(--border-color)',
                  backgroundColor: formData.residentType === 'Tenant' ? 'rgba(59, 130, 246, 0.08)' : 'var(--bg-elevated)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <input 
                  type="radio" 
                  checked={formData.residentType === 'Tenant'} 
                  readOnly 
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>Tenant (Leaseholder)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Apartment Complex / Block & Flat */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
            <div className="form-group">
              <label className="form-label required">Apartment Complex / Block</label>
              <select 
                className="form-control"
                value={formData.apartment}
                onChange={handleApartmentChange}
              >
                <option value="Tower-1">Tower-1 (Golden Tower 1)</option>
                <option value="Tower-2">Tower-2 (Golden Tower 2)</option>
                <option value="Tower-3">Tower-3 (Golden Tower 3)</option>
                <option value="Golden Apartment (All Towers)">Golden Apartment (All Towers)</option>
              </select>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label className="form-label required" style={{ margin: 0 }}>Flat / Unit Number</label>
                {!isCustomFlat && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Floor:</span>
                    <select
                      value={selectedFloor}
                      onChange={e => setSelectedFloor(e.target.value)}
                      style={{
                        padding: '2px 8px',
                        fontSize: '0.75rem',
                        borderRadius: '4px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-elevated)',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                      title="Quick filter flats by floor"
                    >
                      <option value="All">All Floors (1 - {maxFloors})</option>
                      {Array.from({ length: maxFloors }, (_, i) => i + 1).map(fl => (
                        <option key={fl} value={fl.toString()}>Floor {fl}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {!isCustomFlat ? (
                <>
                  <select 
                    className="form-control"
                    value={formData.flatNumber}
                    onChange={handleFlatSelect}
                  >
                    <option value="">-- Select Flat Number ({filteredFlats.length} units) --</option>
                    {selectedFloor === 'All' ? (
                      Array.from({ length: maxFloors }, (_, i) => i + 1).map(fl => {
                        const floorFlats = availableFlats.filter(f => f.floor === fl);
                        if (floorFlats.length === 0) return null;
                        return (
                          <optgroup key={fl} label={`Floor ${fl} (${floorFlats.length} flats)`}>
                            {floorFlats.map(f => {
                              const isVacant = UN_OCCUPIED_FLATS_SET.has(f.flat);
                              const resident = residentMap.get(f.flat);
                              let label = f.flat;
                              if (isVacant) {
                                label += ' • [Vacant / Available]';
                              } else if (resident) {
                                label += ` • [Occupied: ${resident.name} (${resident.type})]`;
                              }
                              return (
                                <option key={f.flat} value={f.flat}>
                                  {label}
                                </option>
                              );
                            })}
                          </optgroup>
                        );
                      })
                    ) : (
                      filteredFlats.map(f => {
                        const isVacant = UN_OCCUPIED_FLATS_SET.has(f.flat);
                        const resident = residentMap.get(f.flat);
                        let label = f.flat;
                        if (isVacant) {
                          label += ' • [Vacant / Available]';
                        } else if (resident) {
                          label += ` • [Occupied: ${resident.name} (${resident.type})]`;
                        }
                        return (
                          <option key={f.flat} value={f.flat}>
                            {label}
                          </option>
                        );
                      })
                    )}
                    <option value="__custom__">✏️ Other / Custom Unit Number...</option>
                  </select>
                  {errors.flatNumber && <div className="form-error">{errors.flatNumber}</div>}
                </>
              ) : (
                <div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input 
                      type="text" 
                      placeholder="e.g. GT1-PH-01 or Villa-02" 
                      className="form-control"
                      value={formData.flatNumber}
                      onChange={e => setFormData({ ...formData, flatNumber: e.target.value })}
                      autoFocus
                    />
                    <button 
                      type="button" 
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setIsCustomFlat(false);
                        setFormData(prev => ({ ...prev, flatNumber: '' }));
                      }}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      Back to Dropdown
                    </button>
                  </div>
                  {errors.flatNumber && <div className="form-error">{errors.flatNumber}</div>}
                  <span className="form-help">Type custom unit or return to flat dropdown</span>
                </div>
              )}
            </div>
          </div>

          {/* Conditional Owner Details for Tenants */}
          {formData.residentType === 'Tenant' && (
            <div className="form-group" style={{ backgroundColor: 'rgba(59, 130, 246, 0.05)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px dashed var(--electric-blue)' }}>
              <label className="form-label required">Registered Landlord / Owner Name</label>
              <input 
                type="text" 
                placeholder="Full name of the flat owner as per title deed" 
                className="form-control"
                value={formData.ownerName}
                onChange={e => setFormData({ ...formData, ownerName: e.target.value })}
              />
              {errors.ownerName && <div className="form-error">{errors.ownerName}</div>}
              <span className="form-help">The RWA office will cross-verify with owner contact details on file.</span>
            </div>
          )}

          {/* Step 3: Applicant Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label required">Applicant Full Name</label>
              <input 
                type="text" 
                placeholder="Enter full legal name" 
                className="form-control"
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
              />
              {errors.fullName && <div className="form-error">{errors.fullName}</div>}
            </div>

            <div className="form-group">
              <label className="form-label required">Email Address</label>
              <input 
                type="email" 
                placeholder="e.g. resident@example.com" 
                className="form-control"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label required">Mobile Phone (+91)</label>
              <input 
                type="tel" 
                placeholder="10-digit mobile number" 
                className="form-control"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
              {errors.phone && <div className="form-error">{errors.phone}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Supporting Document Type</label>
              <select 
                className="form-control"
                value={formData.docType}
                onChange={e => setFormData({ ...formData, docType: e.target.value })}
              >
                {formData.residentType === 'Flat Owner' ? (
                  <>
                    <option value="Sale Deed / Title Deed">Registered Sale Deed</option>
                    <option value="Possession Letter">Builder Possession Letter</option>
                    <option value="Electricity / Water Bill">Latest BESCOM / BWSSB Bill</option>
                  </>
                ) : (
                  <>
                    <option value="Rental Agreement (11 Months)">Registered Rental Agreement</option>
                    <option value="Police Verification Certificate">Police Verification Acknowledgment</option>
                    <option value="Landlord NOC Certificate">Landlord NOC Letter</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Step 4: Supporting Document Upload UI */}
          <div className="form-group">
            <label className="form-label">Upload Supporting Proof (PDF, PNG, JPG)</label>
            <div style={{
              border: '2px dashed var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              textAlign: 'center',
              backgroundColor: 'var(--bg-hover)',
              cursor: 'pointer'
            }}>
              <Upload size={32} style={{ color: 'var(--electric-blue)', margin: '0 auto 8px' }} />
              <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                {formData.docFile ? formData.docFile.name : 'Click to select document or drag & drop'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Max file size: 10MB (Sale deed, agreement, or government ID)
              </div>
              <input 
                type="file" 
                style={{ display: 'none' }} 
                id="doc-upload"
                onChange={e => {
                  if (e.target.files?.[0]) {
                    setFormData({ ...formData, docFile: e.target.files[0] });
                  }
                }}
              />
              <label 
                htmlFor="doc-upload" 
                className="btn btn-secondary btn-sm"
                style={{ marginTop: '12px', display: 'inline-block', cursor: 'pointer' }}
              >
                Browse File
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Additional Remarks / Vehicle Details</label>
            <textarea 
              rows={2}
              className="form-control"
              placeholder="e.g. Moving in next week, 1 four-wheeler (KA-01-XX-0000)..."
              value={formData.remarks}
              onChange={e => setFormData({ ...formData, remarks: e.target.value })}
            />
          </div>

          {/* Terms Agreement */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.8125rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={formData.agreed} 
                onChange={e => setFormData({ ...formData, agreed: e.target.checked })}
                style={{ marginTop: '3px' }}
              />
              <span>
                I hereby declare that all submitted information is authentic. I agree to abide by the BEE PROPERTY RWA Rules & Regulations, code of conduct, and common area usage guidelines.
              </span>
            </label>
            {errors.agreed && <div className="form-error">{errors.agreed}</div>}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '12px' }}>
              <UserPlus size={18} /> Submit Registration for President Approval
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setActiveTab('dashboard')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
