import React from 'react';
import { 
  Building2, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Calendar,
  Layers,
  Search,
  Filter,
  X
} from 'lucide-react';

export const StatusPill = ({ status }) => {
  const s = (status || '').toLowerCase().trim();
  
  if (['approved', 'assigned', 'acknowledged'].includes(s)) {
    return (
      <span className="badge badge-success" style={{ backgroundColor: '#ECFDF5', color: '#065F46', borderColor: '#A7F3D0' }}>
        <CheckCircle2 size={12} /> Approved
      </span>
    );
  }
  
  if (['in progress', 'reopened'].includes(s)) {
    return (
      <span className="badge badge-info" style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8', borderColor: '#BFDBFE' }}>
        <Clock size={12} /> In Progress
      </span>
    );
  }

  if (s === 'resolved') {
    return (
      <span className="badge badge-success" style={{ backgroundColor: '#F0FDF4', color: '#15803D', borderColor: '#BBF7D0' }}>
        <CheckCircle2 size={12} /> Resolved
      </span>
    );
  }

  if (s === 'closed') {
    return (
      <span className="badge badge-neutral" style={{ backgroundColor: '#F1F5F9', color: '#475569', borderColor: '#CBD5E1' }}>
        <CheckCircle2 size={12} /> Closed
      </span>
    );
  }

  if (['pending approval', 'submitted', 'pending'].includes(s)) {
    return (
      <span className="badge badge-warning" style={{ backgroundColor: '#FEF3C7', color: '#92400E', borderColor: '#FCD34D' }}>
        <Clock size={12} /> Pending Approval
      </span>
    );
  }

  return (
    <span className="badge badge-neutral">
      {status}
    </span>
  );
};

export const PriorityBadge = ({ priority }) => {
  const p = (priority || '').toLowerCase();
  
  if (p === 'urgent') {
    return (
      <span className="badge badge-priority-urgent">
        <ShieldAlert size={12} /> URGENT
      </span>
    );
  }
  if (p === 'high') {
    return (
      <span className="badge badge-priority-high">
        HIGH
      </span>
    );
  }
  if (p === 'medium') {
    return (
      <span className="badge badge-priority-medium">
        MEDIUM
      </span>
    );
  }
  return (
    <span className="badge badge-priority-low">
      LOW
    </span>
  );
};

export const ApartmentBadge = ({ apartment }) => {
  let color = 'var(--electric-blue)';
  let bg = 'rgba(59, 130, 246, 0.12)';
  const apt = (apartment || '').toLowerCase();
  
  if (apt.includes('tower 2') || apt.includes('tower-2') || apt.includes('gt-2') || apt.includes('gt2')) {
    color = '#2563EB';
    bg = 'rgba(37, 99, 235, 0.12)';
  } else if (apt.includes('tower 3') || apt.includes('tower-3') || apt.includes('gt-3') || apt.includes('gt3')) {
    color = '#059669';
    bg = 'rgba(16, 185, 129, 0.12)';
  } else if (apt.includes('golden') || apt.includes('tower 1') || apt.includes('tower-1') || apt.includes('gt-1') || apt.includes('gt1')) {
    color = '#D97706';
    bg = 'rgba(245, 158, 11, 0.12)';
  }

  return (
    <span 
      className="badge" 
      style={{ color, backgroundColor: bg, border: `1px solid ${color}33`, fontWeight: 600 }}
    >
      <Building2 size={12} /> {apartment || 'All Apartments'}
    </span>
  );
};

export const StatCard = ({ title, value, subtitle, icon: Icon, trend, color = 'blue', onClick, style, compact }) => {
  const colorMap = {
    blue: { iconBg: 'rgba(37, 99, 235, 0.15)', iconColor: '#2563EB', borderLeft: '#2563EB' },
    cyan: { iconBg: 'rgba(6, 182, 212, 0.15)', iconColor: '#0891B2', borderLeft: '#06B6D4' },
    green: { iconBg: 'rgba(16, 185, 129, 0.15)', iconColor: '#10B981', borderLeft: '#10B981' },
    amber: { iconBg: 'rgba(245, 158, 11, 0.15)', iconColor: '#F59E0B', borderLeft: '#F59E0B' },
    indigo: { iconBg: 'rgba(99, 102, 241, 0.15)', iconColor: '#6366F1', borderLeft: '#6366F1' },
    purple: { iconBg: 'rgba(139, 92, 246, 0.15)', iconColor: '#8B5CF6', borderLeft: '#8B5CF6' },
    rose: { iconBg: 'rgba(239, 68, 68, 0.15)', iconColor: '#EF4444', borderLeft: '#EF4444' }
  };

  const scheme = colorMap[color] || colorMap.blue;

  return (
    <div 
      style={{ 
        backgroundColor: 'var(--card-bg)',
        borderRadius: '8px',
        padding: compact ? '10px 14px' : '14px 18px',
        border: '1px solid var(--border-color)',
        borderLeft: `3px solid ${scheme.borderLeft}`,
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.12s ease, box-shadow 0.12s ease',
        ...style 
      }}
      onClick={onClick}
      onMouseEnter={onClick ? (e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }) : undefined}
      onMouseLeave={onClick ? (e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }) : undefined}
    >
      <div>
        <p style={{ fontSize: compact ? '0.675rem' : '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0 }}>
          {title}
        </p>
        <div style={{ marginTop: compact ? '2px' : '4px', fontSize: compact ? '1.35rem' : '1.75rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
          {value}
        </div>
        {subtitle && (
          <div style={{ fontSize: compact ? '0.675rem' : '0.75rem', color: scheme.iconColor, fontWeight: 600, marginTop: '3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            {trend && <span>{trend}</span>}
            <span>{subtitle}</span>
          </div>
        )}
      </div>
      {Icon && (
        <div style={{ 
          width: compact ? '32px' : '40px', 
          height: compact ? '32px' : '40px', 
          borderRadius: '6px', 
          backgroundColor: scheme.iconBg, 
          color: scheme.iconColor,
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <Icon size={compact ? 16 : 20} strokeWidth={1.5} />
        </div>
      )}
    </div>
  );
};

export const Modal = ({ isOpen, onClose, title, subtitle, headerExtra, children, maxWidth = '620px' }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ maxWidth }} 
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header" style={{ alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {typeof title === 'string' ? (
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>{title}</h3>
            ) : (
              title
            )}
            {subtitle && (
              typeof subtitle === 'string' ? (
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '4px', margin: 0 }}>{subtitle}</p>
              ) : (
                <div style={{ marginTop: '4px' }}>{subtitle}</div>
              )
            )}
          </div>
          {headerExtra && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              {headerExtra}
            </div>
          )}
          <button 
            className="btn btn-secondary btn-icon" 
            onClick={onClose}
            aria-label="Close modal"
            style={{ flexShrink: 0 }}
          >
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export const EmptyState = ({ icon: Icon = Layers, title, description, actionText, onAction }) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Icon size={28} />
      </div>
      <h4 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '6px' }}>{title}</h4>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 18px' }}>
        {description}
      </p>
      {actionText && onAction && (
        <button className="btn btn-primary btn-sm" onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
};
