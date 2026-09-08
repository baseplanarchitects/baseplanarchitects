import { useId, useState } from 'react';
import { SquaresFour, List, ArrowUpRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

const disciplines = ['Interior', 'Exterior'];
const stages = ['3D Design', 'Built Projects'];
const categories = ['All', 'Residential', 'Commercial'];

export default function ProjectBrowser() {
  const id = useId();
  const [discipline, setDiscipline] = useState('Interior');
  const [stage, setStage] = useState('3D Design');
  const [category, setCategory] = useState('All');
  const [view, setView] = useState('grid');
  const collection = projects.filter(p => p.discipline === discipline && (discipline === 'Exterior' || p.stages.includes(stage)));
  const items = collection.filter(p => category === 'All' || p.category === category);
  function selectDiscipline(value) { setDiscipline(value); setCategory('All'); }
  function tabKeys(event, index) {
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : ['ArrowLeft', 'ArrowRight'].includes(event.key) ? 1 - index : null;
    if (next === null) return;
    event.preventDefault();
    selectDiscipline(disciplines[next]);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  }
  return <div className="project-browser">
    <div className="project-type-row"><div className="project-type-tabs" role="tablist" aria-label="Project discipline">{disciplines.map((value, index) => <button key={value} role="tab" id={`${id}-tab-${index}`} aria-selected={discipline === value} aria-controls={`${id}-results`} tabIndex={discipline === value ? 0 : -1} onKeyDown={event => tabKeys(event, index)} onClick={() => selectDiscipline(value)}>{value}<sup>{projects.filter(p => p.discipline === value).length}</sup></button>)}</div><div className="view-toggle" aria-label="Project layout"><button aria-label="Grid view" aria-pressed={view === 'grid'} onClick={() => setView('grid')}><SquaresFour size={20} /></button><button aria-label="List view" aria-pressed={view === 'list'} onClick={() => setView('list')}><List size={20} /></button></div></div>
    <div className="project-subfilters">{discipline === 'Interior' && <div className="project-stage-switch" role="group" aria-label="Interior project stage">{stages.map(value => <button key={value} aria-pressed={stage === value} onClick={() => { setStage(value); setCategory('All'); }}>{value}<span>{projects.filter(p => p.discipline === 'Interior' && p.stages.includes(value)).length}</span></button>)}</div>}
      {discipline === 'Interior' && <div className="filters project-use-filters" role="group" aria-label="Project use">{categories.map(value => <button key={value} aria-pressed={category === value} onClick={() => setCategory(value)}>{value}<sup>{collection.filter(p => value === 'All' || p.category === value).length}</sup></button>)}</div>}
    </div>
    <div role="tabpanel" id={`${id}-results`} aria-labelledby={`${id}-tab-${disciplines.indexOf(discipline)}`} tabIndex={0}>
      <p className="project-result-label" role="status">{discipline}{discipline === 'Interior' ? ` / ${stage}` : ''} / {category} <span>{items.length} {items.length === 1 ? 'project' : 'projects'}</span></p>
      {items.length ? <div className={view === 'grid' ? 'work-grid portfolio-grid' : 'work-list'}>{items.map(p => {
        const image = discipline === 'Interior' && stage === '3D Design' ? p.images.find(i => i.group === '3D visualization') : null;
        return <ProjectCard key={p.slug} project={image ? { ...p, image: image.image, alt: image.alt } : p} index={projects.indexOf(p)} />;
      })}</div> : <div className="project-empty"><p className="eyebrow">{discipline === 'Exterior' ? 'Exterior projects' : `${stage} / ${category}`}</p><h3>{discipline === 'Exterior' ? 'No exterior projects to display yet.' : 'No projects in this selection yet.'}</h3><p>{discipline === 'Exterior' ? 'Explore our interior work, or talk to us about your building design.' : 'Explore another category to see more of our work.'}</p><div><button className="text-link" onClick={() => { selectDiscipline('Interior'); setStage('3D Design'); }}>View interior designs <ArrowUpRight size={18} /></button><Link className="text-link" to="/contact">Discuss a project <ArrowUpRight size={18} /></Link></div></div>}
    </div>
  </div>;
}

