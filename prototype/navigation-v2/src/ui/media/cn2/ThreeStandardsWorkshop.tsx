import { Gu, Seg, SrcToggle, useSaved } from './shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import './cn2.css';

// 二 · after "后果成功，能证明一句话是真的吗？". Four claims: the two the
// chapter reads in the Mozi (no fate, ghosts exist) and the chapter's own two
// (the old well, the night-time firecracker ban). For each, the learner sorts
// the supports into 本 / 原 / 用, decides whether the claim is about what is
// the case or about what to do, and then sees what each standard can and
// cannot establish here, with the objections the chapter raises (Han Feizi,
// 曹公子 in 鲁问, the fatalist's replies reported by SEP). The three
// standards are not presented as a scientific method, nor as three
// independent empirical tests: the 杜伯 case shows 原 resting on 本.

const ID = 'three-standards';
type Biao = 'ben' | 'yuan' | 'yong';
const BIAO: [Biao, string][] = [
  ['ben', '本：圣王之事'],
  ['yuan', '原：耳目之实'],
  ['yong', '用：百姓之利'],
];
const BN: Record<Biao, string> = { ben: '本', yuan: '原', yong: '用' };
type Kind = 'fact' | 'do';

interface Support {
  id: string;
  t: string;
  a: Biao;
  also?: Biao;
  why: string;
}
interface Case {
  id: string;
  label: string;
  claim: string;
  from: string;
  kind: Kind;
  supports: Support[];
  verdict: string;
  objections: string[];
  src?: { src: string; orig: string; zh: string };
}
const CASES: Case[] = [
  {
    id: 'fate',
    label: '没有"命"',
    claim: '贫富、治乱不是命中注定的。',
    from: '《墨子·非命上》',
    kind: 'fact',
    supports: [
      { id: 'jie', t: '桀纣在位天下乱，汤武在位天下治；"此世未易，民未渝"。', a: 'ben', why: '诉诸古代圣王（和暴君）的事迹。结构上像是"只改变一个条件"的比较。' },
      { id: 'book', t: '先王的宪令、刑法、誓辞里，没有"福不可請，禍不可諱"这样的话。', a: 'ben', why: '诉诸权威文献，是"本"的另一种用法。' },
      { id: 'see', t: '从古到今，没有人见过"命"的样子、听过"命"的声音。', a: 'yuan', why: '诉诸众人的耳闻目见。' },
      { id: 'harm', t: '人们相信有命，在上的就不努力治理，在下的就不努力劳作，天下必然穷困混乱。', a: 'yong', why: '看把一种说法付诸实行的后果。' },
    ],
    verdict:
      '这是一个关于"是不是这样"的主张。"本"能提供历史上的对照，但有命论者可以说桀纣失败、汤武成功本身就是命；"原"对一个本来就看不见的东西证明不了多少；"用"最多证明相信有命是有害的，不能证明命不存在。',
    objections: [
      '斯坦福哲学百科的作者指出：有命论者可以说，桀纣失败、汤武成功本身就是命中注定的；"命"本来就不是可以看见、听见的东西，没见过不等于没有；也可以说有的人命中注定勤劳。',
    ],
  },
  {
    id: 'ghost',
    label: '鬼神存在',
    claim: '鬼神存在，并且赏善罚恶。',
    from: '《墨子·明鬼下》',
    kind: 'fact',
    supports: [
      { id: 'du', t: '杜伯的鬼魂在正午射死周宣王，"周人從者莫不見，遠者莫不聞"。', a: 'yuan', also: 'ben', why: '表面上是"原"：几千人同时看见。可是我们并没有这些目击者，只有一部书说"莫不見"。所以这里的"原"其实靠"本"（史书）来支持，两表并不是彼此独立的。' },
      { id: 'chun', t: '这件事"著在周之《春秋》"。', a: 'ben', why: '诉诸可靠的文献记载。' },
      { id: 'good', t: '相信鬼神赏善罚恶，人就不敢作恶，对天下有利。', a: 'yong', why: '看一种说法付诸实行的后果。' },
    ],
    verdict:
      '这是一个关于"有没有"的主张，墨家三表都用。可是"用"在这里不合适：一个信念对社会有用，不能证明它是真的。斯坦福哲学百科说，墨家把"鬼神是否存在"的经验问题和"是否应当这样教"的规范问题混在了一起。',
    objections: [
      '"莫聞莫見，則必以爲無"：太小或太远的东西没有人直接见过，以"有没有人见过"为唯一标准，既会接受太多，也会拒绝太多。',
      '曹公子敬祀鬼神，却家人多死、自己生病；墨子回答鬼神要求的不只是祭品。这在伦理上有道理，但这样一来，无论发生什么结果，理论都可以解释，"用"就很难真正检验"鬼神存在"。',
    ],
    src: {
      src: '《墨子·鲁问》',
      orig: '夫鬼神之所欲於人者多，欲人之處高爵祿則以讓賢也，多財則以分貧也，夫鬼神豈唯擢季拑肺之爲欲哉？',
      zh: '鬼神对人的要求很多，希望人处在高位就把位子让给贤者，财物多了就分给穷人。鬼神难道只是想要祭品吗？',
    },
  },
  {
    id: 'well',
    label: '老井的水（本课设想）',
    claim: '城东那口老井的水可以直接喝。',
    from: '本课设想的例子',
    kind: 'fact',
    supports: [
      { id: 'old', t: '老一辈人一直喝这口井的水。', a: 'ben', why: '诉诸前人的做法。' },
      { id: 'none', t: '许多人喝过，没听说有人喝出病来。', a: 'yuan', why: '诉诸众人的经验。' },
      { id: 'wood', t: '大家都喝这口井的水，可以省下烧水的柴火。', a: 'yong', why: '看后果。' },
    ],
    verdict:
      '这是一个关于"是不是这样"的主张。"本"和"原"提供了一些证据，但都不够：老一辈喝过，不等于水现在没被污染；没听说有人生病，可能只是没人调查。"用"和问题几乎无关。真正需要的是更系统的观察，比如检验水质，而这超出了三表。',
    objections: ['三表没有告诉我们，"耳目之实"怎样才算可靠。'],
  },
  {
    id: 'fire',
    label: '夜间鞭炮（本课设想）',
    claim: '城里应当禁止在夜间燃放鞭炮。',
    from: '本课设想的例子',
    kind: 'do',
    supports: [
      { id: 'other', t: '别的城市有这样的规定，效果不错。', a: 'ben', why: '诉诸先例。' },
      { id: 'noise', t: '很多人被夜间的鞭炮声吵醒过，也有火灾的记录。', a: 'yuan', why: '诉诸众人的经验。' },
      { id: 'gain', t: '禁止以后，睡眠和安全得到改善，但也有人失去了节日的乐趣。', a: 'yong', why: '看后果，而且利弊都要算。' },
    ],
    verdict:
      '这是一个关于"该不该做"的主张，这时"用"成了最关键的标准：一种做法该不该采纳，当然要看它的后果。但利弊要算全，包括荀子会强调的"乐趣"和"文饰"。"本"和"原"在这里为"用"的计算提供材料。',
    objections: ['三表没有告诉我们，三表互相冲突时怎么办。'],
  },
];

