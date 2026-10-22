import React, { useState, useMemo } from 'react';
import { useRwa } from '../context/RwaContext';
import { ApartmentBadge, StatusPill, StatCard, Modal } from '../components/CommonUI';
import { 
  Users, 
  Search, 
  Filter, 
  Building2, 
  Phone, 
  Mail, 
  Car, 
  MapPin, 
  ShieldCheck,
  UserPlus,
  Layers,
  Home,
  CheckCircle2,
  Calendar,
  Grid,
  List,
  Eye,
  Key,
  ShieldAlert
} from 'lucide-react';

export const ResidentDirectory = () => {
  const { residents, selectedApartment, setSelectedApartment, apartments, setActiveTab } = useRwa();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [viewMode, setViewMode] = useState('tower-floor-flat'); // 'tower-floor-flat' or 'list'
  
  // Complex & Tower / Floor selectors
  const [selectedComplex, setSelectedComplex] = useState('Golden Apartment');
  const [selectedTower, setSelectedTower] = useState('Golden Tower 1');
  const [selectedFloor, setSelectedFloor] = useState('All');
  const [selectedResidentModal, setSelectedResidentModal] = useState(null);

  // Tower mapping for Golden Apartment (3 Towers: Golden Tower 1, Golden Tower 2, Golden Tower 3)
  const allTowers = [
    { code: 'Golden Tower 1', name: 'Golden Tower 1', complex: 'Golden Apartment', prefix: 'GT1', altPrefix: 'A', floors: 12, unitsPerFloor: 4, isPresident: true, leadershipTag: 'President Sujana', color: '#F59E0B' },
    { code: 'Golden Tower 2', name: 'Golden Tower 2', complex: 'Golden Apartment', prefix: 'GT2', altPrefix: 'A', floors: 12, unitsPerFloor: 4, isVP: true, leadershipTag: 'VP Kavaya', color: '#EAB308' },
    { code: 'Golden Tower 3', name: 'Golden Tower 3', complex: 'Golden Apartment', prefix: 'GT3', altPrefix: 'A', floors: 10, unitsPerFloor: 4, leadershipTag: 'Service Desk', color: '#D97706' }
  ];

  const currentComplexTowers = allTowers;
  const currentTowerObj = allTowers.find(t => t.code === selectedTower) || allTowers[0];

  // Helper to get tower and floor for a resident
  const getResidentLocation = (res) => {
    let tower = res.tower;
    if (!tower) {
      if (res.flat?.startsWith('GT1-') || res.flat === 'A-205' || res.flat === 'A-604' || res.flat === 'GT1-801') {
        tower = 'Golden Tower 1';
      } else if (res.flat?.startsWith('GT2-') || res.flat === 'A-803') {
        tower = 'Golden Tower 2';
      } else if (res.flat?.startsWith('GT3-') || res.flat === 'A-1001' || res.flat === 'A-402') {
        tower = 'Golden Tower 3';
      } else {
        tower = 'Golden Tower 1';
      }
    }

    let floor = 1;
    const match = res.flat?.match(/[A-Za-z0-9]+-?(\d+)/);
    if (match) {
      const num = parseInt(match[1], 10);
      floor = Math.floor(num / 100);
      if (floor === 0) floor = 1;
    }
    return { tower, floor };
  };

  // Enriched residents list with tower & floor numbers
  const enrichedResidents = useMemo(() => {
    return residents.map(r => {
      const loc = getResidentLocation(r);
      return {
        ...r,
        tower: loc.tower,
        floor: loc.floor
      };
    });
  }, [residents]);

  // Filtered residents for list view
  const filteredResidents = useMemo(() => {
    return enrichedResidents.filter(r => {
      const matchesComplex = selectedComplex === 'All' || r.apartment === selectedComplex;
      const matchesType = typeFilter === 'All' || r.type === typeFilter;
      const matchesTower = selectedTower === 'All' || r.tower === selectedTower;
      const matchesFloor = selectedFloor === 'All' || r.floor === Number(selectedFloor);
      const matchesSearch = 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.flat.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.phone.includes(searchTerm) ||
        r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.designation && r.designation.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (r.parking && r.parking.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (r.vehicles && r.vehicles.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesComplex && matchesType && matchesSearch && (viewMode === 'list' ? true : matchesTower && matchesFloor);
    });
  }, [enrichedResidents, selectedComplex, typeFilter, selectedTower, selectedFloor, searchTerm, viewMode]);

  // Generate floor structure for the selected tower
  const floorHierarchy = useMemo(() => {
    const totalFloors = currentTowerObj.floors;
    const floorsArray = [];

    for (let f = totalFloors; f >= 1; f--) {
      // Find residents living on this floor of this tower
      const floorResidents = enrichedResidents.filter(r => r.tower === currentTowerObj.code && r.floor === f);

      // Expected flats on this floor
      const prefix = currentTowerObj.prefix;
      const flatsOnFloor = [];

      for (let u = 1; u <= currentTowerObj.unitsPerFloor; u++) {
        const flatNo = `${prefix}-${f}${u < 10 ? '0' + u : u}`;
        const altNo = currentTowerObj.altPrefix ? `${currentTowerObj.altPrefix}-${f}${u < 10 ? '0' + u : u}` : null;

        const residentFound = floorResidents.find(r => 
          r.flat === flatNo || 
          r.flat?.startsWith(flatNo) ||
          (altNo && (r.flat === altNo || r.flat?.startsWith(altNo)))
        );

        flatsOnFloor.push({
          flatNo,
          resident: residentFound || null,
          occupied: !!residentFound
        });
      }

      floorsArray.push({
        floorNumber: f,
        residents: floorResidents,
        flats: flatsOnFloor
      });
    }

    return floorsArray;
  }, [currentTowerObj, enrichedResidents]);

  const ownersCount = residents.filter(r => r.type === 'Flat Owner').length;
  const tenantsCount = residents.filter(r => r.type === 'Tenant').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: 'rgba(59, 130, 246, 0.12)',
              color: 'var(--electric-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Home size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Residence & Directory</h1>
             
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* View mode toggle */}
          <div style={{
            display: 'flex',
            backgroundColor: 'var(--bg-hover)',
            padding: '4px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)'
          }}>
            <button
              onClick={() => setViewMode('tower-floor-flat')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: viewMode === 'tower-floor-flat' ? 'var(--electric-blue)' : 'transparent',
                color: viewMode === 'tower-floor-flat' ? '#FFFFFF' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.8125rem',
                cursor: 'pointer'
              }}
            >
              <Grid size={15} /> Tower & Floor Wise
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: viewMode === 'list' ? 'var(--electric-blue)' : 'transparent',
                color: viewMode === 'list' ? '#FFFFFF' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.8125rem',
                cursor: 'pointer'
              }}
            >
              <List size={15} /> List Directory
            </button>
          </div>

          <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('register')}>
            <UserPlus size={16} /> Add Resident
          </button>
        </div>
      </div>

      {/* Directory Metrics */}
      <div className="grid-cols-4">
        <StatCard 
          title="TOTAL RESIDENTS" 
          value={residents.length} 
          subtitle="Registered in directory" 
          icon={Users} 
          color="blue" 
        />
        <StatCard 
          title="FLAT OWNERS" 
          value={ownersCount} 
          subtitle="Primary deed holders" 
          icon={Key} 
          color="indigo" 
        />
        <StatCard 
          title="TENANTS" 
          value={tenantsCount} 
          subtitle="Registered NOC holders" 
          icon={CheckCircle2} 
          color="cyan" 
        />
        <StatCard 
          title="ACTIVE TOWERS" 
          value="3 Golden Towers" 
          subtitle="GT-1, GT-2, GT-3 (President: Sujana)" 
          icon={Building2} 
          color="amber" 
        />
      </div>

      {/* COMPLEX & TOWER SELECTOR BAR */}
      <div className="glass-card" style={{ padding: '18px 20px' }}>
        {/* Top: Apartment Indicator & Search Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', paddingBottom: '14px', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '8px',
              backgroundColor: '#EFF6FF',
              border: '1px solid #BFDBFE',
              color: '#1D4ED8',
              fontWeight: 800,
              fontSize: '0.875rem'
            }}>
              <Building2 size={16} />
              <span>Golden Apartment</span>
              <span style={{
                fontSize: '0.6875rem',
                backgroundColor: '#FEF3C7',
                color: '#B45309',
                padding: '1px 6px',
                borderRadius: '8px',
                fontWeight: 800
              }}>
                👑 President Sujana • 3 Towers
              </span>
            </span>
          </div>

          {/* Search bar */}
          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search resident, flat, phone..." 
              className="form-control"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '36px' }}
            />
          </div>
        </div>

        {/* Middle: Towers of Selected Complex (e.g. Golden Tower 1, Golden Tower 2, Golden Tower 3) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '14px' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--text-secondary)', marginRight: '4px' }}>
            SELECT TOWER:
          </span>
          {currentComplexTowers.map(tow => {
            const isSelected = selectedTower === tow.code;
            return (
              <button
                key={tow.code}
                onClick={() => {
                  setSelectedTower(tow.code);
                  setSelectedFloor('All');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 16px',
                  borderRadius: '8px',
                  border: isSelected ? `2px solid ${tow.color}` : '1px solid var(--border-color)',
                  backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.12)' : 'var(--bg-hover)',
                  color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: isSelected ? 800 : 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <Building2 size={16} style={{ color: tow.color }} />
                <span>{tow.name}</span>
                {tow.isPresident && (
                  <span style={{
                    fontSize: '0.6875rem',
                    backgroundColor: '#FEF3C7',
                    color: '#B45309',
                    padding: '2px 7px',
                    borderRadius: '8px',
                    fontWeight: 800
                  }}>
                    👑 Sujana
                  </span>
                )}
                {tow.isVP && (
                  <span style={{
                    fontSize: '0.6875rem',
                    backgroundColor: '#EFF6FF',
                    color: '#1D4ED8',
                    padding: '2px 7px',
                    borderRadius: '8px',
                    fontWeight: 800
                  }}>
                    🛡️ Kavaya
                  </span>
                )}
                <span style={{ 
                  fontSize: '0.75rem', 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                  padding: '2px 6px', 
                  borderRadius: '10px' 
                }}>
                  {tow.floors} Floors
                </span>
              </button>
            );
          })}
        </div>

        {/* Floor Quick Filter Ladder */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          marginTop: '14px', 
          paddingTop: '14px', 
          borderTop: '1px solid var(--border-color)',
          overflowX: 'auto',
          paddingBottom: '4px'
        }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
            FLOOR FILTER:
          </span>
          <button
            onClick={() => setSelectedFloor('All')}
            className={`btn btn-xs ${selectedFloor === 'All' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: '6px', whiteSpace: 'nowrap' }}
          >
            All Floors
          </button>
          {Array.from({ length: currentTowerObj.floors }, (_, i) => i + 1).map(fl => {
            const isSelected = selectedFloor === fl.toString() || selectedFloor === fl;
            const resOnFloorCount = enrichedResidents.filter(r => r.tower === currentTowerObj.code && r.floor === fl).length;
            return (
              <button
                key={fl}
                onClick={() => setSelectedFloor(fl.toString())}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: isSelected ? '1px solid var(--electric-blue)' : '1px solid var(--border-color)',
                  backgroundColor: isSelected ? 'var(--electric-blue)' : 'var(--bg-hover)',
                  color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                  fontSize: '0.75rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>Floor {fl}</span>
                {resOnFloorCount > 0 && (
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? '#FFFFFF' : 'var(--success)'
                  }} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW MODE 1: TOWER & FLOOR & FLAT WISE HIERARCHICAL VIEW */}
      {viewMode === 'tower-floor-flat' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={18} style={{ color: currentTowerObj.color }} />
              {currentTowerObj.code} — {currentTowerObj.name}
              <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                ({selectedFloor === 'All' ? `All ${currentTowerObj.floors} Floors` : `Floor ${selectedFloor} View`})
              </span>
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.75rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: 'var(--indigo)' }} />
                Occupied by Owner
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: 'var(--electric-blue)' }} />
                Occupied by Tenant
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: 'var(--border-color)' }} />
                Unoccupied / Pending Registry
              </span>
            </div>
          </div>

          {/* Floor-by-Floor Hierarchy Rendering */}
          {floorHierarchy
            .filter(f => selectedFloor === 'All' || f.floorNumber === Number(selectedFloor))
            .map(floor => (
              <div 
                key={floor.floorNumber} 
                className="glass-card" 
                style={{ 
                  padding: '16px 20px',
                  borderLeft: `4px solid ${floor.residents.length > 0 ? currentTowerObj.color : 'var(--border-color)'}`
                }}
              >
                {/* Floor Header */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  marginBottom: '14px',
                  paddingBottom: '10px',
                  borderBottom: '1px solid var(--border-color)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      backgroundColor: 'var(--bg-hover)',
                      border: '1px solid var(--border-color)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontWeight: 800,
                      fontSize: '0.875rem',
                      color: 'var(--text-primary)'
                    }}>
                      FLOOR {floor.floorNumber}
                    </div>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      Level {floor.floorNumber} of {currentTowerObj.floors} • {currentTowerObj.name}
                    </span>
                  </div>

                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {floor.residents.length} of {floor.flats.length} flats registered
                  </span>
                </div>

                {/* Flat Cards Grid for this Floor */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '14px'
                }}>
                  {floor.flats.map(flatItem => {
                    const res = flatItem.resident;
                    const isOccupied = !!res;

                    return (
                      <div
                        key={flatItem.flatNo}
                        style={{
                          backgroundColor: isOccupied ? 'var(--card-bg)' : 'var(--bg-hover)',
                          borderRadius: '10px',
                          border: isOccupied 
                            ? res.type === 'Flat Owner' 
                              ? '1px solid rgba(99, 102, 241, 0.4)' 
                              : '1px solid rgba(34, 211, 238, 0.4)' 
                            : '1px dashed var(--border-color)',
                          padding: '14px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          gap: '10px',
                          position: 'relative',
                          boxShadow: isOccupied ? '0 2px 8px rgba(0, 0, 0, 0.04)' : 'none'
                        }}
                      >
                        {/* Top: Flat number & Occupancy tag */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{
                            fontSize: '1.125rem',
                            fontWeight: 800,
                            color: isOccupied ? 'var(--text-primary)' : 'var(--text-muted)'
                          }}>
                            {flatItem.flatNo}
                          </span>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {res?.designation && (
                              <span style={{
                                fontSize: '0.6875rem',
                                fontWeight: 800,
                                backgroundColor: res.designation.includes('President') && !res.designation.includes('Vice') ? '#FEF3C7' : '#EFF6FF',
                                color: res.designation.includes('President') && !res.designation.includes('Vice') ? '#B45309' : '#1D4ED8',
                                border: `1px solid ${res.designation.includes('President') && !res.designation.includes('Vice') ? '#FDE68A' : '#BFDBFE'}`,
                                padding: '1px 6px',
                                borderRadius: '6px'
                              }}>
                                {res.designation.includes('President') && !res.designation.includes('Vice') ? '👑 Pres' : '🛡️ VP'}
                              </span>
                            )}
                            {isOccupied ? (
                              <span className={`badge ${res.type === 'Flat Owner' ? 'badge-indigo' : 'badge-neutral'}`} style={{ fontSize: '0.6875rem' }}>
                                {res.type}
                              </span>
                            ) : (
                              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                                Unregistered
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Resident Info or Empty State */}
                        {isOccupied ? (
                          <>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{
                                width: '34px',
                                height: '34px',
                                borderRadius: '50%',
                                backgroundColor: res.designation?.includes('President') && !res.designation?.includes('Vice') ? '#F59E0B' : res.type === 'Flat Owner' ? 'var(--indigo)' : 'var(--electric-blue)',
                                color: '#FFFFFF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 800,
                                fontSize: '0.8125rem',
                                flexShrink: 0
                              }}>
                                {res.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                              </div>
                              <div style={{ overflow: 'hidden' }}>
                                <div style={{ fontWeight: 800, fontSize: '0.875rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <span>{res.name}</span>
                                </div>
                                <div style={{ fontSize: '0.75rem', color: res.designation ? 'var(--electric-blue)' : 'var(--text-muted)', fontWeight: res.designation ? 700 : 400 }}>
                                  {res.designation || `ID: ${res.id}`}
                                </div>
                              </div>
                            </div>

                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Phone size={11} style={{ color: 'var(--text-muted)' }} /> {res.phone}
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Car size={11} style={{ color: 'var(--text-muted)' }} /> Slot: {res.parking || 'Unassigned'}
                              </div>
                            </div>

                            <button
                              className="btn btn-secondary btn-xs"
                              style={{ width: '100%', marginTop: '4px', justifyContent: 'center' }}
                              onClick={() => setSelectedResidentModal(res)}
                            >
                              <Eye size={12} /> View Flat Profile
                            </button>
                          </>
                        ) : (
                          <div style={{ padding: '8px 0', textAlign: 'center' }}>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '4px 0 8px' }}>
                              Available for occupancy or title verification
                            </p>
                            <button 
                              className="btn btn-secondary btn-xs"
                              style={{ width: '100%', justifyContent: 'center' }}
                              onClick={() => setActiveTab('register')}
                            >
                              + Assign Resident
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* VIEW MODE 2: COMPLETE DIRECTORY TABLE LIST */}
      {viewMode === 'list' && (
        <div className="glass-card">
          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <select 
                className="form-control"
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value)}
                style={{ width: 'auto' }}
              >
                <option value="All">All Resident Types</option>
                <option value="Flat Owner">Flat Owners Only</option>
                <option value="Tenant">Tenants Only</option>
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
              Showing <strong>{filteredResidents.length}</strong> of <strong>{residents.length}</strong> residents
            </span>
          </div>

          {/* Directory List Table */}
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Resident</th>
                  <th>Tower & Complex</th>
                  <th>Floor</th>
                  <th>Flat No</th>
                  <th>Resident Type</th>
                  <th>Contact Info</th>
                  <th>Parking Slot</th>
                  <th>Vehicles</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredResidents.map(res => (
                  <tr key={res.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: res.type === 'Flat Owner' ? 'var(--indigo)' : 'var(--electric-blue)',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.75rem'
                        }}>
                          {res.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700 }}>{res.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {res.id}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.75rem', color: 'var(--electric-blue)' }}>{res.tower}</span>
                        <ApartmentBadge apartment={res.apartment} />
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-neutral" style={{ fontWeight: 700 }}>Floor {res.floor}</span>
                    </td>
                    <td style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--electric-blue)' }}>{res.flat}</td>
                    <td>
                      <span className={`badge ${res.type === 'Flat Owner' ? 'badge-indigo' : 'badge-neutral'}`}>
                        {res.type}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8125rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Phone size={12} style={{ color: 'var(--text-muted)' }} /> {res.phone}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                        <Mail size={12} style={{ color: 'var(--text-muted)' }} /> {res.email}
                      </div>
                    </td>
                    <td style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{res.parking || 'Unassigned'}</td>
                    <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Car size={13} /> {res.vehicles || 'None'}
                      </div>
                    </td>
                    <td>
                      <button 
                        className="btn btn-secondary btn-xs"
                        onClick={() => setSelectedResidentModal(res)}
                      >
                        Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Resident & Flat Dossier Modal */}
      <Modal
        isOpen={!!selectedResidentModal}
        onClose={() => setSelectedResidentModal(null)}
        title={selectedResidentModal?.name || 'Resident Details'}
        subtitle={`Flat ${selectedResidentModal?.flat} • ${selectedResidentModal?.tower} (${selectedResidentModal?.apartment})`}
      >
        {selectedResidentModal && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', backgroundColor: 'var(--bg-hover)', borderRadius: '10px' }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                backgroundColor: selectedResidentModal.type === 'Flat Owner' ? 'var(--indigo)' : 'var(--electric-blue)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.25rem'
              }}>
                {selectedResidentModal.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 800 }}>{selectedResidentModal.name}</h3>
                  <StatusPill status={selectedResidentModal.status} />
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--electric-blue)', fontWeight: 600 }}>
                  {selectedResidentModal.type} • ID: {selectedResidentModal.id}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {selectedResidentModal.apartment} — Floor {selectedResidentModal.floor}, Flat {selectedResidentModal.flat}
                </div>
              </div>
            </div>

            <div className="grid-cols-2" style={{ gap: '12px' }}>
              <div className="glass-card" style={{ padding: '12px' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>CONTACT INFORMATION</div>
                <div style={{ fontWeight: 700, marginTop: '4px', fontSize: '0.875rem' }}>{selectedResidentModal.phone}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{selectedResidentModal.email}</div>
              </div>
              <div className="glass-card" style={{ padding: '12px' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>PARKING & VEHICLES</div>
                <div style={{ fontWeight: 700, marginTop: '4px', fontSize: '0.875rem' }}>Slot: {selectedResidentModal.parking || 'None'}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{selectedResidentModal.vehicles || 'No vehicle registered'}</div>
              </div>
              <div className="glass-card" style={{ padding: '12px' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>TOWER LEVEL</div>
                <div style={{ fontWeight: 700, marginTop: '4px', fontSize: '0.875rem' }}>{selectedResidentModal.tower}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Floor {selectedResidentModal.floor} (Elevator access)</div>
              </div>
              <div className="glass-card" style={{ padding: '12px' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>RWA VERIFICATION</div>
                <div style={{ fontWeight: 700, marginTop: '4px', fontSize: '0.875rem', color: 'var(--success)' }}>
                  ✓ Approved & Active
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Title deeds & KYC validated</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedResidentModal(null)}>
                Close
              </button>
              <a href={`tel:${selectedResidentModal.phone}`} className="btn btn-primary" style={{ textDecoration: 'none' }}>
                <Phone size={14} /> Call Resident
              </a>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
