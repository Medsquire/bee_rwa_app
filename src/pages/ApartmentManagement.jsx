import React, { useState } from 'react';
import { useRwa } from '../context/RwaContext';
import { ApartmentBadge, StatusPill } from '../components/CommonUI';
import { 
  Building2, 
  Layers, 
  Users, 
  Droplets, 
  Zap, 
  PhoneCall, 
  ShieldCheck, 
  MapPin, 
  Search,
  Filter,
  CheckCircle,
  Home
} from 'lucide-react';

export const ApartmentManagement = () => {
  const { 
    apartments, 
    residents, 
    selectedApartment, 
    setSelectedApartment,
    currentUser,
    setActiveTab
  } = useRwa();

  const [activeAptTab, setActiveAptTab] = useState(
    selectedApartment === 'All' ? apartments[0].name : selectedApartment
  );
  const [occupancyFilter, setOccupancyFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const currentApt = apartments.find(a => a.name === activeAptTab) || apartments[0];
  const aptResidents = residents.filter(r => r.apartment === currentApt.name);

  // Filter residents
  const filteredResidents = aptResidents.filter(r => {
    const matchesSearch = 
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.flat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone.includes(searchTerm);
    
    if (occupancyFilter === 'owners') return matchesSearch && r.type === 'Flat Owner';
    if (occupancyFilter === 'tenants') return matchesSearch && r.type === 'Tenant';
    return matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Apartment Complexes Management</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Infrastructure specifications, occupancy rosters, and common asset metrics for the 3 towers
          </p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('register')}>
          + Register New Resident
        </button>
      </div>

      {/* 3 Complex Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '12px',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '12px',
        overflowX: 'auto'
      }}>
        {apartments.map(apt => {
          const isSelected = activeAptTab === apt.name;
          return (
            <button
              key={apt.id}
              onClick={() => {
                setActiveAptTab(apt.name);
                setSelectedApartment(apt.name);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 20px',
                borderRadius: 'var(--radius-lg)',
                border: isSelected ? `2px solid ${apt.color}` : '1px solid var(--border-color)',
                backgroundColor: isSelected ? 'var(--bg-elevated)' : 'var(--bg-card)',
                color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: isSelected ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? 'var(--shadow-md)' : 'none'
              }}
            >
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: apt.color
              }} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.9375rem', fontWeight: 700 }}>{apt.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  {apt.towerCode} • {apt.occupiedFlats}/{apt.totalFlats} Flats
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Apartment Hero Overview Card */}
      <div className="glass-card" style={{ borderLeft: `6px solid ${currentApt.color}` }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-neutral">{currentApt.towerCode}</span>
              <span className="badge badge-success">Active & Habitable</span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '6px' }}>{currentApt.name}</h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={14} /> {currentApt.address}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '16px', backgroundColor: 'var(--bg-hover)', padding: '12px 18px', borderRadius: 'var(--radius-md)' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Monthly Maint. Pool</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                ₹ {currentApt.monthlyPool.toLocaleString('en-IN')}
              </div>
            </div>
            <div style={{ width: '1px', backgroundColor: 'var(--border-color)' }} />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Occupancy Rate</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--success)' }}>
                {Math.round((currentApt.occupiedFlats / currentApt.totalFlats) * 100)}%
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specs Grid */}
        <div className="grid-cols-4" style={{ marginBottom: '20px' }}>
          <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: 'var(--bg-hover)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>TOWER HEIGHT</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '2px' }}>{currentApt.floors} Floors</div>
            <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Reinforced RCC Structure</span>
          </div>
          <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: 'var(--bg-hover)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>ELEVATOR BANK</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '2px' }}>{currentApt.lifts} Passenger Lifts</div>
            <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Otis Automatic ARD System</span>
          </div>
          <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: 'var(--bg-hover)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>WATER STORAGE</span>
            <div style={{ fontSize: '1.125rem', fontWeight: 700, marginTop: '2px' }}>{currentApt.reservoirCapacity.split(' ')[0]} L</div>
            <span style={{ fontSize: '0.6875rem', color: 'var(--success)', fontWeight: 600 }}>{currentApt.reservoirCapacity.split('(')[1]?.replace(')', '') || 'Normal'}</span>
          </div>
          <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: 'var(--bg-hover)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>SECURITY DESK</span>
            <div style={{ fontSize: '0.9375rem', fontWeight: 700, marginTop: '2px' }}>{currentApt.securityContact}</div>
            <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Intercom Line #001</span>
          </div>
        </div>

        {/* Amenities & Wings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 700 }}>Dedicated Amenities & Enclave Wings:</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {currentApt.amenities.map((am, i) => (
              <span key={i} className="badge badge-cyan" style={{ padding: '5px 12px' }}>
                ✨ {am}
              </span>
            ))}
            {currentApt.blocks.map((bl, i) => (
              <span key={i} className="badge badge-neutral" style={{ padding: '5px 12px' }}>
                🏢 {bl}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Resident Flats Roster within this Apartment */}
      <div className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Residents & Flats Directory ({currentApt.name})</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Verified flat occupants, owners, and leaseholders
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search size={15} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search name, flat, phone..." 
                className="form-control"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '32px', width: '220px', height: '36px' }}
              />
            </div>

            {/* Filter */}
            <select 
              value={occupancyFilter} 
              onChange={e => setOccupancyFilter(e.target.value)}
              className="form-control"
              style={{ width: 'auto', height: '36px' }}
            >
              <option value="all">All Residents</option>
              <option value="owners">Flat Owners Only</option>
              <option value="tenants">Tenants Only</option>
            </select>
          </div>
        </div>

        {/* Resident Table */}
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Flat No</th>
                <th>Resident Name</th>
                <th>Resident Type</th>
                <th>Contact Phone</th>
                <th>Email Address</th>
                <th>Allotted Parking</th>
                <th>Registered Vehicle</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredResidents.map(res => (
                <tr key={res.id}>
                  <td style={{ fontWeight: 800, color: 'var(--electric-blue)' }}>{res.flat}</td>
                  <td style={{ fontWeight: 600 }}>{res.name}</td>
                  <td>
                    <span className={`badge ${res.type === 'Flat Owner' ? 'badge-indigo' : 'badge-neutral'}`}>
                      {res.type}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8125rem' }}>{res.phone}</td>
                  <td style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{res.email}</td>
                  <td style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{res.parking}</td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{res.vehicles}</td>
                  <td><StatusPill status={res.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
