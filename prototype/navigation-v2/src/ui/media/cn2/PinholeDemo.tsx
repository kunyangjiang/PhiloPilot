import { Gu, Seg, useSaved } from './shared';
import '../gr1/gr1.css';
import './cn2.css';

// 五 · after "小孔成倒像". A modern geometric drawing of light passing a small
// opening, set beside the 经下/经说下 "景到" entry. Three layers are kept apart:
// what the text says, the modern reconstruction (pinhole in a dark room), and
// this demonstration, which shows straight-line geometry only. Nothing here
// claims the Later Mohists performed or measured such an experiment.

const ID = 'pinhole-demo';
type Rays = 'foot' | 'head' | 'both' | 'none';
type Layer = 'text' | 'recon' | 'demo';
interface Saved {
  d1: number;
  d2: number;
  ap: number;
  h: number;
  rays: Rays;
  layer: Layer;
}
const INIT: Saved = { d1: 170, d2: 150, ap: 8, h: 90, rays: 'both', layer: 'text' };

const W0 = 300; // the wall with the opening
const AY = 140; // centre of the opening
const TOP = 20;
const BOT = 260;

export default function PinholeDemo() {
  const [st, save] = useSaved<Saved>(ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });

  const xo = W0 - st.d1;
  const xs = W0 + st.d2;
  const yHead = AY - st.h * 0.6;
  const yFoot = AY + st.h * 0.4;
  const m = st.d2 / st.d1;
  const img = (y: number) => AY + (AY - y) * m;
  const iHead = img(yHead);
  const iFoot = img(yFoot);
  const blur = (st.ap * (st.d1 + st.d2)) / st.d1;
  const off = Math.min(iFoot, iHead) < TOP || Math.max(iFoot, iHead) > BOT;
  const core = Math.max(0.25, Math.min(1, 6 / blur));

  const cone = (y: number) => {
    const k = (st.d1 + st.d2) / st.d1;
    const e1 = AY - st.ap / 2;
    const e2 = AY + st.ap / 2;
    return `${xo},${y} ${W0},${e1} ${xs},${y + (e1 - y) * k} ${xs},${y + (e2 - y) * k} ${W0},${e2}`;
  };
  const showHead = st.rays === 'head' || st.rays === 'both';
  const showFoot = st.rays === 'foot' || st.rays === 'both';

  const slider = (key: 'd1' | 'd2' | 'ap' | 'h', label: string, min: number, max: number, unit: string) => (
    <label className="c2-slider">
      <span>
        {label}：<b>{st[key]}</b> {unit}
      </span>
      <input type="range" min={min} max={max} step={1} value={st[key]} onChange={(e) => set({ [key]: Number(e.target.value) } as Partial<Saved>)} />
    </label>
  );

  return (
    <section className="md c2" aria-labelledby="ph-title">
      <header className="md-head">
        <p className="md-tag">现代几何演示</p>
        <h3 id="ph-title" className="md-title">
          "景到"：经文、复原与一个现代演示
        </h3>
        <p className="md-lede">
          拖动滑块，改变人到小孔的距离、屏到小孔的距离和小孔的大小，看像怎样变化。这是今天用直线光线画出的几何图，不是古代的实验；下面三个标签把经文、现代复原和这个演示分开。
        </p>
      </header>

      <figure className="c2-fig">
        <svg viewBox="0 0 640 280" className="c2-svg" role="img" aria-label={`小孔成像示意：像是倒立的，像高约为人高的 ${m.toFixed(2)} 倍，模糊宽度约 ${blur.toFixed(0)}`}>
          <defs>
            <clipPath id="ph-screen">
              <rect x={W0} y={TOP} width={340} height={BOT - TOP} />
            </clipPath>
            <clipPath id="ph-cone">
              <rect x={0} y={TOP} width={640} height={BOT - TOP} />
            </clipPath>
          </defs>
          {/* the wall with the opening */}
          <line className="c2-wall" x1={W0} y1={TOP} x2={W0} y2={AY - st.ap / 2} />
          <line className="c2-wall" x1={W0} y1={AY + st.ap / 2} x2={W0} y2={BOT} />
          <rect className="c2-dark" x={W0} y={TOP} width={xs - W0} height={BOT - TOP} />
          {/* the screen */}
          <line className="c2-screen" x1={xs} y1={TOP} x2={xs} y2={BOT} />
          {/* rays: a cone from one point through the opening */}
          <g clipPath="url(#ph-cone)">
            {showHead && <polygon className="c2-cone c2-cone--head" points={cone(yHead)} />}
            {showFoot && <polygon className="c2-cone c2-cone--foot" points={cone(yFoot)} />}
          </g>
          {/* the person */}
          <line className="c2-obj" x1={xo} y1={yFoot} x2={xo} y2={yHead + 7} />
          <circle className="c2-obj-head" cx={xo} cy={yHead + 1} r={7} />
          <text className="c2-lbl c2-lbl--big" x={xo} y={Math.min(BOT + 16, yFoot + 20)} textAnchor="middle">
            人
          </text>
          {/* the image */}
          <g clipPath="url(#ph-screen)">
            <line className="c2-img-blur" x1={xs - 3} y1={iFoot} x2={xs - 3} y2={iHead} strokeWidth={Math.max(2, blur)} />
            <line className="c2-img" x1={xs - 3} y1={iFoot} x2={xs - 3} y2={iHead} style={{ opacity: core }} />
            <circle className="c2-img-head" cx={xs - 3} cy={iHead} r={Math.max(3, 7 * m)} style={{ opacity: core }} />
          </g>
          <text className="c2-lbl c2-lbl--big" x={W0 - 8} y={TOP + 22} textAnchor="end">
            墙
          </text>
          <text className="c2-lbl c2-lbl--big" x={xs - 8} y={TOP + 22} textAnchor="end">
            屏
          </text>
        </svg>
        <figcaption className="c2-ctl">
          {slider('d1', '人到小孔', 80, 260, '')}
          {slider('d2', '屏到小孔', 60, 280, '')}
          {slider('ap', '小孔大小', 2, 40, '')}
          {slider('h', '人的高度', 50, 110, '')}
        </figcaption>
      </figure>

      <fieldset className="cs-group">
        <legend>画出哪一束光线（现代的画法）</legend>
        <Seg
          name="ph-rays"
          value={st.rays}
          opts={[
            ['foot', '"足蔽下光，故成景於上"：脚'],
            ['head', '"首蔽上光，故成景於下"：头'],
            ['both', '两束都画'],
            ['none', '不画'],
          ]}
          onPick={(v) => set({ rays: v })}
        />
      </fieldset>

      <div className="md-feedback" aria-live="polite">
        <p className="md-fb-k">现在的像</p>
        <ul className="md-fb-list">
          <li>像是<b>倒立</b>的：头的像在下，脚的像在上。</li>
          <li>
            像高约为人高的 <b>{m.toFixed(2)}</b> 倍（屏到小孔 ÷ 人到小孔）。{m > 1 ? '屏比人离小孔更远，像比人大。' : m < 1 ? '屏比人离小孔更近，像比人小。' : '两个距离相等，像和人一样高。'}
          </li>
          <li>
            小孔越大，每一点的光在屏上散开得越宽（现在约 <b>{blur.toFixed(0)}</b>），像就越亮也越模糊；小孔越小，像越清楚也越暗。
          </li>
          {off && <li>像有一部分落在屏外，可以把屏移近一些。</li>}
        </ul>
      </div>

      <Seg
        name="ph-layer"
        label="三个层次"
        value={st.layer}
        opts={[
          ['text', '一、经文怎么说'],
          ['recon', '二、现代复原'],
          ['demo', '三、这个演示'],
        ]}
        onPick={(v) => set({ layer: v })}
      />
      <div className="g4-panel c2-layer">
        {st.layer === 'text' && (
          <>
            <Gu src="《墨子·经下》" orig="景到，在午有端與景長，說在端。" />
            <Gu src="《墨子·经说下》" orig="景，光之人煦若射，下者之人也高，高者之人也下。足蔽下光，故成景於上；首蔽上光，故成景於下。在遠近有端與於光，故景庫，內也。" />
            <p>
              <b>文本里直接有的：</b>影子倒过来（"景到"）；光照到人"若射"；脚的影在上、头的影在下；交叉处（"午"）有一个"端"；"景庫，內也"。
            </p>
            <p>
              <b>文本里没有的：</b>暗室、墙上的孔、屏幕、观察者站在哪里、距离和大小的比例。文本没有记载任何实验的步骤或测量。
            </p>
          </>
        )}
        {st.layer === 'recon' && (
          <>
            <table className="g4-table">
              <thead>
                <tr>
                  <th scope="col">经文的字</th>
                  <th scope="col">复原的读法</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>到</td>
                  <td>通"倒"（《墨子閒诂》作"倒"）</td>
                </tr>
                <tr>
                  <td>若射</td>
                  <td>光像射出的箭，走直线</td>
                </tr>
                <tr>
                  <td>午</td>
                  <td>光线交叉的地方</td>
                </tr>
                <tr>
                  <td>端</td>
                  <td>交叉处的一个点，即墙上的小孔</td>
                </tr>
                <tr>
                  <td>庫</td>
                  <td>封闭的房间，即暗室</td>
                </tr>
              </tbody>
            </table>
            <p>
              把这些读法合起来，许多学者（正文提到李约瑟和葛瑞汉）认为这一条描述的是暗室里的小孔成像。本课依据的是对他们的二手介绍，没有核对原书。复原把难字都说通了，这是它有说服力的地方；但"端"是小孔、"库"是暗室，都是复原者补上的。
            </p>
          </>
        )}
        {st.layer === 'demo' && (
          <>
            <p>
              上面的图是今天的几何光学：把光画成从人身上每一点出发、穿过小孔的直线，算出像的位置、大小和模糊程度。它能说明的是<b>现象本身</b>：只要光走直线，穿过一个小孔就会成倒像，这和经说中"足蔽下光，故成景於上"的上下颠倒是一致的。
            </p>
            <p>
              它不能说明的是<b>古人知道什么</b>：后期墨家没有留下像高与距离的比例，也没有留下关于光的本性的理论；图中的比例和模糊宽度，是现代的算法，不是经文的内容。这个演示也没有考虑小孔很小时的衍射，只是直线光线的近似。
            </p>
          </>
        )}
      </div>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        恢复初始状态
      </button>
      <p className="md-note">
        <b>这个练习的限度。</b>图是现代几何光学的示意，用来帮助理解"景到"条可能描述的现象，不是对古代实验的还原；经文是否描述小孔成像，本身是一种复原。"后期墨家已经有了光学"这样的说法，超出了文本能支持的范围。
      </p>
    </section>
  );
}
