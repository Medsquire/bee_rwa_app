import React, { useState } from 'react';
import { useRwa } from '../context/RwaContext';
import { ComplaintDetailsModal } from './ComplaintDetailsModal';
import { StatCard } from '../components/CommonUI';
import { 
  AlertTriangle, 
  PlusCircle, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  RefreshCw, 
  Wrench, 
  User, 
  MapPin, 
  ChevronRight, 
  Layers, 
  Droplets, 
  Zap, 
  Dumbbell, 
  Trees, 
  Sparkles, 
  ShieldAlert,
  Building2,
  CalendarCheck
} from 'lucide-react';

export const ComplaintList = () => {
  const { 
    complaints, 
    selectedApartment, 
    setSelectedApartment, 
    apartments, 
    setActiveTab 
  } = useRwa();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedScope, setSelectedScope] = useState('All');
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const categories = [
    { id: 'All', label: 'All Issues', icon: Wrench },
    { id: 'Lift / Elevator', label: 'Lifts & Elevators', icon: Layers },
    { id: 'Water Supply', label: 'Water & Pumps', icon: Droplets },
    { id: 'Electricity and Lighting', label: 'Power & DG Backup', icon: Zap },
    { id: 'Park and Garden', label: 'Parks & Grounds', icon: Trees },
    { id: 'Gym Equipment', label: 'Gym & Sports', icon: Dumbbell },
    { id: 'Cleanliness', label: 'Cleaning & STP', icon: Sparkles }
  ];

  const getComplaintScope = (cmp) => {
    const loc = (cmp.location || '').toLowerCase();
    const sub = (cmp.submittedBy || '').toLowerCase();

    if (cmp.tower) {
      if (cmp.tower.includes('1')) return 'Golden Tower 1';
      if (cmp.tower.includes('2')) return 'Golden Tower 2';
      if (cmp.tower.includes('3')) return 'Golden Tower 3';
      return 'Common Area';
    }

    if (
      loc.includes('main entry gate') ||
      loc.includes('central park') ||
      loc.includes('gymnasium') ||
      loc.includes('clubhouse') ||
      loc.includes('swimming pool') ||
      loc.includes('common')
    ) {
      return 'Common Area';
    }

    if (loc.includes('tower 1') || loc.includes('gt1') || sub.includes('gt1-') || loc.includes('gt-1')) return 'Golden Tower 1';
    if (loc.includes('tower 2') || loc.includes('gt2') || sub.includes('gt2-') || loc.includes('gt-2')) return 'Golden Tower 2';
    if (loc.includes('tower 3') || loc.includes('gt3') || sub.includes('gt3-') || loc.includes('gt-3')) return 'Golden Tower 3';

    return 'Common Area';
  };

  const tower1Complaints = complaints.filter(c => getComplaintScope(c) === 'Golden Tower 1');
  const tower2Complaints = complaints.filter(c => getComplaintScope(c) === 'Golden Tower 2');
  const tower3Complaints = complaints.filter(c => getComplaintScope(c) === 'Golden Tower 3');
  const commonAreaComplaints = complaints.filter(c => getComplaintScope(c) === 'Common Area');

  const filteredComplaints = complaints.filter(cmp => {
    const matchesApt = selectedApartment === 'All' || cmp.apartment === selectedApartment;
    const matchesStatus = statusFilter === 'All' || cmp.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || cmp.priority === priorityFilter;
    const matchesCategory = activeCategory === 'All' || cmp.category === activeCategory;
    const matchesScope = selectedScope === 'All' || getComplaintScope(cmp) === selectedScope;
    const matchesSearch = 
      cmp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmp.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cmp.assignedTo && cmp.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesApt && matchesStatus && matchesPriority && matchesCategory && matchesScope && matchesSearch;
  });

  const getCategoryIcon = (cat) => {
    const c = (cat || '').toLowerCase();
    if (c.includes('lift') || c.includes('elevator')) return <Layers size={16} color="#3B82F6" />;
    if (c.includes('water') || c.includes('plumb')) return <Droplets size={16} color="#06B6D4" />;
    if (c.includes('light') || c.includes('elect')) return <Zap size={16} color="#F59E0B" />;
    if (c.includes('gym') || c.includes('sport')) return <Dumbbell size={16} color="#8B5CF6" />;
    if (c.includes('park') || c.includes('garden')) return <Trees size={16} color="#10B981" />;
    return <Wrench size={16} color="#64748B" />;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Page Title & Action */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Issue Resolving & Maintenance
          </h1>
        </div>

        <button 
          className="btn btn-primary btn-sm"
          onClick={() => setActiveTab('submit-complaint')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <PlusCircle size={16} />
          <span>Log Maintenance Issue</span>
        </button>
      </div>

      {/* 4 Cards: Golden Tower 1, Golden Tower 2, Golden Tower 3, Common Area Complaints */}
      <div className="grid-cols-4" style={{ gap: '14px' }}>
        <StatCard 
          title="GOLDEN TOWER 1 COMPLAINT"
          value={tower1Complaints.length}
          subtitle={`${tower1Complaints.filter(c => c.status !== 'Resolved' && c.status !== 'Closed').length} Active • ${tower1Complaints.filter(c => c.status === 'Resolved' || c.status === 'Closed').length} Resolved`}
          icon={Building2}
          color="amber"
          compact
          onClick={() => setSelectedScope(prev => prev === 'Golden Tower 1' ? 'All' : 'Golden Tower 1')}
          style={{
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            transform: selectedScope === 'Golden Tower 1' ? 'translateY(-2px)' : 'none',
            boxShadow: selectedScope === 'Golden Tower 1' ? '0 0 0 2px #F59E0B, 0 4px 12px rgba(245, 158, 11, 0.25)' : undefined,
            backgroundColor: selectedScope === 'Golden Tower 1' ? 'rgba(245, 158, 11, 0.08)' : undefined
          }}
        />
        <StatCard 
          title="GOLDEN TOWER 2 COMPLAINT"
          value={tower2Complaints.length}
          subtitle={`${tower2Complaints.filter(c => c.status !== 'Resolved' && c.status !== 'Closed').length} Active • ${tower2Complaints.filter(c => c.status === 'Resolved' || c.status === 'Closed').length} Resolved`}
          icon={Building2}
          color="blue"
          compact
          onClick={() => setSelectedScope(prev => prev === 'Golden Tower 2' ? 'All' : 'Golden Tower 2')}
          style={{
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            transform: selectedScope === 'Golden Tower 2' ? 'translateY(-2px)' : 'none',
            boxShadow: selectedScope === 'Golden Tower 2' ? '0 0 0 2px #3B82F6, 0 4px 12px rgba(59, 130, 246, 0.25)' : undefined,
            backgroundColor: selectedScope === 'Golden Tower 2' ? 'rgba(59, 130, 246, 0.08)' : undefined
          }}
        />
        <StatCard 
          title="GOLDEN TOWER 3 COMPLAINT"
          value={tower3Complaints.length}
          subtitle={`${tower3Complaints.filter(c => c.status !== 'Resolved' && c.status !== 'Closed').length} Active • ${tower3Complaints.filter(c => c.status === 'Resolved' || c.status === 'Closed').length} Resolved`}
          icon={Building2}
          color="indigo"
          compact
          onClick={() => setSelectedScope(prev => prev === 'Golden Tower 3' ? 'All' : 'Golden Tower 3')}
          style={{
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            transform: selectedScope === 'Golden Tower 3' ? 'translateY(-2px)' : 'none',
            boxShadow: selectedScope === 'Golden Tower 3' ? '0 0 0 2px #6366F1, 0 4px 12px rgba(99, 102, 241, 0.25)' : undefined,
            backgroundColor: selectedScope === 'Golden Tower 3' ? 'rgba(99, 102, 241, 0.08)' : undefined
          }}
        />
        <StatCard 
          title="COMMON AREA COMPLAINTS"
          value={commonAreaComplaints.length}
          subtitle={`${commonAreaComplaints.filter(c => c.status !== 'Resolved' && c.status !== 'Closed').length} Active • ${commonAreaComplaints.filter(c => c.status === 'Resolved' || c.status === 'Closed').length} Resolved`}
          icon={Trees}
          color="green"
          compact
          onClick={() => setSelectedScope(prev => prev === 'Common Area' ? 'All' : 'Common Area')}
          style={{
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            transform: selectedScope === 'Common Area' ? 'translateY(-2px)' : 'none',
            boxShadow: selectedScope === 'Common Area' ? '0 0 0 2px #10B981, 0 4px 12px rgba(16, 185, 129, 0.25)' : undefined,
            backgroundColor: selectedScope === 'Common Area' ? 'rgba(16, 185, 129, 0.08)' : undefined
          }}
        />
      </div>

      {/* Scope Filter Indicator (if a card is clicked) */}
      {selectedScope !== 'All' && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#EFF6FF',
          border: '1px solid #BFDBFE',
          padding: '8px 16px',
          borderRadius: '8px',
          fontSize: '0.8125rem',
          color: '#1D4ED8',
          fontWeight: 600
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Filtered by: <strong>{selectedScope}</strong> ({filteredComplaints.length} issue{filteredComplaints.length !== 1 ? 's' : ''})</span>
          </div>
          <button
            onClick={() => setSelectedScope('All')}
            style={{
              background: 'none',
              border: 'none',
              color: '#1D4ED8',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.75rem'
            }}
          >
            Show All Complaints
          </button>
        </div>
      )}

      {/* Horizontal Asset Category Selector (Icon-driven, less text) */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '4px'
      }}>
        {categories.map(cat => {
          const isSelected = activeCategory === cat.id;
          const Icon = cat.icon;
          const count = cat.id === 'All' 
            ? complaints.length 
            : complaints.filter(c => c.category === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: '8px',
                border: isSelected ? '1px solid #2563EB' : '1px solid #E2E8F0',
                backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                color: isSelected ? '#2563EB' : '#475569',
                fontWeight: isSelected ? 700 : 500,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              <Icon size={16} style={{ color: isSelected ? '#2563EB' : '#94A3B8' }} />
              <span>{cat.label}</span>
              <span style={{
                backgroundColor: isSelected ? '#2563EB' : '#F1F5F9',
                color: isSelected ? '#FFFFFF' : '#64748B',
                fontSize: '0.6875rem',
                fontWeight: 700,
                padding: '1px 6px',
                borderRadius: '10px'
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        padding: '14px 18px',
        border: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', flex: 1 }}>
          {/* Search Input */}
          <div style={{ position: 'relative', width: '260px' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: '#94A3B8' }} />
            <input 
              type="text" 
              placeholder="Search ticket ID, asset, person..." 
              className="form-control"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '32px', height: '36px', fontSize: '0.8125rem', borderRadius: '6px' }}
            />
          </div>

          {/* Status Dropdown */}
          <select 
            className="form-control"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            style={{ width: 'auto', height: '36px', fontSize: '0.8125rem' }}
          >
            <option value="All">All Statuses</option>
            <option value="Submitted">Pending Dispatch</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          {/* Apartment Dropdown */}
          <select 
            className="form-control"
            value={selectedApartment}
            onChange={e => setSelectedApartment(e.target.value)}
            style={{ width: 'auto', height: '36px', fontSize: '0.8125rem' }}
          >
            <option value="All">All Apartments</option>
            {apartments.map(a => (
              <option key={a.id} value={a.name}>{a.name}</option>
            ))}
          </select>
        </div>

        <span style={{ fontSize: '0.8125rem', color: '#64748B' }}>
          Showing <strong>{filteredComplaints.length}</strong> of <strong>{complaints.length}</strong> work orders
        </span>
      </div>

      {/* Classified Table matching parallel app */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E2E8F0',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
      }}>
        <div className="table-responsive">
          <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                <th style={{ padding: '12px 14px', fontSize: '0.6875rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TICKET ID</th>
                <th style={{ padding: '12px 14px', fontSize: '0.6875rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ISSUE & ASSET</th>
                <th style={{ padding: '12px 14px', fontSize: '0.6875rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>LOCATION</th>
                <th style={{ padding: '12px 14px', fontSize: '0.6875rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ASSIGNED TECHNICIAN</th>
                <th style={{ padding: '12px 14px', fontSize: '0.6875rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>STATUS</th>
                <th style={{ padding: '12px 14px', fontSize: '0.6875rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map(cmp => {
                const isPending = cmp.status === 'Pending' || cmp.status === 'Submitted';
                const isInProgress = cmp.status === 'In Progress' || cmp.status === 'Assigned';

                return (
                  <tr key={cmp.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    {/* TICKET ID */}
                    <td style={{ padding: '14px', whiteSpace: 'nowrap' }}>
                      <span style={{
                        backgroundColor: '#EFF6FF',
                        border: '1px solid #BFDBFE',
                        color: '#2563EB',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontWeight: 700,
                        fontSize: '0.75rem'
                      }}>
                        {cmp.id}
                      </span>
                    </td>

                    {/* ISSUE & ASSET */}
                    <td style={{ padding: '14px', minWidth: '240px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: '#F1F5F9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          {getCategoryIcon(cmp.category)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#0F172A' }}>
                            {cmp.title}
                          </div>
                          <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>
                            {cmp.category} • Priority: <strong style={{ color: cmp.priority === 'Urgent' ? '#EF4444' : '#F59E0B' }}>{cmp.priority}</strong>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* LOCATION */}
                    <td style={{ padding: '14px', whiteSpace: 'nowrap' }}>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#334155' }}>
                        {cmp.apartment.split(' ')[0]}
                      </div>
                      <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>
                        {cmp.location}
                      </div>
                    </td>

                    {/* ASSIGNED TECHNICIAN */}
                    <td style={{ padding: '14px', whiteSpace: 'nowrap' }}>
                      {cmp.assignedTo && cmp.assignedTo !== 'Unassigned' ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', fontWeight: 600, color: '#0F172A' }}>
                          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
                          <span>{cmp.assignedTo.split('(')[0].trim()}</span>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: '#EA580C', fontWeight: 600, backgroundColor: '#FFF7ED', padding: '2px 6px', borderRadius: '4px' }}>
                          Needs Dispatch
                        </span>
                      )}
                    </td>

                    {/* STATUS PILL */}
                    <td style={{ padding: '14px', whiteSpace: 'nowrap' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        backgroundColor: isPending 
                          ? '#FFF7ED' 
                          : isInProgress 
                            ? '#EFF6FF' 
                            : '#F0FDF4',
                        color: isPending 
                          ? '#EA580C' 
                          : isInProgress 
                            ? '#2563EB' 
                            : '#16A34A',
                        border: isPending 
                          ? '1px solid #FED7AA' 
                          : isInProgress 
                            ? '1px solid #BFDBFE' 
                            : '1px solid #BBF7D0'
                      }}>
                        <span style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: isPending ? '#EA580C' : isInProgress ? '#2563EB' : '#16A34A'
                        }} />
                        {cmp.status}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td style={{ padding: '14px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <button
                        onClick={() => setSelectedComplaint(cmp)}
                        style={{
                          backgroundColor: 'transparent',
                          border: '1px solid #CBD5E1',
                          color: '#2563EB',
                          padding: '5px 12px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.backgroundColor = '#EFF6FF';
                          e.currentTarget.style.borderColor = '#2563EB';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.borderColor = '#CBD5E1';
                        }}
                      >
                        <span>Dispatch / Manage</span>
                        <ChevronRight size={13} />
                      </button>
                    </td>
                  </tr>
                );
              })}
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
