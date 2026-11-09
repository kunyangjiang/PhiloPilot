import { Band, Claim, Limits, Seg, Src, Tag, useSavedIx, Verdict } from './shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import '../cn5/cn5.css';
import '../cn7/cn7.css';
import '../in2/ip.css';
import './in4.css';

// 五 · after "接着，寂天回答" (the end of the 识的究竟地位 section).
// 1. 藏识: seeds and the stream (Triṃś 2, 4, 5), what happens at arhatship, and a
//    prediction table against the Upaniṣadic ātman. It is not an eternal soul;
//    the functional question the chapter leaves open is kept open.
// 2. 三自性 with the conjured elephant (TSN 27–28; authorship contested), and
//    where the metaphor stops.
// 3. The ultimate status of consciousness: the five positions (SEP) and two
//    passages to place; no verdict.
// Every verse and reading is the chapter's own (五、, notes 71–89).

const ID = 'three-natures';

type Tab = 'alaya' | 'nature' | 'status';
const TABS: [Tab, string][] = [
  ['alaya', '藏识与种子'],
  ['nature', '三自性'],
  ['status', '识的究竟地位'],
];

type Like = 'like' | 'unlike';
type RowK = 'perm' | 'svabhava' | 'liberation' | 'person' | 'role';
const ROWS: { k: RowK; t: string; atman: string; alaya: string; ans: Like | 'open'; fb: string }[] = [
  { k: 'perm', t: '是否常住', atman: '常住不变', alaya: '刹那生灭，像河流', ans: 'unlike', fb: '《三十颂》第 4 颂：它像激流一样流动。' },
  { k: 'svabhava', t: '是否有自性', atman: '是真正的实在', alaya: '依他起，没有自性', ans: 'unlike', fb: '藏识属于依他起，见"三自性"一页。' },
  { k: 'liberation', t: '解脱时', atman: '被认识、被实现', alaya: '被舍弃（"转依"）', ans: 'unlike', fb: '《三十颂》第 5 颂：在阿罗汉位，它被舍弃。' },
  { k: 'person', t: '与个人的关系', atman: '每个人真正的本质', alaya: '每个心识之流有自己的藏识；"我"的观念是末那识对它的误认', ans: 'unlike', fb: '把藏识当作"我"的，正是末那识；它总是伴随我见、我痴、我慢、我爱（第 5—6 颂）。' },
  { k: 'role', t: '作用', atman: '认识者、见证者', alaya: '保存种子；保证业与果的连续', ans: 'open', fb: '这一行不能简单地说"像"或"不像"：藏识承担了通常归于自我的连续性和业报。批评者仍然可以追问，它和"自我"在功能上的差别究竟有多大。本章把这个问题留着。' },
];

type Nature = 'parikalpita' | 'paratantra' | 'parinispanna';
const NATURES: [Nature, string][] = [
  ['parikalpita', '遍计所执性（parikalpita）'],
  ['paratantra', '依他起性（paratantra）'],
  ['parinispanna', '圆成实性（pariniṣpanna）'],
];
const SCENE: { see: string; ans: Nature; has: string }[] = [
  { see: '"一头真的象站在那里"', ans: 'parikalpita', has: '什么都没有；象完全不存在' },
  { see: '"一个象的形相在那里显现"', ans: 'paratantra', has: '有一个显现，它依赖咒语和木头而生起' },
  { see: '"那个形相中没有象"', ans: 'parinispanna', has: '有"象的不存在"这一事实；认识到它就是解脱' },
];

type Pos = 'base' | 'sakara' | 'nirakara' | 'madhyamaka' | 'synthesis';
const POS: { k: Pos; t: string; who: string; view: string }[] = [
  { k: 'base', t: '依他起是"空的所在"', who: '《辨中边论》颂；《三十颂》的标准读法', view: '虚妄分别的心识是有的，它是空性的基础' },
  { k: 'sakara', t: '"有相"唯识（sākāra）', who: '后期的智吉祥友等', view: '心识中显现的形相是真实的' },
  { k: 'nirakara', t: '"无相"唯识（nirākāra）', who: '后期的宝寂等', view: '形相是虚假的，只有无形相的纯粹心识是真实的' },
  { k: 'madhyamaka', t: '中观派的批评', who: '寂天《入菩萨行论》第九品', view: '心识也没有自性，不能自己认识自己' },
  { k: 'synthesis', t: '中观与瑜伽行的综合', who: '寂护、莲花戒（八世纪）', view: '在世俗层次上接受唯识，在胜义层次上连心识也是空的' },
];
const PASSAGES: { k: 'mav' | 'bca'; src: string; orig: string; zh: string; ans: Pos }[] = [
  {
    k: 'mav',
    src: '《辨中边论》颂，第 1 品',
    orig: "abhūtaparikalpo 'sti dvayaṃ tatra na vidyate / śūnyatā vidyate tvatra tasyāmapi sa vidyate //",
    zh: '虚妄分别是有的；在它之中，二（能取和所取）是没有的；在它之中，空性是有的；在空性之中，它也是有的。',
    ans: 'base',
  },
  {
    k: 'bca',
    src: '寂天《入菩萨行论》9.17—9.18 前半',
    orig: 'cittameva yadā māyā tadā kiṃ kena dṛśyate / uktaṃ ca lokanāthena cittaṃ cittaṃ na paśyati // na cchinatti yathātmānam asidhārā tathā manaḥ',
    zh: '如果心本身就是幻象，那么是什么、被什么看见呢？世间的保护者（佛陀）也说过：心不见心。就像刀刃不能割它自己，心也是这样。',
    ans: 'madhyamaka',
  },
];

