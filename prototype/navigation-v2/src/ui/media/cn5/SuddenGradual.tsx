import { Gu, Limits, Seg, useSaved } from './shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn2/cn2.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import './cn5.css';

// 六 · after the paragraph on 竺道生. Three parts:
// 1. The verses side by side (敦煌本 神秀, 敦煌本 惠能 ×2, 宗宝本 惠能), with
//    differing lines marked, and what each difference changes.
// 2. A workshop: for each documented text, what does it say 顿/渐 is? The
//    choices are not "顿 vs 渐" but five different claims the chapter
//    separates (two opposed schools; one 法, people differ; truth is
//    indivisible; a later sectarian classification; how the text was formed).
//    Some texts fit two; the feedback says why.
// 3. A timeline of the layers, so that "南顿北渐" can be seen to arrive late.
// Every classical line is the chapter's own checked passage.

const ID = 'sudden-gradual';
type Pair = 'hn1-zb' | 'sx-hn2' | 'sx-hn1';
type Pos = 'a' | 'b' | 'c' | 'd' | 'e';
interface Saved {
  pair: Pair;
  picks: Record<string, Pos | undefined>;
  when: number | null;
}
const INIT: Saved = { pair: 'hn1-zb', picks: {}, when: null };

const VERSE = {
  sx: { k: '神秀偈 · 敦煌本', lines: ['身是菩提樹', '心如明鏡臺', '時時勤拂拭', '莫使有塵埃'] },
  hn1: { k: '惠能偈（第一首）· 敦煌本', lines: ['菩提本無樹', '明鏡亦無臺', '佛性常清淨', '何處有塵埃'] },
  hn2: { k: '惠能偈（第二首）· 敦煌本', lines: ['心是菩提樹', '身為明鏡臺', '明鏡本清淨', '何處染塵埃'] },
  zb: { k: '惠能偈 · 宗宝本', lines: ['菩提本無樹', '明鏡亦非台', '本來無一物', '何處惹塵埃'] },
} as const;
const PAIRS: Record<Pair, { a: keyof typeof VERSE; b: keyof typeof VERSE; label: string; say: string }> = {
  'hn1-zb': {
    a: 'hn1',
    b: 'zb',
    label: '惠能偈：敦煌本和宗宝本',
    say: '最要紧的是第三句。"佛性常清淨"肯定有一个本来清净的佛性，所以不需要拂拭；"本來無一物"连这样一个东西也不肯定。前者接近如来藏、佛性的思想，后者更接近般若"空"的思想。一般认为宗宝本的改动是后来的。',
  },
  'sx-hn2': {
    a: 'sx',
    b: 'hn2',
    label: '神秀偈和惠能第二首',
    say: '第二首几乎是把神秀的偈颠倒了一下（身、心互换），然后说"明鏡本清淨"。两首的差别不在于有没有镜子，而在于镜子需不需要擦。',
  },
  'sx-hn1': {
    a: 'sx',
    b: 'hn1',
    label: '神秀偈和惠能第一首',
    say: '惠能一系的看法是：神秀偈的问题不在于"慢"，而在于预设尘埃是真实的，有一个擦的人和一个被擦的对象。擦镜子本身可以一下擦干净，也可以慢慢擦：这个比喻并不天然是"渐"。',
  },
};

const POS: Record<Pos, string> = {
  a: '顿和渐是两个对立的宗派',
  b: '法只有一种，顿渐在于人',
  c: '真理不可分割，只能一下子全部领悟',
  d: '后来者给宗派归类、贴标签',
  e: '说的是文本怎样形成',
};

