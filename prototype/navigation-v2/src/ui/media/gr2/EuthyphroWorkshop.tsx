import { useState, type KeyboardEvent } from 'react';
import { getMedia, setMedia } from '../../../state/store';
import '../gr1/gr1.css';
import './gr2.css';

// 一 · after the chapter's reading of the Euthyphro, where the dialogue ends.
// The learner walks the inquiry: example versus definition, the proposed
// definition and its counterexample, the dilemma, the direction of
// explanation, and what remains unresolved; then sorts what belongs to the
// dialogue and what to the later "Euthyphro dilemma". Every Greek line is one
// the chapter quotes and has checked against Burnet's text (Perseus); every
// Chinese line is the chapter's translation or paraphrase
// (content/GR2_SAMPLE_DRAFT.md, 一). Choices are never marked right or wrong,
// except in the last stage, which asks only where a claim comes from. Nothing
// is scored, and no religious position is judged.

type CId = 'p1' | 'p2' | 'p3';
const COMMIT: Record<CId, { t: string; ref: string; who: string; n: string }> = {
  p3: { n: '③', t: '虔敬的 ＝ 所有的神都喜爱的', ref: '9e', who: '游叙弗伦修正后的定义' },
  p1: { n: '①', t: '虔敬的东西被神喜爱，是因为它是虔敬的', ref: '10d', who: '游叙弗伦同意' },
  p2: { n: '②', t: '神所喜爱的东西之所以"是神所喜爱的"，是因为神喜爱它', ref: '10a—c，10e', who: '游叙弗伦同意' },
};
const CONFLICT: CId[] = ['p1', 'p2', 'p3'];

interface Grc {
  ref: string;
  text: string;
  zh: string;
}
interface Choice {
  q: string;
  opts: { id: string; t: string; fb: string }[];
}
interface Sort {
  legend: string;
  labels: [string, string][];
  items: { id: string; t: string; ref: string; ans: string; fb: string }[];
}
interface Stage {
  k: string;
  ref: string;
  who: string;
  zh: string;
  grc?: Grc[];
  adds?: CId[];
  sort?: Sort;
  choice?: Choice;
  after: string;
}

