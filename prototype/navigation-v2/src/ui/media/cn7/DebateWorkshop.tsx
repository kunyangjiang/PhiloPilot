import { Limits, Quote, Seg, Tag, useSavedIn, type Basis } from './shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn2/cn2.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import '../cn5/cn5.css';
import './cn7.css';

// 五 · after the table in 「这场论战争的是什么？」. Not a vote and not
// "science against superstition": three tools to take the debate apart.
// 1. Inspect one participant: claim, premises, evidence, objections, replies, limits.
// 2. Boundary cases: decide for yourself, then see where each participant draws the line.
// 3. Sort questions into the chapter's three levels (知识论 / 伦理学 / 文化).
// Every passage and claim comes from 五、1923年的科学与人生观论战 and notes 9, 10.

const ID = 'debate-workshop';

type Who = 'zhang' | 'ding' | 'liang' | 'hu' | 'chen';
const WHO: [Who, string][] = [
  ['zhang', '张君劢'],
  ['ding', '丁文江'],
  ['liang', '梁启超'],
  ['hu', '胡适'],
  ['chen', '陈独秀'],
];

interface Item {
  b: Basis;
  who?: string;
  t: string;
}
interface Person {
  role: string;
  quote: { src: string; orig: string; zh: string };
  claim: Item[];
  premises: Item[];
  evidence: Item[];
  objections: Item[];
  replies: Item[];
  limits: Item[];
}

