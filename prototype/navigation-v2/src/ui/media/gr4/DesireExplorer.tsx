import { Seg, Src, SrcToggle, useSaved } from './shared';
import '../gr1/gr1.css';
import './gr4.css';

// 二 · after "欲望的分类" and "这是禁欲主义吗？". Two tasks:
//  一 classify a desire: the learner first asks Epicurus' two questions
//     (Vatican Sayings 71: what happens if it is / is not fulfilled; does it
//     have a natural limit, KD 15), then places the desire in one of the three
//     classes (Letter to Menoeceus 127; KD 29). The ancient examples are the
//     scholion to KD 29 as the chapter reports it; the modern ones are the
//     chapter's own (its phone example) and are labelled so, with their limits.
//  二 choose prudently: three choices, each compared by what follows, not by
//     a score, to show why the aim is not the largest immediate pleasure
//     (Letter to Menoeceus 129—132, paraphrased in the chapter; KD 3, 18).
// No numbers, no happiness score; one card is marked open.

type Cls = 'nn' | 'nu' | 'empty';
const CLS: Record<Cls, string> = { nn: '自然而必要', nu: '自然而不必要', empty: '空洞的（既不自然也不必要）' };
type Pain = 'body' | 'variety' | 'opinion';
type Limit = 'yes' | 'no';

interface Card {
  id: string;
  t: string;
  /** 'ancient' = scholion to KD 29 as reported; 'course' = the chapter's own example. */
  from: 'ancient' | 'course';
  cls: Cls | 'open';
  pain: Pain;
  limit: Limit;
  why: string;
  limits?: string;
}

const CARDS: Card[] = [
  {
    id: 'water',
    t: '渴了，想喝水',
    from: 'ancient',
    cls: 'nn',
    pain: 'body',
    limit: 'yes',
    why: '不满足会有身体的痛苦；喝够了，渴就停止，而且水很容易得到。《主要学说》第 29 条附注举的正是这个例子。',
  },
  {
    id: 'feast',
    t: '想吃一顿昂贵的大餐',
    from: 'ancient',
    cls: 'nu',
    pain: 'variety',
    limit: 'yes',
    why: '饿了要吃饭是自然的；但"昂贵"并不消除更多的痛苦，只是让快乐"变化花样"（《主要学说》第 18 条）。可以享受，只是不要依赖。',
  },
  {
    id: 'statue',
    t: '想有人为自己树立一座雕像',
    from: 'ancient',
    cls: 'empty',
    pain: 'opinion',
    limit: 'no',
    why: '附注把"花冠和雕像"列为既不自然也不必要的欲望：它来自"空洞的意见"，得到了一座，还会想要更大、更多的荣誉。',
  },
  {
    id: 'phone',
    t: '需要一部能用的手机来上课、和家人联系',
    from: 'course',
    cls: 'nn',
    pain: 'body',
    limit: 'yes',
    why: '本章的看法：在今天的条件下，它大概接近"必要"：没有它，有时确实无法完成学业或保持联系；有了一部能用的，这个需要就满足了。',
    limits: '这正是这一分类的限度：伊壁鸠鲁的"必要"是为古代生活设想的，今天什么是必要的，往往取决于社会的组织方式。注意它的不满足带来的困扰并不是饥渴那样的身体痛苦，这里只是说它在今天接近必要。',
  },
  {
    id: 'newest',
    t: '想要最新款的手机，因为"同学都有，我没有就丢脸"',
    from: 'course',
    cls: 'empty',
    pain: 'opinion',
    limit: 'no',
    why: '本章的看法：要一部手机可能是必要的，要最新款大概只是"变化花样"；而"没有就丢脸"这个理由，核心是空洞的意见：明年还会有更新的款式。',
    limits: '一个欲望可能混合了几类：同一件东西，既有必要的部分，也有空洞的部分。用伊壁鸠鲁的问题来分析自己的欲望，不等于接受他关于什么是必要的具体判断。',
  },
  {
    id: 'esteem',
    t: '想被所有人认可，比别人更受尊敬',
    from: 'course',
    cls: 'empty',
    pain: 'opinion',
    limit: 'no',
    why: '本章正文的例子："我应当被所有人尊敬"。这样的欲望没有自然的终点：总还有人不认可你，总还有人比你更受尊敬。',
  },
  {
    id: 'friend',
    t: '想有一个可以倾诉的朋友',
    from: 'course',
    cls: 'open',
    pain: 'opinion',
    limit: 'yes',
    why: '这一张没有现成的答案。伊壁鸠鲁把友爱看得极高："在智慧为了整个一生的幸福所准备的一切东西中，最重要的远远是友爱的获得"（《主要学说》第 27 条）；但《主要学说》第 29 条的三分法并没有给友爱归类，友爱"从益处开始"、又"因为它自身而值得选择"（《梵蒂冈格言集》第 23 条），本身就是一个理论难题（见正文"友爱"一节）。',
  },
];

