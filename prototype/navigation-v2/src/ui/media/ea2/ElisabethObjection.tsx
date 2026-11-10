import { Band, Claim, Limits, OrigSrc, Pick, Step, useSavedIx } from '../jw1/shared';

// 三 · after "她还指出另一类事实" (the 'vapours' paragraph).
// 1. Elisabeth's letter of May 1643, the chapter's checked passage (AT III 661, note 23).
// 2. The chapter's seven-step reconstruction: pick a premise to give up and see
//    who, in this chapter, takes that way out, and at what cost.
// 3. No verdict: scholars read her final position differently (note 26).

const ID = 'elisabeth-objection';

const STEPS = [
  '意志的行动要求灵魂能"决定"身体中精气的运动（改变它的方向）。',
  '一切运动的决定，都以三种方式之一发生：被推动者受到的推动；推动者推动它的方式；推动者表面的性质和形状。',
  '前两种方式需要接触；第三种需要广延。',
  '按照笛卡尔的定义，灵魂没有广延。',
  '接触与一个非物质的东西不相容（接触需要表面，表面需要广延）。',
  '所以，按照笛卡尔对灵魂的定义，灵魂不能决定身体的运动。',
  '所以，要么给出一种不同的因果性的说明，要么修改对灵魂本性的说明。',
];

type Deny = 1 | 2 | 4 | 5;
const DENY: Record<Deny, { t: string; who: string; b: 'text' | 'scholar' | 'common' | 'course'; how: string; cost: string }> = {
  2: {
    t: '放弃第 2 步：还有别的因果方式',
    who: '笛卡尔，1643 年 5 月 21 日的回信',
    b: 'scholar',
    how: '身心的结合是一个"原初概念"；灵魂推动身体的力量依赖这个概念，不能用广延的概念去理解。他还用经院哲学的"重量"作类比：重量被设想为不需要接触就推动物体的性质。',
    cost: '伊丽莎白拒绝了"重量"的类比：这种"实在性质"正是笛卡尔自己论证过不可理解的东西。据 SEP 条目，研究者认为这个回答"不仅是回避的"。',
  },
  4: {
    t: '放弃第 4 步：灵魂有广延',
    who: '伊丽莎白，1643 年 6 月的回信（据通行的介绍）',
    b: 'common',
    how: '承认灵魂有物质和广延，比承认一个非物质的存在者有推动身体和被身体推动的能力，对她来说更容易。身体的"郁气"会影响思想，也指向这个方向。',
    cost: '她同时坚持我们有思想的自主，不把思想归结为身体状态。学者们对她最终的立场有不同的解读：Shapiro 认为她没有明确主张另一种立场；Janssen-Lauret 认为她接受了一种"自然主义的二元论"。',
  },
  5: {
    t: '放弃第 5 步：没有广延也能接触',
    who: '本章的重建',
    b: 'course',
    how: '本章提到的哲学家没有一位走这条路。要走它，就要说明一种没有表面的"接触"是什么。',
    cost: '在当时机械论的因果观中，接触就是表面与表面的接触；这一步的前提几乎没有人质疑。',
  },
  1: {
    t: '放弃第 1 步：灵魂根本不推动身体',
    who: '斯宾诺莎与莱布尼茨（本章第四、五部分）',
    b: 'scholar',
    how: '斯宾诺莎：心灵与身体是同一个东西在思想和广延之下的两种表达，两个序列对应，没有因果作用。莱布尼茨：单子没有窗户，身心的对应来自前定和谐。',
    cost: '斯宾诺莎：只有一个实体，个人只是样式。莱布尼茨：被造物之间没有真正的相互作用。',
  },
};
const DOPTS = ([2, 4, 5, 1] as Deny[]).map((k) => [k, DENY[k].t] as const);

interface Saved {
  deny: Deny | null;
}
const INIT: Saved = { deny: null };

export default function ElisabethObjection() {
  const [st, save] = useSavedIx<Saved>('EA2', ID, INIT);
  const d = st.deny ? DENY[st.deny] : null;

  return (
    <section className="md c3 c5" aria-labelledby="eo-title">
      <header className="md-head">
        <p className="md-tag">伊丽莎白的反驳 · 前提浏览</p>
        <h3 id="eo-title" className="md-title">
          要避开结论，必须放弃哪一个前提？
        </h3>
        <p className="md-lede">这个反驳的结论是第 6 步。如果不接受它，就必须放弃前面的某一个前提。选一个，看谁走了这条路，代价是什么。这里不判胜负。</p>
      </header>

      <Band>一 · 原文</Band>
      <OrigSrc
        src="伊丽莎白致笛卡尔，1643 年 5 月 6/16 日，《笛卡尔全集》第三卷，第 661 页"
        lang="fr"
        orig="L'attouchement est requis aux deux premières conditions, & l'extension a la troisiesme. Vous excludez entièrement celle-cy de la notion que vous auez de l'ame, & celuy-la me paroist incompatible auec vne chose immaterielle."
        zh="前两个条件需要接触，第三个条件需要广延。您把广延完全排除在您对灵魂的概念之外，而接触在我看来与一个非物质的东西是不相容的。"
      />

      <Band>二 · 七步重建</Band>
      <ol className="v21-steps" aria-label="伊丽莎白反驳的七步重建（本章的重建）">
        {STEPS.map((s, i) => (
          <Step key={i} n={i + 1} on={st.deny === i + 1}>
            {s}
            {st.deny === i + 1 && <b>　← 放弃这一步</b>}
          </Step>
        ))}
      </ol>

      <Band>三 · 放弃哪一个前提？</Band>
      <Pick label="选择要放弃的前提" value={st.deny} opts={DOPTS} onPick={(v) => save({ deny: v })} />
      {d && (
        <div aria-live="polite">
          <Claim b={d.b} who={d.who}>
            {d.how}
          </Claim>
          <Claim b={d.b === 'course' ? 'course' : 'scholar'} who="代价">
            {d.cost}
          </Claim>
        </div>
      )}
      <p className="md-muted">第 3 步是从第 2 步的三种方式直接读出来的；放弃它，等于放弃第 2 步对因果方式的分类。</p>

      <Limits>
        <p>
          <b>七步是本章的重建。</b>本课核对了伊丽莎白 1643 年 5 月信的法文原文（上面引的是其中两句）；笛卡尔 5 月 21 日的回信只核对了"原初的概念"一段，"重量"类比和伊丽莎白 6 月的回信没有核对原文，依据 SEP 条目和通行的介绍。"放弃第 5 步"一栏是本课为完整列出各种出路而设的，不代表任何一位哲学家的立场。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
