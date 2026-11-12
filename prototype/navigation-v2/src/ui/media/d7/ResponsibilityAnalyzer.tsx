import { Band, Claim, Limits, Pick, useSavedIx } from '../jw1/shared';

// 五 · after the table "责任应当怎样分配", its three remarks and the paragraph
// introducing the exercise (content/D7_SAMPLE_DRAFT.md). The reader picks one
// participant in the 江北 case (or the system itself) and two of four
// perspectives (liability, accountability after Nissenbaum, Confucian role
// ethics, Ubuntu), first says how large a share the participant should bear,
// then sees the chapter's row and each perspective's reading. Where the
// chapter itself says what a perspective implies for a participant, the
// reading says so; the others are written for this exercise from the chapter's
// account of the perspective. No perspective is declared correct; nothing is
// scored.

const ID = 'responsibility-analyzer';

type Who = 'design' | 'deploy' | 'inst' | 'user' | 'public' | 'system';
const WHO: readonly (readonly [Who, string])[] = [
  ['design', '设计者（衡数公司）'],
  ['deploy', '部署者（信息科与临床科室）'],
  ['inst', '机构（医院管理层）'],
  ['user', '使用者（护士赵敏）'],
  ['public', '公共的权力（监管部门）'],
  ['system', '系统本身'],
];

/** The chapter's table row (本章的判断). */
const ROW: Record<Who, { did: string; owe: string }> = {
  design: { did: '用代表性不足的数据训练模型；把关键的警告放在六十页附录中', owe: '对已知局限的可见的告知（不只是写下）；在设计中考虑代表性不足的人群；在部署后监测不同人群中的表现' },
  deploy: { did: '为减少虚警调高阈值，没有评估谁会因此被漏掉', owe: '在调整系统时评估后果的分布；把系统的局限告诉一线的使用者' },
  inst: { did: '在人手严重不足的条件下引入系统', owe: '保证使用者有条件运用自己的判断：合理的工作量，以及允许"分数是绿的，但我仍然担心"的工作文化' },
  user: { did: '相信绿色的分数，没有充分回应家属的话', owe: '对眼前病人和家属的信号保持注意；但她的责任要在她的工作条件中评价，不能脱离这些条件单独追究' },
  public: { did: '以较宽松的标准审批', owe: '按照系统实际的影响而不是名义上的分类（"辅助"）来监管' },
  system: { did: '没有在凌晨一点前后发出警报（按调高后的阈值）', owe: '本章的表中没有这一行：在这类案例中，系统的"行为"可以追溯到设计者、部署者和监管者的决定（接近约翰逊的立场）。如果将来出现有稳健能动性的系统，这一点也许需要修改。' },
};

type Lens = 'liab' | 'acct' | 'conf' | 'ubuntu';
const LENSES: readonly (readonly [Lens, string])[] = [
  ['liab', '法律责任（找出可以责备的人）'],
  ['acct', '问责（尼森鲍姆）'],
  ['conf', '儒家的角色伦理'],
  ['ubuntu', 'Ubuntu 的关系伦理'],
];

type Share = 'major' | 'part' | 'cond';
const SHARES: readonly (readonly [Share, string])[] = [
  ['major', '主要的一份'],
  ['part', '部分的一份'],
  ['cond', '要在它的条件中评价'],
];

