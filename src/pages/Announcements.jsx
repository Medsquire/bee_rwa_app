import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useRwa } from '../context/RwaContext';
import { PriorityBadge, Modal } from '../components/CommonUI';
import { 
  Megaphone, 
  Pin, 
  PlusCircle, 
  Search, 
  Calendar, 
  User, 
  Trash2, 
  Building2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Clock,
  ExternalLink,
  Filter,
  RotateCcw,
  X
} from 'lucide-react';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTH_NAMES_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const DAYS_OF_WEEK_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const YEARS = [2024, 2025, 2026, 2027, 2028];

export const Announcements = () => {
  const { 
    announcements, 
    publishAnnouncement, 
    deleteAnnouncement, 
    apartments, 
    selectedApartment, 
    setSelectedApartment,
    currentUser, 
    currentRoleKey 
  } = useRwa();

  // Actual System / Simulated Current Date (November 10, 2026)
  const systemToday = useMemo(() => new Date(2026, 10, 10), []);
  const todayYear = systemToday.getFullYear();
  const todayMonth = systemToday.getMonth(); // 10 = November
  const todayDay = systemToday.getDate(); // 10

  // 1. DEFAULT VIEW: Automatically select Today's date
  const [selectedYear, setSelectedYear] = useState(todayYear);
  const [selectedMonth, setSelectedMonth] = useState(todayMonth);
  const [selectedDay, setSelectedDay] = useState(todayDay); // By default, select Today!

  // Compact Calendar Popover in Header State
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarPopoverRef = useRef(null);

  // 4. HIDE FILTERS BY DEFAULT: Collapsible filter panel state
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Modals state
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [activeNoticeModal, setActiveNoticeModal] = useState(null);

  const isManagement = ['president', 'vice_president', 'admin'].includes(currentUser?.roleKey || currentRoleKey);

  // New announcement form state
  const [newAnn, setNewAnn] = useState({
    title: '',
    description: '',
    category: 'Water Supply',
    apartmentScope: 'Golden Apartment (All Towers)',
    targetAudience: 'All Residents',
    priority: 'High',
    publishedDate: '2026-11-10',
    pinned: false
  });

  const categories = [
    'All',
    'Water Supply',
    'Lift / Elevator',
    'Facility Maintenance',
    'Community Event',
    'RWA Meeting',
    'Finance Reminder',
    'Security Notice'
  ];

  // Close calendar popover on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarPopoverRef.current && !calendarPopoverRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
    };
    if (isCalendarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCalendarOpen]);

  // Helper to parse announcement dates (supports "YYYY-MM-DD HH:MM", "YYYY-MM-DD", ISO)
  const parseAnnouncementDate = (dateStr) => {
    if (!dateStr) return null;
    const parts = String(dateStr).split(' ')[0].split('-');
    if (parts.length >= 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // 0-indexed
      const day = parseInt(parts[2], 10);
      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        return {
          year,
          month,
          day,
          dateStr: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
        };
      }
    }
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return {
        year: d.getFullYear(),
        month: d.getMonth(),
        day: d.getDate(),
        dateStr: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      };
    }
    return null;
  };

  // Selected tower filter helper
  const currentTowerFilter = useMemo(() => {
    if (!selectedApartment || selectedApartment === 'All' || selectedApartment === 'Golden Apartment' || selectedApartment === 'All Apartments') {
      return 'All';
    }
    const val = selectedApartment.toLowerCase();
    if (val.includes('1')) return 'Tower 1';
    if (val.includes('2')) return 'Tower 2';
    if (val.includes('3')) return 'Tower 3';
    return 'All';
  }, [selectedApartment]);

  // Base filtered announcements (applying search, category, tower scope, and priority filters)
  const baseFilteredAnnouncements = useMemo(() => {
    return (announcements || []).filter(ann => {
      const scope = (ann.apartmentScope || '').toLowerCase();
      
      let matchesApt = true;
      if (selectedApartment && selectedApartment !== 'All' && selectedApartment !== 'Golden Apartment' && selectedApartment !== 'All Apartments') {
        const sel = selectedApartment.toLowerCase();
        if (sel.includes('1')) {
          matchesApt = scope.includes('tower 1') || scope.includes('all towers') || scope === 'all apartments' || scope === 'golden apartment';
        } else if (sel.includes('2')) {
          matchesApt = scope.includes('tower 2') || scope.includes('all towers') || scope === 'all apartments' || scope === 'golden apartment';
        } else if (sel.includes('3')) {
          matchesApt = scope.includes('tower 3') || scope.includes('all towers') || scope === 'all apartments' || scope === 'golden apartment';
        } else {
          matchesApt = scope.includes(sel);
        }
      }

      const matchesCat = categoryFilter === 'All' || ann.category === categoryFilter;
      const matchesPriority = priorityFilter === 'All' || ann.priority === priorityFilter;
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch = !q ||
        (ann.title && ann.title.toLowerCase().includes(q)) ||
        (ann.description && ann.description.toLowerCase().includes(q)) ||
        (ann.publishedBy && ann.publishedBy.toLowerCase().includes(q)) ||
        (ann.category && ann.category.toLowerCase().includes(q));

      return matchesApt && matchesCat && matchesPriority && matchesSearch;
    });
  }, [announcements, selectedApartment, categoryFilter, priorityFilter, searchTerm]);

  // Month-level announcements (belonging to selected month and year)
  const monthAnnouncements = useMemo(() => {
    return baseFilteredAnnouncements.filter(ann => {
      const parsed = parseAnnouncementDate(ann.publishedDate);
      return parsed && parsed.year === selectedYear && parsed.month === selectedMonth;
    });
  }, [baseFilteredAnnouncements, selectedYear, selectedMonth]);

  // Map of days containing notices for mini-calendar indicators
  const announcementsByDay = useMemo(() => {
    const map = {};
    monthAnnouncements.forEach(ann => {
      const parsed = parseAnnouncementDate(ann.publishedDate);
      if (parsed) {
        if (!map[parsed.day]) map[parsed.day] = [];
        map[parsed.day].push(ann);
      }
    });
    return map;
  }, [monthAnnouncements]);

  // Active displayed announcements:
  // By default, displays only announcements published on selectedDay (Today).
  // If selectedDay is null, displays all notices published in selectedMonth.
  const displayedAnnouncements = useMemo(() => {
    let list = monthAnnouncements;
    if (selectedDay !== null) {
      list = monthAnnouncements.filter(ann => {
        const parsed = parseAnnouncementDate(ann.publishedDate);
        return parsed && parsed.day === selectedDay;
      });
    }
    return [...list].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return (b.publishedDate || '').localeCompare(a.publishedDate || '');
    });
  }, [monthAnnouncements, selectedDay]);

  // Mini Calendar grid generation for popover
  const miniCalendarCells = useMemo(() => {
    const firstDayOfWeek = new Date(selectedYear, selectedMonth, 1).getDay(); // 0 = Sun
    const daysInCurrentMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(selectedYear, selectedMonth, 0).getDate();

    const cells = [];

    // Previous month padding
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      cells.push({
        day: daysInPrevMonth - i,
        month: selectedMonth === 0 ? 11 : selectedMonth - 1,
        year: selectedMonth === 0 ? selectedYear - 1 : selectedYear,
        isCurrentMonth: false
      });
    }

    // Current month cells
    for (let d = 1; d <= daysInCurrentMonth; d++) {
      const isToday = todayYear === selectedYear && todayMonth === selectedMonth && todayDay === d;
      const isSelected = selectedDay === d;
      const dayNotices = announcementsByDay[d] || [];

      cells.push({
        day: d,
        month: selectedMonth,
        year: selectedYear,
        isCurrentMonth: true,
        isToday,
        isSelected,
        announcements: dayNotices
      });
    }

    // Next month padding to complete rows
    const remaining = (7 - (cells.length % 7)) % 7;
    for (let nextD = 1; nextD <= remaining; nextD++) {
      cells.push({
        day: nextD,
        month: selectedMonth === 11 ? 0 : selectedMonth + 1,
        year: selectedMonth === 11 ? selectedYear + 1 : selectedYear,
        isCurrentMonth: false
      });
    }

    return cells;
  }, [selectedYear, selectedMonth, selectedDay, announcementsByDay, todayYear, todayMonth, todayDay]);

  // Handlers for Calendar Popover
  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(prev => prev - 1);
    } else {
      setSelectedMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(prev => prev + 1);
    } else {
      setSelectedMonth(prev => prev + 1);
    }
  };

  const handleSelectToday = () => {
    setSelectedYear(todayYear);
    setSelectedMonth(todayMonth);
    setSelectedDay(todayDay);
    setIsCalendarOpen(false);
  };

  const handleSelectFullMonth = () => {
    setSelectedDay(null);
    setIsCalendarOpen(false);
  };

  const handleMiniCellClick = (cell) => {
    if (!cell.isCurrentMonth) {
      setSelectedYear(cell.year);
      setSelectedMonth(cell.month);
      setSelectedDay(cell.day);
      setIsCalendarOpen(false);
      return;
    }
    setSelectedDay(cell.day);
    setIsCalendarOpen(false);
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!newAnn.title.trim() || !newAnn.description.trim()) return;

    publishAnnouncement({
      ...newAnn,
      publishedDate: newAnn.publishedDate || `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(selectedDay || todayDay).padStart(2, '0')} 10:00`
    });

    const parsed = parseAnnouncementDate(newAnn.publishedDate);
    if (parsed) {
      setSelectedYear(parsed.year);
      setSelectedMonth(parsed.month);
      setSelectedDay(parsed.day);
    }

    setIsPublishModalOpen(false);
    setNewAnn({
      title: '',
      description: '',
      category: 'Water Supply',
      apartmentScope: 'Golden Apartment (All Towers)',
      targetAudience: 'All Residents',
      priority: 'High',
      publishedDate: '2026-11-10',
      pinned: false
    });
  };

  const openBroadcastModal = (prefillDate = null) => {
    const targetDay = prefillDate || selectedDay || todayDay;
    const dateFormatted = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(targetDay).padStart(2, '0')}`;
    setNewAnn(prev => ({
      ...prev,
      publishedDate: dateFormatted
    }));
    setIsPublishModalOpen(true);
  };

  const isViewingToday = selectedYear === todayYear && selectedMonth === todayMonth && selectedDay === todayDay;

  const hasActiveNonDateFilters = searchTerm || categoryFilter !== 'All' || priorityFilter !== 'All' || (selectedApartment !== 'All' && selectedApartment !== 'Golden Apartment' && selectedApartment !== 'All Apartments');

  // Label for the compact calendar selector in the header
  const formatCalendarButtonLabel = () => {
    if (isViewingToday) {
      return `Today, ${todayDay} ${MONTH_NAMES_SHORT[todayMonth]} ${todayYear}`;
    }
    if (selectedDay !== null) {
      return `${selectedDay} ${MONTH_NAMES_SHORT[selectedMonth]} ${selectedYear}`;
    }
    return `${MONTH_NAMES[selectedMonth]} ${selectedYear} (All)`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* 2. HEADER BAR: Title on Left, Compact Calendar Selector + Filter Toggle + Broadcast on Right */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        paddingBottom: '2px'
      }}>
        {/* Left: Page Title */}
        <div>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#0F172A',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Megaphone size={19} color="#2563EB" />
            Community Notice Board & Circulars
          </h1>
        </div>

        {/* Right: Compact Calendar Selector, Filter Toggle, Broadcast Button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          position: 'relative'
        }}>
          {/* COMPACT CALENDAR SELECTOR IN HEADER */}
          <div ref={calendarPopoverRef} style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setIsCalendarOpen(prev => !prev)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '6px 12px',
                borderRadius: '7px',
                backgroundColor: '#FFFFFF',
                border: isCalendarOpen ? '1.5px solid #2563EB' : '1px solid #CBD5E1',
                boxShadow: isCalendarOpen ? '0 0 0 3px rgba(37, 99, 235, 0.12)' : '0 1px 2px rgba(0,0,0,0.04)',
                color: '#0F172A',
                fontSize: '0.8rem',
                fontWeight: 650,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              title="Click to change date or month"
              onMouseEnter={e => { if (!isCalendarOpen) e.currentTarget.style.borderColor = '#2563EB'; }}
              onMouseLeave={e => { if (!isCalendarOpen) e.currentTarget.style.borderColor = '#CBD5E1'; }}
            >
              <Calendar size={14} color="#2563EB" />
              <span>{formatCalendarButtonLabel()}</span>
              <ChevronDown size={13} color="#64748B" style={{ transform: isCalendarOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
            </button>

            {/* Compact Calendar Dropdown Popover */}
            {isCalendarOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '6px',
                width: '300px',
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid #CBD5E1',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                padding: '12px',
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                {/* Popover Header: Month & Year Selectors with Arrows */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '4px'
                }}>
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '5px',
                      border: '1px solid #E2E8F0',
                      backgroundColor: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                    title="Previous month"
                  >
                    <ChevronLeft size={14} />
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <select
                      value={selectedMonth}
                      onChange={e => setSelectedMonth(parseInt(e.target.value, 10))}
                      style={{
                        height: '30px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        border: '1px solid #CBD5E1',
                        borderRadius: '5px',
                        padding: '0 20px 0 8px',
                        backgroundColor: '#F8FAFC',
                        lineHeight: '28px',
                        boxSizing: 'border-box',
                        cursor: 'pointer',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 6px center',
                        backgroundSize: '11px 11px',
                        color: '#334155'
                      }}
                    >
                      {MONTH_NAMES.map((m, idx) => (
                        <option key={m} value={idx}>{m}</option>
                      ))}
                    </select>

                    <select
                      value={selectedYear}
                      onChange={e => setSelectedYear(parseInt(e.target.value, 10))}
                      style={{
                        height: '30px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        border: '1px solid #CBD5E1',
                        borderRadius: '5px',
                        padding: '0 20px 0 8px',
                        backgroundColor: '#F8FAFC',
                        lineHeight: '28px',
                        boxSizing: 'border-box',
                        cursor: 'pointer',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 6px center',
                        backgroundSize: '11px 11px',
                        color: '#334155'
                      }}
                    >
                      {YEARS.map(yr => (
                        <option key={yr} value={yr}>{yr}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextMonth}
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '5px',
                      border: '1px solid #E2E8F0',
                      backgroundColor: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                    title="Next month"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>

                {/* Days of Week Row */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, 1fr)',
                  textAlign: 'center',
                  fontSize: '0.675rem',
                  fontWeight: 800,
                  color: '#64748B',
                  borderBottom: '1px solid #F1F5F9',
                  paddingBottom: '4px'
                }}>
                  {DAYS_OF_WEEK_SHORT.map((d, idx) => (
                    <span key={d} style={{ color: idx === 0 || idx === 6 ? '#EF4444' : '#64748B' }}>
                      {d}
                    </span>
                  ))}
                </div>

                {/* 7-Column Mini Date Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, 1fr)',
                  gap: '2px',
                  textAlign: 'center'
                }}>
                  {miniCalendarCells.map((cell, idx) => {
                    const count = (cell.announcements || []).length;
                    const hasUrgent = (cell.announcements || []).some(a => a.priority === 'Urgent');
                    const hasHigh = (cell.announcements || []).some(a => a.priority === 'High');

                    let bg = 'transparent';
                    let color = '#334155';
                    let fontWeight = 500;

                    if (!cell.isCurrentMonth) {
                      color = '#CBD5E1';
                    } else if (cell.isSelected) {
                      bg = '#2563EB';
                      color = '#FFFFFF';
                      fontWeight = 800;
                    } else if (cell.isToday) {
                      bg = '#EFF6FF';
                      color = '#1D4ED8';
                      fontWeight = 800;
                    }

                    return (
                      <button
                        key={`${cell.year}-${cell.month}-${cell.day}-${idx}`}
                        type="button"
                        onClick={() => handleMiniCellClick(cell)}
                        style={{
                          height: '32px',
                          borderRadius: '6px',
                          border: cell.isToday && !cell.isSelected ? '1px solid #BFDBFE' : '1px solid transparent',
                          backgroundColor: bg,
                          color,
                          fontSize: '0.75rem',
                          fontWeight,
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                          padding: 0
                        }}
                        title={count > 0 ? `${count} announcement(s)` : undefined}
                      >
                        <span>{cell.day}</span>
                        {/* Dot indicator if date has announcements */}
                        {count > 0 && (
                          <span style={{
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            backgroundColor: cell.isSelected 
                              ? '#FFFFFF' 
                              : hasUrgent ? '#DC2626' : hasHigh ? '#D97706' : '#2563EB',
                            marginTop: '1px'
                          }} />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Popover Footer Shortcuts */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid #F1F5F9',
                  paddingTop: '8px',
                  fontSize: '0.72rem'
                }}>
                  <button
                    type="button"
                    onClick={handleSelectToday}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#2563EB',
                      fontWeight: 700,
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    Jump to Today
                  </button>

                  <button
                    type="button"
                    onClick={handleSelectFullMonth}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#475569',
                      fontWeight: 650,
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    View All Month
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 4. FILTER TOGGLE BUTTON (Filters hidden by default) */}
          <button
            type="button"
            onClick={() => setIsFilterOpen(prev => !prev)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '7px',
              backgroundColor: isFilterOpen ? '#EFF6FF' : '#FFFFFF',
              border: isFilterOpen ? '1.5px solid #2563EB' : '1px solid #CBD5E1',
              color: isFilterOpen ? '#1D4ED8' : '#334155',
              fontSize: '0.8rem',
              fontWeight: 650,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            title="Toggle search and filter options"
          >
            <Filter size={14} color={hasActiveNonDateFilters || isFilterOpen ? '#2563EB' : '#64748B'} />
            <span>Filter</span>
            {hasActiveNonDateFilters && (
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#2563EB'
              }} />
            )}
          </button>

          {/* Broadcast New Announcement Button */}
          {isManagement && (
            <button 
              className="btn btn-primary btn-sm" 
              onClick={() => openBroadcastModal()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '7px',
                fontWeight: 700,
                fontSize: '0.8rem'
              }}
            >
              <PlusCircle size={14} /> Broadcast
            </button>
          )}
        </div>
      </div>

      {/* 4. EXPANDABLE FILTER PANEL (Hidden by default, toggled via Filter button) */}
      {isFilterOpen && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '9px',
          padding: '12px 14px',
          border: '1px solid #CBD5E1',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.03)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', flex: 1 }}>
            {/* Search Input */}
            <div style={{ position: 'relative', width: '220px', minWidth: '160px' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '11px', color: '#94A3B8' }} />
              <input 
                type="text" 
                placeholder="Search title, keywords..." 
                className="form-control"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ 
                  padding: '0 12px 0 32px', 
                  height: '36px', 
                  fontSize: '0.8125rem', 
                  borderRadius: '6px',
                  lineHeight: 'normal',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Category Filter */}
            <select 
              className="form-control"
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              style={{ 
                width: 'auto', 
                height: '36px', 
                padding: '0 30px 0 10px', 
                fontSize: '0.8125rem', 
                borderRadius: '6px',
                lineHeight: '34px',
                boxSizing: 'border-box',
                cursor: 'pointer',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 9px center',
                backgroundSize: '13px 13px',
                backgroundColor: '#FFFFFF',
                color: '#334155'
              }}
            >
              {categories.map(c => (
                <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
              ))}
            </select>

            {/* Tower Scope Filter */}
            <select 
              className="form-control"
              value={currentTowerFilter}
              onChange={e => setSelectedApartment(e.target.value)}
              style={{ 
                width: 'auto', 
                height: '36px', 
                padding: '0 30px 0 10px', 
                fontSize: '0.8125rem', 
                borderRadius: '6px',
                lineHeight: '34px',
                boxSizing: 'border-box',
                cursor: 'pointer',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 9px center',
                backgroundSize: '13px 13px',
                backgroundColor: '#FFFFFF',
                color: '#334155'
              }}
            >
              <option value="All">All Towers</option>
              <option value="Tower 1">Tower 1</option>
              <option value="Tower 2">Tower 2</option>
              <option value="Tower 3">Tower 3</option>
            </select>

            {/* Priority Filter */}
            <select 
              className="form-control"
              value={priorityFilter}
              onChange={e => setPriorityFilter(e.target.value)}
              style={{ 
                width: 'auto', 
                height: '36px', 
                padding: '0 30px 0 10px', 
                fontSize: '0.8125rem', 
                borderRadius: '6px',
                lineHeight: '34px',
                boxSizing: 'border-box',
                cursor: 'pointer',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 9px center',
                backgroundSize: '13px 13px',
                backgroundColor: '#FFFFFF',
                color: '#334155'
              }}
            >
              <option value="All">All Priorities</option>
              <option value="Urgent">🚨 Urgent</option>
              <option value="High">⚠️ High</option>
              <option value="Medium">⚡ Medium</option>
              <option value="Low">🌱 Low</option>
            </select>

            {/* Reset Filters */}
            {hasActiveNonDateFilters && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('All');
                  setPriorityFilter('All');
                  setSelectedApartment('All');
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  height: '36px',
                  padding: '0 10px',
                  borderRadius: '6px',
                  backgroundColor: '#F1F5F9',
                  border: '1px solid #CBD5E1',
                  color: '#475569',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxSizing: 'border-box'
                }}
              >
                <RotateCcw size={12} /> Reset
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsFilterOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              padding: '2px 4px'
            }}
            title="Close filter bar"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* 1. DATE CONTEXT STRIP: Shows active date clearly above announcement cards */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px',
        padding: '8px 12px',
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <Calendar size={15} color="#2563EB" />
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A' }}>
            {isViewingToday
              ? `Today: Tuesday, 10 November 2026`
              : selectedDay !== null
                ? `Date: ${selectedDay} ${MONTH_NAMES[selectedMonth]} ${selectedYear}`
                : `Entire Month: ${MONTH_NAMES[selectedMonth]} ${selectedYear}`}
          </span>
          <span style={{
            backgroundColor: displayedAnnouncements.length > 0 ? '#EFF6FF' : '#F1F5F9',
            color: displayedAnnouncements.length > 0 ? '#1D4ED8' : '#64748B',
            fontSize: '0.7rem',
            fontWeight: 800,
            padding: '1px 7px',
            borderRadius: '10px'
          }}>
            {displayedAnnouncements.length} {displayedAnnouncements.length === 1 ? 'notice' : 'notices'}
          </span>
        </div>

        {/* Quick view switch links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.74rem' }}>
          {selectedDay !== null && (
            <button
              type="button"
              onClick={() => setSelectedDay(null)}
              style={{
                background: 'none',
                border: 'none',
                color: '#2563EB',
                fontWeight: 650,
                cursor: 'pointer',
                padding: 0
              }}
            >
              View all {MONTH_NAMES[selectedMonth]} notices ({monthAnnouncements.length})
            </button>
          )}

          {!isViewingToday && (
            <button
              type="button"
              onClick={handleSelectToday}
              style={{
                background: 'none',
                border: 'none',
                color: '#0F172A',
                fontWeight: 700,
                cursor: 'pointer',
                padding: 0,
                textDecoration: 'underline'
              }}
            >
              Return to Today
            </button>
          )}
        </div>
      </div>

      {/* 5. ANNOUNCEMENT DISPLAY: Slim, Compact & Professional Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {displayedAnnouncements.length === 0 ? (
          /* Clean Empty State */
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '9px',
            border: '1px dashed #CBD5E1',
            padding: '40px 20px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#F1F5F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94A3B8'
            }}>
              <Calendar size={20} />
            </div>

            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1E293B' }}>
              {isViewingToday 
                ? 'No announcements for today.' 
                : selectedDay !== null
                  ? `No announcements on ${selectedDay} ${MONTH_NAMES[selectedMonth]} ${selectedYear}.`
                  : `No announcements for ${MONTH_NAMES[selectedMonth]} ${selectedYear}.`}
            </div>

            <div style={{ fontSize: '0.75rem', color: '#64748B', maxWidth: '340px', lineHeight: 1.5 }}>
              {isViewingToday
                ? 'There are no active notices published today. You can check historical circulars for this month using the calendar above.'
                : 'Browse other dates using the compact calendar selector in the header.'}
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
              {selectedDay !== null && (
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setSelectedDay(null)}
                  style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                >
                  View all in {MONTH_NAMES[selectedMonth]} ({monthAnnouncements.length})
                </button>
              )}

              {!isViewingToday && (
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleSelectToday}
                  style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                >
                  Back to Today
                </button>
              )}

              {isManagement && (
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => openBroadcastModal(selectedDay)}
                  style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                >
                  <PlusCircle size={13} /> Broadcast Notice
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Slim Announcement Cards */
          displayedAnnouncements.map((ann) => {
            const priorityBorder = 
              ann.priority === 'Urgent' ? '#EF4444' :
              ann.priority === 'High' ? '#F59E0B' :
              ann.priority === 'Medium' ? '#2563EB' : '#10B981';

            return (
              <div
                key={ann.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  borderLeft: `3.5px solid ${priorityBorder}`,
                  padding: '11px 14px',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  transition: 'transform 0.12s ease, box-shadow 0.12s ease'
                }}
              >
                {/* Top Row: Priority, Category, Pinned, Audience, Time */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    {ann.pinned && (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px',
                        padding: '1px 5px',
                        borderRadius: '4px',
                        backgroundColor: '#FEF2F2',
                        color: '#DC2626',
                        border: '1px solid #FECACA',
                        fontSize: '0.675rem',
                        fontWeight: 800
                      }}>
                        <Pin size={10} /> PINNED
                      </span>
                    )}
                    <PriorityBadge priority={ann.priority} />
                    <span style={{
                      backgroundColor: '#F1F5F9',
                      color: '#475569',
                      padding: '1px 6px',
                      borderRadius: '4px',
                      fontSize: '0.675rem',
                      fontWeight: 700
                    }}>
                      {ann.category}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#64748B' }}>
                      Audience: <strong>{ann.targetAudience}</strong>
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>
                    <Clock size={11} />
                    <span>{ann.publishedDate}</span>
                  </div>
                </div>

                {/* Main Line: Title & 1-line snippet */}
                <div>
                  <h3 
                    onClick={() => setActiveNoticeModal(ann)}
                    style={{
                      fontSize: '0.88rem',
                      fontWeight: 800,
                      color: '#0F172A',
                      margin: 0,
                      cursor: 'pointer',
                      lineHeight: 1.3
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#2563EB'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#0F172A'; }}
                    title="Click to view complete details"
                  >
                    {ann.title}
                  </h3>

                  <p style={{
                    fontSize: '0.78rem',
                    color: '#475569',
                    margin: '3px 0 0 0',
                    lineHeight: 1.4,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {ann.description}
                  </p>
                </div>

                {/* Bottom Row: Scope, Publisher, Details Action */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid #F8FAFC',
                  paddingTop: '6px',
                  fontSize: '0.7rem',
                  color: '#64748B',
                  gap: '8px',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      <Building2 size={11} /> {ann.apartmentScope}
                    </span>
                    <span>•</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      <User size={11} /> Published by: <strong>{ann.publishedBy.split('(')[0].trim()}</strong>
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      type="button"
                      onClick={() => setActiveNoticeModal(ann)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#2563EB',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        padding: '1px 3px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}
                    >
                      <span>Full Notice</span>
                      <ExternalLink size={11} />
                    </button>

                    {isManagement && (
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete notice "${ann.title}"?`)) {
                            deleteAnnouncement(ann.id);
                          }
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#94A3B8',
                          cursor: 'pointer',
                          padding: '1px 3px',
                          display: 'inline-flex',
                          alignItems: 'center'
                        }}
                        title="Remove notice"
                        onMouseEnter={e => { e.currentTarget.style.color = '#EF4444'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = '#94A3B8'; }}
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Complete Announcement Details Modal */}
      {activeNoticeModal && (
        <Modal
          isOpen={!!activeNoticeModal}
          onClose={() => setActiveNoticeModal(null)}
          title={activeNoticeModal.title}
          subtitle={`Published on ${activeNoticeModal.publishedDate} by ${activeNoticeModal.publishedBy}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Metadata Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {activeNoticeModal.pinned && (
                <span className="badge" style={{ backgroundColor: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA' }}>
                  <Pin size={12} /> PINNED NOTICE
                </span>
              )}
              <PriorityBadge priority={activeNoticeModal.priority} />
              <span className="badge badge-indigo">{activeNoticeModal.category}</span>
              <span className="badge badge-neutral">Audience: {activeNoticeModal.targetAudience}</span>
              <span className="badge badge-neutral">Scope: {activeNoticeModal.apartmentScope}</span>
            </div>

            {/* Complete Notice Body */}
            <div style={{
              backgroundColor: '#F8FAFC',
              borderRadius: '8px',
              padding: '14px 16px',
              border: '1px solid #E2E8F0',
              fontSize: '0.85rem',
              color: '#1E293B',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap'
            }}>
              {activeNoticeModal.description}
            </div>

            {/* Footer */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid #E2E8F0',
              paddingTop: '10px',
              fontSize: '0.78rem',
              color: '#64748B',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <div>
                Published By: <strong>{activeNoticeModal.publishedBy}</strong>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                {isManagement && (
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      if (window.confirm(`Delete notice "${activeNoticeModal.title}"?`)) {
                        deleteAnnouncement(activeNoticeModal.id);
                        setActiveNoticeModal(null);
                      }
                    }}
                    style={{ color: '#EF4444', borderColor: '#FECACA' }}
                  >
                    <Trash2 size={13} /> Remove Bulletin
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => setActiveNoticeModal(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Broadcast New Announcement Modal */}
      <Modal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        title="Broadcast Community Announcement"
        subtitle="Publish official circular or notice for residents"
      >
        <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="form-group">
            <label className="form-label required">Notice Title</label>
            <input 
              type="text" 
              className="form-control"
              placeholder="e.g. Water Reservoir Cleaning Schedule or AGM Meeting Circular"
              value={newAnn.title}
              onChange={e => setNewAnn({ ...newAnn, title: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label required">Category</label>
              <select 
                className="form-control"
                value={newAnn.category}
                onChange={e => setNewAnn({ ...newAnn, category: e.target.value })}
              >
                {categories.filter(c => c !== 'All').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label required">Priority Level</label>
              <select 
                className="form-control"
                value={newAnn.priority}
                onChange={e => setNewAnn({ ...newAnn, priority: e.target.value })}
              >
                <option value="Urgent">🚨 Urgent (Water / Lift Outage)</option>
                <option value="High">⚠️ High (General Body / Dues)</option>
                <option value="Medium">⚡ Medium (Festival / Events)</option>
                <option value="Low">🌱 Low (General Notice)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label required">Apartment Scope</label>
              <select 
                className="form-control"
                value={newAnn.apartmentScope}
                onChange={e => setNewAnn({ ...newAnn, apartmentScope: e.target.value })}
              >
                <option value="Golden Apartment (All Towers)">Golden Apartment (All Towers)</option>
                <option value="Golden Tower 1">Golden Tower 1 Only</option>
                <option value="Golden Tower 2">Golden Tower 2 Only</option>
                <option value="Golden Tower 3">Golden Tower 3 Only</option>
                <option value="All Apartments">All Complexes Scope</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label required">Target Audience</label>
              <select 
                className="form-control"
                value={newAnn.targetAudience}
                onChange={e => setNewAnn({ ...newAnn, targetAudience: e.target.value })}
              >
                <option value="All Residents">All Residents (Owners & Tenants)</option>
                <option value="Flat Owners Only">Flat Owners Only (AGM Voting)</option>
                <option value="Tenants Only">Tenants Only</option>
              </select>
            </div>
          </div>

          {/* Calendar Published Date Picker */}
          <div className="form-group">
            <label className="form-label required">Publication Date</label>
            <input 
              type="date"
              className="form-control"
              value={newAnn.publishedDate}
              onChange={e => setNewAnn({ ...newAnn, publishedDate: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label required">Announcement Details</label>
            <textarea 
              rows={4}
              className="form-control"
              placeholder="Provide timings, instructions for residents, contact numbers, and guidelines..."
              value={newAnn.description}
              onChange={e => setNewAnn({ ...newAnn, description: e.target.value })}
              required
            />
          </div>

          <div style={{ marginBottom: '6px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={newAnn.pinned}
                onChange={e => setNewAnn({ ...newAnn, pinned: e.target.checked })}
              />
              <span style={{ fontWeight: 600 }}>Pin this notice to top of resident dashboards</span>
            </label>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '9px' }}>
              Publish Broadcast
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setIsPublishModalOpen(false)}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
