import { useState } from 'react';
import { Band, Claim, Limits, useSavedIx } from '../jw1/shared';

// 六 · after the ten principles, the worked repair of the 齐物 / 空 comparison
// and the paragraph introducing the exercise (content/D1_SAMPLE_DRAFT.md).
// A second flawed comparison, written for this exercise (it is not a quotation
// and not the chapter's own example), built only from material the chapter
// has already discussed: the 和合本 rendering of logos as 道 (part 二), the
// "East and West" blocks (parts 一 and 三), 严复's warning against "it all came
// from the East" (part 三), radical incommensurability (part 二) and reversed
// orientalism (part 三). For each clause the reader marks the principles they
// think it breaks; the component then sets the chapter-style analysis beside
// the reader's choice, without scoring. A revised version, organized by the
// six questions, follows. The analysis is one analysis, not the only answer.

const ID = 'comparison-repair';

const PRINCIPLES: { n: number; short: string; text: string }[] = [
  { n: 1, short: '共同的问题', text: '说出共同的问题' },
  { n: 2, short: '保留术语', text: '保留原来的术语，先在它自己的传统中解释它' },
  { n: 3, short: '什么不能翻译', text: '说出什么不能翻译' },
  { n: 4, short: '不当作整体', text: '不把一个传统当作一个整体' },
  { n: 5, short: '对称', text: '对称：用同样的标准对待双方' },
  { n: 6, short: '不以一方为标准', text: '不以一方为标准' },
  { n: 7, short: '证据的种类', text: '标明证据的种类：有记载的影响、学派层面的整理、教学的重建' },
  { n: 8, short: '真正的分歧', text: '说出真正的分歧，而不只是相似' },
  { n: 9, short: '文本与语境', text: '注意文本的种类和语境' },
  { n: 10, short: '目的与限度', text: '说明比较的目的和它不能证明的东西' },
];

const CLAUSES: { id: string; text: string; ps: number[]; why: string }[] = [
  {
    id: 'c1',
    text: '"《约翰福音》说\'太初有道\'，可见基督教的 logos 和老子的\'道\'是同一个概念。"',
    ps: [2, 3, 8],
    why: '"道"是和合本译者为 logos 选的译名；第二部分说，这个翻译在两个传统之间建立了一个历史上并不存在的联系。从一个译名推出"同一个概念"，就没有先在各自的传统中解释 logos 和"道"（2），没有说出译名丢掉了什么（3），也只看到了相似（8）。',
  },
  {
    id: 'c2',
    text: '"这说明早在两千年前，东西方就已经有了相通的智慧，"',
    ps: [4, 10],
    why: '从一个例子推出"东方""西方"的整体特征（4）；从一个译名的比较，推出关于两大文明的结论，这是比较不能证明的（10）。',
  },
  {
    id: 'c3',
    text: '"也许正是东方的思想传到了西方。"',
    ps: [7],
    why: '相似不等于来源。没有文献证明的影响，只能标为假说（7）。这正是严复在《天演论·自序》中警告的那种说法："其學皆得於東來"。',
  },
  {
    id: 'c4',
    text: '"只有东方人能真正理解\'道\'，因为西方的语言是分析性的。"',
    ps: [4, 10],
    why: '把"西方的语言"当作一个整体（4），又从语言推出谁能理解什么（10）。它把等级倒了过来（"东方"更高明），却保留了二分本身，这接近第三部分说的"颠倒过来的东方主义"；它还接近激进的不可通约论，而第二部分说明，这种主张很难被有根据地主张。',
  },
];

const SIX: { q: string; a: string }[] = [
  { q: '问题', a: '和合本的译者为什么用"道"来译 logos？这个译名让中文读者联想到什么？——修改后的比较问的是一个翻译的问题，而不是"两个概念是否相同"。' },
  { q: '概念', a: 'logos 和"道"各有自己的意思范围；《诠释、翻译与哲学写作》对这几个词的分析说明，没有一个译名能覆盖它们的全部意思。' },
  { q: '论证', a: '原来的比较没有论证，只有一个译名。修改后的版本不从译名推出任何关于概念或文明的结论。' },
  { q: '比较的根据', a: '有记载的是一个翻译的事实：和合本用"道"译 logos。' },
  { q: '限度', a: '这个事实只说明译者的选择和读者的联想；它不说明两个概念相同，不说明任何影响，也推不出关于"东方""西方"的结论。' },
  { q: '影响还是重建', a: '两个概念之间的联系是译者建立的（翻译史的事实），不是两个传统之间历史上的影响。' },
];

interface Saved {
  marks: Record<string, number[]>;
  shown: string[];
}
const INIT: Saved = { marks: {}, shown: [] };

