import { Seg, Src, SrcToggle, useSaved } from './shared';
import '../gr1/gr1.css';
import './gr4.css';

// 三 · after "第一阵冲动", once impression, assent, the four passions, the
// good feelings and the first movement have been read. The learner walks
// one situation through the Stoic analysis: event → impression (and, in the
// storm, the involuntary first movement) → the test of Handbook 1.5 → which
// judgment to assent to, or to withhold → what follows. Several judgments
// are offered for the same event, so the learner sees that the event is the
// same and the judgment differs. What follows is read off the chapter's
// tables (four passions, 7.110—114; good feelings, 7.116). Every situation
// ends with the chapter's objection to the analysis. This is a model of a
// theory, not a description of how the brain works, and not counselling.

type Pass = 'pleasure' | 'distress' | 'desire' | 'fear';
const PASS: Record<Pass, { zh: string; grc: string; cell: string }> = {
  pleasure: { zh: '快乐（作为激情）', grc: 'ἡδονή', cell: '现在 · 好' },
  distress: { zh: '痛苦', grc: 'λύπη', cell: '现在 · 坏' },
  desire: { zh: '欲望', grc: 'ἐπιθυμία', cell: '将来 · 好' },
  fear: { zh: '恐惧', grc: 'φόβος', cell: '将来 · 坏' },
};
type Eu = 'joy' | 'caution' | 'wish';
const EU: Record<Eu, string> = { joy: '欢喜（χαρά）', caution: '谨慎（εὐλάβεια）', wish: '愿望（βούλησις）' };

interface Judgment {
  t: string;
  /** What assenting to it amounts to. */
  out: { kind: 'passion'; p: Pass } | { kind: 'eu'; e: Eu } | { kind: 'none' };
  does: string;
  read: string;
}
interface Situation {
  id: string;
  zh: string;
  from: string;
  event: string;
  impression: string;
  /** The involuntary first movement, where the chapter's source describes one. */
  first?: string;
  /** Is the thing the impression is about up to us (Handbook 1.1)? */
  upToUs: { q: string; a: boolean; why: string };
  judgments: Judgment[];
  objection: string;
}

