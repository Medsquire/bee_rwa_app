import React, { useState } from 'react';
import { useRwa } from '../context/RwaContext';
import { PriorityBadge, ApartmentBadge, Modal } from '../components/CommonUI';
import { 
  Megaphone, 
  Pin, 
  PlusCircle, 
  Search, 
  Calendar, 
  User, 
  Trash2, 
  Tag, 
  BellRing,
  Building2
} from 'lucide-react';

export const Announcements = () => {
  const { 
    announcements, 
    publishAnnouncement, 
    deleteAnnouncement, 
    apartments, 
    selectedApartment, 
    setSelectedApartment,
    currentUser, 
    currentRoleKey 
  } = useRwa();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  const isManagement = ['president', 'vice_president'].includes(currentRoleKey);

  const [newAnn, setNewAnn] = useState({
    title: '',
    description: '',
    category: 'Water Supply',
    apartmentScope: 'All Apartments',
    targetAudience: 'All Residents',
    priority: 'High',
    pinned: false
  });

  const categories = [
    'All',
    'Water Supply',
    'Lift / Elevator',
    'Facility Maintenance',
    'Community Event',
    'RWA Meeting',
    'Finance Reminder',
    'Security Notice'
  ];

  const filteredAnnouncements = announcements.filter(ann => {
    const matchesApt = selectedApartment === 'All' || ann.apartmentScope.includes(selectedApartment) || ann.apartmentScope === 'All Apartments';
    const matchesCat = categoryFilter === 'All' || ann.category === categoryFilter;
    const matchesSearch = 
      ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ann.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ann.publishedBy.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesApt && matchesCat && matchesSearch;
  });

  const handlePublish = (e) => {
    e.preventDefault();
    if (!newAnn.title.trim() || !newAnn.description.trim()) return;

    publishAnnouncement(newAnn);
    setIsPublishModalOpen(false);
    setNewAnn({
      title: '',
      description: '',
      category: 'Water Supply',
      apartmentScope: 'All Apartments',
      targetAudience: 'All Residents',
      priority: 'High',
      pinned: false
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Community Notice Board & Circulars</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Official broadcasts, maintenance alerts, AGM schedules, and festival announcements
          </p>
        </div>
        {isManagement && (
          <button className="btn btn-primary btn-sm" onClick={() => setIsPublishModalOpen(true)}>
            <PlusCircle size={16} /> Broadcast New Announcement
          </button>
        )}
      </div>

      {/* Controls Card */}
      <div className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: '280px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search notices, keywords..." 
                className="form-control"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '36px' }}
              />
            </div>

            <select 
              className="form-control"
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              style={{ width: 'auto' }}
            >
              {categories.map(c => (
                <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
              ))}
            </select>

            <select 
              className="form-control"
              value={selectedApartment}
              onChange={e => setSelectedApartment(e.target.value)}
              style={{ width: 'auto' }}
            >
              <option value="All">All Complexes Scope</option>
              {apartments.map(a => (
                <option key={a.id} value={a.name}>{a.name}</option>
              ))}
            </select>
          </div>

          <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            Showing <strong>{filteredAnnouncements.length}</strong> active bulletin(s)
          </span>
        </div>
      </div>

      {/* Announcements Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredAnnouncements.map(ann => (
          <div 
            key={ann.id}
            className="glass-card"
            style={{
              borderLeft: ann.priority === 'Urgent' 
                ? '6px solid var(--error)' 
                : ann.priority === 'High' 
                  ? '6px solid var(--warning)' 
                  : '6px solid var(--electric-blue)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                {ann.pinned && (
                  <span className="badge" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: 'var(--error)' }}>
                    <Pin size={12} /> PINNED NOTICE
                  </span>
                )}
                <PriorityBadge priority={ann.priority} />
                <span className="badge badge-indigo">{ann.category}</span>
                <span className="badge badge-neutral">Audience: {ann.targetAudience}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ann.publishedDate}</span>
                {isManagement && (
                  <button 
                    onClick={() => deleteAnnouncement(ann.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
                    title="Remove bulletin"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>
              {ann.title}
            </h3>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
              {ann.description}
            </p>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              borderTop: '1px solid var(--border-color)', 
              paddingTop: '12px',
              fontSize: '0.75rem'
            }}>
              <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Building2 size={13} /> Scope: <strong>{ann.apartmentScope}</strong>
              </span>

              <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
                Published by: {ann.publishedBy}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Publish Modal */}
      <Modal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        title="Broadcast Community Announcement"
        subtitle="Publish official circular to residents"
      >
        <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label required">Notice Title</label>
            <input 
              type="text" 
              className="form-control"
              placeholder="e.g. Water Reservoir Cleaning Schedule or Diwali Meeting"
              value={newAnn.title}
              onChange={e => setNewAnn({ ...newAnn, title: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label required">Category</label>
              <select 
                className="form-control"
                value={newAnn.category}
                onChange={e => setNewAnn({ ...newAnn, category: e.target.value })}
              >
                {categories.filter(c => c !== 'All').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label required">Priority Level</label>
              <select 
                className="form-control"
                value={newAnn.priority}
                onChange={e => setNewAnn({ ...newAnn, priority: e.target.value })}
              >
                <option value="Urgent">🚨 Urgent (Water / Lift Outage)</option>
                <option value="High">⚠️ High (General Body / Dues)</option>
                <option value="Medium">⚡ Medium (Festival / Events)</option>
                <option value="Low">🌱 Low (General Notice)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label required">Apartment Scope</label>
              <select 
                className="form-control"
                value={newAnn.apartmentScope}
                onChange={e => setNewAnn({ ...newAnn, apartmentScope: e.target.value })}
              >
                <option value="All Apartments">All Apartments (Enclave-wide)</option>
                <option value="Golden Apartment">Golden Apartment Only</option>
                <option value="Silver Apartment">Silver Apartment Only</option>
                <option value="Diamond Apartment">Diamond Apartment Only</option>
                <option value="Golden & Silver Apartments">Golden & Silver Apartments</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label required">Target Audience</label>
              <select 
                className="form-control"
                value={newAnn.targetAudience}
                onChange={e => setNewAnn({ ...newAnn, targetAudience: e.target.value })}
              >
                <option value="All Residents">All Residents (Owners & Tenants)</option>
                <option value="Flat Owners Only">Flat Owners Only (AGM Voting)</option>
                <option value="Tenants Only">Tenants Only</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label required">Announcement Details</label>
            <textarea 
              rows={4}
              className="form-control"
              placeholder="Provide timings, instructions for residents, contact numbers, and guidelines..."
              value={newAnn.description}
              onChange={e => setNewAnn({ ...newAnn, description: e.target.value })}
              required
            />
          </div>

          <div style={{ marginBottom: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={newAnn.pinned}
                onChange={e => setNewAnn({ ...newAnn, pinned: e.target.checked })}
              />
              <span>Pin this notice to top of resident dashboards</span>
            </label>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '10px' }}>
              Publish Broadcast
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setIsPublishModalOpen(false)}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
