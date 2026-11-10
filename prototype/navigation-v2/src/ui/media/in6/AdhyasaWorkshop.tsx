import { Band, Claim, Limits, Seg, Src, Tag, useSavedIx, Verdict } from '../in4/shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import '../cn5/cn5.css';
import '../cn7/cn7.css';
import '../in2/ip.css';
import '../in4/in4.css';
import './in6.css';

// 二 · after "这个例子有两点值得注意" (adhyāsa, the rope and the snake).
// 1. The definition (the preface's two sentences, checked in the 1917 print).
// 2. Two cases, rope–snake and "I am fat": sort what appears, the underlying
//    subject, the superimposed thing, the condition and the correction.
// 3. Mutual superimposition, and who corrects the second error (想一想（二）).
// 4. The chapter's seven-step reconstruction, where Rāmānuja and Madhva object,
//    and the Advaita reply from 后世批判与回应 一.
// The rope and snake is Śaṅkara's own example of the *structure* of error; the
// component says plainly that a perceptual illusion is no evidence for Advaita.
// All quotations and translations are the chapter's own (二、四、五, notes 21–28, 45–48, 57).

const ID = 'adhyasa-workshop';

type Role = 'locus' | 'seen' | 'appear' | 'cond' | 'fix';
const ROLE: [Role, string][] = [
  ['locus', '在别处（所依）'],
  ['seen', '先前所见之物'],
  ['appear', '以类似记忆的方式显现'],
  ['cond', '使错认发生的条件'],
  ['fix', '纠正'],
];
const ROLE_NAME = Object.fromEntries(ROLE) as Record<Role, string>;

type Case = 'rope' | 'self';
const CASES: Record<Case, { t: string; scene: string; items: { k: string; t: string; role: Role; fb: string }[] }> = {
  rope: {
    t: '绳与蛇',
    scene: '黄昏时，路上有一段绳子，你把它看成一条蛇。',
    items: [
      { k: 'a', t: '蛇的形象被唤起，像是就在眼前', role: 'appear', fb: '显现的是蛇，但它是"以类似记忆的方式"出现的：蛇以前见过，此刻并不在这里。' },
      { k: 'b', t: '眼前的绳子', role: 'locus', fb: '错认需要一个真实的所依：没有绳子，就不会把它看成蛇。' },
      { k: 'c', t: '光线暗、距离远', role: 'cond', fb: '这是使错认发生的条件，不是错认的对象。' },
      { k: 'd', t: '以前见过的蛇', role: 'seen', fb: '定义中的"先前所见之物"：蛇不是凭空出现的，是过去经验留下的。' },
      { k: 'e', t: '看清是绳子，蛇的显现随之消失', role: 'fix', fb: '纠正不是把蛇赶走，而是看清本来就在那里的绳子。' },
    ],
  },
  self: {
    t: '"我胖"、"我在受苦"',
    scene: '你说"我胖"、"我瞎"、"我在受苦"。按不二论，这也是同一种结构的错认。',
    items: [
      { k: 'a', t: '纯粹的意识（自身）', role: 'locus', fb: '错认所依的是真实的东西：意识，即自身。它不是被否定的那一方。' },
      { k: 'b', t: '"我胖"、"我瞎"、"我在受苦"', role: 'appear', fb: '身体和心的属性显现为"我"的属性。' },
      { k: 'c', t: '认识到自身就是梵', role: 'fix', fb: '按第 7 步，这个认识来自奥义书："我就是梵"、"那就是你"。' },
      { k: 'd', t: '身体、感官、心及其属性', role: 'seen', fb: '被加到意识上的，是可以被观察的对象。' },
      { k: 'e', t: '无始的无明', role: 'cond', fb: '与黄昏的光线不同，这个条件没有开端，也不是偶然的：附加是日常一切认识和行动的前提。' },
    ],
  },
};

type Who = 'other' | 'look' | 'text';
const WHO: [Who, string][] = [
  ['other', '一个已经没有这种错认的旁观者'],
  ['look', '我自己，只要看得更仔细'],
  ['text', '奥义书的教导'],
];
const WHO_FB: Record<Who, string> = {
  other: '在绳—蛇一例中可以这样：知道绳子的人在错觉之外。但在"我"的错认中，任何一个"旁观者"作为一个个人，本身就是附加的产物（"无明在哪里？"一节）。',
  look: '看得更仔细，仍然是一种认识和行动；按第 5、6 步，日常的一切认识和行动都预设了附加，所以不能单靠它们走出附加。',
  text: '这是本章重建的第 7 步：能消除附加的认识，来自奥义书。注意这一步预设了经典的权威；后世批判与回应第二节会看到，摩陀婆正是在这里追问。',
};

