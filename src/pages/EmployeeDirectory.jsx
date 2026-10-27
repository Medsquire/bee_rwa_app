import React, { useState, useMemo } from 'react';
import { useRwa } from '../context/RwaContext';
import { Modal } from '../components/CommonUI';
import {
  Phone,
  Mail,
  Search,
  UserPlus,
  Edit3,
  Trash2,
  Copy,
  Check,
  User
} from 'lucide-react';

// Exact Palette from user reference image
const ROLE_THEME = {
  president: {
    color: '#1E2D4A', // Deep Navy Blue
    roleTitle: 'President'
  },
  'vice president': {
    color: '#5B739E', // Slate / Steel Blue
    roleTitle: 'Vice President'
  },
  vice_president: {
    color: '#5B739E',
    roleTitle: 'Vice President'
  },
  executive: {
    color: '#649E8D', // Sage Green / Teal
    roleTitle: 'Executive'
  },
  exicutive: {
    color: '#649E8D',
    roleTitle: 'Executive'
  },
  secretary: {
    color: '#7C78B8', // Soft Indigo / Lavender
    roleTitle: 'Secretary'
  },
  treasurer: {
    color: '#ECA257', // Warm Peach / Amber
    roleTitle: 'Treasurer'
  }
};

const getRoleTheme = (roleStr = '') => {
  const normalized = roleStr.trim().toLowerCase();
  return ROLE_THEME[normalized] || {
    color: '#475569',
    roleTitle: roleStr
  };
};

