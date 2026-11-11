import React, { useState } from 'react';
import { useRwa } from '../context/RwaContext';
import beePropertyBg from '../assets/bee_rwa_property.jpg';
import logoImg from '../assets/logo.jpg';
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
  KeyRound,
  X
} from 'lucide-react';

export const LoginPage = () => {
  const { login } = useRwa();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

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

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    setForgotSubmitted(true);
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
      overflow: 'hidden',
      padding: '20px'
    }}>

      {/* Reduced compact login form container */}
      <div style={{
        width: '100%',
        maxWidth: '350px',
        backgroundColor: 'rgba(11, 18, 32, 0.90)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '14px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.65)',
        display: 'flex',
        flexDirection: 'column',
        padding: '26px 22px',
        zIndex: 5,
        color: '#FFFFFF',
        marginRight: 'clamp(12px, 5vw, 60px)'
      }}>
        {/* Brand header */}
        <div style={{ marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35)',
              padding: '2px',
              flexShrink: 0
            }}>
              <img 
                src={logoImg} 
                alt="BEE PROPERTY Logo" 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
              />
            </div>
            <div>
              <div style={{ fontSize: '1.05rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
                BEE PROPERTY
              </div>
            </div>
          </div>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', margin: '0' }}>
            RWA Portal
          </h2>
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
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '0.78rem',
            marginBottom: '14px'
          }}>
            <AlertCircle size={15} strokeWidth={1.5} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
          {/* Username input */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '5px' }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <User size={15} strokeWidth={1.5} style={{ position: 'absolute', left: '12px', top: '11px', color: 'rgba(255, 255, 255, 0.45)' }} />
              <input
                type="text"
                className="form-control"
                placeholder="sujana or kavaya"
                value={username}
                onChange={e => { setUsername(e.target.value); setError(''); }}
                style={{
                  paddingLeft: '36px',
                  backgroundColor: 'rgba(255, 255, 255, 0.07)',
                  borderColor: 'rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  height: '38px',
                  borderRadius: '6px',
                  fontSize: '0.8125rem'
                }}
                required
              />
            </div>
          </div>

          {/* Password input */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '5px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={15} strokeWidth={1.5} style={{ position: 'absolute', left: '12px', top: '11px', color: 'rgba(255, 255, 255, 0.45)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                style={{
                  paddingLeft: '36px',
                  paddingRight: '36px',
                  backgroundColor: 'rgba(255, 255, 255, 0.07)',
                  borderColor: 'rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  height: '38px',
                  borderRadius: '6px',
                  fontSize: '0.8125rem'
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '9px',
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.45)',
                  cursor: 'pointer',
                  padding: '2px'
                }}
              >
                {showPassword ? <EyeOff size={15} strokeWidth={1.5} /> : <Eye size={15} strokeWidth={1.5} />}
              </button>
            </div>
          </div>

          {/* Remember me & Forgot Password */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.65)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--electric-blue)' }} />
              <span>Remember session</span>
            </label>
            <button
              type="button"
              onClick={() => setShowForgotModal(true)}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: '#38BDF8',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 500,
                textDecoration: 'none'
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#7DD3FC'}
              onMouseLeave={e => e.currentTarget.style.color = '#38BDF8'}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              height: '38px',
              borderRadius: '6px',
              border: 'none',
              background: 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
              transition: 'all 0.2s ease',
              marginTop: '4px'
            }}
            onMouseEnter={e => { if (!isLoading) e.currentTarget.style.filter = 'brightness(1.1)'; }}
            onMouseLeave={e => { if (!isLoading) e.currentTarget.style.filter = 'none'; }}
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to RWA Portal</span>
                <ArrowRight size={15} strokeWidth={1.5} />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.72)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '16px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '340px',
            backgroundColor: '#0B1220',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.75)',
            color: '#FFFFFF'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 700 }}>
                <KeyRound size={16} strokeWidth={1.5} color="#38BDF8" />
                <span>Reset Password</span>
              </div>
              <button
                type="button"
                onClick={() => { setShowForgotModal(false); setForgotSubmitted(false); setForgotEmail(''); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            {forgotSubmitted ? (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#6EE7B7',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  marginBottom: '14px'
                }}>
                  <CheckCircle2 size={16} strokeWidth={1.5} style={{ flexShrink: 0 }} />
                  <span>Reset instructions sent to your registered email!</span>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => { setShowForgotModal(false); setForgotSubmitted(false); setForgotEmail(''); }}
                  style={{ width: '100%', height: '36px', fontSize: '0.8125rem' }}
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. sujana@beeproperty.org"
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  style={{
                    height: '38px',
                    fontSize: '0.8125rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    borderColor: 'rgba(255, 255, 255, 0.18)',
                    color: '#FFFFFF',
                    borderRadius: '6px'
                  }}
                  required
                />
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ flex: 1, height: '36px', fontSize: '0.8125rem', padding: '0 10px' }}
                  >
                    Send Reset Link
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowForgotModal(false)}
                    style={{ height: '36px', fontSize: '0.8125rem', padding: '0 10px' }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
