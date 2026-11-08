import { useState } from 'react';
import { isReduced } from '../../../state/store';
import { Seg, Src, SrcToggle, useSaved } from './shared';
import '../gr1/gr1.css';
import './gr4.css';

// 四 · after "一个开放的问题", where the part closes, before 想一想（四）.
// Three tasks, all built on the chapter's own numbered reconstructions:
//  一 the lazy argument (Fato 28—30): question a premise and see whether the
//     conclusion still follows; the note says which ancient answer that is.
//  二 the cylinder (Fato 41—43; Gellius 7.2.11): a drawn analogy (not a
//     physics simulation) with the push and the shape labelled, then the
//     chapter's six-step reconstruction with its premises open to question.
//  三 the swerve (Lucretius 2.251—258, 2.289—293): the five-step
//     reconstruction, with an explicit gap between "makes possible" and
//     "responsible", and the three positions compared.
// No side is declared the winner (the chapter's "一个开放的问题").

interface Step {
  n: string;
  text: string;
  premise: boolean;
  /** Steps it needs (all must hold). */
  deps?: string[];
  /** Said when this premise is questioned. */
  ifDoubted?: string;
}

function holds(steps: Step[], doubt: Record<string, boolean>) {
  const h: Record<string, boolean> = {};
  for (const s of steps) h[s.n] = s.premise ? !doubt[s.n] : (s.deps ?? []).every((d) => h[d]);
  return h;
}

