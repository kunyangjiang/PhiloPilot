import { Band, Claim, Limits, Pick, Verdict, useSavedIx } from '../jw1/shared';

// 五 · after the six-approach comparison table (content/AF2_SAMPLE_DRAFT.md).
// Comparing approaches to decolonization in three steps. First the reader says
// which approach each of six moves belongs to; then, for two cases from the
// chapter (Wiredu on democracy, Oyěwùmí on gender), says what kind of evidence
// each claim is and reads what it can and cannot show; last, a view (no right
// answer): which approach to try first on a new concept. Every item restates the
// chapter's own text; nothing new is claimed.

const ID = 'decolonize-compare';

type A = 'culture' | 'institution' | 'concept' | 'select' | 'archaeology' | 'rupture';
const AS: readonly (readonly [A, string])[] = [
  ['culture', '文化的找回'],
  ['institution', '制度的找回'],
  ['concept', '概念的审查'],
  ['select', '有选择的继承'],
  ['archaeology', '知识的考古'],
  ['rupture', '革命的断裂'],
];

const MOVES: { id: string; who: string; text: string; a: A; why: string }[] = [
  {
    id: 'senghor',
    who: '桑戈尔',
    text: '肯定一种黑人的、非洲的文化和认知方式，以回应同化政策对它的否定。',
    a: 'culture',
    why: '它针对的是文化和感受方式被否定；风险是把一种认知方式归于一个种族，重复殖民的分类。',
  },
  {
    id: 'nyerere',
    who: '尼雷尔',
    text: '以前殖民社会中保存下来的共同体价值为基础，建立一种社会主义。',
    a: 'institution',
    why: '它要找回的是一套社会组织方式；证据是关于前殖民社会的历史概括，风险是理想化和全体一致论。',
  },
  {
    id: 'wiredu',
    who: '维雷杜',
    text: '把"心灵""真理"这样的概念放到阿肯语中检验，看它们是否真的普遍。',
    a: 'concept',
    why: '它反对的是不经反思的吸收，而不是吸收本身；风险是认识论的本土主义，以及两种语言之间可疑的对应。',
  },
  {
    id: 'gyekye',
    who: '吉耶克',
    text: '对传统的各个成分分别作出有理由的选择：保留经得起检验的，修改或放弃其余的。',
    a: 'select',
    why: '它反对把传统当作一个整体来保存或拒绝；困难在于由谁来选择、标准从哪里来。',
  },
  {
    id: 'mudimbe',
    who: '穆丁贝',
    text: '先追问"非洲"这个知识对象是怎样在旅行记、传教士著作和殖民文献中形成的。',
    a: 'archaeology',
    why: '它把"证据是什么"推进了一步：还要问证据在什么权力关系中被生产；风险是难以提出积极的方案。',
  },
  {
    id: 'fanon',
    who: '法农',
    text: '新的民族文化不在过去，而是在解放的斗争中被创造出来。',
    a: 'rupture',
    why: '它拒绝把前殖民社会当作蓝图；SEP 条目指出的风险是忽视地区差异、压制历史记忆。',
  },
];

type E = 'lang' | 'hist' | 'norm';
const ES: readonly (readonly [E, string])[] = [
  ['lang', '语言的证据'],
  ['hist', '历史的证据'],
  ['norm', '规范或方法的论证'],
];

const CASES: { id: string; title: string; claims: { id: string; text: string; e: E; can: string; cannot: string }[] }[] = [
  {
    id: 'democracy',
    title: '维雷杜论"共识民主"',
    claims: [
      {
        id: 'ashanti',
        text: '阿散蒂人的传统制度中，同意通常是按照共识的原则协商出来的。',
        e: 'hist',
        can: '一种具体的制度曾经存在，并且怎样运作。',
        cannot: '它本身不说明这种制度今天应当被采用；而且它依赖对阿散蒂历史的描述是否准确。',
      },
      {
        id: 'minority',
        text: '共识的决策方式使少数派不会被系统地排除在外，在这一点上比多数决更好。',
        e: 'norm',
        can: '即使有人证明阿散蒂的传统并不像描述的那样，这个论证仍然需要单独回答。',
        cannot: '它本身不说明共识的代价（例如决策缓慢、要求顺从的压力）是否值得付出。',
      },
    ],
  },
  {
    id: 'gender',
    title: '奥耶乌米论约鲁巴社会中的性别',
    claims: [
      {
        id: 'pronoun',
        text: '约鲁巴语的第三人称代词不区分阴性和阳性。',
        e: 'lang',
        can: '把英语的性别范畴直接套用到约鲁巴语上，至少需要论证。',
        cannot: '从"语言中不标记"到"社会生活中不区分"，需要额外的前提——这就是"语言决定论"的批评。',
      },
      {
        id: 'chiefs',
        text: '殖民当局只承认男性的首领，把女性从原有的权力位置上排除了出去。',
        e: 'hist',
        can: '殖民统治确实改变了性别关系。',
        cannot: '"改变"不等于"引入"：它不能单独证明殖民以前没有性别这个组织原则。',
      },
      {
        id: 'feminism',
        text: '西方女性主义不应当不加检验地把自己的范畴推广到所有社会。',
        e: 'norm',
        can: '这是她最被广泛承认的论点，即使她关于约鲁巴社会的历史论断被修正，它仍然成立。',
        cannot: '它本身不能确立"约鲁巴社会原本没有性别"这个历史论断。',
      },
    ],
  },
];
const ALL_CLAIMS = CASES.flatMap((c) => c.claims);

