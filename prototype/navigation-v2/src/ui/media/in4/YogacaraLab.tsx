import { Band, Claim, Limits, Seg, Src, Tag, useSavedIx, Verdict, type Basis } from './shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import '../cn5/cn5.css';
import '../cn7/cn7.css';
import '../in2/ip.css';
import './in4.css';

// 四 · after "还有一点比这张表更重要" (the end of the 唯识二十论 part).
// 1. The four objections of v.2 and Vasubandhu's four counterexamples: the reader
//    judges what each example shows (that a feature of experience does not
//    require an external object), not that it proves there is none.
// 2. Four further arguments (parsimony, atoms, perception and time, waking), each
//    with what it establishes and what it leaves open; then "not solipsism".
// 3. The Nyāya objection from the Critiques & Responses and Vasubandhu's replies.
// 4. Where the label "idealist" misleads (Berkeley, Kant).
// Every verse and reading is the chapter's own (四、 and the C&R, notes 55–69, 111–118).

const ID = 'yogacara-lab';

type Obj = 'place' | 'shared' | 'effect' | 'all';
const OBJS: { k: Obj; t: string; q: string; ex: string; v: string }[] = [
  { k: 'place', t: '地点和时间的确定', q: '为什么我只在某个地方、某个时候看见一座山？', ex: '梦中没有外在对象，可是梦中的经验也有确定的地点和时间。', v: '梦（第 3 颂）' },
  { k: 'shared', t: '不同心识之流的共同经验', q: '为什么同一个地方的许多人都看见，不像眼翳患者那样只有一个人看见毛发？', ex: '业报相同的众生，会共同看见同样的东西。', v: '饿鬼共同看见充满脓血的河（第 3 颂）' },
  { k: 'effect', t: '对象的作用', q: '为什么真的食物能解饿，梦中的食物却不能？', ex: '没有外在对象，经验也可以产生实际的身体作用。', v: '梦遗（第 4 颂）' },
  { k: 'all', t: '以上全部', q: '有没有一个例子，同时满足前面三个条件？', ex: '地狱众生共同看见地狱的狱卒，并且被他们折磨，可是狱卒不是真的众生。', v: '地狱（第 4 颂）' },
];

type Shows = 'notneed' | 'notexist';
const SHOWS: [Shows, string][] = [
  ['notneed', '经验的这一特征，并不需要一个外在的对象'],
  ['notexist', '外在的对象不存在'],
];

type Sum = 'none' | 'criteria' | 'nothing';
const SUMS: [Sum, string][] = [
  ['none', '心识之外的物质对象不存在'],
  ['criteria', '对方提出的四个标准，不能证明心识之外有物质对象'],
  ['nothing', '什么都不存在，连心识也不存在'],
];
const SUM_FB: Record<Sum, { ok: boolean; t: string }> = {
  criteria: { ok: true, t: '四个例子拆掉的是对方的理由：确定的地点和时间、共同的经验、实际的作用，都可以在没有外物的情况下出现。外物"不存在"还需要别的论证，世亲接着给出了简约的论证和原子论的困难。' },
  none: { ok: false, t: '这是世亲的结论，但不是这四个回答单独能证明的。一个反例只能说明"这个特征不需要外物"；要说外物不存在，还需要下面的论证。' },
  nothing: { ok: false, t: '世亲没有这样说。他否认的是"认识之外的物质对象"，并不否认心识，也不否认其他众生的心识之流（第 18 颂）。' },
};

