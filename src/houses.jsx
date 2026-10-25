// Original SVG houses. Both share the same room boxes so navigation never changes.
export const ROOMS = {
  attic: { x: 214, y: 96, w: 172, h: 58 },
  study: { x: 110, y: 160, w: 190, h: 110 },
  lounge: { x: 300, y: 160, w: 190, h: 110 },
  workshop: { x: 110, y: 276, w: 190, h: 110 },
  kitchen: { x: 300, y: 276, w: 190, h: 110 },
  game: { x: 110, y: 404, w: 380, h: 84 },
};
const fur = {
  attic: (r) => <g><rect x={r.x+30} y={r.y+30} width="34" height="26" class="f2"/><rect x={r.x+80} y={r.y+36} width="40" height="20" class="f1"/><circle cx={r.x+150} cy={r.y+40} r="10" class="f3"/></g>,
  study: (r) => <g><rect x={r.x+14} y={r.y+20} width="60" height="70" class="f2"/><line x1={r.x+14} y1={r.y+43} x2={r.x+74} y2={r.y+43} class="ln"/><line x1={r.x+14} y1={r.y+66} x2={r.x+74} y2={r.y+66} class="ln"/><rect x={r.x+100} y={r.y+62} width="70" height="8" class="f1"/><rect x={r.x+110} y={r.y+70} width="6" height="34" class="f1"/><rect x={r.x+156} y={r.y+70} width="6" height="34" class="f1"/><rect x={r.x+118} y={r.y+44} width="30" height="18" class="f3"/></g>,
  lounge: (r) => <g><rect x={r.x+20} y={r.y+60} width="100" height="34" rx="8" class="f3"/><rect x={r.x+20} y={r.y+48} width="100" height="18" rx="8" class="f1"/><rect x={r.x+136} y={r.y+20} width="40" height="30" class="f2"/><circle cx={r.x+160} cy={r.y+86} r="12" class="f1"/></g>,
  workshop: (r) => <g><rect x={r.x+12} y={r.y+66} width="120" height="10" class="f1"/><rect x={r.x+20} y={r.y+76} width="8" height="28" class="f1"/><rect x={r.x+116} y={r.y+76} width="8" height="28" class="f1"/><rect x={r.x+30} y={r.y+40} width="30" height="26" class="f3"/><rect x={r.x+146} y={r.y+18} width="32" height="86" class="f2"/></g>,
  kitchen: (r) => <g><rect x={r.x+14} y={r.y+18} width="40" height="86" rx="4" class="f2"/><rect x={r.x+64} y={r.y+62} width="110" height="42" class="f1"/><rect x={r.x+64} y={r.y+20} width="110" height="22" class="f3"/><circle cx={r.x+96} cy={r.y+58} r="5" class="ln"/></g>,
  game: (r) => <g><rect x={r.x+30} y={r.y+30} width="80" height="40" rx="6" class="f3"/><rect x={r.x+160} y={r.y+20} width="60" height="44" class="f2"/><circle cx={r.x+300} cy={r.y+46} r="22" class="f1"/><circle cx={r.x+300} cy={r.y+46} r="8" class="f3"/></g>,
};
function Rooms({ active, onPick, glow, names }) {
  return Object.entries(ROOMS).map(([id, r]) => (
    <g key={id} class={'room' + (active === id ? ' on' : '') + (glow[id] ? ' hasglow' : '')} onClick={() => onPick(id)} role="button" tabIndex="0" aria-label={names[id]}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onPick(id)}>
      <rect x={r.x} y={r.y} width={r.w} height={r.h} class="rbg" />
      {fur[id](r)}
      {glow[id] ? <circle cx={r.x + r.w - 16} cy={r.y + 16} r="7" class="orb" /> : null}
      <text x={r.x + 8} y={r.y + r.h - 8} class="rname">{names[id]}</text>
      <rect x={r.x} y={r.y} width={r.w} height={r.h} class="rhl" />
    </g>
  ));
}
export function WesternHouse({ active, onPick = () => {}, glow = {}, names = {}, mini }) {
  return (
    <svg viewBox="0 0 600 520" class={'house western' + (mini ? ' mini' : '')}>
      <rect x="0" y="0" width="600" height="520" class="sky" />
      <rect x="390" y="40" width="34" height="70" class="wall" />
      <polygon points="80,160 300,40 520,160" class="roof" />
      <polygon points="200,154 300,98 400,154" class="atticbg" />
      <rect x="100" y="154" width="400" height="240" class="wall" />
      <rect x="100" y="394" width="400" height="104" class="base" />
      <line x1="40" y1="398" x2="560" y2="398" class="ground" />
      <rect x="24" y="398" width="552" height="110" class="earth" />
      <Rooms active={active} onPick={onPick} glow={glow} names={names} />
      <circle cx="540" cy="370" r="26" class="tree" /><rect x="536" y="370" width="8" height="28" class="trunk" />
      <circle cx="60" cy="372" r="20" class="tree" /><rect x="56" y="372" width="8" height="26" class="trunk" />
      <g class="season" />
    </svg>
  );
}
export function JapaneseHouse({ active, onPick = () => {}, glow = {}, names = {}, mini }) {
  return (
    <svg viewBox="0 0 600 520" class={'house japanese' + (mini ? ' mini' : '')}>
      <rect x="0" y="0" width="600" height="520" class="sky" />
      <path d="M40 168 Q70 150 110 150 L190 70 L410 70 L490 150 Q530 150 560 168 Z" class="roof" />
      <path d="M190 70 L410 70" class="ridge" />
      <rect x="200" y="92" width="200" height="62" class="atticbg" />
      <rect x="100" y="154" width="400" height="240" class="wall" />
      <rect x="100" y="394" width="400" height="104" class="base" />
      <rect x="70" y="384" width="460" height="12" class="deck" />
      <line x1="40" y1="398" x2="560" y2="398" class="ground" />
      <rect x="24" y="398" width="552" height="110" class="earth" />
      <Rooms active={active} onPick={onPick} glow={glow} names={names} />
      <g class="shoji">{[0,1,2,3,4,5,6,7].map((i) => <line key={i} x1={110 + i * 50} y1="154" x2={110 + i * 50} y2="160" />)}</g>
      <g class="lantern"><rect x="532" y="330" width="22" height="10" /><rect x="536" y="340" width="14" height="16" /><rect x="540" y="356" width="6" height="40" /></g>
      <path d="M40 395 q20 -46 40 0" class="tree" />
      <g class="season" />
    </svg>
  );
}
