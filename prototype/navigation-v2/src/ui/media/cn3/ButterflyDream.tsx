import { Seg, Stages, useSaved } from './shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn2/cn2.css';
import './cn3.css';

// 三 · after "本课不在三种读法中作最终的选择". The passage is taken apart into
// its five turns (the chapter's own quotation, split at its own punctuation),
// with the chapter's explanation of each. Three layers are kept apart: what
// the passage says, the standpoints it moves between, and the readings later
// interpreters and modern readers reconstruct from it. Nothing here treats the
// story as proof that reality is an illusion.

const ID = 'butterfly-dream';
type Stand = 'dream' | 'wake' | 'across';
type Reading = 'skeptic' | 'transform' | 'experience';
type Quiz = 'proof' | 'question' | 'certain';
interface Saved {
  stage: number;
  stand: Stand | null;
  reading: Reading | null;
  quiz: Quiz | null;
}
const INIT: Saved = { stage: 0, stand: null, reading: null, quiz: null };

const TURNS = [
  { k: '梦', orig: '昔者莊周夢爲胡蝶，栩栩然胡蝶也，自喻適志與，不知周也。', zh: '从前庄周梦见自己变成了蝴蝶，欢快地飞舞着，确实是一只蝴蝶，自己觉得快乐满意，不知道自己是庄周。', cap: '梦中只有蝴蝶：经验完整而真切，没有"我其实是庄周"这个念头。' },
  { k: '觉', orig: '俄然覺，則蘧蘧然周也。', zh: '忽然醒来，惊讶地发现自己确实是庄周。', cap: '醒来只有庄周：同样完整，同样确定。' },
  { k: '疑', orig: '不知周之夢爲胡蝶與？胡蝶之夢爲周與？', zh: '不知道是庄周梦见自己变成了蝴蝶呢，还是蝴蝶梦见自己变成了庄周？', cap: '两种确定感放在一起，就出现了一个真实的疑问：从哪里判断谁梦见了谁？' },
  { k: '分', orig: '周與胡蝶，則必有分矣，', zh: '庄周和蝴蝶，一定是有分别的。', cap: '文本没有停在疑问上：它肯定了分别。' },
  { k: '化', orig: '此之謂物化。', zh: '这就叫作"物化"。', cap: '分别之间有转化：一个可以变成另一个。' },
] as const;

const STANDS: Record<Stand, { t: string; can: string; cannot: string }> = {
  dream: {
    t: '在梦中',
    can: '经验是完整的、快乐的（"栩栩然""自喻適志"）。',
    cannot: '不能说"我是庄周"，也不能说"这是梦"：梦中没有一个可以比较两种状态的位置（"不知周也"）。',
  },
  wake: {
    t: '醒来以后',
    can: '可以说"刚才是梦，现在我是庄周"。',
    cannot: '醒来时的确定感，梦中的蝴蝶也有过。单凭这种确定感，不能排除"现在也是一个梦"，于是有了"不知……與"的疑问。',
  },
  across: {
    t: '比较两种状态',
    can: '要评价"哪一个更真"，需要一个同时看到两种状态的位置。原文在这里并没有给出这样的裁决。',
    cannot: '原文接下来说的是"必有分矣""物化"：它肯定了分别和转化，而没有说哪一种状态是幻觉。这一栏是本课对文本结构的说明，不是原文的话。',
  },
};

