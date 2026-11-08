import { Gu, Limits, Seg, newSeed, rng, useSaved } from './shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn2/cn2.css';
import '../cn3/cn3.css';
import './cn4.css';

// 六 · after 批评六 (卜筮). A modern model, stated in full, in which the
// ruler's rewards/punishments and the warm/cold weather are independent by
// construction. Learners change three parameters, run one record or many,
// and see how often "correspondences" appear anyway, what the base rate
// predicts, and what selective recording does. It illustrates a possibility
// under this model; it is not Wang Chong's method and does not prove any
// historical claim false.

const ID = 'coincidence-sim';
type Len = 12 | 30 | 60;
interface Saved {
  pReward: number; // % of periods with 赏
  pWarm: number; // % of periods that are 温
  len: Len;
  seed: number | null;
  runs: number[]; // match rates (0–100) of repeated records
  selective: boolean;
}
const INIT: Saved = { pReward: 50, pWarm: 50, len: 12, seed: null, runs: [], selective: false };
const THRESH = 75;

function record(s: Saved, seed: number) {
  const r = rng(seed);
  return Array.from({ length: s.len }, () => {
    const reward = r() < s.pReward / 100;
    const warm = r() < s.pWarm / 100;
    return { reward, warm, match: reward === warm };
  });
}

