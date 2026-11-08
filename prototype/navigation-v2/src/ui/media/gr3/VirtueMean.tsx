import { useState } from 'react';
import { getMedia, setMedia } from '../../../state/store';
import '../gr1/gr1.css';
import './gr3.css';

// 六 · after "中道不等于温和" and its examples. Three tasks:
//  一 "relative to us": Milo's food (1106b3—4) and the chapter's 100-yuan
//     gift show that the arithmetic midpoint is not the mean; a short check
//     that some actions and feelings have no mean at all (1107a8—12).
//  二 in a situation: two of the chapter's kind of anger cases, each with a
//     circumstance that can change. The learner chooses the response they
//     would defend, then sees every response read through the five "oughts"
//     (1106b21—23). Some responses are marked as open, with the competing
//     considerations, instead of being given a verdict.
//  三 motive and character: the same act done from three motives, read
//     through the three conditions of 1105a31—33.
// The cases are the chapter's own (content/GR3_SAMPLE_DRAFT.md, 六); the
// verdicts are its reading, not a rule, and the note at the end says so.

type Verdict = 'lack' | 'mean' | 'excess' | 'open';
const VERDICT: Record<Verdict, string> = {
  lack: '不足',
  mean: '可以辩护为中道',
  excess: '过度',
  open: '有争议',
};
const OUGHTS = ['时间', '对象', '人', '目的', '方式'] as const;
type Ought = (typeof OUGHTS)[number];

interface Reading {
  v: Verdict;
  at: Ought[];
  t: string;
}
interface Case {
  id: string;
  zh: string;
  setup: string;
  /** The circumstance that can change, and its two values. */
  toggle: [string, string, string];
  responses: string[];
  /** Readings per circumstance (0 or 1), one per response. */
  read: [Reading[], Reading[]];
}

