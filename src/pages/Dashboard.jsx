import React, { useState } from 'react';
import { useRwa } from '../context/RwaContext';
import { StatCard, StatusPill, PriorityBadge, ApartmentBadge } from '../components/CommonUI';
import { 
  Building2, 
  Users, 
  UserCheck, 
  AlertTriangle, 
  Dumbbell, 
  Wallet, 
  Calendar, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle2, 
  ShieldAlert, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Receipt,
  PlusCircle
} from 'lucide-react';

export const Dashboard = () => {
  const { 
    currentRoleKey, 
    currentUser, 
    apartments, 
    selectedApartment, 
    setSelectedApartment,
    registrationRequests, 
    approveRequest,
    rejectRequest,
    complaints, 
    facilities, 
    bookings, 
    financeSummary, 
    maintenanceDues, 
    transactions,
    announcements, 
    setActiveTab 
  } = useRwa();

  // Filter helpers
  const filterByApt = (item) => {
    if (selectedApartment === 'All') return true;
    return item.apartment === selectedApartment;
  };

  const filteredComplaints = complaints.filter(filterByApt);
  const filteredBookings = bookings.filter(filterByApt);
  const filteredDues = maintenanceDues.filter(filterByApt);

  // Totals
  const totalFlats = apartments.reduce((acc, a) => acc + a.totalFlats, 0);
  const totalOccupied = apartments.reduce((acc, a) => acc + a.occupiedFlats, 0);
  const pendingApprovals = registrationRequests.filter(r => r.status === 'Pending');
  const openComplaints = filteredComplaints.filter(c => ['Submitted', 'Assigned', 'In Progress'].includes(c.status));
  const urgentComplaints = filteredComplaints.filter(c => c.priority === 'Urgent');

  // Format INR currency
  const formatINR = (val) => '₹ ' + (val || 0).toLocaleString('en-IN');

  /* =========================================================================
     1. PRESIDENT DASHBOARD
     ========================================================================= */
  if (currentRoleKey === 'president') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Header Title */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Executive President Dashboard</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Comprehensive oversight of Golden, Silver, and Diamond Apartment Complexes
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('approvals')}>
              <UserCheck size={16} /> Review Approvals ({pendingApprovals.length})
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('announcements')}>
              Broadcast Notice
            </button>
          </div>
        </div>

        {/* Executive Stat Cards */}
        <div className="grid-cols-4">
          <StatCard 
            title="Apartment Complexes" 
            value="3 Towers" 
            subtitle={`${totalOccupied} / ${totalFlats} Flats Occupied (${Math.round((totalOccupied/totalFlats)*100)}%)`}
            icon={Building2} 
            color="cyan"
            onClick={() => setActiveTab('apartments')}
          />
          <StatCard 
            title="Registration Queue" 
            value={pendingApprovals.length} 
            subtitle="Residents awaiting approval"
            icon={UserCheck} 
            color="amber"
            onClick={() => setActiveTab('approvals')}
          />
          <StatCard 
            title="Active Complaints" 
            value={openComplaints.length} 
            subtitle={`${urgentComplaints.length} urgent escalations`}
            icon={AlertTriangle} 
            color="rose"
            onClick={() => setActiveTab('complaints')}
          />
          <StatCard 
            title="Available Treasury" 
            value={formatINR(financeSummary.availableBalance)} 
            subtitle={`Opening + In - Exp (89% collected)`}
            icon={Wallet} 
            color="green"
            onClick={() => setActiveTab('finance')}
          />
        </div>

        {/* 3 Apartment Complex Cards */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Towers & Complexes Status</h3>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setActiveTab('apartments')}
            >
              View Full Apartment Specs →
            </button>
          </div>
          <div className="grid-cols-3">
            {apartments.map(apt => (
              <div key={apt.id} className="glass-card" style={{ borderTop: `4px solid ${apt.color}` }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{apt.name}</h4>
                  <span className="badge badge-neutral">{apt.towerCode}</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                  {apt.floors} Floors • {apt.lifts} Lifts • Reservoir: {apt.reservoirCapacity}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Occupancy</span>
                  <span style={{ fontWeight: 700 }}>{apt.occupiedFlats} / {apt.totalFlats} ({Math.round((apt.occupiedFlats/apt.totalFlats)*100)}%)</span>
                </div>
                {/* Progress bar */}
                <div style={{ width: '100%', height: '7px', backgroundColor: 'var(--bg-hover)', borderRadius: '4px', overflow: 'hidden', marginBottom: '14px' }}>
                  <div style={{ width: `${(apt.occupiedFlats/apt.totalFlats)*100}%`, height: '100%', backgroundColor: apt.color, borderRadius: '4px' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '10px', fontSize: '0.75rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Monthly Pool:</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{formatINR(apt.monthlyPool)}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2-Column: Pending Registrations & Urgent Complaints */}
        <div className="grid-cols-2">
          {/* Pending Approvals */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Pending Resident Registrations</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Requires President sign-off</p>
              </div>
              <span className="badge badge-warning">{pendingApprovals.length} Pending</span>
            </div>

            {pendingApprovals.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={32} style={{ color: 'var(--success)', margin: '0 auto 8px' }} />
                <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>All resident requests processed!</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {pendingApprovals.map(req => (
                  <div 
                    key={req.id} 
                    style={{ 
                      padding: '12px 14px', 
                      borderRadius: 'var(--radius-md)', 
                      backgroundColor: 'var(--bg-hover)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{req.applicantName}</span>
                      <ApartmentBadge apartment={req.apartment} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      <span>Flat: <strong>{req.flatNumber}</strong> ({req.residentType})</span>
                      <span>{req.submittedAt}</span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      📄 {req.documentStatus}
                    </p>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                      <button 
                        className="btn btn-success btn-sm"
                        style={{ flex: 1, padding: '4px 8px' }}
                        onClick={() => approveRequest(req.id, 'Approved by President during dashboard review')}
                      >
                        Approve
                      </button>
                      <button 
                        className="btn btn-danger btn-sm"
                        style={{ flex: 1, padding: '4px 8px' }}
                        onClick={() => rejectRequest(req.id, 'Document incomplete. Please resubmit.')}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Urgent & Active Complaints */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Priority Escalation Tracker</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Lifts, water & common infrastructure</p>
              </div>
              <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('complaints')}>
                View All →
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredComplaints.slice(0, 4).map(cmp => (
                <div 
                  key={cmp.id}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-elevated)',
                    cursor: 'pointer'
                  }}
                  onClick={() => setActiveTab('complaints')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <PriorityBadge priority={cmp.priority} />
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{cmp.id}</span>
                    </div>
                    <StatusPill status={cmp.status} />
                  </div>
                  <h5 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '4px' }}>{cmp.title}</h5>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    <span>{cmp.apartment}</span>
                    <span>Assigned: {cmp.assignedTo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     2. VICE PRESIDENT DASHBOARD (Operations & Field Support)
     ========================================================================= */
  if (currentRoleKey === 'vice_president') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Vice President Operations Center</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Daily Field Activities, Complaint Dispatch & Facilities Maintenance
            </p>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('complaints')}>
            <AlertTriangle size={16} /> Dispatch Complaints Desk
          </button>
        </div>

        {/* VP Operational KPIs */}
        <div className="grid-cols-4">
          <StatCard 
            title="Open Tickets" 
            value={openComplaints.length} 
            subtitle="Requires dispatch/resolution"
            icon={AlertTriangle} 
            color="rose"
            onClick={() => setActiveTab('complaints')}
          />
          <StatCard 
            title="Urgent Priority" 
            value={urgentComplaints.length} 
            subtitle="Otis Lift & water lines"
            icon={ShieldAlert} 
            color="amber"
            onClick={() => setActiveTab('complaints')}
          />
          <StatCard 
            title="Facilities Operating" 
            value={`${facilities.filter(f => f.status === 'Available').length} / ${facilities.length}`} 
            subtitle="Gym, Parks, Sports annexes"
            icon={Dumbbell} 
            color="cyan"
            onClick={() => setActiveTab('facilities')}
          />
          <StatCard 
            title="Active Bookings" 
            value={filteredBookings.filter(b => b.status === 'Confirmed').length} 
            subtitle="Today & tomorrow sessions"
            icon={Calendar} 
            color="indigo"
            onClick={() => setActiveTab('facilities')}
          />
        </div>

        {/* Facilities Status & Quick Maintenance Toggle */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Facilities Operational Status</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Monitor uptime and schedule closures</p>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('facilities')}>
              Manage All Facilities →
            </button>
          </div>

          <div className="grid-cols-2">
            {facilities.map(fac => (
              <div 
                key={fac.id}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-elevated)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 700 }}>{fac.name}</h4>
                  <StatusPill status={fac.status} />
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  📍 {fac.location} • ⏰ {fac.hours}
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {fac.maintenanceNotes}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '8px', marginTop: '4px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Occupancy: <strong>{fac.currentOccupancy} / {fac.capacity}</strong>
                  </span>
                  <button 
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.75rem', padding: '3px 8px' }}
                    onClick={() => setActiveTab('facilities')}
                  >
                    View Slots & Booking Log
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Complaints Dispatch Stream */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Complaints Needing Operations Attention</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Assign technicians & track field repairs</p>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('complaints')}>
              Open Full Complaints Register
            </button>
          </div>

          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Issue & Area</th>
                  <th>Apartment</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Assigned Person</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.slice(0, 5).map(cmp => (
                  <tr key={cmp.id}>
                    <td style={{ fontWeight: 700, color: 'var(--electric-blue)' }}>{cmp.id}</td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{cmp.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cmp.location}</div>
                    </td>
                    <td><ApartmentBadge apartment={cmp.apartment} /></td>
                    <td><PriorityBadge priority={cmp.priority} /></td>
                    <td><StatusPill status={cmp.status} /></td>
                    <td style={{ fontSize: '0.8125rem', fontWeight: 500 }}>{cmp.assignedTo}</td>
                    <td>
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => setActiveTab('complaints')}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     3. FINANCE MANAGER DASHBOARD (Treasurer & Accounts)
     ========================================================================= */
  if (currentRoleKey === 'finance_manager') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Finance & Treasury Center</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Maintenance dues collections, utility expenditures, and live balance reconciliations
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('maintenance')}>
              <Receipt size={16} /> Record Collection
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('transactions')}>
              Log Expense
            </button>
          </div>
        </div>

        {/* PRD Available Balance Calculation Card */}
        <div 
          className="glass-card" 
          style={{ 
            background: 'linear-gradient(135deg, #0B1220 0%, #1E3A8A 100%)', 
            color: '#FFFFFF',
            border: '1px solid rgba(59, 130, 246, 0.4)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--cyan-blue)', fontWeight: 700 }}>
                Available RWA Treasury Balance
              </span>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '4px' }}>
                {formatINR(financeSummary.availableBalance)}
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#E2E8F0', marginTop: '6px' }}>
                Formula: Opening Balance ({formatINR(financeSummary.openingBalance)}) + Total Income ({formatINR(financeSummary.totalIncome)}) − Total Expenses ({formatINR(financeSummary.totalExpenses)})
              </p>
            </div>

            <div style={{ display: 'flex', gap: '20px', backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '16px 20px', borderRadius: '12px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#CBD5E1' }}>Recorded Income</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#34D399' }}>{formatINR(financeSummary.totalIncome)}</div>
              </div>
              <div style={{ width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
              <div>
                <div style={{ fontSize: '0.75rem', color: '#CBD5E1' }}>Recorded Expenses</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F87171' }}>{formatINR(financeSummary.totalExpenses)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Stat Cards */}
        <div className="grid-cols-4">
          <StatCard 
            title="Total Collected" 
            value={formatINR(financeSummary.totalIncome)} 
            subtitle="October 89.4% collection rate"
            icon={ArrowUpRight} 
            color="green"
            onClick={() => setActiveTab('finance')}
          />
          <StatCard 
            title="Pending Dues" 
            value={formatINR(financeSummary.totalDuesPending)} 
            subtitle={`${filteredDues.filter(d => d.status === 'Overdue').length} flats overdue`}
            icon={Receipt} 
            color="amber"
            onClick={() => setActiveTab('maintenance')}
          />
          <StatCard 
            title="Total Expenses" 
            value={formatINR(financeSummary.totalExpenses)} 
            subtitle="BESCOM, Otis Lifts, Security, Diesel"
            icon={ArrowDownRight} 
            color="rose"
            onClick={() => setActiveTab('transactions')}
          />
          <StatCard 
            title="Reserve Corpus" 
            value={formatINR(financeSummary.openingBalance)} 
            subtitle="FY 2026-27 Sinking Fund"
            icon={Wallet} 
            color="cyan"
            onClick={() => setActiveTab('finance')}
          />
        </div>

        {/* 2-Column: Recent Ledger & Maintenance Defaulters */}
        <div className="grid-cols-2">
          {/* Recent Ledger */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Recent Transactions</h3>
              <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('transactions')}>
                Full Ledger →
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {transactions.slice(0, 5).map(txn => (
                <div 
                  key={txn.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-elevated)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: txn.type === 'Income' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: txn.type === 'Income' ? 'var(--success)' : 'var(--error)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {txn.type === 'Income' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{txn.description}</div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{txn.date} • {txn.category}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ 
                      fontWeight: 700, 
                      fontSize: '0.875rem',
                      color: txn.type === 'Income' ? 'var(--success)' : 'var(--error)' 
                    }}>
                      {txn.type === 'Income' ? '+' : '-'}{formatINR(txn.amount)}
                    </div>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{txn.method}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Maintenance Defaulters */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Unpaid / Overdue Maintenance</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>October 2026 Billing Period</p>
              </div>
              <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('maintenance')}>
                Manage Dues →
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredDues.filter(d => d.status !== 'Paid').map(due => (
                <div 
                  key={due.id}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-elevated)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{due.flat}</span>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--text-primary)' }}>{due.residentName}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {due.apartment} • Due date: {due.dueDate}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, color: 'var(--error)', fontSize: '0.9375rem' }}>
                      {formatINR(due.outstanding)}
                    </div>
                    <StatusPill status={due.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     4. RESIDENT DASHBOARD (Flat Owner & Tenant)
     ========================================================================= */
  const myComplaints = complaints.filter(c => c.submittedBy.includes(currentUser.name) || c.submittedBy.includes(currentUser.flatNumber));
  const myBookings = bookings.filter(b => b.bookedBy.includes(currentUser.name) || b.flatNumber === currentUser.flatNumber);
  const myDues = maintenanceDues.find(d => d.flat === currentUser.flatNumber) || {
    flat: currentUser.flatNumber,
    status: 'Paid',
    amountDue: 3800,
    amountPaid: 3800,
    outstanding: 0,
    billingPeriod: 'October 2026'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Welcome Hero Card */}
      <div 
        className="glass-card" 
        style={{ 
          background: 'linear-gradient(135deg, #0B1220 0%, #1D4ED8 100%)', 
          color: '#FFFFFF',
          border: '1px solid rgba(59, 130, 246, 0.4)',
          padding: '28px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge" style={{ backgroundColor: 'rgba(34, 211, 238, 0.2)', color: 'var(--cyan-blue)', border: '1px solid rgba(34, 211, 238, 0.4)' }}>
                {currentUser.residentType} Portal
              </span>
              <span style={{ fontSize: '0.8125rem', color: '#E2E8F0' }}>{currentUser.apartment}</span>
            </div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: '#FFFFFF' }}>
              Welcome Home, {currentUser.name}!
            </h1>
            <p style={{ color: '#E2E8F0', fontSize: '0.875rem', marginTop: '6px' }}>
              Flat: <strong>{currentUser.flatNumber}</strong> • Parking: <strong>{currentUser.parkingSlot || 'Allotted Bay'}</strong> {currentUser.flatSize ? `• ${currentUser.flatSize}` : ''}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-accent btn-sm"
              onClick={() => setActiveTab('submit-complaint')}
            >
              <PlusCircle size={16} /> Raise Complaint
            </button>
            <button 
              className="btn btn-secondary btn-sm"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.3)' }}
              onClick={() => setActiveTab('book-facility')}
            >
              <Calendar size={16} /> Reserve Sports / Gym
            </button>
          </div>
        </div>
      </div>

      {/* Resident KPI summary */}
      <div className="grid-cols-4">
        <StatCard 
          title="My Maintenance Dues" 
          value={myDues.outstanding === 0 ? 'Clear (₹ 0)' : formatINR(myDues.outstanding)} 
          subtitle={myDues.outstanding === 0 ? 'October dues paid' : 'Payment due by Oct 25'}
          icon={Receipt} 
          color={myDues.outstanding === 0 ? 'green' : 'amber'}
          onClick={() => setActiveTab('maintenance')}
        />
        <StatCard 
          title="My Complaints" 
          value={myComplaints.length} 
          subtitle={`${myComplaints.filter(c => c.status !== 'Closed').length} in active tracking`}
          icon={AlertTriangle} 
          color="rose"
          onClick={() => setActiveTab('complaints')}
        />
        <StatCard 
          title="My Bookings" 
          value={myBookings.filter(b => b.status === 'Confirmed').length} 
          subtitle="Gym & Badminton slots"
          icon={Calendar} 
          color="cyan"
          onClick={() => setActiveTab('my-bookings')}
        />
        <StatCard 
          title="Announcements" 
          value={announcements.length} 
          subtitle="Notices & community circulars"
          icon={Sparkles} 
          color="indigo"
          onClick={() => setActiveTab('announcements')}
        />
      </div>

      {/* 2-Column: My Active Complaints & My Upcoming Bookings */}
      <div className="grid-cols-2">
        {/* Complaints Tracking */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>My Service Requests & Complaints</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Track live resolution progress</p>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('submit-complaint')}>
              + New Ticket
            </button>
          </div>

          {myComplaints.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-secondary)' }}>
              <CheckCircle2 size={32} style={{ color: 'var(--success)', margin: '0 auto 8px' }} />
              <p style={{ fontSize: '0.875rem' }}>No open complaints logged from your unit.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {myComplaints.map(cmp => (
                <div 
                  key={cmp.id}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-elevated)',
                    cursor: 'pointer'
                  }}
                  onClick={() => setActiveTab('complaints')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--electric-blue)' }}>{cmp.id}</span>
                    <StatusPill status={cmp.status} />
                  </div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '4px' }}>{cmp.title}</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    <span>{cmp.location}</span>
                    <span>Assigned: <strong>{cmp.assignedTo}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* My Bookings */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>My Upcoming Facility Sessions</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Reserved time slots</p>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('book-facility')}>
              Book Slot →
            </button>
          </div>

          {myBookings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-secondary)' }}>
              <Calendar size={32} style={{ color: 'var(--cyan-blue)', margin: '0 auto 8px' }} />
              <p style={{ fontSize: '0.875rem' }}>No active bookings. Enjoy the sports facilities!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {myBookings.map(bk => (
                <div 
                  key={bk.id}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-elevated)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: 700 }}>{bk.facilityName}</h4>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      📅 {bk.date} • ⏰ {bk.timeSlot}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <StatusPill status={bk.status} />
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      {bk.participants} Person(s)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Community Bulletins */}
      <div className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Latest Community Announcements</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Official notices from RWA Executive Committee</p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('announcements')}>
            View Notice Board →
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {announcements.slice(0, 3).map(ann => (
            <div 
              key={ann.id}
              style={{
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-hover)',
                border: '1px solid var(--border-color)',
                borderLeft: ann.priority === 'Urgent' ? '4px solid var(--error)' : '4px solid var(--electric-blue)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{ann.title}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ann.publishedDate}</span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {ann.description}
              </p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px', fontSize: '0.6875rem' }}>
                <span className="badge badge-neutral">Scope: {ann.apartmentScope}</span>
                <span className="badge badge-info">{ann.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
