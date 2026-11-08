import { Gu, Limits, useSaved } from './shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn2/cn2.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import '../cn5/cn5.css';

// 七 · after the paragraph that says the course only consulted catalogue
// information and one review for Ko and Mann. An evidence board with exactly
// four analytical categories (approved by the Product Owner, V16):
//   1. historical normative discourse and debates (defined by what a text
//      does, not by who wrote it: 班昭 and 陆氏 also wrote prescriptions;
//      李贽 and 章学诚 belong here as debate);
//   2. women's own writings and intellectual work;
//   3. historical evidence of women's education and intellectual activity;
//   4. modern historical research and reconstruction.
// Each card has one primary category. Where a source also bears on a second
// category, that column shows a short cross-reference to the card instead of
// a duplicate. Every card carries its metadata (author, gender where
// historically established and relevant, period, source type) and says what
// it supports and what it cannot establish. Nothing goes beyond what the
// chapter's sources show; secondary summaries are marked as such.

const ID = 'women-evidence-board';
type Col = 'norm' | 'voice' | 'act' | 'recon';
interface Saved {
  sel: string | null;
  placed: Record<string, Col | undefined>;
  agents: boolean;
}
const INIT: Saved = { sel: null, placed: {}, agents: false };

const COLS: Record<Col, { name: string; sub: string }> = {
  norm: { name: '历史上的规范性话语与争论', sub: '规定女性应当怎样，或争论女性能够怎样、应当学什么的文本；男女作者都有' },
  voice: { name: '女性自己的写作与思想活动', sub: '女性写下的文字，或被记录下来的她们对经典和学问的见解' },
  act: { name: '女性受教育与从事思想活动的历史证据', sub: '女性实际上读书、写作、教学、结社的记录' },
  recon: { name: '现代历史研究与重建', sub: '现代学者把分散的证据连起来以后得出的图景' },
};

