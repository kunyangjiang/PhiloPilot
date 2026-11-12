import { Band, Claim, Limits, Pick, useSavedIx } from '../jw1/shared';

// 四 · after the two planets (天王星, 水星) and the paragraph that introduces
// the component: "下面的组件请你在两个案例中各选一个要修改的假定"
// (content/S10_SAMPLE_DRAFT.md). Three steps:
// 1. The reader picks a planet.
// 2. The reader picks which assumption to revise; the component shows what
//    that revision would predict that could be checked independently, and
//    restates Duhem's point (read just above the anchor).
// 3. Only then does the component show what actually happened. History follows
//    the chapter (common history of science; manuscript notes 12 and 14).
// The component sits before the chapter's Lakatos subsection, so it uses the
// chapter's own words at the anchor (核心的理论 / 辅助的假定) and only points
// forward to Lakatos; it does not give his reading away. The reader's choice
// is never marked right.

const ID = 'anomaly-case';

type C = 'uranus' | 'mercury';

interface Opt {
  id: string;
  text: string;
  layer: string;
  predicts: string;
}

const CASES: Record<C, { name: string; setup: string; opts: Opt[]; history: string }> = {
  uranus: {
    name: '天王星（十九世纪上半叶）',
    setup: '天王星的实际轨道，与按照牛顿力学加上已知行星的引力计算出的轨道不符。你要修改哪一个假定？',
    opts: [
      { id: 'core', text: '牛顿的引力定律在离太阳很远的地方不再精确', layer: '核心的理论', predicts: '要提出一条新的引力定律，它还必须同样好地说明其他行星的运动。' },
      { id: 'obs', text: '观测有误差', layer: '辅助的假定（仪器与观测）', predicts: '更仔细的重复观测应当使反常消失。' },
      { id: 'planet', text: '有一颗尚未被发现的行星在影响天王星', layer: '辅助的假定（太阳系中有几颗行星）', predicts: '可以计算出这颗行星应当在天空中的位置，用望远镜去找。' },
    ],
    history: '勒威耶和亚当斯各自选择了"未知的行星"，并计算出它应当在的位置。1846 年，伽勒在离预测位置很近的地方发现了海王星。修改辅助的假定，导出了一个新的、后来被证实的预测。',
  },
  mercury: {
    name: '水星（十九世纪中叶）',
    setup: '水星近日点的移动，比牛顿力学的计算多出一小部分。你要修改哪一个假定？',
    opts: [
      { id: 'core', text: '牛顿的引力理论本身需要修改', layer: '核心的理论', predicts: '新的理论必须精确地给出多出的那一部分，同时不破坏其他行星的成功。' },
      { id: 'obs', text: '观测有误差', layer: '辅助的假定（仪器与观测）', predicts: '更仔细的重复观测应当使反常消失。' },
      { id: 'planet', text: '在水星轨道内侧有一颗尚未被发现的行星（"火神星"）', layer: '辅助的假定（太阳系中有几颗行星）', predicts: '应当能在太阳附近观测到这颗行星（例如在日食时）。' },
    ],
    history: '勒威耶采用了与天王星同样的办法，假定了"火神星"；可是这颗行星始终没有被可靠地观测到。这个反常最终由爱因斯坦的广义相对论（1915）说明：这一次，需要修改的是牛顿的引力理论本身。',
  },
};
const ORDER: C[] = ['uranus', 'mercury'];
const COPTS: readonly (readonly [C, string])[] = ORDER.map((c) => [c, CASES[c].name] as const);

interface Saved {
  c: C | null;
  pick: Record<string, string>;
  shown: Record<string, boolean>;
}
const INIT: Saved = { c: null, pick: {}, shown: {} };

export default function AnomalyCase() {
  const [st, save] = useSavedIx<Saved>('S10', ID, INIT);
  const x = st.c ? CASES[st.c] : null;
  const chosen = x && st.c ? x.opts.find((o) => o.id === st.pick[st.c!]) : undefined;
  const shown = st.c ? !!st.shown[st.c] : false;
  const both = !!(st.shown.uranus && st.shown.mercury);

  return (
    <section className="md c3 c5" aria-labelledby="ac-title">
      <header className="md-head">
        <p className="md-tag">两颗行星 · 修改哪一个假定</p>
        <h3 id="ac-title" className="md-title">预测失败了，该放弃什么？</h3>
        <p className="md-lede">
          选一颗行星，决定你要修改哪一个假定，看它会导出什么可以独立检验的预测；然后再看历史上实际发生了什么。你的选择不会被评分：在当时，没有人能只凭逻辑知道哪一个是对的。
        </p>
      </header>

      <Band>一 · 选一个案例</Band>
      <Pick label="选择案例" value={st.c} opts={COPTS} onPick={(c) => save({ ...st, c })} />

      {x && st.c && (
        <>
          <p>{x.setup}</p>
          <Band>二 · 你修改哪一个假定？</Band>
          <Pick
            label={`${x.name}：修改哪一个假定`}
            value={st.pick[st.c] ?? null}
            opts={x.opts.map((o) => [o.id, o.text] as const)}
            onPick={(id) => save({ ...st, pick: { ...st.pick, [st.c!]: id } })}
          />
          {chosen && (
            <div aria-live="polite">
              <p>
                <b>你修改的是：</b>
                {chosen.layer}。<b>它会导出：</b>
                {chosen.predicts}
              </p>
              <p className="md-muted">迪昂的论点：预测失败只告诉我们这一整组假定中至少有一个是错的，逻辑本身不告诉我们是哪一个。</p>
              {!shown && (
                <button type="button" className="v22-btn" onClick={() => save({ ...st, shown: { ...st.shown, [st.c!]: true } })}>
                  看看历史上发生了什么
                </button>
              )}
            </div>
          )}
          {chosen && shown && (
            <div aria-live="polite">
              <Band>三 · 历史上</Band>
              <p>{x.history}</p>
            </div>
          )}
          {both && (
            <Claim b="course">
              你已经看过两颗行星：同一种修改（假定一颗未知的行星），一次成功了，一次没有成功。怎样区分"合理的挽救"和只为躲开反驳的修改？下一节拉卡托斯的"研究纲领"给出了一种回答。
            </Claim>
          )}
        </>
      )}

      <Limits>
        <p>
          <b>两个案例复述本章第四部分。</b>
          天王星与海王星、水星与"火神星"、广义相对论的史实依据通行的科学史（本章注 12、14）。"会导出什么"一栏是组件为说明而作的整理。组件不评分。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
