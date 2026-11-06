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

const EXERCISES: { id: 'fare' | 'praise'; label: string; prompt: string; hint: [string, string, string] }[] = [
  { id: 'fare', label: '练习（1）· 逃票', prompt: '为了省钱，我坐公交车时逃票。', hint: ['坐公交车时', '为了省钱', '我逃票'] },
  { id: 'praise', label: '练习（2）· 违心的称赞', prompt: '为了不让朋友难过，我说他的画很好看，虽然我觉得一般。', hint: ['朋友给我看他的画、我觉得一般时', '为了不让他难过', '我说画很好看'] },
];

const JUDGE: [Judge, string][] = [
  ['yes', '能'],
  ['no', '不能'],
  ['unsure', '拿不准'],
];

interface Work {
  c?: string;
  e?: string;
  a?: string;
  s3?: Judge;
  s3why?: string;
  s4?: Judge;
  s4why?: string;
}
interface Saved {
  pick: CaseId;
  work: Partial<Record<'fare' | 'praise', Work>>;
}

const ID = 'ci-workshop';

function JudgeRow({ name, legend, value, onPick }: { name: string; legend: string; value?: Judge; onPick: (v: Judge) => void }) {
  return (
    <fieldset className="cs-group">
      <legend>{legend}</legend>
      <div className="md-seg">
        {JUDGE.map(([v, label]) => (
          <label key={v} className={'md-seg-opt' + (value === v ? ' is-on' : '')}>
            <input type="radio" name={name} checked={value === v} onChange={() => onPick(v)} />
            <span>{label}</span>
          </label>
        ))}
      </div>
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
  const edit = (patch: Work) => ex && save({ ...st, work: { ...st.work, [ex.id]: { ...w, ...patch } } });

  const maxim = w.c && w.e && w.a ? `在${w.c}，${w.e}，${w.a}。` : '';
  // Universalized: the agent becomes "every rational agent" (我 → 自己).
  const self = (s: string) => s.replace(/我/g, '自己');
  const universal = w.c && w.e && w.a ? `每个人在${self(w.c)}，${self(w.e)}，都${self(w.a.replace(/^\s*我/, ''))}。` : '';
  const path =
    w.s3 === 'no'
      ? '你的判断：准则普遍化以后无法被一致地设想（第 ③ 步不通过）。按这种重构，对应完全义务。'
      : w.s3 === 'yes' && w.s4 === 'no'
        ? '你的判断：可以设想，却不能一贯地意愿（第 ④ 步不通过）。按这种重构，对应不完全义务。'
        : w.s3 === 'yes' && w.s4 === 'yes'
          ? '你的判断：两步都通过。按这种重构，这条准则可以允许。'
          : w.s3 === 'unsure' || w.s4 === 'unsure'
            ? '你在某一步拿不准。这很正常：普遍法则公式不是一台自动给出答案的机器。拿不准的地方，往往正是准则该怎样写的问题。'
            : '';

  return (
    <section className="md ci" aria-labelledby="ci-title">
      <header className="md-head">
        <p className="md-tag">动手检验</p>
        <h3 id="ci-title" className="md-title">
          定言命令工作坊：四步检验一条准则
        </h3>
        <p className="md-lede">
          先跟着康德的两个例子走一遍，再检验练习里的两种行为。步骤采用正文介绍的学者重构（奥尼尔、罗尔斯），不是康德原文的结构。工具不替你判断对错，也不计分；你写下的内容只保存在这台设备上。
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
            <p className="ci-k">① 写出准则：在情况 C 下，为了目的 E，我做 A</p>
            <div className="ci-fields">
              {(
                [
                  ['c', '情况 C', ex.hint[0]],
                  ['e', '目的 E', ex.hint[1]],
                  ['a', '行动 A', ex.hint[2]],
                ] as const
              ).map(([k, label, ph]) => (
                <label key={k} className="ci-field">
                  <span>{label}</span>
                  <input type="text" value={w[k] ?? ''} placeholder={'例：' + ph} onChange={(e) => edit({ [k]: e.target.value })} />
                </label>
              ))}
            </div>
            {maxim && <p className="ci-q">你的准则：{maxim}</p>}
          </div>
          {universal && (
            <>
              <div className="ci-step">
                <p className="ci-k">② 普遍化</p>
                <p>{universal}</p>
              </div>
              <div className="ci-step">
                <JudgeRow name={'ci-s3-' + ex.id} legend="③ 这样的世界能被无矛盾地设想吗？" value={w.s3} onPick={(v) => edit({ s3: v })} />
                <textarea className="ci-why" rows={2} aria-label="第 ③ 步的理由" placeholder="写下理由" value={w.s3why ?? ''} onChange={(e) => edit({ s3why: e.target.value })} />
              </div>
              {w.s3 && w.s3 !== 'no' && (
                <div className="ci-step">
                  <JudgeRow name={'ci-s4-' + ex.id} legend="④ 你能无矛盾地意愿这样的世界吗？" value={w.s4} onPick={(v) => edit({ s4: v })} />
                  <textarea className="ci-why" rows={2} aria-label="第 ④ 步的理由" placeholder="写下理由" value={w.s4why ?? ''} onChange={(e) => edit({ s4why: e.target.value })} />
                </div>
              )}
            </>
          )}
          <div className="md-feedback" aria-live="polite">
            {!path ? (
              <p className="md-muted">填完准则的三个部分，再回答第 ③ 步（必要时第 ④ 步），这里会整理你的检验路径。</p>
            ) : (
              <>
                <p className="md-fb-k">{path}</p>
                <p className="md-fb-k">自查（正文的三个问题）</p>
                <ul className="md-fb-list">
                  <li>你的准则是否如实写出了你行动的理由？</li>
                  <li>换一种写法（更具体或更一般），检验结果会不会改变？试着把情况 C 写得非常具体，看看会发生什么。</li>
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
