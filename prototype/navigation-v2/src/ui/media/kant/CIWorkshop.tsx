import { useState } from 'react';
import { getMedia, setMedia } from '../../../state/store';

// 想一想（六）as a workshop on the four-step test (the O'Neill/Rawls
// reconstruction used in 四 · 普遍法则公式). Two of Kant's own examples are
// walked through as the chapter explains them; the two exercise cases are
// worked by the learner, whose own judgments are shown back. The tool never
// decides whether an action is right or wrong, and never scores.

type CaseId = 'promise' | 'nohelp' | 'fare' | 'praise';
type Judge = 'yes' | 'no' | 'unsure';

interface Worked {
  id: 'promise' | 'nohelp';
  label: string;
  maxim: string;
  universal: string;
  s3: string;
  s4?: string;
  out: string;
}

const WORKED: Worked[] = [
  {
    id: 'promise',
    label: '康德例 · 虚假承诺',
    maxim: '当我认为自己缺钱时，我就借钱，并且承诺归还，虽然我知道永远不会归还。',
    universal: '每个人在认为自己缺钱时，都借钱并作出明知不会兑现的承诺。',
    s3: '不能。康德说，那会使承诺本身以及人们想通过承诺达到的目的都不可能：没有人会再相信承诺。我的计划需要“人们相信承诺”这种做法存在，准则一旦普遍化，这种做法就不存在了。准则连设想都设想不通。',
    out: '在第 ③ 步失败：对应完全义务（不许做虚假承诺，不容许为了爱好而破例）。',
  },
  {
    id: 'nohelp',
    label: '康德例 · 从不帮助别人',
    maxim: '我不去伤害任何人，但也不去帮助任何人。',
    universal: '每个人都既不伤害别人，也不帮助别人。',
    s3: '能。这样一个世界可以设想，人类甚至可能过得不坏。',
    s4: '不能。康德认为你不能意愿这样一个世界成为法则，因为你自己也可能有需要别人帮助的时候。',
    out: '通过第 ③ 步，在第 ④ 步失败：对应不完全义务（把帮助他人当作自己的目的之一；何时、帮助谁、帮多少，留有余地）。',
  },
];

// The two exercise cases. Step ① offers three ways of writing the maxim (one
// faithful to the stated reason, one padded with irrelevant detail, one too
// general), because "does the wording change the result?" is the exercise's
// own self-check. Steps ③ and ④ offer a judgment together with a reason; the
// reasons are positions, not answers, and each comes with a short comment.
interface Choice {
  id: string;
  text: string;
  note: string;
}
interface MaximChoice extends Choice {
  universal: string;
  /** The maxim the learner is checking is the honest one. */
  faithful?: boolean;
}
interface StepChoice extends Choice {
  verdict: Judge;
}
interface ExCase {
  id: 'fare' | 'praise';
  label: string;
  prompt: string;
  maxims: MaximChoice[];
  s3: StepChoice[];
  s4: StepChoice[];
}

