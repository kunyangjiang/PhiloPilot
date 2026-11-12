import { Band, Claim, Limits, Pick, useSavedIx } from '../jw1/shared';

// 四 · after the table setting 道, dharma and logos side by side
// (content/A4_SAMPLE_DRAFT.md). Three steps, none graded:
// 1. Pick one of the chapter's three terms and one of the passage's readings.
//    The reader first says which rendering reads most naturally to them.
// 2. The rendering is shown with what the sentence then claims and what the
//    argument would have to support — the chapter's "三种理解，三种论证"
//    table (道), its four renderings of MS 1.1.2 (dharma) and its two
//    renderings of B1 (logos).
// 3. What the rendering gains and what it hides, from the same section.
// The passages are the chapter's checked quotations; every rendering, claim,
// gain and loss restates the chapter. Nothing new is quoted.

const ID = 'translation-lens';

type T = 'dao' | 'dharma' | 'logos';
const TERMS: readonly (readonly [T, string])[] = [
  ['dao', '道'],
  ['dharma', 'dharma'],
  ['logos', 'logos'],
];

interface Reading {
  id: string;
  label: string;
  render: string;
  claim: string;
  needs: string;
  gain: string;
  loss: string;
}

const DATA: Record<T, { src: string; text: string; lang: string; readings: Reading[]; principle: string }> = {
  dao: {
    src: '《老子》第一章（王弼本）',
    text: '道可道，非常道',
    lang: 'zh-Hant',
    readings: [
      {
        id: 'onto',
        label: '甲：说出 / 永恒的',
        render: '可以说出的道，不是永恒的、绝对的道。',
        claim: '有一个根本的实在，它超出了语言。',
        needs: '有这样一个实在；语言不能把握它。',
        gain: '这句话进入形而上学和神秘主义的讨论，读者马上感到它在说一个最根本的东西。',
        loss: '"引导"的意思不见了；汉森认为，把道理解为超越的、不可言说的绝对者恰恰是误读。',
      },
      {
        id: 'wangbi',
        label: '乙：说出、指称 / 恒常的',
        render: '凡是可以指称、可以命名的道，都不是恒常的。',
        claim: '凡是可以指称的、有形的东西，都不是恒常的（王弼："指事造形，非其常也"）。',
        needs: '可以指称就意味着有形，有形就意味着变化。',
        gain: '这句话进入语言哲学和本体论，成为魏晋玄学的一个核心问题。',
        loss: '这是王弼的读法，不是经文唯一的意思；河上公把同一句读成治国与养生之道的区分。',
      },
      {
        id: 'guide',
        label: '丙：被遵循、被引导 / 一成不变的',
        render: '任何可以被遵循的引导，都不是一成不变的。',
        claim: '规范和指引会随着处境而改变。',
        needs: '规范和指引会随着处境而改变；下一句"名可名，非常名"支持这种读法（汉森）。',
        gain: '这句话进入伦理学和政治哲学中关于规范能否成文的讨论。',
        loss: '"万物根源"那一层意思淡了；译作 guide 的英文译法同样失去了这一层。',
      },
    ],
    principle: '没有一个译法能同时保留"道路""言说""引导"和"根源"四层意思。负责任的做法是：第一次出现时保留原文，在注释中说明意思的范围，并告诉读者自己的译法采纳了哪一种诠释。',
  },
  dharma: {
    src: '《弥曼差经》1.1.2',
    text: "codanālakṣaṇo 'rtho dharmaḥ",
    lang: 'sa',
    readings: [
      {
        id: 'duty',
        label: '义务',
        render: '义务，是以命令句为标志的有益之事。',
        claim: '一个关于应当做什么的定义：看吠陀有没有命令去做它。',
        needs: '"命令句"（codanā）是认出一件事是否 dharma 的标志。',
        gain: '保留了命令和应当的意思。',
        loss: '读者可能以为这是一种道德义务；而弥曼差派的 dharma 主要是祭祀的行为。',
      },
      {
        id: 'law',
        label: '法律',
        render: '法律，是以命令句为标志的有益之事。',
        claim: '在中文和英文中，"法律"通常意味着一个立法者发布的规则。',
        needs: '吠陀的命令来自某个立法者。',
        gain: '读者马上感到这是一种有约束力的规则。',
        loss: '弥曼差派恰恰主张吠陀没有作者，不是任何人（包括神）制定的。这个译名把该派明确否认的东西放进了它的定义。',
      },
      {
        id: 'religion',
        label: '宗教',
        render: '宗教，是以命令句为标志的有益之事。',
        claim: '这句话像是在讨论信仰。',
        needs: '弥曼差派关心的是内心的信仰。',
        gain: '提示这句话属于一种宗教传统。',
        loss: '弥曼差派关心的是祭祀的行为和吠陀的命令，而不是内心的信仰。',
      },
      {
        id: 'fa',
        label: '法',
        render: '法，是以命令句为标志的有益之事。',
        claim: '保留了一个专门的术语，由注释说明它在这里的意思。',
        needs: '读者知道这是一个专门的术语，并读注释。',
        gain: '沿用了汉译佛典两千年的传统；读者也看得见各派共用一个词。',
        loss: '中文的"法"又有"法律""方法""法则"的意思，同样需要注释；一个译名也可能让人以为佛教的"诸法"和弥曼差派的 dharma 是同一个概念。',
      },
    ],
    principle: '"dharma 是什么意思"没有一个答案；"《弥曼差经》1.1.2 的 dharma 是什么意思"才有答案。区分翻译一个文本和翻译一个概念。',
  },
  logos: {
    src: '赫拉克利特残篇，DK 22 B1（开头）',
    text: 'τοῦ δὲ λόγου τοῦδ᾽ ἐόντος ἀεὶ ἀξύνετοι γίνονται ἄνθρωποι',
    lang: 'grc',
    readings: [
      {
        id: 'word',
        label: '话、说法',
        render: '我的这番说法虽然永远存在，人们却总是不理解它。',
        claim: '一个人对听众的抱怨：我讲了，你们却不懂。',
        needs: 'logos 指赫拉克利特自己正在讲的这番话。',
        gain: '保留了 logos 的日常意思"话语""说法"。',
        loss: 'SEP 的条目倾向于认为，这个 logos 独立于赫拉克利特的教导而存在，他只是一个独立真理的代言人。',
      },
      {
        id: 'reason',
        label: '理性、理',
        render: '这个理虽然永远存在，人们却总是不理解它。',
        claim: '一个关于宇宙结构的形而上学主张：有一个永恒的理，人们不理解它。',
        needs: '有一个支配一切的道理或结构。',
        gain: '读者看到了这番话所揭示的东西。',
        loss: '"话语""言说"的一层不见了；而且"永远"（ἀεί）属于哪一边，亚里士多德已经抱怨很难断句。',
      },
      {
        id: 'dao',
        label: '道（和合本译《约翰福音》1:1 的方式）',
        render: '这个道虽然永远存在，人们却总是不理解它。（仿和合本"太初有道"的译法，本组件的例子）',
        claim: '中文读者立刻联想到《老子》和儒家的"道"。',
        needs: '读者知道这个联系是译者建立的。',
        gain: '中文读者马上感到这是一个最根本的东西。',
        loss: '"言说"一层只剩下微弱的回声；而且翻译在两个传统之间建立了一个历史上并不存在的联系。',
      },
    ],
    principle: '同一个词，不同的译法，会让读者把作者放在不同的论证里。读者需要知道：哪些联系是原文有的，哪些是译者建立的。',
  },
};

