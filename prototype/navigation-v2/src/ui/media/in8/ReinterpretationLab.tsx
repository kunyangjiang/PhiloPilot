import { Band, Claim, Limits, Seg, useSavedIx, Verdict } from '../ia1/shared';

// 七 · after "本章建议用四个问题来检验一种重新解释" and its list (想一想（七）
// follows). Pick one modern reinterpretation, answer the four questions
// (text, concept, function, stance), compare with the chapter's reading and
// with a competing reading. The chapter's judgements are its own reconstruction
// (七, 结语 and Critiques 五); nothing here grades the thinkers.

const ID = 'reinterpretation-lab';
type Case = 'ambedkar' | 'gandhi' | 'aurobindo' | 'iqbal' | 'radha';
type Q = 'text' | 'concept' | 'func' | 'stance';
type A = 'keep' | 'change';

const QS: { k: Q; t: string; keep: string; change: string }[] = [
  { k: 'text', t: '文本：它依据的文本是否真的说了它所说的话？', keep: '大体依据原典', change: '明显偏离或选择性使用' },
  { k: 'concept', t: '概念：关键概念是否保持了原来的意思？', keep: '基本保持', change: '有重大改变' },
  { k: 'func', t: '功能：这个思想在新的解释中起的作用是否与原来相同？', keep: '相同或相近', change: '起了新的作用' },
  { k: 'stance', t: '立场：解释者是否承认自己在重新解释？', keep: '承认', change: '自称只是恢复原意' },
];

const CASES: Record<Case, { t: string; what: string; ans: Record<Q, A>; why: Record<Q, string>; alt: string }> = {
  ambedkar: {
    t: '安贝德卡尔的佛教',
    what: '《佛陀与他的正法》：质疑出家的传统故事和四圣谛的地位，把苦主要理解为社会的苦，强调正法是平等与慈的社会伦理。',
    ans: { text: 'change', concept: 'change', func: 'change', stance: 'keep' },
    why: {
      text: '他质疑出家的故事和四圣谛的地位，偏离了巴利文经典。',
      concept: '"苦"从一切存在的特征，变成主要是可以通过社会改革消除的苦。',
      func: '佛教从个人解脱的道路，变成社会解放的运动。',
      stance: '他明确说要用理性检验佛陀的话，并不讳言自己在重新解释。',
    },
    alt: '传统的佛教学者会说：一种不以四圣谛为核心的"佛教"，已经不是佛教的重新解释，而是另一种学说。本章的判断（"不忠实，但诚实"）不回答这个问题。',
  },
  gandhi: {
    t: '甘地的"不伤害"',
    what: '把耆那教和佛教中个人修行的戒律"不伤害"，扩展为政治行动的原则"坚持真理"。',
    ans: { text: 'change', concept: 'keep', func: 'change', stance: 'keep' },
    why: {
      text: '他依据的主要不是某一部经典的字句，而是他自己对《薄伽梵歌》等文本的读法和他的实践经验。',
      concept: '"不伤害"仍然是不把痛苦加在别人身上；但甘地加上了"自己受苦"和"勇者的美德"。',
      func: '从个人的戒律，变成了一个民族争取自治的方法。',
      stance: '甘地常说自己在"实验"真理，承认自己的解释是个人的。',
    },
    alt: '有人认为"不伤害"在甘地那里的变化很大（加入了"自己受苦"），所以概念一栏应当选"改变"；本章的选择只是一种读法。',
  },
  aurobindo: {
    t: '奥罗宾多的吠檀多',
    what: '《神圣人生》：把"有—识—喜"与"进化"结合起来，认为世界是神圣意识的显现，心智之上还有"超心智"。',
    ans: { text: 'change', concept: 'change', func: 'change', stance: 'keep' },
    why: {
      text: '他使用奥义书的术语，但"进化"的框架在原典中没有。',
      concept: '"梵"不再与"幻"的世界相对；世界是真实的，是意识的显现，与商羯罗的不二论明确不同。',
      func: '从解脱的形而上学，变成一种人类和地上生命转化的理论。',
      stance: '他把自己的哲学看作新的综合，而不是对商羯罗的注释。',
    },
    alt: '奥罗宾多的追随者会说，他恢复的是吠陀和奥义书中被商羯罗遮蔽的"肯定世界"的一面；按这种读法，文本一栏可以选"大体依据原典"。',
  },
  iqbal: {
    t: '伊克巴尔的伊智提哈德',
    what: '《伊斯兰宗教思想的重建》：伊智提哈德是"伊斯兰结构中的运动原则"；"伊智提哈德之门已经关闭"完全是虚构。',
    ans: { text: 'keep', concept: 'change', func: 'change', stance: 'keep' },
    why: {
      text: '伊智提哈德是伊斯兰法学中固有的概念，他引用的是法学传统内部的资源。',
      concept: '从法学家对具体法律问题的独立推理，扩大为整个宗教思想更新的原则。',
      func: '从法学方法，变成一个宗教传统面对近代知识的"运动原则"。',
      stance: '书名就叫"重建"；他在序言中说，哲学思考中没有终极。',
    },
    alt: '传统的法学家会说，伊智提哈德有严格的资格和范围，伊克巴尔把它推广得太远；他的支持者则说，这正是在恢复早期伊斯兰的精神。',
  },
  radha: {
    t: '拉达克里希南的普遍主义',
    what: '把不二论说成"宗教本身"，以直觉为最根本的认识，按照与吠檀多的远近评价其他宗教。',
    ans: { text: 'change', concept: 'change', func: 'change', stance: 'change' },
    why: {
      text: '他把奥义书读成直觉经验的记录，又用这种经验证明奥义书（IEP 指出的循环）。',
      concept: '"幻"被解释为对世界的主观误认，而不是世界不存在。',
      func: '从一个学派的学说，变成一切宗教的共同核心和东西方对话的基础。',
      stance: '他常把自己的解释说成印度传统本来的样子，而不是一种新的综合；这是本章的判断，可以争论。',
    },
    alt: '为他辩护的人会说，在欧洲学界普遍轻视印度思想的情况下，这种普遍主义本身是一种反殖民的行动；这说明了他的动机，但不等于他的论证成立。',
  },
};

