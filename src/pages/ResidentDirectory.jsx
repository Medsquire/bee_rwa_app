import React, { useState } from 'react';
import { useRwa } from '../context/RwaContext';
import { ApartmentBadge, StatusPill } from '../components/CommonUI';
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
  UserPlus
} from 'lucide-react';

export const ResidentDirectory = () => {
  const { residents, selectedApartment, setSelectedApartment, apartments, setActiveTab } = useRwa();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const filteredResidents = residents.filter(r => {
    const matchesApt = selectedApartment === 'All' || r.apartment === selectedApartment;
    const matchesType = typeFilter === 'All' || r.type === typeFilter;
    const matchesSearch = 
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.flat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone.includes(searchTerm) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.parking && r.parking.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (r.vehicles && r.vehicles.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesApt && matchesType && matchesSearch;
  });

  const ownersCount = residents.filter(r => r.type === 'Flat Owner').length;
  const tenantsCount = residents.filter(r => r.type === 'Tenant').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Resident Directory</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Enclave resident registry across Golden, Silver, and Diamond Apartments
          </p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('register')}>
          <UserPlus size={16} /> Add Resident
        </button>
      </div>

      {/* Directory Metrics */}
      <div className="grid-cols-4">
        <div className="glass-card">
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600 }}>TOTAL RESIDENTS</div>
          <div className="stat-value" style={{ marginTop: '4px' }}>{residents.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Registered in directory</div>
        </div>
        <div className="glass-card">
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600 }}>FLAT OWNERS</div>
          <div className="stat-value" style={{ marginTop: '4px', color: 'var(--indigo)' }}>{ownersCount}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Primary title deed holders</div>
        </div>
        <div className="glass-card">
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600 }}>TENANTS</div>
          <div className="stat-value" style={{ marginTop: '4px', color: 'var(--electric-blue)' }}>{tenantsCount}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Leaseholders with owner NOC</div>
        </div>
        <div className="glass-card">
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600 }}>CURRENT FILTER</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '8px' }}>{selectedApartment}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Showing {filteredResidents.length} match(es)</div>
        </div>
      </div>

      {/* Directory Table Card */}
      <div className="glass-card">
        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: '280px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search resident, flat, vehicle..." 
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
                <th>Apartment Complex</th>
                <th>Flat No</th>
                <th>Resident Type</th>
                <th>Contact Info</th>
                <th>Parking Slot</th>
                <th>Vehicles</th>
                <th>Status</th>
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
                        backgroundColor: res.type === 'Flat Owner' ? 'var(--electric-blue)' : 'var(--indigo)',
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
                  <td><ApartmentBadge apartment={res.apartment} /></td>
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
