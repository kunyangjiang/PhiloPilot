import { Band, Claim, Limits, Seg, Src, Tag, useSavedIn, type Basis } from './shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import '../cn5/cn5.css';
import '../cn7/cn7.css';
import './ip.css';

// 四 · after 法的分类 (the paragraph 本章不要求读者记住这些数目).
// Three classification schemes, each used on its own terms:
//   上座部 (the commentarial four), 说一切有部 (five groups), 《俱舍论》6.4 (世俗有 / 胜义有).
// The comparison at the end sets the three answers side by side; it is not a
// merged ontology. An item appears under a scheme only where the chapter (or a
// verse it cites) says where it goes; otherwise it is marked "not discussed".

const ID = 'abhidharma-lab';

type Scheme = 'thera' | 'sarva' | 'ak64';
const SCHEMES: [Scheme, string][] = [
  ['thera', '上座部：四类'],
  ['sarva', '说一切有部：五类'],
  ['ak64', '《俱舍论》6.4：两种存在'],
];
const CATS: Record<Scheme, [string, string][]> = {
  thera: [
    ['citta', '心（citta）'],
    ['cetasika', '心所（cetasika）'],
    ['rupa', '色（rūpa）'],
    ['nibbana', '涅槃（nibbāna）'],
    ['none', '不是最高意义上的东西'],
  ],
  sarva: [
    ['rupa', '色法'],
    ['citta', '心法'],
    ['caitta', '心所法'],
    ['viprayukta', '心不相应行法'],
    ['asamskrta', '无为法'],
    ['none', '不是一法，是诸法的集合'],
  ],
  ak64: [
    ['samvrti', '世俗有'],
    ['paramartha', '胜义有'],
  ],
};
const SCHEME_NOTE: Record<Scheme, { b: Basis; t: string }> = {
  thera: { b: 'school', t: '按照上座部注释传统的整理，有四类最高意义上存在的东西。前三类是有为的，生起又消失；涅槃是唯一的无为法。' },
  sarva: { b: 'school', t: '五类七十五法：色法十一种，心法一种，心所法四十六种，心不相应行法十四种，无为法三种。"七十五"是后来的整理，各论书的数目和归类有差异。' },
  ak64: { b: 'text', t: '标准有两种情况：被打碎以后，或者在心中把其他的法排除以后，对它的认识就不再生起的，是世俗有；与此相反的，是胜义有。' },
};

