import { Band, Claim, Limits, OrigSrc, Pick, Step, useSavedIx } from '../jw1/shared';

// 三 · after the table of criticisms and the note under it.
// 1. Proslogion 2, the chapter's checked passage (PL 158, cols 227–228, note 19).
// 2. The eight-step reconstruction (the chapter's, after SEP, note 20); pick a
//    criticism and see which step it presses (the chapter's table).
// 3. The island: Gaunilo's parallel argument and the reading of Anselm's
//    reply given in the SEP entry (notes 21–22). No verdict.

const ID = 'anselm-lab';

const STEPS = [
  '定义。神是"一个不能设想有比它更大的东西"（G）。',
  '理解。愚人听到"G"这个词时，理解它的意思。',
  '在理智中。凡是被理解的，都"在理智之中"；所以 G 在愚人的理智之中。',
  '假设。假设 G 只在理智之中，不在实在之中。',
  '可设想。那么，可以设想 G 也在实在之中。',
  '更大。在实在之中也存在的东西，比只在理智中存在的东西更大。',
  '矛盾。所以，可以设想有比 G 更大的东西——与 G 的定义矛盾。',
  '结论。第 4 步的假设是错的：G 既在理智之中，也在实在之中。',
];

type Crit = 'island' | 'grasp' | 'aquinas' | 'kant';
const CRIT: Record<Crit, { t: string; steps: number[]; where: string; point: string; b: 'text' | 'scholar' | 'common' }> = {
  island: {
    t: '高尼罗："岛"',
    steps: [],
    where: '论证的形式（不指出哪一步错）',
    point: '同样的形式会证明荒谬的结论：一个"不能设想有比它更大的岛"必须在实在中存在。',
    b: 'scholar',
  },
  grasp: {
    t: '高尼罗：理解不等于"在理智中"',
    steps: [2, 3],
    where: '第 2、3 步',
    point: '愚人未必真的理解 G；理解一个词，不等于有它的对象在理智之中。',
    b: 'scholar',
  },
  aquinas: {
    t: '阿奎那',
    steps: [2],
    where: '第 2 步',
    point: '我们不知道神的本质，所以"神存在"虽然本身是自明的，对我们却不是自明的。',
    b: 'scholar',
  },
  kant: {
    t: '康德',
    steps: [6],
    where: '第 6 步',
    point: '存在不是一个"实在的谓词"；说一个东西存在，并没有给它的概念增加任何东西，所以不能使它"更大"。',
    b: 'scholar',
  },
};

interface Saved {
  crit: Crit | null;
  isle: 'same' | 'diff' | null;
}
const INIT: Saved = { crit: null, isle: null };

export default function AnselmLab() {
  const [st, save] = useSavedIx<Saved>('EA1', ID, INIT);
  const set = (x: Partial<Saved>) => save({ ...st, ...x });
  const c = st.crit ? CRIT[st.crit] : null;

  return (
    <section className="md c3 c5" aria-labelledby="al-title">
      <header className="md-head">
        <p className="md-tag">安瑟伦 · 论证实验室</p>
        <h3 id="al-title" className="md-title">
          每一种批评，打在哪一步上？
        </h3>
        <p className="md-lede">先读原文，再选一种批评，看它针对八步重建中的哪一步；最后看高尼罗的"岛"和安瑟伦可能的回答。学习这个论证，不是为了记住"它被驳倒了"。</p>
      </header>

      <Band>一 · 原文</Band>
      <OrigSrc
        src="安瑟伦《宣讲》第二章，《拉丁教父集》第 158 卷，第 227—228 栏"
        lang="la"
        orig="Et certe id, quo majus cogitari nequit, non potest esse in intellectu solo. Si enim vel in solo intellectu est, potest cogitari esse et in re: quod majus est."
        zh="而那个不能设想有比它更大的东西，确实不能只在理智之中。因为如果它只在理智之中，就可以设想它也在实在之中——那是更大的。"
      />

      <Band>二 · 选一种批评</Band>
      <Pick label="选择一种批评" value={st.crit} opts={(Object.keys(CRIT) as Crit[]).map((k) => [k, CRIT[k].t] as const)} onPick={(v) => set({ crit: v })} />
      <ol className="v21-steps" aria-label="安瑟伦论证的八步重建（本章的重建）">
        {STEPS.map((s, i) => (
          <Step key={i} n={i + 1} on={!!c && c.steps.includes(i + 1)}>
            {s}
            {c && c.steps.includes(i + 1) && <b>　← {c.t}</b>}
          </Step>
        ))}
      </ol>
      {c && (
        <div aria-live="polite">
          <Claim b={c.b} who={c.t + ' · 针对' + c.where}>
            {c.point}
          </Claim>
          {st.crit === 'island' && <p className="md-muted">"岛"不需要指出哪一步错了：它只要表明同样的形式会得出荒谬的结论。所以上面的步骤没有一步被标出。</p>}
        </div>
      )}

      <Band>三 · "最大可设想的岛"和 G 是同一种概念吗？</Band>
      <Pick
        label="最大可设想的岛和 G 是同一种概念吗？"
        value={st.isle}
        opts={[
          ['same', '是：都是"某种东西中最大的"'],
          ['diff', '不是：G 是"绝对地"不能设想更大的'],
        ]}
        onPick={(v) => set({ isle: v })}
      />
      {st.isle && (
        <div aria-live="polite">
          <Claim b="course" who={st.isle === 'same' ? '如果你站在高尼罗一边' : '如果你站在安瑟伦一边'}>
            {st.isle === 'same'
              ? '那么"不能设想有比它更大"只是一个可以加在任何种类的东西上的修饰语，平行论证成立，原论证的形式就有问题。'
              : '那么岛作为一种有限的东西，无论怎样设想，总可以设想有更大的；"最大可设想的岛"这个概念本身可能就不融贯，平行论证不成立。'}
          </Claim>
          <Claim b="scholar" who="SEP 条目作者的解读">
            安瑟伦没有直接回应"岛"，是因为他拒绝了高尼罗对原论证的理解：原论证并不依赖"在实在中存在比只在理智中存在更大"这个一般原则；而正是这个一般原则，使"岛"的论证得以成立。
          </Claim>
          <p className="md-muted">是否接受这个回答，取决于我们是否同意 G 与"最大的岛"有这种根本的区别。这里不判胜负。</p>
        </div>
      )}

      <Limits>
        <p>
          <b>八步是本章的重建，不是安瑟伦的原文分段。</b>阿奎那和康德批评的是他们所理解的"本体论论证"，不一定针对安瑟伦原文的每一步；高尼罗的反驳和安瑟伦的回答，本课依据 SEP 条目的转述，没有核对原文。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
