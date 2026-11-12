import { Band, Claim, Limits, Pick, useSavedIx } from '../jw1/shared';

// 二 · after the table of responses to the liar and the paragraph under it
// (content/S11_SAMPLE_DRAFT.md). Two steps:
// 1. The reader tries to give L ("L 不是真的") a value: true, false, neither,
//    or both. The component walks through what the five premises then force,
//    so the reader sees where each assignment breaks.
// 2. The reader picks a response (Tarski, Kripke, paracomplete, dialetheism,
//    "not a statement"); the component shows which premise it gives up, what
//    it says L is, and what it costs. The five premises, the responses and
//    their costs restate the chapter's reconstruction and table, which sit
//    above the anchor (SEP "Liar Paradox", manuscript note 4). The Arabic
//    tradition (Ṭūsī, Dawānī) comes after the component, so it is not named
//    here. No response is declared right: every one is shown with its cost.

const ID = 'liar-responses';

const PREMISES: { n: number; text: string }[] = [
  { n: 1, text: '自我指涉：存在一个句子 L，它说的恰好是"L 不是真的"。' },
  { n: 2, text: '真之图式："A 是真的"当且仅当 A。' },
  { n: 3, text: '排中：L 是真的，或者 L 不是真的。' },
  { n: 4, text: '经典的推理（例如分情况推理）。' },
  { n: 5, text: '爆炸：从一个矛盾，可以推出任何东西。' },
];

type V = 't' | 'f' | 'n' | 'b';
const VOPTS: readonly (readonly [V, string])[] = [
  ['t', '真'],
  ['f', '假'],
  ['n', '既不真也不假'],
  ['b', '既真又假'],
];
const WALK: Record<V, string> = {
  t: '如果 L 是真的，按照真之图式（前提 2），L 所说的成立，也就是"L 不是真的"。L 既是真的又不是真的：矛盾。',
  f: '如果 L 是假的，那么 L 不是真的；而这正是 L 所说的，所以按照真之图式，L 是真的。又是矛盾。',
  n: '如果 L 既不真也不假，那么 L 不是真的；而这正是 L 所说的，所以 L 似乎又是真的了。这就是"报复"：用"不是真的"表述的说谎者，把"空隙"的退路也堵上了，除非放弃或限制前提 2 或 3。',
  b: '如果 L 既真又假，这本身就是一个矛盾。只有在放弃爆炸（前提 5）的逻辑中，这个矛盾才不会"传染"到整个系统。',
};

type R = 'tarski' | 'kripke' | 'field' | 'priest' | 'notstmt';
const RESP: Record<R, { name: string; drops: number[]; what: string; cost: string }> = {
  tarski: {
    name: '塔斯基的层级',
    drops: [1, 2],
    what: 'L 在合格的语言中根本不能被构造："真"只能在更高一层的元语言中谈论。',
    cost: '日常语言似乎确实有自己的"真"；而且一句平常的话是否成为悖论，可能取决于经验的事实。',
  },
  kripke: {
    name: '克里普克的"空隙"',
    drops: [3],
    what: 'L 没有真值：既不真也不假。',
    cost: '"L 不是真的"的报复：理论不能在它自己的语言中完全说出自己的结论。',
  },
  field: {
    name: '菲尔德等人的"次完全"理论',
    drops: [3],
    what: '不确定；在一般的推理中放弃排中。',
    cost: '需要一个新的"如果……那么"；同样难以在内部说出自己的解决。',
  },
  priest: {
    name: '普利斯特的双面真理论',
    drops: [5],
    what: 'L 既真又假，但矛盾不传染。',
    cost: '必须接受有些矛盾是真的；还要另外处理不用否定的"柯里悖论"。',
  },
  notstmt: {
    name: '"不是一个陈述"',
    drops: [1],
    what: 'L 看起来是句子，却不表达一个有真假的陈述：它没有表达任何东西。',
    cost: '必须说明为什么"这句话是用中文写的"这样自我指涉的句子却有真假。',
  },
};
const RORDER: R[] = ['tarski', 'kripke', 'field', 'priest', 'notstmt'];
const ROPTS: readonly (readonly [R, string])[] = RORDER.map((r) => [r, RESP[r].name] as const);

interface Saved {
  v: V | null;
  tried: V[];
  r: R | null;
}
const INIT: Saved = { v: null, tried: [], r: null };

export default function LiarResponses() {
  const [st, save] = useSavedIx<Saved>('S11', ID, INIT);
  const resp = st.r ? RESP[st.r] : null;

  return (
    <section className="md c3 c5" aria-labelledby="lr-title">
      <header className="md-head">
        <p className="md-tag">五个前提 · 几种回应</p>
        <h3 id="lr-title" className="md-title">"L 不是真的"：放弃哪一个前提？</h3>
        <p className="md-lede">先试着给 L 一个真值，看五个前提迫使你得出什么。再选一种回应，看它放弃了哪一个前提、要付出什么代价。组件不会告诉你哪一种回应是对的。</p>
      </header>

      <Band>一 · 给 L 一个真值</Band>
      <Pick
        label="给 L 指派一个真值"
        value={st.v}
        opts={VOPTS}
        onPick={(v) => save({ ...st, v, tried: st.tried.includes(v) ? st.tried : [...st.tried, v] })}
      />
      {st.v && (
        <div aria-live="polite">
          <p>{WALK[st.v]}</p>
          {st.tried.length === 4 ? (
            <p className="md-muted">四种指派你都试过了：在五个前提都保留的情况下，没有一种是一致的。所以至少要放弃一个前提。</p>
          ) : (
            <p className="md-muted">你已经试过 {st.tried.length} 种指派。也试试其他几种。</p>
          )}
        </div>
      )}

      <Band>二 · 选一种回应</Band>
      <Pick label="选择一种回应" value={st.r} opts={ROPTS} onPick={(r) => save({ ...st, r })} />
      {resp && (
        <div aria-live="polite">
          <ol className="v21-steps" aria-label="五个前提">
            {PREMISES.map((p) => {
              const dropped = resp.drops.includes(p.n);
              return (
                <li key={p.n} className="v21-step">
                  <span className="v21-n" aria-hidden="true">
                    {p.n}
                  </span>
                  <span>
                    {dropped ? <s>{p.text}</s> : p.text}
                    <span className="md-muted">{dropped ? '　放弃或限制' : '　保留'}</span>
                  </span>
                </li>
              );
            })}
          </ol>
          <p>
            <b>L 是什么：</b>
            {resp.what}
          </p>
          <Claim b="scholar">代价：{resp.cost}</Claim>
          <p className="md-muted">每一种回应都引入了新的概念，而这些概念往往可以被用来构造一个新的说谎者：这就是上文说的"报复"，所有回应都要面对它。</p>
        </div>
      )}

      <Limits>
        <p>
          <b>五个前提、几种回应和它们的代价，复述本章第二部分的重建和表格。</b>
          依据 SEP 的"说谎者悖论"条目（本章注 4）。删除线表示该回应放弃或限制的前提；塔斯基的层级同时限制了前提 1 和前提 2 的普遍形式。组件不评分，也不判定哪一种回应正确。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
