import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import BookingModal from './components/BookingModal';
import { BookingModalProvider } from './context/BookingModalContext';
import Home from './pages/Home';
import About from './pages/About/About.jsx';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return; // let in-page anchor links (e.g. /#projects) do their own thing
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BookingModalProvider>
      <Preloader />
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <BookingModal />
    </BookingModalProvider>
  );
}
