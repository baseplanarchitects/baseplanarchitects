'use client';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
export default function Magnetic({ children, className = '' }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 20 });
  const sy = useSpring(y, { stiffness: 220, damping: 20 });
  return <motion.span className={`magnetic ${className}`} style={{ x: reduce ? 0 : sx, y: reduce ? 0 : sy }} onPointerMove={(e) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const box = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - box.left - box.width / 2) * .15);
    y.set((e.clientY - box.top - box.height / 2) * .2);
  }} onPointerLeave={() => { x.set(0); y.set(0); }}>{children}</motion.span>;
}