interface Ans {
  k: string;
  b: Basis;
  why: string;
}
interface Item {
  id: string;
  t: string;
  a: Partial<Record<Scheme, Ans>>;
  out?: Partial<Record<Scheme, string>>;
}
const ITEMS: Item[] = [
  {
    id: 'pot',
    t: '一个瓶子',
    a: {
      thera: { k: 'none', b: 'school', why: '阿毗达磨把"人"、"车"、"森林"这些说法分析成诸法的生起和消失；瓶子也是这样的说法。' },
      sarva: { k: 'none', b: 'course', why: '瓶子不在五类之中，它是由诸法构成的。' },
      ak64: { k: 'samvrti', b: 'text', why: '世亲的例子：瓶子打成碎片以后，就不再有"瓶子"的认识。' },
    },
  },
  {
    id: 'water',
    t: '水',
    a: {
      ak64: { k: 'samvrti', b: 'text', why: '水不能"打碎"，但在心中把颜色、气味等其他的法一一排除，就不再有"水"的认识了。这是标准的第二种情况。' },
    },
    out: { thera: '本章没有讨论水在上座部的分类中怎样分析。', sarva: '本章没有讨论水在说一切有部的分类中怎样分析。' },
  },
  {
    id: 'naga',
    t: '那先这个人',
    a: {
      thera: { k: 'none', b: 'text', why: '《弥兰王问经》："在最高意义上，这里找不到人"；"那先"是依靠五蕴而有的称呼。' },
      sarva: { k: 'none', b: 'course', why: '五类之中没有"人"；人依五蕴而施设。' },
      ak64: { k: 'samvrti', b: 'text', why: '本章的对照表把"车、人"和瓶子、水一起列为世俗有。世俗有不等于不存在。' },
    },
  },
  {
    id: 'colour',
    t: '一个刹那的颜色',
    a: {
      thera: { k: 'rupa', b: 'common', why: '色（rūpa）是物质要素这一类；颜色归在这一类，是通常的概述，本章没有核对具体的列表。' },
      sarva: { k: 'rupa', b: 'common', why: '色法十一种；颜色归在色法，是通常的概述，本章没有列出这十一种。' },
      ak64: { k: 'paramartha', b: 'text', why: '颜色即使被分析到极微，即使在心中把味道等其他法排除，对颜色本身的认识仍然生起。' },
    },
  },
  {
    id: 'feeling',
    t: '一个刹那的感受（受）',
    a: {
      thera: { k: 'cetasika', b: 'school', why: '愤怒的那一刻，是一个识和与它相应的感受、想、意图、嗔一起生起；感受是与心一起生起的心理要素。' },
      sarva: { k: 'caitta', b: 'common', why: '受归在心所法，是通常的概述；本章没有列出四十六种心所。' },
      ak64: { k: 'paramartha', b: 'text', why: '世亲说，受等心理的法和颜色一样，是胜义有。' },
    },
  },
  {
    id: 'cetana',
    t: '一个刹那的意图',
    a: {
      thera: { k: 'cetasika', b: 'school', why: '和感受一样，意图是与识一起生起的心理要素（本章愤怒的例子）。' },
      sarva: { k: 'caitta', b: 'common', why: '意图归在心所法，是通常的概述，本章没有核对列表。' },
      ak64: { k: 'paramartha', b: 'course', why: '按世亲"受等心理的法"的说法推出；本章没有单独引用关于意图的句子。' },
    },
  },
  {
    id: 'citta',
    t: '一个刹那的识',
    a: {
      thera: { k: 'citta', b: 'school', why: '心（citta）是四类中的第一类。' },
      sarva: { k: 'citta', b: 'text', why: '《俱舍论》2.34："心、意、识，是同一个意思"（cittaṃ mano \'tha vijñānamekārthaṃ）。颂文只说这三个词同义；所以五位中的心法只算一类，这是本课据此作的说明。' },
      ak64: { k: 'paramartha', b: 'course', why: '按"受等心理的法"的说法推出。' },
    },
  },
  {
    id: 'nibbana',
    t: '涅槃',
    a: {
      thera: { k: 'nibbana', b: 'school', why: '涅槃是四类之一，也是上座部唯一的无为法。' },
      sarva: { k: 'asamskrta', b: 'common', why: '无为法有三种（《俱舍论》1.5：虚空和两种灭）；涅槃通常被等同于其中的"择灭"，本章没有核对这一等同的原文。' },
    },
    out: { ak64: '本章没有讨论 6.4 的标准怎样用在无为法上。' },
  },
  {
    id: 'prapti',
    t: '"得"（prāpti）',
    a: {
      sarva: { k: 'viprayukta', b: 'text', why: '《俱舍论》2.35 列出的心不相应行，第一个就是"得"和"非得"（prāptyaprāptī）。' },
    },
    out: { thera: '"心不相应行法"这一类在经中和上座部的列表中都没有。这正是两派终点不同的一个例子。', ak64: '本章没有讨论 6.4 的标准怎样用在"得"上。' },
  },
  {
    id: 'space',
    t: '虚空（ākāśa）',
    a: {
      sarva: { k: 'asamskrta', b: 'text', why: '《俱舍论》1.5：三种无为法是虚空和两种灭（ākāśaṃ dvau nirodhau ca）。' },
    },
    out: { thera: '上座部只有涅槃是无为法；虚空归在哪里，本章没有讨论。', ak64: '本章没有讨论 6.4 的标准怎样用在虚空上。' },
  },
];

interface Saved {
  scheme: Scheme;
  pick: Record<string, string | undefined>;
  checked: Partial<Record<Scheme, boolean>>;
  compare: boolean;
}
const INIT: Saved = { scheme: 'thera', pick: {}, checked: {}, compare: false };

const label = (s: Scheme, k: string) => CATS[s].find((c) => c[0] === k)?.[1] ?? k;