interface Saved {
  term: T | null;
  pick: Partial<Record<T, string>>;
  natural: Partial<Record<T, string>>;
}
const INIT: Saved = { term: null, pick: {}, natural: {} };

export default function TranslationLens() {
  const [st, save] = useSavedIx<Saved>('A4', ID, INIT);
  const term = st.term;
  const d = term ? DATA[term] : null;
  const opts = d ? (d.readings.map((r) => [r.id, r.label] as const) as readonly (readonly [string, string])[]) : [];
  const nat = term ? st.natural[term] : undefined;
  const cur = term && d ? d.readings.find((r) => r.id === st.pick[term]) : undefined;

  return (
    <section className="md c3 c5" aria-labelledby="tl-title">
      <header className="md-head">
        <p className="md-tag">翻译透镜 · 同一句话，几种译法</p>
        <h3 id="tl-title" className="md-title">换一个译名，论证会变成什么？</h3>
        <p className="md-lede">
          选一个词，先说哪一种译法你读来最自然——这是你的语感，没有对错。然后逐一换上本章讨论的译法，看这句话主张什么、要论证什么、得到和失去了什么。
        </p>
      </header>

      <Band>一 · 选一个词</Band>
      <Pick label="要看的词" value={term} opts={TERMS} onPick={(v) => save({ ...st, term: v })} />

      {term && d && (
        <div aria-live="polite">
          <div className="lw-grc ip-src">
            <p className="pe-src">{d.src}</p>
            <p lang={d.lang}>{d.text}</p>
          </div>

          <Band>二 · 你读来最自然的是哪一种？</Band>
          <Pick
            label="你读来最自然的译法"
            value={nat}
            opts={opts}
            onPick={(v) => save({ ...st, natural: { ...st.natural, [term]: v }, pick: { ...st.pick, [term]: st.pick[term] ?? v } })}
          />

          {nat && (
            <div aria-live="polite">
              <Band>三 · 逐一换上每一种译法</Band>
              <Pick label="正在看的译法" value={st.pick[term]} opts={opts} onPick={(v) => save({ ...st, pick: { ...st.pick, [term]: v } })} />
              {cur && (
                <ul aria-live="polite">
                  <li>
                    <b>译文：</b>
                    {cur.render}
                  </li>
                  <li>
                    <b>这句话主张什么：</b>
                    {cur.claim}
                  </li>
                  <li>
                    <b>论证要支持什么：</b>
                    {cur.needs}
                  </li>
                  <li>
                    <b>得到了什么：</b>
                    {cur.gain}
                  </li>
                  <li>
                    <b>失去或遮蔽了什么：</b>
                    {cur.loss}
                  </li>
                </ul>
              )}
              {cur && cur.id !== nat && (
                <p className="md-muted">
                  这不是你读来最自然的译法（你选的是"{d.readings.find((r) => r.id === nat)?.label}"）。值得问一问：你的语感来自哪里——你最先读到的译本、你熟悉的传统，还是文本本身？
                </p>
              )}
              <Claim b="course">{d.principle}</Claim>
            </div>
          )}
        </div>
      )}

      <Limits>
        <p>
          <b>三段原文都是本章已经核对过的引文；每一种译法的"主张""要论证的东西""得失"，都复述本章第四部分的讨论（道的三种读法表、dharma 的四种译法、logos 的两种译法和和合本的例子）。</b>
          这个组件不评分，也不替你选出"正确的译法"：本章的结论是，没有一个译法能保留全部的意思，负责任的做法是说明自己的译法采纳了哪一种诠释。汉森的读法依据 SEP"道家"条目，赫拉克利特的部分依据 SEP"赫拉克利特"条目，弥曼差派的部分依据《权威、语言与义务》一课。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
