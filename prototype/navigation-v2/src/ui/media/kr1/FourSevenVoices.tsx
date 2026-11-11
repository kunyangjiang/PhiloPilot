import { Band, Claim, Limits, OrigSrc, Pick, Verdict, useSavedIx } from '../jw1/shared';

// 四 · after the comparison table of the Four-Seven debate
// (content/KR1_SAMPLE_DRAFT.md). Six sentences the chapter quotes, each to be
// attributed to its speaker; then the table's row "理能否发" answered for each
// position; then a view (no right answer) on the chapter's three angles of
// evaluation. Every sentence is quoted in the chapter; the attribution follows
// the chapter's own account, which is the only source the reader is given.

const ID = 'four-seven-voices';

type Who = 'jeong' | 't1559' | 't2' | 'gobong' | 'yulgok';
const WHO: readonly (readonly [Who, string])[] = [
  ['jeong', '郑之云（天命图）'],
  ['t1559', '退溪（1559）'],
  ['t2', '退溪（第二书及批语）'],
  ['gobong', '高峰'],
  ['yulgok', '栗谷'],
];
const WHONAME: Record<Who, string> = Object.fromEntries(WHO) as Record<Who, string>;

// Listed out of order on purpose.
const LINES: { id: string; orig: string; who: Who; note: string }[] = [
  {
    id: 'l-yulgok',
    orig: '天地之化，吾心之發，無非氣發而理乘之也。',
    who: 'yulgok',
    note: '"无非"：一切情只有"气发理乘"这一途，四端也不例外。',
  },
  {
    id: 'l-jeong',
    orig: '四端發於理，七情發於氣。',
    who: 'jeong',
    note: '论争的起点：退溪后来说，他担心这个说法"分别太甚"，所以改了措辞。',
  },
  {
    id: 'l-gobong',
    orig: '情之發也，或理動而氣俱，或氣感而理乘。',
    who: 'gobong',
    note: '接受了退溪的两个短语，却改变了它们的分配：两种模式不再分属四端与七情。',
  },
  {
    id: 'l-t1559',
    orig: '四端之發，純理故無不善；七情之發，兼氣故有善惡。',
    who: 't1559',
    note: '退溪第一次修改郑之云的说法："纯理"与"兼气"，还没有明说理能否"发"。',
  },
  {
    id: 'l-margin',
    orig: '雖發於氣，而理乘之為主，故其善同也。',
    who: 't2',
    note: '这是批语：退溪承认中节的七情与四端同善——立场在论争中变化。',
  },
  {
    id: 'l-t2',
    orig: '四則理發而氣隨之，七則氣發而理乘之耳。',
    who: 't2',
    note: '第二书的表述：四端是"理发"，七情是"气发"，各有所主。',
  },
];

type Can = 'yes' | 'some' | 'no' | 'unsaid';
const CANS: readonly (readonly [Can, string])[] = [
  ['yes', '能'],
  ['some', '有时'],
  ['no', '不能'],
  ['unsaid', '未明说'],
];
const CANNAME: Record<Can, string> = Object.fromEntries(CANS) as Record<Can, string>;
// The chapter's comparison table, row "理能否发".
const CAN: Record<Who, Can> = { jeong: 'yes', t1559: 'unsaid', t2: 'yes', gobong: 'some', yulgok: 'no' };

type Angle = 'consistency' | 'psychology' | 'cultivation';
const ANGLES: readonly (readonly [Angle, string])[] = [
  ['consistency', '哲学上的一致性'],
  ['psychology', '道德心理学的说服力'],
  ['cultivation', '修养上的后果'],
];
const ANOTE: Record<Angle, string> = {
  consistency:
    '这个角度对栗谷有利：他的立场与朱子学"理无为"的前提更一致。可是，如果理完全无为，它怎样"主宰"气？"乘"字本身仍然是一个比喻。',
  psychology:
    '这个角度对退溪有利：道德情感似乎有一种特殊的权威，不只是许多感受中的一种。栗谷的回答是一个统一的心理学：一切情感有同样的基础，区别在于是否合乎理。哪一种更符合你对道德感受的理解？',
  cultivation:
    '两种立场导向不同的修养：退溪从信任和扩充道德情感开始，栗谷的重点是"检束其气"。前者可能把自己的感受误当成理的直接表现，后者可能使修养变成对情感的控制。',
};

interface Saved {
  who: Record<string, Who>;
  can: Partial<Record<Who, Can>>;
  angle: Angle | null;
}
const INIT: Saved = { who: {}, can: {}, angle: null };

