import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const push = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, message, type }]);
    window.setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 3600);
  };
  return <ToastContext.Provider value={push}>{children}<div className="toast-stack">{toasts.map((toast) => <div className={`toast toast-${toast.type}`} key={toast.id}>{toast.type === 'success' ? '✓' : '!' }<span>{toast.message}</span></div>)}</div></ToastContext.Provider>;
}
export const useToast = () => useContext(ToastContext);

export function ProtectedRoute({ allowedRoles, children }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to={homeForRole(user.role)} replace />;
  return children;
}

export const homeForRole = (role) => role === 'ADMIN' ? '/admin' : role === 'STORE_OWNER' ? '/owner' : '/stores';

function Logo() {
  return <NavLink className="brand" to="/"><img src="/favicon.png" alt="REVORA" className="brand-logo-img" /><span><strong>REVORA</strong><small>discover · rate · trust</small></span></NavLink>;
}

export function Shell({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const shellRef = useRef(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('revora_theme') || 'light');
  useEffect(() => { localStorage.setItem('revora_theme', theme); }, [theme]);
  const handlePointerMove = (event) => { if (!shellRef.current) return; const bounds = shellRef.current.getBoundingClientRect(); shellRef.current.style.setProperty('--mouse-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`); shellRef.current.style.setProperty('--mouse-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`); };
  const links = user?.role === 'ADMIN'
    ? [{ to: '/admin', label: 'Overview', icon: '◌' }, { to: '/admin/users', label: 'People', icon: '◎' }, { to: '/admin/stores', label: 'Places', icon: '⌂' }]
    : user?.role === 'STORE_OWNER'
      ? [{ to: '/owner', label: 'Owner pulse', icon: '◌' }]
      : [{ to: '/stores', label: 'Discover', icon: '⌂' }];
  return <div ref={shellRef} onPointerMove={handlePointerMove} className={`app-shell no-sidebar-shell ${theme === 'dark' ? 'theme-dark' : ''}`}>
    <div className="ambient-scene" aria-hidden="true"><span className="ambient-orb orb-a" /><span className="ambient-orb orb-b" /><span className="ambient-orb orb-c" /><span className="ambient-ring ring-a" /><span className="ambient-ring ring-b" /><i className="ambient-node node-a" /><i className="ambient-node node-b" /><i className="ambient-node node-c" /><i className="ambient-spark spark-a" /><i className="ambient-spark spark-b" /><i className="ambient-spark spark-c" /><i className="ambient-spark spark-d" /></div>
    <main className="main-canvas"><header className="topbar"><div className="topbar-brand"><Logo /><span className="topbar-stamp">FIELD GUIDE / 01</span></div><nav className="top-nav">{links.map((link, index) => <NavLink key={link.to} to={link.to} end={link.to === '/admin' || link.to === '/owner' || link.to === '/stores'} className={({ isActive }) => isActive ? 'active' : ''}><span>0{index + 1}</span>{link.label}<b>↗</b></NavLink>)}</nav><div className="topbar-actions"><button className="theme-toggle" onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}><span>{theme === 'dark' ? '☼' : '◐'}</span><b>{theme === 'dark' ? 'Light' : 'Dark'}</b></button><button className="text-button" onClick={() => navigate('/change-password')}>Security</button><button className="user-menu" onClick={logout}><span className="user-avatar">{user?.name?.slice(0, 1)}</span><span className="user-name">{user?.name?.split(' ')[0]}</span><span className="status-dot" />Log out</button></div></header><div className="page-content">{children}</div></main>
  </div>;
}

export function PageHeader({ eyebrow, title, description, action }) { return <div className="page-header"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1>{description && <p>{description}</p>}</div>{action && <div className="page-header-action">{action}</div>}</div>; }
export function StatCard({ label, value, detail, accent = '' }) { return <div className={`stat-card ${accent}`}><div className="stat-label">{label}</div><div className="stat-value">{value}</div>{detail && <div className="stat-detail">{detail}</div>}</div>; }
export function Pill({ children, tone = 'neutral' }) { return <span className={`pill pill-${tone}`}>{children}</span>; }
export function Stars({ value = 0, onChange, size = 'normal' }) { const rounded = value == null ? 0 : Number(value); return <div className={`stars stars-${size} ${onChange ? 'is-editable' : ''}`} aria-label={rounded ? `${rounded} out of 5 stars` : 'Not rated'}>{[1, 2, 3, 4, 5].map((star) => onChange ? <button type="button" key={star} className={star <= rounded ? 'filled' : ''} onClick={() => onChange(star)} aria-label={`Rate ${star} out of 5`}>★</button> : <span key={star} className={star <= rounded ? 'filled' : ''}>★</span>)}</div>; }
export function RatingSummary({ value, count }) { return <div className="rating-summary"><Stars value={value} /><strong>{value == null ? 'No ratings' : value.toFixed ? value.toFixed(1) : value}</strong>{count != null && <span>{count} rating{count === 1 ? '' : 's'}</span>}</div>; }
export function EmptyState({ title = 'Nothing here yet', detail = 'New signals will appear here as they arrive.' }) { return <div className="empty-state"><div className="empty-mark">◌</div><h3>{title}</h3><p>{detail}</p></div>; }
export function LoadingState({ label = 'Loading signal' }) { return <div className="loading-state"><span className="spinner" />{label}…</div>; }
export function FilterBar({ search, onSearch, placeholder = 'Search by name or address', children }) { return <div className="filter-bar"><div className="search-field"><span>⌕</span><input value={search} onChange={(event) => onSearch(event.target.value)} placeholder={placeholder} /></div>{children}</div>; }
export function SortButton({ label, active, order, onClick }) { return <button className={`sort-button ${active ? 'active' : ''}`} onClick={onClick}>{label}<span>{active ? (order === 'asc' ? '↑' : '↓') : '↕'}</span></button>; }
export function DataTable({ columns, rows, emptyTitle, emptyDetail }) { return rows.length ? <div className="table-wrap"><table><thead><tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.id || row.email}>{columns.map((column) => <td key={column.key}>{column.render ? column.render(row) : row[column.key]}</td>)}</tr>)}</tbody></table></div> : <EmptyState title={emptyTitle} detail={emptyDetail} />; }
export function FormField({ label, error, hint, children }) { return <label className="form-field"><span>{label}</span>{children}{hint && !error && <small>{hint}</small>}{error && <small className="field-error">{error}</small>}</label>; }
export function Button({ children, variant = 'primary', type = 'button', disabled = false, onClick }) { return <button type={type} className={`button button-${variant}`} disabled={disabled} onClick={onClick}>{children}</button>; }
export function SectionCard({ children, className = '' }) { return <section className={`section-card ${className}`}>{children}</section>; }
