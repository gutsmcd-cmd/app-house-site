import { render } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { ArtHouse } from './art.jsx';
import './styles.css';

const BASE = import.meta.env.BASE_URL;
const T = {
  tag: { en: '… a family of TRULY free apps :D', ja: '… 本当に無料のアプリたち :D' },
  promise: { en: ['No adverts', 'No logins', 'Light & easy', 'Works fully offline', 'Phone & PC'], ja: ['広告なし', 'ログインなし', '軽くてかんたん', '完全オフライン', 'スマホもPCも'] },
  pick: { en: 'Pick a house to walk in', ja: '家を選んで、中へどうぞ' },
  lights: { en: 'Lights off', ja: '電気を消す' }, lightsOn: { en: 'Lights on', ja: '電気をつける' },
  magnify: { en: 'Magnifier', ja: '虫めがね' },
  best: { en: 'Glowing = Awesome or Unique', ja: '光るのは「すごい」か「めずらしい」' },
  awesome: { en: 'Awesome', ja: 'すごい' }, unique: { en: 'Unique', ja: 'めずらしい' }, newb: { en: 'New', ja: '新着' }, soon: { en: 'Soon', ja: '準備中' },
  all: { en: 'All', ja: 'ぜんぶ' },
  style: { en: 'House style', ja: '家のスタイル' }, season: { en: 'Seasonal look', ja: '季節の飾り' },
  open: { en: 'Open in new tab', ja: '新しいタブで開く' }, install: { en: 'Install as app', ja: 'アプリとして入れる' },
  apk: { en: 'Download Android app', ja: 'Androidアプリをダウンロード' }, ext: { en: 'Get the Chrome extension', ja: 'Chrome拡張を入手' },
  how: { en: 'How to use it', ja: '使い方' }, back: { en: '← Back to the house', ja: '← 家に戻る' },
  offline: { en: 'Take the house offline', ja: '家をオフラインにする' }, offOn: { en: 'House saved for offline ✓', ja: 'オフライン保存ずみ ✓' },
  soonNote: { en: 'Still being built in the attic. Check back soon!', ja: '屋根裏で制作中。もう少し待ってね！' },
  suggest: { en: 'Suggest an app', ja: 'アプリを提案' },
};
const STYLES = [['clean', { en: 'Colour', ja: 'カラー' }], ['drawn', { en: 'Drawn', ja: '手描き' }], ['fancy', { en: 'Fancy', ja: 'ゴージャス' }], ['blueprint', { en: 'Blueprint', ja: '設計図' }], ['angled', { en: 'Angled', ja: 'ななめ' }]];
const SEASONS = [['auto', { en: 'Auto (by date)', ja: '自動（日付）' }], ['off', { en: 'Off', ja: 'なし' }], ['sakura', { en: 'Sakura', ja: '桜' }], ['halloween', { en: 'Halloween', ja: 'ハロウィン' }], ['christmas', { en: 'Christmas', ja: 'クリスマス' }], ['newyear', { en: 'New Year', ja: 'お正月' }]];
function dateSeason(d = new Date()) {
  const m = d.getMonth() + 1, day = d.getDate();
  if ((m === 12 && day >= 30) || (m === 1 && day <= 10)) return 'newyear';
  if (m === 12) return 'christmas';
  if (m === 10) return 'halloween';
  if (m === 3 || m === 4) return 'sakura';
  return 'off';
}
const ls = (k, d) => { try { return localStorage.getItem('ah.' + k) ?? d; } catch { return d; } };
const save = (k, v) => { try { localStorage.setItem('ah.' + k, v); } catch {} };
const isNew = (a) => a.added && (Date.now() - new Date(a.added)) / 864e5 <= 14;
const shine = (a) => a.awesome || a.unique;

function useHash() {
  const [h, setH] = useState(location.hash.slice(1) || '/');
  useEffect(() => { const f = () => { setH(location.hash.slice(1) || '/'); window.scrollTo(0, 0); }; addEventListener('hashchange', f); return () => removeEventListener('hashchange', f); }, []);
  return h;
}
const go = (p) => { location.hash = p; };

function Badges({ a, lang }) {
  return <span class="badges">
    {a.awesome && <b class="bdg aw">★ {T.awesome[lang]}</b>}
    {a.unique && <b class="bdg un">◆ {T.unique[lang]}</b>}
    {isNew(a) && <b class="bdg nw">{T.newb[lang]}</b>}
    {a.soon && <b class="bdg sn">{T.soon[lang]}</b>}
  </span>;
}

