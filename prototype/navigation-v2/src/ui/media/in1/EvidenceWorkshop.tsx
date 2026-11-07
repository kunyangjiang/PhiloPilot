import { useState } from 'react';
import { getMedia, setMedia } from '../../../state/store';
import './in1.css';

// 五 · after the comparison of the two readings of the Cārvāka (the critics'
// “perception only” and Bhattacharya's reconstruction). The learner sorts five
// claims by the kind of knowledge they would need, then sees which claims each
// version of the Cārvāka would count as knowledge, and how the objection “you
// reject inference, yet you infer” fares under each. The last claim is the
// manuscript's open question and is never given a placement.
// Sources: the smoke–fire example and the rejection of inference about the
// afterlife are in the manuscript (via Bhattacharya 2010); the footprint
// example is the manuscript's own; the pot is added here and labelled so.

type Bin = 'see' | 'grounded' | 'beyond';
const BINS: [Bin, string][] = [
  ['see', '感知'],
  ['grounded', '以感知为基础、可以反复检验的推理'],
  ['beyond', '关于原则上不可感知之物的推理'],
];
const BIN_NAME = Object.fromEntries(BINS) as Record<Bin, string>;

interface Card {
  id: string;
  t: string;
  src: string;
  /** The chapter's placement; none for the open question. */
  bin?: Bin;
  note: string;
}

const CARDS: Card[] = [
  { id: 'pot', t: '我看见眼前有一个罐子。', src: '本练习设想的例子', bin: 'see', note: '直接的感知。无论哪一种读法，顺世论都承认它。' },
  {
    id: 'smoke',
    t: '远处有烟，所以那里有火。',
    src: '片段中的例子（据巴塔恰里亚）',
    bin: 'grounded',
    note: '这是一个推理，但它以感知为基础，可以靠反复观察来检验：走过去就能看到火。据巴塔恰里亚，注释者们承认这种“世间公认的推理”。',
  },
  {
    id: 'track',
    t: '由地上的足迹，推测走过的是什么动物。',
    src: '本章的例子',
    bin: 'grounded',
    note: '同样是推理，根据是过去的观察，原则上可以检验。',
  },
  {
    id: 'after',
    t: '人死后会在另一个世界再生。',
    src: '顺世论否认的对象',
    bin: 'beyond',
    note: '来世原则上无法感知，所以关于它的推理无法回到感知来检验。两种读法的顺世论都不承认这是知识。',
  },
  {
    id: 'mind',
    t: '人的意识依赖于身体。',
    src: '本章留下的问题',
    note: '这是一个开放的问题，本章不给它指定位置。',
  },
];

const MIND: Record<Bin, string> = {
  see: '放在“感知”里：我们确实能观察到身体受伤、醉酒、昏睡时意识随之改变。代价：我们观察到的是两者一起变化，“依赖”这一层关系本身并没有被看到。',
  grounded: '放在“可以检验的推理”里：它和由烟推火一样，靠反复观察意识和身体一起变化来支持。代价：它说的是“一切意识”，包括没有观察到的情形，这比由烟推火要大胆得多。',
  beyond: '放在“不可感知之物”里：它是关于意识本身的一般主张，超出了任何一次观察。代价：如果这样，顺世论就要用自己的标准否定自己的核心主张。',
};

const VERSIONS: { id: 'critic' | 'recon'; name: string; ok: Bin[] }[] = [
  { id: 'critic', name: '批评者笔下的顺世论', ok: ['see'] },
  { id: 'recon', name: '巴塔恰里亚重建的顺世论', ok: ['see', 'grounded'] },
];

const ID = 'evidence-workshop';

