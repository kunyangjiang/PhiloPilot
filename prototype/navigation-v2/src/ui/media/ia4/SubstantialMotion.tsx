import { Band, Claim, Limits, Seg, useSavedIx, Verdict } from '../ia3/shared';

// 五 · after the Zayd table ("表格是本章的整理。最后一列很重要").
// 1. Four changes in Zayd's life, read three ways (Aristotle–Avicenna,
//    Ṣadrā, modern biology), from the chapter's table.
// 2. Which of the three descriptions can be measured?
// 3. The two objections and Ṣadrā's reply, per the SEP entry (note 41).
// No Arabic is quoted: the chapter verifies no Ṣadrā passage.

const ID = 'substantial-motion';

type View = 'aa' | 'sadra' | 'bio';
const VIEW: Record<View, string> = { aa: '亚里士多德—阿维森纳', sadra: '萨德拉', bio: '现代生物学' };

const CHANGE: { k: string; t: string; d: Record<View, string> }[] = [
  {
    k: 'tall',
    t: '扎伊德长高了',
    d: { aa: '量的变化：一种运动，发生在偶性中；实体（"人"）不变。', sadra: '量的变化背后，是存在本身在增强；偶性的运动预设了实体的运动。', bio: '骨骼和组织的生长：可以测量的物理和化学过程。' },
  },
  {
    k: 'warm',
    t: '扎伊德发烧了',
    d: { aa: '质的变化：一种运动，发生在偶性中。', sadra: '同样：质在变，是因为承载它的存在在变。', bio: '体温升高：可以测量。' },
  },
  {
    k: 'old',
    t: '年轻的扎伊德变成了年老的扎伊德',
    d: {
      aa: '实体形式（"人"）不变，只有偶性在变；同一个实体。',
      sadra: '据 SEP 的条目，年轻的扎伊德与年老的扎伊德"实际上不是同一个存在者"：变化的是实体本身；保持的是存在的连续性。',
      bio: '细胞和分子不断更新；遗传信息和身体的组织形式大体保持。',
    },
  },
  {
    k: 'die',
    t: '扎伊德死了',
    d: { aa: '不是运动：一个实体在一瞬间毁灭，另一个（尸体）产生。', sadra: '灵魂"在存续上是精神性的"：它在实体运动中逐渐变成精神性的，不随身体一起结束。', bio: '生命过程停止：可以确定和测量。' },
  },
];

type Obj = 'subject' | 'essence';
const OBJ: Record<Obj, { t: string; o: string; r: string }> = {
  subject: {
    t: '如果一切都在运动，那么变化的主体是什么？',
    o: '在亚里士多德的理论中，运动需要一个不变的主体：变化的是偶性，承受变化的是实体。如果实体本身也在变化，是什么在变化？',
    r: '存在本身就是变化的主体；变化不需要一个不变的"底座"，变化的连续性本身就是同一性。',
  },
  essence: {
    t: '如果运动否定了固定的种类，本质怎样被确定？',
    o: '如果扎伊德的实体不断变化，"人"这个本质在哪里？我们怎么还能说扎伊德是"人"？',
    r: '本质不限制存在：本质是心灵从这个连续的过程中"截取"的一个片段，它不决定存在是什么。',
  },
};

interface Saved {
  c: string;
  view: View;
  meas: Record<View, boolean | undefined>;
  obj: Obj | null;
}
const INIT: Saved = { c: 'old', view: 'aa', meas: { aa: undefined, sadra: undefined, bio: undefined }, obj: null };
const MEAS: Record<View, boolean> = { aa: true, sadra: false, bio: true };

