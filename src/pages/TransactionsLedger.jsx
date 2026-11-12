import React, { useState } from 'react';
import { useRwa } from '../context/RwaContext';
import { StatusPill, ApartmentBadge, Modal } from '../components/CommonUI';
import { 
  ArrowLeftRight, 
  ArrowUpRight, 
  ArrowDownRight, 
  PlusCircle, 
  Search, 
  Filter, 
  Calendar, 
  Download,
  Building2,
  Receipt
} from 'lucide-react';

export const TransactionsLedger = () => {
  const { 
    transactions, 
    addTransaction, 
    selectedApartment, 
    setSelectedApartment,
    apartments, 
    currentUser, 
    currentRoleKey,
    showToast 
  } = useRwa();

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newTxn, setNewTxn] = useState({
    description: '',
    type: 'Expense',
    category: 'Electricity / Utilities',
    amount: '',
    apartment: 'All Apartments',
    date: new Date().toISOString().split('T')[0],
    method: 'Direct Bank Transfer',
    ref: ''
  });

  const formatINR = (val) => '₹ ' + (val || 0).toLocaleString('en-IN');

  const filteredTransactions = transactions.filter(t => {
    const matchesApt = selectedApartment === 'All' || t.apartment === selectedApartment || t.apartment === 'All Apartments';
    const matchesType = typeFilter === 'All' || t.type === typeFilter;
    const matchesSearch = 
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.ref.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesApt && matchesType && matchesSearch;
  });

  const categoriesExpense = [
    'Electricity / Utilities',
    'Lifts AMC',
    'Water Supply',
    'Security Services',
    'Housekeeping',
    'Generator & Power',
    'Park & Gardens',
    'Repairs & Plumbing',
    'Administrative / Legal'
  ];

  const categoriesIncome = [
    'Maintenance Fees',
    'Facility Rental',
    'Move-in / Move-out Charges',
    'Miscellaneous Income',
    'Interest on Sinking Fund'
  ];

  const handleCreateTxn = (e) => {
    e.preventDefault();
    if (!newTxn.description.trim() || !newTxn.amount) return;

    addTransaction(newTxn);
    setIsAddModalOpen(false);
    setNewTxn({
      description: '',
      type: 'Expense',
      category: 'Electricity / Utilities',
      amount: '',
      apartment: 'All Apartments',
      date: new Date().toISOString().split('T')[0],
      method: 'Direct Bank Transfer',
      ref: ''
    });
  };

  const totalIncome = filteredTransactions.filter(t => t.type === 'Income').reduce((a, b) => a + b.amount, 0);
  const totalExpense = filteredTransactions.filter(t => t.type === 'Expense').reduce((a, b) => a + b.amount, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Financial Ledger & Disbursements</h1>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setIsAddModalOpen(true)}>
          <PlusCircle size={16} /> Record Transaction
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid-cols-3">
        <div className="glass-card" style={{ borderLeft: '4px solid var(--success)' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600 }}>RECORDED INFLOWS</div>
          <div className="stat-value" style={{ marginTop: '4px', color: 'var(--success)' }}>{formatINR(totalIncome)}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Collections & Hall Rentals</div>
        </div>
        <div className="glass-card" style={{ borderLeft: '4px solid var(--error)' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600 }}>RECORDED OUTFLOWS</div>
          <div className="stat-value" style={{ marginTop: '4px', color: 'var(--error)' }}>{formatINR(totalExpense)}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Vendor & Utilities Disbursements</div>
        </div>
        <div className="glass-card" style={{ borderLeft: '4px solid var(--cyan-blue)' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600 }}>NET CASH INFLOW</div>
          <div className="stat-value" style={{ marginTop: '4px', color: totalIncome >= totalExpense ? 'var(--success)' : 'var(--error)' }}>
            {formatINR(totalIncome - totalExpense)}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Surplus for sinking fund</div>
        </div>
      </div>

      {/* Ledger Table Card */}
      <div className="glass-card">
        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: '280px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search description, reference, category..." 
                className="form-control"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '36px' }}
              />
            </div>

            <select 
              className="form-control"
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              style={{ width: 'auto' }}
            >
              <option value="All">All Types (Income & Expenses)</option>
              <option value="Income">Income Only</option>
              <option value="Expense">Expenses Only</option>
            </select>

            <select 
              className="form-control"
              value={selectedApartment}
              onChange={e => setSelectedApartment(e.target.value)}
              style={{ width: 'auto' }}
            >
              <option value="All">All Complex Accounts</option>
              {apartments.map(a => (
                <option key={a.id} value={a.name}>{a.name}</option>
              ))}
            </select>
          </div>

          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => showToast('Exported complete ledger to CSV/Excel format', 'info')}
          >
            <Download size={14} /> Export CSV
          </button>
        </div>

        {/* Ledger Table */}
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Voucher / Ref</th>
                <th>Transaction Details</th>
                <th>Category</th>
                <th>Apartment Scope</th>
                <th>Date</th>
                <th>Payment Method</th>
                <th>Type</th>
                <th style={{ textAlign: 'right' }}>Amount in INR</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(txn => (
                <tr key={txn.id}>
                  <td style={{ fontWeight: 700, color: 'var(--electric-blue)' }}>
                    <div>{txn.id}</div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{txn.ref}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{txn.description}</div>
                  </td>
                  <td>
                    <span className="badge badge-neutral">{txn.category}</span>
                  </td>
                  <td><ApartmentBadge apartment={txn.apartment} /></td>
                  <td style={{ fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>{txn.date}</td>
                  <td style={{ fontSize: '0.8125rem' }}>{txn.method}</td>
                  <td>
                    <span className={`badge ${txn.type === 'Income' ? 'badge-success' : 'badge-error'}`}>
                      {txn.type === 'Income' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {txn.type}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 800, fontSize: '0.9375rem', color: txn.type === 'Income' ? 'var(--success)' : 'var(--error)' }}>
                    {txn.type === 'Income' ? '+' : '-'}{formatINR(txn.amount)}
                  </td>
                  <td><StatusPill status={txn.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Transaction Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Record Financial Transaction"
        subtitle="Log verified income collection or operational expense"
      >
        <form onSubmit={handleCreateTxn} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label required">Transaction Type</label>
              <select 
                className="form-control"
                value={newTxn.type}
                onChange={e => {
                  const val = e.target.value;
                  setNewTxn({ 
                    ...newTxn, 
                    type: val,
                    category: val === 'Income' ? 'Maintenance Fees' : 'Electricity / Utilities'
                  });
                }}
              >
                <option value="Expense">Disbursement / Expense (−)</option>
                <option value="Income">Revenue / Income (+)</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label required">Category</label>
              <select 
                className="form-control"
                value={newTxn.category}
                onChange={e => setNewTxn({ ...newTxn, category: e.target.value })}
              >
                {(newTxn.type === 'Income' ? categoriesIncome : categoriesExpense).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label required">Description / Payee</label>
            <input 
              type="text" 
              className="form-control"
              placeholder="e.g. Otis quarterly lift maintenance AMC installment #3"
              value={newTxn.description}
              onChange={e => setNewTxn({ ...newTxn, description: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label required">Amount (₹ INR)</label>
              <input 
                type="number" 
                className="form-control"
                placeholder="Amount in Rupees"
                value={newTxn.amount}
                onChange={e => setNewTxn({ ...newTxn, amount: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label required">Date</label>
              <input 
                type="date" 
                className="form-control"
                value={newTxn.date}
                onChange={e => setNewTxn({ ...newTxn, date: e.target.value })}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label required">Apartment Scope</label>
              <select 
                className="form-control"
                value={newTxn.apartment}
                onChange={e => setNewTxn({ ...newTxn, apartment: e.target.value })}
              >
                <option value="All Apartments">All 3 Apartments (Shared Utility)</option>
                {apartments.map(a => (
                  <option key={a.id} value={a.name}>{a.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label required">Payment Method</label>
              <select 
                className="form-control"
                value={newTxn.method}
                onChange={e => setNewTxn({ ...newTxn, method: e.target.value })}
              >
                <option value="RTGS Transfer">RTGS / Bank Transfer</option>
                <option value="NEFT">NEFT Transfer</option>
                <option value="Online Auto-Debit">Online Auto-Debit</option>
                <option value="Cheque">Banker Cheque</option>
                <option value="UPI Gateway">UPI Pay</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Vendor Invoice / Reference Number</label>
            <input 
              type="text" 
              className="form-control"
              placeholder="e.g. INV-OTIS-2026-99"
              value={newTxn.ref}
              onChange={e => setNewTxn({ ...newTxn, ref: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '10px' }}>
              Save & Update Available Balance
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
