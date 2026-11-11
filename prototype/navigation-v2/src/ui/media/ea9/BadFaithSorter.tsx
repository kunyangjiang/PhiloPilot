import { Band, Claim, Limits, Pick, Verdict, useSavedIx } from '../jw1/shared';

// 三 · after the table of bad-faith scenes (content/EA9_SAMPLE_DRAFT.md).
// Situated freedom: the reader sorts eight sayings into "affirms only facticity",
// "affirms only transcendence", or (Beauvoir's distinction, 四) "cannot count as bad
// faith". Displayed items 1, 3, 5, 7 are the chapter's table; 2, 6 are the waiter sayings
// from 想一想（三）; 4, 8 apply Beauvoir's two kinds of obedience from 四 and are constructed here.

const ID = 'bad-faith-sorter';

type K = 'fact' | 'trans' | 'not';
const KS: readonly (readonly [K, string])[] = [
  ['fact', '只肯定实际性'],
  ['trans', '只肯定超越性'],
  ['not', '不能算作自欺'],
];

const ITEMS: { id: string; who: string; t: string; k: K; why: string }[] = [
  { id: 'i1', who: '一个考试失利的学生', t: '"我天生就不是学数学的料。"', k: 'fact', why: '把一个可以改变的处境说成一个固定的本质，以免为自己的选择负责。' },
  { id: 'i5', who: '咖啡馆的侍者', t: '"我只是一个侍者，别的什么都不是。"', k: 'fact', why: '试图以"自在的"方式是侍者，像石头就是石头那样。' },
  { id: 'i2', who: '同一个学生', t: '"过去的成绩说明不了任何事，我想成为什么就能成为什么。"', k: 'trans', why: '否认过去的选择和处境对现在的真实限制。' },
  { id: 'i7', who: '一个工人', t: '雇主以解雇和失去生计相威胁，他服从了。', k: 'not', why: '波伏瓦：受到剥削、奴役或恐吓的人对他人权威的服从，不能算作自欺。' },
  { id: 'i3', who: '一个执行了不公正命令的职员', t: '"我只是在做我的工作。"', k: 'fact', why: '把自己当作一个角色的执行者，否认自己仍然可以拒绝。' },
  { id: 'i6', who: '同一个侍者', t: '"我根本不是侍者，端盘子的那个人不是我。"', k: 'trans', why: '否认自己确实处在这个实际的处境中，在某种意义上就是侍者。' },
  { id: 'i4', who: '同一个职员事后', t: '"那不是真正的我，我的内心是反对的。"', k: 'trans', why: '用"真正的我"把已经作出的行为与自己隔开。' },
  { id: 'i8', who: '一个可以参与决定的成年人', t: '"这些事让上面的人决定吧，我照做就好。"', k: 'fact', why: '波伏瓦：选择继续做"孩子"、服从现成的权威以逃避自由，是自欺；这里把自己固定在"服从者"的位置上。' },
];

interface Saved {
  ans: Record<string, K>;
}
const INIT: Saved = { ans: {} };

export default function BadFaithSorter() {
  const [st, save] = useSavedIx<Saved>('EA9', ID, INIT);
  const done = ITEMS.filter((x) => x.id in st.ans).length;
  const right = ITEMS.filter((x) => st.ans[x.id] === x.k).length;
  const all = done === ITEMS.length;

  return (
    <section className="md c3 c5" aria-labelledby="bf-title">
      <header className="md-head">
        <p className="md-tag">自欺与处境中的自由 · 分拣</p>
        <h3 id="bf-title" className="md-title">这句话只肯定了哪一面？还是根本不能算作自欺？</h3>
        <p className="md-lede">
          任何行为都可以从实际性和超越性两个角度看；只肯定其中的一面，就构成自欺。可是波伏瓦提醒：不是每一种不自由都是自己的责任。把下面八种说法或处境分一分。
        </p>
      </header>

      <Band>
        一 · 分拣（已分 {done} / {ITEMS.length}）
      </Band>
      <ol className="v21-steps" aria-label="八种说法或处境">
        {ITEMS.map((x, i) => {
          const a = st.ans[x.id];
          const has = x.id in st.ans;
          return (
            <li key={x.id} className="v21-step">
              <span className="v21-n" aria-hidden="true">
                {i + 1}
              </span>
              <span>
                <b>{x.who}：</b>
                {x.t}
                <Pick label={`${x.who}：${x.t}`} value={a} opts={KS} onPick={(v) => save({ ans: { ...st.ans, [x.id]: v } })} />
                {has && (
                  <span aria-live="polite">
                    <Verdict ok={a === x.k} yes="对" no="再想想" />
                    {a === x.k ? x.why : '先问：这句话把自己说成了一个固定的东西，还是说成了不受任何事实约束的东西？或者，这个人是否受到了外部的强迫？'}
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ol>

      {all && (
        <div aria-live="polite">
          <Band>二 · 处境中的自由（{right} / {ITEMS.length} 项与本章的说明一致）</Band>
          <Claim b="course">
            同一个人可以在两个方向上自欺：侍者既可以"只是侍者"，也可以"根本不是侍者"；职员先说"只是在做工作"，事后又说"那不是真正的我"。问题不在于担任角色，而在于怎样担任它。
          </Claim>
          <Claim b="course">
            第 4 项与第 8 项的区别是波伏瓦对早期萨特的修正：压迫从外部剥夺了一些人行使自由的条件。把一个受到恐吓的人的服从叫做"自欺"，是把压迫的责任推给了受压迫者。
          </Claim>
        </div>
      )}

      <Limits>
        <p>
          <b>第 1、3、5、7 项来自本章第三部分的表；第 2、6 项（侍者的两句）来自"想一想（三）"；第 4、8 项（工人和成年人）是依据第四部分波伏瓦的区分为这个练习构造的。</b>现实中的处境很少这样单纯：一个人可能既受到一定的压力，又有一部分选择的余地。这个分拣只练习区分的方向，不对任何具体的人下判断。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
