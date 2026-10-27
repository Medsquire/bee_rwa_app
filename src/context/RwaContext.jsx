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
  INITIAL_NOTIFICATIONS,
  INITIAL_usersS,
  INITIAL_COUNCIL_USERS,
  INITIAL_AGENCIES
} from '../data/initialData';

const RwaContext = createContext();

const STORAGE_KEY_PREFIX = 'BEE_RWA_V2_';

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

  const [currentRoleKey, setCurrentRoleKey] = useState(() => {
    const storedRole = loadStored('ROLE', 'president');
    return Object.keys(INITIAL_ROLES).includes(storedRole) ? storedRole : 'president';
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const v2Auth = loadStored('IS_AUTH', null);
    if (v2Auth !== null) return v2Auth;
    try {
      return localStorage.getItem('BEE_RWA_V1_IS_AUTH') === 'true';
    } catch {
      return false;
    }
  });
  const [selectedApartment, setSelectedApartment] = useState('Golden Apartment');
  const [activeTab, setActiveTab] = useState(() => loadStored('TAB', 'dashboard'));
  const [theme, setTheme] = useState(() => loadStored('THEME', 'light'));
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Core Data States
  const [apartments] = useState(INITIAL_APARTMENTS);
  const [residents, setResidents] = useState(() => {
    const stored = loadStored('RESIDENTS', null);
    if (stored && Array.isArray(stored) && stored.length > 50) {
      return stored;
    }
    return INITIAL_RESIDENTS_DIRECTORY;
  });
  const [registrationRequests, setRegistrationRequests] = useState(() => loadStored('REQUESTS', INITIAL_REGISTRATION_REQUESTS));
  const [complaints, setComplaints] = useState(() => loadStored('COMPLAINTS', INITIAL_COMPLAINTS));
  const [facilities, setFacilities] = useState(() => loadStored('FACILITIES', INITIAL_FACILITIES));
  const [bookings, setBookings] = useState(() => loadStored('BOOKINGS', INITIAL_BOOKINGS));
  const [financeSummary, setFinanceSummary] = useState(() => loadStored('FINANCE_SUMM', INITIAL_FINANCE_SUMMARY));
  const [maintenanceDues, setMaintenanceDues] = useState(() => loadStored('DUES', INITIAL_MAINTENANCE_DUES));
  const [transactions, setTransactions] = useState(() => loadStored('TXNS', INITIAL_TRANSACTIONS));
  const [announcements, setAnnouncements] = useState(() => loadStored('ANNOUNCEMENTS', INITIAL_ANNOUNCEMENTS));
  const [notifications, setNotifications] = useState(() => loadStored('NOTIFICATIONS', INITIAL_NOTIFICATIONS));
  const [userss, setuserss] = useState(() => loadStored('usersS', INITIAL_usersS));
  const [councilUsers, setCouncilUsers] = useState(() => {
    const stored = loadStored('COUNCIL_USERS', null);
    if (stored && Array.isArray(stored) && stored.some(u => u.name === 'Anita Sharma')) {
      return stored;
    }
    return INITIAL_COUNCIL_USERS;
  });
  const [agencies, setAgencies] = useState(() => loadStored('AGENCIES', INITIAL_AGENCIES));

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
      localStorage.setItem(STORAGE_KEY_PREFIX + 'usersS', JSON.stringify(userss));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'COUNCIL_USERS', JSON.stringify(councilUsers));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'AGENCIES', JSON.stringify(agencies));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'IS_AUTH', JSON.stringify(isAuthenticated));
    } catch (e) {
      console.warn('Storage sync issue:', e);
    }
  }, [
    currentRoleKey, isAuthenticated, activeTab, theme, residents, registrationRequests,
    complaints, facilities, bookings, financeSummary, maintenanceDues,
    transactions, announcements, notifications, userss, councilUsers, agencies
  ]);

  // Agency assignment helper: assigns/updates towers for a complex
  const assignAgencyTowers = (agencyId, complexName, newTowersList) => {
    setAgencies(prev => prev.map(agy => {
      if (agy.id !== agencyId) return agy;

      const existingComp = agy.assignedComplexes.find(c => c.complex === complexName);
      let updatedComplexes;

      if (existingComp) {
        if (newTowersList.length === 0) {
          // Remove complex if no towers selected
          updatedComplexes = agy.assignedComplexes.filter(c => c.complex !== complexName);
        } else {
          updatedComplexes = agy.assignedComplexes.map(c =>
            c.complex === complexName ? { ...c, towers: newTowersList } : c
          );
        }
      } else if (newTowersList.length > 0) {
        updatedComplexes = [
          ...agy.assignedComplexes,
          {
            complex: complexName,
            towers: newTowersList,
            unitsAssigned: `${newTowersList.length} Towers Assigned`,
            isPrimary: agy.assignedComplexes.length === 0
          }
        ];
      } else {
        updatedComplexes = agy.assignedComplexes;
      }

      return {
        ...agy,
        assignedComplexes: updatedComplexes
      };
    }));

    showToast(`Agency assignments updated for ${complexName}.`, 'success');
  };

  const updateAgencyStatus = (agencyId, newStatus) => {
    setAgencies(prev => prev.map(agy =>
      agy.id === agencyId ? { ...agy, status: newStatus } : agy
    ));
    showToast(`Agency status updated to ${newStatus}.`, 'info');
  };

  // Current active user profile
  const currentUser = INITIAL_ROLES[currentRoleKey] || INITIAL_ROLES.president;

  // Role switching
  const switchRole = (newRoleKey) => {
    if (Object.keys(INITIAL_ROLES).includes(newRoleKey)) {
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

  // Update resident details
  const updateResident = (residentId, updatedData) => {
    setResidents(prev => prev.map(res => {
      if (res.id === residentId) {
        return { ...res, ...updatedData };
      }
      return res;
    }));
    showToast(`Resident information updated successfully!`, 'success');
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
    
    const isRwaUser = ['president', 'vice_president', 'admin'].includes(currentUser?.roleKey);
    const isCommonArea = data.complaintScope === 'Common Area' || !data.complaintScope;
    
    // If resident raises common area complaint -> requires RWA approval before moving to Agent app
    let initialStatus = 'Pending Approval';
    let requiresApproval = false;
    let dispatchedToAgentApp = false;

    if (!isRwaUser && isCommonArea) {
      initialStatus = 'Pending Approval';
      requiresApproval = true;
    } else if (isRwaUser && (data.directToAgentApp !== false)) {
      // RWA users can directly send complaint to agent app without approvals
      initialStatus = 'Approved';
      dispatchedToAgentApp = true;
    }

    const newComplaint = {
      id: newId,
      title: data.title,
      category: data.category,
      issueType: data.issueType || data.category,
      apartment: data.apartment || currentUser.apartment,
      location: data.location,
      placeName: data.placeName || '',
      floor: data.floor || '',
      asset: data.asset || '',
      description: data.description,
      priority: data.priority || 'Medium',
      status: initialStatus,
      complaintScope: data.complaintScope || 'Common Area',
      requiresApproval,
      dispatchedToAgentApp,
      submittedBy: `${currentUser.name} (${currentUser.flatNumber || 'RWA Office'})`,
      submittedByRole: currentUser.roleTitle,
      assignedTo: data.assignedTo || (dispatchedToAgentApp ? 'Sanjay Kumar (Otis AMC Lead Engineer)' : 'Unassigned'),
      assignedDate: dispatchedToAgentApp ? nowStr : '',
      createdAt: nowStr,
      updatedAt: nowStr,
      hasAttachment: !!data.hasAttachment || !!data.photoUrl,
      photoUrl: data.photoUrl || null,
      history: [
        { 
          timestamp: nowStr, 
          text: requiresApproval 
            ? `Common Area complaint registered by ${currentUser.name}. Requires RWA approval before moving to Agent App.` 
            : dispatchedToAgentApp 
              ? `Complaint registered by RWA (${currentUser.name}) and directly dispatched to Agent App.` 
              : `Complaint registered by ${currentUser.name}`, 
          author: currentUser.roleTitle 
        }
      ]
    };

    setComplaints(prev => [newComplaint, ...prev]);

    // Alert VP & President
    const newNotif = {
      id: `notif-${Date.now()}`,
      roleTarget: 'vice_president',
      title: requiresApproval 
        ? `Approval Needed: ${data.title.substring(0, 30)}...` 
        : `New Complaint: ${data.title.substring(0, 30)}...`,
      message: `Priority: ${data.priority} | ${data.apartment} - ${data.location}`,
      timestamp: 'Just now',
      read: false,
      type: 'complaint',
      actionTab: 'complaints'
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast(
      requiresApproval 
        ? `Common Area Complaint #${newId} submitted! Awaiting RWA Approval.` 
        : `Complaint #${newId} submitted & dispatched to Agent App!`, 
      'success'
    );
    return newId;
  };

  // RWA Approval for Common Area Complaints -> Moves to Agent App
  const approveAndDispatchToAgentApp = (complaintId, technicianOrAgency = '', noteText = '') => {
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    setComplaints(prev => prev.map(cmp => {
      if (cmp.id === complaintId) {
        const historyEntry = {
          timestamp: nowStr,
          text: noteText || `Common Area complaint approved by RWA (${currentUser.name}) and dispatched to Agent App.`,
          author: `${currentUser.name} (${currentUser.roleTitle})`
        };
        return {
          ...cmp,
          status: 'Approved',
          assignedTo: technicianOrAgency || (cmp.assignedTo !== 'Unassigned' ? cmp.assignedTo : 'Sanjay Kumar (Otis AMC Lead Engineer)'),
          assignedDate: nowStr,
          approvedByRwa: true,
          rwaApprovedBy: currentUser.name,
          dispatchedToAgentApp: true,
          requiresApproval: false,
          updatedAt: nowStr,
          history: [...(cmp.history || []), historyEntry]
        };
      }
      return cmp;
    }));

    showToast(`Complaint #${complaintId} approved and moved to Agent App!`, 'success');
  };

  // RWA Users directly send to Agent App without approvals
  const sendDirectlyToAgentApp = (complaintId, technicianOrAgency = '', noteText = '') => {
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    setComplaints(prev => prev.map(cmp => {
      if (cmp.id === complaintId) {
        const historyEntry = {
          timestamp: nowStr,
          text: noteText || `Directly sent to Agent App by RWA User (${currentUser.name}) with zero approvals required.`,
          author: `${currentUser.name} (${currentUser.roleTitle})`
        };
        return {
          ...cmp,
          status: 'Approved',
          assignedTo: technicianOrAgency || (cmp.assignedTo !== 'Unassigned' ? cmp.assignedTo : 'Sanjay Kumar (Otis AMC Lead Engineer)'),
          assignedDate: nowStr,
          dispatchedToAgentApp: true,
          requiresApproval: false,
          updatedAt: nowStr,
          history: [...(cmp.history || []), historyEntry]
        };
      }
      return cmp;
    }));

    showToast(`Complaint #${complaintId} directly sent to Agent App!`, 'success');
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

  const updateComplaintDetails = (complaintId, updates, updateNote = '') => {
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    setComplaints(prev => prev.map(cmp => {
      if (cmp.id === complaintId) {
        const historyEntry = updateNote ? {
          timestamp: nowStr,
          text: updateNote,
          author: currentUser.roleTitle
        } : null;

        return {
          ...cmp,
          ...updates,
          updatedAt: nowStr,
          history: historyEntry ? [...cmp.history, historyEntry] : cmp.history
        };
      }
      return cmp;
    }));

    showToast(`Complaint #${complaintId} updated successfully`, 'success');
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
    setuserss(INITIAL_usersS);
    setCouncilUsers(INITIAL_COUNCIL_USERS);

    showToast('All demo data reset to default successfully!', 'success');
  };

  // Council Users Management
  const addCouncilUser = (userData) => {
    const roleHierarchyMap = {
      'President': 1,
      'Vice President': 2,
      'Executive': 3,
      'Secretary': 4,
      'Treasurer': 5
    };
    const rank = roleHierarchyMap[userData.role] || 3;
    const newUser = {
      ...userData,
      id: `USR-${Date.now().toString().slice(-4)}`,
      hierarchyRank: rank,
      status: userData.status || 'Active'
    };
    setCouncilUsers(prev => [...prev, newUser]);
    showToast(`Added ${newUser.name} as ${newUser.role}`, 'success');
    return newUser;
  };

  const updateCouncilUser = (userId, updatedFields) => {
    const roleHierarchyMap = {
      'President': 1,
      'Vice President': 2,
      'Executive': 3,
      'Secretary': 4,
      'Treasurer': 5
    };
    setCouncilUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextRole = updatedFields.role || u.role;
        return {
          ...u,
          ...updatedFields,
          hierarchyRank: roleHierarchyMap[nextRole] || u.hierarchyRank || 3
        };
      }
      return u;
    }));
    showToast('Council user details updated successfully', 'success');
  };

  const deleteCouncilUser = (userId) => {
    setCouncilUsers(prev => prev.filter(u => u.id !== userId));
    showToast('User removed from council directory', 'info');
  };

  // Add new users
  const addusers = (empData) => {
    const newEmp = {
      ...empData,
      id: `EMP-${Math.floor(100 + Math.random() * 900)}`,
      rating: 5.0,
      avatar: (empData.name || 'EM').split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase(),
      policeVerified: true,
      verificationCode: `BLR-PV-${Math.floor(10000 + Math.random() * 90000)}`
    };
    setuserss(prev => [newEmp, ...prev]);
    showToast(`Staff member "${newEmp.name}" added successfully!`, 'success');
    return newEmp;
  };

  // Authentication handlers
  const login = (username, password) => {
    const u = (username || '').trim().toLowerCase();
    const p = (password || '').trim();

    if ((u === 'sujana' || u === 'p') && p === 'rwa123') {
      setCurrentRoleKey('president');
      setIsAuthenticated(true);
      showToast('Welcome back, President Sujana!', 'success');
      return { success: true, role: 'president', name: 'Sujana' };
    }

    if ((u === 'kavaya' || u === 'vp') && p === 'rwa123') {
      setCurrentRoleKey('vice_president');
      setIsAuthenticated(true);
      showToast('Welcome back, Vice President Kavaya!', 'success');
      return { success: true, role: 'vice_president', name: 'Kavaya' };
    }

    return {
      success: false,
      error: 'Invalid credentials. Please enter username (sujana or kavaya) and password (rwa123).'
    };
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast('You have been logged out successfully.', 'info');
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
        setResidents,
        updateResident,
        registrationRequests,
        approveRequest,
        rejectRequest,
        submitRegistration,
        complaints,
        submitComplaint,
        updateComplaintStatus,
        assignComplaint,
        updateComplaintDetails,
        approveAndDispatchToAgentApp,
        sendDirectlyToAgentApp,
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
        userss,
        users: userss,
        employees: userss,
        setuserss,
        setUsers: setuserss,
        setEmployees: setuserss,
        addusers,
        addUser: addusers,
        addEmployee: addusers,
        councilUsers,
        setCouncilUsers,
        addCouncilUser,
        updateCouncilUser,
        deleteCouncilUser,
        agencies,
        setAgencies,
        assignAgencyTowers,
        updateAgencyStatus,
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
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
