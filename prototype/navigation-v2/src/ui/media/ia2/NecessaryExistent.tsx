import { Band, Claim, Limits, OrigSrc, Seg, Step, useSavedIx, Verdict } from '../ia1/shared';

// 四 · after the three-proofs table ("表格是本章的整理。现代宗教哲学中的…").
// 1. Walk the ten-step reconstruction; toggle "finite / infinite chain" and
//    watch which steps change (none do).
// 2. Three objections, each pinned to the step it attacks, with a reply.
// 3. What the proof does not yet give (uniqueness, simplicity, …).
// The Arabic and its translation are the chapter's own (Forget 1892, p. 142,
// notes 23–25); the reconstruction and objections are the chapter's.

const ID = 'necessary-existent';

const STEPS = [
  '有东西存在。（前提）',
  '任何存在的东西，或者是本身必然的，或者是本身可能的。（第三部分的区分）',
  '如果其中有一个是本身必然的，那么必然存在者存在。证明完成。',
  '假设存在的东西都是本身可能的。每一个都需要一个原因，它的原因也需要一个原因，如此组成一个系列。',
  '考虑这个系列的整体。这个整体本身也是存在的东西。',
  '这个整体依赖于它的成员；依赖于别的东西的，不是本身必然的。所以它也是本身可能的，也需要一个原因。',
  '这个原因不能是整体中的某一个成员：一个成员只能是某些成员的原因，不能是整体（包括它自己和它自己的原因）的原因。',
  '所以，这个整体的原因必须在整体之外。',
  '整体包括了一切可能的东西；在它之外的，就不是可能的，所以是本身必然的。',
  '所以，必然存在者存在；任何原因的系列都"终止于"它。',
];

type Obj = 'whole' | 'member' | 'outside';
const OBJ: Record<Obj, { t: string; step: number; o: string; r: string; ob: 'course' | 'later' }> = {
  whole: {
    t: '整体只是成员的总和',
    step: 6,
    o: '如果每一个成员都已经由前一个成员说明了，整体就不需要另外的原因；"整体"不是成员之外的又一个东西。（这是后来的哲学家，例如休谟，常提出的反驳；本章的概括）',
    r: '阿维森纳可以回答：问题不是"每一个成员为什么存在"，而是"为什么有这样一个由可能者组成的系列存在，而不是没有"；每一个成员的原因都在系列之内，这个问题的答案不能在系列之内。',
    ob: 'later',
  },
  member: {
    t: '某一个成员也可以是整体的原因',
    step: 7,
    o: '一个系列的"第一个"成员，难道不能是整体的原因吗？',
    r: '如果那个成员是可能的，它本身也需要原因，而它的原因就在整体之中，它却不是那个原因的原因。所以它不能是"整体"的原因。如果它不是可能的，它就是必然存在者，证明在第 3 步已经完成。',
    ob: 'course',
  },
  outside: {
    t: '在整体之外的，可以什么都没有',
    step: 9,
    o: '也许整体根本没有原因：它就是存在着，这是一个"无法解释的事实"。',
    r: '这等于否认第 6 步：一个本身可能的东西没有原因而存在。对阿维森纳来说，"本身可能"的意思正是：它的存在与不存在都不由它自身决定，所以需要一个原因。这个反驳实际上攻击的是第 2 步的区分。',
    ob: 'course',
  },
};

const NOT = ['唯一', '单纯（没有部分）', '本质就是它的存在', '有知识、有意志', '就是某一个宗教所崇拜的神'];

interface Saved {
  inf: boolean;
  at: number;
  obj: Obj | null;
  guess: Partial<Record<Obj, number>>;
}
const INIT: Saved = { inf: false, at: 0, obj: null, guess: {} };

