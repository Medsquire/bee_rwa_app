import React, { useState } from 'react';
import { useRwa } from '../context/RwaContext';
import { ApartmentBadge, StatusPill, StatCard, Modal } from '../components/CommonUI';
import { 
  Users, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Briefcase, 
  Clock, 
  Award, 
  UserPlus, 
  Building2, 
  Wrench, 
  CheckCircle2, 
  Calendar,
  AlertCircle
} from 'lucide-react';

export const EmployeeDirectory = () => {
  const { employees, addEmployee, apartments, selectedApartment, setSelectedApartment, setActiveTab, currentUser } = useRwa();
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state for new employee
  const [newStaff, setNewStaff] = useState({
    name: '',
    designation: '',
    department: 'Facility Operations',
    complex: 'Golden Apartment',
    tower: 'Golden Tower 1',
    phone: '',
    email: '',
    shift: 'General (09:00 AM - 06:00 PM)',
    status: 'On Duty',
    experience: '3 Years'
  });

  const departments = [
    'All',
    'Elevator & Electrical',
    'Water Supply & Plumbing',
    'Facility Operations',
    'Security & Surveillance',
    'Sanitation & Hygiene',
    'Power & Generators',
    'Environment & STP',
    'Parks & Landscaping'
  ];

  const filteredEmployees = employees.filter(emp => {
    const matchesApt = selectedApartment === 'All' || emp.complex === selectedApartment || emp.complex === 'All Complexes';
    const matchesDept = departmentFilter === 'All' || emp.department === departmentFilter;
    const matchesStatus = statusFilter === 'All' || emp.status === statusFilter;
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.phone.includes(searchTerm) ||
      (emp.email && emp.email.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesApt && matchesDept && matchesStatus && matchesSearch;
  });

  const onDutyCount = employees.filter(e => e.status === 'On Duty').length;
  const availableCount = employees.filter(e => e.status === 'Available').length;
  const verifiedCount = employees.filter(e => e.policeVerified).length;

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.designation || !newStaff.phone) {
      alert('Please fill out Name, Designation, and Contact Phone.');
      return;
    }
    addEmployee(newStaff);
    setIsAddModalOpen(false);
    setNewStaff({
      name: '',
      designation: '',
      department: 'Facility Operations',
      complex: 'Golden Apartment',
      tower: 'Tower A',
      phone: '',
      email: '',
      shift: 'General (09:00 AM - 06:00 PM)',
      status: 'On Duty',
      experience: '3 Years'
    });
  };

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
              <Briefcase size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Employee & Staff Directory</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                Maintenance contractors, security command, caretakers, and facility engineers for BEE PROPERTY
              </p>
            </div>
          </div>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => setIsAddModalOpen(true)}>
          <UserPlus size={16} /> Add Staff Member
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid-cols-4">
        <StatCard 
          title="TOTAL STAFF" 
          value={employees.length} 
          subtitle="Enclave operations team" 
          icon={Users} 
          color="blue" 
        />
        <StatCard 
          title="ON DUTY" 
          value={onDutyCount} 
          subtitle="Active on campus now" 
          icon={Clock} 
          color="green" 
        />
        <StatCard 
          title="STANDBY / AVAILABLE" 
          value={availableCount} 
          subtitle="Ready for dispatch" 
          icon={CheckCircle2} 
          color="cyan" 
        />
        <StatCard 
          title="POLICE VERIFIED" 
          value={`${verifiedCount} / ${employees.length}`} 
          subtitle="100% Background checked" 
          icon={ShieldCheck} 
          color="indigo" 
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', flex: 1 }}>
            {/* Search Input */}
            <div style={{ position: 'relative', width: '280px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search staff, role, ID, phone..." 
                className="form-control"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '36px' }}
              />
            </div>

            {/* Department Dropdown */}
            <select 
              className="form-control"
              value={departmentFilter}
              onChange={e => setDepartmentFilter(e.target.value)}
              style={{ width: 'auto' }}
            >
              {departments.map(d => (
                <option key={d} value={d}>{d === 'All' ? 'All Departments' : d}</option>
              ))}
            </select>

            {/* Complex Dropdown */}
            <select 
              className="form-control"
              value={selectedApartment}
              onChange={e => setSelectedApartment(e.target.value)}
              style={{ width: 'auto' }}
            >
              <option value="All">All Complexes</option>
              {apartments.map(a => (
                <option key={a.id} value={a.name}>{a.name}</option>
              ))}
            </select>

            {/* Status Dropdown */}
            <select 
              className="form-control"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              style={{ width: 'auto' }}
            >
              <option value="All">All Statuses</option>
              <option value="On Duty">On Duty Only</option>
              <option value="Available">Available Only</option>
            </select>
          </div>

          <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            Showing <strong>{filteredEmployees.length}</strong> of <strong>{employees.length}</strong> personnel
          </span>
        </div>
      </div>

      {/* Staff Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
        gap: '20px'
      }}>
        {filteredEmployees.map(emp => (
          <div 
            key={emp.id} 
            className="glass-card"
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              position: 'relative',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              borderTop: emp.status === 'On Duty' ? '3px solid var(--success)' : '3px solid var(--cyan-blue)'
            }}
          >
            <div>
              {/* Top Row: Avatar & Badges */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'var(--grad-royal)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '1rem',
                    flexShrink: 0
                  }}>
                    {emp.avatar || emp.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                      {emp.name}
                    </h3>
                    <div style={{ fontSize: '0.75rem', color: 'var(--electric-blue)', fontWeight: 600 }}>
                      {emp.designation}
                    </div>
                  </div>
                </div>

                <StatusPill status={emp.status} />
              </div>

              {/* Department & Complex Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                <span className="badge badge-indigo" style={{ fontSize: '0.6875rem' }}>
                  <Wrench size={11} style={{ marginRight: '4px' }} />
                  {emp.department}
                </span>
                <ApartmentBadge apartment={emp.complex} />
              </div>

              {/* Meta details list */}
              <div style={{
                backgroundColor: 'var(--bg-hover)',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '0.8125rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Building2 size={13} /> Station / Tower:
                  </span>
                  <span style={{ fontWeight: 600 }}>{emp.tower}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Clock size={13} /> Shift:
                  </span>
                  <span style={{ fontWeight: 600, fontSize: '0.75rem' }}>{emp.shift}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Award size={13} /> Experience:
                  </span>
                  <span style={{ fontWeight: 600 }}>{emp.experience}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <ShieldCheck size={13} color="var(--success)" /> Verification:
                  </span>
                  <span style={{ color: 'var(--success)', fontWeight: 600, fontSize: '0.75rem' }}>
                    {emp.verificationCode}
                  </span>
                </div>
              </div>

              {/* Phone & Email */}
              <div style={{ fontSize: '0.8125rem', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
                <a 
                  href={`tel:${emp.phone}`}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontWeight: 600 
                  }}
                >
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--electric-blue)'
                  }}>
                    <Phone size={13} />
                  </div>
                  {emp.phone}
                </a>
                {emp.email && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                    <Mail size={13} style={{ marginLeft: '5px', color: 'var(--text-muted)' }} />
                    {emp.email}
                  </div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
              <button 
                className="btn btn-secondary btn-sm" 
                style={{ flex: 1 }}
                onClick={() => setSelectedStaff(emp)}
              >
                Full Profile
              </button>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setActiveTab('complaints');
                }}
              >
                Assign Work
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Staff Details Modal */}
      <Modal
        isOpen={!!selectedStaff}
        onClose={() => setSelectedStaff(null)}
        title={selectedStaff?.name || 'Staff Profile'}
        subtitle={`${selectedStaff?.designation} • ${selectedStaff?.department}`}
      >
        {selectedStaff && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', backgroundColor: 'var(--bg-hover)', borderRadius: '10px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'var(--grad-royal)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.25rem'
              }}>
                {selectedStaff.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 800 }}>{selectedStaff.name}</h3>
                  <StatusPill status={selectedStaff.status} />
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--electric-blue)', fontWeight: 600, marginTop: '2px' }}>
                  {selectedStaff.designation} (ID: {selectedStaff.id})
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Rating: ★ {selectedStaff.rating} / 5.0 • {selectedStaff.experience} Experience
                </div>
              </div>
            </div>

            <div className="grid-cols-2" style={{ gap: '12px' }}>
              <div className="glass-card" style={{ padding: '12px' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>ASSIGNED FACILITY</div>
                <div style={{ fontWeight: 700, marginTop: '4px', fontSize: '0.875rem' }}>{selectedStaff.complex}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Location: {selectedStaff.tower}</div>
              </div>
              <div className="glass-card" style={{ padding: '12px' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>SHIFT TIMING</div>
                <div style={{ fontWeight: 700, marginTop: '4px', fontSize: '0.875rem' }}>{selectedStaff.shift}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Rotational Roster</div>
              </div>
              <div className="glass-card" style={{ padding: '12px' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>PRIMARY CONTACT</div>
                <div style={{ fontWeight: 700, marginTop: '4px', fontSize: '0.875rem' }}>{selectedStaff.phone}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{selectedStaff.email || 'No email provided'}</div>
              </div>
              <div className="glass-card" style={{ padding: '12px' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>POLICE CLEARANCE</div>
                <div style={{ fontWeight: 700, marginTop: '4px', fontSize: '0.875rem', color: 'var(--success)' }}>
                  ✓ {selectedStaff.verificationCode}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Valid through 2027</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedStaff(null)}>
                Close
              </button>
              <a href={`tel:${selectedStaff.phone}`} className="btn btn-primary" style={{ textDecoration: 'none' }}>
                <Phone size={14} /> Call Now
              </a>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Staff Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Register New Staff Member"
        subtitle="Add a new employee, maintenance technician, or security personnel to the roster"
      >
        <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="e.g. Anand Kumar" 
              required
              value={newStaff.name}
              onChange={e => setNewStaff({ ...newStaff, name: e.target.value })}
            />
          </div>

          <div className="grid-cols-2" style={{ gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Designation *</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. Electrician / Gate Guard" 
                required
                value={newStaff.designation}
                onChange={e => setNewStaff({ ...newStaff, designation: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Department *</label>
              <select 
                className="form-control"
                value={newStaff.department}
                onChange={e => setNewStaff({ ...newStaff, department: e.target.value })}
              >
                {departments.filter(d => d !== 'All').map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid-cols-2" style={{ gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Assigned Complex *</label>
              <select 
                className="form-control"
                value={newStaff.complex}
                onChange={e => setNewStaff({ ...newStaff, complex: e.target.value })}
              >
                <option value="Golden Apartment">Golden Apartment</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Station / Tower Area</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. Golden Tower 1 / Security Gate" 
                value={newStaff.tower}
                onChange={e => setNewStaff({ ...newStaff, tower: e.target.value })}
              />
            </div>
          </div>

          <div className="grid-cols-2" style={{ gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Contact Phone *</label>
              <input 
                type="tel" 
                className="form-control" 
                placeholder="+91 98450 00000" 
                required
                value={newStaff.phone}
                onChange={e => setNewStaff({ ...newStaff, phone: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email (Optional)</label>
              <input 
                type="email" 
                className="form-control" 
                placeholder="staff@beeproperty.org" 
                value={newStaff.email}
                onChange={e => setNewStaff({ ...newStaff, email: e.target.value })}
              />
            </div>
          </div>

          <div className="grid-cols-2" style={{ gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Shift Timing</label>
              <select 
                className="form-control"
                value={newStaff.shift}
                onChange={e => setNewStaff({ ...newStaff, shift: e.target.value })}
              >
                <option value="General (09:00 AM - 06:00 PM)">General (09:00 AM - 06:00 PM)</option>
                <option value="Morning (06:30 AM - 03:30 PM)">Morning (06:30 AM - 03:30 PM)</option>
                <option value="Day (08:00 AM - 05:00 PM)">Day (08:00 AM - 05:00 PM)</option>
                <option value="Afternoon (01:00 PM - 10:00 PM)">Afternoon (01:00 PM - 10:00 PM)</option>
                <option value="Night (10:00 PM - 07:00 AM)">Night (10:00 PM - 07:00 AM)</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Experience</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. 5 Years" 
                value={newStaff.experience}
                onChange={e => setNewStaff({ ...newStaff, experience: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Register Staff Member
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
