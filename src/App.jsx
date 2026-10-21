import React, { useEffect } from 'react';
import { RwaProvider, useRwa } from './context/RwaContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { RoleBanner } from './components/RoleBanner';

// Pages
import { Dashboard } from './pages/Dashboard';
import { ResidentRegistration } from './pages/ResidentRegistration';
import { ApartmentManagement } from './pages/ApartmentManagement';
import { ResidentDirectory } from './pages/ResidentDirectory';
import { RegistrationApprovals } from './pages/RegistrationApprovals';
import { ComplaintList } from './pages/ComplaintList';
import { SubmitComplaint } from './pages/SubmitComplaint';
import { FacilityOverview } from './pages/FacilityOverview';
import { FacilityBooking } from './pages/FacilityBooking';
import { MyBookings } from './pages/MyBookings';
import { FinanceDashboard } from './pages/FinanceDashboard';
import { MaintenanceDues } from './pages/MaintenanceDues';
import { TransactionsLedger } from './pages/TransactionsLedger';
import { Announcements } from './pages/Announcements';
import { NotificationsPage } from './pages/NotificationsPage';
import { UserProfile } from './pages/UserProfile';
import { SettingsPage } from './pages/SettingsPage';

import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

const AppContent = () => {
  const { activeTab, theme, toast } = useRwa();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Render active view component
  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'register':
        return <ResidentRegistration />;
      case 'apartments':
        return <ApartmentManagement />;
      case 'residents':
        return <ResidentDirectory />;
      case 'approvals':
        return <RegistrationApprovals />;
      case 'complaints':
        return <ComplaintList />;
      case 'submit-complaint':
        return <SubmitComplaint />;
      case 'facilities':
        return <FacilityOverview />;
      case 'book-facility':
        return <FacilityBooking />;
      case 'my-bookings':
        return <MyBookings />;
      case 'finance':
        return <FinanceDashboard />;
      case 'maintenance':
        return <MaintenanceDues />;
      case 'transactions':
        return <TransactionsLedger />;
      case 'announcements':
        return <Announcements />;
      case 'notifications':
        return <NotificationsPage />;
      case 'profile':
        return <UserProfile />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div className="app-layout">
        <Sidebar />
        <main className="main-wrapper">
          <div className="content-container">
            <RoleBanner />
            {renderPage()}
          </div>
        </main>
      </div>

      {/* Floating Toast Notification */}
      {toast && (
        <div className="toast-container">
          <div className={`toast toast-${toast.type}`}>
            {toast.type === 'success' && <CheckCircle2 size={18} style={{ color: 'var(--success)', flexShrink: 0 }} />}
            {toast.type === 'error' && <AlertCircle size={18} style={{ color: 'var(--error)', flexShrink: 0 }} />}
            {toast.type === 'warning' && <AlertCircle size={18} style={{ color: 'var(--warning)', flexShrink: 0 }} />}
            {toast.type === 'info' && <Info size={18} style={{ color: 'var(--cyan-blue)', flexShrink: 0 }} />}
            <span style={{ fontWeight: 500 }}>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <RwaProvider>
      <AppContent />
    </RwaProvider>
  );
}
