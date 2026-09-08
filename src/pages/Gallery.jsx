'use client';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, CornersOut, X } from '@phosphor-icons/react';
import ResponsiveImage from '../components/ResponsiveImage';
import { projects, galleryItems } from '../data/projects';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [filter, setFilter] = useState('all');
  const reduce = useReducedMotion();
  const dialog = useRef(null);
  const touch = useRef(null);
  const items = galleryItems.filter(item => filter === 'all' || item.slug === filter);
  const project = items[index] || items[0];
  function step(direction) { setIndex(n => (n + direction + items.length) % items.length); }
  function onKeys(e) { if (e.target.tagName === 'SELECT') return; if (e.key === 'ArrowRight') { e.preventDefault(); step(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); } }
  return <section className="gallery-page" aria-label="Architecture visual gallery" onKeyDown={onKeys}>
    <div className="gallery-heading"><span className="eyebrow">The visual journal</span><select aria-label="Filter gallery by project" value={filter} onChange={e => { setFilter(e.target.value); setIndex(0); }}><option value="all">All projects</option>{projects.map(p => <option key={p.slug} value={p.slug}>{p.title}</option>)}</select><span className="eyebrow">{String(index + 1).padStart(2, '0')} / {items.length}</span></div>
    <div className="gallery-stage" tabIndex={0} aria-label="Image gallery. Use left and right arrow keys to browse." onTouchStart={e => { touch.current = e.touches[0].clientX; }} onTouchEnd={e => { if (touch.current !== null) { const d = e.changedTouches[0].clientX - touch.current; if (Math.abs(d) > 50) step(d < 0 ? 1 : -1); touch.current = null; } }}>
      <AnimatePresence mode="wait" initial={false}><motion.img key={project.image} src={project.image} srcSet={`${project.image.replace('.webp', '-small.webp')} 640w, ${project.image} 1600w`} sizes="100vw" alt={project.alt} initial={reduce ? false : { opacity: 0, scale: 1.025 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : .3 }} width={project.width} height={project.height} /></AnimatePresence>
      <div className="gallery-overlay"><p className="eyebrow">{project.location} / {project.year}</p><h1>{project.title}</h1><Link className="text-link" to={`/projects/${project.slug}`}>Explore project <ArrowUpRight /></Link></div>
      <button className="gallery-expand" aria-label="Expand image" onClick={() => dialog.current.showModal()}><CornersOut size={24} /></button>
    </div>
    <div className="gallery-controls"><div className="gallery-arrows"><button onClick={() => step(-1)} aria-label="Previous image"><ArrowLeft size={24} /></button><button onClick={() => step(1)} aria-label="Next image"><ArrowRight size={24} /></button></div><p role="status">{project.title} / {index + 1} of {items.length}</p><span className="eyebrow">{project.group}</span></div>
    <div className="gallery-thumbs" aria-label="Choose an image">{items.map((p, i) => <button key={p.image} aria-label={`Show ${p.title} image ${i + 1}`} aria-pressed={i === index} onClick={() => setIndex(i)}><img src={p.image.replace('.webp', '-small.webp')} alt="" width="160" height="100" loading="lazy" /><span>{String(i + 1).padStart(2, '0')}</span></button>)}</div>
    <dialog className="image-dialog" ref={dialog} onClick={e => { if (e.target === e.currentTarget) dialog.current.close(); }} aria-label="Expanded gallery image"><button className="dialog-close" aria-label="Close expanded image" onClick={() => dialog.current.close()}><X size={26} /></button><ResponsiveImage src={project.image} alt={project.alt} sizes="90vw" /><div className="lightbox-controls"><button onClick={() => step(-1)} aria-label="Previous image"><ArrowLeft size={24} /></button><p>{project.title} / {project.group}</p><button onClick={() => step(1)} aria-label="Next image"><ArrowRight size={24} /></button></div></dialog>
  </section>;
}
