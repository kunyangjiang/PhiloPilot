import { Limits, Seg, newSeed, rng, useSaved } from './shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn2/cn2.css';
import '../cn3/cn3.css';
import './cn4.css';

// 五 · after the paragraph on how changing lines are read ("有了变爻，应当怎样解释？").
// Builds a hexagram from six line values (6/7/8/9), shows its two trigrams,
// its changing lines and the resulting 之卦. Probabilities are shown only
// together with the casting procedure they belong to. The component names
// hexagrams and shows structure; it never interprets a cast.

const ID = 'hexagram-explorer';
type V = 6 | 7 | 8 | 9;
type Method = 'yarrow' | 'coins';
interface Saved {
  lines: V[]; // bottom (初) to top (上)
  method: Method;
  tally: Record<V, number>;
  runs: number;
}
const INIT: Saved = { lines: [7, 7, 9, 8, 8, 8], method: 'yarrow', tally: { 6: 0, 7: 0, 8: 0, 9: 0 }, runs: 0 };

const VALUES: V[] = [6, 7, 8, 9];
const VAL: Record<V, { name: string; yang: boolean; moving: boolean }> = {
  6: { name: '老阴', yang: false, moving: true },
  7: { name: '少阳', yang: true, moving: false },
  8: { name: '少阴', yang: false, moving: false },
  9: { name: '老阳', yang: true, moving: true },
};

/** Probability of each value, as [numerator, denominator], under each procedure. */
const PROB: Record<Method, Record<V, [number, number]>> = {
  yarrow: { 6: [1, 16], 7: [5, 16], 8: [7, 16], 9: [3, 16] },
  coins: { 6: [1, 8], 7: [3, 8], 8: [3, 8], 9: [1, 8] },
};
const METHOD: Record<Method, { t: string; how: string }> = {
  yarrow: {
    t: '蓍草法（大衍之数，通行的重构）',
    how: '四十九根蓍草，三次"分、挂、揲、归"，余数第一变为五或九、后两变为四或八；假定每次随手分开后，一堆的根数除以四的余数，四种情况的机会相等。这是后人（主要是朱熹）根据《系辞》的简短描述重构的程序。',
  },
  coins: {
    t: '三钱法（后来民间的替代方法）',
    how: '同时掷三枚铜钱，一种常见的规定是一面记三、另一面记二，三枚相加得六、七、八或九；假定每枚铜钱两面出现的机会相等。规定不同，结果也会不同。',
  },
};

// Trigrams, keyed by their lines bottom-up (1 = yang). From the chapter's trigram table.
const TRI: Record<string, { n: string; sym: string; xing: string; obj: string }> = {
  '111': { n: '乾', sym: '☰', xing: '健', obj: '天' },
  '000': { n: '坤', sym: '☷', xing: '顺', obj: '地' },
  '100': { n: '震', sym: '☳', xing: '动', obj: '雷' },
  '011': { n: '巽', sym: '☴', xing: '入', obj: '风' },
  '010': { n: '坎', sym: '☵', xing: '陷', obj: '水' },
  '101': { n: '离', sym: '☲', xing: '丽（附着）', obj: '火' },
  '001': { n: '艮', sym: '☶', xing: '止', obj: '山' },
  '110': { n: '兑', sym: '☱', xing: '说（悦）', obj: '泽' },
};
const ORDER = ['乾', '兑', '离', '震', '巽', '坎', '艮', '坤'];
// Received (King Wen) number of each hexagram: rows = upper trigram, columns = lower trigram, both in ORDER.
const NUM = [
  [1, 10, 13, 25, 44, 6, 33, 12],
  [43, 58, 49, 17, 28, 47, 31, 45],
  [14, 38, 30, 21, 50, 64, 56, 35],
  [34, 54, 55, 51, 32, 40, 62, 16],
  [9, 61, 37, 42, 57, 59, 53, 20],
  [5, 60, 63, 3, 48, 29, 39, 8],
  [26, 41, 22, 27, 18, 4, 52, 23],
  [11, 19, 36, 24, 46, 7, 15, 2],
];
const NAMES =
  '乾 坤 屯 蒙 需 讼 师 比 小畜 履 泰 否 同人 大有 谦 豫 随 蛊 临 观 噬嗑 贲 剥 复 无妄 大畜 颐 大过 坎 离 咸 恒 遁 大壮 晋 明夷 家人 睽 蹇 解 损 益 夬 姤 萃 升 困 井 革 鼎 震 艮 渐 归妹 丰 旅 巽 兑 涣 节 中孚 小过 既济 未济'.split(' ');
/** Hexagrams the chapter itself discusses. */
const IN_TEXT: Record<string, string> = {
  乾: '第五部分「读一个卦：乾」逐爻读过这一卦。',
  泰: '第五部分「一个完整的例子：泰之临」用的就是这一卦。',
  临: '泰卦九三变，得到的之卦就是临（"泰之临"）。',
  否: '《序卦》："泰者通也。物不可以終通，故受之以否。"',
  姤: '想一想（五）问的就是这一卦。',
};

