import media from './project-media.json';
// Project information is transcribed from the studio's supplied description files.
const definitions = [
  { slug: 'likhon-apartment', title: 'Likhon Apartment', category: 'Residential', location: 'Uttara', area: '1,200 sq. ft.', year: '2024', service: 'Interior Design & 3D Visualization', headline: 'Designed around what you already have.', description: 'A contemporary apartment interior thoughtfully designed around existing furniture, creating a refreshed, cohesive and comfortable living environment without compromising on aesthetics.', detail: 'From space planning to lighting, materials and detailing, every element was carefully integrated with the existing pieces.', cover: '01.jpg' },
  { slug: 'tm-international-office', title: 'TM International Office', category: 'Commercial', location: 'Uttara', area: '850 sq. ft.', year: '2024', service: 'Interior Design & 3D Visualization', headline: 'A workspace designed to inspire.', description: 'A contemporary office interior where functionality meets creativity, blending bold colors, natural light, collaborative spaces, and a welcoming environment.', cover: '01.jpg' },
  { slug: 'riaz-haq-bedroom', title: 'Riaz Haq Bedroom', category: 'Residential', location: 'Mohammadpur', area: '220 sq. ft.', year: '2024', service: 'Interior Design & 3D Visualization', headline: 'Room for the things that matter.', description: 'A space to rest, study, organize and celebrate achievements.', detail: 'The custom study unit incorporates a dedicated trophy display, turning personal accomplishments into part of the interior design.', cover: 'Artboard1.jpg' },
  { slug: 'nazrul-bedroom', title: 'Nazrul Bedroom', category: 'Residential', location: 'Old Dhaka, Dhaka', area: '150 sq. ft.', year: '2023', service: 'Interior Design & Execution', headline: 'From concept to reality.', description: 'A thoughtfully planned interior, now brought to life.', detail: 'Designed to accommodate a bed, seating area, dressing unit, and closet within a single space, maximizing functionality while maintaining a clean and balanced aesthetic.', cover: 'after hanover picture/1.jpg' },
];
export const projects = definitions.map(p => {
  const images = media[p.slug].map((item, index) => ({ ...item, alt: `${p.title}: ${item.group.toLowerCase()}, view ${index + 1}` }));
  const cover = images.find(item => item.source.endsWith('/' + p.cover)) || images[0];
  return { ...p, discipline: p.discipline ?? 'Interior', stages: p.stages ?? [
    ...(images.some(image => image.group === '3D visualization') ? ['3D Design'] : []),
    ...(images.some(image => image.group === 'Completed interior') ? ['Built Projects'] : []),
  ], image: cover.image, alt: cover.alt, images };
});
export const imageNotice = 'Project images, visualizations and information by Base Plan Architects.';
export const galleryItems = projects.flatMap(project => project.images.map(image => ({ ...project, ...image, projectTitle: project.title })));
