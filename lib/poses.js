import { PS } from './poseData';
export { PS };

// Two-bone inverse kinematics: keeps limb lengths constant so feet stay planted.
function ik(p, t, l1, l2, s) {
  const dx = t[0] - p[0], dy = t[1] - p[1];
  let d = Math.hypot(dx, dy);
  if (d >= l1 + l2 - 0.01) {
    const k = 1 / d;
    return [[p[0] + dx * k * l1, p[1] + dy * k * l1], [p[0] + dx * k * (l1 + l2), p[1] + dy * k * (l1 + l2)]];
  }
  d = Math.max(d, Math.abs(l1 - l2) + 0.1);
  const a = Math.atan2(dy, dx), A = Math.acos((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d)), m = a + s * A;
  return [[p[0] + l1 * Math.cos(m), p[1] + l1 * Math.sin(m)], t];
}

// Returns everything needed to draw a figure at time T (seconds).
export function figure(poseKey, propIn, T) {
  const P = PS[poseKey] || PS.squat;
  const prop = propIn && propIn !== 'none' ? propIn : P.prop || '';
  const ph = (T * P.sp) % 1, tri = ph < 0.5 ? ph * 2 : 2 - ph * 2;
  const u = Math.min(Math.max((tri - 0.14) / 0.72, 0), 1), e = u * u * (3 - 2 * u);
  const g = (f) => P.A[f].map((v, i) => v + (P.B[f][i] - v) * e);
  const hip = g('hip'), neck = g('neck'), foot = g('foot'), foot2 = g('foot2'), h2 = g('h2');
  let hand = g('hand');
  if (prop && P.hn) hand = [neck[0] + 7, neck[1] + 7];
  const l1 = ik(hip, foot, 30, 30, -1), l2 = ik(hip, foot2, 30, 30, -1);
  const a1 = ik(neck, hand, 22, 22, 1), a2 = ik(neck, h2, 22, 22, 1);
  const dx = neck[0] - hip[0], dy = neck[1] - hip[1], n = Math.hypot(dx, dy) || 1;
  return {
    P, prop, hand: a1[1],
    far: [[hip, l2[0], l2[1]], [neck, a2[0], a2[1]]],
    near: [[hip, neck], [hip, l1[0], l1[1]], [neck, a1[0], a1[1]]],
    head: [neck[0] + (dx / n) * 13, neck[1] + (dy / n) * 13],
  };
}
