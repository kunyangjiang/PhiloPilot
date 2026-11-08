import { Gu, Seg, SrcToggle, useSaved } from './shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import './cn2.css';

// 六 · after the step-by-step reading of 《白马论》. The learner picks a
// reading of "白马非马" and walks the five steps of the dialogue under it,
// seeing which steps the reading explains well and which it strains. The
// readings are the ones the chapter lists (SEP School of Names §6, as the
// chapter reports it), plus the plain "not a member" reading as a foil. The
// fit judgements are this exercise's own summary of the chapter's table, and
// say so; no reading is declared the right one.

const ID = 'white-horse';
type R = 'member' | 'identity' | 'universal' | 'whole' | 'words' | 'game';
type Fit = 'ok' | 'mid' | 'hard';
const FIT: Record<Fit, string> = { ok: '说得通', mid: '勉强', hard: '难以解释' };

interface Reading {
  label: string;
  who: string;
  fei: string;
  tool: string;
  modern: string;
  trouble: string;
  steps: [Fit, string][];
}
const READINGS: Record<R, Reading> = {
  member: {
    label: '"不属于"读法',
    who: '对照用：本练习设的最字面的读法，不是哪位学者的主张',
    fei: '"白马非马" = 一匹白马不是一匹马。',
    tool: '现代集合论的"属于"（∈）',
    modern: '"属于"是本课借用的现代说法，不是对话中的概念。',
    trouble: '照这种读法，主的话显然是错的，而客、主双方都不会这样理解。它的用处是提醒我们：先找一个能让对方说得通的读法。',
    steps: [
      ['mid', '"命色者，非命形也"只说明两个名称呼的东西不同，推不出一匹白马不是马。'],
      ['hard', '照这种读法，"求马"时白马也能牵来，第二步恰恰说明白马属于马，主自己驳倒了自己。'],
      ['hard', '主承认"馬固有色，故有白馬"，没有说白马不是马的一种。'],
      ['mid', '把"有马"和"有黄马"分开，并不推出黄马不属于马。'],
      ['hard', '"定所白"讨论的是"白"有没有确定，和"属于"无关。'],
    ],
  },
  identity: {
    label: '同一说',
    who: 'Cikoski、何莫邪（Harbsmeier）等',
    fei: '"白马非马" = 白马（这一类）不等于马（这一类）。',
    tool: '现代集合论的"相等"（=）与"范围"',
    modern: '"范围""集合"是本课的形式化；对话自己说的是"求马""應有馬"。',
    trouble: '最简单，也最能说明"求马"的论证；但第三、五步中"马与白""定所白"的说法，超出了"两类不相等"。',
    steps: [
      ['ok', '"马"和"白马"是不同的名，称呼的范围不同。'],
      ['ok', '这正是一个"相等"的检验：能回应"求马"的，不都能回应"求白马"，所以两者不相等。'],
      ['mid', '"白馬者，馬與白也"说的是"白马"由什么组成，不只是范围不同。'],
      ['ok', '客自己承认"有马"不等于"有黄马"，就该承认"白马"不等于"马"：这是一致性的要求。'],
      ['mid', '"定所白""不定所白"讲的是"白"附在什么上面，"相等"读法没有用到它。'],
    ],
  },
  universal: {
    label: '共相说',
    who: '冯友兰（1958）',
    fei: '"白马"所指的共相（白马性）不等于"马"所指的共相（马性）。',
    tool: '西方哲学的"共相"',
    modern: '"共相"是西方哲学的概念，用它来读古代汉语，是一种投射。据斯坦福哲学百科，欧美学者现在大体认为白马论不太可能涉及共相。',
    trouble: '能说明"命形""命色"和"不定所白"；但"求马"讲的是能不能牵来具体的马，不是共相。',
    steps: [
      ['ok', '"命形"和"命色"可以读成两种不同的共相：马性和白性。'],
      ['mid', '"黄、黑馬皆可致"讲的是具体的马能不能牵来，共相读法要多绕一步。'],
      ['ok', '"白者非馬也"可以读成：白性不是马性。'],
      ['mid', '黄马的反诘讲的是"有黄马"，和共相关系不大。'],
      ['ok', '"不定所白"可以读成：白性本身不附着在任何东西上。'],
    ],
  },
  whole: {
    label: '部分与整体说',
    who: '陈汉生（Hansen 1983）、葛瑞汉（1989）',
    fei: '"白马"是马和白合成的整体，不同于其中的部分"马"。',
    tool: '"部分与整体"的关系（常与"物质名词假说"连在一起）',
    modern: '"物质名词假说"有争议（见第三部分）；"整体""部分"在这里也是现代的整理。',
    trouble: '最能说明"白馬者，馬與白也"；但要接受一个关于古代汉语名词的、有争议的假说。',
    steps: [
      ['mid', '"命形""命色"可以读成整体中的两个成分，但这一步本身没有说到整体。'],
      ['ok', '马这个整体包括黄马，"马与白"这个整体不包括，所以两者不同。'],
      ['ok', '"馬與白也"直接说"白马"是马和白合在一起。'],
      ['ok', '"有黄马"的整体同样不同于"有马"的整体。'],
      ['mid', '"定所白"可以读成白附在马上形成一个新整体，但需要补充。'],
    ],
  },
  words: {
    label: '词语与对象说',
    who: 'Thompson（1995）等',
    fei: '讨论的是"白马"这个词和"马"这个词，而不是马本身：「白马」这个名不是「马」这个名。',
    tool: '现代语言哲学对"使用"和"提及"一个词的区分',
    modern: '古代汉语没有引号这类标示"提及一个词"的符号，这种读法依赖推测。',
    trouble: '能说明"所以命形""所以命色"这类谈论名称的话；但"求马""有马"讲的显然是马本身。',
    steps: [
      ['ok', '"馬者，所以命形也"本来就是在谈"马"这个名的用途。'],
      ['mid', '"黄、黑馬皆可致"是在牵马，不是在谈词。'],
      ['mid', '"馬與白也"可以读成名的组合，也可以读成东西的组合。'],
      ['ok', '"有马""有黄马"可以读成两个不同的说法。'],
      ['hard', '"定所白"讲的是白附在什么上面，很难只读成关于词的话。'],
    ],
  },
  game: {
    label: '辩论表演说',
    who: '斯坦福哲学百科"名家"条目的作者等',
    fei: '公孙龙以辩论表演博取名声，未必在提出一个严肃的论证。',
    tool: '不是一种逻辑重构，而是对文本性质的判断',
    modern: '这是现代学者对文本性质的判断；它和《庄子》《荀子》对辩者的描述相合。',
    trouble: '不必为每一步找深奥的理由；但对话的细致和前后呼应，又不像随口的诡辩。',
    steps: [
      ['ok', '一个令人吃惊的开场：把"命形"和"命色"分开。'],
      ['ok', '一个让对手难以回答的例子。'],
      ['ok', '把对方的反驳接过来，反过来用。'],
      ['ok', '指出对方自相矛盾，是辩论中常见的一招。'],
      ['mid', '"定所白"的区分相当精细，不太像只为取胜而说的话。'],
    ],
  },
};
const ORDER: R[] = ['member', 'identity', 'universal', 'whole', 'words', 'game'];

