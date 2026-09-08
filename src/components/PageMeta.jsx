import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { projects } from '../data/projects';
import { services } from '../data/services';
const pages = { '/': ['Architecture, Interiors & Landscape in Dhaka', 'Base Plan Architects designs homes, workplaces and gardens across Dhaka. One team from the first sketch to handover.'], '/about': ['About the Studio', 'Meet the practice behind Base Plan Architects: architecture, interiors and landscape under one plan in Dhaka.'], '/projects': ['Projects', 'Explore residential, commercial, interior and landscape briefs from Base Plan Architects.'], '/gallery': ['Visual Gallery', 'Explore a visual journal of architectural form, natural light, materials and space.'], '/contact': ['Contact', 'Discuss your building, interior or garden project with Base Plan Architects in Basundhara, Dhaka.'] };
export default function PageMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const project = projects.find(p => pathname === `/projects/${p.slug}`);
    const [title, description] = project ? [project.title, project.description] : pages[pathname] || ['Page not found', 'Return to the Base Plan Architects homepage.'];
    document.title = `${title} | Base Plan Architects`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.id = 'studio-schema';
    schema.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'Base Plan Architects', description: pages['/'][1], telephone: '+8801339910397', email: 'baseplanarchitects@gmail.com', address: { '@type': 'PostalAddress', streetAddress: 'House 900, Road 17, Block G, Basundhara R/A', addressLocality: 'Dhaka', postalCode: '1229', addressCountry: 'BD' }, areaServed: 'Dhaka, Bangladesh', hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Architecture and design services', itemListElement: services.map(([name]) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })) } });
    document.head.append(schema);
    return () => schema.remove();
  }, [pathname]);
  return null;
}

