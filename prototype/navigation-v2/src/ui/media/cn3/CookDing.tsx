import { Seg, Stages, useSaved } from './shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn2/cn2.css';
import './cn3.css';

// 五 · after "《庄子》并没有直接讨论这个悖论". The story's own stages, each with
// its line from the chapter's checked quotations and the chapter's
// explanation. The drawing is an abstract diagram (structure, gaps, the
// blade's path), not a picture of an ox and not a procedure: the panel says
// so. The effort/spontaneity question is shown as positions with strengths
// and costs; none is marked right.

const ID = 'cook-ding';
type Pos = 'stages' | 'paradox' | 'attention';
type Q = 'yes' | 'no';
interface Saved {
  stage: number;
  pos: Pos | null;
  q: Q | null;
}
const INIT: Saved = { stage: 0, pos: null, q: null };

const STAGES = [
  {
    k: '开始',
    orig: '始臣之解牛之時，所見无非牛者。',
    zh: '开始我宰牛的时候，看到的无非是一头完整的牛。',
    cap: '只看到一整块陌生的东西，看不出结构，只能用眼睛看、用力去砍。',
  },
  {
    k: '三年之后',
    orig: '三年之後，未嘗見全牛也。',
    zh: '三年以后，就再也看不到完整的牛了。',
    cap: '熟悉以后，看到的是内部的结构：骨节和空隙。知道从哪里下刀。',
  },
  {
    k: '方今之时',
    orig: '方今之時，臣以神遇而不以目視，官知止而神欲行，依乎天理，批大郤，導大窾，因其固然。',
    zh: '现在，我用精神去接触而不用眼睛去看，感官的作用停止了，而精神在运行。我依照牛天然的纹理，劈开筋骨间大的空隙，顺着骨节间的空处进刀，依照牛本来的结构下刀。',
    cap: '刀顺着结构走，不去硬碰骨头。看起来毫不费力，背后是对结构的深刻了解。',
  },
  {
    k: '每至于族',
    orig: '雖然，每至於族，吾見其難爲，怵然爲戒，視爲止，行爲遟，動刀甚微。',
    zh: '虽然如此，每当遇到筋骨交错的地方，我看到它难以下手，就小心谨慎，目光专注，动作放慢，刀子动得很轻。',
    cap: '遇到难处，他停下来、集中注意、放慢动作。"自发"不是自动驾驶。',
  },
  {
    k: '已解',
    orig: '謋然已解，如土委地。',
    zh: '哗啦一声，牛就解体了，像一堆泥土散落在地上。',
    cap: '结构本来就有的分界处分开了。',
  },
] as const;

const POS: Record<Pos, { t: string; say: string; plus: string; minus: string }> = {
  stages: {
    t: '努力和自发是同一个过程的不同阶段',
    say: '开始需要努力，后来努力转化为对结构的熟悉，最后熟悉到可以不再刻意。自发是努力的结果，而不是努力的反面。',
    plus: '这是正文提出的回答，和"三年之后""十九年"的叙述相合；学语言的经验也是这样。',
    minus: '它描述了结果，却没有说明努力怎样"转化"为不费力：如果目标是不刻意，刻意去追求它，会不会妨碍它？',
  },
  paradox: {
    t: '这里有一个真正的悖论',
    say: '如果最好的行动是自发的、不费力的，一个还没达到这种状态的人通过努力去达到它，努力本身似乎就违背了"不费力"。',
    plus: '认真对待了这个困难；有学者把它作为"无为"的一个核心问题来讨论（见注释）。',
    minus: '庖丁的故事本身显示，长期的练习确实到达了某处；悖论至少不是说这条路走不通。',
  },
  attention: {
    t: '"神"是另一种注意，不是不注意',
    say: '"官知止而神欲行"说的不是停止注意，而是不再靠逐项的观看来控制；遇到难处，注意又会集中起来。',
    plus: '和"每至於族……怵然爲戒"一句相合，避免把庖丁读成自动驾驶。',
    minus: '"神"究竟是什么，原文没有说明；这种读法是本课整理的一种可能，文本本身并没有给出这样的解释。',
  },
};

const Q_FB: Record<Q, [string, string]> = {
  yes: ['这和下文冲突。', '庖丁接着说"每至於族，吾見其難爲，怵然爲戒，視爲止，行爲遟"：遇到难处，他会停下来，目光专注，放慢动作。他的技艺包括知道什么时候需要特别小心。'],
  no: ['对。', '"官知止"说的是不再靠感官逐项控制，而不是不再注意。遇到筋骨交错的地方，他的注意反而更集中。这和《老子》第六十四章"其安易持，其未兆易謀"的谨慎是一致的。'],
};

// abstract structure: outline, joints (where the parts meet) and the blade's path
const BODY = 'M64 74 Q86 34 204 38 L468 42 Q556 46 576 100 L578 168 Q566 204 478 206 L172 206 Q74 204 62 160 Z';
const JOINTS = ['M204 38 Q218 122 206 206', 'M338 40 Q350 122 334 206', 'M468 42 Q460 122 476 206', 'M62 126 Q320 110 578 130'];
const PATH = 'M62 126 Q320 110 578 130';
const HITS: [number, number][] = [
  [140, 90],
  [270, 170],
  [410, 80],
  [520, 170],
];

