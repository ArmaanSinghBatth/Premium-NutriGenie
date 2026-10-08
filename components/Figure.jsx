'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { figure } from '../lib/poses';
import { subscribe } from '../lib/ticker';

const pt = (p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`;
const poly = (a) => a.map(pt).join(' ');

// Animated exercise figure. Only animates while on screen.
export default function Figure({ pose, prop = 'none', className = '' }) {
  const ref = useRef(null);
  const [t, setT] = useState(0);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVis(e.isIntersecting));
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  useEffect(() => (vis ? subscribe(() => setT(performance.now() / 1000)) : undefined), [vis]);
  const d = useMemo(() => figure(pose, prop, t), [pose, prop, t]);
  const { P, prop: pr, hand: H, far, near, head } = d;
  return (
    <svg ref={ref} className={`fg ${className}`} viewBox="0 -24 200 170">
      <line x1="8" y1="139" x2="192" y2="139" className="sc" />
      {P.bench && <><rect x="38" y="112" width="88" height="9" rx="4" className="sc" /><path d="M52 121v18M112 121v18" className="sc" /></>}
      {P.pad && <path d={P.pad} className="sc" />}
      {P.bar && <line x1="66" y1="-12" x2="138" y2="-12" className="sc" />}
      {P.seat && <><rect x="70" y="114" width="44" height="7" rx="3" className="sc" /><path d="M72 114V60M92 121v18" className="sc" /></>}
      {P.cable === 'v' && <line x1={H[0]} y1={H[1]} x2="100" y2="-24" className="cb" />}
      {P.cable === 'l' && <line x1={H[0]} y1={H[1]} x2="84" y2="139" className="cb" />}
      {P.cable === 'h' && <line x1={H[0]} y1={H[1]} x2="196" y2={H[1]} className="cb" />}
      <g className="L F">{far.map((a, i) => <polyline key={i} points={poly(a)} />)}</g>
      <g className="L">{near.map((a, i) => <polyline key={i} points={poly(a)} />)}</g>
      <circle cx={head[0]} cy={head[1]} r="9.5" className="hd" />
      {pr === 'plate' && <><circle cx={H[0]} cy={H[1]} r="13" className="pl" /><circle cx={H[0]} cy={H[1]} r="3" className="pl" /></>}
      {pr === 'db' && <rect x={H[0] - 10} y={H[1] - 4.5} width="20" height="9" rx="3.5" className="pl" />}
    </svg>
  );
}
