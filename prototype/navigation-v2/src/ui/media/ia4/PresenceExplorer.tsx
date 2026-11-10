import { Band, Claim, Limits, Seg, Step, useSavedIx, Verdict } from '../ia3/shared';

// 二 · after the "四种认识" table (its last paragraph: "表格是本章的整理。"现代的反驳"一列…").
// 1. Sort five cases: through a representation, or by presence (Suhrawardī's
//    generalisation, as the chapter's table gives it)?
// 2. The regress: add representations of oneself and watch the chain grow;
//    the chapter's seven-step reconstruction alongside.
// 3. The modern objection from the table, as a view with no verdict.
// No Persian or Arabic is quoted: the chapter verifies no Suhrawardī passage;
// everything rests on the SEP entry (notes 12–14) and the chapter's table.

const ID = 'presence-explorer';

type K = 'rep' | 'pres';
const CASES: { k: string; t: string; a: K; s: string }[] = [
  { k: 'tree', t: '我想起昨天看到的那棵树', a: 'rep', s: '通过表象：树的形象是中介；可能记错。' },
  { k: 'pain', t: '我感到痛', a: 'pres', s: '在场：SEP 条目所说的典型例子，痛直接在我面前，不需要一个关于痛的"表象"。' },
  { k: 'self', t: '我意识到"我"在想', a: 'pres', s: '在场：认识者与被认识者是同一个东西。' },
  { k: 'photo', t: '我认出照片上的人是我自己', a: 'rep', s: '通过表象：照片是"它"。而且，要认出它代表我，我必须已经认识我自己：这就是下面倒退论证的第 3—4 步。' },
  { k: 'say', t: '我对别人说"我现在很痛"', a: 'rep', s: '说出来的时候，已经是一个命题，变成了表象的知识（表格最后一行）。' },
];

type Obj = 'concept' | 'error' | 'name';
const OBJ: Record<Obj, { t: string; o: string; r: string }> = {
  concept: {
    t: '对痛的"知道"也包含概念（"这是痛"）',
    o: '如果没有"痛"这个概念，我只是有痛，而不是知道我在痛。',
    r: '苏赫拉瓦迪一方可以区分：有痛本身就是痛对我的在场；"这是痛"是在它之上形成的表象的知识，它预设了前者。',
  },
  error: {
    t: '人可能把焦虑误认为痛',
    o: '如果会认错，在场的知识就不是"不可能出错"的。',
    r: '苏赫拉瓦迪一方可以说：出错的是"这是痛"这个判断，不是感受本身的在场。代价是：不可错的部分，越来越不像通常所说的"知识"。',
  },
  name: {
    t: '不能说出来的东西，还算"知识"吗？',
    o: '知识应当是可真可假的；在场不能形成命题，所以无所谓真假。',
    r: '这取决于怎样定义"知识"；争论的一部分是关于这个词的。苏赫拉瓦迪的论点是：一切表象的知识都依赖于它。',
  },
};

const RECON = [
  '假设我对我自己的知识，是通过我心中的一个关于我的表象 R 而获得的。',
  '那么，R 是一个"它"：一个在我心中的、代表某个东西的形象。',
  '要通过 R 认识我自己，我必须知道 R 代表的是我，而不是别的什么。',
  '要知道 R 代表的是我，我必须已经认识我自己（以便把 R 与我对照）。',
  '如果这个"已经有的"认识又是通过另一个表象 R′，同样的问题会再次出现，以至无穷。',
  '所以，至少有一种对我自己的认识，不是通过表象的；它是我对我自己的直接在场。',
  '这种认识中，认识者与被认识者是同一个东西；不需要任何中介。',
];

interface Saved {
  pick: Record<string, K>;
  depth: number;
  stop: boolean;
  obj: Obj | null;
}
const INIT: Saved = { pick: {}, depth: 0, stop: false, obj: null };
const MAX = 4;

