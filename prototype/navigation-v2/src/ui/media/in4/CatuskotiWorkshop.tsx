import { Band, Claim, Limits, Seg, Src, Tag, useSavedIx, Verdict, type Basis } from './shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import '../cn5/cn5.css';
import '../cn7/cn7.css';
import '../in2/ip.css';
import './in4.css';

// 二 · after "四句违反逻辑吗？" (the three readings of the four corners).
// 1. Three verses, three uses of the same four-cornered schema. The reader opens
//    each corner to see what it asserts, what it presupposes and what follows.
// 2. MMK 1.1: what do the four corners share, and does rejecting them mean
//    "nothing arises"? (It does not: 24.14, 24.18 and the chapter's table.)
// 3. Objections: the nihilism charge and the self-reference charge, with
//    Nāgārjuna's documented replies, then the three modern readings.
// Everything is taken from 二、 and the Buddhapālita passage in 三、 (notes 12–36, 39).

const ID = 'catuskoti-workshop';

type Mode = '1.1' | '18.8' | '22.11';
interface Corner {
  k: string;
  claim: string;
  pre: { b: Basis; who?: string; t: string };
  then: { b: Basis; who?: string; t: string };
  src?: { src: string; orig: string; zh: string };
}
interface ModeData {
  title: string;
  status: string;
  src: { src: string; orig: string; zh: string };
  use: string;
  corners: Corner[];
}

const MODES: Record<Mode, ModeData> = {
  '1.1': {
    title: '《中论》1.1：四种生起',
    status: '四句都被否定',
    src: {
      src: '《中论》1.1',
      orig: 'na svato nāpi parato na dvābhyāṃ nāpy ahetutaḥ / utpannā jātu vidyante bhāvāḥ kva cana ke cana //',
      zh: '任何东西，在任何地方、任何时候，都不是从自己生起的，不是从他物生起的，不是从两者生起的，也不是无因生起的。',
    },
    use: '全部否定：每一句都预设了"有自性的东西生起"，所以都被否定。',
    corners: [
      {
        k: '从自己生起',
        claim: '结果已经以某种方式存在于原因之中。',
        pre: { b: 'later', who: '后来的注释家和现代学者', t: '常被归于数论派。龙树的偈颂本身没有点名。' },
        then: {
          b: 'text',
          who: '佛护语，月称《明句论》引',
          t: '那样的生起没有意义，而且有"推得太过"的过失：已经存在的东西如果还要生起，就会永远不停地生起。其余三句的理由，后来的注释家各有补充；佛护和清辨关于怎样论证这一句的争论，见第三部分。',
        },
        src: {
          src: '佛护语，月称《明句论》第一品引',
          orig: 'na svata utpadyante bhāvāḥ, tadutpādavaiyarthyāt, atiprasaṅgadoṣācca | na hi svātmanā vidyamānānāṃ padārthānāṃ punarutpāde prayojanamasti | atha sannapi jāyeta, na kadācinna jāyeta iti ||',
          zh: '事物不从自己生起，因为那样的生起是没有意义的，而且有"推得太过"的过失。已经以自身而存在的事物，没有必要再生起一次；如果已经存在的东西还要生起，它就会永远不停地生起。',
        },
      },
      {
        k: '从他物生起',
        claim: '结果和原因是不同的东西。',
        pre: { b: 'later', who: '后来的注释家和现代学者', t: '阿毗达磨的因缘说。' },
        then: {
          b: 'course',
          t: '如果结果有自性，它就不依赖他物、不被造作（15.2 的定义）；一个有自性的东西，不能"从他物"得到它的是其所是（15.1）。本章没有读到注释家对这一句的逐条理由，这里只用第十五品的定义来说明。',
        },
      },
      {
        k: '从两者生起',
        claim: '结果既从自己也从他物生起。',
        pre: { b: 'later', who: '后来的注释家和现代学者', t: '两者的结合。' },
        then: { b: 'course', t: '它同时承担前两句的困难。本章没有读到注释家对这一句的逐条理由。' },
      },
      {
        k: '无因生起',
        claim: '结果没有原因。',
        pre: { b: 'later', who: '后来的注释家和现代学者', t: '常被归于顺世论一类的立场。' },
        then: { b: 'course', t: '这一句否认了双方都承认的缘起。本章没有读到注释家对这一句的逐条理由。' },
      },
    ],
  },
  '18.8': {
    title: '《中论》18.8：循序的教法',
    status: '四句都被肯定',
    src: {
      src: '《中论》18.8',
      orig: 'sarvaṃ tathyaṃ na vā tathyaṃ tathyaṃ cātathyam eva ca / naivātathyaṃ naiva tathyam etad buddhānuśāsanam //',
      zh: '一切是真实的；或者，不是真实的；既是真实的又不是真实的；既不是不真实的，也不是真实的：这是佛陀的教导。',
    },
    use: '全部肯定：每一句对某一类听众、在某一阶段是有用的说法。',
    corners: [
      { k: '一切是真实的', claim: '对某一类听众先这样说。', pre: { b: 'school', who: '月称的注释', t: '月称把这一偈读为循序渐进的教法。' }, then: { b: 'course', t: '这一句不是关于自性的最终描述，而是在某一阶段有用的说法。' } },
      { k: '一切不是真实的', claim: '对另一类听众，再这样说。', pre: { b: 'school', who: '月称的注释', t: '月称把这一偈读为循序渐进的教法。' }, then: { b: 'course', t: '它纠正了对前一句的执着。' } },
      { k: '既真实又不真实', claim: '在又一个阶段这样说。', pre: { b: 'school', who: '月称的注释', t: '月称把这一偈读为循序渐进的教法。' }, then: { b: 'course', t: '"是"和"不是"在这里可以理解为在不同的意义上说的。' } },
      { k: '既不不真实也不真实', claim: '最后这样说。', pre: { b: 'school', who: '月称的注释', t: '月称把这一偈读为循序渐进的教法。' }, then: { b: 'course', t: '即使这一句，也只是一个阶段上的说法。' } },
    ],
  },
  '22.11': {
    title: '《中论》22.11：说而不执',
    status: '四句都只为施设而说',
    src: {
      src: '《中论》22.11',
      orig: 'śūnyam iti na vaktavyam aśūnyam iti vā bhavet / ubhayaṃ nobhayaṃ ceti prajñaptyarthaṃ tu kathyate //',
      zh: '不应说"空"，也不应说"非空"，也不应说"两者"或"两者都不是"；但为了施设（让人理解），才这样说。',
    },
    use: '说而不执：连"空"也不应执为定论，只是为了施设而说。',
    corners: [
      { k: '空', claim: '"空"也不应执为定论。', pre: { b: 'text', who: '《中论》22.11', t: '四句被用在"空"本身上。' }, then: { b: 'text', who: '《中论》13.8', t: '把空性本身当作一种见解的人，诸佛说他们是不可救治的。' } },
      { k: '非空', claim: '"非空"同样不应说。', pre: { b: 'text', who: '《中论》22.11', t: '四句被用在"空"本身上。' }, then: { b: 'course', t: '否定"空"并不等于回到"有自性"。' } },
      { k: '两者', claim: '"既空又非空"也不应说。', pre: { b: 'text', who: '《中论》22.11', t: '四句被用在"空"本身上。' }, then: { b: 'course', t: '语言是工具，不是对真实的最终描述。' } },
      { k: '两者都不是', claim: '"既非空也非非空"也不应说。', pre: { b: 'text', who: '《中论》22.11', t: '四句被用在"空"本身上。' }, then: { b: 'text', who: '《中论》22.11', t: '但为了施设，才这样说。' } },
    ],
  },
};

