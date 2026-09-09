import { useEffect, useState } from 'react';
import logo from '../assets/logo.jpg';

// A short initial entrance, never repeated during client-side navigation.
export default function Preloader() {
  const [phase, setPhase] = useState('loading');
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const started = performance.now();
    let finishTimer, removeTimer, finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      finishTimer = setTimeout(() => {
        setPhase('leaving');
        removeTimer = setTimeout(() => setPhase('done'), reduced ? 0 : 350);
      }, Math.max(0, (reduced ? 0 : 600) - (performance.now() - started)));
    };
    const fallback = setTimeout(finish, 1800);
    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });
    return () => { clearTimeout(fallback); clearTimeout(finishTimer); clearTimeout(removeTimer); window.removeEventListener('load', finish); };
  }, []);
  if (phase === 'done') return null;
  return <div className={`studio-loader ${phase}`} role="status" aria-label="Loading Base Plan Architects">
    <div className="studio-loader-geometry"><span className="loader-square" aria-hidden="true" /><span className="loader-diamond" aria-hidden="true" /><img src={logo} alt="" width="88" height="88" /></div><div className="loader-fill-text" data-text="BASE PLAN" aria-hidden="true">BASE PLAN</div>
    <p>SPACES FOR LIFE TO HAPPEN</p>
  </div>;
}

