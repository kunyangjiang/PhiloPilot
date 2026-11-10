import { Band, Claim, Limits, Pick, useSavedIx, Verdict } from '../jw1/shared';

// 四 · after the table of four positions.
// 1. Abelard's argument against "a common thing" (SEP, note 27), run on a
//    concrete case: Socrates sits in Rome, Plato stands in Athens.
// 2. The four positions (the chapter's table): what the universal is, how the
//    position avoids the contrary-properties problem, and what it still owes.
// No passage is quoted: the chapter checked none of these texts in the original.

const ID = 'universals-workshop';

type Pose = 'sit' | 'stand' | 'both';
type Pos = 'thing' | 'nature' | 'abelard' | 'ockham';
const POS: Record<Pos, { t: string; who: string; u: string; c: string; d: string }> = {
  thing: {
    t: '实质的实在论',
    who: '香浦的威廉（早期）',
    u: '个体中一个共同的事物。',
    c: '避免不了：这正是阿伯拉尔的攻击对象。',
    d: '个体在实体上同一，相反的性质同时存在。',
  },
  nature: {
    t: '温和的实在论',
    who: '阿奎那、司各脱（各有不同）',
    u: '个体中的共同本性，在心灵中成为普遍的。',
    c: '本性在苏格拉底身上是个别的，在柏拉图身上也是个别的；它只在心灵中是普遍的，所以没有一个东西同时坐着又站着。这个区分来自阿维森纳："马性就只是马性"。',
    d: '本性"本身"——既不普遍也不个别——是什么地位？',
  },
  abelard: {
    t: '阿伯拉尔的立场',
    who: '阿伯拉尔',
    u: '可以述说许多东西的语词；它有一个共同的原因：每一个人都有"是人"的状态（status）。',
    c: '"状态"不是一个事物，所以没有一个东西要同时坐着又站着；可是个体之间的相似仍然是真实的，不是任意起的名字。',
    d: '"状态"不是事物，又是什么？',
  },
  ockham: {
    t: '唯名论',
    who: '奥卡姆',
    u: '普遍的概念和语词；心灵之外只有个别的事物。',
    c: '心灵之外根本没有共同的东西，问题不会产生。',
    d: '怎样说明个体之间真实的相似？',
  },
};

interface Saved {
  pose: Pose | null;
  pos: Pos | null;
}
const INIT: Saved = { pose: null, pos: null };

export default function UniversalsWorkshop() {
  const [st, save] = useSavedIx<Saved>('EA1', ID, INIT);
  const set = (x: Partial<Saved>) => save({ ...st, ...x });
  const p = st.pos ? POS[st.pos] : null;

  return (
    <section className="md c3 c5" aria-labelledby="uw-title">
      <header className="md-head">
        <p className="md-tag">共相之争 · 立场工作坊</p>
        <h3 id="uw-title" className="md-title">
          "人"坐着还是站着？
        </h3>
        <p className="md-lede">先用一个具体的例子走一遍阿伯拉尔的反驳，再看四种立场各自怎样避开它，又各自留下了什么问题。四种立场没有一种被判为正确。</p>
      </header>

      <Band>一 · 如果"人"是一个共同的事物</Band>
      <p>此刻，苏格拉底在罗马，坐着；柏拉图在雅典，站着。假设"人"是一个在所有人身上的、有自己数目上统一性的事物，而且它构成每一个人的实体。那么，这个"人"此刻：</p>
      <Pick
        label="这个共同的“人”此刻坐着还是站着？"
        value={st.pose}
        opts={[
          ['sit', '坐着'],
          ['stand', '站着'],
          ['both', '既坐着又站着'],
        ]}
        onPick={(v) => set({ pose: v })}
      />
      {st.pose && (
        <p className="md-feedback" aria-live="polite">
          <Verdict ok={st.pose === 'both'} yes="这正是阿伯拉尔推出的结论" no="可是这样就对不上另一个人了" />
          {st.pose === 'sit' && '那么站着的柏拉图，在实体上就不是这个"人"。'}
          {st.pose === 'stand' && '那么坐着的苏格拉底，在实体上就不是这个"人"。'}
          如果所有人在实体上是同一个东西，这个东西就要同时坐着又站着、同时在罗马又在雅典——同时具有一切相反的性质。这是不可能的。所以，共相不能是"一个共同的事物"。
        </p>
      )}

      <Band>二 · 四种立场怎样避开这个困难？</Band>
      <Pick label="选择一种立场" value={st.pos} opts={(Object.keys(POS) as Pos[]).map((k) => [k, POS[k].t] as const)} onPick={(v) => set({ pos: v })} />
      {p && (
        <div aria-live="polite">
          <dl className="v23-dl">
            <dt>代表</dt>
            <dd>{p.who}</dd>
            <dt>共相是什么</dt>
            <dd>{p.u}</dd>
            <dt>坐着与站着</dt>
            <dd>{p.c}</dd>
            <dt>还欠一个说明</dt>
            <dd>{p.d}</dd>
          </dl>
          {st.pos === 'abelard' && (
            <Claim b="scholar" who="SEP 关于阿伯拉尔的条目">
              称他为"第一位伟大的唯名论哲学家"；但他的立场与后来奥卡姆的唯名论并不相同。
            </Claim>
          )}
        </div>
      )}

      <Limits>
        <p>
          <b>"实在论、概念论、唯名论"只是入门的路标。</b>SEP 条目提醒，这种粗略的分类不能充分反映中世纪思想家之间更细微的差异。论证和各立场的内容（包括坐着与站着的例子），依据本章对 SEP 条目的转述；"坐着与站着"一栏的应用是本章的整理。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