interface Card {
  id: string;
  label: string;
  author: string;
  gender?: '女' | '男';
  period: string;
  type: string;
  src?: string;
  orig?: string;
  best: Col;
  also?: Col;
  alsoWhy?: string;
  can: string;
  cannot: string;
}
const CARDS: Card[] = [
  {
    id: 'nj-beiruo',
    label: '《女诫》"卑弱"',
    author: '班昭',
    gender: '女',
    period: '东汉（约1世纪）',
    type: '女教书：规范性文本',
    src: '《女誡》',
    orig: '臥之牀下，明其卑弱，主下人也。',
    best: 'norm',
    also: 'voice',
    alsoWhy: '这是一位女性自己写下的著作：规范性话语也可以出自女性。',
    can: '班昭认为女性应当怎样；这部书在宋明清被广泛刊印，说明这种看法流行。',
    cannot: '女性实际上怎样生活；连班昭自己的生活也不是这样。',
  },
  {
    id: 'nj-xu',
    label: '《女诫》序："賴母師之典訓"',
    author: '班昭',
    gender: '女',
    period: '东汉（约1世纪）',
    type: '女教书的自序',
    src: '《女誡》',
    orig: '鄙人愚暗，受性不敏，蒙先君之餘寵，賴母師之典訓。',
    best: 'voice',
    also: 'act',
    alsoWhy: '她自己说受过母亲和老师的教导：这也是女性受教育的一条证据。',
    can: '班昭用自己的话说明她受过母亲和老师的教导。',
    cannot: '这是谦辞的格式，不能从中知道她学了什么、学了多久。',
  },
  {
    id: 'hhs',
    label: '《后汉书》：续成《汉书》，马融从她受读',
    author: '《后汉书·列女传》班昭传',
    period: '记东汉事；《后汉书》为南朝宋范晔所撰（5世纪）',
    type: '正史中的人物传记',
    src: '《後漢書·列女傳》',
    orig: '兄固著《漢書》，其八表及天文志未及竟而卒，和帝詔昭就東觀臧書閣踵而成之。',
    best: 'act',
    can: '班昭续成了《汉书》的八表和《天文志》；皇后和贵人以她为师；马融"伏於閣下，從昭受讀"；她给邓太后上过奏疏。',
    cannot: '这些活动在当时的女性中有多普遍：这是一位极不寻常的女性的记录。',
  },
  {
    id: 'chengyi',
    label: '程颐："餓死事極小，失節事極大"',
    author: '程颐',
    gender: '男',
    period: '北宋（11世纪）',
    type: '语录：学生记录的问答',
    src: '《二程遺書·卷二十二》',
    orig: '然餓死事極小，失節事極大。',
    best: 'norm',
    can: '程颐认为寡妇应当怎样；这句话后来是理学家关于女性的言论中最有影响的一句。',
    cannot: '宋代女性实际上怎样（寡妇再嫁并不少见：本课依据的是社会史的一般结论，没有核对具体研究）；也不能把明清的"节烈"风气直接归因于这一句话。',
  },
  {
    id: 'lu-shizi',
    label: '陆氏："婦女只許粗識……數百字"',
    author: '陆氏（温璜之母）',
    gender: '女',
    period: '明末（17世纪）',
    type: '家训，由儿子温璜记录',
    src: '《溫氏母訓》',
    orig: '婦女只許粗識"柴"、"米"、"魚"、"肉"數百字，多識字無益而有損也。',
    best: 'norm',
    also: 'voice',
    alsoWhy: '这是她本人的话（经儿子记录）：一位女性在表达规范。',
    can: '陆氏主张限制女性识字：一位女性也可以是规范的维护者。',
    cannot: '她自己实际上读了多少书：同一部书里，她在考问儿子《论语》。',
  },
  {
    id: 'lu-senan',
    label: '陆氏解释"色难"',
    author: '陆氏（温璜之母）',
    gender: '女',
    period: '明末（17世纪）',
    type: '家训中记录的经典问答',
    src: '《溫氏母訓》',
    orig: '母曰：「依我看來，世間只有兩項人是色難。」',
    best: 'voice',
    also: 'act',
    alsoWhy: '同时记录了一个实际的场景：母亲考问儿子《论语》。',
    can: '她考问儿子《论语》，听完以后提出了自己对经典的解释，而且不同于一般的注释：她是儒家经典的诠释者。',
    cannot: '她是否这样称呼自己；她的话经过儿子的记录和编排。',
  },
  {
    id: 'siku',
    label: '《四库提要》："虽女子之言，特录其书於儒家"',
    author: '四库馆臣',
    gender: '男',
    period: '清乾隆（18世纪）',
    type: '官方书目提要',
    src: '《溫氏母訓》（书前所附提要）',
    orig: '故虽女子之言，特录其书於儒家，示进之也。',
    best: 'norm',
    can: '官方学者把一位女性的教训列入"儒家"类，这在《四库全书》中罕见；推重的理由主要是这部书被看作培养了忠臣节妇的家教。',
    cannot: '陆氏自己的思想有多大分量：提要看重的是名教，不是她对《论语》的解释。',
  },
  {
    id: 'lizhi',
    label: '李贽："謂見有男女豈可乎？"',
    author: '李贽',
    gender: '男',
    period: '晚明（1527—1602）',
    type: '书信（《焚书》）：争论',
    src: '《焚書·卷二》',
    orig: '故謂人有男女則可，謂見有男女豈可乎？',
    best: 'norm',
    can: '当时的人在争论什么：李贽论证见识的长短取决于环境和学习，不取决于性别。',
    cannot: '这种看法被多少人接受：李贽是少数派，被同时代的人看作"异端"；他说的"学道"主要是学佛。',
  },
  {
    id: 'zhang',
    label: '章学诚《妇学》："非惡才也"',
    author: '章学诚',
    gender: '男',
    period: '清中期（1738—1801）',
    type: '论文（《文史通义》）：争论',
    src: '《文史通義·卷五·婦學》',
    orig: '古之婦學，必由禮以通詩，今之婦學，轉因詩而敗禮。',
    best: 'norm',
    also: 'act',
    alsoWhy: '他的批评间接说明，女性写诗、拜师在当时已经相当公开。',
    can: '争论的焦点不是女性是否应当学习，而是学什么、怎样学。',
    cannot: '那些女诗人自己怎样看：这是批评者的描述。',
  },
  {
    id: 'yuanmei',
    label: '袁枚：十三位女士湖楼大会（1790）',
    author: '袁枚',
    gender: '男',
    period: '清乾隆（1790年记事）',
    type: '诗话中的记事',
    src: '《隨園詩話補遺·卷一》',
    orig: '庚戌春，掃墓杭州，女弟子孫碧梧邀女士十三人，大會於湖樓，各以詩畫為贄。',
    best: 'act',
    can: '十八世纪晚期江南上层社会，女性的文学活动已经相当活跃、公开：是孙碧梧邀集了这次聚会。',
    cannot: '一般女性怎样：这些女性都出身富裕的士大夫家庭；袁枚也有宣传自己和女弟子的动机。',
  },
  {
    id: 'wzy-ci',
    label: '王贞仪"次韵"其他女性的词',
    author: '王贞仪',
    gender: '女',
    period: '清中期（1768—1797）',
    type: '她自己的词作（本课据题目）',
    src: '维基文库所收王贞仪词（题目）',
    orig: '《浣溪沙·梅魂次吳小蓮女士韻》《菩薩蠻·惜花次季容女士韻》',
    best: 'voice',
    also: 'act',
    alsoWhy: '题目同时记录了她和其他女性作者之间的唱和往来。',
    can: '她的写作是在和其他女性作者的唱和往来中进行的。',
    cannot: '这种交往有多普遍；她的哲学或科学观点。',
  },
  {
    id: 'wzy-works',
    label: '王贞仪名下的算学和天文著作',
    author: '王贞仪（著作归属）',
    gender: '女',
    period: '清中期（1768—1797）',
    type: '维基文库作者页上的著作目录',
    best: 'act',
    can: '有《術算簡存》《星象圖釋》等算学、天文著作归在她名下。',
    cannot: '她的天文学和数学观点：本课没有读到这些书的正文。"她是天文学家和数学家"只能依据二手的介绍。',
  },
  {
    id: 'ko-mann',
    label: '高彦颐《闺塾师》、曼素恩《缀珍录》',
    author: 'Dorothy Ko、Susan Mann',
    period: '1994、1997',
    type: '现代学术专著（本课只查阅了目录和内容简介）',
    best: 'recon',
    can: '研究的方向：十七世纪江南受教育女性的交往网络；约1683—1839年长江下游女性的写作、学问、工作和宗教生活。',
    cannot: '这两部书的具体论证：本课没有读原书。',
  },
  {
    id: 'furth',
    label: '一篇书评对曼素恩论点的概括',
    author: 'Charlotte Furth',
    period: '2008',
    type: '学术书评（China Perspectives）',
    best: 'recon',
    can: '据这篇书评：上层女性不只是儒家父权秩序的受害者，也可以是这个秩序的积极参与者。这和陆氏的例子相合。',
    cannot: '曼素恩本人的原话：这是对一部书的概括的概括，只能当作进一步阅读的方向。',
  },
];

