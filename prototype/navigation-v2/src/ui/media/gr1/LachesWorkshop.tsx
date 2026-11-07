import { useState, type KeyboardEvent } from 'react';
import { getMedia, setMedia } from '../../../state/store';
import './gr1.css';

// 五 · after the chapter's step-by-step reading of the Laches. The learner
// walks the inquiry stage by stage: tests a definition against cases, meets
// the objection, examines the revision, sees the commitments that cannot all
// stand, and follows Nicias' definition to its final difficulty. Every Greek
// line is one the chapter quotes and has checked against Burnet's text
// (Perseus); every Chinese line is the chapter's translation or paraphrase
// (content/GR1_SAMPLE_DRAFT.md, 五). Learner choices are never marked right or
// wrong: feedback says what Laches, Nicias or Socrates do in the dialogue and
// what each choice would cost. Nothing is scored.

type CId = 'c1' | 'c2' | 'c3' | 'n1' | 'n2' | 'n5';
const COMMIT: Record<CId, { t: string; ref: string; who: string }> = {
  c1: { t: '勇敢是美好的（kalon）', ref: '192c', who: '拉凯斯同意' },
  c2: { t: '愚蠢的坚忍是有害的、可耻的', ref: '192c—d', who: '拉凯斯同意' },
  c3: { t: '越是缺乏有利的计算和技能而仍然坚守，就越勇敢', ref: '192e—193c', who: '拉凯斯的回答' },
  n1: { t: '勇敢是美德的一个部分', ref: '190c—d，198a', who: '双方同意' },
  n2: { t: '勇敢是关于可怕的东西和可以放心的东西的知识', ref: '194e—195a', who: '尼基阿斯的定义' },
  n5: { t: '勇敢是关于一切善恶的知识，也就是全部的美德', ref: '199c—e', who: '由尼基阿斯的定义推出' },
};
const CONFLICTS: CId[][] = [
  ['c1', 'c2', 'c3'],
  ['n1', 'n5'],
];

interface Grc {
  ref: string;
  text: string;
  zh: string;
}
interface Choice {
  q: string;
  opts: { id: string; t: string; fb: string }[];
}
interface Stage {
  k: string;
  ref: string;
  who: string;
  zh: string;
  grc?: Grc[];
  /** Commitments in force from this stage on. */
  adds?: CId[];
  /** Cases to judge one by one (stage 2). */
  cases?: { id: string; t: string; ref: string }[];
  choice?: Choice;
  after: string;
}

