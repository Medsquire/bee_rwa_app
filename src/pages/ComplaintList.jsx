import React, { useState } from 'react';
import { useRwa } from '../context/RwaContext';
import { ComplaintDetailsModal, ComplaintTrackingModal, SAMPLE_ISSUE_PHOTOS } from './ComplaintDetailsModal';
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
  CalendarCheck,
  PartyPopper,
  Crosshair
} from 'lucide-react';

export const getNormalizedComplaintStatus = (status) => {
  const s = (status || '').toLowerCase().trim();
  if (s === 'closed') return 'Closed';
  if (s === 'resolved') return 'Resolved';
  if (s === 'in progress' || s === 'reopened') return 'In Progress';
  if (s === 'approved' || s === 'assigned' || s === 'acknowledged') return 'Approved';
  return 'Pending Approval';
};

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
  const [trackingComplaint, setTrackingComplaint] = useState(null);

  const categories = [
    { id: 'All', label: 'All Issues', icon: Wrench },
    { id: 'Lift / Elevator', label: 'Lifts & Elevators', icon: Layers },
    { id: 'Water Supply', label: 'Water & Pumps', icon: Droplets },
    { id: 'Electricity and Lighting', label: 'Power & DG Backup', icon: Zap },
    { id: 'Park and Garden', label: 'Parks & Grounds', icon: Trees },
    { id: 'Gym Equipment', label: 'Gym & Sports', icon: Dumbbell },
    { id: 'Cleanliness', label: 'Cleaning & STP', icon: Sparkles },
    { id: 'Function Hall', label: 'Function Hall', icon: PartyPopper }
  ];

  const getComplaintScope = (cmp) => {
    const loc = (cmp.location || '').toLowerCase();
    const sub = (cmp.submittedBy || '').toLowerCase();
    const apt = (cmp.apartment || '').toLowerCase();

    if (cmp.tower) {
      if (cmp.tower.includes('1')) return 'Golden Tower 1';
      if (cmp.tower.includes('2')) return 'Golden Tower 2';
      if (cmp.tower.includes('3')) return 'Golden Tower 3';
      return 'Common Area';
    }

    if (apt.includes('tower-1') || apt.includes('tower 1') || apt.includes('gt-1') || apt.includes('gt1')) return 'Golden Tower 1';
    if (apt.includes('tower-2') || apt.includes('tower 2') || apt.includes('gt-2') || apt.includes('gt2')) return 'Golden Tower 2';
    if (apt.includes('tower-3') || apt.includes('tower 3') || apt.includes('gt-3') || apt.includes('gt3')) return 'Golden Tower 3';

    if (
      loc.includes('main entry gate') ||
      loc.includes('central park') ||
      loc.includes('gymnasium') ||
      loc.includes('clubhouse') ||
      loc.includes('swimming pool') ||
      loc.includes('hall') ||
      loc.includes('haul') ||
      loc.includes('banquet') ||
      loc.includes('function') ||
      loc.includes('common')
    ) {
      return 'Common Area';
    }

    if (loc.includes('tower 1') || loc.includes('gt1') || sub.includes('gt1-') || loc.includes('gt-1')) return 'Golden Tower 1';
    if (loc.includes('tower 2') || loc.includes('gt2') || sub.includes('gt2-') || loc.includes('gt-2')) return 'Golden Tower 2';
    if (loc.includes('tower 3') || loc.includes('gt3') || sub.includes('gt3-') || loc.includes('gt-3')) return 'Golden Tower 3';

    return 'Common Area';
  };

  const getComplaintFloor = (cmp) => {
    if (cmp.floor) return cmp.floor;
    const loc = (cmp.location || '').toLowerCase();
    const title = (cmp.title || '').toLowerCase();
    const sub = (cmp.submittedBy || '').toLowerCase();

    if (loc.includes('rooftop') || title.includes('rooftop')) return 'Rooftop';
    if (loc.includes('basement') || loc.includes('p2') || loc.includes('p1')) {
      if (loc.includes('p2')) return 'Basement (P2)';
      if (loc.includes('p1')) return 'Basement (P1)';
      return 'Basement';
    }
    if (loc.includes('gymnasium') || loc.includes('gym') || loc.includes('central park') || loc.includes('gate') || loc.includes('ground')) {
      return 'Ground Floor';
    }
    if (loc.includes('sports annex')) return '1st Floor';

    const multiFloorMatch = loc.match(/(?:floor\s*(\d+\s*-\s*\d+)|(\d+(?:st|nd|rd|th)?\s*(?:&|and)\s*\d+(?:st|nd|rd|th)?)\s*floor)/i);
    if (multiFloorMatch) {
      return multiFloorMatch[1] ? `Floor ${multiFloorMatch[1]}` : multiFloorMatch[2] + ' Floor';
    }

    const singleFloorMatch = loc.match(/(\d+)(?:st|nd|rd|th)?\s*floor/i);
    if (singleFloorMatch) {
      return `${singleFloorMatch[1]}th Floor`;
    }

    const flatMatch = sub.match(/gt\d+-(\d+)/i) || loc.match(/gt\d+-(\d+)/i);
    if (flatMatch) {
      const flatNum = parseInt(flatMatch[1], 10);
      const floorNum = Math.floor(flatNum / 100);
      if (floorNum === 0) return 'Ground Floor';
      if (floorNum === 1) return '1st Floor';
      if (floorNum === 2) return '2nd Floor';
      if (floorNum === 3) return '3rd Floor';
      return `${floorNum}th Floor`;
    }

    return 'Common Floor';
  };

  const tower1Complaints = complaints.filter(c => getComplaintScope(c) === 'Golden Tower 1');
  const tower2Complaints = complaints.filter(c => getComplaintScope(c) === 'Golden Tower 2');
  const tower3Complaints = complaints.filter(c => getComplaintScope(c) === 'Golden Tower 3');
  const commonAreaComplaints = complaints.filter(c => getComplaintScope(c) === 'Common Area');

  const filteredComplaints = complaints.filter(cmp => {
    const matchesApt = selectedApartment === 'All' || 
      cmp.apartment === selectedApartment ||
      (selectedApartment === 'Golden Apartment' && (
        cmp.apartment === 'Golden Apartment' ||
        cmp.apartment?.toLowerCase().includes('tower') ||
        cmp.apartment?.toLowerCase().includes('golden')
      ));
    const normalizedStatus = getNormalizedComplaintStatus(cmp.status);
    const matchesStatus = statusFilter === 'All' 
      ? true 
      : normalizedStatus === statusFilter;
    const matchesPriority = priorityFilter === 'All' || cmp.priority === priorityFilter;
    const matchesCategory = activeCategory === 'All' || 
      cmp.category === activeCategory ||
      (activeCategory === 'Function Hall' && (
        cmp.category === 'Function Hall' ||
        cmp.category === 'Function Haul' ||
        cmp.category === 'function haul' ||
        (cmp.location && (cmp.location.toLowerCase().includes('hall') || cmp.location.toLowerCase().includes('haul') || cmp.location.toLowerCase().includes('banquet') || cmp.location.toLowerCase().includes('function'))) ||
        (cmp.title && (cmp.title.toLowerCase().includes('hall') || cmp.title.toLowerCase().includes('haul') || cmp.title.toLowerCase().includes('banquet')))
      ));
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
    if (c.includes('lift') || c.includes('elevator')) return <Layers size={14} color="#3B82F6" />;
    if (c.includes('water') || c.includes('plumb')) return <Droplets size={14} color="#06B6D4" />;
    if (c.includes('light') || c.includes('elect')) return <Zap size={14} color="#F59E0B" />;
    if (c.includes('gym') || c.includes('sport')) return <Dumbbell size={14} color="#8B5CF6" />;
    if (c.includes('park') || c.includes('garden')) return <Trees size={14} color="#10B981" />;
    if (c.includes('hall') || c.includes('haul') || c.includes('banquet') || c.includes('function')) return <PartyPopper size={14} color="#EC4899" />;
    return <Wrench size={14} color="#64748B" />;
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

      {/* Horizontal Asset Category Selector (Icon-driven, less text) */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '4px'
      }}>
        {categories.map(cat => {
          const isSelected = cat.id === 'All' 
            ? (activeCategory === 'All' && selectedScope === 'All')
            : (activeCategory === cat.id);
          const Icon = cat.icon;
          const count = cat.id === 'All' 
            ? complaints.length 
            : complaints.filter(c => 
                c.category === cat.id || 
                (cat.id === 'Function Hall' && (
                  c.category === 'Function Hall' ||
                  c.category === 'Function Haul' ||
                  c.category === 'function haul' ||
                  (c.location && (c.location.toLowerCase().includes('hall') || c.location.toLowerCase().includes('haul') || c.location.toLowerCase().includes('banquet') || c.location.toLowerCase().includes('function'))) ||
                  (c.title && (c.title.toLowerCase().includes('hall') || c.title.toLowerCase().includes('haul') || c.title.toLowerCase().includes('banquet')))
                ))
              ).length;

          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                if (cat.id === 'All') {
                  setSelectedScope('All');
                }
              }}
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
            <option value="Pending Approval">Pending Approval</option>
            <option value="Approved">Approved</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <span style={{ fontSize: '0.8125rem', color: '#64748B' }}>
          Showing <strong>{filteredComplaints.length}</strong> of <strong>{complaints.length}</strong> work orders
        </span>
      </div>

      {/* Classified Table matching parallel app */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        border: '1px solid #E2E8F0',
        overflow: 'hidden',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.03)'
      }}>
        <div className="table-responsive">
          <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                <th style={{ padding: '8px 10px', fontSize: '0.675rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', width: '50px', textAlign: 'center' }}>S.NO</th>
                <th style={{ padding: '8px 10px', fontSize: '0.675rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CATEGORY</th>
                <th style={{ padding: '8px 10px', fontSize: '0.675rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>FLOOR</th>
                <th style={{ padding: '8px 10px', fontSize: '0.675rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>LOCATION</th>
                <th style={{ padding: '8px 10px', fontSize: '0.675rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ASSIGNED TECHNICIAN</th>
                <th style={{ padding: '8px 10px', fontSize: '0.675rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>STATUS</th>
                <th style={{ padding: '8px 10px', fontSize: '0.675rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>IMAGE</th>
                <th style={{ padding: '8px 10px', fontSize: '0.675rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '24px', color: '#64748B', fontSize: '0.8rem' }}>
                    No complaints match your criteria.
                  </td>
                </tr>
              ) : (
                filteredComplaints.map((cmp, index) => {
                  const isAwaitingApproval = cmp.status === 'Pending Approval' || cmp.requiresApproval;
                  const isPending = cmp.status === 'Pending' || cmp.status === 'Submitted';
                  const isInProgress = cmp.status === 'In Progress' || cmp.status === 'Assigned';

                  return (
                    <tr key={cmp.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      {/* S.NO */}
                      <td style={{ padding: '8px 10px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                        <span style={{
                          backgroundColor: '#F1F5F9',
                          color: '#475569',
                          padding: '2px 7px',
                          borderRadius: '5px',
                          fontWeight: 700,
                          fontSize: '0.72rem'
                        }}>
                          {index + 1}
                        </span>
                      </td>

                      {/* CATEGORY */}
                      <td style={{ padding: '8px 10px', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} title={cmp.title}>
                          <div style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            backgroundColor: '#F1F5F9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            {getCategoryIcon(cmp.category)}
                          </div>
                          <span style={{ fontWeight: 650, fontSize: '0.8125rem', color: '#0F172A' }}>
                            {cmp.category}
                          </span>
                        </div>
                      </td>

                      {/* FLOOR */}
                      <td style={{ padding: '8px 10px', whiteSpace: 'nowrap' }}>
                        <span style={{
                          backgroundColor: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          color: '#334155',
                          padding: '2px 7px',
                          borderRadius: '5px',
                          fontWeight: 600,
                          fontSize: '0.72rem',
                          display: 'inline-block'
                        }}>
                          {getComplaintFloor(cmp)}
                        </span>
                      </td>

                      {/* LOCATION */}
                      <td style={{ padding: '8px 10px', whiteSpace: 'nowrap' }}>
                        <div style={{ fontSize: '0.76rem', fontWeight: 600, color: '#334155' }}>
                          {cmp.apartment.split(' ')[0]}
                        </div>
                        <div style={{ fontSize: '0.675rem', color: '#64748B', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {cmp.location}
                        </div>
                      </td>

                      {/* ASSIGNED TECHNICIAN */}
                      <td style={{ padding: '8px 10px', whiteSpace: 'nowrap' }}>
                        {cmp.assignedTo && cmp.assignedTo !== 'Unassigned' ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.76rem', fontWeight: 600, color: '#0F172A' }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
                            <span>{cmp.assignedTo.split('(')[0].trim()}</span>
                          </div>
                        ) : (
                          <span style={{ fontSize: '0.7rem', color: '#EA580C', fontWeight: 600, backgroundColor: '#FFF7ED', padding: '1px 6px', borderRadius: '4px' }}>
                            Needs Dispatch
                          </span>
                        )}
                      </td>

                      {/* STATUS PILL */}
                      <td style={{ padding: '8px 10px', whiteSpace: 'nowrap' }}>
                        {(() => {
                          const displayStatus = getNormalizedComplaintStatus(cmp.status);
                          const stylesByStatus = {
                            'Pending Approval': {
                              bg: '#FEF3C7',
                              color: '#92400E',
                              border: '#FCD34D',
                              dot: '#D97706'
                            },
                            'Approved': {
                              bg: '#ECFDF5',
                              color: '#065F46',
                              border: '#A7F3D0',
                              dot: '#059669'
                            },
                            'In Progress': {
                              bg: '#EFF6FF',
                              color: '#1D4ED8',
                              border: '#BFDBFE',
                              dot: '#2563EB'
                            },
                            'Resolved': {
                              bg: '#F0FDF4',
                              color: '#15803D',
                              border: '#BBF7D0',
                              dot: '#16A34A'
                            },
                            'Closed': {
                              bg: '#F1F5F9',
                              color: '#475569',
                              border: '#CBD5E1',
                              dot: '#64748B'
                            }
                          };
                          const st = stylesByStatus[displayStatus] || stylesByStatus['Pending Approval'];

                          return (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                              <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                padding: '3px 9px',
                                borderRadius: '9999px',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                backgroundColor: st.bg,
                                color: st.color,
                                border: `1px solid ${st.border}`
                              }}>
                                <span style={{
                                  width: '6px',
                                  height: '6px',
                                  borderRadius: '50%',
                                  backgroundColor: st.dot
                                }} />
                                {displayStatus}
                              </span>
                            </div>
                          );
                        })()}
                      </td>

                      {/* IMAGE */}
                      <td style={{ padding: '8px 10px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                        <div
                          onClick={() => setSelectedComplaint(cmp)}
                          style={{
                            width: '42px',
                            height: '32px',
                            borderRadius: '6px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            display: 'inline-block',
                            border: '1.5px solid #CBD5E1',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                            transition: 'all 0.15s ease',
                            backgroundColor: '#0F172A',
                            verticalAlign: 'middle'
                          }}
                          title="Click to view full work order popup"
                          onMouseEnter={e => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                            e.currentTarget.style.borderColor = '#2563EB';
                            e.currentTarget.style.boxShadow = '0 4px 10px rgba(37, 99, 235, 0.25)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.transform = 'scale(1.0)';
                            e.currentTarget.style.borderColor = '#CBD5E1';
                            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
                          }}
                        >
                          <img
                            src={cmp.photoUrl || (SAMPLE_ISSUE_PHOTOS && SAMPLE_ISSUE_PHOTOS[cmp.category]) || 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=400&q=80'}
                            alt={cmp.title}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              display: 'block'
                            }}
                          />
                        </div>
                      </td>

                      {/* ACTION */}
                      <td style={{ padding: '8px 10px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <button
                            onClick={() => setSelectedComplaint(cmp)}
                            style={{
                              backgroundColor: isAwaitingApproval ? '#FFFBEB' : 'transparent',
                              border: isAwaitingApproval ? '1px solid #F59E0B' : '1px solid #CBD5E1',
                              color: isAwaitingApproval ? '#B45309' : '#2563EB',
                              padding: '4px 9px',
                              borderRadius: '5px',
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '3px',
                              transition: 'all 0.15s ease'
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.backgroundColor = '#EFF6FF';
                              e.currentTarget.style.borderColor = '#2563EB';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.backgroundColor = isAwaitingApproval ? '#FFFBEB' : 'transparent';
                              e.currentTarget.style.borderColor = isAwaitingApproval ? '#F59E0B' : '#CBD5E1';
                            }}
                          >
                            <span>{isAwaitingApproval ? 'Review & Approve' : 'Manage'}</span>
                            <ChevronRight size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details & Dispatch Modal */}
      {selectedComplaint && (
        <ComplaintDetailsModal
          complaint={complaints.find(c => c.id === selectedComplaint.id) || selectedComplaint}
          isOpen={!!selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
        />
      )}

      {/* Complaint Tracking Modal */}
      {trackingComplaint && (
        <ComplaintTrackingModal
          complaint={complaints.find(c => c.id === trackingComplaint.id) || trackingComplaint}
          isOpen={!!trackingComplaint}
          onClose={() => setTrackingComplaint(null)}
        />
      )}
    </div>
  );
};