const STEPS: { t: string; src?: string; orig?: string; sum?: string }[] = [
  { t: '一、命形与命色', src: '《公孙龙子·白马论》', orig: '馬者，所以命形也；白者，所以命色也；命色者，非命形也。故曰白馬非馬。' },
  { t: '二、求马与求白马', src: '《公孙龙子·白马论》', orig: '求馬，黃、黑馬皆可致；求白馬，黃、黑馬不可致。使白馬乃馬也，是所求一也。' },
  { t: '三、马本来就有颜色', src: '《公孙龙子·白马论》', orig: '馬固有色，故有白馬。使馬無色，有馬如己耳，安取白馬？故白者非馬也。白馬者，馬與白也，白與馬也，馬與白馬也。' },
  { t: '四、反过来将对方一军', sum: '本课的概述：客把"有马"和"有黄马"分开，等于认为黄马不是马；却又认为白马是马，自相矛盾。' },
  { t: '五、"定所白"与"不定所白"', sum: '本课的概述：单说"白"，没有确定是什么东西的白；说"白马"，就确定了是马的白。"马"对颜色没有取舍，"白马"有取舍。' },
];

interface Saved {
  r: R;
  step: number;
  view: 'one' | 'grid';
}
const INIT: Saved = { r: 'identity', step: 1, view: 'one' };

