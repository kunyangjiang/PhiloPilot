import { Fragment } from 'react';
import { BASIS, Limits, Seg, Tag, useSavedIn, type Basis } from '../cn7/shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn2/cn2.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import '../cn5/cn5.css';
import '../cn7/cn7.css';

// 三 · after 「分歧的地图」. Not one doctrine: a grid of differences.
// Columns: 熊十力, 唐君毅, 牟宗三 (徐复观 as an optional contrast). Rows: the
// questions the chapter compares them on. Every cell says what it rests on
// (SEP, IEP, 弗勒利希, the usual summary, or the course's own summary); the
// course has not read the three philosophers' own works (still in copyright),
// so nothing here is quoted from them. Then statements to judge, with feedback.
// All content from 一 (熊十力), 三 and note 8.

const ID = 'new-confucian-comparison';

type Who = 'xiong' | 'tang' | 'mou' | 'xu';
const COLS: [Who, string, string][] = [
  ['xiong', '熊十力', '1885—1968'],
  ['tang', '唐君毅', '1909—1978'],
  ['mou', '牟宗三', '1909—1995'],
  ['xu', '徐复观', '1903—1982'],
];

interface Cell {
  b: Basis;
  who?: string;
  t: string;
}
const ROWS: { id: string; q: string; c: Record<Who, Cell[]> }[] = [
  {
    id: 'mind',
    q: '心是什么？',
    c: {
      xiong: [
        { b: 'scholar', who: 'SEP、IEP', t: '"体用不二"：本体就在作用之中，作用就是本体的显现。' },
        { b: 'common', t: '本体是生生不息的"本心"；"辟"的倾向表现为心灵，"翕"的倾向形成物质，两者是同一个本体运动的两个方面。' },
      ],
      tang: [{ b: 'scholar', who: '弗勒利希', t: '"感通"：认识、感受和意向同时发生的活动，主体和客体的区分暂时消失；不限于宗教经验，也包括感官知觉和理智活动。' }],
      mou: [{ b: 'scholar', who: 'SEP', t: '本心、良知：人有一种有限形式的智的直觉，使对"真我"的认识成为可能。' }],
      xu: [{ b: 'scholar', who: 'SEP', t: '不设定两个层次的自我。' }],
    },
  },
  {
    id: 'meta',
    q: '道德的形上学',
    c: {
      xiong: [{ b: 'scholar', who: 'IEP', t: '建立本体论：拒绝老师欧阳竟无"体用分别"的看法，主张"即体即用"。' }],
      tang: [{ b: 'common', t: '建立包容性的心灵哲学：心灵九境，最高的是儒家的"天德流行"；较低的境界不被否定，而被包含在较高的境界中。' }],
      mou: [{ b: 'scholar', who: 'IEP', t: '从本心出发建立关于整个存在的形上学，道德价值在存在上是首要的；"道德的形上学"这个名称有意把康德的"道德底形上学"颠倒过来。' }],
      xu: [{ b: 'scholar', who: 'SEP', t: '拒绝熊、牟、唐的形而上学取向。' }],
    },
  },
  {
    id: 'intuition',
    q: '直觉与体证',
    c: {
      xiong: [{ b: 'course', t: '反求本心的"证会"，不是概念的推论（本课第一部分的概括）。' }],
      tang: [{ b: 'scholar', who: 'SEP', t: '对"感通"是不是一种知识有所摇摆：如果是知识，就要接受检验；如果是信仰，就不能用来证明什么。' }],
      mou: [{ b: 'scholar', who: 'IEP', t: '康德把智的直觉只归于上帝；牟宗三认为这是康德最大的错误，人有智的直觉是中国哲学对世界哲学的贡献。' }],
      xu: [{ b: 'scholar', who: 'SEP', t: '中国文化的精神应当通过思想史的具体研究来理解，而不是通过建立形而上学的体系来证明。' }],
    },
  },
  {
    id: 'west',
    q: '和西方哲学的关系',
    c: {
      xiong: [{ b: 'course', t: '很少直接使用西方哲学；他的对话者是唯识学。' }],
      tang: [{ b: 'scholar', who: '弗勒利希', t: '和黑格尔、费希特（较小程度上和康德、谢林）有多方面的亲缘，但他不是黑格尔主义者，对德国观念论的吸收是高度选择性的。' }],
      mou: [
        { b: 'scholar', who: 'SEP、IEP', t: '主要的对话者是康德：他要说明儒家能完成康德没有完成的事情。' },
        { b: 'common', t: '晚年独力翻译了康德的三大批判。' },
      ],
      xu: [{ b: 'course', t: '很少；主要做思想史。' }],
    },
  },
  {
    id: 'science',
    q: '科学和民主',
    c: {
      xiong: [{ b: 'course', t: '科学研究"用"，哲学体证"体"，两者层次不同（本课第一部分的概括）。' }],
      tang: [{ b: 'course', t: '各种境界都有其真理（本课对九境说的概括）。' }],
      mou: [
        { b: 'scholar', who: 'SEP', t: '"良知的自我坎陷"：道德理性自我限制，让理论理性和价值中立的民主制度得以发展。不是从良知直接推出来的。' },
        { b: 'scholar', who: 'IEP', t: '心服从于形式和范畴，成为"认知心"，才能把事物当作时空和因果中的对象来认识。' },
      ],
      xu: [{ b: 'course', t: '通过思想史说明。' }],
    },
  },
  {
    id: 'teacher',
    q: '与熊十力的关系',
    c: {
      xiong: [{ b: 'course', t: '—' }],
      tang: [{ b: 'scholar', who: 'SEP', t: '自己承认并不很了解熊十力，说他的老师是方东美。' }],
      mou: [{ b: 'scholar', who: 'SEP', t: '一直称熊十力为老师，同时也批评他。' }],
      xu: [{ b: 'scholar', who: 'SEP', t: '曾受教于熊，但拒绝其形而上学的取向。' }],
    },
  },
  {
    id: 'critique',
    q: '主要的批评',
    c: {
      xiong: [
        { b: 'common', t: '佛教学者认为他误解了唯识学，内学院的同学曾写书反驳（"不够佛教"）。' },
        { b: 'scholar', who: 'IEP', t: '把个人的体验当作实在的基础，忽视了客观的存在（"太主观"）。' },
      ],
      tang: [{ b: 'scholar', who: 'SEP', t: '常用孝道的例子说明普遍的道德感受，其他文化的人可能质疑这种感受的普遍性。' }],
      mou: [
        { b: 'scholar', who: 'SEP', t: '怎样区分真正的智的直觉和只是"感觉起来像"的东西？论证依赖康德的"自律"框架。' },
        { b: 'scholar', who: 'IEP', t: '非理性主义；把核心主张当作已确立的事实来陈述而不给出论证；本质主义。' },
      ],
      xu: [{ b: 'course', t: '本课没有概述对他的批评。' }],
    },
  },
];

