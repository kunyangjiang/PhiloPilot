import { Band, Claim, Level, Limits, OrigSrc, Seg, Step, useSavedIx } from './shared';

// 六 · after the three-generations list ("这是一个循环的理论").
// 1. Step through the three generations: group feeling and power, in words.
// 2. Two outcomes: how the ʿaṣabiyya explanation handles each, and why that
//    raises the question whether it can be tested.
// 3. What would make it testable? Views, no verdict.
// The Arabic and translation are the chapter's own (Quatremère 1858, vol. 1,
// p. 252, note 57); the generations follow the chapter's paraphrase (note 59).

const ID = 'cohesion-model';

const GEN = [
  { t: '第一代', life: '来自沙漠或乡村，生活艰苦，勇敢', a: 3, aw: '强', p: '征服城市，建立王朝：群体感趋向它的"目的"，王权' },
  { t: '第二代', life: '在城市中享受权力和奢华', a: 2, aw: '开始减弱', p: '统治者独揽权力，排斥原来的伙伴，依靠雇佣的军队' },
  { t: '第三代', life: '忘记了沙漠的生活，习惯了奢华', a: 1, aw: '几乎失去', p: '王朝软弱，最后被另一个有强大群体感的群体征服' },
];

type Out = 'fell' | 'held';
type Test = 'measure' | 'trend' | 'none';

interface Saved {
  g: number;
  out: Out | null;
  test: Test | null;
}
const INIT: Saved = { g: 0, out: null, test: null };

export default function CohesionModel() {
  const [st, save] = useSavedIx<Saved>('IA3', ID, INIT);
  const set = (x: Partial<Saved>) => save({ ...st, ...x });
  const g = Math.min(Math.max(st.g ?? 0, 0), GEN.length - 1);
  const cur = GEN[g];

  return (
    <section className="md c3 c5" aria-labelledby="cm-title">
      <header className="md-head">
        <p className="md-tag">群体感 · 模型</p>
        <h3 id="cm-title" className="md-title">
          三代人，一百二十年：这是一个规律吗？
        </h3>
        <p className="md-lede">一步一步走过伊本·赫勒敦描述的三代人，再看这个解释怎样对待两种不同的结果。模型只是转述，不是史料。</p>
      </header>

      <OrigSrc
        src="伊本·赫勒敦《历史绪论》第二卷，Quatremère 本第 1 册第 252 页"
        lang="ar"
        orig="وهذا التغلب هو الملك، وهو أمر زائد على الرئاسة؛ لأن الرئاسة إنما هي سؤدد، وصاحبها متبوع، وليس له عليهم قهر في أحكامه، وأما الملك فهو التغلب والحكم بالقهر"
        zh="而这种制胜就是王权。它是一种超出首领地位的东西；因为首领地位只是一种尊荣，首领的人是被追随的，在他的决定中，他对他们没有强制；而王权则是制胜，是以强制来统治。"
      />

      <Band>一 · 三代人</Band>
      <div className="v22-btns" role="group" aria-label="选择一代">
        {GEN.map((x, i) => (
          <button key={x.t} type="button" className="v22-btn" aria-pressed={i === g} onClick={() => set({ g: i })}>
            {x.t}
          </button>
        ))}
      </div>
      <div className="v21-aware" aria-live="polite">
        <p>
          <b>{cur.t}：</b>
          {cur.life}
        </p>
        <Level label="群体感" n={cur.a} max={3} word={cur.aw} />
        <p>{cur.p}</p>
      </div>
      <ol className="v21-steps">
        {GEN.map((x, i) => (
          <Step key={x.t} n={i + 1} on={i === g}>
            {x.t}：群体感{x.aw}
          </Step>
        ))}
      </ol>
      <Claim b="common" who="据通行的介绍">
        一个王朝通常延续三代人，大约一百二十年。本章根据扫描本文字层和通行的介绍作转述，没有逐字核对页面图像。
      </Claim>

      <Band>二 · 两种结果</Band>
      <Seg
        name="cm-out"
        label="设想某个王朝到了第三代"
        value={st.out}
        col
        opts={[
          ['fell', '它被一个沙漠的群体征服了'],
          ['held', '它又延续了一百年'],
        ]}
        onPick={(v) => set({ out: v })}
      />
      {st.out && (
        <div aria-live="polite">
          <Claim b="course" who="群体感的解释">
            {st.out === 'fell' ? '它的群体感已经衰弱，征服者的群体感更强。' : '它的群体感比看上去的强，或者它找到了别的支持（例如宗教，伊本·赫勒敦认为宗教可以加强群体感）。'}
          </Claim>
          <p className="md-muted">
            两种结果都能被"解释"。如果群体感只能从成败中推出来，"群体感强所以成功"就有循环的危险：这是"后世批判与回应"第四节讨论的问题。
          </p>
        </div>
      )}

      <Band>三 · 怎样才能检验它？</Band>
      <Seg
        name="cm-test"
        label="你的看法"
        value={st.test}
        col
        opts={[
          ['measure', '需要一种独立于成败的方法来衡量群体感'],
          ['trend', '把它当作一般趋势，而不是严格的规律'],
          ['none', '它本来就不是要被检验的科学假说'],
        ]}
        onPick={(v) => set({ test: v })}
      />
      {st.test && (
        <p className="md-feedback" aria-live="polite">
          {st.test === 'measure' && '长处：保留了概念的价值，又提出了检验的要求。代价：伊本·赫勒敦本人没有提供这样的方法。'}
          {st.test === 'trend' && '长处：符合"王朝像个人一样有自然的寿命"的说法。代价：一般趋势的解释力，比严格规律弱得多。'}
          {st.test === 'none' && '长处：它提醒我们，"文明之学"的目的是判断历史报道是否可信。代价：伊本·赫勒敦确实想说明王朝兴衰的"本性"。'}
        </p>
      )}

      <Limits>
        <p>
          <b>这个模型不是史料，也不是统计。</b>"三代"、"一百二十年"是伊本·赫勒敦的一般说法；横条只是把文字中的"强、减弱、失去"画出来，不代表任何测量。他是不是"社会学的发明者"，见下文。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