const SITUATIONS: Situation[] = [
  {
    id: 'email',
    zh: '一封冷淡的邮件',
    from: '本章正文的例子',
    event: '你给同事发了一份认真准备的方案。对方只回了两个字："已阅。"',
    impression: '"他看不起我。"',
    upToUs: { q: '同事怎样看你，取决于你吗？', a: false, why: '别人的看法属于"不取决于我们的"（《手册》1.1 列了"名声"）；取决于你的是你对这个印象怎样判断，以及你接下来怎样做。' },
    judgments: [
      {
        t: '"他看不起我，这是一件坏事，我被冒犯了，应当生气。"',
        out: { kind: 'passion', p: 'distress' },
        does: '回一封带刺的邮件，或者一整天闷闷不乐。',
        read: '认可了两个判断："现在发生了一件坏事"和"对此感到难受是恰当的"。斯多亚派会说，第一个判断已经错了：别人的看法不是真正的恶。按"现在有一件坏事"的判断，这里读作痛苦。',
      },
      {
        t: '"这封邮件很短；我并不知道他为什么这样回。"',
        out: { kind: 'none' },
        does: '先不下结论，等合适的时候问一问他对方案有什么意见。',
        read: '暂不认可"他看不起我"这个印象：它把一件事实（回复很短）和一个推测（他看不起我）混在了一起。这正是《手册》1.5 的练习："你只是一个印象。"',
      },
      {
        t: '"即使他真的看不起我，那也不取决于我；取决于我的是把方案做好，并且公正地对待他。"',
        out: { kind: 'eu', e: 'wish' },
        does: '平静地继续工作；如果需要，直接而礼貌地讨论方案本身。',
        read: '认可的是一个关于"什么取决于我"的判断。没有激情，但并不是没有情感：斯多亚派的智者有"愿望"，即合理的追求，这里指向的是自己正当地行事。',
      },
    ],
    objection: '反驳：有时"他看不起我"恰恰是真的，而且不公正的对待会带来真实的伤害（例如职场上的歧视）。如果只训练自己不认可"这是坏事"，会不会使人放弃本应当提出的正当要求？第六部分"治疗的限度"讨论了这一点。',
  },
  {
    id: 'storm',
    zh: '海上的风暴',
    from: '据盖利乌斯《阿提卡之夜》19.1',
    event: '你乘坐的船在海上遇到风暴，船身剧烈摇晃，海浪打上甲板。',
    impression: '"我们要死了，这太可怕了！"',
    first: '脸色发白、心跳加快、身体一紧。按照盖利乌斯的转述，这是在理性之前发生的、迅速的运动，不取决于我们，智者也会有。',
    upToUs: { q: '风暴会不会过去、船会不会沉，取决于你吗？', a: false, why: '风暴和船的命运不取决于你；取决于你的，是你是否认可"这是可怕的坏事"，以及你在这时能做什么（例如听从船员的指挥）。' },
    judgments: [
      {
        t: '"死亡是最可怕的坏事，它马上就要来了！"',
        out: { kind: 'passion', p: 'fear' },
        does: '惊慌失措，乱跑乱叫，妨碍船员。',
        read: '认可了"将来有一件坏事"的印象，这就是恐惧。斯多亚派会说，死亡属于"无关善恶之物"，不是真正的恶；可怕的是"死亡是可怕的"这个看法（《手册》5）。',
      },
      {
        t: '"船有危险；能做的，是穿好救生衣、听从船员的指挥。"',
        out: { kind: 'eu', e: 'caution' },
        does: '穿好救生衣，抓紧扶手，听从指挥。',
        read: '这不是麻木：安全是"优先选取的"，所以要尽力保全自己。斯多亚派说"智者绝不会恐惧，但会谨慎"（第欧根尼·拉尔修 7.116）。谨慎是合理的回避；但按严格的说法，它的对象是真正的恶，也就是恶德，所以这里的"谨慎"是一种近似的说法。',
      },
      {
        t: '（暂不认可"这太可怕了"，先等第一阵惊慌过去。）',
        out: { kind: 'none' },
        does: '片刻的震动之后，恢复镇定，再决定怎样做。',
        read: '这正是盖利乌斯转述的爱比克泰德的说法：印象不取决于意志，认可却是自愿的；智者的脸色也会发白，但他随后并不认可这些可怕的印象。',
      },
    ],
    objection: '注意材料的层次：这是公元 2 世纪的盖利乌斯，转述一位不知名的斯多亚派哲学家和据说是爱比克泰德的话，是罗马时期的说法；早期斯多亚派是否已经有明确的"前激情"概念，有争论。另外，"第一阵反应"和"认可"之间的界线，在真实的经验中并不总是清楚的。',
  },
  {
    id: 'bonus',
    zh: '一笔意外的奖金',
    from: '本章编的例子',
    event: '你意外地得到了一大笔奖金。',
    impression: '"这是一件天大的好事！"',
    upToUs: { q: '奖金本身，取决于你吗？', a: false, why: '财富属于"不取决于我们的"（《手册》1.1 列了"财产"），斯多亚派称它为"优先选取之物"：有价值，但不是真正的善。' },
    judgments: [
      {
        t: '"太好了！有了钱，我的生活就真正好起来了！"',
        out: { kind: 'passion', p: 'pleasure' },
        does: '兴奋得睡不着，开始计划大笔花销。',
        read: '认可了"现在有一件真正的好东西"，这是作为激情的快乐：一种不合理的"振奋"。斯多亚派会说，错误在于把财富当作真正的善（第欧根尼·拉尔修 7.102—103：财富带来益处，并不比带来害处更多）。注意：这里的"快乐"和伊壁鸠鲁的"快乐"不是一回事。',
      },
      {
        t: '"以后还要得到更多！"',
        out: { kind: 'passion', p: 'desire' },
        does: '开始盘算怎样得到下一笔，越想越不满足。',
        read: '认可了"将来有一样好东西"，这是欲望。克律西波斯的例子正是"贪财就是认为钱是好的这一看法"（第欧根尼·拉尔修 7.111）。',
      },
      {
        t: '"这是一件优先选取的东西，可以合理地使用它，比如还清债务、帮助家人。"',
        out: { kind: 'none' },
        does: '平静地作出安排。',
        read: '没有激情。斯多亚派的智者会选取财富，也会好好使用它，只是不把它当作幸福所系。至于"欢喜"，按斯多亚派的说法，它的对象是真正的善，即德性；如果你为能够正当地使用这笔钱而高兴，那更接近欢喜。',
      },
    ],
    objection: '反驳：这种分析把一切外在的好东西都降为"优先选取之物"。批评者会问：一个人的生活确实因为摆脱了贫困而变好了，难道这不是一种真正的好吗？这涉及斯多亚派和亚里士多德、伊壁鸠鲁派之间最深的分歧（见第三、六部分）。',
  },
];