const SOFT: Basis[] = ['common', 'course'];

const CLAIMS: { id: string; t: string; key: boolean; why: string }[] = [
  { id: 'k1', t: '熊十力、唐君毅、牟宗三三人都以康德为主要的西方对话者。', key: false, why: '只有牟宗三以康德为主要对话者。熊十力很少直接使用西方哲学；唐君毅和黑格尔、费希特有亲缘（弗勒利希）。' },
  { id: 'k2', t: '熊十力主张"体用不二"，反对把本体和作用分为两层。', key: true, why: '这是他批评传统唯识学的核心（据 SEP 和 IEP 的概述）。' },
  { id: 'k3', t: '唐君毅一直自称是熊十力的学生。', key: false, why: '据 SEP，唐君毅自己承认他并不很了解熊十力，说他的老师是方东美。"熊—唐—牟"的师承谱系需要保留。' },
  { id: 'k4', t: '牟宗三认为人有一种有限形式的智的直觉。', key: true, why: '据 SEP 的概述。这一点正是他和康德的分歧：康德认为只有上帝才可能有智的直觉。' },
  { id: 'k5', t: '牟宗三认为科学和民主可以从良知中直接推出来。', key: false, why: '"坎陷"说的是相反的方向：道德理性自我限制，为理论理性和民主制度"让出"空间（据 SEP）。' },
  { id: 'k6', t: '牟宗三和唐君毅对道德情感在道德中的作用看法相同。', key: false, why: '据 SEP，两人都回应康德，但对道德情感的作用有不同的看法。' },
  { id: 'k7', t: '徐复观签署了1958年的《宣言》，却拒绝了另外几位的形而上学取向。', key: true, why: '这正是"新儒家不是一个统一的学派"的证明（据 SEP）。' },
  { id: 'k8', t: '1958年的《宣言》是一篇严格论证的哲学论文，可以当作新儒家哲学的全面概述来读。', key: false, why: '弗勒利希提醒：它是一篇宣言，是向读者发出的呼吁；把它当作全面概述来读是不可靠的。' },
];

