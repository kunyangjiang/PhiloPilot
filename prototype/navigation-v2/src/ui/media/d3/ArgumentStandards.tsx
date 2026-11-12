import { Band, Claim, Limits, Pick, useSavedIx } from '../jw1/shared';

// 六 · after the three answers, the meta-rules table and the qualified
// conclusion, and the paragraph introducing the exercise
// (content/D3_SAMPLE_DRAFT.md). Four arguments built only from material the
// chapter discusses: Vātsyāyana's "sound is impermanent" rewritten as a
// syllogism (parts 一, 六), the 小取 parallel that fails (part 一), a debater who
// does not answer an objection (part 二, nigrahasthāna), and the inference
// al-Ghazālī attacks in Tahāfut 17 (part 三). For each the reader judges three
// levels separately: formal validity, epistemic justification, dialectical
// rules. Validity follows the chapter's definition (the conclusion cannot be
// false if the premises are true). The analysis is the chapter's; nothing is
// scored.

const ID = 'argument-standards';

type Lv = 'form' | 'just' | 'dial';
const LEVELS: { id: Lv; name: string; q: string; opts: readonly (readonly [string, string])[] }[] = [
  {
    id: 'form',
    name: '形式的有效',
    q: '前提都真时，结论可能假吗？',
    opts: [
      ['ok', '有效'],
      ['no', '无效'],
      ['interp', '要先决定它是什么形式'],
    ],
  },
  {
    id: 'just',
    name: '认识的辩护',
    q: '相信结论有充分的根据吗？',
    opts: [
      ['ok', '有充分的根据'],
      ['no', '根据不足'],
      ['dep', '取决于没有写出的根据'],
    ],
  },
  {
    id: 'dial',
    name: '论辩的规则',
    q: '作为辩论中的一步，它正当吗？',
    opts: [
      ['ok', '正当'],
      ['no', '犯规或不公平'],
      ['dep', '取决于对手接受什么'],
    ],
  },
];

interface Arg {
  id: string;
  title: string;
  text: string;
  key: Record<Lv, string>;
  why: Record<Lv, string>;
}

const ARGS: Arg[] = [
  {
    id: 'a1',
    title: '论证一：转写以后的"声音是无常的"',
    text: '凡有生起性质的东西都是无常的；声音有生起性质；所以，声音是无常的。（没有给出实例）',
    key: { form: 'ok', just: 'dep', dial: 'dep' },
    why: {
      form: '有效。前提都真时结论不可能假；有没有实例、前提是否真，都不影响有效性（第一、六部分）。',
      just: '取决于普遍规则的根据。正理派论师会问：没有"锅"，你怎么知道"凡有生起性质的都是无常的"？在辩护的层次上，这个要求有道理，亚里士多德也要求证明的前提有根据；分歧在于根据要不要写进论式（第六部分）。',
      dial: '取决于对手。陈那要求实例双方都承认，论议要求不违背双方的定说；对手不接受大前提时，这个论式在辩论中就还没有完成（第二、六部分）。',
    },
  },
  {
    id: 'a2',
    title: '论证二：按照"白马"的句式',
    text: '"白馬，馬也；乘白馬，乘馬也。"同样地：車，木也；所以，乘車，乘木也。',
    key: { form: 'interp', just: 'no', dial: 'ok' },
    why: {
      form: '要先决定它是什么形式。若把它当作"X 是 Y，所以乘 X 是乘 Y"这个一般的式，那么这个式不是有效的——"乘車，非乘木也"正是前提真而结论假的反例。墨家的发现是：句式的平行（侔）不保证推论正确；问题出在"乘"字的意思上（第一部分）。',
      just: '根据不足。结论不符合实际：乘车不是乘木（《小取》称之为"是而不然"）。',
      dial: '作为辩论中的一步，用一个双方都承认的句式类比，本身并不犯规；墨家的辩正是"以類取，以類予"。错误在推理（语义）上，不在程序上（第二部分"三种不同的规则"）。',
    },
  },
  {
    id: 'a3',
    title: '论证三：不回答的论师',
    text: '论师说：凡有生起性质的东西都是无常的，例如锅；声音有生起性质；所以声音是无常的。对方质疑"声音有生起性质"，他没有回答，转而谈别的。',
    key: { form: 'ok', just: 'dep', dial: 'no' },
    why: {
      form: '有效，与论证一相同。',
      just: '取决于小前提能否被辩护：实例为大前提提供了根据，但被质疑的小前提在这场辩论中没有得到辩护。',
      dial: '犯规。按照《正理经》，不回答对方是负处，足以判定失败。一个人可以持有真的主张而输掉辩论：负处是程序的规则，不是推理的规则（第二部分）。',
    },
  },
  {
    id: 'a4',
    title: '论证四：安萨里所反对的推论',
    text: '我们总是观察到火与燃烧相伴随；所以，火必然导致燃烧，不可能有火而没有燃烧。',
    key: { form: 'no', just: 'no', dial: 'dep' },
    why: {
      form: '无效。"总是观察到伴随"为真，而"必然导致"为假，是可能的；从伴随推不出必然。',
      just: '按照哲学家自己的证明标准，根据不足：证明要求必然的结论，而观察只给出伴随（al-mushāhad），给不出必然（bi-l-ḍarūra）。这是安萨里的内部的批评（第三部分）。',
      dial: '取决于对手接受什么。对一个只把它当作习惯性预期的对手，它可以是一步正当的论证；可是哲学家把它当作证明提出，而安萨里用哲学家自己承认的证明标准检验它——这正是"对自己和对手用同样的标准"这一元规则（第三、六部分）。按照这个双方都承认的标准，它不是证明。',
    },
  },
];

