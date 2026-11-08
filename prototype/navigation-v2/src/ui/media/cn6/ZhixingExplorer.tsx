import { Gu, Limits, Seg, useSaved } from './shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn2/cn2.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import '../cn5/cn5.css';

// 五 · after "反驳三：一念即行？". Five elements (knowing, liking/disliking,
// intention, outward action, practical discernment) drawn under four
// readings: the commonsense separation that 徐爱 and 顾东桥 start from, and
// the chapter's strong, cultivation and weak readings. The box marked "行"
// changes with the reading. Five cases are then read under the chosen
// reading. A first check separates "知行合一" from "always acting
// consistently". All quotations are the chapter's own.

const ID = 'zhixing-explorer';
type Rd = 'common' | 'strong' | 'cult' | 'weak';
type Cs = 'xuai' | 'haose' | 'zhishi' | 'yinian' | 'yixiang';
interface Saved {
  pre: 'y' | 'n' | null;
  rd: Rd;
  cs: Cs;
}
const INIT: Saved = { pre: null, rd: 'common', cs: 'xuai' };

const NODES = [
  { id: 'zhi', t: '知', s: '知道（应当孝）' },
  { id: 'hao', t: '好恶', s: '喜欢、厌恶：动机' },
  { id: 'yi', t: '意', s: '意念、念头' },
  { id: 'xing', t: '行', s: '外在的行动' },
  { id: 'jc', t: '明觉精察', s: '做的时候的辨察：实践的判断' },
] as const;
type Nid = (typeof NODES)[number]['id'];

const RD: Record<Rd, { name: string; xing: Nid[]; zhi: Nid[]; claim: string; src?: string; orig?: string; trouble: string }> = {
  common: {
    name: '常识的分开读法',
    zhi: ['zhi'],
    xing: ['xing'],
    claim: '先知道，再想要，再起意，再去做：四步，各是各的。这是徐爱和顾东桥的出发点。',
    trouble: '王阳明认为，这样分开会让人"一念發動，雖是不善，然卻未曾行，便不去禁止"。',
  },
  strong: {
    name: '强读法',
    zhi: ['zhi', 'hao'],
    xing: ['hao', 'yi', 'xing'],
    claim: '真知必然包含行：看见好色时已经喜欢了。"好"算作行，所以在真正的知中，已经有行的开始。',
    src: '《傳習錄·卷上》',
    orig: '未有知而不行者；知而不行，只是未知。',
    trouble: '似乎用定义取消了意志软弱的问题：凡是没做的，都被定义为"不是真知"。',
  },
  cult: {
    name: '修养读法',
    zhi: ['zhi'],
    xing: ['yi', 'xing'],
    claim: '把一个念头当作已经是行，以便在念头上用功。这是"立言宗旨"，一个对治的策略。',
    src: '《傳習錄·卷下》',
    orig: '我今說個『知行合一』，正要人曉得一念發動處，便即是行了；發動處有不善，就將這不善的念克倒了。',
    trouble: '离开语境，可能被反过来误用：用在善念上，就成了"想过就算做过"。',
  },
  weak: {
    name: '弱读法',
    zhi: ['zhi', 'jc'],
    xing: ['xing', 'jc'],
    claim: '知和行是一个工夫的两个方面：知到真切笃实就是行，行到明觉精察就是知。',
    src: '《傳習錄·卷中》',
    orig: '知之真切篤實處即是行，行之明覺精察處即是知，知、行工夫本不可離。',
    trouble: '和朱熹"知、行常相須"的区别变得很小。',
  },
};