function Season({ s }) {
  if (s === 'off') return null;
  const n = 18, glyph = { sakura: '🌸', halloween: ['🎃', '🦇', '👻'], christmas: '❄️', newyear: ['🎍', '🧧', '🎆'] }[s];
  return <div class={'fall ' + s} aria-hidden="true">{Array.from({ length: n }, (_, i) => <span style={{ left: (i * 97 % 100) + '%', animationDelay: (i * 0.7 % 9) + 's', animationDuration: 7 + (i % 5) + 's' }}>{Array.isArray(glyph) ? glyph[i % glyph.length] : glyph}</span>)}</div>;
}

function FrontDoor({ setLang }) {
  const [hov, setHov] = useState(null);
  const enter = (l) => { setLang(l); go('/house/foyer'); };
  return <main class="door">
    <h1 class="logo">M@ Apps</h1>
    <p class="tag"><span lang="en">… a family of <u>TRULY</u> free apps :D</span> <span lang="ja">本当に無料のアプリたち</span></p>
    <div class="doors">
      {[['ja', '日本語'], ['en', 'English']].map(([l, label]) =>
        <button class={'doorpick' + (hov === l ? ' lit' : '')} onMouseEnter={() => setHov(l)} onMouseLeave={() => setHov(null)} onFocus={() => setHov(l)} onClick={() => enter(l)}>
          <span class="langbtn">{label}</span>
          <ArtHouse kind={l} lit={hov === l} spots={false} />
        </button>)}
    </div>
    <ul class="promise">{T.promise.en.map((p, i) => <li>{p}<small>{T.promise.ja[i]}</small></li>)}</ul>
  </main>;
}

function Magnifier({ on }) {
  const [p, setP] = useState({ x: -999, y: -999 });
  useEffect(() => { if (!on) return; const f = (e) => { const t = e.touches ? e.touches[0] : e; setP({ x: t.clientX, y: t.clientY }); }; addEventListener('pointermove', f); addEventListener('touchmove', f); return () => { removeEventListener('pointermove', f); removeEventListener('touchmove', f); }; }, [on]);
  if (!on) return null;
  return <div class="mag" style={{ '--mx': p.x + 'px', '--my': p.y + 'px' }}><div class="lens" /></div>;
}

function HouseView({ data, lang, room, prefs, setPref }) {
  const filter = prefs.filter, setFilter = (f) => setPref('filter', f);
  const match = (a) => filter === 'awesome' ? a.awesome : filter === 'unique' ? a.unique : shine(a);
  const names = Object.fromEntries(data.rooms.map((r) => [r.id, r.name[lang]]));
  const glow = {}; data.apps.forEach((a) => { if (match(a)) glow[a.room] = (glow[a.room] || 0) + 1; });
  const FOY = { id: 'foyer', name: { en: 'Foyer', ja: '玄関' }, lead: { en: 'Welcome in! The house favourites: every Awesome or Unique app, all in one spot.', ja: 'いらっしゃい！家の自慢：「すごい」「めずらしい」アプリをまとめて。' } };
  names.foyer = FOY.name[lang];
  const R = room === 'foyer' || !room ? FOY : data.rooms.find((r) => r.id === room) || FOY;
  let apps = R.id === 'foyer' ? data.apps.filter(shine) : data.apps.filter((a) => a.room === R.id);
  const best = data.apps.filter((a) => (filter === 'awesome' ? a.awesome : filter === 'unique' ? a.unique : false));
  return <main class="split">
    <section class={'housewrap st-' + prefs.style}>
      <ArtHouse kind={lang} lit active={R.id} onPick={(id) => go('/house/' + id)} glow={filter !== 'all' ? glow : {}} names={names} />
      <Season s={prefs.season} />
      <p class="hint">{filter === 'all' ? (lang === 'ja' ? '「すごい」「めずらしい」を選ぶと、家の電気が消えてその部屋が光ります' : 'Pick Awesome or Unique: the lights go off and those rooms glow') : T.best[lang]}</p>
    </section>
    <section class={'scene room-' + R.id}>
      <header class="scenehead">
        <div><p class="kicker">{lang === 'ja' ? '部屋' : 'Room'}</p><h2>{R.name[lang]}</h2><p class="lead">{R.lead[lang]}</p></div>
        <div class="chips">{['all', 'awesome', 'unique'].map((f) => <button class={'chip' + (filter === f ? ' on' : '')} onClick={() => setFilter(f)}>{f === 'all' ? T.all[lang] : f === 'awesome' ? '★ ' + T.awesome[lang] : '◆ ' + T.unique[lang]}</button>)}</div>
      </header>
      {<div class="objects">{apps.map((a) => <AppObj a={a} lang={lang} lit={filter !== 'all' && match(a)} showRoom={R.id === 'foyer' ? names[a.room] : null} />)}<div class="floor" /></div>}
    </section>
  </main>;
}