type Pre = 'svabhava' | 'identity' | 'nothing';
const PRES: [Pre, string][] = [
  ['svabhava', '有自性的东西生起'],
  ['identity', '结果和原因是同一个东西'],
  ['nothing', '任何东西都不生起'],
];
const PRE_FB: Record<Pre, { ok: boolean; t: string }> = {
  svabhava: { ok: true, t: '这是本章采用的解释：四句共同预设了"有自性的东西生起"，所以都被否定，就像问"法国国王是不是秃头"一样，问题本身出了错。这是一种解释，学者们还有别的读法（见下面第三段）。' },
  identity: { ok: false, t: '这只是第一句（从自己生起）的内容；第二句恰恰说结果和原因不同。四句共同的预设，要在四句之下找。' },
  nothing: { ok: false, t: '这不是四句的预设，而是对 1.1 最常见的误读。四句之中没有一句说"不生起"；"无因生起"说的是没有原因的生起。' },
};

type After = 'nothing' | 'nosvabhava' | 'unknown';
const AFTERS: [After, string][] = [
  ['nothing', '能。四种生起都被否定，所以什么都不生起，因果是幻觉。'],
  ['nosvabhava', '不能。被否定的是"有自性的东西生起"；依赖条件的生起没有被否定。'],
  ['unknown', '不能确定，龙树在这一点上没有表态。'],
];
const AFTER_FB: Record<After, { ok: boolean; b: Basis; who?: string; t: string }> = {
  nothing: { ok: false, b: 'scholar', who: 'SEP《龙树》', t: '这正是中观派被指控为"虚无主义"的地方。SEP 的龙树条目强调：这一品的结论不是"因果关系不可能"，而是"原因和结果都没有自性"。' },
  nosvabhava: { ok: true, b: 'text', who: '《中论》24.14、24.18', t: '龙树把指控反过来：有自性的东西才不能生起、不能变化；正因为没有自性，事物才能在条件中生起。"凡是缘起，我们就说它是空性。"' },
  unknown: { ok: false, b: 'text', who: '《中论》24.14、24.18', t: '龙树在第二十四品明确表了态：对于承认空的人，一切都能成立；缘起就是空性。' },
};

