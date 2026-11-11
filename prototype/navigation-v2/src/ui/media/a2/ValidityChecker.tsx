import { Band, Claim, Limits, Pick, Verdict, useSavedIx } from '../jw1/shared';

// 二 · after the table of six forms checked by truth table
// (content/A2_SAMPLE_DRAFT.md). The reader picks one of the chapter's six
// forms; every row of its truth table is listed with the value of each premise
// and of the conclusion (computed below from the chapter's connective tables,
// no parser). The reader marks which rows are counterexample rows — premises
// all true, conclusion false — and then judges the form valid or invalid, which
// is the chapter's definition of validity applied by hand. Results agree with
// the chapter's table: MP, MT, DS, HS valid; AC, DA invalid at P 假 Q 真.

const ID = 'validity-checker';

type V = Record<string, boolean>;
const imp = (a: boolean, b: boolean) => !a || b;

type F = 'mp' | 'mt' | 'ac' | 'da' | 'ds' | 'hs';
const FORMS: Record<F, { name: string; vars: string[]; prem: [string, (v: V) => boolean][]; concl: [string, (v: V) => boolean] }> = {
  mp: { name: '肯定前件', vars: ['P', 'Q'], prem: [['P → Q', (v) => imp(v.P, v.Q)], ['P', (v) => v.P]], concl: ['Q', (v) => v.Q] },
  mt: { name: '否定后件', vars: ['P', 'Q'], prem: [['P → Q', (v) => imp(v.P, v.Q)], ['¬Q', (v) => !v.Q]], concl: ['¬P', (v) => !v.P] },
  ac: { name: '肯定后件', vars: ['P', 'Q'], prem: [['P → Q', (v) => imp(v.P, v.Q)], ['Q', (v) => v.Q]], concl: ['P', (v) => v.P] },
  da: { name: '否定前件', vars: ['P', 'Q'], prem: [['P → Q', (v) => imp(v.P, v.Q)], ['¬P', (v) => !v.P]], concl: ['¬Q', (v) => !v.Q] },
  ds: { name: '选言推理', vars: ['P', 'Q'], prem: [['P ∨ Q', (v) => v.P || v.Q], ['¬P', (v) => !v.P]], concl: ['Q', (v) => v.Q] },
  hs: { name: '假言三段论', vars: ['P', 'Q', 'R'], prem: [['P → Q', (v) => imp(v.P, v.Q)], ['Q → R', (v) => imp(v.Q, v.R)]], concl: ['P → R', (v) => imp(v.P, v.R)] },
};
const FS: readonly (readonly [F, string])[] = (Object.keys(FORMS) as F[]).map((f) => [f, FORMS[f].name] as const);

/** Rows in the chapter's order: 真 before 假, the first letter changing slowest. */
function rows(vars: string[]): V[] {
  const n = vars.length;
  return Array.from({ length: 2 ** n }, (_, i) => Object.fromEntries(vars.map((x, j) => [x, ((i >> (n - 1 - j)) & 1) === 0])));
}
const tv = (b: boolean) => (b ? '真' : '假');

type M = 'ce' | 'no';
const MS: readonly (readonly [M, string])[] = [
  ['ce', '反例行'],
  ['no', '不是反例行'],
];
type J = 'valid' | 'invalid';
const JS: readonly (readonly [J, string])[] = [
  ['valid', '有效'],
  ['invalid', '无效'],
];

interface Saved {
  form: F;
  mark: Record<string, M>;
  judge: Record<string, J>;
}
const INIT: Saved = { form: 'ac', mark: {}, judge: {} };

