import { Band, Claim, Limits, Seg, Src, Tag, useSavedIx, Verdict } from '../in4/shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import '../cn5/cn5.css';
import '../cn7/cn7.css';
import '../in2/ip.css';
import '../in4/in4.css';
import './in6.css';

// 一 · after "这个表说明了什么" (four passages, three schools).
// The passage itself is kept apart from what each school later makes of it.
// A school's reading is shown only where the chapter states it; where the chapter
// has not read that school's comment on the passage, the card says so instead of
// filling the gap. Every quotation and translation is the chapter's own
// (content/IN6_SAMPLE_DRAFT.md, 一、 and 三—五、, notes 6–12, 33, 49–51).

const ID = 'upanisad-explorer';

type P = 'bau1410' | 'bau37' | 'neti' | 'svu410';
type School = 'advaita' | 'ramanuja' | 'madhva';
const SCHOOL: Record<School, string> = { advaita: '商羯罗（不二论）', ramanuja: '罗摩奴阇（限定不二论）', madhva: '摩陀婆（二元论）' };

interface Reading {
  /** what the chapter says this school does with the passage; null = the chapter does not say */
  text: string | null;
  gap?: string;
  quote?: { src: string; orig: string; zh: string };
  who?: string;
}
interface Passage {
  short: string;
  src: string;
  orig: string;
  zh: string;
  literal: string;
  trouble: School[];
  troubleNote: string;
  note?: string;
  readings: Record<School, Reading>;
}

