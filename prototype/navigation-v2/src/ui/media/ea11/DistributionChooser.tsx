import '../cn2/cn2.css';
import { Band, Claim, Limits, Pick, Verdict, useSavedIx } from '../jw1/shared';

// 四 · after the table of the four economies (content/EA11_SAMPLE_DRAFT.md).
// Behind the veil the reader first chooses an economy (no right answer), then says
// which economy each of three principles selects: strict equality, maximizing the
// average, the difference principle. The four economies and their numbers are the
// chapter's own construction (四, "差别原则不是什么").

const ID = 'distribution-chooser';

type E = 'A' | 'B' | 'C' | 'D';
const ES: readonly (readonly [E, string])[] = [
  ['A', '经济 A'],
  ['B', '经济 B'],
  ['C', '经济 C'],
  ['D', '经济 D'],
];
const ROWS: Record<E, { label: string; v: [number, number, number]; avg: number }> = {
  A: { label: '经济 A（完全平等）', v: [10, 10, 10], avg: 10 },
  B: { label: '经济 B（较平等）', v: [12, 14, 16], avg: 14 },
  C: { label: '经济 C', v: [15, 20, 40], avg: 25 },
  D: { label: '经济 D', v: [13, 25, 70], avg: 36 },
};
const VEIL: Record<E, string> = {
  A: '你选了最平等的经济。可是请注意：在 C 中，每一个群体——包括处境最差的——都比在 A 中好。严格的平等会选 A；差别原则认为，使每个人都更好的不平等是可以接受的。',
  B: '你选了一个较平等的经济。它既不是最平等的（A），也不使处境最差者最好（C 的 15 多于 B 的 12），也不使平均最大（D）。这三条原则都不会选它。',
  C: '你选了处境最差者最好的经济：无论落在哪一列，你至少得到 15。这接近罗尔斯所说的"最大最小"的思路，也是差别原则在这里的选择。',
  D: '你选了平均最高的经济：如果运气好，你可能得到 70。这是"使平均最大"的选择，也是海萨尼认为理性的选择者会作的选择；可是如果落在最差的一列，你只有 13。',
};

type P = 'eq' | 'avg' | 'dp';
const PRINCIPLES: { id: P; name: string; k: E; why: string }[] = [
  { id: 'eq', name: '严格的平等', k: 'A', why: '只有 A 中三个群体完全相同。' },
  { id: 'avg', name: '使平均最大', k: 'D', why: 'D 的平均是 36，最高；尽管它的处境最差者（13）比 C 少。' },
  { id: 'dp', name: '差别原则', k: 'C', why: 'C 中处境最差的群体得到 15，是四种经济中最多的。差别原则看的不是平等本身，也不是平均值，而是最差者的处境。' },
];

interface Saved {
  veil: E | null;
  ans: Partial<Record<P, E>>;
}
const INIT: Saved = { veil: null, ans: {} };

export default function DistributionChooser() {
  const [st, save] = useSavedIx<Saved>('EA11', ID, INIT);
  const done = PRINCIPLES.filter((p) => st.ans[p.id]).length;
  const right = PRINCIPLES.filter((p) => st.ans[p.id] === p.k).length;
  const all = done === PRINCIPLES.length;

  return (
    <section className="md c3 c5" aria-labelledby="dc-title">
      <header className="md-head">
        <p className="md-tag">差别原则 · 选择</p>
        <h3 id="dc-title" className="md-title">如果你不知道自己会落在哪一列，你选哪一种经济？</h3>
        <p className="md-lede">
          先在无知之幕之后作一个选择（这一步没有标准答案），再判断三条原则各会选哪一种经济。数字是本章构造的。
        </p>
      </header>

      <div className="c2-scroll" tabIndex={0} role="region" aria-label="四种经济（可横向滚动）">
        <table className="c2-grid">
          <thead>
            <tr>
              <th scope="col">经济</th>
              <th scope="col">处境最差的群体</th>
              <th scope="col">中间的群体</th>
              <th scope="col">处境最好的群体</th>
              <th scope="col">平均</th>
            </tr>
          </thead>
          <tbody>
            {ES.map(([e]) => (
              <tr key={e} className={st.veil === e ? 'is-on' : undefined} aria-current={st.veil === e ? 'true' : undefined}>
                <th scope="row">{ROWS[e].label}</th>
                {ROWS[e].v.map((n, i) => (
                  <td key={i}>{n}</td>
                ))}
                <td>{ROWS[e].avg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Band>一 · 在无知之幕之后</Band>
      <Pick label="在无知之幕之后选择一种经济" value={st.veil} opts={ES} onPick={(v) => save({ ...st, veil: v })} />
      {st.veil && (
        <p className="md-muted" aria-live="polite">
          {VEIL[st.veil]}
        </p>
      )}

      <Band>
        二 · 三条原则各选哪一种？（已判断 {done} / {PRINCIPLES.length}）
      </Band>
      <ol className="v21-steps" aria-label="三条原则">
        {PRINCIPLES.map((p, i) => {
          const a = st.ans[p.id];
          return (
            <li key={p.id} className="v21-step">
              <span className="v21-n" aria-hidden="true">
                {i + 1}
              </span>
              <span>
                <b>{p.name}</b>
                <Pick label={`${p.name}会选哪一种经济`} value={a ?? null} opts={ES} onPick={(v) => save({ ...st, ans: { ...st.ans, [p.id]: v } })} />
                {a && (
                  <span aria-live="polite">
                    <Verdict ok={a === p.k} yes="对" no="再想想" />
                    {a === p.k ? p.why : '回到表格：这条原则只看哪一列，或者哪一个数字？'}
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ol>

      {all && (
        <div aria-live="polite">
          <Band>三 · 差别原则不是什么（{right} / {PRINCIPLES.length} 项与本章一致）</Band>
          <Claim b="course">
            差别原则不要求结果平等：C 中最好的群体得到的是最差的群体的两倍多。它也不使平均最大：D 的平均更高，C 却胜过 D，因为 C 的处境最差者更好。
          </Claim>
          <Claim b="scholar" who="SEP 的原初状态条目">
            罗尔斯用最大最小规则论证的，主要是两个原则整体相对于功利主义的优越性；他列出了使这条规则合理的条件，而差别原则本身并不简单地等于最大最小规则。
          </Claim>
        </div>
      )}

      <Limits>
        <p>
          <b>四种经济和它们的数字是本章第四部分的构造。</b>罗尔斯的差别原则适用于社会的基本结构，并且处在平等的基本自由和公平的机会平等之后；真实的经济也不会只有三个群体和四个选项。这个练习只说明三条原则选择的依据不同，不对任何实际的经济政策下判断。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