interface Saved {
  marks: Record<string, Partial<Record<Lv, string>>>;
  shown: string[];
}
const INIT: Saved = { marks: {}, shown: [] };

export default function ArgumentStandards() {
  const [st, save] = useSavedIx<Saved>('D3', ID, INIT);
  const allShown = ARGS.every((a) => st.shown.includes(a.id));
  const split = ARGS.filter((a) => new Set(Object.values(a.key)).size > 1).length;

  return (
    <section className="md c3 c5" aria-labelledby="as-title">
      <header className="md-head">
        <p className="md-tag">三个层次 · 四个论证</p>
        <h3 id="as-title" className="md-title">这个论证好不好——在哪一个层次上？</h3>
        <p className="md-lede">对每个论证，分别从形式的有效、认识的辩护、论辩的规则三个角度作判断，再看本章的分析。"有效"按本章的定义：前提都真时，结论不可能假。三个判断常常不一致；组件不评分。</p>
      </header>

      <Band>一 · 逐个判断</Band>
      <ol className="v21-steps" aria-label="四个论证">
        {ARGS.map((a, i) => {
          const mine = st.marks[a.id] ?? {};
          const shown = st.shown.includes(a.id);
          const done = LEVELS.every((l) => mine[l.id]);
          return (
            <li key={a.id} className="v21-step">
              <span className="v21-n" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <p>
                  <b>{a.title}。</b>
                  {a.text}
                </p>
                {LEVELS.map((l) => (
                  <div key={l.id}>
                    <p className="md-muted">
                      {l.name}：{l.q}
                    </p>
                    <Pick
                      label={`${a.title}，${l.name}`}
                      value={mine[l.id] ?? null}
                      opts={l.opts}
                      onPick={(v) => save({ ...st, marks: { ...st.marks, [a.id]: { ...mine, [l.id]: v } } })}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className="md-reset"
                  aria-expanded={shown}
                  disabled={!done && !shown}
                  onClick={() => save({ ...st, shown: shown ? st.shown.filter((x) => x !== a.id) : [...st.shown, a.id] })}
                >
                  {shown ? '收起本章的分析' : done ? '看本章的分析' : '三个层次都判断以后再看分析'}
                </button>
                {shown && (
                  <div aria-live="polite">
                    {LEVELS.map((l) => {
                      const k = a.key[l.id];
                      const kt = l.opts.find(([v]) => v === k)?.[1];
                      return (
                        <Claim key={l.id} b="course">
                          {l.name}——{kt}。{a.why[l.id]}
                          {mine[l.id] && mine[l.id] !== k ? `（你的判断是"${l.opts.find(([v]) => v === mine[l.id])?.[1]}"。）` : ''}
                        </Claim>
                      );
                    })}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <Band>二 · 三个层次为什么要分开</Band>
      {allShown ? (
        <div aria-live="polite">
          <Claim b="course">
            四个论证中，有 {split} 个在三个层次上得到的判断不全相同：论证一有效，却要靠没有写出的根据；论证二的错误在语义，不在程序；论证三有效，却在程序上失败；论证四无效，它在辩论中站不站得住，取决于双方承认的是哪一种证明标准。本章说，马塔与西拉菲的辩论之所以没有结果，一个原因可能正是双方没有分清这三个层次。
          </Claim>
        </div>
      ) : (
        <p className="md-muted">看过四个论证的分析后，这里会说明三个层次的判断在哪里分开。</p>
      )}

      <Limits>
        <p>
          <b>四个论证都取自本章讨论过的材料，论证三和论证四的措辞是为练习而写的。</b>
          论证一据伐差耶那《正理经疏》1.1.39 的转写（第一部分）；论证二据《墨子·小取》（第一部分）；论证三据《正理经》关于负处的介绍（第二部分）；论证四据安萨里《哲学家的矛盾》第十七问题所反对的立场（第三部分），是一个简化，不是哲学家的原话。分析是本章的分析，不是唯一的答案。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