const STAGES: Stage[] = [
  {
    k: '提出问题',
    ref: '190b—e',
    who: '苏格拉底',
    zh: '要知道怎样教孩子获得美德，先要知道美德是什么。美德的全体太大，不如先问它的一部分，和武装作战关系最密切的那一部分：什么是勇敢？',
    adds: ['n1'],
    choice: {
      q: '两位父亲问的是"要不要让孩子学武装作战"。苏格拉底把它换成了"什么是勇敢"。你怎样看这个转换？',
      opts: [
        { id: 'a', t: '有道理：不知道要培养什么，就无法判断哪种训练有用', fb: '这是苏格拉底给出的理由。它预设了"定义优先"：先知道"F 是什么"，才能可靠地判断具体的事。' },
        { id: 'b', t: '有点绕远：将军们凭经验就能认出勇敢的士兵', fb: '这正是对"定义优先"的一种常见质疑（见正文"追问的界限"）。请留意：下面苏格拉底的反例之所以有效，正是因为拉凯斯能认出勇敢的行为。' },
      ],
    },
    after: '对话从这里开始。请记住"勇敢是美德的一个部分"这个前提，它在最后一步会起作用。',
  },
  {
    k: '定义一',
    ref: '190e',
    who: '拉凯斯',
    zh: '如果一个人愿意坚守在队列中抵御敌人，而不逃跑，你要知道，他就是勇敢的。',
    grc: [{ ref: '190e', text: 'εἰ γάρ τις ἐθέλοι ἐν τῇ τάξει μένων ἀμύνεσθαι τοὺς πολεμίους καὶ μὴ φεύγοι, εὖ ἴσθι ὅτι ἀνδρεῖος ἂν εἴη.', zh: '如果一个人愿意坚守在队列中抵御敌人，而不逃跑，你要知道，他就是勇敢的。' }],
    cases: [
      { id: 'scyth', t: '斯基泰骑兵边退边射箭，在撤退中作战', ref: '191a—b' },
      { id: 'plataea', t: '普拉塔亚战役中，斯巴达重装步兵先后撤，等敌阵乱了再转身作战', ref: '191c' },
      { id: 'sea', t: '在海上遇险时镇定应对的人', ref: '191d' },
      { id: 'ill', t: '在疾病和贫穷中不屈服的人', ref: '191d' },
      { id: 'desire', t: '抵抗欲望和快乐的人', ref: '191d—e' },
    ],
    after: '这些人都不是"坚守在队列中"，可是多数读者（拉凯斯也一样）会说他们勇敢。苏格拉底没有说定义一是错的，他说它只是一个例子：勇敢的人确实会这样做，但勇敢不只是这样。',
  },
  {
    k: '苏格拉底的要求',
    ref: '191d—192b',
    who: '苏格拉底',
    zh: '我想问你的，不只是重装步兵中的勇敢者，还有骑兵中的……所以请再试一次，先说出：勇敢是什么，它在所有这些情况中都是同一个东西？',
    grc: [
      { ref: '191d', text: 'βουλόμενος γάρ σου πυθέσθαι μὴ μόνον τοὺς ἐν τῷ ὁπλιτικῷ ἀνδρείους, ἀλλὰ καὶ τοὺς ἐν τῷ ἱππικῷ', zh: '因为我想问你的，不只是重装步兵中的勇敢者，还有骑兵中的……' },
      { ref: '191e', text: 'πάλιν οὖν πειρῶ εἰπεῖν ἀνδρείαν πρῶτον τί ὂν ἐν πᾶσι τούτοις ταὐτόν ἐστιν.', zh: '所以请再试一次，先说出：勇敢是什么，它在所有这些情况中都是同一个东西？' },
    ],
    choice: {
      q: '苏格拉底还示范了"快"的定义：不是"跑步时腿动得多"，而是"在短时间内完成很多事情的能力"（192a—b）。这个示范要求一个定义做到什么？',
      opts: [
        { id: 'a', t: '适用于所有的例子，说出它们共同的东西', fb: '这正是苏格拉底的要求：定义要涵盖跑步、说话、弹琴等一切"快"的情况。' },
        { id: 'b', t: '举出最典型、最常见的例子', fb: '典型的例子很有用，但苏格拉底要的不是它。定义一的问题恰恰在于它只给出了一个典型例子。' },
        { id: 'c', t: '把勇敢和其他美德区分开', fb: '这也是一个好定义应当做到的，后来尼基阿斯的定义正是在这一点上出了问题。但在这一步，苏格拉底强调的是"共同"。' },
      ],
    },
    after: '苏格拉底式定义的要求是：说出所有例子共有的那个东西。',
  },
  {
    k: '定义二与第一个反驳',
    ref: '192b—d',
    who: '拉凯斯与苏格拉底',
    zh: '拉凯斯："我认为勇敢是灵魂的某种坚忍。"苏格拉底：勇敢是美好的吗？明智的坚忍是美好的；那么愚蠢的坚忍呢？它是有害的、可耻的，因而不可能是勇敢。所以，照你的说法，明智的坚忍就是勇敢了。',
    grc: [
      { ref: '192c', text: 'δοκεῖ τοίνυν μοι καρτερία τις εἶναι τῆς ψυχῆς', zh: '那么，我认为勇敢是灵魂的某种坚忍。' },
      { ref: '192d', text: 'ἡ φρόνιμος ἄρα καρτερία κατὰ τὸν σὸν λόγον ἀνδρεία ἂν εἴη.', zh: '那么，照你的说法，明智的坚忍就是勇敢了。' },
    ],
    adds: ['c1', 'c2'],
    choice: {
      q: '一个人明知毫无意义，却硬撑着不肯认输。这种坚忍算勇敢吗？',
      opts: [
        { id: 'a', t: '不算：它是愚蠢的', fb: '拉凯斯也这样认为。于是"坚忍"太宽了，要加上限定：明智的坚忍。' },
        { id: 'b', t: '算：至少需要意志力', fb: '这也是一种可能的看法，但它与"勇敢是美好的""愚蠢的坚忍是可耻的"相冲突。拉凯斯选择保留这两条，于是修改了定义。' },
      ],
    },
    after: '定义改为"明智的坚忍"。拉凯斯现在同意了两个命题，请看下面的"已同意的命题"。',
  },
  {
    k: '检验"明智的坚忍"',
    ref: '192e—193c',
    who: '苏格拉底与拉凯斯',
    zh: '一个人明智地算出将来会赚得更多，于是坚持花钱，这是勇敢吗？一位医生坚持不给患肺炎的儿子吃喝，这是勇敢吗？两个士兵都在坚守：一个算出援军将到、己方人多地利；另一个在对面阵营里，没有这些条件，仍然坚守。哪一个更勇敢？',
    grc: [{ ref: '193b', text: 'ἀφρονεστέρα γε ἡ τούτου ἢ ἡ τοῦ ἑτέρου καρτερία.', zh: '这个人的坚忍，比另一个人的更愚蠢。' }],
    adds: ['c3'],
    choice: {
      q: '两个坚守的士兵，你认为哪一个更勇敢？',
      opts: [
        { id: 'a', t: '算好了援军和地利的那一个', fb: '拉凯斯没有这样回答。如果你这样选，你就没有接受（丙），也就不会陷入拉凯斯下一步的矛盾；但你要解释，为什么对面那个毫无把握仍然坚守的人反而不那么勇敢。' },
        { id: 'b', t: '对面那个没有有利条件、仍然坚守的', fb: '拉凯斯就是这样回答的，在骑兵、投石、潜水的例子中也一样。苏格拉底指出：照此说来，越勇敢的人，他的坚忍就越"愚蠢"。' },
        { id: 'c', t: '说不清，要看他们各自知道什么', fb: '这个回答已经接近尼基阿斯后来的思路：勇敢也许取决于一个人知道什么是真正可怕的。' },
      ],
    },
    after: '拉凯斯的回答给他的承诺加上了第三条（丙）。花钱和医生的例子还表明：只是"明智"（精明地计算利害）不足以构成勇敢。',
  },
  {
    k: '矛盾',
    ref: '193d',
    who: '苏格拉底',
    zh: '我们原先同意，勇敢是一种美好的东西……可现在我们又说，那可耻的东西，即愚蠢的坚忍，是勇敢。',
    grc: [
      { ref: '193d', text: 'ἡ δέ γε ἀνδρεία ὡμολογεῖτο καλόν τι εἶναι.', zh: '可是我们原先同意，勇敢是一种美好的东西。' },
      { ref: '193d', text: 'νῦν δ᾽ αὖ πάλιν φαμὲν ἐκεῖνο τὸ αἰσχρόν, τὴν ἄφρονα καρτέρησιν, ἀνδρείαν εἶναι.', zh: '现在我们又说，那可耻的东西，即愚蠢的坚忍，是勇敢。' },
    ],
    choice: {
      q: '（甲）（乙）（丙）不能同时成立。如果你是拉凯斯，你会放弃哪一个？',
      opts: [
        { id: 'c1', t: '放弃（甲）：有些勇敢并不美好', fb: '这样矛盾就消除了。代价是：勇敢不再必然值得称赞，"勇敢的坏人"成了完全正常的说法。' },
        { id: 'c2', t: '放弃（乙）：愚蠢的坚忍也可以是美好的', fb: '这样也能消除矛盾。代价是：我们很难说跳进井里的鲁莽之举值得称赞。' },
        { id: 'c3', t: '放弃（丙）：那些"更勇敢"的人其实只是无畏', fb: '这是尼基阿斯接下来要走的路：区分勇敢和无畏，把勇敢和一种知识联系起来。代价是要说清楚那是什么知识。' },
      ],
    },
    after: '苏格拉底没有替拉凯斯选择。他只是说：我们的言辞和行为现在不一致了。拉凯斯认输，尼基阿斯接过话头。',
  },
  {
    k: '定义三：尼基阿斯',
    ref: '194c—197c',
    who: '尼基阿斯',
    zh: '我记得你常说：我们每个人在他有智慧的事情上就是好的。既然勇敢是好的，它就是一种智慧：勇敢是关于可怕的东西和可以放心的东西的知识。',
    grc: [
      { ref: '194d', text: 'ταῦτα ἀγαθὸς ἕκαστος ἡμῶν ἅπερ σοφός', zh: '我们每个人在他有智慧的事情上，就是好的。' },
      { ref: '194e—195a', text: 'τὴν τῶν δεινῶν καὶ θαρραλέων ἐπιστήμην', zh: '关于可怕的东西和可以放心的东西的知识。' },
    ],
    adds: ['n2'],
    choice: {
      q: '拉凯斯反驳说：医生最知道疾病中什么是可怕的，难道医生因此就勇敢吗？你怎样看？',
      opts: [
        { id: 'a', t: '医生不因此就勇敢，所以尼基阿斯错了', fb: '这是拉凯斯的看法。尼基阿斯回答：医生只知道怎样使病人恢复健康，却不知道对这个病人来说，活下去更好还是死去更好（195c—d）。' },
        { id: 'b', t: '勇敢所需的知识比医生的知识更深：知道什么是真正的善和恶', fb: '这正是尼基阿斯的回答。它让定义避开了医生的反例，却也让"勇敢的知识"变得非常宽广，最后一步的困难就在这里。' },
      ],
    },
    after: '尼基阿斯还区分了勇敢与无畏：动物和小孩可以无所畏惧，但他们不知道什么是可怕的（196e—197c）。',
  },
  {
    k: '最后的困难',
    ref: '198a—199e',
    who: '苏格拉底与尼基阿斯',
    zh: '可怕的东西是将来的恶，因为恐惧是对将要来临的恶的预期。可是任何一种知识都不只关于将来：它同样知道正在发生的和已经发生的事。所以，勇敢就成了关于一切善恶的知识；而知道一切善恶的人不缺少任何美德。这样，勇敢就不是美德的一部分，而是全部的美德。',
    grc: [
      { ref: '198b', text: 'δέος γὰρ εἶναι προσδοκίαν μέλλοντος κακοῦ', zh: '因为恐惧就是对将要来临的恶的预期。' },
      { ref: '199e', text: '… ἀλλὰ σύμπασα ἀρετή.', zh: '……而是全部的美德。' },
    ],
    adds: ['n5'],
    choice: {
      q: '"勇敢是美德的一部分"和"勇敢是全部的美德"冲突了。应该修改哪一边？',
      opts: [
        { id: 'a', t: '放弃"部分"：各种美德其实是同一种知识', fb: '这就是"美德的统一性"的方向，柏拉图在《普罗泰戈拉篇》中让苏格拉底为它辩护。代价：要解释为什么看起来有人勇敢而不正义。' },
        { id: 'b', t: '修改尼基阿斯的定义：勇敢包含知识，但不只是知识', fb: '这符合常识，也接近后来亚里士多德强调品格养成的思路。代价：放弃了"美德即知识"这个苏格拉底式的论题。' },
        { id: 'c', t: '质疑"知识不分过去、现在和将来"', fb: '这样可以保住"关于将来之恶的知识"。代价：这个前提在医学等例子中看起来很有道理，放弃它需要新的理由。' },
      ],
    },
    after: '对话本身没有作出选择。',
  },
  {
    k: '没有找到',
    ref: '199e',
    who: '苏格拉底',
    zh: '那么，尼基阿斯，我们并没有找到勇敢是什么。',
    grc: [{ ref: '199e', text: 'οὐκ ἄρα ηὑρήκαμεν, ὦ Νικία, ἀνδρεία ὅτι ἔστιν.', zh: '那么，尼基阿斯，我们并没有找到勇敢是什么。' }],
    after:
      '为什么没有一个简单的最终定义？因为每一个定义都在检验中暴露出它和对话者自己的其他信念相冲突，而苏格拉底不替对话者决定该放弃什么。但这并不是一无所获：几个定义被排除了；"勇敢与知识是什么关系"这个问题被提了出来，并指向美德的统一性；两位将军从"以为知道"变成了"知道自己不知道"。',
  },
];