export default function PresenceExplorer() {
  const [st, save] = useSavedIx<Saved>('IA4', ID, INIT);
  const set = (x: Partial<Saved>) => save({ ...st, ...x });
  const pick = st.pick ?? {};
  const depth = Math.min(Math.max(st.depth ?? 0, 0), MAX);
  const on = st.stop ? 6 : depth === 0 ? 1 : depth === 1 ? 4 : 5;
  const primes = (i: number) => 'R' + '′'.repeat(i);

  return (
    <section className="md c3 c5" aria-labelledby="pe-title">
      <header className="md-head">
        <p className="md-tag">在场与表象 · 探索</p>
        <h3 id="pe-title" className="md-title">
          我怎样知道我自己？
        </h3>
        <p className="md-lede">先把几个例子分成"通过表象"和"在场"两类；再试着用表象来解释自我认识，看会发生什么。分类依据本章的表格，倒退论证是本章的重建。</p>
      </header>

      <Band>一 · 通过表象，还是在场？</Band>
      <div className="v22-rows">
        {CASES.map((c) => (
          <div key={c.k} className="v22-row">
            <p>{c.t}</p>
            <Seg
              name={'pe-' + c.k}
              label={c.t}
              value={pick[c.k] ?? null}
              opts={[
                ['rep', '通过表象'],
                ['pres', '在场'],
              ]}
              onPick={(v) => set({ pick: { ...pick, [c.k]: v } })}
            />
            {pick[c.k] && (
              <p className="md-feedback" aria-live="polite">
                <Verdict ok={pick[c.k] === c.a} yes="与本章的表格一致" no="按苏赫拉瓦迪的区分，应当是另一类" />
                {c.s}
              </p>
            )}
          </div>
        ))}
      </div>

      <Band>二 · 用表象来认识自己</Band>
      <p>每按一次"再加一个表象"，就试着用一个新的表象来说明：我怎么知道上一个表象代表的是我？</p>
      <div className="v22-chain" aria-live="polite" aria-label={st.stop ? '链条停在直接的在场' : `已有 ${depth + 1} 个表象`}>
        <span className="is-self">我</span>
        {Array.from({ length: depth + 1 }, (_, i) => (
          <span key={i}>← {primes(i)}</span>
        ))}
        {st.stop ? <span className="is-self">直接在场</span> : depth >= MAX ? <span>…</span> : null}
      </div>
      <div className="v22-btns">
        <button type="button" className="v22-btn" disabled={st.stop || depth >= MAX} onClick={() => set({ depth: depth + 1 })}>
          再加一个表象
        </button>
        <button type="button" className="v22-btn" disabled={st.stop} onClick={() => set({ stop: true })}>
          停下：不通过表象
        </button>
      </div>
      <p className="md-muted" aria-live="polite">
        {st.stop
          ? '链条停下来，靠的不是又一个表象，而是我对我自己的直接在场（第 6—7 步）。'
          : depth >= MAX
            ? '每一个新的表象都提出同样的问题，以至无穷（第 5 步）。'
            : depth === 0
              ? '只有一个表象 R：可我怎么知道 R 代表的是我？'
              : `已经有 ${depth + 1} 个表象，问题仍然没有解决。`}
      </p>
      <ol className="v21-steps">
        {RECON.map((t, i) => (
          <Step key={i} n={i + 1} on={i + 1 === on || (st.stop && i + 1 === 7)}>
            {t}
          </Step>
        ))}
      </ol>

      <Band>三 · 一个现代的反驳</Band>
      <Seg name="pe-obj" label="选择一个反驳" value={st.obj} col opts={(Object.keys(OBJ) as Obj[]).map((k) => [k, OBJ[k].t] as const)} onPick={(v) => set({ obj: v })} />
      {st.obj && (
        <div aria-live="polite">
          <Claim b="course" who="反驳">
            {OBJ[st.obj].o}
          </Claim>
          <Claim b="course" who="可能的回答">
            {OBJ[st.obj].r}
          </Claim>
          <p className="md-muted">这些反驳是本章为讨论而设想的一般性反驳，不代表某一位具体的哲学家；这里不判对错。</p>
        </div>
      )}

      <Limits>
        <p>
          <b>这不是苏赫拉瓦迪原文的逐句转述。</b>本章没有核对苏赫拉瓦迪的原文；"在场"的说明依据 SEP 的条目，倒退论证是本章依据通行解释的整理。与阿维森纳"飞人"的比较，见本章第二部分的"想一想"。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
