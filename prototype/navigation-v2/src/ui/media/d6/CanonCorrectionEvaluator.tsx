import { Band, Claim, Limits, Pick, useSavedIx } from '../jw1/shared';

// 六 · after the seven-step procedure for evaluating a correction and the
// paragraph introducing the exercise (content/D6_SAMPLE_DRAFT.md). The reader
// picks one of three invented correction proposals and walks the chapter's
// seven steps: for each step, the reader judges whether the proposal meets it,
// then sees an analysis. The proposals and the analyses are written for this
// exercise from the chapter's procedure and examples, and say so; proposal 1
// is the one the chapter's own hint in 四 uses. No proposal is declared the
// right one; nothing is scored.

const ID = 'canon-correction-evaluator';

const STEPS: readonly string[] = [
  '说明主张的类型',
  '为每一种主张找相应的证据',
  '回到原文',
  '区分找回与赞同',
  '问"还有谁仍然不在"',
  '避免反方向的错误',
  '公开标明未完成的部分',
];

type J = 'yes' | 'no' | 'unclear';
const JS: readonly (readonly [J, string])[] = [
  ['yes', '做到了'],
  ['no', '没有做到'],
  ['unclear', '方案没有说清楚'],
];

interface Proposal {
  id: string;
  text: string;
  a: readonly { j: J; why: string }[];
}

const PROPOSALS: Proposal[] = [
  {
    id: 'p1',
    text: '方案一：在一门入门课每一章的末尾，加一位女性哲学家，附一段生平。',
    a: [
      { j: 'unclear', why: '方案没有说明它在纠正什么：是某些女性被排除的事实，还是排除的理由？主张的类型不清楚，证据也就无从找起。' },
      { j: 'unclear', why: '生平需要传记的证据，但方案没有说明每位女性收入的理由需要什么证据。' },
      { j: 'no', why: '只附生平，读者读不到她的论证。本章第二部分说：理由应当是她的论证，而不只是她的处境。' },
      { j: 'unclear', why: '方案没有说明，如果某位女性的观点不为今天的读者赞同（例如班昭的《女诫》），她是否还会被收入。' },
      { j: 'no', why: '按库珀的论点：只沿性别一条轴线，找回来的可能主要是某一个种族、某一个阶层的女性。方案没有问还有谁仍然不在。' },
      { j: 'unclear', why: '生平的写法容易变成"她怎样克服困难"的形象；是否夸大了她的影响，要看具体的写法。' },
      { j: 'no', why: '方案没有说哪些说法还没有核实。' },
    ],
  },
  {
    id: 'p2',
    text: '方案二：把《探究》作为"非洲的笛卡尔"放进入门课，用来证明非洲也有书面的哲学。',
    a: [
      { j: 'no', why: '方案把一个关于作者归属的主张（作者是十七世纪的埃塞俄比亚人）当作已经确定的，用来支持一个关于排除的主张。' },
      { j: 'no', why: '作者归属需要版本和文献学的研究；《非洲哲学思想》说明，两种可能都有学者支持，证据都不是决定性的。' },
      { j: 'unclear', why: '方案没有说明读者会读到文本本身的论证，还是只读到"非洲的笛卡尔"这个标签。' },
      { j: 'yes', why: '收入《探究》不要求赞同它的观点；这一步本身不是方案的问题。' },
      { j: 'unclear', why: '方案只加了一部文本；它没有问非洲的其他材料以什么方式出现，也没有问在这个纠正之后，还有谁在两个问题中都是"未知的因素"（库珀）。' },
      { j: 'no', why: '"非洲的笛卡尔"是用一个新的、同样没有证据的形象代替旧的形象；课程体系草案明确规定不得这样称呼它。' },
      { j: 'no', why: '方案隐藏了作者问题，而本章说，一部想要纠正偏见的哲学史，必须同时教授作者问题。' },
    ],
  },
  {
    id: 'p3',
    text: '方案三：把心身问题一节改写为笛卡尔与伊丽莎白的通信，附原文和论证的重建，并注明她的信的流传和影响需要历史的证据，本课没有核对。',
    a: [
      { j: 'yes', why: '方案区分了哲学的主张（她的论证是一个有力的反驳）和历史的主张（她的信影响了谁）。' },
      { j: 'yes', why: '论证的质量用原文和重建来检验；影响的主张被标为需要历史证据。' },
      { j: 'yes', why: '方案附了原文，读者可以直接读她的论证。' },
      { j: 'unclear', why: '这一节以论证为中心，这一步不太相关；但方案没有说明，如果别的章节遇到观点不受欢迎的女性，会怎样处理。' },
      { j: 'unclear', why: '改造了一节，但没有问别的问题中还有谁不在；库珀的问题需要在每一次纠正之后重新问。' },
      { j: 'yes', why: '方案没有说"伊丽莎白推动了十七世纪的哲学走向某个方向"，避免了本章第三部分所说的改造的风险。' },
      { j: 'yes', why: '方案注明了没有核对的部分。' },
    ],
  },
];

