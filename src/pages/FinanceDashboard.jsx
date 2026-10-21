import React, { useState } from 'react';
import { useRwa } from '../context/RwaContext';
import { StatCard, StatusPill, ApartmentBadge } from '../components/CommonUI';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  Receipt, 
  TrendingUp, 
  PieChart, 
  Calendar, 
  Building2, 
  PlusCircle, 
  FileText,
  DollarSign
} from 'lucide-react';

export const FinanceDashboard = () => {
  const { 
    financeSummary, 
    maintenanceDues, 
    transactions, 
    apartments, 
    selectedApartment, 
    setSelectedApartment,
    setActiveTab 
  } = useRwa();

  const [timeframe, setTimeframe] = useState('October 2026');

  // Format INR currency
  const formatINR = (val) => '₹ ' + (val || 0).toLocaleString('en-IN');

  // Category breakdown for expenses
  const expenseCategories = transactions
    .filter(t => t.type === 'Expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const totalExpenseAmount = Object.values(expenseCategories).reduce((a, b) => a + b, 0);

  // Monthly Income vs Expenses bar chart mockup data
  const monthlyData = [
    { month: 'Jun 2026', income: 2750000, expense: 1540000 },
    { month: 'Jul 2026', income: 2680000, expense: 1710000 },
    { month: 'Aug 2026', income: 2890000, expense: 1620000 },
    { month: 'Sep 2026', income: 2810000, expense: 1590000 },
    { month: 'Oct 2026 (Current)', income: financeSummary.totalIncome, expense: financeSummary.totalExpenses }
  ];

  const maxBarValue = 3200000;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Finance & Treasury Center</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Audited financial health, maintenance dues collections, and vendor disbursements
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('maintenance')}>
            <Receipt size={16} /> Maintenance Dues Register
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('transactions')}>
            <PlusCircle size={16} /> Record Transaction
          </button>
        </div>
      </div>

      {/* Available Balance Core PRD Formula Card */}
      <div 
        className="glass-card" 
        style={{ 
          background: 'linear-gradient(135deg, #0B1220 0%, #1E3A8A 100%)', 
          color: '#FFFFFF',
          border: '1px solid rgba(59, 130, 246, 0.4)',
          padding: '28px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-cyan" style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                RWA TREASURY RECONCILIATION
              </span>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{financeSummary.fiscalYear}</span>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '6px' }}>
              {formatINR(financeSummary.availableBalance)}
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#CBD5E1', marginTop: '6px' }}>
              <strong>PRD Formula: </strong> Available Balance = Opening Balance + Total Income − Total Expenses
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '16px', 
            backgroundColor: 'rgba(255, 255, 255, 0.08)', 
            padding: '16px 20px', 
            borderRadius: '12px' 
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Opening Corpus</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 700, color: '#FFFFFF' }}>{formatINR(financeSummary.openingBalance)}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Total Income (+)</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 700, color: '#34D399' }}>{formatINR(financeSummary.totalIncome)}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Total Expenses (−)</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 700, color: '#F87171' }}>{formatINR(financeSummary.totalExpenses)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid-cols-4">
        <StatCard 
          title="Collections Received" 
          value={formatINR(financeSummary.totalIncome)} 
          subtitle="89.4% collection efficiency"
          icon={ArrowUpRight} 
          color="green"
          onClick={() => setActiveTab('maintenance')}
        />
        <StatCard 
          title="Pending Dues" 
          value={formatINR(financeSummary.totalDuesPending)} 
          subtitle="Outstanding across 14 units"
          icon={Receipt} 
          color="amber"
          onClick={() => setActiveTab('maintenance')}
        />
        <StatCard 
          title="Total Disbursements" 
          value={formatINR(financeSummary.totalExpenses)} 
          subtitle="Lifts, Security, BESCOM, STP"
          icon={ArrowDownRight} 
          color="rose"
          onClick={() => setActiveTab('transactions')}
        />
        <StatCard 
          title="Monthly Pool Target" 
          value="₹ 8,25,000" 
          subtitle="Golden + Silver + Diamond"
          icon={Building2} 
          color="indigo"
          onClick={() => setActiveTab('apartments')}
        />
      </div>

      {/* Interactive Monthly Comparison Chart */}
      <div className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Monthly Income vs Expense Overview</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Historical cash inflows from maintenance fees vs essential operational expenditures
            </p>
          </div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '0.8125rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: 'var(--success)' }} /> Income
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: 'var(--error)' }} /> Expenses
            </span>
          </div>
        </div>

        {/* Visual Bar Graph */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '10px' }}>
          {monthlyData.map((d, idx) => (
            <div key={idx} style={{ display: 'grid', gridTemplateColumns: '150px 1fr 1fr', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{d.month}</div>
              
              {/* Income Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '3px' }}>
                  <span style={{ color: 'var(--success)', fontWeight: 600 }}>Income</span>
                  <span>{formatINR(d.income)}</span>
                </div>
                <div style={{ height: '8px', backgroundColor: 'var(--bg-hover)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${(d.income / maxBarValue) * 100}%`, height: '100%', backgroundColor: 'var(--success)', borderRadius: '4px' }} />
                </div>
              </div>

              {/* Expense Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '3px' }}>
                  <span style={{ color: 'var(--error)', fontWeight: 600 }}>Expense</span>
                  <span>{formatINR(d.expense)}</span>
                </div>
                <div style={{ height: '8px', backgroundColor: 'var(--bg-hover)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${(d.expense / maxBarValue) * 100}%`, height: '100%', backgroundColor: 'var(--error)', borderRadius: '4px' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2-Column: Expense Breakdown by Category & Apartment Collection Split */}
      <div className="grid-cols-2">
        {/* Category Breakdown */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '16px' }}>
            Operational Expenditure Breakdown
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {Object.entries(expenseCategories).map(([category, amount]) => {
              const pct = Math.round((amount / totalExpenseAmount) * 100);
              return (
                <div key={category}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600 }}>{category}</span>
                    <span><strong>{formatINR(amount)}</strong> ({pct}%)</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: 'var(--bg-hover)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', backgroundColor: 'var(--electric-blue)', borderRadius: '3px' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Apartment Collection Summary */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '16px' }}>
            Collections by Apartment Complex
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {apartments.map(apt => (
              <div 
                key={apt.id}
                style={{
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-hover)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 700 }}>{apt.name}</h4>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {apt.towerCode} • {apt.occupiedFlats} Paying Units
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--success)' }}>
                    {formatINR(apt.monthlyPool)}
                  </div>
                  <span className="badge badge-success" style={{ fontSize: '0.6875rem' }}>92% Collected</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
