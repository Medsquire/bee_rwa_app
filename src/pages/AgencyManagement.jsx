import React, { useState, useMemo } from 'react';
import { useRwa } from '../context/RwaContext';
import { 
  ShieldCheck, 
  Search, 
  Building2, 
  Phone, 
  Mail, 
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
  ChevronRight,
  Briefcase
} from 'lucide-react';

export const AgencyManagement = () => {
  const { agencies, setAgencies, assignAgencyTowers, complaints, setActiveTab, showToast } = useRwa();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedAgencyForServices, setSelectedAgencyForServices] = useState(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [editingAgency, setEditingAgency] = useState(null);
  const [selectedTowersByComplex, setSelectedTowersByComplex] = useState({});

  // Categories list tailored to the 3 contracted agencies
  const categories = [
    { id: 'All', label: 'All Agencies', icon: Wrench },
    { id: 'Cleaning & Gardening', label: 'Cleaning & Gardening', icon: Sparkles, color: '#10B981' },
    { id: 'Plumbing & Water Systems', label: 'Plumbing & Water', icon: Droplets, color: '#06B6D4' },
    { id: 'Security & Access Control', label: 'Security & Guarding', icon: ShieldCheck, color: '#8B5CF6' }
  ];

  // Filter agencies
  const filteredAgencies = useMemo(() => {
    return agencies.filter(agy => {
      const matchesSearch = 
        agy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (agy.shortName && agy.shortName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (agy.leadEngineer && agy.leadEngineer.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (agy.category && agy.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (agy.phone && agy.phone.includes(searchTerm));

      const matchesCategory = categoryFilter === 'All' || agy.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [agencies, searchTerm, categoryFilter]);

  // Two Required Metric Cards
  const totalEmployeeCount = agencies.reduce((sum, a) => sum + (a.employeeCount || 0), 0);
  const totalServiceCount = agencies.reduce((sum, a) => sum + (a.services ? a.services.length : 0), 0);

  // Helper for category icon
  const getCategoryIcon = (category, size = 18) => {
    const cat = (category || '').toLowerCase();
    if (cat.includes('clean') || cat.includes('garden')) return <Sparkles size={size} color="#10B981" />;
    if (cat.includes('plumb') || cat.includes('water')) return <Droplets size={size} color="#06B6D4" />;
    if (cat.includes('secur') || cat.includes('guard')) return <ShieldCheck size={size} color="#8B5CF6" />;
    return <Wrench size={size} color="#64748B" />;
  };

  // Open Assignment Modal
  const handleOpenAssignModal = (agency) => {
    setEditingAgency(agency);
    const towersMap = {};
    if (agency.assignedComplexes) {
      agency.assignedComplexes.forEach(c => {
        towersMap[c.complex] = [...c.towers];
      });
    }
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
    Object.keys(selectedTowersByComplex).forEach(complexName => {
      assignAgencyTowers(editingAgency.id, complexName, selectedTowersByComplex[complexName] || []);
    });

    setIsAssignModalOpen(false);
    setEditingAgency(null);
    showToast(`Tower assignments updated for ${editingAgency.name}.`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* 1. Header Title & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Agencies & Service Providers
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => showToast('Agency management is configured for the 3 active facility contractors.', 'info')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <PlusCircle size={16} />
            <span>Add New Agency</span>
          </button>
        </div>
      </div>

      {/* 2. ONLY TWO METRIC CARDS: "Employee Count" & "Service Count" */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {/* Card 1: Employee Count */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          padding: '20px 24px',
          border: '1px solid #E2E8F0',
          borderLeft: '5px solid #2563EB',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Employee Count
              </span>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2563EB'
              }}>
                <Users size={20} />
              </div>
            </div>
            <div style={{ fontSize: '2.25rem', fontWeight: 900, color: '#0F172A', lineHeight: 1.1 }}>
              {totalEmployeeCount}
            </div>
          </div>
          <div style={{ fontSize: '0.8125rem', color: '#16A34A', marginTop: '10px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>●</span>
            <span>Deployed for cleaning, plumbing, security & gardening</span>
          </div>
        </div>

        {/* Card 2: Service Count */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          padding: '20px 24px',
          border: '1px solid #E2E8F0',
          borderLeft: '5px solid #10B981',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Service Count
              </span>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10B981'
              }}>
                <Wrench size={20} />
              </div>
            </div>
            <div style={{ fontSize: '2.25rem', fontWeight: 900, color: '#0F172A', lineHeight: 1.1 }}>
              {totalServiceCount}
            </div>
          </div>
          <div style={{ fontSize: '0.8125rem', color: '#059669', marginTop: '10px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>●</span>
            <span>Active service offerings across Golden Apartment towers</span>
          </div>
        </div>
      </div>

      {/* 3. Filter Bar */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        padding: '14px 18px',
        border: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)'
      }}>
        {/* Category Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
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
                  padding: '7px 14px',
                  borderRadius: '8px',
                  border: isSelected ? '1px solid #2563EB' : '1px solid #E2E8F0',
                  backgroundColor: isSelected ? '#2563EB' : '#F8FAFC',
                  color: isSelected ? '#FFFFFF' : '#334155',
                  fontSize: '0.8125rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={14} style={{ color: isSelected ? '#FFFFFF' : (cat.color || '#64748B') }} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', width: '260px' }}>
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '10px', color: '#94A3B8' }} />
          <input 
            type="text" 
            placeholder="Search agency..." 
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

      {/* 4. Three Agencies Grid: NO subtitles, only Image, Title, Active symbol on top */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '20px'
      }}>
        {filteredAgencies.map(agency => (
          <div
            key={agency.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              border: '1px solid #E2E8F0',
              overflow: 'hidden',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'box-shadow 0.2s ease'
            }}
          >
            {/* Top Container: Image + Active Symbol + Title (NO Subtitles) */}
            <div>
              {/* Agency Image Banner with Active Symbol overlay */}
              <div style={{ position: 'relative', width: '100%', height: '175px', backgroundColor: '#F1F5F9' }}>
                <img 
                  src={agency.image} 
                  alt={agency.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />

                {/* Active Symbol on the Top */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(4px)',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#15803D',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#22C55E',
                    boxShadow: '0 0 0 3px rgba(34, 197, 94, 0.3)',
                    display: 'inline-block'
                  }} />
                  Active
                </div>

                {/* Subtle category badge on top-left of image */}
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(4px)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  color: '#FFFFFF'
                }}>
                  {getCategoryIcon(agency.category, 13)}
                  <span>{agency.category}</span>
                </div>
              </div>

              {/* Title & Essential Information (NO Subtitles) */}
              <div style={{ padding: '18px 20px 10px 20px' }}>
                <h3 style={{
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  color: '#0F172A',
                  margin: '0 0 12px 0',
                  lineHeight: 1.3
                }}>
                  {agency.name}
                </h3>

                {/* Essential Quick Badges: Employees & Services */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    backgroundColor: '#EFF6FF',
                    color: '#1D4ED8',
                    padding: '5px 10px',
                    borderRadius: '6px'
                  }}>
                    <Users size={13} />
                    {agency.employeeCount} Employees
                  </span>

                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    backgroundColor: '#F8FAFC',
                    color: '#475569',
                    padding: '5px 10px',
                    borderRadius: '6px',
                    border: '1px solid #E2E8F0'
                  }}>
                    <Wrench size={13} />
                    {agency.services ? agency.services.length : 5} Services
                  </span>

                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    backgroundColor: '#FEF3C7',
                    color: '#92400E',
                    padding: '5px 10px',
                    borderRadius: '6px'
                  }}>
                    <Building2 size={13} />
                    Golden Towers 1, 2, 3
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions: "View their services" and "Complaints" */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 20px 18px 20px'
            }}>
              {/* Button 1: View their services */}
              <button
                className="btn btn-primary"
                onClick={() => setSelectedAgencyForServices(agency)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  padding: '9px 12px',
                  borderRadius: '8px'
                }}
              >
                <Layers size={14} />
                <span>View their services</span>
              </button>

              {/* Button 2: Complaints (Redirects to complaints tab without creating a new page) */}
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setActiveTab('complaints');
                }}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  padding: '9px 12px',
                  borderRadius: '8px',
                  color: '#DC2626',
                  borderColor: '#FECACA',
                  backgroundColor: '#FEF2F2'
                }}
              >
                <AlertTriangle size={14} color="#DC2626" />
                <span>Complaints</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 5. "View their services" Modal */}
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
            borderRadius: '16px',
            maxWidth: '580px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '24px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
          }}>
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '18px',
              paddingBottom: '14px',
              borderBottom: '1px solid #E2E8F0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
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
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    {selectedAgencyForServices.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
                    <span style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: '#22C55E'
                    }} />
                    <span style={{ fontSize: '0.75rem', color: '#16A34A', fontWeight: 700 }}>
                      Active Contractor
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>•</span>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>
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
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  color: '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Employee & Dispatch Quick Info */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                padding: '14px',
                backgroundColor: '#F8FAFC',
                borderRadius: '10px',
                border: '1px solid #E2E8F0'
              }}>
                <div>
                  <span style={{ color: '#64748B', fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase' }}>
                    Assigned Employees
                  </span>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={16} color="#2563EB" />
                    <span>{selectedAgencyForServices.employeeCount} Personnel Sent</span>
                  </div>
                </div>

                <div>
                  <span style={{ color: '#64748B', fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase' }}>
                    Lead Field Contact
                  </span>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F172A', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <UserCheck size={16} color="#10B981" />
                    <span>{selectedAgencyForServices.leadEngineer}</span>
                  </div>
                  <a
                    href={`tel:${selectedAgencyForServices.phone}`}
                    style={{
                      fontSize: '0.75rem',
                      color: '#2563EB',
                      fontWeight: 600,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      marginTop: '2px'
                    }}
                  >
                    <Phone size={11} /> {selectedAgencyForServices.phone}
                  </a>
                </div>
              </div>

              {/* Services List */}
              <div>
                <h4 style={{
                  fontSize: '0.875rem',
                  fontWeight: 800,
                  color: '#0F172A',
                  margin: '0 0 10px 0',
                  letterSpacing: '0.02em'
                }}>
                  Services Handled by {selectedAgencyForServices.name}:
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedAgencyForServices.services && selectedAgencyForServices.services.map((service, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '10px 14px',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '8px',
                        border: '1px solid #E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                    >
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: '#F0FDF4',
                        color: '#16A34A',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <CheckCircle2 size={14} />
                      </div>
                      <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#1E293B' }}>
                        {service}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tower Coverage */}
              <div style={{
                padding: '12px 14px',
                borderRadius: '8px',
                backgroundColor: '#FFFBEB',
                border: '1px solid #FDE68A'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#B45309', marginBottom: '4px' }}>
                  Coverage Scope
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#92400E', fontWeight: 600 }}>
                  Active across Golden Apartment: Golden Tower 1, Golden Tower 2, and Golden Tower 3.
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '20px',
              paddingTop: '16px',
              borderTop: '1px solid #E2E8F0',
              gap: '10px'
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
                  gap: '6px',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: '#DC2626',
                  borderColor: '#FECACA',
                  backgroundColor: '#FEF2F2'
                }}
              >
                <AlertTriangle size={14} color="#DC2626" />
                <span>Redirect to Complaints</span>
              </button>

              <button 
                className="btn btn-primary"
                onClick={() => setSelectedAgencyForServices(null)}
                style={{ fontSize: '0.8125rem', fontWeight: 700 }}
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
