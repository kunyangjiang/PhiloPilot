import { Band, Claim, Limits, Seg, Src, Tag, useSavedIn } from '../in2/shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import '../cn5/cn5.css';
import '../cn7/cn7.css';
import '../in2/ip.css';

// 三 · after the three five-membered arguments compared (the paragraph 比较这三行).
// 1. Build an argument: put a card into each of the five slots. A few cards are
//    wrong on purpose (a reversed rule, a reason that is too wide, an analogy
//    without a rule); Vātsyāyana's 异喻 is accepted as the alternative it is.
// 2. Which way does vyāpti run? Fire pervades smoke, not the reverse.
// 3. The terms of the 《思择要集》 on one example.
// Not a logic engine: the cards and verdicts are fixed, all from 三、 and notes 31–43.

const ID = 'five-member';

type Slot = 'pratijna' | 'hetu' | 'udaharana' | 'upanaya' | 'nigamana';
const SLOTS: { k: Slot; zh: string; sa: string; job: string }[] = [
  { k: 'pratijna', zh: '宗', sa: 'pratijñā', job: '提出要证明的主张' },
  { k: 'hetu', zh: '因', sa: 'hetu', job: '给出理由（标记）' },
  { k: 'udaharana', zh: '喻', sa: 'udāharaṇa', job: '用一个公认的实例，显示理由与主张之间的联系' },
  { k: 'upanaya', zh: '合', sa: 'upanaya', job: '把实例中的联系应用到当前对象' },
  { k: 'nigamana', zh: '结', sa: 'nigamana', job: '重申主张，此时它已被证明' },
];

interface Card {
  id: string;
  t: string;
  slot: Slot | null; // where it belongs; null = belongs nowhere in a good argument
  alt?: Slot; // accepted in this slot as a variant
  why: string;
  b: 'text' | 'course';
}
type Ex = 'sound' | 'hill';
const EX: [Ex, string][] = [
  ['sound', '伐差耶那：声音是无常的'],
  ['hill', '《思择要集》：山上有火'],
];
const CARDS: Record<Ex, Card[]> = {
  sound: [
    { id: 's1', t: '声音是无常的', slot: 'pratijna', why: '这是要证明的主张。', b: 'text' },
    { id: 's2', t: '因为它有生起的性质', slot: 'hetu', why: '理由。', b: 'text' },
    { id: 's3', t: '有生起性质的锅等实体是无常的', slot: 'udaharana', why: '同类的实例。它介于"声音像锅一样"和"凡有生起性质的都是无常的"两种读法之间。', b: 'text' },
    { id: 's4', t: '声音也是这样有生起性质的', slot: 'upanaya', why: '把实例中的联系应用到声音上。', b: 'text' },
    { id: 's5', t: '所以，因为有生起的性质，声音是无常的', slot: 'nigamana', why: '重申主张。', b: 'text' },
    { id: 's6', t: '没有生起性质的自我等实体是常住的', slot: null, alt: 'udaharana', why: '这是伐差耶那给出的"异喻"版本：用一个没有这个性质的东西作对照。放在喻支是可以的；这时合支要说"声音不是那样没有生起性质的"。', b: 'text' },
    { id: 's7', t: '因为它是可听的', slot: null, why: '只有声音是可听的，没有别的例子可以支持或反驳这个理由。商羯罗主把"声常，所闻性故"判为"不共不定"（第四部分）；用它来证明"无常"，毛病是同一类的。', b: 'course' },
    { id: 's8', t: '声音像锅一样', slot: null, why: '只有类比，没有说出两者共同的性质（有生起的性质）和这个性质与无常的联系。后来的发展正是把这条联系明确地分离出来。', b: 'course' },
  ],
  hill: [
    { id: 'h1', t: '山上有火', slot: 'pratijna', why: '这是要证明的主张。', b: 'text' },
    { id: 'h2', t: '因为有烟', slot: 'hetu', why: '理由（标记）。', b: 'text' },
    { id: 'h3', t: '凡有烟的都有火，例如厨房', slot: 'udaharana', why: '一条一般规律（遍充）加上一个例子。', b: 'text' },
    { id: 'h4', t: '这座山也是这样（有烟）', slot: 'upanaya', why: '宗法性：被遍充者（烟）在山上。', b: 'text' },
    { id: 'h5', t: '所以山上有火', slot: 'nigamana', why: '重申主张。', b: 'text' },
    { id: 'h6', t: '凡有火的都有烟，例如厨房', slot: null, why: '方向反了：火遍充烟，烟不遍充火。有火而没有烟的地方是有的（本课举的例子：烧红的铁块）。', b: 'course' },
    { id: 'h7', t: '因为它是可知的', slot: null, why: '"不定"：理由也出现在没有所立的地方。湖也是可知的，湖上却没有火。', b: 'text' },
  ],
};
// A fixed, stable order for the cards, so that the correct answer is not always first.
const ORDER: Record<Ex, string[]> = {
  sound: ['s6', 's2', 's8', 's5', 's1', 's7', 's4', 's3'],
  hill: ['h3', 'h7', 'h1', 'h6', 'h5', 'h2', 'h4'],
};

