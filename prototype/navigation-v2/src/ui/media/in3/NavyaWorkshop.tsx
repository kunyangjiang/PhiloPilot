import { Band, Claim, Limits, Seg, Src, Tag, useSavedIn } from '../in2/shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import '../cn5/cn5.css';
import '../cn7/cn7.css';
import '../in2/ip.css';

// 七 · after the table of the two definitions (定义一 / 定义二, the kitchen).
// 1. The monkey and the tree: one property, two delimitors.
// 2. Test sites against definition one and definition two of vyāpti.
// 3. Where definition one fails again: the kevalānvayin inference.
// 4. The upādhi (wet fuel) and what tarka does.
// No logic engine: every site, verdict and formula is fixed, from 七、 and notes 89–107.
// The Sanskrit is only what the chapter quotes (some of it via SEP, and tagged so).

const ID = 'navya-workshop';

type Part = 'branch' | 'root';
type Site = 'kitchen' | 'lake' | 'iron';
const SITES: { k: Site; name: string; smoke: boolean; noFire: boolean; fireLocus: boolean; note: string }[] = [
  { k: 'kitchen', name: '厨房（火只在灶里）', smoke: true, noFire: true, fireLocus: true, note: '有烟；厨房的某些部分没有火，所以厨房"有火之不存在"；但厨房也是火之所在。' },
  { k: 'lake', name: '大湖', smoke: false, noFire: true, fireLocus: false, note: '没有烟，也没有火。' },
  { k: 'iron', name: '烧红的铁块（本课的例子）', smoke: false, noFire: false, fireLocus: true, note: '有火，没有烟。' },
];
type Def = 1 | 2;
const counter = (s: (typeof SITES)[number], d: Def) => s.smoke && s.noFire && (d === 1 || !s.fireLocus);

interface Saved {
  part: Part | null;
  def: Def;
  guess: Record<string, boolean | undefined>;
  checked: Partial<Record<Def, boolean>>;
  kev: boolean;
  upa: { a: boolean | null; b: boolean | null };
}
const INIT: Saved = { part: null, def: 1, guess: {}, checked: {}, kev: false, upa: { a: null, b: null } };

