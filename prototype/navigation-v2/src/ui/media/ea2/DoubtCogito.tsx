import { Band, Claim, Limits, OrigSrc, Pick, useSavedIx, Verdict } from '../jw1/shared';

// 二 · after ""我思"的确定性，只及于现在思想着的我".
// 1. The three stages of doubt (the chapter's table, after the usual summary
//    and the SEP entry, note 7): step through them and watch beliefs fall.
// 2. What survives: AT VII 25 and 27, the chapter's checked passages (notes 10, 12).
// 3. What the cogito does not give: yesterday's self, a body.

const ID = 'doubt-cogito';

// stage at which each belief is first doubted (99 = never, in the Meditations' order)
const BELIEFS: { t: string; at: number }[] = [
  { t: '远处的那座塔是圆的', at: 1 },
  { t: '我现在坐在火炉边，手里拿着这张纸', at: 2 },
  { t: '我有一个身体', at: 2 },
  { t: '物体有广延、形状、数目', at: 3 },
  { t: '二加三等于五', at: 3 },
  { t: '我是，我存在（此刻，在我思想的时候）', at: 99 },
];
const STAGES = [
  { t: '还没有开始怀疑', why: '' },
  { t: '1 · 感官的错误', why: '感官有时欺骗我们：远处的塔看起来是圆的。' },
  { t: '2 · 梦', why: '我常常梦见自己坐在火炉边，却其实躺在床上；没有确定的标志区分醒与梦。可是梦中的图像就像画家的画：最简单的成分——颜色、形状——仍然必须是真的。' },
  { t: '3 · 欺骗者', why: '也许有一个全能的存在者，使我在最简单的事情上也出错。这个假设不要求我们相信真有这样的存在者，只要求我们不能排除它。' },
];

type Gives = 'now' | 'past' | 'body';

interface Saved {
  stage: number;
  gives: Gives | null;
}
const INIT: Saved = { stage: 0, gives: null };

export default function DoubtCogito() {
  const [st, save] = useSavedIx<Saved>('EA2', ID, INIT);
  const set = (x: Partial<Saved>) => save({ ...st, ...x });
  const stage = Math.max(0, Math.min(3, st.stage ?? 0));
  const left = BELIEFS.filter((b) => b.at > stage);

  return (
    <section className="md c3 c5" aria-labelledby="dc-title">
      <header className="md-head">
        <p className="md-tag">怀疑与"我思" · 逐步演示</p>
        <h3 id="dc-title" className="md-title">
          每一个阶段，还剩下什么？
        </h3>
        <p className="md-lede">把《第一沉思》的怀疑一步一步推进，看哪些信念依次被放下；然后看《第二沉思》找到的那个东西，以及它的确定性能走多远。</p>
      </header>

      <Band>一 · 怀疑的三个阶段</Band>
      <Pick label="怀疑推进到哪一个阶段" value={stage} opts={STAGES.map((s, i) => [i, s.t] as const)} onPick={(v) => set({ stage: v })} />
      {stage > 0 && (
        <p className="md-feedback" aria-live="polite">
          {STAGES[stage].why}
        </p>
      )}
      <ul className="v23-beliefs" aria-label="六个信念及其在这一阶段的状态">
        {BELIEFS.map((b) => {
          const doubted = b.at <= stage;
          return (
            <li key={b.t} className={doubted ? 'is-doubt' : undefined}>
              <span>{b.t}</span>
              <b>{doubted ? '受到怀疑' : '暂时没有受到怀疑'}</b>
            </li>
          );
        })}
      </ul>
      <p className="md-muted" aria-live="polite">
        {stage === 0 && '选择一个阶段开始。'}
        {stage === 1 && '感官的错误只动摇了关于远处、细小事物的判断。所以还需要梦的论证。'}
        {stage === 2 && '梦的论证还没有动摇数学和最简单、最普遍的东西。所以还需要第三阶段。'}
        {stage === 3 && `只剩下 ${left.length} 项。下面看它为什么能经受住欺骗者。`}
      </p>

      {stage === 3 && (
        <>
          <Band>二 · 欺骗者也不能使我什么也不是</Band>
          <OrigSrc
            src="笛卡尔《第一哲学沉思集》第二沉思，《笛卡尔全集》第七卷，第 25 页"
            lang="la"
            orig="Haud dubie igitur ego etiam sum, si me fallit; & fallat quantum potest, nunquam tamen efficiet, ut nihil sim quamdiu me aliquid esse cogitabo."
            zh="所以，毫无疑问，如果他欺骗我，那么我也存在；让他尽力欺骗我吧，只要我想到我是某个东西，他就永远不能使我什么也不是。"
          />
          <Claim b="course" who="本章的重建">
            如果他欺骗我，那么我被欺骗；被欺骗的东西必须存在。欺骗者越成功，越证明我存在。
          </Claim>

          <Band>三 · "我思"给了我们什么？</Band>
          <Pick
            label="“我思”直接给了我们哪一项？"
            value={st.gives}
            opts={[
              ['now', '此刻思想着的我存在'],
              ['past', '昨天的我也存在'],
              ['body', '我有一个身体'],
            ]}
            onPick={(v) => set({ gives: v })}
          />
          {st.gives && (
            <div aria-live="polite">
              <p className="md-feedback">
                <Verdict ok={st.gives === 'now'} yes="只有这一项" no="'我思'并不直接给出这一项" />
                笛卡尔紧接着问：可是，多久呢？
              </p>
              <OrigSrc src="同上，第 27 页" lang="la" orig="Ego sum, ego existo; certum est. Quandiu autem? Nempe quandiu cogito;" zh="我是，我存在；这是确定的。可是，多久呢？当然是只要我在思想的时候。" />
              <p className="md-muted">从"我存在"走到昨天的我、我的身体和外部世界，还需要神的保证——这就引出了"笛卡尔循环"的问题。</p>
            </div>
          )}
        </>
      )}

      <Limits>
        <p>
          <b>这不是《沉思集》的全部步骤。</b>三阶段的表是本章依据通行概述和 SEP 条目的整理；六个信念是本课挑选的例子，"物体有广延、形状、数目"概括了第二阶段之后剩下的"简单的、普遍的东西"。本课核对了第一沉思第 22 页和第二沉思第 25、27 页的拉丁原文，没有核对其余部分。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
