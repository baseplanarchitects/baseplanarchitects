import { useEffect, useRef, useState } from 'react';
import { useBookingModal } from '../context/BookingModalContext';
import { services } from '../data/services';

const initialFields = {
  name: '',
  phone: '',
  email: '',
  date: '',
  time: '',
  service: services[0][0],
  message: '',
};

export default function BookingModal() {
  const { isOpen, closeBooking } = useBookingModal();
  const [fields, setFields] = useState(initialFields);
  const [submitted, setSubmitted] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) overlayRef.current?.showModal();
    else overlayRef.current?.close();
  }, [isOpen]);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape' && isOpen) closeBooking();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeBooking]);

  // reset the form a beat after the close transition finishes, so it's
  // fresh next time it opens (matches the original site's behaviour)
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setFields(initialFields);
        setSubmitted(false);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { name, email, phone, date, time, service, message } = fields;

    const subject = `Consultation Request, ${name}`;
    const body =
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n` +
      `Preferred date: ${date}\n` +
      `Preferred time: ${time}\n` +
      `Service: ${service}\n\n` +
      `Message:\n${message}`;

    const mailto =
      'mailto:baseplanarchitects@gmail.com' +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSubmitted(true);
  }

  return (
    <dialog
      id="booking-overlay"
      ref={overlayRef}
      aria-labelledby="booking-title"
      onCancel={closeBooking}
      className={isOpen ? 'open' : ''}
      onClick={(e) => {
        if (e.target === overlayRef.current) closeBooking();
      }}
    >
      <div
        className="booking-modal"
      >
        <div className="booking-head">
          <div>
            <h3 id="booking-title">Book a Consultation</h3>
            <p>
              Tell us a little about your project and a preferred time, we&apos;ll confirm by
              email or phone.
            </p>
          </div>
          <button
            id="booking-close"
            className="booking-close"
            aria-label="Close"
            onClick={closeBooking}
          >
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {!submitted && (
          <form id="booking-form" className="booking-form" onSubmit={handleSubmit}>
            <div className="field-row">
              <div className="field">
                <label htmlFor="bf-name">Full name</label>
                <input
                  id="bf-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  value={fields.name}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label htmlFor="bf-phone">Phone</label>
                <input
                  id="bf-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="01XXX‑XXXXXX"
                  value={fields.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="bf-email">Email</label>
              <input
                id="bf-email"
                name="email"
                type="email"
                required
                placeholder="you@email.com"
                value={fields.email}
                onChange={handleChange}
              />
            </div>
            <div className="field-row">
              <div className="field">
                <label htmlFor="bf-date">Preferred date</label>
                <input
                  id="bf-date"
                  name="date"
                  type="date"
                  value={fields.date}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label htmlFor="bf-time">Preferred time</label>
                <select id="bf-time" name="time" value={fields.time} onChange={handleChange}>
                  <option value="">Any time</option>
                  <option>10:00 AM</option>
                  <option>12:00 PM</option>
                  <option>3:00 PM</option>
                  <option>5:00 PM</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label htmlFor="bf-service">Service</label>
              <select id="bf-service" name="service" value={fields.service} onChange={handleChange}>
                {services.map(([title]) => <option key={title}>{title}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="bf-message">Tell us about your project</label>
              <textarea
                id="bf-message"
                name="message"
                placeholder="Plot size, location, what you have in mind..."
                value={fields.message}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary booking-submit">
              Request Consultation
            </button>
            <p className="booking-note">
              This opens your email app with the details filled in, addressed to
              baseplanarchitects@gmail.com.
            </p>
          </form>
        )}

        {submitted && (
          <div id="booking-success" className="booking-success show">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.4" />
              <path d="M8 12.5l2.5 2.5L16 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h4>Request ready to send</h4>
            <p>
              We&apos;ve opened your email app with the details filled in, just hit send, and
              we&apos;ll confirm your consultation shortly.
            </p>
          </div>
        )}
      </div>
    </dialog>
  );
}

