import { useEffect, useState } from 'react';
import { Link, NavLink, Navigate, useParams } from 'react-router-dom';
import { ArrowUpRight, House, Users, UserPlus, Receipt, ClipboardText, List, X, ArrowLeft, LockKey } from '@phosphor-icons/react';
import logo from '../../assets/logo.jpg';

export const ADMIN_LOGIN = '/base-plan-architect-admin-login';
const sections = [ ['home', 'Home', House], ['leads', 'Leads', UserPlus], ['clients', 'Clients', Users], ['invoice', 'Invoice', Receipt], ['workorder', 'Workorder', ClipboardText] ];
const examples = {
  leads: { description: 'Track enquiries and the next conversation.', columns: ['Name', 'Project interest', 'Stage', 'Next step'], rows: [['Sample enquiry A', 'Residential interior', 'New', 'Schedule consultation'], ['Sample enquiry B', 'Commercial interior', 'Contacted', 'Prepare proposal'], ['Sample enquiry C', 'Building design', 'Proposal sent', 'Follow up']] },
  clients: { description: 'A clear view of your client relationships.', columns: ['Client', 'Project', 'Status', 'Contact'], rows: [['Sample client A', 'Apartment interior', 'Active', 'Not provided'], ['Sample client B', 'Office interior', 'Active', 'Not provided']] },
  invoice: { description: 'Keep project billing in view.', columns: ['Invoice', 'Client', 'Amount', 'Status'], rows: [['DEMO-001', 'Sample client A', 'BDT 45,000', 'Draft'], ['DEMO-002', 'Sample client B', 'BDT 80,000', 'Pending']] },
  workorder: { description: 'Coordinate the work from approval to handover.', columns: ['Workorder', 'Scope', 'Assigned to', 'Status'], rows: [['DEMO-WO-001', 'Interior drawings', 'Design team', 'In progress'], ['DEMO-WO-002', 'Site measurements', 'Site team', 'Scheduled']] },
};

