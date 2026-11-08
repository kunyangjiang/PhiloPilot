import { Gu, Limits, Seg, Stages, useSaved } from './shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn2/cn2.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import './cn5.css';

// 三 · after the table comparing 僧肇 with Indian Madhyamaka. Three steps:
// (1) the journey of one word, from Nāgārjuna's verse through Kumārajīva's
// translation to 僧肇 and 智顗, each stop labelled as Indian source,
// translation or Chinese reconstruction; (2) 僧肇's two-part argument, with
// switches for its premises, so the learner sees that "空" is "不真", not
// "不存在"; (3) four Chinese positions on 空 (the chapter's own table) to tell
// apart. Every quotation is a checked passage of the chapter. Nothing is
// scored.

const ID = 'emptiness-explorer';
type School = 'xinwu' | 'jise' | 'benwu' | 'sengzhao';
interface Saved {
  stop: number;
  depends: boolean;
  arises: boolean;
  picks: Record<string, School | undefined>;
}
const INIT: Saved = { stop: 0, depends: true, arises: true, picks: {} };

type Layer = 'in' | 'tr' | 'zh' | 'guess';
const LAYER: Record<Layer, string> = { in: '印度来源', tr: '翻译', zh: '中文的重新建构', guess: '本课的推断' };

interface Stop {
  k: string;
  layer: Layer;
  word: string;
  gloss: string;
  src?: string;
  orig?: string;
  zh?: string;
  body: string;
}
const STOPS: Stop[] = [
  {
    k: '龙树',
    layer: 'in',
    word: 'śūnyatā',
    gloss: '空性：没有独立不变的本质（自性）',
    body: '二世纪前后，龙树《中论》第二十四品的一首偈，把"缘起""空""假名""中道"四个概念等同起来：说一个东西"空"，不是说它不存在，而是说它依赖条件而存在，没有自性。本课只转述大意；这首偈在印度中观学中的意思，见《大乘哲学：中观与瑜伽行派》。',
  },
  {
    k: '罗什译偈',
    layer: 'tr',
    word: '無',
    gloss: '偈颂里的译字',
    src: '鸠摩罗什译《中论·观四谛品》',
    orig: '眾因緣生法　　我說即是無　亦為是假名　　亦是中道義',
    body: '409年前后的译本。偈颂受五言句式的限制，这里用了"無"字。对熟悉玄学的读者来说，"無"是一个已经有很重分量的词。',
  },
  {
    k: '青目释',
    layer: 'tr',
    word: '空',
    gloss: '同一译本注释里的译字',
    src: '鸠摩罗什译《中论·观四谛品》青目释',
    orig: '是物屬眾因緣故無自性。無自性故空。空亦復空。',
    zh: '这个事物从属于众多因缘，所以没有自性。没有自性，所以是空。"空"本身也是空的。',
    body: '同一个梵语词，在同一部译本中，偈颂里是"無"，注释里是"空"。注释说的是"没有自性"，不是"不存在"。',
  },
  {
    k: '玄学读者',
    layer: 'guess',
    word: '無',
    gloss: '王弼"以無為本"的"无"',
    body: '一个熟悉玄学的读者读到"我說即是無"，很容易把它理解成"因缘所生的东西其实是无"，或者"事物的根本是无"。这是本课对当时读者可能怎样理解的推断，不是有记载的事件。',
  },
  {
    k: '本无宗',
    layer: 'zh',
    word: '本無',
    gloss: '"万物的根本是无"',
    src: '僧肇《不真空论》',
    orig: '此直好無之談，豈謂順通事實，即物之情哉？',
    zh: '这只是偏好"无"的说法，哪里是顺通事实、切合事物的真实情况呢？',
    body: '四世纪的"本无宗"主张万物的本性是"无"。僧肇批评它把"不是真有"误解成了"什么都没有"：空得过了头，变成了"无"。',
  },
  {
    k: '僧肇',
    layer: 'zh',
    word: '不真',
    gloss: '不是真有，也不是真无',
    src: '僧肇《不真空论》',
    orig: '《中觀》云：「物從因緣故不有，緣起故不無。」',
    zh: '《中论》说："事物因为依赖因缘，所以不是有；因为缘起，所以不是无。"',
    body: '僧肇用"真有""真无"来说中观学的"自性"，同时否定两边。注意：他所引的这句话，在罗什译的《中论》中找不到逐字相同的句子，是他的概括或转述。',
  },
  {
    k: '智顗',
    layer: 'zh',
    word: '空 · 假 · 中',
    gloss: '一首偈，三个"谛"',
    src: '《摩诃止观》卷一',
    orig: '因緣所生法。我說即是空。亦為是假名。亦是中道義',
    body: '六世纪，智顗引这首偈时写作"我說即是空"，并从中读出空、假、中三谛：三者同时成立、互相包含。这是印度中观学者没有提出过的读法（见第四部分）。',
  },
];