interface Saved {
  tab: Tab;
  arhat: boolean;
  pred: Partial<Record<RowK, Like>>;
  map: Partial<Record<number, Nature>>;
  place: { mav?: Pos; bca?: Pos };
}
const INIT: Saved = { tab: 'alaya', arhat: false, pred: {}, map: {}, place: {} };

function Stream({ arhat }: { arhat: boolean }) {
  const xs = [4, 108, 212, 316, 420];
  return (
    <figure className="ix-fig">
      <figcaption className="md-muted">藏识：保存一切种子，像激流一样流动（第 2、4 颂）</figcaption>
      <svg className="ix-line" viewBox="0 0 510 64" role="img" aria-label={arhat ? '阿罗汉位：藏识之流被舍弃，末那识不再把它执为我' : '藏识像激流一样，一刹那接一刹那地流动；末那识把这条流执为我'}>
        <line className="ix-axis" x1="0" y1="24" x2="510" y2="24" />
        {xs.map((x, i) => (
          <g key={x} className={'ix-node' + (arhat && i >= 3 ? ' is-dash' : '')}>
            <rect x={x} y={4} width={86} height={40} rx={2} />
            <text className="ix-big" x={x + 43} y={30} textAnchor="middle">
              {arhat && i >= 3 ? '舍弃' : `刹那 ${i + 1}`}
            </text>
          </g>
        ))}
        <path className={'ix-link' + (arhat ? '' : ' is-bad')} d="M 47 56 C 170 46, 340 46, 463 56" />
      </svg>
      <p className="md-muted">{arhat ? '末那识在阿罗汉位不起作用（第 7 颂）；藏识被舍弃（第 5 颂）。' : '虚线弧：末那识把这条流执着为"我"（第 5—7 颂）。'}</p>
    </figure>
  );
}

