import { useState } from 'react';
import { getMedia, setMedia } from '../../../state/store';

// 想一想（二）as a two-axis sorter. The two distinctions are asked separately
// (content: analytic / synthetic; grounds: a priori / a posteriori) so they
// are never conflated. Sentences and classifications come from 二 · 第二步:
// Kant's own examples carry his verdict; the chapter's added examples carry
// the chapter's; the four exercise sentences have no answer key, so the
// panel only returns guiding questions (and, for 3 and 4, the chapter's own
// hint). Nothing is scored.

type A = 'an' | 'syn';
type B = 'pri' | 'post';
interface Pick {
  a?: A;
  b?: B;
}
interface Sentence {
  t: string;
  src: string;
  verdict?: [A, B];
  note: string;
}

const SENTENCES: Sentence[] = [
  { t: '三角形有三个角。', src: '想一想（二）·（1）', note: '本章不给答案。试问：“有三个角”是否已经包含在“三角形”的概念里？如果是，你还需要去测量三角形吗？' },
  {
    t: '水在一个标准大气压下 100 摄氏度沸腾。',
    src: '想一想（二）·（2）',
    note: '本章不给答案。试问：“水”的概念里包含沸点吗？你能无矛盾地设想水在别的温度沸腾吗？你是怎样知道这件事的？',
  },
  {
    t: '每一个事件都有原因。',
    src: '想一想（二）·（3）',
    note: '本章的提示：它显然不是从“事件”的概念里分析出来的（“事件”只是“发生了的事”，其中并不包含“被某物引起”），可是我们又觉得它不只是“到目前为止都是如此”。如果你也这么觉得，你就站在了康德问题的门口。',
  },
  {
    t: '红色是一种颜色。',
    src: '想一想（二）·（4）',
    note: '本章的提示：这是一个有意留下的难题。有人认为它是分析的，也有人认为它表明分析与综合的界线并不像康德设想的那样清楚；这个界线在二十世纪受到过深刻的质疑（第六节）。',
  },
  { t: '一切物体都有广延。', src: '康德例', verdict: ['an', 'pri'], note: '康德：“占有空间”已经包含在物体的概念里，所以是分析判断；分析判断都是先天的。' },
  { t: '一切物体都有重量。', src: '康德例', verdict: ['syn', 'post'], note: '康德：重量不在“物体”这个概念本身之中，所以是综合判断；要知道它，得靠经验。' },
  {
    t: '7 + 5 = 12',
    src: '康德例',
    verdict: ['syn', 'pri'],
    note: '康德：“7 与 5 之和”的概念里只想到把两个数合起来，并没有想到 12，所以是综合的；它又是必然的，不需要每次去实验，所以是先天的。',
  },
  {
    t: '在物质世界的一切变化中，物质的量保持不变。',
    src: '康德例',
    verdict: ['syn', 'pri'],
    note: '康德把它列为自然科学中的先天综合判断。',
  },
  { t: '所有单身汉都没有结婚。', src: '本章补充', verdict: ['an', 'pri'], note: '本章：“没有结婚”已经包含在“单身汉”的意思里，不用做任何调查就知道它是真的。' },
  { t: '所有单身汉都喜欢做饭。', src: '本章补充', verdict: ['syn', 'post'], note: '本章：要知道它是真是假，得去观察单身汉们（多半会发现它是假的）。' },
  {
    t: '太阳每天早上都会升起。',
    src: '本章补充',
    verdict: ['syn', 'post'],
    note: '本章：人类观察了几千年从无例外，它仍然是后天综合判断；我们能毫无矛盾地设想明天太阳不再升起，它的普遍性只是“到目前为止没有例外”。',
  },
];

const A_OPTS: [A, string][] = [
  ['an', '分析：谓词已包含在主词中'],
  ['syn', '综合：谓词在主词之外'],
];
const B_OPTS: [B, string][] = [
  ['pri', '先天：成立不依赖经验'],
  ['post', '后天：成立依赖经验'],
];
const CELL: Record<string, string> = { 'an-pri': '分析先天', 'an-post': '分析后天', 'syn-pri': '综合先天', 'syn-post': '综合后天' };

const ID = 'judgment-explorer';