interface Saved {
  pid: string | null;
  step: number;
  pred: Record<string, J>;
  shown: Record<string, boolean>;
}
const INIT: Saved = { pid: null, step: 0, pred: {}, shown: {} };

const jName = (j: J) => JS.find(([v]) => v === j)?.[1] ?? j;

export default function CanonCorrectionEvaluator() {
  const [st, save] = useSavedIx<Saved>('D6', ID, INIT);
  const p = PROPOSALS.find((x) => x.id === st.pid) ?? null;
  const i = st.step;
  const key = p ? `${p.id}.${i}` : '';
  const mine = p ? st.pred[key] : undefined;
  const shown = p ? !!st.shown[key] : false;
  const done = p ? STEPS.every((_, k) => st.shown[`${p.id}.${k}`]) : false;

  return (
    <section className="md c3 c5" aria-labelledby="cce-title">
      <header className="md-head">
        <p className="md-tag">纠正的纪律 · 七步程序</p>
        <h3 id="cce-title" className="md-title">这个纠正方案经得起检查吗？</h3>
        <p className="md-lede">选一个假想的纠正方案，用本章第六部分的七步程序逐一检查：先判断它在每一步上做到了没有，再看分析。组件不判定哪一个方案是唯一正确的，也不评分。</p>
      </header>

      <Band>一 · 选一个方案</Band>
      <Pick
        label="选择一个纠正方案"
        value={st.pid}
        opts={PROPOSALS.map((x, k) => [x.id, `方案${'一二三'[k]}`] as const)}
        onPick={(id) => save({ ...st, pid: id, step: 0 })}
      />

      {p && (
        <>
          <p>
            <b>{p.text}</b>
          </p>
          <Band>二 · 逐步检查</Band>
          <Pick label="选择程序的一步" value={i} opts={STEPS.map((s, k) => [k, `${k + 1}. ${s}`] as const)} onPick={(k) => save({ ...st, step: k })} />
          <p className="md-muted">
            第 {i + 1} 步：{STEPS[i]}。这个方案做到了吗？
          </p>
          <Pick label={`第 ${i + 1} 步的判断`} value={mine ?? null} opts={JS} onPick={(j) => save({ ...st, pred: { ...st.pred, [key]: j } })} />
          <button
            type="button"
            className="md-reset"
            aria-expanded={shown}
            disabled={!mine && !shown}
            onClick={() => save({ ...st, shown: { ...st.shown, [key]: !shown } })}
          >
            {shown ? '收起分析' : mine ? '看分析' : '先判断，再看分析'}
          </button>
          {shown && (
            <div aria-live="polite">
              <Claim b="course" who={`第 ${i + 1} 步`}>
                {jName(p.a[i].j)}。{p.a[i].why}
                {mine && mine !== p.a[i].j ? `你的判断是"${jName(mine)}"：你和这个分析对方案的哪一句话读法不同？` : ''}
              </Claim>
              {i < STEPS.length - 1 && (
                <button type="button" className="md-reset" onClick={() => save({ ...st, step: i + 1 })}>
                  下一步
                </button>
              )}
            </div>
          )}
          {done && (
            <p className="md-muted" aria-live="polite">
              七步都看过了。这个方案在 {p.a.filter((x) => x.j === 'yes').length} 步上做到了，在 {p.a.filter((x) => x.j === 'no').length} 步上没有做到，在{' '}
              {p.a.filter((x) => x.j === 'unclear').length} 步上没有说清楚。这不是一个分数：本章说，这七步要求的是区分事实与解释、回到原文、标明证据的限度，而不是接受某一种立场。试试另一个方案。
            </p>
          )}
        </>
      )}

      <Limits>
        <p>
          <b>三个方案都是为本练习而写的假想方案，不是任何人实际提出的。</b>
          七步程序是本章第六部分的；每一步的分析是为本练习而写的，依据本章第一至五部分的例子（伊丽莎白、班昭、库珀、麦考莱、《探究》）。分析是一种读法，不是唯一的答案。组件不宣布哪一个方案正确。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
