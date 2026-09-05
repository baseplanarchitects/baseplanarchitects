import { useEffect, useState } from 'react';
import logo from '../assets/logo.jpg';

export default function Preloader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.body.classList.add('no-scroll');

    const finish = () => {
      const timer = setTimeout(() => {
        setLoaded(true);
        document.body.classList.remove('no-scroll');
      }, 650);
      return timer;
    };

    let timer;
    if (document.readyState === 'complete') {
      timer = finish();
    } else {
      const onLoad = () => {
        timer = finish();
      };
      window.addEventListener('load', onLoad, { once: true });
      return () => window.removeEventListener('load', onLoad);
    }
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loaded) document.body.classList.add('loaded');
  }, [loaded]);

  return (
    <div id="preloader" aria-hidden="true">
      <div className="pl-inner">
        <div className="pl-mark">
          <img src={logo} alt="" />
        </div>
        <div className="pl-bar">
          <span></span>
        </div>
      </div>
    </div>
  );
}
