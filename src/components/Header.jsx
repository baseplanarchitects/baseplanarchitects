import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import { useBookingModal } from '../context/BookingModalContext';

const NAV_LINKS = [
  { label: 'Projects', to: '/#projects' },
  { label: 'Services', to: '/#solution' },
  { label: 'Process', to: '/#process' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openBooking } = useBookingModal();
  const location = useLocation();

  // every route (Home, About, Contact) opens with a full-bleed dark
  // hero behind the nav, so the paper-on-ink look is correct everywhere
  // until the capsule scrolls and switches to the light background.

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => document.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', menuOpen);
  }, [menuOpen]);

  const path = location.pathname;
  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  function handleNavClick(e, to) {
    if (to.startsWith('/#') && location.pathname === '/') {
      const id = to.slice(2);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  return (
    <>
      <header
        id="site-header"
        className={scrolled ? 'scrolled' : ''}
      >
        <nav className="nav-shell" aria-label="Primary">
          <Link to="/" className="brand">
            <span className="brand-mark">
              <img src={logo} alt="Base Plan Architects logo" />
            </span>
            <span className="brand-word">Base Plan Architects</span>
          </Link>

          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to} onClick={(e) => handleNavClick(e, link.to)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-cta">
            <a href="tel:+8801339910397" className="btn btn-secondary">
              Call Us
            </a>
            <button className="btn btn-primary" onClick={openBooking}>
              Book Consultation
            </button>
            <button
              id="hamburger"
              className={`hamburger${menuOpen ? ' open' : ''}`}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </header>

      <div id="mobile-menu" className={menuOpen ? 'open' : ''}>
        <nav className="m-links" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={(e) => {
                handleNavClick(e, link.to);
                setMenuOpen(false);
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="m-cta">
          <button
            className="btn btn-ghost"
            onClick={() => {
              setMenuOpen(false);
              openBooking();
            }}
          >
            Book Consultation
          </button>
        </div>
        <div className="m-meta">
          <span>Dhaka, Bangladesh</span>
          <span>+880 1339‑910397</span>
        </div>
      </div>
    </>
  );
}