interface Card {
  id: string;
  who: string;
  src: string;
  orig?: string;
  zh?: string;
  desc?: string;
  best: Pos;
  also?: Pos;
  why: string;
  t: number; // index in TIME
}
const CARDS: Card[] = [
  {
    id: 'daosheng',
    who: '竺道生（？—434）',
    src: '《高僧传·竺道生传》',
    orig: '夫象以盡意，得意則象忘；言以詮理，入理則言息。',
    zh: '形象是用来完全表达意义的，得到了意义，形象就可以忘掉；言语是用来解释道理的，进入了道理，言语就可以止息。',
    desc: '于是提出"頓悟成佛"。',
    best: 'c',
    why: '本课的读法：道生的"顿悟"主要是说真理不可分割，所以只能一下子全部领悟。它和后来禅宗的"顿悟"是不是同一个意思，学者看法不同。',
    t: 0,
  },
  {
    id: 'shenhui',
    who: '神会',
    src: '滑台大会（八世纪三十年代初），本课转述',
    desc: '公开攻击神秀一系，称之为"北宗"，说他们教"渐"；只有惠能一系是达摩正统，教"顿"。',
    best: 'a',
    also: 'd',
    why: '这是把顿渐说成两个对立阵营的源头。同时，"北宗"这个名称本身就是神会贴的标签，神秀一系并不这样自称；根据敦煌文献，神秀一系也讲"顿"。',
    t: 1,
  },
  {
    id: 'tanjing1',
    who: '敦煌本《坛经》',
    src: '敦煌本《坛经》',
    orig: '法無頓漸，人有利鈍。迷即漸勸，悟人頓修。',
    zh: '法本身没有顿和渐的分别，人却有聪明和迟钝的分别。',
    best: 'b',
    why: '在敦煌本编者看来，顿渐不是两种教法，而是同一种教法被不同的人以不同的速度领悟。这和神会尖锐的对立很不一样。',
    t: 3,
  },
  {
    id: 'tanjing2',
    who: '敦煌本《坛经》（讲南北两宗）',
    src: '敦煌本《坛经》',
    orig: '法即一宗，人有南北，因此便立南北。何以漸頓？法即一種，見有遲疾，見遲即漸，見疾即頓。',
    zh: '法是同一个宗旨，人住在南北，因此立了南北之名；法是同一种，领悟有快有慢。',
    best: 'b',
    also: 'd',
    why: '"南北"只是地理的，"顿渐"只是领悟的快慢。这段话也在回应已经流行的南北之分，所以它同时记录了宗派标签的存在。',
    t: 3,
  },
  {
    id: 'zongmi',
    who: '宗密（780—841）',
    src: '宗密《禅源诸诠集都序》卷上之二',
    orig: '初息妄修心宗者。……如鏡昏塵。須勤勤拂拭。塵盡明現即無所不照。',
    zh: '第一，"息妄修心宗"……就像镜子被灰尘遮暗，必须勤勤擦拭，灰尘擦尽，光明显现，就无所不照。',
    best: 'd',
    why: '宗密把"擦镜子"作为一个宗派的特征，并把神秀一系归入这一宗。"拂拭 = 渐修 = 北宗"的联想，很大程度上是这种后来整理的结果。宗密是神会一系的后人。',
    t: 2,
  },
  {
    id: 'zongbao',
    who: '宗宝（1291）',
    src: '宗宝本《六祖坛经》跋',
    orig: '續見三本不同、互有得失。其板亦已漫滅。因取其本校讎。訛者正之、略者詳之、復增入弟子請益機緣。',
    zh: '又看到三个本子，各不相同……错的改正，简略的加详，又增加了弟子请教的机缘问答。',
    best: 'e',
    why: '宗宝自己说明，通行本是根据几个不同的本子"改正""加详""增入"而成。我们最熟悉的"本來無一物"就出自这个本子，在敦煌本中找不到。',
    t: 4,
  },
];

const TIME = [
  { y: '五世纪初', t: '竺道生提出"顿悟成佛"' },
  { y: '八世纪三十年代初', t: '神会在滑台攻击"北宗"，提出"南顿北渐"' },
  { y: '780—841', t: '宗密把禅宗分为三宗，以"拂拭"为第一宗的特征' },
  { y: '约九世纪中叶', t: '现存敦煌本《坛经》抄写；它经过长时间增补，很可能在神会以后的争论中形成' },
  { y: '1291', t: '宗宝编定通行本，"本來無一物"出现' },
];

function Verse({ k, other }: { k: keyof typeof VERSE; other: keyof typeof VERSE }) {
  const v = VERSE[k];
  const o = VERSE[other];
  return (
    <p className="c5-verse" lang="zh-Hant">
      <span className="c5-verse-k">{v.k}</span>
      {v.lines.map((l, i) => (
        <span key={i} className={l !== o.lines[i] ? 'is-diff' : undefined}>
          {l}
          {l !== o.lines[i] && <span className="visually-hidden">（与另一首不同）</span>}
        </span>
      ))}
    </p>
  );
}

