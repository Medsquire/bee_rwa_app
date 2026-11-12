import React, { useState } from 'react';
import { useRwa } from '../context/RwaContext';
import { 
  Settings, 
  Moon, 
  Sun, 
  RefreshCw, 
  ShieldCheck, 
  Bell, 
  CheckCircle2, 
  Layers, 
  Info,
  Database
} from 'lucide-react';

export const SettingsPage = () => {
  const { 
    theme, 
    toggleTheme, 
    resetAllData, 
    currentRoleKey, 
    currentUser,
    showToast 
  } = useRwa();

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>System Settings & Preferences</h1>
      </div>

      {/* Appearance Section */}
      <div className="glass-card">
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '4px' }}>Theme & Appearance</h3>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          ZIVION high-contrast visual palette optimized for daylight and low-light environments
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-hover)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              backgroundColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(245, 158, 11, 0.2)',
              color: theme === 'dark' ? 'var(--cyan-blue)' : 'var(--warning)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>
                {theme === 'dark' ? 'Dark Navy Mode (Active)' : 'Light Crisp Mode (Active)'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {theme === 'dark' ? 'Deep Navy #060B14 background with luminous electric blue accents' : 'Crisp #F8FAFC light slate canvas with ultra-sharp typography'}
              </div>
            </div>
          </div>

          <button className="btn btn-secondary btn-sm" onClick={toggleTheme}>
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="glass-card">
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '4px' }}>Notification Channels</h3>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Configure simulated dispatch alerts for approvals, emergencies, and dues
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '8px', backgroundColor: 'var(--bg-hover)', cursor: 'pointer' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Email Notifications</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Receive digests on AGM notices and official circulars</div>
            </div>
            <input 
              type="checkbox" 
              checked={emailAlerts} 
              onChange={e => {
                setEmailAlerts(e.target.checked);
                showToast(`Email alerts ${e.target.checked ? 'enabled' : 'disabled'}`, 'info');
              }}
            />
          </label>

          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '8px', backgroundColor: 'var(--bg-hover)', cursor: 'pointer' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>SMS Urgent Broadcasts</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Critical alerts for water tank cleaning and lift shutdowns</div>
            </div>
            <input 
              type="checkbox" 
              checked={smsAlerts} 
              onChange={e => {
                setSmsAlerts(e.target.checked);
                showToast(`SMS alerts ${e.target.checked ? 'enabled' : 'disabled'}`, 'info');
              }}
            />
          </label>
        </div>
      </div>

      {/* Reset State Section */}
      <div className="glass-card" style={{ borderLeft: '4px solid var(--warning)' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '4px' }}>
          Demo Data Management & Factory Reset
        </h3>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Your interaction state (created complaints, approvals, bookings, expenses) is persisted locally in your browser's LocalStorage. Click below anytime to restore the default sample dataset.
        </p>

        <button 
          className="btn btn-danger btn-sm"
          onClick={() => {
            if (window.confirm('Restore all mock data back to factory default? Any new complaints or registrations created in this session will be reset.')) {
              resetAllData();
            }
          }}
        >
          <RefreshCw size={15} /> Reset Demo Data to Default
        </button>
      </div>

      {/* Technical Architecture Info */}
      <div className="glass-card">
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '8px' }}>
          BEE PROPERTY RWA Architecture Specs
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '0.8125rem' }}>
          <div style={{ backgroundColor: 'var(--bg-hover)', padding: '10px 12px', borderRadius: '6px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Frontend Framework:</span>
            <div style={{ fontWeight: 700 }}>React 19 + Vite</div>
          </div>
          <div style={{ backgroundColor: 'var(--bg-hover)', padding: '10px 12px', borderRadius: '6px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Styling Engine:</span>
            <div style={{ fontWeight: 700 }}>Pure Vanilla CSS Tokens</div>
          </div>
          <div style={{ backgroundColor: 'var(--bg-hover)', padding: '10px 12px', borderRadius: '6px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Iconography:</span>
            <div style={{ fontWeight: 700 }}>Lucide React</div>
          </div>
          <div style={{ backgroundColor: 'var(--bg-hover)', padding: '10px 12px', borderRadius: '6px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>PRD Scope:</span>
            <div style={{ fontWeight: 700 }}>19 Views / 5 Role Personas</div>
          </div>
        </div>
      </div>
    </div>
  );
};
