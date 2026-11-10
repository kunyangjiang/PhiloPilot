import { Band, Claim, Limits, Verdict, useSavedIx } from '../jw1/shared';

// 六 · after the table comparing the five forms of critique (the chapter's method focus:
// critique is not refutation). Ten statements, two per critic, taken from the
// chapter's own table: the reader sorts each into "it does this" or "it does not
// do this". After every statement is sorted, the five rows are shown with the
// form of each critique. The table is the chapter's own arrangement.

const ID = 'critique-sorter';

type Who = 'feuerbach' | 'marx' | 'kierkegaard' | 'schopenhauer' | 'nietzsche';
const WHO: Record<Who, { n: string; form: string }> = {
  feuerbach: { n: '费尔巴哈', form: '投射：说明宗教观念的来源' },
  marx: { n: '马克思', form: '意识形态批判：说明思想的社会条件' },
  kierkegaard: { n: '克尔凯郭尔', form: '存在的批评：指出体系遗漏了什么' },
  schopenhauer: { n: '叔本华', form: '另一幅世界图景' },
  nietzsche: { n: '尼采', form: '谱系学与视角主义' },
};

const ITEMS: { id: string; who: Who; t: string; does: boolean }[] = [
  { id: 'f1', who: 'feuerbach', t: '揭示了宗教属性与人的类本质的对应。', does: true },
  { id: 'n2', who: 'nietzsche', t: '证明了一个价值"为假"。', does: false },
  { id: 'k1', who: 'kierkegaard', t: '指出体系不能容纳正在抉择的个人。', does: true },
  { id: 'm2', who: 'marx', t: '证明了黑格尔的每一步推理都无效。', does: false },
  { id: 's1', who: 'schopenhauer', t: '表明同样从康德出发，可以通向一个非理性的意志。', does: true },
  { id: 'f2', who: 'feuerbach', t: '直接证明了神不存在。', does: false },
  { id: 'n1', who: 'nietzsche', t: '揭示了价值和理论的来源、需要和视角。', does: true },
  { id: 'k2', who: 'kierkegaard', t: '证明了体系的逻辑是错的。', does: false },
  { id: 'm1', who: 'marx', t: '追问思想服务于什么社会关系；把辩证法"倒过来"。', does: true },
  { id: 's2', who: 'schopenhauer', t: '逐条驳斥了黑格尔。', does: false },
];
const ORDER: Who[] = ['feuerbach', 'marx', 'kierkegaard', 'schopenhauer', 'nietzsche'];

interface Saved {
  ans: Record<string, boolean>;
}
const INIT: Saved = { ans: {} };

export default function CritiqueSorter() {
  const [st, save] = useSavedIx<Saved>('EA6', ID, INIT);
  const done = ITEMS.filter((x) => x.id in st.ans).length;
  const right = ITEMS.filter((x) => st.ans[x.id] === x.does).length;
  const all = done === ITEMS.length;

  const set = (id: string, v: boolean) => save({ ans: { ...st.ans, [id]: v } });

  return (
    <section className="md c3 c5" aria-labelledby="cs-title">
      <header className="md-head">
        <p className="md-tag">批评与驳倒 · 分拣</p>
        <h3 id="cs-title" className="md-title">
          这五种批评各自做到了什么，没有做到什么？
        </h3>
        <p className="md-lede">
          下面十句话，每位批评者两句。按照本章的表，判断每一句是这种批评"做到了"的，还是"没有做到"的。全部分完后，会显示五种批评的形式。
        </p>
      </header>

      <Band>
        一 · 分拣（已分 {done} / {ITEMS.length}）
      </Band>
      <ol className="v21-steps" aria-label="十句话">
        {ITEMS.map((x, i) => {
          const a = st.ans[x.id];
          const has = x.id in st.ans;
          return (
            <li key={x.id} className="v21-step">
              <span className="v21-n" aria-hidden="true">
                {i + 1}
              </span>
              <span>
                <b>{WHO[x.who].n}：</b>
                {x.t}
                <span className="v22-btns" role="group" aria-label={`${WHO[x.who].n}：${x.t}`}>
                  <button type="button" className="v22-btn" aria-pressed={has && a === true} onClick={() => set(x.id, true)}>
                    做到了
                  </button>
                  <button type="button" className="v22-btn" aria-pressed={has && a === false} onClick={() => set(x.id, false)}>
                    没有做到
                  </button>
                </span>
                {has && (
                  <span aria-live="polite">
                    <Verdict ok={a === x.does} yes="对" no="再想想" />
                    {a !== x.does && (x.does ? '本章的表把这一句列为它揭示了的东西。' : '本章的表把这一句列为它没有做到的东西。')}
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ol>

      {all && (
        <div aria-live="polite">
          <Band>二 · 五种批评的形式（{right} / {ITEMS.length} 句与本章的表一致）</Band>
          {ORDER.map((w) => (
            <Claim key={w} b="course" who={WHO[w].n}>
              {WHO[w].form}。
            </Claim>
          ))}
          <p className="md-muted">
            五种批评都不是驳倒：它们没有证明对象为假，却改变了我们看待对象的方式——说明它从哪里来、服务于什么、遗漏了什么。这是本章的方法重点。说明来源不等于证明为假（"起源谬误"）；可是如果一个信念能被完整地说明，而说明完全不需要它为真，持有它的理由就被削弱了。
          </p>
        </div>
      )}

      <Limits>
        <p>
          <b>这张表是本章的整理，不是这五位哲学家对自己的描述。</b>"做到了"和"没有做到"的划分是为了练习"批评"与"驳倒"的区别；每一栏都可以再争论，例如马克思是否认为自己的批评已经足以否定黑格尔的体系，尼采是否认为谱系学单独就能作出评价。这个分拣也不判断哪一种批评最有力。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