const PAIN: [Pain, string][] = [
  ['body', '会有身体上的痛苦（饥、渴、冷），或者无法维持基本的生活'],
  ['variety', '不会痛苦，只是少了一种"花样"'],
  ['opinion', '会难受，但难受来自"我应当……"、"别人会怎么看"这样的想法'],
];
const LIMIT: [Limit, string][] = [
  ['yes', '有：满足了，它就停止'],
  ['no', '没有：得到了，还会想要更多'],
];

interface Choice {
  id: string;
  q: string;
  opts: { t: string; now: string; after: string; calm: string }[];
  /** Index of the option an Epicurean would probably recommend. */
  pick: number;
  note: string;
}
const CHOICES: Choice[] = [
  {
    id: 'party',
    q: '考试前一晚，朋友邀你去通宵聚会。（本章编的例子）',
    opts: [
      { t: '去，玩到天亮', now: '当下的快乐很强烈', after: '第二天疲惫、考砸的可能更大', calm: '之后几天可能被后悔和担心困扰' },
      { t: '早点睡，考完再约朋友吃顿饭', now: '当下少了一次热闹', after: '考试时精神好；考完后的聚会没有后顾之忧', calm: '少了一个日后烦扰的来源' },
    ],
    pick: 1,
    note: '伊壁鸠鲁说，不是每一种快乐都应当选择：有些快乐会带来更大的痛苦，所以要对快乐和痛苦"衡量比较"（《致美诺凯乌斯的信》129—130，转述）。这里比较的不是两种快乐谁更强烈，而是哪一种选择之后，身体和灵魂更少受到烦扰。',
  },
  {
    id: 'table',
    q: '你可以选择日常的饮食习惯。（本章依据《致美诺凯乌斯的信》130—131 的转述编的例子）',
    opts: [
      { t: '每天都要吃得最好、最贵', now: '每一餐都很享受', after: '花费很大；吃不到时就觉得匮乏', calm: '越来越依赖它，害怕失去它' },
      { t: '平时吃简单的饭，偶尔享受一次大餐', now: '平时的饭很普通', after: '身体健康；偶尔的大餐反而更享受', calm: '对命运的变化少一些恐惧' },
    ],
    pick: 1,
    note: '伊壁鸠鲁说，习惯于简单的生活，一能使身体健康，在生活必需品面前不犹豫；二能使人偶尔遇到奢华的东西时更能享受，而且对命运无所畏惧（130—131，转述）。关键是"不依赖"，不是"拒绝"。',
  },
  {
    id: 'dentist',
    q: '牙已经隐隐作痛一段时间了。（本章编的例子）',
    opts: [
      { t: '拖着，先不去看牙医', now: '避开了治疗时的痛和麻烦', after: '小问题可能变成大问题', calm: '一直有一个担心挂在心上' },
      { t: '现在就去看，忍一时的痛', now: '治疗时有痛苦', after: '问题解决，不再隐隐作痛', calm: '去掉了一个持续的烦扰' },
    ],
    pick: 1,
    note: '"有些痛苦会带来更大的快乐"（129—130，转述）：选择一种痛苦，是为了消除更持久的痛苦。这说明伊壁鸠鲁的快乐主义不是"总是选当下最舒服的"，而是要靠实践智慧来判断。',
  },
];

const ID = 'desire-explorer';
type Task = 'classify' | 'choose';
interface Saved {
  task: Task;
  card: string;
  pain: Record<string, Pain>;
  limit: Record<string, Limit>;
  cls: Record<string, Cls>;
  choice: Record<string, number>;
}
const INIT: Saved = { task: 'classify', card: 'water', pain: {}, limit: {}, cls: {}, choice: {} };