interface Saved {
  pick: Case;
  ans: Partial<Record<Case, Partial<Record<Q, A>>>>;
}
const INIT: Saved = { pick: 'ambedkar', ans: {} };

export default function ReinterpretationLab() {
  const [st, save] = useSavedIx<Saved>('IN8', ID, INIT);
  const pick: Case = st.pick in CASES ? st.pick : 'ambedkar';
  const c = CASES[pick];
  const mine = st.ans?.[pick] ?? {};
  const setA = (q: Q, a: A) => save({ ...st, ans: { ...st.ans, [pick]: { ...mine, [q]: a } } });
  const all = QS.every((q) => mine[q.k]);
  const faithful = QS.slice(0, 3).every((q) => c.ans[q.k] === 'keep');

  return (
    <section className="md c3 c5" aria-labelledby="rl-title">
      <header className="md-head">
        <p className="md-tag">忠实与创新 · 实验室</p>
        <h3 id="rl-title" className="md-title">
          用四个问题检验一种重新解释
        </h3>
        <p className="md-lede">选一种这一章读过的近代重新解释，自己回答四个问题，再与本章的读法和一种不同的读法比较。目标不是给思想家打分，而是看清"不忠实"与"不诚实"的区别。</p>
      </header>

      <Band>一 · 选一种重新解释</Band>
      <Seg name="rl-case" label="选择一种重新解释" value={pick} col opts={(Object.keys(CASES) as Case[]).map((k) => [k, CASES[k].t] as const)} onPick={(v) => save({ ...st, pick: v })} />
      <p>{c.what}</p>

      <Band>二 · 四个问题</Band>
      {QS.map((q) => {
        const a = mine[q.k];
        return (
          <div key={q.k} className="c5-row">
            <p>
              <b>{q.t}</b>
            </p>
            <Seg
              name={'rl-' + pick + '-' + q.k}
              label={q.t}
              value={a ?? null}
              opts={[
                ['keep', q.keep],
                ['change', q.change],
              ]}
              onPick={(v) => setA(q.k, v)}
            />
            {a && (
              <p className="md-feedback" aria-live="polite">
                <Verdict ok={a === c.ans[q.k]} yes="与本章的读法相同" no="与本章的读法不同" />
                本章的读法：{c.ans[q.k] === 'keep' ? q.keep : q.change}。{c.why[q.k]}
              </p>
            )}
          </div>
        );
      })}

      {all && (
        <div aria-live="polite">
          <Band>三 · 合起来看</Band>
          <Claim b="course" who="本章的判断">
            按本章的读法，这种解释在前三个问题上{faithful ? '大体保持了原来的东西' : '有重要的改变'}，所以{faithful ? '可以说是比较忠实的' : '不是一种"忠实的"解释'}；在立场的问题上，解释者{c.ans.stance === 'keep' ? '承认自己在重新解释，所以它是一种诚实的创新' : '没有清楚地承认自己的改变，所以它在第四个问题上不及格'}。
          </Claim>
          <Claim b="course" who="另一种读法">
            {c.alt}
          </Claim>
        </div>
      )}

      <Limits>
        <p>
          <b>四个问题是本章的整理，不是评价的唯一标准。</b>"后世批判与回应"第五节记录了对它们的一个批评：对一个活的传统来说，不断的重新解释也许正是它的忠实。本章对每一个例子的读法都可以争论。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