type Arg = 'parsimony' | 'atoms' | 'time' | 'waking' | 'others';
interface ArgData {
  t: string;
  srcs: { src: string; orig: string; zh: string }[];
  shows: { b: Basis; who?: string; t: string };
  open: { b: Basis; who?: string; t: string };
}
const ARGS: Record<Arg, ArgData> = {
  parsimony: {
    t: '简约：业的结果在哪里？',
    srcs: [
      {
        src: '世亲《唯识二十论》第 7 颂',
        orig: 'karmaṇo vāsanānyatra phalam anyatra kalpyate | tatraiva neṣyate yatra vāsanā kiṃ nu kāraṇaṃ || 7 ||',
        zh: '业的习气在一处，你却设想它的结果在另一处；不承认结果就在习气所在的地方，到底是什么理由呢？',
      },
    ],
    shows: { b: 'course', t: '业的习气在心识之流中；最简单的解释是，结果也在心识之流中。另外设想一种由业产生、却在心识之外的物质，是多余的。' },
    open: { b: 'scholar', who: 'SEP《瑜伽行派》', t: '学者的读法有三种：最佳解释的推论；依赖一个"简约原则"；只说明了外物"没有必要"，而没有证明外物"不存在"。' },
  },
  atoms: {
    t: '原子论的困难',
    srcs: [
      {
        src: '世亲《唯识二十论》第 11 颂',
        orig: 'na tad ekaṃ na cānekaṃ viṣayaḥ paramāṇuśaḥ | na ca te saṃhatā yasmāt paramāṇur na sidhyati || 11 ||',
        zh: '（认识的）对象不是一个东西，也不是由许多极微（分别构成）的，也不是由这些极微聚合而成的，因为极微不能成立。',
      },
    ],
    shows: { b: 'text', who: '第 12 颂的两难', t: '一个极微若同时与六个方向的极微相接，就必须有六个部分；若没有部分，六个极微就会占据同一个位置。极微要么可分，要么不能组成有大小的东西。' },
    open: { b: 'course', t: '它针对的是"不可分的物质单位"这一具体理论，并不直接证明心识之外没有任何东西；世亲是把它和前面的论证合在一起使用的。' },
  },
  time: {
    t: '知觉与时间',
    srcs: [
      {
        src: '世亲《唯识二十论》第 16 颂后半',
        orig: "sā ca yadā tadā | na so 'rtho dṛśyate tasya pratyakṣatvaṃ kathaṃ mataṃ || 16 ||",
        zh: '当（"这是我所知觉的"这一）认识出现时，那个对象已经不再被看见了；怎么能认为它是被知觉的呢？',
      },
    ],
    shows: { b: 'course', t: '"这是被知觉的"这个判断出现时，那个"看见"已经过去了（依据刹那灭的学说），所以这个判断本身并不是知觉。记忆的内容同样是先前那个表象的显现，也不能证明外物。' },
    open: { b: 'course', t: '这个论证依赖刹那灭的学说；不接受这一学说的对手，不会接受第一步。' },
  },
  waking: {
    t: '为什么人们不知道？',
    srcs: [
      {
        src: '世亲《唯识二十论》第 17 颂后半',
        orig: "svapnadṛgviṣayābhāvaṃ nāprabuddho 'vigacchati || 17 ||",
        zh: '没有醒来的人，不知道梦中所见的对象并不存在。',
      },
    ],
    shows: { b: 'course', t: '在梦中我们也不知道自己在做梦；只有通过修行"醒来"的人，才知道醒时所见的对象也不存在。' },
    open: { b: 'course', t: '唯识的主张最终要靠觉悟来证实，而不只是靠论证。下面正理派的批评，正是针对这一点。' },
  },
  others: {
    t: '不是唯我论',
    srcs: [
      {
        src: '世亲《唯识二十论》第 18 颂前半',
        orig: 'anyonyādhipatitvena vijñaptiniyamo mithaḥ |',
        zh: '由于（不同心识之流）互相起支配的作用，表象之间互相确定。',
      },
    ],
    shows: { b: 'text', who: '第 18 颂', t: '众生的心识之流彼此影响。世亲的立场不是"只有我的心存在"，而是"只有心识之流存在，而且有许多个"。' },
    open: { b: 'course', t: '心识之流怎样互相影响而不经过外物，这一颂只给出了原则；后来法称写了《成他相续论》，专门论证其他心识之流的存在。' },
  },
};

