import { Gu, Limits, Seg, useSaved } from './shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn2/cn2.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import '../cn5/cn5.css';

// 三 · after "用一个现代的比喻" (the triangle). Seven thinkers, each with the
// figure that fits what the chapter says about him:
//   周敦颐: the two readings of the first sentence (variant toggle);
//   张载: ice and water, gather and disperse, with a constant count of dots,
//         and his three-way dilemma (虚生气 / 万象为太虚所见 / 太虚即气);
//   程颢: 识仁, one body (he says little about 有无);
//   程颐: 性即理, 气 that clouds it;
//   朱熹: two senses of "first" (time vs grounding);
//   王夫之: 道 is always the 道 of some 器;
//   戴震: 理 as the grain of a thing (分理).
// A fixed banner says what none of the drawings mean: 理 and 气 are not two
// kinds of stuff. All quotations are the chapter's own.

const ID = 'liqi-explorer';
type Who = 'zhou' | 'zhang' | 'chenghao' | 'chengyi' | 'zhu' | 'wfz' | 'dai';
type ZhouV = 'wiki' | 'zhu';
type Dil = 'sheng' | 'jian' | 'ji';
type Prior = 'time' | 'ground';
interface Saved {
  who: Who;
  zhouV: ZhouV;
  gather: boolean;
  dil: Dil | null;
  prior: Prior;
}
const INIT: Saved = { who: 'zhang', zhouV: 'wiki', gather: true, dil: null, prior: 'time' };

const WHO: Record<Who, { name: string; dates: string; core: string }> = {
  zhou: { name: '周敦颐', dates: '1017—1073', core: '太极、诚' },
  zhang: { name: '张载', dates: '1020—1077', core: '气、太虚' },
  chenghao: { name: '程颢', dates: '1032—1085', core: '仁、天理' },
  chengyi: { name: '程颐', dates: '1033—1107', core: '理' },
  zhu: { name: '朱熹', dates: '1130—1200', core: '理与气' },
  wfz: { name: '王夫之', dates: '1619—1692', core: '器与道' },
  dai: { name: '戴震', dates: '1724—1777', core: '分理' },
};

const DIL: Record<Dil, { k: string; orig: string; zh: string; verdict: string }> = {
  sheng: {
    k: '太虚产生气',
    orig: '若謂虛能生氣，則虛無窮，氣有限，體用殊絕，入老氏「有生於無」自然之論',
    zh: '如果说虚能产生气，那么虚是无穷的，气是有限的，本体和作用就完全断开了，这就落入了老子"有生于无"的自然之论。',
    verdict: '张载拒绝：这是道家的"产生"关系。他针对的是一般的读法，不是王弼本人的"无"。',
  },
  jian: {
    k: '万物只是在太虚中被看见的东西',
    orig: '若謂萬象為太虛中所見之物，則物與虛不相資，形自形，性自性',
    zh: '如果说万象只是在太虚中被看见的东西，那么事物和虚就不相依赖，形是形，性是性。',
    verdict: '张载拒绝：这是佛教"以山河大地為見病"的"显现"关系。僧肇本人其实反对把山河大地看作虚无。',
  },
  ji: {
    k: '太虚就是气',
    orig: '氣之聚散於太虛，猶冰凝釋於水，知太虛即氣，則無無。',
    zh: '气在太虚中聚合和消散，就像冰在水中凝结和融化。懂得太虚就是气，就知道没有"无"。',
    verdict: '张载的第三种选择：太虚不产生气，也不只是让事物显现的背景；太虚就是气。',
  },
};

// 24 dots: a gathered (ice / thing) layout and a dispersed (water / 太虚) one
const N = 24;
const dots = Array.from({ length: N }, (_, i) => {
  const a = (i / N) * Math.PI * 2 * 3.1;
  const r = 10 + (i % 6) * 6;
  const gx = 150 + Math.cos(a) * r;
  const gy = 90 + Math.sin(a) * r * 0.8;
  const sx = 30 + ((i * 53) % 240);
  const sy = 26 + ((i * 37) % 130);
  return { gx, gy, sx, sy };
});