export default function AbhidharmaLab() {
  const [st, save] = useSavedIn<Saved>('IN2', ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const s = st.scheme;
  const items = ITEMS.filter((it) => it.a[s]);
  const outs = ITEMS.filter((it) => !it.a[s] && it.out?.[s]);
  const checked = !!st.checked?.[s];
  const key = (id: string) => `${s}:${id}`;
  const all = items.every((it) => st.pick[key(it.id)]);
  const right = items.filter((it) => st.pick[key(it.id)] === it.a[s]!.k).length;

  return (
    <section className="md c3 c5" aria-labelledby="ab-title">
      <header className="md-head">
        <p className="md-tag">阿毗达磨 · 三种分法</p>
        <h3 id="ab-title" className="md-title">
          分析到哪里为止？三种分法，分开来用
        </h3>
        <p className="md-lede">同一组东西，用上座部的四类、说一切有部的五类、《俱舍论》6.4 的世俗有与胜义有，分别归类。三种分法各有各的标准，不能合成一张"总表"。最后再把三种答案并排对照，看两派的终点在哪里不同。</p>
      </header>

      <Band>一 · 选一种分法</Band>
      <Seg name="ab-scheme" label="选择一种分法" value={s} opts={SCHEMES} onPick={(v) => set({ scheme: v })} />
      <Claim b={SCHEME_NOTE[s].b}>{SCHEME_NOTE[s].t}</Claim>
      {s === 'ak64' && <Src src="《俱舍论》6.4" lang="sa" orig="yatra bhinnena tadbuddhiranyāpohe dhiyā ca tat / ghaṭārthavatsaṃvṛtisat paramārthasadanyathā //" zh="一个东西，如果被打碎以后，或者在心中把其他的（法）排除掉以后，对它的认识就不再生起，那么它就像瓶子和水一样，是世俗有；与此相反的，是胜义有。" />}
      {s === 'sarva' && <Src src="《俱舍论》2.35" lang="sa" orig="viprayuktāstu saṃskārāḥ prāptyaprāptī sabhāgatā / āsaṃjñikaṃ samāpattī jīvitaṃ lakṣaṇāni ca //" zh="而心不相应行是：得与非得、同分、无想、两种等至、命根，以及诸相……" />}

      <Band>二 · 归类</Band>
      <table className="ip-sort">
        <thead>
          <tr>
            <th scope="col">东西</th>
            <th scope="col">按这种分法，归在</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => {
            const a = it.a[s]!;
            const v = st.pick[key(it.id)];
            return (
              <tr key={it.id}>
                <th scope="row">{it.t}</th>
                <td>
                  <select
                    aria-label={`${it.t}：按${SCHEMES.find((x) => x[0] === s)![1]}归在哪里`}
                    value={v ?? ''}
                    onChange={(e) => set({ pick: { ...st.pick, [key(it.id)]: e.target.value || undefined }, checked: { ...st.checked, [s]: false } })}
                  >
                    <option value="">（选择）</option>
                    {CATS[s].map(([k, t]) => (
                      <option key={k} value={k}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {checked && v && (
                    <p aria-live="polite">
                      <span className={'c5-verdict ' + (v === a.k ? 'c5-verdict--ok' : 'c5-verdict--no')}>{v === a.k ? '一致' : `应归在：${label(s, a.k)}`}</span>
                      <Tag b={a.b} />
                      {a.why}
                    </p>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button type="button" className="md-disclose" disabled={!all} onClick={() => set({ checked: { ...st.checked, [s]: true } })}>
        {all ? '核对' : '先把每一项都归类'}
      </button>
      {checked && (
        <p className="md-feedback" aria-live="polite">
          {right} / {items.length} 项和这种分法一致。
          {s === 'ak64' && '注意：世俗有不等于不存在，也不等于虚假。世亲说，说"瓶子存在"、"水存在"的人，说的是真话，不是假话（satyamevāhurna mṛṣetyetat）；只是瓶子不是分析的终点。'}
          {s === 'thera' && '注意：标"不是最高意义上的东西"，不是说它不存在，而是说它是用约定的语言（sammuti）说的。'}
          {s === 'sarva' && '注意：心不相应行法既不是物质也不是心理，具体包括哪些法，各书并不一致。'}
        </p>
      )}
      {outs.length > 0 && (
        <div className="c5-row">
          <p className="md-fb-k">这种分法下不归类的项目</p>
          {outs.map((it) => (
            <p key={it.id}>
              <b>{it.t}</b>：{it.out![s]}
            </p>
          ))}
        </div>
      )}

      <Band>三 · 并排对照</Band>
      <button type="button" className="md-disclose" aria-expanded={st.compare} onClick={() => set({ compare: !st.compare })}>
        {st.compare ? '收起对照' : '显示三种分法的答案'}
      </button>
      {st.compare && (
        <>
          <p className="md-muted">每一列是一个分开的体系，各用各的标准。同一行放在一起，只是为了比较，不表示三列说的是同一件事。</p>
          <div style={{ overflowX: 'auto' }}>
            <table className="ip-sort">
              <thead>
                <tr>
                  <th scope="col">东西</th>
                  {SCHEMES.map(([k, t]) => (
                    <th key={k} scope="col">
                      {t}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ITEMS.map((it) => {
                  const diff = !!it.a.sarva && !it.a.thera && !!it.out?.thera;
                  return (
                    <tr key={it.id}>
                      <th scope="row">{it.t}</th>
                      {SCHEMES.map(([k]) => (
                        <td key={k} className={diff && k !== 'ak64' ? 'is-diff' : undefined}>
                          {it.a[k] ? label(k, it.a[k]!.k) : '（本章没有讨论）'}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="md-feedback">两派都认为分析可以有一个终点，即不能再分解的诸法；但在哪里是终点、终点上有哪些东西，两派并不一致。底色标出的两行（"得"和虚空）是最清楚的例子：在说一切有部是终点上的法，在上座部的四类中却没有对应的位置。</p>
        </>
      )}

      <Limits>
        <p>这里只用本章第四部分读过的分类和《俱舍论》颂文。标着"通常的概述"的归类，本章没有核对具体的论书列表；具体的数目和归类在不同论书中有差异。</p>
        <p>《俱舍论》6.4 的世俗有与胜义有，不是后来中观派的二谛：阿毗达磨的分析找到一个终点（诸法），中观派认为诸法本身也经不起分析。后者是课程《大乘哲学：中观与瑜伽行派》的内容，这里不涉及。</p>
        <p>引用《俱舍论》时要分清颂文概括的有部学说和世亲在注释中自己的意见；这里引用的都是颂文和本章读过的注释句子。</p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