const P: Record<Who, Person> = {
  zhang: {
    role: '1923年2月清华学校演讲《人生观》',
    quote: {
      src: '张君劢《人生观》',
      orig: '惟其有此五點，故科學無論如何發達，而人生觀問題之解決，決非科學所能爲力，惟賴諸人類之自身而已。',
      zh: '正因为有这五点，所以科学无论怎样发达，人生观问题的解决，决不是科学所能做到的，只能依靠人类自身。',
    },
    claim: [{ b: 'text', t: '人生观问题的解决，"決非科學所能爲力"。他没有反对科学，也没有提倡迷信。' }],
    premises: [
      { b: 'text', t: '五点对比：科学是客观的、论理的、分析的、受因果律支配的、起于对象的相同现象；人生观是主观的、起于直觉、综合的、出于自由意志、起于人格的单一性。' },
      { b: 'text', t: '人生观的中心点是"我"：我和亲族、异性、财产、社会制度的关系，"東西古今，意見極不一致"。' },
    ],
    evidence: [
      { b: 'text', t: '他从学生的经验出发：科学有一定的原理原则，而人生日用的大多数问题"甲一說，乙一說，漫無是非真僞之標準"。' },
      { b: 'common', t: '当时的欧洲，倭铿、柏格森等人主张生命、直觉和自由意志不能被科学方法完全把握；德国哲学中有"自然科学"和"精神科学"的区分。' },
    ],
    objections: [
      { b: 'text', who: '丁文江', t: '科学研究的从来不是"物质本身"，而是感觉和概念；人生观也是概念和推理，同样应受科学方法的检验。' },
      { b: 'text', who: '梁启超', t: '人生离不开物质世界，不能完全不讲客观；把自由意志和理智对立起来，"這話毛病很大"。' },
      { b: 'text', who: '丁文江、胡适', t: '演讲结尾把五点对比变成"精神文明／物质文明"的对比；在一个"遍地的乩坛道院"的国家里这样告诉青年，是危险的。' },
    ],
    replies: [{ b: 'text', t: '张君劢随即写了长文答复。本课没有核对这篇《再论人生观与科学并答丁在君》，所以这里不概述他的回应（注9）。' }],
    limits: [
      { b: 'course', t: '要把他的两个论点分开：即使"科学不能决定人生观"是对的，"中国是精神文明、西方是物质文明"也不一定对；反过来也一样。' },
      { b: 'course', t: '五个问题（价值的客观性、直觉、整体性、自由意志、个人的独特性）每一个都是西方哲学中长期争论的问题，他只是给出了一种回答。' },
    ],
  },
  ding: {
    role: '1923年4月《努力周报》上的《玄学与科学》（引文据胡适《丁文江的传记》转引）',
    quote: {
      src: '丁文江《玄学与科学》，胡适《丁文江的传记》转引',
      orig: '凡不可以用論理學批評研究的，不是真知識。',
      zh: '凡是不能用逻辑学来批评和研究的，就不是真正的知识。',
    },
    claim: [{ b: 'cited', t: '一切知识都应当受论理学的检验；人生观也不例外，原则上可以用科学方法求出是非，甚至可能"统一"。' }],
    premises: [
      { b: 'scholar', who: '胡适的概括', t: '科学的对象不是"死物质"，而是概念和推理，这些都是心理的现象。' },
      { b: 'scholar', who: '胡适的概括', t: '各种人生观也都是概念和推理，所以当然应该受到科学方法的审查和评判。' },
    ],
    evidence: [
      { b: 'scholar', who: '胡适的转述', t: '他提出"存疑的唯心论"：我们知道物体的唯一方法是感官的感觉，所以"唯心"；感觉后面有没有物，存而不论，所以"存疑"。' },
      { b: 'common', t: '一般认为这个立场来自马赫和皮尔逊一路的实证主义科学哲学；本课没有在丁文原文中核对他引用了哪些人。' },
    ],
    objections: [
      { b: 'scholar', who: '胡适', t: '提出这种知识论是策略上的失误："官司又打到别处去了"，引来张君劢、林宰平的长篇反驳。' },
      { b: 'course', t: '如果科学的基础本身是一种有争议的哲学，他就很难说科学比"玄学"更可靠——他自己也在做玄学。' },
      { b: 'text', who: '梁启超', t: '"在君過信科學万能"；人生观的统一"非惟不可能，而且不必要；非惟不必要，而且有害"。' },
    ],
    replies: [
      { b: 'cited', t: '对"欧洲物质文明破产"的说法，他回答："歐洲文化縱然是破產（目前並無此事），科學絕對不負這種責任。"战争的主要原因是政治家和教育家，而他们大多是不科学的。' },
    ],
    limits: [
      { b: 'course', t: '他说科学方法和清代经学大师的方法一样；这把科学和考据学联系起来，后来成为"整理国故"的一个根据，也引起争议（张东荪后来专门质疑"考据方法是不是科学方法"）。' },
      { b: 'text', t: '本课没有见到《玄学与科学》的完整原文；他的引文都是转引的。' },
    ],
  },
  liang: {
    role: '1923年5月《人生观与科学——对于张、丁论战的批评》，自称"觀戰的新聞記者"',
    quote: {
      src: '梁启超《人生观与科学》',
      orig: '人生關涉理智方面的事項，絕對要用科學方法來解決；關涉情感方面的事項，絕對的超科學。',
      zh: '人生中关于理智方面的事情，绝对要用科学方法来解决；关于情感方面的事情，绝对超出科学。',
    },
    claim: [{ b: 'text', t: '人生问题有大部分可以而且必要用科学方法解决；有一小部分——"或者還是最重要的部分"——是超科学的。' }],
    premises: [
      { b: 'text', t: '界限在理智和情感之间，不在客观和主观之间。超科学的是情感，特别是"爱"和"美"。' },
      { b: 'text', t: '"所以自由意志是要与理智相輔的"：自由意志和理智不是对立的。' },
    ],
    evidence: [{ b: 'text', t: '统一人生观的结果就是"别黑白而定一尊"，不许不同意见存在，这是中世纪基督教的做法，不应出于科学家之口。' }],
    objections: [
      { b: 'course', t: '"理智／情感"的划分本身也需要论证：一个人对婚姻、财产的看法，理智和情感能不能这样干净地分开？（这是本课提出的问题，不是论战中某一方的原话。）' },
    ],
    replies: [{ b: 'course', t: '本课没有找到梁启超对上述问题的回应；它留给读者判断。' }],
    limits: [
      { b: 'course', t: '他的立场看起来是折中，其实提出了一个新的划界。按张君劢的划分，婚姻制度的选择属于主观的人生观；按梁启超的划分，它有很大一部分是理智的问题，只有爱本身才超科学。' },
      { b: 'course', t: '他反对统一人生观，是一个关于多元的论证：即使科学能帮助判断事实问题，也不应用来消除人生观的多样性。' },
    ],
  },
  hu: {
    role: '1923年底亚东图书馆《科学与人生观》序',
    quote: {
      src: '胡适《〈科学与人生观〉序》',
      orig: '我總觀這二十五萬字的討論，終覺得這一次為科學作戰的人——除了吳稚暉先生——都有一個共同的錯誤，就是不曾具體地說明科學的人生觀是什麼，卻去抽象地力爭科學可以解決人生觀的問題。',
      zh: '我综观这二十五万字的讨论，总觉得这一次为科学作战的人——除了吴稚晖先生——都有一个共同的错误，就是没有具体地说明科学的人生观是什么，却去抽象地力争科学可以解决人生观的问题。',
    },
    claim: [{ b: 'text', t: '不要抽象地争"科学能不能解决人生观"，要具体地说出科学的人生观是什么。他自己列了十条，并主张把它叫做"自然主义的人生观"。' }],
    premises: [{ b: 'text', t: '天文学、物理学、生物学、心理学、社会学告诉我们关于宇宙和人的事实：空间之大、时间之长、生存竞争、心理现象都有因果、道德礼教是变迁的，等等。' }],
    evidence: [{ b: 'text', t: '他指出论战的大部分文章都走上了"可能与不可能"的笼统讨论。' }],
    objections: [
      { b: 'course', t: '从"宇宙很大，人很小，生存竞争很残酷"这些事实，能不能推出"人应当怎样生活"？渺小的人的地位和价值从哪里来，是从科学来的吗？这正是张君劢所说的"人生观"问题。' },
      { b: 'text', who: '陈独秀', t: '胡适的实验主义不彻底，因为它没有说明人生观最终由什么决定。' },
    ],
    replies: [{ b: 'text', t: '胡适随后写了《答陈独秀先生》，两人在"唯物史观"上继续争论。本课没有概述这篇答复的内容。' }],
    limits: [{ b: 'course', t: '可以说，胡适给出了一种人生观，但没有证明它是"科学"推出来的。他把问题从"能不能"转到了"科学告诉我们哪些事实"，这是有意义的一步。' }],
  },
  chen: {
    role: '1923年底亚东图书馆《科学与人生观》序；此时已是中国共产党的领导人',
    quote: {
      src: '陈独秀《〈科学与人生观〉序》',
      orig: '我們相信只有客觀的物質原因可以變動社會，可以解釋歷史，可以支配人生觀，這便是“唯物的歷史觀”。',
      zh: '我们相信，只有客观的物质原因可以改变社会、解释历史、支配人生观，这就是"唯物的历史观"。',
    },
    claim: [{ b: 'text', t: '人生观既不是由个人的自由意志决定的，也不是由科学方法检验出来的，而是由社会的物质条件决定的。' }],
    premises: [{ b: 'text', t: '一个好的回答必须说明人生观最终由什么决定；丁文江的"存疑的唯心论"和胡适的实验主义都没有说明这一点，所以都不彻底。' }],
    evidence: [{ b: 'course', t: '本课只引了他的结论句；他在序中为唯物史观提出的具体论据，本课没有概述。' }],
    objections: [{ b: 'text', who: '胡适', t: '胡适写了《答陈独秀先生》，在"唯物史观"上和他争论。本课没有概述双方往返的论点。' }],
    replies: [{ b: 'text', t: '陈独秀又写了《答适之》。' }],
    limits: [
      { b: 'course', t: '他把问题推到第三种立场：人生观的决定者既不是个人，也不是科学方法，而是物质条件。这次争论的延续，属于下一门课马克思主义部分的前史。' },
    ],
  },
};

