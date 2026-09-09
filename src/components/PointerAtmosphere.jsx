import { useEffect, useRef } from 'react';
export default function PointerAtmosphere() {
  const layer = useRef(null);
  useEffect(() => {
    const allowed = matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    let frame = 0, tx = -500, ty = -500, x = -500, y = -500;
    const paint = () => {
      x += (tx - x) * .14; y += (ty - y) * .14;
      layer.current?.style.setProperty('--pointer-x', `${x}px`);
      layer.current?.style.setProperty('--pointer-y', `${y}px`);
      frame = Math.abs(tx-x) + Math.abs(ty-y) > .2 ? requestAnimationFrame(paint) : 0;
    };
    const move = e => {
      if (!allowed.matches || e.pointerType !== 'mouse') return;
      tx = e.clientX; ty = e.clientY;
      layer.current?.style.setProperty('--pointer-visible', '1');
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const leave = () => layer.current?.style.setProperty('--pointer-visible', '0');
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    window.addEventListener('blur', leave);
    allowed.addEventListener('change', leave);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', move); document.documentElement.removeEventListener('pointerleave', leave); window.removeEventListener('blur', leave); allowed.removeEventListener('change', leave); };
  }, []);
  return <div className="pointer-atmosphere" ref={layer} aria-hidden="true"><div className="pointer-grid" /><div className="pointer-halo" /></div>;
}