function AppObj({ a, lang, showRoom, lit }) {
  return <button class={'obj' + (lit ? ' shine' : '') + (a.soon ? ' dusty' : '')} onClick={() => go('/app/' + a.id)}>
    <span class="ico">{a.icon}</span>
    <span class="oname">{a.name[lang]}</span>
    <span class="oblurb">{a.blurb[lang]}</span>
    {showRoom && <span class="oroom">{showRoom}</span>}
    <Badges a={a} lang={lang} />
  </button>;
}

function Preview({ data, lang, id }) {
  const a = data.apps.find((x) => x.id === id);
  const [inst, setInst] = useState(false);
  if (!a) return <main class="pv"><a href="#/house/foyer">{T.back[lang]}</a></main>;
  const steps = a.steps[lang];
  return <main class="pv">
    <a class="back" href={'#/house/' + a.room}>{T.back[lang]}</a>
    <div class="pvgrid">
      <div class="phone">
        {!a.shot && (a.soon || a.kind !== 'web') ? <div class="shotph"><span>{a.icon}</span></div> : <img src={BASE + 'shots/' + a.id + '.webp'} alt={a.name[lang]} loading="lazy" />}
        <ol class="overlay">{steps.map((s, i) => <li style={{ top: 14 + i * 28 + '%' }}><b>{i + 1}</b>{s}</li>)}</ol>
      </div>
      <div class="pvtext">
        <p class="ico big">{a.icon}</p>
        <h2>{a.name[lang]}</h2>
        {lang === 'en' && a.name.ja !== a.name.en && <p class="alt">{a.name.ja}</p>}
        <Badges a={a} lang={lang} />
        <p class="desc">{a.blurb[lang]}</p>
        <h3>{T.how[lang]}</h3>
        <ol class="steps">{steps.map((s) => <li>{s}</li>)}</ol>
        {a.soon ? <p class="note">{T.soonNote[lang]}</p> : <div class="acts">
          {a.kind === 'web' && <a class="btn pink" href={a.url} target="_blank" rel="noopener">↗ {T.open[lang]}</a>}
          {a.kind === 'web' && <button class="btn green" onClick={() => setInst(!inst)}>⬇ {T.install[lang]}</button>}
          {a.kind === 'android' && <a class="btn green" href={a.url} target="_blank" rel="noopener">🤖 {T.apk[lang]}</a>}
          {a.kind === 'extension' && <a class="btn green" href={a.url} target="_blank" rel="noopener">🧩 {T.ext[lang]}</a>}
          {a.apk && <a class="btn green" href={a.apk} download>🤖 {lang === 'ja' ? 'アプリを入れる' : 'Install app'}</a>}
        </div>}
        {a.apk && !a.soon && <p class="note">{lang === 'ja' ? 'Android用。最初の1回だけ：「不明なアプリのインストール」の画面が出たら、「この提供元のアプリを許可」をオンにして戻ります。' : 'For Android. First time only: if asked about installing unknown apps, turn on “Allow from this source”, then go back.'}</p>}
        {inst && <InstallHelp lang={lang} url={a.url} />}
      </div>
    </div>
  </main>;
}

function InstallHelp({ lang, url }) {
  const ja = lang === 'ja';
  return <div class="install">
    <p>{ja ? 'ストアは不要。アプリを開いて、ホーム画面に追加するだけ。一度開けばオフラインでも動きます。' : 'No app store needed. Open the app, then add it to your home screen. After the first visit it works offline.'}</p>
    <ul>
      <li><b>Android (Chrome):</b> {ja ? '⋮ メニュー →「アプリをインストール」/「ホーム画面に追加」' : '⋮ menu → “Install app” / “Add to Home screen”'}</li>
      <li><b>iPhone (Safari):</b> {ja ? '共有ボタン □↑ →「ホーム画面に追加」' : 'Share button □↑ → “Add to Home Screen”'}</li>
      <li><b>PC (Chrome / Edge):</b> {ja ? 'アドレスバー右の ⊕ インストールアイコン' : 'the ⊕ install icon at the right of the address bar'}</li>
    </ul>
    <a class="btn pink" href={url} target="_blank" rel="noopener">↗ {ja ? 'アプリを開いて入れる' : 'Open the app to install it'}</a>
  </div>;
}

