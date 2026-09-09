import LeadershipPortrait from '../../components/LeadershipPortrait';
import directorPortrait from '../../assets/baseplan_architect_ceo.jpeg';

import Reveal from '../../components/Reveal';
import { User } from '@phosphor-icons/react';
import { useBookingModal } from '../../context/BookingModalContext';

const STATS = [
  { num: '60+', label: 'Projects delivered across Dhaka' },
  { num: '9', label: 'Years designing homes & offices' },
  { num: '100%', label: 'RAJUK-compliant documentation' },
  { num: '1', label: 'Team, start to handover' },
];

const VALUES = [
  {
    num: '01',
    title: 'One team, no handoffs',
    body: 'The same people who sketch the concept stay on through structural drawings, RAJUK submission and site oversight.',
  },
  {
    num: '02',
    title: 'Honest budgets',
    body: 'A written estimate before design work begins, and changes explained before they happen, not after.',
  },
  {
    num: '03',
    title: 'Designed for how you live',
    body: 'Every layout starts from how a family or a team actually moves through a space, not from a template floor plan.',
  },
];

const TIMELINE = [
  {
    year: '2017',
    title: 'Founded in Basundhara',
    body: 'Started as a two-person practice taking on residential commissions across Dhaka.',
  },
  {
    year: '2019',
    title: 'In-house RAJUK documentation',
    body: 'Brought structural coordination and approval submissions in-house so projects stop waiting on outside consultants.',
  },
  {
    year: '2022',
    title: 'Interior & garden design added',
    body: 'Expanded the studio to carry projects from foundation through furniture and landscaping under one plan.',
  },
  {
    year: '2026',
    title: '60+ projects across Dhaka',
    body: 'Homes, offices and gardens delivered across Bashundhara, Gulshan, Banani, Uttara and Dhanmondi.',
  },
];

const TEAM = [
  { name: 'Rafiul Karim', role: 'Principal Architect' },
  { name: 'Nusrat Jahan', role: 'Interior Design Lead' },
  { name: 'Imtiaz Hossain', role: 'Structural Coordinator' },
  { name: 'Farzana Alam', role: 'Garden & Landscape Design' },
];

function PersonIcon() {
  return <User size={48} weight="thin" />;
}

export default function About() {
  const { openBooking } = useBookingModal();

  return (
    <>
      {/* ============ PAGE HERO ============ */}
      <section className="page-hero">
        <div className="hero-bg" aria-hidden="true"></div>
        <div className="container">
          <p className="eyebrow">About Base Plan Architects</p>
          <h1>A studio built to carry one plan from sketch to handover.</h1>
          <p>
            We&apos;re a Dhaka-based practice designing homes, offices and gardens, one team,
            start to finish, so nothing is redrawn or re-explained halfway through.
          </p>
        </div>
      </section>

      <section className="container leadership-section" aria-labelledby="leadership-title">
        <div className="section-heading"><div><p className="eyebrow">People behind the practice</p><h2 id="leadership-title">A shared vision.<br />A personal approach.</h2></div><p>Leadership that connects the first<br />conversation to the final detail.</p></div>
        <div className="leadership-grid">
          <Reveal className="leader"><LeadershipPortrait src={directorPortrait} alt="Base Plan Architects MD and Principal Architect" width="952" height="960" loading="lazy" /><div className="leader-caption"><h3>MD and Principal Architect</h3><span className="eyebrow">Leadership</span></div><p>A clear point of connection between your aspirations, the studio and the team delivering your project.</p></Reveal>
          {/* <Reveal className="leader"><div className="leader-photo"><ResponsiveImage src="/images/principal-reference.webp" alt="Sample portrait for principal architect layout; not Rafiul Karim" width="900" height="1100" /><span>Sample portrait</span></div><div className="leader-caption"><h3>Rafiul Karim</h3><span className="eyebrow">Principal Architect</span></div><p className="asset-note">Name retained from existing website. Official portrait and biography to be supplied.</p><p>Bringing architecture, interiors and landscape into a single design conversation, from concept through site coordination.</p></Reveal> */}
        </div>
      </section>
      {/* ============ STORY ============ */}
      <section id="story" className="section">
        <div className="container">
          <div className="story-layout">
            <Reveal as="div" className="story-copy">
              <p className="eyebrow">Our story</p>
              <h2 style={{ marginTop: '16px', fontSize: 'clamp(1.8rem,3vw,2.4rem)' }}>
                Founded on a simple frustration.
              </h2>
              <p style={{ marginTop: '24px' }}>
                Base Plan Architects started because too many good projects in Dhaka were losing
                their shape between the sketch and the site, a design team handing off to a
                build team, a budget that moved after approval, RAJUK paperwork stalling
                everything in between.
              </p>
              <p>
                So we built a studio that keeps one team on a project from the first site visit
                through building design, RAJUK documentation, interior design and garden design,
                all the way to final handover. No handoffs, no redrawing, no surprises.
              </p>
              <p>
                Today that means homes in Bashundhara and Dhanmondi, offices in Gulshan and
                Uttara, and gardens that hold up in Dhaka&apos;s climate, all carried by the same
                point of contact from concept to move-in day.
              </p>
            </Reveal>

            <Reveal as="div" variant="scale" className="stat-grid">
              {STATS.map((stat) => (
                <div className="stat-card" key={stat.label}>
                  <p className="stat-num">{stat.num}</p>
                  <p className="stat-label">{stat.label}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ VALUES ============ */}
      <section id="values" className="section">
        <div className="container">
          <Reveal as="div" className="section-head">
            <p className="eyebrow">What guides the work</p>
            <h2>Three things we don&apos;t compromise on.</h2>
          </Reveal>

          <div className="values-grid">
            {VALUES.map((value) => (
              <Reveal as="div" className="value-card" key={value.num}>
                <p className="value-num">{value.num}</p>
                <h3>{value.title}</h3>
                <p>{value.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TEAM ============ */}
      <section id="team" className="section">
        <div className="container">
          <Reveal as="div" className="section-head">
            <p className="eyebrow">Who you&apos;ll work with</p>
            <h2>A small studio, deliberately.</h2>
            <p>Small enough that your project always has the same point of contact.</p>
          </Reveal>

          <div className="team-grid">
            {TEAM.map((member) => (
              <Reveal as="div" variant="scale" className="team-card" key={member.name}>
                <div className="team-photo">
                  <PersonIcon />
                </div>
                <div className="team-body">
                  <h4>{member.name}</h4>
                  <p className="team-role">{member.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TIMELINE ============ */}
      <section id="timeline" className="section">
        <div className="container">
          <Reveal as="div" className="section-head">
            <p className="eyebrow">How we got here</p>
            <h2>Nine years, one plan at a time.</h2>
          </Reveal>

          <div className="timeline-list">
            {TIMELINE.map((item) => (
              <Reveal as="div" className="timeline-item" key={item.year}>
                <p className="timeline-year">{item.year}</p>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA BAND ============ */}
      <section id="cta-band">
        <div className="container">
          <Reveal as="h2">Let&apos;s put your plan on paper.</Reveal>
          <Reveal as="p">
            Book a consultation and we&apos;ll walk through your plot, budget and timeline
            together, no obligation.
          </Reveal>
          <Reveal as="button" className="btn btn-ghost" onClick={openBooking}>
            Book a Consultation
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Reveal>
        </div>
      </section>
    </>
  );
}