export default function ComparisonRepair() {
  const [st, save] = useSavedIx<Saved>('D1', ID, INIT);
  const [six, setSix] = useState(false);
  const allShown = CLAUSES.every((c) => st.shown.includes(c.id));

  const toggle = (cid: string, n: number) => {
    const cur = st.marks[cid] ?? [];
    const next = cur.includes(n) ? cur.filter((x) => x !== n) : [...cur, n].sort((a, b) => a - b);
    save({ ...st, marks: { ...st.marks, [cid]: next } });
  };

  return (
    <section className="md c3 c5" aria-labelledby="cr-title">
      <header className="md-head">
        <p className="md-tag">十条原则 · 一段有缺陷的比较</p>
        <h3 id="cr-title" className="md-title">这一句违反了哪些原则？</h3>
        <p className="md-lede">下面这段比较是为练习而设的。请逐句选出你认为它违反的原则（可以多选），再看本章式的分析。分析不是唯一的答案：同一句话可能违反不止一条原则，你也可能看到这里没有列出的问题。</p>
      </header>

      <Band>一 · 十条原则</Band>
      <ol className="v21-steps" aria-label="十条原则">
        {PRINCIPLES.map((p) => (
          <li key={p.n} className="v21-step">
            <span className="v21-n" aria-hidden="true">
              {p.n}
            </span>
            <span>{p.text}</span>
          </li>
        ))}
      </ol>

      <Band>二 · 逐句诊断</Band>
      <ol className="v21-steps" aria-label="有缺陷的比较，逐句">
        {CLAUSES.map((c, i) => {
          const mine = st.marks[c.id] ?? [];
          const shown = st.shown.includes(c.id);
          const both = c.ps.filter((n) => mine.includes(n));
          const onlyMine = mine.filter((n) => !c.ps.includes(n));
          const onlyThem = c.ps.filter((n) => !mine.includes(n));
          return (
            <li key={c.id} className="v21-step">
              <span className="v21-n" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <p>
                  <b>{c.text}</b>
                </p>
                <div className="v22-btns" role="group" aria-label={`第 ${i + 1} 句违反的原则（可多选）`}>
                  {PRINCIPLES.map((p) => (
                    <button
                      key={p.n}
                      type="button"
                      className="v22-btn"
                      aria-pressed={mine.includes(p.n)}
                      aria-label={`原则 ${p.n}：${p.text}`}
                      onClick={() => toggle(c.id, p.n)}
                    >
                      {p.n} {p.short}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="md-reset"
                  aria-expanded={shown}
                  onClick={() => save({ ...st, shown: shown ? st.shown.filter((x) => x !== c.id) : [...st.shown, c.id] })}
                >
                  {shown ? '收起分析' : '看分析'}
                </button>
                {shown && (
                  <div aria-live="polite">
                    <Claim b="course">
                      分析列出的原则：{c.ps.join('、')}。{c.why}
                    </Claim>
                    <p className="md-muted">
                      {mine.length === 0
                        ? '你还没有选择原则。'
                        : [
                            both.length ? `你和分析都选了：${both.join('、')}。` : '',
                            onlyThem.length ? `分析还列出：${onlyThem.join('、')}。` : '',
                            onlyMine.length ? `你另外选了：${onlyMine.join('、')}——想一想它是否也成立。` : '',
                          ].join('')}
                    </p>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <Band>三 · 一个修改过的版本</Band>
      {allShown || six ? (
        <div aria-live="polite">
          <ol className="v21-steps" aria-label="用六个问题修改">
            {SIX.map((s, i) => (
              <li key={s.q} className="v21-step">
                <span className="v21-n" aria-hidden="true">
                  {i + 1}
                </span>
                <span>
                  <b>{s.q}。</b>
                  {s.a}
                </span>
              </li>
            ))}
          </ol>
          <Claim b="course">修改后的版本变"弱"了：它不再说"同一个概念"，也不再说"东方""西方"怎样。但它说出的东西更准确，而且指向一个真正可以研究的问题：一个译名怎样在两个传统之间制造了联系。</Claim>
        </div>
      ) : (
        <p className="md-muted">
          看过四句的分析后，这里会出现一个用六个问题修改过的版本。
          <button type="button" className="md-reset" onClick={() => setSix(true)}>
            现在就看
          </button>
        </p>
      )}

      <Limits>
        <p>
          <b>这段有缺陷的比较是为练习而设的，不是引文。</b>
          十条原则和六个问题依据本章第六部分；"太初有道"依据第二部分沿用的《诠释、翻译与哲学写作》一课；严复的话依据第三部分沿用的《中国哲学与现代》一课。分析是一种分析，不是唯一的答案；组件不评分。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => { setSix(false); save(INIT); }}>
        重新开始
      </button>
    </section>
  );
}