const POS = ['初', '二', '三', '四', '五', '上'];
const lineName = (i: number, v: V) => {
  const n = VAL[v].yang ? '九' : '六';
  return i === 0 ? '初' + n : i === 5 ? '上' + n : n + POS[i];
};

function hexOf(bits: boolean[]) {
  const key = (a: boolean[]) => a.map((b) => (b ? '1' : '0')).join('');
  const lo = TRI[key(bits.slice(0, 3))];
  const up = TRI[key(bits.slice(3))];
  const num = NUM[ORDER.indexOf(up.n)][ORDER.indexOf(lo.n)];
  return { lo, up, num, name: NAMES[num - 1] };
}

const PRESETS: { k: string; lines: V[] }[] = [
  { k: '正文的例子：七七九八八八', lines: [7, 7, 9, 8, 8, 8] },
  { k: '想一想（五）：八七七七七七', lines: [8, 7, 7, 7, 7, 7] },
  { k: '六爻都是七', lines: [7, 7, 7, 7, 7, 7] },
];

function draw(method: Method, r: () => number): V {
  const x = r();
  let acc = 0;
  for (const v of VALUES) {
    const [a, b] = PROB[method][v];
    acc += a / b;
    if (x < acc) return v;
  }
  return 8;
}

function Line({ v, i, changed }: { v: V; i: number; changed?: boolean }) {
  const yang = changed ? !VAL[v].yang : VAL[v].yang;
  const moving = !changed && VAL[v].moving;
  return (
    <svg viewBox="0 0 120 16" className="c4-line" aria-hidden="true">
      {yang ? <rect x={0} y={3} width={120} height={10} /> : (
        <>
          <rect x={0} y={3} width={50} height={10} />
          <rect x={70} y={3} width={50} height={10} />
        </>
      )}
      {moving && v === 9 && <circle cx={60} cy={8} r={6} className="c4-mark" />}
      {moving && v === 6 && <path d="M54 2 L66 14 M66 2 L54 14" className="c4-mark" />}
      <title>{lineName(i, v)}</title>
    </svg>
  );
}

const pct = (a: number, b: number) => `${Math.round((1000 * a) / b) / 10}%`;

