import { Band, Claim, Limits, Pick, Verdict, useSavedIx } from '../jw1/shared';

// 五 · after the table of the four kinds of objection
// (content/A1_SAMPLE_DRAFT.md). Two steps on the chapter's own running example
// ("我们不该吃肉，因为动物也会感到痛苦"): first sort five sentences into
// conclusion, stated premise, hidden premise to supply, or an over-strong
// supplement (the straw-man risk of 二); then say what each of the chapter's
// four sample objections is aimed at (推理、前提、推论、相关性). Every sentence
// and every objection is quoted from the chapter; the roles follow its 二 and
// its table in 五. Nothing is scored or totalled beyond a count shown once.

const ID = 'argument-roles';

type R = 'concl' | 'stated' | 'hidden' | 'strong';
const RS: readonly (readonly [R, string])[] = [
  ['concl', '结论'],
  ['stated', '说出的前提'],
  ['hidden', '要补上的隐含前提'],
  ['strong', '过强的补充'],
];
const RNAME: Record<R, string> = Object.fromEntries(RS) as Record<R, string>;

// Listed out of order on purpose.
const SENTS: { id: string; text: string; r: R; why: string }[] = [
  { id: 's-pain', text: '动物会感到痛苦。', r: 'stated', why: '"因为"后面说出的理由。' },
  { id: 's-strong', text: '一切会感到痛苦的东西都不该被吃。', r: 'strong', why: '它也能让推理成立，但比说话人需要的强得多，很容易被反驳；故意补上它，就是在制造稻草人。' },
  { id: 's-meat', text: '我们不该吃肉。', r: 'concl', why: '这段话最终想让你相信的东西。' },
  { id: 's-cause', text: '吃肉会给动物造成不必要的痛苦。', r: 'hidden', why: '没有它，推理不成立；本章认为真正有争议的正是这一句。' },
  { id: 's-norm', text: '我们不该造成不必要的痛苦。', r: 'hidden', why: '没有它，从"会痛苦"走不到"不该"；它几乎人人同意。' },
];

type O = 'inf' | 'prem' | 'cons' | 'rel';
const OS: readonly (readonly [O, string])[] = [
  ['inf', '推理'],
  ['prem', '前提'],
  ['cons', '推论（归谬）'],
  ['rel', '相关性'],
];
const ONAME: Record<O, string> = Object.fromEntries(OS) as Record<O, string>;

// The chapter's four sample objections, listed out of order on purpose.
const OBJS: { id: string; text: string; o: O; why: string }[] = [
  { id: 'o-ban', text: '"问题是该不该禁止吃肉，而你的论证只说明了个人该不该吃。"', o: 'rel', why: '论证也许完全正确，但它证明的不是争论中的那个结论。' },
  { id: 'o-need', text: '"吃肉造成的痛苦并不是不必要的：有些人在营养上确实需要肉。"', o: 'prem', why: '它指出哪一个前提有问题（"不必要的痛苦"那一句），并给出了理由。' },
  { id: 'o-pest', text: '"按照同样的理由，杀死吃庄稼的害虫也是错的。"', o: 'cons', why: '接受这个论证，会推出一个我们不能接受的结论；它不需要先指出哪一个前提错了。' },
  { id: 'o-painless', text: '"前提只说不该造成不必要的痛苦；如果有无痛的屠宰方式，结论就不成立。"', o: 'inf', why: '它说的是：即使前提都真，"不该吃肉"也不跟着来。' },
];

interface Saved {
  role: Record<string, R>;
  obj: Record<string, O>;
}
const INIT: Saved = { role: {}, obj: {} };

export default function ArgumentRoles() {
  const [st, save] = useSavedIx<Saved>('A1', ID, INIT);
  const rDone = SENTS.filter((s) => s.id in st.role).length;
  const rOk = SENTS.filter((s) => st.role[s.id] === s.r).length;
  const oDone = OBJS.filter((o) => o.id in st.obj).length;
  const oOk = OBJS.filter((o) => st.obj[o.id] === o.o).length;

  return (
    <section className="md c3 c5" aria-labelledby="ar-title">
      <header className="md-head">
        <p className="md-tag">重建与反驳 · 一个论证的两步</p>
        <h3 id="ar-title" className="md-title">先重建，再反驳</h3>
        <p className="md-lede">
          用本章贯穿始终的例子："我们不该吃肉，因为动物也会感到痛苦。"第一步，给五句话各找一个位置；第二步，说出本章的四个反驳各针对论证的哪一处。每选一项都会显示本章的理由，可以随时改选。
        </p>
      </header>

      <Band>一 · 这句话在论证中是什么？（已选 {rDone} / {SENTS.length}）</Band>
      <ol className="v21-steps" aria-label="五句话">
        {SENTS.map((s, i) => {
          const a = st.role[s.id];
          return (
            <li key={s.id} className="v21-step">
              <span className="v21-n" aria-hidden="true">
                {i + 1}
              </span>
              <span>
                <span>{s.text}</span>
                <Pick label={`第 ${i + 1} 句在论证中是什么`} value={a} opts={RS} onPick={(v) => save({ ...st, role: { ...st.role, [s.id]: v } })} />
                {a && (
                  <span aria-live="polite">
                    <Verdict ok={a === s.r} yes="与本章一致" no="与本章不一致" />
                    {a === s.r ? '' : ` 本章把它看作"${RNAME[s.r]}"。`}
                    <span className="md-muted"> {s.why}</span>
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ol>
      {rDone === SENTS.length && (
        <p className="md-muted" aria-live="polite">
          {rOk} / {SENTS.length} 句与本章一致。补隐含前提的两条规则：补上的前提要能让推理成立；补上的前提要是说话人可能会接受的。补出来以后，争论就集中到真正的分歧上——"吃肉会给动物造成不必要的痛苦"。
        </p>
      )}

      <Band>二 · 这个反驳针对的是什么？（已选 {oDone} / {OBJS.length}）</Band>
      <ol className="v21-steps" aria-label="四个反驳">
        {OBJS.map((o, i) => {
          const a = st.obj[o.id];
          return (
            <li key={o.id} className="v21-step">
              <span className="v21-n" aria-hidden="true">
                {i + 1}
              </span>
              <span>
                <span>{o.text}</span>
                <Pick label={`反驳 ${i + 1} 针对的是什么`} value={a} opts={OS} onPick={(v) => save({ ...st, obj: { ...st.obj, [o.id]: v } })} />
                {a && (
                  <span aria-live="polite">
                    <Verdict ok={a === o.o} yes="与本章一致" no="与本章不一致" />
                    {a === o.o ? '' : ` 本章把它看作针对"${ONAME[o.o]}"的反驳。`}
                    <span className="md-muted"> {o.why}</span>
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ol>
      {oDone === OBJS.length && (
        <div aria-live="polite">
          <p className="md-muted">{oOk} / {OBJS.length} 个与本章一致。</p>
          <Claim b="course">
            一个反驳要说清楚它认为论证在哪里出了问题。针对推理的反驳最彻底，但要先做宽容的重建；针对推论的反驳（归谬）常常最有说服力，对方却可以"接受推论"；针对相关性的反驳不必否认论证的任何一步。
          </Claim>
        </div>
      )}

      <Limits>
        <p>
          <b>五句话和四个反驳都出自本章第二、五部分；角色和类型按本章的重建与表格。</b>
          "过强的补充"不是一个标准的逻辑术语，而是本章第二部分对稻草人风险的说明。同一个反驳有时可以从不同的角度描述：例如"无痛的屠宰方式"也可以被重写成对前提的修改，这里按本章表格的归类。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
