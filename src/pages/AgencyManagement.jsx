import React, { useState, useMemo } from 'react';
import { useRwa } from '../context/RwaContext';
import { 
  ShieldCheck, 
  Search, 
  Building2, 
  Phone, 
  Layers, 
  Droplets, 
  Sparkles, 
  AlertTriangle, 
  Wrench, 
  UserCheck, 
  Users,
  PlusCircle, 
  X,
  CheckCircle2,
  RefreshCw,
  Power
} from 'lucide-react';

export const AgencyManagement = () => {
  const { agencies, setAgencies, updateAgencyStatus, setActiveTab, showToast, theme } = useRwa();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Active' | 'Inactive'
  const [selectedAgencyForServices, setSelectedAgencyForServices] = useState(null);

  // Categories list tailored to the contracted agencies (Single words)
  const categories = [
    { id: 'All', label: 'All', icon: Wrench },
    { id: 'Cleaning & Gardening', label: 'Cleaning', icon: Sparkles, color: '#10B981' },
    { id: 'Plumbing & Water Systems', label: 'Plumbing', icon: Droplets, color: '#06B6D4' },
    { id: 'Security & Access Control', label: 'Security', icon: ShieldCheck, color: '#8B5CF6' },
    { id: 'Lift & Elevator Maintenance', label: 'Lifts', icon: Building2, color: '#F59E0B' }
  ];

  // Counts for top cards
  const totalAgenciesCount = agencies.length;
  const activeAgenciesCount = agencies.filter(a => a.status === 'Active').length;
  const inactiveAgenciesCount = agencies.filter(a => a.status !== 'Active').length;
  const totalServiceCount = agencies.reduce((sum, a) => sum + (a.services ? a.services.length : 0), 0);
  const totalEmployeeCount = agencies.reduce((sum, a) => sum + (a.employeeCount || 0), 0);

  // Filter agencies by search, category, and active/inactive status
  const filteredAgencies = useMemo(() => {
    return agencies.filter(agy => {
      const matchesSearch = 
        agy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (agy.shortName && agy.shortName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (agy.leadEngineer && agy.leadEngineer.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (agy.category && agy.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (agy.phone && agy.phone.includes(searchTerm));

      const matchesCategory = categoryFilter === 'All' || agy.category === categoryFilter;
      const matchesStatus = 
        statusFilter === 'All' ? true :
        statusFilter === 'Active' ? agy.status === 'Active' :
        agy.status !== 'Active';

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [agencies, searchTerm, categoryFilter, statusFilter]);

  // Helper for category icon
  const getCategoryIcon = (category, size = 15) => {
    const cat = (category || '').toLowerCase();
    if (cat.includes('clean') || cat.includes('garden')) return <Sparkles size={size} color="#10B981" strokeWidth={1.5} />;
    if (cat.includes('plumb') || cat.includes('water')) return <Droplets size={size} color="#06B6D4" strokeWidth={1.5} />;
    if (cat.includes('secur') || cat.includes('guard')) return <ShieldCheck size={size} color="#8B5CF6" strokeWidth={1.5} />;
    if (cat.includes('lift') || cat.includes('elevator')) return <Building2 size={size} color="#F59E0B" strokeWidth={1.5} />;
    return <Wrench size={size} color="#64748B" strokeWidth={1.5} />;
  };

  // Quick toggle status helper
  const handleToggleAgencyStatus = (agencyId, currentStatus, agencyName) => {
    const nextStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    updateAgencyStatus(agencyId, nextStatus);
    showToast(`${agencyName || 'Agency'} marked as ${nextStatus}.`, 'info');
    if (selectedAgencyForServices && selectedAgencyForServices.id === agencyId) {
      setSelectedAgencyForServices(prev => prev ? { ...prev, status: nextStatus } : null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* 1. Header Title & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Agencies
            </h1>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => showToast('Demo agency management is configured for active & contracted facilities.', 'info')}
            style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 12px', fontSize: '0.78rem', fontWeight: 700 }}
          >
            <PlusCircle size={15} strokeWidth={1.5} />
            <span>Add New Agency</span>
          </button>
        </div>
      </div>

      {/* 2. TOP METRIC CARDS: Agency Count, Active Agencies, Inactive Agencies, Service Count, Employee Count (Compact layout matching Dashboard) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '10px'
      }}>
        {/* Card 1: Agency Count */}
        <div 
          onClick={() => {
            setStatusFilter('All');
            setCategoryFilter('All');
          }}
          title="Click to view all agencies"
          style={{
            backgroundColor: 'var(--card-bg, #FFFFFF)',
            borderRadius: '8px',
            padding: '10px 12px',
            border: '1px solid var(--border-color)',
            borderLeft: '3px solid #6366F1',
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
            <div style={{ fontSize: '0.675rem', fontWeight: 700, color: 'var(--text-secondary)' }}>AGENCY COUNT</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px', lineHeight: 1.1 }}>
              {totalAgenciesCount}
            </div>
            <div style={{ fontSize: '0.675rem', color: '#6366F1', fontWeight: 600 }}>
              Total contracted
            </div>
          </div>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            backgroundColor: theme === 'dark' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6366F1',
            flexShrink: 0
          }}>
            <Building2 size={16} strokeWidth={1.5} />
          </div>
        </div>

        {/* Card 2: Active Agencies */}
        <div 
          onClick={() => setStatusFilter(prev => prev === 'Active' ? 'All' : 'Active')}
          title="Click to filter by Active agencies"
          style={{
            backgroundColor: 'var(--card-bg, #FFFFFF)',
            borderRadius: '8px',
            padding: '10px 12px',
            border: '1px solid var(--border-color)',
            borderLeft: '3px solid #16A34A',
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
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px', lineHeight: 1.1 }}>
              {activeAgenciesCount}
            </div>
            <div style={{ fontSize: '0.675rem', color: '#16A34A', fontWeight: 600 }}>
              {activeAgenciesCount} operational
            </div>
          </div>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            backgroundColor: theme === 'dark' ? 'rgba(22, 163, 74, 0.2)' : 'rgba(22, 163, 74, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#16A34A',
            flexShrink: 0
          }}>
            <ShieldCheck size={16} strokeWidth={1.5} />
          </div>
        </div>

        {/* Card 3: Inactive Agencies */}
        <div 
          onClick={() => setStatusFilter(prev => prev === 'Inactive' ? 'All' : 'Inactive')}
          title="Click to filter by Inactive agencies"
          style={{
            backgroundColor: 'var(--card-bg, #FFFFFF)',
            borderRadius: '8px',
            padding: '10px 12px',
            border: '1px solid var(--border-color)',
            borderLeft: '3px solid #EF4444',
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
            <div style={{ fontSize: '0.675rem', fontWeight: 700, color: 'var(--text-secondary)' }}>INACTIVE AGENCIES</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px', lineHeight: 1.1 }}>
              {inactiveAgenciesCount}
            </div>
            <div style={{ fontSize: '0.675rem', color: '#EF4444', fontWeight: 600 }}>
              {inactiveAgenciesCount} paused / expired
            </div>
          </div>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            backgroundColor: theme === 'dark' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#EF4444',
            flexShrink: 0
          }}>
            <AlertTriangle size={16} strokeWidth={1.5} />
          </div>
        </div>

        {/* Card 4: Service Count */}
        <div 
          onClick={() => {
            setStatusFilter('All');
            setCategoryFilter('All');
          }}
          title="Click to show all services"
          style={{
            backgroundColor: 'var(--card-bg, #FFFFFF)',
            borderRadius: '8px',
            padding: '10px 12px',
            border: '1px solid var(--border-color)',
            borderLeft: '3px solid #0D9488',
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
            <div style={{ fontSize: '0.675rem', fontWeight: 700, color: 'var(--text-secondary)' }}>SERVICE COUNT</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px', lineHeight: 1.1 }}>
              {totalServiceCount}
            </div>
            <div style={{ fontSize: '0.675rem', color: '#0D9488', fontWeight: 600 }}>
              Active offerings
            </div>
          </div>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            backgroundColor: theme === 'dark' ? 'rgba(13, 148, 136, 0.2)' : 'rgba(13, 148, 136, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0D9488',
            flexShrink: 0
          }}>
            <Wrench size={16} strokeWidth={1.5} />
          </div>
        </div>

        {/* Card 5: Employee Count */}
        <div style={{
          backgroundColor: 'var(--card-bg, #FFFFFF)',
          borderRadius: '8px',
          padding: '10px 12px',
          border: '1px solid var(--border-color)',
          borderLeft: '3px solid #2563EB',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          transition: 'transform 0.12s ease, box-shadow 0.12s ease'
        }}>
          <div>
            <div style={{ fontSize: '0.675rem', fontWeight: 700, color: 'var(--text-secondary)' }}>EMPLOYEE COUNT</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px', lineHeight: 1.1 }}>
              {totalEmployeeCount}
            </div>
            <div style={{ fontSize: '0.675rem', color: '#2563EB', fontWeight: 600 }}>
              Deployed staff
            </div>
          </div>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            backgroundColor: theme === 'dark' ? 'rgba(37, 99, 235, 0.2)' : 'rgba(37, 99, 235, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#2563EB',
            flexShrink: 0
          }}>
            <Users size={16} strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* 3. Filter Bar with Status & Categories (Reduced Size) */}
      <div style={{
        backgroundColor: 'var(--card-bg)',
        borderRadius: '10px',
        padding: '10px 14px',
        border: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Status & Category Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          {/* Status Quick Filters */}
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--bg-hover)', borderRadius: '7px', padding: '2px', marginRight: '4px' }}>
            <button
              onClick={() => setStatusFilter('All')}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: statusFilter === 'All' ? 'var(--card-bg)' : 'transparent',
                color: statusFilter === 'All' ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontSize: '0.75rem',
                fontWeight: statusFilter === 'All' ? 700 : 500,
                cursor: 'pointer',
                boxShadow: statusFilter === 'All' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              All ({agencies.length})
            </button>
            <button
              onClick={() => setStatusFilter('Active')}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: statusFilter === 'Active' ? '#16A34A' : 'transparent',
                color: statusFilter === 'Active' ? '#FFFFFF' : '#22C55E',
                fontSize: '0.75rem',
                fontWeight: statusFilter === 'Active' ? 700 : 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: statusFilter === 'Active' ? '0 1px 3px rgba(22,163,74,0.3)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: statusFilter === 'Active' ? '#FFFFFF' : '#22C55E' }} />
              Active ({activeAgenciesCount})
            </button>
            <button
              onClick={() => setStatusFilter('Inactive')}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: statusFilter === 'Inactive' ? '#EF4444' : 'transparent',
                color: statusFilter === 'Inactive' ? '#FFFFFF' : '#EF4444',
                fontSize: '0.75rem',
                fontWeight: statusFilter === 'Inactive' ? 700 : 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: statusFilter === 'Inactive' ? '0 1px 3px rgba(239,68,68,0.3)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: statusFilter === 'Inactive' ? '#FFFFFF' : '#EF4444' }} />
              Inactive ({inactiveAgenciesCount})
            </button>
          </div>

          {/* Divider */}
          <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border-color)', margin: '0 4px' }} />

          {/* Categories */}
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
                  gap: '5px',
                  padding: '5px 10px',
                  borderRadius: '7px',
                  border: isSelected ? '1px solid #2563EB' : '1px solid var(--border-color)',
                  backgroundColor: isSelected ? '#2563EB' : 'var(--card-bg)',
                  color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                  fontSize: '0.75rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={13} strokeWidth={1.5} style={{ color: isSelected ? '#FFFFFF' : (cat.color || 'var(--text-secondary)') }} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', width: '220px' }}>
          <Search size={13} strokeWidth={1.5} style={{ position: 'absolute', left: '10px', top: '9px', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search agency..." 
            className="form-control"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              paddingLeft: '30px',
              height: '31px',
              fontSize: '0.78rem',
              borderRadius: '7px',
              borderColor: 'var(--border-color)',
              backgroundColor: 'var(--card-bg)',
              color: 'var(--text-primary)'
            }}
          />
        </div>
      </div>

      {/* 4. Fixed-Dimension Agency Cards Container */}
      <div 
        className="agency-cards-container"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: '100%'
        }}
      >
        {filteredAgencies.length === 0 ? (
          <div style={{
            width: '100%',
            padding: '36px 20px',
            textAlign: 'center',
            backgroundColor: 'var(--card-bg, #FFFFFF)',
            borderRadius: '12px',
            border: '1px solid var(--border-color, #E2E8F0)',
            color: 'var(--text-secondary)'
          }}>
            <p style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem' }}>No agencies found matching your filters.</p>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('All');
                setStatusFilter('All');
              }}
              style={{ marginTop: '12px', fontSize: '0.78rem' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredAgencies.map(agency => {
            const isActive = agency.status === 'Active';
            return (
              <div
                key={agency.id}
                className="agency-card-item"
                style={{
                  width: '365px',
                  minWidth: '365px',
                  maxWidth: '365px',
                  height: '306px',
                  flex: '0 0 365px',
                  flexShrink: 0,
                  flexGrow: 0,
                  boxSizing: 'border-box',
                  backgroundColor: 'var(--card-bg)',
                  borderRadius: '12px',
                  border: isActive ? '1px solid var(--border-color)' : '1px solid rgba(239, 68, 68, 0.4)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'box-shadow 0.2s ease, transform 0.15s ease',
                  position: 'relative'
                }}
              >
                {/* Top Section: Fixed Image Banner + Content */}
                <div>
                  {/* Agency Image Banner (Fixed height: 146px) */}
                  <div style={{ position: 'relative', width: '100%', height: '146px', backgroundColor: 'var(--bg-hover)', overflow: 'hidden' }}>
                    <img 
                      src={agency.image} 
                      alt={agency.name}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        display: 'block',
                        filter: isActive ? 'none' : 'grayscale(35%)'
                      }}
                      loading="lazy"
                    />

                    {/* Active / Inactive Dynamic Badge on Top-Right */}
                    <div 
                      onClick={() => handleToggleAgencyStatus(agency.id, agency.status, agency.name)}
                      title={`Click to mark as ${isActive ? 'Inactive' : 'Active'}`}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: 'var(--card-bg)',
                        backdropFilter: 'blur(4px)',
                        padding: '4px 10px',
                        borderRadius: '16px',
                        fontSize: '0.72rem',
                        fontWeight: 750,
                        color: isActive ? '#22C55E' : '#EF4444',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                        cursor: 'pointer',
                        border: isActive ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                        userSelect: 'none'
                      }}
                    >
                      <span style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        backgroundColor: isActive ? '#22C55E' : '#EF4444',
                        boxShadow: isActive ? '0 0 0 2px rgba(34, 197, 94, 0.3)' : '0 0 0 2px rgba(239, 68, 68, 0.3)',
                        display: 'inline-block'
                      }} />
                      <span>{isActive ? 'Active' : 'Inactive'}</span>
                    </div>

                    {/* Category badge on bottom-left of image */}
                    <div style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '10px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      backgroundColor: 'rgba(15, 23, 42, 0.85)',
                      backdropFilter: 'blur(4px)',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '0.66rem',
                      fontWeight: 700,
                      color: '#FFFFFF'
                    }}>
                      {getCategoryIcon(agency.category, 13)}
                      <span>{agency.category}</span>
                    </div>
                  </div>

                  {/* Title & Essential Information (Ellipsis for long titles) */}
                  <div style={{ padding: '12px 14px 4px 14px' }}>
                    <h3 
                      title={agency.name}
                      style={{
                        fontSize: '0.975rem',
                        fontWeight: 800,
                        color: 'var(--text-primary)',
                        margin: '0 0 8px 0',
                        lineHeight: 1.25,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: 'block'
                      }}
                    >
                      {agency.name}
                    </h3>

                    {/* Quick Badges: Staff, Services & Coverage */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        backgroundColor: 'rgba(37, 99, 235, 0.15)',
                        color: '#60A5FA',
                        padding: '3px 7px',
                        borderRadius: '5px',
                        whiteSpace: 'nowrap'
                      }}>
                        <Users size={12} strokeWidth={1.5} />
                        {agency.employeeCount} Employees
                      </span>

                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        backgroundColor: 'var(--bg-hover)',
                        color: 'var(--text-secondary)',
                        padding: '3px 7px',
                        borderRadius: '5px',
                        border: '1px solid var(--border-color)',
                        whiteSpace: 'nowrap'
                      }}>
                        <Wrench size={12} strokeWidth={1.5} />
                        {agency.services ? agency.services.length : 5} Services
                      </span>

                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        backgroundColor: 'rgba(245, 158, 11, 0.15)',
                        color: '#F59E0B',
                        padding: '3px 7px',
                        borderRadius: '5px',
                        whiteSpace: 'nowrap'
                      }}>
                        <Building2 size={12} strokeWidth={1.5} />
                        Golden Towers 1, 2, 3
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions: "View their services" and "Complaints" with Fixed Alignment */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 14px 14px 14px'
                }}>
                  {/* Button 1: View their services */}
                  <button
                    className="btn btn-primary"
                    onClick={() => setSelectedAgencyForServices(agency)}
                    style={{
                      flex: 1,
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0 10px',
                      borderRadius: '6px'
                    }}
                  >
                    <Layers size={13} strokeWidth={1.5} />
                    <span>View their services</span>
                  </button>

                  {/* Button 2: Complaints */}
                  <button
                    className="btn btn-secondary"
                    onClick={() => setActiveTab('complaints')}
                    style={{
                      flex: 1,
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0 10px',
                      borderRadius: '6px',
                      color: '#EF4444',
                      borderColor: 'rgba(239, 68, 68, 0.3)',
                      backgroundColor: 'rgba(239, 68, 68, 0.1)'
                    }}
                  >
                    <AlertTriangle size={13} strokeWidth={1.5} color="#EF4444" />
                    <span>Complaints</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 5. "View their services" Modal (Enhanced with Active/Inactive Status Toggle) */}
      {selectedAgencyForServices && (
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
            backgroundColor: 'var(--card-bg, #FFFFFF)',
            color: 'var(--text-primary)',
            borderRadius: '14px',
            border: '1px solid var(--border-color)',
            maxWidth: '560px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '20px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)'
          }}>
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '1px solid var(--border-color, #E2E8F0)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  backgroundColor: 'var(--bg-hover, #F1F5F9)',
                  flexShrink: 0
                }}>
                  <img 
                    src={selectedAgencyForServices.image} 
                    alt={selectedAgencyForServices.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    {selectedAgencyForServices.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
                    <span style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: selectedAgencyForServices.status === 'Active' ? '#22C55E' : '#EF4444'
                    }} />
                    <span style={{ 
                      fontSize: '0.72rem', 
                      color: selectedAgencyForServices.status === 'Active' ? '#16A34A' : '#DC2626', 
                      fontWeight: 700 
                    }}>
                      {selectedAgencyForServices.status === 'Active' ? 'Active Contractor' : 'Inactive Contractor'}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>•</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      {selectedAgencyForServices.category}
                    </span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setSelectedAgencyForServices(null)}
                style={{
                  background: 'var(--bg-hover, #F1F5F9)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={15} strokeWidth={1.5} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Employee & Lead Field Contact */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '10px',
                padding: '12px',
                backgroundColor: 'var(--bg-hover, #F8FAFC)',
                borderRadius: '8px',
                border: '1px solid var(--border-color, #E2E8F0)'
              }}>
                <div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase' }}>
                    Assigned Employees
                  </span>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Users size={15} color="#2563EB" strokeWidth={1.5} />
                    <span>{selectedAgencyForServices.employeeCount} Personnel</span>
                  </div>
                </div>

                <div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase' }}>
                    Lead Field Contact
                  </span>
                  <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <UserCheck size={15} color="#10B981" strokeWidth={1.5} />
                    <span>{selectedAgencyForServices.leadEngineer}</span>
                  </div>
                  <a
                    href={`tel:${selectedAgencyForServices.phone}`}
                    style={{
                      fontSize: '0.72rem',
                      color: '#2563EB',
                      fontWeight: 600,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      marginTop: '2px'
                    }}
                  >
                    <Phone size={10} strokeWidth={1.5} /> {selectedAgencyForServices.phone}
                  </a>
                </div>
              </div>

              {/* Status Toggle Action in Modal */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: '8px',
                backgroundColor: selectedAgencyForServices.status === 'Active' ? 'rgba(22, 163, 74, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                border: selectedAgencyForServices.status === 'Active' ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: selectedAgencyForServices.status === 'Active' ? '#22C55E' : '#EF4444'
                  }} />
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: selectedAgencyForServices.status === 'Active' ? '#22C55E' : '#EF4444'
                  }}>
                    Contract Status: {selectedAgencyForServices.status === 'Active' ? 'Active & Operational' : 'Inactive / Paused'}
                  </span>
                </div>

                <button
                  onClick={() => handleToggleAgencyStatus(
                    selectedAgencyForServices.id, 
                    selectedAgencyForServices.status, 
                    selectedAgencyForServices.name
                  )}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: selectedAgencyForServices.status === 'Active' ? '#DC2626' : '#16A34A',
                    color: '#FFFFFF',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Power size={11} strokeWidth={1.5} />
                  <span>{selectedAgencyForServices.status === 'Active' ? 'Mark Inactive' : 'Activate Contractor'}</span>
                </button>
              </div>

              {/* Services List */}
              <div>
                <h4 style={{
                  fontSize: '0.825rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  margin: '0 0 8px 0',
                  letterSpacing: '0.01em'
                }}>
                  Services Offered by {selectedAgencyForServices.name}:
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {selectedAgencyForServices.services && selectedAgencyForServices.services.map((service, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '8px 12px',
                        backgroundColor: 'var(--card-bg)',
                        borderRadius: '7px',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(22, 163, 74, 0.15)',
                        color: '#22C55E',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <CheckCircle2 size={13} strokeWidth={1.5} />
                      </div>
                      <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {service}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tower Coverage */}
              <div style={{
                padding: '10px 12px',
                borderRadius: '7px',
                backgroundColor: 'rgba(245, 158, 11, 0.12)',
                border: '1px solid rgba(245, 158, 11, 0.3)'
              }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#F59E0B', marginBottom: '2px' }}>
                  Coverage Scope
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  Active across Golden Apartment: Golden Tower 1, Golden Tower 2, and Golden Tower 3.
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '16px',
              paddingTop: '12px',
              borderTop: '1px solid var(--border-color)',
              gap: '8px'
            }}>
              {/* Redirect to complaints */}
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setSelectedAgencyForServices(null);
                  setActiveTab('complaints');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#EF4444',
                  borderColor: 'rgba(239, 68, 68, 0.3)',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  padding: '6px 12px'
                }}
              >
                <AlertTriangle size={13} strokeWidth={1.5} color="#EF4444" />
                <span>Redirect to Complaints</span>
              </button>

              <button 
                className="btn btn-primary"
                onClick={() => setSelectedAgencyForServices(null)}
                style={{ fontSize: '0.78rem', fontWeight: 700, padding: '6px 16px' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
