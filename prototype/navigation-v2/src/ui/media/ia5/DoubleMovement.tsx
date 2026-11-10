import { Band, Claim, Limits, Seg, Step, useSavedIx } from '../ia3/shared';

// 三 · after the polygamy worked example ("所以，这个例子说明的，不是…").
// Walk the five steps of the double movement on the chapter's example. At
// each of the three contested steps, choose a reading; the outcome follows
// from the choices, so the reader sees that the method does not by itself
// fix the conclusion. The worked example is the chapter's own demonstration
// (note 19), not Fazlur Rahman's text and not the general position of Islamic law.

const ID = 'double-movement';

type R = 'reform' | 'classic';
const STEPS: { n: number; t: string; q?: string; reform?: string; classic?: string; note?: string; fixed?: string }[] = [
  {
    n: 1,
    t: '历史处境',
    q: '第 4 章第 3 节降示的背景是什么？',
    reform: '据通行的解释，与一场战争之后出现了许多孤儿和寡妇有关；当时男子娶妻的数目没有限制。',
    classic: '这一背景是后来的传述，有不确定性；规定本身不受背景的限制。',
    note: '依赖于对降示背景的历史知识，而这些知识主要来自后来的传述。',
  },
  {
    n: 2,
    t: '具体规定背后的理由',
    q: '"两个、三个或四个"是什么？',
    reform: '一个限制，而不是鼓励；"如果怕不能公平，就只娶一个"表明公平更根本。',
    classic: '一个许可，条件是公平对待她们（住所、生活费、轮流的时间等物质上的公平）。',
    note: '把"最多四个"读成限制而不是许可，是一个解释的选择；古典法学家也知道这个背景，但得出了不同的结论。',
  },
  {
    n: 3,
    t: '与整体方向对照',
    q: '第 129 节"你们不能在妻子之间做到公平"与第 3 节是什么关系？',
    reform: '它否定了第 3 节的条件：完全的公平做不到，经文的道德方向指向一夫一妻。',
    classic: '两节说的是两种公平：第 3 节是物质上的公平，第 129 节是感情上的公平；后者不取消前者的许可。',
    note: '这是整个推理中最有争议的一步。',
  },
  { n: 4, t: '现在的处境', fixed: '战争孤儿的保护有了别的社会制度；女性的经济地位和法律地位发生了变化。' },
  { n: 5, t: '应用道德原则', fixed: '把前三步得出的原则应用到现在的处境中。结论取决于前三步的选择（见下）。' },
];

interface Saved {
  pick: Record<number, R>;
  at: number;
}
const INIT: Saved = { pick: {}, at: 1 };

export default function DoubleMovement() {
  const [st, save] = useSavedIx<Saved>('IA5', ID, INIT);
  const set = (x: Partial<Saved>) => save({ ...st, ...x });
  const pick = st.pick ?? {};
  const at = Math.min(Math.max(st.at ?? 1, 1), 5);
  const step = STEPS[at - 1];
  const chosen = [1, 2, 3].filter((n) => pick[n]);
  const allReform = chosen.length === 3 && chosen.every((n) => pick[n] === 'reform');
  const anyClassic = chosen.some((n) => pick[n] === 'classic');
  const canNext = !step.q || !!pick[at];

  return (
    <section className="md c3 c5" aria-labelledby="dm-title">
      <header className="md-head">
        <p className="md-tag">双重运动 · 工作坊</p>
        <h3 id="dm-title" className="md-title">
          方法的每一步，都是一个解释的判断
        </h3>
        <p className="md-lede">用本章的多妻例子走一遍"双重运动"。在三个有争议的步骤上，你来选择一种读法，看结论怎样随之改变。</p>
      </header>

      <ol className="v21-steps" aria-label="五个步骤">
        {STEPS.map((s) => (
          <Step key={s.n} n={s.n} on={s.n === at}>
            {s.n <= 3 ? '第一个运动：' : '第二个运动：'}
            {s.t}
            {pick[s.n] ? (pick[s.n] === 'reform' ? '（改革的读法）' : '（古典法学的读法）') : ''}
          </Step>
        ))}
      </ol>

      <Band>
        第 {at} 步 · {step.t}
      </Band>
      <div aria-live="polite">
        {step.q ? (
          <>
            <p>{step.q}</p>
            <Seg
              name={'dm-' + at}
              label={step.q}
              value={pick[at] ?? null}
              col
              opts={[
                ['reform', step.reform!],
                ['classic', step.classic!],
              ]}
              onPick={(v) => set({ pick: { ...pick, [at]: v } })}
            />
            {pick[at] && (
              <Claim b="course" who="本章的评估">
                {step.note}
              </Claim>
            )}
          </>
        ) : (
          <p>{step.fixed}</p>
        )}
      </div>

      <div className="v22-btns">
        <button type="button" className="v22-btn" disabled={at === 1} onClick={() => set({ at: at - 1 })}>
          上一步
        </button>
        <button type="button" className="v22-btn" disabled={at === 5 || !canNext} onClick={() => set({ at: at + 1 })}>
          下一步
        </button>
      </div>
      {!canNext && <p className="md-muted">先选择一种读法。</p>}

      {at === 5 && (
        <div aria-live="polite">
          <Band>结论</Band>
          {allReform && <Claim b="course" who="本章示范的推理">在现在的处境中，一夫一妻是公平原则的更好的实现；多妻至多只能是一种需要严格审查的例外。</Claim>}
          {anyClassic && <Claim b="course" who="另一种结论">如果在第 {chosen.filter((n) => pick[n] === 'classic').join('、')} 步采用古典法学的读法，推理就不会得出“一夫一妻是公平原则的更好的实现”这个结论：第 3 节的许可仍然有效，"公平"指物质上的公平。</Claim>}
          <p className="md-muted">这说明的不是"方法必然得出某个结论"，而是：方法把每一个判断明确地摆出来，使争论可以针对具体的步骤进行。</p>
        </div>
      )}

      <Limits>
        <p>
          <b>这个示范是本章依据通行的介绍所作的整理，</b>不是拉赫曼原文的转述，也不代表伊斯兰法学的通行立场。经文是本章的意译。这里不判断哪一种读法是正确的。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
