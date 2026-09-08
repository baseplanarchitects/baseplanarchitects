import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, List, X } from '@phosphor-icons/react';
import logo from '../assets/logo.jpg';
import Magnetic from './Magnetic';
import { useBookingModal } from '../context/BookingModalContext';
const links = [['Home', '/'], ['Projects', '/projects'], ['Services', '/#solution'], ['Process', '/#process'], ['About', '/about'], ['Gallery', '/gallery'], ['Contact', '/contact']];
export default function Header() {
  const { openBooking } = useBookingModal();
  const location = useLocation();
  const menu = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { menu.current?.close(); }, [location]);
  return <><a href="#main-content" className="skip-link">Skip to content</a><header id="site-header"><nav className="nav-shell container" aria-label="Primary"><Link to="/" className="brand"><img src={logo} alt="Base Plan Architects logo" width="46" height="46" /><span>Base Plan<br /><small>Architects</small></span></Link><div className="nav-links">{links.map(([label, to]) => <Link key={label} to={to} aria-current={(location.pathname + location.hash) === to ? 'page' : undefined}>{label}</Link>)}</div><Magnetic className="nav-booking"><button className="btn btn-primary" onClick={openBooking}>Book Consultation <ArrowUpRight size={18} /></button></Magnetic><button className="menu-toggle" aria-label="Open menu" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => { menu.current.showModal(); setMenuOpen(true); }}><List size={28} /></button></nav></header>
    <dialog id="mobile-menu" aria-label="Site navigation" ref={menu} onClose={() => setMenuOpen(false)}><div className="mobile-menu-top"><span>Base Plan Architects</span><button aria-label="Close menu" onClick={() => menu.current.close()}><X size={28} /></button></div><nav aria-label="Mobile">{links.map(([label, to], i) => <Link key={label} to={to} onClick={() => menu.current.close()}><span>0{i + 1}</span>{label}<ArrowUpRight size={28} /></Link>)}</nav><button className="btn btn-primary" onClick={() => { menu.current.close(); openBooking(); }}>Book Consultation <ArrowUpRight /></button><a href="tel:+8801339910397">+880 1339-910397</a></dialog></>;
}