const ID = 'laches-workshop';
type Saved = { stage: number; picks: Record<string, string> };

export default function LachesWorkshop() {
  const [st, setSt] = useState<Saved>(() => getMedia<Saved>('GR1', ID, { stage: 0, picks: {} }));
  const [showGrc, setShowGrc] = useState(false);
  const i = Math.max(0, Math.min(STAGES.length - 1, st.stage));
  const s = STAGES[i];
  const save = (next: Saved) => {
    setSt(next);
    setMedia('GR1', ID, next);
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

  // Commitments in force at this stage; the one dropped at 矛盾 (if any) is shown struck through.
  const active = STAGES.slice(0, i + 1).flatMap((x) => x.adds ?? []);
  const dropped = i >= 5 ? (st.picks['s5'] as CId | undefined) : undefined;
  const clash = CONFLICTS.filter((c) => c.every((id) => active.includes(id) && id !== dropped));
  const casesDone = s.cases ? s.cases.every((c) => st.picks[`case:${c.id}`]) : true;
  const choicePick = s.choice ? st.picks['s' + i] : undefined;
  const ready = casesDone && (!s.choice || !!choicePick);

  return (
    <section className="md lw" aria-labelledby="lw-title">
      <header className="md-head">
        <p className="md-tag">走一遍诘问</p>
        <h3 id="lw-title" className="md-title">
          《拉凯斯》：什么是勇敢？
        </h3>
        <p className="md-lede">
          一步一步地走一遍这场诘问：用例子检验定义，遇到反驳，看定义怎样修改，再看对话者的几个信念怎样无法同时成立。你的选择没有对错之分，反馈只说明对话中的人物怎样回答，以及每种选择的代价。选择只保存在这台设备上。
        </p>
      </header>

      <ol className="lw-steps" aria-label="诘问的阶段" onKeyDown={onKey}>
        {STAGES.map((x, n) => (
          <li key={n}>
            <button type="button" className={'lw-step' + (n === i ? ' is-cur' : '') + (n < i ? ' is-done' : '')} aria-current={n === i ? 'step' : undefined} onClick={() => go(n)}>
              <span className="lw-n">{n + 1}</span>
              <span className="lw-ref">{x.ref}</span>
              <span className="lw-kind">{x.k}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="lw-grid">
        <div className="lw-move">
          <p className="lw-who">
            <span className="lw-ref-l">《拉凯斯》{s.ref}</span>
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
          <p className="md-note">中文是本章的试译或转述；省略号表示删去的部分。</p>

          {s.cases && (
            <fieldset className="cs-group lw-cases">
              <legend>定义一只说"坚守在队列中"。下面这些人，你认为勇敢吗？</legend>
              {s.cases.map((c) => {
                const v = st.picks[`case:${c.id}`];
                return (
                  <div key={c.id} className="lw-case">
                    <p className="lw-case-t">
                      {c.t} <span className="lw-ref-l">{c.ref}</span>
                    </p>
                    <div className="md-seg">
                      {[
                        ['y', '勇敢'],
                        ['n', '不勇敢'],
                      ].map(([k, l]) => (
                        <label key={k} className={'md-seg-opt' + (v === k ? ' is-on' : '')}>
                          <input type="radio" name={'lw-case-' + c.id} checked={v === k} onChange={() => pick(`case:${c.id}`, k)} />
                          <span>{l}</span>
                        </label>
                      ))}
                    </div>
                    {v && <p className="lw-cover">定义一{v === 'y' ? '没有把他算进去：他不是"坚守在队列中"。' : '本来也没有把他算进去，这里没有冲突。'}</p>}
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
                    <input type="radio" name={'lw-s' + i} checked={choicePick === o.id} onChange={() => pick('s' + i, o.id)} />
                    <span>{o.t}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}
        </div>

        <aside className="lw-commit" aria-label="已同意的命题">
          <p className="md-fb-k">已同意的命题</p>
          {active.length === 0 ? (
            <p className="md-muted">还没有。</p>
          ) : (
            <ul>
              {active.map((id) => {
                const hot = clash.some((c) => c.includes(id));
                const label = id.startsWith('c') ? `（${'甲乙丙'[Number(id[1]) - 1]}）` : '';
                return (
                  <li key={id} className={(hot ? 'is-hot' : '') + (dropped === id ? ' is-dropped' : '')}>
                    {label}
                    {COMMIT[id].t}
                    <small>
                      {COMMIT[id].ref} · {COMMIT[id].who}
                      {dropped === id ? ' · 你在第 6 步选择放弃' : ''}
                    </small>
                  </li>
                );
              })}
            </ul>
          )}
          {clash.length > 0 && <p className="lw-clash">标红的命题不能同时成立。</p>}
        </aside>
      </div>

      <div className="md-feedback" aria-live="polite">
        {!ready ? (
          <p className="md-muted">{s.cases ? '对每个人作出判断以后，再看对话怎样往下走。' : '作出选择以后，再看对话怎样往下走。'}</p>
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
        <b>这个练习的限度。</b>拉凯斯、尼基阿斯和苏格拉底是柏拉图笔下的人物，对话是有意构思的文学作品，不是谈话记录。阶段的划分、"已同意的命题"列表和每个选项的说明都是本章的整理；问题中的选项不是对话原文，而是为了让读者站到拉凯斯的位置上而设计的。对话中各人的实际回答，都在反馈里注明。
      </p>
    </section>
  );
}
