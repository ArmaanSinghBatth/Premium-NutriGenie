import { useCallback, useEffect, useRef, useState } from 'react';

// Counts steps from the phone's motion sensor (needs https; iPhone asks permission).
export function useStepSensor(onStep) {
  const [status, setStatus] = useState('idle'); // idle | tracking | unavailable
  const cb = useRef(onStep); cb.current = onStep;
  const handler = useRef(null);
  const start = useCallback(async () => {
    try {
      if (typeof DeviceMotionEvent === 'undefined') throw 0;
      if (DeviceMotionEvent.requestPermission) { const r = await DeviceMotionEvent.requestPermission(); if (r !== 'granted') throw 0; }
      let last = 0, lastMag = 0;
      handler.current = (ev) => {
        const a = ev.accelerationIncludingGravity; if (!a) return;
        const m = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z), n = Date.now();
        if (m > 12.5 && lastMag <= 12.5 && n - last > 320) { last = n; cb.current(); }
        lastMag = m;
      };
      window.addEventListener('devicemotion', handler.current);
      setStatus('tracking');
    } catch (e) { setStatus('unavailable'); }
  }, []);
  useEffect(() => () => handler.current && window.removeEventListener('devicemotion', handler.current), []);
  return { status, start };
}
