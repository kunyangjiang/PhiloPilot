import { useState } from 'react';
import { getMedia, setMedia } from '../../../state/store';
import { KANT_PORTRAIT } from '../assets';

// 一 · 背景: the works this chapter reads, placed on Kant's life (1724—1804).
// Every date and every "where in this chapter" is taken from the chapter
// itself; nothing is added. The portrait's rights and provenance are
// recorded in public/media/ea4/SOURCES.md.

interface Work {
  y: number;
  t: string;
  q: string;
  where: string;
}

const BORN = 1724;
const DIED = 1804;
const WORKS: Work[] = [
  { y: 1764, t: '《关于美感和崇高感的观察》', q: '早期著作；其中有种族等级的论述。', where: '第六节 · 种族与殖民' },
  { y: 1781, t: '《纯粹理性批判》第一版（A）', q: '五十七岁出版。审查理性本身：知识的条件和界限。', where: '第二、三节' },
  { y: 1783, t: '《未来形而上学导论》', q: '休谟的提醒“打断了我独断论的迷梦”。', where: '第一节' },
  { y: 1784, t: '《答复这个问题：什么是启蒙？》', q: '短文：“要有勇气运用你自己的知性！”理性的公共运用。', where: '第六节' },
  { y: 1785, t: '《道德形而上学奠基》', q: '找出并确立道德的最高原则：善良意志、定言命令。', where: '第四节' },
  { y: 1787, t: '《纯粹理性批判》第二版（B）', q: '先验演绎几乎完全重写；新序言说“为信念腾出位置”。', where: '第二、三节' },
  { y: 1788, t: '《实践理性批判》', q: '道德法则的意识是一个“理性的事实”。', where: '第四节' },
  { y: 1790, t: '《判断力批判》', q: '审美判断和自然中的目的；自然与自由之间的过渡。', where: '第五节' },
  { y: 1795, t: '《永久和平论》', q: '世界公民权：“访问的权利”。', where: '第六节' },
  { y: 1797, t: '《道德形而上学》；《论出于人类之爱而说谎的所谓权利》', q: '回应贡斯当：可以对杀手说谎吗？', where: '第四、六节' },
];
const pos = (y: number) => ((y - BORN) / (DIED - BORN)) * 100;

const ID = 'kant-context';

export default function KantContext() {
  const [cur, setCur] = useState(() => getMedia<number>('EA4', ID, 1));
  const pick = (i: number) => {
    setCur(i);
    setMedia('EA4', ID, i);
  };
  const w = WORKS[cur] ?? WORKS[1];

  return (
    <section className="md kc" aria-labelledby="kc-title">
      <header className="md-head">
        <p className="md-tag">时间线</p>
        <h3 id="kc-title" className="md-title">
          本章读到的著作，放在康德一生中
        </h3>
        <p className="md-lede">康德 1724 年生于柯尼斯堡，1804 年在那里去世。三部批判都在他五十七岁以后出版。点任一著作，看它在本章哪里出现。</p>
      </header>

      <div className="kc-life" aria-hidden="true">
        <span className="kc-life-bar">
          <span className="kc-critical" style={{ left: pos(1781) + '%', width: pos(1790) - pos(1781) + '%' }} />
          {WORKS.map((x, i) => (
            <span key={i} className={'kc-pin' + (i === cur ? ' is-cur' : '')} style={{ left: pos(x.y) + '%' }} />
          ))}
        </span>
        <span className="kc-life-y" style={{ left: '0%' }}>
          1724 生
        </span>
        <span className="kc-life-y kc-life-y--mid" style={{ left: pos(1781) + '%' }}>
          1781
        </span>
        <span className="kc-life-y kc-life-y--end" style={{ left: '100%' }}>
          1804 卒
        </span>
      </div>

      <ol className="kc-works">
        {WORKS.map((x, i) => (
          <li key={i}>
            <button type="button" className={'kc-work' + (i === cur ? ' is-cur' : '')} aria-pressed={i === cur} onClick={() => pick(i)}>
              <span className="kc-y">{x.y}</span>
              <span className="kc-t">{x.t}</span>
              <span className="kc-age">{x.y - BORN} 岁</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="tl-note" aria-live="polite">
        <p className="md-fb-k">
          {w.y} · {w.t}
        </p>
        <p>{w.q}</p>
        <p className="md-note">本章：{w.where}</p>
      </div>
      <p className="md-note">年份与内容均取自本章正文。年龄按出版年份减去出生年份粗算。三部批判的出版时段（1781—1790）以黄色标出。</p>

      {KANT_PORTRAIT.available && (
        <figure className="tl-obj">
          <img src={KANT_PORTRAIT.src} width={KANT_PORTRAIT.width} height={KANT_PORTRAIT.height} alt={KANT_PORTRAIT.alt} loading="lazy" decoding="async" />
          <figcaption>
            <p>
              <b>后人眼中的康德。</b>这幅钢版画由约翰·莱昂哈德·拉布（Johann Leonhard Raab）根据德布勒（Döbler）的一幅画作刻制，由莱比锡的布赖特科普夫与黑特尔出版社发行。它是十九世纪的复制品，不是康德生前的作品；图中只截取了画像部分。
            </p>
            <p className="md-note">
              {KANT_PORTRAIT.credit}{' '}
              <a href={KANT_PORTRAIT.url} target="_blank" rel="noopener noreferrer">
                藏品记录
              </a>
            </p>
          </figcaption>
        </figure>
      )}
    </section>
  );
}
