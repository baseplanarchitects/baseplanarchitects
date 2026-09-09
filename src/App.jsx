import PointerAtmosphere from './components/PointerAtmosphere';
import WhatsAppButton from './components/WhatsAppButton';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Admin, { ADMIN_LOGIN } from './pages/Admin/Admin';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Projects, { ProjectDetail, NotFound } from './pages/Projects';
import Gallery from './pages/Gallery';
import PageMeta from './components/PageMeta';
import BookingModal from './components/BookingModal';
import { BookingModalProvider } from './context/BookingModalContext';
import Home from './pages/Home';
import About from './pages/About/About.jsx';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
      else window.scrollTo({ top: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

  return null;
}

export default function App() {
  const { pathname } = useLocation();
  if (pathname === ADMIN_LOGIN || pathname === '/admin' || pathname.startsWith('/admin/') || pathname === '/admin-preview' || pathname.startsWith('/admin-preview/')) return <><PointerAtmosphere /><ScrollToTop /><Routes>
    <Route path={ADMIN_LOGIN} element={<Admin />} />
    <Route path="/admin-preview" element={<Navigate to="/admin-preview/home" replace />} />
    <Route path="/admin-preview/:section" element={<Admin key={pathname} preview />} />
    <Route path="*" element={<Navigate to={ADMIN_LOGIN} replace />} />
  </Routes></>;
  return (
    <BookingModalProvider><PointerAtmosphere />
      <PageMeta />
      <ScrollToTop />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <BookingModal />
    </BookingModalProvider>
  );
}

