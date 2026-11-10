import { Band, Claim, Limits, OrigSrc, Pick, Verdict, useSavedIx } from '../jw1/shared';

// 四 · after "用这张表时请注意两点" (how to follow a dialectical argument).
// The chapter's six-question checklist, walked through one row at a time for
// either of the chapter's two worked examples (being–nothing–becoming; self-
// consciousness). At the transition row the reader says where the opposite
// comes from — the point that separates Hegel's moments from "thesis–antithesis–
// synthesis" (Maybee, SEP, notes 31 and 34). The last row asks whether the step
// is necessary; that question is left open.
// The German lines are the chapter's checked passages (Logik 1812, note 33;
// Phänomenologie, §四/§五 of the chapter).

const ID = 'dialectic-stepper';

type Ex = 'being' | 'self';
const QS = [
  '出发的规定是什么？',
  '它的片面性在哪里？',
  '它过渡到什么？',
  '来回过渡揭示了什么？',
  '新的规定是什么？',
  '新规定怎样"扬弃"旧的？',
];
const ROWS: Record<Ex, string[]> = {
  being: [
    '纯有——仅仅是"有"，没有任何进一步的规定。（知性的环节：一个看似稳定的规定。）',
    '没有任何规定。想"纯有"，实际上想到的是一片空白。',
    '纯无。"纯无"同样没有规定，于是又过渡回"纯有"。（辩证的环节。）',
    '有和无不能分开地被思考。',
    '变：从有到无（消逝），从无到有（产生）。（思辨的环节。）',
    '它依靠有和无来定义自己：既取代它们（否定），又保存它们。',
  ],
  self: [
    '"我就是我"：一种自足的确定性。（知性的环节。）',
    '没有内容；它的确定性依赖于对象。',
    '欲望：在对象上确认自己，把对象据为己有、消耗掉。（辩证的环节。）',
    '被否定的对象一消失，确认也随之消失；欲望不断需要新的对象。',
    '承认：只有另一个自我意识能既被"否定"又不因此消失。（思辨的环节。）',
    '自我意识的独立性被保存，但只能在关系中实现。',
  ],
};
const EOPTS = [
  ['being', '例子一：有—无—变'],
  ['self', '例子二：自我意识'],
] as const;

type From = 'outside' | 'inside';
const FOPTS = [
  ['outside', '从外面来：另一个相反的立场'],
  ['inside', '从它自己的片面性来'],
] as const;

interface Saved {
  ex: Ex;
  i: number;
  from: From | null;
}
const INIT: Saved = { ex: 'being', i: 0, from: null };

export default function DialecticStepper() {
  const [st, save] = useSavedIx<Saved>('EA5', ID, INIT);
  const rows = ROWS[st.ex];
  const i = Math.min(Math.max(st.i, 0), QS.length - 1);
  const gate = i === 2 && st.from !== 'inside';

  return (
    <section className="md c3 c5" aria-labelledby="ds-title">
      <header className="md-head">
        <p className="md-tag">黑格尔的辩证法 · 一步一步地跟随</p>
        <h3 id="ds-title" className="md-title">
          反面从哪里来？
        </h3>
        <p className="md-lede">
          用本章的六个问题，一行一行地走一遍黑格尔自己的例子。走到"过渡"那一行，先回答：反面是从外面加进来的，还是从这个规定自己的片面性来的？
        </p>
      </header>

      <Pick
        label="选择例子"
        value={st.ex}
        opts={EOPTS}
        onPick={(v) => save({ ex: v, i: 0, from: null })}
      />

      {st.ex === 'being' ? (
        <OrigSrc
          src="黑格尔《逻辑学》第一卷第一册，纽伦堡，1812 年"
          lang="de"
          orig="Das reine Seyn und das reine Nichts ist dasselbe."
          zh="纯有和纯无是同一个东西。"
        />
      ) : (
        <OrigSrc
          src="黑格尔《精神现象学》第四章，Lasson 编，1907 年"
          lang="de"
          orig="Das Selbstbewußtsein erreicht seine Befriedigung nur in einem anderen Selbstbewußtsein."
          zh="自我意识只有在另一个自我意识中才能得到它的满足。"
        />
      )}

      <Band>
        第 {i + 1} / {QS.length} 行 · {QS[i]}
      </Band>
      <ol className="v21-steps" aria-label="已经走过的各行">
        {rows.slice(0, i + 1).map((t, k) => (
          <li key={k} className={'v21-step' + (k === i ? ' is-on' : '')}>
            <span className="v21-n" aria-hidden="true">
              {k + 1}
            </span>
            <span>
              <b>{QS[k]}</b> {k === 2 && gate ? '（先回答下面的问题）' : t}
            </span>
          </li>
        ))}
      </ol>

      {i === 2 && (
        <div>
          <p className="md-muted">"{rows[0].split('（')[0]}"为什么会过渡到它的反面？</p>
          <Pick label="反面从哪里来" value={st.from} opts={FOPTS} onPick={(v) => save({ ...st, from: v })} />
          {st.from && (
            <p aria-live="polite">
              <Verdict ok={st.from === 'inside'} yes="对" no="再想想" />
              {st.from === 'inside'
                ? '第一个规定自己的片面性使它过渡到反面；第二个环节不是外来的攻击，而是第一个规定的内在问题的暴露。'
                : '这是"正题—反题—合题"给人的印象：先有一个立场，然后从外面来了一个相反的立场。据 Maybee 的条目，黑格尔从来没有用这套三分法描述自己的方法。'}
            </p>
          )}
        </div>
      )}

      {i === QS.length - 1 && (
        <Claim b="course" who="评价这一步">
          评价一个辩证的推进，就是追问：这一步的过渡是必然的吗？还是有别的可能的过渡？许多对黑格尔的批评正是从这里开始的（见"后世批判与回应"）。这里不给答案。
        </Claim>
      )}

      <div className="v22-btns" role="group" aria-label="前后移动">
        <button type="button" className="v22-btn" disabled={i === 0} onClick={() => save({ ...st, i: i - 1 })}>
          上一行
        </button>
        <button type="button" className="v22-btn" disabled={i === QS.length - 1 || gate} onClick={() => save({ ...st, i: i + 1 })}>
          下一行
        </button>
      </div>

      <Limits>
        <p>
          <b>六个问题和两列内容是本章的整理。</b>"知性的—辩证的—思辨的"三个环节依据 Maybee 的 SEP 条目；例子一的五步编排是本章依据条目作出的，例子二是本章的重建。这个演示不是一台"辩证法机器"：真正的辩证推进要逐步说明每一次过渡为什么是从前一个规定的内在问题来的，而这正是读者要去检验的地方。两段德文分别核对过 1812 年《逻辑学》初版和 Lasson 1907 年编《精神现象学》的公有领域印本。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