function Brand() { return <Link to="/" className="admin-brand"><img src={logo} width="48" height="48" alt="Base Plan Architects" /><span>Base Plan<small>ARCHITECTS / STUDIO ADMIN</small></span></Link>; }
export default function Admin({ preview = false }) {
  const { section = 'home' } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    document.title = `${preview ? 'Dashboard preview' : 'Admin login'} | Base Plan Architects`;
    const robots = document.createElement('meta');
    robots.name = 'robots'; robots.content = 'noindex, nofollow'; document.head.append(robots);
    return () => robots.remove();
  }, [preview]);
  useEffect(() => { setQuery(''); setMenuOpen(false); }, [section]);

  if (!preview) return <main className="admin-login">
    <aside className="admin-login-story"><Brand /><div><p className="admin-kicker">THE STUDIO, CONNECTED</p><h1>One place.<br />Every detail.</h1><p>From the first enquiry to the final handover, keep your practice in view.</p><div className="admin-plan" aria-hidden="true"><i /><i /><i /></div></div><span className="admin-kicker">BASE PLAN ARCHITECTS · DHAKA</span></aside>
    <section className="admin-login-form"><Link to="/" className="admin-back"><ArrowLeft /> Back to website</Link><div className="admin-login-fields"><LockKey size={32} weight="thin" /><p className="admin-kicker">PRIVATE STUDIO ACCESS</p><h2>Welcome back.</h2><p>Sign in to your studio workspace.</p><form onSubmit={e => { e.preventDefault(); setMessage('Secure authentication is not connected yet. Sign-in is unavailable. You can explore the sample dashboard below.'); }}>
      <label htmlFor="admin-email">Email address</label><input id="admin-email" name="email" type="email" autoComplete="username" placeholder="Your studio email" required />
      <label htmlFor="admin-password">Password</label><div className="admin-password"><input id="admin-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required /><button type="button" aria-pressed={showPassword} onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</button></div>
      <p className="admin-setup-note">Authentication setup pending. This form does not grant access to private records.</p>
      <button className="admin-primary" type="submit">Sign in <ArrowUpRight size={19} /></button>{message && <p role="alert" className="admin-form-message">{message}</p>}
    </form><Link className="admin-preview-link" to="/admin-preview/home">Explore sample dashboard <ArrowUpRight size={17} /></Link></div><span className="admin-login-foot">A considered space for the business behind the design.</span></section>
  </main>;

  if (!sections.some(([id]) => id === section)) return <Navigate to="/admin-preview/home" replace />;
  const title = sections.find(([id]) => id === section)[1];
  const data = examples[section];
  const rows = data?.rows.filter(row => row.join(' ').toLowerCase().includes(query.toLowerCase())) ?? [];
  return <div className="admin-shell">
    {menuOpen && <button className="admin-scrim" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
    <aside className={`admin-sidebar ${menuOpen ? 'is-open' : ''}`}><Brand /><button className="admin-close" aria-label="Close navigation" onClick={() => setMenuOpen(false)}><X size={24} /></button><p className="admin-kicker">WORKSPACE</p><nav aria-label="Admin navigation">{sections.map(([id, label, Icon]) => <NavLink key={id} to={`/admin-preview/${id}`}><Icon size={21} /><span>{label}</span></NavLink>)}</nav><div className="admin-sidebar-bottom"><span className="admin-kicker">SAMPLE WORKSPACE</span><p>Good work starts<br />with a clear plan.</p><Link to={ADMIN_LOGIN}><ArrowLeft size={18} /> Back to login</Link></div></aside>
    <main className="admin-workspace"><header className="admin-topbar"><button className="admin-menu" aria-label="Open navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><List size={24} /></button><span>Studio / <strong>{title}</strong></span><Link to="/">View website <ArrowUpRight size={16} /></Link></header><div className="admin-content"><div className="admin-demo-note">Preview mode <span>Sample records only. Authentication and live data are not connected.</span></div><div className="admin-page-heading"><p className="admin-kicker">BASE PLAN / STUDIO MANAGEMENT</p><h1>{section === 'home' ? 'Studio overview.' : `${title}.`}</h1><p>{data?.description ?? 'Your projects, people and priorities — in one place.'}</p></div>
    {section === 'home' ? <><div className="admin-metrics">{[['New leads', '03', 'leads'], ['Active clients', '02', 'clients'], ['Pending invoices', '01', 'invoice'], ['Open workorders', '02', 'workorder']].map(([label, value, path]) => <Link key={path} to={`/admin-preview/${path}`}><span>{label}<ArrowUpRight size={18} /></span><strong>{value}</strong><small>View {label.toLowerCase()}</small></Link>)}</div><div className="admin-home-grid"><section className="admin-panel"><div className="admin-panel-heading"><h2>Next in the studio</h2><span>Sample activity</span></div>{[['01', 'A new conversation', 'Review the latest enquiry.', 'leads'], ['02', 'Keep the work moving', 'Check upcoming site measurements.', 'workorder'], ['03', 'Close the loop', 'Review the pending invoice.', 'invoice']].map(([num, label, description, path]) => <Link className="admin-task" key={num} to={`/admin-preview/${path}`}><span>{num}</span><div><h3>{label}</h3><p>{description}</p></div><ArrowUpRight size={20} /></Link>)}</section><section className="admin-studio-note"><ClipboardText size={34} weight="thin" /><p className="admin-kicker">FROM BRIEF TO BUILT</p><h2>Make room<br />for good work.</h2><p>Keep scope, client conversations and delivery visible throughout each project.</p><Link to="/admin-preview/workorder">Explore workorders <ArrowUpRight /></Link></section></div></> : <section className="admin-panel"><div className="admin-panel-heading"><h2>All {title.toLowerCase()} <span>({rows.length})</span></h2><label className="admin-search"><span className="admin-kicker">SEARCH</span><input type="search" aria-label={`Search ${title}`} value={query} onChange={e => setQuery(e.target.value)} placeholder={`Search ${title.toLowerCase()}…`} /></label></div><div className="admin-table-scroll"><table><thead><tr>{data.columns.map(col => <th key={col} scope="col">{col}</th>)}</tr></thead><tbody>{rows.map(row => <tr key={row[0]}>{row.map((cell, index) => <td key={index}>{index === 0 ? <strong>{cell}</strong> : cell}</td>)}</tr>)}</tbody></table>{!rows.length && <p className="admin-empty" role="status">No matching records. Try another search.</p>}</div></section>}
    <footer className="admin-page-footer">Base Plan Architects <span>Studio workspace / Preview</span></footer></div></main>
  </div>;
}