export default function ThreeNatures() {
  const [st, save] = useSavedIx<Saved>('IN4', ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const pred = st.pred ?? {};
  const map = st.map ?? {};
  const place = st.place ?? {};

  return (
    <section className="md c3 c5" aria-labelledby="tn-title">
      <header className="md-head">
        <p className="md-tag">藏识与三自性 · 探索</p>
        <h3 id="tn-title" className="md-title">
          藏识、三自性，以及心识的地位
        </h3>
        <p className="md-lede">三页可以按任意顺序看。第一页看藏识怎样保存种子、保证连续，以及它为什么不是一个永恒的灵魂；第二页用"幻术变出的象"对照三自性；第三页把关于心识究竟地位的几种立场并列出来，不作裁决。</p>
      </header>
      <Seg name="tn-tab" label="选择一页" value={st.tab} opts={TABS} onPick={(v) => set({ tab: v })} />

      {st.tab === 'alaya' && (
        <div>
          <Band>一 · 种子与激流</Band>
          <Src
            src="世亲《唯识三十颂》第 2 颂"
            lang="sa"
            orig="vipāko mananākhyaśca vijñaptirviṣayasya ca / tatrālayākhyaṃ vijñānaṃ vipākaḥ sarvabījakam //"
            zh="（三种变化是：）异熟，名为“思量”的（识），以及对境的了别。其中，名为“藏”的识，是异熟，含有一切种子。"
          />
          <ol className="ix-steps">
            <li>过去的行为在藏识中留下"种子"（bīja）。</li>
            <li>藏识一刹那接一刹那地流动，种子随之相续。</li>
            <li>种子成熟（"异熟"，vipāka），产生新的经验。</li>
            <li>出灭尽定以后，心识从这个没有中断的来源接上。<Tag b="scholar" who="SEP：现代学者对这一概念来源的推测" /></li>
          </ol>
          <Stream arhat={!!st.arhat} />
          <button type="button" className="md-disclose" aria-pressed={!!st.arhat} onClick={() => set({ arhat: !st.arhat })}>
            {st.arhat ? '回到未解脱的心识之流' : '看阿罗汉位会发生什么'}
          </button>
          {st.arhat ? (
            <Src src="世亲《唯识三十颂》第 5 颂开头" lang="sa" orig="tasya vyāvṛtirarhatve" zh="在阿罗汉位，它被舍弃。" />
          ) : (
            <Src src="世亲《唯识三十颂》第 4 颂后半" lang="sa" orig="tathā sparśādayastacca vartate srotasaughavat //" zh="……触等（心所）也是这样；它像激流一样流动。" />
          )}

          <Band>二 · 藏识是不是换了名字的自我？</Band>
          <p>先预测，再对照：在每一点上，藏识像不像《奥义书》中的自我（ātman）？</p>
          {ROWS.map((r) => {
            const p = pred[r.k];
            return (
              <div key={r.k} className="c5-row">
                <p>
                  <b>{r.t}</b>　自我：{r.atman}
                </p>
                <Seg
                  name={'tn-pred-' + r.k}
                  label={r.t + '：藏识像不像自我'}
                  value={p ?? null}
                  opts={[
                    ['like', '像'],
                    ['unlike', '不像'],
                  ]}
                  onPick={(v) => set({ pred: { ...pred, [r.k]: v } })}
                />
                {p && (
                  <p className="md-feedback" aria-live="polite">
                    {r.ans === 'open' ? <span className="c5-verdict c5-verdict--open">问题仍然开放</span> : <Verdict ok={p === r.ans} yes="与《三十颂》一致" no="与《三十颂》不一致" />}
                    藏识：{r.alaya}。{r.fb} <Tag b="course" who="本章的整理" />
                  </p>
                )}
              </div>
            );
          })}
          <Src
            src="安慧《唯识三十颂释》引，据说出自《解深密经》"
            lang="sa"
            orig="ādānavijñāna gabhīrasūkṣmo ogho yathā vartati sarvabījo | bālāna eṣo mayi na prakāśi mā haiva ātmā parikalpayeyur"
            zh="执持识深而细微，含有一切种子，像激流一样流动。我没有向愚者宣说它，唯恐他们把它妄想为“我”。"
          />
          <Claim b="course">藏识不是一个永恒的灵魂：它刹那生灭，在解脱时被舍弃；"藏识是自我"这个想法，在体系中被解释为末那识的错误。但它在功能上承担了连续性，这一点上批评者的追问仍然成立。</Claim>
        </div>
      )}

      {st.tab === 'nature' && (
        <div>
          <Band>一 · 《三十颂》的定义</Band>
          <Src
            src="世亲《唯识三十颂》第 20 颂"
            lang="sa"
            orig="yena yena vikalpena yadyad vastu vikalpyate / parikalpita evāsau svabhāvo na sa vidyate //"
            zh="凡是被某种分别所分别的事物，它就是“遍计所执”的自性；它并不存在。"
          />
          <Src
            src="世亲《唯识三十颂》第 21 颂"
            lang="sa"
            orig="paratantrasvabhāvastu vikalpaḥ pratyayodbhavaḥ / niṣpannastasya pūrveṇa sadā rahitatā tu yā //"
            zh="而“依他起”的自性，是由条件生起的分别；“圆成实”（的自性），是它永远远离前者（的状态）。"
          />
          <Band>二 · 幻术变出的象</Band>
          <Src
            src="《三自性论》第 27 颂"
            lang="sa"
            orig="māyākṛtaṃ mantravaśāt khyāti hastyātmanā yathā / ākāramātraṃ tatrāsti hastī nāsti tu sarvathā //"
            zh="就像幻术师借着咒语的力量变出的东西，显现为一头象：那里只有一个形相，而象是完全没有的。"
          />
          <p className="md-muted">
            《三自性论》归于世亲，作者归属有争论；这里引它是因为比喻最清楚，不把它当作确定的世亲著作。 <Tag b="scholar" />
          </p>
          <p>观众看到的三个层次，各对应哪一种自性？</p>
          {SCENE.map((s, i) => {
            const m = map[i];
            return (
              <div key={s.see} className="c5-row">
                <p>
                  <b>{s.see}</b>
                </p>
                <Seg name={'tn-map-' + i} label={s.see + '对应哪一种自性'} col value={m ?? null} opts={NATURES} onPick={(v) => set({ map: { ...map, [i]: v } })} />
                {m && (
                  <p className="md-feedback" aria-live="polite">
                    <Verdict ok={m === s.ans} yes="与《三自性论》第 28 颂一致" no="与第 28 颂不一致" />
                    {m !== s.ans && `第 28 颂把它对应于${NATURES.find(([k]) => k === s.ans)![1]}。`}这个层次上有：{s.has}。
                  </p>
                )}
              </div>
            );
          })}
          {SCENE.every((_, i) => map[i]) && (
            <Src
              src="《三自性论》第 28 颂"
              lang="sa"
              orig="svabhāvaḥ kalpito hastī paratantrastadākṛtiḥ / yastatra hastyabhāvo 'sau pariniṣpanna iṣyate //"
              zh="遍计所执性是那头象；依他起性是那个形相；在那里象的不存在，被认为是圆成实性。"
            />
          )}
          <Claim b="course">三自性不是三种不同的东西，而是同一个东西的三个方面：圆成实性不是在依他起之外另找一个东西，而是看清依他起中没有遍计所执的东西。</Claim>
          <Claim b="course" who="比喻的限度">幻术的观众之外，还有一位知道真相的幻术师和一块真的木头；而在瑜伽行派的理论中，并没有一个站在一切显现之外的观察者。</Claim>
          <Claim b="text" who="《三十颂》第 23—25 颂">"三无自性"：遍计所执是相无自性，依他起是生无自性，圆成实是胜义无自性。瑜伽行派以此说明三自性与"一切法无自性"并不冲突。</Claim>
        </div>
      )}

      {st.tab === 'status' && (
        <div>
          <Band>一 · 五种立场</Band>
          <table className="ip-sort">
            <caption className="visually-hidden">识的究竟地位：五种立场</caption>
            <thead>
              <tr>
                <th scope="col">立场</th>
                <th scope="col">代表（据 SEP）</th>
                <th scope="col">对心识的看法</th>
              </tr>
            </thead>
            <tbody>
              {POS.map((p) => (
                <tr key={p.k}>
                  <td>{p.t}</td>
                  <td>{p.who}</td>
                  <td>{p.view}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="md-muted">
            五种立场的并列是学派层面的整理。 <Tag b="school" who="本章据 SEP 瑜伽行派条目" />
          </p>
          <Band>二 · 把两段原文放到表中</Band>
          {PASSAGES.map((ps) => {
            const v = place[ps.k];
            return (
              <div key={ps.k} className="c5-row">
                <Src src={ps.src} lang="sa" orig={ps.orig} zh={ps.zh} />
                <Seg name={'tn-place-' + ps.k} label={ps.src + '属于哪一种立场'} col value={v ?? null} opts={POS.map((p) => [p.k, p.t] as const)} onPick={(x) => set({ place: { ...place, [ps.k]: x } })} />
                {v && (
                  <p className="md-feedback" aria-live="polite">
                    <Verdict ok={v === ps.ans} yes="与本章的对照一致" no="与本章的对照不一致" />
                    {v !== ps.ans && `本章把它放在「${POS.find((p) => p.k === ps.ans)!.t}」一行。`}
                    {ps.k === 'mav'
                      ? '这一颂肯定"虚妄分别是有的"，"空性是有的"：必须有某种东西是空的"所在"，否则"空"就没有着落。现代学者常把这种理解描述为一种"基础主义"。'
                      : '寂天的批评是：要求心识能认识自己，本身就把心识当作一个有自性的东西了。他还回答了"灯照亮自己"的比喻（9.19）。'}
                  </p>
                )}
              </div>
            );
          })}
          <Band>三 · 留下的问题</Band>
          <Claim b="school" who="SEP">《瑜伽师地论》大部分内容并没有"唯识"的学说，它的存在论基本上是实在论的；"瑜伽行派"这个名称下的文献，并不共有一个完全相同的存在论。</Claim>
          <p className="md-fb-k">瑜伽行派说"心识是有的"，中观派说"连心识也是空的"：这两种说法是否一定冲突？寂护的综合是否公平地对待了双方？</p>
          <p className="md-muted">这个问题无论在瑜伽行派内部还是外部都有争论；本章不作裁决，这里也不给答案。</p>
        </div>
      )}

      <Limits>
        <p>这不是一张"阿赖耶识即灵魂"或"唯识即唯心"的结论卡。预测和对应只核对它们与《三十颂》《三自性论》的说法是否一致；"作用"一行和心识的究竟地位，本章都留作开放的问题。</p>
        <p>八识的数目、种子的细节在这里只取《三十颂》中读过的部分；后来中国唯识学的发展属于《中国佛教哲学》。</p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
