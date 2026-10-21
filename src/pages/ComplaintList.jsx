import React, { useState } from 'react';
import { useRwa } from '../context/RwaContext';
import { StatusPill, PriorityBadge, ApartmentBadge } from '../components/CommonUI';
import { ComplaintDetailsModal } from './ComplaintDetailsModal';
import { 
  AlertTriangle, 
  PlusCircle, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  User, 
  Eye,
  SlidersHorizontal
} from 'lucide-react';

export const ComplaintList = () => {
  const { 
    complaints, 
    selectedApartment, 
    setSelectedApartment, 
    apartments, 
    currentUser, 
    currentRoleKey,
    setActiveTab 
  } = useRwa();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [viewScope, setViewScope] = useState('All'); // 'All' or 'Mine'
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const categories = [
    'All',
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

  const filteredComplaints = complaints.filter(cmp => {
    const matchesApt = selectedApartment === 'All' || cmp.apartment === selectedApartment;
    const matchesStatus = statusFilter === 'All' || cmp.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || cmp.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'All' || cmp.category === categoryFilter;

    const matchesScope = viewScope === 'All' || 
      (cmp.submittedBy.includes(currentUser.name) || cmp.submittedBy.includes(currentUser.flatNumber));

    const matchesSearch = 
      cmp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmp.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmp.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesApt && matchesStatus && matchesPriority && matchesCategory && matchesScope && matchesSearch;
  });

  const openCount = complaints.filter(c => ['Submitted', 'Assigned', 'In Progress'].includes(c.status)).length;
  const urgentCount = complaints.filter(c => c.priority === 'Urgent').length;
  const resolvedCount = complaints.filter(c => ['Resolved', 'Closed'].includes(c.status)).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Complaints & Maintenance Register</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Report, dispatch, and track common area issues across Golden, Silver, and Diamond apartments
          </p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('submit-complaint')}>
          <PlusCircle size={16} /> Raise New Complaint
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid-cols-4">
        <div className="glass-card" style={{ borderLeft: '4px solid var(--electric-blue)' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600 }}>TOTAL LOGGED</div>
          <div className="stat-value" style={{ marginTop: '4px' }}>{complaints.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>All-time service requests</div>
        </div>
        <div className="glass-card" style={{ borderLeft: '4px solid var(--warning)' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600 }}>ACTIVE IN PROGRESS</div>
          <div className="stat-value" style={{ marginTop: '4px', color: 'var(--warning)' }}>{openCount}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Under technician inspection</div>
        </div>
        <div className="glass-card" style={{ borderLeft: '4px solid var(--error)' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600 }}>URGENT ESCALATIONS</div>
          <div className="stat-value" style={{ marginTop: '4px', color: 'var(--error)' }}>{urgentCount}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>High impact on residents</div>
        </div>
        <div className="glass-card" style={{ borderLeft: '4px solid var(--success)' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600 }}>RESOLVED & CLOSED</div>
          <div className="stat-value" style={{ marginTop: '4px', color: 'var(--success)' }}>{resolvedCount}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Work verified & completed</div>
        </div>
      </div>

      {/* Filter and Search Bar Card */}
      <div className="glass-card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Top Row: Search and Scope */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ position: 'relative', width: '320px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search ticket #, title, area, staff..."
                className="form-control"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '36px' }}
              />
            </div>

            {/* Scope Toggle for Residents */}
            {['flat_owner', 'tenant'].includes(currentRoleKey) && (
              <div style={{ display: 'flex', backgroundColor: 'var(--bg-hover)', borderRadius: 'var(--radius-md)', padding: '2px', border: '1px solid var(--border-color)' }}>
                <button
                  onClick={() => setViewScope('All')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: viewScope === 'All' ? 'var(--electric-blue)' : 'transparent',
                    color: viewScope === 'All' ? '#FFFFFF' : 'var(--text-secondary)'
                  }}
                >
                  All Community Tickets
                </button>
                <button
                  onClick={() => setViewScope('Mine')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: viewScope === 'Mine' ? 'var(--electric-blue)' : 'transparent',
                    color: viewScope === 'Mine' ? '#FFFFFF' : 'var(--text-secondary)'
                  }}
                >
                  My Submitted Tickets
                </button>
              </div>
            )}
          </div>

          {/* Bottom Row: Detailed Dropdowns */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Status:</span>
              <select 
                className="form-control"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                style={{ width: 'auto', height: '34px', fontSize: '0.8125rem' }}
              >
                <option value="All">All Statuses</option>
                <option value="Submitted">Submitted</option>
                <option value="Acknowledged">Acknowledged</option>
                <option value="Assigned">Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
                <option value="Reopened">Reopened</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Priority:</span>
              <select 
                className="form-control"
                value={priorityFilter}
                onChange={e => setPriorityFilter(e.target.value)}
                style={{ width: 'auto', height: '34px', fontSize: '0.8125rem' }}
              >
                <option value="All">All Priorities</option>
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Category:</span>
              <select 
                className="form-control"
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                style={{ width: 'auto', height: '34px', fontSize: '0.8125rem' }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Apartment:</span>
              <select 
                className="form-control"
                value={selectedApartment}
                onChange={e => setSelectedApartment(e.target.value)}
                style={{ width: 'auto', height: '34px', fontSize: '0.8125rem' }}
              >
                <option value="All">All Apartments</option>
                {apartments.map(a => (
                  <option key={a.id} value={a.name}>{a.name}</option>
                ))}
              </select>
            </div>

            {(statusFilter !== 'All' || priorityFilter !== 'All' || categoryFilter !== 'All' || selectedApartment !== 'All') && (
              <button 
                onClick={() => {
                  setStatusFilter('All');
                  setPriorityFilter('All');
                  setCategoryFilter('All');
                  setSelectedApartment('All');
                  setSearchTerm('');
                }}
                style={{ background: 'none', border: 'none', color: 'var(--electric-blue)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Complaints Table */}
        <div className="table-responsive" style={{ marginTop: '16px' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Issue Title</th>
                <th>Category</th>
                <th>Apartment & Area</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assigned Technician</th>
                <th>Logged At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: '36px', color: 'var(--text-secondary)' }}>
                    No complaints match your criteria.
                  </td>
                </tr>
              ) : (
                filteredComplaints.map(cmp => (
                  <tr key={cmp.id}>
                    <td style={{ fontWeight: 800, color: 'var(--electric-blue)' }}>{cmp.id}</td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{cmp.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>By: {cmp.submittedBy}</div>
                    </td>
                    <td>
                      <span className="badge badge-indigo">{cmp.category}</span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{cmp.apartment}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cmp.location}</div>
                    </td>
                    <td><PriorityBadge priority={cmp.priority} /></td>
                    <td><StatusPill status={cmp.status} /></td>
                    <td style={{ fontSize: '0.8125rem', fontWeight: 500 }}>
                      {cmp.assignedTo === 'Unassigned' ? (
                        <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Pending Dispatch</span>
                      ) : (
                        <span style={{ color: 'var(--text-primary)' }}>{cmp.assignedTo}</span>
                      )}
                    </td>
                    <td style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                      {cmp.createdAt}
                    </td>
                    <td>
                      <button 
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '4px 10px' }}
                        onClick={() => setSelectedComplaint(cmp)}
                      >
                        <Eye size={13} /> View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details & Dispatch Modal */}
      {selectedComplaint && (
        <ComplaintDetailsModal 
          complaint={selectedComplaint}
          isOpen={!!selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
        />
      )}
    </div>
  );
};
