import { Seg, Src, SrcToggle, useSaved } from './shared';
import '../gr1/gr1.css';
import './gr4.css';

// 五 · after "标准的问题", once the ten modes, the five modes, the regress
// trilemma and the criterion have been read. Three tasks:
//  一 diagnose: a short exchange (the chapter's own examples) and the learner
//     names the mode of the five (PH 1.164) that applies.
//  二 a justification chain: the learner keeps giving reasons for a claim and
//     sees the chain end in one of three ways (PH 1.166, 1.168, 1.169).
//  三 suspension is not denial: the learner places five attitudes to the
//     same claim, then sees how Sextus describes the Pyrrhonist (1.10),
//     the dogmatist and the Academic (1.3), with Clitomachus' two senses of
//     withholding assent (Lucullus 104) for the Academic side.
// Nothing claims that nothing can be known; the chain ends with the modern
// replies, labelled modern.

type Mode = 'disagree' | 'regress' | 'relative' | 'hypo' | 'circle';
const MODE: Record<Mode, string> = {
  disagree: '出于分歧',
  regress: '推向无穷',
  relative: '出于相对性',
  hypo: '假设',
  circle: '循环',
};
const MODE_SRC: Partial<Record<Mode, { src: string; orig: string; zh: string }>> = {
  regress: {
    src: '塞克斯都《皮浪学说纲要》1.166',
    orig: 'ὁ δὲ ἀπὸ τῆς εἰς ἄπειρον ἐκπτώσεως ἐστὶν ἐν ᾧ τὸ φερόμενον εἰς πίστιν τοῦ προτεθέντος πράγματος πίστεως ἑτέρας χρῄζειν λέγομεν, κἀκεῖνο ἄλλης, καὶ μέχρις ἀπείρου.',
    zh: '推向无穷的论式是这样的：我们说，为了使提出的事情可信而拿出来的东西，本身又需要另一个东西来使它可信，而那个东西又需要另一个，如此以至无穷。',
  },
  hypo: {
    src: '塞克斯都《皮浪学说纲要》1.168',
    orig: 'ὁ δὲ ἐξ ὑποθέσεως ἔστιν ὅταν εἰς ἄπειρον ἐκβαλλόμενοι οἱ δογματικοὶ ἀπό τινος ἄρξωνται ὃ οὐ κατασκευάζουσιν ἀλλʼ ἁπλῶς καὶ ἀναποδείκτως κατὰ συγχώρησιν λαμβάνειν ἀξιοῦσιν.',
    zh: '假设的论式是这样的：独断论者被推向无穷时，就从某个东西开始，这个东西他们不加论证，而是要求别人简单地、不经证明地承认它。',
  },
  circle: {
    src: '塞克斯都《皮浪学说纲要》1.169',
    orig: 'ὁ δὲ διάλληλος τρόπος συνίσταται, ὅταν τὸ ὀφεῖλον τοῦ ζητουμένου πράγματος εἶναι βεβαιωτικὸν χρείαν ἔχῃ τῆς ἐκ τοῦ ζητουμένου πίστεως.',
    zh: '循环的论式是这样的：本来应当用来确证所探究之事的东西，自己却需要从所探究之事那里获得可信性。',
  },
};
const LIST_SRC = {
  src: '塞克斯都《皮浪学说纲要》1.164',
  orig: 'οἱ δὲ νεώτεροι σκεπτικοὶ παραδιδόασι τρόπους τῆς ἐποχῆς πέντε τούσδε, πρῶτον τὸν ἀπὸ τῆς διαφωνίας, δεύτερον τὸν εἰς ἄπειρον ἐκβάλλοντα, τρίτον τὸν ἀπὸ τοῦ πρός τι, τέταρτον τὸν ὑποθετικόν, πέμπτον τὸν διάλληλον.',
  zh: '较晚的怀疑派传下了下面五个悬置判断的论式：第一，出于分歧的论式；第二，推向无穷的论式；第三，出于相对性的论式；第四，假设的论式；第五，循环的论式。',
};

