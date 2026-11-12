import { Band, Claim, Limits, Pick, useSavedIx } from '../jw1/shared';

// 三 · after the table setting the accounts of universals side by side
// (content/S2_SAMPLE_DRAFT.md). Three steps, none graded:
// 1. The reader picks the account they find most plausible to start with.
// 2. Four test cases from the chapter (two red things; one thing in many
//    places; is resemblance itself shared?; does "牛性" do anything?). For each,
//    the chosen account's answer is shown and the reader judges whether that
//    answer is acceptable to them.
// 3. A summary of the reader's own judgements, with the cost the chapter names
//    for that account; then the reader may switch accounts and compare.
// Each account's answers restate the chapter's table and its sources (SEP
// "Nominalism in Metaphysics", the IN3 course on Nyāya and Dharmakīrti). Zhu
// Xi's li is deliberately left out: the chapter says li was not proposed to
// answer the question of predication.

const ID = 'universals-test';

type A = 'immanent' | 'nyaya' | 'apoha' | 'resemblance' | 'trope';
type T = 'two-red' | 'many-places' | 'resemblance' | 'efficacy';
type J = 'ok' | 'cost' | 'unsure';

const ACCOUNTS: readonly (readonly [A, string])[] = [
  ['immanent', '内在的实在论'],
  ['nyaya', '正理—胜论派'],
  ['apoha', '佛教知识论（遮诠）'],
  ['resemblance', '相似唯名论'],
  ['trope', '特普理论'],
];

const TESTS: { id: T; q: string }[] = [
  { id: 'two-red', q: '这个苹果和那个番茄都是红的。为什么？' },
  { id: 'many-places', q: '同一个东西，能不能同时完整地在许多地方？' },
  { id: 'resemblance', q: '苹果和番茄相似，番茄和旗也相似。这些"相似"是同一个东西吗？' },
  { id: 'efficacy', q: '"牛性"本身能起作用吗——能拉车吗？' },
];

const ANS: Record<A, { cost: string; a: Record<T, string> }> = {
  immanent: {
    cost: '同一个东西怎样同时完整地在许多地方？',
    a: {
      'two-red': '因为同一个"红"完整地出现在每一个红的东西中。',
      'many-places': '能：共相只存在于个别的事物之中，却同时在所有红的东西中。这正是这种立场必须承认的。',
      resemblance: '相似可以用共有同一个共相来说明，所以不需要把相似当作基本的东西。',
      efficacy: '这种立场不以"能不能起作用"来判断是否真实；阿姆斯特朗把共相当作事态的成分。',
    },
  },
  nyaya: {
    cost: '要承认共相和内属这些"不能起作用"的东西是真实的。',
    a: {
      'two-red': '因为它们都有同一个真实的共相，共相通过"内属"在个别的事物中。',
      'many-places': '能：共相通过内属在许多个别的事物之中；"存在"是最高的共相（《胜论经》1.2.7）。',
      resemblance: '相同不是由相似来说明的：同一个共相被知觉到，所以我们说它们是同类。',
      efficacy: '共相可以被知觉；它是否"能起作用"不是判断真实的标准——这正是与法称争论的地方。',
    },
  },
  apoha: {
    cost: '要解释没有共同本质的东西为什么会有相同的效果。',
    a: {
      'two-red': '不是因为有一个共同的"红"，而是因为它们都不同于非红的东西（遮诠），并引起同样的判断。',
      'many-places': '不能，也不需要：只有刹那的、个别的东西是真实的，共相只是概念构造。',
      resemblance: '不需要一个共同的"相似"：不同的东西有相同的效果，就像几种不同的植物都能退烧。',
      efficacy: '不能——只有个别的牛能拉车。所以"牛性"不是真实的东西（法称）。',
    },
  },
  resemblance: {
    cost: '相似的回溯：相似本身是不是一个被许多对东西共有的东西？',
    a: {
      'two-red': '因为它们彼此相似。',
      'many-places': '不需要：没有共相，也就没有一个同时在许多地方的东西。',
      resemblance: '这正是它的困难：如果这些"相似"是同一个，相似就是一个共相；如果不是，就需要更高的相似，开始回溯。',
      efficacy: '只有个别的东西存在，问题不出现；但它没有说明相似从哪里来。',
    },
  },
  trope: {
    cost: '同样要依赖"完全相似"，因而同样面对相似的问题。',
    a: {
      'two-red': '因为每一个都有一个自己的、特殊的红，这些红彼此完全相似。',
      'many-places': '不需要：苹果的红和番茄的红是两个不同的红。',
      resemblance: '特普之间的"完全相似"要么是基本的，要么又要被说明——这里遇到与相似唯名论相同的问题。',
      efficacy: '特殊的属性在个别的事物中，可以说是起作用的东西；本章没有讨论这一点，这是本组件的推测。',
    },
  },
};