export default function FourSevenVoices() {
  const [st, save] = useSavedIx<Saved>('KR1', ID, INIT);
  const whoDone = LINES.filter((l) => l.id in st.who).length;
  const whoOk = LINES.filter((l) => st.who[l.id] === l.who).length;
  const stepOne = whoDone === LINES.length;
  const canDone = WHO.filter(([w]) => w in st.can).length;
  const canOk = WHO.filter(([w]) => st.can[w] === CAN[w]).length;
  const stepTwo = stepOne && canDone === WHO.length;

  return (
    <section className="md c3 c5" aria-labelledby="fsv-title">
      <header className="md-head">
        <p className="md-tag">四端七情 · 谁说的？</p>
        <h3 id="fsv-title" className="md-title">五种声音，一个问题</h3>
        <p className="md-lede">
          下面六句话都在本章中引用过。先说出每一句是谁的说法，再回答比较表中最关键的一行："理能不能发？"最后一步只是你的看法，没有标准答案。
        </p>
      </header>

      <Band>一 · 这句话是谁说的？（已选 {whoDone} / {LINES.length}）</Band>
      <ol className="v21-steps" aria-label="六句引文">
        {LINES.map((l, i) => {
          const a = st.who[l.id];
          const has = l.id in st.who;
          return (
            <li key={l.id} className="v21-step">
              <span className="v21-n" aria-hidden="true">
                {i + 1}
              </span>
              <span>
                <OrigSrc src={`引文 ${i + 1}`} orig={l.orig} lang="zh-Hant" />
                <Pick label={`引文 ${i + 1} 是谁的说法`} value={a} opts={WHO} onPick={(v) => save({ ...st, who: { ...st.who, [l.id]: v } })} />
                {has && (
                  <span aria-live="polite">
                    <Verdict ok={a === l.who} yes="与本章一致" no="与本章不一致" />
                    {a === l.who ? '' : ` 本章把它归于${WHONAME[l.who]}。`}
                    <span className="md-muted"> {l.note}</span>
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ol>
      {stepOne && (
        <p className="md-muted" aria-live="polite">
          {whoOk} / {LINES.length} 句与本章一致。注意 2、3、6 三句：同样的短语在不同人手中被重新分配，这正是这场论争推进的方式。
        </p>
      )}

      {stepOne && (
        <div aria-live="polite">
          <Band>二 · 理能不能"发"？每一方怎样回答？（已选 {canDone} / {WHO.length}）</Band>
          <ol className="v21-steps" aria-label="五种立场对理能否发的回答">
            {WHO.map(([w, name], i) => {
              const a = st.can[w];
              return (
                <li key={w} className="v21-step">
                  <span className="v21-n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span>
                    <span>{name}</span>
                    <Pick label={`${name}：理能否发`} value={a} opts={CANS} onPick={(v) => save({ ...st, can: { ...st.can, [w]: v } })} />
                    {a && (
                      <span aria-live="polite">
                        <Verdict ok={a === CAN[w]} yes="与比较表一致" no="与比较表不一致" />
                        {a === CAN[w] ? '' : ` 比较表记为"${CANNAME[CAN[w]]}"。`}
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ol>
          {stepTwo && (
            <p className="md-muted" aria-live="polite">
              {canOk} / {WHO.length} 项与比较表一致。真正的分歧点很集中：退溪认为可以说理发，高峰部分接受，栗谷断然否认。"主理派对主气派"的标签把这个精细的分歧说得太粗了。
            </p>
          )}
        </div>
      )}

      {stepTwo && (
        <div aria-live="polite">
          <Band>三 · 你认为哪一个评价角度最重要？</Band>
          <Pick label="最重要的评价角度" value={st.angle} opts={ANGLES} onPick={(v) => save({ ...st, angle: v })} />
          {st.angle && (
            <p className="md-muted" aria-live="polite">
              {ANOTE[st.angle]}
            </p>
          )}
          {st.angle && <Claim b="course">本章不判定胜负。三个角度给出的结论并不一致，这本身说明这场论争为什么持续了几百年。</Claim>}
        </div>
      )}

      <Limits>
        <p>
          <b>六句引文都是本章引用过的汉文原文，出处见本章注释；归属和"理能否发"一行都依据本章的比较表，是对书信的整理，不是当事人自己的分类。</b>
          第 5 句是退溪的批语；书信的系年和版本以本章注释为准。本组件没有收入本章只作推断的材料。第三步没有标准答案。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