const AGENTS: { who: string; did: string; src: string }[] = [
  { who: '班昭', did: '续成《汉书》的八表和《天文志》；做皇后和贵人的老师；马融从她学习怎样读《汉书》；就朝政给邓太后上疏；写了《女诫》。', src: '《后汉书·列女传》《女诫》' },
  { who: '陆氏', did: '考问儿子《论语》，并对"色难"提出了自己的解释；她的教训被收入《四库全书》儒家类。', src: '《温氏母训》' },
  { who: '孙碧梧', did: '邀集十三位女士在西湖边聚会，以诗画拜师。', src: '《随园诗话补遗》（袁枚的记录）' },
  { who: '徐裕馨等十三位女士', did: '以诗画为贽；袁枚记下了她们的家世和诗作，徐裕馨"畫法南田，詩吟中、晚"。', src: '《随园诗话补遗》' },
  { who: '王贞仪', did: '和吴小莲、季容、鹤仙夫人、陈宛玉等女性唱和；有算学和天文著作归在她名下（正文本课未读）。', src: '维基文库所收词题和作者页' },
];

function Meta({ c }: { c: Card }) {
  return (
    <dl className="c5-meta">
      <dt>作者</dt>
      <dd>{c.author}</dd>
      {c.gender && (
        <>
          <dt>性别</dt>
          <dd>{c.gender}</dd>
        </>
      )}
      <dt>时代</dt>
      <dd>{c.period}</dd>
      <dt>文献类型</dt>
      <dd>{c.type}</dd>
    </dl>
  );
}