type Wake = 'daily' | 'awake';
const WAKES: [Wake, string][] = [
  ['daily', '日常的醒：我们现在就拥有的'],
  ['awake', '觉悟：通过出世间的智慧真正"醒来"'],
];
const WAKE_FB: Record<Wake, string> = {
  daily: '如果"醒"是日常的醒，正理派的论证很有力：我们不能用日常经验来证明日常经验全都是梦。',
  awake: '如果"醒"是觉悟，世亲的立场就不能被正理派的论证驳倒；但代价是，它的最终证实依赖于一种大多数人没有的经验。',
};

type Row = 'deny' | 'order' | 'god' | 'soul' | 'aim';
const ROWS: { k: Row; t: string; v: string; b: string; kant: string; fb: string; key: boolean }[] = [
  { k: 'deny', t: '是否否认心外的物质对象', v: '否认', b: '否认（"存在就是被感知"）', kant: '不否认"物自体"，但认为我们只能认识显现', fb: '这一行世亲和贝克莱相近，和康德不同；但学者中有一种"认识论的"读法，认为世亲只是说我们不能认识心外之物，这种读法更接近康德。', key: false },
  { k: 'order', t: '经验的秩序从哪里来', v: '业的习气；众生之间的相互影响', b: '神把观念有秩序地放进我们心中', kant: '心灵的先天形式（时间、空间、范畴）', fb: '三者的回答都不同；这一行说明"唯心论"一词遮蔽了解释秩序的方式。', key: false },
  { k: 'god', t: '是否有神', v: '没有创造或维持世界的神', b: '有，而且是关键', kant: '理论理性不能证明神的存在', fb: '这是和贝克莱最重要的差别之一：贝克莱的体系没有神就不能成立，世亲的体系里没有这样的神。', key: true },
  { k: 'soul', t: '是否有实体性的灵魂', v: '没有，只有心识之流', b: '有，心灵是精神实体', kant: '理论理性不能证明灵魂是实体', fb: '这是另一个关键差别：世亲的心识之流本身也是刹那生灭、没有自性的东西，不是一个精神实体。', key: true },
  { k: 'aim', t: '理论的目的', v: '解脱：消除对"能取"和"所取"的执着', b: '反对怀疑论和无神论', kant: '为科学知识划定范围，为道德和信仰留出位置', fb: '世亲的论证是为一个修行的目的服务的，这一点比整张表都重要。', key: false },
];

interface Saved {
  obj: Obj;
  shows: Partial<Record<Obj, Shows>>;
  sum: Sum | null;
  arg: Arg;
  wake: Wake | null;
  row: Row | null;
}
const INIT: Saved = { obj: 'place', shows: {}, sum: null, arg: 'parsimony', wake: null, row: null };