const JS: readonly (readonly [J, string])[] = [
  ['ok', '我能接受'],
  ['cost', '这是一个代价'],
  ['unsure', '拿不准'],
];

interface Saved {
  account: A | null;
  judge: Partial<Record<A, Partial<Record<T, J>>>>;
}
const INIT: Saved = { account: null, judge: {} };

export default function UniversalsTest() {
  const [st, save] = useSavedIx<Saved>('S2', ID, INIT);
  const acc = st.account;
  const mine = acc ? st.judge[acc] ?? {} : {};
  const done = TESTS.filter((t) => mine[t.id]).length;
  const tried = ACCOUNTS.filter(([a]) => TESTS.every((t) => st.judge[a]?.[t.id]));
  const count = (a: A, j: J) => TESTS.filter((t) => st.judge[a]?.[t.id] === j).length;

  return (
    <section className="md c3 c5" aria-labelledby="ut-title">
      <header className="md-head">
        <p className="md-tag">共相 · 用测试案例比较几种回答</p>
        <h3 id="ut-title" className="md-title">选一种回答，让它面对四个案例</h3>
        <p className="md-lede">
          先选一种你最想先试的回答。然后看它怎样回答四个测试案例，并对每一个回答说出你的看法：能接受，还是一个代价。可以换一种回答再试，比较它们各自付出了什么。
        </p>
      </header>

      <Band>一 · 你先试哪一种回答？</Band>
      <Pick label="要测试的回答" value={acc} opts={ACCOUNTS} onPick={(v) => save({ ...st, account: v })} />

      {acc && (
        <div aria-live="polite">
          <Band>二 · 四个测试案例（已判断 {done} / {TESTS.length}）</Band>
          <ol className="v21-steps" aria-label="四个测试案例">
            {TESTS.map((t, i) => {
              const j = mine[t.id];
              return (
                <li key={t.id} className="v21-step">
                  <span className="v21-n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span>
                    <span>
                      <b>{t.q}</b>
                    </span>
                    <span>{ANS[acc].a[t.id]}</span>
                    <Pick
                      label={`你怎样看这个回答：${t.q}`}
                      value={j}
                      opts={JS}
                      onPick={(nv) => save({ ...st, judge: { ...st.judge, [acc]: { ...mine, [t.id]: nv } } })}
                    />
                  </span>
                </li>
              );
            })}
          </ol>

          {done === TESTS.length && (
            <div aria-live="polite">
              <Band>三 · 这种回答在你看来付出了什么？</Band>
              <p className="md-muted">
                你能接受 {count(acc, 'ok')} 个回答，认为 {count(acc, 'cost')} 个是代价，{count(acc, 'unsure')} 个拿不准。本章给这种回答记下的主要代价是：{ANS[acc].cost}
              </p>
              {tried.length > 1 && (
                <ul className="md-muted">
                  {tried.map(([a, name]) => (
                    <li key={a}>
                      {name}：能接受 {count(a, 'ok')}，代价 {count(a, 'cost')}，拿不准 {count(a, 'unsure')}。
                    </li>
                  ))}
                </ul>
              )}
              <Claim b="course">
                每一种回答都付出了代价，只是付在不同的地方。比较的不是"哪一种没有代价"，而是你愿意付出哪一种代价。也要注意：组合论（第五部分）以共相的实在论为前提——在这里的选择，会限制你在别的问题上的选择。
              </Claim>
            </div>
          )}
        </div>
      )}

      <Limits>
        <p>
          <b>五种回答、四个测试案例和每一种回答的代价，都复述本章第三部分的表格和讨论；正理—胜论派和法称的部分依据《知识、推理与辩论》一课。</b>
          这个组件不评分，也不判定哪一种回答"赢了"：计数的是你自己的看法。表中的超越的实在论和朱熹的理没有放进来：前者本章只简单提到；后者本章说明，理不是为了回答谓述问题而提出的，放进这样的测试会抹掉它的规范意义。特普理论对"能否起作用"的回答是本组件的推测，已在文中标出。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
