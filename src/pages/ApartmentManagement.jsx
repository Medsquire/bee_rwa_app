import React, { useState } from 'react';
import { useRwa } from '../context/RwaContext';
import {
  Building2,
  Layers,
  ShieldCheck,
  Phone,
  Trees,
  CheckCircle2,
  AlertCircle,
  Clock,
  User,
  Wrench,
  ChevronRight
} from 'lucide-react';

export const ApartmentManagement = () => {
  const { apartments, selectedApartment, setSelectedApartment, userss, complaints, setActiveTab } = useRwa();

  const currentApt = apartments[0] || {
    id: 'apt-golden',
    name: 'Golden Apartment',
    towerCode: '3 Towers (GT-1, GT-2, GT-3)',
    totalFlats: 136,
    occupiedFlats: 128,
    floors: 12,
    lifts: 6,
    reservoirCapacity: '100,000 Litres (88% Full)',
    monthlyPool: 342000,
    address: 'Bee Property Enclave, Outer Ring Road, Bangalore 560103',
    amenities: ['Central Gymnasium', 'Rooftop Banquet Hall', 'EV Charging Bays', 'Children Play Zone', 'Otis Smart Elevators'],
    leadership: {
      president: 'Sujana',
      presidentTower: 'Golden Tower 1',
      presidentFlat: 'GT1-801 (Penthouse)',
      presidentPhone: '+91 98450 11223',
      vicePresident: 'Kavaya',
      vicePresidentTower: 'Golden Tower 2',
      vicePresidentFlat: 'GT2-604',
      vicePresidentPhone: '+91 98765 43210'
    },
    towers: [
      { id: 'gt-1', name: 'Golden Tower 1', code: 'Golden Tower 1', shortCode: 'GT-1', prefix: 'GT1', floors: 38, unitsPerFloor: 8, flats: 296, occupied: 275, lifts: 4, head: 'Sujana (President)', color: '#F59E0B' },
      { id: 'gt-2', name: 'Golden Tower 2', code: 'Golden Tower 2', shortCode: 'GT-2', prefix: 'GT2', floors: 35, unitsPerFloor: 8, flats: 270, occupied: 250, lifts: 4, head: 'Kavaya (Vice President)', color: '#EAB308' },
      { id: 'gt-3', name: 'Golden Tower 3', code: 'Golden Tower 3', shortCode: 'GT-3', prefix: 'GT3', floors: 32, unitsPerFloor: 8, flats: 256, occupied: 238, lifts: 4, head: 'RWA Service Desk', color: '#D97706' }
    ],
    securityContact: '+91 80 4123 7701',
    caretaker: 'Mr. Raghavan Pillai (+91 98451 22334)',
    color: '#F59E0B'
  };

  const aptStaff = userss.filter(e => e.complex === currentApt.name || e.complex === 'All Complexes');
  const aptComplaints = complaints.filter(c => c.apartment === currentApt.name);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Property & Common Asset Monitoring
        </h1>

      </div>

      {/* Leadership & Towers Banner */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        padding: '20px 24px',
        border: '1px solid #E2E8F0',
        borderLeft: '4px solid #F59E0B',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                {currentApt.name} — Infrastructure & Leadership
              </h2>
              {currentApt.name === 'Golden Apartment' && (
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  backgroundColor: '#FEF3C7',
                  color: '#B45309',
                  padding: '3px 10px',
                  borderRadius: '12px'
                }}>
                  👑 President's Residence Complex
                </span>
              )}
            </div>
            <div style={{ fontSize: '0.8125rem', color: '#64748B', marginTop: '4px' }}>
              {currentApt.address} • Security: {currentApt.securityContact}
            </div>
          </div>

          {currentApt.leadership?.president && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                backgroundColor: '#FFFBEB',
                border: '1px solid #FDE68A',
                borderRadius: '8px'
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: '#F59E0B',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.75rem'
                }}>
                  SJ
                </div>
                <div>
                  <div style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#B45309' }}>PRESIDENT</div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#0F172A' }}>
                    {currentApt.leadership.president}
                    <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#64748B', marginLeft: '6px' }}>
                      ({currentApt.leadership.presidentFlat || 'GT1-801'})
                    </span>
                  </div>
                </div>
              </div>

              {currentApt.leadership?.vicePresident && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  backgroundColor: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  borderRadius: '8px'
                }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: '#2563EB',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.75rem'
                  }}>
                    KV
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#1D4ED8' }}>VICE PRESIDENT</div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#0F172A' }}>
                      {currentApt.leadership.vicePresident}
                      <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#64748B', marginLeft: '6px' }}>
                        ({currentApt.leadership.vicePresidentFlat || 'GT2-604'})
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 3 Towers Breakdown Cards */}
        {currentApt.towers && currentApt.towers.length > 0 && (
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', letterSpacing: '0.04em', marginBottom: '10px' }}>
              TOWER BREAKDOWN ({currentApt.towers.length} TOWERS)
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: '12px'
            }}>
              {currentApt.towers.map(tow => (
                <div
                  key={tow.id}
                  style={{
                    backgroundColor: '#F8FAFC',
                    borderRadius: '10px',
                    border: '1px solid #E2E8F0',
                    borderTop: `3px solid ${tow.color || '#2563EB'}`,
                    padding: '14px 16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Building2 size={16} style={{ color: tow.color || '#2563EB' }} />
                      <span style={{ fontWeight: 800, fontSize: '0.9375rem', color: '#0F172A' }}>
                        {tow.name}
                      </span>
                    </div>
                    <span style={{
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      backgroundColor: '#F0FDF4',
                      color: '#16A34A',
                      padding: '2px 6px',
                      borderRadius: '6px'
                    }}>
                      ● Operational
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.75rem', marginTop: '10px' }}>
                    <div>
                      <span style={{ color: '#64748B' }}>Floors: </span>
                      <strong style={{ color: '#0F172A' }}>{tow.floors} Floors</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748B' }}>Flats: </span>
                      <strong style={{ color: '#0F172A' }}>{tow.flats} Units</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748B' }}>Elevators: </span>
                      <strong style={{ color: '#0F172A' }}>{tow.lifts || 2} Otis Lifts</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748B' }}>Occupied: </span>
                      <strong style={{ color: '#16A34A' }}>{tow.occupied || tow.flats} Units</strong>
                    </div>
                  </div>

                  {tow.head && (
                    <div style={{
                      marginTop: '10px',
                      paddingTop: '8px',
                      borderTop: '1px solid #E2E8F0',
                      fontSize: '0.6875rem',
                      color: '#64748B',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <span>Leadership:</span>
                      <strong style={{ color: '#0F172A' }}>{tow.head}</strong>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>


      {/* Assigned Staff & Maintenance Personnel for this Complex */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        padding: '20px 24px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Assigned Maintenance Team & Caretakers
            </h2>
            <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
              On-duty personnel stationed at {currentApt.name}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setActiveTab('agency')}
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <ShieldCheck size={14} color="#2563EB" />
              <span>Assigned Agencies</span>
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setActiveTab('users')}
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <span>All Staff Directory</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '12px'
        }}>
          {aptStaff.map(emp => (
            <div
              key={emp.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                borderRadius: '10px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: '#2563EB',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.875rem',
                flexShrink: 0
              }}>
                {emp.avatar}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: '0.8125rem', color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {emp.name}
                </div>
                <div style={{ fontSize: '0.6875rem', color: '#2563EB', fontWeight: 600 }}>
                  {emp.designation}
                </div>
                <div style={{ fontSize: '0.6875rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                  <Phone size={11} /> {emp.phone}
                </div>
              </div>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: emp.status === 'On Duty' ? '#10B981' : '#3B82F6',
                flexShrink: 0
              }} title={emp.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
