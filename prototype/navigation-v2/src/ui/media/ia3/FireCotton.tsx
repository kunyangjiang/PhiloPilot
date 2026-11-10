import { Band, Claim, Limits, OrigSrc, Seg, useSavedIx, Verdict } from './shared';

// 三 · after "必然性与障碍" (before the Avicenna comparison table).
// 1. Sort the four claims the chapter separates: which does al-Ghazālī accept?
// 2. "At it" (ʿindahu) or "by it" (bihi): what does observation show?
// 3. Averroes' four replies, each pinned to the claim it presses, with the
//    reply open to al-Ghazālī's side. No verdict.
// The Arabic and its translations are the chapter's own (Tahāfut, Cairo 1302,
// p. 67, note 18; Bouyges 1930, pp. 519 and 522, notes 28–29); the rest
// paraphrases the chapter (SEP entries, notes 19–22, 30–31).

const ID = 'fire-cotton';

type Ans = 'yes' | 'no' | 'dep';
const CLAIMS: { k: string; t: string; a: Ans; s: string }[] = [
  { k: 'seen', t: '1. 观察到的伴随：火接触棉花时，棉花燃烧；这种情况一再出现。', a: 'yes', s: '接受。这是双方共同的出发点。' },
  { k: 'must', t: '2. 形而上学的必然性：火接触棉花时，棉花不可能不燃烧，连神也不能改变。', a: 'no', s: '否认。这是第十七问题的主要攻击对象。' },
  { k: 'god', t: '3. 神的创造：燃烧的真正行动者是神（或通过天使）。', a: 'dep', s: '看进路：第一种进路中主张；第二种进路中暂时承认火有本性，不再坚持这一点。' },
  { k: 'know', t: '4. 解释自然事件的能力：我们能预测、研究、解释自然中的规律。', a: 'yes', s: '接受。规律由神的"习惯"保证，人对它有可靠的知识。' },
];
const ANS: readonly (readonly [Ans, string])[] = [
  ['yes', '接受'],
  ['no', '否认'],
  ['dep', '看进路'],
];

type Prep = 'at' | 'by';
type Rep = 'soph' | 'intel' | 'def' | 'imp';
const REP: Record<Rep, { t: string; hits: string; a: string; g: string; open: string }> = {
  soph: {
    t: '否认原因是诡辩',
    hits: '第 1 项与第 2 项之间：阿威罗伊认为，我们感知到的就是起作用的原因，而不只是伴随。',
    a: '火烧棉花是直接感知到的；否认它，要么是言不由衷，要么是被一个巧妙的论证迷惑了。',
    g: '安萨里一方可以说：他并不否认感知到的东西，只否认感知能告诉我们"由于它"。说"你在诡辩"，没有回答"在它的时候"与"由于它"的区分。',
    open: '感知是否只给我们伴随，还是也给我们作用本身？',
  },
  intel: {
    t: '取消原因，就取消了理智',
    hits: '第 4 项：如果没有真正的原因，就没有通过原因的知识，也就没有证明。',
    a: '理智的知识就是通过原因的知识；证明就是从原因推出结果。按照安萨里的立场，连他自己的论证也不可能是证明。',
    g: '安萨里一方可以说：知识与预期由神的习惯和神在我们心中创造的知识保证；科学研究的是神的习惯，而不是受造物之间的必然联系。',
    open: '通过"习惯"认识规律，与通过原因认识事物，是同一种知识吗？',
  },
  def: {
    t: '燃烧属于"火"的定义',
    hits: '第 2 项：如果燃烧的能力是火的本性的一部分，"接触而不燃烧"就不能无矛盾地设想。',
    a: '只要火保持它的名称和定义，就不必否认火的燃烧能力；没有燃烧能力的东西，不是火。',
    g: '安萨里一方可以说：我们可以决定把什么叫作"火"；定义只规定语词，不能决定实际存在的东西之间的联系。',
    open: '本质与因果作用，哪一个在先？',
  },
  imp: {
    t: '自然的必然性是"没有障碍时"的必然性',
    hits: '第 2 项：安萨里描述的"必然性"，不是哲学家真正主张的必然性。',
    a: '火的本性是燃烧，但如果有别的东西阻碍，燃烧就不会发生；这只说明自然的结果依赖于多个原因。安萨里第二种进路中的奇迹，正说明燃烧依赖于事物的性质。',
    g: '安萨里一方可以说：第二种进路只是"暂时承认"，目的在于表明奇迹仍然可能；他要的就是这一点，至于受造物有没有本性，他可以让步。',
    open: '承认"障碍"之后，双方的分歧还剩下多少？',
  },
};

interface Saved {
  pick: Record<string, Ans>;
  prep: Prep | null;
  rep: Rep | null;
}
const INIT: Saved = { pick: {}, prep: null, rep: null };