export default function NecessaryExistent() {
  const [st, save] = useSavedIx<Saved>('IA2', ID, INIT);
  const set = (x: Partial<Saved>) => save({ ...st, ...x });
  const at = Math.min(Math.max(st.at ?? 0, 0), STEPS.length - 1);
  const o = st.obj ? OBJ[st.obj] : null;
  const g = st.obj ? st.guess?.[st.obj] : undefined;

  return (
    <section className="md c3 c5" aria-labelledby="ne-title">
      <header className="md-head">
        <p className="md-tag">必然存在者 · 工作坊</p>
        <h3 id="ne-title" className="md-title">
          从"可能"到"必然"：十步重建
        </h3>
        <p className="md-lede">逐步走完本章对证明的重建；把原因的系列切换为有限或无限，看哪一步会因此改变。再看三个反驳各自攻击哪一步，以及这个证明还没有证明什么。</p>
      </header>

      <OrigSrc
        src="阿维森纳《指要与诠解》第四指要，Forget 本第 142 页"
        lang="ar"
        orig="كلّ سلسلة مرتّبة من علل ومعلولات كانت متناهية او غير متناهية فقد ظهر انّها اذا لم يكن فيها الّا معلول احتاجت الى علّة خارجة عنها لكنّها تتّصل بها لا محالة طرفا وظهر انّه ان كان فيها ما ليس بمعلول فهو طرف ونهاية فكلّ سلسلة تنتهي الى واجب الوجود بذاته"
        zh="任何由依次排列的原因和结果组成的系列，无论是有限的还是无限的，已经清楚：如果其中只有结果，它就需要一个在它之外的原因，而这个原因必然作为一端与它相连；也已经清楚：如果其中有不是结果的东西，那么它就是一端和终点。所以，任何系列都终止于本身必然的存在者。"
      />

      <Band>一 · 逐步走一遍</Band>
      <Seg
        name="ne-inf"
        label="原因的系列"
        value={st.inf ? 'inf' : 'fin'}
        opts={[
          ['fin', '假定系列是有限的'],
          ['inf', '假定系列是无限的'],
        ]}
        onPick={(v) => set({ inf: v === 'inf' })}
      />
      <ol className="v21-steps">
        {STEPS.map((s, i) => (
          <Step key={i} n={i + 1} on={i === at}>
            {s}
          </Step>
        ))}
      </ol>
      <div className="md-steps-nav">
        <button type="button" className="md-disclose" onClick={() => set({ at: at - 1 })} disabled={at === 0}>
          上一步
        </button>{' '}
        <button type="button" className="md-disclose" onClick={() => set({ at: at + 1 })} disabled={at === STEPS.length - 1}>
          下一步
        </button>
        {' '}<span className="md-muted" aria-live="polite">
          第 {at + 1} / {STEPS.length} 步
        </span>
      </div>
      <p className="md-feedback" aria-live="polite">
        {st.inf
          ? '系列是无限的：第 4 步的系列没有第一个成员；但第 5—9 步讨论的是整体，整体无论多长，仍然由可能者组成，仍然需要在它之外的原因。没有一步因此失效。'
          : '系列是有限的：第 4 步的系列有一个第一个成员；它也是可能的，也需要原因。第 5—9 步不变。'}{' '}
        这正是引文中"无论是有限的还是无限的"的意思：证明不需要"世界有开端"，也不需要否定无限的系列。
      </p>

      <Band>二 · 三个反驳：它攻击哪一步？</Band>
      <Seg name="ne-obj" label="选择一个反驳" value={st.obj} col opts={(Object.keys(OBJ) as Obj[]).map((k) => [k, OBJ[k].t] as const)} onPick={(v) => set({ obj: v as Obj })} />
      {o && st.obj && (
        <div aria-live="polite">
          <Claim b={o.ob} who="反驳">
            {o.o}
          </Claim>
          <Seg
            name={'ne-g-' + st.obj}
            label="它攻击第几步"
            value={g ?? null}
            opts={[2, 6, 7, 9].map((n) => [n, `第 ${n} 步`] as const)}
            onPick={(v) => set({ guess: { ...st.guess, [st.obj as Obj]: v } })}
          />
          {g !== undefined && (
            <>
              <p className="md-feedback">
                <Verdict ok={g === o.step} yes="是" no={`本章的读法是第 ${o.step} 步`} />
                {st.obj === 'outside' ? '它表面上攻击第 9 步，实际上否认了第 6 步所依据的第 2 步的区分。' : ''}
              </p>
              <Claim b="course" who="阿维森纳一方的回答">
                {o.r}
              </Claim>
            </>
          )}
        </div>
      )}

      <Band>三 · 证明还没有证明什么</Band>
      <p>这个证明只得出"有一个本身必然的存在者"。下面这些性质，阿维森纳都用另外的论证去推，每一个都要分别检验：</p>
      <ul className="v21-aware">
        {NOT.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>

      <Limits>
        <p>
          <b>这不是"宇宙论论证"的又一个版本。</b>它不从运动出发，不需要世界有开端，也不需要否定无限的系列。十步重建是本章的重建；反驳和回答是本章的概括，不是阿维森纳或某一位批评者的原话。安萨里对这些推论的批评留给《安萨里、阿威罗伊与西方伊斯兰思想》。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
