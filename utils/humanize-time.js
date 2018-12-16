module.exports = (ms) => {
  let t = Math.round(ms / 1000);
  const s = t % 60;
  t = Math.floor(t / 60);
  const m = t % 60;
  const h = Math.floor(t / 60);
  let out = '';
  if (h) out += `${h}h`;
  if (m) out += `${m}m`;
  if (s) out += `${s}s`;
  return out;
}