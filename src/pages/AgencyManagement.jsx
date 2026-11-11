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
  const { agencies, setAgencies, updateAgencyStatus, setActiveTab, showToast } = useRwa();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Active' | 'Inactive'
  const [selectedAgencyForServices, setSelectedAgencyForServices] = useState(null);

  // Categories list tailored to the contracted agencies
  const categories = [
    { id: 'All', label: 'All Categories', icon: Wrench },
    { id: 'Cleaning & Gardening', label: 'Cleaning & Gardening', icon: Sparkles, color: '#10B981' },
    { id: 'Plumbing & Water Systems', label: 'Plumbing & Water', icon: Droplets, color: '#06B6D4' },
    { id: 'Security & Access Control', label: 'Security & Guarding', icon: ShieldCheck, color: '#8B5CF6' },
    { id: 'Lift & Elevator Maintenance', label: 'Lift & Elevators', icon: Building2, color: '#F59E0B' }
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
              Agencies & Service Providers
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

      {/* 2. TOP METRIC CARDS: Agency Count, Active Agencies, Inactive Agencies, Service Count, Employee Count */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '12px'
      }}>
        {/* Card 1: Agency Count */}
        <div 
          onClick={() => {
            setStatusFilter('All');
            setCategoryFilter('All');
          }}
          title="Click to view all agencies"
          style={{
            backgroundColor: statusFilter === 'All' && categoryFilter === 'All' ? '#EEF2FF' : '#FFFFFF',
            borderRadius: '10px',
            padding: '10px 14px',
            border: statusFilter === 'All' && categoryFilter === 'All' ? '2px solid #4F46E5' : '1px solid #E2E8F0',
            borderLeft: '4px solid #4F46E5',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease, border 0.15s ease'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#475569', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Agency Count
              </span>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '7px',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#4F46E5'
              }}>
                <Building2 size={16} strokeWidth={1.5} />
              </div>
            </div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#4F46E5', lineHeight: 1.1 }}>
              {totalAgenciesCount}
            </div>
          </div>
          <div style={{ fontSize: '0.7rem', color: '#4338CA', marginTop: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4F46E5', display: 'inline-block' }} />
            <span>Total contracted agencies</span>
          </div>
        </div>

        {/* Card 2: Active Agencies */}
        <div 
          onClick={() => setStatusFilter(prev => prev === 'Active' ? 'All' : 'Active')}
          title="Click to filter by Active agencies"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            padding: '10px 14px',
            border: statusFilter === 'Active' ? '2px solid #16A34A' : '1px solid #E2E8F0',
            borderLeft: '4px solid #16A34A',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease, border 0.15s ease',
            background: statusFilter === 'Active' ? '#F0FDF4' : '#FFFFFF'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#475569', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Active Agencies
              </span>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '7px',
                backgroundColor: 'rgba(22, 163, 74, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#16A34A'
              }}>
                <ShieldCheck size={16} strokeWidth={1.5} />
              </div>
            </div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#16A34A', lineHeight: 1.1 }}>
              {activeAgenciesCount}
            </div>
          </div>
          <div style={{ fontSize: '0.7rem', color: '#15803D', marginTop: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22C55E', display: 'inline-block' }} />
            <span>{activeAgenciesCount} operational partners</span>
          </div>
        </div>

        {/* Card 2: Inactive Agencies */}
        <div 
          onClick={() => setStatusFilter(prev => prev === 'Inactive' ? 'All' : 'Inactive')}
          title="Click to filter by Inactive agencies"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            padding: '10px 14px',
            border: statusFilter === 'Inactive' ? '2px solid #EF4444' : '1px solid #E2E8F0',
            borderLeft: '4px solid #EF4444',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease, border 0.15s ease',
            background: statusFilter === 'Inactive' ? '#FEF2F2' : '#FFFFFF'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#475569', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Inactive Agencies
              </span>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '7px',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#EF4444'
              }}>
                <AlertTriangle size={16} strokeWidth={1.5} />
              </div>
            </div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#DC2626', lineHeight: 1.1 }}>
              {inactiveAgenciesCount}
            </div>
          </div>
          <div style={{ fontSize: '0.7rem', color: '#B91C1C', marginTop: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#EF4444', display: 'inline-block' }} />
            <span>{inactiveAgenciesCount} paused / expired AMC</span>
          </div>
        </div>

        {/* Card 3: Service Count */}
        <div 
          onClick={() => {
            setStatusFilter('All');
            setCategoryFilter('All');
          }}
          title="Click to show all services"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            padding: '10px 14px',
            border: '1px solid #E2E8F0',
            borderLeft: '4px solid #0D9488',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#475569', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Service Count
              </span>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '7px',
                backgroundColor: 'rgba(13, 148, 136, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0D9488'
              }}>
                <Wrench size={16} strokeWidth={1.5} />
              </div>
            </div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.1 }}>
              {totalServiceCount}
            </div>
          </div>
          <div style={{ fontSize: '0.7rem', color: '#0F766E', marginTop: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0D9488', display: 'inline-block' }} />
            <span>Active service offerings in towers</span>
          </div>
        </div>

        {/* Card 4: Employee Count */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          padding: '10px 14px',
          border: '1px solid #E2E8F0',
          borderLeft: '4px solid #2563EB',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#475569', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Employee Count
              </span>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '7px',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2563EB'
              }}>
                <Users size={16} strokeWidth={1.5} />
              </div>
            </div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.1 }}>
              {totalEmployeeCount}
            </div>
          </div>
          <div style={{ fontSize: '0.7rem', color: '#1D4ED8', marginTop: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2563EB', display: 'inline-block' }} />
            <span>Deployed staff across Golden towers</span>
          </div>
        </div>
      </div>

      {/* 3. Filter Bar with Status & Categories (Reduced Size) */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        padding: '10px 14px',
        border: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.02)'
      }}>
        {/* Status & Category Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          {/* Status Quick Filters */}
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#F1F5F9', borderRadius: '7px', padding: '2px', marginRight: '4px' }}>
            <button
              onClick={() => setStatusFilter('All')}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: statusFilter === 'All' ? '#FFFFFF' : 'transparent',
                color: statusFilter === 'All' ? '#0F172A' : '#64748B',
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
                color: statusFilter === 'Active' ? '#FFFFFF' : '#15803D',
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
                color: statusFilter === 'Inactive' ? '#FFFFFF' : '#B91C1C',
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
          <div style={{ width: '1px', height: '20px', backgroundColor: '#CBD5E1', margin: '0 4px' }} />

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
                  border: isSelected ? '1px solid #2563EB' : '1px solid #E2E8F0',
                  backgroundColor: isSelected ? '#2563EB' : '#F8FAFC',
                  color: isSelected ? '#FFFFFF' : '#334155',
                  fontSize: '0.75rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={13} strokeWidth={1.5} style={{ color: isSelected ? '#FFFFFF' : (cat.color || '#64748B') }} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', width: '220px' }}>
          <Search size={13} strokeWidth={1.5} style={{ position: 'absolute', left: '10px', top: '9px', color: '#94A3B8' }} />
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
              borderColor: '#CBD5E1',
              backgroundColor: '#F8FAFC'
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
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            color: '#64748B'
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
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: isActive ? '1px solid #E2E8F0' : '1px solid #FECACA',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
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
                  <div style={{ position: 'relative', width: '100%', height: '146px', backgroundColor: '#F1F5F9', overflow: 'hidden' }}>
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
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(4px)',
                        padding: '4px 10px',
                        borderRadius: '16px',
                        fontSize: '0.72rem',
                        fontWeight: 750,
                        color: isActive ? '#15803D' : '#DC2626',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.12)',
                        cursor: 'pointer',
                        border: isActive ? '1px solid #BBF7D0' : '1px solid #FECACA',
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
                        color: '#0F172A',
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
                        backgroundColor: '#EFF6FF',
                        color: '#1D4ED8',
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
                        backgroundColor: '#F8FAFC',
                        color: '#475569',
                        padding: '3px 7px',
                        borderRadius: '5px',
                        border: '1px solid #E2E8F0',
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
                        backgroundColor: '#FEF3C7',
                        color: '#92400E',
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
                      color: '#DC2626',
                      borderColor: '#FECACA',
                      backgroundColor: '#FEF2F2'
                    }}
                  >
                    <AlertTriangle size={13} strokeWidth={1.5} color="#DC2626" />
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
            backgroundColor: '#FFFFFF',
            borderRadius: '14px',
            maxWidth: '560px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '20px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
          }}>
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '1px solid #E2E8F0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  backgroundColor: '#F1F5F9',
                  flexShrink: 0
                }}>
                  <img 
                    src={selectedAgencyForServices.image} 
                    alt={selectedAgencyForServices.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
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
                    <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>
                      {selectedAgencyForServices.category}
                    </span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setSelectedAgencyForServices(null)}
                style={{
                  background: '#F1F5F9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  cursor: 'pointer',
                  color: '#64748B',
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
                backgroundColor: '#F8FAFC',
                borderRadius: '8px',
                border: '1px solid #E2E8F0'
              }}>
                <div>
                  <span style={{ color: '#64748B', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase' }}>
                    Assigned Employees
                  </span>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0F172A', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Users size={15} color="#2563EB" strokeWidth={1.5} />
                    <span>{selectedAgencyForServices.employeeCount} Personnel</span>
                  </div>
                </div>

                <div>
                  <span style={{ color: '#64748B', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase' }}>
                    Lead Field Contact
                  </span>
                  <div style={{ fontSize: '0.825rem', fontWeight: 700, color: '#0F172A', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '5px' }}>
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
                backgroundColor: selectedAgencyForServices.status === 'Active' ? '#F0FDF4' : '#FEF2F2',
                border: selectedAgencyForServices.status === 'Active' ? '1px solid #BBF7D0' : '1px solid #FECACA'
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
                    color: selectedAgencyForServices.status === 'Active' ? '#15803D' : '#DC2626'
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
                  color: '#0F172A',
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
                        backgroundColor: '#FFFFFF',
                        borderRadius: '7px',
                        border: '1px solid #E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: '#F0FDF4',
                        color: '#16A34A',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <CheckCircle2 size={13} strokeWidth={1.5} />
                      </div>
                      <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#1E293B' }}>
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
                backgroundColor: '#FFFBEB',
                border: '1px solid #FDE68A'
              }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#B45309', marginBottom: '2px' }}>
                  Coverage Scope
                </div>
                <div style={{ fontSize: '0.78rem', color: '#92400E', fontWeight: 600 }}>
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
              borderTop: '1px solid #E2E8F0',
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
                  color: '#DC2626',
                  borderColor: '#FECACA',
                  backgroundColor: '#FEF2F2',
                  padding: '6px 12px'
                }}
              >
                <AlertTriangle size={13} strokeWidth={1.5} color="#DC2626" />
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
