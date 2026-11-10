import { Band, Claim, Limits, Seg, Tag, useSavedIx, Verdict } from './shared';

// 四 · after the paired-arguments table ("这张表是本章的整理。前三行的论证和反驳…").
// For each pair of arguments about the eternity of the world: read both sides,
// then say which premise the disagreement turns on. The pairs, their sources and
// the diagnosis of the disputed premise are the chapter's own (四, notes 34–36).

const ID = 'eternity-workshop';
type Row = 'inf' | 'motion' | 'time' | 'will' | 'kalam' | 'create';
type B = 'text' | 'scholar' | 'later' | 'course';

const ROWS: {
  k: Row;
  t: string;
  start: string;
  sb: B;
  sw: string;
  eternal: string;
  eb: B;
  ew: string;
  opts: [string, string][];
  ans: string;
  why: string;
}[] = [
  {
    k: 'inf',
    t: '无限',
    start: '现实的无限是不可能的；过去的时间如果无限，就不能被"走完"。',
    sb: 'scholar',
    sw: '肯迪，追随菲洛波诺斯（据 SEP）',
    eternal: '过去的时间只是潜在的无限，不是一个已经完成的整体。',
    eb: 'scholar',
    ew: '亚里士多德的区分（据 SEP）',
    opts: [
      ['a', '"潜在的无限"是否也不可能'],
      ['b', '两个相等的东西之间的差别是否为零'],
      ['c', '时间是否是运动的量度'],
    ],
    ans: 'a',
    why: '双方都承认现实的无限不可能；分歧在于，已经过去的时间是不是一个"完成了的"整体。如果是，它就是现实的无限；如果不是，亚里士多德可以说它只是潜在的。',
  },
  {
    k: 'motion',
    t: '运动',
    start: '运动需要一个开始运动的原因。',
    sb: 'course',
    sw: '本章的概括',
    eternal: '任何"第一次运动"之前，必须已经有一个使它开始的变化，所以运动没有第一次。',
    eb: 'scholar',
    ew: '亚里士多德《物理学》第八卷（本章转述）',
    opts: [
      ['a', '运动是否需要原因'],
      ['b', '开始运动本身是否也是一种需要先前变化的变化'],
      ['c', '宇宙是否是有限的'],
    ],
    ans: 'b',
    why: '双方都同意运动有原因；永恒论者的要点是：从静止到运动的"开始"本身就是一个变化，它又需要一个更早的变化。主张开端的一方必须说明，为什么创造不是这种意义上的"变化"。',
  },
  {
    k: 'time',
    t: '时间',
    start: '时间与物体一起被创造。',
    sb: 'scholar',
    sw: '肯迪（据 SEP）',
    eternal: '说"时间开始之前"，已经预设了时间。',
    eb: 'scholar',
    ew: '亚里士多德（本章转述）',
    opts: [
      ['a', '时间能否有一个"之前"没有时间的开端'],
      ['b', '时间是否属于物体'],
      ['c', '神是否有意志'],
    ],
    ans: 'a',
    why: '主张开端的一方说"在第一个时刻之前"没有任何东西，包括时间；永恒论者说，"开端"这个概念本身就要求一个"之前"。分歧在于"开端"是否必须是时间中的事件。',
  },
  {
    k: 'will',
    t: '神的意志',
    start: '神可以自由地决定在某个时刻创造世界。',
    sb: 'course',
    sw: '本章的概括',
    eternal: '一个不变的神，为什么在这个时刻而不是更早的时刻创造？',
    eb: 'later',
    ew: '后来的哲学家的论证，本章只作预告',
    opts: [
      ['a', '神是否全知'],
      ['b', '世界是否由原子组成'],
      ['c', '神的意志能否没有理由地"选择"一个时刻'],
    ],
    ans: 'c',
    why: '永恒论者认为，没有理由的选择要么不可能，要么意味着神发生了变化；主张开端的一方认为，意志的本性正是能够在相同的选项中作选择。',
  },
  {
    k: 'kalam',
    t: '凯拉姆的"新生"论证',
    start: '物体不能没有偶性，偶性是有开端的；不能没有有开端的东西的，本身也有开端；所以一切物体都有开端。',
    sb: 'scholar',
    sw: '本章根据研究文献转述',
    eternal: '偶性的系列本身可以没有开端。',
    eb: 'scholar',
    ew: '哲学家的回答（本章转述）',
    opts: [
      ['a', '偶性是否存在于原子之中'],
      ['b', '每一个都有开端的东西组成的系列，本身是否也必须有开端'],
      ['c', '物体能否没有偶性'],
    ],
    ans: 'b',
    why: '每一个偶性都有开端，双方都同意；分歧在于：一个由有开端的成员组成的系列，能否作为整体没有开端。这又回到了第一行的无限问题。',
  },
  {
    k: 'create',
    t: '"创造"的意思',
    start: '《古兰经》说神"创造"了天地，创造意味着有开端。',
    sb: 'course',
    sw: '本章的概括',
    eternal: '"创造"可以理解为永恒的依赖，而不是时间上的开端。',
    eb: 'later',
    ew: '后来阿维森纳的立场，见下一门课程',
    opts: [
      ['a', '"创造"是否必须是时间上的开端'],
      ['b', '《古兰经》是否是神的言语'],
      ['c', '时间是否是运动的量度'],
    ],
    ans: 'a',
    why: '双方都承认世界被神"创造"、依赖于神；分歧在于"创造"的意思：是一个时间上的开始，还是存在上的依赖。',
  },
];