function Model({ r }: { r: R }) {
  if (r === 'member' || r === 'identity') {
    return (
      <figure className="c2-model">
        <svg viewBox="0 0 300 150" className="c2-svg c2-svg--small" role="img" aria-label="现代集合图：马的范围包含白马的范围">
          <circle className="c2-set" cx={150} cy={75} r={66} />
          <circle className={'c2-set c2-set--in' + (r === 'identity' ? ' is-on' : '')} cx={120} cy={82} r={30} />
          <text className="c2-lbl" x={150} y={26} textAnchor="middle">
            马
          </text>
          <text className="c2-lbl" x={120} y={87} textAnchor="middle">
            白马
          </text>
          <circle className="c2-dot" cx={185} cy={70} r={5} />
          <text className="c2-lbl c2-lbl--s" x={185} y={95} textAnchor="middle">
            一匹黄马
          </text>
        </svg>
        <figcaption className="md-muted">
          {r === 'identity'
            ? '现代集合图（本课的形式化）：白马的范围在马的范围之内，但两者不相等，黄马在马之内、白马之外。'
            : '现代集合图（本课的形式化）：照"不属于"读法，主的话就是说白马在马的范围之外，这和图正好相反。'}
        </figcaption>
      </figure>
    );
  }
  const boxes: Record<Exclude<R, 'member' | 'identity'>, [string, string][]> = {
    universal: [
      ['马性', '"命形"'],
      ['白性', '"命色"'],
      ['白马性', '两者合成？'],
    ],
    whole: [
      ['马', '一个整体'],
      ['白', '另一个整体'],
      ['马与白', '合成的新整体'],
    ],
    words: [
      ['「马」', '一个名'],
      ['「白马」', '另一个名'],
      ['所称呼的马', '名之外的东西'],
    ],
    game: [
      ['开场', '惊人的论题'],
      ['交锋', '让对手难以回答'],
      ['取胜', '博取名声'],
    ],
  };
  return (
    <figure className="c2-model">
      <ol className="c2-chips">
        {boxes[r].map(([a, b]) => (
          <li key={a}>
            <b>{a}</b>
            <span>{b}</span>
          </li>
        ))}
      </ol>
      <figcaption className="md-muted">示意（本课的整理）：{READINGS[r].tool}。</figcaption>
    </figure>
  );
}

