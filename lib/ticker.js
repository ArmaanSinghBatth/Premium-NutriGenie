// One shared animation loop (~30fps) for every visible exercise figure.
const subs = new Set();
let raf = 0, last = 0;
function loop(t) {
  if (t - last > 30) { last = t; subs.forEach((f) => f(t)); }
  raf = subs.size ? requestAnimationFrame(loop) : 0;
}
export function subscribe(fn) {
  subs.add(fn);
  if (!raf) raf = requestAnimationFrame(loop);
  return () => subs.delete(fn);
}
