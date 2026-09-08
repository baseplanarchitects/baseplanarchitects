import ResponsiveImage from '../components/ResponsiveImage';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Plus } from '@phosphor-icons/react';
import Reveal from '../components/Reveal';
import ScrollHero from '../components/ScrollHero';
import Magnetic from '../components/Magnetic';
import ProjectBrowser from '../components/ProjectBrowser';
import { services } from '../data/services';
import { projects, imageNotice } from '../data/projects';
import { useBookingModal } from '../context/BookingModalContext';
const steps = [
  ['Listen & discover', 'We visit the site, understand your routines and agree on a realistic brief and budget.'],
  ['Explore & design', 'Layouts, elevations and materials take shape, refined with you until the plan feels right.'],
  ['Coordinate & approve', 'Structural drawings and RAJUK documentation bring the design into a coordinated set.'],
  ['Build & hand over', 'Site visits keep execution connected to the drawings, through to the final walkthrough.'],
];
const faqs = [
  ['How long does a residential project take?', 'The design and approval stages depend on the plot, scope and revisions. We agree on a programme at the first consultation and coordinate it with your construction timeline.'],
  ['Do you handle RAJUK documentation?', 'Yes. Our building design service includes structural coordination and RAJUK submission documentation. We discuss the requirements for your plot before work begins.'],
  ['Can you work with an existing building?', 'Yes. We begin with a site assessment and the existing drawings, then explore how architecture, interiors or garden design can support your plans.'],
  ['Do you work outside Dhaka?', 'We are based in Basundhara and take on select projects elsewhere in Bangladesh. Travel and site-visit frequency are agreed upfront.'],
  ['How are your fees structured?', 'Fees are quoted per project after discovery, based on the built-up area and scope. You receive a written estimate before design work begins.'],
];
export default function Home() {
  const { openBooking } = useBookingModal();
  return <><ScrollHero />
    <section id="intro" className="section container intro-grid"><p className="eyebrow">01 / The practice</p><Reveal><h2>Good architecture begins<br />with <span className="muted">understanding life.</span></h2><div className="intro-detail"><p>We are a Dhaka-based architecture practice designing homes, workplaces and gardens. We bring the whole picture together, carrying one considered plan from the first conversation to the final detail.</p><Magnetic><Link to="/about" className="text-link">Meet the studio <ArrowUpRight size={20} /></Link></Magnetic></div></Reveal></section>
    <section id="projects" className="section container selected-work"><Reveal className="section-heading"><div><p className="eyebrow">02 / Selected projects</p><h2>Places with<br />a point of view.</h2></div><Link to="/projects" className="text-link">All projects <span className="count">{String(projects.length).padStart(2, '0')}</span><ArrowUpRight size={20} /></Link></Reveal><ProjectBrowser /><p className="asset-note">{imageNotice}</p></section>
    <section id="solution" className="section container service-section"><Reveal className="service-intro"><p className="eyebrow">03 / What we do</p><h2>From foundation<br />to furniture.</h2><p>Four connected disciplines.<br />One team that sees the whole plan.</p><ResponsiveImage src={projects[0].image} alt={projects[0].alt} width="800" height="600" loading="lazy" /></Reveal><div className="service-list">{services.map(([title, body], i) => <Reveal key={title}><details open={i === 0}><summary><span className="eyebrow">0{i + 1}</span><h3>{title}</h3><Plus size={24} /></summary><p>{body}</p><button className="text-link" onClick={openBooking}>Discuss your project <ArrowUpRight size={18} /></button></details></Reveal>)}</div></section>
    <section id="process" className="section container"><Reveal className="section-heading"><div><p className="eyebrow">04 / Our process</p><h2>A clear path.<br />A shared vision.</h2></div><p>From a blank page to a place of your own.<br />We stay with you at every stage.</p></Reveal><div className="process-grid">{steps.map(([title, body], i) => <Reveal key={title}><span className="process-num">0{i + 1}</span><h3>{title}</h3><p>{body}</p></Reveal>)}</div></section>
    <section className="gallery-teaser container"><ResponsiveImage src={projects[1].image} alt={projects[1].alt} loading="lazy" width="1600" height="1067" /><div><span className="eyebrow">The visual journal</span><h2>Light. Material.<br />Perspective.</h2><Magnetic><Link to="/gallery" className="text-link">Enter the gallery <ArrowUpRight size={22} /></Link></Magnetic></div></section>
    <section id="faq" className="section container faq-layout"><div><p className="eyebrow">05 / A few answers</p><h2>Before we<br />begin.</h2></div><div>{faqs.map(([q, a]) => <details className="faq-item" key={q}><summary>{q}<Plus size={20} /></summary><p>{a}</p></details>)}</div></section>
  </>;
}



