'use client';
import ResponsiveImage from './ResponsiveImage';

import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight, Plus } from '@phosphor-icons/react';
import Magnetic from './Magnetic';
export default function ScrollHero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  // Function transforms keep every property on one measured timeline across browsers.
  const x = useTransform(() => `${20 * (1 - Math.min(scrollYProgress.get() / .75, 1))}%`);
  const scale = useTransform(() => .70 + .30 * Math.min(scrollYProgress.get() / .75, 1));
  const opacity = useTransform(() => Math.max(0, 1 - scrollYProgress.get() / .35));
  const y = useTransform(() => -45 * Math.min(scrollYProgress.get() / .35, 1));
  const caption = useTransform(() => Math.max(0, Math.min(1, (scrollYProgress.get() - .4) / .35)));
  const copyVisibility = useTransform(() => scrollYProgress.get() >= .35 ? 'hidden' : 'visible');
  const captionVisibility = useTransform(() => scrollYProgress.get() <= .4 ? 'hidden' : 'visible');
  const mobileY = useTransform(() => `${-65 * Math.min(scrollYProgress.get() / .75, 1)}%`);
  return <section id="hero" className="scroll-hero" ref={ref}><div className="hero-stage">
    <div className="hero-topline"><span>Architecture. Interiors. Construction.</span><span>Dhaka, Bangladesh <span className="status-dot" /></span></div>
    <motion.div className="hero-copy" style={{ opacity: reduce ? 1 : opacity, y: reduce ? 0 : y, visibility: reduce ? 'visible' : copyVisibility }}><p className="eyebrow">Base Plan Architects</p><h1>Spaces for<br />life to<br /> <span>happen.</span></h1><p className="hero-description">Thoughtful buildings. Meaningful spaces.<br />One plan, from the first sketch to the way you live.</p><Magnetic><Link className="text-link" to="/projects">Explore our work <ArrowUpRight size={20} /></Link></Magnetic></motion.div>
    <motion.figure className="hero-building" style={{ x: reduce ? '20%' : x, scale: reduce ? .70 : scale, '--mobile-y': reduce ? '0%' : mobileY }}><ResponsiveImage sizes="(max-width: 767px) 100vw, 90vw" src="/images/residence.webp" alt="Architectural reference: a modern residence framed by trees" fetchPriority="high" width="1600" height="1067" /><span className="frame-corner corner-one"><Plus /></span><span className="frame-corner corner-two"><Plus /></span><span className="image-marker">Form / Light / Life</span></motion.figure>
    <motion.div className="focus-caption" style={{ opacity: reduce ? 0 : caption, visibility: reduce ? 'hidden' : captionVisibility }}><span>A closer look at the way we see space.</span><Link to="/projects">Discover the projects <ArrowUpRight /></Link></motion.div>
    <div className="hero-bottomline"><a href="#intro">Scroll to explore <ArrowDown size={16} /></a><span>Where vision meets structure</span><span className="hero-image-note">Architectural reference image</span></div>
  </div></section>;
}







