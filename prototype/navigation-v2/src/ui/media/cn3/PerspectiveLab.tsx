import { Gu, Seg, useSaved } from './shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn2/cn2.css';
import './cn3.css';

// 三 · after the 王倪 section ("但这段话的形式值得注意"). The learner keeps the
// same facts (the chapter's quotation: who sleeps where, eats what, flees
// whom) and changes the question asked of them: suitable for this creature,
// "correct" for every creature, or correct by the human standard. The
// verdicts change with the question; the facts do not. The 仁义 row is the
// chapter's contested fourth step, shown as an analogy that can be accepted
// or refused. A last panel checks which conclusions the passage supports;
// "every judgment is equally defensible" is not one of them.

const ID = 'perspective-lab';
type Dom = 'chu' | 'wei' | 'se' | 'ren';
type Crit = 'body' | 'zheng' | 'human';
type Ana = 'accept' | 'refuse';
type V = 'ok' | 'need' | 'no';
interface Saved {
  dom: Dom;
  crit: Crit;
  ana: Ana | null;
  ans: Record<string, V>;
}
const INIT: Saved = { dom: 'chu', crit: 'body', ana: null, ans: {} };

/** y = suits this creature, n = does not, '' = the passage says nothing. */
type Cell = 'y' | 'n' | '';
interface Table {
  t: string;
  q: string;
  cols: string[];
  rows: { who: string; human?: boolean; cells: Cell[]; why: string }[];
}
const TABLES: Record<Exclude<Dom, 'ren'>, Table> = {
  chu: {
    t: '住处（正處）',
    q: '三者孰知正處？',
    cols: ['湿地（溼寢）', '树上（木處）'],
    rows: [
      { who: '人（民）', human: true, cells: ['n', 'n'], why: '睡在湿地会"腰疾偏死"，住在树上会"惴慄恂懼"。' },
      { who: '泥鳅（鰌）', cells: ['y', ''], why: '"鰌然乎哉？"泥鳅不会因潮湿而病。' },
      { who: '猿猴（猨猴）', cells: ['', 'y'], why: '"猨猴然乎哉？"猿猴住在树上不会害怕。' },
    ],
  },
  wei: {
    t: '口味（正味）',
    q: '四者孰知正味？',
    cols: ['家畜（芻豢）', '草（薦）', '蛇（帶）', '鼠'],
    rows: [
      { who: '人（民）', human: true, cells: ['y', '', '', ''], why: '"民食芻豢"。' },
      { who: '麋鹿', cells: ['', 'y', '', ''], why: '"麋鹿食薦"。' },
      { who: '蜈蚣（蝍蛆）', cells: ['', '', 'y', ''], why: '"蝍蛆甘帶"。' },
      { who: '猫头鹰和乌鸦（鴟鴉）', cells: ['', '', '', 'y'], why: '"鴟鴉嗜鼠"。' },
    ],
  },
  se: {
    t: '美色（正色）',
    q: '四者孰知天下之正色哉？',
    cols: ['毛嬙、麗姬'],
    rows: [
      { who: '人', human: true, cells: ['y'], why: '"人之所美也"。' },
      { who: '鱼', cells: ['n'], why: '"魚見之深入"。' },
      { who: '鸟', cells: ['n'], why: '"鳥見之高飛"。' },
      { who: '麋鹿', cells: ['n'], why: '"麋鹿見之決驟"。' },
    ],
  },
};
const CELL_T: Record<Cell, string> = { y: '合适', n: '不合适', '': '原文未说' };

const DOMS: [Dom, string][] = [
  ['chu', '住处'],
  ['wei', '口味'],
  ['se', '美色'],
  ['ren', '仁义与是非'],
];
const CRITS: [Crit, string][] = [
  ['body', '对这个生物合适吗？'],
  ['zheng', '哪一个对一切生物都"正"？'],
  ['human', '以人的标准为准'],
];
const CRIT_FB: Record<Crit, string> = {
  body: '问题相对于每个生物的身体和生活方式提出，于是每一格都有确定的答案：湿地对人"不合适"，这是真的，说"合适"就错了。标准不同，不等于没有对错。',
  zheng: '问题要求一个不属于任何生物的标准。表中每一行都只给出了自己的答案，没有哪一行有资格替其他行作答。王倪在这里只是问"孰知"（谁知道），没有断言"没有正处"。',
  human: '这样就得到了一个确定的答案，但它是先选定了人的位置才得出的。说鱼见了毛嫱"看错了"，前提是人的标准就是"正"的标准；王倪问的正是：凭什么？',
};