export default function CookDing() {
  const [st, save] = useSaved<Saved>(ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const s = Math.max(0, Math.min(STAGES.length - 1, st.stage));
  const cur = STAGES[s];

  return (
    <section className="md c3" aria-labelledby="cd-title">
      <header className="md-head">
        <p className="md-tag">文本细读 · 示意图</p>
        <h3 id="cd-title" className="md-title">
          庖丁解牛：从"所见无非牛"到"每至于族"
        </h3>
        <p className="md-lede">
          按故事的顺序走一遍庖丁说的几个阶段。右边的图是一个抽象的示意：一块有内部结构的东西、它的分界和空隙、刀走的路线。它不是一头牛的图，更不是一套可以照着做的操作步骤；故事讲的是技艺怎样形成，而不是怎样宰牛。
        </p>
      </header>

      <Stages labels={STAGES.map((x) => x.k)} cur={s} onPick={(i) => set({ stage: i })} label="庖丁说的几个阶段" />

      <div className="c3-cd">
        <div className="lw-grc c3-gu" aria-live="polite">
          <p className="pe-src">《庄子·养生主》 · 第 {s + 1} / 5 步</p>
          <p className="c3-orig" lang="zh-Hant">
            {cur.orig}
          </p>
          <p className="pe-zh">意思是：{cur.zh}</p>
          <p className="md-muted">{cur.cap}</p>
        </div>
        <figure className="c3-fig">
          <svg viewBox="0 0 640 244" className={'c3-svg c3-ox c3-ox--s' + s} role="img" aria-label={`示意图，第 ${s + 1} 步「${cur.k}」：${cur.cap}`}>
            <path className="c3-ox-body" d={BODY} />
            {JOINTS.map((d) => (
              <path key={d} className="c3-ox-joint" d={d} />
            ))}
            {s === 0 &&
              HITS.map(([x, y]) => (
                <path key={x} className="c3-ox-hit" d={`M${x - 9} ${y - 9} L${x + 9} ${y + 9} M${x + 9} ${y - 9} L${x - 9} ${y + 9}`} />
              ))}
            {s === 1 && <path className="c3-ox-try" d={PATH} />}
            {(s === 2 || s === 3) && <path key={'p' + s} className={'c3-ox-path' + (s === 3 ? ' c3-ox-path--slow' : '')} d={PATH} pathLength={100} />}
            {s === 3 && (
              <g>
                <circle className="c3-ox-knot" cx={336} cy={118} r={26} />
                <text className="c2-lbl c2-lbl--big" x={336} y={27} textAnchor="middle">
                  族：放慢
                </text>
              </g>
            )}
            <text className="c2-lbl c2-lbl--big" x={320} y={234} textAnchor="middle">
              {['看到的只是一整块', '看到分界和空隙', '刀顺着空隙走', '交错处：停、看、慢', '沿着分界分开'][s]}
            </text>
          </svg>
        </figure>
      </div>

      <div className="c2-scroll">
        <table className="g4-table c3-blades">
          <caption>刀为什么十九年如新（原文："彼節者有間，而刀刃者无厚"）</caption>
          <thead>
            <tr>
              <th scope="col">谁</th>
              <th scope="col">怎样用刀</th>
              <th scope="col">多久换刀</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">族庖（一般的厨师）</th>
              <td>砍（"折也"）</td>
              <td lang="zh-Hant">月更刀</td>
            </tr>
            <tr>
              <th scope="row">良庖（好的厨师）</th>
              <td>割（"割也"）</td>
              <td lang="zh-Hant">歲更刀</td>
            </tr>
            <tr className={s >= 2 ? 'is-std' : ''}>
              <th scope="row">庖丁</th>
              <td>以无厚入有间</td>
              <td lang="zh-Hant">十九年矣……刀刃若新發於硎</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="g4-panel">
        <p className="c3-layer-k">检查一下</p>
        <p>"官知止而神欲行"，是不是说庖丁已经不再需要注意了？</p>
        <Seg
          name="cd-q"
          label="选择一个回答"
          value={st.q}
          opts={[
            ['yes', '是：他已经进入了不用注意的自动状态'],
            ['no', '不是：他不再靠感官逐项控制，但仍然注意'],
          ]}
          col
          onPick={(v) => set({ q: v })}
        />
        {st.q && (
          <div className="md-feedback" aria-live="polite">
            <p className="md-fb-k">{Q_FB[st.q][0]}</p>
            <p>{Q_FB[st.q][1]}</p>
          </div>
        )}
      </div>

      <div className="g4-panel">
        <p className="c3-layer-k">有争议的问题：努力与自发</p>
        <p>庖丁花了十九年才达到现在的境界，这十九年里他显然在努力。努力和"不费力"是什么关系？下面是本课整理的三种看法，选一种看它的长处和代价。没有哪一种被标为正确答案。</p>
        <Seg name="cd-pos" label="选择一种看法" col value={st.pos} opts={(Object.keys(POS) as Pos[]).map((k) => [k, POS[k].t] as const)} onPick={(v) => set({ pos: v })} />
        {st.pos && (
          <div className="c3-two" aria-live="polite">
            <div className="c2-card">
              <p className="g4-k">这种看法</p>
              <p>{POS[st.pos].say}</p>
              <p>
                <b>长处：</b>
                {POS[st.pos].plus}
              </p>
            </div>
            <div className="c2-card c3-card--limit">
              <p className="g4-k">代价</p>
              <p>{POS[st.pos].minus}</p>
            </div>
          </div>
        )}
      </div>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