export default function EvidenceWorkshop() {
  const [picks, setPicks] = useState<Record<string, Bin>>(() => getMedia<Record<string, Bin>>('IN1', ID, {}));
  const [cur, setCur] = useState(0);
  const c = CARDS[cur];
  const p = picks[c.id];
  const all = CARDS.every((x) => picks[x.id]);
  const update = (b: Bin) => {
    const next = { ...picks, [c.id]: b };
    setPicks(next);
    setMedia('IN1', ID, next);
  };
  const reset = () => {
    setPicks({});
    setMedia('IN1', ID, {});
    setCur(0);
  };

  return (
    <section className="md ew" aria-labelledby="ew-title">
      <header className="md-head">
        <p className="md-tag">动手分类</p>
        <h3 id="ew-title" className="md-title">
          哪些推理，顺世论会承认？
        </h3>
        <p className="md-lede">
          给每一句话找一个位置：它靠的是感知，是可以回到感知来检验的推理，还是关于原则上不可感知之物的推理？放完五句以后，看看两种读法的顺世论各自会把哪些句子算作知识，以及“你否认推理，可你自己也在推理”这一反驳在两种读法下有什么不同。不计分；选择只保存在这台设备上。
        </p>
      </header>

      <div className="je-list" role="group" aria-label="选择一句话">
        {CARDS.map((x, i) => (
          <button
            key={x.id}
            type="button"
            className={'je-chip' + (i === cur ? ' is-cur' : '') + (picks[x.id] ? ' is-done' : '')}
            aria-pressed={i === cur}
            onClick={() => setCur(i)}
          >
            <span className="je-n">{i + 1}</span>
            <span className="je-chip-t">{x.t}</span>
          </button>
        ))}
      </div>

      <div className="je-work">
        <p className="je-sent">
          <span className="je-src">{c.src}</span>
          {c.t}
        </p>
        <fieldset className="cs-group">
          <legend>它靠的是哪一种知识来源？</legend>
          <div className="md-seg">
            {BINS.map(([b, label]) => (
              <label key={b} className={'md-seg-opt' + (p === b ? ' is-on' : '')}>
                <input type="radio" name={'ew-' + c.id} checked={p === b} onChange={() => update(b)} />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="md-feedback" aria-live="polite">
        {!p ? (
          <p className="md-muted">选好位置以后，可以对照本章的说法。</p>
        ) : c.bin ? (
          <>
            <p className="md-fb-k">
              本章的放法：{BIN_NAME[c.bin]}
              {p === c.bin ? '（与你的一致）' : ''}
            </p>
            <p>{c.note}</p>
            {p !== c.bin && <p className="md-muted">你把它放在“{BIN_NAME[p]}”。差别在哪里：它能不能回到感知来检验？</p>}
          </>
        ) : (
          <>
            <p className="md-fb-k">这一句没有标准的放法</p>
            <p>{MIND[p]}</p>
            <p className="md-muted">本章正文留下的问题正是这一个：顺世论怎样划出“可以检验”和“不可检验”的界线，而“意识依赖于身体”本身落在界线的哪一边？</p>
          </>
        )}
        {cur < CARDS.length - 1 && (
          <button type="button" className="btn btn--small" onClick={() => setCur(cur + 1)}>
            下一句 →
          </button>
        )}
      </div>

      {all && (
        <figure className="ew-result">
          <table className="ew-table">
            <caption className="md-fb-k">按你的放法，两种读法的顺世论会承认哪些是知识</caption>
            <thead>
              <tr>
                <th scope="col">句子</th>
                {VERSIONS.map((v) => (
                  <th key={v.id} scope="col">
                    {v.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CARDS.map((x, i) => (
                <tr key={x.id}>
                  <th scope="row">
                    {i + 1}. {x.t}
                  </th>
                  {VERSIONS.map((v) => (
                    <td key={v.id} className={v.ok.includes(picks[x.id]) ? 'is-yes' : 'is-no'}>
                      {v.ok.includes(picks[x.id]) ? '承认' : '不承认'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <figcaption>
            <p>
              <b>批评者笔下的顺世论</b>只承认感知。这样一来，由烟推火、由足迹推测动物也都不算知识，日常生活离不开的推理都被排除了，而顺世论为自己辩护时也要用推理。所以，“你自己也在推理”这一反驳对这个版本是有效的。
            </p>
            <p>
              <b>巴塔恰里亚重建的顺世论</b>承认以感知为基础、可以检验的推理，否认的只是关于来世、神这类原则上不可感知之物的推理。对这个版本，这一反驳基本落空；问题变成了界线划在哪里，第 5 句就是一个例子。
            </p>
          </figcaption>
        </figure>
      )}
      <button type="button" className="md-reset" onClick={reset}>
        清空重做
      </button>

      <p className="md-note">
        <b>这个练习的限度。</b>五句话中，只有“由烟推火”和否认来世出自片段及其研究，“足迹”是本章正文的例子，“罐子”是本练习补充的。巴塔恰里亚的重建依据的是少数片段和他一个人的研究，“只承认感知”的版本则主要来自后来的批评者；两者都不是顺世论自己完整的著作，那些著作已经失传。三个类别是为了练习而作的简化，不是顺世论经的原有分类。
      </p>
    </section>
  );
}