interface Case {
  id: string;
  lines: [string, string][];
  mode: Mode;
  why: string;
}
const CASES: Case[] = [
  {
    id: 'criterion',
    lines: [
      ['独断论者', '真理的标准是可把握的印象。'],
      ['另一位独断论者', '不对，标准是感觉、预先的概念和感受。'],
      ['怀疑派', '你们对标准本身就意见不一，我该用哪一个标准来判定你们的分歧？'],
    ],
    mode: 'disagree',
    why: '哲学家们对同一个问题（这里是"标准"）各执一词，而又没有一个公认的办法来裁决。这是本章"标准的问题"一节的例子：斯多亚派和伊壁鸠鲁派的标准不同。',
  },
  {
    id: 'water',
    lines: [
      ['独断论者', '这盆水是温的。'],
      ['怀疑派', '我的左手刚从冷水里拿出来，觉得它热；右手刚从热水里拿出来，觉得它凉。'],
      ['怀疑派', '我只能说它对这只手显得热，对那只手显得凉。'],
    ],
    mode: 'relative',
    why: '同一个对象，相对于不同的判断者、不同的情况，显现得不同；我们只能说它"相对于什么"显现为如何。（温水的例子是本章改写的，属于十论式中的"情况的差异"；五论式中的"相对性"更一般。）',
  },
  {
    id: 'reasons',
    lines: [
      ['独断论者', '健康的人的味觉比病人的更可靠。'],
      ['怀疑派', '凭什么？'],
      ['独断论者', '因为健康的身体处在自然的状态。'],
      ['怀疑派', '凭什么说自然的状态更能判断真相？'],
      ['独断论者', '因为……（又给出一个理由，怀疑派又问凭什么）'],
    ],
    mode: 'regress',
    why: '每一个理由都还需要另一个理由，没有一个地方可以停下来。',
  },
  {
    id: 'grant',
    lines: [
      ['独断论者', '健康的人的味觉比病人的更可靠。'],
      ['怀疑派', '凭什么？'],
      ['独断论者', '这一点总得承认吧，不需要证明。'],
    ],
    mode: 'hypo',
    why: '停在一个不加论证、只要求对方承认的起点上。怀疑派会说：对方同样可以假设一个相反的起点。',
  },
  {
    id: 'senses',
    lines: [
      ['独断论者', '感觉是可靠的。'],
      ['怀疑派', '你怎么知道？'],
      ['独断论者', '因为凡是我用感觉检验过的东西，结果都证明感觉没有骗我。'],
    ],
    mode: 'circle',
    why: '用来确证"感觉可靠"的检验，本身依赖感觉；本来要证明的东西，被拿来当作证明的依据。',
  },
];

interface Node {
  t: string;
  next?: string;
  end?: 'hypo' | 'circle';
}
const TREE: Record<string, { ask: string; opts: Node[] }> = {
  r0: {
    ask: '为什么"健康的人的感觉比病人的更可靠"？',
    opts: [
      { t: '因为健康的身体处在自然的状态', next: 'r1' },
      { t: '这是显然的，不需要理由', end: 'hypo' },
      { t: '因为健康的人感觉到的东西更可靠', end: 'circle' },
    ],
  },
  r1: {
    ask: '为什么处在自然状态的身体，更能判断事物本身是什么样的？',
    opts: [
      { t: '因为大多数人都处在这种状态，而且他们的感觉相互一致', next: 'r2' },
      { t: '自然本来就是标准，这一点不需要证明', end: 'hypo' },
      { t: '因为健康的人的感觉更可靠', end: 'circle' },
    ],
  },
  r2: {
    ask: '为什么大多数人的一致，能保证事物本身就是那样？',
    opts: [
      { t: '因为一致的判断比个别的判断更可信', next: 'r3' },
      { t: '总得承认多数人是对的吧', end: 'hypo' },
      { t: '因为健康的大多数人的感觉更可靠', end: 'circle' },
    ],
  },
  r3: {
    ask: '为什么"更可信"就能保证"是真的"？……',
    opts: [
      { t: '再给一个理由', next: 'r4' },
      { t: '就到这里吧，这一点我们都接受', end: 'hypo' },
    ],
  },
  r4: { ask: '', opts: [] },
};
const ENDS: Record<'regress' | 'hypo' | 'circle', { h: string; t: string }> = {
  regress: { h: '链条可以一直延伸下去：推向无穷', t: '每一个理由都还需要另一个理由。无穷的链条永远不能完成，所以不能用它来证明最初的主张。' },
  hypo: { h: '链条停在一个假设上', t: '你在某一步停了下来，要求对方承认一个没有论证的起点。怀疑派会说：对方同样可以假设一个相反的起点，两者"等力"。' },
  circle: { h: '链条绕回到了起点：循环', t: '你用来支持主张的理由，本身就依赖那个主张。' },
};