export default function FireCotton() {
  const [st, save] = useSavedIx<Saved>('IA3', ID, INIT);
  const set = (x: Partial<Saved>) => save({ ...st, ...x });
  const pick = st.pick ?? {};
  const done = CLAIMS.every((c) => pick[c.k]);

  return (
    <section className="md c3 c5" aria-labelledby="fc-title">
      <header className="md-head">
        <p className="md-tag">火与棉花 · 辩论工作坊</p>
        <h3 id="fc-title" className="md-title">
          安萨里否认的是什么？阿威罗伊怎样回答？
        </h3>
        <p className="md-lede">先把常常混在一起的四件事分开，再看观察能证明什么，最后逐一检查阿威罗伊的四个回答各自针对哪一件事。这里不判胜负。</p>
      </header>

      <Band>一 · 四件事：安萨里接受哪些？</Band>
      <div className="v22-rows">
        {CLAIMS.map((c) => (
          <div key={c.k} className="v22-row">
            <p>{c.t}</p>
            <Seg name={'fc-' + c.k} label={c.t} value={pick[c.k] ?? null} opts={ANS} onPick={(v) => set({ pick: { ...pick, [c.k]: v } })} />
            {pick[c.k] && (
              <p className="md-feedback" aria-live="polite">
                <Verdict ok={pick[c.k] === c.a} yes="与本章的整理一致" no="与本章的整理不同" />
                {c.s}
              </p>
            )}
          </div>
        ))}
      </div>
      {done && <p className="md-muted">所以，"安萨里否认因果"不准确：他否认的是受造物之间的必然联系（第 2 项）。受造物之间有没有非必然的因果作用，学者有争论。</p>}

      <Band>二 · "在它的时候"，还是"由于它"？</Band>
      <OrigSrc
        src="安萨里《哲学家的矛盾》第十七问题，开罗 1302 年本，第 67 页"
        lang="ar"
        orig="فأما النار فهي جماد لا فعل لها ... وليس لهم دليل إلا مشاهدة حصول الاحتراق عند ملاقاة النار، والمشاهدة تدل على الحصول عنده ولا تدل على الحصول به"
        zh="至于火，它是无生命的东西，没有行为。……他们没有任何证据，只有观察到：在接触火的时候，燃烧发生了。而观察表明的，是［燃烧］在它的时候发生，并不表明［燃烧］由于它而发生。"
      />
      <Seg
        name="fc-prep"
        label="一千次观察到火接触棉花、棉花燃烧，按照安萨里，它表明了什么？"
        value={st.prep}
        col
        opts={[
          ['at', '燃烧在接触的时候发生（ʿindahu）'],
          ['by', '燃烧由于接触而发生（bihi）'],
        ]}
        onPick={(v) => set({ prep: v })}
      />
      {st.prep && (
        <p className="md-feedback" aria-live="polite">
          <Verdict ok={st.prep === 'at'} yes="这是安萨里的说法" no="这正是安萨里要否认的推论" />
          观察只告诉我们时间上的伴随；"由于它"是一个关于产生的主张，观察本身不能证明。双方争论的不是事实，而是模态：燃烧是必然的，还是只是实际上总是如此？
        </p>
      )}

      <Band>三 · 阿威罗伊的四个回答</Band>
      <Seg name="fc-rep" label="选择一个回答" value={st.rep} col opts={(Object.keys(REP) as Rep[]).map((k) => [k, REP[k].t] as const)} onPick={(v) => set({ rep: v })} />
      {st.rep === 'soph' && (
        <OrigSrc
          src="阿威罗伊《矛盾的矛盾》第十七问题，Bouyges 本第 519 页"
          lang="ar"
          orig="أما إنكار وجود الأسباب الفاعلة التي تشاهد في المحسوسات فقول سفسطائي"
          zh="至于否认在可感的事物中所观察到的那些起作用的原因的存在，这是一种诡辩的说法。"
        />
      )}
      {st.rep === 'intel' && (
        <OrigSrc
          src="阿威罗伊《矛盾的矛盾》第十七问题，Bouyges 本第 522 页"
          lang="ar"
          orig="والعقل ليس هو شيء أكثر من إدراكه الموجودات بأسبابها، وبه يفترق من سائر القوى المدركة، فمن رفع الأسباب فقد رفع العقل."
          zh="理智不是别的，就是它通过原因来把握存在的东西；正是由于这一点，它与其他的认识能力区别开来。所以，谁取消了原因，谁就取消了理智。"
        />
      )}
      {st.rep && (
        <div aria-live="polite">
          <Claim b="course" who="针对">
            {REP[st.rep].hits}
          </Claim>
          <Claim b={st.rep === 'soph' || st.rep === 'intel' ? 'text' : 'scholar'} who="阿威罗伊">
            {REP[st.rep].a}
          </Claim>
          <Claim b="course" who="安萨里一方可能的回答">
            {REP[st.rep].g}
          </Claim>
          <p className="md-muted">仍然开放的问题：{REP[st.rep].open}</p>
        </div>
      )}

      <Limits>
        <p>
          <b>这不是一场有裁判的比赛。</b>阿威罗伊的回答写在安萨里去世几十年以后，安萨里没有机会回答；"安萨里一方可能的回答"是本章的重建，不是安萨里的原话。第三、第四个回答依据 SEP 条目的转述，本章没有核对原文。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
