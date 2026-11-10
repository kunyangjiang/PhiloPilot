import { Band, Claim, Limits, OrigSrc, Seg, Tag, useSavedIx, Verdict } from '../ia1/shared';

// 四 · after the Gandhi–Ambedkar table (想一想（四） follows later in the part).
// 1. Who said it? Six checked sentences from Hind Swaraj, Annihilation of Caste,
//    Gandhi's reply in Harijan and the Constituent Assembly speech.
// 2. Five issues, both positions side by side, each with its basis.
// 3. The 1932 fast: three readings, none marked right.
// Quotations and translations are the chapter's own (三、四, notes 21–47).

const ID = 'gandhi-ambedkar-workshop';
type Who = 'G' | 'A';

const LINES: { k: string; orig: string; zh: string; who: Who; src: string }[] = [
  { k: 'seed', who: 'G', src: '甘地《印度自治》第十六章（1909）', orig: 'The means may be likened to a seed, the end to a tree', zh: '手段可以比作种子，目的可以比作树' },
  { k: 'labour', who: 'A', src: '安贝德卡尔《消灭种姓》（1936）', orig: 'Caste System is not merely division of labour. It is also a division of labourers.', zh: '种姓制度不只是劳动的分工。它也是劳动者的分割。' },
  { k: 'custom', who: 'G', src: '甘地对《消灭种姓》的答复（1936）', orig: 'Caste has nothing to do with religion.', zh: '种姓与宗教无关。' },
  { k: 'duties', who: 'G', src: '甘地对《消灭种姓》的答复（1936）', orig: 'It defines not our rights but our duties.', zh: '它规定的不是我们的权利，而是我们的义务。' },
  { k: 'democracy', who: 'A', src: '安贝德卡尔《消灭种姓》（1936）', orig: 'Democracy is not merely a form of Government. It is primarily a mode of associated living', zh: '民主不只是一种政府形式。它首先是一种共同生活的方式' },
  { k: 'bhakti', who: 'A', src: '安贝德卡尔在制宪会议上的演说（1949）', orig: 'in politics, Bhakti or hero-worship is a sure road to degradation and to eventual dictatorship.', zh: '在政治中，虔信或英雄崇拜必然是一条通向堕落、最终通向独裁的道路。' },
];
const NAME: Record<Who, string> = { G: '甘地', A: '安贝德卡尔' };

type Issue = 'varna' | 'method' | 'rep' | 'satya' | 'religion';
const ISSUES: { k: Issue; t: string; g: string; a: string; gb: string; ab: string }[] = [
  { k: 'varna', t: '瓦尔纳', g: '种姓是可以去掉的习俗；瓦尔纳是值得保留的理想，规定以祖传职业谋生，规定义务而不规定特权。', gb: '《哈里真》上的答复（1936）', a: '按出身分配职业，无论怎样解释为"义务"，都必然产生等级；"没有高下的瓦尔纳"不可能存在。', ab: '《消灭种姓》及再版中的反驳' },
  { k: 'method', t: '改革的方法', g: '改变高种姓的心：自我净化、斋戒、以身作则。', gb: '本章的整理', a: '法律保障、政治代表、教育；种姓是一种观念，必须破除对经典神圣性的信仰；不同种姓通婚。', ab: '《消灭种姓》' },
  { k: 'rep', t: '贱民的政治代表', g: '反对为贱民设单独选区，认为这会把他们从印度教社会中分割出去，也不能真正帮助他们；1932 年以绝食反对。', gb: '据甘地给英国首相的信（安贝德卡尔 1945 年书中所引）', a: '要求单独选区，使贱民的代表对贱民选民负责；最后在《浦那协定》中接受共同选区中的保留席位。', ab: '据安贝德卡尔 1932 年 9 月 19 日的声明与 1945 年的记述' },
  { k: 'satya', t: '"坚持真理"', g: '以自己受苦来争取权利，是灵魂的力量，高于武力。', gb: '《印度自治》第十七章', a: '在有宪法途径的情况下，公民不服从和"坚持真理"只是"无政府状态的语法"。', ab: '制宪会议演说（1949）' },
  { k: 'religion', t: '宗教的出路', g: '留在改革后的印度教中，去除不可接触制。', gb: '本章的整理', a: '离开印度教；1956 年皈依佛教，并把佛教重新解释为一种平等的社会伦理。', ab: '史实；《佛陀与他的正法》（本章转述）' },
];

type Reading = 'coerce' | 'satya' | 'both';
const READ: Record<Reading, { t: string; s: string; c: string }> = {
  coerce: { t: '道德的胁迫', s: '这是安贝德卡尔本人的判断：绝食开始前一天，他在声明中就称之为“强迫”；它指出"自己受苦"也可以被用来施压：对方被迫在原则和别人的生命之间选择。', c: '要说明一切以自己受苦为手段的抗议是否都是胁迫；否则这个判断也会波及甘地反对殖民统治的绝食。' },
  satya: { t: '"坚持真理"', s: '这是甘地的自我理解：他承受痛苦，而不是把痛苦加在别人身上，目的是让对手看到不义。', c: '它忽视了受压迫阶级的代表在这次绝食中失去了什么；被"打动"的是谁的心，由谁付出代价？' },
  both: { t: '要看对谁而言', s: '对高种姓的听众，它可能是"改变人心"；对被迫让步的一方，它是胁迫。同一个行动对不同的人有不同的意义。', c: '它说明了分歧的来源，却没有回答这个行动在道德上是否正当。' },
};

