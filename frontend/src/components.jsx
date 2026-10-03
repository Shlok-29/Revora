import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import { INDIAN_CITIES } from './utils/indianCities.js';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const push = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, message, type }]);
    window.setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 3600);
  };
  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="toast-stack">
        {toasts.map((toast) => (
          <div className={`toast toast-${toast.type}`} key={toast.id}>
            {toast.type === 'success' ? '✓' : '!'}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
export const useToast = () => useContext(ToastContext);

export function ProtectedRoute({ allowedRoles, children }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to={homeForRole(user.role)} replace />;
  return children;
}

export const homeForRole = (role) => (role === 'ADMIN' ? '/admin' : role === 'STORE_OWNER' ? '/owner' : '/stores');

function Logo() {
  return (
    <NavLink className="brand" to="/">
      <img src="/favicon.png" alt="REVORA" className="brand-logo-img" />
      <span>
        <strong>REVORA</strong>
        <small>discover · rate · trust</small>
      </span>
    </NavLink>
  );
}

export function CitySelect({ value, onChange, className = '', id = 'city-select', disabled = false }) {
  const metros = INDIAN_CITIES.filter((c) => c.tier === 1);
  const others = INDIAN_CITIES.filter((c) => c.tier !== 1);

  return (
    <select
      id={id}
      value={value || ''}
      onChange={(event) => onChange(event.target.value)}
      className={`city-select ${className}`}
      disabled={disabled}
    >
      <option value="">-- Select Indian City --</option>
      <optgroup label="🌟 Major Metros">
        {metros.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name} ({city.state})
          </option>
        ))}
      </optgroup>
      <optgroup label="📍 All Indian Cities">
        {others.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name} ({city.state})
          </option>
        ))}
      </optgroup>
    </select>
  );
}

