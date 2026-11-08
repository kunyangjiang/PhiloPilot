import type { KeyboardEvent } from 'react';
import { Gu, Limits, Seg, useSaved } from './shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn2/cn2.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import './cn5.css';

// 四 · after "比喻的限度" (the mirror). Two ways of reading 空、假、中 side
// by side: the 别教 reading (三观 one after another) that 《摩诃止观》
// explicitly sets aside, and the 圆教 reading (即空即假即中) it adopts. The
// drawing shows three separate boxes in a row for the first and one object
// seen through three facets at once for the second (三目一面). Each facet
// opens its step of the chapter's three-step argument. The mirror metaphor is
// shown with its limit. A short check closes the component; nothing is scored.

const ID = 'threefold-truth';
type Mode = 'seq' | 'round';
type Facet = 'kong' | 'jia' | 'zhong';
type Obj = 'nian' | 'sexiang';
interface Saved {
  mode: Mode;
  step: number;
  facet: Facet | null;
  obj: Obj;
  mirror: boolean;
  checks: Record<string, 'y' | 'n' | undefined>;
}
const INIT: Saved = { mode: 'seq', step: 0, facet: null, obj: 'nian', mirror: false, checks: {} };

const FACET: Record<Facet, { name: string; orig: string; zh: string; note: string }> = {
  kong: {
    name: '即空',
    orig: '云何即空。並從緣生。緣生即無主。無主即空。',
    zh: '为什么即空？因为都从因缘而生，从因缘而生就没有主宰，没有主宰就是空。',
    note: '和僧肇"待缘而後有，故知有非真有"是同一个思路。',
  },
  jia: {
    name: '即假',
    orig: '云何即假。無主而生即是假。',
    zh: '为什么即假？没有主宰却生起了，这就是假。',
    note: '和僧肇"起則非無"相近：它确实生起了，所以不是什么都没有。',
  },
  zhong: {
    name: '即中',
    orig: '云何即中。不出法性並皆即中。',
    zh: '为什么即中？都不超出法性，所以都是中。',
    note: '空和假不是两件事：同时肯定二者、又不偏于一边，就是中道。',
  },
};
const OBJ: Record<Obj, { name: string; line: string }> = {
  nian: { name: '一念心', line: '感官和对象相接时生起的一念心' },
  sexiang: { name: '一色一香', line: '"一色一香無非中道"：一种颜色、一缕香气' },
};
const SEQ = [
  { k: '空观', t: '从假入空：看破事物的实有' },
  { k: '假观', t: '从空入假：回到世间，看到事物作为假名存在' },
  { k: '中观', t: '把空和假统一起来' },
];
const CHECKS: { id: string; text: string; ans: 'y' | 'n'; why: string }[] = [
  { id: 'a', text: '先观空，再观假，最后观中：这就是天台最终要讲的。', ans: 'n', why: '这是"次第三观"。《摩诃止观》卷三说"此則次第分張非今所用也"：依次分开的讲法，不是圆顿止观要用的。' },
  { id: 'b', text: '悟到空，就同时悟到了假和中。', ans: 'y', why: '卷一："但以空為名。即具假中。悟空即悟假中。餘亦如是。"' },
  { id: 'c', text: '"中"是在空和假之外、作为它们基础的不变本体，就像镜子在影像之外。', ans: 'n', why: '这正是镜子比喻可能造成的误会。《摩诃止观》在比喻之后马上说"不合不散合散宛然"，把这种误会拿掉。' },
];

