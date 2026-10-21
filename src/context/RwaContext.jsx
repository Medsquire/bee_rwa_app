import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_APARTMENTS,
  INITIAL_ROLES,
  INITIAL_REGISTRATION_REQUESTS,
  INITIAL_RESIDENTS_DIRECTORY,
  INITIAL_COMPLAINTS,
  INITIAL_FACILITIES,
  INITIAL_BOOKINGS,
  INITIAL_FINANCE_SUMMARY,
  INITIAL_MAINTENANCE_DUES,
  INITIAL_TRANSACTIONS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_NOTIFICATIONS
} from '../data/initialData';

const RwaContext = createContext();

const STORAGE_KEY_PREFIX = 'BEE_RWA_V1_';

export const RwaProvider = ({ children }) => {
  // Safe localStorage helper
  const loadStored = (key, fallback) => {
    try {
      const item = localStorage.getItem(STORAGE_KEY_PREFIX + key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  };

  const [currentRoleKey, setCurrentRoleKey] = useState(() => loadStored('ROLE', 'president'));
  const [selectedApartment, setSelectedApartment] = useState('All');
  const [activeTab, setActiveTab] = useState(() => loadStored('TAB', 'dashboard'));
  const [theme, setTheme] = useState(() => loadStored('THEME', 'light'));
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Core Data States
  const [apartments] = useState(INITIAL_APARTMENTS);
  const [residents, setResidents] = useState(() => loadStored('RESIDENTS', INITIAL_RESIDENTS_DIRECTORY));
  const [registrationRequests, setRegistrationRequests] = useState(() => loadStored('REQUESTS', INITIAL_REGISTRATION_REQUESTS));
  const [complaints, setComplaints] = useState(() => loadStored('COMPLAINTS', INITIAL_COMPLAINTS));
  const [facilities, setFacilities] = useState(() => loadStored('FACILITIES', INITIAL_FACILITIES));
  const [bookings, setBookings] = useState(() => loadStored('BOOKINGS', INITIAL_BOOKINGS));
  const [financeSummary, setFinanceSummary] = useState(() => loadStored('FINANCE_SUMM', INITIAL_FINANCE_SUMMARY));
  const [maintenanceDues, setMaintenanceDues] = useState(() => loadStored('DUES', INITIAL_MAINTENANCE_DUES));
  const [transactions, setTransactions] = useState(() => loadStored('TXNS', INITIAL_TRANSACTIONS));
  const [announcements, setAnnouncements] = useState(() => loadStored('ANNOUNCEMENTS', INITIAL_ANNOUNCEMENTS));
  const [notifications, setNotifications] = useState(() => loadStored('NOTIFICATIONS', INITIAL_NOTIFICATIONS));

  // Toast / Banner state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => setToast(null), 4500);
  };

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'ROLE', JSON.stringify(currentRoleKey));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'TAB', JSON.stringify(activeTab));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'THEME', JSON.stringify(theme));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'RESIDENTS', JSON.stringify(residents));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'REQUESTS', JSON.stringify(registrationRequests));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'COMPLAINTS', JSON.stringify(complaints));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'FACILITIES', JSON.stringify(facilities));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'BOOKINGS', JSON.stringify(bookings));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'FINANCE_SUMM', JSON.stringify(financeSummary));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'DUES', JSON.stringify(maintenanceDues));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'TXNS', JSON.stringify(transactions));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'ANNOUNCEMENTS', JSON.stringify(announcements));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'NOTIFICATIONS', JSON.stringify(notifications));
    } catch (e) {
      console.warn('Storage sync issue:', e);
    }
  }, [
    currentRoleKey, activeTab, theme, residents, registrationRequests,
    complaints, facilities, bookings, financeSummary, maintenanceDues,
    transactions, announcements, notifications
  ]);

  // Current active user profile
  const currentUser = INITIAL_ROLES[currentRoleKey] || INITIAL_ROLES.president;

  // Role switching
  const switchRole = (newRoleKey) => {
    if (INITIAL_ROLES[newRoleKey]) {
      setCurrentRoleKey(newRoleKey);
      showToast(`Switched active demo role to ${INITIAL_ROLES[newRoleKey].roleTitle}`, 'info');
    }
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // 1. REGISTRATION APPROVAL ACTIONS (President)
  const approveRequest = (requestId, reviewNotes = '') => {
    const target = registrationRequests.find(r => r.id === requestId);
    if (!target) return;

    setRegistrationRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: 'Approved',
          approvedBy: `${currentUser.name} (${currentUser.roleTitle})`,
          approvedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          notes: reviewNotes || req.notes || 'Approved after document review.'
        };
      }
      return req;
    }));

    // Add to resident directory
    const newResident = {
      id: `res-${Date.now()}`,
      name: target.applicantName,
      apartment: target.apartment,
      flat: target.flatNumber,
      type: target.residentType,
      phone: target.phone,
      email: target.email,
      status: 'Active',
      vehicles: 'Pending registration',
      parking: 'Allocated upon move-in'
    };
    setResidents(prev => [newResident, ...prev]);

    // Add notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      roleTarget: 'president',
      title: 'Registration Approved',
      message: `${target.applicantName} approved for ${target.apartment} (${target.flatNumber}).`,
      timestamp: 'Just now',
      read: false,
      type: 'approval',
      actionTab: 'residents'
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast(`Approved registration for ${target.applicantName} (${target.flatNumber})`, 'success');
  };

  const rejectRequest = (requestId, reason) => {
    const target = registrationRequests.find(r => r.id === requestId);
    if (!target) return;

    setRegistrationRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: 'Rejected',
          rejectedBy: `${currentUser.name} (${currentUser.roleTitle})`,
          rejectedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          notes: reason || 'Rejected due to incomplete or unverified documents.'
        };
      }
      return req;
    }));

    showToast(`Rejected registration for ${target.applicantName}`, 'warning');
  };

  // Resident Self Registration Submission
  const submitRegistration = (formData) => {
    const newId = `REG-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newReq = {
      id: newId,
      applicantName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      residentType: formData.residentType,
      apartment: formData.apartment,
      flatNumber: formData.flatNumber,
      ownerName: formData.ownerName || '',
      documentStatus: formData.docName || 'Ownership / Lease Proof Uploaded',
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Pending',
      notes: formData.remarks || 'Resident self-submitted application from portal.'
    };

    setRegistrationRequests(prev => [newReq, ...prev]);

    // Alert President
    const newNotif = {
      id: `notif-${Date.now()}`,
      roleTarget: 'president',
      title: 'New Resident Access Request',
      message: `${formData.fullName} has submitted a registration request for ${formData.apartment} (${formData.flatNumber}).`,
      timestamp: 'Just now',
      read: false,
      type: 'approval',
      actionTab: 'approvals'
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast(`Registration request #${newId} submitted successfully for President review!`, 'success');
    return newId;
  };

  // 2. COMPLAINT ACTIONS
  const submitComplaint = (data) => {
    const newId = `CMP-2026-0${Math.floor(90 + Math.random() * 900)}`;
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newComplaint = {
      id: newId,
      title: data.title,
      category: data.category,
      apartment: data.apartment || currentUser.apartment,
      location: data.location,
      description: data.description,
      priority: data.priority || 'Medium',
      status: 'Submitted',
      submittedBy: `${currentUser.name} (${currentUser.flatNumber})`,
      submittedByRole: currentUser.roleTitle,
      assignedTo: 'Unassigned',
      assignedDate: '',
      createdAt: nowStr,
      updatedAt: nowStr,
      hasAttachment: !!data.hasAttachment,
      history: [
        { timestamp: nowStr, text: `Complaint registered by ${currentUser.name}`, author: currentUser.roleTitle }
      ]
    };

    setComplaints(prev => [newComplaint, ...prev]);

    // Alert VP & President
    const newNotif = {
      id: `notif-${Date.now()}`,
      roleTarget: 'vice_president',
      title: `New Complaint: ${data.title.substring(0, 35)}...`,
      message: `Priority: ${data.priority} | ${data.apartment} - ${data.location}`,
      timestamp: 'Just now',
      read: false,
      type: 'complaint',
      actionTab: 'complaints'
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast(`Complaint #${newId} submitted successfully!`, 'success');
    return newId;
  };

  const updateComplaintStatus = (complaintId, newStatus, updateNote = '') => {
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    setComplaints(prev => prev.map(cmp => {
      if (cmp.id === complaintId) {
        const historyEntry = {
          timestamp: nowStr,
          text: updateNote || `Status updated to ${newStatus} by ${currentUser.name}`,
          author: currentUser.roleTitle
        };
        return {
          ...cmp,
          status: newStatus,
          updatedAt: nowStr,
          history: [...cmp.history, historyEntry]
        };
      }
      return cmp;
    }));

    showToast(`Complaint #${complaintId} marked as ${newStatus}`, 'info');
  };

  const assignComplaint = (complaintId, technicianName) => {
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    setComplaints(prev => prev.map(cmp => {
      if (cmp.id === complaintId) {
        const historyEntry = {
          timestamp: nowStr,
          text: `Assigned to ${technicianName} by ${currentUser.name}`,
          author: currentUser.roleTitle
        };
        return {
          ...cmp,
          assignedTo: technicianName,
          assignedDate: nowStr,
          status: cmp.status === 'Submitted' ? 'Assigned' : cmp.status,
          updatedAt: nowStr,
          history: [...cmp.history, historyEntry]
        };
      }
      return cmp;
    }));

    showToast(`Assigned complaint #${complaintId} to ${technicianName}`, 'success');
  };

  // 3. FACILITY & BOOKING ACTIONS
  const toggleFacilityStatus = (facilityId, newStatus, notes = '') => {
    setFacilities(prev => prev.map(fac => {
      if (fac.id === facilityId) {
        return {
          ...fac,
          status: newStatus,
          maintenanceNotes: notes || fac.maintenanceNotes
        };
      }
      return fac;
    }));

    showToast(`Updated facility operational status to ${newStatus}`, 'info');
  };

  // Safe Conflict-Free Booking
  const addBooking = ({ facilityId, date, timeSlot, purpose, participants }) => {
    const facility = facilities.find(f => f.id === facilityId);
    if (!facility) {
      showToast('Facility not found', 'error');
      return { success: false, error: 'Invalid facility' };
    }

    if (facility.status === 'Closed' || facility.status === 'Maintenance') {
      showToast(`${facility.name} is currently under maintenance or closed.`, 'error');
      return { success: false, error: 'Facility unavailable due to maintenance.' };
    }

    // CHECK CONFLICT: Overlapping confirmed booking for the same facility on the same date and slot
    const hasConflict = bookings.some(b => 
      b.facilityId === facilityId &&
      b.date === date &&
      b.timeSlot === timeSlot &&
      b.status === 'Confirmed'
    );

    if (hasConflict) {
      showToast(`Conflict detected: ${facility.name} is already booked on ${date} for ${timeSlot}. Please pick another slot.`, 'error');
      return { success: false, error: 'Time slot already booked.' };
    }

    const newBooking = {
      id: `BK-2026-${Math.floor(500 + Math.random() * 500)}`,
      facilityId: facility.id,
      facilityName: facility.name,
      date,
      timeSlot,
      bookedBy: currentUser.name,
      apartment: currentUser.apartment,
      flatNumber: currentUser.flatNumber,
      status: 'Confirmed',
      purpose: purpose || 'Sports & Fitness session',
      participants: parseInt(participants) || 1,
      bookedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setBookings(prev => [newBooking, ...prev]);

    // Add notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      roleTarget: currentRoleKey,
      title: 'Facility Booking Confirmed',
      message: `${facility.name} on ${date} (${timeSlot}) is reserved for ${currentUser.flatNumber}.`,
      timestamp: 'Just now',
      read: false,
      type: 'facility',
      actionTab: 'my-bookings'
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast(`Booking confirmed for ${facility.name} on ${date} (${timeSlot})!`, 'success');
    return { success: true, booking: newBooking };
  };

  const cancelBooking = (bookingId) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: 'Cancelled' };
      }
      return b;
    }));

    showToast(`Booking #${bookingId} has been cancelled. Slot is now released.`, 'info');
  };

  // 4. FINANCIAL & DUES ACTIONS
  const recordMaintenancePayment = (dueId, paymentAmount, mode = 'UPI') => {
    const due = maintenanceDues.find(d => d.id === dueId);
    if (!due) return;

    const amountNum = parseFloat(paymentAmount) || due.outstanding;
    const newPaid = due.amountPaid + amountNum;
    const newOutstanding = Math.max(0, due.amountDue - newPaid);
    const newStatus = newOutstanding === 0 ? 'Paid' : 'Partial';
    const nowStr = new Date().toISOString().split('T')[0];

    // Update Dues list
    setMaintenanceDues(prev => prev.map(d => {
      if (d.id === dueId) {
        return {
          ...d,
          amountPaid: newPaid,
          outstanding: newOutstanding,
          status: newStatus,
          paidDate: nowStr,
          mode
        };
      }
      return d;
    }));

    // Add Income Transaction
    const newTxn = {
      id: `TXN-${Date.now().toString().slice(-4)}`,
      description: `Maintenance payment for ${due.flat} (${due.residentName}) - ${due.billingPeriod}`,
      type: 'Income',
      category: 'Maintenance Fees',
      amount: amountNum,
      apartment: due.apartment,
      date: nowStr,
      method: mode,
      status: 'Completed',
      ref: `REC-${due.flat}-${Math.floor(1000 + Math.random() * 9000)}`
    };
    setTransactions(prev => [newTxn, ...prev]);

    // Recalculate Finance Summary
    setFinanceSummary(prev => {
      const newIncome = prev.totalIncome + amountNum;
      const newDuesPending = Math.max(0, prev.totalDuesPending - amountNum);
      return {
        ...prev,
        totalIncome: newIncome,
        totalDuesPending: newDuesPending
      };
    });

    showToast(`Recorded payment of ₹${amountNum.toLocaleString('en-IN')} for ${due.flat} via ${mode}`, 'success');
  };

  const addTransaction = (txnData) => {
    const amountNum = parseFloat(txnData.amount) || 0;
    const nowStr = txnData.date || new Date().toISOString().split('T')[0];

    const newTxn = {
      id: `TXN-${Date.now().toString().slice(-4)}`,
      description: txnData.description,
      type: txnData.type, // 'Income' or 'Expense'
      category: txnData.category,
      amount: amountNum,
      apartment: txnData.apartment || 'All Apartments',
      date: nowStr,
      method: txnData.method || 'Direct Bank Transfer',
      status: 'Completed',
      ref: txnData.ref || `MANUAL-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setTransactions(prev => [newTxn, ...prev]);

    setFinanceSummary(prev => {
      if (txnData.type === 'Income') {
        return { ...prev, totalIncome: prev.totalIncome + amountNum };
      } else {
        return { ...prev, totalExpenses: prev.totalExpenses + amountNum };
      }
    });

    showToast(`Added ${txnData.type} entry of ₹${amountNum.toLocaleString('en-IN')}`, 'success');
  };

  // 5. ANNOUNCEMENT ACTIONS
  const publishAnnouncement = (data) => {
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newId = `ANN-${Math.floor(400 + Math.random() * 500)}`;

    const newAnnouncement = {
      id: newId,
      title: data.title,
      description: data.description,
      category: data.category || 'General Notice',
      apartmentScope: data.apartmentScope || 'All Apartments',
      targetAudience: data.targetAudience || 'All Residents',
      priority: data.priority || 'Medium',
      publishedBy: `${currentUser.name} (${currentUser.roleTitle})`,
      publishedDate: nowStr,
      pinned: !!data.pinned
    };

    setAnnouncements(prev => [newAnnouncement, ...prev]);

    // Broadcast notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      roleTarget: 'all',
      title: `Announcement: ${data.title.substring(0, 30)}...`,
      message: `Priority: ${data.priority} | Scope: ${data.apartmentScope}`,
      timestamp: 'Just now',
      read: false,
      type: 'announcement',
      actionTab: 'announcements'
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast(`Published announcement #${newId} to ${data.apartmentScope}`, 'success');
  };

  const deleteAnnouncement = (id) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    showToast('Announcement removed', 'info');
  };

  // 6. NOTIFICATION ACTIONS
  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  // Reset all mock state
  const resetAllData = () => {
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(STORAGE_KEY_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (e) {
      console.warn(e);
    }

    setCurrentRoleKey('president');
    setSelectedApartment('All');
    setActiveTab('dashboard');
    setResidents(INITIAL_RESIDENTS_DIRECTORY);
    setRegistrationRequests(INITIAL_REGISTRATION_REQUESTS);
    setComplaints(INITIAL_COMPLAINTS);
    setFacilities(INITIAL_FACILITIES);
    setBookings(INITIAL_BOOKINGS);
    setFinanceSummary(INITIAL_FINANCE_SUMMARY);
    setMaintenanceDues(INITIAL_MAINTENANCE_DUES);
    setTransactions(INITIAL_TRANSACTIONS);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setNotifications(INITIAL_NOTIFICATIONS);

    showToast('All demo data reset to default successfully!', 'success');
  };

  // DYNAMIC COMPUTATIONS
  // PRD calculation: Available Balance = Opening Balance + Total Income − Total Expenses
  const dynamicAvailableBalance = financeSummary.openingBalance + financeSummary.totalIncome - financeSummary.totalExpenses;

  // Role permissions checking helper
  const canAccess = (featureKey) => {
    // President has access to everything
    if (currentRoleKey === 'president') return true;
    return currentUser.permissions.includes(featureKey);
  };

  return (
    <RwaContext.Provider
      value={{
        currentRoleKey,
        currentUser,
        switchRole,
        roles: INITIAL_ROLES,
        selectedApartment,
        setSelectedApartment,
        activeTab,
        setActiveTab,
        theme,
        toggleTheme,
        isSidebarOpen,
        setIsSidebarOpen,
        apartments,
        residents,
        registrationRequests,
        approveRequest,
        rejectRequest,
        submitRegistration,
        complaints,
        submitComplaint,
        updateComplaintStatus,
        assignComplaint,
        facilities,
        toggleFacilityStatus,
        bookings,
        addBooking,
        cancelBooking,
        financeSummary: {
          ...financeSummary,
          availableBalance: dynamicAvailableBalance
        },
        maintenanceDues,
        recordMaintenancePayment,
        transactions,
        addTransaction,
        announcements,
        publishAnnouncement,
        deleteAnnouncement,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        toast,
        showToast,
        resetAllData,
        canAccess
      }}
    >
      {children}
    </RwaContext.Provider>
  );
};

export const useRwa = () => {
  const context = useContext(RwaContext);
  if (!context) {
    throw new Error('useRwa must be used within an RwaProvider');
  }
  return context;
};