type Att = 'affirm' | 'deny' | 'unknowable' | 'suspend' | 'probable';
const ATT: [Att, string][] = [
  ['affirm', '"蜂蜜在本性上是甜的。"'],
  ['deny', '"蜂蜜在本性上不是甜的。"'],
  ['unknowable', '"蜂蜜在本性上是不是甜的，是不可知的。"'],
  ['suspend', '"它尝起来是甜的；至于它在本性上是不是甜的，我现在既不肯定也不否定，还在探究。"'],
  ['probable', '"它看上去是甜的，又没有什么与此冲突，我就按这一点行事；但我不认可它为真。"'],
];
const WHO: [string, string][] = [
  ['dog', '独断论者'],
  ['pyr', '皮浪派（据塞克斯都）'],
  ['acaS', '学园派（按塞克斯都的描述）'],
  ['acaC', '卡尔涅阿德斯式的学园派（按克莱托马库斯的说明）'],
  ['none', '没有哪一派以此为立场'],
];
const ATT_KEY: Record<Att, { who: string[]; t: string }> = {
  affirm: { who: ['dog'], t: '肯定一个关于事物本性的判断。塞克斯都说，认为自己已经发现了真理的，是"独断论者"（1.3）。' },
  deny: { who: ['dog', 'none'], t: '否定也是一种独断：它同样对事物的本性下了判断。悬置判断不是认为某个命题是假的。' },
  unknowable: { who: ['acaS'], t: '塞克斯都把"宣称事物不可把握"归给克莱托马库斯、卡尔涅阿德斯一派（1.3），并认为这仍然是一种独断（1.226，转述）。这一描述是否公平，有争议。' },
  suspend: { who: ['pyr'], t: '这是塞克斯都的"悬置"：既不否定什么，也不肯定什么（1.10）。他承认显现（"尝起来是甜的"），探究的是关于显现所说的东西（1.19）。' },
  probable: { who: ['acaC'], t: '克莱托马库斯说，"克制认可"有两种意思；按第二种，智者可以遵循可信性，回答"是"或"不是"，而不肯定任何东西为真（《卢库卢斯》104）。这是对卡尔涅阿德斯的一种理解，古代和现代都有争论。' },
};

const ID = 'modes-lab';
type Task = 'diagnose' | 'chain' | 'suspend';
interface Saved {
  task: Task;
  diag: Record<string, Mode>;
  path: { node: string; pick: number }[];
  att: Partial<Record<Att, string>>;
}
const INIT: Saved = { task: 'diagnose', diag: {}, path: [], att: {} };