export function LocationTopbarWidget() {
  const { location, updateLocation, requestBrowserLocation } = useAuth();
  const [open, setOpen] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const popoverRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleDetect = async () => {
    setDetecting(true);
    try {
      const detected = await requestBrowserLocation();
      toast(`GPS location detected: ${detected.city} (${detected.state})`);
      setOpen(false);
    } catch (err) {
      toast(err.message || 'Location permission denied.', 'error');
    } finally {
      setDetecting(false);
    }
  };

  const handleSelectCity = (cityName) => {
    if (!cityName) return;
    const match = INDIAN_CITIES.find((c) => c.name.toLowerCase() === cityName.toLowerCase());
    if (match) {
      updateLocation({
        city: match.name,
        state: match.state,
        lat: match.lat,
        lng: match.lng,
        isDetected: false,
      });
      toast(`Location set to ${match.name}`);
      setOpen(false);
    }
  };

  const popularCities = ['Mumbai', 'Delhi', 'Bengaluru', 'Pune', 'Hyderabad', 'Jaipur', 'Kolkata', 'Chennai'];

  return (
    <div className="location-widget-container" ref={popoverRef}>
      <button
        type="button"
        className={`location-topbar-pill ${location?.isDetected ? 'is-gps' : ''}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Change city or location"
      >
        <span className="location-pin-icon">📍</span>
        <span className="location-city-name">{location?.city || 'Select City'}</span>
        {location?.isDetected && <span className="gps-indicator" title="GPS Verified">GPS</span>}
        <span className="location-caret">▾</span>
      </button>

      {open && (
        <div className="location-popover-menu">
          <div className="location-popover-header">
            <div>
              <strong>Your City & Location</strong>
              <small>Showing places nearest to you</small>
            </div>
            <button type="button" className="close-popover-btn" onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="location-popover-body">
            <button
              type="button"
              className="gps-detect-btn"
              onClick={handleDetect}
              disabled={detecting}
            >
              <span className="detect-icon">{detecting ? '⏳' : '🎯'}</span>
              <div>
                <strong>{detecting ? 'Asking for location permission…' : 'Use Current GPS Location'}</strong>
                <small>Auto-detect nearest cafes and restaurants</small>
              </div>
            </button>

            <div className="popover-divider"><span>or select city</span></div>

            <div className="popover-select-wrap">
              <CitySelect
                value={location?.city}
                onChange={handleSelectCity}
              />
            </div>

            <div className="popover-quick-chips">
              <span className="quick-label">Quick switch:</span>
              <div className="chips-row">
                {popularCities.map((cityName) => (
                  <button
                    key={cityName}
                    type="button"
                    className={`quick-chip ${location?.city === cityName ? 'active' : ''}`}
                    onClick={() => handleSelectCity(cityName)}
                  >
                    {cityName}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function UserProfileMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const initial = user?.name?.slice(0, 1)?.toUpperCase() || 'U';

  return (
    <div className="user-profile-menu-container" ref={popoverRef}>
      <button
        type="button"
        className="user-avatar-btn"
        onClick={() => setOpen((prev) => !prev)}
        title={`Account & Profile: ${user?.name || 'User'}`}
        aria-label={`Logged in as ${user?.name || 'User'} • Open profile menu`}
        aria-expanded={open}
      >
        <span className="user-avatar">{initial}</span>
      </button>

      {open && (
        <div className="user-profile-dropdown" role="menu">
          <div className="user-dropdown-header">
            <span className="user-avatar large">{initial}</span>
            <div className="user-dropdown-info">
              <strong className="user-dropdown-name">{user?.name || 'Community Member'}</strong>
              <span className="user-dropdown-email">{user?.email}</span>
              <div className="user-dropdown-meta">
                <span className="user-role-badge">
                  {user?.role === 'ADMIN' ? 'Admin' : user?.role === 'STORE_OWNER' ? 'Store Owner' : 'Member'}
                </span>
                {user?.city && <span className="user-city-badge">📍 {user.city}</span>}
              </div>
            </div>
          </div>

          <div className="user-dropdown-divider" />

          <div className="user-dropdown-items">
            <button
              type="button"
              className="user-dropdown-item"
              onClick={() => {
                setOpen(false);
                navigate('/profile');
              }}
            >
              <span className="item-icon">👤</span>
              <div className="item-text">
                <strong>Profile & Security</strong>
                <small>Location, credentials & password</small>
              </div>
              <span className="item-arrow">↗</span>
            </button>
          </div>

          <div className="user-dropdown-divider" />

          <button
            type="button"
            className="user-dropdown-logout"
            onClick={() => {
              setOpen(false);
              logout();
            }}
          >
            <span className="item-icon">⎋</span>
            <span>Sign out of session</span>
          </button>
        </div>
      )}
    </div>
  );
}

export function Shell({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const shellRef = useRef(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('revora_theme') || 'light');
  useEffect(() => {
    localStorage.setItem('revora_theme', theme);
  }, [theme]);
  const handlePointerMove = (event) => {
    if (!shellRef.current) return;
    const bounds = shellRef.current.getBoundingClientRect();
    shellRef.current.style.setProperty('--mouse-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
    shellRef.current.style.setProperty('--mouse-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
  };
  const links =
    user?.role === 'ADMIN'
      ? [
          { to: '/admin', label: 'Overview', icon: '◌' },
          { to: '/admin/users', label: 'People', icon: '◎' },
          { to: '/admin/stores', label: 'Places', icon: '⌂' },
        ]
      : user?.role === 'STORE_OWNER'
      ? [{ to: '/owner', label: 'Owner pulse', icon: '◌' }]
      : [{ to: '/stores', label: 'Discover', icon: '⌂' }];

  return (
    <div
      ref={shellRef}
      onPointerMove={handlePointerMove}
      className={`app-shell no-sidebar-shell ${theme === 'dark' ? 'theme-dark' : ''}`}
    >
      <div className="ambient-scene" aria-hidden="true">
        <span className="ambient-orb orb-a" />
        <span className="ambient-orb orb-b" />
        <span className="ambient-orb orb-c" />
        <span className="ambient-ring ring-a" />
        <span className="ambient-ring ring-b" />
        <i className="ambient-node node-a" />
        <i className="ambient-node node-b" />
        <i className="ambient-node node-c" />
        <i className="ambient-spark spark-a" />
        <i className="ambient-spark spark-b" />
        <i className="ambient-spark spark-c" />
        <i className="ambient-spark spark-d" />
      </div>
      <main className="main-canvas">
        <header className="topbar">
          <div className="topbar-brand">
            <Logo />
            <span className="topbar-stamp">FIELD GUIDE / 01</span>
          </div>

          <nav className="top-nav">
            {links.map((link, index) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/admin' || link.to === '/owner' || link.to === '/stores'}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <span>0{index + 1}</span>
                {link.label}
                <b>↗</b>
              </NavLink>
            ))}
          </nav>

          <div className="topbar-actions">
            <LocationTopbarWidget />

            <button
              className="theme-toggle"
              onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <span>{theme === 'dark' ? '☼' : '◐'}</span>
              <b>{theme === 'dark' ? 'Light' : 'Dark'}</b>
            </button>

            <UserProfileMenu />
          </div>
        </header>
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
}

export function DistancePill({ distanceKm, city }) {
  if (distanceKm == null) {
    return city ? <span className="distance-pill city-only">📍 {city}</span> : null;
  }
  if (distanceKm < 1) {
    const meters = Math.round(distanceKm * 1000);
    return <span className="distance-pill close">📍 {meters} m away</span>;
  }
  return <span className="distance-pill">📍 {distanceKm.toFixed(1)} km away</span>;
}

export function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="page-header">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action && <div className="page-header-action">{action}</div>}
    </div>
  );
}

export function StatCard({ label, value, detail, accent = '' }) {
  return (
    <div className={`stat-card ${accent}`}>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {detail && <div className="stat-detail">{detail}</div>}
    </div>
  );
}

export function Pill({ children, tone = 'neutral' }) {
  return <span className={`pill pill-${tone}`}>{children}</span>;
}

export function Stars({ value = 0, onChange, size = 'normal' }) {
  const rounded = value == null ? 0 : Number(value);
  return (
    <div
      className={`stars stars-${size} ${onChange ? 'is-editable' : ''}`}
      aria-label={rounded ? `${rounded} out of 5 stars` : 'Not rated'}
    >
      {[1, 2, 3, 4, 5].map((star) =>
        onChange ? (
          <button
            type="button"
            key={star}
            className={star <= rounded ? 'filled' : ''}
            onClick={() => onChange(star)}
            aria-label={`Rate ${star} out of 5`}
          >
            ★
          </button>
        ) : (
          <span key={star} className={star <= rounded ? 'filled' : ''}>
            ★
          </span>
        )
      )}
    </div>
  );
}

export function RatingSummary({ value, count }) {
  return (
    <div className="rating-summary">
      <Stars value={value} />
      <strong>{value == null ? 'No ratings' : value.toFixed ? value.toFixed(1) : value}</strong>
      {count != null && (
        <span>
          {count} rating{count === 1 ? '' : 's'}
        </span>
      )}
    </div>
  );
}

export function EmptyState({ title = 'Nothing here yet', detail = 'New signals will appear here as they arrive.' }) {
  return (
    <div className="empty-state">
      <div className="empty-mark">◌</div>
      <h3>{title}</h3>
      <p>{detail}</p>
    </div>
  );
}

export function LoadingState({ label = 'Loading signal' }) {
  return (
    <div className="loading-state">
      <span className="spinner" />
      {label}…
    </div>
  );
}

export function FilterBar({ search, onSearch, placeholder = 'Search by name or address', children }) {
  return (
    <div className="filter-bar">
      <div className="search-field">
        <span>⌕</span>
        <input value={search} onChange={(event) => onSearch(event.target.value)} placeholder={placeholder} />
      </div>
      {children}
    </div>
  );
}

export function SortButton({ label, active, order, onClick }) {
  return (
    <button className={`sort-button ${active ? 'active' : ''}`} onClick={onClick}>
      {label}
      <span>{active ? (order === 'asc' ? '↑' : '↓') : '↕'}</span>
    </button>
  );
}

export function DataTable({ columns, rows, emptyTitle, emptyDetail }) {
  return rows.length ? (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id || row.email}>
              {columns.map((column) => (
                <td key={column.key}>{column.render ? column.render(row) : row[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <EmptyState title={emptyTitle} detail={emptyDetail} />
  );
}

export function FormField({ label, error, hint, children }) {
  return (
    <label className="form-field">
      <span>{label}</span>
      {children}
      {hint && !error && <small>{hint}</small>}
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}

export function Button({ children, variant = 'primary', type = 'button', disabled = false, onClick }) {
  return (
    <button type={type} className={`button button-${variant}`} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

export function SectionCard({ children, className = '' }) {
  return <section className={`section-card ${className}`}>{children}</section>;
}
