import { useState } from 'react';
import { getMedia, setMedia } from '../../../state/store';

// 三 · the rainbow example (经验的区分 vs 先验的区分). The learner can let
// "science go one step deeper" as often as they like: every level stays
// inside the frame of space and time, i.e. remains appearance. The thing in
// itself is never drawn — its place is an explicitly blank, dashed region.
// The check question has a grounded answer in the chapter (原子和定律都在
// 康德所说的显象一边); feedback explains, it does not score.

type View = 'empirical' | 'transcendental';
const LEVELS = [
  { k: '天上的彩色弧', s: '日常知觉' },
  { k: '一群水滴', s: '气象学' },
  { k: '光在水滴中的折射', s: '光学' },
  { k: '更细的物理结构与定律', s: '再往下的研究' },
];

type Ans = 'app' | 'thing' | 'unsure';
const ANS: [Ans, string][] = [
  ['app', '显象一边'],
  ['thing', '物自身一边'],
  ['unsure', '说不清'],
];
const FB: Record<Ans, string> = {
  app: '本章的说法正是如此：原子和定律都在康德所说的显象一边。它们在空间和时间中，是科学研究的对象；科学可以无限深入，发现的永远是更多的显象。',
  thing: '这是本章特意要纠正的常见误解：以为物自身就是“现象背后的真实结构”。可原子和定律仍在空间和时间中，仍可被研究，所以仍是先验意义上的显象。请对照上方的“先验的区分”。',
  unsure: '先问一个更简单的问题：原子和物理定律在空间和时间中吗？科学能研究它们吗？如果能，它们就站在先验区分的哪一边？',
};

const ID = 'appearance-explorer';
interface Saved {
  view: View;
  depth: number;
  ans?: Ans;
}

export default function AppearanceExplorer() {
  const [st, setSt] = useState<Saved>(() => getMedia<Saved>('EA4', ID, { view: 'empirical', depth: 1 }));
  const save = (patch: Partial<Saved>) => {
    const next = { ...st, ...patch };
    setSt(next);
    setMedia('EA4', ID, next);
  };
  const tr = st.view === 'transcendental';
  const depth = Math.max(1, Math.min(LEVELS.length - 1, st.depth));

  return (
    <section className="md ae" aria-labelledby="ae-title">
      <header className="md-head">
        <p className="md-tag">图解对照</p>
        <h3 id="ae-title" className="md-title">
          彩虹：两种“显象与实在”
        </h3>
        <p className="md-lede">同一个彩虹的例子，用两种区分去看。切换下面的按钮，看界线画在哪里。</p>
      </header>

      <div className="md-seg ae-switch" role="radiogroup" aria-label="选择一种区分">
        {(
          [
            ['empirical', '经验的区分'],
            ['transcendental', '先验的区分'],
          ] as [View, string][]
        ).map(([v, label]) => (
          <label key={v} className={'md-seg-opt' + (st.view === v ? ' is-on' : '')}>
            <input type="radio" name="ae-view" checked={st.view === v} onChange={() => save({ view: v })} />
            <span>{label}</span>
          </label>
        ))}
      </div>

      <div className={'ae-stage' + (tr ? ' is-tr' : '')}>
        <div className="ae-st">
          <p className="ae-st-k">空间和时间之中</p>
          <ol className="ae-levels">
            {LEVELS.slice(0, depth + 1).map((l, i) => (
              <li key={l.k} className={'ae-level' + (i === 0 ? ' is-top' : '')}>
                {i === 0 && (
                  <svg className="ae-bow" viewBox="0 0 120 44" aria-hidden="true">
                    <path d="M8 42 A52 40 0 0 1 112 42" className="ae-bow-1" />
                    <path d="M18 42 A42 31 0 0 1 102 42" className="ae-bow-2" />
                    <path d="M28 42 A32 22 0 0 1 92 42" className="ae-bow-3" />
                  </svg>
                )}
                <span className="ae-level-k">{l.k}</span>
                <span className="ae-level-s">{l.s}</span>
                {!tr && <span className="ae-tag">{i === 0 ? '“显象”' : '“实在”'}</span>}
              </li>
            ))}
          </ol>
          {tr && <span className="ae-tag ae-tag--all">以上全部：显象</span>}
          <button type="button" className="ae-deeper" onClick={() => save({ depth: depth + 1 })} disabled={depth >= LEVELS.length - 1}>
            {depth >= LEVELS.length - 1 ? '再深入仍是显象' : '科学再深入一步 ↓'}
          </button>
        </div>
        {tr && (
          <div className="ae-blank" aria-label="物自身：本图不画任何东西">
            <p className="ae-blank-k">物自身</p>
            <p>不在空间和时间中。这里故意留白：任何画出来的东西都会在空间中，也就仍是显象。</p>
          </div>
        )}
      </div>

      <div className="ae-explain" aria-live="polite">
        {tr ? (
          <p>
            <b>先验的区分。</b>水滴、光线以及一切在空间和时间中的东西都是显象；物自身不在空间和时间中。科学走得再远，发现的仍是显象。这个区分由哲学对认识条件的反思作出。
          </p>
        ) : (
          <p>
            <b>经验的区分。</b>彩色的弧是“显象”，一群水滴是“实在”：两边都在空间和时间中，科学可以从一边走到另一边。这是日常知觉和科学研究作出的区分，<b>不是</b>康德说的先验区分。
          </p>
        )}
      </div>

      <fieldset className="ox-quiz ae-quiz">
        <legend className="md-fb-k">检验一下：原子和物理定律，在先验区分的哪一边？</legend>
        {ANS.map(([v, label]) => (
          <label key={v} className={'ox-opt' + (st.ans === v ? ' is-on' : '')}>
            <input type="radio" name="ae-ans" checked={st.ans === v} onChange={() => save({ ans: v })} />
            <span>{label}</span>
          </label>
        ))}
        {st.ans && (
          <p className="ox-fb" aria-live="polite">
            {FB[st.ans]}
          </p>
        )}
      </fieldset>

      <p className="ox-caution">
        <b>读图提醒。</b>图中把物自身放在框外，只表示它不在空间和时间中，不表示它是框外的“另一个地方”。显象和物自身是两类东西，还是同一些对象的两种考察方式，是一个开放的解释问题（见下文“几种主要解释”），本图不作判定。和有色眼镜、桌面图标一样，这张图也只帮你记住“认识有条件”，不能回答“物自身是什么”。
      </p>
      <button type="button" className="md-reset" onClick={() => save({ view: 'empirical', depth: 1, ans: undefined })}>
        重来一遍
      </button>
    </section>
  );
}