export default function DesireExplorer() {
  const [st, save] = useSaved<Saved>(ID, INIT);
  const c = CARDS.find((x) => x.id === st.card) ?? CARDS[0];
  const pain = st.pain[c.id];
  const limit = st.limit[c.id];
  const cls = st.cls[c.id];
  const done = CARDS.filter((x) => st.cls[x.id]).length;

  return (
    <section className="md g4" aria-labelledby="de-title">
      <header className="md-head">
        <p className="md-tag">分类与判断</p>
        <h3 id="de-title" className="md-title">
          伊壁鸠鲁的欲望检查
        </h3>
        <p className="md-lede">
          两项任务：先用伊壁鸠鲁自己的两个问题检查一个欲望，再把它归入三类之一；然后比较三组选择的后果，看为什么伊壁鸠鲁的目标不是"尽可能多的眼前的快乐"。不计分，选择只保存在这台设备上。
        </p>
      </header>

      <Seg
        name="de-task"
        label="任务"
        value={st.task}
        opts={[
          ['classify', '一、给欲望分类'],
          ['choose', '二、比较选择的后果'],
        ]}
        onPick={(v) => save({ ...st, task: v })}
      />

      {st.task === 'classify' && (
        <div className="g4-panel">
          <fieldset className="cs-group">
            <legend>选一个欲望（已分类 {done} / {CARDS.length}）</legend>
            <Seg
              name="de-card"
              col
              value={c.id}
              opts={CARDS.map((x) => [x.id, (st.cls[x.id] ? '✓ ' : '') + x.t + (x.from === 'course' ? '（本章编的例子）' : '（据《主要学说》第 29 条附注）')] as const)}
              onPick={(v) => save({ ...st, card: v })}
            />
          </fieldset>

          <ol className="g4-steps">
            <li>
              <fieldset className="cs-group">
                <legend>第一问：如果它没有实现，会怎样？</legend>
                <Seg name={'de-pain-' + c.id} col value={pain} opts={PAIN} onPick={(v) => save({ ...st, pain: { ...st.pain, [c.id]: v } })} />
              </fieldset>
            </li>
            <li>
              <fieldset className="cs-group">
                <legend>第二问：这个欲望有没有自然的终点？</legend>
                <Seg name={'de-limit-' + c.id} value={limit} opts={LIMIT} onPick={(v) => save({ ...st, limit: { ...st.limit, [c.id]: v } })} />
              </fieldset>
            </li>
            <li>
              <fieldset className="cs-group" disabled={!pain || !limit}>
                <legend>{!pain || !limit ? '先回答上面两问，再归类' : '你把它归入哪一类？'}</legend>
                <Seg
                  name={'de-cls-' + c.id}
                  value={cls}
                  opts={(Object.keys(CLS) as Cls[]).map((k) => [k, CLS[k]] as const)}
                  onPick={(v) => save({ ...st, cls: { ...st.cls, [c.id]: v } })}
                />
              </fieldset>
            </li>
          </ol>

          {cls && (
            <div className="md-feedback" aria-live="polite">
              <p className="md-fb-k">
                {c.cls === 'open'
                  ? '这一张是开放的：你的归类可以辩护，下面说明为什么难。'
                  : cls === c.cls
                    ? `${c.from === 'ancient' ? '与附注的归类一致' : '与本章的看法一致'}：${CLS[c.cls]}。`
                    : `${c.from === 'ancient' ? '附注' : '本章'}把它归为：${CLS[c.cls]}。`}
              </p>
              {c.cls !== 'open' && (pain !== c.pain || limit !== c.limit) && (
                <p className="md-muted">
                  对照你的两个回答：
                  {pain !== c.pain && `第一问，伊壁鸠鲁式的回答更可能是"${PAIN.find((p) => p[0] === c.pain)![1]}"。`}
                  {limit !== c.limit && `第二问，更可能是"${LIMIT.find((p) => p[0] === c.limit)![1]}"。`}
                  两个问题的回答，决定了归类。
                </p>
              )}
              <p>{c.why}</p>
              {c.limits && (
                <p>
                  <b>限度：</b>
                  {c.limits}
                </p>
              )}
              <SrcToggle label="看希腊原文（《致美诺凯乌斯的信》127；《梵蒂冈格言集》第 71 条；《主要学说》第 15 条）">
                <Src
                  src="《致美诺凯乌斯的信》127"
                  lang="grc"
                  orig="τῶν ἐπιθυμιῶν αἱ μέν εἰσι φυσικαί, αἱ δὲ κεναί, καὶ τῶν φυσικῶν αἱ μὲν ἀναγκαῖαι, αἱ δὲ φυσικαὶ μόνον."
                  zh="欲望中，有些是自然的，有些是空洞的；自然的欲望中，有些是必要的，有些只是自然的。"
                />
                <Src
                  src="《梵蒂冈格言集》第 71 条"
                  lang="grc"
                  orig="Πρὸς πάσας τὰς ἐπιθυμίας προσακτέον τὸ ἐπερώτημα τοῦτο· τί μοι γενήσεται ἂν τελεσθῇ τὸ κατὰ τὴν ἐπιθυμίαν ἐπιζητούμενον, καὶ τί ἐὰν μὴ τελεσθῇ;"
                  zh="对每一个欲望，都要提出这个问题：如果这个欲望所追求的东西实现了，我会怎样？如果没有实现，又会怎样？"
                />
                <Src
                  src="《主要学说》第 15 条"
                  lang="grc"
                  orig="Ὁ τῆς φύσεως πλοῦτος καὶ ὥρισται καὶ εὐπόριστός ἐστιν· ὁ δὲ τῶν κενῶν δοξῶν εἰς ἄπειρον ἐκπίπτει."
                  zh="自然的财富有界限，而且容易获得；空洞意见的财富却会坠入无限。"
                />
              </SrcToggle>
            </div>
          )}
        </div>
      )}

      {st.task === 'choose' && (
        <div className="g4-panel">
          {CHOICES.map((ch) => {
            const v = st.choice[ch.id];
            return (
              <fieldset key={ch.id} className="cs-group g4-case">
                <legend>{ch.q}</legend>
                <Seg
                  name={'de-ch-' + ch.id}
                  value={v}
                  opts={ch.opts.map((o, i) => [i, o.t] as const)}
                  onPick={(i) => save({ ...st, choice: { ...st.choice, [ch.id]: i } })}
                />
                {v === undefined ? (
                  <p className="md-muted">先选一个，再看两种选择的后果。</p>
                ) : (
                  <div className="md-feedback" aria-live="polite">
                    <table className="g4-table">
                      <caption className="visually-hidden">两种选择的后果比较</caption>
                      <thead>
                        <tr>
                          <th scope="col">选择</th>
                          <th scope="col">当下</th>
                          <th scope="col">之后</th>
                          <th scope="col">对安宁</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ch.opts.map((o, i) => (
                          <tr key={i} className={i === v ? 'is-mine' : ''}>
                            <th scope="row">
                              {o.t}
                              {i === v && <small>（你的选择）</small>}
                            </th>
                            <td>{o.now}</td>
                            <td>{o.after}</td>
                            <td>{o.calm}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="md-fb-k">
                      {v === ch.pick ? '伊壁鸠鲁派很可能也会这样选。' : `伊壁鸠鲁派更可能选"${ch.opts[ch.pick].t}"。`}
                    </p>
                    <p>{ch.note}</p>
                  </div>
                )}
              </fieldset>
            );
          })}
          {Object.keys(st.choice).length === CHOICES.length && (
            <div className="md-feedback">
              <p className="md-fb-k">为什么不是"尽可能多的快乐"？</p>
              <p>
                伊壁鸠鲁说，快乐有一个上限：痛苦一旦消除，快乐就到了顶点，此后只能"变化花样"。所以，好的生活不是不断加大快乐的量，而是消除痛苦和纷扰，再加上清醒的推理：它"探究一切选择和回避的理由"（《致美诺凯乌斯的信》132，转述）。
              </p>
              <SrcToggle label="看希腊原文（《主要学说》第 3、18 条）">
                <Src src="《主要学说》第 3 条" lang="grc" orig="Ὅρος τοῦ μεγέθους τῶν ἡδονῶν ἡ παντὸς τοῦ ἀλγοῦντος ὑπεξαίρεσις." zh="快乐的大小的界限，就是一切痛苦的消除。" />
                <Src
                  src="《主要学说》第 18 条"
                  lang="grc"
                  orig="Οὐκ ἐπαύξεται ἐν τῇ σαρκὶ ἡ ἡδονή, ἐπειδὰν ἅπαξ τὸ κατʼ ἔνδειαν ἀλγοῦν ἐξαιρεθῇ, ἀλλὰ μόνον ποικίλλεται."
                  zh="一旦由于缺乏而引起的痛苦被消除了，身体的快乐就不会再增加，只会变化花样。"
                />
              </SrcToggle>
            </div>
          )}
        </div>
      )}

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        恢复初始状态
      </button>
      <p className="md-note">
        <b>这个练习的限度。</b>伊壁鸠鲁没有给出一个计算快乐的公式，这里也不打分。现代的例子是本章编的，归类是本章的看法；古代的例子据《主要学说》第 29 条后的附注，那段附注很可能是后人加的。"后果"栏是对一般情况的描述，具体的人和处境可能不同。用伊壁鸠鲁的问题检查自己的欲望，不等于接受他关于"必要"的具体判断，也不能代替面对真实困难时的专业帮助。
      </p>
    </section>
  );
}
