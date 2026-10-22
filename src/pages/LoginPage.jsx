import React, { useState } from 'react';
import { useRwa } from '../context/RwaContext';
import beePropertyBg from '../assets/bee_rwa_property.jpg';
import { 
  Building2, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles,
  KeyRound
} from 'lucide-react';

export const LoginPage = () => {
  const { login } = useRwa();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = login(username, password);
      setIsLoading(false);
      if (!res.success) {
        setError(res.error || 'Invalid credentials.');
      }
    }, 400);
  };

  const autofill = (u, p) => {
    setUsername(u);
    setPassword(p);
    setError('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      backgroundImage: `linear-gradient(to right, rgba(6, 11, 20, 0.45) 0%, rgba(6, 11, 20, 0.75) 60%, rgba(6, 11, 20, 0.95) 100%), url(${beePropertyBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Left side brand banner / ambiance text */}
      <div style={{
        position: 'absolute',
        left: '5%',
        bottom: '8%',
        maxWidth: '560px',
        color: '#FFFFFF',
        zIndex: 2
      }} className="login-left-banner">
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '20px',
          backgroundColor: 'rgba(34, 211, 238, 0.15)',
          border: '1px solid rgba(34, 211, 238, 0.3)',
          color: '#22D3EE',
          fontSize: '0.8125rem',
          fontWeight: 700,
          marginBottom: '16px',
          backdropFilter: 'blur(8px)'
        }}>
          <Sparkles size={14} /> Gated Enclave Community
        </div>
        <h1 style={{
          fontSize: '2.75rem',
          fontWeight: 900,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)'
        }}>
          BEE PROPERTY RWA
        </h1>
        <p style={{
          fontSize: '1.0625rem',
          color: 'rgba(255, 255, 255, 0.85)',
          marginTop: '12px',
          lineHeight: 1.6,
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
        }}>
          Resident Welfare Association management system for Golden Apartment (Golden Tower 1, 2 & 3).
        </p>

        {/* Complex Pills */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
          <span style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(245, 158, 11, 0.5)',
            color: '#F59E0B',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: 700,
            backdropFilter: 'blur(6px)'
          }}>
            🏛️ Golden Tower 1 (12 Floors • Sujana)
          </span>
          <span style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(234, 179, 8, 0.5)',
            color: '#FDE047',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: 700,
            backdropFilter: 'blur(6px)'
          }}>
            🏛️ Golden Tower 2 (12 Floors • Kavaya)
          </span>
          <span style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(217, 119, 6, 0.5)',
            color: '#FBBF24',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: 700,
            backdropFilter: 'blur(6px)'
          }}>
            🏛️ Golden Tower 3 (10 Floors • Desk)
          </span>
        </div>
      </div>

      {/* Right side login form container */}
      <div style={{
        width: '100%',
        maxWidth: '480px',
        minHeight: '100vh',
        backgroundColor: 'rgba(11, 18, 32, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '48px 36px',
        zIndex: 5,
        color: '#FFFFFF'
      }}>
        {/* Brand header */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #1D4ED8 0%, #22D3EE 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 4px 16px rgba(34, 211, 238, 0.4)'
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
                BEE PROPERTY
              </div>
              <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--cyan-blue)', letterSpacing: '0.08em' }}>
                RWA MANAGEMENT PORTAL
              </div>
            </div>
          </div>

          <h2 style={{ fontSize: '1.625rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 6px 0' }}>
            Executive Login
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.875rem', margin: 0 }}>
            Sign in with authorized administrator credentials to manage enclave facilities and residents.
          </p>
        </div>

        {/* Quick Demo Access Bar */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          padding: '12px 14px',
          marginBottom: '22px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: '#22D3EE', marginBottom: '8px' }}>
            <KeyRound size={13} /> ONE-CLICK DEMO CREDENTIALS:
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => autofill('sujana', 'rwa123')}
              style={{
                flex: 1,
                padding: '7px 10px',
                borderRadius: '6px',
                border: '1px solid rgba(59, 130, 246, 0.5)',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                color: '#FFFFFF',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.35)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.2)'}
            >
              👑 President (sujana)
            </button>
            <button
              type="button"
              onClick={() => autofill('kavaya', 'rwa123')}
              style={{
                flex: 1,
                padding: '7px 10px',
                borderRadius: '6px',
                border: '1px solid rgba(34, 211, 238, 0.5)',
                backgroundColor: 'rgba(34, 211, 238, 0.15)',
                color: '#FFFFFF',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(34, 211, 238, 0.3)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(34, 211, 238, 0.15)'}
            >
              🛡️ Vice President (kavaya)
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(239, 68, 68, 0.18)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#FCA5A5',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '0.8125rem',
            marginBottom: '18px'
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Username input */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '6px' }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '14px', top: '12px', color: 'rgba(255, 255, 255, 0.4)' }} />
              <input
                type="text"
                className="form-control"
                placeholder="sujana or kavaya"
                value={username}
                onChange={e => { setUsername(e.target.value); setError(''); }}
                style={{
                  paddingLeft: '40px',
                  backgroundColor: 'rgba(255, 255, 255, 0.07)',
                  borderColor: 'rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  height: '42px',
                  borderRadius: '8px'
                }}
                required
              />
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: '4px' }}>
              Role IDs: <strong>sujana</strong> (President) or <strong>kavaya</strong> (Vice President)
            </div>
          </div>

          {/* Password input */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '6px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '14px', top: '12px', color: 'rgba(255, 255, 255, 0.4)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                style={{
                  paddingLeft: '40px',
                  paddingRight: '40px',
                  backgroundColor: 'rgba(255, 255, 255, 0.07)',
                  borderColor: 'rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  height: '42px',
                  borderRadius: '8px'
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '10px',
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.45)',
                  cursor: 'pointer',
                  padding: '2px'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: '4px' }}>
              Assigned password: <strong>rwa123</strong>
            </div>
          </div>

          {/* Remember me & Help */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--electric-blue)' }} />
              <span>Remember session</span>
            </label>
            <span style={{ color: 'var(--cyan-blue)', cursor: 'pointer' }}>Password: rwa123</span>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              height: '44px',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.9375rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 16px rgba(37, 99, 235, 0.4)',
              transition: 'all 0.2s ease',
              marginTop: '6px'
            }}
            onMouseEnter={e => { if (!isLoading) e.currentTarget.style.filter = 'brightness(1.1)'; }}
            onMouseLeave={e => { if (!isLoading) e.currentTarget.style.filter = 'none'; }}
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to RWA Portal</span>
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>

        {/* Credentials guide table */}
        <div style={{
          marginTop: '28px',
          padding: '12px 14px',
          borderRadius: '8px',
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          fontSize: '0.75rem'
        }}>
          <div style={{ fontWeight: 700, color: 'rgba(255, 255, 255, 0.8)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <ShieldCheck size={13} color="#10B981" /> RWA Access Credentials:
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255, 255, 255, 0.65)', padding: '2px 0' }}>
            <span>President:</span>
            <span style={{ color: '#F59E0B', fontWeight: 600 }}>p : sujana</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255, 255, 255, 0.65)', padding: '2px 0' }}>
            <span>Vice President:</span>
            <span style={{ color: '#22D3EE', fontWeight: 600 }}>vp : kavaya</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255, 255, 255, 0.65)', padding: '2px 0', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: '4px', paddingTop: '4px' }}>
            <span>Password:</span>
            <span style={{ color: '#10B981', fontWeight: 700 }}>rwa123</span>
          </div>
        </div>

        {/* Footer info */}
        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.6875rem', color: 'rgba(255, 255, 255, 0.4)' }}>
          BEE PROPERTY RWA v1.0 • Outer Ring Road Bangalore
        </div>
      </div>
    </div>
  );
};
