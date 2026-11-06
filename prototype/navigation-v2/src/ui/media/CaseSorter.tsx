import { useState } from 'react';
import { getMedia, setMedia } from '../../state/store';

// 活动 C（下）as a structured worksheet. The four cases and the question are
// the draft's own (五 · 同一个词，两种用法). The draft gives no answer key, so
// nothing is marked right or wrong: the learner's pattern is shown back as a
// question about where the disagreement lies.

const CASES = ['婴儿看到食物会伸手去抓', '小孩看到另一个孩子哭，会皱起眉头', '孝子在冬天先给父亲暖好被窝', '一个受过礼仪训练的人，在长辈面前自然而然地生出敬意'];

type Verdict = 'yes' | 'no' | 'unsure';
type Source = 'def' | 'fact' | 'both' | 'none';
interface Row {
  m?: Verdict;
  x?: Verdict;
  why?: Source;
}

const VERDICTS: [Verdict, string][] = [
  ['yes', '算作“性”'],
  ['no', '不算'],
  ['unsure', '难以判断'],
];
const SOURCES: [Source, string][] = [
  ['def', '定义不同'],
  ['fact', '对事实看法不同'],
  ['both', '两者都有'],
  ['none', '两人没有分歧'],
];
const LABEL: Record<Verdict, string> = { yes: '算', no: '不算', unsure: '难以判断' };

const ID = 'case-sorter';

function Choice<T extends string>({ name, legend, options, value, onPick }: { name: string; legend: string; options: [T, string][]; value?: T; onPick: (v: T) => void }) {
  return (
    <fieldset className="cs-group">
      <legend>{legend}</legend>
      <div className="md-seg">
        {options.map(([v, label]) => (
          <label key={v} className={'md-seg-opt' + (value === v ? ' is-on' : '')}>
            <input type="radio" name={name} value={v} checked={value === v} onChange={() => onPick(v)} />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function CaseSorter() {
  const [rows, setRows] = useState<Row[]>(() => {
    const saved = getMedia<Row[]>('CN1', ID, []);
    return CASES.map((_, i) => saved[i] ?? {});
  });
  const [defs, setDefs] = useState(false);

  const update = (i: number, patch: Row) => {
    const next = rows.map((r, j) => (j === i ? { ...r, ...patch } : r));
    setRows(next);
    setMedia('CN1', ID, next);
  };
  const reset = () => {
    const empty = CASES.map(() => ({}));
    setRows(empty);
    setMedia('CN1', ID, empty);
  };

  const done = rows.every((r) => r.m && r.x && r.why);
  const filled = rows.filter((r) => r.m && r.x && r.why).length;
  const split = rows.map((r, i) => ({ ...r, i })).filter((r) => r.m && r.x && r.m !== r.x);
  const agreeButSplit = rows.map((r, i) => ({ ...r, i })).filter((r) => r.m && r.x && r.m === r.x && r.why && r.why !== 'none');
  const splitButNone = split.filter((r) => r.why === 'none');

  return (
    <section className="md cs" aria-labelledby="cs-title">
      <header className="md-head">
        <p className="md-tag">逐项判断</p>
        <h3 id="cs-title" className="md-title">
          用两种定义检验四个案例
        </h3>
        <p className="md-lede">
          对每个案例分别判断：孟子会不会把它算作“性”？荀子会不会？再判断两人的分歧来自哪里。本题没有标准答案，也不计分；选择只保存在这台设备上。判断“分歧来自哪里”时，可以对照上面活动 C 的几道题。
        </p>
      </header>

      <button type="button" className="md-disclose" aria-expanded={defs} aria-controls="cs-defs" onClick={() => setDefs((d) => !d)}>
        {defs ? '收起两种定义' : '先对照两种定义（摘自本章）'}
      </button>
      {defs && (
        <div id="cs-defs" className="cs-defs">
          <div>
            <p className="cs-defs-k">孟子的“性”</p>
            <p>人在适当条件下会发展成的样子，强调人区别于禽兽的道德倾向（6A6）。</p>
            <p className="cs-defs-src">本章第五节对照表</p>
          </div>
          <div>
            <p className="cs-defs-k">荀子的“性”</p>
            <p className="cs-q">生之所以然者謂之性。</p>
            <p className="cs-defs-src">《荀子·正名》</p>
            <p className="cs-q">凡性者，天之就也，不可學，不可事。</p>
            <p className="cs-defs-src">《荀子·性恶》</p>
          </div>
        </div>
      )}

      <ol className="cs-cases">
        {CASES.map((c, i) => {
          const r = rows[i];
          return (
            <li key={i} className={'cs-case' + (r.m && r.x && r.why ? ' is-done' : '')}>
              <p className="cs-case-t">
                <span className="cs-n">（{i + 1}）</span>
                {c}
              </p>
              <div className="cs-grid">
                <Choice name={`cs-${i}-m`} legend="孟子" options={VERDICTS} value={r.m} onPick={(v) => update(i, { m: v })} />
                <Choice name={`cs-${i}-x`} legend="荀子" options={VERDICTS} value={r.x} onPick={(v) => update(i, { x: v })} />
                <Choice name={`cs-${i}-w`} legend="分歧来自" options={SOURCES} value={r.why} onPick={(v) => update(i, { why: v })} />
              </div>
            </li>
          );
        })}
      </ol>

      <div className="md-feedback" aria-live="polite">
        {!done ? (
          <p className="md-muted">已完成 {filled} / 4 个案例。四个都判断完以后，这里会把你的判断整理出来。</p>
        ) : (
          <>
            <p className="md-fb-k">你的判断</p>
            <table className="cs-sum">
              <thead>
                <tr>
                  <th scope="col">案例</th>
                  <th scope="col">孟子</th>
                  <th scope="col">荀子</th>
                  <th scope="col">分歧来自</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className={r.m !== r.x ? 'is-split' : ''}>
                    <td>（{i + 1}）</td>
                    <td>{LABEL[r.m!]}</td>
                    <td>{LABEL[r.x!]}</td>
                    <td>{SOURCES.find(([v]) => v === r.why)![1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="md-fb-k">再追问一步</p>
            <ul className="md-fb-list">
              {split.length > 0 ? (
                <li>
                  你在案例 {split.map((r) => `（${r.i + 1}）`).join('')} 给了两人不同的判断。试着两人都用荀子的定义（生来就有、不用学）重新判断：分歧还在吗？如果消失了，它就是用词之争；如果还在，争的是“这种反应是不是生来就有”这个事实。
                </li>
              ) : (
                <li>你给两人的判断全都相同。那么孟荀之争在这四个案例上还剩下什么？想一想：两人对“性”的定义不同，判断却一样，这说明了什么？</li>
              )}
              {splitButNone.length > 0 && (
                <li>
                  案例 {splitButNone.map((r) => `（${r.i + 1}）`).join('')}：你给了两人不同的判断，却选了“两人没有分歧”。这两个选择能同时成立吗？
                </li>
              )}
              {agreeButSplit.length > 0 && (
                <li>
                  案例 {agreeButSplit.map((r) => `（${r.i + 1}）`).join('')}：两人判断相同，你仍认为有分歧。这个分歧落在哪里：是他们给出同一判断的理由不同吗？
                </li>
              )}
              <li>可以用本节的判断流程图（用词之争还是实质之争）逐一检验你的答案。</li>
            </ul>
          </>
        )}
        <button type="button" className="md-reset" onClick={reset}>
          清空重做
        </button>
      </div>
    </section>
  );
}
