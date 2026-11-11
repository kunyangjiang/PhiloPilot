import { Band, Claim, Limits, Pick, useSavedIx } from '../jw1/shared';

// 五 · after the table of four trolley-type cases and two principles
// (content/A3_SAMPLE_DRAFT.md). Three steps, none graded:
// 1. The reader records a verdict on each of the chapter's four cases (法官、
//    电车司机、旁观者扳道岔、天桥推人); after each, the case's two features in
//    the chapter's table are shown, with the judgement SEP reports "many" hold.
// 2. With the reader's own verdicts, each principle's fit is counted (做与允许,
//    双重效果). Fit is not truth: the chapter's three cautions follow.
// 3. "Turn one dial": pick a pair of cases and see everything that differs
//    between them — the chapter's point that only a one-feature change isolates
//    a feature. Case descriptions, features and predictions restate the
//    chapter's table; the extra differences in step 3 are the chapter's own
//    examples (身体接触、确定性、行动者的身份).

const ID = 'case-dials';

type C = 'judge' | 'driver' | 'bystander' | 'footbridge';
type Verd = 'ok' | 'wrong' | 'unsure';
const VS: readonly (readonly [Verd, string])[] = [
  ['ok', '可以'],
  ['wrong', '错'],
  ['unsure', '拿不准'],
];

const CASES: Record<C, { name: string; text: string; kill: string; means: boolean; many: string; da: Verd; dde: Verd }> = {
  judge: {
    name: '法官',
    text: '法官可以陷害并处死一个无辜的人；如果不这样做，五个无辜的人会在一场暴乱中被杀。',
    kill: '杀死一人 / 允许五人死',
    means: true,
    many: '错',
    da: 'wrong',
    dde: 'wrong',
  },
  driver: {
    name: '电车司机',
    text: '失控电车的司机可以让它继续向前撞死五个人，也可以把它转到只有一个人的轨道上。',
    kill: '杀死一人 / 杀死五人',
    means: false,
    many: '可以',
    da: 'ok',
    dde: 'ok',
  },
  bystander: {
    name: '旁观者扳道岔',
    text: '站在道岔旁的旁观者可以扳动道岔，让电车转到只有一个人的轨道上；什么也不做，五个人会被撞死。',
    kill: '杀死一人 / 允许五人死',
    means: false,
    many: '可以',
    da: 'wrong',
    dde: 'ok',
  },
  footbridge: {
    name: '天桥推人',
    text: '旁观者可以把身边的另一个人推到轨道上挡住电车，救下五个人；被推的人会被撞死。',
    kill: '杀死一人 / 允许五人死',
    means: true,
    many: '错',
    da: 'wrong',
    dde: 'wrong',
  },
};
const ORDER: C[] = ['judge', 'driver', 'bystander', 'footbridge'];
const VNAME: Record<Verd, string> = Object.fromEntries(VS) as Record<Verd, string>;

type P = 'jd' | 'db' | 'bf';
const PAIRS: readonly (readonly [P, string])[] = [
  ['jd', '法官—电车司机'],
  ['db', '电车司机—旁观者'],
  ['bf', '旁观者—天桥推人'],
];
const DIFFS: Record<P, { list: string[]; note: string }> = {
  jd: {
    list: ['杀死还是允许：法官是"杀死一人 / 允许五人死"，司机是"杀死一人 / 杀死五人"', '手段还是副作用：法官要那个人死，司机只是预见到', '行动者和场景：法庭上的法官，轨道上的司机'],
    note: '不止一处不同，所以单看这一对，判断的差别不能归于任何一处。这正是富特需要一个原则来解释、而后来的人要继续变换案例的原因。',
  },
  db: {
    list: ['行动者：司机换成了旁观者', '由此，杀死还是允许也变了：旁观者如果什么也不做，只是允许五个人死'],
    note: '这是汤姆森的变换：几乎只改了一处（谁来做选择），而这一处正好改变了"杀死还是允许"。很多人的判断没有变，所以做与允许的区分不足以解释这些判断。',
  },
  bf: {
    list: ['手段还是副作用：推人时，那个人的身体是救人的手段', '身体接触：推人要直接用手接触一个人', '确定性：推一个人能否挡住电车，比扳道岔更不确定'],
    note: '"手段还是副作用"变了，但别的东西也跟着变了。要确定起作用的是哪一处，还要再设计新的案例——再转动一次旋钮。',
  },
};

