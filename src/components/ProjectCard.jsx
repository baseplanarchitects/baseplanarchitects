import ResponsiveImage from './ResponsiveImage';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from '@phosphor-icons/react';
export default function ProjectCard({ project, index = 0 }) {
  return <Link to={`/projects/${project.slug}`} className="work-card"><div className="work-image"><ResponsiveImage src={project.image} alt={project.alt} loading="lazy" width="1600" height="1067" /><span className="work-open"><ArrowUpRight size={25} /></span></div><div className="work-caption"><div><span className="eyebrow">{project.category} / {project.location}</span><h3>{project.title}</h3></div><span className="work-index">{String(index + 1).padStart(2, '0')}</span></div></Link>;
}