const CASES: Record<Cs, { name: string; read: Record<Rd, string> }> = {
  xuai: {
    name: '徐爱：知道应当孝，却不孝',
    read: {
      common: '知和行分明是两件：这正是徐爱的反驳，"便是知與行分明是兩件"。',
      strong: '"此已被私欲隔斷，不是知行的本體了。"他还不是真知。但这样回答，徐爱的问题似乎被定义取消了。',
      cult: '这个读法不去争他算不算"知"；它要他在不孝的念头一起时就克倒它。',
      weak: '他的知还不够"真切笃实"。知行不可分离，但这和朱熹"論先後，知為先；論輕重，行為重"距离不远。',
    },
  },
  haose: {
    name: '见好色，好好色',
    read: {
      common: '先看见，然后决定喜欢：两步。',
      strong: '"只見那好色時，已自好了；不是見了後，又立個心去好。"关键是把"好"算作行。SEP条目的反驳：一个人看到某人很美，不一定因此去追求。',
      cult: '说明念头一动，行就已经开始了，所以要在念头上用功。',
      weak: '知觉和好恶在同一个过程里，不能截然分成先后两截。',
    },
  },
  zhishi: {
    name: '顾东桥："知食乃食"',
    read: {
      common: '知道是食物才去吃，知在先、行在后，哪怕只隔片刻："未有不見是物，先有是事"。',
      strong: '王阳明：先有"欲食之心"，它已经是"行之始"；"食味之美惡，必待入口而後知"。但顾东桥可能回答：我说的是"知道这是食物"，你说的是"知道味道"，这是两种知。',
      cult: '这个读法不直接回答这个反驳：它说的是怎样用功，不是知和行的次序。',
      weak: '知和行交织：有时行反而是知的条件（味道、路的险易）。',
    },
  },
  yinian: {
    name: '一个不善的念头，还没有去做',
    read: {
      common: '没做就没事：这正是王阳明要对治的毛病。',
      strong: '这个读法主要讨论"知而不行"，对"念而未行"说得不多。',
      cult: '"一念發動處，便即是行了"：要把这不善的念头克倒。这是这个读法的核心，也是王阳明的本意。',
      weak: '意念是工夫的一部分；在念头上用功，是行的"明觉精察"。',
    },
  },
  yixiang: {
    name: '"我心里已经想孝顺了，这就是行了"',
    read: {
      common: '心里想不等于做到：这一点常识是对的。',
      strong: '如果真知，必然去孝；只停在"想"，说明还没有真知。强读法不支持这句话。',
      cult: '这是误用：把对治不善念头的说法反过来用在善念上，就成了王阳明最担心的只说不做。离开"立言宗旨"，它就可能被误用。',
      weak: '想孝顺只是"知是行之始"；"行是知之成"，还没有完成。',
    },
  },
};

