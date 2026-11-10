import { Band, Claim, Limits, Pick, Seg, useSavedIx, Verdict } from './shared';

// 三 · after Gersonides on creation ("这个立场在犹太传统中极少见").
// 1. The three views Maimonides lists in Guide II (note 19).
// 2. Place Saadia, Maimonides and Gersonides: which view, and do they hold
//    that reason can demonstrate it? (notes 5, 19, 22; SEP paraphrase)
// 3. Maimonides' conditional: if eternity were demonstrated (note 19).
// No passage is quoted: the chapter checked none of these texts in the original.

const ID = 'creation-eternity';

type View = 'moses' | 'plato' | 'arist';
const VIEWS: Record<View, { t: string; d: string }> = {
  moses: { t: '摩西的观点', d: '神从无中创造世界。' },
  plato: { t: '柏拉图的观点', d: '神从永恒的质料中造成世界。' },
  arist: { t: '亚里士多德的观点', d: '世界是永恒的。' },
};
const VOPTS = (Object.keys(VIEWS) as View[]).map((k) => [k, VIEWS[k].t] as const);

type Proof = 'yes' | 'no';
const WHO: { k: string; n: string; v: View; p: Proof; s: string }[] = [
  {
    k: 'saadia',
    n: '萨阿迪亚',
    v: 'moses',
    p: 'yes',
    s: '据 SEP 条目的转述，他给出四个证明世界"有开端"的论证（来自有限、组合、偶性和时间），再论证创造是"从无中"的。这些论证来自凯拉姆的传统。',
  },
  {
    k: 'maimonides',
    n: '迈蒙尼德',
    v: 'moses',
    p: 'no',
    s: '他认为双方都没有证明：永恒论从现在的自然推到世界的起源，是不合法的推论；凯拉姆的创世论证也没有达到证明的标准。创世只是"比永恒更可取"。',
  },
  {
    k: 'gersonides',
    n: '格森尼德',
    v: 'plato',
    p: 'yes',
    s: '据 SEP 条目，他的立场是"明确的柏拉图式"：世界由一个自由意志的施动者从永恒的、无形式的质料中造成；他在《主的战争》第六卷论证，这可以被理性证明。',
  },
];

interface Saved {
  v: Record<string, View>;
  p: Record<string, Proof>;
  ifp: 'keep' | 'fig' | null;
}
const INIT: Saved = { v: {}, p: {}, ifp: null };

export default function CreationEternity() {
  const [st, save] = useSavedIx<Saved>('JW1', ID, INIT);
  const set = (x: Partial<Saved>) => save({ ...st, ...x });
  const v = st.v ?? {};
  const p = st.p ?? {};

  return (
    <section className="md c3 c5" aria-labelledby="ce-title">
      <header className="md-head">
        <p className="md-tag">创世还是永恒 · 立场工作坊</p>
        <h3 id="ce-title" className="md-title">
          三位哲学家，三种答案，两种对理性的信心
        </h3>
        <p className="md-lede">问题有两层：世界从哪里来？理性能不能证明这一点？把萨阿迪亚、迈蒙尼德和格森尼德分别放到两层之中。</p>
      </header>

      <Band>一 · 迈蒙尼德列举的三种观点</Band>
      <dl className="v23-dl">
        {(Object.keys(VIEWS) as View[]).map((k) => (
          <div key={k} style={{ display: 'contents' }}>
            <dt>{VIEWS[k].t}</dt>
            <dd>{VIEWS[k].d}</dd>
          </div>
        ))}
      </dl>

      <Band>二 · 每一位持哪一种观点？认为它能被证明吗？</Band>
      <div className="v22-rows">
        {WHO.map((w) => {
          const both = v[w.k] && p[w.k];
          return (
            <div key={w.k} className="v22-row">
              <p>
                <b>{w.n}</b>
              </p>
              <Seg name={'ce-v-' + w.k} label={w.n + '持哪一种观点'} value={v[w.k] ?? null} opts={VOPTS} onPick={(x) => set({ v: { ...v, [w.k]: x } })} />
              <Seg
                name={'ce-p-' + w.k}
                label={w.n + '认为理性能证明它吗'}
                value={p[w.k] ?? null}
                opts={[
                  ['yes', '能被理性证明'],
                  ['no', '不能证明'],
                ]}
                onPick={(x) => set({ p: { ...p, [w.k]: x } })}
              />
              {both && (
                <p className="md-feedback" aria-live="polite">
                  <Verdict ok={v[w.k] === w.v && p[w.k] === w.p} yes="与本章的说明一致" no={v[w.k] === w.v ? '观点对了，对证明的看法不同' : '观点与本章的说明不同'} />
                  {w.s}
                </p>
              )}
            </div>
          );
        })}
      </div>
      {WHO.every((w) => v[w.k] && p[w.k]) && (
        <p className="md-muted">
          所以，"反迈蒙尼德"不是一个统一的阵营：格森尼德不满的是迈蒙尼德<b>对理性太没有信心</b>。萨阿迪亚和迈蒙尼德在答案上一致，在"能否证明"上不一致；格森尼德在答案上离开了两人，在"能否证明"上却与萨阿迪亚站在一边。
        </p>
      )}

      <Band>三 · 如果永恒论被证明了呢？</Band>
      <Pick
        label="如果永恒论被证明了，迈蒙尼德会怎样？"
        value={st.ifp}
        opts={[
          ['keep', '仍然按字面坚持《创世记》'],
          ['fig', '用比喻的方式解释《创世记》'],
        ]}
        onPick={(x) => set({ ifp: x })}
      />
      {st.ifp && (
        <div aria-live="polite">
          <p className="md-feedback">
            <Verdict ok={st.ifp === 'fig'} yes="这是迈蒙尼德自己的说法" no="迈蒙尼德说的不是这样" />
            他说，他会像解释神的身体一样，用比喻的方式解释《创世记》；圣经并没有阻止他这样做。
          </p>
          <Claim b="scholar" who="SEP 条目">
            阻止他的，是永恒论没有被证明，而且它会摧毁律法的基础：一个没有自由意志的神，怎么会颁布诫命？
          </Claim>
        </div>
      )}

      <Limits>
        <p>
          <b>这里没有原文。</b>三位哲学家关于创世的论证，本章都依据 SEP 条目的转述，没有核对萨阿迪亚、《迷途指津》第二部分或《主的战争》第六卷的原文。"能被理性证明"指的是他们自己的看法，不是本课的判断。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
