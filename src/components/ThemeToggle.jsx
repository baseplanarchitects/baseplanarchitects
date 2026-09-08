import { useEffect, useState } from 'react';
const modes = ['system', 'light', 'dark'];
export default function ThemeToggle() {
  const [mode, setMode] = useState(() => {
    try { const saved = localStorage.getItem('base-plan-theme'); return modes.includes(saved) ? saved : 'system'; } catch { return 'system'; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    try { localStorage.setItem('base-plan-theme', mode); } catch { /* Private browsing can disable storage. */ }
  }, [mode]);
  return <button className="theme-toggle" onClick={() => setMode(modes[(modes.indexOf(mode) + 1) % modes.length])} aria-label={`Color theme: ${mode}. Change theme.`}>Theme: {mode}</button>;
}
