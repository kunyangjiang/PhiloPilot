import { Limits, Quote, Seg, Tag, useSavedIn, type Basis } from './shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn2/cn2.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import '../cn5/cn5.css';
import './cn7.css';

// 二 · after the table 「三种新名词」. Translation as a philosophical act.
// Seven concepts. For each: the original concept (or the absence of one), the
// historical translation and who made it, the translator's own explanation
// (a checked passage with the chapter's 白话), what the later usage is, how the
// meaning changed, and where the comparison is only approximate. One question
// per concept: either "which word would you choose?" (ungraded: every choice
// shows what it brings in) or a question the chapter answers. Then the
// chapter's three kinds of new terms, as a check.
// All passages and claims come from 二、翻译与新名词 and notes 2, 3, 5.

const ID = 'translation-lab';
type Kind = 'self' | 'japan' | 'old';
const KIND: Record<Kind, string> = {
  self: '严复等人自造的译名',
  japan: '经日本中介的译名',
  old: '旧词获得新义',
};

interface Opt {
  id: string;
  text: string;
  note: string;
}
interface Term {
  id: string;
  tab: string;
  /** The Western concept, or a statement that there is no single one. */
  orig: string;
  origNote?: string;
  hist: string;
  who: string;
  later: string;
  ask: string;
  opts: Opt[];
  /** Present when the chapter answers the question; absent for "which word would you choose?". */
  key?: string;
  quotes: { src: string; orig: string; zh: string }[];
  choice: string;
  choiceBasis: Basis;
  change: string;
  limit: string;
  /** Word checked against the chapter's table of three kinds, and its row(s) there. */
  word: string;
  kinds: Kind[];
  kindNote: string;
}

