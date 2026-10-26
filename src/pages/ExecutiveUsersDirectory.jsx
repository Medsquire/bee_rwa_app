import React, { useState } from 'react';
import { useRwa } from '../context/RwaContext';
import { Modal } from '../components/CommonUI';
import {
  Users,
  Shield,
  ShieldCheck,
  UserCheck,
  Phone,
  Mail,
  Building2,
  MapPin,
  Clock,
  Key,
  Award,
  CheckCircle2,
  ArrowRight,
  Search,
  Copy,
  ExternalLink,
  Edit3,
  Calendar,
  DollarSign,
  Megaphone,
  AlertTriangle,
  Layers,
  Home,
  Check,
  Sparkles,
  ArrowLeftRight
} from 'lucide-react';

export const ExecutiveUsersDirectory = () => {
  const {
    currentRoleKey,
    currentUser,
    switchRole,
    setActiveTab,
    showToast,
    apartments
  } = useRwa();

  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'president' | 'vice_president' | 'matrix'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExecutive, setSelectedExecutive] = useState(null);
  const [editingExecutive, setEditingExecutive] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  // Executive user data state
  const [executives, setExecutives] = useState({
    president: {
      roleKey: 'president',
      id: 'BEE-EXEC-PRES-01',
      name: 'Sujana',
      username: 'sujana',
      badge: '👑 President',
      roleTitle: 'President (RWA Executive & Chief Officer)',
      shortRole: 'President',
      email: 'sujana.president@beeproperty.org',
      phone: '+91 98450 11223',
      intercom: 'Ext. 801 (Penthouse Intercom)',
      apartment: 'Golden Apartment',
      tower: 'Golden Tower 1 (GT-1)',
      flatNumber: 'GT1-801 (Penthouse)',
      carpetArea: '3,850 sq.ft',
      residentType: 'Flat Owner',
      residentSince: '2023 (Founding Resident)',
      parkingSlot: 'Basement Bay #01 (Executive Covered)',
      term: '2025 – 2027 (Elected 2-Year Term)',
      officeLocation: 'RWA Central Executive Secretariat, GT-1 Ground Level',
      officeHours: 'Mon – Sat: 10:00 AM – 01:00 PM & 05:00 PM – 07:00 PM',
      emergencyLine: '+91 98450 11223 (24x7 Executive Escalation)',
      avatar: 'SJ',
      themeColor: '#F59E0B',
      accentGradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      headerBg: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.05) 100%)',
      badgeBorder: 'rgba(245, 158, 11, 0.35)',
      status: 'Active (On Duty)',
      responsibilities: [
        {
          title: 'Resident Registration Approvals',
          desc: 'Statutory sole sign-off authority for all new resident registrations, sale deeds, lease verifications, and tenant police audit clearance.',
          icon: UserCheck
        },
        {
          title: 'Treasury & Financial Governance',
          desc: 'Primary signing authority on enclave bank accounts, monthly maintenance collections (₹3,42,000/mo), capital reserves, and expenditure audits.',
          icon: DollarSign
        },
        {
          title: 'Civic & Municipal Liaison',
          desc: 'Official representative to BBMP (City Corp), BESCOM (Electricity), BWSSB (Water Supply), and Karnataka Fire & Emergency Safety boards.',
          icon: Building2
        },
        {
          title: 'RWA General Body & Constitutional By-laws',
          desc: 'Presides over Annual General Meetings (AGM), extraordinary committee sessions, executive council votes, and community by-laws.',
          icon: Award
        },
        {
          title: 'Multi-Tower Enclave Oversight',
          desc: 'Apex custodian across all 3 towers: Golden Tower 1 (296 flats), Golden Tower 2 (270 flats), and Golden Tower 3 (256 flats).',
          icon: ShieldCheck
        }
      ],
      assignedPermissions: [
        'Full Enclave Governance',
        'Resident Sign-offs (Approve/Reject)',
        'Financial Ledger & Expense Approvals',
        'Enclave-wide Broadcast Announcements',
        'Complaint Escalation Desk',
        'Facility Master Policy Control',
        'User & Role Management'
      ],
      stats: {
        towersGoverned: '3 Towers (GT-1, GT-2, GT-3)',
        flatsUnderPurview: '136 Units',
        signOffSLA: '< 24 Hours',
        termRemaining: '16 Months (2025–2027)'
      },
      deskLinks: [
        { label: 'Approvals Desk', tab: 'approvals', icon: UserCheck, color: '#F59E0B' },
        { label: 'Financial Ledger', tab: 'finance', icon: DollarSign, color: '#10B981' },
        { label: 'Broadcast Notice', tab: 'announcements', icon: Megaphone, color: '#8B5CF6' },
        { label: 'Resident Directory', tab: 'residence', icon: Home, color: '#2563EB' }
      ]
    },
    vice_president: {
      roleKey: 'vice_president',
      id: 'BEE-EXEC-VP-02',
      name: 'Kavaya',
      username: 'kavaya',
      badge: '🛡️ Vice President',
      roleTitle: 'Vice President (Operations, Facilities & Community Welfare)',
      shortRole: 'Vice President',
      email: 'kavaya.vp@beeproperty.org',
      phone: '+91 98765 43210',
      intercom: 'Ext. 604 (Direct Intercom)',
      apartment: 'Golden Apartment',
      tower: 'Golden Tower 2 (GT-2)',
      flatNumber: 'GT2-604',
      carpetArea: '2,650 sq.ft',
      residentType: 'Flat Owner',
      residentSince: '2023 (Founding Resident)',
      parkingSlot: 'Basement Bay #02 (Executive Covered)',
      term: '2025 – 2027 (Elected 2-Year Term)',
      officeLocation: 'Facilities & Maintenance Operations Desk, GT-2 Lobby Level',
      officeHours: 'Mon – Sat: 09:00 AM – 12:00 PM & 04:00 PM – 06:30 PM',
      emergencyLine: '+91 98765 43210 (24x7 Operational Emergency)',
      avatar: 'KV',
      themeColor: '#2563EB',
      accentGradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
      headerBg: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(29, 78, 216, 0.05) 100%)',
      badgeBorder: 'rgba(37, 99, 235, 0.35)',
      status: 'Active (On Duty)',
      responsibilities: [
        {
          title: 'Campus Facility Operations & Lifts',
          desc: 'Direct oversight of 12 smart elevators (Otis AMC), diesel generator systems, solar grids, and the 100,000 Litres enclave reservoir.',
          icon: Layers
        },
        {
          title: 'Complaints Triage & SLA Enforcement',
          desc: 'Daily command over plumbing, electrical, and facility tickets with strict 4-hour SLA dispatch and resolution tracking.',
          icon: AlertTriangle
        },
        {
          title: 'Agency & Contractor Management',
          desc: 'Supervision of maintenance agencies, security detachment, elevator engineers, horticulture teams, and STP contractor contracts.',
          icon: ShieldCheck
        },
        {
          title: 'Recreational Amenities & Clubhouse',
          desc: 'Oversees Central Gymnasium, Rooftop Banquet Hall, EV charging bays, and approves resident clubhouse bookings and maintenance closures.',
          icon: Calendar
        },
        {
          title: 'Golden Tower 2 Lead Administrator',
          desc: 'Direct executive lead for Golden Tower 2 (270 flats, 35 floors, 4 high-speed lifts) and campus green energy initiatives.',
          icon: Building2
        }
      ],
      assignedPermissions: [
        'Facility & Amenity Operations',
        'Work Order / Ticket Assignment',
        'Contractor SLA & Performance Review',
        'Facility Emergency Closures',
        'Publish Community Notices',
        'Resident Directory Access'
      ],
      stats: {
        towersGoverned: 'Golden Tower 2 Lead',
        flatsUnderPurview: '136 Units',
        signOffSLA: '< 4 Hours (SLA)',
        termRemaining: '16 Months (2025–2027)'
      },
      deskLinks: [
        { label: 'Complaints Desk', tab: 'complaints', icon: AlertTriangle, color: '#EF4444' },
        { label: 'Facility Management', tab: 'facilities', icon: Layers, color: '#2563EB' },
        { label: 'Agency Roster', tab: 'agency', icon: ShieldCheck, color: '#10B981' },
        { label: 'Facility Bookings', tab: 'my-bookings', icon: Calendar, color: '#8B5CF6' }
      ]
    }
  });

  const [editFormData, setEditFormData] = useState({
    phone: '',
    email: '',
    intercom: '',
    officeHours: '',
    officeLocation: ''
  });

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    showToast(`Copied ${fieldName} to clipboard!`, 'info');
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleStartEdit = (exec) => {
    setEditingExecutive(exec.roleKey);
    setEditFormData({
      phone: exec.phone,
      email: exec.email,
      intercom: exec.intercom,
      officeHours: exec.officeHours,
      officeLocation: exec.officeLocation
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingExecutive) return;

    setExecutives(prev => ({
      ...prev,
      [editingExecutive]: {
        ...prev[editingExecutive],
        phone: editFormData.phone,
        email: editFormData.email,
        intercom: editFormData.intercom,
        officeHours: editFormData.officeHours,
        officeLocation: editFormData.officeLocation
      }
    }));

    showToast(`Updated contact details for ${executives[editingExecutive].name} (${executives[editingExecutive].shortRole})!`, 'success');
    setEditingExecutive(null);
  };

  // Filter executive cards
  const executiveList = Object.values(executives).filter(exec => {
    if (activeFilter === 'president' && exec.roleKey !== 'president') return false;
    if (activeFilter === 'vice_president' && exec.roleKey !== 'vice_president') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        exec.name.toLowerCase().includes(q) ||
        exec.roleTitle.toLowerCase().includes(q) ||
        exec.shortRole.toLowerCase().includes(q) ||
        exec.flatNumber.toLowerCase().includes(q) ||
        exec.tower.toLowerCase().includes(q) ||
        exec.email.toLowerCase().includes(q) ||
        exec.phone.includes(q) ||
        exec.responsibilities.some(r => r.title.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q));
      if (!match) return false;
    }

    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header & Page Title */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        padding: '24px 28px',
        borderRadius: '16px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #E2E8F0',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #0B1B3D 0%, #1E3A8A 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 16px rgba(11, 27, 61, 0.25)'
          }}>
            <ShieldCheck size={28} color="#60A5FA" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', margin: 0 }}>
                Executive Users Directory
              </h1>
              <span className="badge" style={{ backgroundColor: '#EEF2FF', color: '#4F46E5', border: '1px solid #C7D2FE', fontWeight: 700 }}>
                RWA Governing Body
              </span>
            </div>
            <p style={{ color: '#64748B', fontSize: '0.9rem', marginTop: '4px', margin: 0 }}>
              Official administrative user accounts for BEE PROPERTY (Golden Apartment Enclave) — President & Vice President leadership dossiers, credentials, and executive delegation.
            </p>
          </div>
        </div>

        {/* Current Active Persona Badge with Quick Toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 16px',
          borderRadius: '12px',
          backgroundColor: '#F8FAFC',
          border: '1px solid #E2E8F0'
        }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: currentRoleKey === 'president' ? executives.president.accentGradient : executives.vice_president.accentGradient,
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.875rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}>
            {currentUser?.avatar || (currentRoleKey === 'president' ? 'SJ' : 'KV')}
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#64748B', fontWeight: 700 }}>
              Current Active Session
            </div>
            <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#0F172A' }}>
              {currentRoleKey === 'president' ? '👑 Sujana (President)' : '🛡️ Kavaya (Vice President)'}
            </div>
          </div>
          <button
            onClick={() => switchRole(currentRoleKey === 'president' ? 'vice_president' : 'president')}
            className="btn btn-secondary btn-sm"
            style={{
              marginLeft: '8px',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #CBD5E1',
              padding: '6px 12px'
            }}
            title="Switch active user persona"
          >
            <ArrowLeftRight size={13} color="#2563EB" />
            <span>Switch to {currentRoleKey === 'president' ? 'Kavaya' : 'Sujana'}</span>
          </button>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          padding: '18px 20px',
          border: '1px solid #E2E8F0',
          borderLeft: '5px solid #F59E0B',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', letterSpacing: '0.04em' }}>EXECUTIVE OFFICERS</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(245, 158, 11, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B' }}>
              <Users size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0F172A' }}>2 Active Users</div>
          <div style={{ fontSize: '0.8125rem', color: '#64748B', marginTop: '4px' }}>
            President (Sujana) & Vice President (Kavaya)
          </div>
        </div>

        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          padding: '18px 20px',
          border: '1px solid #E2E8F0',
          borderLeft: '5px solid #2563EB',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', letterSpacing: '0.04em' }}>ENCLAVE JURISDICTION</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(37, 99, 235, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}>
              <Building2 size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0F172A' }}>3 Towers</div>
          <div style={{ fontSize: '0.8125rem', color: '#64748B', marginTop: '4px' }}>
            Golden Tower 1, 2 & 3 • 136 Residential Units
          </div>
        </div>

        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          padding: '18px 20px',
          border: '1px solid #E2E8F0',
          borderLeft: '5px solid #10B981',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', letterSpacing: '0.04em' }}>ELECTED MANDATE</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
              <Award size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0F172A' }}>2025 – 2027</div>
          <div style={{ fontSize: '0.8125rem', color: '#64748B', marginTop: '4px' }}>
            2-Year Democratic Term • 16 Months Remaining
          </div>
        </div>

        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          padding: '18px 20px',
          border: '1px solid #E2E8F0',
          borderLeft: '5px solid #8B5CF6',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', letterSpacing: '0.04em' }}>SYSTEM LOGINS</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(139, 92, 246, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B5CF6' }}>
              <Key size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0F172A' }}>Dual Admin</div>
          <div style={{ fontSize: '0.8125rem', color: '#64748B', marginTop: '4px' }}>
            sujana (President) & kavaya (Vice President)
          </div>
        </div>
      </div>

      {/* Tabs & Search Filter Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        backgroundColor: '#FFFFFF',
        padding: '12px 16px',
        borderRadius: '12px',
        border: '1px solid #E2E8F0'
      }}>
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveFilter('all')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: activeFilter === 'all' ? '1px solid #2563EB' : '1px solid transparent',
              backgroundColor: activeFilter === 'all' ? '#EFF6FF' : 'transparent',
              color: activeFilter === 'all' ? '#1D4ED8' : '#64748B',
              transition: 'all 0.15s ease'
            }}
          >
            All Executive Users (2)
          </button>
          <button
            onClick={() => setActiveFilter('president')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: activeFilter === 'president' ? '1px solid #F59E0B' : '1px solid transparent',
              backgroundColor: activeFilter === 'president' ? '#FEF3C7' : 'transparent',
              color: activeFilter === 'president' ? '#B45309' : '#64748B',
              transition: 'all 0.15s ease'
            }}
          >
            👑 President (Sujana)
          </button>
          <button
            onClick={() => setActiveFilter('vice_president')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: activeFilter === 'vice_president' ? '1px solid #2563EB' : '1px solid transparent',
              backgroundColor: activeFilter === 'vice_president' ? '#EFF6FF' : 'transparent',
              color: activeFilter === 'vice_president' ? '#1D4ED8' : '#64748B',
              transition: 'all 0.15s ease'
            }}
          >
            🛡️ Vice President (Kavaya)
          </button>
          <button
            onClick={() => setActiveFilter('matrix')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: activeFilter === 'matrix' ? '1px solid #8B5CF6' : '1px solid transparent',
              backgroundColor: activeFilter === 'matrix' ? '#F5F3FF' : 'transparent',
              color: activeFilter === 'matrix' ? '#7C3AED' : '#64748B',
              transition: 'all 0.15s ease'
            }}
          >
            ⚖️ Delegation & Powers Matrix
          </button>
        </div>

        {/* Search input */}
        <div style={{ position: 'relative', minWidth: '280px' }}>
          <Search size={15} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input"
            placeholder="Search by name, flat, tower, or role..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '34px', fontSize: '0.8125rem' }}
          />
        </div>
      </div>

      {/* Main Content View */}
      {activeFilter === 'matrix' ? (
        /* Delegation & Powers Matrix View */
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Statutory Delegation of Powers & Responsibilities Matrix
            </h2>
            <p style={{ color: '#64748B', fontSize: '0.875rem', marginTop: '4px', margin: 0 }}>
              Definitive governance breakdown between President (Sujana) and Vice President (Kavaya) under the Bee Property RWA By-Laws.
            </p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="table" style={{ width: '100%', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC' }}>
                  <th style={{ width: '22%' }}>Governance Domain</th>
                  <th style={{ width: '39%', color: '#B45309' }}>👑 President (Sujana) Authority</th>
                  <th style={{ width: '39%', color: '#1D4ED8' }}>🛡️ Vice President (Kavaya) Authority</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Resident Registration & Onboarding</strong></td>
                  <td>
                    <span className="badge badge-success" style={{ marginBottom: '4px' }}>Sole Sign-off Desk</span>
                    <div style={{ color: '#475569', fontSize: '0.8125rem' }}>
                      Final legal approval of Sale Deeds, Lease Agreements, Tenant Police verification, and biometric gate passes.
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-neutral" style={{ marginBottom: '4px' }}>Advisory & Review</span>
                    <div style={{ color: '#475569', fontSize: '0.8125rem' }}>
                      Operational verification of tower occupancy and welcoming new residents to Golden Tower 2.
                    </div>
                  </td>
                </tr>

                <tr>
                  <td><strong>Financial Approvals & Treasury</strong></td>
                  <td>
                    <span className="badge badge-warning" style={{ marginBottom: '4px' }}>Joint Bank Signer</span>
                    <div style={{ color: '#475569', fontSize: '0.8125rem' }}>
                      Authorizes expenditures exceeding ₹25,000, signs cheques/NEFT, approves annual budgets and financial balance sheets.
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-info" style={{ marginBottom: '4px' }}>Requisitions Desk</span>
                    <div style={{ color: '#475569', fontSize: '0.8125rem' }}>
                      Validates maintenance invoices, contractor billings, and minor operational emergency expenses up to ₹25,000.
                    </div>
                  </td>
                </tr>

                <tr>
                  <td><strong>Complaints & Work Order Triage</strong></td>
                  <td>
                    <span className="badge badge-neutral" style={{ marginBottom: '4px' }}>Level 3 Escalation</span>
                    <div style={{ color: '#475569', fontSize: '0.8125rem' }}>
                      Reviews unresolved chronic disputes, inter-resident legal grievances, and by-law penalties.
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-primary" style={{ marginBottom: '4px' }}>Primary Daily Commander</span>
                    <div style={{ color: '#475569', fontSize: '0.8125rem' }}>
                      Direct operational assignment of tickets to plumbers, Otis elevator engineers, electricians, and facility caretakers.
                    </div>
                  </td>
                </tr>

                <tr>
                  <td><strong>Campus Infrastructure & Elevators</strong></td>
                  <td>
                    <span className="badge badge-neutral" style={{ marginBottom: '4px' }}>Contract Signatory</span>
                    <div style={{ color: '#475569', fontSize: '0.8125rem' }}>
                      Executes annual maintenance contracts (AMCs) with Otis, Kirloskar DG generators, and STP environmental teams.
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-primary" style={{ marginBottom: '4px' }}>Operations Custodian</span>
                    <div style={{ color: '#475569', fontSize: '0.8125rem' }}>
                      Daily oversight of 12 lifts, diesel generators, 100,000L reservoir water supply, and solar rooftop systems.
                    </div>
                  </td>
                </tr>

                <tr>
                  <td><strong>Amenities & Clubhouse Bookings</strong></td>
                  <td>
                    <span className="badge badge-neutral" style={{ marginBottom: '4px' }}>Policy Oversight</span>
                    <div style={{ color: '#475569', fontSize: '0.8125rem' }}>
                      Approves tariff schedules, holiday schedules, and general access rules for community amenities.
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-primary" style={{ marginBottom: '4px' }}>Direct Management</span>
                    <div style={{ color: '#475569', fontSize: '0.8125rem' }}>
                      Approves Banquet Hall bookings, Gym trainer certifications, EV bay allocation, and emergency facility shutdowns.
                    </div>
                  </td>
                </tr>

                <tr>
                  <td><strong>Official Announcements & Communication</strong></td>
                  <td>
                    <span className="badge badge-warning" style={{ marginBottom: '4px' }}>Statutory Notices</span>
                    <div style={{ color: '#475569', fontSize: '0.8125rem' }}>
                      Publishes Annual General Body notices, elections, financial disclosures, and official enclave mandates.
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-info" style={{ marginBottom: '4px' }}>Operational Broadcasts</span>
                    <div style={{ color: '#475569', fontSize: '0.8125rem' }}>
                      Issues water shutdown notices, lift maintenance alerts, festival celebrations, and facility timing updates.
                    </div>
                  </td>
                </tr>

                <tr>
                  <td><strong>Civic Liaison (BBMP, BESCOM, BWSSB)</strong></td>
                  <td>
                    <span className="badge badge-success" style={{ marginBottom: '4px' }}>Authorized Representative</span>
                    <div style={{ color: '#475569', fontSize: '0.8125rem' }}>
                      Authorized legal signatory representing Bee Property Enclave with municipal, electricity, and water boards.
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-neutral" style={{ marginBottom: '4px' }}>Field Coordination</span>
                    <div style={{ color: '#475569', fontSize: '0.8125rem' }}>
                      Coordinates on-site civic utility inspectors, garbage collection trucks, and road repair teams.
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Executive Cards Grid */
        <div style={{
          display: 'grid',
          gridTemplateColumns: activeFilter === 'all' ? 'repeat(auto-fit, minmax(480px, 1fr))' : '1fr',
          gap: '24px'
        }}>
          {executiveList.map(exec => {
            const isActiveUser = currentRoleKey === exec.roleKey;
            const isPresident = exec.roleKey === 'president';

            return (
              <div
                key={exec.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '18px',
                  border: isActiveUser ? `2px solid ${exec.themeColor}` : '1px solid #E2E8F0',
                  boxShadow: isActiveUser
                    ? `0 10px 25px -5px ${exec.themeColor}25, 0 8px 10px -6px ${exec.themeColor}15`
                    : '0 4px 14px rgba(0, 0, 0, 0.04)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                {/* Executive Card Header Banner */}
                <div style={{
                  background: exec.headerBg,
                  padding: '24px 24px 20px',
                  borderBottom: `1px solid ${exec.badgeBorder}`,
                  position: 'relative'
                }}>
                  {/* Active Indicator Chip */}
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    {isActiveUser ? (
                      <span className="badge" style={{
                        backgroundColor: exec.themeColor,
                        color: '#FFFFFF',
                        fontWeight: 800,
                        padding: '6px 12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}>
                        <CheckCircle2 size={13} /> Active Session User
                      </span>
                    ) : (
                      <button
                        onClick={() => switchRole(exec.roleKey)}
                        className="btn btn-secondary btn-sm"
                        style={{
                          fontSize: '0.75rem',
                          backgroundColor: '#FFFFFF',
                          borderColor: '#CBD5E1',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <ArrowLeftRight size={12} color={exec.themeColor} /> Switch to this User
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                    {/* Executive Avatar with Glowing Ring */}
                    <div style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: '50%',
                      background: exec.accentGradient,
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.75rem',
                      fontWeight: 900,
                      boxShadow: `0 8px 20px -4px ${exec.themeColor}50`,
                      border: '3px solid #FFFFFF',
                      flexShrink: 0
                    }}>
                      {exec.avatar}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span className="badge" style={{
                          backgroundColor: isPresident ? '#FEF3C7' : '#EFF6FF',
                          color: isPresident ? '#B45309' : '#1D4ED8',
                          border: `1px solid ${isPresident ? '#FDE68A' : '#BFDBFE'}`,
                          fontWeight: 800,
                          fontSize: '0.75rem'
                        }}>
                          {exec.badge}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>
                          ID: {exec.id} • @{exec.username}
                        </span>
                      </div>

                      <h2 style={{ fontSize: '1.625rem', fontWeight: 900, color: '#0F172A', marginTop: '4px', marginBottom: '2px' }}>
                        {exec.name}
                      </h2>
                      <div style={{ fontSize: '0.875rem', color: '#475569', fontWeight: 600 }}>
                        {exec.roleTitle}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
                  {/* Property & Residence Info Box */}
                  <div style={{
                    backgroundColor: '#F8FAFC',
                    borderRadius: '12px',
                    padding: '16px',
                    border: '1px solid #E2E8F0'
                  }}>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B', fontWeight: 800, marginBottom: '10px' }}>
                      Residence & Property Allotment
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', fontSize: '0.8125rem' }}>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>Complex</span>
                        <strong style={{ color: '#0F172A' }}>{exec.apartment}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>Tower & Flat</span>
                        <strong style={{ color: exec.themeColor }}>{exec.tower} • {exec.flatNumber}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>Ownership Status</span>
                        <strong style={{ color: '#0F172A' }}>{exec.residentType}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>Parking Bay</span>
                        <strong style={{ color: '#0F172A' }}>{exec.parkingSlot}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Official Contacts & Office Hours */}
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '10px'
                    }}>
                      <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B', fontWeight: 800 }}>
                        Official Contact & Secretariat Desk
                      </div>
                      <button
                        onClick={() => handleStartEdit(exec)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#2563EB',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Edit3 size={12} /> Edit Details
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8125rem' }}>
                      {/* Phone */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #E2E8F0'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Phone size={14} color="#64748B" />
                          <span style={{ color: '#64748B' }}>Direct Phone:</span>
                          <strong style={{ color: '#0F172A' }}>{exec.phone}</strong>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <button
                            onClick={() => handleCopy(exec.phone, 'Phone Number')}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#64748B' }}
                            title="Copy Phone"
                          >
                            {copiedField === 'Phone Number' ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                          </button>
                          <a
                            href={`tel:${exec.phone.replace(/[^0-9+]/g, '')}`}
                            className="btn btn-secondary btn-sm"
                            style={{ fontSize: '0.7rem', padding: '2px 8px', height: 'auto' }}
                          >
                            Call
                          </a>
                        </div>
                      </div>

                      {/* Email */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #E2E8F0'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Mail size={14} color="#64748B" />
                          <span style={{ color: '#64748B' }}>Official Email:</span>
                          <strong style={{ color: '#0F172A' }}>{exec.email}</strong>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <button
                            onClick={() => handleCopy(exec.email, 'Official Email')}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#64748B' }}
                            title="Copy Email"
                          >
                            {copiedField === 'Official Email' ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                          </button>
                          <a
                            href={`mailto:${exec.email}`}
                            className="btn btn-secondary btn-sm"
                            style={{ fontSize: '0.7rem', padding: '2px 8px', height: 'auto' }}
                          >
                            Email
                          </a>
                        </div>
                      </div>

                      {/* Office & Intercom */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '8px'
                      }}>
                        <div style={{ padding: '8px 12px', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                          <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>Intercom Extension</span>
                          <strong style={{ color: '#0F172A', fontSize: '0.8125rem' }}>{exec.intercom}</strong>
                        </div>
                        <div style={{ padding: '8px 12px', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                          <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>Office Hours</span>
                          <strong style={{ color: '#0F172A', fontSize: '0.8125rem' }}>{exec.officeHours.split('&')[0]}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Core Responsibilities Preview */}
                  <div>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B', fontWeight: 800, marginBottom: '10px' }}>
                      Primary Executive Portfolios
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {exec.responsibilities.slice(0, 3).map((resp, i) => {
                        const IconComponent = resp.icon;
                        return (
                          <div
                            key={i}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '10px',
                              padding: '10px 12px',
                              borderRadius: '8px',
                              backgroundColor: '#FFFFFF',
                              border: '1px solid #F1F5F9'
                            }}
                          >
                            <div style={{
                              width: '26px',
                              height: '26px',
                              borderRadius: '6px',
                              backgroundColor: isPresident ? 'rgba(245, 158, 11, 0.12)' : 'rgba(37, 99, 235, 0.12)',
                              color: exec.themeColor,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              marginTop: '2px'
                            }}>
                              <IconComponent size={14} />
                            </div>
                            <div style={{ fontSize: '0.8125rem' }}>
                              <strong style={{ color: '#0F172A', display: 'block', marginBottom: '2px' }}>{resp.title}</strong>
                              <span style={{ color: '#64748B', lineHeight: '1.3' }}>{resp.desc}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Fast Action Desks */}
                  <div>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B', fontWeight: 800, marginBottom: '8px' }}>
                      Administrative Desks & Oversight
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                      {exec.deskLinks.map((link, idx) => {
                        const LinkIcon = link.icon;
                        return (
                          <button
                            key={idx}
                            onClick={() => setActiveTab(link.tab)}
                            className="btn btn-secondary btn-sm"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              fontSize: '0.75rem',
                              padding: '8px 12px',
                              backgroundColor: '#F8FAFC',
                              borderColor: '#E2E8F0',
                              textAlign: 'left'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <LinkIcon size={14} color={link.color} />
                              <span style={{ fontWeight: 600 }}>{link.label}</span>
                            </div>
                            <ArrowRight size={12} color="#94A3B8" />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footer Buttons */}
                  <div style={{
                    marginTop: 'auto',
                    paddingTop: '16px',
                    borderTop: '1px solid #F1F5F9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setSelectedExecutive(exec)}
                      style={{ flex: 1, fontSize: '0.8125rem', fontWeight: 700 }}
                    >
                      <Sparkles size={14} color={exec.themeColor} /> View Dossier
                    </button>

                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleStartEdit(exec)}
                      style={{ fontSize: '0.8125rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px' }}
                    >
                      <Edit3 size={13} color={exec.themeColor} /> Edit Info
                    </button>

                    {!isActiveUser && (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => switchRole(exec.roleKey)}
                        style={{
                          backgroundColor: exec.themeColor,
                          borderColor: exec.themeColor,
                          fontSize: '0.8125rem',
                          fontWeight: 700,
                          flex: 1
                        }}
                      >
                        <UserCheck size={14} /> Log in as {exec.shortRole}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Full Executive Dossier Modal */}
      {selectedExecutive && (
        <Modal
          isOpen={!!selectedExecutive}
          onClose={() => setSelectedExecutive(null)}
          title={`${selectedExecutive.badge} — Official Executive Dossier`}
          subtitle={`RWA Governance credentials and statutory authority for ${selectedExecutive.name}`}
          maxWidth="700px"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Modal Header Dossier banner */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px 20px',
              borderRadius: '12px',
              background: selectedExecutive.headerBg,
              border: `1px solid ${selectedExecutive.badgeBorder}`
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: selectedExecutive.accentGradient,
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 900,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                flexShrink: 0
              }}>
                {selectedExecutive.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '1.375rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                    {selectedExecutive.name}
                  </h3>
                  <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>Active Mandate</span>
                </div>
                <div style={{ color: '#475569', fontSize: '0.875rem', fontWeight: 600, marginTop: '2px' }}>
                  {selectedExecutive.roleTitle}
                </div>
                <div style={{ color: '#64748B', fontSize: '0.75rem', marginTop: '4px' }}>
                  Member ID: {selectedExecutive.id} • Elected Term: {selectedExecutive.term}
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              <div style={{ backgroundColor: '#F8FAFC', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                <span style={{ fontSize: '0.6875rem', color: '#64748B', display: 'block', fontWeight: 700 }}>TOWERS</span>
                <strong style={{ fontSize: '0.875rem', color: '#0F172A' }}>{selectedExecutive.stats.towersGoverned}</strong>
              </div>
              <div style={{ backgroundColor: '#F8FAFC', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                <span style={{ fontSize: '0.6875rem', color: '#64748B', display: 'block', fontWeight: 700 }}>UNITS</span>
                <strong style={{ fontSize: '0.875rem', color: '#0F172A' }}>{selectedExecutive.stats.flatsUnderPurview}</strong>
              </div>
              <div style={{ backgroundColor: '#F8FAFC', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                <span style={{ fontSize: '0.6875rem', color: '#64748B', display: 'block', fontWeight: 700 }}>SLA TARGET</span>
                <strong style={{ fontSize: '0.875rem', color: '#10B981' }}>{selectedExecutive.stats.signOffSLA}</strong>
              </div>
              <div style={{ backgroundColor: '#F8FAFC', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                <span style={{ fontSize: '0.6875rem', color: '#64748B', display: 'block', fontWeight: 700 }}>TENURE</span>
                <strong style={{ fontSize: '0.875rem', color: '#2563EB' }}>2025–2027</strong>
              </div>
            </div>

            {/* All Statutory Portfolios */}
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0F172A', marginBottom: '10px' }}>
                Complete Governance & Administrative Portfolio
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedExecutive.responsibilities.map((resp, idx) => {
                  const RespIcon = resp.icon;
                  return (
                    <div key={idx} style={{
                      padding: '12px 14px',
                      borderRadius: '10px',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}>
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        color: selectedExecutive.themeColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <RespIcon size={15} />
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.875rem', color: '#0F172A', display: 'block', marginBottom: '2px' }}>
                          {resp.title}
                        </strong>
                        <span style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: '1.4' }}>
                          {resp.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* System Permissions Pill List */}
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                Assigned System Permissions
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {selectedExecutive.assignedPermissions.map((perm, idx) => (
                  <span key={idx} className="badge badge-indigo" style={{ padding: '6px 10px', fontSize: '0.75rem' }}>
                    <ShieldCheck size={12} /> {perm}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '12px',
              paddingTop: '16px',
              borderTop: '1px solid #E2E8F0'
            }}>
              <button className="btn btn-secondary" onClick={() => setSelectedExecutive(null)}>
                Close Dossier
              </button>
              {currentRoleKey !== selectedExecutive.roleKey && (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    switchRole(selectedExecutive.roleKey);
                    setSelectedExecutive(null);
                  }}
                  style={{ backgroundColor: selectedExecutive.themeColor, borderColor: selectedExecutive.themeColor }}
                >
                  <UserCheck size={15} /> Switch to {selectedExecutive.shortRole} Session
                </button>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Executive Details Modal */}
      {editingExecutive && (
        <Modal
          isOpen={!!editingExecutive}
          onClose={() => setEditingExecutive(null)}
          title={`Edit Details for ${executives[editingExecutive].name} (${executives[editingExecutive].shortRole})`}
          subtitle="Update official contact numbers, secretariat room, and public office hours."
          maxWidth="560px"
        >
          <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label className="form-label">Official Contact Phone</label>
              <input
                type="text"
                className="form-input"
                value={editFormData.phone}
                onChange={e => setEditFormData({ ...editFormData, phone: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="form-label">Official RWA Email Address</label>
              <input
                type="email"
                className="form-input"
                value={editFormData.email}
                onChange={e => setEditFormData({ ...editFormData, email: e.target.value })}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              <div>
                <label className="form-label">Intercom Extension</label>
                <input
                  type="text"
                  className="form-input"
                  value={editFormData.intercom}
                  onChange={e => setEditFormData({ ...editFormData, intercom: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="form-label">Public Office Hours</label>
                <input
                  type="text"
                  className="form-input"
                  value={editFormData.officeHours}
                  onChange={e => setEditFormData({ ...editFormData, officeHours: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="form-label">Secretariat / Operations Office Location</label>
              <input
                type="text"
                className="form-input"
                value={editFormData.officeLocation}
                onChange={e => setEditFormData({ ...editFormData, officeLocation: e.target.value })}
                required
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setEditingExecutive(null)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default ExecutiveUsersDirectory;