function Argument({ id, steps, doubt, onToggle }: { id: string; steps: Step[]; doubt: Record<string, boolean>; onToggle: (n: string) => void }) {
  const h = holds(steps, doubt);
  return (
    <ol className="pe-steps g4-arg" aria-label="论证的步骤">
      {steps.map((s) => (
        <li key={s.n} className={'pe-step pe-step--' + (s.premise ? 'premise' : 'derived') + (h[s.n] ? '' : ' is-off')}>
          <div className="pe-row">
            <span className="pe-n" aria-hidden="true">
              {s.n}
            </span>
            <div>
              <p className="pe-kind">
                {s.premise ? '前提' : '推出'}
                {s.deps && <span className="pe-deps"> · 依据 {s.deps.join('、')}</span>}
                <span className={'pe-state' + (h[s.n] ? '' : ' is-off')}>{h[s.n] ? (s.premise ? '接受' : '成立') : s.premise ? '质疑' : '失去支持'}</span>
              </p>
              <p className="pe-text">{s.text}</p>
              {s.premise && (
                <div className="pe-actions">
                  <button type="button" className="btn btn--small" aria-pressed={!!doubt[s.n]} aria-describedby={doubt[s.n] && s.ifDoubted ? `${id}-${s.n}` : undefined} onClick={() => onToggle(s.n)}>
                    {doubt[s.n] ? '改为接受' : '质疑这一步'}
                  </button>
                </div>
              )}
              {s.premise && doubt[s.n] && s.ifDoubted && (
                <p className="pe-note g4-doubt" id={`${id}-${s.n}`}>
                  {s.ifDoubted}
                </p>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

const LAZY: Step[] = [
  {
    n: '①',
    premise: true,
    text: '如果命中注定你会康复，那么无论请不请医生，你都会康复',
    ifDoubted:
      '这是克律西波斯的回答。"你会康复"可能是一件"共同注定"的事：命运规定的是"你会请医生、并因此康复"。结果不能和导致它的原因分开、单独被注定（《论命运》30）。',
  },
  {
    n: '②',
    premise: true,
    text: '如果命中注定你不会康复，那么无论请不请医生，你都不会康复',
    ifDoubted: '和质疑①是同一个道理：不康复也可能是和"不请医生"共同注定的。',
  },
  {
    n: '③',
    premise: true,
    text: '两者之中必有一个是命中注定的',
    ifDoubted:
      '这更接近伊壁鸠鲁的路线：按西塞罗的记载，伊壁鸠鲁为了避免一切由命运发生，否认每一个关于将来的陈述都或真或假（《论命运》21，转述）。代价是放弃二值原则，克律西波斯不肯付这个代价。',
  },
  { n: '④', premise: false, deps: ['①', '②', '③'], text: '所以，无论哪种情况，请不请医生都不影响结果' },
  { n: '⑤', premise: false, deps: ['④'], text: '所以，请医生是没有意义的' },
];

const CYL: Step[] = [
  { n: '①', premise: true, text: '一个行为的发生，需要外在的、先前的原因（印象）和内在的原因（行为者的认可）', ifDoubted: '如果行为只有外在的原因，就没有什么可以归给行为者自己了。克律西波斯的整个回答都建立在两种原因的区分上。' },
  { n: '②', premise: true, text: '外在的原因只是"辅助的、临近的"：它给了运动一个开端（推圆柱的人）', ifDoubted: '如果外在的原因就是"完全的、主要的"原因，那么认可就像被推着走，反对者"命运逼迫人犯罪"的说法就成立了（盖利乌斯 7.2.5）。' },
  {
    n: '③',
    premise: true,
    text: '内在的原因是"完全的、主要的"：行为者以怎样的方式回应印象，取决于他自己的本性和品格（圆柱的形状）',
    ifDoubted:
      '这是对克律西波斯最有力的反驳：品格是从天性、父母、教育和经历中来的，这些都是命运链条的一部分，都不是他自己选择的。圆柱也不选择自己的形状。支持者会回答：人的"形状"是理性的品格，能回应理由，能被教育和改变；赞扬和责备本身就是塑造品格的原因的一部分。',
  },
  { n: '④', premise: true, text: '命运是一切原因的总链条，所以行为者的认可也是命运的一部分', ifDoubted: '质疑这一步，就离开了斯多亚派：那是伊壁鸠鲁派（偏斜）或卡尔涅阿德斯（自愿运动的原因在其自身）的方向。注意：在这个重构里，④不是结论的依据，而是使问题变得尖锐的那个前提。' },
  { n: '⑤', premise: false, deps: ['②', '③'], text: '但认可是"由于"行为者自己的本性而发生的，不是"被外在的东西强迫"的' },
  { n: '⑥', premise: false, deps: ['⑤'], text: '所以，认可"在我们的权能之中"，行为者要为它负责' },
];

const SWERVE: Step[] = [
  { n: '①', premise: true, text: '生物有一种自由的力量，能够按照自己的意愿运动', ifDoubted: '①被当作一个明显的经验事实。如果否认它（像懒惰论证的支持者那样），整个论证就没有出发点。' },
  {
    n: '②',
    premise: true,
    text: '如果一切运动都是先前运动按照确定次序的必然结果，就不会有这种自由的力量',
    ifDoubted: '这正是克律西波斯会否认的：在他看来，一切都有先前的原因，但认可仍然"由于我们自己"。卡尔涅阿德斯也否认它，但走的是另一条路：自愿运动的原因就在它自身的本性之中（《论命运》23，转述）。',
  },
  { n: '③', premise: false, deps: ['①', '②'], text: '所以，必须有某种运动不是先前运动的必然结果' },
  { n: '④', premise: true, text: '原子的偏斜就是这样的运动：它发生在不确定的时间和地点', ifDoubted: '西塞罗的批评：偏斜等于承认有没有原因的运动，违反"无中不能生有"（《论命运》22）。偏斜是为了解释①而提出的假设，不是被观察到的事实。' },
  { n: '⑤', premise: false, deps: ['③', '④'], text: '所以，偏斜使自由的力量成为可能' },
];

/** A labelled drawing of the analogy. The roll is a CSS transition; with
 *  reduced motion the before and after are shown without movement. */
function Cylinder({ shape, pushed, onPush, onReset }: { shape: 'cyl' | 'block'; pushed: boolean; onPush: () => void; onReset: () => void }) {
  const reduce = isReduced();
  const moved = pushed && shape === 'cyl';
  return (
    <figure className="g4-cyl">
      <svg viewBox="0 0 320 170" role="img" aria-labelledby="g4-cyl-t g4-cyl-d" className={pushed ? 'is-pushed' : ''}>
        <title id="g4-cyl-t">{shape === 'cyl' ? '斜坡上的圆柱' : '斜坡上的方块'}</title>
        <desc id="g4-cyl-d">
          {shape === 'cyl'
            ? pushed
              ? '圆柱被推了一下之后，沿着斜坡滚到了坡底。'
              : '一个圆柱停在斜坡顶上，旁边有一只准备推它的手。'
            : pushed
              ? '方块被推了一下，只挪动了一点，仍然停在斜坡上。'
              : '一个方块停在斜坡顶上，旁边有一只准备推它的手。'}
        </desc>
        <polygon points="10,40 300,150 10,150" fill="#fff" stroke="currentColor" strokeWidth="2" />
        <g className={'g4-body' + (moved ? ' is-down' : pushed ? ' is-nudged' : '')}>
          {shape === 'cyl' ? (
            <g className={moved && !reduce ? 'g4-spin' : ''}>
              <circle cx="40" cy="30" r="17" fill="#fff" stroke="currentColor" strokeWidth="2.5" />
              <line x1="40" y1="13" x2="40" y2="47" stroke="currentColor" strokeWidth="1.5" />
            </g>
          ) : (
            <rect x="26" y="20" width="30" height="30" fill="#fff" stroke="currentColor" strokeWidth="2.5" transform="rotate(21 41 35)" />
          )}
        </g>
        <g className={'g4-hand' + (pushed ? ' is-out' : '')} aria-hidden="true">
          <line x1="2" y1="22" x2="18" y2="26" stroke="var(--accent)" strokeWidth="3" />
          <polygon points="18,21 26,28 16,31" fill="var(--accent)" />
        </g>
      </svg>
      <figcaption>
        <div className="g4-cyl-ctl">
          <button type="button" className="btn btn--small" onClick={pushed ? onReset : onPush}>
            {pushed ? '放回坡顶' : '推一下'}
          </button>
        </div>
        <ul className="g4-legend">
          <li>
            <b className="g4-key g4-key--push" aria-hidden="true" /> 推 = 外在的印象：<b>辅助的、临近的原因</b>，给了运动一个开端
          </li>
          <li>
            <b className="g4-key" aria-hidden="true" /> 形状 = 行为者的品格与认可：<b>完全的、主要的原因</b>，决定它怎样回应
          </li>
        </ul>
        {pushed && (
          <p className="md-fb-k" aria-live="polite">
            {shape === 'cyl' ? '同样的一推，圆柱滚了下去：不是因为你还在推它，而是因为它自己的形状。' : '同样的一推，方块停住了：同一个印象，品格不同的人不会作出同样的认可。'}
          </p>
        )}
      </figcaption>
    </figure>
  );
}

type Pos = 'chry' | 'epi' | 'carn';
const POS: Record<Pos, { zh: string; claim: string; modern: string; caution: string; obj: string }> = {
  chry: {
    zh: '克律西波斯（斯多亚派）',
    claim: '一切都由命运发生，但认可的主要原因是行为者自己的品格，所以认可"在我们的权能之中"。',
    modern: '大致对应：相容论',
    caution: '斯多亚派的命运是神意的、有目的的秩序；他们关心的是"取决于我们"，不是"能否做别的选择"。',
    obj: '品格本身也是被决定的；西塞罗说他最后"不情愿地"确认了命运的必然性（《论命运》39，转述）。',
  },
  epi: {
    zh: '伊壁鸠鲁派（据卢克莱修）',
    claim: '原子的偏斜打破了"原因从无限以来一个跟着一个"的链条，使自愿的运动成为可能。',
    modern: '大致对应：某种形式的自由意志论',
    caution: '偏斜是物理学的假设；伊壁鸠鲁本人现存的著作没有明确讲到它；是否每个选择都需要一次偏斜，有争议。',
    obj: '随机不等于自主：一个随机的偏斜怎么能使行为成为"我的"？而且没有原因的运动似乎违反"无中不能生有"。',
  },
  carn: {
    zh: '卡尔涅阿德斯（学园派，据西塞罗）',
    claim: '没有无原因的运动，但自愿运动的原因就在它自身的本性之中，所以不需要偏斜，也不需要命运的链条。',
    modern: '大致对应：某种形式的"行为者因果"理论',
    caution: '只是西塞罗的转述；卡尔涅阿德斯没有写书，他是否真的持有这一观点，还是只为了论证而提出，不能确定。',
    obj: '"自身就是原因"本身需要解释：这样的原因和"没有原因"有什么不同？',
  },
};
const BASIS: [string, string][] = [
  ['a', '他的品格是作弊的主要原因，即使品格也是命运的一部分'],
  ['b', '原子的偏斜打破了必然的链条，为自愿的运动留出了空间'],
  ['c', '自愿运动的原因就在它自身的本性之中'],
  ['d', '他的选择完全不受任何原因影响'],
];
const ANSWER: Record<Pos, string> = { chry: 'a', epi: 'b', carn: 'c' };

const ID = 'fate-explorer';
type Task = 'lazy' | 'cylinder' | 'swerve';
interface Saved {
  task: Task;
  lazy: Record<string, boolean>;
  cyl: Record<string, boolean>;
  swerve: Record<string, boolean>;
  shape: 'cyl' | 'block';
  basis: Partial<Record<Pos, string>>;
}
const INIT: Saved = { task: 'lazy', lazy: {}, cyl: {}, swerve: {}, shape: 'cyl', basis: {} };

export default function FateExplorer() {
  const [st, save] = useSaved<Saved>(ID, INIT);
  const [pushed, setPushed] = useState(false);
  const toggle = (k: 'lazy' | 'cyl' | 'swerve') => (n: string) => save({ ...st, [k]: { ...st[k], [n]: !st[k][n] } });
  const lazyH = holds(LAZY, st.lazy);
  const cylH = holds(CYL, st.cyl);
  const swH = holds(SWERVE, st.swerve);

  return (
    <section className="md g4" aria-labelledby="fe-title">
      <header className="md-head">
        <p className="md-tag">检查论证</p>
        <h3 id="fe-title" className="md-title">
          命运与责任：哪一个前提最值得怀疑？
        </h3>
        <p className="md-lede">
          三个论证，都是本章根据史料所作的编号重构，不是古人的原文。逐一决定接受还是质疑每个前提，看结论还剩下哪些支持；每一次质疑，都对应古代某一方实际走过的路。不计分，不宣布胜负。
        </p>
      </header>

      <Seg
        name="fe-task"
        label="论证"
        value={st.task}
        opts={[
          ['lazy', '一、懒惰论证'],
          ['cylinder', '二、圆柱与责任'],
          ['swerve', '三、偏斜与三种立场'],
        ]}
        onPick={(v) => save({ ...st, task: v })}
      />

      {st.task === 'lazy' && (
        <div className="g4-panel">
          <Argument id="fe-lazy" steps={LAZY} doubt={st.lazy} onToggle={toggle('lazy')} />
          <div className="md-feedback" aria-live="polite">
            <p className="md-fb-k">{lazyH['⑤'] ? '结论仍然成立：请医生没有意义。' : '结论失去了支持。'}</p>
            {lazyH['⑤'] ? (
              <p className="md-muted">你接受了所有前提。西塞罗说，按照这个道理，生活中的一切行动都会被取消（《论命运》29，转述）。哪一步出了问题？</p>
            ) : (
              <p>
                {st.lazy['①'] || st.lazy['②'] ? '克律西波斯的区分：命运和宿命不同。宿命说"结果不管你做什么都会发生"；命运说"结果连同它的原因一起被注定"。' : '你走的是放弃二值原则的路，而不是克律西波斯的路。'}
                但这还没有回答一个更深的问题：如果"我会请医生"也是被注定的，这还算是我的行为吗？这正是第二个论证要处理的。
              </p>
            )}
            <SrcToggle label="看拉丁原文（西塞罗《论命运》28—29、30）">
              <Src
                src="西塞罗《论命运》28—29"
                lang="la"
                orig="Si fatum tibi est ex hoc morbo convalescere, sive tu medicum adhibueris sive non adhibueris, convalesces; item, si fatum tibi est ex hoc morbo non convalescere, sive tu medicum adhibueris sive non adhibueris, non convalesces; et alterutrum fatum est; medicum ergo adhibere nihil attinet."
                zh="如果你命中注定会从这场病中康复，那么无论你请不请医生，你都会康复；同样，如果你命中注定不会从这场病中康复，那么无论你请不请医生，你都不会康复；而两者之中必有一个是命中注定的；所以请医生是没有意义的。"
              />
              <Src
                src="西塞罗《论命运》30"
                lang="la"
                orig="Quaedam enim sunt, inquit, in rebus simplicia, quaedam copulata; simplex est: Morietur illo die Socrates; huic, sive quid fecerit sive non fecerit, finitus est moriendi dies. At si ita fatum erit: Nascetur Oedipus Laio, non poterit dici: sive fuerit Laius cum muliere sive non fuerit; copulata enim res est et confatalis."
                zh="他（克律西波斯）说，事物中有些是“单纯的”，有些是“连结的”。单纯的例如：“苏格拉底将在那一天死去”：无论他做什么、不做什么，他的死期都已经确定了。但如果命运是这样的：“拉伊俄斯将生下俄狄浦斯”，就不能说“无论拉伊俄斯是否和女人同房”；因为这是一件连结的、“共同注定”的事情。"
              />
            </SrcToggle>
          </div>
        </div>
      )}

      {st.task === 'cylinder' && (
        <div className="g4-panel">
          <fieldset className="cs-group">
            <legend>斜坡上放什么？</legend>
            <Seg
              name="fe-shape"
              value={st.shape}
              opts={[
                ['cyl', '圆柱'],
                ['block', '方块'],
              ]}
              onPick={(v) => {
                setPushed(false);
                save({ ...st, shape: v });
              }}
            />
          </fieldset>
          <Cylinder shape={st.shape} pushed={pushed} onPush={() => setPushed(true)} onReset={() => setPushed(false)} />
          <p className="g4-warn">
            <b>这是一个哲学比喻的示意图，不是物理模拟。</b>图中的运动只是为了显示比喻的结构：同样的外在推动，结果取决于物体自己的形状。它不计算任何力，也不说明心灵像圆柱一样运动。
          </p>
          <Argument id="fe-cyl" steps={CYL} doubt={st.cyl} onToggle={toggle('cyl')} />
          <div className="md-feedback" aria-live="polite">
            <p className="md-fb-k">{cylH['⑥'] ? '结论仍然成立：行为者要为认可负责。' : '结论失去了支持。'}</p>
            <p>
              {cylH['⑥']
                ? st.cyl['④']
                  ? '注意：你质疑了④，结论仍然成立，因为在这个重构里，④不是结论的依据。克律西波斯要说明的恰恰是：即使接受④，⑥也成立。'
                  : '克律西波斯的关键，是区分两个问题：一件事是否"有原因"，和它是否"由于我们自己"而发生。试着质疑③，看看最有力的反驳在哪里。'
                : '你质疑的那一步，正是古代和今天的批评者攻击克律西波斯的地方。'}
            </p>
            <SrcToggle label="看拉丁原文（西塞罗《论命运》41、43；盖利乌斯 7.2.11）">
              <Src
                src="西塞罗《论命运》41"
                lang="la"
                orig="Causarum enim, inquit, aliae sunt perfectae et principales, aliae adiuvantes et proximae. Quam ob rem, cum dicimus omnia fato fieri causis antecedentibus, non hoc intellegi volumus: causis perfectis et principalibus, sed causis adiuvantibus antecedentibus et proximis."
                zh="他说，原因中，有些是“完全的、主要的”，有些是“辅助的、临近的”。所以，当我们说一切都由先前的原因、由命运发生时，我们的意思不是说由完全的、主要的原因发生，而是说由辅助的、临近的先前原因发生。"
              />
              <Src
                src="西塞罗《论命运》43"
                lang="la"
                orig="Ut igitur, inquit, qui protrusit cylindrum, dedit ei principium motionis, volubilitatem autem non dedit, sic visum obiectum inprimet illud quidem et quasi signabit in animo suam speciem, sed adsensio nostra erit in potestate, eaque, quem ad modum in cylindro dictum est, extrinsecus pulsa, quod reliquum est, suapte vi et natura movebitur."
                zh="他说，正如推动圆柱的人给了它运动的开端，却没有给它滚动的能力；同样，出现在面前的印象，固然会在心中留下印记，好像盖上它的形象，但我们的认可是在我们的权能之中的；而且，就像刚才说圆柱那样，它从外面被推动之后，其余的部分就会按照它自己的力量和本性运动。"
              />
              <Src
                src="盖利乌斯《阿提卡之夜》7.2.11"
                lang="la"
                orig="Sicut, inquit, lapidem cylindrum si per spatia terrae prona atque derupta iacias, causam quidem ei et initium praecipitantiae feceris, mox tamen ille praeceps volvitur, non quia tu id etiam facis, sed quoniam ita sese modus eius et formae volubilitas habet."
                zh="他说，如果你把一块圆柱形的石头扔到陡峭的斜坡上，你固然给了它往下冲的原因和开端；但它随后一路滚下去，不是因为你还在使它这样，而是因为它自身的样子和它形状的易滚性就是如此。"
              />
            </SrcToggle>
          </div>
        </div>
      )}

      {st.task === 'swerve' && (
        <div className="g4-panel">
          <Argument id="fe-sw" steps={SWERVE} doubt={st.swerve} onToggle={toggle('swerve')} />
          <div className="g4-gap">
            <p className="pe-kind">
              ⑤ 之后还缺的一步 <span className="pe-state is-off">没有被论证</span>
            </p>
            <p className="pe-text">所以，行为者要为自己的行为负责</p>
            <p className="pe-note">
              ⑤ 只说偏斜"使自由的力量成为可能"。即使⑤成立，也还没有说明一个随机的偏斜怎样使行为成为"我的"、使我可以为它负责。卢克莱修的文字也没有说清楚，是每一次选择都对应一次偏斜，还是偏斜只为心灵自己的运动留出了空间。
            </p>
          </div>
          <div className="md-feedback" aria-live="polite">
            <p className="md-fb-k">{swH['⑤'] ? '⑤仍然成立。' : '⑤失去了支持。'}</p>
            <SrcToggle label="看拉丁原文（卢克莱修《物性论》2.251—258、2.289—293；西塞罗《论命运》22、23）">
              <Src
                src="卢克莱修《物性论》2.251—258（Munro 本；第 257—258 行的异文见注 55）"
                lang="la"
                orig="Denique si semper motus conectitur omnis / et vetere exoritur semper novus ordine certo / nec declinando faciunt primordia motus / principium quoddam quod fati foedera rumpat, / ex infinito ne causam causa sequatur, / libera per terras unde haec animantibus exstat, / unde est haec, inquam, fatis avolsa potestas / per quam progredimur quo ducit quemque voluntas……?"
                zh="最后，如果一切运动总是连在一起，新的运动总是按照确定的次序从旧的运动中产生，如果原初的物体不通过偏斜造成某种运动的开端，来打破命运的约束，使原因不至于从无限以来一个跟着一个，那么，大地上的生物所拥有的这种自由的力量是从哪里来的？我要问，这种从命运那里夺过来的力量是从哪里来的？凭着它，我们能够去意志引导每一个人去的地方……"
              />
              <Src
                src="卢克莱修《物性论》2.289—293"
                lang="la"
                orig="sed ne mens ipsa necessum / intestinum habeat cunctis in rebus agendis / et devicta quasi hoc cogatur ferre patique, / id facit exiguum clinamen principiorum / nec regione loci certa nec tempore certo."
                zh="但是，心灵本身之所以不是在做一切事情时都受一种内在的必然性支配，不是像被征服了一样被迫忍受和承受这一切，原因就在于原初物体的微小的偏斜，它既不在确定的地点，也不在确定的时间发生。"
              />
              <Src
                src="西塞罗《论命运》22"
                lang="la"
                orig="Sed Epicurus declinatione atomi vitari necessitatem fati putat……quam declinationem sine causa fieri si minus verbis, re cogitur confiteri."
                zh="伊壁鸠鲁却认为，用原子的偏斜就可以避免命运的必然性……他即使不在言辞上，在实际上也不得不承认，这种偏斜是没有原因地发生的。"
              />
              <Src
                src="西塞罗《论命运》23"
                lang="la"
                orig="Acutius Carneades, qui docebat posse Epicureos suam causam sine hac commenticia declinatione defendere. Nam cum docerent esse posse quendam animi motum voluntarium, id fuit defendi melius quam introducere declinationem, cuius praesertim causam reperire non possent."
                zh="卡尔涅阿德斯更敏锐。他指出，伊壁鸠鲁派可以不用这种编造出来的偏斜，来为自己的主张辩护。因为，既然他们教导说可以有某种心灵的自愿运动，那么为这一点辩护，要比引入偏斜好，何况他们根本找不到偏斜的原因。"
              />
            </SrcToggle>
          </div>

          <h4 className="g4-h">同一个作弊的学生，三种说明</h4>
          <p>
            本章开头的例子：作弊的学生辩解说，他的性格和那天的情境都是被以前的原因决定的。三种立场都认为他的行为在某种意义上"取决于他"，但理由不同。为每一种立场选出它的理由：
          </p>
          {(Object.keys(POS) as Pos[]).map((p) => {
            const v = st.basis[p];
            return (
              <fieldset key={p} className="cs-group g4-case">
                <legend>{POS[p].zh}靠什么说明"作弊出自他自己"？</legend>
                <Seg name={'fe-basis-' + p} col value={v} opts={BASIS} onPick={(x) => save({ ...st, basis: { ...st.basis, [p]: x } })} />
                {v && (
                  <div className="md-feedback">
                    <p className="md-fb-k">{v === ANSWER[p] ? '对。' : v === 'd' ? '三种立场都不这样说。' : `这一立场的理由是：${BASIS.find((b) => b[0] === ANSWER[p])![1]}。`}</p>
                    <p>{POS[p].claim}</p>
                    <p>
                      <b>主要的反驳：</b>
                      {POS[p].obj}
                    </p>
                    <p className="md-muted">
                      {POS[p].modern}。需要注意：{POS[p].caution}
                    </p>
                  </div>
                )}
              </fieldset>
            );
          })}
          {Object.keys(st.basis).length === 3 && (
            <p className="g4-warn">
              <b>这个问题至今没有公认的答案。</b>"选择完全不受任何原因影响"不是三方中任何一方的主张：伊壁鸠鲁派的偏斜是原子的运动，不等于说选择没有原因。古人讨论的是"取决于我们的"（τὸ ἐφʼ ἡμῖν），现代的"决定论""相容论""自由意志论"是近代以后才定型的术语，这里只作大致的对照。
            </p>
          )}
        </div>
      )}

      <button
        type="button"
        className="md-reset"
        onClick={() => {
          setPushed(false);
          save(INIT);
        }}
      >
        恢复初始状态
      </button>
      <p className="md-note">
        <b>这个练习的限度。</b>步骤的划分和依赖关系是本章的整理；古人留下的是对话、诗和后人的转述，不是编了号的论证。"三方的辩论"很大程度上是西塞罗在《论命运》中组织起来的，三方没有直接对话。圆柱的图是比喻的示意，不是物理模拟；原子的随机运动本身并不能说明一个人为什么要为自己的行为负责。
      </p>
    </section>
  );
}