const PASSAGES: Record<P, Passage> = {
  bau1410: {
    short: '"我就是梵"',
    src: '《大森林奥义书》1.4.10',
    orig: 'brahma vā idam agra āsīt | tad ātmānam evāvet | ahaṃ brahmāsmīti | tasmāt tat sarvam abhavat',
    zh: '起初，这个［世界］就是梵。它只认识了自己："我就是梵。"因此它成了一切。',
    literal: '同一',
    trouble: ['ramanuja', 'madhva'],
    troubleNote: '罗摩奴阇和摩陀婆要说明，这里的"是"不等于"完全同一"。',
    readings: {
      advaita: { text: '不二论最喜欢的经文之一：认识到同一，就是解脱。' },
      ramanuja: {
        text: '用语法上的"同位关系"来读："我"这个词最终也指以我为身体的梵；两个词各有其义，却指同一个梵。',
        quote: {
          src: '罗摩奴阇《吠陀义摄》第 26 节',
          orig: 'bhinnapravṛttinimittānāṃ śabdānām ekasminn arthe vṛttiḥ sāmānādhikaraṇyam iti hi tadvidaḥ',
          zh: '懂得的人说：用法依据不同的几个词，用在同一个对象上，这就是同位关系。',
        },
      },
      madhva: {
        text: '不能读作同一；可以读作依赖、相似等关系。',
        who: '本章据《随释》和 IEP 所作的概括',
        gap: '本章没有读到摩陀婆对《大森林奥义书》1.4.10 的注释原文。',
      },
    },
  },
  bau37: {
    short: '"内在的控制者"',
    src: '《大森林奥义书》3.7.22（甘婆派传本）',
    orig: 'yo vijñāne tiṣṭhan vijñānād antaro yaṃ vijñānaṃ na veda yasya vijñānaṃ śarīraṃ yo vijñānam antaro yamayaty eṣa ta ātmāntaryāmy amṛtaḥ',
    zh: '他住在认识之中，又在认识之内；认识不知道他，认识是他的身体，他从内部控制认识。他就是你的自身，内在的控制者，不死者。',
    literal: '身体与灵魂的关系',
    trouble: ['advaita'],
    troubleNote: '商羯罗要说明，"身体"只属于较低的层次。',
    note: '本章把 vijñāna 译作"认识"。罗摩奴阇所引的形式作"自身是他的身体"（yasyātmā śarīram），差别看来来自《大森林奥义书》的两个传本；本章没有核对另一个传本（注 49）。',
    readings: {
      advaita: {
        text: null,
        gap: '本章只说明这段经文给商羯罗带来什么麻烦（"身体"只属于较低的层次），没有比较传为商羯罗所作的注释（注 8）。',
      },
      ramanuja: {
        text: '这是罗摩奴阇体系的经文根据：世界和个体是神的身体，神是它们的内在自身。他引用的形式对他特别有利：个体的自身，明确地被说成是神的身体。',
        quote: {
          src: '罗摩奴阇《吠陀义摄》第 4 节所引',
          orig: "ya ātmani tiṣṭhann ātmano 'ntaro yam ātmā na veda yasyātmā śarīraṃ ya ātmānam antaro yamayati sa ta ātmāntaryāmy amṛtaḥ",
          zh: '他住在自身之中，又在自身之内；自身不知道他，自身是他的身体，他从内部控制自身。他就是你的自身，内在的控制者，不死者。',
        },
      },
      madhva: { text: null, gap: '本章没有读到摩陀婆对这段经文的解释。' },
    },
  },
  neti: {
    short: '"不是这样，不是这样"',
    src: '《大森林奥义书》2.3.6',
    orig: 'athāta ādeśo neti neti | na hy etasmād iti nety anyat param asti',
    zh: '于是有这样的教导："不是这样，不是这样。"因为在"不是这样"之外，没有别的更高的东西。',
    literal: '没有属性的梵',
    trouble: ['ramanuja', 'madhva'],
    troubleNote: '罗摩奴阇和摩陀婆的梵具有无量的美好属性。',
    note: '第二句的意思本身就有争论，也可以理解为"因为在这［梵］之外，没有比\'不是这样\'更高的［教导］"；本章的试译取其中一种（注 9）。',
    readings: {
      advaita: {
        text: '梵没有任何属性，只能用否定来指示。但商羯罗也承认，否定必须留下一个被否定所依据的东西：否定一切可说的规定，是为了显出梵，不是说一切都不存在。',
        quote: {
          src: '商羯罗《梵经注》3.2.22（已对照印本）',
          orig: 'na tāvad ubhayapratiṣedha upapadyate śūnyavādaprasaṅgāt / kiñcid dhi paramārtham ālambyāparamārthaḥ pratiṣidhyate yathā rajjvādiṣu sarpādayaḥ',
          zh: '［把梵的形相和梵本身］两者都否定，是不能成立的，因为那会陷入空论。总是依据某个真实的东西，才否定不真实的东西，就像在绳子等等上面否定蛇等等。',
        },
      },
      ramanuja: {
        text: null,
        gap: '本章没有读到罗摩奴阇对这段经文的注释。正文只提出一个问题：被否定的，究竟是梵的一切属性，还是只是"梵就是这些而已"的说法？这是本章的提问，不是对罗摩奴阇注释的转述。',
      },
      madhva: { text: null, gap: '本章没有读到摩陀婆对这段经文的注释。' },
    },
  },
  svu410: {
    short: '"摩耶就是原质"',
    src: '《白骡奥义书》4.10',
    orig: 'māyāṃ tu prakṛtiṃ vidyān māyinaṃ tu maheśvaraṃ / tasyāvayavabhūtais tu vyāptaṃ sarvaṃ idaṃ jagat',
    zh: '要知道，摩耶就是原质，大自在者就是那掌握摩耶的人；这整个世界，都被作为他的部分的东西遍满。',
    literal: '一位运用神力创造世界的神',
    trouble: ['advaita'],
    troubleNote: '不二论要说明，"摩耶"怎样从"神力"变成"不可决定的显现"。',
    note: '"摩耶"在这里的意思并不是"幻觉"：它被等同于原质，即生出世界的材料。同一部奥义书在第一章说"在最后，一切摩耶都止息"（1.10），可见这个词已经带有"要被超越的东西"的意思（注 11）。',
    readings: {
      advaita: {
        text: '商羯罗本人很少使用"摩耶"一词，更常用"无明"、"名与色"、"限定条件"；据 SEP，商羯罗之后的一些不二论者把摩耶理解为与无始无明相同的世界的质料因，一种"不可决定"的、具有创造作用的力量。',
        who: '本章"摩耶：三个层次"一表；后一句据 SEP',
        gap: '本章没有读到商羯罗对这一颂的注释。',
      },
      ramanuja: { text: null, gap: '本章没有读到罗摩奴阇对这一颂的解释。' },
      madhva: { text: null, gap: '本章没有读到摩陀婆对这一颂的解释。' },
    },
  },
};
const ORDER: P[] = ['bau1410', 'bau37', 'neti', 'svu410'];

interface Saved {
  p: P;
  guess: Partial<Record<P, School[]>>;
  checked: Partial<Record<P, boolean>>;
  open: Partial<Record<P, boolean>>;
}
const INIT: Saved = { p: 'bau1410', guess: {}, checked: {}, open: {} };

