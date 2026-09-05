import { useState } from 'react';
import Reveal from '../components/Reveal';

const CONTACT_ITEMS = [
  {
    title: 'Studio address',
    body: 'House 900, Road 17, Block G, Basundhara R/A, Dhaka 1229',
    icon: (
      <svg viewBox="0 0 16 16" fill="none">
        <path d="M8 14.5s5-4.2 5-8.2A5 5 0 003 6.3c0 4 5 8.2 5 8.2z" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="8" cy="6.3" r="1.7" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    title: 'Phone',
    body: '+880 1339‑910397',
    href: 'tel:+8801339910397',
    icon: (
      <svg viewBox="0 0 16 16" fill="none">
        <path d="M3.2 2.7l2.6.4c.4 0 .7.3.8.7l.6 2.2c.1.4 0 .8-.3 1.1l-1.2 1.1a10.5 10.5 0 004.9 4.9l1.1-1.2c.3-.3.7-.4 1.1-.3l2.2.6c.4.1.7.4.7.8l.4 2.6c.1.5-.3.9-.8.9C8.6 16.8-.2 8-.1 2.6c0-.5.4-.9.9-.8z" stroke="currentColor" strokeWidth="1.1" />
      </svg>
    ),
  },
  {
    title: 'Email',
    body: 'baseplanarchitects@gmail.com',
    href: 'mailto:baseplanarchitects@gmail.com',
    icon: (
      <svg viewBox="0 0 16 16" fill="none">
        <path d="M2 4.5l6 4.5 6-4.5" stroke="currentColor" strokeWidth="1.3" />
        <rect x="2" y="3" width="12" height="10" rx="1.4" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    title: 'Studio hours',
    body: 'Saturday – Thursday, 10:00 AM – 6:00 PM',
    icon: (
      <svg viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.3" stroke="currentColor" strokeWidth="1.3" />
        <path d="M8 4.5V8l2.6 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const HOURS = [
  { title: 'Studio visits', body: 'Saturday – Thursday · 10:00 AM – 6:00 PM, by appointment.' },
  { title: 'Site visits', body: 'Scheduled per project, typically within the same working week.' },
  { title: 'Friday', body: 'Closed. Emails and calls are answered the next working day.' },
];

const initialFields = { name: '', email: '', phone: '', subject: '', message: '' };

export default function Contact() {
  const [fields, setFields] = useState(initialFields);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { name, email, phone, subject, message } = fields;

    const mailSubject = subject || `Website inquiry — ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;

    const mailto =
      'mailto:baseplanarchitects@gmail.com' +
      `?subject=${encodeURIComponent(mailSubject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSubmitted(true);
  }

  return (
    <>
      {/* ============ PAGE HERO ============ */}
      <section className="page-hero">
        <div className="hero-bg" aria-hidden="true"></div>
        <div className="container">
          <p className="eyebrow">Contact Base Plan Architects</p>
          <h1>Tell us about your plot — we&apos;ll take it from there.</h1>
          <p>
            Reach out about a new project, an existing site, or just to talk through an idea.
            We reply within one working day.
          </p>
        </div>
      </section>

      {/* ============ CONTACT MAIN ============ */}
      <section id="contact-main" className="section">
        <div className="container">
          <div className="contact-layout">
            <Reveal as="div">
              <p className="eyebrow">Get in touch</p>
              <h2 style={{ marginTop: '16px', fontSize: 'clamp(1.8rem,3vw,2.4rem)' }}>
                Our studio details.
              </h2>

              <div className="contact-info-list">
                {CONTACT_ITEMS.map((item) => (
                  <div className="contact-info-item" key={item.title}>
                    <div className="contact-info-icon">{item.icon}</div>
                    <div>
                      <h4>{item.title}</h4>
                      {item.href ? (
                        <a href={item.href}>{item.body}</a>
                      ) : (
                        <p>{item.body}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="contact-map" aria-hidden="true">
                <svg viewBox="0 0 400 250" fill="none">
                  <rect width="400" height="250" fill="#f4f3f1" />
                  <path d="M0 190h400M0 150h400M0 100h400" stroke="#eaeaea" strokeWidth="2" />
                  <path d="M60 0v250M180 0v250M300 0v250" stroke="#eaeaea" strokeWidth="2" />
                  <circle cx="220" cy="120" r="10" fill="#0d0d0d" />
                  <path d="M220 120c0 16-14 22-14 34s14 20 14 30c0-10 14-18 14-30s-14-18-14-34z" fill="#0d0d0d" />
                  <text x="200" y="200" fontFamily="Outfit, sans-serif" fontSize="13" fill="#acaba9">
                    Basundhara R/A, Dhaka
                  </text>
                </svg>
              </div>
            </Reveal>

            <Reveal as="div" variant="scale" className="contact-form-card">
              <h3>Send us a message</h3>
              <p>We&apos;ll get back to you by email or phone, usually within one working day.</p>

              {!submitted && (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="cf-name">Full name</label>
                      <input
                        id="cf-name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        value={fields.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="cf-phone">Phone</label>
                      <input
                        id="cf-phone"
                        name="phone"
                        type="tel"
                        placeholder="01XXX‑XXXXXX"
                        value={fields.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="cf-email">Email</label>
                    <input
                      id="cf-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@email.com"
                      value={fields.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="cf-subject">Subject</label>
                    <input
                      id="cf-subject"
                      name="subject"
                      type="text"
                      placeholder="What's this about?"
                      value={fields.subject}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="cf-message">Message</label>
                    <textarea
                      id="cf-message"
                      name="message"
                      required
                      placeholder="Tell us a little about your project or question..."
                      value={fields.message}
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary booking-submit">
                    Send Message
                  </button>
                  <p className="booking-note">
                    This opens your email app with the details filled in, addressed to
                    baseplanarchitects@gmail.com.
                  </p>
                </form>
              )}

              {submitted && (
                <div className="contact-success">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M8 12.5l2.5 2.5L16 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <h4>Message ready to send</h4>
                  <p>
                    We&apos;ve opened your email app with the details filled in — just hit send
                    and we&apos;ll be in touch shortly.
                  </p>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ HOURS ============ */}
      <section id="hours">
        <div className="container">
          <Reveal as="div" className="section-head" style={{ marginBottom: '32px' }}>
            <p className="eyebrow" style={{ color: '#acaba9' }}>Before you visit</p>
            <h2 style={{ color: '#fbfbfb' }}>Studio &amp; site hours.</h2>
          </Reveal>
          <div className="hours-grid">
            {HOURS.map((item) => (
              <Reveal as="div" className="hours-card" key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