const LAYERS: [keyof Omit<Person, 'role' | 'quote'>, string][] = [
  ['claim', '主张'],
  ['premises', '前提'],
  ['evidence', '证据和支持'],
  ['objections', '反驳'],
  ['replies', '回应'],
  ['limits', '限度'],
];

// ── 2. boundary cases ────────────────────────────────────────────────
type Ans = 'yes' | 'no' | 'part' | 'split';
const ANS: [Ans, string][] = [
  ['yes', '科学方法能回答'],
  ['no', '科学方法不能回答'],
  ['part', '一部分能，一部分不能'],
  ['split', '要先把问题拆开才能回答'],
];
interface Case {
  id: string;
  q: string;
  pos: { who: string; b: Basis; t: string }[];
  note: string;
}
const CASES: Case[] = [
  {
    id: 'marriage',
    q: '自由婚姻还是专制婚姻：哪一种婚姻制度更好？',
    pos: [
      { who: '张君劢', b: 'text', t: '这是他列举的人生观问题之一（我和异性的关系），属于主观的人生观，科学管不到。' },
      { who: '梁启超', b: 'course', t: '按他的划分，有很大一部分是理智的问题：哪种制度对人的幸福更好，可以研究；只有爱本身才超科学。' },
      { who: '丁文江', b: 'course', t: '按他的论点，关于婚姻制度的看法也是概念和推理，应当受科学方法的检验。' },
    ],
    note: '这正是本课用来说明"两个界限不同"的例子：同一个问题，按"客观／主观"划在科学之外，按"理智／情感"大半划在科学之内。',
  },
  {
    id: 'love',
    q: '我爱不爱这个人？',
    pos: [
      { who: '梁启超', b: 'text', t: '情感方面的事项"絕對的超科學"，"爱"是他举的例子。' },
      { who: '张君劢', b: 'course', t: '按五点对比，这是主观的、出于人格单一性的问题；他会和梁启超一样把它放在科学之外，但理由不同。' },
    ],
    note: '张君劢和梁启超在这里结论相同，划界的理由却不同。结论一致并不说明两种划界是同一个。',
  },
  {
    id: 'property',
    q: '财产应当私有还是公有？',
    pos: [
      { who: '张君劢', b: 'text', t: '"我和财产的关系"是他列举的人生观问题之一，"決不如數學或物理化學問題之有一定公式"。' },
      { who: '陈独秀', b: 'course', t: '按唯物史观，人们对财产制度的看法本身是由客观的物质原因支配的；问题不在个人选择，而在社会条件。' },
    ],
    note: '陈独秀改变了问题：不问"应当怎样选"，而问"什么决定了人们这样选"。这两个问题需要分开。',
  },
  {
    id: 'unify',
    q: '用科学方法求出是非，将来能不能把所有人的人生观统一起来？',
    pos: [
      { who: '丁文江', b: 'scholar', t: '据梁启超的转述，丁文江认为将来也许可以统一。' },
      { who: '梁启超', b: 'text', t: '"人生觀的統一，非惟不可能，而且不必要；非惟不必要，而且有害。"' },
    ],
    note: '这里其实有两个问题：能不能统一（事实问题），应不应该统一（价值问题）。梁启超对两个问题都回答了"不"，而且第二个回答不依赖第一个。',
  },
];

