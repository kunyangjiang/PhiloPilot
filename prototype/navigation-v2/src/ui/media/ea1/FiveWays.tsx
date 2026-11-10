import { Band, Claim, Limits, OrigSrc, Pick, useSavedIx, Verdict } from '../jw1/shared';

// 五 · after "还要注意：阿奎那拒绝了安瑟伦的论证".
// 1. ST I q.2 a.3, the chapter's checked opening (Paris 1880, note 35).
// 2. The five ways (the chapter's table: contents from the usual summaries,
//    the classification from SEP, note 36).
// 3. Which infinite series the first three ways rule out (SEP, note 36).
// 4. "And this everyone calls God": what the five ways alone do not show (note 37).

const ID = 'five-ways';

type Way = 1 | 2 | 3 | 4 | 5;
const WAYS: Record<Way, { from: string; core: string; to: string; kind: string }> = {
  1: { from: '世界上有东西在运动', core: '运动者被另一者推动；推动者的序列不能无限', to: '一个不被推动的第一推动者', kind: '宇宙论' },
  2: { from: '有动力因的序列', core: '没有东西是自己的动力因；序列不能无限', to: '一个第一动力因', kind: '宇宙论' },
  3: { from: '有些东西可能存在也可能不存在', core: '如果一切都只是可能的，曾经就会什么都没有；那么现在也不会有东西', to: '一个必然的存在者，其必然性不来自别处', kind: '宇宙论' },
  4: { from: '事物中有"更好""更真""更高贵"的等级', core: '等级预设一个最高者，它是一切完美的原因', to: '一个使一切存在者存在、善和完美的原因', kind: '从等级出发' },
  5: { from: '没有认识能力的自然物，总是或经常为了一个目的而活动', core: '无知者朝向目的，需要一个有认识者的指引', to: '一个使一切自然物朝向目的的有理智者', kind: '目的论' },
};
const WOPTS = ([1, 2, 3, 4, 5] as Way[]).map((k) => [k, `第${'一二三四五'[k - 1]}路`] as const);

const ATTR = ['不是物体', '完全单纯', '完满', '至善', '无限'];

interface Saved {
  way: Way | null;
  series: 'line' | 'stack' | null;
  attr: string[];
  shown: boolean;
}
const INIT: Saved = { way: null, series: null, attr: [], shown: false };

export default function FiveWays() {
  const [st, save] = useSavedIx<Saved>('EA1', ID, INIT);
  const set = (x: Partial<Saved>) => save({ ...st, ...x });
  const w = st.way ? WAYS[st.way] : null;
  const attr = st.attr ?? [];
  const toggle = (a: string) => set({ attr: attr.includes(a) ? attr.filter((x) => x !== a) : [...attr, a], shown: false });

  return (
    <section className="md c3 c5" aria-labelledby="fw-title">
      <header className="md-head">
        <p className="md-tag">五路 · 结构浏览</p>
        <h3 id="fw-title" className="md-title">
          五条道路，三种结构，一个谨慎的结论
        </h3>
        <p className="md-lede">逐一打开五路，看它们从哪里出发、推到哪里；再看阿奎那要排除的是哪一种无限序列，以及五路本身<b>没有</b>证明什么。</p>
      </header>

      <Band>一 · 原文</Band>
      <OrigSrc
        src="阿奎那《神学大全》第一部分第二问题第三条，巴黎 1880 年本"
        lang="la"
        orig="Respondeo dicendum quod Deum esse, quinque viis probari potest. Prima autem et manifestior via est, quae sumitur ex parte motus."
        zh="我回答说：神存在，可以用五条道路来证明。第一条、也是更明显的道路，是从运动方面得出的。"
      />

      <Band>二 · 打开一路</Band>
      <Pick label="选择一路" value={st.way} opts={WOPTS} onPick={(v) => set({ way: v })} />
      {w && (
        <dl className="v23-dl" aria-live="polite">
          <dt>出发点</dt>
          <dd>{w.from}</dd>
          <dt>推论的核心</dt>
          <dd>{w.core}</dd>
          <dt>结论</dt>
          <dd>{w.to}——"这就是大家所称的神"</dd>
          <dt>类型</dt>
          <dd>
            <b>{w.kind}</b>
            {st.way && st.way > 3 && '：不以"原因的无限序列不可能"为基础，所以不是宇宙论的论证。'}
          </dd>
        </dl>
      )}

      <Band>三 · 前三路要排除哪一种无限序列？</Band>
      <Pick
        label="阿奎那要排除哪一种无限序列？"
        value={st.series}
        opts={[
          ['line', '在时间中向过去无限延伸的序列（父亲、祖父……）'],
          ['stack', '此刻同时的序列（手推动棍子，棍子推动石头）'],
        ]}
        onPick={(v) => set({ series: v })}
      />
      {st.series && (
        <p className="md-feedback" aria-live="polite">
          <Verdict ok={st.series === 'stack'} yes="这是注释者一般同意的读法" no="据 SEP 条目，阿奎那不认为能证明这一点" />
          他要排除的是同时的、"纵向的"序列。他并不认为能够证明一个在时间中向过去延伸的"横向的"序列是不可能的；这与他的另一个立场一致：世界是否有时间上的开端，不能由理性证明，只能由信仰得知。
        </p>
      )}

      <Band>四 · 五路本身证明了第一因的哪些属性？</Band>
      <p>勾选你认为五路<b>本身</b>已经证明的属性，然后查看。</p>
      <div className="v21-checks">
        {ATTR.map((a) => (
          <label key={a} className="v21-check">
            <input type="checkbox" checked={attr.includes(a)} onChange={() => toggle(a)} />
            <span>{a}</span>
          </label>
        ))}
      </div>
      <div className="v22-btns">
        <button type="button" className="v22-btn" onClick={() => set({ shown: true })}>
          查看
        </button>
      </div>
      {st.shown && (
        <div aria-live="polite">
          <p className="md-feedback">
            <Verdict ok={attr.length === 0} yes="一项也没有：与 SEP 条目的说明一致" no={`你勾选了 ${attr.length} 项；五路本身一项也没有证明`} />
            就五路本身而言，这个第一因甚至可能是一个物体。阿奎那在《神学大全》接下来的许多问题中，才逐一论证它不是物体、完全单纯、完满、至善、无限。
          </p>
          <Claim b="scholar" who="SEP 条目">
            每一路以"这就是大家所称的神"一类的话结束，是一种谨慎的措辞：证明有一个第一推动者，远远不等于证明有一个配得上"神"这个名称的存在者。
          </Claim>
        </div>
      )}

      <Limits>
        <p>
          <b>这不是五路的原文。</b>本课只核对了第三条开头的两句；各路的内容依据通行的概述，分类和"纵向序列"的读法依据 SEP 条目。"父亲、祖父"是本课为"横向序列"举的例子。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
