import { Band, Claim, Limits, Seg, Src, Tag, useSavedIn } from './shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import '../cn5/cn5.css';
import '../cn7/cn7.css';
import './ip.css';

// 三 · after 灯与牛奶 (the paragraph 它没有做到什么). Three tools:
// 1. Inspect: the five aggregates, and the parts of the chariot / of Nāgasena, one by one.
// 2. The chapter's six-step reconstruction, text and reconstruction kept in two
//    columns, with a stop at step 5: what has the argument shown so far?
// 3. Neither the same nor another: the lamp, the milk, the mango.
// Everything comes from 三、无我与人格同一性 and notes 20–30. The argument is
// never presented as proving that persons do not exist.

const ID = 'chariot-explorer';

type Agg = 'rupa' | 'vedana' | 'sanna' | 'sankhara' | 'vinnana';
const AGG: { k: Agg; pi: string; zh: string; t: string }[] = [
  { k: 'rupa', pi: 'rūpa', zh: '色', t: '物质的方面，包括身体' },
  { k: 'vedana', pi: 'vedanā', zh: '受', t: '感受：乐、苦、不苦不乐' },
  { k: 'sanna', pi: 'saññā', zh: '想', t: '辨认、标记，例如认出"这是蓝色"' },
  { k: 'sankhara', pi: 'saṅkhārā', zh: '行', t: '意志和其他造作性的心理活动' },
  { k: 'vinnana', pi: 'viññāṇa', zh: '识', t: '认识、意识' },
];

type Mode = 'ratha' | 'naga';
// The five parts named in the king's Pāli answer (note 26); the Chinese of the
// interrogation also lists 车轭、缰绳、鞭杖, which the Pāli line abbreviates.
const PARTS: { pi: string; zh: string }[] = [
  { pi: 'īsā', zh: '车辕' },
  { pi: 'akkha', zh: '车轴' },
  { pi: 'cakka', zh: '车轮' },
  { pi: 'rathapañjara', zh: '车厢' },
  { pi: 'rathadaṇḍaka', zh: '车杆' },
];
const NPARTS = ['头发', '体毛', '……', '头颅中的脑', '色', '受', '想', '行', '识'];

type Q = 'each' | 'all' | 'apart' | 'word';
const QS: [Q, string][] = [
  ['each', '某一个部分'],
  ['all', '合起来'],
  ['apart', '离开它们之外'],
  ['word', '这个字本身'],
];

// ── 2. the six steps ──────────────────────────────────────────────────
const STEPS: { t: string; basis: string }[] = [
  { t: '如果"那先"这个词指一个实在的东西，那么它所指的，要么是某一个组成部分，要么是所有组成部分合起来，要么是组成部分之外的某个东西。', basis: '盘问的三种选项（逐项、合起来、离开它们之外）' },
  { t: '它不是任何一个组成部分。', basis: '国王从头发问到识，那先都说"不是"' },
  { t: '它不是所有组成部分合起来。', basis: '"色受想行识合起来是那先吗？""不是"' },
  { t: '它不是组成部分之外的某个东西。', basis: '"离开色受想行识，另外有那先吗？""不是"' },
  { t: '所以，"那先"这个词不指一个在最高意义上存在的东西。', basis: '那先的结论' },
  { t: '但是，依靠这些组成部分，"那先"这个称呼是可以正当使用的，正如国王可以正当地说"我坐车来的"。', basis: '国王关于车的回答，那先的类推' },
];
type Five = 'none' | 'ultimate' | 'misuse';
const FIVE: [Five, string][] = [
  ['none', '那先不存在'],
  ['ultimate', '"那先"这个词不指一个在最高意义上存在的东西'],
  ['misuse', '以后不该再用"那先"这个称呼'],
];
type Three = 'list' | 'structure';
const THREE: [Three, string][] = [
  ['list', '"合起来"只是把各部分列在一起'],
  ['structure', '车就是处在车的结构中的各部分'],
];

// ── 3. neither the same nor another ───────────────────────────────────
type Ex = 'lamp' | 'milk' | 'mango';
const EX: [Ex, string][] = [
  ['lamp', '灯'],
  ['milk', '牛奶'],
  ['mango', '芒果'],
];

interface Saved {
  agg: Agg | null;
  mode: Mode;
  q: Q | null;
  step: number;
  five: Five | null;
  three: Three | null;
  ex: Ex;
}
const INIT: Saved = { agg: null, mode: 'ratha', q: null, step: 0, five: null, three: null, ex: 'lamp' };

