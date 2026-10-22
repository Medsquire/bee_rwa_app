import React, { useState } from 'react';
import { useRwa } from '../context/RwaContext';
import { StatusPill, ApartmentBadge, Modal } from '../components/CommonUI';
import { 
  Receipt, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  CreditCard, 
  Download,
  Building2,
  DollarSign
} from 'lucide-react';

export const MaintenanceDues = () => {
  const { 
    maintenanceDues, 
    recordMaintenancePayment, 
    selectedApartment, 
    setSelectedApartment,
    apartments, 
    currentUser, 
    currentRoleKey,
    showToast
  } = useRwa();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [paymentModalDue, setPaymentModalDue] = useState(null);
  const [payAmount, setPayAmount] = useState('');
  const [payMode, setPayMode] = useState('UPI');
  const [receiptData, setReceiptData] = useState(null);

  const formatINR = (val) => '₹ ' + (val || 0).toLocaleString('en-IN');

  const filteredDues = maintenanceDues.filter(due => {
    const matchesApt = selectedApartment === 'All' || due.apartment === selectedApartment;
    const matchesStatus = statusFilter === 'All' || due.status === statusFilter;
    const matchesSearch = 
      due.flat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      due.residentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      due.billingPeriod.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesApt && matchesStatus && matchesSearch;
  });

  const totalDueSum = filteredDues.reduce((a, b) => a + b.amountDue, 0);
  const totalPaidSum = filteredDues.reduce((a, b) => a + b.amountPaid, 0);
  const totalPendingSum = filteredDues.reduce((a, b) => a + b.outstanding, 0);

  const handlePaySubmit = (e) => {
    e.preventDefault();
    if (!paymentModalDue) return;

    const amt = parseFloat(payAmount) || paymentModalDue.outstanding;
    recordMaintenancePayment(paymentModalDue.id, amt, payMode);

    setReceiptData({
      receiptNo: `RCP-${paymentModalDue.flat}-${Math.floor(1000 + Math.random() * 9000)}`,
      flat: paymentModalDue.flat,
      name: paymentModalDue.residentName,
      apartment: paymentModalDue.apartment,
      period: paymentModalDue.billingPeriod,
      amount: amt,
      mode: payMode,
      date: new Date().toISOString().split('T')[0]
    });

    setPaymentModalDue(null);
    setPayAmount('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Maintenance Dues Register</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            October 2026 billing cycle assessment, payment verification, and automated receipt issuance
          </p>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid-cols-4">
        <div className="glass-card">
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600 }}>TOTAL BILLED DUES</div>
          <div className="stat-value" style={{ marginTop: '4px' }}>{formatINR(totalDueSum)}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Across {filteredDues.length} assessed flats</div>
        </div>
        <div className="glass-card">
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600 }}>COLLECTED FEES</div>
          <div className="stat-value" style={{ marginTop: '4px', color: 'var(--success)' }}>{formatINR(totalPaidSum)}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Received via UPI / NetBanking</div>
        </div>
        <div className="glass-card">
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600 }}>OUTSTANDING OVERDUE</div>
          <div className="stat-value" style={{ marginTop: '4px', color: 'var(--error)' }}>{formatINR(totalPendingSum)}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Pending payment collection</div>
        </div>
        <div className="glass-card">
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600 }}>COLLECTION EFFICIENCY</div>
          <div className="stat-value" style={{ marginTop: '4px', color: 'var(--electric-blue)' }}>
            {totalDueSum > 0 ? Math.round((totalPaidSum / totalDueSum) * 100) : 0}%
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Due date: 10th October</div>
        </div>
      </div>

      {/* Filter and Table Card */}
      <div className="glass-card">
        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: '280px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search flat, resident name..." 
                className="form-control"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '36px' }}
              />
            </div>

            <select 
              className="form-control"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              style={{ width: 'auto' }}
            >
              <option value="All">All Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
              <option value="Partial">Partial</option>
            </select>

            <select 
              className="form-control"
              value={selectedApartment}
              onChange={e => setSelectedApartment(e.target.value)}
              style={{ width: 'auto' }}
            >
              <option value="All">All Apartments</option>
              {apartments.map(a => (
                <option key={a.id} value={a.name}>{a.name}</option>
              ))}
            </select>
          </div>

          <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            Showing <strong>{filteredDues.length}</strong> unit(s)
          </span>
        </div>

        {/* Dues Register Table */}
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Flat No</th>
                <th>Resident / Owner</th>
                <th>Apartment</th>
                <th>Billing Period</th>
                <th>Billed Due</th>
                <th>Paid Amount</th>
                <th>Outstanding</th>
                <th>Status</th>
                <th>Payment Mode</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDues.map(due => (
                <tr key={due.id}>
                  <td style={{ fontWeight: 800, color: 'var(--electric-blue)' }}>{due.flat}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{due.residentName}</div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{due.type}</div>
                  </td>
                  <td><ApartmentBadge apartment={due.apartment} /></td>
                  <td style={{ fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>{due.billingPeriod}</td>
                  <td style={{ fontWeight: 600 }}>{formatINR(due.amountDue)}</td>
                  <td style={{ color: 'var(--success)', fontWeight: 600 }}>{formatINR(due.amountPaid)}</td>
                  <td style={{ fontWeight: 800, color: due.outstanding > 0 ? 'var(--error)' : 'var(--text-muted)' }}>
                    {formatINR(due.outstanding)}
                  </td>
                  <td><StatusPill status={due.status} /></td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {due.mode || '—'} {due.paidDate ? `(${due.paidDate})` : ''}
                  </td>
                  <td>
                    {due.outstanding > 0 ? (
                      <button 
                        className="btn btn-primary btn-sm"
                        style={{ padding: '4px 10px' }}
                        onClick={() => {
                          setPaymentModalDue(due);
                          setPayAmount(due.outstanding.toString());
                        }}
                      >
                        <CreditCard size={13} /> Record Pay
                      </button>
                    ) : (
                      <button 
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '4px 8px' }}
                        onClick={() => {
                          setReceiptData({
                            receiptNo: `RCP-${due.flat}-7741`,
                            flat: due.flat,
                            name: due.residentName,
                            apartment: due.apartment,
                            period: due.billingPeriod,
                            amount: due.amountPaid,
                            mode: due.mode || 'UPI Gateway',
                            date: due.paidDate || '2026-10-05'
                          });
                        }}
                      >
                        <Download size={13} /> Receipt
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      <Modal
        isOpen={!!paymentModalDue}
        onClose={() => setPaymentModalDue(null)}
        title="Record Maintenance Fee Payment"
        subtitle={`Flat: ${paymentModalDue?.flat} (${paymentModalDue?.residentName})`}
      >
        {paymentModalDue && (
          <form onSubmit={handlePaySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ backgroundColor: 'var(--bg-hover)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Billing Cycle:</span>
                <strong>{paymentModalDue.billingPeriod}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Total Assessed:</span>
                <strong>{formatINR(paymentModalDue.amountDue)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Outstanding Balance:</span>
                <strong style={{ color: 'var(--error)', fontSize: '1rem' }}>{formatINR(paymentModalDue.outstanding)}</strong>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label required">Payment Amount (₹)</label>
              <input 
                type="number" 
                className="form-control"
                value={payAmount}
                max={paymentModalDue.outstanding}
                onChange={e => setPayAmount(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label required">Payment Mode</label>
              <select 
                className="form-control"
                value={payMode}
                onChange={e => setPayMode(e.target.value)}
              >
                <option value="UPI">UPI (Google Pay / PhonePe / Paytm)</option>
                <option value="NetBanking">NetBanking / IMPS</option>
                <option value="NEFT">NEFT / RTGS Wire</option>
                <option value="Cheque">Banker Cheque</option>
                <option value="Cash Deposit">RWA Office Cash Receipt</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn btn-success" style={{ flex: 1, padding: '10px' }}>
                Verify & Issue Receipt
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setPaymentModalDue(null)}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Official Receipt Modal */}
      <Modal
        isOpen={!!receiptData}
        onClose={() => setReceiptData(null)}
        title="Official RWA Maintenance Receipt"
        subtitle={`Receipt #${receiptData?.receiptNo}`}
      >
        {receiptData && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{
              border: '2px solid var(--electric-blue)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              backgroundColor: 'var(--bg-elevated)',
              position: 'relative'
            }}>
              <div style={{ textAlign: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '14px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>BEE PROPERTY RWA</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Golden Apartment Residential Association (Reg No: RWA/BLR/2022/9912)
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.8125rem', marginBottom: '16px' }}>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Receipt No:</span>
                  <div style={{ fontWeight: 700 }}>{receiptData.receiptNo}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Payment Date:</span>
                  <div style={{ fontWeight: 700 }}>{receiptData.date}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Resident:</span>
                  <div style={{ fontWeight: 700 }}>{receiptData.name}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Flat / Complex:</span>
                  <div style={{ fontWeight: 700 }}>{receiptData.flat} ({receiptData.apartment})</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Billing Cycle:</span>
                  <div style={{ fontWeight: 700 }}>{receiptData.period}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Payment Instrument:</span>
                  <div style={{ fontWeight: 700 }}>{receiptData.mode}</div>
                </div>
              </div>

              <div style={{
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                padding: '14px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>Amount Received:</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--success)' }}>
                  {formatINR(receiptData.amount)}
                </span>
              </div>

              <div style={{ textAlign: 'right', marginTop: '20px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Authorized Treasurer Signature: Rajeshwar Rao (Finance Manager)
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={() => {
                  showToast('Receipt downloaded as PDF', 'success');
                  setReceiptData(null);
                }}
              >
                <Download size={16} /> Download Digital Receipt
              </button>
              <button className="btn btn-secondary" onClick={() => setReceiptData(null)}>
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