export default function WomenEvidenceBoard() {
  const [st, save] = useSaved<Saved>(ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const sel = CARDS.find((c) => c.id === st.sel) ?? null;
  const placedN = CARDS.filter((c) => st.placed[c.id]).length;
  const tray = CARDS.filter((c) => !st.placed[c.id]);

  const place = (col: Col) => {
    if (!sel) return;
    set({ placed: { ...st.placed, [sel.id]: col }, sel: sel.id });
  };
  const verdict = (c: Card) => {
    const v = st.placed[c.id];
    if (!v) return null;
    return v === c.best ? 'ok' : v === c.also ? 'also' : 'no';
  };
  const pick = (id: string) => set({ sel: st.sel === id ? null : id });
  const cardBtn = (c: Card) => {
    const v = verdict(c);
    return (
      <button
        key={c.id}
        type="button"
        className={'c5-card' + (st.sel === c.id ? ' is-on' : '') + (v === 'ok' || v === 'also' ? ' is-agree' : v === 'no' ? ' is-differ' : '')}
        aria-pressed={st.sel === c.id}
        onClick={() => pick(c.id)}
      >
        {c.label}
        <small>
          {c.author} · {c.period}
          {v === 'ok' ? ' · 和本课一致' : v === 'also' ? ' · 也说得通' : v === 'no' ? ' · 本课放在别处' : ''}
        </small>
      </button>
    );
  };
  // A cross-reference: a placed card whose second category is this column.
  const xrefs = (col: Col) => CARDS.filter((c) => c.also === col && st.placed[c.id] && st.placed[c.id] !== col);

  return (
    <section className="md c3 c5" aria-labelledby="we-title">
      <header className="md-head">
        <p className="md-tag">证据板 · 规范与实际</p>
        <h3 id="we-title" className="md-title">
          女性的学习：每一种证据能说明什么、不能说明什么
        </h3>
        <p className="md-lede">
          先选一张卡片，再点它应当放进的那一类。每张卡片都标明作者、时代和文献类型，并说明它能证明什么、不能证明什么。有些文献同时属于两类：它放在主要的一类，另一类里会出现一条"另见"。这不是一份名人名单：要看的是证据的种类。
        </p>
      </header>

      <p className="c3-layer-k">还没有放的卡片（{tray.length}）</p>
      <div className="c5-tray" role="group" aria-label="还没有放的卡片">
        {tray.length ? tray.map(cardBtn) : <span className="md-muted">全部放好了。</span>}
      </div>

      <div className="c5-board">
        {(Object.keys(COLS) as Col[]).map((k, i) => {
          const xs = xrefs(k);
          return (
            <div key={k} className="c5-col" role="group" aria-label={`第 ${i + 1} 类：${COLS[k].name}`}>
              <button type="button" className="c5-col-head" disabled={!sel} onClick={() => place(k)} aria-label={sel ? `把「${sel.label}」放进第 ${i + 1} 类：${COLS[k].name}` : `第 ${i + 1} 类：${COLS[k].name}`}>
                {i + 1}. {COLS[k].name}
                <small style={{ display: 'block', fontWeight: 400 }}>{COLS[k].sub}</small>
              </button>
              {CARDS.filter((c) => st.placed[c.id] === k).map(cardBtn)}
              {xs.length > 0 && (
                <ul className="c5-xref" aria-label="另见">
                  {xs.map((c) => (
                    <li key={c.id}>
                      <button type="button" className="md-disclose" onClick={() => set({ sel: c.id })}>
                        另见：{c.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
      <p className="md-muted">
        已放 {placedN} / {CARDS.length}。{sel ? `选中了「${sel.label}」：点一类的标题把它放进去，或者再点卡片取消。` : '先选一张卡片。'}
      </p>

      {sel && (
        <div className="md-feedback" aria-live="polite">
          <p className="md-fb-k">
            {sel.label}
            {verdict(sel) && (
              <span className={'c5-verdict ' + (verdict(sel) === 'ok' ? 'c5-verdict--ok' : verdict(sel) === 'also' ? 'c5-verdict--open' : 'c5-verdict--no')} style={{ marginLeft: 8 }}>
                {verdict(sel) === 'ok' ? '和本课一致' : verdict(sel) === 'also' ? '也说得通' : `本课放在"${COLS[sel.best].name}"`}
              </span>
            )}
          </p>
          <Meta c={sel} />
          {sel.orig && <Gu src={sel.src!} orig={sel.orig} />}
          {!sel.orig && sel.src && <p className="pe-src">{sel.src}</p>}
          {st.placed[sel.id] ? (
            <>
              <p>
                本课的放法：{COLS[sel.best].name}
                {sel.also ? `；另见"${COLS[sel.also].name}"：${sel.alsoWhy}` : '。'}
              </p>
              <div className="c3-two">
                <div className="c2-card">
                  <p className="g4-k">能说明</p>
                  <p>{sel.can}</p>
                </div>
                <div className="c2-card c3-card--limit">
                  <p className="g4-k">不能说明</p>
                  <p>{sel.cannot}</p>
                </div>
              </div>
            </>
          ) : (
            <p className="md-muted">把它放进一类以后，会显示它能说明什么、不能说明什么。</p>
          )}
        </div>
      )}

      {placedN === CARDS.length && (
        <div className="md-feedback">
          <p className="md-fb-k">合起来看</p>
          <p>规定女性"应当"怎样的文本，不能直接当作女性"实际"怎样的证据。陆氏一边说女人只该认几百个字，一边考问儿子的《论语》；章学诚一边批评女诗人，一边称赞李清照；班昭一边教导女性卑弱，一边续写《汉书》。这些矛盾不是例外，而是理解这一段历史的关键。</p>
        </div>
      )}

      <p className="c3-layer-k">作为思想主体的女性</p>
      {st.agents ? (
        <ul className="c5-rows" style={{ listStyle: 'none', padding: 0 }}>
          {AGENTS.map((a) => (
            <li key={a.who} className="c5-row">
              <p>
                <b>{a.who}</b>：{a.did}
              </p>
              <p className="pe-src">据：{a.src}</p>
            </li>
          ))}
        </ul>
      ) : (
        <button type="button" className="md-disclose" onClick={() => set({ agents: true })}>
          看本课的证据里，女性自己做了什么
        </button>
      )}

      <Limits>
        <p>四类是按文献的作用来分的，不是按作者的性别：班昭和陆氏也写下了规范性的话；李贽和章学诚的文章属于当时的争论，所以和规范性话语放在同一类。第一类里的文本，说的是"应当"怎样，不能直接当作女性实际生活的证据。</p>
        <p>"性别"只在历史上可以确定、并且和这条证据有关时才标出。"作为思想主体的女性"只列本课的材料直接显示的事情。王贞仪的算学和天文成就、高彦颐和曼素恩的论点，本课没有读原文，所以只写到目录和书评能支持的程度。</p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
