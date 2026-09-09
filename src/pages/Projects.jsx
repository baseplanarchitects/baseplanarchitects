import { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, X } from '@phosphor-icons/react';
import ResponsiveImage from '../components/ResponsiveImage';
import ProjectBrowser from '../components/ProjectBrowser';
import { projects, imageNotice } from '../data/projects';

export default function Projects() {
  return <div className="container projects-page">
    <div className="page-heading"><p className="eyebrow">The portfolio / {String(projects.length).padStart(2, '0')} projects</p><h1>Considered spaces.<br /><span className="muted">Lasting impressions.</span></h1><p>Homes and workplaces, shaped around the people who use them. Explore our interiors, from first visualization to finished space.</p></div>
    <ProjectBrowser /><p className="asset-note">{imageNotice}</p>
  </div>;
}

function ProjectImages({ project }) {
  const groups = [...new Set(project.images.map(image => image.group))];
  const [group, setGroup] = useState(groups.includes('Completed interior') ? 'Completed interior' : groups[0]);
  const [active, setActive] = useState(project.images[0]);
  const dialog = useRef(null);
  return <section className="project-images" aria-label={`${project.title} image collection`}>
    <div className="section-heading"><div><p className="eyebrow">The project in detail</p><h2>A closer look.</h2></div><span className="eyebrow">{project.images.length} images</span></div>
    <div className="filters media-filters" aria-label="Project image categories">{groups.map(item => <button key={item} onClick={() => setGroup(item)} aria-pressed={item === group}>{item}<sup>{project.images.filter(image => image.group === item).length}</sup></button>)}</div>
    <div className="project-photo-grid">{project.images.filter(image => image.group === group).map((image, index) => <button key={image.image} className="project-photo" aria-label={`Expand ${image.alt}`} onClick={() => { setActive(image); dialog.current.showModal(); }}><ResponsiveImage src={image.image} alt={image.alt} width={image.width} height={image.height} loading="lazy" /><span>{group} / {String(index + 1).padStart(2, '0')} <ArrowUpRight size={18} /></span></button>)}</div>
    <dialog ref={dialog} className="image-dialog" aria-label="Project image detail" onClick={e => { if (e.target === e.currentTarget) dialog.current.close(); }}><button className="dialog-close" aria-label="Close image" onClick={() => dialog.current.close()}><X size={24} /></button><ResponsiveImage src={active.image} alt={active.alt} sizes="90vw" /><p className="asset-note">{project.title} / {active.group}</p></dialog>
  </section>;
}

export function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);
  if (!project) return <NotFound />;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return <article className="container project-detail"><Link to="/projects" className="text-link"><ArrowLeft /> All projects</Link>
    <div className="page-heading"><p className="eyebrow">{project.category} / {project.location}</p><h1>{project.title}</h1></div>
    <ResponsiveImage className="detail-image" src={project.image} alt={project.alt} sizes="100vw" width="1600" height="900" fetchPriority="high" />
    <div className="project-description"><dl className="project-facts">{[['Location', project.location], ['Area', project.area], ['Year', project.year], ['Scope', project.service]].map(([label, value]) => <div key={label}><dt className="eyebrow">{label}</dt><dd>{value}</dd></div>)}</dl><div><p className="eyebrow">The design story</p><h2>{project.headline}</h2><p>{project.description}</p>{project.detail && <p>{project.detail}</p>}<Link className="text-link" to="/contact">Discuss a similar project <ArrowUpRight /></Link></div></div>
    <ProjectImages key={project.slug} project={project} />
    <Link className="next-project" to={`/projects/${next.slug}`}><span className="eyebrow">Next project</span><h2>{next.title}</h2><ArrowUpRight size={36} /></Link>
  </article>;
}
export function NotFound() { return <section className="container not-found" aria-labelledby="not-found-title"><div className="not-found-art" aria-hidden="true"><span>4</span><div className="missing-plan"><i /><i /><i /></div><span>4</span></div><p className="eyebrow">404 / Page not found</p><h1 id="not-found-title">Outside the plan.</h1><p>This page may have moved, or the address may be incorrect. Let’s find your way back.</p><div className="not-found-actions"><Link to="/" className="btn btn-primary">Back to home <ArrowUpRight /></Link><Link to="/projects" className="text-link">Explore projects <ArrowUpRight /></Link></div></section>; }