const CLAIMS: { id: string; t: string; a: V; why: string }[] = [
  { id: 'diff', t: '不同的生物，对住处、口味、美色有不同的标准，而且这些标准和各自的身体、生活相适应。', a: 'ok', why: '这是王倪三个例子直接说明的（论证结构的第一、二步）。' },
  { id: 'judge', t: '在这些生物之间，找不到一个不属于任何一方的位置来判定谁的标准是"正"的。', a: 'ok', why: '这是"孰知"所指向的结论，也和长梧子"吾誰使正之"的论证一致。但要注意说法：王倪是在问，而不是在断言"没有正处"；这一步说的是我们找不到裁判，不是"没有对错"。' },
  { id: 'moral', t: '人关于仁义、是非的标准，也像口味一样，因立场而不同。', a: 'need', why: '这是第四步，也是最有争议的一步：它需要"道德判断和口味判断是同一类东西"这个类比。很多人会拒绝它：口味是身体的偏好，道德是关于如何对待他人的要求。' },
  { id: 'equal', t: '所以，任何两个相反的判断都同样站得住。', a: 'no', why: '推不出。在一个给定的标准之内（例如"对人的身体合适吗"），判断有对错；王倪也没有断言什么，只是问"孰知"。《齐物论》后面讲"和之以是非"，是在是非之中调和，而不是取消是非。' },
];
const V_T: [V, string][] = [
  ['ok', '站得住'],
  ['need', '需要额外前提'],
  ['no', '推不出'],
];