/** inChapter: the chapter states this reading itself (part 二 or 五). */
const R: Record<Who, Record<Lens, { t: string; inChapter?: boolean }>> = {
  design: {
    liab: { t: '要看合同和法规：警告确实写在文档里，公司可能据此免责。这正说明了"只找一个可以责备的人"的限度。' },
    acct: { t: '公司必须说明它知道什么、告知了什么、怎样监测；问责不因为"写过警告"而结束。' },
    conf: { t: '公司对用户的责任，包括让警告被看见，而不只是被写下；只求"免"的做法正是"民免而无耻"。', inChapter: true },
    ubuntu: { t: '公司与老韩之间几乎没有直接的关系；本章说，关系性的伦理需要说明这种远距离的、以系统为中介的责任从哪里来。', inChapter: true },
  },
  deploy: {
    liab: { t: '调阈值是和临床科室商量后作出的，符合程序；单从是否违反规定看，很难追究。' },
    acct: { t: '信息科和临床科室必须说明调阈值时考虑了什么、没有考虑什么，并改进评估的程序。' },
    conf: { t: '医院的责任包括在调整阈值时问"谁会因此被漏掉"。', inChapter: true },
    ubuntu: { t: '调高阈值使高龄、合并慢性肾病的患者被系统性地漏掉；一个系统性地漏掉某一群人的安排，在实际上把这群人放在了"我们"之外。', inChapter: true },
  },
  inst: {
    liab: { t: '管理层的决定离伤害较远，法律上可能不是首先被追究的一方。' },
    acct: { t: '管理层必须说明为什么在人手严重不足的条件下引入系统，以及怎样保证护士能运用自己的判断。' },
    conf: { t: '为政者的角色要求创造让人能够尽责的条件；一个只靠规定和追究的管理，使每个人努力"免"，而不一定关心病人的结果。' },
    ubuntu: { t: '机构首先要问：老韩和他的家人与医院之间的关系怎样才能被修复？追究放在修复之后，或者放在修复之中。', inChapter: true },
  },
  user: {
    liab: { t: '护士离伤害最近，最容易被选为"可以责备的人"；坦佩的调查报告也把操作员认定为可能的原因。', inChapter: true },
    acct: { t: '护士要说明那天夜里发生了什么；但问责同样适用于所有参与者，她的说明不应当成为别人不说明的理由。' },
    conf: { t: '家属两次说老韩"不太对劲"，这是一个与孟子所说的"乍见"同一类的信号；儒家的视角会问：系统是在扩充护士的恻隐之心，还是在代替它？', inChapter: true },
    ubuntu: { t: '老韩是在与家人的关系中被认识的；家属的话在系统中没有位置，而护士是唯一能把它带回判断中的人。但她的条件（十八个病人）限制了她。' },
  },
  public: {
    liab: { t: '监管部门按分类审批，没有违反规定；从法律责任看，它很难被追究。' },
    acct: { t: '监管部门必须说明为什么按名义上的分类审批，并按系统实际的影响修改监管。' },
    conf: { t: '"道之以政，齊之以刑"：只靠分类和规定的监管，会使每一方都"免"。但本章也说，这不意味着可以不要规定，只是规定不应当是唯一的手段。', inChapter: true },
    ubuntu: { t: '按姆兰比的构想，治理以社会的和谐为目的；本章说，这个目的怎样转化为对具体机构的要求，需要进一步的论证。', inChapter: true },
  },
  system: {
    liab: { t: '系统不能被起诉或赔偿；法律责任最终落在人和机构身上。' },
    acct: { t: '尼森鲍姆的问责是对参与者的要求，系统不能作出说明；但弗洛里迪与桑德斯认为，人工的行动者在另一种意义上可以是可问责的（可以被修正或改造），尽管不是可责备的。', inChapter: true },
    conf: { t: '儒家的角色伦理需要说明，一个由公司、算法和监管部门构成的网络中，"角色"是什么；系统本身不是传统意义上的角色。', inChapter: true },
    ubuntu: { t: '据介绍，姆兰比认为人工智能造成的伤害——尤其是自动化决策系统造成的——在本质上违反了 Ubuntu 的关系性人格。这种视角关心的是系统对关系的影响，而不是系统本身的地位。', inChapter: true },
  },
};

interface Saved {
  who: Who | null;
  lenses: Lens[];
  share: Record<string, Share>;
  shown: boolean;
}
const INIT: Saved = { who: null, lenses: [], share: {}, shown: false };

const lensName = (l: Lens) => LENSES.find(([v]) => v === l)?.[1] ?? l;
const whoName = (w: Who) => WHO.find(([v]) => v === w)?.[1] ?? w;