export default function HexagramExplorer() {
  const [st, save] = useSaved<Saved>(ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const lines = st.lines.length === 6 ? st.lines : INIT.lines;
  const ben = hexOf(lines.map((v) => VAL[v].yang));
  const moving = lines.map((v, i) => (VAL[v].moving ? i : -1)).filter((i) => i >= 0);
  const zhi = moving.length ? hexOf(lines.map((v) => (VAL[v].moving ? !VAL[v].yang : VAL[v].yang))) : null;
  const setLine = (i: number, v: V) => set({ lines: lines.map((x, j) => (j === i ? v : x)) });

  const castOnce = () => {
    const r = rng(newSeed());
    set({ lines: Array.from({ length: 6 }, () => draw(st.method, r)) });
  };
  const castMany = () => {
    const r = rng(newSeed());
    const t = { ...st.tally };
    for (let k = 0; k < 600; k++) t[draw(st.method, r)]++;
    set({ tally: t, runs: st.runs + 100 });
  };
  const total = VALUES.reduce((s, v) => s + st.tally[v], 0);

  return (
    <section className="md c3 c4" aria-labelledby="hx-title">
      <header className="md-head">
        <p className="md-tag">结构演示 · 不作占断</p>
        <h3 id="hx-title" className="md-title">
          卦的构成：从六个数到本卦和之卦
        </h3>
        <p className="md-lede">
          给六条爻各选一个数（六、七、八、九），从下往上排，看它们组成哪两个三画卦、哪一个六画卦，哪些爻会变，变了以后得到哪一卦。这里只演示卦的结构和历史上的操作程序；它不解释任何一卦的吉凶，也不回答任何问题。
        </p>
      </header>

      <div className="g4-panel">
        <p className="c3-layer-k">先选一种起卦程序（概率只对这一种程序成立）</p>
        <Seg
          name="hx-method"
          label="起卦程序"
          col
          value={st.method}
          opts={(Object.keys(METHOD) as Method[]).map((m) => [m, METHOD[m].t] as const)}
          onPick={(m) => set({ method: m, tally: INIT.tally, runs: 0 })}
        />
        <p className="md-muted">{METHOD[st.method].how}</p>
        <div className="c2-scroll">
          <table className="g4-table c4-prob">
            <caption>在这种程序下，每一条爻得到各个数的概率</caption>
            <thead>
              <tr>
                <th scope="col">数</th>
                {VALUES.map((v) => (
                  <th key={v} scope="col">
                    {['六', '七', '八', '九'][v - 6]}（{VAL[v].name}）
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(['yarrow', 'coins'] as Method[]).map((m) => (
                <tr key={m} className={m === st.method ? 'is-std' : ''}>
                  <th scope="row">{m === 'yarrow' ? '蓍草法' : '三钱法'}</th>
                  {VALUES.map((v) => (
                    <td key={v}>
                      {PROB[m][v][0]}/{PROB[m][v][1]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="md-muted">
          两种程序得到阳爻（七或九）的机会都是一半；但用蓍草时，阴爻变（六）的机会只有阳爻变（九）的三分之一，用三钱时两者相等。数字是程序的性质，不是"六七八九"本身的性质。
        </p>
      </div>

      <div className="c4-hx">
        <div className="c4-hx-rows" role="group" aria-label="六条爻，从上到下排列（上爻在最上面）">
          {[5, 4, 3, 2, 1, 0].map((i) => (
            <div key={i} className="c4-hx-row">
              <span className="c4-hx-pos">{lineName(i, lines[i])}</span>
              <Line v={lines[i]} i={i} />
              <div className="c4-vals" role="radiogroup" aria-label={`第 ${i + 1} 爻（${POS[i]}爻）的数`}>
                {VALUES.map((v) => (
                  <label key={v} className={'c4-val' + (lines[i] === v ? ' is-on' : '')}>
                    <input type="radio" name={`hx-l${i}`} checked={lines[i] === v} onChange={() => setLine(i, v)} />
                    <span>{['六', '七', '八', '九'][v - 6]}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="c4-hx-out" aria-live="polite">
          <div className="c2-card">
            <p className="g4-k">本卦</p>
            <p className="c4-hx-name">
              {ben.name}
              <span className="c4-hx-no">（通行本第 {ben.num} 卦）</span>
            </p>
            <p>
              {ben.lo.n}（{ben.lo.sym}）下，{ben.up.n}（{ben.up.sym}）上。下卦{ben.lo.n}：性质"{ben.lo.xing}"，通行说法对应{ben.lo.obj}；上卦{ben.up.n}：性质"{ben.up.xing}"，对应{ben.up.obj}。
            </p>
            {IN_TEXT[ben.name] && <p className="md-muted">{IN_TEXT[ben.name]}</p>}
          </div>
          <div className={'c2-card' + (zhi ? '' : ' c3-card--limit')}>
            <p className="g4-k">变爻与之卦</p>
            {zhi ? (
              <>
                <p>
                  变爻：{moving.map((i) => lineName(i, lines[i])).join('、')}。把{moving.length > 1 ? '这些爻' : '这一爻'}阴阳互换：
                </p>
                <div className="c4-mini" aria-hidden="true">
                  {[5, 4, 3, 2, 1, 0].map((i) => (
                    <Line key={i} v={lines[i]} i={i} changed={VAL[lines[i]].moving} />
                  ))}
                </div>
                <p className="c4-hx-name">
                  之卦：{zhi.name}
                  <span className="c4-hx-no">（第 {zhi.num} 卦，{zhi.lo.n}下{zhi.up.n}上）</span>
                </p>
                {IN_TEXT[zhi.name] && <p className="md-muted">{IN_TEXT[zhi.name]}</p>}
                <p className="md-muted">有变爻时该读哪一条爻辞，古代的占例并不一致，后来朱熹整理的规则也只是其中一种；这里不替你选择规则，也不读出任何吉凶。</p>
              </>
            ) : (
              <p>没有六或九，所以没有变爻，也就没有之卦。七和八都是不变的爻。</p>
            )}
          </div>
        </div>
      </div>

      <div className="pe-actions c4-actions">
        {PRESETS.map((p) => (
          <button key={p.k} type="button" className="md-disclose" onClick={() => set({ lines: p.lines })}>
            {p.k}
          </button>
        ))}
        <button type="button" className="md-disclose" onClick={castOnce}>
          按所选程序随机得到六爻
        </button>
      </div>

      <div className="g4-panel">
        <p className="c3-layer-k">重复很多次：看看频率是否接近上面的概率</p>
        <p>每按一次，按所选程序模拟一百个卦（六百条爻），只统计每个数出现的次数，不看是哪一卦。</p>
        <div className="pe-actions c4-actions">
          <button type="button" className="md-disclose" onClick={castMany}>
            再模拟一百卦
          </button>
          <button type="button" className="md-reset" onClick={() => set({ tally: INIT.tally, runs: 0 })}>
            清空统计
          </button>
        </div>
        {total > 0 && (
          <div className="c2-scroll">
            <table className="g4-table c4-prob" aria-live="polite">
              <caption>
                已模拟 {st.runs} 卦，共 {total} 条爻（{st.method === 'yarrow' ? '蓍草法' : '三钱法'}）
              </caption>
              <thead>
                <tr>
                  <th scope="col">数</th>
                  <th scope="col">出现次数</th>
                  <th scope="col">频率</th>
                  <th scope="col">按程序的概率</th>
                </tr>
              </thead>
              <tbody>
                {VALUES.map((v) => (
                  <tr key={v}>
                    <th scope="row">{['六', '七', '八', '九'][v - 6]}</th>
                    <td>{st.tally[v]}</td>
                    <td>{pct(st.tally[v], total)}</td>
                    <td>{pct(PROB[st.method][v][0], PROB[st.method][v][1])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Limits>
        <p>
          这是本课的教学演示：卦名、上下卦和"之卦"的规则来自《周易》和《说卦》的通行本；起卦程序是后人的重构，概率是本课按这个程序计算的。本工具不提供占断、预测或个人建议。正文已经说明：没有可靠的证据表明占卜能预测未来。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