export default function PerspectiveLab() {
  const [st, save] = useSaved<Saved>(ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const done = CLAIMS.filter((c) => st.ans[c.id]).length;

  return (
    <section className="md c3" aria-labelledby="pl-title">
      <header className="md-head">
        <p className="md-tag">视角实验室</p>
        <h3 id="pl-title" className="md-title">
          王倪的"孰知"：同样的事实，换一个问题
        </h3>
        <p className="md-lede">
          表里的事实都来自王倪的三个例子，始终不变。你可以改变的是提出的问题：问"对这个生物合适吗"，问"哪一个对一切生物都正"，或者先把人的标准定为"正"的标准。看判断怎样随问题改变，再检查这一段究竟支持哪些结论。
        </p>
      </header>

      <Gu
        src="《庄子·齐物论》（节选）"
        orig="民溼寢，則腰疾偏死，鰌然乎哉？木處，則惴慄恂懼，猨猴然乎哉？三者孰知正處？"
        zh="人睡在潮湿的地方，就会腰痛甚至半身不遂，泥鳅会这样吗？人住在树上，就会害怕发抖，猿猴会这样吗？这三者，谁知道真正合适的住处？"
      />

      <div className="g4-panel">
        <p className="c3-layer-k">一、选一类判断</p>
        <Seg name="pl-dom" label="判断的种类" value={st.dom} opts={DOMS} onPick={(v) => set({ dom: v })} />
      </div>

      {st.dom !== 'ren' ? (
        <Matrix table={TABLES[st.dom]} crit={st.crit} setCrit={(c) => set({ crit: c })} />
      ) : (
        <div className="g4-panel" aria-live="polite">
          <p className="c3-layer-k">二、第四步：从口味到仁义</p>
          <Gu src="《庄子·齐物论》（王倪的结语）" orig="自我觀之，仁義之端，是非之塗，樊然殽亂，吾惡能知其辯？" zh="在我看来，仁义的开端、是非的路径，纷繁杂乱，我怎么能知道其中的分别？" />
          <p>这里没有表可以填：原文没有举出"谁以什么为仁义"的例子。从前面三类判断推到这一类，要先决定是否接受一个类比：</p>
          <Seg
            name="pl-ana"
            label="是否接受这个类比"
            col
            value={st.ana}
            opts={[
              ['accept', '接受：是非判断和口味判断是同一类东西'],
              ['refuse', '拒绝：道德是关于如何对待他人的要求，和身体的偏好不同'],
            ]}
            onPick={(v) => set({ ana: v })}
          />
          {st.ana && (
            <div className="md-feedback">
              <p className="md-fb-k">{st.ana === 'accept' ? '结论跟着类比走过来了。' : '推论在这里断开了。'}</p>
              <p>
                {st.ana === 'accept'
                  ? '如果接受类比，那么正像没有人能裁定"正味"，也没有人能站在一切立场之外裁定"仁义之端"。但即使这样，得到的也只是"我们找不到中立的裁判"，不是"一切是非同样站得住"。'
                  : '如果拒绝类比，前三个例子就说明不了道德：口味因物种而异，不等于是非因人而异。这时王倪的结语仍然是一个问题，但它不再由前面的例子支持。'}
              </p>
              <p className="md-muted">正文把这一步称为"最关键，也是最有争议的一步"。本课不替你作决定。</p>
            </div>
          )}
        </div>
      )}

      <div className="g4-panel">
        <p className="c3-layer-k">三、这一段支持哪些结论？</p>
        <p className="md-muted">
          每一条选一个判断，已判断 {done} / {CLAIMS.length}。
        </p>
        <ol className="c3-claims">
          {CLAIMS.map((c) => {
            const v = st.ans[c.id];
            return (
              <li key={c.id} className="c2-card">
                <p>{c.t}</p>
                <Seg name={'pl-c-' + c.id} label="这一条" value={v} opts={V_T} onPick={(x) => set({ ans: { ...st.ans, [c.id]: x } })} />
                {v && (
                  <div className="md-feedback" aria-live="polite">
                    <p className="md-fb-k">{v === c.a ? `对：${V_T.find((x) => x[0] === c.a)![1]}。` : `更接近"${V_T.find((x) => x[0] === c.a)![1]}"。`}</p>
                    <p>{c.why}</p>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
        {done === CLAIMS.length && (
          <div className="md-feedback">
            <p className="md-fb-k">这个对照的限度</p>
            <p>
              表格把王倪的例子整理成了"标准—判断"的形式，这是本课的整理，原文只是一连串反问。它能帮助看清"标准随立场而变"和"一切同样站得住"的区别，但不能决定《庄子》的立场究竟是怀疑论、相对主义还是视角主义：这一点正文留作开放的问题。
            </p>
          </div>
        )}
      </div>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}

function Matrix({ table, crit, setCrit }: { table: Table; crit: Crit; setCrit: (c: Crit) => void }) {
  return (
    <div className="g4-panel">
      <p className="c3-layer-k">二、换一个问题</p>
      <Seg name="pl-crit" label="向这些事实提出的问题" col value={crit} opts={CRITS} onPick={setCrit} />
      <div className="c2-scroll">
        <table className="g4-table c3-matrix">
          <caption className="visually-hidden">
            {table.t}：每个生物对每个选项的判断，问题是"{CRITS.find((c) => c[0] === crit)![1]}"
          </caption>
          <thead>
            <tr>
              <th scope="col">谁</th>
              {table.cols.map((c) => (
                <th key={c} scope="col">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((r) => {
              const out = crit === 'human' && !r.human;
              return (
                <tr key={r.who} className={out ? 'is-out' : crit === 'human' ? 'is-std' : ''}>
                  <th scope="row">
                    {r.who}
                    {out && <span className="c3-tagline">不计入</span>}
                    {crit === 'human' && r.human && <span className="c3-tagline">定为标准</span>}
                  </th>
                  {r.cells.map((c, i) => (
                    <td key={i} className={'c3-cell c3-cell--' + (crit === 'zheng' ? 'q' : c || 'none')}>
                      {crit === 'zheng' ? (c ? '只代表自己' : '—') : out ? (c ? '（被排除）' : '—') : CELL_T[c]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
          {crit === 'zheng' && (
            <tfoot>
              <tr>
                <th scope="row">"正"的答案</th>
                <td colSpan={table.cols.length} className="c3-cell c3-cell--ask" lang="zh-Hant">
                  {table.q}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
      <ul className="c3-why">
        {table.rows.map((r) => (
          <li key={r.who}>
            <b>{r.who}：</b>
            {r.why}
          </li>
        ))}
      </ul>
      <div className="md-feedback" aria-live="polite">
        <p className="md-fb-k">{CRITS.find((c) => c[0] === crit)![1]}</p>
        <p>{CRIT_FB[crit]}</p>
      </div>
    </div>
  );
}