export const UsersDirectory = () => {
  const {
    councilUsers = [],
    addCouncilUser,
    updateCouncilUser,
    deleteCouncilUser,
    showToast
  } = useRwa();

  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // New User Form State
  const [newUser, setNewUser] = useState({
    name: '',
    role: 'Executive',
    phone: '',
    email: '',
    image: '',
    tower: 'Golden Tower 1',
    flat: 'GT1-101',
    term: '2025 - 2027'
  });

  // Filtered users based on search
  const filteredUsers = useMemo(() => {
    return [...councilUsers].filter((u) => {
      const term = searchTerm.toLowerCase();
      return (
        !searchTerm ||
        u.name.toLowerCase().includes(term) ||
        u.role.toLowerCase().includes(term) ||
        u.phone.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term)
      );
    });
  }, [councilUsers, searchTerm]);

  // Extract tiers: President (Tier 1), Vice President (Tier 2), Executive/Secretary/Treasurer (Tier 3)
  const president = useMemo(
    () => filteredUsers.find((u) => u.role.trim().toLowerCase() === 'president'),
    [filteredUsers]
  );

  const vicePresident = useMemo(
    () =>
      filteredUsers.find((u) => {
        const r = u.role.trim().toLowerCase();
        return r === 'vice president' || r === 'vice_president';
      }),
    [filteredUsers]
  );

  const executive = useMemo(
    () =>
      filteredUsers.find((u) => {
        const r = u.role.trim().toLowerCase();
        return r === 'executive' || r === 'exicutive';
      }),
    [filteredUsers]
  );

  const secretary = useMemo(
    () => filteredUsers.find((u) => u.role.trim().toLowerCase() === 'secretary'),
    [filteredUsers]
  );

  const treasurer = useMemo(
    () => filteredUsers.find((u) => u.role.trim().toLowerCase() === 'treasurer'),
    [filteredUsers]
  );

  // Remaining users if any extra are added
  const otherUsers = useMemo(() => {
    const knownIds = new Set([
      president?.id,
      vicePresident?.id,
      executive?.id,
      secretary?.id,
      treasurer?.id
    ].filter(Boolean));
    return filteredUsers.filter((u) => !knownIds.has(u.id));
  }, [filteredUsers, president, vicePresident, executive, secretary, treasurer]);

  const copyToClipboard = (text, id) => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    if (showToast) showToast(`Copied: ${text}`, 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newUser.name.trim() || !newUser.phone.trim() || !newUser.email.trim()) {
      alert('Please fill out Name, Phone Number, and Email.');
      return;
    }

    const defaultAvatars = {
      President: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=240&auto=format&fit=crop&q=80',
      'Vice President': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&auto=format&fit=crop&q=80',
      Executive: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80',
      Secretary: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&auto=format&fit=crop&q=80',
      Treasurer: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=240&auto=format&fit=crop&q=80'
    };

    const finalImage = newUser.image.trim() || defaultAvatars[newUser.role] || defaultAvatars.Executive;

    addCouncilUser({
      ...newUser,
      image: finalImage
    });

    setIsAddModalOpen(false);
    setNewUser({
      name: '',
      role: 'Executive',
      phone: '',
      email: '',
      image: '',
      tower: 'Golden Tower 1',
      flat: 'GT1-101',
      term: '2025 - 2027'
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingUser) return;
    updateCouncilUser(editingUser.id, editingUser);
    setEditingUser(null);
  };

  const getInitials = (name = '') => {
    return name
      .replace(/Col\.|Dr\.|Mr\.|Mrs\./g, '')
      .trim()
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  // Render an individual card matching the user's reference image exactly
  const renderExactCard = (user) => {
    if (!user) return null;
    const theme = getRoleTheme(user.role);

    return (
      <div key={user.id} className="exact-tree-card">
        {/* Top Colored Accent Stripe */}
        <div
          className="exact-tree-top-stripe"
          style={{ backgroundColor: theme.color }}
        />

        {/* Card Body: Round Avatar + Name & Contacts */}
        <div className="exact-tree-body">
          {/* Avatar */}
          {user.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="exact-tree-avatar"
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.nextSibling) {
                  e.target.nextSibling.style.display = 'flex';
                }
              }}
            />
          ) : null}
          <div
            className="exact-tree-avatar-fallback"
            style={{
              display: user.image ? 'none' : 'flex',
              backgroundColor: theme.color
            }}
          >
            {getInitials(user.name)}
          </div>

          {/* Details */}
          <div className="exact-tree-info">
            <div className="exact-tree-name">{user.name}</div>

            {/* Phone */}
            <a
              href={`tel:${user.phone.replace(/\s+/g, '')}`}
              className="exact-tree-contact"
              title="Click to call"
            >
              <Phone size={13} style={{ color: '#94A3B8', flexShrink: 0 }} />
              <span>{user.phone}</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${user.email}`}
              className="exact-tree-contact"
              title="Click to email"
            >
              <Mail size={13} style={{ color: '#94A3B8', flexShrink: 0 }} />
              <span>{user.email}</span>
            </a>
          </div>
        </div>

        {/* Bottom Role Pill Button */}
        <div className="exact-tree-pill-container">
          <div
            className="exact-tree-role-pill"
            style={{ backgroundColor: theme.color }}
          >
            {theme.roleTitle}
          </div>
        </div>

        {/* Hover Action Bar */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            display: 'flex',
            gap: '6px',
            opacity: 0.85
          }}
        >
          <button
            onClick={() => setEditingUser(user)}
            title="Edit member"
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-card-solid)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Edit3 size={12} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Top Header & Toolbar (No Sub-headings, No Count Cards) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        paddingBottom: '4px'
      }}>
        <div style={{ position: 'relative', flex: '1 1 260px', maxWidth: '360px' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Search hierarchy members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              paddingLeft: '38px',
              height: '38px',
              fontSize: '0.875rem',
              borderRadius: '10px',
              backgroundColor: 'var(--bg-card-solid)',
              borderColor: 'var(--border-color)'
            }}
          />
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => setIsAddModalOpen(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '9px 18px',
            borderRadius: '10px',
            fontWeight: 700,
            boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)'
          }}
        >
          <UserPlus size={16} /> Add Member
        </button>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="empty-state" style={{ padding: '48px 24px' }}>
          <div className="empty-state-icon">
            <User size={28} />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>No users match your search</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '16px' }}>
            Try searching by another name, role, phone number, or email.
          </p>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setSearchTerm('')}
          >
            Reset Search
          </button>
        </div>
      ) : (
        /* EXACT REFERENCE TREE STRUCTURE */
        <div className="exact-tree-wrapper">
          {/* LEVEL 1: PRESIDENT (Centered) */}
          {president && (
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              {renderExactCard(president)}
            </div>
          )}

          {/* CONNECTOR 1: Vertical Arrow from President to Vice President */}
          {president && vicePresident && (
            <div className="exact-tree-connector-single">
              <svg width="24" height="48" viewBox="0 0 24 48" style={{ display: 'block' }}>
                <line x1="12" y1="0" x2="12" y2="40" stroke="#94A3B8" strokeWidth="2" />
                <polygon points="7,40 17,40 12,47" fill="#94A3B8" />
              </svg>
            </div>
          )}

          {/* LEVEL 2: VICE PRESIDENT (Centered) */}
          {vicePresident && (
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              {renderExactCard(vicePresident)}
            </div>
          )}

          {/* CONNECTOR 2: Branching Arrow Lines from Vice President to Executive, Secretary, Treasurer */}
          {vicePresident && (executive || secretary || treasurer) && (
            <div
              style={{
                width: '100%',
                maxWidth: '1032px',
                height: '54px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto'
              }}
            >
              <svg
                width="1032"
                height="54"
                viewBox="0 0 1032 54"
                style={{ width: '100%', height: '54px', display: 'block' }}
              >
                {/* Vertical line dropping from Vice President bottom center (516, 0) */}
                <line x1="516" y1="0" x2="516" y2="24" stroke="#94A3B8" strokeWidth="2" />

                {/* Horizontal branch line spanning left (160) to right (872) */}
                <line x1="160" y1="24" x2="872" y2="24" stroke="#94A3B8" strokeWidth="2" />

                {/* Drop 1 to Left Card (Executive) at 160 */}
                <line x1="160" y1="24" x2="160" y2="46" stroke="#94A3B8" strokeWidth="2" />
                <polygon points="155,46 165,46 160,53" fill="#94A3B8" />

                {/* Drop 2 to Center Card (Secretary) at 516 */}
                <line x1="516" y1="24" x2="516" y2="46" stroke="#94A3B8" strokeWidth="2" />
                <polygon points="511,46 521,46 516,53" fill="#94A3B8" />

                {/* Drop 3 to Right Card (Treasurer) at 872 */}
                <line x1="872" y1="24" x2="872" y2="46" stroke="#94A3B8" strokeWidth="2" />
                <polygon points="867,46 877,46 872,53" fill="#94A3B8" />
              </svg>
            </div>
          )}

          {/* LEVEL 3: 3 CARDS SIDE BY SIDE (Executive, Secretary, Treasurer) */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'stretch',
              gap: '36px',
              width: '100%',
              maxWidth: '1032px',
              flexWrap: 'wrap'
            }}
          >
            {executive && renderExactCard(executive)}
            {secretary && renderExactCard(secretary)}
            {treasurer && renderExactCard(treasurer)}
          </div>

          {/* ANY EXTRA USERS (if custom added) */}
          {otherUsers.length > 0 && (
            <div style={{ marginTop: '36px', width: '100%', maxWidth: '1032px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '24px',
                  flexWrap: 'wrap'
                }}
              >
                {otherUsers.map((u) => renderExactCard(u))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add Member Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Council Member"
      >
        <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label className="form-label" style={{ fontWeight: 600 }}>Full Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Sneha Patel"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="form-label" style={{ fontWeight: 600 }}>Hierarchy Role *</label>
            <select
              className="form-control"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="President">President</option>
              <option value="Vice President">Vice President</option>
              <option value="Executive">Executive</option>
              <option value="Secretary">Secretary</option>
              <option value="Treasurer">Treasurer</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label className="form-label" style={{ fontWeight: 600 }}>Phone Number *</label>
              <input
                type="text"
                className="form-control"
                placeholder="+91 98765 00000"
                value={newUser.phone}
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="form-label" style={{ fontWeight: 600 }}>Email Address *</label>
              <input
                type="email"
                className="form-control"
                placeholder="name@example.com"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="form-label" style={{ fontWeight: 600 }}>Profile Image URL</label>
            <input
              type="url"
              className="form-control"
              placeholder="https://images.unsplash.com/... (Leave blank for default)"
              value={newUser.image}
              onChange={(e) => setNewUser({ ...newUser, image: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Save Member
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit User Modal */}
      {editingUser && (
        <Modal
          isOpen={Boolean(editingUser)}
          onClose={() => setEditingUser(null)}
          title={`Edit Details: ${editingUser.name}`}
        >
          <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label className="form-label" style={{ fontWeight: 600 }}>Full Name</label>
              <input
                type="text"
                className="form-control"
                value={editingUser.name}
                onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="form-label" style={{ fontWeight: 600 }}>Hierarchy Role</label>
              <select
                className="form-control"
                value={editingUser.role}
                onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
              >
                <option value="President">President</option>
                <option value="Vice President">Vice President</option>
                <option value="Executive">Executive</option>
                <option value="Secretary">Secretary</option>
                <option value="Treasurer">Treasurer</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label className="form-label" style={{ fontWeight: 600 }}>Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={editingUser.phone}
                  onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="form-label" style={{ fontWeight: 600 }}>Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="form-label" style={{ fontWeight: 600 }}>Profile Image URL</label>
              <input
                type="url"
                className="form-control"
                value={editingUser.image || ''}
                onChange={(e) => setEditingUser({ ...editingUser, image: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ color: 'var(--error)' }}
                onClick={() => {
                  if (window.confirm(`Remove ${editingUser.name} from the hierarchy?`)) {
                    deleteCouncilUser(editingUser.id);
                    setEditingUser(null);
                  }
                }}
              >
                <Trash2 size={14} style={{ marginRight: '6px' }} /> Remove Member
              </button>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditingUser(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export const EmployeeDirectory = UsersDirectory;
export default UsersDirectory;