const EXERCISES: ExCase[] = [
  {
    id: 'fare',
    label: '练习（1）· 逃票',
    prompt: '为了省钱，我坐公交车时逃票。',
    maxims: [
      {
        id: 'f1',
        text: '坐公交车时，为了省钱，我不买票就乘车。',
        universal: '每个人坐公交车时，为了省钱，都不买票就乘车。',
        faithful: true,
        note: '如实写出了情况（坐公交车）、目的（省钱）和行动（不买票）。',
      },
      {
        id: 'f2',
        text: '在星期二傍晚、乘 23 路车、车上很挤时，为了省钱，我不买票就乘车。',
        universal: '每个人在星期二傍晚、乘 23 路车、车上很挤时，为了省钱，都不买票就乘车。',
        note: '把情况写得这么具体，普遍化以后几乎不影响公交运营，似乎就能通过。可“星期二”“23 路”并不是你逃票的理由：这正是本章说的随意拼凑准则的问题。',
      },
      {
        id: 'f3',
        text: '为了得到我想要的东西，我不付钱。',
        universal: '每个人为了得到想要的东西，都不付钱。',
        note: '写得太宽：它把顺手拿走商品、欠钱不还都包了进去，检验的已经不是你这次行动的理由。',
      },
    ],
    s3: [
      {
        id: 'no-s3',
        verdict: 'no',
        text: '不能：如果每个人都不买票，公交收不到票款、无法运营，“乘坐别人付费维持的公交车”这种做法本身就不存在了。',
        note: '这和虚假承诺的结构相似：你的计划依赖一种做法存在，准则普遍化以后这种做法就没了。要注意，这个结论依赖一个背景条件：公交靠票款维持。',
      },
      {
        id: 'bad-s3',
        verdict: 'no',
        text: '不能：如果每个人都逃票，后果会很糟。',
        note: '这是后果式的说法。按本章采用的读法，第 ③ 步问的不是后果好不好，而是你的准则在那样的世界里还能不能被一致地设想。',
      },
      {
        id: 'yes-s3',
        verdict: 'yes',
        text: '能：比如公交完全由税收补贴，人人不买票，车照样开。',
        note: '这提醒你：结论取决于背景制度。本章介绍的“形式主义”批评说的正是这类情形：公式本身不能告诉我们某种制度是否应当存在。',
      },
      {
        id: 'unsure-s3',
        verdict: 'unsure',
        text: '拿不准：这取决于公交怎样维持运营。',
        note: '合理的犹豫。拿不准的地方，往往正是准则和它所依赖的背景该怎样写清楚的问题。',
      },
    ],
    s4: [
      {
        id: 'no-s4',
        verdict: 'no',
        text: '不能：我自己也依赖一个有人付费、能维持下去的公交系统，不能一贯地意愿人人都逃票。',
        note: '你会发现这个理由和第 ③ 步的理由很接近：两步之间的界线有时并不清楚。',
      },
      {
        id: 'yes-s4',
        verdict: 'yes',
        text: '能：在一个公交免费的世界里，我愿意人人都这样做。',
        note: '如果你真能一贯地意愿这样的世界，那么你检验的其实已经是“公交免费”这一制度，而不是逃票本身。',
      },
    ],
  },
  {
    id: 'praise',
    label: '练习（2）· 违心的称赞',
    prompt: '为了不让朋友难过，我说他的画很好看，虽然我觉得一般。',
    maxims: [
      {
        id: 'p1',
        text: '朋友给我看他的画、我觉得一般时，为了不让他难过，我对他说画很好看。',
        universal: '每个人在朋友给自己看画、自己觉得一般时，为了不让朋友难过，都说画很好看。',
        faithful: true,
        note: '如实写出了情况、目的和行动，包括“我其实觉得一般”这个关键。',
      },
      {
        id: 'p2',
        text: '为了不让别人难过，我说假话。',
        universal: '每个人为了不让别人难过，都说假话。',
        note: '写得太宽：它把善意的客套和严重的欺骗（比如隐瞒病情）放在一起检验，结论很难说是关于你这次行动的。',
      },
      {
        id: 'p3',
        text: '朋友给我看他的画时，为了不让他难过，我挑出画里我真心觉得好的地方来称赞。',
        universal: '每个人在朋友给自己看画时，为了不让朋友难过，都挑出画里自己真心觉得好的地方来称赞。',
        note: '这已经换了一个行动：不再说违心的话。它很可能通过检验，但检验的不是原来的准则。这正是“换一种写法，结果会不会变”的问题；它也提示了一条出路：有时能找到不说谎也不伤人的做法。',
      },
    ],
    s3: [
      {
        id: 'no-s3',
        verdict: 'no',
        text: '不能：如果人人都在这种时候说违心的称赞，称赞就不再传达真实的评价，我想用称赞安慰朋友的目的也达不到。',
        note: '结构和虚假承诺相似。但有人会说：这类客气话在生活中本来就不被当作严格的评价，“称赞失去信用”未必会发生。',
      },
      {
        id: 'yes-s3',
        verdict: 'yes',
        text: '能：人人在这种场合说客气话的世界可以设想，大家都把它理解为客气。',
        note: '若是这样，问题就转到第 ④ 步。它也说明：这句话在这个语境里算不算“说谎”，本身就需要判断。',
      },
      {
        id: 'unsure-s3',
        verdict: 'unsure',
        text: '拿不准：这取决于这句客气话算不算真正的说谎。',
        note: '本章提到，康德在《论出于人类之爱而说谎的所谓权利》中对说谎极为严格；但这篇短文首先讨论的是法权问题，它与康德一般理论的关系本身需要论证。',
      },
    ],
    s4: [
      {
        id: 'no-s4',
        verdict: 'no',
        text: '不能：我自己也希望朋友对我的作品说真话，我才知道该怎样改进。',
        note: '这和“从不帮助别人”的例子结构相似：你自己也会需要别人的真话。',
      },
      {
        id: 'yes-s4',
        verdict: 'yes',
        text: '能：我愿意生活在一个人们在小事上彼此照顾情绪的世界里。',
        note: '这是一个可以辩护的回答。要注意它的范围：它说的是“小事上的客气”，一旦涉及对方需要真实信息的场合（比如作品要去参赛），答案可能就变了。',
      },
    ],
  },
];

