import { Band, Claim, Limits, Seg, Src, Tag, useSavedIn, type Basis } from '../in2/shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import '../cn5/cn5.css';
import '../cn7/cn7.css';
import '../in2/ip.css';

// 五 · after Ratnakīrti's position (the paragraph 也就是说，听到"牛"这个词时).
// 1. What does a word mean? Four answers, and why apoha is not plain negation.
// 2. Cases (cow, blue, the fever plants, a child's first cow) under four positions;
//    where the chapter says nothing, the cell says so.
// 3. The circularity objection (debate two of part six) step by step, with its
//    replies and its measure. Everything from 五、, 六、 and notes 56–88.

const ID = 'apoha-explorer';

type Mean = 'neg' | 'univ' | 'double' | 'qualified';
const MEANS: [Mean, string][] = [
  ['neg', '"不是牛"'],
  ['univ', '一个正面的、真实的"牛性"'],
  ['double', '"不是非牛"：把一切不是牛的东西排除掉'],
  ['qualified', '一个被"排除非牛"所限定的正面形象'],
];
const MEAN_FB: Record<Mean, { ok: boolean; b: Basis; who: string; t: string }> = {
  neg: { ok: false, b: 'course', who: '', t: '这是对遮诠最常见的误解。遮诠不是说"牛"的意思是"不是牛"，而是一种双重否定：排除一切不是牛的东西。' },
  univ: { ok: false, b: 'scholar', who: '正理—胜论', t: '这是对手的立场：许多东西都叫"牛"，因为它们都有同一个真实的共相"牛性"。佛教不承认这样的东西。' },
  double: { ok: true, b: 'scholar', who: '陈那，据 SEP', t: '陈那：一个词谈论事物，只是就它们被"对其他东西的否定"所限定而言。双重否定看起来像一个共相，能把所有的牛归在一起，却不需要承认一个真实的共相。' },
  qualified: { ok: true, b: 'text', who: '宝称《遮诠成就论》', t: '宝称（十一世纪）：既不只是肯定，也不只是排除；语词的意义是被"对他者的排除"所限定的肯定。这是几百年争论之后佛教一方的立场。' },
};

type Who = 'nv' | 'dig' | 'dk' | 'rk';
const WHO: [Who, string][] = [
  ['nv', '正理—胜论'],
  ['dig', '陈那'],
  ['dk', '法称'],
  ['rk', '宝称'],
];
interface Cell {
  b: Basis;
  t: string;
}
const NONE: Cell = { b: 'course', t: '本章没有读到这一方对这个例子的说法。' };
const CASES: { id: string; q: string; a: Record<Who, Cell> }[] = [
  {
    id: 'cow',
    q: '为什么许多东西都叫"牛"？',
    a: {
      nv: { b: 'course', t: '因为它们都有同一个真实的共相"牛性"，共相通过内属关系在个别事物之中。（本章争论六的重建）' },
      dig: { b: 'scholar', t: '因为它们都被"对非牛的否定"所限定；不需要一个真实的"牛性"。（据 SEP）' },
      dk: { b: 'course', t: '因为它们都能引起同样的判断"这是牛"，都不同于非牛。（本章争论六的重建）' },
      rk: { b: 'text', t: '听到"牛"时，心中出现一个正面的形象，这个形象被"排除非牛"所限定。' },
    },
  },
  {
    id: 'blue',
    q: '许多不同的东西都是"蓝的"，靠什么？',
    a: {
      nv: { b: 'course', t: '靠一个真实的、可以被看见的共相。（本章的概括）' },
      dig: NONE,
      dk: { b: 'scholar', t: '许多蓝色的东西在心中引起相似的知觉形象，这些形象又引起同一个判断"这是蓝的"。它们归为一类，是因为效果相同，不是因为有共同的本质。（SEP 条目作者的读法）' },
      rk: NONE,
    },
  },
  {
    id: 'fever',
    q: '许多不同的植物都能退烧，它们有什么共同之处？',
    a: {
      nv: NONE,
      dig: NONE,
      dk: { b: 'scholar', t: '法称自己的例子：我们指不出它们有什么共同的特征来解释这一点；它们只是有相同的效果。（据 SEP）' },
      rk: NONE,
    },
  },
  {
    id: 'child',
    q: '第一次看见牛的孩子，怎么能看见"牛"？',
    a: {
      nv: { b: 'scholar', t: '先有一个无概念的知觉把握了"牛性"，然后才有"这是一头牛"的有概念的知觉。（据 SEP）' },
      dig: { b: 'course', t: '知觉是离开概念的；一旦认出"这是一头牛"，就已经是概念构造了。所以"牛性"不可能被知觉把握。（本章争论一的概括）' },
      dk: NONE,
      rk: NONE,
    },
  },
];