export default function ResponsibilityAnalyzer() {
  const [st, save] = useSavedIx<Saved>('D7', ID, INIT);
  const two = st.lenses.length === 2;
  const who = st.who;
  const mine = who ? st.share[who] : undefined;

  const toggleLens = (l: Lens) => {
    const has = st.lenses.includes(l);
    const next = has ? st.lenses.filter((x) => x !== l) : st.lenses.length < 2 ? [...st.lenses, l] : [st.lenses[1], l];
    save({ ...st, lenses: next, shown: false });
  };

  return (
    <section className="md c3 c5" aria-labelledby="rsa-title">
      <header className="md-head">
        <p className="md-tag">夜里没有响的警报 · 责任的分配</p>
        <h3 id="rsa-title" className="md-title">这一方应当承担什么？</h3>
        <p className="md-lede">选江北医院案例中的一方，再选两种看责任的视角；先说说你认为这一方应当承担多大的一份，再看本章的判断和两种视角的读法。组件不判定哪一种视角正确，也不评分。</p>
      </header>

      <Band>一 · 选一方</Band>
      <Pick label="选择案例中的一方" value={st.who} opts={WHO} onPick={(w) => save({ ...st, who: w, shown: false })} />

      <Band>二 · 选两种视角</Band>
      <div className="v22-btns" role="group" aria-label="选择两种视角（最多两种）">
        {LENSES.map(([l, t]) => (
          <button key={l} type="button" className="v22-btn" aria-pressed={st.lenses.includes(l)} onClick={() => toggleLens(l)}>
            {t}
          </button>
        ))}
      </div>
      <p className="md-muted" aria-live="polite">
        {two ? `已选：${st.lenses.map(lensName).join('、')}。` : `还要选 ${2 - st.lenses.length} 种。选第三种时，最早选的那一种会被替换。`}
      </p>

      {two && who && (
        <>
          <Band>三 · 先判断，再看分析</Band>
          <p>
            <b>{whoName(who)}</b>：{ROW[who].did}。
          </p>
          <Pick label={`${whoName(who)}应当承担多大的一份`} value={mine ?? null} opts={SHARES} onPick={(s) => save({ ...st, share: { ...st.share, [who]: s } })} />
          <button type="button" className="md-reset" aria-expanded={st.shown} disabled={!mine && !st.shown} onClick={() => save({ ...st, shown: !st.shown })}>
            {st.shown ? '收起分析' : mine ? '看分析' : '先判断，再看分析'}
          </button>
          {st.shown && (
            <div aria-live="polite">
              <Claim b="course" who="本章的判断">
                {ROW[who].owe}
              </Claim>
              {st.lenses.map((l) => (
                <Claim key={l} b="course" who={lensName(l)}>
                  {R[who][l].t}
                  {R[who][l].inChapter ? '（本章第二或第五部分的说法。）' : '（为本练习而写的读法，依据本章对这种视角的介绍。）'}
                </Claim>
              ))}
              <p className="md-muted">
                {mine === 'major'
                  ? '你认为这一方承担主要的一份。本章的表说：没有一方承担全部责任，也没有一方没有责任。你的理由更接近哪一种视角？'
                  : mine === 'cond'
                    ? '你认为要在它的条件中评价。本章说：越靠近一线的人，越需要在他的条件中被评价。这个理由也适用于这一方吗？'
                    : '你认为这一方承担部分的一份。本章的表把责任分给了每一只手，按它的位置承担相应的部分。'}{' '}
                两种视角可能指向同一个要求，但理由不同；理由不同，在别的案例上就可能导向不同的结论。
              </p>
            </div>
          )}
        </>
      )}

      <Limits>
        <p>
          <b>江北医院、衡数公司和其中的人物都是本章虚构的，不涉及任何真实的医院、公司或人物。</b>
          "本章的判断"一栏取自本章第五部分"责任应当怎样分配"的表格。标明"本章第二或第五部分的说法"的读法，是本章自己对这一方的分析或对该视角的介绍；其余的读法是为本练习而写的。儒家与 Ubuntu 的读法是本章的应用，不是这两个传统本身的历史立场。组件不宣布哪一种视角正确。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