const CASES: Case[] = [
  {
    id: 'bully',
    zh: '街上有人欺凌孩子',
    setup: '你在街上看到一个成年人推搡、辱骂一个小孩。',
    toggle: ['当时的情况', '周围还有其他人，可以一起出面', '只有你一个人，对方高大，情绪激动'],
    responses: [
      '当作没看见，走开',
      '心里不舒服，事后向朋友抱怨几句',
      '感到愤怒，立即出声制止，并请人帮忙或报警',
      '怒火冲天，冲上去和对方扭打',
      '记下对方的样子，过几天找上门去报复',
    ],
    read: [
      [
        { v: 'lack', at: ['对象', '人'], t: '对应当愤怒的事不愤怒。亚里士多德说这样的人"似乎没有感觉"，对亲人受辱袖手旁观是"奴性的"（1126a4—8）。' },
        { v: 'lack', at: ['时间', '方式'], t: '有了感受，但时间和方式都不对：孩子需要的是现在有人出面。' },
        { v: 'mean', at: [], t: '感受强烈，指向应当的对象，为了保护孩子，方式有效。这里的中道离"不愤怒"很远，离"暴怒"反而更近。' },
        { v: 'open', at: ['方式'], t: '有人在旁边可以帮忙，直接动手不是唯一有效的方式，而且可能使孩子受伤。但如果对方正在打孩子，迅速的身体介入也许正是需要的。要看当时的危险有多急。' },
        { v: 'excess', at: ['时间', '目的'], t: '时机已过，目的也变了：不再是保护孩子，而是报复。' },
      ],
      [
        { v: 'lack', at: ['对象', '人'], t: '仍然是不足。危险可以改变应当怎样做，但不能使"什么也不做"变成恰当。' },
        { v: 'open', at: ['方式', '时间'], t: '危险使立即出面的代价变大。有人会说，事后报警或找人帮忙已经是一个人能做的；也有人会说，至少应当当场出声。这取决于你能判断的危险有多大。' },
        { v: 'mean', at: [], t: '出声制止并立刻求助，在不必冒不必要危险的前提下保护孩子。在这个情况下，它很可能正是有实践智慧的人会做的。' },
        { v: 'excess', at: ['方式'], t: '一个人冲上去和高大、激动的对方扭打，很可能使孩子和自己都更危险。勇敢更接近鲁莽，但鲁莽仍然是过度。' },
        { v: 'excess', at: ['时间', '目的'], t: '同上：时机已过，目的变成了报复。' },
      ],
    ],
  },
  {
    id: 'meeting',
    zh: '会议上被当众嘲笑',
    setup: '你在一次会议上报告时说错了一个数字。一位与会者当众拿这件事开了一个刻薄的玩笑，有几个人笑了。',
    toggle: ['这件事', '第一次发生，对方平时并无恶意', '对方已经多次这样针对你'],
    responses: [
      '笑一笑，什么也不说，以后也不提',
      '当场平静地改正数字，会后私下告诉对方这样不妥',
      '当场严肃地说："请就事论事。"',
      '当场大发雷霆，指责对方人品',
      '以后找机会在别人面前说他的坏话',
    ],
    read: [
      [
        { v: 'open', at: ['对象'], t: '一次无心的玩笑，也许不值得生气；但如果完全不在意自己受到的不尊重，又接近"不愤怒"的缺点。这取决于玩笑有多刻薄、对你的工作有没有影响。' },
        { v: 'mean', at: [], t: '感受和表达都与事情的分量相称：改正了错误，也让对方知道界线。' },
        { v: 'open', at: ['时间', '方式'], t: '对第一次、没有恶意的玩笑，当场严肃回应可能略重；但有人会认为当众的嘲笑就应当当众回应。两种看法都可以辩护。' },
        { v: 'excess', at: ['方式', '对象'], t: '愤怒的程度和方式都超出了事情本身：被嘲笑的是一个数字，被指责的却是对方的人品。' },
        { v: 'excess', at: ['时间', '目的', '方式'], t: '时间、目的和方式都不对：这是报复，而且是在背后。' },
      ],
      [
        { v: 'lack', at: ['对象', '时间'], t: '对方多次这样做，再沉默就是"忍受侮辱"（1126a4—8），也让这种行为继续下去。' },
        { v: 'open', at: ['时间'], t: '平静而有效，但已经是第几次了？如果私下说过没有用，也许需要更公开的方式。' },
        { v: 'mean', at: [], t: '多次之后，当场、清楚、只针对行为本身的回应，与事情的分量相称。' },
        { v: 'open', at: ['方式'], t: '愤怒是有理由的，但指责人品会把问题从"这样做不对"变成私人冲突。有人认为多次之后，这样的强烈反应已经可以理解；但"可以理解"不等于"恰当"。' },
        { v: 'excess', at: ['时间', '目的', '方式'], t: '仍然是报复，而且在背后。' },
      ],
    ],
  },
];

const MOTIVES: { t: string; ok: boolean; fb: string }[] = [
  {
    t: '他知道孩子有危险，觉得这时应当出面，就出面了；他一向如此。',
    ok: true,
    fb: '三个条件都满足：他知道自己在做什么；他选择这样做，是为了这件事本身；"他一向如此"表明这出自稳定的品质。',
  },
  {
    t: '他注意到旁边有人在拍视频，想借此在网上出名。',
    ok: false,
    fb: '做的是勇敢的事，但不是出于勇敢：他选择这样做，是为了别的东西（出名），而不是为了这件事本身。',
  },
  {
    t: '他本来想走开，是同伴硬拉着他去的。',
    ok: false,
    fb: '像在父母要求下归还东西的孩子：这件事本身是对的，但他还不是在出于德性行动。也许做得多了，他会逐渐成为这样的人。',
  },
];

const NOMEAN: { t: string; has: boolean }[] = [
  { t: '愤怒', has: true },
  { t: '给出钱财', has: true },
  { t: '面对危险时的恐惧', has: true },
  { t: '嫉妒', has: false },
  { t: '偷窃', has: false },
];

const ID = 'virtue-mean';
type Task = 'relative' | 'situation' | 'motive';
interface Saved {
  task: Task;
  milo: (string | null)[];
  gift: string | null;
  nomean: (boolean | null)[];
  cs: string;
  circ: Record<string, 0 | 1>;
  choice: Record<string, number | null>;
  motive: number | null;
}
const INIT: Saved = {
  task: 'relative',
  milo: [null, null],
  gift: null,
  nomean: NOMEAN.map(() => null),
  cs: 'bully',
  circ: {},
  choice: {},
  motive: null,
};