const CIRC: string[] = ['佛教说：理解"蓝"，就是理解"非非蓝"。', '任何否定，都以理解被否定的东西为前提：要理解"非 X"，先要理解 X。', '所以，要理解"非非蓝"，先要理解"非蓝"；要理解"非蓝"，先要理解"蓝"。', '所以，理解"蓝"要以理解"蓝"为前提：这是循环。'];

interface Saved {
  mean: Mean | null;
  c: string;
  step: number;
  reply: boolean;
}
const INIT: Saved = { mean: null, c: 'cow', step: 0, reply: false };

export default function ApohaExplorer() {
  const [st, save] = useSavedIn<Saved>('IN3', ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const cs = CASES.find((c) => c.id === st.c) ?? CASES[0];
  const step = Math.max(0, Math.min(CIRC.length - 1, st.step));
  const fb = st.mean ? MEAN_FB[st.mean] : null;

  return (
    <section className="md c3 c5" aria-labelledby="ap-title">
      <header className="md-head">
        <p className="md-tag">遮诠 · 共相</p>
        <h3 id="ap-title" className="md-title">
          "牛"这个词指的是什么？
        </h3>
        <p className="md-lede">佛教不承认真实的共相，却要解释语言怎样谈论世界。先比较四种回答，看清遮诠为什么不是简单的否定；再用几个例子对照各方的说法；最后一步一步看正理派的循环批评和佛教一方的回答。</p>
      </header>

      <Band>一 · 一个词的意义</Band>
      <p className="md-fb-k">按佛教的遮诠论，"牛"这个词的意义是什么？</p>
      <Seg name="ap-mean" label={'"牛"这个词的意义'} col value={st.mean} opts={MEANS} onPick={(v) => set({ mean: v })} />
      {fb && (
        <div aria-live="polite">
          <p className="md-feedback">
            <span className={'c5-verdict ' + (fb.ok ? 'c5-verdict--ok' : 'c5-verdict--no')}>{fb.ok ? '是佛教一方的一种说法' : '不是遮诠论'}</span>
            <Tag b={fb.b} who={fb.who || undefined} />
            {fb.t}
          </p>
          {fb.ok && <p className="md-muted">两个选项都是佛教一方的说法，分属不同的阶段：陈那的双重否定在先，宝称的"被排除所限定的肯定"在后，后者可以看作对批评的一种回应。</p>}
        </div>
      )}
      <Src src="法称《量释论》1.40" lang="sa" orig="sarve bhāvāḥ svabhāvena sva-svabhāva-vyavasthiteḥ / svabhāva-parabhāvābhyāṃ yasmād vyāvṛtti-bhāginaḥ //" zh="一切事物，由于各自安住于自己的本性，所以从本性上就与（其他）同类和异类的东西相区别。" />
      <Src src="宝称《遮诠成就论》" lang="sa" orig="nāsmābhirapohaśabdena vidhireva kevalo 'bhipretaḥ / nāpyanyavyāvṛttimātraṃ, kintvanyāpohaviśiṣṭo vidhiḥ śabdānāmarthaḥ /" zh={'我们用"遮诠"这个词，所指的既不只是肯定，也不只是对他者的排除；语词的意义，是被"对他者的排除"所限定的肯定。'} />

      <Band>二 · 几个例子，四方的说法</Band>
      <Seg name="ap-case" label="选择一个例子" col value={cs.id} opts={CASES.map((c) => [c.id, c.q] as const)} onPick={(v) => set({ c: v })} />
      <div className="c5-rows" aria-live="polite">
        {WHO.map(([k, name]) => {
          const a = cs.a[k];
          return (
            <div key={k} className="c5-row">
              <p>
                <b>{name}</b> <Tag b={a === NONE ? 'course' : a.b} />
              </p>
              <p className={a === NONE ? 'md-muted' : undefined}>{a.t}</p>
            </div>
          );
        })}
      </div>
      <p className="md-muted">两种理论各有代价：正理—胜论要承认共相、内属等不能起作用的东西是真实的；法称要解释为什么没有共同本质的东西会有相同的效果。（本章的重建）</p>

      <Band>三 · 遮诠是循环的吗？</Band>
      <p className="md-muted">
        第六部分争论二。<Tag b="scholar" who="有文献的直接批评；本章依据二手文献" />
      </p>
      <ol className="c5-rows" style={{ paddingLeft: '1.4em' }}>
        {CIRC.slice(0, step + 1).map((t, i) => (
          <li key={i}>
            {t} <Tag b="course" />
          </li>
        ))}
      </ol>
      <div>
        <button type="button" className="md-disclose" disabled={step === 0} onClick={() => set({ step: step - 1 })}>
          上一步
        </button>{' '}
        <button type="button" className="md-disclose" disabled={step === CIRC.length - 1} onClick={() => set({ step: step + 1 })}>
          {step === CIRC.length - 1 ? '四步已完' : '下一步'}
        </button>
      </div>
      {step === CIRC.length - 1 && (
        <>
          <Claim b="scholar" who="SEP">非佛教的批评者，例如鸠摩利罗和乌底耶塔迦罗，对遮诠论的通常批评就是循环。</Claim>
          <Claim b="text" who="寂护《真理纲要》943—944，本章转述">第 943 颂：如果要排除的是"非牛"，"非牛"必须先已成立，它的内容就是对"牛"的否定，所以首先要说出的是"牛"。第 944 颂：如果"牛"就是"非牛"的排除，就出现了"相互依赖"（anyonyasaṃśraya）。这两颂在寂护书中是作为对方的反驳出现的。</Claim>
          <button type="button" className="md-disclose" aria-expanded={st.reply} onClick={() => set({ reply: !st.reply })}>
            {st.reply ? '收起回答' : '佛教一方怎样回答？'}
          </button>
          {st.reply && (
            <div className="c5-row" aria-live="polite">
              <Claim b="scholar" who="法称，据 SEP 对 Hugon 2011 的概括">"你也一样"：任何一个词都既有它适用的东西，也有它排除的东西。正理派说"牛"指正面的"牛性"，但他们同样要知道"牛"不适用于马；如果遮诠论是循环的，正理派的理论也一样。</Claim>
              <Claim b="scholar" who="SEP 条目作者">这个回答不完全令人满意：即使一个词同时呈现两类东西，也很难看出为什么被排除的一类应该占有优先的地位。</Claim>
              <Claim b="course">宝称的"被排除所限定的肯定"，可以看作对这个困难的一种回应：它承认语词首先呈现一个正面的形象。</Claim>
            </div>
          )}
        </>
      )}

      <Limits>
        <p>寂护的电子本是逐词切分的分析本，所以这里只转述第 943—944 颂的内容，不引原文；它们是否逐字录自鸠摩利罗，本课没有核对。乌底耶塔迦罗的原文本课没有读。陈那的《观总相论》和法称的退烧植物，都据百科条目。</p>
        <p>陈那和法称最终一般被认为是唯识的观念论者；这里只用他们在暂时承认外在对象的前提下建立的理论。唯识和中观属于课程《中观与瑜伽行》。</p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
