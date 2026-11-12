import React, { useState, useMemo } from 'react';
import { useRwa } from '../context/RwaContext';
import { ComplaintDetailsModal, isComplaintApproved } from './ComplaintDetailsModal';
import {
  Wrench,
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
    setActiveTab,
    theme
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

  const getCategoryShort = (cat) => {
    if (!cat) return '';
    const map = {
      'Lift / Elevator': 'Lifts',
      'Lift & Elevator': 'Lifts',
      'Water Supply': 'Water',
      'Water & Pump': 'Water',
      'Electricity and Lighting': 'Power',
      'Plumbing': 'Plumbing',
      'Park and Garden': 'Parks',
      'Gym Equipment': 'Gym',
      'Indoor Sports': 'Sports',
      'Cleanliness': 'Cleaning',
      'Security': 'Security',
      'Function Hall': 'Hall',
      'Civil & Structural': 'Structure'
    };
    return map[cat] || cat.split(' ')[0] || cat;
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
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Dashboard
          </h1>
        </div>
      </div>

      {/* 1. Overview of Application in Small Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '10px'
      }}>
        {/* Complaints */}
        <div
          onClick={() => setActiveTab('complaints')}
          style={{
            backgroundColor: 'var(--card-bg, #FFFFFF)',
            borderRadius: '8px',
            padding: '10px 12px',
            border: '1px solid var(--border-color)',
            borderLeft: '3px solid #2563EB',
            boxShadow: 'var(--shadow-sm)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            transition: 'transform 0.12s ease, box-shadow 0.12s ease'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
        >
          <div>
            <div style={{ fontSize: '0.675rem', fontWeight: 700, color: 'var(--text-secondary)' }}>COMPLAINTS</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              {totalComplaintsCount}
            </div>
            <div style={{ fontSize: '0.675rem', color: '#F97316', fontWeight: 600 }}>
              {pendingCount} pending
            </div>
          </div>
          <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: theme === 'dark' ? 'rgba(37, 99, 235, 0.2)' : '#EFF6FF', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Wrench size={16} strokeWidth={1.5} />
          </div>
        </div>

        {/* Approvals */}
        <div
          onClick={() => setActiveTab('approvals')}
          style={{
            backgroundColor: 'var(--card-bg, #FFFFFF)',
            borderRadius: '8px',
            padding: '10px 12px',
            border: '1px solid var(--border-color)',
            borderLeft: '3px solid #F59E0B',
            boxShadow: 'var(--shadow-sm)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            transition: 'transform 0.12s ease, box-shadow 0.12s ease'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
        >
          <div>
            <div style={{ fontSize: '0.675rem', fontWeight: 700, color: 'var(--text-secondary)' }}>APPROVALS</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              {pendingApprovalsCount}
            </div>
            <div style={{ fontSize: '0.675rem', color: '#F59E0B', fontWeight: 600 }}>
              Pending sign-off
            </div>
          </div>
          <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: theme === 'dark' ? 'rgba(245, 158, 11, 0.2)' : '#FEF3C7', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ShieldCheck size={16} strokeWidth={1.5} />
          </div>
        </div>

        {/* Today's Announcements Card */}
        <div
          onClick={() => setActiveTab('announcements')}
          style={{
            backgroundColor: 'var(--card-bg, #FFFFFF)',
            borderRadius: '8px',
            padding: '10px 12px',
            border: '1px solid var(--border-color)',
            borderLeft: '3px solid #8B5CF6',
            boxShadow: 'var(--shadow-sm)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            transition: 'transform 0.12s ease, box-shadow 0.12s ease'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
          title={todaysAnnouncements[0] ? `Today: ${todaysAnnouncements[0].title}` : "Today's Announcements"}
        >
          <div>
            <div style={{ fontSize: '0.675rem', fontWeight: 700, color: 'var(--text-secondary)' }}>TODAY'S ANNOUNCEMENTS</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              {todaysAnnouncementsCount}
            </div>
            <div style={{ fontSize: '0.675rem', color: '#8B5CF6', fontWeight: 600 }}>
              {todaysAnnouncementsCount === 1 ? '1 notice today' : `${todaysAnnouncementsCount} notices today`}
            </div>
          </div>
          <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: theme === 'dark' ? 'rgba(139, 92, 246, 0.2)' : '#F3E8FF', color: '#A78BFA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Megaphone size={16} strokeWidth={1.5} />
          </div>
        </div>

        {/* Active Agencies */}
        <div
          onClick={() => setActiveTab('agencies')}
          style={{
            backgroundColor: 'var(--card-bg, #FFFFFF)',
            borderRadius: '8px',
            padding: '10px 12px',
            border: '1px solid var(--border-color)',
            borderLeft: '3px solid #10B981',
            boxShadow: 'var(--shadow-sm)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            transition: 'transform 0.12s ease, box-shadow 0.12s ease'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
        >
          <div>
            <div style={{ fontSize: '0.675rem', fontWeight: 700, color: 'var(--text-secondary)' }}>ACTIVE AGENCIES</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              {activeAgenciesCount}
            </div>
            <div style={{ fontSize: '0.675rem', color: '#10B981', fontWeight: 600 }}>
              Facility vendors
            </div>
          </div>
          <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: theme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Building2 size={16} strokeWidth={1.5} />
          </div>
        </div>

        {/* Residents */}
        <div
          onClick={() => setActiveTab('residents')}
          style={{
            backgroundColor: 'var(--card-bg, #FFFFFF)',
            borderRadius: '8px',
            padding: '10px 12px',
            border: '1px solid var(--border-color)',
            borderLeft: '3px solid #06B6D4',
            boxShadow: 'var(--shadow-sm)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            transition: 'transform 0.12s ease, box-shadow 0.12s ease'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
        >
          <div>
            <div style={{ fontSize: '0.675rem', fontWeight: 700, color: 'var(--text-secondary)' }}>RESIDENTS</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              {residentsCount}
            </div>
            <div style={{ fontSize: '0.675rem', color: '#06B6D4', fontWeight: 600 }}>
              Enclave members
            </div>
          </div>
          <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: theme === 'dark' ? 'rgba(6, 182, 212, 0.2)' : '#ECFEFF', color: '#06B6D4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
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
          backgroundColor: 'var(--card-bg, #FFFFFF)',
          borderRadius: '10px',
          padding: '14px 18px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PieChart size={17} strokeWidth={1.5} color="#2563EB" />
              <span style={{ fontSize: '0.825rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
                TICKETS RESOLUTION STATUS
              </span>
            </div>
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              color: '#16A34A',
              backgroundColor: theme === 'dark' ? 'rgba(22, 163, 74, 0.2)' : '#F0FDF4',
              padding: '2px 7px',
              borderRadius: '5px',
              border: '1px solid rgba(22, 163, 74, 0.3)'
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
                <circle cx="50" cy="50" r={donutRadius} fill="none" stroke={theme === 'dark' ? '#1E293B' : '#F1F5F9'} strokeWidth="12" />
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
                <text x="50" y="47" textAnchor="middle" fontSize="15" fontWeight="800" fill="var(--text-primary)">
                  {totalComplaintsCount}
                </text>
                <text x="50" y="59" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="var(--text-muted)">
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
                  backgroundColor: statusFilter === 'Resolved' ? (theme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : '#F0FDF4') : 'var(--bg-hover)',
                  border: statusFilter === 'Resolved' ? '1px solid #10B981' : '1px solid var(--border-color)',
                  cursor: 'pointer', fontSize: '0.7rem', transition: 'all 0.12s ease'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#16A34A', fontWeight: 700 }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                  Resolved
                </span>
                <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{completedCount}</span>
              </div>

              <div
                onClick={() => setStatusFilter(statusFilter === 'In Progress' ? 'All' : 'In Progress')}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '3px 8px', borderRadius: '6px',
                  backgroundColor: statusFilter === 'In Progress' ? (theme === 'dark' ? 'rgba(37, 99, 235, 0.2)' : '#EFF6FF') : 'var(--bg-hover)',
                  border: statusFilter === 'In Progress' ? '1px solid #3B82F6' : '1px solid var(--border-color)',
                  cursor: 'pointer', fontSize: '0.7rem', transition: 'all 0.12s ease'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2563EB', fontWeight: 700 }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#2563EB' }} />
                  In Progress
                </span>
                <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{inProgressCount}</span>
              </div>

              <div
                onClick={() => setStatusFilter(statusFilter === 'Pending' ? 'All' : 'Pending')}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '3px 8px', borderRadius: '6px',
                  backgroundColor: statusFilter === 'Pending' ? (theme === 'dark' ? 'rgba(249, 115, 22, 0.2)' : '#FFF7ED') : 'var(--bg-hover)',
                  border: statusFilter === 'Pending' ? '1px solid #F97316' : '1px solid var(--border-color)',
                  cursor: 'pointer', fontSize: '0.7rem', transition: 'all 0.12s ease'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#EA580C', fontWeight: 700 }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#F97316' }} />
                  Pending
                </span>
                <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{pendingCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Complaints by Category Bar Graph */}
        <div style={{
          backgroundColor: 'var(--card-bg, #FFFFFF)',
          borderRadius: '10px',
          padding: '14px 18px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '10px'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 size={17} strokeWidth={1.5} color="#2563EB" />
              <span style={{ fontSize: '0.825rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
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
                  backgroundColor: theme === 'dark' ? 'rgba(37, 99, 235, 0.2)' : '#EFF6FF',
                  padding: '2px 7px',
                  borderRadius: '5px',
                  border: '1px solid rgba(37, 99, 235, 0.35)',
                  cursor: 'pointer'
                }}
                title="Click to reset category filter"
              >
                Filtered: {categoryFilter} ✕
              </button>
            ) : (
              <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                {categoryBarData.total} Complaints Logged
              </span>
            )}
          </div>

          {/* SVG Bar Chart */}
          <div style={{ width: '100%', height: '94px', position: 'relative' }}>
            <svg width="100%" height="94" viewBox="0 0 320 94" style={{ overflow: 'visible' }}>
              {/* Background Guideline Lines */}
              <line x1="8" y1="20" x2="312" y2="20" stroke={theme === 'dark' ? '#1E293B' : '#F1F5F9'} strokeDasharray="3 3" />
              <line x1="8" y1="46" x2="312" y2="46" stroke={theme === 'dark' ? '#1E293B' : '#F1F5F9'} strokeDasharray="3 3" />
              <line x1="8" y1="74" x2="312" y2="74" stroke="var(--border-color)" strokeWidth="1" />

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
                      fill={bar.count > 0 ? bar.color : (theme === 'dark' ? '#1E293B' : '#E2E8F0')}
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
                        fill="var(--text-primary)"
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
                      fill={isSelected ? '#3B82F6' : 'var(--text-secondary)'}
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
        backgroundColor: 'var(--card-bg, #FFFFFF)',
        borderRadius: '10px',
        padding: '14px 16px',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Filter Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {/* Search */}
            <div style={{ position: 'relative', width: '220px' }}>
              <Search size={13} strokeWidth={1.5} style={{ position: 'absolute', left: '9px', top: '9px', color: 'var(--text-muted)' }} />
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
                  backgroundColor: 'var(--bg-input, #F8FAFC)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>

            {/* Status Pills */}
            <div style={{ display: 'flex', backgroundColor: 'var(--bg-hover)', padding: '2px', borderRadius: '6px', gap: '2px' }}>
              {['All', 'Pending', 'In Progress', 'Resolved'].map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  style={{
                    backgroundColor: statusFilter === st ? 'var(--card-bg, #FFFFFF)' : 'transparent',
                    color: statusFilter === st ? 'var(--text-primary)' : 'var(--text-secondary)',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 10px',
                    fontSize: '0.72rem',
                    fontWeight: statusFilter === st ? 700 : 500,
                    cursor: 'pointer',
                    boxShadow: statusFilter === st ? 'var(--shadow-sm)' : 'none'
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
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-input, #F8FAFC)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                lineHeight: '30px',
                boxSizing: 'border-box'
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
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-input, #F8FAFC)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                lineHeight: '30px',
                boxSizing: 'border-box'
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

        {/* Individual Complaint Cards - Separate Cards with Redesigned Modern UI */}
        {filteredComplaints.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '36px 12px', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
            No complaints found matching current filters.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '14px'
          }}>
            {filteredComplaints.map(cmp => {
              const isApproved = isComplaintApproved(cmp);
              const towerName = getComplaintTower(cmp);
              const isCommon = towerName === 'Common Area';
              const locationText = cmp.floor || cmp.location || cmp.apartment;
              const cleanSubmitter = cmp.submittedBy ? cmp.submittedBy.split('(')[0].trim() : '';

              const priorityStyles = {
                'Urgent': { bg: theme === 'dark' ? 'rgba(239, 68, 68, 0.2)' : '#FEF2F2', text: '#EF4444', border: 'rgba(239, 68, 68, 0.35)' },
                'High': { bg: theme === 'dark' ? 'rgba(245, 158, 11, 0.2)' : '#FFFBEB', text: '#F59E0B', border: 'rgba(245, 158, 11, 0.35)' },
                'Medium': { bg: theme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : '#EFF6FF', text: '#3B82F6', border: 'rgba(59, 130, 246, 0.35)' },
                'Low': { bg: theme === 'dark' ? 'rgba(148, 163, 184, 0.15)' : '#F1F5F9', text: '#94A3B8', border: 'rgba(148, 163, 184, 0.3)' }
              };
              const pStyle = priorityStyles[cmp.priority] || priorityStyles['Medium'];

              return (
                <div
                  key={cmp.id}
                  onClick={() => setSelectedComplaint(cmp)}
                  style={{
                    backgroundColor: 'var(--card-bg, #FFFFFF)',
                    color: 'var(--text-primary)',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    padding: '16px',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                    height: '100%',
                    boxSizing: 'border-box'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                    e.currentTarget.style.borderColor = '#3B82F6';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                  }}
                >
                  {/* Top Header: Category Pill & ID on left, Approval Badge neatly at top-right */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        backgroundColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : '#EFF6FF',
                        color: theme === 'dark' ? '#93C5FD' : '#1D4ED8',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        border: '1px solid rgba(59, 130, 246, 0.25)'
                      }}>
                        {getCategoryIcon(cmp.category)}
                        <span>{getCategoryShort(cmp.category)}</span>
                      </span>

                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: 'var(--text-muted)',
                        backgroundColor: 'var(--bg-hover)',
                        padding: '3px 7px',
                        borderRadius: '6px',
                        border: '1px solid var(--border-color)'
                      }}>
                        {cmp.id}
                      </span>
                    </div>

                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '3px 9px',
                      borderRadius: '9999px',
                      fontSize: '0.675rem',
                      fontWeight: 700,
                      backgroundColor: isApproved ? (theme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : '#ECFDF5') : (theme === 'dark' ? 'rgba(245, 158, 11, 0.2)' : '#FEF3C7'),
                      color: isApproved ? '#10B981' : '#F59E0B',
                      border: `1px solid ${isApproved ? 'rgba(16, 185, 129, 0.35)' : 'rgba(245, 158, 11, 0.35)'}`,
                      flexShrink: 0
                    }}>
                      <span style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        backgroundColor: isApproved ? '#10B981' : '#F59E0B'
                      }} />
                      {isApproved ? 'Approved' : 'Pending'}
                    </span>
                  </div>

                  {/* Complaint Title with improved typography & spacing */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h4 style={{
                      fontSize: '0.875rem',
                      fontWeight: 650,
                      color: 'var(--text-primary)',
                      margin: 0,
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }} title={cmp.title}>
                      {cmp.title}
                    </h4>

                    {/* Organized Tower & Location Section */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.73rem',
                      color: 'var(--text-secondary)',
                      flexWrap: 'wrap'
                    }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        backgroundColor: isCommon ? (theme === 'dark' ? 'rgba(16, 185, 129, 0.15)' : '#F0FDF4') : (theme === 'dark' ? 'rgba(59, 130, 246, 0.15)' : '#F8FAFC'),
                        color: isCommon ? '#10B981' : (theme === 'dark' ? '#93C5FD' : '#334155'),
                        border: `1px solid ${isCommon ? 'rgba(16, 185, 129, 0.25)' : 'var(--border-color)'}`,
                        padding: '2px 7px',
                        borderRadius: '5px',
                        fontWeight: 700,
                        flexShrink: 0
                      }}>
                        <Building2 size={11} strokeWidth={1.5} />
                        {isCommon ? 'Common Area' : towerName.replace('Golden ', '')}
                      </span>

                      {locationText && (
                        <span style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          color: 'var(--text-secondary)',
                          maxWidth: '190px'
                        }}>
                          • {locationText}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer Row: Priority & Submitter Visually Separated, Details on Right */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '10px',
                    marginTop: '2px',
                    fontSize: '0.72rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                      <span style={{
                        fontSize: '0.675rem',
                        fontWeight: 800,
                        padding: '2px 7px',
                        borderRadius: '4px',
                        backgroundColor: pStyle.bg,
                        color: pStyle.text,
                        border: `1px solid ${pStyle.border}`,
                        flexShrink: 0
                      }}>
                        {cmp.priority || 'Normal'}
                      </span>

                      {cleanSubmitter && (
                        <span style={{
                          color: 'var(--text-secondary)',
                          fontSize: '0.7rem',
                          maxWidth: '110px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {cleanSubmitter}
                        </span>
                      )}
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                      color: '#3B82F6',
                      fontWeight: 700,
                      fontSize: '0.74rem',
                      flexShrink: 0
                    }}>
                      <span>Details</span>
                      <ChevronRight size={13} strokeWidth={1.5} />
                    </div>
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