// ── 3. terms ─────────────────────────────────────────────────────────
const TERMS: { zh: string; sa: string; hill: string }[] = [
  { zh: '宗（推理的对象）', sa: 'pakṣa', hill: '山' },
  { zh: '所立（要推出的性质）', sa: 'sādhya', hill: '火' },
  { zh: '因（标记）', sa: 'hetu, liṅga', hill: '烟' },
  { zh: '遍充', sa: 'vyāpti', hill: '凡有烟处皆有火' },
  { zh: '宗法性', sa: 'pakṣadharmatā', hill: '烟在山上' },
  { zh: '考察', sa: 'parāmarśa', hill: '"这座山有被火所遍充的烟"' },
  { zh: '推理的结论', sa: 'anumiti', hill: '山上有火' },
];

interface Saved {
  ex: Ex;
  put: Record<string, string | undefined>; // `${ex}:${slot}` -> card id
  checked: Partial<Record<Ex, boolean>>;
  dir: 'sf' | 'fs' | null;
  term: number | null;
}
const INIT: Saved = { ex: 'sound', put: {}, checked: {}, dir: null, term: null };

export default function FiveMember() {
  const [st, save] = useSavedIn<Saved>('IN3', ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const ex = st.ex;
  const cards = CARDS[ex];
  const byId = (id?: string) => cards.find((c) => c.id === id);
  const key = (s: Slot) => `${ex}:${s}`;
  const used = new Set(SLOTS.map((s) => st.put[key(s.k)]).filter(Boolean));
  const full = SLOTS.every((s) => st.put[key(s.k)]);
  const checked = !!st.checked?.[ex];
  const ok = (s: Slot, c?: Card) => !!c && (c.slot === s || c.alt === s);
  const allOk = SLOTS.every((s) => ok(s.k, byId(st.put[key(s.k)])));
  const usedAlt = byId(st.put[key('udaharana')])?.alt === 'udaharana';

  return (
    <section className="md c3 c5" aria-labelledby="fm-title">
      <header className="md-head">
        <p className="md-tag">五支论式 · 遍充</p>
        <h3 id="fm-title" className="md-title">
          把一个推理摆出来：五个支分，和它们背后的规律
        </h3>
        <p className="md-lede">把卡片放进宗、因、喻、合、结五个位置。有几张卡片是故意放进来的错误：方向反了的规律、太宽的理由、只有类比没有规律的喻。核对之后，再看遍充的方向和《思择要集》的术语。</p>
      </header>

      <Band>一 · 组装一个论式</Band>
      <Seg name="fm-ex" label="选择一个例子" value={ex} opts={EX} onPick={(v) => set({ ex: v })} />
      {ex === 'sound' ? (
        <Src src="伐差耶那《正理经疏》1.1.39（宗与因）" lang="sa" orig="anityaḥ śabda iti pratijñā / utpattidharmakatvād iti hetuḥ /" zh={'"声音是无常的"，是宗。"因为它有生起的性质"，是因。'} />
      ) : (
        <Src src="《思择要集》第 44 节" lang="sa" orig="yatra yatra dhūmas tatrāgnir iti sāhacaryaniyamo vyāptiḥ / vyāpyasya parvatādivṛttitvaṃ pakṣadharmatā /" zh={'"凡是有烟的地方都有火"，这种共存的规律，是遍充。被遍充者（烟）存在于山等（对象）之中，是"宗法性"。'} />
      )}
      <div className="ip-slots">
        {SLOTS.map((s) => {
          const v = st.put[key(s.k)];
          const c = byId(v);
          return (
            <div key={s.k} className="ip-slot">
              <p className="ip-slot-k">
                {s.zh}
                <small lang="sa">{s.sa}</small>
              </p>
              <div>
                <select
                  aria-label={`${s.zh}（${s.job}）`}
                  value={v ?? ''}
                  onChange={(e) => set({ put: { ...st.put, [key(s.k)]: e.target.value || undefined }, checked: { ...st.checked, [ex]: false } })}
                >
                  <option value="">（选一张卡片）</option>
                  {ORDER[ex].map((id) => {
                    const card = byId(id)!;
                    return (
                      <option key={id} value={id} disabled={used.has(id) && v !== id}>
                        {card.t}
                      </option>
                    );
                  })}
                </select>
                <p className="md-muted">{s.job}</p>
                {checked && c && (
                  <p aria-live="polite">
                    <span className={'c5-verdict ' + (ok(s.k, c) ? 'c5-verdict--ok' : 'c5-verdict--no')}>{ok(s.k, c) ? (c.alt === s.k ? '可以（异喻）' : '合适') : '不合适'}</span>
                    <Tag b={c.b} />
                    {c.slot && c.slot !== s.k ? `这张卡片属于${SLOTS.find((x) => x.k === c.slot)!.zh}支。` : c.why}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <button type="button" className="md-disclose" disabled={!full} onClick={() => set({ checked: { ...st.checked, [ex]: true } })}>
        {full ? '核对' : '先填满五个位置'}
      </button>
      {checked && (
        <p className="md-feedback" aria-live="polite">
          {allOk
            ? usedAlt
              ? '五个位置都合适。你用的是异喻：注意合支仍是"声音也是这样有生起性质的"，而伐差耶那的异喻版本会把合支改成"声音不是那样没有生起性质的"。'
              : '五个位置都合适。'
            : '有的位置还不合适。没有用上的卡片里，有几张是在任何位置都不合适的。'}{' '}
          {ex === 'sound' ? '这是伐差耶那在 1.1.39 下写出的论式。弥曼差派认为吠陀的言语是永恒的，所以这个例子有真实的对手。' : '这是《思择要集》（十七世纪）的论式，喻支明确地包含一条一般规律。'}
        </p>
      )}
      <p className="md-muted">比较两个例子的喻支：从"有生起性质的锅等是无常的"，到"凡有烟的都有火，例如厨房"。钵罗奢思多波陀的例子（"有运动的东西被看到是实体，例如箭"）介于两者之间，也已经包含一条一般规律。</p>

      <Band>二 · 遍充的方向</Band>
      <p className="md-fb-k">下面哪一条是遍充？</p>
      <Seg
        name="fm-dir"
        label="哪一条是遍充"
        col
        value={st.dir}
        opts={[
          ['sf', '烟所在的每一个地方，火都在（火遍充烟）'],
          ['fs', '火所在的每一个地方，烟都在（烟遍充火）'],
        ]}
        onPick={(v) => set({ dir: v })}
      />
      {st.dir && (
        <div className="c5-row" aria-live="polite">
          <p>
            <span className={'c5-verdict ' + (st.dir === 'sf' ? 'c5-verdict--ok' : 'c5-verdict--no')}>{st.dir === 'sf' ? '对' : '方向反了'}</span>
            火的范围"覆盖"了烟的范围：火是能遍充者（vyāpaka），烟是被遍充者（vyāpya）。有火而没有烟的地方是有的，例如烧红的铁块。<Tag b="course" who="铁块是本课的例子" />
          </p>
          <Claim b="text" who="《思择要集》">我们怎样知道遍充？是通过"多次看见"（bhūyo darśana）。</Claim>
          <p className="md-muted">但看见一百次"有烟就有火"，并不能保证第一百零一次也是这样。第五部分读法称的回答，第七部分读新正理派的回答。</p>
        </div>
      )}

      <Band>三 · 《思择要集》的术语</Band>
      <ul className="ip-chips" aria-label="术语">
        {TERMS.map((t, i) => (
          <li key={t.sa}>
            <button type="button" className={'ip-chip' + (st.term === i ? ' is-on' : '')} aria-pressed={st.term === i} onClick={() => set({ term: st.term === i ? null : i })}>
              {t.zh}
              <small lang="sa">{t.sa}</small>
            </button>
          </li>
        ))}
      </ul>
      {st.term !== null && TERMS[st.term] && (
        <p className="md-feedback" aria-live="polite">
          在"山上有火"中，{TERMS[st.term].zh}是：{TERMS[st.term].hill}
        </p>
      )}

      <Limits>
        <p>卡片和判断都是固定的，取自本章第三部分；这不是一台推理机器。错误卡片中，"因为它是可知的"是《思择要集》自己的例子；"凡有火的都有烟"、"声音像锅一样"和"因为它是可听的（证无常）"是本课为了练习而设的。</p>
        <p>论式不是推理本身，而是推理的语言表达："为自己的推理"发生在心中，"为他人的推理"把它摆出来，让对方检查。</p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