// ── 3. three levels ──────────────────────────────────────────────────
type Lv = 'epi' | 'eth' | 'cul';
const LV: [Lv, string][] = [
  ['epi', '知识论的问题'],
  ['eth', '伦理学的问题'],
  ['cul', '文化的问题'],
];
const QS: { id: string; t: string; lv: Lv }[] = [
  { id: 'q1', t: '丁文江的"存疑的唯心论"能不能成立？', lv: 'epi' },
  { id: 'q2', t: '价值判断是一种知识吗？', lv: 'epi' },
  { id: 'q3', t: '人的选择是自由的，还是被决定的？', lv: 'eth' },
  { id: 'q4', t: '人生观应当统一，还是应当多元？', lv: 'eth' },
  { id: 'q5', t: '中国是"精神文明"，西方是"物质文明"吗？', lv: 'cul' },
  { id: 'q6', t: '第一次世界大战说明了科学的失败吗？', lv: 'cul' },
];

interface Saved {
  who: Who;
  case: string;
  ans: Record<string, Ans | undefined>;
  lv: Record<string, Lv | undefined>;
  sorted: boolean;
}
const INIT: Saved = { who: 'zhang', case: 'marriage', ans: {}, lv: {}, sorted: false };

export default function DebateWorkshop() {
  const [st, save] = useSavedIn<Saved>('CN7', ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const p = P[st.who] ?? P.zhang;
  const cs = CASES.find((c) => c.id === st.case) ?? CASES[0];
  const mine = st.ans[cs.id];
  const allSorted = QS.every((q) => st.lv[q.id]);

  return (
    <section className="md c3 c5" aria-labelledby="dw-title">
      <header className="md-head">
        <p className="md-tag">论战工作坊 · 五位参与者</p>
        <h3 id="dw-title" className="md-title">
          把论战拆开：主张、前提、反驳和限度
        </h3>
        <p className="md-lede">这不是投票，也不是"科学对迷信"。先逐一看清每位参与者的论证，再拿几个具体问题试一试他们各自把界限划在哪里，最后把论战中的问题分到三个层次。</p>
      </header>

      <p className="c3-layer-k">一 · 看一位参与者的论证</p>
      <Seg name="dw-who" label="选择一位参与者" value={st.who} opts={WHO} onPick={(v) => set({ who: v })} />
      <p className="md-muted">{p.role}</p>
      <Quote src={p.quote.src} orig={p.quote.orig} zh={p.quote.zh} />
      <div className="c7-layers">
        {LAYERS.map(([k, label]) => (
          <div key={k} className={'c7-layer' + (k === 'limits' ? ' is-limit' : '')}>
            <p className="c7-layer-h">{label}</p>
            {p[k].map((it, i) => (
              <p key={i}>
                <Tag b={it.b} who={it.who} />
                {it.t}
              </p>
            ))}
          </div>
        ))}
      </div>

      <p className="c3-layer-k">二 · 界限划在哪里？</p>
      <Seg name="dw-case" label="选择一个问题" col value={cs.id} opts={CASES.map((c) => [c.id, c.q] as const)} onPick={(v) => set({ case: v })} />
      <p className="md-fb-k">你的判断：{cs.q}</p>
      <Seg name={`dw-${cs.id}-ans`} label={`你的判断：${cs.q}`} value={mine ?? null} opts={ANS} onPick={(v) => set({ ans: { ...st.ans, [cs.id]: v } })} />
      {mine ? (
        <div className="c5-rows" aria-live="polite">
          <p className="md-muted">你的判断没有对错，下面是论战中的几种划界。标着"本课的重构"的，是本课按照他的论点推出来的，不是他的原话。</p>
          {cs.pos.map((x) => (
            <div key={x.who} className="c5-row">
              <p>
                <b>{x.who}</b> <Tag b={x.b} />
              </p>
              <p>{x.t}</p>
            </div>
          ))}
          <p className="md-feedback">{cs.note}</p>
        </div>
      ) : (
        <p className="md-muted">先作出你自己的判断，再看论战中的划界。</p>
      )}

      <p className="c3-layer-k">三 · 这是哪一个层次的问题？</p>
      <p className="md-muted">本课说，这场论战至少有三个层次的问题交织在一起，很多参与者在它们之间来回跳跃。</p>
      <div className="c5-rows">
        {QS.map((q) => {
          const v = st.lv[q.id];
          return (
            <div key={q.id} className="c5-row">
              <p>{q.t}</p>
              <Seg name={`dw-lv-${q.id}`} label={q.t} value={v ?? null} opts={LV} onPick={(x) => set({ lv: { ...st.lv, [q.id]: x }, sorted: false })} />
              {st.sorted && v && (
                <p aria-live="polite">
                  <span className={'c5-verdict ' + (v === q.lv ? 'c5-verdict--ok' : 'c5-verdict--no')}>{v === q.lv ? '和本课的分法一致' : `本课把它归为${LV.find((l) => l[0] === q.lv)![1]}`}</span>
                </p>
              )}
            </div>
          );
        })}
      </div>
      <button type="button" className="md-disclose" disabled={!allSorted} onClick={() => set({ sorted: true })}>
        核对
      </button>
      {st.sorted && <p className="md-feedback">方法上的教训：一场好的哲学讨论，首先要把问题分开。张君劢的五点对比是知识论和伦理学的问题；"精神文明／物质文明"是文化的问题。批评者攻击的主要是后者，但这并不能驳倒前者。</p>}

      <Limits>
        <p>五位参与者的论点只取自本课第五部分。论战中还有吴稚晖、张东荪、林宰平、王星拱、任叔永、唐钺、范寿康等许多人，本课没有核对他们的文章，所以这里不出现（注9）。</p>
        <p>丁文江的引文是胡适转引的；张君劢的答辩长文、胡适和陈独秀往返的答复，本课没有阅读，这里只提到它们存在，不概述内容。每一条说明都标出了它依据的是原文、转引、他人的概括，还是本课的重构。</p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