const TERMS: Term[] = [
  {
    id: 'evolution',
    tab: '天演／进化',
    orig: 'evolution',
    origNote: '赫胥黎 Evolution and Ethics',
    hist: '天演',
    who: '严复《天演论》',
    later: '进化',
    ask: '如果由你来译 evolution，你会选哪个词？',
    opts: [
      { id: 'tianyan', text: '天演', note: '让人想到"天"：变化之中有一个不变的、像天道一样运行的东西。严复正是这样用的：天演是"不变者"，是体。' },
      { id: 'jinhua', text: '进化', note: '让人想到"进步"：变化有方向，越变越好。这是经日本通行的译名（王国维指出日本译作"进化"）。' },
    ],
    quotes: [
      {
        src: '严复《天演论·导言一》',
        orig: '天運變矣，而有不變者行乎其中。不變惟何？是名天演。以天演為體，而其用有二：曰物競，曰天擇。',
        zh: '天道的运行在变化，但其中有不变的东西在运行。这不变的是什么？名叫"天演"。以天演为本体，它的作用有两个：一个叫物竞，一个叫天择。',
      },
    ],
    choice: '严复用宋明理学和中国佛学最常用的"体用"来安排达尔文的生物学：天演是体，物竞和天择是用。这不是赫胥黎原文的结构，而是严复用中国哲学的框架重新安排的结果。',
    choiceBasis: 'text',
    change: '"天演"后来被"进化"取代。"进化"让人想到"进步"，而"进化就是变好"正是章太炎《俱分进化论》要质疑的看法（第四部分：善也进化，恶也进化）。',
    limit: 'evolution 和"进步"不是一回事；但本课没有逐句对照赫胥黎的原文，这里只依据严复的译文和自序。',
    word: '天演',
    kinds: ['self'],
    kindNote: '严复在《译例言》里说"物競、天擇、儲能、效實諸名，皆由我始"。"天演"也是他的译名，后来被"进化"取代。',
  },
  {
    id: 'fittest',
    tab: '物竞天择',
    orig: 'struggle for existence；natural selection；the fittest',
    hist: '物竞、天择；"最宜"',
    who: '严复《天演论》',
    later: '"物竞天择"流传下来',
    ask: '"天擇者，存其最宜者也"里的"最宜"（the fittest），你会怎样理解？',
    opts: [
      { id: 'yi', text: '最适合（它的环境）的', note: '这是严复用"宜"字要说的意思：存留下来的，是最适合的。' },
      { id: 'qiang', text: '最强的', note: '许多读者后来就是这样理解的。本课说这是一个误解："最宜"不等于"最强"。' },
    ],
    quotes: [
      { src: '严复《天演论·导言一》', orig: '物競者，物爭自存也。', zh: '物竞，就是生物争取保存自己。' },
      {
        src: '严复《天演论·自序》',
        orig: '赫胥黎氏此書之恉，本以救斯賓塞任天為治之末流',
        zh: '赫胥黎这本书的主旨，本来是为了纠正斯宾塞"听任自然来治理"这种主张的流弊。',
      },
    ],
    choice: '在导言一的按语里，严复引斯宾塞的话说："天擇者，存其最宜者也。"他又在自序中指出，赫胥黎这本书是为了纠正斯宾塞"任天为治"的流弊。译名之外，严复用按语和序把自己放进了赫胥黎和斯宾塞之间的争论。',
    choiceBasis: 'text',
    change: '本课的一种读法：严复在国际竞争的层面接受了"物竞天择"（中国必须变强才能生存），在国内伦理的层面同情赫胥黎的"与天争胜"。结果《天演论》成了一部号召自强保种的书，这是赫胥黎本人未必会同意的效果。',
    limit: '"两个层面"的读法是本课的重构（注2）。学者们对严复站在哪一边有不同的看法，本课没有阅读史华慈的研究。',
    word: '物竞',
    kinds: ['self'],
    kindNote: '"物竞"是严复自述"皆由我始"的译名之一，后来作为"物竞天择"流传下来。',
  },
  {
    id: 'liberty',
    tab: '自繇／自由',
    orig: 'liberty',
    origNote: '穆勒 On Liberty',
    hist: '自繇',
    who: '严复《群己权界论》（1903）',
    later: '自由',
    ask: '如果由你来译 liberty，你会写"自由"还是"自繇"？',
    opts: [
      { id: 'ziyou', text: '自由', note: '读者一看就懂，但日常语言里的"自由"常常是贬义的：随心所欲、不守规矩。读者可能把穆勒的主张理解为鼓吹放纵。' },
      { id: 'ziyao', text: '自繇', note: '换一个古代相通的字形，让读者意识到这是一个"新"的概念，同时宣称这才是它的"初义"。这是严复的选择。' },
    ],
    quotes: [
      {
        src: '严复《群己权界论·译凡例》',
        orig: '中文自繇，常含放誕、恣睢、無忌憚諸劣義。然此自是後起附屬之詁，與初義無涉。',
        zh: '中文的"自由"，常常含有放荡、任意妄为、无所顾忌之类的坏意思。但这些是后来附加的解释，和本来的意思无关。',
      },
      {
        src: '严复《群己权界论·译凡例》',
        orig: '人得自繇，而必以他人之自繇爲界，此則《大學》絜矩之道',
        zh: '一个人得到自由，但必须以他人的自由为界限，这就是《大学》的絜矩之道。',
      },
    ],
    choice: '书名本身就是一种解释："群己权界"，社会与个人之间权利的界限。严复认为这是穆勒这本书的核心问题。',
    choiceBasis: 'text',
    change: '最终流行的是日本也通用的"自由"。严复把自由"挂"到中国概念上的位置也在移动：1895年他说"恕"和"絜矩"与自由"謂之相似則可，謂之真同則大不可"；1903年却说以他人的自由为界"此則《大學》絜矩之道"。一种读法是：前者讲自由的主体，后者讲自由的界限。',
    limit: '把自由和絜矩相比，是严复自己做的比较；它不是说《大学》里已经有穆勒的自由。',
    word: '自由',
    kinds: ['old'],
    kindNote: '"自由"是一个旧的中文词，获得了新的意义；严复想用"自繇"给它新义，最终流行的却是日本也通用的"自由"。',
  },
  {
    id: 'qun',
    tab: '群／社会',
    orig: 'society；sociology',
    hist: '群；群学',
    who: '严复；梁启超用"群"讲公德',
    later: '社会；社会学',
    ask: '如果由你来译 society，你会选哪个词？',
    opts: [
      { id: 'qun', text: '群', note: '把这个概念和荀子的"群"连在一起。严复借荀子的"群"讲 society，"群学"就是社会学；梁启超讲"公德"是"相善其群"。' },
      { id: 'shehui', text: '社会', note: '一个新的词，切断了和荀子"群"的联系。后来的通行用法是"社会""社会学"。' },
    ],
    quotes: [
      {
        src: '梁启超《新民说·第五节》',
        orig: '道德之本體一而已。但其發表於外，則公私之名立焉。人人獨善其身者，謂之私德；人人相善其群者，謂之公德，二者皆人生所不可缺之具也。',
        zh: '道德的本体只有一个。但它表现在外，就有了公和私的名称。人人各自修养好自身的，叫做私德；人人相互促进群体之善的，叫做公德。两者都是人生不可缺少的。',
      },
    ],
    choice: '梁启超仍然用"群"：公德的定义就是"相善其群"。一个旧词把一个新的道德区分带进了中文。',
    choiceBasis: 'text',
    change: '"群学"后来被"社会学"取代。本课的看法：一个概念用什么词来表达，会影响读者把它和什么联系起来；"社会学"切断了和荀子的联系。',
    limit: '说"群"和荀子相连，是指严复借用了荀子的词；这不是说荀子已经有现代的"社会"概念。',
    word: '群学',
    kinds: ['self'],
    kindNote: '"群学"在表中是严复等人自造的译名，后来被"社会学"取代；"群"本身则是旧词获得新义。',
  },
  {
    id: 'gongde',
    tab: '公德',
    orig: '没有一个确定的西方原词',
    origNote: '梁启超的新区分；"公德"一词很可能经明治日本的伦理讨论而来（注3）',
    hist: '公德／私德',
    who: '梁启超《新民说》（1902年起）',
    later: '公德',
    ask: '"公德"这个概念，有没有一个可以一一对应的西方原词？',
    key: 'none',
    opts: [
      { id: 'one', text: '有，它就是某一个英文词的译名', note: '本课没有这样的证据。梁启超没有说他在翻译哪一个词；"公德"是他用来诊断中国道德的一个新区分。' },
      { id: 'none', text: '没有单一的原词：这是梁启超的新区分，这个词可能经由日本而来', note: '对。不是每一个现代中文哲学词都有一个直接的西方原词。"公德"一词在明治日本的伦理讨论中已经出现，这是学界的通常说法；梁启超"很可能"是在日本读到的。' },
      { id: 'old', text: '没有：中国古书里早就有完全同义的"公德"', note: '本课没有这样的证据。梁启超自己说中国道德"偏於私德，而公德殆闕"，他是把它当作中国缺少的东西提出来的。' },
    ],
    quotes: [
      { src: '梁启超《新民说·第五节》', orig: '我國民所最缺者，公德其一端也。', zh: '我国人民最缺少的，公德是其中的一项。' },
      { src: '梁启超《新民说·第五节》', orig: '吾中國道德之發達，不可謂不早。雖然，偏於私德，而公德殆闕', zh: '我们中国道德的发达，不能说不早。但是，它偏重于私德，而公德几乎是缺失的。' },
    ],
    choice: '梁启超没有翻译一个现成的词，而是提出一个区分：道德的本体只有一个，表现在外才有公私之名。私德"独善其身"，公德"相善其群"。',
    choiceBasis: 'text',
    change: '"公德"成为现代汉语的通行词。它进入中文时带着梁启超的诊断：中国人缺少的是公德。',
    limit: '"公德"来自日本，是学界的通常说法；梁启超读到它的具体途径，本课没有核对日文的原始文献。',
    word: '公德',
    kinds: ['old'],
    kindNote: '本课的表把"公德"放在"旧词获得新义"一类；注3说它很可能也经过日本。三类之间的界限并不总是清楚的。',
  },
  {
    id: 'jingji',
    tab: '经济',
    orig: 'economy（经济上的）',
    hist: '经济',
    who: '梁启超《新民说·第九节》的小注',
    later: '经济',
    ask: '梁启超在"生計上之自由"后面加了小注"即日本所謂經濟上自由"。"经济"这个词是从哪里来的？',
    key: 'both',
    opts: [
      { id: 'yan', text: '严复自造的译名', note: '不对。严复自述"皆由我始"的译名是物竞、天择、储能、效实等，不包括"经济"。' },
      { id: 'both', text: '一个旧的中文词，被日本人用来翻译 economy，再以新义回到中文', note: '对。本课说"经济"同时属于"经日本中介"和"旧词获得新义"两类。' },
      { id: 'sound', text: '直接从英文音译过来的新词', note: '不对。"经济"不是音译；它本来就是一个中文词。' },
    ],
    quotes: [
      {
        src: '梁启超《新民说·第九节》',
        orig: '自由者，奴隸之對待也。綜觀歐美自由發達史，其所爭者不出四端：一曰政治上之自由，二曰宗教上之自由，三曰民族上之自由，四曰生計上之自由。〈即日本所謂經濟上自由〉',
        zh: '自由是奴隶的反面。综观欧美自由发展的历史，人们所争的不外乎四个方面：一是政治上的自由，二是宗教上的自由，三是民族上的自由，四是生计上的自由（就是日本所说的"经济上的自由"）。',
      },
    ],
    choice: '梁启超正文用"生计"，小注才说"日本所谓经济"。他知道这个词的新义来自日本，并且把它当作需要说明的东西。',
    choiceBasis: 'text',
    change: '"经济"本来的意思是"经世济民"。日本人用它译 economy，这个用法回到中文，取代了严复的"计学"和梁启超自己的"生计"；旧义只留在古文里。',
    limit: '本课没有核对日本译名的具体出处，只依据梁启超这条小注；这是一条难得的现场证据，但只是一条。',
    word: '经济',
    kinds: ['japan', 'old'],
    kindNote: '本课明说"经济"同时属于第二类和第三类：这正说明三类之间的界限并不总是清楚的。',
  },
  {
    id: 'induction',
    tab: '内籀／外籀',
    orig: 'induction；deduction',
    hist: '内籀；外籀',
    who: '严复《天演论·自序》',
    later: '归纳；演绎',
    ask: '严复介绍内籀（归纳）和外籀（演绎）时说"是固吾《易》、《春秋》之學也"。他是在说西方逻辑来源于中国吗？',
    key: 'compare',
    opts: [
      { id: 'same', text: '是：西方的这些学问，中国本来就有', note: '如果读到这里就停下来，很容易得出这个结论。但严复紧接着警告读者不要走到这一步。' },
      { id: 'compare', text: '不是：这是一个比较，严复紧接着警告不能把相似当作来源', note: '对。严复给出的标准是：不能用相似来取代事实上的来源。' },
      { id: 'east', text: '是：西方的学问是从东方传过去的', note: '严复明确把这种说法称为"不關事實適用自蔽之說"。' },
    ],
    quotes: [
      { src: '严复《天演论·自序》', orig: '有是哉，是固吾《易》、《春秋》之學也', zh: '确实如此！这本来就是我们《易》和《春秋》的学问啊。' },
      {
        src: '严复《天演论·自序》',
        orig: '必謂彼之所明，皆吾中土所前有，甚者或謂其學皆得於東來，則又不關事實適用自蔽之說也',
        zh: '如果一定要说西方人所阐明的，都是我们中国以前就有的，甚至说他们的学问都是从东方传过去的，那就是一种不顾事实、只会蒙蔽自己的说法了。',
      },
    ],
    choice: '严复的意思是：《春秋》从具体的事件推出普遍的道理，近于归纳；《易》从普遍的原理推出具体的事物，近于演绎。译者需要在传统中找到"挂钩"，让新观念有地方可挂。',
    choiceBasis: 'text',
    change: '"内籀""外籀"被"归纳""演绎"取代。"挂钩"找得太容易，就会让人以为新的东西不过是旧的东西换了名字。',
    limit: '"《春秋》是归纳，《易》是演绎"只是近似的比较，不是说两部经书里有一套逻辑学。',
    word: '内籀',
    kinds: ['self'],
    kindNote: '"内籀""外籀"在表中是严复等人自造的译名，后来被"归纳""演绎"取代。',
  },
];

