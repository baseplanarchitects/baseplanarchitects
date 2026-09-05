import { useEffect, useRef, useState } from 'react';
import Reveal from '../components/Reveal';
import { useBookingModal } from '../context/BookingModalContext';

const PROJECTS = [
  {
    tag: 'Residential — Bashundhara',
    title: 'Riverside Residence',
    figure: (
      <svg viewBox="0 0 200 160" fill="none">
        <rect x="30" y="60" width="140" height="80" fill="#fbfbfb" stroke="#0d0d0d" strokeWidth="1.4" />
        <rect x="30" y="60" width="140" height="14" fill="#acaba9" />
        <rect x="46" y="90" width="24" height="30" stroke="#0d0d0d" strokeWidth="1.2" />
        <rect x="88" y="90" width="24" height="30" stroke="#0d0d0d" strokeWidth="1.2" />
        <rect x="130" y="90" width="24" height="30" stroke="#0d0d0d" strokeWidth="1.2" />
        <path d="M20 60L100 20L180 60" stroke="#0d0d0d" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    tag: 'Commercial — Gulshan',
    title: 'Gulshan Corporate Atrium',
    figure: (
      <svg viewBox="0 0 200 160" fill="none">
        <rect x="40" y="30" width="30" height="110" fill="#fbfbfb" stroke="#0d0d0d" strokeWidth="1.4" />
        <rect x="72" y="55" width="30" height="85" fill="#fbfbfb" stroke="#0d0d0d" strokeWidth="1.4" />
        <rect x="104" y="15" width="30" height="125" fill="#eaeaea" stroke="#0d0d0d" strokeWidth="1.4" />
        <rect x="136" y="70" width="26" height="70" fill="#fbfbfb" stroke="#0d0d0d" strokeWidth="1.4" />
        <line x1="30" y1="140" x2="170" y2="140" stroke="#0d0d0d" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    tag: 'Residential + Garden — Banani',
    title: 'Banani Garden Villa',
    figure: (
      <svg viewBox="0 0 200 160" fill="none">
        <rect x="35" y="70" width="130" height="70" fill="#fbfbfb" stroke="#0d0d0d" strokeWidth="1.4" />
        <path d="M35 70L100 35L165 70" stroke="#0d0d0d" strokeWidth="1.4" strokeLinejoin="round" />
        <rect x="90" y="100" width="20" height="40" stroke="#0d0d0d" strokeWidth="1.2" />
        <circle cx="55" cy="95" r="10" stroke="#0d0d0d" strokeWidth="1.1" />
        <circle cx="145" cy="95" r="10" stroke="#0d0d0d" strokeWidth="1.1" />
        <path d="M20 140h160" stroke="#acaba9" strokeWidth="1.4" />
        <path d="M20 140c8-10 16-10 24 0" stroke="#acaba9" strokeWidth="1.1" />
        <path d="M60 140c8-10 16-10 24 0" stroke="#acaba9" strokeWidth="1.1" />
      </svg>
    ),
  },
  {
    tag: 'Workspace — Uttara',
    title: 'Uttara Boutique Office',
    figure: (
      <svg viewBox="0 0 200 160" fill="none">
        <rect x="30" y="45" width="140" height="95" fill="#fbfbfb" stroke="#0d0d0d" strokeWidth="1.4" />
        <rect x="30" y="45" width="140" height="8" fill="#0d0d0d" />
        <line x1="30" y1="70" x2="170" y2="70" stroke="#eaeaea" strokeWidth="10" />
        <line x1="30" y1="95" x2="170" y2="95" stroke="#eaeaea" strokeWidth="10" />
        <line x1="30" y1="120" x2="170" y2="120" stroke="#eaeaea" strokeWidth="10" />
        <rect x="30" y="45" width="140" height="95" fill="none" stroke="#0d0d0d" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    tag: 'Residential — Bashundhara',
    title: 'Bashundhara Family Home',
    figure: (
      <svg viewBox="0 0 200 160" fill="none">
        <rect x="45" y="60" width="110" height="80" fill="#fbfbfb" stroke="#0d0d0d" strokeWidth="1.4" />
        <path d="M45 60L100 30L155 60" stroke="#0d0d0d" strokeWidth="1.4" strokeLinejoin="round" />
        <rect x="90" y="95" width="22" height="45" stroke="#0d0d0d" strokeWidth="1.2" />
        <rect x="60" y="80" width="18" height="18" stroke="#0d0d0d" strokeWidth="1.1" />
        <rect x="122" y="80" width="18" height="18" stroke="#0d0d0d" strokeWidth="1.1" />
        <circle cx="167" cy="45" r="9" stroke="#acaba9" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    tag: 'Residential — Dhanmondi',
    title: 'Dhanmondi Lake House',
    figure: (
      <svg viewBox="0 0 200 160" fill="none">
        <rect x="25" y="80" width="150" height="60" fill="#fbfbfb" stroke="#0d0d0d" strokeWidth="1.4" />
        <path d="M25 80c25-30 125-30 150 0" stroke="#0d0d0d" strokeWidth="1.4" fill="none" />
        <line x1="60" y1="80" x2="60" y2="140" stroke="#0d0d0d" strokeWidth="1.1" />
        <line x1="100" y1="80" x2="100" y2="140" stroke="#0d0d0d" strokeWidth="1.1" />
        <line x1="140" y1="80" x2="140" y2="140" stroke="#0d0d0d" strokeWidth="1.1" />
        <path d="M15 140h170" stroke="#acaba9" strokeWidth="1.4" />
      </svg>
    ),
  },
];

const PROBLEMS = [
  {
    title: 'Design and site teams that don\u2019t talk',
    body: 'The architect draws one thing, the contractor builds another, and you\u2019re the one relaying messages between them.',
  },
  {
    title: 'A budget that moves after approval',
    body: 'Estimates that don\u2019t hold past the first site visit, with changes explained after the fact instead of before.',
  },
  {
    title: 'RAJUK paperwork that stalls everything',
    body: 'Plan approval treated as someone else\u2019s job, so the whole project waits on a submission nobody owns.',
  },
  {
    title: 'Interiors bolted on afterward',
    body: 'A building finished first and decorated later, instead of wiring, light and furniture planned in from day one.',
  },
];

const SERVICES = [
  {
    title: 'Building Design',
    body: 'Architectural concepts, structural coordination and construction drawings suited to your plot, budget and family.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 21V9l8-5 8 5v12" stroke="#0d0d0d" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 21v-7h6v7" stroke="#0d0d0d" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: 'Consultancy',
    body: 'Feasibility studies, RAJUK documentation and site guidance for landowners and developers before ground is broken.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3l8 4v10l-8 4-8-4V7l8-4z" stroke="#0d0d0d" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 12l8-5M12 12v9M12 12L4 7" stroke="#0d0d0d" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    title: 'Interior Design',
    body: 'Layouts, lighting, materials and furniture planned alongside the architecture, not added on after handover.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3.5" y="4.5" width="17" height="13" rx="1.4" stroke="#0d0d0d" strokeWidth="1.5" />
        <path d="M3.5 15l4.5-4 3 2.5 4-4.5L20.5 15" stroke="#0d0d0d" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Garden Design',
    body: 'Courtyards, rooftops and boundary plantings that hold up in Dhaka\u2019s climate and stay easy to maintain.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 21c4-2 6-5.5 6-9a6 6 0 10-12 0c0 3.5 2 7 6 9z" stroke="#0d0d0d" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 12v-3" stroke="#0d0d0d" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
];

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Discovery & Site Visit',
    body: 'We walk the plot, understand how you\u2019ll actually use each space, and set a realistic budget range.',
  },
  {
    num: '02',
    title: 'Concept & Design Development',
    body: 'Layouts, elevations and interior direction, refined with you until the plan feels right on paper.',
  },
  {
    num: '03',
    title: 'RAJUK Approval & Documentation',
    body: 'Structural drawings and submission handled in-house, so approval doesn\u2019t stall your timeline.',
  },
  {
    num: '04',
    title: 'Construction Oversight & Handover',
    body: 'Regular site visits to keep execution matched to the drawings, through to final walkthrough.',
  },
];

const FAQS = [
  {
    q: 'How long does a typical residential project take?',
    a: 'Most homes in Dhaka run 4\u20136 months from concept to a RAJUK-approved drawing set, then follow the construction timeline of your builder \u2014 we stay involved through both.',
  },
  {
    q: 'Do you handle RAJUK approval and documentation?',
    a: 'Yes \u2014 structural coordination and the full RAJUK submission are part of every building design engagement, not a separate add-on.',
  },
  {
    q: 'Can you take over a project that\u2019s already under construction?',
    a: 'Often, yes. We start with a site assessment against the existing drawings before proposing how to bring interiors or garden design in line with what\u2019s already built.',
  },
  {
    q: 'Do you work outside Dhaka?',
    a: 'We\u2019re based in Basundhara, Dhaka, and take on select projects elsewhere in Bangladesh \u2014 travel and site-visit frequency are agreed upfront.',
  },
  {
    q: 'How is your fee structured?',
    a: 'Fees are quoted per project after the discovery visit, based on built-up area and scope \u2014 you\u2019ll see a written estimate before any design work begins.',
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function useHeroScroll() {
  const heroRef = useRef(null);
  const visualRef = useRef(null);
  const innerRef = useRef(null);
  const mainRef = useRef(null);
  const altRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    function update() {
      ticking = false;
      const heroEl = heroRef.current;
      if (!heroEl) return;
      const h = heroEl.offsetHeight;
      const progress = Math.min(Math.max(window.scrollY / h, 0), 1);

      if (visualRef.current) {
        const rotate = progress * 14;
        const scale = 1 + progress * 0.22;
        const shiftY = progress * -60;
        visualRef.current.style.transform = `translateY(${shiftY}px) rotateX(${rotate}deg) scale(${scale})`;
        visualRef.current.style.opacity = String(1 - progress * 0.9);
      }

      if (innerRef.current) {
        innerRef.current.style.transform = `translateY(${progress * 50}px)`;
        innerRef.current.style.opacity = String(1 - progress * 1.4);
      }

      if (mainRef.current && altRef.current) {
        const t = Math.min(Math.max((progress - 0.28) / 0.42, 0), 1);
        mainRef.current.style.opacity = String(1 - t);
        mainRef.current.style.transform = `translateY(${t * -18}px)`;
        altRef.current.style.opacity = String(t);
        altRef.current.style.transform = `translateY(${(1 - t) * 18}px)`;
      }
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    document.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    update();

    return () => {
      document.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, []);

  return { heroRef, visualRef, innerRef, mainRef, altRef };
}

export default function Home() {
  const { openBooking } = useBookingModal();
  const { heroRef, visualRef, innerRef, mainRef, altRef } = useHeroScroll();
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      {/* ============ HERO ============ */}
      <section id="hero" ref={heroRef}>
        <div className="hero-bg" aria-hidden="true"></div>

        <div className="hero-visual" ref={visualRef} aria-hidden="true">
          <svg viewBox="0 0 900 700" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="skyFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fbfbfb" stopOpacity=".05" />
                <stop offset="100%" stopColor="#fbfbfb" stopOpacity="0" />
              </linearGradient>
              <pattern id="winGrid" width="26" height="26" patternUnits="userSpaceOnUse">
                <rect x="6" y="6" width="10" height="10" fill="#acaba9" fillOpacity=".55" />
              </pattern>
            </defs>

            <rect x="0" y="0" width="900" height="700" fill="url(#skyFade)" />

            <rect x="40" y="360" width="90" height="260" fill="#fbfbfb" fillOpacity=".05" stroke="#fbfbfb" strokeOpacity=".18" strokeWidth="1.2" />
            <rect x="150" y="300" width="70" height="320" fill="#fbfbfb" fillOpacity=".05" stroke="#fbfbfb" strokeOpacity=".18" strokeWidth="1.2" />

            <rect x="260" y="180" width="150" height="440" fill="#fbfbfb" fillOpacity=".06" stroke="#fbfbfb" strokeOpacity=".3" strokeWidth="1.4" />
            <rect x="278" y="205" width="114" height="360" fill="url(#winGrid)" />

            <path d="M430 340L560 230L690 340V620H430V340Z" fill="#fbfbfb" fillOpacity=".08" stroke="#fbfbfb" strokeOpacity=".45" strokeWidth="1.6" strokeLinejoin="round" />
            <rect x="460" y="400" width="60" height="90" fill="url(#winGrid)" />
            <rect x="600" y="400" width="60" height="90" fill="url(#winGrid)" />
            <rect x="530" y="500" width="60" height="120" fill="#fbfbfb" fillOpacity=".12" stroke="#fbfbfb" strokeOpacity=".4" strokeWidth="1.4" />

            <rect x="720" y="120" width="100" height="500" fill="#fbfbfb" fillOpacity=".05" stroke="#fbfbfb" strokeOpacity=".22" strokeWidth="1.2" />
            <rect x="736" y="145" width="68" height="420" fill="url(#winGrid)" />

            <line x1="0" y1="620" x2="900" y2="620" stroke="#fbfbfb" strokeOpacity=".25" strokeWidth="1.4" />
          </svg>
        </div>

        <div className="container hero-inner" ref={innerRef}>
          <p className="eyebrow">Base Plan Architects · Dhaka</p>
          <div className="hero-headline">
            <h1 className="h1-main" ref={mainRef}>
              Buildings drawn for the way you&apos;ll actually live in them.
            </h1>
            <h1 className="h1-alt" ref={altRef}>
              Where Vision Meets Structure.
            </h1>
          </div>
          <p className="hero-sub">
            We design homes, offices and gardens across Dhaka — one team carrying every wall from
            the first sketch through RAJUK approval to the final coat of paint, so nothing gets
            lost in translation along the way.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View Projects
              <ArrowIcon />
            </a>
            <button className="btn btn-secondary" onClick={openBooking}>
              Book a Consultation
              <svg viewBox="0 0 16 16" fill="none">
                <rect x="2.5" y="3.5" width="11" height="10" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
                <path d="M2.5 6.5h11M5.5 2v3M10.5 2v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="hero-meta">
            <span>
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M8 14.5s5-4.2 5-8.2A5 5 0 003 6.3c0 4 5 8.2 5 8.2z" stroke="currentColor" strokeWidth="1.3" />
                <circle cx="8" cy="6.3" r="1.7" stroke="currentColor" strokeWidth="1.3" />
              </svg>
              Basundhara R/A, Dhaka
            </span>
            <span>
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M2 4.5l6 4.5 6-4.5" stroke="currentColor" strokeWidth="1.3" />
                <rect x="2" y="3" width="12" height="10" rx="1.4" stroke="currentColor" strokeWidth="1.3" />
              </svg>
              baseplanarchitects@gmail.com
            </span>
            <span>RAJUK‑compliant documentation</span>
          </div>
        </div>
        <div className="scroll-cue">
          <span className="mouse"></span>SCROLL
        </div>
      </section>

      {/* ============ PROJECTS ============ */}
      <section id="projects" className="section">
        <div className="container">
          <Reveal as="div" className="section-head">
            <p className="eyebrow">Selected work</p>
            <h2>A few rooms, roofs and gardens we&apos;ve stood behind.</h2>
            <p>
              Every project below carried one architect from concept through handover — no
              handoffs between a design team and a build team.
            </p>
          </Reveal>

          <div className="project-grid">
            {PROJECTS.map((project, i) => (
              <Reveal
                as="article"
                variant="scale"
                className="project-card"
                key={project.title}
                style={{ transitionDelay: `${(i % 3) * 90}ms` }}
              >
                <div className="project-figure">
                  {project.figure}
                  <div className="project-overlay">
                    <span className="ov-view">
                      View Project
                      <ArrowIcon />
                    </span>
                  </div>
                </div>
                <div className="project-body">
                  <p className="p-tag">{project.tag}</p>
                  <h3>{project.title}</h3>
                  <a href="#" className="p-link">
                    View project
                    <ArrowIcon />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROBLEM ============ */}
      <section id="problem" className="section">
        <div className="container">
          <div className="problem-layout">
            <Reveal as="div" className="section-head" style={{ marginBottom: 0 }}>
              <p className="eyebrow">Why it usually goes wrong</p>
              <h2>Most projects lose their shape somewhere between the sketch and the site.</h2>
              <p>You&apos;ve probably heard some version of these before we ever say a word.</p>
            </Reveal>

            <div className="problem-list">
              {PROBLEMS.map((item) => (
                <Reveal as="div" className="problem-item" key={item.title}>
                  <svg viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6.3" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M8 5v3.5M8 11h.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ SOLUTION / SERVICES ============ */}
      <section id="solution" className="section">
        <div className="container">
          <Reveal as="div" className="section-head">
            <p className="eyebrow">How we work instead</p>
            <h2>One team, one plan — foundation to furniture.</h2>
            <p>
              Four services, handled by the same people, so nothing is redrawn or re-explained
              halfway through.
            </p>
          </Reveal>

          <div className="services-grid">
            {SERVICES.map((service) => (
              <Reveal as="div" className="service-card" key={service.title}>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section id="process" className="section">
        <div className="container">
          <Reveal as="div" className="section-head">
            <p className="eyebrow">How it works</p>
            <h2>Four stages, one point of contact throughout.</h2>
          </Reveal>

          <div className="process-list">
            {PROCESS_STEPS.map((step) => (
              <Reveal as="div" className="process-step" key={step.num}>
                <p className="step-num">{step.num}</p>
                <h4>{step.title}</h4>
                <p>{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="section">
        <div className="container">
          <Reveal as="div" className="section-head center">
            <p className="eyebrow">Common questions</p>
            <h2>Before you reach out</h2>
          </Reveal>

          <Reveal as="div" className="faq-list">
            {FAQS.map((item, i) => (
              <div className={`faq-item${openFaq === i ? ' open' : ''}`} key={item.q}>
                <button
                  className="faq-q"
                  onClick={() => setOpenFaq((prev) => (prev === i ? null : i))}
                >
                  {item.q}
                  <span className="faq-toggle"></span>
                </button>
                <div className="faq-a">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============ CTA BAND ============ */}
      <section id="cta-band">
        <div className="container">
          <Reveal as="h2">Let&apos;s put your plan on paper.</Reveal>
          <Reveal as="p">
            Book a consultation and we&apos;ll walk through your plot, budget and timeline
            together — no obligation.
          </Reveal>
          <Reveal as="button" className="btn btn-ghost" onClick={openBooking}>
            Book a Consultation
            <ArrowIcon />
          </Reveal>
        </div>
      </section>
    </>
  );
}