function Bar({ lang, setLang, prefs, setPref, route }) {
  const [open, setOpen] = useState(null);
  const [off, setOff] = useState(ls('offline', '') === '1');
  const ja = lang === 'ja';
  const tg = (k) => setOpen(open === k ? null : k);
  const takeOffline = async () => {
    if (!('serviceWorker' in navigator)) return;
    const reg = await navigator.serviceWorker.register(BASE + 'sw.js');
    await navigator.serviceWorker.ready;
    const d = await (await fetch(BASE + 'apps.json')).json();
    const assets = [...document.querySelectorAll('script[src],link[rel=stylesheet]')].map((e) => e.src || e.href);
    const list = [BASE, BASE + 'index.html', BASE + 'apps.json', BASE + 'icon.svg', BASE + 'manifest.webmanifest', ...assets, ...['western', 'japanese'].flatMap((k) => [BASE + 'art/' + k + '-line.webp', BASE + 'art/' + k + '-color.webp']), ...d.apps.filter((a) => a.shot || (a.kind === 'web' && !a.soon)).map((a) => BASE + 'shots/' + a.id + '.webp')];
    (reg.active || navigator.serviceWorker.controller).postMessage({ cache: list });
    setOff(true); save('offline', '1');
  };
  const goOnline = async () => {
    if ('serviceWorker' in navigator) { const reg = await navigator.serviceWorker.getRegistration(BASE); reg?.active?.postMessage({ clear: true }); }
    setOff(false); save('offline', '');
  };
  const home = route === '/';
  return <header class={'bar' + (home ? ' clear' : '')}>
    <a class="brand" href="#/">M@ Apps</a>
    {!home && <div class="tools">
      <div class="pop"><button class={'tog' + (open === 'style' ? ' on' : '')} onClick={() => tg('style')}>🎨 {T.style[lang]}</button>
        {open === 'style' && <div class="menu">
          <p class="mh">{T.style[lang]}</p>
          <div class="stylegrid">{STYLES.map(([v, n]) => <button class={'chip' + (prefs.style === v ? ' on' : '')} onClick={() => setPref('style', v)}>{n[lang]}</button>)}</div>
          <p class="mh">{T.season[lang]}</p>
          <div class="stylegrid">{SEASONS.map(([v, n]) => <button class={'chip' + (prefs.seasonPick === v ? ' on' : '')} onClick={() => setPref('seasonPick', v)}>{n[lang]}</button>)}</div>
        </div>}</div>
      <div class="pop"><button class={'tog' + (off ? ' on' : '')} onClick={() => tg('off')}>📴 {T.offline[lang]}</button>
        {open === 'off' && <div class="menu">
          <p>{ja ? 'このサイトを端末に保存して、インターネットなしでも開けるようにします。アプリの紹介や画面もオフラインで見られます。（各アプリ自体は、一度開けばもともとオフラインで動きます）' : 'Saves this site to your device so it opens even without internet: the house, app previews and screenshots. (Each app already works offline once you have opened it.)'}</p>
          {off ? <><p class="ok">{T.offOn[lang]}</p><button class="tog" onClick={goOnline}>{ja ? '保存を消す' : 'Remove saved copy'}</button></> : <button class="btn green" onClick={takeOffline}>{ja ? '保存する' : 'Save for offline'}</button>}
        </div>}</div>
      <a class="tog" href={'mailto:gutsmcd@gmail.com?subject=' + encodeURIComponent(ja ? 'App House アプリの提案' : 'App House suggestion')}>✉ {T.suggest[lang]}</a>
    </div>}
    {!home && <div class="langs"><button class={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>English</button><button class={lang === 'ja' ? 'on' : ''} onClick={() => setLang('ja')}>日本語</button></div>}
  </header>;
}

function App() {
  const route = useHash();
  const [data, setData] = useState(null);
  const [lang, setLangS] = useState(ls('lang', navigator.language?.startsWith('ja') ? 'ja' : 'en'));
  const [p, setP] = useState({ filter: 'all', style: ls('style', 'clean'), seasonPick: ls('season', 'auto') });
  const setLang = (l) => { setLangS(l); save('lang', l); };
  const setPref = (k, v) => { setP((o) => ({ ...o, [k]: v })); if (k === 'style') save('style', v); if (k === 'seasonPick') save('season', v); };
  useEffect(() => { fetch(BASE + 'apps.json').then((r) => r.json()).then(setData); }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const season = p.seasonPick === 'auto' ? dateSeason() : p.seasonPick;
  const prefs = { ...p, season };
  const parts = route.split('/').filter(Boolean);
  let view;
  if (!data) view = <main class="loading">🏠…</main>;
  else if (parts[0] === 'house') view = <HouseView data={data} lang={lang} room={parts[1]} prefs={prefs} setPref={setPref} />;
  else if (parts[0] === 'app') view = <Preview data={data} lang={lang} id={parts[1]} />;
  else view = <FrontDoor setLang={setLang} />;
  return <div class={'site' + (p.filter !== 'all' && parts[0] === 'house' ? ' dark' : '') + ' season-' + season}>
    <Bar lang={lang} setLang={setLang} prefs={prefs} setPref={setPref} route={parts.length ? route : '/'} />
    {view}
    <footer>{lang === 'ja' ? '無料・広告なし・ログインなし。全部オフラインで動く。' : 'Free · no ads · no logins · every app works offline.'} · <a href="https://github.com/gutsmcd-cmd/app-house-site">GitHub</a></footer>
  </div>;
}
render(<App />, document.getElementById('app'));
