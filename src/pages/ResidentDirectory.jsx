import React, { useState, useMemo, useEffect, useRef } from 'react';
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
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Edit3,
  Save,
  X,
  ChevronDown,
  SlidersHorizontal
} from 'lucide-react';

export const ResidentDirectory = () => {
  const { residents, selectedApartment, setSelectedApartment, apartments, setActiveTab, updateResident } = useRwa();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [viewMode, setViewMode] = useState('tower-floor-flat'); // 'tower-floor-flat' or 'list'
  
  // Complex & Tower / Floor selectors
  const [selectedComplex, setSelectedComplex] = useState('Golden Apartment');
  const [selectedTower, setSelectedTower] = useState('Golden Tower 1');
  const [selectedFloor, setSelectedFloor] = useState('All');
  const [occupancyFilter, setOccupancyFilter] = useState('All');
  const [showTowerFloorFilters, setShowTowerFloorFilters] = useState(false);
  const [selectedResidentModal, setSelectedResidentModal] = useState(null);
  const [isEditingModal, setIsEditingModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'Flat Owner',
    parking: '',
    vehicles: ''
  });

  const handleStartEdit = (resident) => {
    if (!resident) return;
    setEditForm({
      name: resident.name || '',
      phone: resident.phone || '',
      email: resident.email || '',
      type: resident.type || 'Flat Owner',
      parking: resident.parking || '',
      vehicles: resident.vehicles || ''
    });
    setIsEditingModal(true);
  };

  const handleSaveEdit = (e) => {
    if (e) e.preventDefault();
    if (!selectedResidentModal) return;

    if (!editForm.name.trim() || !editForm.phone.trim()) {
      alert('Please provide Name and Contact Phone.');
      return;
    }

    if (updateResident) {
      updateResident(selectedResidentModal.id, editForm);
    }

    setSelectedResidentModal(prev => ({
      ...prev,
      ...editForm
    }));

    setIsEditingModal(false);
  };

  const [currentFloorPage, setCurrentFloorPage] = useState(1);
  const FLOORS_PER_PAGE = 3;
  const topTableRef = useRef(null);

  // List Directory Pagination State
  const [listPage, setListPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const listTableRef = useRef(null);

  useEffect(() => {
    setListPage(1);
  }, [searchTerm, typeFilter, selectedApartment, selectedComplex]);

  const scrollToTop = () => {
    const mainWrapper = document.querySelector('.main-wrapper') || document.querySelector('main');
    if (mainWrapper) {
      mainWrapper.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (topTableRef.current) {
      topTableRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (newPage) => {
    setCurrentFloorPage(newPage);
    scrollToTop();
  };

  // Tower mapping for Golden Apartment (3 Towers: Golden Tower 1, Golden Tower 2, Golden Tower 3)
  // Each tower has 30 to 40 floors, and each floor has 6 to 10 flats
  const allTowers = [
    { 
      code: 'Golden Tower 1', 
      name: 'Golden Tower 1', 
      complex: 'Golden Apartment', 
      prefix: 'GT1', 
      altPrefix: 'A', 
      floors: 38, 
      unitsPerFloor: 8, 
      getUnitsForFloor: (f) => (f >= 35 ? 6 : 8), // 38 floors, 6 to 8 flats per floor
      isPresident: true, 
      leadershipTag: 'President Sujana', 
      color: '#F59E0B' 
    },
    { 
      code: 'Golden Tower 2', 
      name: 'Golden Tower 2', 
      complex: 'Golden Apartment', 
      prefix: 'GT2', 
      altPrefix: 'A', 
      floors: 35, 
      unitsPerFloor: 8, 
      getUnitsForFloor: (f) => (f >= 32 ? 6 : 8), // 35 floors, 6 to 8 flats per floor
      isVP: true, 
      leadershipTag: 'VP Kavaya', 
      color: '#EAB308' 
    },
    { 
      code: 'Golden Tower 3', 
      name: 'Golden Tower 3', 
      complex: 'Golden Apartment', 
      prefix: 'GT3', 
      altPrefix: 'A', 
      floors: 32, 
      unitsPerFloor: 8, 
      getUnitsForFloor: (f) => (f <= 4 ? 10 : f >= 28 ? 6 : 8), // 32 floors, 6 to 10 flats per floor
      leadershipTag: 'Service Desk', 
      color: '#D97706' 
    }
  ];

  const currentComplexTowers = allTowers;
  const currentTowerObj = allTowers.find(t => t.code === selectedTower) || allTowers[0];

  // Overall flats count across all towers
  const totalFlatsCount = useMemo(() => {
    return allTowers.reduce((sum, tow) => {
      let towerFlats = 0;
      for (let f = 1; f <= tow.floors; f++) {
        const units = tow.getUnitsForFloor ? tow.getUnitsForFloor(f) : tow.unitsPerFloor;
        towerFlats += units;
      }
      return sum + towerFlats;
    }, 0);
  }, []);

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

    let floor = res.floor;
    if (!floor) {
      const match = res.flat?.match(/[A-Za-z0-9]+-?(\d+)/);
      if (match) {
        const num = parseInt(match[1], 10);
        floor = Math.floor(num / 100);
        if (floor === 0) floor = 1;
      } else {
        floor = 1;
      }
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

  // Helper to check if a flat or resident matches search term
  const isFlatMatching = (flatItem, rawTerm) => {
    if (!rawTerm || !rawTerm.trim()) return true;
    const term = rawTerm.trim().toLowerCase();
    const cleanTerm = term.replace(/[-\s]/g, '');

    // 1. Direct and normalized flat number match (e.g. "801", "GT1-801", "gt1801")
    const flatNoLower = (flatItem.flatNo || '').toLowerCase();
    const cleanFlatNo = flatNoLower.replace(/[-\s]/g, '');
    if (flatNoLower.includes(term) || cleanFlatNo.includes(cleanTerm)) return true;

    // 2. Unit/floor number match (e.g. flat "GT1-801", user typed "801" or "0801")
    const parts = flatItem.flatNo.split('-');
    if (parts.length > 1) {
      const unitPart = parts[1].toLowerCase();
      if (unitPart.includes(term) || unitPart.replace(/^0+/, '').includes(term)) {
        return true;
      }
    }

    // 3. Resident attributes match
    const res = flatItem.resident;
    if (res) {
      if (res.name && res.name.toLowerCase().includes(term)) return true;
      if (res.flat && (res.flat.toLowerCase().includes(term) || res.flat.replace(/[-\s]/g, '').toLowerCase().includes(cleanTerm))) return true;
      if (res.phone && res.phone.replace(/[\s-]/g, '').includes(cleanTerm)) return true;
      if (res.email && res.email.toLowerCase().includes(term)) return true;
      if (res.designation && res.designation.toLowerCase().includes(term)) return true;
      if (res.parking && res.parking.toLowerCase().includes(term)) return true;
      if (res.vehicles && res.vehicles.toLowerCase().includes(term)) return true;
      if (res.type && res.type.toLowerCase().includes(term)) return true;
    }
    return false;
  };

  // Automatically switch tower if user searches for another tower prefix
  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    if (term.startsWith('gt2') || term.includes('golden tower 2') || term.startsWith('tower 2')) {
      if (selectedTower !== 'Golden Tower 2') setSelectedTower('Golden Tower 2');
    } else if (term.startsWith('gt3') || term.includes('golden tower 3') || term.startsWith('tower 3')) {
      if (selectedTower !== 'Golden Tower 3') setSelectedTower('Golden Tower 3');
    } else if (term.startsWith('gt1') || term.includes('golden tower 1') || term.startsWith('tower 1')) {
      if (selectedTower !== 'Golden Tower 1') setSelectedTower('Golden Tower 1');
    }
  }, [searchTerm, selectedTower]);

  // Filtered residents for list view
  const filteredResidents = useMemo(() => {
    return enrichedResidents.filter(r => {
      const matchesComplex = selectedComplex === 'All' || 
        r.apartment === selectedComplex ||
        (selectedComplex === 'Golden Apartment' && (
          r.apartment === 'Golden Apartment' ||
          r.apartment?.toLowerCase().includes('tower') ||
          r.apartment?.toLowerCase().includes('golden')
        ));
      const matchesType = typeFilter === 'All' || r.type === typeFilter;
      const matchesTower = selectedTower === 'All' || r.tower === selectedTower;
      const matchesFloor = selectedFloor === 'All' || r.floor === Number(selectedFloor);
      
      const fakeFlatItem = { flatNo: r.flat, resident: r, occupied: true };
      const matchesSearch = isFlatMatching(fakeFlatItem, searchTerm);

      return matchesComplex && matchesType && matchesSearch && (viewMode === 'list' ? true : matchesTower && matchesFloor);
    });
  }, [enrichedResidents, selectedComplex, typeFilter, selectedTower, selectedFloor, searchTerm, viewMode]);

  // List Directory Pagination Calculations
  const totalListPages = Math.max(1, Math.ceil(filteredResidents.length / itemsPerPage));
  const startListIndex = (listPage - 1) * itemsPerPage;
  const endListIndex = Math.min(startListIndex + itemsPerPage, filteredResidents.length);
  const paginatedResidents = useMemo(() => {
    return filteredResidents.slice(startListIndex, endListIndex);
  }, [filteredResidents, startListIndex, endListIndex]);

  const handleListPageChange = (newPage) => {
    if (newPage < 1 || newPage > totalListPages) return;
    setListPage(newPage);
    if (listTableRef.current) {
      listTableRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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

      const unitsCount = currentTowerObj.getUnitsForFloor 
        ? currentTowerObj.getUnitsForFloor(f) 
        : currentTowerObj.unitsPerFloor;

      for (let u = 1; u <= unitsCount; u++) {
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

  // Filtered floors based on floor selection, occupancy filter, and search query
  const visibleFloorsList = useMemo(() => {
    const hasSearch = searchTerm.trim().length > 0;
    
    return floorHierarchy
      .filter(f => selectedFloor === 'All' || f.floorNumber === Number(selectedFloor))
      .map(floor => {
        const filteredFlats = floor.flats.filter(flatItem => {
          if (occupancyFilter === 'Occupied' && !flatItem.occupied) return false;
          if (occupancyFilter === 'Unoccupied' && flatItem.occupied) return false;
          if (hasSearch && !isFlatMatching(flatItem, searchTerm)) return false;
          return true;
        });

        return {
          ...floor,
          flats: filteredFlats
        };
      })
      .filter(floor => {
        // When searching or filtering by occupancy, only show floors that contain matching flats!
        if (hasSearch || occupancyFilter !== 'All') {
          return floor.flats.length > 0;
        }
        return true;
      });
  }, [floorHierarchy, selectedFloor, occupancyFilter, searchTerm]);

  // Check if search query matches residents in other towers
  const otherTowerMatches = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const cleanTerm = searchTerm.trim().toLowerCase().replace(/[-\s]/g, '');
    const term = searchTerm.trim().toLowerCase();

    return allTowers
      .filter(t => t.code !== selectedTower)
      .map(tow => {
        const matches = enrichedResidents.filter(r => {
          if (r.tower !== tow.code) return false;
          const flatClean = (r.flat || '').toLowerCase().replace(/[-\s]/g, '');
          const nameLower = (r.name || '').toLowerCase();
          const phoneClean = (r.phone || '').replace(/[\s-]/g, '');
          const emailLower = (r.email || '').toLowerCase();
          return (
            flatClean.includes(cleanTerm) ||
            nameLower.includes(term) ||
            phoneClean.includes(cleanTerm) ||
            emailLower.includes(term)
          );
        });
        return { tower: tow, matches };
      })
      .filter(item => item.matches.length > 0);
  }, [searchTerm, selectedTower, allTowers, enrichedResidents]);

  const totalFloorPages = Math.ceil(visibleFloorsList.length / FLOORS_PER_PAGE);

  // Reset to page 1 whenever tower, floor filter, occupancy, or search term changes
  useEffect(() => {
    setCurrentFloorPage(1);
  }, [selectedTower, selectedFloor, occupancyFilter, searchTerm]);

  // Paginated slice: 3 floors per page
  const paginatedFloors = useMemo(() => {
    const startIndex = (currentFloorPage - 1) * FLOORS_PER_PAGE;
    return visibleFloorsList.slice(startIndex, startIndex + FLOORS_PER_PAGE);
  }, [visibleFloorsList, currentFloorPage]);

  const ownersCount = residents.filter(r => r.type === 'Flat Owner').length;
  const tenantsCount = residents.filter(r => r.type === 'Tenant').length;

  // Tower level occupancy stats
  const currentTowerStats = useMemo(() => {
    let flats = 0;
    for (let f = 1; f <= currentTowerObj.floors; f++) {
      const u = currentTowerObj.getUnitsForFloor ? currentTowerObj.getUnitsForFloor(f) : currentTowerObj.unitsPerFloor;
      flats += u;
    }
    const occupied = enrichedResidents.filter(r => r.tower === currentTowerObj.code).length;
    const unoccupied = Math.max(0, flats - occupied);
    const rate = flats > 0 ? ((occupied / flats) * 100).toFixed(1) : 0;
    return { flats, occupied, unoccupied, rate };
  }, [currentTowerObj, enrichedResidents]);

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
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Residence</h1>
             
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
      <div className="grid-cols-4" style={{ gap: '14px' }}>
        <StatCard 
          title="TOTAL RESIDENTS" 
          value={residents.length} 
          icon={Users} 
          color="blue" 
          compact
        />
        <StatCard 
          title="FLAT OWNERS" 
          value={ownersCount}  
          icon={Key} 
          color="indigo" 
          compact
        />
        <StatCard 
          title="TENANTS" 
          value={tenantsCount} 
          icon={CheckCircle2} 
          color="cyan" 
          compact
        />
        <div 
          className="glass-card stat-card"
          style={{ borderLeft: '4px solid #F59E0B', padding: '12px 16px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div>
                  <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    TOTAL TOWERS
                  </div>
                  <div className="stat-value" style={{ marginTop: '2px', fontSize: '1.4rem' }}>
                    {allTowers.length}
                  </div>
                </div>
                <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '14px' }}>
                  <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    TOTAL FLATS
                  </div>
                  <div className="stat-value" style={{ marginTop: '2px', fontSize: '1.4rem', color: '#F59E0B' }}>
                    {totalFlatsCount}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '8px', 
              backgroundColor: 'rgba(245, 158, 11, 0.15)', 
              color: '#F59E0B',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Building2 size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* COMPLEX & TOWER SELECTOR BAR */}
      <div className="glass-card" style={{ padding: '18px 20px' }}>
        {/* Top: Apartment Indicator & Search Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          paddingBottom: showTowerFloorFilters ? '14px' : '0',
          borderBottom: showTowerFloorFilters ? '1px solid var(--border-color)' : 'none'
        }}>
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* Toggle Button for Tower & Floor Filters */}
            <button
              type="button"
              onClick={() => setShowTowerFloorFilters(prev => !prev)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.8125rem',
                fontWeight: 700,
                cursor: 'pointer',
                border: showTowerFloorFilters ? '1.5px solid #2563EB' : '1px solid var(--border-color)',
                backgroundColor: showTowerFloorFilters ? '#EFF6FF' : '#FFFFFF',
                color: showTowerFloorFilters ? '#1D4ED8' : 'var(--text-secondary)',
                transition: 'all 0.15s ease',
                boxShadow: showTowerFloorFilters ? '0 1px 3px rgba(37, 99, 235, 0.15)' : 'none'
              }}
              title={showTowerFloorFilters ? 'Click to hide tower & floor filters' : 'Click to show tower & floor filters'}
            >
              <SlidersHorizontal size={14} style={{ color: showTowerFloorFilters ? '#2563EB' : 'var(--text-muted)' }} />
              <span>{showTowerFloorFilters ? 'Hide Filters' : 'Tower & Floor Filters'}</span>
              <span style={{
                fontSize: '0.6875rem',
                backgroundColor: showTowerFloorFilters ? '#2563EB' : '#F1F5F9',
                color: showTowerFloorFilters ? '#FFFFFF' : '#475569',
                padding: '1px 6px',
                borderRadius: '5px',
                fontWeight: 700
              }}>
                {selectedTower}
              </span>
              <ChevronDown 
                size={14} 
                style={{ 
                  transform: showTowerFloorFilters ? 'rotate(180deg)' : 'none', 
                  transition: 'transform 0.2s ease',
                  color: showTowerFloorFilters ? '#2563EB' : 'var(--text-muted)'
                }} 
              />
            </button>

            {/* Search bar */}
            <div style={{ position: 'relative', width: '280px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search resident, flat, phone..." 
                className="form-control"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '36px', paddingRight: searchTerm ? '32px' : '12px' }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '8px',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%'
                  }}
                  title="Clear search"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Info in the red box: Only show when toggle button is clicked */}
        {showTowerFloorFilters && (
          <>
            {/* Middle: Towers of Selected Complex (Golden Tower 1, Golden Tower 2, Golden Tower 3) - Same line side by side */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '14px', width: '100%' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: 0 }}>
            SELECT TOWER:
          </span>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '10px',
            flex: 1,
            width: '100%'
          }}>
            {currentComplexTowers.map(tow => {
              const isSelected = selectedTower === tow.code;
              const towOccupied = enrichedResidents.filter(r => r.tower === tow.code).length;
              let towFlats = 0;
              for (let f = 1; f <= tow.floors; f++) {
                towFlats += (tow.getUnitsForFloor ? tow.getUnitsForFloor(f) : tow.unitsPerFloor);
              }
              const towVacant = Math.max(0, towFlats - towOccupied);

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
                    justifyContent: 'space-between',
                    gap: '6px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: isSelected ? `2px solid ${tow.color}` : '1px solid var(--border-color)',
                    backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.12)' : 'var(--bg-hover)',
                    color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: isSelected ? 800 : 600,
                    fontSize: '0.8125rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0, overflow: 'hidden' }}>
                    <Building2 size={16} style={{ color: tow.color, flexShrink: 0 }} />
                    <span style={{ fontWeight: 800, textOverflow: 'ellipsis', overflow: 'hidden' }}>{tow.name}</span>
                    {tow.isPresident && (
                      <span style={{
                        fontSize: '0.625rem',
                        backgroundColor: '#FEF3C7',
                        color: '#B45309',
                        padding: '1px 5px',
                        borderRadius: '6px',
                        fontWeight: 800,
                        flexShrink: 0
                      }}>
                        👑 Sujana
                      </span>
                    )}
                    {tow.isVP && (
                      <span style={{
                        fontSize: '0.625rem',
                        backgroundColor: '#EFF6FF',
                        color: '#1D4ED8',
                        padding: '1px 5px',
                        borderRadius: '6px',
                        fontWeight: 800,
                        flexShrink: 0
                      }}>
                        🛡️ Kavaya
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
                    <span style={{ 
                      fontSize: '0.6875rem', 
                      backgroundColor: 'rgba(255, 255, 255, 0.15)', 
                      padding: '2px 5px', 
                      borderRadius: '8px',
                      color: 'var(--text-secondary)'
                    }}>
                      {tow.floors}F
                    </span>
                    <span style={{
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      color: '#92400E',
                      backgroundColor: '#FEF3C7',
                      border: '1px solid #FDE68A',
                      padding: '1px 5px',
                      borderRadius: '5px'
                    }}>
                      {towVacant} Vacant
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
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
          <select
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(e.target.value)}
            className="form-control"
            style={{
              width: 'auto',
              minWidth: '140px',
              height: '30px',
              padding: '2px 8px',
              fontSize: '0.75rem',
              fontWeight: 600,
              borderRadius: '6px'
            }}
          >
            <option value="All">All {currentTowerObj.floors} Floors</option>
            {Array.from({ length: currentTowerObj.floors }, (_, i) => currentTowerObj.floors - i).map(fl => (
              <option key={fl} value={fl.toString()}>Floor {fl}</option>
            ))}
          </select>
          <select
            value={occupancyFilter}
            onChange={(e) => setOccupancyFilter(e.target.value)}
            className="form-control"
            style={{
              width: 'auto',
              minWidth: '160px',
              height: '30px',
              padding: '2px 8px',
              fontSize: '0.75rem',
              fontWeight: 600,
              borderRadius: '6px'
            }}
          >
            <option value="All">All Flats (Occupied & Vacant)</option>
            <option value="Occupied">Occupied Flats Only</option>
            <option value="Unoccupied">Unoccupied Flats Only</option>
          </select>
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
          </>
        )}
      </div>

      {/* VIEW MODE 1: TOWER & FLOOR & FLAT WISE HIERARCHICAL VIEW */}
      {viewMode === 'tower-floor-flat' && (
        <div ref={topTableRef} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <Layers size={18} style={{ color: currentTowerObj.color }} />
              {currentTowerObj.name}
            </h2>
          </div>

          {/* Search Result Banner (when active search) */}
          {searchTerm.trim() && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              backgroundColor: '#EFF6FF',
              border: '1px solid #BFDBFE',
              padding: '12px 18px',
              borderRadius: '10px',
              color: '#1E40AF'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Search size={18} style={{ color: '#2563EB', flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>
                    Search Results for <span style={{ color: '#1D4ED8', textDecoration: 'underline' }}>"{searchTerm}"</span>
                  </span>
                  <span style={{ fontSize: '0.8125rem', color: '#3B82F6', marginLeft: '8px' }}>
                    ({visibleFloorsList.reduce((sum, f) => sum + f.flats.length, 0)} matching flat(s) on {visibleFloorsList.length} floor(s) in {currentTowerObj.name})
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => setSearchTerm('')}
                  className="btn btn-secondary btn-xs"
                  style={{ borderRadius: '6px' }}
                >
                  <X size={12} /> Clear Filter
                </button>
              </div>
            </div>
          )}

          {/* Cross Tower Match Notification Banner */}
          {searchTerm.trim() && otherTowerMatches.length > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              backgroundColor: '#FFFBEB',
              border: '1px solid #FDE68A',
              padding: '12px 18px',
              borderRadius: '10px',
              color: '#92400E'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Building2 size={18} style={{ color: '#D97706', flexShrink: 0 }} />
                <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>
                  Also found matches in other towers:
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                {otherTowerMatches.map(({ tower, matches }) => (
                  <button
                    key={tower.code}
                    onClick={() => setSelectedTower(tower.code)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '5px 12px',
                      borderRadius: '6px',
                      border: '1px solid #F59E0B',
                      backgroundColor: '#FFFFFF',
                      color: '#B45309',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    <span>View {matches.length} in {tower.name}</span>
                    <span>→</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Empty Search State */}
          {visibleFloorsList.length === 0 && (
            <div className="glass-card" style={{ padding: '48px 24px', textAlign: 'center', borderRadius: '12px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                color: '#EF4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <Search size={24} />
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                No flats found matching "{searchTerm}" in {currentTowerObj.name}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: '460px', margin: '0 auto 20px' }}>
                No matching flat number, resident name, or phone number found on {selectedFloor === 'All' ? `any of the ${currentTowerObj.floors} floors` : `Floor ${selectedFloor}`}.
              </p>

              {otherTowerMatches.length > 0 ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  {otherTowerMatches.map(({ tower, matches }) => (
                    <button
                      key={tower.code}
                      onClick={() => setSelectedTower(tower.code)}
                      className="btn btn-primary btn-sm"
                    >
                      Switch to {tower.name} ({matches.length} match{matches.length > 1 ? 'es' : ''})
                    </button>
                  ))}
                  <button
                    onClick={() => setSearchTerm('')}
                    className="btn btn-secondary btn-sm"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchTerm('')}
                  className="btn btn-secondary btn-sm"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}

          {/* Floor-by-Floor Hierarchy Rendering (Paginated 3 floors per page) */}
          {paginatedFloors.map(floor => (
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
                    {searchTerm.trim() && (
                      <span style={{
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        backgroundColor: '#DCFCE7',
                        color: '#16A34A',
                        padding: '2px 8px',
                        borderRadius: '6px'
                      }}>
                        {floor.flats.length} Matching Flat(s)
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.75rem', color: '#16A34A', fontWeight: 700, backgroundColor: '#DCFCE7', padding: '2px 8px', borderRadius: '10px' }}>
                      {floor.flats.filter(f => f.occupied).length} Occupied
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#B45309', fontWeight: 700, backgroundColor: '#FEF3C7', padding: '2px 8px', borderRadius: '10px' }}>
                      {floor.flats.filter(f => !f.occupied).length} Unoccupied
                    </span>
                  </div>
                </div>

                {/* Flat Table for this Floor */}
                <div className="table-responsive" style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-hover)' }}>
                        <th style={{ padding: '10px 14px', fontWeight: 800, color: 'var(--text-secondary)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Flat No</th>
                        <th style={{ padding: '10px 14px', fontWeight: 800, color: 'var(--text-secondary)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                        <th style={{ padding: '10px 14px', fontWeight: 800, color: 'var(--text-secondary)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Resident / Allottee</th>
                        <th style={{ padding: '10px 14px', fontWeight: 800, color: 'var(--text-secondary)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact Phone</th>
                        <th style={{ padding: '10px 14px', fontWeight: 800, color: 'var(--text-secondary)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Parking Slot</th>
                        <th style={{ padding: '10px 14px', fontWeight: 800, color: 'var(--text-secondary)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {floor.flats.map((flatItem) => {
                        const res = flatItem.resident;
                        const isOccupied = !!res;

                        return (
                          <tr 
                            key={flatItem.flatNo}
                            style={{ 
                              borderBottom: '1px solid var(--border-color)',
                              backgroundColor: isOccupied ? 'transparent' : '#FFFBEB',
                              borderLeft: isOccupied ? '4px solid #3B82F6' : '4px solid #F59E0B',
                              transition: 'background-color 0.15s ease'
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = isOccupied ? 'var(--bg-hover)' : '#FEF3C7'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = isOccupied ? 'transparent' : '#FFFBEB'}
                          >
                            {/* Flat No */}
                            <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ 
                                  fontWeight: 800, 
                                  fontSize: '0.875rem',
                                  color: isOccupied ? 'var(--text-primary)' : '#92400E',
                                  backgroundColor: searchTerm.trim() ? '#FEF9C3' : 'transparent',
                                  border: searchTerm.trim() ? '1px solid #FDE047' : 'none',
                                  padding: searchTerm.trim() ? '2px 6px' : '0',
                                  borderRadius: '4px'
                                }}>
                                  {flatItem.flatNo}
                                </span>
                                {res?.designation && (
                                  <span style={{
                                    fontSize: '0.625rem',
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
                              </div>
                            </td>

                            {/* Status */}
                            <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                              {isOccupied ? (
                                <span style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '5px',
                                  padding: '3px 8px',
                                  borderRadius: '9999px',
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  backgroundColor: res.type === 'Flat Owner' ? 'rgba(99, 102, 241, 0.12)' : 'rgba(34, 211, 238, 0.15)',
                                  color: res.type === 'Flat Owner' ? '#4F46E5' : '#0891B2',
                                  border: res.type === 'Flat Owner' ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid rgba(34, 211, 238, 0.3)'
                                }}>
                                  <span style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    backgroundColor: res.type === 'Flat Owner' ? '#4F46E5' : '#0891B2'
                                  }} />
                                  {res.type}
                                </span>
                              ) : (
                                <span style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '5px',
                                  padding: '3px 8px',
                                  borderRadius: '9999px',
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  backgroundColor: '#FEF3C7',
                                  color: '#92400E',
                                  border: '1px solid #FDE68A'
                                }}>
                                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#D97706' }} />
                                  Unoccupied / Vacant
                                </span>
                              )}
                            </td>

                            {/* Resident / Allottee */}
                            <td style={{ padding: '10px 14px' }}>
                              {isOccupied ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <div style={{
                                    width: '28px',
                                    height: '28px',
                                    borderRadius: '50%',
                                    backgroundColor: res.designation?.includes('President') && !res.designation?.includes('Vice') ? '#F59E0B' : res.type === 'Flat Owner' ? '#6366F1' : '#0EA5E9',
                                    color: '#FFFFFF',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 800,
                                    fontSize: '0.6875rem',
                                    flexShrink: 0
                                  }}>
                                    {res.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                                  </div>
                                  <div>
                                    <div style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--text-primary)' }}>
                                      {res.name}
                                    </div>
                                    {res.email && (
                                      <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                                        {res.email}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <span style={{ fontSize: '0.75rem', color: '#92400E', fontWeight: 500, fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <Home size={12} style={{ color: '#D97706' }} />
                                  Available for occupancy or title verification
                                </span>
                              )}
                            </td>

                            {/* Contact Phone */}
                            <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                              {isOccupied ? (
                                <a 
                                  href={`tel:${res.phone}`}
                                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.8125rem' }}
                                >
                                  <Phone size={12} style={{ color: 'var(--electric-blue)' }} />
                                  <span>{res.phone}</span>
                                </a>
                              ) : (
                                <span style={{ color: 'var(--text-muted)' }}>—</span>
                              )}
                            </td>

                            {/* Parking Slot */}
                            <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                              {isOccupied ? (
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                                  <Car size={12} style={{ color: 'var(--text-muted)' }} />
                                  {res.parking || 'Unassigned'}
                                </span>
                              ) : (
                                <span style={{ color: 'var(--text-muted)' }}>—</span>
                              )}
                            </td>

                            {/* Action */}
                            <td style={{ padding: '10px 14px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                              {isOccupied ? (
                                <button
                                  className="btn btn-secondary btn-xs"
                                  onClick={() => setSelectedResidentModal(res)}
                                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px' }}
                                >
                                  <Eye size={12} />
                                  <span>View Profile</span>
                                </button>
                              ) : (
                                <button
                                  className="btn btn-xs"
                                  onClick={() => setActiveTab('register')}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    padding: '4px 10px',
                                    backgroundColor: '#FEF3C7',
                                    color: '#92400E',
                                    border: '1px solid #FCD34D',
                                    fontWeight: 700,
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.15s ease'
                                  }}
                                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FDE68A'}
                                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FEF3C7'}
                                >
                                  <UserPlus size={12} />
                                  <span>+ Assign Resident</span>
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

          {/* Floor Pagination Controls (Every 3 Floors) */}
          {totalFloorPages > 1 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              backgroundColor: 'var(--card-bg, #FFFFFF)',
              padding: '14px 20px',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
              marginTop: '6px'
            }}>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                Showing floors <strong style={{ color: 'var(--text-primary)' }}>{paginatedFloors[0]?.floorNumber}</strong> to <strong style={{ color: 'var(--text-primary)' }}>{paginatedFloors[paginatedFloors.length - 1]?.floorNumber}</strong> of <strong style={{ color: 'var(--text-primary)' }}>{visibleFloorsList.length}</strong> total floors (Page {currentFloorPage} of {totalFloorPages})
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {/* Previous Page Arrow */}
                <button
                  onClick={() => handlePageChange(Math.max(1, currentFloorPage - 1))}
                  disabled={currentFloorPage === 1}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-hover)',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: currentFloorPage === 1 ? 0.35 : 1,
                    cursor: currentFloorPage === 1 ? 'not-allowed' : 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  title="Previous Page"
                  aria-label="Previous Page"
                >
                  <ChevronLeft size={16} />
                </button>

                {/* Page number buttons */}
                {Array.from({ length: totalFloorPages }, (_, i) => i + 1)
                  .filter(page => {
                    if (totalFloorPages <= 7) return true;
                    if (page === 1 || page === totalFloorPages) return true;
                    return Math.abs(page - currentFloorPage) <= 1;
                  })
                  .reduce((acc, page, idx, arr) => {
                    if (idx > 0 && page - arr[idx - 1] > 1) {
                      acc.push('ellipsis-' + page);
                    }
                    acc.push(page);
                    return acc;
                  }, [])
                  .map((item) => {
                    if (typeof item === 'string' && item.startsWith('ellipsis')) {
                      return (
                        <span key={item} style={{ padding: '0 4px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                          …
                        </span>
                      );
                    }
                    const pageNum = item;
                    const isCurrent = pageNum === currentFloorPage;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          border: isCurrent ? '1px solid var(--electric-blue)' : '1px solid var(--border-color)',
                          backgroundColor: isCurrent ? 'var(--electric-blue)' : 'var(--bg-hover)',
                          color: isCurrent ? '#FFFFFF' : 'var(--text-primary)',
                          fontWeight: isCurrent ? 800 : 600,
                          fontSize: '0.8125rem',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                {/* Next Page Arrow */}
                <button
                  onClick={() => handlePageChange(Math.min(totalFloorPages, currentFloorPage + 1))}
                  disabled={currentFloorPage === totalFloorPages}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-hover)',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: currentFloorPage === totalFloorPages ? 0.35 : 1,
                    cursor: currentFloorPage === totalFloorPages ? 'not-allowed' : 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  title="Next Page"
                  aria-label="Next Page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE 2: COMPLETE DIRECTORY TABLE LIST */}
      {viewMode === 'list' && (
        <div className="glass-card" ref={listTableRef}>
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

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                <span>Per Page:</span>
                <select
                  className="form-control"
                  value={itemsPerPage}
                  onChange={e => {
                    setItemsPerPage(Number(e.target.value));
                    setListPage(1);
                  }}
                  style={{ width: 'auto', padding: '4px 8px', height: '32px' }}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>

            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              Showing <strong>{filteredResidents.length > 0 ? startListIndex + 1 : 0} - {endListIndex}</strong> of <strong>{filteredResidents.length}</strong> residents
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
                {paginatedResidents.length === 0 ? (
                  <tr>
                    <td colSpan={9} style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
                      No residents match your filter criteria.
                    </td>
                  </tr>
                ) : (
                  paginatedResidents.map(res => (
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
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* List Pagination Bar */}
          {filteredResidents.length > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              paddingTop: '16px',
              marginTop: '12px',
              borderTop: '1px solid var(--border-color)'
            }}>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                Page <strong>{listPage}</strong> of <strong>{totalListPages}</strong> ({filteredResidents.length} total residents)
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleListPageChange(1)}
                  disabled={listPage === 1}
                  style={{ padding: '6px 10px', opacity: listPage === 1 ? 0.4 : 1, cursor: listPage === 1 ? 'not-allowed' : 'pointer' }}
                  title="First Page"
                >
                  <ChevronsLeft size={14} />
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleListPageChange(listPage - 1)}
                  disabled={listPage === 1}
                  style={{ padding: '6px 10px', opacity: listPage === 1 ? 0.4 : 1, cursor: listPage === 1 ? 'not-allowed' : 'pointer' }}
                  title="Previous Page"
                >
                  <ChevronLeft size={14} />
                </button>

                {/* Numbered Page Buttons */}
                {(() => {
                  const pages = [];
                  const maxButtons = 5;
                  let startPage = Math.max(1, listPage - 2);
                  let endPage = Math.min(totalListPages, startPage + maxButtons - 1);
                  if (endPage - startPage < maxButtons - 1) {
                    startPage = Math.max(1, endPage - maxButtons + 1);
                  }
                  for (let p = startPage; p <= endPage; p++) {
                    pages.push(p);
                  }
                  return pages.map(pageNum => (
                    <button
                      key={pageNum}
                      onClick={() => handleListPageChange(pageNum)}
                      className={`btn btn-sm ${listPage === pageNum ? 'btn-primary' : 'btn-secondary'}`}
                      style={{
                        padding: '6px 12px',
                        minWidth: '32px',
                        fontWeight: listPage === pageNum ? 700 : 500
                      }}
                    >
                      {pageNum}
                    </button>
                  ));
                })()}

                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleListPageChange(listPage + 1)}
                  disabled={listPage === totalListPages}
                  style={{ padding: '6px 10px', opacity: listPage === totalListPages ? 0.4 : 1, cursor: listPage === totalListPages ? 'not-allowed' : 'pointer' }}
                  title="Next Page"
                >
                  <ChevronRight size={14} />
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleListPageChange(totalListPages)}
                  disabled={listPage === totalListPages}
                  style={{ padding: '6px 10px', opacity: listPage === totalListPages ? 0.4 : 1, cursor: listPage === totalListPages ? 'not-allowed' : 'pointer' }}
                  title="Last Page"
                >
                  <ChevronsRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Resident & Flat Dossier Modal */}
      <Modal
        isOpen={!!selectedResidentModal}
        onClose={() => {
          setSelectedResidentModal(null);
          setIsEditingModal(false);
        }}
        title={isEditingModal ? `Edit Details • ${selectedResidentModal?.flat}` : (selectedResidentModal?.name || 'Resident Details')}
        subtitle={`Flat ${selectedResidentModal?.flat} • ${selectedResidentModal?.tower} (${selectedResidentModal?.apartment})`}
        maxWidth="620px"
      >
        {selectedResidentModal && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* When editing, render clean Name & Type fields */}
            {isEditingModal && (
              <div className="glass-card" style={{ padding: '12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                      RESIDENT NAME
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={editForm.name}
                      onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                      placeholder="Resident Full Name"
                      style={{
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        width: '100%'
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                      RESIDENT TYPE
                    </label>
                    <select
                      className="form-control"
                      value={editForm.type}
                      onChange={e => setEditForm({ ...editForm, type: e.target.value })}
                      style={{
                        padding: '6px 10px',
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        borderRadius: '6px',
                        width: '100%'
                      }}
                    >
                      <option value="Flat Owner">Flat Owner</option>
                      <option value="Tenant">Tenant</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* 4 Cards Grid */}
            <div className="grid-cols-2" style={{ gap: '12px' }}>
              {/* Card 1: CONTACT INFORMATION */}
              <div className="glass-card" style={{ padding: '12px' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '4px' }}>
                  CONTACT INFORMATION
                </div>
                {isEditingModal ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                    <div>
                      <label style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '2px' }}>Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        value={editForm.phone}
                        onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                        placeholder="+91..."
                        style={{
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          padding: '5px 10px',
                          borderRadius: '6px',
                          width: '100%'
                        }}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '2px' }}>Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        value={editForm.email}
                        onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                        placeholder="email@example.com"
                        style={{
                          fontSize: '0.75rem',
                          padding: '5px 10px',
                          borderRadius: '6px',
                          width: '100%'
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={{ fontWeight: 700, marginTop: '4px', fontSize: '0.875rem' }}>{selectedResidentModal.phone}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{selectedResidentModal.email}</div>
                  </>
                )}
              </div>

              {/* Card 2: PARKING & VEHICLES */}
              <div className="glass-card" style={{ padding: '12px' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '4px' }}>
                  PARKING & VEHICLES
                </div>
                {isEditingModal ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                    <div>
                      <label style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '2px' }}>Parking Slot</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editForm.parking}
                        onChange={e => setEditForm({ ...editForm, parking: e.target.value })}
                        placeholder="Slot: P1-3801"
                        style={{
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          padding: '5px 10px',
                          borderRadius: '6px',
                          width: '100%'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '2px' }}>Vehicle Details</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editForm.vehicles}
                        onChange={e => setEditForm({ ...editForm, vehicles: e.target.value })}
                        placeholder="KA-03-VL-9413 (Kia Seltos)"
                        style={{
                          fontSize: '0.75rem',
                          padding: '5px 10px',
                          borderRadius: '6px',
                          width: '100%'
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={{ fontWeight: 700, marginTop: '4px', fontSize: '0.875rem' }}>Slot: {selectedResidentModal.parking || 'None'}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{selectedResidentModal.vehicles || 'No vehicle registered'}</div>
                  </>
                )}
              </div>

              {/* Card 3: TOWER LEVEL */}
              <div className="glass-card" style={{ padding: '12px' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  TOWER LEVEL
                </div>
                <div style={{ fontWeight: 700, marginTop: '4px', fontSize: '0.875rem' }}>{selectedResidentModal.tower}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Floor {selectedResidentModal.floor} (Elevator access)</div>
              </div>

              {/* Card 4: RWA VERIFICATION */}
              <div className="glass-card" style={{ padding: '12px' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  RWA VERIFICATION
                </div>
                <div style={{ fontWeight: 700, marginTop: '4px', fontSize: '0.875rem', color: 'var(--success)' }}>
                  ✓ Approved & Active
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Title deeds & KYC validated</div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
              {isEditingModal ? (
                <>
                  <button className="btn btn-secondary" onClick={() => setIsEditingModal(false)}>
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleSaveEdit}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Save size={14} /> Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button className="btn btn-secondary" onClick={() => setSelectedResidentModal(null)}>
                    Close
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleStartEdit(selectedResidentModal)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontWeight: 600,
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <Edit3 size={14} color="var(--electric-blue)" /> Edit
                  </button>
                  <a href={`tel:${selectedResidentModal.phone}`} className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={14} /> Call Resident
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