export default function ChariotExplorer() {
  const [st, save] = useSavedIn<Saved>('IN2', ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const agg = AGG.find((a) => a.k === st.agg);
  const step = Math.max(0, Math.min(5, st.step));
  const isRatha = st.mode === 'ratha';
  const name = isRatha ? '车' : '那先';
  const stopAt5 = step >= 4 && !st.five;

  return (
    <section className="md c3 c5" aria-labelledby="ce-title">
      <header className="md-head">
        <p className="md-tag">五蕴与车喻 · 三个工具</p>
        <h3 id="ce-title" className="md-title">
          车喻证明了什么，没有证明什么
        </h3>
        <p className="md-lede">先逐一看五蕴和车的各个部分，再沿着本课的六步重建走一遍，最后看"既不是同一个，也不是另一个"的三个比喻。整个演示的结论有两半：在最高意义上找不到人；依靠五蕴，"人"这个称呼是正当的。</p>
      </header>

      <Band>一 · 五蕴：五种分析经验的角度</Band>
      <ul className="ip-chips" aria-label="五蕴">
        {AGG.map((a) => (
          <li key={a.k}>
            <button type="button" className={'ip-chip' + (st.agg === a.k ? ' is-on' : '')} aria-pressed={st.agg === a.k} onClick={() => set({ agg: st.agg === a.k ? null : a.k })}>
              {a.zh}
              <small lang="pi">{a.pi}</small>
            </button>
          </li>
        ))}
      </ul>
      {agg ? (
        <div className="c5-row" aria-live="polite">
          <p>
            <b>
              {agg.zh}（<span lang="pi">{agg.pi}</span>）
            </b>
            ：{agg.t}
          </p>
          <Claim b="text" who="《相应部》22.59，前一章已读">
            控制论证：如果{agg.zh}是我，我们就能让它"这样"、"不要这样"，但我们做不到。无常论证：{agg.zh}是无常的，无常的东西不适合被看作"这是我的，这是我，这是我的自身"。
          </Claim>
          <p className="md-muted">这两个论证否定的是一个恒常、自主、能控制自己的"自我"。它们没有回答：那么日常所说的"人"是什么？下面的车喻处理的是这个问题。</p>
        </div>
      ) : (
        <p className="md-muted">点一个蕴，看它的大致所指。这五类不是五个器官，而是五种分析经验的角度，确切范围在经中并不总是清楚。</p>
      )}
      <Claim b="text" who="《中部》44，法施比丘尼">
        "有身"，人们通常当作"自己"的那个东西，就是这五取蕴。
      </Claim>

      <p className="md-fb-k">盘问：</p>
      <Seg
        name="ce-mode"
        label="盘问的对象"
        value={st.mode}
        opts={[
          ['ratha', '国王的车'],
          ['naga', '那先'],
        ]}
        onPick={(v) => set({ mode: v, q: null })}
      />
      <ul className="ip-chips" aria-label={isRatha ? '车的部分' : '那先的组成部分'}>
        {isRatha
          ? PARTS.map((p) => (
              <li key={p.pi}>
                <span className="ip-chip is-gap">
                  {p.zh}
                  <small lang="pi">{p.pi}</small>
                </span>
              </li>
            ))
          : NPARTS.map((p, i) => (
              <li key={i}>
                <span className="ip-chip is-gap">{p}</span>
              </li>
            ))}
      </ul>
      <p className="md-fb-k">问："{name}"是……</p>
      <Seg name="ce-q" label={`"${name}"是什么`} value={st.q} opts={QS} onPick={(v) => set({ q: v })} />
      {st.q && (
        <p className="md-feedback" aria-live="polite">
          {st.q === 'each' && (isRatha ? '车辕是车吗？车轴、车轮、车厢、车杆是车吗？国王都回答"不是"。' : '头发是那先吗？……色、受、想、行、识是那先吗？那先都说"不是"。')}
          {st.q === 'all' && (isRatha ? '这些合在一起是车吗？国王回答"不是"。' : '色受想行识合起来是那先吗？"不是"。')}
          {st.q === 'apart' && (isRatha ? '离开这些另外有车吗？"不是"。' : '离开色受想行识，另外有那先吗？"不是"。')}
          {st.q === 'word' && (isRatha ? '"车"这个字就是车吗？"不是"。那先于是说：您说坐车来的，却说不出什么是车。' : '本章读到的盘问，在"那先"一边没有单独问"这个字是不是那先"；这一问只出现在车的一边。')}
          {' '}
          <Tag b={st.q === 'word' && !isRatha ? 'course' : 'text'} who={st.q === 'word' && !isRatha ? undefined : '《弥兰王问经》，据本章的转述'} />
        </p>
      )}
      {isRatha ? (
        <Src src="《弥兰王问经》，国王的回答" lang="pi" orig="“nāhaṁ, bhante nāgasena, musā bhaṇāmi, īsañca paṭicca akkhañca paṭicca cakkāni ca paṭicca rathapañjarañca paṭicca rathadaṇḍakañca paṭicca ‘ratho’ti saṅkhā samaññā paññatti vohāro nāmamattaṁ pavattatī”ti." zh={'"那先尊者，我没有说假话。依靠车辕，依靠车轴，依靠车轮，依靠车厢，依靠车杆，才有\'车\'这个称呼、名号、施设、说法、名字而已。"'} />
      ) : (
        <Src
          src="《弥兰王问经》，那先的类推"
          lang="pi"
          orig="evameva kho, mahārāja, mayhampi kese ca paṭicca lome ca paṭicca …pe… matthake matthaluṅgañca paṭicca rūpañca paṭicca vedanañca paṭicca saññañca paṭicca saṅkhāre ca paṭicca viññāṇañca paṭicca ‘nāgaseno’ti saṅkhā samaññā paññatti vohāro nāmamattaṁ pavattati, paramatthato panettha puggalo nūpalabbhati."
          zh={'大王，同样，依靠我的头发，依靠体毛……依靠头颅中的脑，依靠色、受、想、行、识，才有"那先"这个称呼、名号、施设、说法、名字而已；而在最高意义上，这里找不到人。'}
        />
      )}
      <Claim b="course" who="本章的文本对照">
        瓦吉拉的偈（《相应部》5.10）说"众生"是一个约定的称呼（sammuti）；那先的散文加上了 paramatthato，"在最高意义上"。后一个词是阿毗达磨的关键词，说明这段对话已经带着部派时期的分析语言。
      </Claim>

      <Band>二 · 本课的六步重建</Band>
      <p className="md-muted">这只是许多可能的重建之一。左栏是本课写出的步骤，右栏是它在经文中的依据。</p>
      <ol className="c5-rows" style={{ listStyle: 'none', padding: 0 }}>
        {STEPS.slice(0, step + 1).map((s, i) => (
          <li key={i} className="ip-two" style={{ margin: 0 }}>
            <div>
              <p className="ip-col-k">第 {i + 1} 步 · 本课的重构</p>
              <p>{s.t}</p>
            </div>
            <div>
              <p className="ip-col-k">经文中的依据</p>
              <p>{s.basis}</p>
            </div>
          </li>
        ))}
      </ol>
      {step === 2 && (
        <div className="c5-row">
          <p className="md-fb-k">这一步最容易引起争议。你怎样理解"合起来也不是车"？</p>
          <Seg name="ce-three" label="怎样理解第三步" col value={st.three} opts={THREE} onPick={(v) => set({ three: v })} />
          {st.three && (
            <div aria-live="polite">
              <Claim b="course">一种解释：经文所说的"合起来"只是把各部分列在一起。如果这样，反驳者可以说，车就是"处在车的结构中的各部分"，第三步就不成立。</Claim>
              <Claim b="course">另一种解释：即使加上结构，"结构"也只是我们对这些部分之间关系的一种把握方式，并不是另外一个实在的东西。这样第三步仍然成立。</Claim>
              <p className="md-feedback">哪一种解释更接近这部书的意思，经文本身没有说清楚。你的选择{st.three === 'list' ? '对应第一种解释：你需要回答结构是什么。' : '对应反驳者的立场：要守住第三步，佛教一方需要第二种解释。'}</p>
            </div>
          )}
        </div>
      )}
      {step >= 4 && (
        <div className="c5-row">
          <p className="md-fb-k">停一下：到第 5 步为止，论证证明了什么？</p>
          <Seg name="ce-five" label="到第五步为止，论证证明了什么" col value={st.five} opts={FIVE} onPick={(v) => set({ five: v })} />
          {st.five && (
            <p className="md-feedback" aria-live="polite">
              <span className={'c5-verdict ' + (st.five === 'ultimate' ? 'c5-verdict--ok' : 'c5-verdict--no')}>{st.five === 'ultimate' ? '和本课的读法一致' : '本课不这样读'}</span>
              {st.five === 'none' && '车喻论证没有证明"人不存在"或"那先不存在"。国王坐车来的，这句话是真的；那先在和国王说话，这也是真的。'}
              {st.five === 'misuse' && '恰恰相反：第 6 步说，依靠五蕴，"那先"这个称呼是可以正当使用的。瓦吉拉的偈也没有说"众生"这个词错了。'}
              {st.five === 'ultimate' && '被否定的，是一个在五蕴之外、或者等同于五蕴某一部分的、单一而实在的东西，作为"那先"这个词的所指。'}
            </p>
          )}
        </div>
      )}
      <div className="md-steps-nav">
        <button type="button" className="md-disclose" disabled={step === 0} onClick={() => set({ step: step - 1 })}>
          上一步
        </button>{' '}
        <button type="button" className="md-disclose" disabled={step === 5 || stopAt5} onClick={() => set({ step: step + 1 })}>
          {stopAt5 ? '先回答上面的问题' : step === 5 ? '六步已完' : '下一步'}
        </button>
      </div>
      {step === 5 && (
        <p className="md-feedback">
          正因为有第 6 步，国王开头的反驳（谁持戒？谁杀生？）就有了回答的方向：这些称呼在约定的意义上都可以正当使用，只是它们所指的是依条件而有的五蕴之流，而不是一个恒常的主体。<Tag b="text" who="不过这部书在这一段没有逐条回答国王" />
        </p>
      )}

      <Band>三 · 既不是同一个，也不是另一个</Band>
      <Src src="《弥兰王问经》，国王的问题" lang="pi" orig="“bhante nāgasena, yo uppajjati, so eva so, udāhu añño”ti?" zh={'"那先尊者，生起的那一个，就是原来那一个，还是另一个？"'} />
      <Seg name="ce-ex" label="选择一个比喻" value={st.ex} opts={EX} onPick={(v) => set({ ex: v })} />
      <div className="c5-row" aria-live="polite">
        {st.ex === 'lamp' && (
          <>
            <Claim b="text">初夜、中夜、后夜的火焰不是同一个；但也不是三盏灯。是依靠这一盏灯，整夜都亮着。</Claim>
            <Src src="《弥兰王问经》" lang="pi" orig="“Evameva kho, mahārāja, dhammasantati sandahati, añño uppajjati, añño nirujjhati, apubbaṁ acarimaṁ viya sandahati, tena na ca so, na ca añño, purimaviññāṇe pacchimaviññāṇaṁ saṅgahaṁ gacchatī”ti." zh={'"大王，同样，诸法的相续连接下去：一个生起，另一个灭去，好像没有先后地连接下去。所以，既不是那一个，也不是另一个，后来的识被归入前面的识。"'} />
          </>
        )}
        {st.ex === 'milk' && <Claim b="text">牛奶变成酪，酪变成生酥，生酥变成熟酥。说"牛奶就是酪"不对；但熟酥是依靠牛奶而产生的。诸法的相续也是这样。</Claim>}
        {st.ex === 'mango' && (
          <>
            <Src src="《弥兰王问经》，稍后的一段" lang="pi" orig="“Yadi, bhante, na imaṁ yeva nāmarūpaṁ paṭisandahati, nanu so mutto bhavissati pāpakehi kammehī”ti?" zh={'"尊者，如果接续的不是这同一个名色，那么他不就从恶业中解脱了吗？"'} />
            <Claim b="text">偷芒果的人辩解说，他偷的芒果不是种下的那个芒果。国王说他该受罚，因为后来的芒果是从先前种下的芒果来的。</Claim>
            <Claim b="course">责任依据的不是一个不变的主体，而是因果的相续。代价是：同一性被换成了连续性，而连续性是有程度的。</Claim>
          </>
        )}
      </div>
      <p className="md-muted">三个比喻说明了"不是同一个，也不是另一个"的结构，但没有说明是什么把相续中的各个环节连在一起。灯有灯芯和油，牛奶的变化有物质上的连续；一个人的诸法相续，特别是在死亡和再生之间，靠什么连续？这一段没有回答，后来的阿毗达磨各派给出了不同的回答（第五部分）。</p>

      <Limits>
        <p>这个演示只用本章第三部分读过的段落和本章的六步重建。重建不是《弥兰王问经》的原话；第三步的两种解释都是本课提出的，经文没有说清楚。</p>
        <p>《弥兰王问经》是一部部派时期的阐释性作品，不是佛陀的言论，也不是历史上那位国王的言论。瓦吉拉的偈和那先的散文用词不同（约定 / 最高意义），本演示没有把两者合成一种学说。</p>
        <p>这里也不涉及后来中观派对"最高意义上存在的诸法"的进一步追问，以及补特伽罗论者的立场；后者见本部分最后一节的"严肃的反驳"。</p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
