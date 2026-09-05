import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

export default function Footer() {
  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="brand-mark">
              <img src={logo} alt="Base Plan Architects logo" />
            </span>
            <p>
              Where vision meets structure — building design, consultancy, interior design and
              garden design across Dhaka.
            </p>
          </div>
          <div className="footer-col">
            <h5>Sitemap</h5>
            <ul>
              <li><Link to="/#projects">Projects</Link></li>
              <li><Link to="/#solution">Services</Link></li>
              <li><Link to="/#process">Process</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Services</h5>
            <ul>
              <li>Building Design</li>
              <li>Consultancy</li>
              <li>Interior Design</li>
              <li>Garden Design</li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contact</h5>
            <ul>
              <li>
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M8 14.5s5-4.2 5-8.2A5 5 0 003 6.3c0 4 5 8.2 5 8.2z" stroke="currentColor" strokeWidth="1.3" />
                  <circle cx="8" cy="6.3" r="1.7" stroke="currentColor" strokeWidth="1.3" />
                </svg>
                <span>House 900, Road 17, Block G,<br />Basundhara R/A, Dhaka 1229</span>
              </li>
              <li>
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M3.2 2.7l2.6.4c.4 0 .7.3.8.7l.6 2.2c.1.4 0 .8-.3 1.1l-1.2 1.1a10.5 10.5 0 004.9 4.9l1.1-1.2c.3-.3.7-.4 1.1-.3l2.2.6c.4.1.7.4.7.8l.4 2.6c.1.5-.3.9-.8.9C8.6 16.8-.2 8-.1 2.6c0-.5.4-.9.9-.8z" stroke="currentColor" strokeWidth="1.1" />
                </svg>
                <a href="tel:+8801339910397">+880 1339‑910397</a>
              </li>
              <li>
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M2 4.5l6 4.5 6-4.5" stroke="currentColor" strokeWidth="1.3" />
                  <rect x="2" y="3" width="12" height="10" rx="1.4" stroke="currentColor" strokeWidth="1.3" />
                </svg>
                <a href="mailto:baseplanarchitects@gmail.com">baseplanarchitects@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Base Plan Architects. All rights reserved.</span>
          <span>Where Vision Meets Structure</span>
        </div>
      </div>
    </footer>
  );
}
