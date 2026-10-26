import React, { useState } from 'react';
import { useRwa } from '../context/RwaContext';
import { ComplaintDetailsModal } from './ComplaintDetailsModal';
import {
  Building2,
  Users,
  AlertTriangle,
  Dumbbell,
  CheckCircle2,
  Clock,
  RefreshCw,
  Wrench,
  Search,
  Filter,
  ShieldCheck,
  Zap,
  Droplets,
  Sparkles,
  ArrowRight,
  Eye,
  Check,
  CalendarCheck,
  Layers,
  ChevronRight
} from 'lucide-react';

export const Dashboard = () => {
  const {
    currentUser,
    apartments,
    selectedApartment,
    setSelectedApartment,
    complaints,
    userss,
    facilities,
    bookings,
    setActiveTab
  } = useRwa();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Filter complaints by selected apartment
  const filteredComplaints = complaints.filter(cmp => {
    const matchesApt = selectedApartment === 'All' || cmp.apartment === selectedApartment;
    const matchesSearch =
      cmp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmp.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmp.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cmp.assignedTo && cmp.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesApt && matchesSearch;
  });

  // Metrics computation
  const pendingCount = complaints.filter(c => ['Submitted', 'Pending'].includes(c.status)).length;
  const inProgressCount = complaints.filter(c => ['Assigned', 'In Progress'].includes(c.status)).length;
  const completedCount = complaints.filter(c => ['Resolved', 'Closed'].includes(c.status)).length;
  const staffList = userss || [];
  const onDutyuserss = staffList.filter(e => e.status === 'On Duty');
  const availableuserss = staffList.filter(e => e.status === 'Available');

  // Asset counts
  const totalLifts = apartments.reduce((sum, a) => sum + (a.lifts || 0), 0);
  const activeBookingsCount = bookings.filter(b => b.status === 'Confirmed').length;

  // Icon selector by category
  const getCategoryIcon = (cat) => {
    const c = (cat || '').toLowerCase();
    if (c.includes('lift') || c.includes('elevator')) return <Layers size={16} color="#3B82F6" />;
    if (c.includes('water') || c.includes('plumb')) return <Droplets size={16} color="#06B6D4" />;
    if (c.includes('light') || c.includes('elect')) return <Zap size={16} color="#F59E0B" />;
    if (c.includes('gym') || c.includes('sport')) return <Dumbbell size={16} color="#8B5CF6" />;
    return <Wrench size={16} color="#10B981" />;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* 1. Header Greeting Title */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Welcome back, {currentUser.name}
        </h1>
      </div>

      {/* 2. Top Classified Metric Cards Row (Matching Parallel App Template) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '14px'
      }}>
        {/* Card 1: Pending Requests */}
        <div
          onClick={() => setActiveTab('complaints')}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '16px 18px',
            border: '1px solid #E2E8F0',
            borderLeft: '4px solid #F97316',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            cursor: 'pointer',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#0F172A', letterSpacing: '0.04em' }}>
              PENDING COMPLAINTS
            </span>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'rgba(47, 39, 33, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F97316'
            }}>
              <Clock size={15} />
            </div>
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 900, color: '#0F172A', lineHeight: 1.1 }}>
            {pendingCount}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#64748B', marginTop: '8px', fontWeight: 600 }}>
            <span>View details</span>
            <ArrowRight size={12} />
          </div>
        </div>

        {/* Card 2: In Progress Requests */}
        <div
          onClick={() => setActiveTab('complaints')}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '16px 18px',
            border: '1px solid #E2E8F0',
            borderLeft: '4px solid #2563EB',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            cursor: 'pointer',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#0F172A', letterSpacing: '0.04em' }}>
              IN PROGRESS
            </span>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'rgba(37, 99, 235, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#2563EB'
            }}>
              <RefreshCw size={15} />
            </div>
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 900, color: '#0F172A', lineHeight: 1.1 }}>
            {inProgressCount}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#64748B', marginTop: '8px', fontWeight: 600 }}>
            <span>View details</span>
            <ArrowRight size={12} />
          </div>
        </div>

        {/* Card 3: Completed Requests */}
        <div
          onClick={() => setActiveTab('complaints')}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '16px 18px',
            border: '1px solid #E2E8F0',
            borderLeft: '4px solid #10B981',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            cursor: 'pointer',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#0F172A', letterSpacing: '0.04em' }}>
              RESOLVED
            </span>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#10B981'
            }}>
              <CheckCircle2 size={15} />
            </div>
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 900, color: '#0F172A', lineHeight: 1.1 }}>
            {completedCount}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#64748B', marginTop: '8px', fontWeight: 600 }}>
            <span>View details</span>
            <ArrowRight size={12} />
          </div>
        </div>

        {/* Card 4: Technicians / Staff */}
        <div
          onClick={() => setActiveTab('users')}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '16px 18px',
            border: '1px solid #E2E8F0',
            borderLeft: '4px solid #8B5CF6',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            cursor: 'pointer',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#0F172A', letterSpacing: '0.04em' }}>
              ON-DUTY STAFF
            </span>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'rgba(139, 92, 246, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#8B5CF6'
            }}>
              <Users size={15} />
            </div>
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 900, color: '#0F172A', lineHeight: 1.1 }}>
            {onDutyuserss.length}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#64748B', marginTop: '8px', fontWeight: 600 }}>
            <span>View details</span>
            <ArrowRight size={12} />
          </div>
        </div>

        {/* Card 5: Common Area Assets */}
        <div
          onClick={() => setActiveTab('property')}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '16px 18px',
            border: '1px solid #E2E8F0',
            borderLeft: '4px solid #06B6D4',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            cursor: 'pointer',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#0F172A', letterSpacing: '0.04em' }}>
              PROPERTY LIFTS
            </span>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'rgba(6, 182, 212, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#06B6D4'
            }}>
              <Layers size={15} />
            </div>
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 900, color: '#0F172A', lineHeight: 1.1 }}>
            {totalLifts}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#64748B', marginTop: '8px', fontWeight: 600 }}>
            <span>View details</span>
            <ArrowRight size={12} />
          </div>
        </div>

        {/* Card 6: Amenities & Permissions */}
        <div
          onClick={() => setActiveTab('property')}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '16px 18px',
            border: '1px solid #E2E8F0',
            borderLeft: '4px solid #EC4899',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            cursor: 'pointer',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#0F172A', letterSpacing: '0.04em' }}>
              FACILITY BOOKINGS
            </span>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'rgba(236, 72, 153, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#EC4899'
            }}>
              <CalendarCheck size={15} />
            </div>
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 900, color: '#0F172A', lineHeight: 1.1 }}>
            0{activeBookingsCount}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#64748B', marginTop: '8px', fontWeight: 600 }}>
            <span>View details</span>
            <ArrowRight size={12} />
          </div>
        </div>
      </div>

      {/* 4. Recent Service Requests & Common Area Issue Resolving Table */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        padding: '20px 24px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
      }}>
        {/* Table Header Controls matching parallel app */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '18px' }}>
          <div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Recent Service Requests
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Search input */}
            <div style={{ position: 'relative', width: '220px' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '9px', color: '#94A3B8' }} />
              <input
                type="text"
                placeholder="Search recent tickets..."
                className="form-control"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{
                  paddingLeft: '32px',
                  height: '34px',
                  fontSize: '0.75rem',
                  borderRadius: '6px',
                  backgroundColor: '#F8FAFC',
                  borderColor: '#E2E8F0'
                }}
              />
            </div>

            {/* View all requests button */}
            <button
              onClick={() => setActiveTab('complaints')}
              style={{
                backgroundColor: '#2563EB',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 14px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1D4ED8'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2563EB'}
            >
              <span>View all requests</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Table matching the screenshot structure */}
        <div className="table-responsive">
          <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                <th style={{ padding: '12px 14px', fontSize: '0.6875rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>REQUEST ID</th>
                <th style={{ padding: '12px 14px', fontSize: '0.6875rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>SERVICE TYPE / ASSET</th>
                <th style={{ padding: '12px 14px', fontSize: '0.6875rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>RESIDENT / REPORTER</th>
                <th style={{ padding: '12px 14px', fontSize: '0.6875rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>APARTMENT & FLAT</th>
                <th style={{ padding: '12px 14px', fontSize: '0.6875rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ASSIGNED SPECIALIST</th>
                <th style={{ padding: '12px 14px', fontSize: '0.6875rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>STATUS</th>
                <th style={{ padding: '12px 14px', fontSize: '0.6875rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.slice(0, 6).map((cmp) => {
                const initials = cmp.submittedBy.split(' ').map(n => n[0]).slice(0, 2).join('');
                const isPending = cmp.status === 'Pending' || cmp.status === 'Submitted';
                const isInProgress = cmp.status === 'In Progress' || cmp.status === 'Assigned';

                return (
                  <tr key={cmp.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    {/* REQUEST ID */}
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

                    {/* SERVICE TYPE */}
                    <td style={{ padding: '14px', minWidth: '220px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.8125rem', color: '#0F172A' }}>
                            {cmp.title}
                          </div>
                          <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>
                            {cmp.category}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* RESIDENT */}
                    <td style={{ padding: '14px', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          backgroundColor: '#2563EB',
                          color: '#FFFFFF',
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          {initials}
                        </div>
                        <span style={{ fontWeight: 600, fontSize: '0.8125rem', color: '#1E293B' }}>
                          {cmp.submittedBy.split('(')[0].trim()}
                        </span>
                      </div>
                    </td>

                    {/* APARTMENT & FLAT */}
                    <td style={{ padding: '14px', whiteSpace: 'nowrap' }}>
                      <span style={{ fontSize: '0.8125rem', color: '#475569', fontWeight: 500 }}>
                        {cmp.apartment.split(' ')[0]} • {cmp.location.split('-')[0].trim()}
                      </span>
                    </td>

                    {/* ASSIGNED SPECIALIST */}
                    <td style={{ padding: '14px', whiteSpace: 'nowrap' }}>
                      {cmp.assignedTo && cmp.assignedTo !== 'Unassigned' ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', fontWeight: 600, color: '#0F172A' }}>
                          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
                          <span>{cmp.assignedTo.split('(')[0].trim()}</span>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontStyle: 'italic' }}>
                          Pending dispatch
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
                        <span>Manage</span>
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

      {/* Interactive Dispatch & Resolution Modal */}
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