const STEPS = ['事件', '印象', '检查', '认可或不认可', '结果'] as const;
const ID = 'assent-workshop';
interface Saved {
  sit: string;
  step: number;
  test: Record<string, boolean>;
  pick: Record<string, number>;
}
const INIT: Saved = { sit: 'email', step: 0, test: {}, pick: {} };

export default function AssentWorkshop() {
  const [st, save] = useSaved<Saved>(ID, INIT);
  const s = SITUATIONS.find((x) => x.id === st.sit) ?? SITUATIONS[0];
  const test = st.test[s.id];
  const pick = st.pick[s.id];
  const j = pick !== undefined ? s.judgments[pick] : undefined;
  const can = (i: number) => i <= 2 || (i === 3 && test !== undefined) || (i === 4 && pick !== undefined);
  const go = (i: number) => can(i) && save({ ...st, step: i });
  const passCell = j?.out.kind === 'passion' ? j.out.p : null;

  return (
    <section className="md g4" aria-labelledby="aw-title">
      <header className="md-head">
        <p className="md-tag">一步一步</p>
        <h3 id="aw-title" className="md-title">
          印象与认可：斯多亚派怎样分析一种情感
        </h3>
        <p className="md-lede">
          选一个情境，按斯多亚派的分析走五步：事件、印象、检查、认可或不认可、结果。同一件事，可以有不同的判断；试着回到第四步，换一个判断，看结果怎样变化。
        </p>
      </header>

      <fieldset className="cs-group">
        <legend>情境</legend>
        <Seg
          name="aw-sit"
          value={s.id}
          opts={SITUATIONS.map((x) => [x.id, `${x.zh}（${x.from}）`] as const)}
          onPick={(v) => save({ ...st, sit: v, step: 0 })}
        />
      </fieldset>

      <ol className="lw-steps g4-stepnav" aria-label="步骤">
        {STEPS.map((t, i) => (
          <li key={t}>
            <button
              type="button"
              className={(i === st.step ? 'is-cur' : '') + (i < st.step ? ' is-done' : '')}
              aria-current={i === st.step ? 'step' : undefined}
              disabled={!can(i)}
              onClick={() => go(i)}
            >
              <span className="lw-n">{i + 1}</span> {t}
            </button>
          </li>
        ))}
      </ol>

      <div className="g4-panel" aria-live="polite">
        {st.step === 0 && (
          <>
            <p className="g4-k">外部事件</p>
            <p className="g4-event">{s.event}</p>
            <p className="md-muted">事件本身还不是好或坏。下一步看它在心中留下了什么。</p>
          </>
        )}
        {st.step === 1 && (
          <>
            {s.first && (
              <div className="g4-first">
                <p className="g4-k">第一阵反应（不取决于我们）</p>
                <p>{s.first}</p>
              </div>
            )}
            <p className="g4-k">印象（φαντασία）</p>
            <p className="g4-event">{s.impression}</p>
            <p>
              印象的出现不由我们决定。它还不是判断：心灵可以认可它（"是的，确实如此"），也可以拒绝它，或者暂不判断。在芝诺的手势里，这是"张开的手"（西塞罗《卢库卢斯》145）。
            </p>
            <SrcToggle label="看拉丁原文（盖利乌斯《阿提卡之夜》19.1.15—16）">
              <Src
                src="盖利乌斯《阿提卡之夜》19.1.15—16（罗马时期的转述）"
                lang="la"
                orig="Visa animi, quas φαντασίας philosophi appellant, quibus mens hominis prima statim specie accidentis ad animum rei pellitur, non voluntatis sunt neque arbitrariae, sed vi quadam sua inferunt sese hominibus noscitanda; probationes autem, quas συγκαταθέσεις vocant, quibus eadem visa noscuntur, voluntariae sunt fiuntque hominum arbitratu."
                zh="心灵的印象（哲学家们称为 phantasiai），也就是人的心灵在某件事情一出现时立刻受到的冲击，不取决于意志，也不由人选择，而是凭着它们自己的某种力量，把自己强加给人，让人认识到它们；而认可（他们称为 synkatatheseis），也就是人借以认识这些印象的那种赞同，却是自愿的，由人自己决定。"
              />
            </SrcToggle>
          </>
        )}
        {st.step === 2 && (
          <>
            <p className="g4-k">检查：爱比克泰德的第一个标准</p>
            <fieldset className="cs-group">
              <legend>{s.upToUs.q}</legend>
              <Seg
                name={'aw-test-' + s.id}
                value={test === undefined ? undefined : test ? 'y' : 'n'}
                opts={[
                  ['y', '取决于我'],
                  ['n', '不取决于我'],
                ]}
                onPick={(v) => save({ ...st, test: { ...st.test, [s.id]: v === 'y' } })}
              />
            </fieldset>
            {test !== undefined && (
              <div className="md-feedback">
                <p className="md-fb-k">{test === s.upToUs.a ? '对。' : '爱比克泰德会说：不取决于你。'}</p>
                <p>{s.upToUs.why}</p>
                <SrcToggle label="看希腊原文（爱比克泰德《手册》1.5）">
                  <Src
                    src="爱比克泰德《手册》1.5（罗马时期）"
                    lang="grc"
                    orig="εὐθὺς οὖν πάσῃ φαντασίᾳ τραχείᾳ μελέτα ἐπιλέγειν ὅτι φαντασία εἶ καὶ οὐ πάντως τὸ φαινόμενον. ἔπειτα ἐξέταζε αὐτὴν καὶ δοκίμαζε τοῖς κανόσι τούτοις οἷς ἔχεις, πρώτῳ δὲ τούτῳ καὶ μάλιστα, πότερον περὶ τὰ ἐφʼ ἡμῖν ἐστιν ἢ περὶ τὰ οὐκ ἐφʼ ἡμῖν."
                    zh="所以，对每一个令人难受的印象，都要练习立刻对它说：“你只是一个印象，完全不是那个显现出来的东西本身。”然后，用你所掌握的标准去检查它、考验它，首先、也是最重要的一个标准是：它是关于取决于我们的东西，还是关于不取决于我们的东西？"
                  />
                </SrcToggle>
                <button type="button" className="btn btn--small" onClick={() => go(3)}>
                  下一步：认可或不认可 →
                </button>
              </div>
            )}
          </>
        )}
        {st.step === 3 && (
          <>
            <p className="g4-k">认可（συγκατάθεσις）取决于我们：你认可哪一个判断？</p>
            <Seg
              name={'aw-pick-' + s.id}
              col
              value={pick}
              opts={s.judgments.map((x, i) => [i, x.t] as const)}
              onPick={(i) => save({ ...st, pick: { ...st.pick, [s.id]: i }, step: 4 })}
            />
            <p className="md-muted">在芝诺的手势里，认可是"手指稍稍收拢"。选一个，看斯多亚派会怎样分析由此产生的结果。</p>
          </>
        )}
        {st.step === 4 && j && (
          <>
            <p className="g4-k">你认可的判断</p>
            <p className="g4-event">{j.t}</p>
            <div className="g4-result">
              <p className="md-fb-k">
                {j.out.kind === 'passion'
                  ? `结果：一种激情（πάθος）：${PASS[j.out.p].zh}`
                  : j.out.kind === 'eu'
                    ? `结果：没有激情；接近一种良好的情感：${EU[j.out.e]}`
                    : '结果：没有激情'}
              </p>
              <p>
                <b>可能的反应：</b>
                {j.does}
              </p>
              <p>{j.read}</p>
            </div>
            <table className="g4-grid" aria-label="四种激情：判断关于好还是坏、现在还是将来">
              <thead>
                <tr>
                  <td />
                  <th scope="col">关于（被认为是）好的</th>
                  <th scope="col">关于（被认为是）坏的</th>
                </tr>
              </thead>
              <tbody>
                {(
                  [
                    ['现在', 'pleasure', 'distress'],
                    ['将来', 'desire', 'fear'],
                  ] as [string, Pass, Pass][]
                ).map(([row, a, b]) => (
                  <tr key={row}>
                    <th scope="row">{row}</th>
                    {[a, b].map((p) => (
                      <td key={p} className={passCell === p ? 'is-on' : ''}>
                        {PASS[p].zh} <span lang="grc">{PASS[p].grc}</span>
                        {passCell === p && <b className="g4-here">← 这里</b>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="md-muted">
              良好的情感有三种：欢喜对应快乐，愿望对应欲望，谨慎对应恐惧；痛苦<b>没有</b>对应的良好情感（第欧根尼·拉尔修 7.116）。斯多亚派的目标是"没有基于错误判断的情感"，不是没有情感：他们自己就区分了智者的"没有激情"和坏人的"冷硬、无动于衷"（7.117）。
            </p>
            <div className="g4-objection">
              <p className="md-fb-k">对这一分析的反驳</p>
              <p>{s.objection}</p>
            </div>
            <p>
              <button type="button" className="btn btn--small" onClick={() => go(3)}>
                ← 换一个判断
              </button>
            </p>
            <SrcToggle label="看希腊原文（第欧根尼·拉尔修 7.111、7.116、7.117）">
              <Src
                src="第欧根尼·拉尔修 7.111"
                lang="grc"
                orig="δοκεῖ δʼ αὐτοῖς τὰ πάθη κρίσεις εἶναι, καθά φησι Χρύσιππος ἐν τῷ Περὶ παθῶν· ἥ τε γὰρ φιλαργυρία ὑπόληψίς ἐστι τοῦ τὸ ἀργύριον καλὸν εἶναι."
                zh="他们认为激情是判断，正如克律西波斯在《论激情》中所说的；例如，贪财就是认为“钱是好的”这一看法。"
              />
              <Src src="第欧根尼·拉尔修 7.116" lang="grc" orig="φοβηθήσεσθαι μὲν γὰρ τὸν σοφὸν οὐδαμῶς, εὐλαβηθήσεσθαι δέ." zh="因为智者绝不会恐惧，但会谨慎。" />
              <Src
                src="第欧根尼·拉尔修 7.117"
                lang="grc"
                orig="Φασὶ δὲ καὶ ἀπαθῆ εἶναι τὸν σοφόν, διὰ τὸ ἀνέμπτωτον εἶναι· εἶναι δὲ καὶ ἄλλον ἀπαθῆ τὸν φαῦλον, ἐν ἴσῳ λεγόμενον τῷ σκληρῷ καὶ ἀτέγκτῳ."
                zh="他们说，智者是“没有激情的”，因为他不会陷入（激情）；但也有另一种“没有激情的”人，那就是坏人，这里“没有激情”的意思是冷硬、无动于衷。"
              />
            </SrcToggle>
          </>
        )}
      </div>

      {st.step < 2 && (
        <button type="button" className="btn btn--small" onClick={() => go(st.step + 1)}>
          下一步：{STEPS[st.step + 1]} →
        </button>
      )}
      <p>
        <button type="button" className="md-reset" onClick={() => save(INIT)}>
          恢复初始状态
        </button>
      </p>
      <p className="md-note">
        <b>这是一种古代理论的演示，不是心理辅导，也不是对大脑运作的描述。</b>"事件—印象—认可—激情"是斯多亚派的分析模型，不是被实验证实的心理过程；三个判断和"可能的反应"是本章为了说明而编的，真实的情感往往更复杂。斯多亚派不要求压抑情感：他们要求的是不认可错误的判断。这个理论本身也有严肃的反驳（见正文"对激情理论的反驳"）。正文的材料来自不同时期：激情的定义和分类主要据第欧根尼·拉尔修转述的早期学说，"第一阵反应"和《手册》的练习是罗马时期的说法。
      </p>
    </section>
  );
}