const STAGES: Stage[] = [
  {
    k: '例子还是定义',
    ref: '5d—6a',
    who: '游叙弗伦',
    zh: '虔敬就是我现在做的事：起诉行不义的人，无论他犯的是杀人、盗窃神庙财物，还是其他这一类的罪。宙斯不是也捆绑了自己的父亲克洛诺斯吗？',
    grc: [
      {
        ref: '5d—e',
        text: 'τὸ μὲν ὅσιόν ἐστιν ὅπερ ἐγὼ νῦν ποιῶ, τῷ ἀδικοῦντι ἢ περὶ φόνους ἢ περὶ ἱερῶν κλοπὰς ἤ τι ἄλλο τῶν τοιούτων ἐξαμαρτάνοντι ἐπεξιέναι',
        zh: '虔敬就是我现在做的事：起诉行不义的人，无论他犯的是杀人、盗窃神庙财物，还是其他这一类的罪。',
      },
    ],
    sort: {
      legend: '下面三个回答，哪个只是例子（或例子加上清单、先例），哪个是一个普遍的说法？',
      labels: [
        ['ex', '例子'],
        ['gen', '普遍的说法'],
      ],
      items: [
        { id: 'now', t: '"虔敬就是我现在做的事"，再加上杀人、盗窃神庙财物等几类罪', ref: '5d—e', ans: 'ex', fb: '这是一个例子加上一张简短的清单。它告诉我们哪些事算虔敬，却没有说出它们为什么都算。' },
        { id: 'zeus', t: '"宙斯也捆绑了自己的父亲"', ref: '6a', ans: 'ex', fb: '这是一个神话中的先例，用来支持游叙弗伦自己的例子。它本身也是一个例子，而且苏格拉底说，正是这类故事他很难接受。' },
        { id: 'loved', t: '"神所喜爱的就是虔敬的，神不喜爱的就是不虔敬的"', ref: '6e—7a', ans: 'gen', fb: '这是游叙弗伦的第二个回答。苏格拉底称赞它是一个普遍的说法，正是他要的那种回答；至于对不对，还要检验（7a）。' },
      ],
    },
    after: '苏格拉底没有说例子是假的。他说，他要的不是许多虔敬的事情中的一两件，而是使它们都成为虔敬的那个东西。',
  },
  {
    k: '苏格拉底的要求',
    ref: '5d、6d—e',
    who: '苏格拉底',
    zh: '我要你做的，不是在许多虔敬的事情中教我一两件，而是那个特征本身：一切虔敬的事情，正是凭着它才是虔敬的。好让我注视着它、把它当作范本来用。',
    grc: [
      {
        ref: '6d',
        text: 'μέμνησαι οὖν ὅτι οὐ τοῦτό σοι διεκελευόμην, ἕν τι ἢ δύο με διδάξαι τῶν πολλῶν ὁσίων, ἀλλʼ ἐκεῖνο αὐτὸ τὸ εἶδος ᾧ πάντα τὰ ὅσια ὅσιά ἐστιν;',
        zh: '你记得吗？我要你做的，不是在许多虔敬的事情中教我一两件，而是那个特征（εἶδος）本身：一切虔敬的事情，正是凭着它才是虔敬的。',
      },
      {
        ref: '6e',
        text: 'ταύτην τοίνυν με αὐτὴν δίδαξον τὴν ἰδέαν τίς ποτέ ἐστιν, ἵνα εἰς ἐκείνην ἀποβλέπων καὶ χρώμενος αὐτῇ παραδείγματι, ὃ μὲν ἂν τοιοῦτον ᾖ ὧν ἂν ἢ σὺ ἢ ἄλλος τις πράττῃ φῶ ὅσιον εἶναι, ὃ δʼ ἂν μὴ τοιοῦτον, μὴ φῶ.',
        zh: '那就请你教我，这个特征本身究竟是什么，好让我注视着它、把它当作范本（παράδειγμα）来用：你或别人做的事情中，凡是像它的，我就说是虔敬的；凡是不像它的，我就说不是。',
      },
    ],
    choice: {
      q: '游叙弗伦和家里人争的，正是"告父亲这件事是否虔敬"。为什么"虔敬就是我现在做的事"解决不了这场争论？',
      opts: [
        { id: 'a', t: '它把有争议的事情本身当作了标准', fb: '这是本章对 6e "把它当作范本"的读法：一个好的回答应当能拿来判断有争议的事（判别性）。用争议中的一方当作标准，等于没有回答。' },
        { id: 'b', t: '因为游叙弗伦在宗教问题上没有权威', fb: '苏格拉底并没有从游叙弗伦的身份出发反驳他。即使一个真正的权威这样回答，问题也还在：例子没有说出虔敬的事情共有的、使它们成为虔敬的东西。' },
        { id: 'c', t: '因为不知道定义，就根本认不出任何虔敬的例子', fb: '这是一种更强的说法，吉奇称之为"苏格拉底谬误"。苏格拉底是否作了这种假定，学者看法不同；正文提到，也可以只把他的要求理解为：在有争议的情形下需要一个标准。' },
      ],
    },
    after: '本章把这两段话整理成三个要求：同一性（共有的东西）、解释性（凭着它才是虔敬的）、判别性（可以当作范本）。这是本章的整理，不是对话原话。',
  },
  {
    k: '定义与反例',
    ref: '6e—9e',
    who: '游叙弗伦与苏格拉底',
    zh: '神所喜爱的就是虔敬的。苏格拉底：可是你相信诸神之间常有争执，而争执的正是正义与不正义、美与丑、好与坏。那么同一件事就可能被一些神喜爱、被另一些神憎恨，于是它既虔敬又不虔敬。',
    grc: [
      { ref: '6e—7a', text: 'ἔστι τοίνυν τὸ μὲν τοῖς θεοῖς προσφιλὲς ὅσιον, τὸ δὲ μὴ προσφιλὲς ἀνόσιον.', zh: '那么，神所喜爱的就是虔敬的，神不喜爱的就是不虔敬的。' },
      { ref: '9e', text: 'ἀλλʼ ἔγωγε φαίην ἂν τοῦτο εἶναι τὸ ὅσιον ὃ ἂν πάντες οἱ θεοὶ φιλῶσιν, καὶ τὸ ἐναντίον, ὃ ἂν πάντες θεοὶ μισῶσιν, ἀνόσιον.', zh: '那我会说，虔敬就是所有的神都喜爱的东西；相反，所有的神都憎恨的，就是不虔敬的。' },
    ],
    choice: {
      q: '如果你是游叙弗伦，你会怎样修改定义？',
      opts: [
        {
          id: 'all',
          t: '改成"所有的神都喜爱的"',
          fb: '这正是游叙弗伦在 9e 的做法："那我会说，虔敬就是所有的神都喜爱的东西。"反例被避开了，下一步要检验的就是这个修正后的定义。',
        },
        { id: 'deny', t: '否认诸神之间会争执', fb: '这样也能避开反例。代价是：游叙弗伦自己恰恰相信这些神话（他刚刚还用宙斯的故事来支持自己）。在对话中，他没有走这条路。' },
        { id: 'both', t: '承认同一件事可以既虔敬又不虔敬', fb: '这样可以保留原来的定义。代价是：定义就不能用来判断有争议的事了，而这正是游叙弗伦需要它做的（判别性）。' },
      ],
    },
    adds: ['p3'],
    after: '游叙弗伦接受了修正。苏格拉底先问了一个方法上的问题：是只要有人这样说就接受，还是要检验说话的人在说什么（9e）？游叙弗伦同意检验。',
  },
  {
    k: '两难',
    ref: '10a—e',
    who: '苏格拉底',
    zh: '虔敬的东西是因为它是虔敬的才被神所喜爱，还是因为它被喜爱才是虔敬的？苏格拉底用"被带着走的"和"带着走的"等成对的说法，说明"因为"的方向：一个东西是"被带着走的"，是因为有人在带着它走。',
    grc: [
      { ref: '10a', text: 'ἆρα τὸ ὅσιον ὅτι ὅσιόν ἐστιν φιλεῖται ὑπὸ τῶν θεῶν, ἢ ὅτι φιλεῖται ὅσιόν ἐστιν;', zh: '虔敬的东西是因为它是虔敬的才被神所喜爱，还是因为它被喜爱才是虔敬的？' },
      { ref: '10d', text: 'διότι ἄρα ὅσιόν ἐστιν φιλεῖται, ἀλλʼ οὐχ ὅτι φιλεῖται, διὰ τοῦτο ὅσιόν ἐστιν;', zh: '那么，它是因为虔敬才被喜爱，而不是因为被喜爱才虔敬？' },
    ],
    choice: {
      q: '你会选哪一边？',
      opts: [
        { id: 'pious', t: '因为它是虔敬的，所以神喜爱它', fb: '游叙弗伦就是这样选的（10d）。神的喜爱于是成了对虔敬的反应，而不是虔敬的来源。请看右边：他现在同意了①。' },
        {
          id: 'loved',
          t: '因为神喜爱它，所以它是虔敬的',
          fb: '游叙弗伦没有选这一边，所以对话没有展开它的困难。后世读者常说这一边会使虔敬显得任意（神喜爱别的，别的就是虔敬的），但这是后来的发挥，不是 10a—11a 的原话。在对话中，游叙弗伦同意的是①。',
        },
      ],
    },
    adds: ['p1', 'p2'],
    after: '游叙弗伦同意了两件事：①虔敬的东西被喜爱，是因为它虔敬；②"神所喜爱的"之所以是神所喜爱的，是因为神喜爱它。加上他的定义③，请看右边的三个命题。',
  },
  {
    k: '解释的方向',
    ref: '10d—11a',
    who: '苏格拉底',
    zh: '所以，游叙弗伦，神所喜爱的并不就是虔敬的，虔敬的也不就是神所喜爱的；这两者是不同的东西。如果③成立，就可以在①中用"神所喜爱的"替换"虔敬的"：神所喜爱的东西被喜爱，是因为它是神所喜爱的，这和②的方向正好相反。',
    grc: [{ ref: '10d', text: 'οὐκ ἄρα τὸ θεοφιλὲς ὅσιόν ἐστιν, ὦ Εὐθύφρων, οὐδὲ τὸ ὅσιον θεοφιλές, ὡς σὺ λέγεις, ἀλλʼ ἕτερον τοῦτο τούτου.', zh: '所以，游叙弗伦，神所喜爱的并不就是虔敬的，虔敬的也不就是神所喜爱的，不像你说的那样；这两者是不同的东西。' }],
    choice: {
      q: '①②③不能同时成立。要恢复一致，你会放弃哪一个？',
      opts: [
        { id: 'p1', t: '放弃①：虔敬并不先于神的喜爱', fb: '这就是两难的另一边：虔敬完全取决于神喜爱什么。对话没有展开它的代价，因为游叙弗伦已经选了①；"任意"的担忧是后世的常见发挥。' },
        { id: 'p2', t: '放弃②：被喜爱的东西不一定因为被喜爱才"是被喜爱的"', fb: '这要否认苏格拉底从"被带着走的""被看见的"等例子中得出的一般道理。代价是：要说明为什么"被喜爱"在这里与那些例子不同。' },
        { id: 'p3', t: '放弃③：虔敬的不等于神所喜爱的', fb: '这是苏格拉底的结论。注意他没有说"所有的神都喜爱虔敬的东西"是假的；他说，即使它是真的，被喜爱也只是虔敬的东西碰巧具有的一种性质，不是虔敬是什么。' },
      ],
    },
    after: '本章的比方：一位公正的老师只给写得好的作文打高分。得高分的作文和写得好的作文恰好是同一批，但作文是因为写得好才得高分，而不是相反。比方的限度：老师会看走眼，而游叙弗伦设想的神也许不会。',
  },
  {
    k: '剩下的困难',
    ref: '11a—15e',
    who: '苏格拉底与游叙弗伦',
    zh: '看来你被问到虔敬究竟是什么的时候，并不想向我揭示它的本质，只是说出了它的一种遭遇。后来的几个回答（虔敬是正义的一部分；是照料神；是关于献祭和祈祷的知识）最后又绕回了"让神喜悦的"。游叙弗伦说他有急事，走了。',
    grc: [
      {
        ref: '11a',
        text: 'καὶ κινδυνεύεις, ὦ Εὐθύφρων, ἐρωτώμενος τὸ ὅσιον ὅτι ποτʼ ἐστίν, τὴν μὲν οὐσίαν μοι αὐτοῦ οὐ βούλεσθαι δηλῶσαι, πάθος δέ τι περὶ αὐτοῦ λέγειν',
        zh: '游叙弗伦，看来你被问到虔敬究竟是什么的时候，并不想向我揭示它的本质（οὐσία），只是说出了它的一种遭遇（πάθος）。',
      },
      { ref: '15b—c', text: 'ἢ οὐκ αἰσθάνῃ ὅτι ὁ λόγος ἡμῖν περιελθὼν πάλιν εἰς ταὐτὸν ἥκει;', zh: '难道你没有发觉，我们的说法绕了一圈，又回到了同一个地方？' },
    ],
    choice: {
      q: '对话结束时，你认为最主要的未解决问题是什么？',
      opts: [
        { id: 'a', t: '虔敬的本质（οὐσία）仍然没有找到', fb: '对话确实以困惑（ἀπορία）结束。但它排除了几种回答（例子、清单、碰巧具有的性质），也确立了一个好的定义应当满足的条件。' },
        { id: 'b', t: '"服务于神"的方向是否其实很有希望', fb: '这是一个有争议的读法：有些读者认为 14c 苏格拉底说"你刚才正走到要点上，却转开了"是在暗示答案；另一些读者认为对话并不暗示某个确定的答案。本章不作判断。' },
        { id: 'c', t: '我们是否需要先有定义，才能认出例子', fb: '这是第一部分提到的质疑，它会在第二部分的美诺悖论中以另一种方式再次出现。' },
      ],
    },
    after: '方法上的结论是：说法需要接受检验，不能因为说话的人（或一群神）有权威就接受。同意如果是对的，那是因为事情本来如此。',
  },
  {
    k: '原文与后世',
    ref: '后世的"游叙弗伦两难"',
    who: '本章的整理',
    zh: '这个问题后来脱离了原来的语境，成为宗教哲学和伦理学中的"游叙弗伦两难"：道德上正确的事情，是因为神命令它才正确，还是因为它正确神才命令它？后世的两难是从对话改写出来的问题，不是对话本身的论证。',
    sort: {
      legend: '下面每一条，是《游叙弗伦》本身说的，还是后世的改写或发挥？',
      labels: [
        ['orig', '对话本身'],
        ['later', '后世的改写'],
      ],
      items: [
        { id: 'many', t: '讨论的是多位神，并且考虑了诸神之间的分歧', ref: '7b—8a', ans: 'orig', fb: '对话本身。后世的讨论通常针对一神论。' },
        { id: 'love', t: '问题的关键词是"喜爱"', ref: '10a', ans: 'orig', fb: '对话本身。后世的讨论通常讲"命令"或"意志"。' },
        { id: 'moral', t: '问题针对一般的道德正确', ref: '', ans: 'later', fb: '后世的改写。《游叙弗伦》讨论的是"虔敬"这一种美德。' },
        { id: 'arb', t: '选"因为被喜爱"会使道德显得任意', ref: '', ans: 'later', fb: '后世的常见发挥。游叙弗伦很快选择了另一边，对话没有展开这一点。' },
        { id: 'nature', t: '善既不独立于神，也不是神任意的选择，而是出于神的本性', ref: '', ans: 'later', fb: '后世对两难的一种回应，属于宗教哲学的讨论，本章不展开。' },
        { id: 'pathos', t: '被喜爱只是虔敬的一种遭遇（πάθος），不是它的本质（οὐσία）', ref: '11a', ans: 'orig', fb: '对话本身。这个对比后来在亚里士多德那里发展为本质和偶性的区分。' },
      ],
    },
    after: '把一个古代论证用于新的问题是正当的，但要分清哪些是对话说的，哪些是后来的人借它来说的。这个练习不评判任何宗教立场。',
  },
];