const SCHOOLS: [School, string][] = [
  ['xinwu', '心无'],
  ['jise', '即色'],
  ['benwu', '本无'],
  ['sengzhao', '僧肇'],
];
const CLAIMS: { id: string; text: string; who: School; why: string }[] = [
  { id: 'c1', text: '空的是心：心对万物不起执着；万物本身仍然存在。', who: 'xinwu', why: '心无派。僧肇说它"得在於神靜，失在於物虛"：只空了心，没有看到事物本身也没有自性。' },
  { id: 'c2', text: '色不是自己成为色的，所以色即是空。', who: 'jise', why: '即色派。僧肇认为它只说了色依赖条件，"未領色之非色"：还没有说清色本身就不是实有。' },
  { id: 'c3', text: '"非有""非无"最后都归结为"无"：万物的根本是无。', who: 'benwu', why: '本无派。僧肇说这是"好無之談"：把"不是真有"误解成"什么都没有"。' },
  { id: 'c4', text: '万物待缘而有，所以不是真有；万物确实生起，所以不是真无。', who: 'sengzhao', why: '僧肇自己的立场："不真空"：万物"空"，是因为它们"不真"，而不是因为它们不存在。' },
];

export default function EmptinessExplorer() {
  const [st, save] = useSaved<Saved>(ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const i = Math.max(0, Math.min(STOPS.length - 1, st.stop));
  const s = STOPS[i];

  return (
    <section className="md c3 c5" aria-labelledby="ee-title">
      <header className="md-head">
        <p className="md-tag">概念追踪 · 论证重构</p>
        <h3 id="ee-title" className="md-title">
          空不是虚无：从一首偈到"不真空"
        </h3>
        <p className="md-lede">
          先跟着一个词走一遍：它从龙树的偈出发，经过翻译、误读和批评，到僧肇和智顗那里被重新建构。然后检验僧肇的论证，看"空"为什么不等于"无"。最后分辨四种说"空"的方式。
        </p>
      </header>

      <p className="c3-layer-k">第一步　一个词的旅行</p>
      <Stages labels={STOPS.map((x) => x.k)} cur={i} onPick={(n) => set({ stop: n })} label="这个词经过的七站" />
      <div className="g4-panel" aria-live="polite">
        <div>
          <span className={`c5-layer c5-layer--${s.layer}`}>{LAYER[s.layer]}</span>
          <span className="md-muted">
            第 {i + 1} 站，共 {STOPS.length} 站
          </span>
        </div>
        <p className="c5-word">
          <b lang={s.word === 'śūnyatā' ? 'sa-Latn' : 'zh-Hant'}>{s.word}</b>
          <span>{s.gloss}</span>
        </p>
        {s.orig && <Gu src={s.src!} orig={s.orig} zh={s.zh} />}
        <p>{s.body}</p>
      </div>

      <p className="c3-layer-k">第二步　僧肇的论证：去掉一个前提试试</p>
      <p>僧肇的论证分两半。下面每一半都有一个关于万物的前提。把前提关掉，看结论还成不成立。</p>
      <div>
        <label className="c5-toggle">
          <input type="checkbox" checked={st.depends} onChange={() => set({ depends: !st.depends })} />
          <span>万物都依赖因缘才存在</span>
        </label>
        <label className="c5-toggle">
          <input type="checkbox" checked={st.arises} onChange={() => set({ arises: !st.arises })} />
          <span>万物确实在生起、在变化</span>
        </label>
      </div>
      <div className="c3-two">
        <div className="c2-card">
          <p className="g4-k">（甲）万物不是"真有"</p>
          <ol className="c5-steps">
            <li className="c5-step">
              <span className="c5-mark">1</span>
              <span>如果一个东西是"真有"，它就是自己存在的，不依赖其他条件。</span>
            </li>
            <li className={'c5-step' + (st.depends ? '' : ' is-off')}>
              <span className="c5-mark">2</span>
              <span>{st.depends ? '万物都依赖因缘才存在。' : '（这个前提已经关掉）'}</span>
            </li>
            <li className={'c5-step is-concl' + (st.depends ? '' : ' is-fail')}>
              <span className="c5-mark">{st.depends ? '∴' : '✗'}</span>
              <span>{st.depends ? '所以，万物不是"真有"。' : '推不出"万物不是真有"：也许有些东西是自足的。'}</span>
            </li>
          </ol>
        </div>
        <div className="c2-card">
          <p className="g4-k">（乙）万物不是"真无"</p>
          <ol className="c5-steps">
            <li className="c5-step">
              <span className="c5-mark">1</span>
              <span>如果一个东西是"真无"，它就不会生起、不会有任何表现（"湛然不動"）。</span>
            </li>
            <li className={'c5-step' + (st.arises ? '' : ' is-off')}>
              <span className="c5-mark">2</span>
              <span>{st.arises ? '万物确实在生起、在变化。' : '（这个前提已经关掉）'}</span>
            </li>
            <li className={'c5-step is-concl' + (st.arises ? '' : ' is-fail')}>
              <span className="c5-mark">{st.arises ? '∴' : '✗'}</span>
              <span>{st.arises ? '所以，万物不是"真无"。' : '推不出"万物不是真无"：这时"空"就可能滑向"无"。'}</span>
            </li>
          </ol>
        </div>
      </div>
      <div className="md-feedback" aria-live="polite">
        <p className="md-fb-k">
          {st.depends && st.arises ? '两半都成立：万物"不真"，但不是"不存在"。' : !st.arises ? '少了"万物确实生起"，剩下的只是"万物不是真有"。' : '少了"万物依赖因缘"，剩下的只是"万物不是真无"。'}
        </p>
        <p>
          {st.depends && st.arises
            ? '这就是"不真空"：万物"空"，是因为它们"不真"，而不是因为它们不存在。关键在"真"字：僧肇否定的"有"是自足的、不依赖他物的"真有"，否定的"无"是彻底的不存在。'
            : !st.arises
              ? '只说"不是真有"，而不说"不是真无"，正是僧肇批评本无宗的地方：把"不是真有"读成了"什么都没有"。'
              : '只说"不是真无"，而不说"不是真有"，就回到了常识的实在论：事物有自己固定的本质。僧肇的两半论证缺一不可。'}
        </p>
        <Gu
          src="僧肇《不真空论》"
          orig="非無幻化人，幻化人非真人也。"
          zh="不是没有幻化的人，只是幻化的人不是真人。"
        />
        <p className="md-muted">幻化人的比喻只说明"显现而不真实"这一点；它不是说有一个制造幻象的魔术师。</p>
      </div>

      <p className="c3-layer-k">第三步　四种说"空"的方式</p>
      <p>下面四句话，各是哪一家的说法？（第三部分的表格）</p>
      <div className="c5-rows">
        {CLAIMS.map((c) => {
          const pick = st.picks[c.id];
          return (
            <div key={c.id} className="c5-row">
              <p>{c.text}</p>
              <Seg name={`ee-${c.id}`} label={`"${c.text}"是哪一家的说法`} value={pick ?? null} opts={SCHOOLS} onPick={(v) => set({ picks: { ...st.picks, [c.id]: v } })} />
              {pick && (
                <p aria-live="polite">
                  <span className={'c5-verdict ' + (pick === c.who ? 'c5-verdict--ok' : 'c5-verdict--no')}>{pick === c.who ? '对' : `是${SCHOOLS.find((x) => x[0] === c.who)![1]}`}</span>
                  {c.why}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <Limits>
        <p>"空"不等于"无"：本课的整条路线正是要说明这一点。但这个演示只覆盖了僧肇的一篇文章；印度中观学自己的论证（"四句"等归谬）、"二谛"的种种解释，见《大乘哲学：中观与瑜伽行派》，本课没有讨论。</p>
        <p>僧肇不等于龙树：他的语言来自玄学和《庄子》，论证和修辞交织，《物不迁论》的"性住"还引起了是否偏离中观的争论。这里的"翻译""中文的重新建构"等标签，是本课为了追踪概念而作的区分。</p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