export default function LiQiExplorer() {
  const [st, save] = useSaved<Saved>(ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const w = WHO[st.who] ? st.who : 'zhang';

  return (
    <section className="md c3 c5" aria-labelledby="lq-title">
      <header className="md-head">
        <p className="md-tag">概念结构 · 七种说法</p>
        <h3 id="lq-title" className="md-title">
          理和气：从周敦颐到戴震
        </h3>
        <p className="md-lede">选一位思想家，看他怎样说世界的根本、理和气（或道和器）的关系。每一幅图只画出本课讲到的那一点。</p>
      </header>

      <p className="c5-layer c5-layer--zh" role="note" style={{ display: 'block', padding: '4px 8px' }}>
        读图之前：理和气不是两种物质。图里的"理"用虚线画，因为它不是一样东西：朱熹说理"無情意，無計度，無造作"，做事的是气。
      </p>

      <div className="c5-chips" role="group" aria-label="选择一位思想家">
        {(Object.keys(WHO) as Who[]).map((k) => (
          <button key={k} type="button" className={'c5-chip' + (w === k ? ' is-on' : '')} aria-pressed={w === k} onClick={() => set({ who: k })}>
            {WHO[k].name}
            <small className="md-muted">　{WHO[k].dates}</small>
          </button>
        ))}
      </div>
      <p className="md-muted">
        {WHO[w].name}最根本的概念：{WHO[w].core}
      </p>

      <div className="g4-panel" aria-live="polite">
        {w === 'zhou' && (
          <>
            <Seg
              name="lq-zhou"
              label="《太极图说》第一句的两种文本"
              value={st.zhouV}
              opts={[
                ['wiki', '维基文库本：自無極而為太極'],
                ['zhu', '朱熹整理的通行本：無極而太極'],
              ]}
              onPick={(v) => set({ zhouV: v })}
            />
            <svg className="c5-fig" viewBox="0 0 520 120" aria-label={st.zhouV === 'wiki' ? '两个方框，左边是无极，箭头指向右边的太极：读起来像先后的过程' : '一个方框，同时标着无极和太极：无极是形容太极的'}>
              {st.zhouV === 'wiki' ? (
                <>
                  <rect x={60} y={34} width={140} height={50} className="c5-thin c5-dash" />
                  <text x={130} y={64} textAnchor="middle" className="c5-label">无极</text>
                  <path d="M206,59 L306,59" className="c5-thick" />
                  <path d="M306,59 l-10,-6 l0,12 z" className="c5-fill" />
                  <rect x={312} y={34} width={140} height={50} className="c5-thick" />
                  <text x={382} y={64} textAnchor="middle" className="c5-label">太极</text>
                  <text x={256} y={106} textAnchor="middle" className="c5-small">"自……而为……"：先有无极，然后从中产生太极？</text>
                </>
              ) : (
                <>
                  <rect x={180} y={30} width={160} height={58} className="c5-thick" />
                  <text x={260} y={56} textAnchor="middle" className="c5-label">太极</text>
                  <text x={260} y={76} textAnchor="middle" className="c5-small">（无极：无形而有理）</text>
                  <text x={260} y={110} textAnchor="middle" className="c5-small">"无极而太极"：无极就是太极，不是另一个在先的东西</text>
                </>
              )}
            </svg>
            <Gu src="《太極圖說》（维基文库本）" orig="自無極而為太極。太極動而生陽，動極而靜，靜而生陰，靜極復動。" />
            <p>
              {st.zhouV === 'wiki'
                ? '这样读，像是一个先后的过程。读过上一门课的人会想起王弼的"以无为本"。'
                : '朱熹采用这一种读法，认为"无极"只是形容太极"无形而有理"。陆九渊和陆九韶则怀疑"无极"二字出自道家；朱陆为此写了好几封长信辩论。'}
            </p>
            <p className="md-muted">周敦颐在《通书》中的核心概念其实是"诚"：宇宙的生成本身就是"诚"的展开，万物"各正性命"，它们的存在是真实的。这是对佛教"万物无自性"的回答。</p>
          </>
        )}

        {w === 'zhang' && (
          <>
            <svg className="c5-fig" viewBox="0 0 300 180" aria-label={`${N} 个点代表气。${st.gather ? '现在聚在一起：冰，或一样具体的事物。' : '现在散开：水，或太虚。'}点的数目始终是 ${N}。`}>
              {dots.map((d, i) => (
                <circle key={i} cx={st.gather ? d.gx : d.sx} cy={st.gather ? d.gy : d.sy} r={4} className="c5-fill c5-move" />
              ))}
              <text x={150} y={172} textAnchor="middle" className="c5-small">
                {st.gather ? '聚：冰 / 具体的事物（"客形"）' : '散：水 / 太虚'}　·　气的数目：{N}
              </text>
            </svg>
            <div className="c4-actions">
              <button type="button" className="md-disclose" onClick={() => set({ gather: !st.gather })}>
                {st.gather ? '让气散开' : '让气聚合'}
              </button>
              <span className="md-muted">冰化成了水，没有变成"无"。点的数目不变。</span>
            </div>
            <Gu src="《正蒙·太和篇第一》" orig={DIL.ji.orig} zh={DIL.ji.zh} />

            <p className="c3-layer-k">张载的两难：太虚和万物是什么关系？</p>
            <div className="c5-chips" role="group" aria-label="选择一种关系">
              {(Object.keys(DIL) as Dil[]).map((k) => (
                <button key={k} type="button" className={'c5-chip' + (st.dil === k ? ' is-on' : '')} aria-pressed={st.dil === k} onClick={() => set({ dil: k })}>
                  {DIL[k].k}
                </button>
              ))}
            </div>
            {st.dil ? (
              <div className="md-feedback">
                {st.dil !== 'ji' && <Gu src="《正蒙·太和篇第一》" orig={DIL[st.dil].orig} zh={DIL[st.dil].zh} />}
                <p>{DIL[st.dil].verdict}</p>
              </div>
            ) : (
              <p className="md-muted">选一种关系，看张载怎样回应。</p>
            )}
            <p className="md-muted">本课的评价：这个两难把玄学的"有无"和佛教的"空有"都纳入了考虑，并给出了第三种选择；但它对两个对手的描述比较粗略。</p>
          </>
        )}

        {w === 'chenghao' && (
          <>
            <Gu src="《二程遺書·卷二》" orig="學者須先識仁。仁者，渾然與物同體。義、禮、知、信，皆仁也。識得此理，以誠敬存之而已，不須防檢，不須窮索。" />
            <p>程颢很少讲宇宙生成的过程，也不大讨论"有无"。他关心的是人怎样直接体会到自己和万物一体："手足痿痺"叫"不仁"：仁是一种感通，不仁就是麻木。</p>
            <p className="md-muted">所以在这张"理气"的地图上，程颢的位置不在某一种理气关系上，而在修养方法上："不须穷索"，和程颐的"今日格一件"相对。</p>
          </>
        )}

        {w === 'chengyi' && (
          <>
            <svg className="c5-fig" viewBox="0 0 520 120" aria-label="虚线圈表示性，也就是理，本身没有不善；外面一层灰色表示气，气昏浊时把它遮住">
              <ellipse cx={260} cy={60} rx={170} ry={46} className="c5-soft" />
              <ellipse cx={260} cy={60} rx={80} ry={26} className="c5-thin c5-dash" />
              <text x={260} y={65} textAnchor="middle" className="c5-label">性 = 理</text>
              <text x={420} y={30} className="c5-small">气（有清有浊）</text>
            </svg>
            <Gu src="《二程遺書·卷二十二》" orig="性即理也，所謂理，性是也。天下之理，原其所自，未有不善。" />
            <Gu src="《二程遺書·卷二十一》" orig="氣有善不善，性則無不善也。人之所以不知善者，氣昏而塞之耳。" />
            <p>恶来自气的昏浊，不来自性。程颐和张载一样区分了性和气质。</p>
          </>
        )}

        {w === 'zhu' && (
          <>
            <Seg
              name="lq-prior"
              label='哪一种"先"'
              value={st.prior}
              opts={[
                ['time', '时间上的先后'],
                ['ground', '根据上的先后'],
              ]}
              onPick={(v) => set({ prior: v })}
            />
            <svg className="c5-fig" viewBox="0 0 520 150" aria-label={st.prior === 'time' ? '一条时间轴，理和气两条线从头到尾一样长：在时间上没有先后' : '理在上，气在下，一个箭头从理指向气，标着"为什么这样"：气的样子要用理来说明，反过来不行'}>
              {st.prior === 'time' ? (
                <>
                  <line x1={40} y1={124} x2={490} y2={124} className="c5-thin" />
                  <text x={490} y={142} textAnchor="end" className="c5-small">时间 →</text>
                  <line x1={60} y1={50} x2={470} y2={50} className="c5-thin c5-dash" />
                  <text x={50} y={54} textAnchor="end" className="c5-label">理</text>
                  <line x1={60} y1={90} x2={470} y2={90} className="c5-thick" />
                  <text x={50} y={94} textAnchor="end" className="c5-label">气</text>
                  <text x={265} y={72} textAnchor="middle" className="c5-small">没有一个时刻只有理而没有气，也没有一个时刻只有气而没有理</text>
                </>
              ) : (
                <>
                  <rect x={190} y={14} width={140} height={36} className="c5-thin c5-dash" />
                  <text x={260} y={37} textAnchor="middle" className="c5-label">理</text>
                  <rect x={190} y={100} width={140} height={36} className="c5-thick" />
                  <text x={260} y={123} textAnchor="middle" className="c5-label">气</text>
                  <path d="M260,52 L260,96" className="c5-thick" />
                  <path d="M260,96 l-6,-10 l12,0 z" className="c5-fill" />
                  <text x={270} y={80} className="c5-small">为什么气这样聚合、这样运动？要诉诸理</text>
                  <text x={20} y={80} className="c5-small">反过来不行</text>
                </>
              )}
            </svg>
            {st.prior === 'time' ? (
              <Gu src="《朱子語類·卷一》" orig="天下未有無理之氣，亦未有無氣之理。" zh="天下没有无理的气，也没有无气的理。" />
            ) : (
              <Gu src="《朱子語類·卷一》" orig="此本無先後之可言。然必欲推其所從來，則須說先有是理。然理又非別為一物，即存乎是氣之中；無是氣，則是理亦無掛搭處。" />
            )}
            <p>两句话不矛盾：时间上"本無先後之可言"，根据上"須說先有是理"。箭头表示"说明"的方向，不表示理推动或产生了气。</p>
            <Gu src="《朱子語類·卷一》" orig="蓋氣則能凝結造作，理卻無情意，無計度，無造作。只此氣凝聚處，理便在其中。" />
            <p className="md-muted">理一分殊："如一海水，或取得一杓，或取得一擔，或取得一碗，都是這海水。"每个人得到的是同一个理，分量的不同来自气。</p>
          </>
        )}

        {w === 'wfz' && (
          <>
            <svg className="c5-fig" viewBox="0 0 520 130" aria-label="两组：弓矢和射道，车马和御道。每一种道都画在它的器下面，没有一个离开器的道">
              {[
                ['弓矢', '射道', 130],
                ['車馬', '禦道', 390],
              ].map(([q, d, x]) => (
                <g key={q as string}>
                  <rect x={(x as number) - 70} y={20} width={140} height={40} className="c5-thick" />
                  <text x={x as number} y={46} textAnchor="middle" className="c5-label">器：{q}</text>
                  <rect x={(x as number) - 60} y={72} width={120} height={34} className="c5-thin c5-dash" />
                  <text x={x as number} y={94} textAnchor="middle" className="c5-label">{d}</text>
                </g>
              ))}
              <text x={260} y={124} textAnchor="middle" className="c5-small">道总是某一种器的道</text>
            </svg>
            <Gu src="《周易外傳·卷五》" orig="天下惟器而已矣。道者器之道，器者不可謂之道之器也。" zh="天下只有器而已。道是器的道，器却不能说是道的器。" />
            <Gu src="《周易外傳·卷五》" orig="未有弓矢而無射道，未有車馬而無禦道。" />
            <p>这把朱熹的次序倒了过来，并把"道"历史化："漢、唐無今日之道"。王夫之推崇张载的《正蒙》并为它作注，把"气"论推进了一步。</p>
            <p className="md-muted">他的著作生前几乎没有流传，到十九世纪中叶才大规模刊刻：他对清代前中期的实际影响很小。</p>
          </>
        )}

        {w === 'dai' && (
          <>
            <svg className="c5-fig" viewBox="0 0 520 120" aria-label="一块木料，上面有纹理线：理是事物本身的分别和条理，在事物之中">
              <rect x={120} y={20} width={280} height={70} className="c5-thick" />
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <path key={i} d={`M124,${30 + i * 10} C200,${22 + i * 10} 300,${40 + i * 10} 396,${30 + i * 10}`} className="c5-thin" />
              ))}
              <text x={260} y={110} textAnchor="middle" className="c5-small">理：事物本身的纹理和分别，要"察之而幾微必區以別"</text>
            </svg>
            <Gu src="《孟子字義疏證·卷上》" orig="理者，察之而幾微必區以別之名也，是故謂之分理；在物之質，曰肌理，曰艤理，曰文理；得其分則有條而不紊，謂之條理。" />
            <p className="md-muted">"艤理"是文库本的写法，当是"腠理"之误。</p>
            <Gu src="《孟子字義疏證·卷上》" orig="夫以理為「如有物焉，得於天而具於心」。未有不以意見當之者也。" />
            <Gu src="《孟子字義疏證·卷上》" orig="欲，其物；理，其則也。" zh="欲望是实际的内容，理是它的分寸。" />
            <p>戴震批评的正是"理如有物"的说法：把理当作一样具备在心中的东西，个人的意见就可以冒充理。他在理学的同一组问题之内思考。</p>
          </>
        )}
      </div>

      <Limits>
        <p>七个人的图各不相同，不能拼成一个"理学宇宙论"：朱熹把北宋诸人编成一个前后相承的谱系，这个谱系本身是他的建构。</p>
        <p>朱熹那张图里的时间轴和箭头是本课的说明方式（和三角形的比喻一样），不是朱熹的话。张载的点只表示"聚散而不增减"，不表示气是一颗一颗的粒子。</p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