export default function ThreefoldTruth() {
  const [st, save] = useSaved<Saved>(ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const step = Math.max(0, Math.min(2, st.step));
  const f = st.facet ? FACET[st.facet] : null;
  const facetBtn = (k: Facet) => ({
    role: 'button' as const,
    tabIndex: 0,
    'aria-label': FACET[k].name,
    'aria-pressed': st.facet === k,
    onClick: () => set({ facet: k }),
    onKeyDown: (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        set({ facet: k });
      }
    },
  });

  return (
    <section className="md c3 c5" aria-labelledby="tt-title">
      <header className="md-head">
        <p className="md-tag">概念结构 · 两种读法</p>
        <h3 id="tt-title" className="md-title">
          空、假、中：三个阶段，还是一个当下的三面？
        </h3>
        <p className="md-lede">
          《摩诃止观》讨论了两种读法。"别教"的读法把空、假、中当作一个接一个的三步；"圆教"的读法说"雖三而一雖一而三"。切换两种读法，看图有什么不同；在圆教的读法中，点三个面中的任何一个，看智顗怎样论证。
        </p>
      </header>

      <Seg
        name="tt-mode"
        label="读法"
        value={st.mode}
        opts={[
          ['seq', '次第三观（别教的读法）'],
          ['round', '即空即假即中（圆教的读法）'],
        ]}
        onPick={(v) => set({ mode: v, facet: null })}
      />

      {st.mode === 'seq' ? (
        <div className="g4-panel">
          <svg className="c5-fig" viewBox="0 0 520 150" role="img" aria-label={`三个分开的方框，从左到右依次是空观、假观、中观；现在在第 ${step + 1} 步：${SEQ[step].k}`}>
            {SEQ.map((x, n) => (
              <g key={x.k}>
                <rect x={14 + n * 172} y={40} width={146} height={64} className={n === step ? 'c5-hot' : n < step ? 'c5-thick' : 'c5-thin'} />
                <text x={87 + n * 172} y={78} textAnchor="middle" className="c5-label">
                  {n + 1}　{x.k}
                </text>
                {n < 2 && <path d={`M${162 + n * 172},72 L${184 + n * 172},72`} className="c5-thin" markerEnd="url(#tt-arr)" />}
              </g>
            ))}
            <defs>
              <marker id="tt-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" className="c5-fill" />
              </marker>
            </defs>
            <text x={260} y={130} textAnchor="middle" className="c5-small">
              一步完成，再走下一步：三者"各各有異"
            </text>
          </svg>
          <div className="c4-actions">
            <button type="button" className="md-step" aria-label="上一步" disabled={step === 0} onClick={() => set({ step: step - 1 })}>
              ‹
            </button>
            <button type="button" className="md-step" aria-label="下一步" disabled={step === 2} onClick={() => set({ step: step + 1 })}>
              ›
            </button>
            <span aria-live="polite">
              第 {step + 1} 步：{SEQ[step].t}
            </span>
          </div>
          <div className="md-feedback">
            <p className="md-fb-k">《摩诃止观》怎样评价这种读法</p>
            <Gu src="《摩诃止观》卷三" orig="此則次第分張非今所用也。" zh="这是依次分开展示，不是现在要用的。" />
            <p>
              卷一说，把即空即假即中理解为"三種邐迤各各有異"（一个接一个、各不相同），是"此得別失圓"：得到了别教，失去了圆教。次第的三观不是错的，它是一种较深但仍有分别的教法；天台说它不是最终要讲的。
            </p>
          </div>
        </div>
      ) : (
        <div className="g4-panel">
          <Seg
            name="tt-obj"
            label="观照的对象"
            value={st.obj}
            opts={(Object.keys(OBJ) as Obj[]).map((k) => [k, OBJ[k].name] as const)}
            onPick={(v) => set({ obj: v })}
          />
          <svg className="c5-fig" viewBox="0 0 520 250" aria-label={`同一个对象（${OBJ[st.obj].name}）被三个面同时观照：即空、即假、即中。可以选择其中一个面。`}>
            <circle cx={260} cy={132} r={52} className="c5-paper" />
            <text x={260} y={128} textAnchor="middle" className="c5-label">
              {OBJ[st.obj].name}
            </text>
            <text x={260} y={148} textAnchor="middle" className="c5-small">
              同一个当下
            </text>
            {(
              [
                ['kong', 260, 36],
                ['jia', 100, 210],
                ['zhong', 420, 210],
              ] as [Facet, number, number][]
            ).map(([k, x, y]) => (
              <g key={k} {...facetBtn(k)}>
                <line x1={x} y1={y} x2={260 + (x - 260) * 0.36} y2={132 + (y - 132) * 0.4} className={st.facet === k ? 'c5-hot' : 'c5-thick'} />
                <rect x={x - 46} y={y - 20} width={92} height={40} className={st.facet === k ? 'c5-hot' : 'c5-paper'} style={{ fill: '#fff' }} />
                <text x={x} y={y + 5} textAnchor="middle" className="c5-label">
                  {FACET[k].name}
                </text>
              </g>
            ))}
          </svg>
          <div className="c5-chips" role="group" aria-label="选择一个面">
            {(Object.keys(FACET) as Facet[]).map((k) => (
              <button key={k} type="button" className={'c5-chip' + (st.facet === k ? ' is-on' : '')} aria-pressed={st.facet === k} onClick={() => set({ facet: k })}>
                {FACET[k].name}
              </button>
            ))}
          </div>
          <div className="md-feedback" aria-live="polite">
            {f ? (
              <>
                <p className="md-fb-k">
                  {f.name}：{OBJ[st.obj].line}
                </p>
                <Gu src="《摩诃止观》卷一" orig={f.orig} zh={f.zh} />
                <p>{f.note}</p>
                <p className="md-muted">三个面同时亮着：不是先看到空、再看到假。卷三的比喻是"摩醯首羅面上三目"：三只眼睛不是先后睁开的，而是同时在一张脸上，看的是同一个世界。</p>
              </>
            ) : (
              <p>选择一个面。三条线都连向同一个对象：圆教的读法里，三者"雖三而一雖一而三。不相妨礙"。</p>
            )}
          </div>
        </div>
      )}

      <p className="c3-layer-k">镜子的比喻和它的限度</p>
      <div className="c3-two">
        <div className="c2-card">
          <p className="g4-k">比喻说明了什么</p>
          <Gu src="《摩诃止观》卷一" orig="譬如明鏡。明喻即空。像喻即假。鏡喻即中。" zh="譬如一面明镜：镜子的明亮比喻即空，镜中的影像比喻即假，镜子本身比喻即中。" />
          <p>有镜子，就同时有明亮和影像：三者不是先后出现的。</p>
        </div>
        <div className="c2-card c3-card--limit">
          <p className="g4-k">比喻可能误导什么</p>
          {st.mirror ? (
            <>
              <p>镜子在影像之外，影像依赖镜子而镜子不依赖影像。把"中"理解为镜子，就容易把中道想象成一个在空和假之外、作为它们基础的不变本体。</p>
              <Gu src="《摩诃止观》卷一" orig="不合不散合散宛然。" zh="不合也不散，而合与散都清清楚楚。" />
              <p>所以比喻之后立刻用否定的语言，把可能引起误会的部分拿掉。</p>
            </>
          ) : (
            <button type="button" className="md-disclose" onClick={() => set({ mirror: true })}>
              看比喻的限度
            </button>
          )}
        </div>
      </div>

      <p className="c3-layer-k">检验一下</p>
      <div className="c5-rows">
        {CHECKS.map((c) => {
          const v = st.checks[c.id];
          return (
            <div key={c.id} className="c5-row">
              <p>{c.text}</p>
              <Seg
                name={`tt-${c.id}`}
                label="是否符合圆教的读法"
                value={v ?? null}
                opts={[
                  ['y', '符合圆教的读法'],
                  ['n', '不符合'],
                ]}
                onPick={(x) => set({ checks: { ...st.checks, [c.id]: x } })}
              />
              {v && (
                <p aria-live="polite">
                  <span className={'c5-verdict ' + (v === c.ans ? 'c5-verdict--ok' : 'c5-verdict--no')}>{v === c.ans ? '和本课的读法一致' : '本课的读法不同'}</span>
                  {c.why}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <Limits>
        <p>《摩诃止观》是智顗讲课的记录，由灌顶整理，并且没有讲完；哪些是智顗的原意、哪些是灌顶的加工，不能完全分清。这里说"智顗"，指的是这部书记录的思想。</p>
        <p>
          图只表示"同时并存而不相妨"的结构，不是修行的方法。天台一面说"無苦可捨""無道可修"，一面讲了十卷细密的修行方法；挖井见水的比喻也承认有深浅先后。三谛也不等于印度中观学的"二谛"：天台的读法是建设性的，这一点学者看法不一。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