type Fit = 'fit' | 'strain' | 'open';
const READINGS: Record<Reading, { t: string; who: string; fits: Fit[]; steps?: string[]; cost: string }> = {
  skeptic: {
    t: '怀疑论的重构',
    who: '现代读者常见的重构（与笛卡尔"梦的论证"相似，但不是原文的论证）',
    fits: ['fit', 'fit', 'fit', 'strain', 'strain'],
    steps: ['在梦中，庄周完全相信自己是蝴蝶。', '醒来后，庄周相信自己是庄周。', '他无法从内部区分"真的醒着"和"在梦中"，因为梦中的经验同样真切。', '所以，他无法确定现在的庄周不是蝴蝶的梦。'],
    cost: '能解释中间的疑问；但和"必有分矣""物化"冲突：如果无法区分，为什么又说一定有分别？要把结尾解释成反讽或补充。',
  },
  transform: {
    t: '转化的读法',
    who: '郭象的注大体沿着这个方向读',
    fits: ['fit', 'open', 'strain', 'fit', 'fit'],
    steps: ['庄周和蝴蝶是不同的（"必有分矣"）。', '但一个可以变成另一个（在梦中，庄周成了蝴蝶）。', '每一个状态都是完整的：作为蝴蝶时，就快乐地做蝴蝶。', '所以，"物化"指事物之间的转化：分别是真实的，但不是固定不变的。'],
    cost: '能很好地解释结尾；但中间那句分明是一个疑问，这种读法几乎没有给它留下位置，怀疑的力量被消解了。',
  },
  experience: {
    t: '体验与文学的读法',
    who: '把这一段看作对一种经验的描述，而不是论证',
    fits: ['open', 'open', 'open', 'open', 'open'],
    cost: '能照顾整段的转折和语气，很难说它与哪一句冲突；代价是很难说它主张了什么，因而难以评价。',
  },
};
const FIT_T: Record<Fit, string> = { fit: '能解释', strain: '有冲突', open: '不作论证' };

const QUIZ: [Quiz, string][] = [
  ['proof', '证明了：既然梦和醒分不清，现实就是一场幻觉'],
  ['question', '没有证明：它提出了一个真实的疑问，但又以"必有分矣""物化"作结'],
  ['certain', '证明了相反的东西：梦和醒总是可以清楚地区分'],
];
const QUIZ_FB: Record<Quiz, [string, string]> = {
  proof: ['推得太远。', '原文只是问"不知……與"，没有断言什么是幻觉；而且最后一句说庄周和蝴蝶"必有分矣"。把这一段读成"人生如梦"，会错过这最后一句。即使按怀疑论的重构，结论也只是"无法确定"，不是"现实是幻觉"。'],
  question: ['这与正文的判断一致。', '正文的结论是：这段话不是一个现成的怀疑论论证。疑问是真实的，但文本把它放进了"分别"与"转化"之中。三种读法哪一种更好，正文没有作最终的选择。'],
  certain: ['也推得太远。', '"不知周之夢爲胡蝶與？胡蝶之夢爲周與"是一个真实的疑问，文本并没有说两者总能清楚地区分。"必有分矣"肯定的是有分别，不是我们随时都能知道自己处在哪一边。'],
};