interface Saved {
  mode: Mode;
  open: number | null;
  pre: Pre | null;
  after: After | null;
  obj: number | null;
}
const INIT: Saved = { mode: '1.1', open: null, pre: null, after: null, obj: null };

const OBJ: { t: string; b: Basis; who: string; reply: string; src?: { src: string; orig: string; zh: string } }[] = [
  {
    t: '如果一切都空，四圣谛、修行、因果都不能成立。',
    b: 'text',
    who: '《中论》第二十四品开头，对手的指控',
    reply: '恰恰相反：有自性的东西才不能变化；空才使一切成立。［有文献的直接回应］',
    src: {
      src: '《中论》24.14',
      orig: 'sarvaṃ ca yujyate tasya śūnyatā yasya yujyate / sarvaṃ na yujyate tasya śūnyaṃ yasya na yujyate //',
      zh: '对于承认空的人，一切都能成立；对于不承认空的人，一切都不能成立。',
    },
  },
  {
    t: '"一切都没有自性"这句话本身也没有自性，所以不能否定任何东西。',
    b: 'text',
    who: '《回诤论》第 1 颂，对手的反驳',
    reply: '我没有（关于自性的）主张，所以没有这个过失；幻化的人也可以阻止幻化的人。"没有主张"究竟是什么意思，是中观研究中争论最多的问题之一。［有文献的直接回应；读法有争议］',
    src: {
      src: '《回诤论》第 29 颂',
      orig: 'yadi kācana pratijñā tatra syān na me tat* eṣa me bhaved doṣaḥ / nāsti ca mama pratijñā tasmān naivāsti me doṣaḥ //',
      zh: '如果我有任何主张，那么这个过失就会落在我身上；但我没有主张，所以我没有过失。',
    },
  },
  {
    t: '如果连"空"也不能执着，中观派究竟说了什么？',
    b: 'course',
    who: '本章的概括',
    reply: '说了一种方法：逐一检查对方的概念，直到对方放下执着。这一行是本章的概括［学派层面的整理］，下一部分的争论（归谬还是立论）就从这里开始。',
  },
];