export default function WhiteHorseExplorer() {
  const [st, save] = useSaved<Saved>(ID, INIT);
  const R0 = READINGS[st.r];
  const step = Math.min(Math.max(st.step, 1), STEPS.length);
  const s = STEPS[step - 1];
  const [fit, why] = R0.steps[step - 1];
  const counts = (r: R) => (['ok', 'mid', 'hard'] as Fit[]).map((f) => READINGS[r].steps.filter(([x]) => x === f).length);

  return (
    <section className="md c2" aria-labelledby="wh-title">
      <header className="md-head">
        <p className="md-tag">读法比较</p>
        <h3 id="wh-title" className="md-title">
          "白马非马"：换一种读法，论证会怎样？
        </h3>
        <p className="md-lede">
          选一种读法，再一步一步走过《白马论》，看这种读法能把哪些步骤说通、在哪些步骤上为难。没有一种读法被当作标准答案；"说得通""勉强"是这个练习根据正文表格作的归纳。
        </p>
      </header>

      <Seg
        name="wh-view"
        label="看法"
        value={st.view}
        opts={[
          ['one', '一种读法，逐步看'],
          ['grid', '六种读法放在一起'],
        ]}
        onPick={(v) => save({ ...st, view: v })}
      />

      {st.view === 'one' && (
        <div className="g4-panel">
          <fieldset className="cs-group">
            <legend>读法</legend>
            <Seg name="wh-r" value={st.r} opts={ORDER.map((r) => [r, READINGS[r].label] as const)} onPick={(r) => save({ ...st, r })} />
          </fieldset>
          <div className="c2-card">
            <p className="g4-k">{R0.who}</p>
            <p>
              <b>"非"的意思：</b>
              {R0.fei}
            </p>
            <p className="g4-warn">
              <b>借用的工具：</b>
              {R0.tool}。{R0.modern}
            </p>
            <Model r={st.r} />
          </div>

          <fieldset className="cs-group">
            <legend>对话的五步</legend>
            <Seg name="wh-step" value={step} opts={STEPS.map((x, i) => [i + 1, x.t] as const)} onPick={(v) => save({ ...st, step: v })} />
          </fieldset>
          {s.orig ? <Gu src={s.src!} orig={s.orig} /> : <p className="g4-event">{s.sum}</p>}
          <div className="md-feedback" aria-live="polite">
            <p className="md-fb-k">
              {R0.label}在这一步：<span className={'c2-fit c2-fit--' + fit}>{FIT[fit]}</span>
            </p>
            <p>{why}</p>
            {step === STEPS.length && (
              <p>
                <b>小结：</b>
                {R0.trouble}
              </p>
            )}
            <div className="c2-stepnav">
              <button type="button" className="btn btn--small" disabled={step <= 1} onClick={() => save({ ...st, step: step - 1 })}>
                上一步
              </button>
              <button type="button" className="btn btn--small" disabled={step >= STEPS.length} onClick={() => save({ ...st, step: step + 1 })}>
                下一步
              </button>
            </div>
          </div>
        </div>
      )}

      {st.view === 'grid' && (
        <div className="g4-panel">
          <div className="c2-scroll" tabIndex={0} role="region" aria-label="六种读法与五个步骤的对照表">
            <table className="g4-table c2-grid">
              <thead>
                <tr>
                  <th scope="col">读法</th>
                  {STEPS.map((x) => (
                    <th key={x.t} scope="col">
                      {x.t}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ORDER.map((r) => (
                  <tr key={r}>
                    <th scope="row">
                      <button type="button" className="md-disclose" onClick={() => save({ ...st, r, view: 'one', step: 1 })}>
                        {READINGS[r].label}
                      </button>
                    </th>
                    {READINGS[r].steps.map(([f], i) => (
                      <td key={i}>
                        <span className={'c2-fit c2-fit--' + f}>{FIT[f]}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            横着看，每一种读法都有说不通的地方；竖着看，同一个步骤在不同读法下分量不同："求马"最支持同一说，"马与白也"最支持部分与整体说，"命形""命色"最支持共相说和词语说。所以正文说，比较好的做法是看每种读法能说通多少文本、又需要多少额外的假设。
          </p>
          <ul className="md-fb-list">
            {ORDER.map((r) => {
              const [a, b, c] = counts(r);
              return (
                <li key={r}>
                  {READINGS[r].label}：说得通 {a}，勉强 {b}，难以解释 {c}
                </li>
              );
            })}
          </ul>
          <p className="md-muted">数一数只是一个粗略的提示，不是评分：一种读法说不通的那一步，也可能恰好是最要紧的一步。</p>
        </div>
      )}

      <SrcToggle label="看第二步的完整原文">
        <Gu
          src="《公孙龙子·白马论》"
          orig="求馬，黃、黑馬皆可致；求白馬，黃、黑馬不可致。使白馬乃馬也，是所求一也。所求一者，白者不異馬也。所求不異，如黃、黑馬有可有不可，何也？可與不可，其相非，明。故黃、黑馬一也，而可以應有馬，而不可以應有白馬。是白馬之非馬，審矣。"
          zh="要求一匹马，黄马、黑马都可以牵来；要求一匹白马，黄马、黑马就不能牵来。假如白马就是马，所要求的就是同一个东西……同样是黄马、黑马，可以回应“有马”，不可以回应“有白马”。白马不是马，这是很清楚的。"
        />
      </SrcToggle>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        恢复初始状态
      </button>
      <p className="md-note">
        <b>这个练习的限度。</b>"属于""相等""集合""共相""使用与提及"都是现代或西方的概念，不是《白马论》自己的范畴；图和表是帮助比较的整理，不是古人的想法。各家读法据斯坦福哲学百科"名家"条目的介绍，本课没有阅读原著；每一步"说得通"与否，是这个练习的归纳，读者完全可以不同意。
      </p>
    </section>
  );
}
