import React, { useState, useMemo } from 'react';
import { useRwa } from '../context/RwaContext';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Building2, 
  Phone, 
  Mail, 
  Layers, 
  Droplets, 
  Zap, 
  Sparkles, 
  Dumbbell, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Wrench, 
  ExternalLink,
  ChevronRight,
  UserCheck,
  Calendar,
  DollarSign,
  PlusCircle,
  X,
  FileText
} from 'lucide-react';

export const AgencyManagement = () => {
  const { agencies, setAgencies, assignAgencyTowers, updateAgencyStatus, apartments, complaints, setActiveTab, showToast } = useRwa();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [complexFilter, setComplexFilter] = useState('All');
  const [selectedAgencyForModal, setSelectedAgencyForModal] = useState(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  // Modal editing state for tower assignment
  const [editingAgency, setEditingAgency] = useState(null);
  const [selectedTowersByComplex, setSelectedTowersByComplex] = useState({});

  // Categories list
  const categories = [
    { id: 'All', label: 'All Categories', icon: Wrench },
    { id: 'Lifts & Elevators', label: 'Lifts & Elevators', icon: Layers, color: '#2563EB' },
    { id: 'Water Supply & STP', label: 'Water & STP', icon: Droplets, color: '#06B6D4' },
    { id: 'Electricity & DG Backup', label: 'Power & DG Backup', icon: Zap, color: '#F59E0B' },
    { id: 'Cleanliness & Waste', label: 'Housekeeping & Waste', icon: Sparkles, color: '#10B981' },
    { id: 'Security & Access', label: 'Security & Access', icon: ShieldCheck, color: '#8B5CF6' },
    { id: 'Gym Equipment', label: 'Gym & Sports Care', icon: Dumbbell, color: '#EC4899' }
  ];

  // Helper to get category icon
  const getCategoryIcon = (category, size = 18) => {
    const cat = (category || '').toLowerCase();
    if (cat.includes('lift') || cat.includes('elevator')) return <Layers size={size} color="#2563EB" />;
    if (cat.includes('water') || cat.includes('stp') || cat.includes('plumb')) return <Droplets size={size} color="#06B6D4" />;
    if (cat.includes('elect') || cat.includes('dg') || cat.includes('power')) return <Zap size={size} color="#F59E0B" />;
    if (cat.includes('clean') || cat.includes('housekeep') || cat.includes('waste')) return <Sparkles size={size} color="#10B981" />;
    if (cat.includes('secur') || cat.includes('gate') || cat.includes('access')) return <ShieldCheck size={size} color="#8B5CF6" />;
    if (cat.includes('gym') || cat.includes('fit') || cat.includes('sport')) return <Dumbbell size={size} color="#EC4899" />;
    return <Wrench size={size} color="#64748B" />;
  };

  // Filter agencies
  const filteredAgencies = useMemo(() => {
    return agencies.filter(agy => {
      const matchesSearch = 
        agy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agy.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agy.leadEngineer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agy.contractId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agy.phone.includes(searchTerm);

      const matchesCategory = categoryFilter === 'All' || agy.category === categoryFilter;

      const matchesComplex = complexFilter === 'All' || 
        agy.assignedComplexes.some(c => c.complex === complexFilter || (c.towers && c.towers.includes(complexFilter)));

      return matchesSearch && matchesCategory && matchesComplex;
    });
  }, [agencies, searchTerm, categoryFilter, complexFilter]);

  // Overall metrics
  const totalAgencies = agencies.length;
  const activeAgencies = agencies.filter(a => a.status === 'Active').length;
  const totalMonthlySpend = agencies.reduce((sum, a) => sum + (a.monthlyPayout || 0), 0);
  const totalAssignedTickets = agencies.reduce((sum, a) => sum + (a.openTicketsCount || 0), 0);

  // Open Assignment Modal
  const handleOpenAssignModal = (agency) => {
    setEditingAgency(agency);
    
    // Initialize towers dictionary: { 'Golden Apartment': ['Golden Tower 1', ...], ... }
    const towersMap = {};
    agency.assignedComplexes.forEach(c => {
      towersMap[c.complex] = [...c.towers];
    });
    setSelectedTowersByComplex(towersMap);
    setIsAssignModalOpen(true);
  };

  // Toggle tower assignment
  const handleToggleTower = (complexName, towerName) => {
    setSelectedTowersByComplex(prev => {
      const currentList = prev[complexName] || [];
      const exists = currentList.includes(towerName);
      const updated = exists 
        ? currentList.filter(t => t !== towerName)
        : [...currentList, towerName];

      return {
        ...prev,
        [complexName]: updated
      };
    });
  };

  // Save Assignment
  const handleSaveAssignments = () => {
    if (!editingAgency) return;

    // Apply assignments for each complex
    Object.keys(selectedTowersByComplex).forEach(complexName => {
      assignAgencyTowers(editingAgency.id, complexName, selectedTowersByComplex[complexName] || []);
    });

    setIsAssignModalOpen(false);
    setEditingAgency(null);
    showToast(`Assignments updated for ${editingAgency.name}.`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* 1. Header Title & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Agency & Assigned Contractors
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '4px' }}>
            AMC vendor contracts, tower assignments, lead engineer dispatch, and SLA monitoring
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => showToast('New AMC contractor onboarding form initiated.', 'info')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <PlusCircle size={16} />
            <span>Add New Agency</span>
          </button>
        </div>
      </div>

      {/* 2. Top Classified Metrics Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '14px'
      }}>
        {/* Card 1: Active Agencies */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          padding: '16px 18px',
          border: '1px solid #E2E8F0',
          borderLeft: '4px solid #2563EB',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#0F172A', letterSpacing: '0.04em' }}>
              ACTIVE AGENCIES
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
              <ShieldCheck size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 900, color: '#0F172A', lineHeight: 1.1 }}>
            {activeAgencies} / {totalAgencies}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#16A34A', marginTop: '6px', fontWeight: 600 }}>
            ● 100% Active AMC Coverage
          </div>
        </div>

        {/* Card 2: Golden Apartment Coverage */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          padding: '16px 18px',
          border: '1px solid #E2E8F0',
          borderLeft: '4px solid #F59E0B',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#0F172A', letterSpacing: '0.04em' }}>
              GOLDEN APARTMENT (3 TOWERS)
            </span>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'rgba(245, 158, 11, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F59E0B'
            }}>
              <Building2 size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 900, color: '#0F172A', lineHeight: 1.1 }}>
            6 Agencies
          </div>
          <div style={{ fontSize: '0.75rem', color: '#D97706', marginTop: '6px', fontWeight: 600 }}>
            Towers GT-1, GT-2, GT-3 Assigned
          </div>
        </div>

        {/* Card 3: Active Work Orders Handled */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          padding: '16px 18px',
          border: '1px solid #E2E8F0',
          borderLeft: '4px solid #EC4899',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#0F172A', letterSpacing: '0.04em' }}>
              ASSIGNED WORK ORDERS
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
              <Wrench size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 900, color: '#0F172A', lineHeight: 1.1 }}>
            0{totalAssignedTickets} Tickets
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '6px', fontWeight: 600 }}>
            Under specialist vendor resolution
          </div>
        </div>

        {/* Card 4: Monthly AMC Pool */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          padding: '16px 18px',
          border: '1px solid #E2E8F0',
          borderLeft: '4px solid #10B981',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#0F172A', letterSpacing: '0.04em' }}>
              MONTHLY AMC DISBURSEMENT
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
              <DollarSign size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 900, color: '#0F172A', lineHeight: 1.1 }}>
            ₹ {(totalMonthlySpend / 1000).toFixed(0)}k
          </div>
          <div style={{ fontSize: '0.75rem', color: '#16A34A', marginTop: '6px', fontWeight: 600 }}>
            ₹ {totalMonthlySpend.toLocaleString('en-IN')} / month
          </div>
        </div>
      </div>

      {/* 3. Category Filter Bar (Matching classified low-text styling) */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        padding: '16px 20px',
        border: '1px solid #E2E8F0',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
      }}>
        {/* Complex Filter Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', marginRight: '4px' }}>
              GOLDEN APARTMENT TOWER:
            </span>
            {['All Towers', 'Golden Tower 1', 'Golden Tower 2', 'Golden Tower 3'].map(tName => {
              const isSelected = (complexFilter === 'All' && tName === 'All Towers') || complexFilter === tName;
              return (
                <button
                  key={tName}
                  onClick={() => setComplexFilter(tName === 'All Towers' ? 'All' : tName)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    border: isSelected ? '2px solid #2563EB' : '1px solid #E2E8F0',
                    backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                    color: isSelected ? '#2563EB' : '#475569',
                    fontWeight: isSelected ? 800 : 600,
                    fontSize: '0.8125rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Building2 size={14} />
                  <span>{tName}</span>
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div style={{ position: 'relative', width: '260px' }}>
            <Search size={14} style={{ position: 'absolute', left: '12px', top: '10px', color: '#94A3B8' }} />
            <input 
              type="text" 
              placeholder="Search agency, engineer, phone..." 
              className="form-control"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                paddingLeft: '34px',
                height: '34px',
                fontSize: '0.8125rem',
                borderRadius: '8px',
                borderColor: '#CBD5E1',
                backgroundColor: '#F8FAFC'
              }}
            />
          </div>
        </div>

        {/* Category Pills */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto',
          paddingTop: '10px',
          borderTop: '1px solid #E2E8F0'
        }}>
          {categories.map(cat => {
            const isSelected = categoryFilter === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 12px',
                  borderRadius: '8px',
                  border: isSelected ? '1px solid #2563EB' : '1px solid #E2E8F0',
                  backgroundColor: isSelected ? '#2563EB' : '#F8FAFC',
                  color: isSelected ? '#FFFFFF' : '#334155',
                  fontSize: '0.75rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={14} style={{ color: isSelected ? '#FFFFFF' : (cat.color || '#64748B') }} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Assigned Agencies Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: '16px'
      }}>
        {filteredAgencies.map(agency => (
          <div
            key={agency.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
              position: 'relative'
            }}
          >
            {/* Top row: Agency Category Icon, Name, and Status */}
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    backgroundColor: '#F1F5F9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {getCategoryIcon(agency.category, 22)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                      {agency.name}
                    </h3>
                    <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px', fontWeight: 600 }}>
                      {agency.serviceType}
                    </div>
                  </div>
                </div>

                <span style={{
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  backgroundColor: agency.status === 'Active' ? '#F0FDF4' : '#FEF2F2',
                  color: agency.status === 'Active' ? '#16A34A' : '#DC2626',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  whiteSpace: 'nowrap'
                }}>
                  ● {agency.status} AMC
                </span>
              </div>

              {/* SLA & Contract Specs */}
              <div style={{
                marginTop: '14px',
                padding: '10px 12px',
                backgroundColor: '#F8FAFC',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                fontSize: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B', fontWeight: 600 }}>Contract Ref:</span>
                  <strong style={{ color: '#0F172A' }}>{agency.contractId}</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B', fontWeight: 600 }}>SLA Commitment:</span>
                  <span style={{ color: '#2563EB', fontWeight: 700 }}>{agency.sla}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B', fontWeight: 600 }}>Monthly Retainer:</span>
                  <strong style={{ color: '#0F172A' }}>₹ {agency.monthlyPayout.toLocaleString('en-IN')} / mo</strong>
                </div>
              </div>

              {/* ASSIGNED PROPERTIES & TOWERS BREAKDOWN */}
              <div style={{ marginTop: '14px' }}>
                <div style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#64748B', letterSpacing: '0.04em', marginBottom: '8px' }}>
                  ASSIGNED TOWERS & SCOPE:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {agency.assignedComplexes.map((comp, idx) => (
                    <div 
                      key={idx}
                      style={{
                        padding: '8px 10px',
                        borderRadius: '8px',
                        backgroundColor: comp.complex === 'Golden Apartment' ? '#FFFBEB' : '#F1F5F9',
                        border: `1px solid ${comp.complex === 'Golden Apartment' ? '#FDE68A' : '#E2E8F0'}`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Building2 size={13} style={{ color: comp.complex === 'Golden Apartment' ? '#D97706' : '#64748B' }} />
                          <strong style={{ fontSize: '0.8125rem', color: comp.complex === 'Golden Apartment' ? '#92400E' : '#1E293B' }}>
                            {comp.complex}
                          </strong>
                        </div>
                        <span style={{ fontSize: '0.6875rem', color: '#64748B', fontWeight: 600 }}>
                          {comp.towers.length} Towers Assigned
                        </span>
                      </div>

                      {/* Towers list */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '2px' }}>
                        {comp.towers.map(tow => (
                          <span
                            key={tow}
                            style={{
                              fontSize: '0.6875rem',
                              fontWeight: 700,
                              backgroundColor: comp.complex === 'Golden Apartment' ? '#FEF3C7' : '#FFFFFF',
                              color: comp.complex === 'Golden Apartment' ? '#B45309' : '#334155',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              border: '1px solid rgba(0, 0, 0, 0.05)'
                            }}
                          >
                            ✓ {tow}
                          </span>
                        ))}
                      </div>

                      {comp.unitsAssigned && (
                        <div style={{ fontSize: '0.6875rem', color: '#64748B', marginTop: '2px' }}>
                          Scope: {comp.unitsAssigned}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Lead Field Engineer Contact */}
              <div style={{
                marginTop: '14px',
                paddingTop: '12px',
                borderTop: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px'
              }}>
                <div>
                  <div style={{ fontSize: '0.6875rem', color: '#64748B', fontWeight: 600 }}>Assigned Lead Engineer</div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <UserCheck size={13} color="#2563EB" />
                    <span>{agency.leadEngineer}</span>
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>
                    {agency.leadTitle}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <a
                    href={`tel:${agency.phone}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 8px',
                      backgroundColor: '#EFF6FF',
                      color: '#2563EB',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textDecoration: 'none'
                    }}
                  >
                    <Phone size={11} /> {agency.phone}
                  </a>
                  <div style={{ fontSize: '0.6875rem', color: '#94A3B8', marginTop: '2px' }}>
                    SOS: {agency.emergencyHotline}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              paddingTop: '12px',
              borderTop: '1px solid #E2E8F0'
            }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => handleOpenAssignModal(agency)}
                style={{ flex: 1, justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}
              >
                <Building2 size={13} />
                <span>Assign Towers</span>
              </button>

              <button
                className="btn btn-primary btn-sm"
                onClick={() => setSelectedAgencyForModal(agency)}
                style={{ flex: 1, justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}
              >
                <FileText size={13} />
                <span>View SLA & Tickets</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Tower Re-Assignment Modal */}
      {isAssignModalOpen && editingAgency && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.55)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '14px',
            maxWidth: '560px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '24px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #E2E8F0' }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Assign Towers to Agency
                </h3>
                <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
                  {editingAgency.name} • {editingAgency.category}
                </div>
              </div>
              <button 
                onClick={() => setIsAssignModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Complex & Towers Selection Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Golden Apartment (3 Towers) */}
              <div style={{
                padding: '14px',
                borderRadius: '10px',
                backgroundColor: '#FFFBEB',
                border: '1px solid #FDE68A'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Building2 size={16} color="#B45309" />
                    <strong style={{ fontSize: '0.875rem', color: '#92400E' }}>
                      Golden Apartment (President: Sujana)
                    </strong>
                  </div>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, backgroundColor: '#FEF3C7', color: '#B45309', padding: '2px 8px', borderRadius: '10px' }}>
                    3 Towers
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {['Golden Tower 1', 'Golden Tower 2', 'Golden Tower 3'].map(towerName => {
                    const isChecked = (selectedTowersByComplex['Golden Apartment'] || []).includes(towerName);
                    return (
                      <label 
                        key={towerName}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          fontSize: '0.8125rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          backgroundColor: '#FFFFFF',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          border: isChecked ? '1px solid #F59E0B' : '1px solid #E2E8F0'
                        }}
                      >
                        <input 
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleTower('Golden Apartment', towerName)}
                          style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                        />
                        <span>{towerName}</span>
                        {towerName === 'Golden Tower 1' && (
                          <span style={{ fontSize: '0.6875rem', color: '#B45309', backgroundColor: '#FEF3C7', padding: '1px 6px', borderRadius: '4px' }}>
                            👑 Sujana Penthouse GT1-801
                          </span>
                        )}
                        {towerName === 'Golden Tower 2' && (
                          <span style={{ fontSize: '0.6875rem', color: '#1D4ED8', backgroundColor: '#EFF6FF', padding: '1px 6px', borderRadius: '4px' }}>
                            🛡️ VP Kavaya GT2-604
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Modal Buttons */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px', paddingTop: '14px', borderTop: '1px solid #E2E8F0' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => setIsAssignModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleSaveAssignments}
              >
                Save Tower Assignments
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Agency Dossier & SLA Modal */}
      {selectedAgencyForModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.55)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '14px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '24px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {getCategoryIcon(selectedAgencyForModal.category, 20)}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    {selectedAgencyForModal.name}
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
                    {selectedAgencyForModal.contractId} • {selectedAgencyForModal.category}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setSelectedAgencyForModal(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Dossier Body */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                padding: '12px',
                backgroundColor: '#F8FAFC',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                fontSize: '0.8125rem'
              }}>
                <div>
                  <span style={{ color: '#64748B', fontSize: '0.75rem' }}>Contract Term:</span>
                  <div style={{ fontWeight: 700, color: '#0F172A' }}>{selectedAgencyForModal.contractPeriod}</div>
                </div>
                <div>
                  <span style={{ color: '#64748B', fontSize: '0.75rem' }}>Monthly AMC:</span>
                  <div style={{ fontWeight: 700, color: '#16A34A' }}>₹ {selectedAgencyForModal.monthlyPayout.toLocaleString('en-IN')} / mo</div>
                </div>
                <div>
                  <span style={{ color: '#64748B', fontSize: '0.75rem' }}>Next Inspection:</span>
                  <div style={{ fontWeight: 700, color: '#0F172A' }}>{selectedAgencyForModal.nextScheduledService}</div>
                </div>
                <div>
                  <span style={{ color: '#64748B', fontSize: '0.75rem' }}>Service SLA:</span>
                  <div style={{ fontWeight: 700, color: '#2563EB' }}>{selectedAgencyForModal.sla}</div>
                </div>
              </div>

              {/* Assigned complaints */}
              <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                  Currently Assigned Maintenance Issues ({selectedAgencyForModal.activeTicketIds.length})
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {selectedAgencyForModal.activeTicketIds.map(tId => {
                    const ticket = complaints.find(c => c.id === tId);
                    return (
                      <div
                        key={tId}
                        style={{
                          padding: '10px 12px',
                          borderRadius: '8px',
                          backgroundColor: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '10px'
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '0.8125rem', color: '#0F172A' }}>
                            {tId}: {ticket?.title || 'Active Maintenance Ticket'}
                          </div>
                          <div style={{ fontSize: '0.6875rem', color: '#64748B', marginTop: '2px' }}>
                            Location: {ticket?.location || 'Golden Apartment'} • Priority: {ticket?.priority || 'High'}
                          </div>
                        </div>

                        <button
                          className="btn btn-secondary btn-xs"
                          onClick={() => {
                            setSelectedAgencyForModal(null);
                            setActiveTab('complaints');
                          }}
                        >
                          View Ticket →
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', paddingTop: '12px', borderTop: '1px solid #E2E8F0' }}>
              <button 
                className="btn btn-secondary"
                onClick={() => setSelectedAgencyForModal(null)}
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