export default function ZhixingExplorer() {
  const [st, save] = useSaved<Saved>(ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const rd = RD[st.rd] ? st.rd : 'common';
  const r = RD[rd];
  const cs = CASES[st.cs] ? st.cs : 'xuai';

  // layout: five nodes in a row, each labelled with what it counts as
  const X = (i: number) => 22 + i * 100;
  const idx = (id: Nid) => NODES.findIndex((n) => n.id === id);
  const disjoint = rd === 'common';

  return (
    <section className="md c3 c5" aria-labelledby="zx-title">
      <header className="md-head">
        <p className="md-tag">概念结构 · 四种读法</p>
        <h3 id="zx-title" className="md-title">
          知行合一：知、好恶、意、行、明觉精察
        </h3>
        <p className="md-lede">换一种读法，看什么被算作"知"、什么被算作"行"；再用五个案例检验每一种读法。</p>
      </header>

      <div className="c5-row">
        <p>先判断：知行合一的意思是"一个人应当说到做到、言行一致"。</p>
        <Seg
          name="zx-pre"
          label="是否是王阳明的意思"
          value={st.pre}
          opts={[
            ['y', '是王阳明的意思'],
            ['n', '不是'],
          ]}
          onPick={(v) => set({ pre: v })}
        />
        {st.pre && (
          <p aria-live="polite">
            <span className={'c5-verdict ' + (st.pre === 'n' ? 'c5-verdict--ok' : 'c5-verdict--no')}>{st.pre === 'n' ? '和本课一致' : '本课的读法不同'}</span>
            "言行一致"是一句人人同意的道德劝告，用不着辩论。王阳明的主张强得多：真正的知本来就包含行，知道了却不去做，就是还不知道。这是关于"知"的本质的主张，不是"应当始终表现一致"的劝告。
          </p>
        )}
      </div>

      <Seg name="zx-rd" label="选择一种读法" value={rd} opts={(Object.keys(RD) as Rd[]).map((k) => [k, RD[k].name] as const)} onPick={(v) => set({ rd: v })} />

      <svg
        className="c5-fig"
        viewBox="0 0 520 180"
        aria-label={`${r.name}：算作知的是 ${r.zhi.map((i) => NODES[idx(i)].t).join('、')}；算作行的是 ${r.xing.map((i) => NODES[idx(i)].t).join('、')}。`}
      >
        {NODES.map((n, i) => {
          const inZ = (r.zhi as readonly string[]).includes(n.id);
          const inX = (r.xing as readonly string[]).includes(n.id);
          return (
            <g key={n.id}>
              <rect x={X(i)} y={30} width={76} height={56} className={inZ && inX ? 'c5-hot' : inZ || inX ? 'c5-thick' : 'c5-thin c5-dash'} style={{ fill: '#fff' }} />
              <text x={X(i) + 38} y={64} textAnchor="middle" className="c5-label">
                {n.t}
              </text>
              <text x={X(i) + 38} y={128} textAnchor="middle" className="c5-label">
                {inZ && inX ? '知 · 行' : inZ ? '知' : inX ? '行' : '—'}
              </text>
              <text x={X(i) + 38} y={144} textAnchor="middle" className="c5-small">
                {inZ && inX ? '既是知也是行' : inZ ? '算作知' : inX ? '算作行' : '不单独算'}
              </text>
            </g>
          );
        })}
        {disjoint && (
          <text x={260} y={170} textAnchor="middle" className="c5-small">
            一步接一步：知 → 好恶 → 意 → 行
          </text>
        )}
      </svg>
      <ul className="md-muted" aria-label="五个要素" style={{ display: 'grid', gap: 2, margin: '4px 0 10px', padding: 0, listStyle: 'none' }}>
        {NODES.map((n) => (
          <li key={n.id}>
            <b>{n.t}</b>：{n.s}
          </li>
        ))}
      </ul>

      <div className="c3-two">
        <div className="c2-card">
          <p className="g4-k">{r.name}说什么</p>
          <p>{r.claim}</p>
          {r.orig && <Gu src={r.src!} orig={r.orig} />}
        </div>
        <div className="c2-card c3-card--limit">
          <p className="g4-k">主要困难</p>
          <p>{r.trouble}</p>
        </div>
      </div>

      <p className="c3-layer-k">用案例检验这种读法</p>
      <div className="c5-chips" role="group" aria-label="选择一个案例">
        {(Object.keys(CASES) as Cs[]).map((k) => (
          <button key={k} type="button" className={'c5-chip' + (cs === k ? ' is-on' : '')} aria-pressed={cs === k} onClick={() => set({ cs: k })}>
            {CASES[k].name}
          </button>
        ))}
      </div>
      <div className="md-feedback" aria-live="polite">
        <p className="md-fb-k">
          {CASES[cs].name} · 按{r.name}
        </p>
        <p>{CASES[cs].read[rd]}</p>
      </div>
      <p className="md-muted">换一种读法，同一个案例的结论会变。理解这场争论的关键，是分清王阳明在什么时候说的是哪一种。</p>

      <Limits>
        <p>"常识的分开读法"是徐爱、顾东桥提问的出发点，不是一个有名的学派。三种读法是本课的整理：王阳明自己没有这样分，他在不同的场合、对不同的人说了不同的话。</p>
        <p>图中的方框是为了比较而画的要素，不表示心中真有五个分开的部分。"明觉精察"在弱读法中同时属于知和行，这正是那句话的意思。</p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