interface Saved {
  row: Row;
  pick: Partial<Record<Row, string>>;
}
const INIT: Saved = { row: 'inf', pick: {} };

export default function EternityWorkshop() {
  const [st, save] = useSavedIx<Saved>('IA1', ID, INIT);
  const r = ROWS.find((x) => x.k === st.row) ?? ROWS[0];
  const pick = st.pick ?? {};
  const mine = pick[r.k];
  const done = ROWS.filter((x) => pick[x.k]).length;

  return (
    <section className="md c3 c5" aria-labelledby="ew-title">
      <header className="md-head">
        <p className="md-tag">世界是永恒的吗？ · 工作坊</p>
        <h3 id="ew-title" className="md-title">
          分歧在哪一个前提上？
        </h3>
        <p className="md-lede">每一对论证都从一些双方都承认的东西出发，在某一个具体的前提上分道扬镳。逐行读两方的论证，再找出那个前提。这里不判哪一方赢了。</p>
      </header>

      <Band>一 · 选一对论证</Band>
      <Seg name="ew-row" label="选择一对论证" value={r.k} opts={ROWS.map((x) => [x.k, x.t] as const)} onPick={(v) => save({ ...st, row: v as Row })} />
      <div className="v21-two" aria-live="polite">
        <div>
          <h4>主张世界有开端</h4>
          <p>{r.start}</p>
          <Tag b={r.sb} who={r.sw} />
        </div>
        <div>
          <h4>主张世界永恒</h4>
          <p>{r.eternal}</p>
          <Tag b={r.eb} who={r.ew} />
        </div>
      </div>

      <Band>二 · 分歧在哪里？</Band>
      <Seg name={'ew-p-' + r.k} label="分歧所在的前提" value={mine ?? null} col opts={r.opts} onPick={(v) => save({ ...st, pick: { ...pick, [r.k]: v } })} />
      {mine && (
        <p className="md-feedback" aria-live="polite">
          <Verdict ok={mine === r.ans} yes="是" no="不是这一个" />
          {r.why}
        </p>
      )}
      <p className="md-muted" aria-live="polite">
        已作答 {done} / {ROWS.length}。
      </p>

      {done === ROWS.length && (
        <Claim b="course" who="合起来看">
          六对论证中，有几对最后都回到同一个问题：一个已经过去的无限系列，是不是一个"完成了的"整体。肯迪说是，所以它不可能；亚里士多德的支持者说不是。这个问题在后来的伊斯兰哲学和欧洲哲学（康德的第一个二律背反）中还会出现。
        </Claim>
      )}

      <Limits>
        <p>
          <b>这些论证都是概括。</b>前三行在肯迪和亚里士多德的著作中有文献根据，但本章是根据 SEP 转述的；第四、六行的永恒论一方是后来的论证；第五行的凯拉姆论证本章根据研究文献转述。"分歧所在的前提"是本章的诊断，可以有不同的看法。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