export default function SubstantialMotion() {
  const [st, save] = useSavedIx<Saved>('IA4', ID, INIT);
  const set = (x: Partial<Saved>) => save({ ...st, ...x });
  const ch = CHANGE.find((x) => x.k === st.c) ?? CHANGE[2];
  const view: View = st.view in VIEW ? st.view : 'aa';
  const meas = st.meas ?? INIT.meas;

  return (
    <section className="md c3 c5" aria-labelledby="sm-title">
      <header className="md-head">
        <p className="md-tag">实体运动 · 探索</p>
        <h3 id="sm-title" className="md-title">
          扎伊德的一生，三种描述
        </h3>
        <p className="md-lede">选一个变化，再切换描述的方式。重要的不是哪一种"更新"，而是它们回答的不是同一个问题。</p>
      </header>

      <Band>一 · 选一个变化，换一种描述</Band>
      <Seg name="sm-c" label="选择一个变化" value={ch.k} col opts={CHANGE.map((x) => [x.k, x.t] as const)} onPick={(v) => set({ c: v })} />
      <Seg name="sm-view" label="描述的方式" value={view} opts={(Object.keys(VIEW) as View[]).map((k) => [k, VIEW[k]] as const)} onPick={(v) => set({ view: v })} />
      <div className="v21-aware" aria-live="polite">
        <p>
          <b>
            {VIEW[view]}：{ch.t}
          </b>
        </p>
        <p>{ch.d[view]}</p>
      </div>
      <Claim b={view === 'bio' ? 'common' : 'scholar'} who={view === 'bio' ? '一般的科学常识' : '据 SEP 的条目和本章的表格'}>
        {view === 'sadra' ? '在亚里士多德和阿维森纳那里，运动只发生在量、质、位置、姿态这四个范畴中；萨德拉把运动推到了实体本身。' : view === 'aa' ? '实体本身不运动；实体的改变是一瞬间的毁灭和产生，不是运动。' : '生物学测量的是物质的过程，不讨论"什么是一个事物"。'}
      </Claim>

      <Band>二 · 哪一种可以测量？</Band>
      <div className="v22-rows">
        {(Object.keys(VIEW) as View[]).map((k) => (
          <div key={k} className="v22-row">
            <p>{VIEW[k]}所说的变化</p>
            <Seg
              name={'sm-m-' + k}
              label={VIEW[k] + '所说的变化能否测量'}
              value={meas[k] === undefined ? null : meas[k] ? 'y' : 'n'}
              opts={[
                ['y', '能测量'],
                ['n', '不能测量'],
              ]}
              onPick={(v) => set({ meas: { ...meas, [k]: v === 'y' } })}
            />
            {meas[k] !== undefined && (
              <p className="md-feedback" aria-live="polite">
                <Verdict ok={meas[k] === MEAS[k]} yes="与本章的表格一致" no="与本章的表格不同" />
                {k === 'aa' && '偶性的变化部分可以测量（例如身高）。'}
                {k === 'sadra' && '不能：它是形而上学的，说的是存在本身的变化，不是原子的移动。'}
                {k === 'bio' && '能：细胞、组织、器官的过程都可以测量。'}
              </p>
            )}
          </div>
        ))}
      </div>
      <p className="md-muted">所以，把实体运动说成"现代进化论或物理学的先驱"，是混淆了两种不同的问题：它不能被生物学的观察证实或否证。</p>

      <Band>三 · 两个反驳</Band>
      <Seg name="sm-obj" label="选择一个反驳" value={st.obj} col opts={(Object.keys(OBJ) as Obj[]).map((k) => [k, OBJ[k].t] as const)} onPick={(v) => set({ obj: v })} />
      {st.obj && (
        <div aria-live="polite">
          <Claim b="scholar" who="反驳（据 SEP 的条目）">
            {OBJ[st.obj].o}
          </Claim>
          <Claim b="scholar" who="萨德拉的回答（据 SEP 的条目）">
            {OBJ[st.obj].r}
          </Claim>
          <p className="md-muted">这个回答是否足以说明人格的同一，见"后世批判与回应"第四节；这里不判对错。</p>
        </div>
      )}

      <Limits>
        <p>
          <b>这不是一个科学模型。</b>三种描述取自本章的表格；萨德拉的说法依据 SEP 的条目，本章没有核对萨德拉的原文。"能否测量"只是在说两种问题的不同，不是在比较谁对谁错。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