export default function ButterflyDream() {
  const [st, save] = useSaved<Saved>(ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const s = Math.max(0, Math.min(TURNS.length - 1, st.stage));
  const turn = TURNS[s];
  const r = st.reading ? READINGS[st.reading] : null;

  // What the drawing shows at each turn: who is present, and how the line between them is drawn.
  const bf = [1, 0.15, 0.55, 1, 1][s];
  const zh = [0.15, 1, 0.55, 1, 1][s];
  const line = ['none', 'none', 'dash', 'solid', 'solid'][s];

  return (
    <section className="md c3" aria-labelledby="bd-title">
      <header className="md-head">
        <p className="md-tag">文本细读 · 立场 · 后世读法</p>
        <h3 id="bd-title" className="md-title">
          庄周梦蝶：五个转折，三个立场，三种读法
        </h3>
        <p className="md-lede">
          先一步一步读原文的五个转折，再换一个立场，看看从那里能说什么、不能说什么；最后把三种读法放回原文，看每一种能解释哪一句、和哪一句冲突。原文和后人的重构分开标出。
        </p>
      </header>

      <div className="g4-panel">
        <p className="c3-layer-k">原文：五个转折</p>
        <Stages labels={TURNS.map((t) => t.k)} cur={s} onPick={(i) => set({ stage: i })} label="梦蝶一段的五个转折" />
        <figure className="c3-fig">
          <svg viewBox="0 0 640 200" className="c3-svg" role="img" aria-label={`第 ${s + 1} 步「${turn.k}」：${turn.cap}`}>
            <g className="c3-fade" style={{ opacity: bf }}>
              <path className="c3-wing" d="M170 100 C130 40, 80 50, 95 95 C80 130, 130 150, 170 108 Z" />
              <path className="c3-wing" d="M178 100 C218 40, 268 50, 253 95 C268 130, 218 150, 178 108 Z" />
              <line className="c3-body" x1="174" y1="80" x2="174" y2="130" />
              <text className="c2-lbl c2-lbl--big" x="174" y="182" textAnchor="middle">
                胡蝶
              </text>
            </g>
            <g className="c3-fade" style={{ opacity: zh }}>
              <circle className="c3-head" cx="466" cy="58" r="18" />
              <path className="c3-body" d="M466 76 L466 132 M466 92 L438 116 M466 92 L494 116 M466 132 L446 160 M466 132 L486 160" />
              <text className="c2-lbl c2-lbl--big" x="466" y="190" textAnchor="middle">
                莊周
              </text>
            </g>
            {line !== 'none' && <line className={'c3-divide' + (line === 'dash' ? ' c3-divide--q' : '')} x1="320" y1="20" x2="320" y2="168" />}
            {s === 2 && (
              <text className="c2-lbl c2-lbl--big c3-q" x="320" y="104" textAnchor="middle">
                ？
              </text>
            )}
            {s === 3 && (
              <text className="c2-lbl" x="332" y="40">
                必有分
              </text>
            )}
            {s === 4 && (
              <g className="c3-arrows">
                <path d="M250 50 Q320 10 390 50" markerEnd="url(#bd-arr)" />
                <path d="M390 150 Q320 190 250 150" markerEnd="url(#bd-arr)" />
                <text className="c2-lbl" x="332" y="104">
                  物化
                </text>
              </g>
            )}
            <defs>
              <marker id="bd-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
                <path d="M0 0 L10 5 L0 10 Z" className="c3-arrowhead" />
              </marker>
            </defs>
          </svg>
        </figure>
        <div className="lw-grc c3-gu" aria-live="polite">
          <p className="pe-src">《庄子·齐物论》 · 第 {s + 1} / 5 步</p>
          <p className="c3-orig" lang="zh-Hant">
            {turn.orig}
          </p>
          <p className="pe-zh">意思是：{turn.zh}</p>
          <p className="md-muted">{turn.cap}</p>
        </div>
      </div>

      <div className="g4-panel">
        <p className="c3-layer-k">换一个立场：从这里能说什么？</p>
        <Seg name="bd-stand" label="选择一个立场" value={st.stand} opts={(Object.keys(STANDS) as Stand[]).map((k) => [k, STANDS[k].t] as const)} onPick={(v) => set({ stand: v })} />
        {st.stand && (
          <div className="c3-two" aria-live="polite">
            <div className="c2-card">
              <p className="g4-k">能说</p>
              <p>{STANDS[st.stand].can}</p>
            </div>
            <div className="c2-card c3-card--limit">
              <p className="g4-k">不能说</p>
              <p>{STANDS[st.stand].cannot}</p>
            </div>
          </div>
        )}
      </div>

      <div className="g4-panel">
        <p className="c3-layer-k">后人的读法：放回原文检验</p>
        <Seg name="bd-reading" label="选择一种读法" value={st.reading} opts={(Object.keys(READINGS) as Reading[]).map((k) => [k, READINGS[k].t] as const)} onPick={(v) => set({ reading: v })} />
        {r && (
          <div aria-live="polite">
            <p className="md-muted">{r.who}</p>
            <ol className="c3-fitstrip">
              {TURNS.map((t, i) => (
                <li key={t.k} className={'c3-fitcell c3-fitcell--' + r.fits[i]}>
                  <span className="c3-fit-k">{t.k}</span>
                  <span className="c3-fit-v">{FIT_T[r.fits[i]]}</span>
                </li>
              ))}
            </ol>
            {r.steps && (
              <div className="c2-card">
                <p className="g4-k">重构（本课的表述，不是原文）</p>
                <ol className="g4-steps">
                  {r.steps.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ol>
              </div>
            )}
            <p className="c3-cost">
              <b>代价：</b>
              {r.cost}
            </p>
          </div>
        )}
      </div>

      <div className="g4-panel">
        <p className="c3-layer-k">检查一下</p>
        <p>这个故事证明了"现实是一场梦"吗？</p>
        <Seg name="bd-quiz" label="选择一个回答" col value={st.quiz} opts={QUIZ} onPick={(v) => set({ quiz: v })} />
        {st.quiz && (
          <div className="md-feedback" aria-live="polite">
            <p className="md-fb-k">{QUIZ_FB[st.quiz][0]}</p>
            <p>{QUIZ_FB[st.quiz][1]}</p>
          </div>
        )}
      </div>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