export default function JudgmentExplorer() {
  const [picks, setPicks] = useState<Pick[]>(() => {
    const saved = getMedia<Pick[]>('EA4', ID, []);
    return SENTENCES.map((_, i) => saved[i] ?? {});
  });
  const [cur, setCur] = useState(0);
  const [shown, setShown] = useState(false);
  const s = SENTENCES[cur];
  const p = picks[cur];
  const both = !!(p.a && p.b);

  const update = (patch: Pick) => {
    const next = picks.map((x, j) => (j === cur ? { ...x, ...patch } : x));
    setPicks(next);
    setMedia('EA4', ID, next);
  };
  const go = (i: number) => {
    setCur(i);
    setShown(false);
  };
  const reset = () => {
    const empty = SENTENCES.map(() => ({}));
    setPicks(empty);
    setMedia('EA4', ID, empty);
    setShown(false);
  };

  const marks = (a: A, b: B) => picks.map((x, i) => (x.a === a && x.b === b ? i : -1)).filter((i) => i >= 0);
  const verdictText = s.verdict ? `${s.src === '康德例' ? '康德' : '本章'}的分类：${CELL[s.verdict.join('-')]}` : '';
  const differs = s.verdict && both && (p.a !== s.verdict[0] || p.b !== s.verdict[1]);

  return (
    <section className="md je" aria-labelledby="je-title">
      <header className="md-head">
        <p className="md-tag">动手分类</p>
        <h3 id="je-title" className="md-title">
          两个问题，分开回答
        </h3>
        <p className="md-lede">
          每个句子都要回答两个<b>不同</b>的问题：它的谓词是否已经包含在主词里（分析／综合）？它凭什么成立，是否依赖经验（先天／后天）？两个答案交叉，落在下面四格中的一格。不计分；选择只保存在这台设备上。
        </p>
      </header>

      <div className="je-list" role="group" aria-label="选择一个句子">
        {SENTENCES.map((x, i) => (
          <button
            key={i}
            type="button"
            className={'je-chip' + (i === cur ? ' is-cur' : '') + (picks[i].a && picks[i].b ? ' is-done' : '')}
            aria-pressed={i === cur}
            onClick={() => go(i)}
          >
            <span className="je-n">{i + 1}</span>
            <span className="je-chip-t">{x.t}</span>
          </button>
        ))}
      </div>

      <div className="je-work">
        <p className="je-sent">
          <span className="je-src">{s.src}</span>
          {s.t}
        </p>
        <div className="je-axes">
          <fieldset className="cs-group">
            <legend>问题一 · 内容：谓词在主词里吗？</legend>
            <div className="md-seg">
              {A_OPTS.map(([v, label]) => (
                <label key={v} className={'md-seg-opt' + (p.a === v ? ' is-on' : '')}>
                  <input type="radio" name={'je-a-' + cur} checked={p.a === v} onChange={() => update({ a: v })} />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className="cs-group">
            <legend>问题二 · 根据：成立依赖经验吗？</legend>
            <div className="md-seg">
              {B_OPTS.map(([v, label]) => (
                <label key={v} className={'md-seg-opt' + (p.b === v ? ' is-on' : '')}>
                  <input type="radio" name={'je-b-' + cur} checked={p.b === v} onChange={() => update({ b: v })} />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      <figure className="je-grid-wrap">
        <table className="je-grid">
          <caption className="visually-hidden">四种组合，以及你把每个句子放在哪一格</caption>
          <colgroup>
            <col className="je-col-h" />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <td />
              <th scope="col">先天</th>
              <th scope="col">后天</th>
            </tr>
          </thead>
          <tbody>
            {(['an', 'syn'] as A[]).map((a) => (
              <tr key={a}>
                <th scope="row">{a === 'an' ? '分析' : '综合'}</th>
                {(['pri', 'post'] as B[]).map((b) => {
                  const here = p.a === a && p.b === b;
                  const m = marks(a, b);
                  return (
                    <td key={b} className={'je-cell je-cell--' + a + '-' + b + (here ? ' is-here' : '')}>
                      <span className="je-cell-k">
                        {a === 'an' && b === 'post' ? '本章：不存在' : a === 'syn' && b === 'pri' ? '争论的焦点' : ' '}
                      </span>
                      <span className="je-marks">
                        {m.map((i) => (
                          <span key={i} className={'je-mark' + (i === cur ? ' is-cur' : '')} aria-label={'句子 ' + (i + 1)}>
                            {i + 1}
                          </span>
                        ))}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <figcaption className="md-note">格中的数字是你放进去的句子。表格结构按本章第二步的四格表。</figcaption>
      </figure>

      <div className="md-feedback" aria-live="polite">
        {!both ? (
          <p className="md-muted">两个问题都回答以后，可以对照本章的说法。</p>
        ) : (
          <>
            <p className="md-fb-k">你的分类：{CELL[p.a + '-' + p.b]}</p>
            {p.a === 'an' && p.b === 'post' && (
              <p>本章认为这一格是空的：只靠分析概念就能成立的判断，用不着经验。你为什么觉得它依赖经验？也许你在回答问题二时想的是“我们怎样学会这个词”，而不是“这个判断凭什么成立”。</p>
            )}
            {!shown ? (
              <button type="button" className="md-disclose" aria-expanded={false} onClick={() => setShown(true)}>
                对照本章
              </button>
            ) : (
              <div className="je-ref">
                {verdictText && <p className="md-fb-k">{verdictText}</p>}
                <p>{s.note}</p>
                {differs && <p className="md-muted">你的分类与此不同。分歧在问题一还是问题二？先弄清是哪一个问题，再决定要不要改。</p>}
              </div>
            )}
          </>
        )}
        <button type="button" className="md-reset" onClick={reset}>
          清空重做
        </button>
      </div>
    </section>
  );
}