/** Option ids chosen at each step. Earlier builds stored typed text here
 *  (c, e, a, s3why, s4why) and "yes"/"no" judgments; those values match no
 *  option id below and are simply ignored. */
interface Work {
  m?: string;
  s3?: string;
  s4?: string;
}
interface Saved {
  pick: CaseId;
  work: Partial<Record<'fare' | 'praise', Work>>;
}

const ID = 'ci-workshop';

function ChoiceRow({ name, legend, options, value, onPick }: { name: string; legend: string; options: Choice[]; value?: string; onPick: (v: string) => void }) {
  const picked = options.find((o) => o.id === value);
  return (
    <fieldset className="cs-group ci-choice">
      <legend>{legend}</legend>
      {options.map((o) => (
        <label key={o.id} className={'ox-opt' + (value === o.id ? ' is-on' : '')}>
          <input type="radio" name={name} checked={value === o.id} onChange={() => onPick(o.id)} />
          <span>{o.text}</span>
        </label>
      ))}
      {picked && (
        <p className="ox-fb" aria-live="polite">
          {picked.note}
        </p>
      )}
    </fieldset>
  );
}

export default function CIWorkshop() {
  const [st, setSt] = useState<Saved>(() => getMedia<Saved>('EA4', ID, { pick: 'promise', work: {} }));
  const [step, setStep] = useState(1);
  const save = (next: Saved) => {
    setSt(next);
    setMedia('EA4', ID, next);
  };
  const choose = (pick: CaseId) => {
    save({ ...st, pick });
    setStep(1);
  };
  const worked = WORKED.find((w) => w.id === st.pick);
  const ex = EXERCISES.find((x) => x.id === st.pick);
  const w: Work = ex ? (st.work[ex.id] ?? {}) : {};
  // Only the current fields are written back, so old typed text is dropped on the next change.
  const edit = (patch: Work) => {
    if (!ex) return;
    const next = { ...w, ...patch };
    save({ ...st, work: { ...st.work, [ex.id]: { m: next.m, s3: next.s3, s4: next.s4 } } });
  };

  const maxim = ex?.maxims.find((m) => m.id === w.m);
  // Later steps count only after a maxim is chosen (old saved judgments never do).
  const s3 = maxim ? ex?.s3.find((o) => o.id === w.s3) : undefined;
  const s4 = s3 ? ex?.s4.find((o) => o.id === w.s4) : undefined;
  const path = !s3
    ? ''
    : s3.verdict === 'no'
      ? '你的判断：准则普遍化以后无法被一致地设想（第 ③ 步不通过）。按这种重构，对应完全义务。'
      : s3.verdict === 'unsure' || s4?.verdict === 'unsure'
        ? '你在某一步拿不准。这很正常：普遍法则公式不是一台自动给出答案的机器。拿不准的地方，往往正是准则该怎样写的问题。'
        : s4?.verdict === 'no'
          ? '你的判断：可以设想，却不能一贯地意愿（第 ④ 步不通过）。按这种重构，对应不完全义务。'
          : s4?.verdict === 'yes'
            ? '你的判断：两步都通过。按这种重构，这条准则可以允许。'
            : '';

  return (
    <section className="md ci" aria-labelledby="ci-title">
      <header className="md-head">
        <p className="md-tag">动手检验</p>
        <h3 id="ci-title" className="md-title">
          定言命令工作坊：四步检验一条准则
        </h3>
        <p className="md-lede">
          先跟着康德的两个例子走一遍，再检验练习里的两种行为。步骤采用正文介绍的学者重构（奥尼尔、罗尔斯），不是康德原文的结构。每一步都从几个选项中选择；工具不替你判断对错，也不计分，选择只保存在这台设备上。
        </p>
      </header>

      <div className="md-seg ci-cases" role="radiogroup" aria-label="选择一个例子">
        {[...WORKED, ...EXERCISES].map((x) => (
          <label key={x.id} className={'md-seg-opt' + (st.pick === x.id ? ' is-on' : '')}>
            <input type="radio" name="ci-case" checked={st.pick === x.id} onChange={() => choose(x.id)} />
            <span>{x.label}</span>
          </label>
        ))}
      </div>

      {worked && (
        <div className="ci-worked">
          <ol className="ci-steps">
            <li className={step >= 1 ? 'is-on' : ''}>
              <p className="ci-k">① 写出准则</p>
              <p className="ci-q">{worked.maxim}</p>
            </li>
            {step >= 2 && (
              <li className="is-on">
                <p className="ci-k">② 普遍化</p>
                <p>{worked.universal}</p>
              </li>
            )}
            {step >= 3 && (
              <li className="is-on">
                <p className="ci-k">③ 这样的世界能被无矛盾地设想吗？</p>
                <p>{worked.s3}</p>
              </li>
            )}
            {step >= 4 && worked.s4 && (
              <li className="is-on">
                <p className="ci-k">④ 你能无矛盾地意愿这样的世界吗？</p>
                <p>{worked.s4}</p>
              </li>
            )}
            {step >= 4 && (
              <li className="is-on ci-out">
                <p>{worked.out}</p>
              </li>
            )}
          </ol>
          {step < 4 ? (
            <button type="button" className="btn btn--small ci-next" onClick={() => setStep(step + 1)}>
              下一步 →
            </button>
          ) : (
            <button type="button" className="md-reset" onClick={() => setStep(1)}>
              从头再走一遍
            </button>
          )}
        </div>
      )}

      {ex && (
        <div className="ci-ex">
          <p className="ci-prompt">
            <span className="ci-k">要检验的行为</span>“{ex.prompt}”
          </p>
          <div className="ci-step">
            <ChoiceRow
              name={'ci-m-' + ex.id}
              legend="① 准则：在情况 C 下，为了目的 E，我做 A。哪一种表述最如实？"
              options={ex.maxims}
              value={w.m}
              onPick={(v) => edit({ m: v, s3: undefined, s4: undefined })}
            />
            {maxim && !maxim.faithful && (
              <p className="md-muted">你可以先用这种写法检验下去，再回来换成如实的写法，比较两次的结果。</p>
            )}
          </div>
          {maxim && (
            <>
              <div className="ci-step">
                <p className="ci-k">② 普遍化</p>
                <p>{maxim.universal}</p>
              </div>
              <div className="ci-step">
                <ChoiceRow
                  name={'ci-s3-' + ex.id}
                  legend="③ 这样的世界能被无矛盾地设想吗？选一个判断和理由"
                  options={ex.s3}
                  value={w.s3}
                  onPick={(v) => edit({ s3: v, s4: undefined })}
                />
              </div>
              {s3 && s3.verdict === 'yes' && (
                <div className="ci-step">
                  <ChoiceRow
                    name={'ci-s4-' + ex.id}
                    legend="④ 你能无矛盾地意愿这样的世界吗？选一个判断和理由"
                    options={ex.s4}
                    value={w.s4}
                    onPick={(v) => edit({ s4: v })}
                  />
                </div>
              )}
            </>
          )}
          <div className="md-feedback" aria-live="polite">
            {!path ? (
              <p className="md-muted">选好准则的写法，再回答第 ③ 步（必要时第 ④ 步），这里会整理你的检验路径。</p>
            ) : (
              <>
                <p className="md-fb-k">{path}</p>
                <p className="md-fb-k">自查（正文的三个问题）</p>
                <ul className="md-fb-list">
                  <li>你的准则是否如实表达了你行动的理由？</li>
                  <li>换一种表述（更具体或更一般），检验结果会不会改变？第 ① 步的另外两种表述就是这样的例子。</li>
                  <li>这对普遍法则公式意味着什么？正文的提醒：如何界定“真正的准则”，本身就需要判断。</li>
                </ul>
                <p className="md-fb-k">再换一个公式看</p>
                <p>用人性公式重看一遍：你的行为是否让某个人处在他作为有理性者无法同意的位置？这是“仅仅当作手段”的常见解释，不是康德原文给出的检验。</p>
              </>
            )}
            <button type="button" className="md-reset" onClick={() => save({ ...st, work: { ...st.work, [ex.id]: {} } })}>
              清空这一题
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
