import { useState } from 'react';
import { DING } from './assets';

// 一 · 历史基础: where the three thinkers sit in time, using only the dates the
// course itself gives. Uncertain ends fade out instead of stopping at a
// precise year. It is an orientation aid, not a claim of lineage or progress.

const FROM = 600; // BCE, left edge
const TO = 200; // BCE, right edge
const pos = (bce: number) => ((FROM - bce) / (FROM - TO)) * 100;
const TICKS = [550, 500, 450, 400, 350, 300, 250];

interface Person {
  id: string;
  name: string;
  dates: string;
  /** Solid part of the bar (BCE). */
  from: number;
  to: number;
  /** How far each end fades out, in years (0 = a traditional year is given). */
  fadeFrom: number;
  fadeTo: number;
  note: string;
}

// Notes are quoted from 一、历史基础.
const PEOPLE: Person[] = [
  {
    id: 'kz',
    name: '孔子',
    dates: '传统说法：前 551—前 479',
    from: 551,
    to: 479,
    fadeFrom: 0,
    fadeTo: 0,
    note: '传统说法是他生于公元前 551 年、卒于公元前 479 年；这两个年份来自后世的记载，不必当作精确的史实。',
  },
  {
    id: 'mz',
    name: '孟子',
    dates: '约公元前四世纪',
    from: 380,
    to: 320,
    fadeFrom: 20,
    fadeTo: 20,
    note: '孟子大约生活在公元前四世纪，出生时孔子已去世约一百年。他是邹国（今山东一带）人。',
  },
  {
    id: 'xz',
    name: '荀子',
    dates: '约前 310—前 238 之后',
    from: 305,
    to: 238,
    fadeFrom: 15,
    fadeTo: 25,
    note: '荀子活动于公元前三世纪，大约生于公元前 310 年前后，去世应在公元前 238 年之后；早年曾在齐国的学术中心求学。',
  },
];

export default function ContextStrip() {
  const [cur, setCur] = useState('kz');
  const p = PEOPLE.find((x) => x.id === cur)!;

  return (
    <section className="md tl" aria-labelledby="tl-title">
      <header className="md-head">
        <p className="md-tag">时间定位</p>
        <h3 id="tl-title" className="md-title">
          三位思想家大约生活在什么时候
        </h3>
        <p className="md-lede">只用本章给出的年代。实色表示有传统年份，渐隐表示年份不确定。点一位思想家，看本章对他年代的说明。</p>
      </header>

      <div className="tl-chart">
        <div className="tl-axis" aria-hidden="true">
          {TICKS.map((t) => (
            <span key={t} className="tl-tick" style={{ left: pos(t) + '%' }}>
              前 {t}
            </span>
          ))}
        </div>
        <ul className="tl-rows">
          {PEOPLE.map((x) => {
            const left = pos(x.from + x.fadeFrom);
            const right = pos(x.to - x.fadeTo);
            const w = right - left;
            const a = (x.fadeFrom / (x.from + x.fadeFrom - (x.to - x.fadeTo))) * 100;
            const b = 100 - (x.fadeTo / (x.from + x.fadeFrom - (x.to - x.fadeTo))) * 100;
            return (
              <li key={x.id} className={'tl-row' + (x.id === cur ? ' is-cur' : '')}>
                <button type="button" className="tl-who" aria-pressed={x.id === cur} onClick={() => setCur(x.id)}>
                  <b>{x.name}</b>
                  <small>{x.dates}</small>
                </button>
                <span className="tl-track" aria-hidden="true">
                  <span
                    className="tl-bar"
                    style={{
                      left: left + '%',
                      width: w + '%',
                      WebkitMaskImage: `linear-gradient(90deg, transparent 0, #000 ${a}%, #000 ${b}%, transparent 100%)`,
                      maskImage: `linear-gradient(90deg, transparent 0, #000 ${a}%, #000 ${b}%, transparent 100%)`,
                    }}
                  />
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="tl-note" aria-live="polite">
        <p className="md-fb-k">{p.name}</p>
        <p>{p.note}</p>
      </div>
      <p className="md-note">
        时间轴只用来定位，不表示三人之间有师承关系，也不表示思想的“进步”。本章提醒过：把他们排成一条师徒相传的线，是后世的说法，不是战国时期的直接证据。
      </p>

      {DING.available && (
        <figure className="tl-obj">
          <img src={DING.src} width={DING.width} height={DING.height} alt={DING.alt} loading="lazy" decoding="async" />
          <figcaption>
            <p>
              <b>周人留下的礼器。</b>西周青铜鼎（公元前十一世纪），比孔子早约五百年。按收藏馆的说明，这类鼎用来向祖先神灵献上食物，也象征政治权力。孔子说“吾從周”时，他认同的就是这样一套以祭祀和礼仪为中心的制度。这件器物本身与孔子没有直接关系。
            </p>
            <p className="md-note">
              {DING.credit}{' '}
              <a href={DING.url} target="_blank" rel="noreferrer">
                藏品页面
              </a>
            </p>
          </figcaption>
        </figure>
      )}
    </section>
  );
}
