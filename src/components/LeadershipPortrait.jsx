import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import ResponsiveImage from './ResponsiveImage';

export default function LeadershipPortrait(props) {
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const spring = { stiffness: 160, damping: 24 };
  const smoothX = useSpring(x, spring);
  const smoothY = useSpring(y, spring);
  const smoothScale = useSpring(scale, spring);
  const reset = () => { x.set(0); y.set(0); scale.set(1); };

  return <div className="leader-photo leader-photo-interactive" onPointerMove={(event) => {
    if (reducedMotion || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - bounds.left) / bounds.width - .5) * 16);
    y.set(((event.clientY - bounds.top) / bounds.height - .5) * 16);
    scale.set(1.06);
  }} onPointerLeave={reset} onPointerCancel={reset}>
    <motion.div style={{ x: reducedMotion ? 0 : smoothX, y: reducedMotion ? 0 : smoothY, scale: reducedMotion ? 1 : smoothScale }}>
      <ResponsiveImage {...props} />
    </motion.div>
  </div>;
}
