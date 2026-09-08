import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowUp } from '@phosphor-icons/react';
import logo from '../assets/logo.jpg';
import Magnetic from './Magnetic';
import ThemeToggle from './ThemeToggle';
import { useBookingModal } from '../context/BookingModalContext';
const links = [['Home', '/'], ['Projects', '/projects'], ['Services', '/#solution'], ['Process', '/#process'], ['About', '/about'], ['Gallery', '/gallery'], ['Contact', '/contact']];
export default function Footer() {
  const { openBooking } = useBookingModal();
  return <footer id="footer" className="dark-footer"><div className="container">
    <div className="footer-invitation"><div><p className="eyebrow">Have a space in mind?</p><h2>Let’s make it<br /><span>something meaningful.</span></h2></div><Magnetic><button className="footer-consult" onClick={openBooking}>Book Consultation <ArrowUpRight size={22} /></button></Magnetic></div>
    <div className="footer-info"><div className="footer-identity"><Link to="/" aria-label="Base Plan Architects home"><img src={logo} alt="Base Plan Architects" width="180" height="180" loading="lazy" /></Link><p>Architecture. Interiors. Construction.<br />One considered plan, from start to finish.</p></div>
      <div className="footer-menu"><p className="eyebrow">Explore</p>{links.map(([label, to]) => <Link key={label} to={to}><span>{label}</span><ArrowUpRight size={15} /></Link>)}</div>
      <div className="footer-contact"><p className="eyebrow">Start a conversation</p><a href="mailto:baseplanarchitects@gmail.com">baseplanarchitects@gmail.com <ArrowUpRight size={16} /></a><a href="tel:+8801339910397">+880 1339-910397 <ArrowUpRight size={16} /></a></div>
      <div className="footer-address"><p className="eyebrow">Visit the studio</p><p>House 900, Road 17, Block G<br />Basundhara R/A<br />Dhaka 1229, Bangladesh</p><p className="footer-hours">Saturday - Thursday<br />10:00 AM - 6:00 PM</p></div>
    </div>
    <div className="footer-bottom"><span>© 2026 Base Plan Architects. All rights reserved.</span><ThemeToggle /><a href="#main-content">Back to top <ArrowUp size={14} /></a></div>
  </div></footer>;
}