/** A note without its leading verdict word, for use after a verdict label. */
const bare = (s: string) => s.replace(/^不?对。/, '');

interface Saved {
  t: string;
  pick: Record<string, string | undefined>;
  kinds: Record<string, Kind[] | undefined>;
  checked: Record<string, boolean | undefined>;
}
const INIT: Saved = { t: 'evolution', pick: {}, kinds: {}, checked: {} };

export default function TranslationLab() {
  const [st, save] = useSavedIn<Saved>('CN7', ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const term = TERMS.find((x) => x.id === st.t) ?? TERMS[0];
  const picked = st.pick[term.id];
  const pickedOpt = term.opts.find((o) => o.id === picked);
  const myKinds = st.kinds[term.id] ?? [];
  const checked = !!st.checked[term.id];
  const toggleKind = (k: Kind) => {
    const has = myKinds.includes(k);
    set({ kinds: { ...st.kinds, [term.id]: has ? myKinds.filter((x) => x !== k) : [...myKinds, k] }, checked: { ...st.checked, [term.id]: false } });
  };
  const sameKinds = myKinds.length === term.kinds.length && term.kinds.every((k) => myKinds.includes(k));

  return (
    <section className="md c3 c5" aria-labelledby="tl-title">
      <header className="md-head">
        <p className="md-tag">翻译实验室 · 七个概念</p>
        <h3 id="tl-title" className="md-title">
          一个词的分量：翻译是一种哲学的行动
        </h3>
        <p className="md-lede">选一个概念：先看原词、历史译名和后来的用法，再自己选一个译名或回答一个问题，然后看译者自己怎样说明他的选择、意义后来怎样变化，以及这个比较在哪里只是近似的。</p>
      </header>

      <Seg name="tl-term" label="选择一个概念" value={term.id} opts={TERMS.map((x) => [x.id, x.tab] as const)} onPick={(v) => set({ t: v })} />

      <div className="c7-terms" aria-label="原词、历史译名和后来的用法">
        <div>
          <p className="c7-k">原来的概念</p>
          <p className="c7-v" lang={/[a-z]/.test(term.orig) ? 'en' : undefined}>
            {term.orig}
          </p>
          {term.origNote && <p className="c7-s">{term.origNote}</p>}
        </div>
        <div>
          <p className="c7-k">历史译名</p>
          <p className="c7-v">{term.hist}</p>
          <p className="c7-s">{term.who}</p>
        </div>
        <div>
          <p className="c7-k">后来的通行用法</p>
          <p className="c7-v">{term.later}</p>
        </div>
      </div>

      <p className="md-fb-k">{term.ask}</p>
      <Seg name={`tl-${term.id}-ask`} col label={term.ask} value={picked ?? null} opts={term.opts.map((o) => [o.id, o.text] as const)} onPick={(v) => set({ pick: { ...st.pick, [term.id]: v } })} />

      {pickedOpt ? (
        <div aria-live="polite">
          {term.key ? (
            <p>
              <span className={'c5-verdict ' + (picked === term.key ? 'c5-verdict--ok' : 'c5-verdict--no')}>{picked === term.key ? '和本课的读法一致' : '本课的读法不同'}</span>
              {bare(pickedOpt.note)}
              {picked !== term.key && <> 本课的读法：{bare(term.opts.find((o) => o.id === term.key)!.note)}</>}
            </p>
          ) : (
            <div className="c5-rows">
              {term.opts.map((o) => (
                <div key={o.id} className="c5-row">
                  <p>
                    <b>{o.text}</b>
                    {o.id === picked && <span className="c5-verdict c5-verdict--open"> 你的选择</span>}
                  </p>
                  <p>{o.note}</p>
                </div>
              ))}
              <p className="md-muted">没有对错：每一个译名都会把一些联想带进来，又把另一些挡在外面。</p>
            </div>
          )}

          <div className="c7-layers">
            <div className="c7-layer">
              <p className="c7-layer-h">译者的说明</p>
              {term.quotes.map((q) => (
                <Quote key={q.orig} src={q.src} orig={q.orig} zh={q.zh} />
              ))}
              <p>
                <Tag b={term.choiceBasis} />
                {term.choice}
              </p>
            </div>
            <div className="c7-layer">
              <p className="c7-layer-h">意义的变化</p>
              <p>{term.change}</p>
            </div>
            <div className="c7-layer is-limit">
              <p className="c7-layer-h">这个比较在哪里只是近似的</p>
              <p>{term.limit}</p>
            </div>
          </div>

          <p className="c3-layer-k">本课的"三种新名词"表把「{term.word}」放在哪一类？（可多选）</p>
          <div className="md-seg gr-col" role="group" aria-label={`「${term.word}」属于哪一类`}>
            {(Object.keys(KIND) as Kind[]).map((k) => (
              <label key={k} className={'md-seg-opt' + (myKinds.includes(k) ? ' is-on' : '')}>
                <input type="checkbox" checked={myKinds.includes(k)} onChange={() => toggleKind(k)} />
                <span>{KIND[k]}</span>
              </label>
            ))}
          </div>
          <button type="button" className="md-disclose" disabled={myKinds.length === 0} onClick={() => set({ checked: { ...st.checked, [term.id]: true } })}>
            核对
          </button>
          {checked && (
            <p aria-live="polite">
              <span className={'c5-verdict ' + (sameKinds ? 'c5-verdict--ok' : 'c5-verdict--no')}>{sameKinds ? '和本课的表一致' : `本课的表：${term.kinds.map((k) => KIND[k]).join('；')}`}</span>
              {term.kindNote}
            </p>
          )}
        </div>
      ) : (
        <p className="md-muted">先作一个选择，再看译者的说明。</p>
      )}

      <Limits>
        <p>七个概念都取自本课第二部分的引文和说明。"原来的概念"一栏只写译者所针对的词；"公德"一栏说明，并不是每一个现代中文哲学词都有一个直接的西方原词。</p>
        <p>"三种新名词"是本课的分类，三类之间的界限并不总是清楚的（"经济"同时属于两类）。"哲学"一词一般认为由日本学者西周所造，本课没有核对西周的原始文献，所以没有放进实验室。</p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