export default function ValidityChecker() {
  const [st, save] = useSavedIx<Saved>('A2', ID, INIT);
  const f = FORMS[st.form] ?? FORMS.ac;
  const rs = rows(f.vars);
  const info = rs.map((v) => {
    const ps = f.prem.map(([, fn]) => fn(v));
    const c = f.concl[1](v);
    const all = ps.every(Boolean);
    return { v, ps, c, all, ce: all && !c };
  });
  const valid = !info.some((r) => r.ce);
  const key = (i: number) => `${st.form}:${i}`;
  const marked = info.filter((_, i) => key(i) in st.mark).length;
  const allMarked = marked === info.length;
  const j = st.judge[st.form];
  const formula = `${f.prem.map(([s]) => s).join('，')} ⊨ ${f.concl[0]} ？`;

  return (
    <section className="md c3 c5" aria-labelledby="vc-title">
      <header className="md-head">
        <p className="md-tag">真值表 · 逐行检验</p>
        <h3 id="vc-title" className="md-title">找反例行</h3>
        <p className="md-lede">
          选一个形式。下面列出真值表的每一行，以及这一行中每个前提和结论的真值。请逐行判断：这一行是不是反例行——前提全真，而结论为假？全部判断完以后，再说这个形式有效还是无效。
        </p>
      </header>

      <Band>选一个形式</Band>
      <Pick label="要检验的形式" value={st.form} opts={FS} onPick={(v) => save({ ...st, form: v })} />
      <p className="md-muted">
        <span lang="und">{formula}</span>（共 {info.length} 行）
      </p>

      <Band>一 · 这一行是反例行吗？（已判断 {marked} / {info.length}）</Band>
      <ol className="v21-steps" aria-label={`${f.name}的真值表`}>
        {info.map((r, i) => {
          const a = st.mark[key(i)];
          const ok = a === (r.ce ? 'ce' : 'no');
          return (
            <li key={key(i)} className="v21-step">
              <span className="v21-n" aria-hidden="true">
                {i + 1}
              </span>
              <span>
                <span>
                  <b>{f.vars.map((x) => `${x} ${tv(r.v[x])}`).join('，')}</b>
                  {' ｜ '}
                  {f.prem.map(([s], k) => `${s}：${tv(r.ps[k])}`).join('；')}
                  {' ｜ 结论 '}
                  {f.concl[0]}：{tv(r.c)}
                </span>
                <Pick label={`第 ${i + 1} 行是不是反例行`} value={a} opts={MS} onPick={(v) => save({ ...st, mark: { ...st.mark, [key(i)]: v } })} />
                {a && (
                  <span aria-live="polite">
                    <Verdict ok={ok} yes="对" no="再看看" />{' '}
                    <span className="md-muted">{r.all ? (r.c ? '前提全真，结论也真：不是反例行。' : '前提全真，结论为假：这是反例行。') : '前提不全真：这一行不可能是反例行，不必看结论。'}</span>
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ol>

      {allMarked && (
        <div aria-live="polite">
          <Band>二 · 这个形式有效吗？</Band>
          <Pick label={`${f.name}有效还是无效`} value={j} opts={JS} onPick={(v) => save({ ...st, judge: { ...st.judge, [st.form]: v } })} />
          {j && (
            <p aria-live="polite">
              <Verdict ok={(j === 'valid') === valid} yes="对" no="不对" />{' '}
              <span className="md-muted">
                {valid
                  ? `没有一行前提全真而结论为假，所以${f.name}是有效的。`
                  : `第 ${info.findIndex((r) => r.ce) + 1} 行（${f.vars.map((x) => `${x} ${tv(info.find((r) => r.ce)!.v[x])}`).join('，')}）是反例行，所以${f.name}是无效的。`}
              </span>
            </p>
          )}
          {j && (
            <Claim b="course">
              有效的定义是"没有一行前提全真而结论为假"——不是"结论在每一行都真"。检验时，只需看前提全真的那些行。{st.form === 'ds' ? '选言推理用真值表是有效的；第三部分会看到，在本章的规则里证明它要用到爆炸规则 X。' : ''}
            </Claim>
          )}
        </div>
      )}

      <Limits>
        <p>
          <b>六个形式和它们的结果都出自本章第二部分的表格；每一列的真值按本章的联结词真值表计算。</b>
          这里替你算出了每一列的真值，练习的只是"有效"的定义本身；在纸上从原子命题一列一列算起，是更完整的练习。真值表只适用于命题逻辑；谓词逻辑要用证明和反例模型（第三、四部分）。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
