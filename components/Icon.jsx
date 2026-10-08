const PATHS = {
  home: 'M3 11l9-8 9 8v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z',
  dumb: 'M6 7v10M3 10v4M18 7v10M21 10v4M6 12h12',
  chef: 'M7 3v7M5 3v4a2 2 0 004 0V3M7 10v11M17 3c-2 2.5-3 5-3 8h3v10V3',
  steps: 'M8 4c2 0 3 2 3 4s-1 3-3 3-3-1-3-3 1-4 3-4zM7 14h3v2a1.5 1.5 0 01-3 0zM16 8c2 0 3 2 3 4s-1 3-3 3-3-1-3-3 1-4 3-4zM15 18h3v1.5a1.5 1.5 0 01-3 0z',
  fire: 'M12 3c1 4 6 6 6 11a6 6 0 01-12 0c0-3 1.5-4.5 3-6 .5 2 1.5 2.5 3-5z',
  drop: 'M12 3s6 6.5 6 11a6 6 0 01-12 0c0-4.5 6-11 6-11z',
  chat: 'M4 5h16v11H9l-5 4z',
};
export default function Icon({ n }) {
  return <svg viewBox="0 0 24 24"><path d={PATHS[n]} /></svg>;
}
