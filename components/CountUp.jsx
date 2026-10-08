'use client';
import { useEffect, useRef, useState } from 'react';

// Animates a number from its previous value to the new one.
export default function CountUp({ value, dur = 1200 }) {
  const [v, setV] = useState(0);
  const from = useRef(0);
  useEffect(() => {
    const f0 = from.current, t0 = performance.now();
    let raf;
    const step = (n) => {
      const k = Math.min((n - t0) / dur, 1);
      const cur = f0 + (value - f0) * (1 - Math.pow(1 - k, 4));
      from.current = cur; setV(cur);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, dur]);
  return <>{Math.round(v).toLocaleString()}</>;
}
