import { Band, Claim, Limits, Pick, useSavedIx } from '../jw1/shared';

// 四 · after the evidence matrix and the paragraph on what it is for
// (content/D10_SAMPLE_DRAFT.md). The reader picks one influence claim from the
// matrix, answers the chapter's five questions for it, chooses a label, then
// sees the chapter's matrix row. For the Leibniz claim the chapter's three
// rewrites (part 五) can then be stepped through. The matrix row and the
// rewrites are quoted from the chapter; the per-question notes summarise the
// chapter's discussion. Nothing is scored.

const ID = 'evidence-rater';

type Cl = 'latin' | 'causis' | 'asoka-c' | 'asoka-i' | 'pyrrho' | 'hume' | 'milinda' | 'leibniz';
const CLAIMS: readonly (readonly [Cl, string])[] = [
  ['latin', '拉丁经院哲学受到阿维森纳和阿威罗伊的影响'],
  ['causis', '《原因之书》摘录自普罗克洛'],
  ['asoka-c', '阿育王与希腊国王有接触'],
  ['asoka-i', '阿育王的"法"影响了希腊哲学'],
  ['pyrrho', '皮浪的怀疑论受到印度思想的影响'],
  ['hume', '休谟的"束论"来自佛教'],
  ['milinda', '弥兰王与那先的对话真实发生过'],
  ['leibniz', '莱布尼茨从《易经》中发明了二进制'],
];

type Ans = 'yes' | 'partly' | 'no';
const ANS: readonly (readonly [Ans, string])[] = [
  ['yes', '有'],
  ['partly', '不确定'],
  ['no', '没有'],
];

const QS: readonly string[] = ['年代允许吗？', '有具体的途径吗？', '有文本的证据吗？', '没有更好的替代解释吗？', '主张的范围与证据相称吗？'];

type Label = 'doc' | 'recon' | 'school' | 'spec' | 'none';
const LABELS: readonly (readonly [Label, string])[] = [
  ['doc', '［有文献记录］'],
  ['recon', '［学界重建］'],
  ['school', '［学派层面］'],
  ['spec', '［推测］'],
  ['none', '没有证据'],
];

/** The chapter's matrix row (quoted) and its overall judgment. */
const ROW: Record<Cl, { contact: string; route: string; text: string; alt: string; verdict: string }> = {
  latin: { contact: '有', route: '有：译本、译者的名字', text: '有：大量引用', alt: '不能解释全部', verdict: '［有文献记录］' },
  causis: { contact: '有', route: '有：阿拉伯文本', text: '有：逐条的对应', alt: '没有更好的解释', verdict: '［学界重建］，而且阿奎那已经提出' },
  'asoka-c': { contact: '有', route: '有：坎大哈的希腊文法敕', text: '有：法敕中的名字', alt: '—', verdict: '［有文献记录］' },
  'asoka-i': { contact: '有', route: '不清楚', text: '没有', alt: '—', verdict: '没有证据' },
  pyrrho: { contact: '有可能', route: '他到过印度', text: '很弱，来源有问题', alt: '希腊内部的怀疑传统', verdict: '［推测］，有讨论的余地' },
  hume: { contact: '有可能', route: '一个具体的假说', text: '没有', alt: '他自己的观念理论', verdict: '途径是［推测］；影响没有证据' },
  milinda: { contact: '有：希腊人在印度西北部', route: '—', text: '只有一部文学的对话', alt: '文学的虚构', verdict: '接触是［学界重建］；对话是［推测］' },
  leibniz: { contact: '有：通过耶稣会士', route: '有：书信', text: '有：书信', alt: '他在看到卦图以前已经发展了二进制', verdict: '见第五部分' },
};

/** Part 五: the three rewrites, quoted. */
const REWRITES: readonly (readonly [string, string])[] = [
  ['原句', '莱布尼茨从《易经》中发明了二进制。'],
  ['改写一（核对年代）', '莱布尼茨在看到《易经》以前，已经发明了二进制。'],
  ['改写二（找出是谁作出了联系）', '莱布尼茨在看到《易经》卦图以前已经发明了二进制；看到白晋寄来的卦图以后，他和白晋都认为卦图的排列与二进制相合。'],
  [
    '改写三（最后的版本）',
    '莱布尼茨大约在 1674—1679 年间发展了二进制算术。二十多年以后，在华的耶稣会士白晋给他寄去了伏羲六十四卦的一种排列图，并把它解读为二进制的数；莱布尼茨接受了这个解读，把它看作对自己发现的印证。至于《易经》的作者是否知道二进制，这不是同一个问题，现有的证据不支持这样说。',
  ],
];