export default function SuddenGradual() {
  const [st, save] = useSaved<Saved>(ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const pr = PAIRS[st.pair] ?? PAIRS['hn1-zb'];
  const done = CARDS.filter((c) => st.picks[c.id]).length;

  return (
    <section className="md c3 c5" aria-labelledby="sg-title">
      <header className="md-head">
        <p className="md-tag">文本比较 · 不是二选一</p>
        <h3 id="sg-title" className="md-title">
          顿与渐：几个文本，几种不同的说法
        </h3>
        <p className="md-lede">
          "南顿北渐"听起来像两个阵营。先对照几首偈的不同版本；再逐一看有记载的文本，判断每一个说的"顿/渐"到底是什么意思；最后把它们放回时间线。
        </p>
      </header>

      <p className="c3-layer-k">一、对照两首偈</p>
      <Seg
        name="sg-pair"
        label="选择要对照的两首"
        value={st.pair}
        opts={(Object.keys(PAIRS) as Pair[]).map((k) => [k, PAIRS[k].label] as const)}
        onPick={(v) => set({ pair: v })}
      />
      <div className="c5-versions">
        <Verse k={pr.a} other={pr.b} />
        <Verse k={pr.b} other={pr.a} />
      </div>
      <p className="md-muted">底色标出的句子，两首不同。</p>
      <div className="md-feedback" aria-live="polite">
        <p>{pr.say}</p>
      </div>

      <p className="c3-layer-k">二、这个文本说的"顿/渐"是什么？</p>
      <p className="md-muted">
        已判断 {done} / {CARDS.length}。五个选项不是"顿"和"渐"两边，而是本课区分的五种不同的说法；有的文本可以放进两类。
      </p>
      <div className="c5-rows">
        {CARDS.map((c) => {
          const v = st.picks[c.id];
          const ok = v === c.best;
          const half = v !== undefined && v === c.also;
          return (
            <div key={c.id} className="c5-row">
              <p>
                <b>{c.who}</b>
              </p>
              {c.orig ? <Gu src={c.src} orig={c.orig} zh={c.zh} /> : <p className="pe-src">{c.src}</p>}
              {c.desc && <p>{c.desc}</p>}
              <Seg
                name={`sg-${c.id}`}
                label={`${c.who}说的顿渐是什么`}
                col
                value={v ?? null}
                opts={(Object.keys(POS) as Pos[]).map((k) => [k, POS[k]] as const)}
                onPick={(x) => set({ picks: { ...st.picks, [c.id]: x } })}
              />
              {v && (
                <p aria-live="polite">
                  <span className={'c5-verdict ' + (ok ? 'c5-verdict--ok' : half ? 'c5-verdict--open' : 'c5-verdict--no')}>
                    {ok ? '和本课的读法一致' : half ? '也说得通' : '本课的读法不同'}
                  </span>
                  {!ok && <>本课放在"{POS[c.best]}"{c.also && !half ? `，也可以放在"${POS[c.also]}"` : ''}。</>}
                  {c.why}
                </p>
              )}
            </div>
          );
        })}
      </div>
      {done === CARDS.length && (
        <div className="md-feedback">
          <p className="md-fb-k">合起来看</p>
          <p>六个文本落在五类里，而且只有一个文本是把顿渐当作两个对立阵营的。"禅宗分为顿悟的南宗和渐修的北宗"这个说法至少要作三点修正："北宗"是神会贴的标签，神秀一系也讲"顿"；《坛经》本身说"法無頓漸"；把神秀的偈和"渐修"牢牢联系起来，是宗密等后来者的整理。</p>
        </div>
      )}

      <p className="c3-layer-k">三、放回时间线</p>
      <ol className="c5-time">
        {TIME.map((x, i) => (
          <li key={i} className={st.when === i ? 'is-on' : undefined}>
            <button type="button" className="md-disclose" aria-pressed={st.when === i} onClick={() => set({ when: st.when === i ? null : i })}>
              <span className="c5-time-y">{x.y}</span>
              {x.t}
            </button>
            {st.when === i && (
              <p className="md-muted">
                这一层的文本：{CARDS.filter((c) => c.t === i).map((c) => c.who).join('、') || '（本课没有单独引用）'}
              </p>
            )}
          </li>
        ))}
      </ol>
      <p className="md-muted">注意：抄写于九世纪中叶的敦煌本，比宗密晚；但它包含的内容，有一些可能更早。时间线排的是证据的层次，不是思想的先后。</p>

      <Limits>
        <p>五个选项是本课为了区分不同说法而作的整理，不是禅宗自己的分类。神会的立场这里是转述，没有引他本人的文字。</p>
        <p>"顿/渐"的争论还牵涉修行方法、师承和政治支持，这里只看文本说了什么。道生的"顿悟"和禅宗的"顿悟"是否同义，学者没有定论。</p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