type V = 'concept' | 'select' | 'archaeology';
const VS: readonly (readonly [V, string])[] = [
  ['concept', '先在本土语言中检验'],
  ['select', '先问它对人类福祉是否有益'],
  ['archaeology', '先追问它是怎样传进来的'],
];
const VNOTE: Record<V, string> = {
  concept:
    '长处：有一个可以操作的方法，维雷杜和普比泰克都用它取得了具体的结果。代价：一种语言中没有某个词，能证明的往往比看起来少；奥沙和巴卡雷-尤素夫都指出过这一点。',
  select:
    '长处：直接面对"应当保留还是放弃"的问题，不只停留在概念的来历上。代价：要回答"谁来选择、按什么标准选择"——这是吉耶克的方案留下的困难。',
  archaeology:
    '长处：能看到一个概念背后的权力关系，避免把殖民的知识当作中立的事实。代价：弄清来历并不自动告诉我们应当怎样做；来历可疑的概念也可能经得起检验。',
};

interface Saved {
  moves: Record<string, A>;
  ev: Record<string, E>;
  view: V | null;
}
const INIT: Saved = { moves: {}, ev: {}, view: null };

export default function DecolonizeCompare() {
  const [st, save] = useSavedIx<Saved>('AF2', ID, INIT);
  const placed = MOVES.filter((x) => x.id in st.moves).length;
  const placedOk = MOVES.filter((x) => st.moves[x.id] === x.a).length;
  const weighed = ALL_CLAIMS.filter((x) => x.id in st.ev).length;
  const allPlaced = placed === MOVES.length;
  const allWeighed = weighed === ALL_CLAIMS.length;

  return (
    <section className="md c3 c5" aria-labelledby="dc-title">
      <header className="md-head">
        <p className="md-tag">比较去殖民化的方案 · 证据能证明什么</p>
        <h3 id="dc-title" className="md-title">先分清六种方案，再检验两个论证的证据</h3>
        <p className="md-lede">
          第一步：说出六个做法各自属于表中的哪一种方案。第二步：对本章的两个例子，说出每一条主张是哪一类证据，并看它能证明什么、不能证明什么。第三步只是你的看法，没有标准答案。
        </p>
      </header>

      <Band>
        一 · 这是哪一种方案？（已选 {placed} / {MOVES.length}）
      </Band>
      <ol className="v21-steps" aria-label="六个做法">
        {MOVES.map((x, i) => {
          const a = st.moves[x.id];
          const has = x.id in st.moves;
          return (
            <li key={x.id} className="v21-step">
              <span className="v21-n" aria-hidden="true">
                {i + 1}
              </span>
              <span>
                <span>
                  <b>{x.who}：</b>
                  {x.text}
                </span>
                <Pick label={`做法 ${i + 1}（${x.who}）属于哪一种方案`} value={a} opts={AS} onPick={(v) => save({ ...st, moves: { ...st.moves, [x.id]: v } })} />
                {has && (
                  <span aria-live="polite">
                    <Verdict ok={a === x.a} yes="与本章的表一致" no="再想想" />
                    {a === x.a ? x.why : '先问：它认为"被殖民"的是什么——文化、制度、概念、传统的整体、知识本身，还是整个殖民体制？'}
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ol>

      {allPlaced && (
        <div aria-live="polite">
          <Band>
            二 · 这条主张是哪一类证据？（{placedOk} / {MOVES.length} 个做法与本章的表一致；已判断 {weighed} / {ALL_CLAIMS.length}）
          </Band>
          {CASES.map((c) => (
            <div key={c.id}>
              <p className="md-muted">
                <b>{c.title}</b>
              </p>
              <ol className="v21-steps" aria-label={c.title}>
                {c.claims.map((x, i) => {
                  const a = st.ev[x.id];
                  const has = x.id in st.ev;
                  return (
                    <li key={x.id} className="v21-step">
                      <span className="v21-n" aria-hidden="true">
                        {i + 1}
                      </span>
                      <span>
                        <span>{x.text}</span>
                        <Pick label={`${c.title}，主张 ${i + 1} 是哪一类证据`} value={a} opts={ES} onPick={(v) => save({ ...st, ev: { ...st.ev, [x.id]: v } })} />
                        {has && (
                          <span aria-live="polite">
                            <Verdict ok={a === x.e} yes="与本章一致" no="本章的整理不同" />
                            {a === x.e ? '' : `本章把它看作：${ES.find(([k]) => k === x.e)?.[1]}。`}
                            能证明：{x.can} 不能单独证明：{x.cannot}
                          </span>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      )}

      {allPlaced && allWeighed && (
        <div aria-live="polite">
          <Band>三 · 面对一个新的概念，你会先用哪一种方案？</Band>
          <Pick label="面对一个新的概念，先用哪一种方案" value={st.view} opts={VS} onPick={(v) => save({ ...st, view: v })} />
          {st.view && (
            <p className="md-muted" aria-live="polite">
              {VNOTE[st.view]}
            </p>
          )}
          {st.view && (
            <Claim b="course">
              每一种方案在"哪一个概念""被殖民指什么""证据是什么"上都有它的洞见；它们的弱点，往往出现在最后一个问题上：替代方案的代价是什么。
            </Claim>
          )}
        </div>
      )}

      <Limits>
        <p>
          <b>这里的每一个做法和每一条主张，都复述课文第一至第六部分的内容；"属于哪一种方案"和"哪一类证据"两栏是本章的整理，不是这些哲学家自己的分类。</b>
          同一位思想家可能跨越几种方案；阿皮亚和后期的洪通基没有单独列出。关于奥耶乌米和她的批评者的内容依据二手介绍，本章没有阅读原书。第三步没有标准答案。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