interface Saved {
  cl: Cl | null;
  answers: Record<string, Ans[]>;
  label: Record<string, Label>;
  shown: boolean;
  step: number;
}
const INIT: Saved = { cl: null, answers: {}, label: {}, shown: false, step: 0 };


export default function EvidenceRater() {
  const [st, save] = useSavedIx<Saved>('D10', ID, INIT);
  const cl = st.cl;
  const ans = cl ? st.answers[cl] ?? [] : [];
  const lab = cl ? st.label[cl] : undefined;
  const done = ans.filter(Boolean).length === QS.length && !!lab;
  const setAns = (i: number, a: Ans) => {
    if (!cl) return;
    const next = [...ans];
    next[i] = a;
    save({ ...st, answers: { ...st.answers, [cl]: next } });
  };

  return (
    <section className="md c3 c5" aria-labelledby="erv-title">
      <header className="md-head">
        <p className="md-tag">接触、传播与影响 · 证据矩阵</p>
        <h3 id="erv-title" className="md-title">这个影响的主张有多少证据？</h3>
        <p className="md-lede">选矩阵中的一个主张，用本章的五个问题检查它，给它一个标记，再看本章矩阵中的那一行。对莱布尼茨的那句话，还可以一步一步看本章的改写。组件不评分。</p>
      </header>

      <Band>一 · 选一个主张</Band>
      <Pick label="选择一个影响的主张" value={cl} opts={CLAIMS} onPick={(c) => save({ ...st, cl: c, shown: false, step: 0 })} />

      {cl && (
        <>
          <Band>二 · 五个问题</Band>
          {QS.map((q, i) => (
            <Pick key={q} label={`${i + 1}. ${q}`} value={ans[i] ?? null} opts={ANS} onPick={(a) => setAns(i, a)} />
          ))}
          <Band>三 · 你的标记</Band>
          <Pick label="给这个主张一个标记" value={lab ?? null} opts={LABELS} onPick={(l) => save({ ...st, label: { ...st.label, [cl]: l } })} />
          <button type="button" className="md-reset" aria-expanded={st.shown} disabled={!done && !st.shown} onClick={() => save({ ...st, shown: !st.shown })}>
            {st.shown ? '收起本章的判断' : done ? '看本章的判断' : '先回答五个问题并选标记'}
          </button>
          {st.shown && (
            <div aria-live="polite">
              <Claim b="course" who="本章的证据矩阵">
                接触：{ROW[cl].contact}；传播的途径：{ROW[cl].route}；文本证据：{ROW[cl].text}；替代的解释：{ROW[cl].alt}。总体判断：{ROW[cl].verdict}。
              </Claim>
              <p className="md-muted">
                你的标记是{LABELS.find(([v]) => v === lab)?.[1]}。
                {ans.filter((a) => a === 'yes').length >= 4
                  ? '你对大多数问题回答了"有"。请再检查第五个问题：主张说的是"可能听说过"、"读过"，还是"思想来自"？'
                  : '你对一些问题回答了"不确定"或"没有"。本章的教训是：同一个历史关系中，不同的主张可以有完全不同的证据强度。'}
              </p>
            </div>
          )}

          {cl === 'leibniz' && st.shown && (
            <>
              <Band>四 · 本章的改写</Band>
              {REWRITES.slice(0, st.step + 1).map(([t, s]) => (
                <Claim key={t} b="course" who={t}>
                  {s}
                </Claim>
              ))}
              {st.step < REWRITES.length - 1 ? (
                <button type="button" className="md-reset" onClick={() => save({ ...st, step: st.step + 1 })}>
                  下一步改写
                </button>
              ) : (
                <p className="md-muted">最后的版本比原句长了很多，也没有那么吸引人；但它的每一句话都有根据，而且明确地说出了它不知道的东西。</p>
              )}
            </>
          )}
        </>
      )}

      <Limits>
        <p>
          主张、矩阵各栏和总体判断取自本章第四部分的"证据矩阵"；改写取自本章第五部分。五个问题和四种标记取自本章第一部分和导读。矩阵是本章的判断，依据本章所读的资料（见各部分的注释），其中一些资料本章只通过二手文献了解。你的回答和标记只保存在这个浏览器里。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