function Seg<T extends string | number | boolean>({
  name,
  value,
  opts,
  onPick,
}: {
  name: string;
  value: T | null;
  opts: [T, string][];
  onPick: (v: T) => void;
}) {
  return (
    <div className="md-seg">
      {opts.map(([v, t]) => (
        <label key={String(v)} className={'md-seg-opt' + (value === v ? ' is-on' : '')}>
          <input type="radio" name={name} checked={value === v} onChange={() => onPick(v)} />
          <span>{t}</span>
        </label>
      ))}
    </div>
  );
}

function Grc({ src, grc, zh }: { src: string; grc: string; zh: string }) {
  return (
    <div className="lw-grc">
      <p className="pe-src">{src}</p>
      <p className="pe-orig" lang="grc">
        {grc}
      </p>
      <p className="pe-zh">本章试译：{zh}</p>
    </div>
  );
}

export default function VirtueMean() {
  const [st, setSt] = useState<Saved>(() => ({ ...INIT, ...getMedia<Partial<Saved>>('GR3', ID, INIT) }));
  const [open, setOpen] = useState<string | null>(null);
  const save = (next: Saved) => {
    setSt(next);
    setMedia('GR3', ID, next);
  };
  const toggleGrc = (k: string) => setOpen(open === k ? null : k);
  const c = CASES.find((x) => x.id === st.cs) ?? CASES[0];
  const circ = st.circ[c.id] ?? 0;
  const choice = st.choice[c.id] ?? null;
  const reads = c.read[circ];
  const miloOpts: [string, string][] = [
    ['few', '太少'],
    ['ok', '恰当'],
    ['many', '太多'],
  ];

  return (
    <section className="md vm" aria-labelledby="vm-title">
      <header className="md-head">
        <p className="md-tag">判断练习</p>
        <h3 id="vm-title" className="md-title">
          德性与中道
        </h3>
        <p className="md-lede">
          中道不是两个极端的算术中点，也不是一条可以照着算的规则。三项任务：先看"相对于我们的中间"是什么意思；再在具体情境中比较几种反应；最后看同一个行动，出于不同的动机，意味着什么。
        </p>
      </header>

      <div className="md-seg" role="radiogroup" aria-label="任务">
        {(
          [
            ['relative', '一、相对于我们'],
            ['situation', '二、在具体情境中'],
            ['motive', '三、动机与品质'],
          ] as [Task, string][]
        ).map(([k, t]) => (
          <label key={k} className={'md-seg-opt' + (st.task === k ? ' is-on' : '')}>
            <input type="radio" name="vm-task" checked={st.task === k} onChange={() => save({ ...st, task: k })} />
            <span>{t}</span>
          </label>
        ))}
      </div>

      {st.task === 'relative' && (
        <div className="vm-panel">
          <h4 className="vm-h">米隆的食物</h4>
          <p>
            十磅食物太多，两磅太少。两者的算术中点是六磅。
          </p>
          <div className="vm-scale" aria-hidden="true">
            <span style={{ left: '0%' }}>2</span>
            <span className="is-mid" style={{ left: '50%' }}>
              6
            </span>
            <span style={{ left: '100%' }}>10 磅</span>
          </div>
          {['摔跤手米隆（著名的大力士）', '一个刚开始锻炼的人'].map((who, i) => (
            <fieldset key={who} className="cs-group">
              <legend>对{who}来说，六磅是：</legend>
              <Seg
                name={'vm-milo-' + i}
                value={st.milo[i]}
                opts={miloOpts}
                onPick={(v) => save({ ...st, milo: st.milo.map((x, j) => (j === i ? v : x)) })}
              />
            </fieldset>
          ))}
          {st.milo.every((x) => x !== null) && (
            <div className="md-feedback" aria-live="polite">
              <p className="md-fb-k">
                {st.milo[0] === 'few' && st.milo[1] === 'many' ? '对。' : '亚里士多德的回答是：'}六磅"对于米隆来说太少，对于一个刚开始锻炼的人来说太多"。
              </p>
              <p>
                六是"事物本身的中间"；德性要找的是"相对于我们的中间"，要看是谁、在什么情况下。
              </p>
              <button type="button" className="md-disclose" aria-expanded={open === 'milo'} onClick={() => toggleGrc('milo')}>
                {open === 'milo' ? '收起希腊原文' : '看希腊原文（1106b3—7）'}
              </button>
              {open === 'milo' && (
                <>
                  <p className="vm-inline">
                    <span lang="grc">Μίλωνι μὲν γὰρ ὀλίγον, τῷ δὲ ἀρχομένῳ τῶν γυμνασίων πολύ</span>（1106b3—4）
                  </p>
                  <Grc
                    src="《尼各马可伦理学》第二卷第 6 章，1106b5—7"
                    grc="οὕτω δὴ πᾶς ἐπιστήμων τὴν ὑπερβολὴν μὲν καὶ τὴν ἔλλειψιν φεύγει, τὸ δὲ μέσον ζητεῖ καὶ τοῦθʼ αἱρεῖται, μέσον δὲ οὐ τὸ τοῦ πράγματος ἀλλὰ τὸ πρὸς ἡμᾶς."
                    zh="所以，每一个懂行的人都避开过度和不足，寻找中间并选择中间；但不是事物本身的中间，而是相对于我们的中间。"
                  />
                </>
              )}
            </div>
          )}

          <h4 className="vm-h">同样的一百元</h4>
          <fieldset className="cs-group">
            <legend>一个富人和一个穷人都捐了一百元。谁的捐赠更可能是慷慨的？（本章编的例子）</legend>
            <Seg
              name="vm-gift"
              value={st.gift}
              opts={[
                ['rich', '富人'],
                ['poor', '穷人'],
                ['same', '一样，都是一百元'],
              ]}
              onPick={(v) => save({ ...st, gift: v })}
            />
          </fieldset>
          {st.gift && (
            <div className="md-feedback" aria-live="polite">
              <p className="md-fb-k">{st.gift === 'poor' ? '对。' : '更可能是穷人。'}</p>
              <p>
                亚里士多德说，慷慨要看一个人的财产，而不是看给出去的数量（1120b7—9，转述）。对穷人来说，一百元可能是极大的慷慨；对富人来说，可能是吝啬。不过，单凭数额还不能下结论：还要看他为什么给、给了谁。
              </p>
            </div>
          )}

          <h4 className="vm-h">有没有中道？</h4>
          <p>下面哪些可以问"怎样才算恰当"，哪些不能？</p>
          {NOMEAN.map((n, i) => (
            <fieldset key={n.t} className="cs-group vm-row">
              <legend>{n.t}</legend>
              <Seg
                name={'vm-nm-' + i}
                value={st.nomean[i]}
                opts={[
                  [true, '有中道'],
                  [false, '没有中道'],
                ]}
                onPick={(v) => save({ ...st, nomean: st.nomean.map((x, j) => (j === i ? v : x)) })}
              />
              {st.nomean[i] !== null && (
                <span className="fc-fb">
                  <b>{st.nomean[i] === n.has ? '✓' : '✗'}</b> {n.has ? '有：可以在应当的时候、以应当的方式有这种感受或行为。' : '没有：它的名字本身就包含了坏。'}
                </span>
              )}
            </fieldset>
          ))}
          {st.nomean.every((x) => x !== null) && (
            <div className="md-feedback">
              <p>
                不能说"适度地偷窃"，或"对应当的人、在应当的时候嫉妒"。中道学说不是一个"在两个极端之间取中点"的机械规则。
              </p>
              <button type="button" className="md-disclose" aria-expanded={open === 'nomean'} onClick={() => toggleGrc('nomean')}>
                {open === 'nomean' ? '收起希腊原文' : '看希腊原文（1107a8—12）'}
              </button>
              {open === 'nomean' && (
                <Grc
                  src="《尼各马可伦理学》第二卷第 6 章，1107a8—12"
                  grc="οὐ πᾶσα δʼ ἐπιδέχεται πρᾶξις οὐδὲ πᾶν πάθος τὴν μεσότητα· ἔνια γὰρ εὐθὺς ὠνόμασται συνειλημμένα μετὰ τῆς φαυλότητος, οἷον ἐπιχαιρεκακία ἀναισχυντία φθόνος, καὶ ἐπὶ τῶν πράξεων μοιχεία κλοπὴ ἀνδροφονία"
                  zh="不是每一个行为、每一种感受都有中道。有些东西，它的名字本身就已经包含了坏，比如幸灾乐祸、无耻、嫉妒，以及在行为方面，通奸、偷窃、杀人。"
                />
              )}
            </div>
          )}
        </div>
      )}

      {st.task === 'situation' && (
        <div className="vm-panel">
          <fieldset className="cs-group">
            <legend>选一个情境（本章编的例子）</legend>
            <Seg name="vm-case" value={c.id} opts={CASES.map((x) => [x.id, x.zh] as [string, string])} onPick={(v) => save({ ...st, cs: v })} />
          </fieldset>
          <p className="vm-setup">{c.setup}</p>
          <fieldset className="cs-group">
            <legend>{c.toggle[0]}</legend>
            <Seg
              name={'vm-circ-' + c.id}
              value={circ}
              opts={[
                [0, c.toggle[1]],
                [1, c.toggle[2]],
              ]}
              onPick={(v) => save({ ...st, circ: { ...st.circ, [c.id]: v as 0 | 1 } })}
            />
          </fieldset>
          <fieldset className="cs-group">
            <legend>你会为哪一种反应辩护？</legend>
            <div className="md-seg gr-col">
              {c.responses.map((r, i) => (
                <label key={i} className={'md-seg-opt' + (choice === i ? ' is-on' : '')}>
                  <input
                    type="radio"
                    name={'vm-resp-' + c.id}
                    checked={choice === i}
                    onChange={() => save({ ...st, choice: { ...st.choice, [c.id]: i } })}
                  />
                  <span>{r}</span>
                </label>
              ))}
            </div>
          </fieldset>
          {choice === null ? (
            <p className="md-muted">先作出你自己的选择，再看本章对每一种反应的分析。</p>
          ) : (
            <div className="md-feedback" aria-live="polite">
              <p className="md-fb-k">
                {reads[choice].v === 'mean'
                  ? '本章也认为这一种可以辩护为中道。'
                  : reads[choice].v === 'open'
                    ? '这一种有争议：有理由为它辩护，也有理由反对。'
                    : `本章认为这一种是${VERDICT[reads[choice].v]}。`}
                试着改变上面"{c.toggle[0]}"，看分析怎样变化。
              </p>
              <ol className="vm-reads">
                {c.responses.map((r, i) => (
                  <li key={i} className={'vm-read vm-read--' + reads[i].v + (i === choice ? ' is-mine' : '')}>
                    <span className="vm-v">{VERDICT[reads[i].v]}</span>
                    <b>{r}</b>
                    {reads[i].at.length > 0 && <span className="vm-at">问题出在：{reads[i].at.join('、')}</span>}
                    <span className="vm-t">{reads[i].t}</span>
                  </li>
                ))}
              </ol>
              <p className="md-muted">
                五个"应当"：在应当的时候，对应当的事情，对应当的人，为了应当的目的，以应当的方式（1106b21—23）。中道是在这五个方面都恰如其分，而不是一个数量上的位置。
              </p>
              <button type="button" className="md-disclose" aria-expanded={open === 'anger'} onClick={() => toggleGrc('anger')}>
                {open === 'anger' ? '收起希腊原文' : '看希腊原文（1106b21—23，1126a4—8）'}
              </button>
              {open === 'anger' && (
                <>
                  <Grc
                    src="《尼各马可伦理学》第二卷第 6 章，1106b21—23"
                    grc="τὸ δʼ ὅτε δεῖ καὶ ἐφʼ οἷς καὶ πρὸς οὓς καὶ οὗ ἕνεκα καὶ ὡς δεῖ, μέσον τε καὶ ἄριστον, ὅπερ ἐστὶ τῆς ἀρετῆς."
                    zh="在应当的时候，对应当的事情，对应当的人，为了应当的目的，以应当的方式（有这些感受），这就是中间的，也是最好的，这正是德性的特点。"
                  />
                  <Grc
                    src="《尼各马可伦理学》第四卷第 5 章，1126a4—8"
                    grc="οἱ γὰρ μὴ ὀργιζόμενοι ἐφʼ οἷς δεῖ ἠλίθιοι δοκοῦσιν εἶναι, καὶ οἱ μὴ ὡς δεῖ μηδʼ ὅτε μηδʼ οἷς δεῖ· δοκεῖ γὰρ οὐκ αἰσθάνεσθαι οὐδὲ λυπεῖσθαι……τὸ δὲ προπηλακιζόμενον ἀνέχεσθαι καὶ τοὺς οἰκείους περιορᾶν ἀνδραποδῶδες."
                    zh="对应当愤怒的事情不愤怒的人，被认为是愚蠢的；不以应当的方式、在应当的时候、对应当的人愤怒的人，也是这样。因为这样的人似乎没有感觉，也不感到痛苦……忍受侮辱，对自己的亲人受辱袖手旁观，是奴性的。"
                  />
                </>
              )}
            </div>
          )}
        </div>
      )}

      {st.task === 'motive' && (
        <div className="vm-panel">
          <p className="vm-setup">三个人都在街上出声制止了欺凌孩子的人，做的事一模一样。</p>
          <fieldset className="cs-group">
            <legend>哪一个是出于勇敢这种德性而行动的？</legend>
            <div className="md-seg gr-col">
              {MOTIVES.map((m, i) => (
                <label key={i} className={'md-seg-opt' + (st.motive === i ? ' is-on' : '')}>
                  <input type="radio" name="vm-motive" checked={st.motive === i} onChange={() => save({ ...st, motive: i })} />
                  <span>{m.t}</span>
                </label>
              ))}
            </div>
          </fieldset>
          {st.motive !== null && (
            <div className="md-feedback" aria-live="polite">
              <p className="md-fb-k">{MOTIVES[st.motive].ok ? '对。' : '这一个还不是。'}</p>
              <ul className="md-fb-list">
                {MOTIVES.map((m, i) => (
                  <li key={i}>
                    <b>{m.ok ? '出于德性：' : '不是出于德性：'}</b>
                    {m.fb}
                  </li>
                ))}
              </ul>
              <p>
                亚里士多德区分了"做正义的事"和"作为正义的人去做"。行动的人必须：知道自己在做什么；选择这样做，并且为了这件事本身；从一种稳定的、不会动摇的状态出发。
              </p>
              <button type="button" className="md-disclose" aria-expanded={open === 'motive'} onClick={() => toggleGrc('motive')}>
                {open === 'motive' ? '收起希腊原文' : '看希腊原文（1105a31—33）'}
              </button>
              {open === 'motive' && (
                <Grc
                  src="《尼各马可伦理学》第二卷第 4 章，1105a31—33"
                  grc="πρῶτον μὲν ἐὰν εἰδώς, ἔπειτʼ ἐὰν προαιρούμενος, καὶ προαιρούμενος διʼ αὐτά, τὸ δὲ τρίτον ἐὰν καὶ βεβαίως καὶ ἀμετακινήτως ἔχων πράττῃ."
                  zh="第一，他知道（自己在做什么）；第二，他选择这样做，并且是为了这件事本身而选择它；第三，他是从一种稳定的、不会动摇的状态出发而做的。"
                />
              )}
            </div>
          )}
        </div>
      )}

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        恢复初始状态
      </button>
      <p className="md-note">
        <b>这个练习不是一种算法。</b>情境和反应是本章编的，对每一种反应的分析是本章的解读，不是亚里士多德的判决；标为"有争议"的地方，有理由的人会作出不同的判断。按亚里士多德的定义，中道"由有实践智慧的人会用来规定它的那种理性来规定"（1106b36—1107a2）：它要在具体情况中看出来，不能从一张表或一个公式中算出来。这里的几种情况只改变了一个条件，真实的情境要复杂得多。
      </p>
    </section>
  );
}
