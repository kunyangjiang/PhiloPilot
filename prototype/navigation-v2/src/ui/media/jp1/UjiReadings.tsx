import { Band, Claim, Limits, OrigSrc, Pick, Verdict, useSavedIx } from '../jw1/shared';

// 二 · after step four of the five-step reading of 有時 (content/JP1_SAMPLE_DRAFT.md).
// One sentence, three ways of reading 有時: the ordinary adverb of the verse
// Dōgen quotes, the English rendering being-time, and the rendering for the
// time being. The reader says which reading each of six statements describes;
// then a view (no right answer) on the three interpretive approaches the
// chapter tabulates. The Japanese sentence and its translation are the
// chapter's own; every statement restates the chapter's text.

const ID = 'uji-readings';

type R = 'adverb' | 'being' | 'passing';
const RS: readonly (readonly [R, string])[] = [
  ['adverb', '甲 "有的时候"'],
  ['being', '乙 being-time'],
  ['passing', '丙 for the time being'],
];
const RNAME: Record<R, string> = {
  adverb: '甲、普通的副词"有的时候"',
  being: '乙、being-time（"存在—时间"）',
  passing: '丙、for the time being（"暂时""在这一时刻"）',
};

// Listed out of order on purpose.
const ITEMS: { id: string; text: string; r: R }[] = [
  { id: 'i-metaphys', text: '让读者马上看到一个形而上学的主张。', r: 'being' },
  { id: 'i-verse', text: '道元所引的古佛诗句"有時高高峰頂立、有時深深海底行"中，"有时"就是这个意思。', r: 'adverb' },
  { id: 'i-impermanence', text: '保留了"一切都只是暂时的"这个佛教的主题。', r: 'passing' },
  { id: 'i-general', text: '可能让人以为道元在提出一种关于"存在"的一般理论。', r: 'being' },
  { id: 'i-when', text: '一个关于"什么时候"的说法，而不是关于"什么是"的说法。', r: 'adverb' },
  { id: 'i-hidden', text: '保留了日常语义，却可能让读者看不出道元在做什么。', r: 'passing' },
];

type V = 'metaphysical' | 'phenomenological' | 'practice';
const VS: readonly (readonly [V, string])[] = [
  ['metaphysical', '形而上学的读法'],
  ['phenomenological', '现象学的读法'],
  ['practice', '修行的读法'],
];
const VNOTE: Record<V, string> = {
  metaphysical:
    '长处：抓住了道元的主张超出"修行时的感受"这一点——他说的是"尽界"，整个世界。代价：文章中充满修行的指示和禅宗公案，不像一篇一般理论；乙种译法最接近这种读法，也带着它的风险。',
  phenomenological:
    '长处：把"有时"理解为修行者经验到的时间，可以与现代的时间哲学对话。代价：有把道元读成"东方的海德格尔"的危险；两人之间没有历史联系，相似不是影响。',
  practice:
    '长处：把"有时"一篇读作对"修证一等"的说明，时间理论服务于修行的问题——本章的重建偏向这一种。代价：可能低估文章中真正的哲学主张。',
};

interface Saved {
  pick: Record<string, R>;
  view: V | null;
}
const INIT: Saved = { pick: {}, view: null };

export default function UjiReadings() {
  const [st, save] = useSavedIx<Saved>('JP1', ID, INIT);
  const done = ITEMS.filter((x) => x.id in st.pick).length;
  const ok = ITEMS.filter((x) => st.pick[x.id] === x.r).length;
  const allDone = done === ITEMS.length;

  return (
    <section className="md c3 c5" aria-labelledby="uji-title">
      <header className="md-head">
        <p className="md-tag">译本 · 三种读法</p>
        <h3 id="uji-title" className="md-title">同一个"有时"，三种读法</h3>
        <p className="md-lede">
          下面六条说法，各自描述了哪一种读法？甲是汉语中普通的副词，乙和丙是本章介绍的两种英文译法。顺序是打乱的。最后一步只是你的看法，没有标准答案。
        </p>
      </header>

      <OrigSrc
        src="《正法眼藏·有时》，据村上恭一的论文所引"
        orig="いわゆる有時は、時すでに有なり、有はみな時なり。"
        lang="ja"
        zh={'所谓“有时”，时已经就是有，有都是时。'}
      />

      <Band>一 · 每一条说的是哪一种读法？（已选 {done} / {ITEMS.length}）</Band>
      <ol className="v21-steps" aria-label="六条关于读法的说法">
        {ITEMS.map((x, i) => {
          const a = st.pick[x.id];
          const has = x.id in st.pick;
          return (
            <li key={x.id} className="v21-step">
              <span className="v21-n" aria-hidden="true">
                {i + 1}
              </span>
              <span>
                <span>{x.text}</span>
                <Pick label={`说法 ${i + 1} 描述的是哪一种读法`} value={a} opts={RS} onPick={(v) => save({ ...st, pick: { ...st.pick, [x.id]: v } })} />
                {has && (
                  <span aria-live="polite">
                    <Verdict ok={a === x.r} yes="与本章一致" no="与本章不一致" />
                    {a === x.r ? '' : ` 本章把它归于${RNAME[x.r]}。`}
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ol>
      {allDone && (
        <p className="md-muted" aria-live="polite">
          {ok} / {ITEMS.length} 条与本章一致。甲和乙、丙的差别在语法：道元把一个副词拆成了"有"和"时"两个名词。乙和丙都看到了这一点，代价不同——没有一种译法是中立的。
        </p>
      )}

      {allDone && (
        <div aria-live="polite">
          <Band>二 · 三种解释的读法，你偏向哪一种？</Band>
          <Pick label="你偏向哪一种解释“有时”的读法" value={st.view} opts={VS} onPick={(v) => save({ ...st, view: v })} />
          {st.view && (
            <p className="md-muted" aria-live="polite">
              {VNOTE[st.view]}
            </p>
          )}
          {st.view && (
            <Claim b="course">
              译法和读法是同一个选择的两面：选择一种译法，就已经部分地选择了一种解释。检验的问题是：道元的主张是描述，还是要求？
            </Claim>
          )}
        </div>
      )}

      <Limits>
        <p>
          <b>日文原文和试译都来自本章（据村上恭一的论文所引，见注释）；每一条说法都复述课文的内容，"属于哪一种读法"是本章的整理，不是道元或译者自己的分类。</b>
          本章没有列出两种英文译法各自的译者；三种解释的读法也是本章为了教学而作的整理，具体研究者往往兼用几种。第二步没有标准答案。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