const STEPS: { t: string; who?: string }[] = [
  { t: '每个人都确知"我在"（《梵经注》1.1.1）。' },
  { t: '但"我"实际被认作的，总是身体、感官或心，以及它们的属性（"我胖"、"我瞎"、"我在想"）。' },
  { t: '这些东西都是可以被观察的对象；而意识是观察者，不能成为被观察的对象。主体和对象"像光明与黑暗一样相反"。', who: '关键的一步：罗摩奴阇和摩陀婆都不接受"真正的自身完全没有属性"。' },
  { t: '所以，把对象的属性认作"我"的属性，是把一个东西当成了它所不是的东西，即附加。' },
  { t: '这种附加不是偶然的，而是日常一切认识和行动的前提；它是无始的。' },
  { t: '附加就是无明；它不能由行动消除，因为行动本身就预设了它；它只能由认识消除。' },
  { t: '能消除它的认识，来自奥义书："我就是梵"、"那就是你"。' },
];

type Obj = 'ram' | 'mad';

interface Saved {
  cas: Case;
  ans: Partial<Record<Case, Record<string, Role>>>;
  mutual: boolean;
  who: Who | null;
  step: number | null;
  obj: Obj;
  objStage: number;
  reply: boolean;
}
const INIT: Saved = { cas: 'rope', ans: {}, mutual: false, who: null, step: null, obj: 'ram', objStage: 1, reply: false };