export default function YogacaraLab() {
  const [st, save] = useSavedIx<Saved>('IN4', ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const o = OBJS.find((x) => x.k === st.obj) ?? OBJS[0];
  const shown = st.shows?.[o.k];
  const answered = OBJS.filter((x) => st.shows?.[x.k]).length;
  const a = ARGS[st.arg] ?? ARGS.parsimony;
  const sumFb = st.sum ? SUM_FB[st.sum] : null;
  const row = ROWS.find((r) => r.k === st.row);

  return (
    <section className="md c3 c5" aria-labelledby="yl-title">
      <header className="md-head">
        <p className="md-tag">唯识二十论 · 知觉实验室</p>
        <h3 id="yl-title" className="md-title">
          没有外物，经验还能这样吗？
        </h3>
        <p className="md-lede">世亲的主张是"唯有表象"。先逐一检查对方的四个反驳和世亲的反例，判断每个反例到底证明了什么；再看世亲的进一步论证各自确立了什么、留下了什么；最后看正理派的实在论反驳，以及"唯心论"这个标签在哪里会误导。</p>
      </header>
      <Src
        src="世亲《唯识二十论》第 1 颂"
        lang="sa"
        orig="vijñaptimātram evedam asadarthāvabhāsanāt | yadvat taimirikasyāsat keśoṇḍukādidarśanaṃ || 1 ||"
        zh="这一切唯是表象，因为它显现为不存在的对象；就像患眼翳的人看见不存在的毛发等等。"
      />

      <Band>一 · 四个反驳，四个反例</Band>
      <Src
        src="世亲《唯识二十论》第 2 颂"
        lang="sa"
        orig="na deśakālaniyamaḥ saṃtānāniyamo na ca | na ca kṛtyakriyā yuktā vijñaptir yadi nārthataḥ || 2 ||"
        zh="如果表象不是由对象而来，那么地点和时间的确定、（不同）心识之流的不确定，以及（对象的）作用，都不能成立。"
      />
      <Seg name="yl-obj" label="选择一个反驳" value={st.obj} opts={OBJS.map((x) => [x.k, x.t] as const)} onPick={(v) => set({ obj: v })} />
      <div className="c5-row">
        <p>
          <b>对方问：</b>
          {o.q}
        </p>
        <p>
          <b>世亲的反例：</b>
          {o.ex} <Tag b="text" who={o.v} />
        </p>
        <p className="md-fb-k">这个反例证明了什么？</p>
        <Seg name={'yl-shows-' + o.k} label="这个反例证明了什么" col value={shown ?? null} opts={SHOWS} onPick={(v) => set({ shows: { ...st.shows, [o.k]: v } })} />
        {shown && (
          <p className="md-feedback" aria-live="polite">
            <Verdict ok={shown === 'notneed'} yes="反例能证明的" no="反例证明不了" />
            {shown === 'notneed'
              ? '一个反例说明：这一特征可以在没有外物的情况下出现，所以对方不能用它来证明外物。'
              : '一个反例只能说明这一特征"不需要"外物，不能说明外物"不存在"。'}{' '}
            这个例子对承认饿鬼、地狱的佛教对手有效；现代读者可以换成海市蜃楼，但海市蜃楼有外在的物理原因，不能完全替代。 <Tag b="course" />
          </p>
        )}
      </div>
      {st.obj === 'place' && (
        <Src
          src="世亲《唯识二十论》第 3 颂（电子本中与注释交错，连起来读）"
          lang="sa"
          orig="deśādiniyamaḥ siddhaḥ svapnavat … pretavat punaḥ | saṃtānāniyamaḥ … sarvaiḥ pūyanadyādidarśane || 3 ||"
          zh="地点等的确定，就像梦一样（得以成立）；而（不同心识之流的）不确定，就像饿鬼一样：（因为）大家都看见脓河等等。"
        />
      )}
      <p className="md-muted">已判断 {answered} / 4 个反例。</p>
      <p className="md-fb-k">四个回答合起来，证明了什么？</p>
      <Seg name="yl-sum" label="四个回答合起来证明了什么" col value={st.sum} opts={SUMS} onPick={(v) => set({ sum: v })} />
      {sumFb && (
        <p className="md-feedback" aria-live="polite">
          <Verdict ok={sumFb.ok} yes="恰当的结论" no="推得太远" />
          <Tag b="course" />
          {sumFb.t}
        </p>
      )}

      <Band>二 · 进一步的论证：确立了什么，留下了什么</Band>
      <Seg name="yl-arg" label="选择一个论证" value={st.arg} opts={(Object.keys(ARGS) as Arg[]).map((k) => [k, ARGS[k].t] as const)} onPick={(v) => set({ arg: v })} />
      <div aria-live="polite">
        {a.srcs.map((s) => (
          <Src key={s.src} src={s.src} lang="sa" orig={s.orig} zh={s.zh} />
        ))}
        <Claim b={a.shows.b} who={a.shows.who}>
          确立了：{a.shows.t}
        </Claim>
        <Claim b={a.open.b} who={a.open.who}>
          留下了：{a.open.t}
        </Claim>
      </div>

      <Band>三 · 实在论者的反驳：梦的论证预设了醒</Band>
      <p>
        《正理经》4.2.31—35 讨论一种"知识像梦一样"的立场。它没有说出对方是谁；把它和世亲放在一起，是学派层面的整理，不是说双方直接交过锋。 <Tag b="school" who="本章的整理" />
      </p>
      <Src src="《正理经》4.2.34" lang="sa" orig="smṛtisaṃkalpavacca svapnaviṣayābhimānaḥ" zh="对梦中对象的认定，就像记忆和想象一样。" />
      <Src
        src="伐差耶那《正理经疏》4.2.34"
        lang="sa"
        orig="yaḥ suptaḥ svapnaṃ paśyati sa eva jāgrat svapnadarśanāni pratisandhatta idam adrākṣam iti"
        zh="在睡眠中做梦的人，正是这个人醒来以后把梦中所见连接起来，说：“我看见了这个。”"
      />
      <ol className="ix-steps">
        <li>要说梦中的对象不存在，必须有一个可以和梦对照的认识。<Tag b="text" who="伐差耶那对 4.2.33、4.2.34 的解释" /></li>
        <li>这个认识就是醒时的认识；它把梦中所见连接起来，判断梦是假的。<Tag b="text" who="伐差耶那对 4.2.34 的解释" /></li>
        <li>如果醒时的认识也像梦一样不可靠，就没有任何认识能判断梦是假的。<Tag b="course" who="由 1、2 推出" /></li>
        <li>而且，梦和一切错误都依赖于先前真实的知觉作为材料和原型。<Tag b="text" who="4.2.34 及伐差耶那的“主要的所依”" /></li>
        <li className="is-stop">所以，"醒时的一切都像梦"这一论证自我取消。<Tag b="course" /></li>
      </ol>
      <Claim b="school" who="世亲对第 4 步的回答（第 16 颂后的注释）">记忆中出现的，是先前那个"显现为对象"的表象，而不是外物本身；错误和梦确实依赖于先前的经验，但先前的经验本身也只是表象。</Claim>
      <Claim b="school" who="世亲对第 1—3 步的回答（第 17 颂）">世亲接受"梦的概念预设了醒"，但他把那个"醒"推到了更高的一层。</Claim>
      <p className="md-fb-k">争论的关键在于：判断"梦是假的"的那个"醒"是什么？</p>
      <Seg name="yl-wake" label="醒是什么" col value={st.wake} opts={WAKES} onPick={(v) => set({ wake: v })} />
      {st.wake && (
        <p className="md-feedback" aria-live="polite">
          <Tag b="course" who="本章的评价" />
          {WAKE_FB[st.wake]} 本章的看法是：这一争论没有一方取得决定性的胜利；它显示出，瑜伽行派的论证和修行是不能分开来评价的。
        </p>
      )}

      <Band>四 · "唯心论"这个标签在哪里误导？</Band>
      <Seg name="yl-row" label="选择比较的一行" col value={st.row} opts={ROWS.map((r) => [r.k, r.t] as const)} onPick={(v) => set({ row: v })} />
      {row && (
        <div className="c5-row" aria-live="polite">
          <table className="ip-sort">
            <caption className="visually-hidden">{row.t}</caption>
            <thead>
              <tr>
                <th scope="col">世亲《唯识二十论》</th>
                <th scope="col">贝克莱</th>
                <th scope="col">康德</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{row.v}</td>
                <td>{row.b}</td>
                <td>{row.kant}</td>
              </tr>
            </tbody>
          </table>
          <p className="md-feedback">
            <span className={'c5-verdict ' + (row.key ? 'c5-verdict--no' : 'c5-verdict--open')}>{row.key ? '标签在这里最容易误导' : '标签在这里不够精确'}</span>
            <Tag b="course" who="本章的整理，参考 SEP 瑜伽行派条目" />
            {row.fb}
          </p>
        </div>
      )}
      <p className="md-muted">SEP 把现代解释大致分为认识论或现象学的读法，以及形而上学（本体论）的读法；两类都有严肃的学者支持，本章不作裁决。</p>

      <Limits>
        <p>这不是一个"唯识对不对"的判定器。每个反例、每个论证都来自正文读过的颂文；"确立了什么，留下了什么"是本章的说明，标了出来。世亲的例子（饿鬼、地狱）是对佛教对手有效的例子，不是现代意义上的经验证据。</p>
        <p>瑜伽行派不等于贝克莱：没有神，也没有实体性的心灵；世亲也不是唯我论者。正理派和世亲的对照是学派层面的整理。</p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
