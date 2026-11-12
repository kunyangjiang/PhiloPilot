import { Band, Claim, Limits, Pick, useSavedIx } from '../jw1/shared';

// 三 · after the table "回到青溪：物种有价值吗？" and the paragraph that
// follows it (content/D9_SAMPLE_DRAFT.md). The chapter's method is to test an
// argument about moral standing against hard cases. The reader picks one of
// five theories and one of four hard cases taken from parts 一 to 三,
// predicts what the theory says, then sees a reading. Where the chapter itself
// says what the theory implies for the case, the reading says so; the others
// are written for this exercise from the chapter's account of the theory. No
// theory is declared correct; nothing is scored.

const ID = 'standing-tester';

type Th = 'anthro' | 'senti' | 'subject' | 'bio' | 'eco';
const THS: readonly (readonly [Th, string])[] = [
  ['anthro', '强的人类中心主义'],
  ['senti', '感受中心主义（辛格）'],
  ['subject', '生命主体论（里根）'],
  ['bio', '生物中心主义（泰勒）'],
  ['eco', '生态中心主义（利奥波德、卡利科特）'],
];

type Case = 'last' | 'goats' | 'germs' | 'fish';
const CASES: readonly (readonly [Case, string, string])[] = [
  ['last', '最后一个人', '世界上最后一个人在临死前毁掉了所有剩下的生物和生态系统（第一部分）。'],
  ['goats', '岛上的山羊', '引入的山羊正在毁坏一种稀有的植物，使整个岛的生态系统面临崩溃；生态学家建议捕杀山羊（第二部分末尾）。'],
  ['germs', '病菌与杂草', '为了治疗疾病和耕种庄稼，要杀死致病的微生物和杂草（第三部分）。'],
  ['fish', '青溪的小鱼', '水库会使一种只在青溪生活的小鱼灭绝（导读与第三部分）。'],
];

type Verdict = 'wrong' | 'notwrong' | 'tension' | 'silent';
const VERDICTS: readonly (readonly [Verdict, string])[] = [
  ['wrong', '这个理论说：这是错的（或损失很重）'],
  ['notwrong', '这个理论说：没有什么错'],
  ['tension', '这个理论陷入了困难'],
  ['silent', '这个理论几乎沉默'],
];

/** inChapter: the chapter itself states this reading. */
const R: Record<Th, Record<Case, { v: Verdict; t: string; inChapter?: boolean }>> = {
  anthro: {
    last: { v: 'notwrong', t: '没有人受到伤害，所以强的人类中心主义似乎只能说这没有什么错；但许多人的直觉是这是错的。支持者可以接受这个令人不安的结论，或者用品格来解释，从而转向弱的人类中心主义或德性伦理。', inChapter: true },
    goats: { v: 'silent', t: '山羊、植物和生态系统都只有工具价值；是否捕杀，取决于对人的成本与收益。' },
    germs: { v: 'notwrong', t: '杀死病菌和杂草服务于人的利益，这个理论在这里没有困难。' },
    fish: { v: 'silent', t: '那个物种没有内在价值，可能有科学价值；水库主要看对人类的成本与收益。', inChapter: true },
  },
  senti: {
    last: { v: 'wrong', t: '如果被毁掉的生物中有能感受痛苦的动物，它们的利益受到了损害；但对植物和生态系统本身，这个理论没有话说。' },
    goats: { v: 'tension', t: '每一只山羊都能感受痛苦，它们的利益要得到平等的考虑；而稀有植物和生态系统本身没有利益。这正是动物伦理与环境伦理之间的张力。', inChapter: true },
    germs: { v: 'notwrong', t: '病菌和杂草不能感受痛苦，没有利益，所以这个理论在这里没有困难。' },
    fish: { v: 'silent', t: '物种本身不能感受痛苦，所以这个理论只算个体的鱼可能经受的痛苦，在物种灭绝的问题上几乎沉默。', inChapter: true },
  },
  subject: {
    last: { v: 'wrong', t: '被毁掉的哺乳动物是"一个生命的主体"，有固有的价值；但这个理论同样不直接覆盖植物和生态系统。' },
    goats: { v: 'tension', t: '山羊很可能是"一个生命的主体"，不能仅仅作为保护生态系统的手段；里根的理论禁止为了更大的总体好处牺牲这样的主体，所以它很难支持捕杀。' },
    germs: { v: 'notwrong', t: '病菌和杂草不是"一个生命的主体"，这个理论在这里没有困难。' },
    fish: { v: 'silent', t: '那种小鱼是否是"一个生命的主体"，很可能不是，或者不确定；里根的理论在这里几乎没有给出指导。', inChapter: true },
  },
  bio: {
    last: { v: 'wrong', t: '每一个被毁掉的有机体都是"生命的目的论中心"，都有内在价值；毁灭一切是巨大的损失。' },
    goats: { v: 'tension', t: '山羊和稀有植物都有同等的内在价值；这个理论很难说明为什么应当为了植物而杀死山羊。' },
    germs: { v: 'tension', t: '如果一切生物都有同等的内在价值，致病的微生物和杂草也同样有价值，就很难为治疗疾病和耕种庄稼辩护；泰勒用一套优先的规则回应，批评者认为这使"同等的价值"在实践中几乎失去作用。', inChapter: true },
    fish: { v: 'wrong', t: '每一条鱼都有内在价值；淹没意味着大量生命的毁灭。但人的生存需要可以被考虑。', inChapter: true },
  },
  eco: {
    last: { v: 'wrong', t: '生物共同体的完整、稳定和美被彻底毁掉了，这是最严重的错。' },
    goats: { v: 'wrong', t: '保持生物共同体的完整和稳定，可能要求捕杀山羊；从整体论的角度看，这不是困难，而是结论。代价是：为了整体牺牲个体，正是"环境法西斯主义"指控所针对的结构。' },
    germs: { v: 'notwrong', t: '道德对象是整体而不是个体；只要不损害共同体的完整和稳定，杀死个别的微生物或杂草没有困难。' },
    fish: { v: 'wrong', t: '物种是生物共同体的一部分，灭绝是对完整性的严重损害；但江城人的需要同样属于某种"共同体"，卡利科特的二阶原则需要权衡。', inChapter: true },
  },
};

