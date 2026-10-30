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
    blue: { iconBg: 'rgba(59, 130, 246, 0.12)', iconColor: '#3B82F6', borderLeft: '#3B82F6' },
    cyan: { iconBg: 'rgba(34, 211, 238, 0.15)', iconColor: '#0891B2', borderLeft: '#22D3EE' },
    green: { iconBg: 'rgba(16, 185, 129, 0.15)', iconColor: '#10B981', borderLeft: '#10B981' },
    amber: { iconBg: 'rgba(245, 158, 11, 0.15)', iconColor: '#F59E0B', borderLeft: '#F59E0B' },
    indigo: { iconBg: 'rgba(99, 102, 241, 0.15)', iconColor: '#6366F1', borderLeft: '#6366F1' },
    rose: { iconBg: 'rgba(239, 68, 68, 0.15)', iconColor: '#EF4444', borderLeft: '#EF4444' }
  };

  const scheme = colorMap[color] || colorMap.blue;

  return (
    <div 
      className={`glass-card stat-card ${onClick ? 'glass-card-interactive' : ''}`}
      style={{ 
        borderLeft: `4px solid ${scheme.borderLeft}`,
        ...(compact ? { padding: '12px 16px' } : {}),
        ...style 
      }}
      onClick={onClick}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: compact ? '0' : '12px' }}>
        <div>
          <p style={{ fontSize: compact ? '0.6875rem' : '0.8125rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0 }}>
            {title}
          </p>
          <div className="stat-value" style={{ marginTop: compact ? '2px' : '4px', fontSize: compact ? '1.4rem' : undefined }}>
            {value}
          </div>
        </div>
        {Icon && (
          <div style={{ 
            width: compact ? '36px' : '46px', 
            height: compact ? '36px' : '46px', 
            borderRadius: compact ? '8px' : '12px', 
            backgroundColor: scheme.iconBg, 
            color: scheme.iconColor,
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Icon size={compact ? 18 : 22} />
          </div>
        )}
      </div>
      {subtitle && (
        <div style={{ fontSize: compact ? '0.75rem' : '0.8125rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: compact ? '4px' : '0' }}>
          {trend && <span style={{ fontWeight: 600, color: trend.startsWith('+') ? 'var(--success)' : 'var(--error)' }}>{trend}</span>}
          <span>{subtitle}</span>
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