export default function ModesLab() {
  const [st, save] = useSaved<Saved>(ID, INIT);
  const last = st.path[st.path.length - 1];
  const lastNode = last ? TREE[last.node].opts[last.pick] : undefined;
  const cur = lastNode ? lastNode.next : 'r0';
  const end: 'regress' | 'hypo' | 'circle' | null = lastNode?.end ?? (cur === 'r4' ? 'regress' : null);
  const diagDone = CASES.filter((c) => st.diag[c.id]).length;

  return (
    <section className="md g4" aria-labelledby="ml-title">
      <header className="md-head">
        <p className="md-tag">论式实验室</p>
        <h3 id="ml-title" className="md-title">
          怀疑派的论式：理由的链条在哪里断掉？
        </h3>
        <p className="md-lede">
          三项任务：先判断几段对话中用到的是哪一个论式；再自己给一个主张一层一层地提供理由，看链条怎样结束；最后分清"悬置"和"否定"。论式的目的是悬置判断，不是证明"什么都不能知道"。
        </p>
      </header>

      <Seg
        name="ml-task"
        label="任务"
        value={st.task}
        opts={[
          ['diagnose', '一、辨认论式'],
          ['chain', '二、理由的链条'],
          ['suspend', '三、悬置不是否定'],
        ]}
        onPick={(v) => save({ ...st, task: v })}
      />

      {st.task === 'diagnose' && (
        <div className="g4-panel">
          <p className="md-muted">对话是这个练习编的（第一段取自正文"标准的问题"，第二段取自十论式的表格）。已判断 {diagDone} / {CASES.length}。</p>
          {CASES.map((c, k) => {
            const v = st.diag[c.id];
            return (
              <fieldset key={c.id} className="cs-group g4-case">
                <legend>对话 {k + 1}：这里用到的是哪一个论式？</legend>
                <dl className="g4-dialogue">
                  {c.lines.map(([who, t], i) => (
                    <div key={i}>
                      <dt>{who}</dt>
                      <dd>{t}</dd>
                    </div>
                  ))}
                </dl>
                <Seg name={'ml-d-' + c.id} value={v} opts={(Object.keys(MODE) as Mode[]).map((m) => [m, MODE[m]] as const)} onPick={(m) => save({ ...st, diag: { ...st.diag, [c.id]: m } })} />
                {v && (
                  <div className="md-feedback" aria-live="polite">
                    <p className="md-fb-k">{v === c.mode ? `对：${MODE[c.mode]}的论式。` : `更接近"${MODE[c.mode]}"的论式。`}</p>
                    <p>{c.why}</p>
                    {MODE_SRC[c.mode] && (
                      <SrcToggle label={`看希腊原文（${MODE_SRC[c.mode]!.src.replace('塞克斯都《皮浪学说纲要》', '')}）`}>
                        <Src src={MODE_SRC[c.mode]!.src} lang="grc" orig={MODE_SRC[c.mode]!.orig} zh={MODE_SRC[c.mode]!.zh} />
                      </SrcToggle>
                    )}
                  </div>
                )}
              </fieldset>
            );
          })}
          <SrcToggle label="看五论式的列表（《皮浪学说纲要》1.164）">
            <Src {...LIST_SRC} lang="grc" />
          </SrcToggle>
        </div>
      )}

      {st.task === 'chain' && (
        <div className="g4-panel">
          <p className="g4-k">主张</p>
          <p className="g4-event">健康的人的感觉比病人的更可靠。</p>
          <ol className="g4-chain">
            {st.path.map((p, i) => (
              <li key={i}>
                <span className="g4-ask">怀疑派：{TREE[p.node].ask}</span>
                <span className="g4-ans">你：{TREE[p.node].opts[p.pick].t}</span>
              </li>
            ))}
          </ol>
          {!end && cur && (
            <fieldset className="cs-group">
              <legend>怀疑派：{TREE[cur].ask}</legend>
              <Seg name={'ml-c-' + cur} col value={undefined} opts={TREE[cur].opts.map((o, i) => [i, o.t] as const)} onPick={(i) => save({ ...st, path: [...st.path, { node: cur, pick: i }] })} />
            </fieldset>
          )}
          {end && (
            <div className="md-feedback" aria-live="polite">
              <p className="md-fb-k">{ENDS[end].h}</p>
              <p>{ENDS[end].t}</p>
              {MODE_SRC[end] && <Src {...MODE_SRC[end]!} lang="grc" />}
              <p>
                <b>三难困境。</b>理由的链条只有这三种结局：无穷地进行下去、停在一个假设上、绕回到起点。所以怀疑派说，这个主张不能被证明，应当对它<b>悬置判断</b>，而不是说它是假的。
              </p>
              <p className="md-muted">
                现代的回答（不是古代的）：基础主义认为有一些不需要理由的基本信念；融贯论认为信念之间可以相互支持；无穷主义认为理由的链条可以是无穷的。三者各有困难，这个问题至今仍在讨论。
              </p>
              <button type="button" className="btn btn--small" onClick={() => save({ ...st, path: [] })}>
                再走一次，换一种结局
              </button>
            </div>
          )}
        </div>
      )}

      {st.task === 'suspend' && (
        <div className="g4-panel">
          <p>同一个问题：蜂蜜在本性上是不是甜的？下面五种态度，各属于谁？（蜂蜜的例子见正文"怀疑派怎样生活"。）</p>
          {ATT.map(([a, t]) => {
            const v = st.att[a];
            const k = ATT_KEY[a];
            return (
              <fieldset key={a} className="cs-group g4-case">
                <legend>{t}</legend>
                <Seg name={'ml-a-' + a} col value={v} opts={WHO} onPick={(w) => save({ ...st, att: { ...st.att, [a]: w } })} />
                {v && (
                  <div className="md-feedback">
                    <p className="md-fb-k">{k.who.includes(v) ? '对。' : `更接近：${k.who.map((w) => WHO.find((x) => x[0] === w)![1]).join('，或')}。`}</p>
                    <p>{k.t}</p>
                  </div>
                )}
              </fieldset>
            );
          })}
          {Object.keys(st.att).length === ATT.length && (
            <div className="md-feedback">
              <p className="md-fb-k">悬置不是否定</p>
              <p>
                否定和"宣称不可知"，都对事物的本性下了判断；悬置是"心思的一种停止"，什么都不下判断。学园派和皮浪派的界限也不是绝对的：塞克斯都自己说，阿尔克西拉乌斯的路子和皮浪派"几乎是同一个"（1.232）。
              </p>
              <SrcToggle label="看希腊原文（《皮浪学说纲要》1.10、1.3；拉丁原文《卢库卢斯》104）">
                <Src
                  src="塞克斯都《皮浪学说纲要》1.10"
                  lang="grc"
                  orig="‘ἰσοσθένειαν’ δὲ λέγομεν τὴν κατὰ πίστιν καὶ ἀπιστίαν ἰσότητα, ὡς μηδένα μηδενὸς προκεῖσθαι τῶν μαχομένων λόγων ὡς πιστότερον. ‘ἐποχὴ’ δέ ἐστι στάσις διανοίας διʼ ἣν οὔτε αἴρομέν τι οὔτε τίθεμεν. ‘ἀταραξία’ δέ ἐστι ψυχῆς ἀοχλησία καὶ γαληνότης."
                  zh="我们说的“等力”，是指在可信和不可信方面的相等，以至于相互冲突的论证中，没有哪一个比另一个更可信。“悬置”是心思的一种停止，由于它，我们既不否定什么，也不肯定什么。“安宁”是灵魂的不受烦扰和平静。"
                />
                <Src
                  src="塞克斯都《皮浪学说纲要》1.3"
                  lang="grc"
                  orig="καὶ εὑρηκέναι μὲν δοκοῦσιν οἱ ἰδίως καλούμενοι δογματικοί, οἷον οἱ περὶ Ἀριστοτέλην καὶ Ἐπίκουρον καὶ τοὺς Στωικοὺς καὶ ἄλλοι τινές, ὡς δὲ περὶ ἀκαταλήπτων ἀπεφήναντο οἱ περὶ Κλειτόμαχον καὶ Καρνεάδην καὶ ἄλλοι Ἀκαδημαϊκοί, ζητοῦσι δὲ οἱ σκεπτικοί."
                  zh="认为自己已经发现了真理的，是那些被专门称为“独断论者”的人，比如亚里士多德、伊壁鸠鲁、斯多亚派的追随者和其他一些人；宣称事物不可把握的，是克莱托马库斯、卡尔涅阿德斯的追随者和其他学园派的人；而还在探究的，是怀疑派。"
                />
                <Src
                  src="西塞罗《卢库卢斯》104"
                  lang="la"
                  orig="adiungit dupliciter dici adsensus sustinere sapientem, uno modo cum hoc intellegatur, omnino eum rei nulli adsentiri, altero cum se a respondendo ut aut adprobet quid aut inprobet sustineat, ut neque neget aliquid neque aiat."
                  zh="他（克莱托马库斯）又说，说智者“克制认可”，有两种意思：一种是说他对任何事情都完全不认可；另一种是说他克制自己，不作出赞成或反对某件事的回答，既不否定什么，也不肯定什么。"
                />
              </SrcToggle>
            </div>
          )}
        </div>
      )}

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        恢复初始状态
      </button>
      <p className="md-note">
        <b>这个练习的限度。</b>对话和理由链是这个练习编的，用来显示论式的结构，不是塞克斯都的原话；塞克斯都并不认为每一段对话都只用一个论式，实际的论辩常常是几个论式合用。古代怀疑论不宣称"什么都不能知道"，也不是今天所说的"科学的怀疑精神"；学园派内部、学园派与皮浪派之间的分歧，都比这里的五个选项复杂。
      </p>
    </section>
  );
}
