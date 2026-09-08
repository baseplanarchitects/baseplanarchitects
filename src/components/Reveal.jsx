import { useEffect, useRef, useState } from 'react';

/**
 * Wraps children and adds an "in" class once the element scrolls into view,
 * mirroring the original site's .reveal / .reveal-scale IntersectionObserver
 * behaviour. Pass variant="scale" for the scale-in style.
 */
export default function Reveal({
  as: Tag = 'div',
  variant = 'up',
  className = '',
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(() => typeof window !== 'undefined' && !('IntersectionObserver' in window));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const base = variant === 'scale' ? 'reveal-scale' : 'reveal';

  return (
    <Tag
      ref={ref}
      className={[base, visible ? 'in' : '', className].filter(Boolean).join(' ')}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
