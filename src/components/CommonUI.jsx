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
  const s = (status || '').toLowerCase();
  
  if (['approved', 'resolved', 'closed', 'confirmed', 'paid', 'active', 'available'].includes(s)) {
    return (
      <span className="badge badge-success">
        <CheckCircle2 size={12} /> {status}
      </span>
    );
  }
  
  if (['pending', 'in progress', 'assigned', 'partial', 'due soon'].includes(s)) {
    return (
      <span className="badge badge-warning">
        <Clock size={12} /> {status}
      </span>
    );
  }
  
  if (['rejected', 'overdue', 'cancelled', 'closed for maintenance', 'maintenance'].includes(s)) {
    return (
      <span className="badge badge-error">
        <AlertCircle size={12} /> {status}
      </span>
    );
  }
  
  if (['submitted', 'acknowledged'].includes(s)) {
    return (
      <span className="badge badge-info">
        <Layers size={12} /> {status}
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
  
  if (apartment?.includes('Golden')) {
    color = '#D97706';
    bg = 'rgba(245, 158, 11, 0.12)';
  } else if (apartment?.includes('Silver')) {
    color = '#475569';
    bg = 'rgba(148, 163, 184, 0.2)';
  } else if (apartment?.includes('Diamond')) {
    color = '#0891B2';
    bg = 'rgba(34, 211, 238, 0.15)';
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

export const StatCard = ({ title, value, subtitle, icon: Icon, trend, color = 'blue', onClick }) => {
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
      style={{ borderLeft: `4px solid ${scheme.borderLeft}` }}
      onClick={onClick}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div>
          <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {title}
          </p>
          <div className="stat-value" style={{ marginTop: '4px' }}>
            {value}
          </div>
        </div>
        {Icon && (
          <div style={{ 
            width: '46px', 
            height: '46px', 
            borderRadius: '12px', 
            backgroundColor: scheme.iconBg, 
            color: scheme.iconColor,
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <Icon size={22} />
          </div>
        )}
      </div>
      {subtitle && (
        <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          {trend && <span style={{ fontWeight: 600, color: trend.startsWith('+') ? 'var(--success)' : 'var(--error)' }}>{trend}</span>}
          <span>{subtitle}</span>
        </div>
      )}
    </div>
  );
};

export const Modal = ({ isOpen, onClose, title, subtitle, children, maxWidth = '620px' }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ maxWidth }} 
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{title}</h3>
            {subtitle && <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{subtitle}</p>}
          </div>
          <button 
            className="btn btn-secondary btn-icon" 
            onClick={onClose}
            aria-label="Close modal"
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
