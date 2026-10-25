// Mat's original house art (SuperGrok Imagine) with clickable room hotspots, in % of the image.
const BASE = import.meta.env.BASE_URL;
export const SPOTS = {
  en: { attic: [40, 8, 24, 16], lounge: [33, 26, 33, 24], game: [66, 26, 23, 24], study: [6, 52, 24, 30], foyer: [30, 52, 11, 30], workshop: [41, 52, 15, 30], kitchen: [56, 52, 32, 30] },
  ja: { attic: [27, 8, 46, 20], study: [7, 30, 26, 36], workshop: [33, 30, 22, 36], kitchen: [55, 30, 15, 36], lounge: [70, 30, 28, 38], game: [70, 68, 28, 22], foyer: [2, 64, 18, 18] },
};
export function ArtHouse({ kind, lit, active, onPick, glow = {}, names = {}, spots = true }) {
  const k = kind === 'ja' ? 'japanese' : 'western';
  return <div class={'art' + (lit ? ' lit' : '') + (active ? ' hassel' : '')}>
    <img class="line" src={BASE + 'art/' + k + '-line.webp'} alt="" width="1000" height="667" />
    <img class="color" src={BASE + 'art/' + k + '-color.webp'} alt={kind === 'ja' ? '日本の家' : 'Western house'} width="1000" height="667" />
    {spots && Object.entries(SPOTS[kind]).map(([id, [x, y, w, h]]) =>
      <button class={'spot' + (active === id ? ' on' : '') + (glow[id] ? ' hasglow' : '')} style={{ left: x + '%', top: y + '%', width: w + '%', height: h + '%' }} onClick={() => onPick(id)} aria-label={names[id] || id}>
        {active === id ? <span class="sign"><i class="str l" /><i class="str r" /><b>{names[id] || id}</b></span> : <span class="slabel">{names[id] || id}</span>}{glow[id] ? <i class="orb" /> : null}
      </button>)}
  </div>;
}
