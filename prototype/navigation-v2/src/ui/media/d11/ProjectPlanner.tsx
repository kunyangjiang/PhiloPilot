import { Band, Limits, Pick, useSavedIx } from '../jw1/shared';

// 五 · after the eight-part structure and the paragraph on part 8
// (content/D11_SAMPLE_DRAFT.md). A lightweight planner for the reader's own
// project: choose a track, write one or two sentences for each of the eight
// parts, and tick the chapter's self-check questions. Everything is kept only
// in this browser (useSavedIx); nothing is submitted, collected, graded or
// scored. The worked examples for both tracks can be shown beside each part
// for reference; they are the chapter's examples, not model answers.

const ID = 'project-planner';

type Track = 'A' | 'B';
const TRACKS: readonly (readonly [Track, string])[] = [
  ['A', '路线 A：单一传统'],
  ['B', '路线 B：比较'],
];

/** The chapter's eight parts, with its worked examples (quoted from the table). */
const PARTS: readonly { title: string; ask: string; A: string; B: string }[] = [
  { title: '1 问题', ask: '你的可以回答的问题，一两句话', A: '第十卷第 7—8 章排序的是什么？', B: '13.18 与《游叙弗伦》开头是否在回答同一个问题？' },
  { title: '2 为什么重要', ask: '这个问题和什么更大的争论有关', A: '主导读法与包容读法', B: '"亲亲互隐"的争论中对《游叙弗伦》的使用' },
  { title: '3 来源与版本', ask: '你用了哪些文本、哪个版本、哪些学者', A: 'Bywater 校勘本（Perseus）；SEP', B: '维基文库《论语》；Burnet 校勘本（Perseus）；《孔子、孟子与荀子》' },
  { title: '4 来源的重建', ask: '关键段落说了什么；三种声音分开', A: '1177b26—31、1178a5—10', B: '13.18；《游叙弗伦》4b—e' },
  { title: '5 论证', ask: '论题和编号的论证', A: '第三部分的六步', B: '第三部分的六步' },
  { title: '6 反驳与回应', ask: '最强的反驳和你的回应', A: '1177b26—31 也排列活动', B: '亲属的立场与 4b' },
  { title: '7 独立立场与限度', ask: '修改后的论题；你知道和不知道的', A: '第五部分的路线 A', B: '第五部分的路线 B' },
  { title: '8 来源说明', ask: '你读了什么、没读什么；哪些是转述；用了哪些工具', A: '例如：第十卷第 8 章 1178b5—7 只据转述', B: '例如：争论的文章只读了一部分' },
];

/** The chapter's self-check list; 7 and 8 are for the comparative track. */
const CHECKS: readonly (readonly [string, boolean])[] = [
  ['我的问题是可以回答的吗？', false],
  ['我的每一句话，都能说清是文本、学者还是我自己的声音吗？', false],
  ['我的论证中，最弱的一步是哪一步？我说出来了吗？', false],
  ['我回应的是最强的反驳吗？', false],
  ['我的立场有没有说出它的限度？', false],
  ['我有没有把任何东西说得比证据更强？', false],
  ['我确认过两边在回答同一个问题吗？', true],
  ['我有没有把相似当作影响？', true],
];

interface Saved {
  track: Track | null;
  parts: string[];
  checks: boolean[];
  showEx: boolean;
}
const INIT: Saved = { track: null, parts: [], checks: [], showEx: false };

const areaStyle = {
  width: '100%',
  font: 'inherit',
  fontSize: '14.5px',
  padding: '8px 10px',
  border: '1px solid var(--ink-3)',
  borderRadius: 'var(--radius)',
  background: 'var(--bg)',
  color: 'var(--ink)',
  resize: 'vertical' as const,
};

export default function ProjectPlanner() {
  const [st, save] = useSavedIx<Saved>('D11', ID, INIT);
  const track = st.track;
  const setPart = (i: number, v: string) => {
    const next = [...st.parts];
    next[i] = v;
    save({ ...st, parts: next });
  };
  const toggle = (i: number) => {
    const next = [...st.checks];
    next[i] = !next[i];
    save({ ...st, checks: next });
  };
  const written = st.parts.filter((p) => p && p.trim()).length;
  const checks = CHECKS.map((c, i) => [c, i] as const).filter(([[, cmp]]) => !cmp || track === 'B');

  return (
    <section className="md c3 c5" aria-labelledby="ppl-title">
      <header className="md-head">
        <p className="md-tag">你的研究 · 提纲</p>
        <h3 id="ppl-title" className="md-title">八个部分，各写一两句话</h3>
        <p className="md-lede">选一条路线，为研究稿的八个部分各写一两句话，再用本章的清单检查一遍。你写的内容只保存在这个浏览器里：不会被提交、收集或评分。</p>
      </header>

      <Band>一 · 选一条路线</Band>
      <Pick label="选择一条路线" value={track} opts={TRACKS} onPick={(t) => save({ ...st, track: t })} />
      <p className="md-muted">两条路线同样有价值。选择哪一条，取决于你真正想问的问题；之后也可以改。</p>

      {track && (
        <>
          <Band>二 · 八个部分</Band>
          <button type="button" className="md-reset" aria-pressed={st.showEx} onClick={() => save({ ...st, showEx: !st.showEx })}>
            {st.showEx ? '隐藏本章的示范' : `在每一部分旁显示本章路线 ${track} 的示范`}
          </button>
          <ol>
            {PARTS.map((p, i) => (
              <li key={p.title}>
                <label>
                  <b>{p.title}</b>：<span className="md-muted">{p.ask}</span>
                  <textarea rows={2} style={areaStyle} value={st.parts[i] ?? ''} onChange={(e) => setPart(i, e.target.value)} />
                </label>
                {st.showEx && <p className="md-muted">本章的示范（路线 {track}）：{p[track]}</p>}
              </li>
            ))}
          </ol>
          <p className="md-muted" aria-live="polite">
            已经写了 {written} / {PARTS.length} 个部分。这只是一个提示，不是分数。
          </p>

          <Band>三 · 自我检查</Band>
          <div className="v22-btns" role="group" aria-label="自我检查清单">
            {checks.map(([[q], i]) => (
              <button key={q} type="button" className="v22-btn" aria-pressed={!!st.checks[i]} onClick={() => toggle(i)}>
                {q}
              </button>
            ))}
          </div>
          <p className="md-muted">
            按下表示你已经诚实地问过自己这个问题，而不是表示答案是"是"。{track === 'B' ? '最后两个问题是比较的路线特有的。' : ''}
          </p>
        </>
      )}

      <Limits>
        <p>
          八个部分和自我检查清单取自本章第五部分；示范取自本章"研究稿的八个部分"的表格，是本章为了示范而写的，不是标准答案。本组件不提交、不收集、不评分；你写的内容只保存在这个浏览器的本地存储中，清除浏览器数据或换一台设备就不会再看到。需要保留时，请自己复制到别处。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        清空并重新开始
      </button>
    </section>
  );
}
