import { Band, Claim, Limits, Pick, Verdict, useSavedIx } from '../jw1/shared';

// 三 · after the table of the "______ 本来可能不是 ______" test (content/EA10_SAMPLE_DRAFT.md).
// Rigid designation: the reader judges six expressions rigid or not, then sees what each
// picks out in three small worlds; afterwards the necessary a posteriori is tested on
// 长庚星 = 启明星. Expressions 1–4 are the chapter's table; 5–6 come from 想一想（三）.
// The three worlds are constructed for this exercise.

const ID = 'rigidity-tester';

type R = 'r' | 'n';
const RS: readonly (readonly [R, string])[] = [
  ['r', '严格'],
  ['n', '不严格'],
];

const WORLDS = [
  ['w₁', '现实世界'],
  ['w₂', '马其顿国王为亚历山大请了另一位老师；金星的轨道不同，黄昏时西方最亮的是木星'],
  ['w₃', '太阳系只形成了七颗行星'],
] as const;

const ITEMS: { id: string; e: string; k: R; refs: [string, string, string]; why: string }[] = [
  { id: 'e1', e: '亚里士多德', k: 'r', refs: ['亚里士多德', '亚里士多德（他没有教亚历山大）', '亚里士多德'], why: '"亚里士多德本来可能不是亚里士多德"听起来是假的：他本来可能不教书，却不可能不是他自己。' },
  { id: 'e2', e: '亚历山大大帝的老师', k: 'n', refs: ['亚里士多德', '另一位学者', '亚里士多德'], why: '在 w₂ 中，这个描述挑出了另一个人。' },
  { id: 'e3', e: '9', k: 'r', refs: ['9', '9', '9'], why: '"9 本来可能不是 9"是假的。' },
  { id: 'e4', e: '太阳系的行星数目', k: 'n', refs: ['8', '8', '7'], why: '在 w₃ 中，这个描述挑出的是 7。' },
  { id: 'e5', e: '长庚星', k: 'r', refs: ['金星', '金星（此时它不在黄昏的西方最亮）', '金星'], why: '这个名字一旦用来命名金星，在每一个金星存在的世界中都指金星，不管它在那里亮不亮。' },
  { id: 'e6', e: '黄昏时西方最亮的那颗星', k: 'n', refs: ['金星', '木星', '金星'], why: '在 w₂ 中，这个描述挑出的是木星。名字和与名字联系在一起的描述，正是克里普克要分开的东西。' },
];

type Nec = 'nec' | 'cont';
type Apr = 'a' | 'p';
const NECS: readonly (readonly [Nec, string])[] = [
  ['nec', '都为真：必然的'],
  ['cont', '有的世界为假：偶然的'],
];
const APRS: readonly (readonly [Apr, string])[] = [
  ['a', '只凭思考：先天的'],
  ['p', '需要观察天象：后天的'],
];
interface Saved {
  ans: Record<string, R>;
  nec: Nec | null;
  apr: Apr | null;
}
const INIT: Saved = { ans: {}, nec: null, apr: null };