interface Saved {
  xu: boolean;
  soft: boolean;
  col: Who | '';
  ans: Record<string, boolean | undefined>;
}
const INIT: Saved = { xu: false, soft: false, col: '', ans: {} };

export default function NewConfucianComparison() {
  const [st, save] = useSavedIn<Saved>('CN8', ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const cols = COLS.filter(([w]) => w !== 'xu' || st.xu);

  return (
    <section className="md c3 c5" aria-labelledby="nc-title">
      <header className="md-head">
        <p className="md-tag">比较 · 三位新儒家</p>
        <h3 id="nc-title" className="md-title">
          一个学派，还是几种哲学？
        </h3>
        <p className="md-lede">把熊十力、唐君毅、牟宗三放在同样的问题下比较，看他们在哪里相近、在哪里分开。每一格都标出了依据：本课没有阅读三人的原著，这里的内容来自 SEP、IEP、弗勒利希的研究、学界的通常概述，或本课的概括。</p>
      </header>

      <div className="md-seg" role="group" aria-label="显示选项">
        <label className={'md-seg-opt' + (st.xu ? ' is-on' : '')}>
          <input type="checkbox" checked={st.xu} onChange={() => set({ xu: !st.xu, col: !st.xu || st.col !== 'xu' ? st.col : '' })} />
          <span>加入徐复观作对照</span>
        </label>
        <label className={'md-seg-opt' + (st.soft ? ' is-on' : '')}>
          <input type="checkbox" checked={st.soft} onChange={() => set({ soft: !st.soft })} />
          <span>淡化"{BASIS.common}"和"{BASIS.course}"</span>
        </label>
      </div>

      <div className="c2-scroll" tabIndex={0} role="region" aria-label="新儒家比较表（可横向滚动）">
        <table className="c2-grid c7-grid">
          <thead>
            <tr>
              <th scope="col">问题</th>
              {cols.map(([w, name, years]) => (
                <th key={w} scope="col" className={st.col === w ? 'is-col' : undefined}>
                  <button type="button" className="md-disclose" aria-pressed={st.col === w} onClick={() => set({ col: st.col === w ? '' : w })}>
                    {name}
                  </button>
                  <span className="md-muted"> {years}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.id}>
                <th scope="row">{r.q}</th>
                {cols.map(([w]) => (
                  <td key={w} className={st.col === w ? 'is-col' : undefined}>
                    {r.c[w].map((x, i) => (
                      <p key={i} className={st.soft && SOFT.includes(x.b) ? 'is-dim' : undefined}>
                        <Tag b={x.b} who={x.who} />
                        {x.t}
                      </p>
                    ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="md-muted">点击姓名可以突出一列。表中把唐君毅和黑格尔的关系写成"有亲缘"，而不是"来源"（弗勒利希）。</p>

      <p className="c3-layer-k">判断：对还是不对？</p>
      <div className="c5-rows">
        {CLAIMS.map((c) => {
          const v = st.ans[c.id];
          return (
            <Fragment key={c.id}>
              <div className="c5-row">
                <p>{c.t}</p>
                <Seg
                  name={`nc-${c.id}`}
                  label={c.t}
                  value={v === undefined ? null : v ? 'y' : 'n'}
                  opts={[
                    ['y', '对'],
                    ['n', '不对'],
                  ]}
                  onPick={(x) => set({ ans: { ...st.ans, [c.id]: x === 'y' } })}
                />
                {v !== undefined && (
                  <p aria-live="polite">
                    <span className={'c5-verdict ' + (v === c.key ? 'c5-verdict--ok' : 'c5-verdict--no')}>{v === c.key ? '和本课的依据一致' : c.key ? '本课的依据说：对' : '本课的依据说：不对'}</span>
                    {c.why}
                  </p>
                )}
              </div>
            </Fragment>
          );
        })}
      </div>

      <Limits>
        <p>这张表不是一个统一的学说：它的目的正是显示三个人的分歧。三人的著作仍受著作权保护，本课没有阅读，也不直接引用；每一格的依据都标了出来，"本课的概括"一类只是帮助比较的简写。</p>
        <p>"新儒家"是一个后来的标签，哪些人算新儒家，学界看法很不一致；本课采用比较窄的用法。</p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
