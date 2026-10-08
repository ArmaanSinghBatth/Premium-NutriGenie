import { useEffect, useState } from 'react';

// useState that persists to localStorage (loads after mount to avoid SSR mismatch).
export function usePersisted(key, init) {
  const [v, setV] = useState(init);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { const r = localStorage.getItem(key); if (r) setV(JSON.parse(r)); } catch (e) {}
    setReady(true);
  }, [key]);
  useEffect(() => {
    if (ready) try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) {}
  }, [key, v, ready]);
  return [v, setV, ready];
}
export const todayKey = () => new Date().toDateString();
export const ZERO = { steps: 0, cal: 0, burn: 0, min: 0, water: 0 };