export default function RigidityTester() {
  const [st, save] = useSavedIx<Saved>('EA10', ID, INIT);
  const done = ITEMS.filter((x) => x.id in st.ans).length;
  const right = ITEMS.filter((x) => st.ans[x.id] === x.k).length;
  const all = done === ITEMS.length;

  return (
    <section className="md c3 c5" aria-labelledby="rt-title">
      <header className="md-head">
        <p className="md-tag">严格指示词 · 检验</p>
        <h3 id="rt-title" className="md-title">它在每一个可能世界里，都挑出同一个东西吗？</h3>
        <p className="md-lede">
          先用"______ 本来可能不是 ______"判断六个表达式是否严格，再看它们在三个小世界里各挑出了什么。最后用两个严格指示词检验"必然的后天真理"。
        </p>
      </header>

      <Band>三个世界</Band>
      <ul className="v21-steps" aria-label="三个世界">
        {WORLDS.map(([w, d]) => (
          <li key={w} className="v21-step">
            <b>{w}</b>：{d}
          </li>
        ))}
      </ul>

      <Band>
        一 · 判断（已判断 {done} / {ITEMS.length}）
      </Band>
      <ol className="v21-steps" aria-label="六个表达式">
        {ITEMS.map((x, i) => {
          const a = st.ans[x.id];
          const has = x.id in st.ans;
          return (
            <li key={x.id} className="v21-step">
              <span className="v21-n" aria-hidden="true">
                {i + 1}
              </span>
              <span>
                <b>"{x.e}"</b>
                <Pick label={`"${x.e}"是严格指示词吗`} value={a} opts={RS} onPick={(v) => save({ ...st, ans: { ...st.ans, [x.id]: v } })} />
                {has && (
                  <span aria-live="polite">
                    <Verdict ok={a === x.k} yes="对" no="再想想" />
                    {a === x.k ? x.why : '试一试：把它填进"______ 本来可能不是 ______"的两个空里，这句话可能是真的吗？'}
                    <span className="md-muted">
                      {' '}
                      它挑出的：w₁ {x.refs[0]}；w₂ {x.refs[1]}；w₃ {x.refs[2]}。
                    </span>
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ol>

      {all && (
        <div aria-live="polite">
          <Band>二 · 必然的，却是后天的？（{right} / {ITEMS.length} 项判断与本章一致）</Band>
          <p className="md-lede">"长庚星"和"启明星"都是金星的名字，都是严格的。那么"长庚星是启明星"：</p>
          <ol className="v21-steps" aria-label="两个问题">
            <li className="v21-step">
              <span>
                <b>在 w₁、w₂、w₃ 中，它是否都为真？</b>
                <Pick
                  label="长庚星是启明星是必然的还是偶然的"
                  value={st.nec}
                  opts={NECS}
                  onPick={(v) => save({ ...st, nec: v })}
                />
                {st.nec && (
                  <span aria-live="polite">
                    <Verdict ok={st.nec === 'nec'} yes="对" no="再想想" />
                    {st.nec === 'nec'
                      ? '两个名字在每一个世界中都指金星，所以同一在每一个世界中都成立。在 w₂ 中金星不在黄昏最亮，这改变的是描述挑出什么，而不是名字指什么。'
                      : '回到第 5 项：名字在 w₂ 中仍然指金星。改变的只是"黄昏时西方最亮的那颗星"这个描述。'}
                  </span>
                )}
              </span>
            </li>
            <li className="v21-step">
              <span>
                <b>古人是怎样知道它的？</b>
                <Pick
                  label="长庚星是启明星是先天的还是后天的"
                  value={st.apr}
                  opts={APRS}
                  onPick={(v) => save({ ...st, apr: v })}
                />
                {st.apr && (
                  <span aria-live="polite">
                    <Verdict ok={st.apr === 'p'} yes="对" no="再想想" />
                    {st.apr === 'p'
                      ? '这是认识的事：我们怎样知道它。必然性是形而上学的事：世界能否是别的样子。两者分属不同的区分。'
                      : '古人并不知道长庚星就是启明星；发现这一点要靠天文观察。'}
                  </span>
                )}
              </span>
            </li>
          </ol>
          {st.nec === 'nec' && st.apr === 'p' && (
            <Claim b="course">
              这就是本章重建的三步：如果两个严格指示词指称同一个对象，同一就是必然的；可是发现它需要经验；所以存在必然的后天真理。不知道它，说明的是我们认识的处境，而不是世界本来可能不同。
            </Claim>
          )}
        </div>
      )}

      <Limits>
        <p>
          <b>第 1—4 项来自本章第三部分的表，第 5、6 项来自"想一想（三）"；三个世界是为这个练习构造的。</b>论证依赖若干前提，并不自明。本章也提到，直接指称论者认为"长庚星是启明星"所表达的命题与"长庚星是长庚星"相同，因而是先天的；后天发现的，其实是关于这两个名字的事实。这个练习只演示克里普克的论证形式。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