export default function CatuskotiWorkshop() {
  const [st, save] = useSavedIx<Saved>('IN4', ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const m = MODES[st.mode] ?? MODES['1.1'];
  const open = st.open != null ? m.corners[st.open] : null;
  const preFb = st.pre ? PRE_FB[st.pre] : null;
  const afterFb = st.after ? AFTER_FB[st.after] : null;
  const cornerClass = (i: number) =>
    'ix-corner' + (st.open === i ? ' is-on' : '') + (st.mode === '1.1' ? ' is-neg' : '') + (st.mode === '22.11' ? ' is-hollow' : '');

  return (
    <section className="md c3 c5" aria-labelledby="ck-title">
      <header className="md-head">
        <p className="md-tag">四句 · 论证工作坊</p>
        <h3 id="ck-title" className="md-title">
          四个角：同一个格式，三种用法
        </h3>
        <p className="md-lede">四句不是一道四选一的题。先打开每一个角，看它说了什么、预设了什么、会推出什么；再追问《中论》1.1 的四句共同预设了什么，否定它们之后剩下什么；最后看两个最常见的反驳和龙树的回答。</p>
      </header>

      <Band>一 · 三个偈颂，三种用法</Band>
      <Seg
        name="ck-mode"
        label="选择一个偈颂"
        value={st.mode}
        opts={(Object.keys(MODES) as Mode[]).map((k) => [k, MODES[k].title] as const)}
        onPick={(v) => set({ mode: v, open: null })}
      />
      <Src src={m.src.src} lang="sa" orig={m.src.orig} zh={m.src.zh} />
      <p className="md-muted">
        {m.status}。{m.use} <Tag b="course" who="三种用法的分类" />
      </p>
      <div className="ix-square" role="group" aria-label={`${m.title}的四个角`}>
        {m.corners.map((c, i) => (
          <button key={c.k} type="button" className={cornerClass(i)} aria-pressed={st.open === i} onClick={() => set({ open: st.open === i ? null : i })}>
            <small>第 {i + 1} 句</small>
            <span className="ix-k">{c.k}</span>
          </button>
        ))}
      </div>
      {open ? (
        <div className="c5-row" aria-live="polite">
          <p>
            <b>{open.k}</b>：{open.claim}
          </p>
          <Claim b={open.pre.b} who={open.pre.who}>
            {st.mode === '1.1' ? '当时的代表：' : '这一句的地位：'}
            {open.pre.t}
          </Claim>
          <Claim b={open.then.b} who={open.then.who}>
            {st.mode === '1.1' ? '为什么不成立：' : '它的作用：'}
            {open.then.t}
          </Claim>
          {open.src && <Src src={open.src.src} lang="sa" orig={open.src.orig} zh={open.src.zh} />}
        </div>
      ) : (
        <p className="md-muted">点一个角，看它的内容。</p>
      )}

      <Band>二 · 《中论》1.1 否定之后，剩下什么？</Band>
      <p className="md-fb-k">四句共同预设了什么？</p>
      <Seg name="ck-pre" label="四句共同的预设" col value={st.pre} opts={PRES} onPick={(v) => set({ pre: v })} />
      {preFb && (
        <p className="md-feedback" aria-live="polite">
          <Verdict ok={preFb.ok} yes="本章采用的解释" no="不是共同的预设" />
          <Tag b="course" />
          {preFb.t}
        </p>
      )}
      <p className="md-fb-k">四句都被否定以后，能不能说"什么都不生起"？</p>
      <Seg name="ck-after" label="否定四句之后" col value={st.after} opts={AFTERS} onPick={(v) => set({ after: v })} />
      {afterFb && (
        <div aria-live="polite">
          <p className="md-feedback">
            <Verdict ok={afterFb.ok} yes="符合龙树的回答" no="不符合龙树的回答" />
            <Tag b={afterFb.b} who={afterFb.who} />
            {afterFb.t}
          </p>
          <Src src="《中论》24.18" lang="sa" orig="yaḥ pratītyasamutpādaḥ śūnyatāṃ tāṃ pracakṣmahe / sā prajñaptir upādāya pratipat saiva madhyamā //" zh="凡是缘起，我们就说它是空性；它是依于（他物）的施设，它就是中道。" />
          <table className="ip-sort">
            <caption className="visually-hidden">龙树否定的和没有否定的</caption>
            <thead>
              <tr>
                <th scope="col">例子</th>
                <th scope="col">龙树否定的是什么</th>
                <th scope="col">没有否定的是什么</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>《中论》1.1 生起</td>
                <td>有自性的东西生起</td>
                <td>依赖条件的生起</td>
              </tr>
              <tr>
                <td>《中论》2.1 运动</td>
                <td>有自性的"正在被走"</td>
                <td>日常的行走</td>
              </tr>
              <tr>
                <td>《中论》10.1 火与燃料</td>
                <td>火与燃料各有自性</td>
                <td>火依赖燃料而燃烧</td>
              </tr>
            </tbody>
          </table>
          <p className="md-muted">
            表据正文"运动与同一"一节的整理。 <Tag b="course" />
          </p>
        </div>
      )}

      <Band>三 · 反驳与回答</Band>
      <Seg name="ck-obj" label="选择一个反驳" col value={st.obj} opts={OBJ.map((o, i) => [i, o.t] as const)} onPick={(v) => set({ obj: v })} />
      {st.obj != null && OBJ[st.obj] && (
        <div className="c5-row" aria-live="polite">
          <p>
            <Tag b={OBJ[st.obj].b} who={OBJ[st.obj].who} />
          </p>
          <p>回答：{OBJ[st.obj].reply}</p>
          {OBJ[st.obj].src && <Src src={OBJ[st.obj].src!.src} lang="sa" orig={OBJ[st.obj].src!.orig} zh={OBJ[st.obj].src!.zh} />}
        </div>
      )}
      <p className="md-fb-k">四句违反逻辑吗？学者们的三种解释（本章据一般的介绍，没有逐一阅读原著）：</p>
      <Claim b="scholar" who="学者的解释之一">每一句所说的"是"和"不是"在不同的意义上使用，所以并不矛盾。</Claim>
      <Claim b="scholar" who="学者的解释之二">四句全部否定，是因为它们共同预设了一个错误的前提（例如"有自性的东西存在"）。本章认为，这最符合《中论》1.1 这类用法，但这只是一种解释。</Claim>
      <Claim b="scholar" who="学者的解释之三">龙树确实接受某些真正的矛盾，可以用"次协调逻辑"来重建。</Claim>

      <Limits>
        <p>这不是一道选择题，也不是一个逻辑演算器：四个角只是展开正文已经读过的偈颂、注释和本章的说明。"当时的代表"一栏是后来的注释家和现代学者的说法；第二、三、四句为什么不成立，本章没有读到注释家的逐条理由，凡是本章的说明都标了出来。</p>
        <p>"空"在这里始终是"没有自性"，不是"什么都没有"。佛护和清辨关于怎样论证第一句的争论，见第三部分。</p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
