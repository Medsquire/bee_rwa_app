import React, { useState } from 'react';
import { useRwa } from '../context/RwaContext';
import { ComplaintDetailsModal } from './ComplaintDetailsModal';
import {
  Wrench,
  UserPlus,
  Search,
  MapPin,
  User,
  ChevronRight,
  LayoutGrid,
  List,
  ShieldCheck,
  Megaphone,
  Building2,
  Users,
  CalendarCheck,
  Layers,
  Droplets,
  Zap
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
    userss,
    bookings,
    setActiveTab
  } = useRwa();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [viewMode, setViewMode] = useState('cards');
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Filter complaints
  const filteredComplaints = complaints.filter(cmp => {
    const matchesApt = selectedApartment === 'All' || 
      cmp.apartment === selectedApartment ||
      (selectedApartment === 'Golden Apartment' && (
        cmp.apartment === 'Golden Apartment' ||
        cmp.apartment?.toLowerCase().includes('tower') ||
        cmp.apartment?.toLowerCase().includes('golden')
      ));
    const matchesStatus = statusFilter === 'All' ||
      (statusFilter === 'Pending' && ['Pending', 'Submitted'].includes(cmp.status)) ||
      (statusFilter === 'In Progress' && ['In Progress', 'Assigned'].includes(cmp.status)) ||
      (statusFilter === 'Resolved' && ['Resolved', 'Closed'].includes(cmp.status));
    const matchesCategory = categoryFilter === 'All' || cmp.category === categoryFilter;
    const matchesSearch =
      cmp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmp.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmp.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cmp.location && cmp.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (cmp.assignedTo && cmp.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesApt && matchesStatus && matchesCategory && matchesSearch;
  });

  // Overview Counts
  const totalComplaintsCount = (complaints || []).length;
  const pendingCount = (complaints || []).filter(c => ['Submitted', 'Pending'].includes(c.status)).length;
  const inProgressCount = (complaints || []).filter(c => ['Assigned', 'In Progress'].includes(c.status)).length;
  const completedCount = (complaints || []).filter(c => ['Resolved', 'Closed'].includes(c.status)).length;
  
  const pendingApprovalsCount = (registrationRequests || []).filter(r => r.status === 'Pending').length;
  const announcementsCount = (announcements || []).length;
  const activeAgenciesCount = (agencies || []).filter(a => a.status === 'Active').length || (agencies || []).length;
  const residentsCount = (residents || []).length;
  const onDutyCount = (userss || []).filter(e => e.status === 'On Duty').length;
  const totalLifts = apartments.reduce((sum, a) => sum + (a.lifts || 0), 0);
  const activeBookingsCount = (bookings || []).filter(b => b.status === 'Confirmed').length;

  const categoriesList = ['All', 'Lift & Elevator', 'Plumbing & Water', 'Electricity and Lighting', 'Gym Equipment', 'Park and Garden'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Top Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
          Dashboard
        </h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('complaint_new')}
            className="btn btn-primary btn-sm"
            style={{ padding: '6px 12px', fontSize: '0.78rem', borderRadius: '6px' }}
          >
            <Wrench size={13} /> Log Complaint
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className="btn btn-secondary btn-sm"
            style={{ padding: '6px 12px', fontSize: '0.78rem', borderRadius: '6px' }}
          >
            <UserPlus size={13} /> Add Resident
          </button>
        </div>
      </div>

      {/* Overview of Application in Small Cards (Complaints, Approvals, Announcements, Active Agencies, etc.) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '10px'
      }}>
        {/* 1. Complaints */}
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
          <div style={{ width: '30px', height: '30px', borderRadius: '6px', backgroundColor: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Wrench size={15} />
          </div>
        </div>

        {/* 2. Approvals */}
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
          <div style={{ width: '30px', height: '30px', borderRadius: '6px', backgroundColor: '#FEF3C7', color: '#B45309', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ShieldCheck size={15} />
          </div>
        </div>

        {/* 3. Announcements */}
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
        >
          <div>
            <div style={{ fontSize: '0.675rem', fontWeight: 700, color: '#64748B' }}>ANNOUNCEMENTS</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>
              {announcementsCount}
            </div>
            <div style={{ fontSize: '0.675rem', color: '#8B5CF6', fontWeight: 600 }}>
              Active notices
            </div>
          </div>
          <div style={{ width: '30px', height: '30px', borderRadius: '6px', backgroundColor: '#F3E8FF', color: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Megaphone size={15} />
          </div>
        </div>

        {/* 4. Active Agencies */}
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
          <div style={{ width: '30px', height: '30px', borderRadius: '6px', backgroundColor: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Building2 size={15} />
          </div>
        </div>

        {/* 5. Residents */}
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
          <div style={{ width: '30px', height: '30px', borderRadius: '6px', backgroundColor: '#ECFEFF', color: '#06B6D4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Users size={15} />
          </div>
        </div>

        {/* 6. Staff On Duty */}
        <div
          onClick={() => setActiveTab('users')}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '10px 12px',
            border: '1px solid #E2E8F0',
            borderLeft: '3px solid #6366F1',
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
            <div style={{ fontSize: '0.675rem', fontWeight: 700, color: '#64748B' }}>STAFF ACTIVE</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>
              {onDutyCount}
            </div>
            <div style={{ fontSize: '0.675rem', color: '#6366F1', fontWeight: 600 }}>
              Field technicians
            </div>
          </div>
          <div style={{ width: '30px', height: '30px', borderRadius: '6px', backgroundColor: '#EEF2FF', color: '#6366F1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Wrench size={15} />
          </div>
        </div>

        {/* 7. Bookings */}
        <div
          onClick={() => setActiveTab('property')}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '10px 12px',
            border: '1px solid #E2E8F0',
            borderLeft: '3px solid #EC4899',
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
            <div style={{ fontSize: '0.675rem', fontWeight: 700, color: '#64748B' }}>BOOKINGS</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>
              {activeBookingsCount}
            </div>
            <div style={{ fontSize: '0.675rem', color: '#EC4899', fontWeight: 600 }}>
              Amenity slots
            </div>
          </div>
          <div style={{ width: '30px', height: '30px', borderRadius: '6px', backgroundColor: '#FDF2F8', color: '#EC4899', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <CalendarCheck size={15} />
          </div>
        </div>

        {/* 8. Lifts */}
        <div
          onClick={() => setActiveTab('property')}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '10px 12px',
            border: '1px solid #E2E8F0',
            borderLeft: '3px solid #0EA5E9',
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
            <div style={{ fontSize: '0.675rem', fontWeight: 700, color: '#64748B' }}>LIFTS ACTIVE</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>
              {totalLifts}
            </div>
            <div style={{ fontSize: '0.675rem', color: '#0EA5E9', fontWeight: 600 }}>
              All 3 Towers
            </div>
          </div>
          <div style={{ width: '30px', height: '30px', borderRadius: '6px', backgroundColor: '#F0F9FF', color: '#0EA5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Layers size={15} />
          </div>
        </div>
      </div>

      {/* Main Complaints & Work Orders Container */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        padding: '14px 16px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.03)'
      }}>
        {/* Filter Controls (No sub-headings) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {/* Search */}
            <div style={{ position: 'relative', width: '200px' }}>
              <Search size={13} style={{ position: 'absolute', left: '9px', top: '9px', color: '#94A3B8' }} />
              <input
                type="text"
                placeholder="Search ticket, flat..."
                className="form-control"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{
                  paddingLeft: '28px',
                  height: '30px',
                  fontSize: '0.75rem',
                  borderRadius: '5px',
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
                    padding: '3px 8px',
                    fontSize: '0.72rem',
                    fontWeight: statusFilter === st ? 700 : 500,
                    cursor: 'pointer'
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
                height: '30px',
                padding: '2px 8px',
                fontSize: '0.72rem',
                fontWeight: 600,
                borderRadius: '5px',
                border: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                color: '#334155',
                cursor: 'pointer'
              }}
            >
              {categoriesList.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* View Toggle */}
          <div style={{ display: 'flex', backgroundColor: '#F1F5F9', padding: '2px', borderRadius: '6px', gap: '2px' }}>
            <button
              onClick={() => setViewMode('cards')}
              style={{
                backgroundColor: viewMode === 'cards' ? '#2563EB' : 'transparent',
                color: viewMode === 'cards' ? '#FFFFFF' : '#64748B',
                border: 'none',
                borderRadius: '4px',
                padding: '3px 8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.72rem',
                fontWeight: 600
              }}
            >
              <LayoutGrid size={12} /> Cards
            </button>
            <button
              onClick={() => setViewMode('table')}
              style={{
                backgroundColor: viewMode === 'table' ? '#2563EB' : 'transparent',
                color: viewMode === 'table' ? '#FFFFFF' : '#64748B',
                border: 'none',
                borderRadius: '4px',
                padding: '3px 8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.72rem',
                fontWeight: 600
              }}
            >
              <List size={12} /> Table
            </button>
          </div>
        </div>

        {/* Complaints in Cards Form (Compact, Clear Info) */}
        {viewMode === 'cards' ? (
          <div>
            {filteredComplaints.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px 10px', color: '#64748B', fontSize: '0.8rem' }}>
                No complaints found.
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '10px'
              }}>
                {filteredComplaints.map((cmp) => {
                  const isPending = cmp.status === 'Pending' || cmp.status === 'Submitted';
                  const isInProgress = cmp.status === 'In Progress' || cmp.status === 'Assigned';

                  const priorityBorder = 
                    cmp.priority === 'Urgent' ? '#EF4444' :
                    cmp.priority === 'High' ? '#F97316' :
                    cmp.priority === 'Medium' ? '#2563EB' : '#10B981';

                  return (
                    <div
                      key={cmp.id}
                      onClick={() => setSelectedComplaint(cmp)}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '8px',
                        border: '1px solid #E2E8F0',
                        borderLeft: `3px solid ${priorityBorder}`,
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
                        padding: '11px 13px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '7px',
                        cursor: 'pointer',
                        transition: 'transform 0.12s ease, box-shadow 0.12s ease'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.06)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.03)';
                      }}
                    >
                      {/* Top Header: ID & Status */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontWeight: 800, fontSize: '0.72rem', color: '#2563EB' }}>
                            {cmp.id}
                          </span>
                          <span style={{ color: '#CBD5E1', fontSize: '0.72rem' }}>•</span>
                          <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>
                            {cmp.category}
                          </span>
                        </div>

                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '2px 7px',
                          borderRadius: '9999px',
                          fontSize: '0.675rem',
                          fontWeight: 700,
                          backgroundColor: isPending ? '#FFF7ED' : isInProgress ? '#EFF6FF' : '#F0FDF4',
                          color: isPending ? '#EA580C' : isInProgress ? '#2563EB' : '#16A34A',
                          border: isPending ? '1px solid #FED7AA' : isInProgress ? '1px solid #BFDBFE' : '1px solid #BBF7D0'
                        }}>
                          <span style={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            backgroundColor: isPending ? '#EA580C' : isInProgress ? '#2563EB' : '#16A34A'
                          }} />
                          {cmp.status}
                        </span>
                      </div>

                      {/* Title */}
                      <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#0F172A', lineHeight: 1.3 }}>
                        {cmp.title}
                      </div>

                      {/* Location & Reporter */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', fontSize: '0.72rem', color: '#475569' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          <MapPin size={11} color="#64748B" style={{ flexShrink: 0 }} />
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {cmp.apartment?.split(' ')[0]} • {cmp.location}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', flexShrink: 0, color: '#334155', fontWeight: 500 }}>
                          <User size={11} color="#64748B" />
                          <span>{cmp.submittedBy?.split('(')[0].trim()}</span>
                        </div>
                      </div>

                      {/* Footer: Tech & Manage Button */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '5px', borderTop: '1px solid #F1F5F9', fontSize: '0.72rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Wrench size={11} color="#64748B" />
                          {cmp.assignedTo && cmp.assignedTo !== 'Unassigned' ? (
                            <span style={{ color: '#0F172A', fontWeight: 600 }}>{cmp.assignedTo?.split('(')[0].trim()}</span>
                          ) : (
                            <span style={{ color: '#F97316', fontStyle: 'italic', fontSize: '0.6875rem' }}>Pending Tech</span>
                          )}
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedComplaint(cmp);
                          }}
                          style={{
                            backgroundColor: 'transparent',
                            border: '1px solid #CBD5E1',
                            color: '#2563EB',
                            padding: '2px 7px',
                            borderRadius: '4px',
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '2px'
                          }}
                        >
                          Manage <ChevronRight size={11} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Table View */
          <div className="table-responsive">
            <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                  <th style={{ padding: '8px 10px', fontSize: '0.675rem', fontWeight: 800, color: '#475569' }}>ID</th>
                  <th style={{ padding: '8px 10px', fontSize: '0.675rem', fontWeight: 800, color: '#475569' }}>TITLE</th>
                  <th style={{ padding: '8px 10px', fontSize: '0.675rem', fontWeight: 800, color: '#475569' }}>LOCATION</th>
                  <th style={{ padding: '8px 10px', fontSize: '0.675rem', fontWeight: 800, color: '#475569' }}>ASSIGNED</th>
                  <th style={{ padding: '8px 10px', fontSize: '0.675rem', fontWeight: 800, color: '#475569' }}>STATUS</th>
                  <th style={{ padding: '8px 10px', fontSize: '0.675rem', fontWeight: 800, color: '#475569', textAlign: 'right' }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map(cmp => (
                  <tr key={cmp.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '8px 10px', fontWeight: 700, color: '#2563EB', fontSize: '0.75rem' }}>{cmp.id}</td>
                    <td style={{ padding: '8px 10px', fontSize: '0.78rem', fontWeight: 600 }}>{cmp.title}</td>
                    <td style={{ padding: '8px 10px', fontSize: '0.75rem', color: '#475569' }}>{cmp.location}</td>
                    <td style={{ padding: '8px 10px', fontSize: '0.75rem' }}>{cmp.assignedTo || 'Unassigned'}</td>
                    <td style={{ padding: '8px 10px', fontSize: '0.72rem', fontWeight: 700 }}>{cmp.status}</td>
                    <td style={{ padding: '8px 10px', textAlign: 'right' }}>
                      <button
                        onClick={() => setSelectedComplaint(cmp)}
                        style={{
                          backgroundColor: 'transparent',
                          border: '1px solid #CBD5E1',
                          color: '#2563EB',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Details Modal */}
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
