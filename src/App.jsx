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
import { EmployeeDirectory } from './pages/EmployeeDirectory';
import { AgencyManagement } from './pages/AgencyManagement';
import { LoginPage } from './pages/LoginPage';

import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

const AppContent = () => {
  const { activeTab, theme, toast, isAuthenticated } = useRwa();


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
      case 'property':
        return <ApartmentManagement />;
      case 'residents':
      case 'residence':
        return <ResidentDirectory />;
      case 'approvals':
        return <RegistrationApprovals />;
      case 'complaints':
      case 'complaint':
        return <ComplaintList />;
      case 'submit-complaint':
        return <SubmitComplaint />;
      case 'employee':
      case 'employees':
        return <EmployeeDirectory />;
      case 'agency':
      case 'agencies':
        return <AgencyManagement />;
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
      case 'annouments':
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

  // If user is not logged in, show the split/full-image Login Page
  if (!isAuthenticated) {
    return (
      <>
        <LoginPage />
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
      </>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', width: '100vw', overflow: 'hidden', backgroundColor: 'var(--bg-page)' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100vh', overflow: 'hidden' }}>
        <Header />
        <main className="main-wrapper" style={{ flex: 1, overflowY: 'auto' }}>
          <div className="content-container">
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