interface Saved {
  verdict: Partial<Record<C, Verd>>;
  pair: P | null;
}
const INIT: Saved = { verdict: {}, pair: null };

export default function CaseDials() {
  const [st, save] = useSavedIx<Saved>('A3', ID, INIT);
  const done = ORDER.filter((c) => st.verdict[c]).length;
  const firm = ORDER.filter((c) => st.verdict[c] && st.verdict[c] !== 'unsure');
  const fit = (k: 'da' | 'dde') => firm.filter((c) => CASES[c][k] === st.verdict[c]).length;

  return (
    <section className="md c3 c5" aria-labelledby="cd-title">
      <header className="md-head">
        <p className="md-tag">电车案例 · 转动旋钮</p>
        <h3 id="cd-title" className="md-title">你的判断，哪一个原则能解释？</h3>
        <p className="md-lede">
          先对四个案例各作一个判断——这是你的看法，没有对错。然后看两个原则各能解释你的几个判断；最后选一对案例，看它们之间有几处不同。
        </p>
      </header>

      <Band>一 · 你的判断（已作 {done} / {ORDER.length}）</Band>
      <ol className="v21-steps" aria-label="四个案例">
        {ORDER.map((c, i) => {
          const x = CASES[c];
          const v = st.verdict[c];
          return (
            <li key={c} className="v21-step">
              <span className="v21-n" aria-hidden="true">
                {i + 1}
              </span>
              <span>
                <span>
                  <b>{x.name}：</b>
                  {x.text}
                </span>
                <Pick label={`${x.name}案：这样做可以吗`} value={v} opts={VS} onPick={(nv) => save({ ...st, verdict: { ...st.verdict, [c]: nv } })} />
                {v && (
                  <span className="md-muted" aria-live="polite">
                    你的判断：{VNAME[v]}。这个案例是"{x.kill}"，那个人的死是{x.means ? '手段' : '副作用'}；按 SEP 条目的说法，很多人的判断是"{x.many}"。
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ol>

      {done === ORDER.length && (
        <div aria-live="polite">
          <Band>二 · 哪一个原则与你的判断吻合？</Band>
          {firm.length === 0 ? (
            <p className="md-muted">你对四个案例都拿不准，所以还没有可以比较的判断。这本身也是一个值得记下的结果。</p>
          ) : (
            <ul className="md-muted">
              <li>
                做与允许的区分（杀死比允许更坏）：与你的 {firm.length} 个确定判断中的 {fit('da')} 个吻合。
              </li>
              <li>
                双重效果原则（把伤害当作手段比当作副作用更坏）：与你的 {firm.length} 个确定判断中的 {fit('dde')} 个吻合。
              </li>
            </ul>
          )}
          <Claim b="course">
            吻合不等于正确。本章提醒了三点：案例之间的差别不只一处；原则本身要有独立的道理；判断本身也可以被修改——汤姆森在 2008 年就改变了她对旁观者案的判断。
          </Claim>
        </div>
      )}

      {done === ORDER.length && (
        <div aria-live="polite">
          <Band>三 · 转动一个旋钮：这一对案例有几处不同？</Band>
          <Pick label="要比较的一对案例" value={st.pair} opts={PAIRS} onPick={(v) => save({ ...st, pair: v })} />
          {st.pair && (
            <div aria-live="polite">
              <ul>
                {DIFFS[st.pair].list.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <p className="md-muted">{DIFFS[st.pair].note}</p>
            </div>
          )}
        </div>
      )}

      <Limits>
        <p>
          <b>四个案例、两个特征和两个原则的预测都复述本章第五部分的表格；"很多人的判断"一栏依据 SEP 条目"很多人相信"的说法，不是实验数据。</b>
          这个组件不评分：你的判断没有对错，它只帮你看清哪一个原则能解释它们。案例的描述是简化的；法官案和电车司机案依据 SEP"做与允许"条目对富特 1967 年论文的概括，推人案依据"双重效果原则"条目对汤姆森 1985 年论文的概括。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