export default function CoincidenceSimulator() {
  const [st, save] = useSaved<Saved>(ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const reset = (p: Partial<Saved>) => set({ ...p, seed: null, runs: [] });

  const rec = st.seed !== null ? record(st, st.seed) : null;
  const matches = rec ? rec.filter((x) => x.match).length : 0;
  const base = (st.pReward * st.pWarm + (100 - st.pReward) * (100 - st.pWarm)) / 100;
  const runMany = () => {
    const out: number[] = [];
    for (let k = 0; k < 200; k++) {
      const rr = record(st, newSeed());
      out.push((100 * rr.filter((x) => x.match).length) / st.len);
    }
    set({ runs: [...st.runs, ...out].slice(-1000) });
  };
  const high = st.runs.filter((x) => x >= THRESH).length;
  // histogram in 10-point bins
  const bins = Array.from({ length: 10 }, (_, b) => st.runs.filter((x) => Math.min(9, Math.floor(x / 10)) === b).length);
  const maxBin = Math.max(1, ...bins);
  const shown = rec ? (st.selective ? rec.map((x, i) => ({ ...x, i })).filter((x) => x.match) : rec.map((x, i) => ({ ...x, i }))) : [];
  const cols = st.len === 12 ? 6 : st.len === 30 ? 10 : 12;

  return (
    <section className="md c3 c4" aria-labelledby="cs-title">
      <header className="md-head">
        <p className="md-tag">现代模拟 · 只说明一种可能</p>
        <h3 id="cs-title" className="md-title">
          巧合会产生多少"相应"？
        </h3>
        <p className="md-lede">
          王充说寒温"遭與賞罰同時"：恰好同时发生，被人说成相应。下面用一个现代的简单模型看看：如果君主的赏罚和天气的寒温<b>根本没有联系</b>，一份记录里会出现多少"赏而温、罚而寒"的相合？
        </p>
      </header>

      <Gu src="《论衡·寒温》" orig="然而寒溫之至，遭與賞罰同時，變復之家，因緣名之矣。" zh="然而寒温到来的时候，恰好和赏罚同时发生，主张灾变可以通过修政来恢复的那些人，就借此把它们说成是相应的了。" />

      <div className="g4-panel">
        <p className="c3-layer-k">模型的假设（全部写出来）</p>
        <ul className="c4-assume">
          <li>记录分成若干个时段；每个时段，君主或者行赏，或者行罚，天气或者温，或者寒。</li>
          <li>行赏的机会和天气温暖的机会由你设定；两者<b>互相独立</b>：模型里赏罚对天气没有任何影响。</li>
          <li>"相合"指赏而温或罚而寒。真实的天气和政事远比这复杂，这里只保留了最少的东西。</li>
        </ul>
        <div className="c4-sliders">
          <label className="c4-slider">
            <span>行赏的时段约占 {st.pReward}%</span>
            <input type="range" min={10} max={90} step={10} value={st.pReward} onChange={(e) => reset({ pReward: Number(e.target.value) })} />
          </label>
          <label className="c4-slider">
            <span>温暖的时段约占 {st.pWarm}%</span>
            <input type="range" min={10} max={90} step={10} value={st.pWarm} onChange={(e) => reset({ pWarm: Number(e.target.value) })} />
          </label>
        </div>
        <Seg
          name="cs-len"
          label="一份记录有多少个时段"
          value={st.len}
          opts={[
            [12, '12 个时段'],
            [30, '30 个时段'],
            [60, '60 个时段'],
          ]}
          onPick={(v) => reset({ len: v })}
        />
        <p className="md-feedback">
          <span className="md-fb-k">基础比率：</span>即使毫无联系，每个时段相合的机会也是 {st.pReward}% × {st.pWarm}% + {100 - st.pReward}% × {100 - st.pWarm}% = <b>{Math.round(base)}%</b>。
          {base > 60 && ' 赏多而又暖和的年代，"相应"会显得特别多：这来自两件事各自的频率，不来自它们之间的联系。'}
        </p>
      </div>

      <div className="g4-panel">
        <p className="c3-layer-k">一份记录</p>
        <div className="pe-actions c4-actions">
          <button type="button" className="md-disclose" onClick={() => set({ seed: newSeed() })}>
            {rec ? '换一份记录' : '生成一份记录'}
          </button>
          {rec && (
            <label className="c4-check">
              <input type="checkbox" checked={st.selective} onChange={(e) => set({ selective: e.target.checked })} />
              <span>只看"变复之家"会记下的相合事例</span>
            </label>
          )}
        </div>
        {rec && (
          <>
            <div className="c4-grid" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }} role="list" aria-label={`记录：${st.len} 个时段中有 ${matches} 个相合`}>
              {shown.map((x) => (
                <div key={x.i} role="listitem" className={'c4-cell' + (x.match ? ' is-match' : '')}>
                  <span>{x.reward ? '赏' : '罚'}</span>
                  <span>{x.warm ? '温' : '寒'}</span>
                </div>
              ))}
            </div>
            <div className="md-feedback" aria-live="polite">
              {st.selective ? (
                <>
                  <p className="md-fb-k">记录上全是相应：{matches} 例，没有一例不合。</p>
                  <p>不相合的 {st.len - matches} 个时段没有被记下来。只看留下来的记录，会以为赏罚和寒温总是相应。正文说古书中"应验"的占例也是这样被挑选出来的。</p>
                </>
              ) : (
                <>
                  <p className="md-fb-k">
                    {st.len} 个时段中有 {matches} 个相合（{Math.round((100 * matches) / st.len)}%），基础比率是 {Math.round(base)}%。
                  </p>
                  <p>在这个模型里，每一个相合都是巧合：赏罚对天气没有任何作用。</p>
                </>
              )}
            </div>
          </>
        )}
      </div>

      <div className="g4-panel">
        <p className="c3-layer-k">重复很多次</p>
        <p>每按一次，用同样的设定生成两百份记录，统计每份记录的相合比例。相合比例达到 {THRESH}% 以上的记录，很容易被当作"天人相应"的证据。</p>
        <div className="pe-actions c4-actions">
          <button type="button" className="md-disclose" onClick={runMany}>
            再生成两百份记录
          </button>
          {st.runs.length > 0 && (
            <button type="button" className="md-reset" onClick={() => set({ runs: [] })}>
              清空
            </button>
          )}
        </div>
        {st.runs.length > 0 && (
          <>
            <svg viewBox="0 0 320 150" className="c3-svg c4-hist" role="img" aria-label={`${st.runs.length} 份记录的相合比例分布；其中 ${high} 份达到 ${THRESH}% 以上。`}>
              {bins.map((n, b) => (
                <g key={b}>
                  <rect x={20 + b * 28} y={120 - (100 * n) / maxBin} width={24} height={(100 * n) / maxBin} className={'c4-bar' + (b >= 8 ? ' is-high' : '')} />
                  <text x={32 + b * 28} y={136} textAnchor="middle" className="c2-lbl c2-lbl--s">
                    {b * 10}
                  </text>
                </g>
              ))}
              <line x1={20 + 7.5 * 28} x2={20 + 7.5 * 28} y1={14} y2={122} className="c4-thresh" />
              <text x={20 + 7.5 * 28 + 4} y={22} className="c2-lbl c2-lbl--s">
                {THRESH}%
              </text>
              <text x={300} y={148} textAnchor="end" className="c2-lbl c2-lbl--s">
                相合比例（%）
              </text>
            </svg>
            <div className="md-feedback" aria-live="polite">
              <p className="md-fb-k">
                {st.runs.length} 份记录中，有 {high} 份（{Math.round((100 * high) / st.runs.length)}%）的相合比例达到 {THRESH}% 以上。
              </p>
              <p>
                {st.len === 12
                  ? '记录越短，靠巧合出现"高度相应"的记录越多。试试改成 60 个时段。'
                  : '记录越长，相合比例越集中在基础比率附近；但只要基础比率本身高，或者只记相合的事例，"相应"照样会显得很多。'}
                如果有很多人、很多年代在找相应，总会有一些记录看起来很惊人。
              </p>
            </div>
          </>
        )}
      </div>

      <Limits>
        <p>
          这是本课设计的现代模拟，不是王充自己的方法：王充用的是反例、推论和类比（见上文《寒温》的反驳表），没有做过统计。模型的结论只在它的假设下成立：它说明，在赏罚和寒温毫无联系的情况下，也可能出现大量的"相应"；它不能证明历史上每一种天人相应的说法都是错的。要判断一种相应是否真实，需要的是王充所说的"效验"：看它是否在应当出现的地方出现，在不应当出现的地方不出现。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