interface Saved {
  th: Th | null;
  cs: Case | null;
  guess: Record<string, Verdict>;
  shown: boolean;
}
const INIT: Saved = { th: null, cs: null, guess: {}, shown: false };

const thName = (t: Th) => THS.find(([v]) => v === t)?.[1] ?? t;
const vName = (v: Verdict) => VERDICTS.find(([x]) => x === v)?.[1] ?? v;

export default function StandingTester() {
  const [st, save] = useSavedIx<Saved>('D9', ID, INIT);
  const key = st.th && st.cs ? `${st.th}:${st.cs}` : '';
  const mine = key ? st.guess[key] : undefined;
  const r = st.th && st.cs ? R[st.th][st.cs] : null;
  const caseInfo = CASES.find(([c]) => c === st.cs);

  return (
    <section className="md c3 c5" aria-labelledby="sst-title">
      <header className="md-head">
        <p className="md-tag">谁在道德上算数 · 用困难的案例检验</p>
        <h3 id="sst-title" className="md-title">这个理论能通过这个案例吗？</h3>
        <p className="md-lede">选一种关于道德地位的理论和一个困难的案例，先判断这个理论会怎样说，再看读法。困难的案例可以反驳一个理论，也可以逼出它的代价。组件不判定哪一种理论正确，也不评分。</p>
      </header>

      <Band>一 · 选一种理论</Band>
      <Pick label="选择一种理论" value={st.th} opts={THS} onPick={(t) => save({ ...st, th: t, shown: false })} />

      <Band>二 · 选一个困难的案例</Band>
      <Pick label="选择一个案例" value={st.cs} opts={CASES.map(([c, t]) => [c, t] as const)} onPick={(c) => save({ ...st, cs: c, shown: false })} />
      {caseInfo && <p className="md-muted">{caseInfo[2]}</p>}

      {st.th && st.cs && r && (
        <>
          <Band>三 · 先判断，再看读法</Band>
          <Pick label={`${thName(st.th)}会怎样说`} value={mine ?? null} opts={VERDICTS} onPick={(v) => save({ ...st, guess: { ...st.guess, [key]: v } })} />
          <button type="button" className="md-reset" aria-expanded={st.shown} disabled={!mine && !st.shown} onClick={() => save({ ...st, shown: !st.shown })}>
            {st.shown ? '收起读法' : mine ? '看读法' : '先判断，再看读法'}
          </button>
          {st.shown && (
            <div aria-live="polite">
              <Claim b="course" who={`${thName(st.th)} · ${vName(r.v)}`}>
                {r.t}
                {r.inChapter ? '（本章的说法。）' : '（为本练习而写的读法，依据本章对这种理论的介绍。）'}
              </Claim>
              <p className="md-muted">
                {mine === r.v ? '你的判断和这个读法相同。' : `你的判断是"${mine ? vName(mine) : ''}"；这个读法是"${vName(r.v)}"。读法本身也可以争论：请说出你的理由。`}{' '}
                {r.v === 'tension' || r.v === 'silent'
                  ? '一个理论在困难的案例上陷入困难或沉默，不一定说明它错了；支持者可以修改它，或者接受代价。问题是：这个代价你能接受吗？'
                  : '一个理论在这个案例上给出了清楚的答案；再试一个别的案例，看它是否仍然如此。'}
              </p>
            </div>
          )}
        </>
      )}

      <Limits>
        <p>
          <b>青溪、江城和那种小鱼都是本章虚构的。</b>
          五种理论与四个案例都取自本章第一至第三部分。标明"本章的说法"的读法，是本章自己对这一理论在这一案例上的分析；其余的读法是为本练习而写的，依据本章（以及本章所依据的 SEP 条目）对这种理论的介绍。读法是简化的，每一种理论的支持者都有更多的回应。组件不宣布哪一种理论正确。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