export default function NavyaWorkshop() {
  const [st, save] = useSavedIn<Saved>('IN3', ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const d = st.def;
  const all = SITES.every((s) => st.guess[`${d}:${s.k}`] !== undefined);
  const checked = !!st.checked?.[d];
  const upa = st.upa ?? INIT.upa;

  const partBtn = (p: Part, label: string) => (
    <button type="button" className={'ip-chip' + (st.part === p ? ' is-on' : '')} aria-pressed={st.part === p} onClick={() => set({ part: p })}>
      以{label}为限定
    </button>
  );

  return (
    <section className="md c3 c5" aria-labelledby="nn-title">
      <header className="md-head">
        <p className="md-tag">新正理派 · 精确的语言</p>
        <h3 id="nn-title" className="md-title">
          为什么"有烟就有火"这么难定义？
        </h3>
        <p className="md-lede">先用猴子和树看"限定者"做什么；再拿几个地方检验遍充的定义一和定义二；然后看定义一在"唯同品"推理上的第二个问题；最后看附加条件怎样推翻一个推理。所有例子和判断都是固定的，这不是一台逻辑机器。</p>
      </header>

      <Band>一 · 猴子和树：限定者</Band>
      <div className="ip-two">
        <div>
          <svg className="ip-tree" viewBox="0 0 200 200" role="img" aria-label={`一棵树，猴子坐在树枝上。${st.part === 'branch' ? '树枝已标出。' : st.part === 'root' ? '树根已标出。' : ''}`}>
            <path className={'ip-part' + (st.part === 'branch' ? ' is-on' : '')} d="M100 110 L100 60 M100 80 L150 50 M100 70 L55 45" />
            <path className="ip-part" d="M100 160 L100 110" />
            <path className={'ip-part' + (st.part === 'root' ? ' is-on' : '')} d="M100 160 L70 185 M100 160 L130 185 M100 160 L100 190" />
            <circle className="ip-monkey" cx="150" cy="40" r="9" />
            <circle className="ip-monkey" cx="150" cy="56" r="6" />
            <text x="160" y="30">
              猴子
            </text>
            <text x="20" y="40">
              树枝
            </text>
            <text x="135" y="196">
              树根
            </text>
          </svg>
          <div className="ip-chips">
            {partBtn('branch', '树枝')}
            {partBtn('root', '树根')}
          </div>
        </div>
        <div aria-live="polite">
          <p>
            1. 这棵树与猴子接触。
            <span className={'ip-truth' + (st.part === 'root' ? ' is-false' : '')}>{st.part === 'branch' ? '真' : st.part === 'root' ? '假' : '？'}</span>
          </p>
          <p>
            2. 这棵树不与猴子接触。
            <span className={'ip-truth' + (st.part === 'branch' ? ' is-false' : '')}>{st.part === 'root' ? '真' : st.part === 'branch' ? '假' : '？'}</span>
          </p>
          {st.part ? (
            <p className="md-feedback">
              {st.part === 'branch' ? '"与猴子接触"这个性质在树中的出现，以树枝为限定（avacchinna）。' : '"与猴子接触"的不存在在树中的出现，以树根为限定。'}
              原来的两句话说的是不同的限定者（avacchedaka）：第一句以树枝为限定，第二句以树根为限定，所以不矛盾。
            </p>
          ) : (
            <p className="md-muted">不加限定者，两句话看起来互相矛盾。选一个限定者。</p>
          )}
          <Claim b="scholar" who="SEP">像"与猴子接触"这样只出现在一个东西某些部分中的性质，叫"部分所在的"（avyāpya-vṛtti）性质。</Claim>
        </div>
      </div>

      <Band>二 · 检验两个定义</Band>
      <Seg
        name="nn-def"
        label="选择一个定义"
        col
        value={d}
        opts={[
          [1, '定义一：烟不出现在任何"有火之不存在"的地方'],
          [2, '定义二：烟不出现在任何"有火之不存在、并且不是火之所在"的地方'],
        ]}
        onPick={(v) => set({ def: v })}
      />
      {d === 1 && <Src src="伽涅舍所检讨的第一个遍充定义，据 SEP 所引" lang="sa" orig="sādhyābhāvavad-avṛttitvam" zh={'（理由）不出现在"有所立之不存在"的地方。'} />}
      <table className="ip-sort">
        <thead>
          <tr>
            <th scope="col">地方</th>
            <th scope="col">按定义{d === 1 ? '一' : '二'}，它是"烟—火"遍充的反例吗？</th>
          </tr>
        </thead>
        <tbody>
          {SITES.map((s) => {
            const k = `${d}:${s.k}`;
            const g = st.guess[k];
            const truth = counter(s, d);
            return (
              <tr key={s.k}>
                <th scope="row">
                  {s.name}
                  <br />
                  <span className="md-muted" style={{ fontWeight: 400 }}>
                    {s.note}
                  </span>
                </th>
                <td>
                  <Seg
                    name={`nn-${k}`}
                    label={`${s.name}是不是反例`}
                    value={g === undefined ? null : g ? 'y' : 'n'}
                    opts={[
                      ['y', '是反例'],
                      ['n', '不是'],
                    ]}
                    onPick={(v) => set({ guess: { ...st.guess, [k]: v === 'y' }, checked: { ...st.checked, [d]: false } })}
                  />
                  {checked && g !== undefined && (
                    <p aria-live="polite">
                      <span className={'c5-verdict ' + (g === truth ? 'c5-verdict--ok' : 'c5-verdict--no')}>{g === truth ? '一致' : truth ? '按这个定义，它是反例' : '按这个定义，它不是反例'}</span>
                      {!s.smoke ? '这里没有烟，所以谈不上烟出现在没有火的地方。' : d === 1 ? '有烟，又"有火之不存在"，定义一把它算作反例。' : '有烟，"有火之不存在"，但它是火之所在，定义二不把它算作反例。'}
                    </p>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button type="button" className="md-disclose" disabled={!all} onClick={() => set({ checked: { ...st.checked, [d]: true } })}>
        {all ? '核对' : '先判断每一个地方'}
      </button>
      {checked && (
        <p className="md-feedback" aria-live="polite">
          {d === 1 ? '定义一把厨房算作反例，"烟—火"的遍充被推翻了。但厨房里明明有火。诊断：火是部分所在的，"有火"和"有火之不存在"可以同时出现在一个东西中。换到定义二再试一次。' : '定义二多了一个条件，厨房是火之所在，不再算作反例。'}
          <Tag b="scholar" who="本章的整理，依据 SEP" />
        </p>
      )}

      <Band>三 · 定义一的第二个问题：唯同品</Band>
      <Src src="《思择要集》第 47 节" lang="sa" orig="ghaṭo'bhidheyaḥ prameyatvāt paṭavat" zh="罐子是可以被命名的，因为它是可以被认识的，就像布一样。" />
      <button type="button" className="md-disclose" aria-expanded={st.kev} onClick={() => set({ kev: !st.kev })}>
        {st.kev ? '收起' : '用定义一来写这个推理的遍充'}
      </button>
      {st.kev && (
        <div className="c5-row" aria-live="polite">
          <p>按定义一：可知性不出现在任何"有可命名性之不存在"的地方。</p>
          <p>但根本没有"不可以被命名的东西"。"有可命名性之不存在的地方"是一个不指称任何东西的词语；正理派认为，含有这种没有实例的性质的句子不能被判定真假。</p>
          <Src src="据 SEP 所引，见《思择要集》的注释传统" lang="sa" orig="hetusamānādhikaraṇātyantābhāvāpratiyogi-sādhyasāmānādhikaraṇyam vyāptiḥ" zh={'遍充，是所立与理由共处于同一个地方，并且所立不是"与理由共处的绝对不存在"的反面。'} />
          <Claim b="scholar" who="SEP">伽涅舍的定义不必使用"所立之不存在"这个可能不指称任何东西的词语：任何一个其不存在与烟共处的性质，都不能是火（有烟而没有寒冷的地方，说明寒冷不可能是火）。所以它也适用于唯同品的推理。</Claim>
        </div>
      )}

      <Band>四 · 附加条件和思择</Band>
      <Src src="《思择要集》第 56 节" lang="sa" orig="sādhyavyāpakatve sati sādhanāvyāpaka upādhiḥ / … parvato dhūmavān vahnimattvād ity atrārdrendhasaṃyoga upādhiḥ /" zh={'遍充所立、却不遍充能立（理由）的，是附加条件。……在"山上有烟，因为有火"这个推理中，与湿柴的接触就是附加条件。'} />
      <p className="md-muted">附加条件（upādhi）是一个被忽略的条件：指出它，就揭示表面上的遍充其实不成立。检查"与湿柴的接触"是否满足两个要求：</p>
      <div className="c5-rows">
        <div className="c5-row">
          <p>（1）它遍充所立：凡有烟的地方，都有与湿柴的接触。</p>
          <Seg
            name="nn-upa-a"
            label="要求一是否满足"
            value={upa.a === null ? null : upa.a ? 'y' : 'n'}
            opts={[
              ['y', '满足'],
              ['n', '不满足'],
            ]}
            onPick={(v) => set({ upa: { ...upa, a: v === 'y' } })}
          />
        </div>
        <div className="c5-row">
          <p>（2）它不遍充理由：有火的地方，未必有与湿柴的接触。</p>
          <Seg
            name="nn-upa-b"
            label="要求二是否满足"
            value={upa.b === null ? null : upa.b ? 'y' : 'n'}
            opts={[
              ['y', '满足'],
              ['n', '不满足'],
            ]}
            onPick={(v) => set({ upa: { ...upa, b: v === 'y' } })}
          />
        </div>
      </div>
      {upa.a !== null && upa.b !== null && (
        <p className="md-feedback" aria-live="polite">
          <span className={'c5-verdict ' + (upa.a && upa.b ? 'c5-verdict--ok' : 'c5-verdict--no')}>{upa.a && upa.b ? '和《思择要集》一致' : '《思择要集》认为两个要求都满足'}</span>
          所以，有火而没有湿柴的地方（本课的例子：烧红的铁块），就是"山上有烟，因为有火"的反例："有火"不被"有烟"所遍充。附加条件揭示的是，表面上的遍充其实不成立。
        </p>
      )}
      <Claim b="scholar" who="伽涅舍，据 SEP">
        思择（tarka）本身不是知识来源，但能改变"接受什么是合理的"，主要作用是帮助人们把握遍充。例如问怀疑遍充的人：如果烟可以不由火产生，你为什么总是为了烟去找火？他自己的行为已经预设了遍充。
      </Claim>

      <Limits>
        <p>伽涅舍的《真理如意珠》推理章，本课没有找到可以核对的电子本；他的定义和论证都依据百科条目（SEP）的介绍和引文，已逐一标出。《思择要集》第 47、56 节已据电子本核对。</p>
        <p>这里的检验只用本章的三个地方和三个固定的判断；它不能判断任意的推理。"烧红的铁块"是本课的例子，不是古代文本中的例子。</p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