const ID = 'euthyphro-workshop';
type Saved = { stage: number; picks: Record<string, string> };

export default function EuthyphroWorkshop() {
  const [st, setSt] = useState<Saved>(() => getMedia<Saved>('GR2', ID, { stage: 0, picks: {} }));
  const [showGrc, setShowGrc] = useState(false);
  const i = Math.max(0, Math.min(STAGES.length - 1, st.stage));
  const s = STAGES[i];
  const save = (next: Saved) => {
    setSt(next);
    setMedia('GR2', ID, next);
  };
  const go = (n: number) => {
    save({ ...st, stage: Math.max(0, Math.min(STAGES.length - 1, n)) });
    setShowGrc(false);
  };
  const pick = (k: string, v: string) => save({ ...st, picks: { ...st.picks, [k]: v } });
  const onKey = (e: KeyboardEvent<HTMLOListElement>) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const t = Math.max(0, Math.min(STAGES.length - 1, i + d));
    go(t);
    e.currentTarget.querySelectorAll('button')[t]?.focus();
  };

  const active = STAGES.slice(0, i + 1).flatMap((x) => x.adds ?? []);
  const dropped = i >= 4 ? (st.picks['s4'] as CId | undefined) : undefined;
  const clash = i >= 4 && CONFLICT.every((id) => active.includes(id) && id !== dropped);
  const sortDone = s.sort ? s.sort.items.every((c) => st.picks[`${i}:${c.id}`]) : true;
  const choicePick = s.choice ? st.picks['s' + i] : undefined;
  const ready = sortDone && (!s.choice || !!choicePick);

  return (
    <section className="md lw ew" aria-labelledby="ew-title">
      <header className="md-head">
        <p className="md-tag">走一遍诘问</p>
        <h3 id="ew-title" className="md-title">
          《游叙弗伦》：两难是怎样形成的
        </h3>
        <p className="md-lede">
          从游叙弗伦的例子出发，看一个定义怎样被提出、遇到反例、得到修正，再看苏格拉底的两难怎样迫使他放弃其中一个前提；最后分清对话本身和后世的"游叙弗伦两难"。这是一个关于论证结构的练习，不是宗教知识测验。选择只保存在这台设备上。
        </p>
      </header>

      <ol className="lw-steps" aria-label="诘问的阶段" onKeyDown={onKey}>
        {STAGES.map((x, n) => (
          <li key={n}>
            <button type="button" className={'lw-step' + (n === i ? ' is-cur' : '') + (n < i ? ' is-done' : '')} aria-current={n === i ? 'step' : undefined} onClick={() => go(n)}>
              <span className="lw-n">{n + 1}</span>
              <span className="lw-ref">{n === STAGES.length - 1 ? '后世' : x.ref}</span>
              <span className="lw-kind">{x.k}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="lw-grid">
        <div className="lw-move">
          <p className="lw-who">
            <span className="lw-ref-l">{i === STAGES.length - 1 ? s.ref : `《游叙弗伦》${s.ref}`}</span>
            {s.who}
          </p>
          <p className="lw-zh">{s.zh}</p>
          {s.grc && (
            <>
              <button type="button" className="md-disclose" aria-expanded={showGrc} onClick={() => setShowGrc(!showGrc)}>
                {showGrc ? '收起希腊原文' : '看希腊原文'}
              </button>
              {showGrc &&
                s.grc.map((g, n) => (
                  <div key={n} className="lw-grc">
                    <p className="pe-src">{g.ref}</p>
                    <p className="pe-orig" lang="grc">
                      {g.text}
                    </p>
                    <p className="pe-zh">本章试译：{g.zh}</p>
                  </div>
                ))}
            </>
          )}
          <p className="md-note">中文是本章的试译或转述。</p>

          {s.sort && (
            <fieldset className="cs-group lw-cases">
              <legend>{s.sort.legend}</legend>
              {s.sort.items.map((c) => {
                const v = st.picks[`${i}:${c.id}`];
                return (
                  <div key={c.id} className="lw-case">
                    <p className="lw-case-t">
                      {c.t} {c.ref && <span className="lw-ref-l">{c.ref}</span>}
                    </p>
                    <div className="md-seg">
                      {s.sort!.labels.map(([k, l]) => (
                        <label key={k} className={'md-seg-opt' + (v === k ? ' is-on' : '')}>
                          <input type="radio" name={`ew-${i}-${c.id}`} checked={v === k} onChange={() => pick(`${i}:${c.id}`, k)} />
                          <span>{l}</span>
                        </label>
                      ))}
                    </div>
                    {v && (
                      <p className="lw-cover">
                        {v === c.ans ? '' : '再想一想：'}
                        {c.fb}
                      </p>
                    )}
                  </div>
                );
              })}
            </fieldset>
          )}

          {s.choice && (
            <fieldset className="cs-group lw-q">
              <legend>{s.choice.q}</legend>
              <div className="md-seg gr-col">
                {s.choice.opts.map((o) => (
                  <label key={o.id} className={'md-seg-opt' + (choicePick === o.id ? ' is-on' : '')}>
                    <input type="radio" name={'ew-s' + i} checked={choicePick === o.id} onChange={() => pick('s' + i, o.id)} />
                    <span>{o.t}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}
        </div>

        <aside className="lw-commit" aria-label="游叙弗伦已同意的命题">
          <p className="md-fb-k">游叙弗伦已同意的命题</p>
          {active.length === 0 ? (
            <p className="md-muted">还没有。第 3 步以后，这里会列出他的定义和他同意的前提。</p>
          ) : (
            <ul>
              {(['p3', 'p1', 'p2'] as CId[])
                .filter((id) => active.includes(id))
                .map((id) => (
                  <li key={id} className={(clash ? 'is-hot' : '') + (dropped === id ? ' is-dropped' : '')}>
                    {COMMIT[id].n} {COMMIT[id].t}
                    <small>
                      {COMMIT[id].ref} · {COMMIT[id].who}
                      {dropped === id ? ' · 你在第 5 步选择放弃' : ''}
                    </small>
                  </li>
                ))}
            </ul>
          )}
          {clash && <p className="lw-clash">这三个命题不能同时成立。</p>}
          {i >= 4 && dropped && <p className="md-note">苏格拉底放弃的是③。</p>}
        </aside>
      </div>

      <div className="md-feedback" aria-live="polite">
        {!ready ? (
          <p className="md-muted">{s.sort ? '每一条都作出判断以后，再往下看。' : '作出选择以后，再看对话怎样往下走。'}</p>
        ) : (
          <>
            {s.choice && choicePick && <p>{s.choice.opts.find((o) => o.id === choicePick)?.fb}</p>}
            <p className="md-fb-k">{s.after}</p>
          </>
        )}
        <div className="lw-nav">
          <button type="button" className="btn btn--small" onClick={() => go(i - 1)} disabled={i === 0}>
            ← 上一步
          </button>
          <button type="button" className="btn btn--small" onClick={() => go(i + 1)} disabled={i === STAGES.length - 1}>
            下一步 →
          </button>
        </div>
        <button type="button" className="md-reset" onClick={() => save({ stage: 0, picks: {} })}>
          从头再来
        </button>
      </div>

      <p className="md-note">
        <b>这个练习的限度。</b>游叙弗伦和苏格拉底是柏拉图笔下的人物。阶段的划分、①②③的编号和表述、问题中的选项，都是本章为了教学而作的整理，不是对话原文；对话中人物的实际回答，都在反馈里注明。最后一步区分的是"出处"，不是对错：后世的改写本身也可以是很好的哲学问题。
      </p>
    </section>
  );
}