interface Saved {
  who: Record<string, Who>;
  issue: Issue;
  read: Reading | null;
}
const INIT: Saved = { who: {}, issue: 'varna', read: null };

export default function DebateWorkshop() {
  const [st, save] = useSavedIx<Saved>('IN8', ID, INIT);
  const set = (x: Partial<Saved>) => save({ ...st, ...x });
  const who = st.who ?? {};
  const issue = ISSUES.find((i) => i.k === st.issue) ?? ISSUES[0];
  const done = LINES.filter((l) => who[l.k]).length;

  return (
    <section className="md c3 c5" aria-labelledby="dw-title">
      <header className="md-head">
        <p className="md-tag">甘地与安贝德卡尔 · 工作坊</p>
        <h3 id="dw-title" className="md-title">
          两个人，五个问题
        </h3>
        <p className="md-lede">先分辨几句核对过的原话出自谁，再逐项对照两人的立场；最后看 1932 年的绝食怎样被不同地理解。两人都不是对方的陪衬：各自的论证要分别检验。</p>
      </header>

      <Band>一 · 这句话是谁说的？</Band>
      {LINES.map((l) => {
        const a = who[l.k];
        return (
          <div key={l.k} className="c5-row">
            <p className="v21-en" lang="en">
              {l.orig}
            </p>
            <Seg
              name={'dw-' + l.k}
              label="这句话是谁说的"
              value={a ?? null}
              opts={[
                ['G', '甘地'],
                ['A', '安贝德卡尔'],
              ]}
              onPick={(v) => set({ who: { ...who, [l.k]: v } })}
            />
            {a && (
              <p className="md-feedback" aria-live="polite">
                <Verdict ok={a === l.who} yes="对" no={`这是${NAME[l.who]}的话`} />
                {l.src}。本章试译：{l.zh}
              </p>
            )}
          </div>
        );
      })}
      <p className="md-muted" aria-live="polite">
        已作答 {done} / {LINES.length}。这几句话都核对过原文（见注释 21、31、36—38、42）。
      </p>

      <Band>二 · 逐项对照</Band>
      <Seg name="dw-issue" label="选择一个问题" value={issue.k} opts={ISSUES.map((i) => [i.k, i.t] as const)} onPick={(v) => set({ issue: v })} />
      <div className="v21-two" aria-live="polite">
        <div>
          <h4>甘地</h4>
          <p>{issue.g}</p>
          <Tag b={issue.gb.startsWith('本章') ? 'course' : issue.gb.startsWith('史实') ? 'common' : 'text'} who={issue.gb} />
        </div>
        <div>
          <h4>安贝德卡尔</h4>
          <p>{issue.a}</p>
          <Tag b={issue.ab.startsWith('本章') ? 'course' : issue.ab.startsWith('史实') ? 'common' : 'text'} who={issue.ab} />
        </div>
      </div>
      {issue.k === 'satya' && (
        <OrigSrc
          src="甘地《印度自治》第十七章"
          lang="en"
          orig="Passive resistance is a method of securing rights by personal suffering; it is the reverse of resistance by arms."
          zh="消极抵抗是一种以自己受苦来争取权利的方法；它与武装抵抗正好相反。"
        />
      )}

      <Band>三 · 1932 年的绝食：改变人心，还是胁迫？</Band>
      <p>英国政府宣布给予"受压迫阶级"单独选区，甘地在狱中绝食反对；安贝德卡尔最后让步，签订《浦那协定》。你怎样理解这次绝食？</p>
      <Seg
        name="dw-read"
        label="选择一种理解"
        value={st.read}
        col
        opts={(Object.keys(READ) as Reading[]).map((k) => [k, READ[k].t] as const)}
        onPick={(v) => set({ read: v })}
      />
      {st.read && (
        <div aria-live="polite">
          <Claim b="course" who="长处">
            {READ[st.read].s}
          </Claim>
          <Claim b="course" who="代价">
            {READ[st.read].c}
          </Claim>
          <p className="md-muted">三种理解都有人主张，这里不判对错。其余两种的长处和代价也可以选来比较。</p>
        </div>
      )}

      <Limits>
        <p>
          <b>这是两种立场的对照，不是一场胜负的判决。</b>表中"本章的整理"一栏是概括；绝食和《浦那协定》的史实，据安贝德卡尔 1945 年的记述及其所收文件核对（见正文注 40—43）。甘地后期对瓦尔纳的态度有变化，表中只反映 1936 年的争论。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
