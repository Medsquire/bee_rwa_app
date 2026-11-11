import React, { useState, useMemo } from 'react';
import { useRwa } from '../context/RwaContext';
import { ComplaintDetailsModal, isComplaintApproved } from './ComplaintDetailsModal';
import {
  Wrench,
  UserPlus,
  Search,
  ChevronRight,
  ShieldCheck,
  Megaphone,
  Building2,
  Users,
  CalendarCheck,
  Layers,
  Droplets,
  Zap,
  PieChart,
  BarChart3,
  Sparkles
} from 'lucide-react';

export const Dashboard = () => {
  const {
    currentUser,
    apartments,
    selectedApartment,
    complaints,
    registrationRequests,
    announcements,
    agencies,
    residents,
    setActiveTab
  } = useRwa();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [towerFilter, setTowerFilter] = useState('All');
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Helper to determine Tower or Common Area for a complaint
  const getComplaintTower = (cmp) => {
    if (cmp.tower) {
      if (cmp.tower.includes('1')) return 'Golden Tower 1';
      if (cmp.tower.includes('2')) return 'Golden Tower 2';
      if (cmp.tower.includes('3')) return 'Golden Tower 3';
      if (cmp.tower.toLowerCase().includes('common')) return 'Common Area';
      return cmp.tower;
    }
    const loc = (cmp.location || '').toLowerCase();
    const title = (cmp.title || '').toLowerCase();
    const sub = (cmp.submittedBy || '').toLowerCase();
    const place = (cmp.placeName || '').toLowerCase();
    const floor = (cmp.floor || '').toLowerCase();

    // Check Common Area keywords first
    if (
      loc.includes('main entry gate') ||
      loc.includes('boom barrier') ||
      loc.includes('gate 1') ||
      loc.includes('central park') ||
      loc.includes('gymnasium') ||
      loc.includes('gym') ||
      loc.includes('clubhouse') ||
      loc.includes('swimming pool') ||
      loc.includes('pool deck') ||
      loc.includes('banquet') ||
      loc.includes('function hall') ||
      place.includes('swimming pool') ||
      place.includes('gym') ||
      place.includes('clubhouse') ||
      place.includes('park') ||
      (cmp.complaintScope === 'Common Area' && !loc.includes('tower'))
    ) {
      return 'Common Area';
    }
    
    if (loc.includes('tower 1') || loc.includes('gt-1') || loc.includes('gt1') || title.includes('tower 1') || sub.includes('gt1') || floor.includes('gt1')) {
      return 'Golden Tower 1';
    }
    if (loc.includes('tower 2') || loc.includes('gt-2') || loc.includes('gt2') || title.includes('tower 2') || sub.includes('gt2') || floor.includes('gt2')) {
      return 'Golden Tower 2';
    }
    if (loc.includes('tower 3') || loc.includes('gt-3') || loc.includes('gt3') || title.includes('tower 3') || sub.includes('gt3') || floor.includes('gt3')) {
      return 'Golden Tower 3';
    }
    return 'Common Area';
  };

  // Dynamic category list from complaints
  const categoriesList = useMemo(() => {
    const set = new Set((complaints || []).map(c => c.category).filter(Boolean));
    return ['All', ...Array.from(set).sort()];
  }, [complaints]);

  // Filter complaints
  const filteredComplaints = complaints.filter(cmp => {
    const cmpTower = getComplaintTower(cmp);
    const matchesTower = towerFilter === 'All' || cmpTower === towerFilter;

    const matchesApt = selectedApartment === 'All' || 
      cmp.apartment === selectedApartment ||
      (selectedApartment === 'Golden Apartment' && (
        cmp.apartment === 'Golden Apartment' ||
        cmp.apartment?.toLowerCase().includes('tower') ||
        cmp.apartment?.toLowerCase().includes('golden')
      ));
    const matchesStatus = statusFilter === 'All' ||
      (statusFilter === 'Pending' && ['Pending', 'Submitted', 'Pending Approval'].includes(cmp.status)) ||
      (statusFilter === 'In Progress' && ['In Progress', 'Assigned'].includes(cmp.status)) ||
      (statusFilter === 'Resolved' && ['Resolved', 'Closed', 'Approved'].includes(cmp.status));
    const matchesCategory = categoryFilter === 'All' || 
      cmp.category === categoryFilter ||
      (categoryFilter === 'Water Supply' && ((cmp.category || '').toLowerCase().includes('water') || (cmp.category || '').toLowerCase().includes('plumb'))) ||
      (categoryFilter === 'Lift / Elevator' && (cmp.category || '').toLowerCase().includes('lift')) ||
      (categoryFilter === 'Cleanliness' && (cmp.category || '').toLowerCase().includes('clean')) ||
      (categoryFilter === 'Electricity and Lighting' && ((cmp.category || '').toLowerCase().includes('elect') || (cmp.category || '').toLowerCase().includes('light'))) ||
      (categoryFilter === 'Civil & Structural' && (cmp.category || '').toLowerCase().includes('civil')) ||
      (categoryFilter === 'Gym Equipment' && ((cmp.category || '').toLowerCase().includes('gym') || (cmp.category || '').toLowerCase().includes('sport') || (cmp.category || '').toLowerCase().includes('hall')));
    const matchesSearch =
      cmp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmp.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmp.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cmp.location && cmp.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (cmp.assignedTo && cmp.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesTower && matchesApt && matchesStatus && matchesCategory && matchesSearch;
  });

  // Group complaints by category (e.g. "Water Supply - 2 complaints", "Lift / Elevator - 1 complaint")
  const complaintsByCategory = useMemo(() => {
    const groups = {};
    filteredComplaints.forEach(cmp => {
      const cat = cmp.category || 'General';
      if (!groups[cat]) {
        groups[cat] = [];
      }
      groups[cat].push(cmp);
    });
    return groups;
  }, [filteredComplaints]);

  // Category Icon Helper
  const getCategoryIcon = (cat) => {
    const c = (cat || '').toLowerCase();
    if (c.includes('lift') || c.includes('elevator')) return <Layers size={15} strokeWidth={1.5} />;
    if (c.includes('water')) return <Droplets size={15} strokeWidth={1.5} />;
    if (c.includes('plumb')) return <Wrench size={15} strokeWidth={1.5} />;
    if (c.includes('elect') || c.includes('light')) return <Zap size={15} strokeWidth={1.5} />;
    if (c.includes('gym')) return <Sparkles size={15} strokeWidth={1.5} />;
    if (c.includes('clean')) return <Sparkles size={15} strokeWidth={1.5} />;
    if (c.includes('secur')) return <ShieldCheck size={15} strokeWidth={1.5} />;
    if (c.includes('civil') || c.includes('struct')) return <Building2 size={15} strokeWidth={1.5} />;
    if (c.includes('sport')) return <CalendarCheck size={15} strokeWidth={1.5} />;
    return <Wrench size={15} strokeWidth={1.5} />;
  };

  // Overview Counts (Staff activity, bookings, and lifts active cards removed as requested)
  const totalComplaintsCount = (complaints || []).length;
  const pendingCount = (complaints || []).filter(c => ['Submitted', 'Pending', 'Pending Approval'].includes(c.status)).length;
  const inProgressCount = (complaints || []).filter(c => ['Assigned', 'In Progress'].includes(c.status)).length;
  const completedCount = (complaints || []).filter(c => ['Resolved', 'Closed', 'Approved'].includes(c.status)).length;
  
  const pendingApprovalsCount = (registrationRequests || []).filter(r => r.status === 'Pending').length;

  // Today's announcements (matches app simulated date Nov 10, 2026 or current system date)
  const todaysAnnouncements = useMemo(() => {
    const today = new Date();
    const realTodayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const simulatedTodayStr = '2026-11-10';

    return (announcements || []).filter(ann => {
      if (!ann.publishedDate) return false;
      const datePart = String(ann.publishedDate).split(' ')[0];
      return datePart === simulatedTodayStr || datePart === realTodayStr;
    });
  }, [announcements]);

  const todaysAnnouncementsCount = todaysAnnouncements.length;
  const activeAgenciesCount = (agencies || []).filter(a => a.status === 'Active').length || (agencies || []).length;
  const residentsCount = (residents || []).length;

  // Resolution Rate
  const resolutionPct = Math.round((completedCount / (totalComplaintsCount || 1)) * 100);

  // SVG Donut Math (Complaint Resolution Status)
  const donutRadius = 40;
  const donutCircumference = 2 * Math.PI * donutRadius; // ~251.32
  const resolvedStroke = totalComplaintsCount > 0 ? (completedCount / totalComplaintsCount) * donutCircumference : 0;
  const inProgressStroke = totalComplaintsCount > 0 ? (inProgressCount / totalComplaintsCount) * donutCircumference : 0;
  const pendingStroke = totalComplaintsCount > 0 ? (pendingCount / totalComplaintsCount) * donutCircumference : 0;

  // Complaints Category Bar Chart Aggregation (shows complaints like "lift", "water", etc.)
  const categoryBarData = useMemo(() => {
    const baseList = (complaints || []).filter(cmp => {
      const cmpTower = getComplaintTower(cmp);
      return towerFilter === 'All' || cmpTower === towerFilter;
    });

    const categoryBuckets = [
      { key: 'Water Supply', label: 'Water', color: '#0284C7', match: ['water', 'plumb'] },
      { key: 'Lift / Elevator', label: 'Lift', color: '#4F46E5', match: ['lift', 'elevator'] },
      { key: 'Cleanliness', label: 'Clean', color: '#10B981', match: ['clean', 'waste', 'chute'] },
      { key: 'Electricity and Lighting', label: 'Power', color: '#D97706', match: ['elect', 'light'] },
      { key: 'Civil & Structural', label: 'Civil', color: '#8B5CF6', match: ['civil', 'struct'] },
      { key: 'Gym Equipment', label: 'Amenities', color: '#E11D48', match: ['gym', 'pool', 'sport', 'barrier', 'hall'] }
    ];

    const bars = categoryBuckets.map(b => {
      const count = baseList.filter(cmp => {
        const c = (cmp.category || '').toLowerCase();
        const t = (cmp.title || '').toLowerCase();
        return b.match.some(m => c.includes(m) || t.includes(m));
      }).length;
      return {
        ...b,
        count
      };
    });

    const maxCount = Math.max(...bars.map(b => b.count), 1);
    return { bars, maxCount, total: baseList.length };
  }, [complaints, towerFilter]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Top Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
            Dashboard
          </h1>

        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('complaint_new')}
            className="btn btn-primary btn-sm"
            style={{ padding: '6px 12px', fontSize: '0.78rem', borderRadius: '6px' }}
          >
            <Wrench size={13} strokeWidth={1.5} /> Log Complaint
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className="btn btn-secondary btn-sm"
            style={{ padding: '6px 12px', fontSize: '0.78rem', borderRadius: '6px' }}
          >
            <UserPlus size={13} strokeWidth={1.5} /> Add Resident
          </button>
        </div>
      </div>

      {/* 1. Overview of Application in Small Cards (Staff activity, bookings, and lifts active cards removed) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '10px'
      }}>
        {/* Complaints */}
        <div
          onClick={() => setActiveTab('complaints')}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '10px 12px',
            border: '1px solid #E2E8F0',
            borderLeft: '3px solid #2563EB',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            transition: 'transform 0.12s ease, box-shadow 0.12s ease'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.06)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.03)'; }}
        >
          <div>
            <div style={{ fontSize: '0.675rem', fontWeight: 700, color: '#64748B' }}>COMPLAINTS</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>
              {totalComplaintsCount}
            </div>
            <div style={{ fontSize: '0.675rem', color: '#F97316', fontWeight: 600 }}>
              {pendingCount} pending
            </div>
          </div>
          <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Wrench size={16} strokeWidth={1.5} />
          </div>
        </div>

        {/* Approvals */}
        <div
          onClick={() => setActiveTab('approvals')}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '10px 12px',
            border: '1px solid #E2E8F0',
            borderLeft: '3px solid #F59E0B',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            transition: 'transform 0.12s ease, box-shadow 0.12s ease'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.06)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.03)'; }}
        >
          <div>
            <div style={{ fontSize: '0.675rem', fontWeight: 700, color: '#64748B' }}>APPROVALS</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>
              {pendingApprovalsCount}
            </div>
            <div style={{ fontSize: '0.675rem', color: '#F59E0B', fontWeight: 600 }}>
              Pending sign-off
            </div>
          </div>
          <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#FEF3C7', color: '#B45309', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ShieldCheck size={16} strokeWidth={1.5} />
          </div>
        </div>

        {/* Today's Announcements Card */}
        <div
          onClick={() => setActiveTab('announcements')}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '10px 12px',
            border: '1px solid #E2E8F0',
            borderLeft: '3px solid #8B5CF6',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            transition: 'transform 0.12s ease, box-shadow 0.12s ease'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.06)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.03)'; }}
          title={todaysAnnouncements[0] ? `Today: ${todaysAnnouncements[0].title}` : "Today's Announcements"}
        >
          <div>
            <div style={{ fontSize: '0.675rem', fontWeight: 700, color: '#64748B' }}>TODAY'S ANNOUNCEMENTS</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>
              {todaysAnnouncementsCount}
            </div>
            <div style={{ fontSize: '0.675rem', color: '#8B5CF6', fontWeight: 600 }}>
              {todaysAnnouncementsCount === 1 ? '1 notice today' : `${todaysAnnouncementsCount} notices today`}
            </div>
          </div>
          <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#F3E8FF', color: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Megaphone size={16} strokeWidth={1.5} />
          </div>
        </div>

        {/* Active Agencies */}
        <div
          onClick={() => setActiveTab('agencies')}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '10px 12px',
            border: '1px solid #E2E8F0',
            borderLeft: '3px solid #10B981',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            transition: 'transform 0.12s ease, box-shadow 0.12s ease'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.06)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.03)'; }}
        >
          <div>
            <div style={{ fontSize: '0.675rem', fontWeight: 700, color: '#64748B' }}>ACTIVE AGENCIES</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>
              {activeAgenciesCount}
            </div>
            <div style={{ fontSize: '0.675rem', color: '#10B981', fontWeight: 600 }}>
              Facility vendors
            </div>
          </div>
          <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Building2 size={16} strokeWidth={1.5} />
          </div>
        </div>

        {/* Residents */}
        <div
          onClick={() => setActiveTab('residents')}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '10px 12px',
            border: '1px solid #E2E8F0',
            borderLeft: '3px solid #06B6D4',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            transition: 'transform 0.12s ease, box-shadow 0.12s ease'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.06)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.03)'; }}
        >
          <div>
            <div style={{ fontSize: '0.675rem', fontWeight: 700, color: '#64748B' }}>RESIDENTS</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>
              {residentsCount}
            </div>
            <div style={{ fontSize: '0.675rem', color: '#06B6D4', fontWeight: 600 }}>
              Enclave members
            </div>
          </div>
          <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#ECFEFF', color: '#06B6D4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Users size={16} strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* 2. Visual Analytics: Donut (Resolution Status) & Bar Graph (Complaints by Category) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '14px'
      }}>
        {/* Left Card: Ticket Resolution Status Donut */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          padding: '14px 18px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.03)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PieChart size={17} strokeWidth={1.5} color="#2563EB" />
              <span style={{ fontSize: '0.825rem', fontWeight: 800, color: '#0F172A', letterSpacing: '0.02em' }}>
                TICKETS RESOLUTION STATUS
              </span>
            </div>
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              color: '#16A34A',
              backgroundColor: '#F0FDF4',
              padding: '2px 7px',
              borderRadius: '5px',
              border: '1px solid #DCFCE7'
            }}>
              {resolutionPct}% Resolved
            </span>
          </div>

          {/* Donut Graphic + Legend */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            {/* Donut SVG */}
            <div style={{ position: 'relative', width: '92px', height: '92px', flexShrink: 0, margin: '0 auto' }}>
              <svg width="92" height="92" viewBox="0 0 100 100">
                {/* Background Ring Track */}
                <circle cx="50" cy="50" r={donutRadius} fill="none" stroke="#F1F5F9" strokeWidth="12" />
                <g transform="rotate(-90 50 50)">
                  {resolvedStroke > 0 && (
                    <circle cx="50" cy="50" r={donutRadius} fill="none" stroke="#10B981" strokeWidth="12"
                      strokeDasharray={`${resolvedStroke} ${donutCircumference}`} strokeDashoffset="0" strokeLinecap="round" />
                  )}
                  {inProgressStroke > 0 && (
                    <circle cx="50" cy="50" r={donutRadius} fill="none" stroke="#2563EB" strokeWidth="12"
                      strokeDasharray={`${inProgressStroke} ${donutCircumference}`} strokeDashoffset={-resolvedStroke} />
                  )}
                  {pendingStroke > 0 && (
                    <circle cx="50" cy="50" r={donutRadius} fill="none" stroke="#F97316" strokeWidth="12"
                      strokeDasharray={`${pendingStroke} ${donutCircumference}`} strokeDashoffset={-(resolvedStroke + inProgressStroke)} />
                  )}
                </g>
                <text x="50" y="47" textAnchor="middle" fontSize="15" fontWeight="800" fill="#0F172A">
                  {totalComplaintsCount}
                </text>
                <text x="50" y="59" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#64748B">
                  TICKETS
                </text>
              </svg>
            </div>

            {/* Legend pills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '135px', flex: 1 }}>
              <div
                onClick={() => setStatusFilter(statusFilter === 'Resolved' ? 'All' : 'Resolved')}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '3px 8px', borderRadius: '6px',
                  backgroundColor: statusFilter === 'Resolved' ? '#F0FDF4' : '#F8FAFC',
                  border: statusFilter === 'Resolved' ? '1px solid #86EFAC' : '1px solid #E2E8F0',
                  cursor: 'pointer', fontSize: '0.7rem', transition: 'all 0.12s ease'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#16A34A', fontWeight: 700 }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                  Resolved
                </span>
                <span style={{ fontWeight: 800, color: '#0F172A' }}>{completedCount}</span>
              </div>

              <div
                onClick={() => setStatusFilter(statusFilter === 'In Progress' ? 'All' : 'In Progress')}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '3px 8px', borderRadius: '6px',
                  backgroundColor: statusFilter === 'In Progress' ? '#EFF6FF' : '#F8FAFC',
                  border: statusFilter === 'In Progress' ? '1px solid #BFDBFE' : '1px solid #E2E8F0',
                  cursor: 'pointer', fontSize: '0.7rem', transition: 'all 0.12s ease'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2563EB', fontWeight: 700 }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#2563EB' }} />
                  In Progress
                </span>
                <span style={{ fontWeight: 800, color: '#0F172A' }}>{inProgressCount}</span>
              </div>

              <div
                onClick={() => setStatusFilter(statusFilter === 'Pending' ? 'All' : 'Pending')}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '3px 8px', borderRadius: '6px',
                  backgroundColor: statusFilter === 'Pending' ? '#FFF7ED' : '#F8FAFC',
                  border: statusFilter === 'Pending' ? '1px solid #FED7AA' : '1px solid #E2E8F0',
                  cursor: 'pointer', fontSize: '0.7rem', transition: 'all 0.12s ease'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#EA580C', fontWeight: 700 }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#F97316' }} />
                  Pending
                </span>
                <span style={{ fontWeight: 800, color: '#0F172A' }}>{pendingCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Complaints by Category Bar Graph */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          padding: '14px 18px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.03)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '10px'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 size={17} strokeWidth={1.5} color="#2563EB" />
              <span style={{ fontSize: '0.825rem', fontWeight: 800, color: '#0F172A', letterSpacing: '0.02em' }}>
                COMPLAINTS BY CATEGORY
              </span>
            </div>
            {categoryFilter !== 'All' ? (
              <button
                type="button"
                onClick={() => setCategoryFilter('All')}
                style={{
                  fontSize: '0.675rem',
                  fontWeight: 700,
                  color: '#2563EB',
                  backgroundColor: '#EFF6FF',
                  padding: '2px 7px',
                  borderRadius: '5px',
                  border: '1px solid #BFDBFE',
                  cursor: 'pointer'
                }}
                title="Click to reset category filter"
              >
                Filtered: {categoryFilter} ✕
              </button>
            ) : (
              <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>
                {categoryBarData.total} Complaints Logged
              </span>
            )}
          </div>

          {/* SVG Bar Chart */}
          <div style={{ width: '100%', height: '94px', position: 'relative' }}>
            <svg width="100%" height="94" viewBox="0 0 320 94" style={{ overflow: 'visible' }}>
              {/* Background Guideline Lines */}
              <line x1="8" y1="20" x2="312" y2="20" stroke="#F1F5F9" strokeDasharray="3 3" />
              <line x1="8" y1="46" x2="312" y2="46" stroke="#F1F5F9" strokeDasharray="3 3" />
              <line x1="8" y1="74" x2="312" y2="74" stroke="#E2E8F0" strokeWidth="1" />

              {/* Render Each Category Bar */}
              {categoryBarData.bars.map((bar, idx) => {
                const totalBars = categoryBarData.bars.length;
                const slotWidth = 304 / totalBars;
                const barWidth = 24;
                const xCenter = 8 + (idx * slotWidth) + (slotWidth / 2);
                const barX = xCenter - (barWidth / 2);

                const barHeight = bar.count > 0 
                  ? Math.max(8, Math.round((bar.count / categoryBarData.maxCount) * 50))
                  : 4;
                const barY = 74 - barHeight;
                const isSelected = categoryFilter === bar.key;

                return (
                  <g 
                    key={bar.key}
                    onClick={() => setCategoryFilter(categoryFilter === bar.key ? 'All' : bar.key)}
                    style={{ cursor: 'pointer' }}
                  >
                    <title>{`${bar.label}: ${bar.count} complaint(s) - Click to filter`}</title>

                    {/* Active highlight glow/outline if selected */}
                    {isSelected && (
                      <rect
                        x={barX - 3}
                        y={barY - 3}
                        width={barWidth + 6}
                        height={barHeight + 6}
                        rx="6"
                        ry="6"
                        fill="none"
                        stroke="#2563EB"
                        strokeWidth="2"
                        opacity="0.8"
                      />
                    )}

                    {/* The Bar */}
                    <rect
                      x={barX}
                      y={barY}
                      width={barWidth}
                      height={barHeight}
                      rx="4"
                      ry="4"
                      fill={bar.count > 0 ? bar.color : '#E2E8F0'}
                      opacity={isSelected ? 1 : 0.88}
                      style={{ transition: 'all 0.2s ease' }}
                    />

                    {/* Value text above bar */}
                    {bar.count > 0 && (
                      <text
                        x={xCenter}
                        y={barY - 4}
                        textAnchor="middle"
                        fontSize="9.5"
                        fontWeight="800"
                        fill="#0F172A"
                      >
                        {bar.count}
                      </text>
                    )}

                    {/* Category Label below axis */}
                    <text
                      x={xCenter}
                      y="88"
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight={isSelected ? '800' : '700'}
                      fill={isSelected ? '#2563EB' : '#475569'}
                    >
                      {bar.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* 3. Complaints Grouped by Category - NO DESCRIPTION DISPLAYED */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        padding: '14px 16px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.03)'
      }}>
        {/* Filter Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {/* Search */}
            <div style={{ position: 'relative', width: '220px' }}>
              <Search size={13} strokeWidth={1.5} style={{ position: 'absolute', left: '9px', top: '9px', color: '#94A3B8' }} />
              <input
                type="text"
                placeholder="Search ticket, category, flat..."
                className="form-control"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{
                  paddingLeft: '28px',
                  height: '32px',
                  fontSize: '0.78rem',
                  borderRadius: '6px',
                  backgroundColor: '#F8FAFC',
                  borderColor: '#E2E8F0'
                }}
              />
            </div>

            {/* Status Pills */}
            <div style={{ display: 'flex', backgroundColor: '#F1F5F9', padding: '2px', borderRadius: '6px', gap: '2px' }}>
              {['All', 'Pending', 'In Progress', 'Resolved'].map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  style={{
                    backgroundColor: statusFilter === st ? '#FFFFFF' : 'transparent',
                    color: statusFilter === st ? '#0F172A' : '#64748B',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 10px',
                    fontSize: '0.72rem',
                    fontWeight: statusFilter === st ? 700 : 500,
                    cursor: 'pointer',
                    boxShadow: statusFilter === st ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
                  }}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              style={{
                height: '32px',
                padding: '0 24px 0 8px',
                fontSize: '0.75rem',
                fontWeight: 600,
                borderRadius: '6px',
                border: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                color: '#334155',
                cursor: 'pointer',
                lineHeight: '30px',
                boxSizing: 'border-box',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 6px center',
                backgroundSize: '11px 11px'
              }}
            >
              {categoriesList.map(cat => (
                <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
              ))}
            </select>

            {/* Tower Filter */}
            <select
              value={towerFilter}
              onChange={e => setTowerFilter(e.target.value)}
              style={{
                height: '32px',
                padding: '0 24px 0 8px',
                fontSize: '0.75rem',
                fontWeight: 600,
                borderRadius: '6px',
                border: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                color: '#334155',
                cursor: 'pointer',
                lineHeight: '30px',
                boxSizing: 'border-box',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 6px center',
                backgroundSize: '11px 11px'
              }}
              title="Filter by Tower"
            >
              <option value="All">All Towers & Areas</option>
              <option value="Golden Tower 1">🏢 Tower 1 (GT-1)</option>
              <option value="Golden Tower 2">🏢 Tower 2 (GT-2)</option>
              <option value="Golden Tower 3">🏢 Tower 3 (GT-3)</option>
              <option value="Common Area">🌳 Common Area</option>
            </select>

            {(statusFilter !== 'All' || categoryFilter !== 'All' || towerFilter !== 'All' || searchTerm) && (
              <button
                type="button"
                onClick={() => {
                  setStatusFilter('All');
                  setCategoryFilter('All');
                  setTowerFilter('All');
                  setSearchTerm('');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#2563EB',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '2px 6px'
                }}
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Category Cards: Displays complaints based on category (e.g. "Water Supply - 2 complaints", "Lift / Elevator - 1 complaint") */}
        {Object.keys(complaintsByCategory).length === 0 ? (
          <div style={{ textAlign: 'center', padding: '36px 12px', color: '#64748B', fontSize: '0.8125rem' }}>
            No complaints found matching current filters.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '12px'
          }}>
            {Object.entries(complaintsByCategory).map(([catName, catComplaints]) => {
              return (
                <div
                  key={catName}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* Category Header: Name & Total Complaints */}
                  <div style={{
                    padding: '10px 14px',
                    backgroundColor: '#F8FAFC',
                    borderBottom: '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        backgroundColor: '#EFF6FF',
                        color: '#2563EB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {getCategoryIcon(catName)}
                      </div>
                      <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#0F172A' }}>
                        {catName}
                      </span>
                    </div>

                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#2563EB',
                      backgroundColor: '#EFF6FF',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      border: '1px solid #DBEAFE',
                      flexShrink: 0
                    }}>
                      {catComplaints.length} {catComplaints.length === 1 ? 'complaint' : 'complaints'}
                    </span>
                  </div>

                  {/* Compact Complaint Items - WITHOUT description */}
                  <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                    {catComplaints.map(cmp => {
                      const isApproved = isComplaintApproved(cmp);

                      return (
                        <div
                          key={cmp.id}
                          onClick={() => setSelectedComplaint(cmp)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '7px 9px',
                            borderRadius: '6px',
                            backgroundColor: '#F8FAFC',
                            border: '1px solid #F1F5F9',
                            cursor: 'pointer',
                            transition: 'all 0.12s ease',
                            fontSize: '0.75rem',
                            gap: '8px'
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = '#EFF6FF';
                            e.currentTarget.style.borderColor = '#BFDBFE';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = '#F8FAFC';
                            e.currentTarget.style.borderColor = '#F1F5F9';
                          }}
                        >
                          {/* Ticket ID, Tower Badge & Floor/Location */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0, flex: 1 }}>
                            <span style={{ fontWeight: 800, color: '#2563EB', flexShrink: 0 }}>
                              {cmp.id}
                            </span>
                            {(() => {
                              const towerName = getComplaintTower(cmp);
                              const isCommon = towerName === 'Common Area';
                              return (
                                <span style={{
                                  fontSize: '0.625rem',
                                  fontWeight: 700,
                                  padding: '1px 5px',
                                  borderRadius: '4px',
                                  backgroundColor: isCommon ? '#F0FDF4' : '#EFF6FF',
                                  color: isCommon ? '#15803D' : '#1D4ED8',
                                  border: isCommon ? '1px solid #BBF7D0' : '1px solid #DBEAFE',
                                  flexShrink: 0
                                }}>
                                  {isCommon ? 'Common Area' : towerName.replace('Golden ', '')}
                                </span>
                              );
                            })()}
                            <span style={{ color: '#CBD5E1', flexShrink: 0 }}>•</span>
                            <span style={{ color: '#475569', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {cmp.floor || cmp.location || cmp.apartment}
                            </span>
                          </div>

                          {/* Status Pill & Action Arrow */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '3px',
                              padding: '2px 6px',
                              borderRadius: '9999px',
                              fontSize: '0.65rem',
                              fontWeight: 700,
                              backgroundColor: isApproved ? '#ECFDF5' : '#FEF3C7',
                              color: isApproved ? '#065F46' : '#92400E',
                              border: isApproved ? '1px solid #A7F3D0' : '1px solid #FCD34D'
                            }}>
                              <span style={{
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                backgroundColor: isApproved ? '#059669' : '#D97706'
                              }} />
                              {isApproved ? 'Approved' : 'Pending Approval'}
                            </span>

                            <span style={{ color: '#2563EB', display: 'flex', alignItems: 'center' }}>
                              <ChevronRight size={13} strokeWidth={1.5} />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Details & Approval Modal */}
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