interface Saved {
  c: string;
  picks: Record<string, Biao>;
  kind: Record<string, Kind>;
}
const INIT: Saved = { c: 'fate', picks: {}, kind: {} };

export default function ThreeStandardsWorkshop() {
  const [st, save] = useSaved<Saved>(ID, INIT);
  const c = CASES.find((x) => x.id === st.c) ?? CASES[0];
  const done = c.supports.every((s) => st.picks[c.id + '.' + s.id]);
  const k = st.kind[c.id];

  return (
    <section className="md c2" aria-labelledby="ts-title">
      <header className="md-head">
        <p className="md-tag">三表工作坊</p>
        <h3 id="ts-title" className="md-title">
          先例、经验、后果：每一表能证明什么？
        </h3>
        <p className="md-lede">
          选一个主张，把支持它的理由分到"本""原""用"三表；再判断这个主张是关于"是不是这样"，还是关于"该不该做"。然后看每一表在这里能证明什么、证明不了什么。
        </p>
      </header>

      <SrcToggle label="看三表的原文（《非命上》）">
        <Gu
          src="《墨子·非命上》"
          orig="於何本之？上本之於古者聖王之事。於何原之？下原察百姓耳目之實。於何用之？廢以爲刑政，觀其中國家百姓人民之利。此所謂言有三表也。"
          zh="在哪里找它的本？向上，在古代圣王的事迹中找。在哪里找它的原？向下，考察百姓耳闻目见的实情。在哪里看它的用？把它用作刑法政令，看它是否符合国家百姓人民的利益。"
        />
      </SrcToggle>

      <fieldset className="cs-group">
        <legend>主张</legend>
        <Seg name="ts-case" value={st.c} opts={CASES.map((x) => [x.id, x.label] as const)} onPick={(v) => save({ ...st, c: v })} />
      </fieldset>

      <div className="g4-panel">
        <p className="g4-k">{c.from}</p>
        <p className="g4-event">{c.claim}</p>
        {c.supports.map((s) => {
          const key = c.id + '.' + s.id;
          const v = st.picks[key];
          const right = v === s.a || v === s.also;
          return (
            <fieldset key={key} className="cs-group g4-case">
              <legend>{s.t}</legend>
              <Seg name={'ts-' + key} value={v} opts={BIAO} onPick={(b) => save({ ...st, picks: { ...st.picks, [key]: b } })} />
              {v && (
                <div className="md-feedback" aria-live="polite">
                  <p className="md-fb-k">
                    {right ? `对：${BN[v]}。` : `更接近"${BN[s.a]}"。`}
                    {s.also && right && v !== s.a && `（也可以看作"${BN[s.a]}"。）`}
                  </p>
                  <p>{s.why}</p>
                </div>
              )}
            </fieldset>
          );
        })}

        {done && (
          <fieldset className="cs-group">
            <legend>这个主张是关于什么的？</legend>
            <Seg
              name={'ts-kind-' + c.id}
              value={k}
              opts={[
                ['fact', '是不是这样（事实）'],
                ['do', '该不该做（做法）'],
              ]}
              onPick={(v) => save({ ...st, kind: { ...st.kind, [c.id]: v } })}
            />
          </fieldset>
        )}

        {done && k && (
          <div className="md-feedback" aria-live="polite">
            <p className="md-fb-k">{k === c.kind ? '对。' : c.kind === 'fact' ? '它其实是一个关于"是不是这样"的主张。' : '它其实是一个关于"该不该做"的主张。'}</p>
            <p>{c.verdict}</p>
            <table className="g4-table">
              <thead>
                <tr>
                  <th scope="col">表</th>
                  <th scope="col">能提供什么</th>
                  <th scope="col">主要的风险</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">本</th>
                  <td>先例、权威的判断；也被当作历史证据</td>
                  <td>先例可能被选择性地引用；权威之间可能互相矛盾</td>
                </tr>
                <tr>
                  <th scope="row">原</th>
                  <td>关于"有没有"的公共经验</td>
                  <td>报告不等于事实；没见过不等于没有</td>
                </tr>
                <tr className={c.kind === 'do' ? 'is-mine' : undefined}>
                  <th scope="row">用</th>
                  <td>一种做法该不该采纳</td>
                  <td>有用的说法不一定是真的；结果可以被事后解释</td>
                </tr>
              </tbody>
            </table>
            <p className="g4-h">反驳</p>
            <ul className="md-fb-list">
              {c.objections.map((o) => (
                <li key={o}>{o}</li>
              ))}
              <li>
                韩非子对"本"的批评：孔子、墨子都称道尧舜，取舍却不同，"堯、舜不復生，將誰使定儒、墨之誠乎？"两派诉诸同一个权威而结论相反，权威本身就不能裁决。
              </li>
            </ul>
            {c.src && (
              <SrcToggle label={`看原文（${c.src.src}）`}>
                <Gu {...c.src} />
              </SrcToggle>
            )}
          </div>
        )}
      </div>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        恢复初始状态
      </button>
      <p className="md-note">
        <b>这个练习的限度。</b>三表是一套用于公共辩论的判断标准，不是近代意义上的科学方法：第一表诉诸圣王的权威，"原"诉诸的是传闻和史书而不是有控制的观察，"用"把"有利"当作接受一个说法的理由。三表也不是三个彼此独立的经验检验：杜伯的例子中，"原"要靠"本"来支持；鬼神的例子中，"用"被拿来回答一个事实问题。井水和鞭炮两个例子是本课设想的。
      </p>
    </section>
  );
}