export default function UpanisadExplorer() {
  const [st, save] = useSavedIx<Saved>('IN6', ID, INIT);
  const set = (x: Partial<Saved>) => save({ ...st, ...x });
  const pk: P = PASSAGES[st.p] ? st.p : 'bau1410';
  const p = PASSAGES[pk];
  const guess = st.guess?.[pk] ?? [];
  const checked = !!st.checked?.[pk];
  const open = !!st.open?.[pk];
  const same = guess.length === p.trouble.length && p.trouble.every((s) => guess.includes(s));

  const toggle = (s: School) => {
    const g = guess.includes(s) ? guess.filter((x) => x !== s) : [...guess, s];
    set({ guess: { ...st.guess, [pk]: g }, checked: { ...st.checked, [pk]: false } });
  };

  return (
    <section className="md c3 c5" aria-labelledby="ue-title">
      <header className="md-head">
        <p className="md-tag">奥义书经文 · 解读器</p>
        <h3 id="ue-title" className="md-title">
          同一段经文，三种读法
        </h3>
        <p className="md-lede">先读经文本身，判断它的字面给哪一派带来麻烦；再分别看三派怎样读它。经文和后来的读法分开显示；本章没有读到某一派的解释时，卡片会直说，不替它补上。</p>
      </header>

      <Seg name="ue-p" label="选择一段经文" value={pk} opts={ORDER.map((k) => [k, PASSAGES[k].short] as const)} onPick={(v) => set({ p: v })} />

      <Band>一 · 经文本身</Band>
      <Src src={p.src} lang="sa" orig={p.orig} zh={p.zh} />
      {p.note && <p className="md-muted">{p.note}</p>}

      <Band>二 · 先判断：这段经文的字面，给哪一派带来麻烦？</Band>
      <div className="md-seg" role="group" aria-label="可以选不止一派">
        {(Object.keys(SCHOOL) as School[]).map((s) => (
          <label key={s} className={'md-seg-opt' + (guess.includes(s) ? ' is-on' : '')}>
            <input type="checkbox" checked={guess.includes(s)} onChange={() => toggle(s)} />
            <span>{SCHOOL[s]}</span>
          </label>
        ))}
      </div>
      <p>
        <button type="button" className="md-disclose" disabled={guess.length === 0} onClick={() => set({ checked: { ...st.checked, [pk]: true } })}>
          对照本章的表
        </button>
      </p>
      {checked && (
        <p className="md-feedback" aria-live="polite">
          <Verdict ok={same} yes="与本章的表一致" no="与本章的表不同" />
          字面上最容易支持：<b>{p.literal}</b>。{p.troubleNote} <Tag b="course" who="第一部分的表" />
        </p>
      )}

      <Band>三 · 后来的读法</Band>
      <button type="button" className="md-disclose" aria-expanded={open} onClick={() => set({ open: { ...st.open, [pk]: !open } })}>
        {open ? '收起三派的读法' : '展开三派的读法'}
      </button>
      {open && (
        <div className="i6-cards" aria-live="polite">
          {(Object.keys(SCHOOL) as School[]).map((s) => {
            const r = p.readings[s];
            return (
              <article key={s} className={'i6-card' + (r.text ? '' : ' is-gap')}>
                <h4 className="i6-card-h">{SCHOOL[s]}</h4>
                {r.text ? (
                  <p>
                    <Tag b={r.quote ? 'text' : 'course'} who={r.who ?? (r.quote ? undefined : '本章的概括')} /> {r.text}
                  </p>
                ) : (
                  <p className="md-muted">本章没有给出这一派的读法。</p>
                )}
                {r.quote && <Src src={r.quote.src} lang="sa" orig={r.quote.orig} zh={r.quote.zh} />}
                {r.gap && <p className="md-muted">缺口：{r.gap}</p>}
              </article>
            );
          })}
        </div>
      )}

      <Claim b="course" who="第一部分的结论">
        这些经文出自不同的文本和不同的时代，本来就没有一个统一的体系。每一派都要选择一组经文作为基本的，再把其余的经文解释为与它们相容。"后来的读法不是'文本的意思'，而是'文本加上一个体系'。"
      </Claim>

      <Limits>
        <p>这不是一个"哪一派才是奥义书原意"的判定器，也不提供本章之外的译文。四段经文的中文都是本章的试译；三派的读法只写到本章读过的范围，空着的地方就是本章没有读到的地方。</p>
        <p>"给谁带来麻烦"一栏是本章的整理，不是任何一派自己的说法。经文据 GRETIL 电子本；《梵经注》3.2.22 一句已对照印本。</p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