export default function AdhyasaWorkshop() {
  const [st, save] = useSavedIx<Saved>('IN6', ID, INIT);
  const set = (x: Partial<Saved>) => save({ ...st, ...x });
  const ck: Case = CASES[st.cas] ? st.cas : 'rope';
  const c = CASES[ck];
  const ans = st.ans?.[ck] ?? {};
  const done = c.items.every((it) => ans[it.k]);
  const right = c.items.filter((it) => ans[it.k] === it.role).length;
  const stage = Math.max(1, Math.min(st.objStage ?? 1, 3));

  return (
    <section className="md c3 c5" aria-labelledby="aw-title">
      <header className="md-head">
        <p className="md-tag">附加与错认 · 工作坊</p>
        <h3 id="aw-title" className="md-title">
          绳子、蛇，和"我"
        </h3>
        <p className="md-lede">用商羯罗对"附加"的定义拆开两个错认：一个是普通的错觉，一个是不二论所说的"我"的错认。拆完之后再看两者在哪里不同，以及罗摩奴阇和摩陀婆在哪一步提出反对。</p>
      </header>

      <Band>一 · 定义</Band>
      <Src src="商羯罗《梵经注》序论（已对照 1917 年印本）" lang="sa" orig="smṛtirūpaḥ paratra pūrvadṛṣṭāvabhāsaḥ" zh="［附加，就是］先前所见之物，以类似记忆的方式，在别处显现出来。" />
      <Src src="商羯罗《梵经注》序论（已对照 1917 年印本）" lang="sa" orig="adhyāso nāma atasmiṃs tadbuddhir ity avocāma" zh="我们已经说过，所谓附加，就是在不是那个东西的地方，认为它是那个东西。" />

      <Band>二 · 拆开一个错认</Band>
      <Seg name="aw-case" label="选择一个案例" value={ck} opts={(Object.keys(CASES) as Case[]).map((k) => [k, CASES[k].t] as const)} onPick={(v) => set({ cas: v })} />
      <p>
        {c.scene} <Tag b={ck === 'rope' ? 'text' : 'course'} who={ck === 'rope' ? '商羯罗本人也用过这个例子' : '本章的整理'} />
      </p>
      <p className="md-fb-k">下面每一项，属于定义中的哪一个成分？</p>
      {c.items.map((it) => {
        const a = ans[it.k];
        return (
          <div key={ck + it.k} className="c5-row">
            <p>
              <b>{it.t}</b>
            </p>
            <Seg name={`aw-${ck}-${it.k}`} label={it.t} col value={a ?? null} opts={ROLE} onPick={(v) => set({ ans: { ...st.ans, [ck]: { ...ans, [it.k]: v } } })} />
            {a && (
              <p className="md-feedback" aria-live="polite">
                <Verdict ok={a === it.role} yes="与本章的表一致" no={`本章的表把它列为"${ROLE_NAME[it.role]}"`} />
                {it.fb}
              </p>
            )}
          </div>
        );
      })}
      {done && (
        <p className="md-muted" aria-live="polite">
          五项中有 {right} 项与本章的表一致。两个案例的对应是本章的整理。 <Tag b="course" />
        </p>
      )}

      <p className="md-fb-k">错认只有一个方向吗？</p>
      <button type="button" className="md-disclose" aria-expanded={!!st.mutual} onClick={() => set({ mutual: !st.mutual })}>
        {st.mutual ? '收起' : '看"相互附加"'}
      </button>
      {st.mutual && (
        <div className="i6-two" aria-live="polite">
          <p>
            <b>意识 ← 身体的属性</b>
            <br />
            "我胖"：身体的属性被加到意识上。
          </p>
          <p>
            <b>身体 ← 意识</b>
            <br />
            身体好像本身就有意识。
          </p>
          <Claim b="scholar" who="SEP《商羯罗》">
            在"我"的错认中，附加是双向的；SEP 的商羯罗条目把这称为"相互附加"。
          </Claim>
        </div>
      )}

      <Band>三 · 两个错认在哪里不同：谁来纠正？</Band>
      <p>绳—蛇的错觉，可以由一个已经知道绳子的人来纠正。"我是这个身体"的错觉，由谁来纠正？</p>
      <Seg name="aw-who" label="由谁来纠正" col value={st.who} opts={WHO} onPick={(v) => set({ who: v })} />
      {st.who && (
        <p className="md-feedback" aria-live="polite">
          {WHO_FB[st.who]} <Tag b="course" who="想一想（二）的讨论" />
        </p>
      )}
      <Src
        src="商羯罗《梵经注》1.1.1"
        lang="sa"
        orig="bhavyaś ca dharmo jijñāsyo na jñānakāle 'sti, puruṣavyāpāratantratvāt / iha tu bhūtaṃ brahma jijñāsyaṃ nityatvān na puruṣavyāpāratantram"
        zh='要探究的法是"将要成就的"，在认识它的时候还不存在，因为它依赖于人的作为；而这里要探究的梵是"已经存在的"，因为它是永恒的，不依赖于人的作为。'
      />
      <p className="md-muted">所以在商羯罗看来，解脱不是行动的结果，而是认识的结果；行动可以净化心，使人有资格去探究。</p>

      <Band>四 · 论证的七步，和反对者</Band>
      <p className="md-muted">
        分步是本章的重建。点一步，看它在论证中的作用。 <Tag b="course" />
      </p>
      <ol className="i6-steps">
        {STEPS.map((s, i) => (
          <li key={i}>
            <button type="button" className={'i6-step' + (st.step === i ? ' is-on' : '') + (s.who ? ' is-key' : '')} aria-pressed={st.step === i} onClick={() => set({ step: st.step === i ? null : i })}>
              {s.t}
            </button>
          </li>
        ))}
      </ol>
      {st.step !== null && st.step !== undefined && STEPS[st.step] && (
        <p className="md-feedback" aria-live="polite">
          {STEPS[st.step].who ?? (st.step < 2 ? '这一步描述日常经验；本章没有把它列为争论的焦点。' : st.step < 6 ? '这一步从第 3 步推出；如果不接受第 3 步，它也就失去了根据。' : '这一步预设了奥义书的权威，以及把"我就是梵"读作同一。')}
        </p>
      )}

      <Seg
        name="aw-obj"
        label="选择一位反对者"
        value={st.obj}
        opts={[
          ['ram', '罗摩奴阇'],
          ['mad', '摩陀婆'],
        ]}
        onPick={(v) => set({ obj: v, objStage: 1 })}
      />
      {st.obj === 'mad' ? (
        <div aria-live="polite">
          <Src
            src="摩陀婆《随释》1.1.40—41"
            lang="sa"
            orig="ajñānāsambhavād eva mithyābhedo nirākṛtaḥ / ato yathārthabandhasya vinā viṣṇuprasādataḥ // anivṛttes tadarthaṃ hi jijñāsātra vidhīyate"
            zh='正因为［对梵的］无知不可能存在，"差别是虚假的"［一说］就被驳倒了。因此，真实的束缚，离开毗湿奴的恩典就不能消除；为了这个缘故，这里才规定了［对梵的］探究。'
          />
          <Claim b="course" who="本章的整理">
            摩陀婆攻击的是第 6 步的前提：梵（全知的神）不可能无知，所以"差别出于无明"不成立；差别和束缚都是真实的，只有神的恩典才能解除束缚。
          </Claim>
          <p className="md-muted">《随释》的引文据未经校对的电子本，本章没有对照印本。</p>
        </div>
      ) : (
        <div aria-live="polite">
          <Src
            src="罗摩奴阇《吠陀义摄》第 40 节"
            lang="sa"
            orig="tirodhānaṃ nāma prakāśanivāraṇam / svarūpātirekiprakāśadharmānabhyupagamena prakāśasyaiva svarūpatvāt svarūpanāśa eva syāt"
            zh="所谓遮蔽，就是阻止光。［你们］不承认在［梵的］本性之外还有一种作为属性的光，光就是［梵的］本性本身；［那么遮蔽光］就只能是本性的毁灭。"
          />
          {stage >= 2 && (
            <Src
              src="罗摩奴阇《吠陀义摄》第 41 节（替对方提出的反驳）"
              lang="sa"
              orig="nanu ca bhavato 'pi vijñānasvarūpa ātmābhyupagantavyaḥ / sa ca svayaṃprakāśaḥ / tasya ca devādisvarūpātmābhimāne svarūpaprakāśatirodhānam avaśyam āśrayaṇīyam"
              zh="［对方说：］可是，你也要承认，自身的本性是认识，它是自己发光的；那么，当它把自己误认为天神等等的时候，你也一定要承认它本性的光被遮蔽了。"
            />
          )}
          {stage >= 3 && (
            <>
              <Src
                src="罗摩奴阇《吠陀义摄》第 43 节"
                lang="sa"
                orig="asmākam ātmadharmabhūtasya caitanyasya svābhāvikasyāpi karmaṇā pāramārthikaṃ saṃkocaṃ vikāsaṃ ca bruvatāṃ sarvam idaṃ parihṛtam"
                zh="我们说，作为自身属性的意识，虽然是本来就有的，却因为业而真实地收缩和扩展；［这样说，］这一切［困难］都避免了。"
              />
              <Claim b="course" who="本章的整理">
                关键在于区分自身和自身所具有的意识，就像灯和灯光：灯罩挡住灯光，灯并没有被毁灭。代价是：罗摩奴阇必须承认自身与它的属性之间有真实的区别。争论最终落在：意识是一种属性，还是实在本身？
              </Claim>
            </>
          )}
          {stage < 3 && (
            <button type="button" className="md-disclose" onClick={() => set({ objStage: stage + 1 })}>
              {stage === 1 ? '对方会怎样反问？' : '罗摩奴阇怎样回答？'}
            </button>
          )}
        </div>
      )}

      <button type="button" className="md-disclose" aria-expanded={!!st.reply} onClick={() => set({ reply: !st.reply })}>
        {st.reply ? '收起不二论的回应' : '不二论者可以怎样回应？'}
      </button>
      {st.reply && (
        <div aria-live="polite">
          <Claim b="course" who="后世批判与回应 一，本章的重建">
            "无明在哪里"这个问题，本身是在日常层次上提出的。在日常层次上，无明属于把自己误认为身体的个人；在究竟层次上，无明根本不存在。"遮蔽"不是毁灭光，而是光没有被认出来，就像绳子在黄昏中没有被认出来，绳子本身并没有受损。
          </Claim>
          <Claim b="course" who="同上，评估">
            这个回应依赖于"不可决定"：无明既不是有，也不是无。批评者会说，这只是给困难起了一个名字；不二论者会说，任何错误都有这种结构。分歧最终是关于"不可决定"是否是一个合法的本体论范畴。
          </Claim>
        </div>
      )}

      <Limits>
        <p>
          <b>一个普通的错觉不是不二论的证据。</b>绳—蛇一例用来说明附加的<b>结构</b>，不能证明"我"的经验也是这样一种错认：普通错觉有一个在错觉之外的纠正者，"我"的错认却没有（第三段）。是否接受第 3 步，以及是否接受奥义书的权威，才是争论所在。
        </p>
        <p>两个案例的五项对应、七步的分步和不二论的回应，都是本章的整理或重建。序论的两句已对照 1917 年的印本，但本章没有通读序论全文；《吠陀义摄》和《随释》的引文据电子本。</p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
