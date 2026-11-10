import { Band, Claim, Limits, OrigSrc, Seg, Step, useSavedIx, Verdict } from './shared';

// 三 · after the two-schools table ("表格是本章的整理。最后一行要特别注意…").
// 1. Fire touches cotton: what each view says burns it, moment by moment.
// 2. Which premise of the five-step reconstruction do you reject? Each choice
//    shows where it leads.
// 3. 37:96 and acquisition (kasb): does it save responsibility? Ungraded.
// The Qur'an verse and translation are the chapter's own (三, note 27); the
// schools' positions follow the chapter's summary of SEP (notes 23–30).

const ID = 'occasionalism-lab';
type View = 'ash' | 'mut' | 'fal';

const VIEWS: Record<View, { t: string; who: string; cause: string; miracle: string; t2: string }> = {
  ash: {
    t: '后来的艾什尔里派（偶因论）',
    who: '本章根据 SEP 的转述',
    cause: '神在火接触棉花的时刻，在棉花中创造"燃烧"这个偶性。火什么也没有做；下一个时刻的燃烧又是新创造的。',
    miracle: '奇迹是神"打破了习惯"：在火接触棉花时不创造燃烧。这没有任何困难。',
    t2: '每一个时刻',
  },
  mut: {
    t: '早期凯拉姆（"生成"说）',
    who: 'SEP 指出早期学者多接受此说',
    cause: '人的行为可以"生成"（tawallud）进一步的结果：被造物有一定的因果作用，尽管一切最终依赖于神。',
    miracle: '奇迹需要神干预被造物自己的因果作用。',
    t2: '有先后的生成',
  },
  fal: {
    t: '亚里士多德式的哲学家',
    who: '本章的概括，详见下一门课程',
    cause: '火的本性就是燃烧；只要火接触到能燃烧的东西，又没有阻碍，燃烧就必然发生。',
    miracle: '奇迹很难说明：如果燃烧是必然的，"不燃烧"就意味着火不再是火。',
    t2: '本性的必然',
  },
};

const STEPS = [
  '神是唯一的创造者；任何存在的东西，都是神创造的。',
  '偶性不能持续两个时刻；每一个时刻的每一个偶性，都需要被重新创造。',
  '被造物没有创造的能力（因为只有神是创造者）。',
  '所以，火不能创造棉花中的"燃烧"这个偶性；创造它的是神。',
  '我们看到的"因果"，只是神创造事物时的固定次序（"习惯"）。',
];
type Drop = 0 | 1 | 2;
const DROP: Record<Drop, string> = {
  0: '放弃第 1 步（或把"创造"理解得更窄）：被造物可以有真正的因果作用，神是它们存在的最终来源。这接近早期"生成"说和后来哲学家的立场；代价是要说明被造物的因果作用与"神是唯一的创造者"怎样相容。',
  1: '放弃第 2 步：偶性可以持续存在。那么，火所造成的燃烧可以延续下去，"每一个时刻都需要重新创造"就不成立。但第 1、3 步仍然可以推出：至少燃烧的开始是神创造的。',
  2: '放弃第 3 步：被造物也能"创造"某些东西。这正是穆尔太齐赖派关于人的行为的立场（人自己创造自己的行为）；艾什尔里派认为这等于承认神以外还有创造者。',
};

type Kasb = 'yes' | 'name' | 'both';
const KASB: Record<Kasb, { t: string; s: string; c: string }> = {
  yes: { t: '能：行为属于人', s: '行为发生在人身上，伴随着人的意愿和人感到的能力；所以说它"属于"人，是有内容的。', c: '如果人的意愿和能力也是神创造的，"伴随"就只是一个事实，不是人做了什么。' },
  name: { t: '不能："获得"只是一个名称', s: '这是批评者（包括后来的一些艾什尔里派学者）的看法：它没有说明人在行为中究竟做了什么。', c: '那么穆尔太齐赖派的回答（人创造自己的行为）就要面对它自己的困难：神以外还有创造者。' },
  both: { t: '两派都有困难', s: '一派保住了神是唯一的创造者，却难以说明责任；另一派保住了责任，却难以说明神的独一。', c: '这说明了困难在哪里，却没有决定应该放弃哪一个。' },
};

interface Saved {
  view: View;
  drop: Drop | null;
  kasb: Kasb | null;
}
const INIT: Saved = { view: 'ash', drop: null, kasb: null };

export default function OccasionalismLab() {
  const [st, save] = useSavedIx<Saved>('IA1', ID, INIT);
  const set = (x: Partial<Saved>) => save({ ...st, ...x });
  const v = VIEWS[st.view] ?? VIEWS.ash;

  return (
    <section className="md c3 c5" aria-labelledby="ol-title">
      <header className="md-head">
        <p className="md-tag">偶因论 · 实验室</p>
        <h3 id="ol-title" className="md-title">
          火接触棉花，是什么使棉花燃烧？
        </h3>
        <p className="md-lede">同一个场景，三种回答。先比较它们怎样说明燃烧和奇迹，再看偶因论的论证：放弃哪一个前提，会走到哪里。最后看"获得"说能否保住人的责任。</p>
      </header>

      <Band>一 · 三种回答</Band>
      <Seg name="ol-view" label="选择一种立场" value={st.view} col opts={(Object.keys(VIEWS) as View[]).map((k) => [k, VIEWS[k].t] as const)} onPick={(x) => set({ view: x as View })} />
      <div aria-live="polite">
        <Claim b={st.view === 'fal' ? 'course' : 'scholar'} who={v.who}>
          {v.cause}
        </Claim>
        <p>
          <b>奇迹：</b>
          {v.miracle}
        </p>
        <p className="md-muted">因果的形式：{v.t2}。</p>
      </div>

      <Band>二 · 偶因论的论证：你放弃哪一步？</Band>
      <ol className="v21-steps">
        {STEPS.map((s, i) => (
          <Step key={i} n={i + 1} on={st.drop === i}>
            {s}
          </Step>
        ))}
      </ol>
      <p className="md-muted">第 4、5 步是结论。要拒绝偶因论，必须放弃前三步中的至少一步。</p>
      <Seg
        name="ol-drop"
        label="放弃哪一个前提"
        value={st.drop}
        opts={[
          [0, '第 1 步'],
          [1, '第 2 步'],
          [2, '第 3 步'],
        ]}
        onPick={(x) => set({ drop: x as Drop })}
      />
      {st.drop !== null && (
        <p className="md-feedback" aria-live="polite">
          {DROP[st.drop]}
        </p>
      )}

      <Band>三 · "获得"能保住人的责任吗？</Band>
      <OrigSrc src="《古兰经》第 37 章第 96 节（Tanzil 项目文本，tanzil.net）" lang="ar" orig="وَاللَّهُ خَلَقَكُمْ وَمَا تَعْمَلُونَ" zh="神创造了你们，也创造了你们所做的。" />
      <Seg name="ol-kasb" label="你的判断" value={st.kasb} col opts={(Object.keys(KASB) as Kasb[]).map((k) => [k, KASB[k].t] as const)} onPick={(x) => set({ kasb: x as Kasb })} />
      {st.kasb && (
        <div aria-live="polite">
          <Claim b="course" who="理由">
            {KASB[st.kasb].s}
          </Claim>
          <Claim b="course" who="要回答的问题">
            {KASB[st.kasb].c}
          </Claim>
          <p className="md-muted">
            <Verdict ok yes="没有标准答案" no="" />
            这个问题从古至今一直有争论（见本章第三节和"想一想（三）"）。
          </p>
        </div>
      )}

      <Limits>
        <p>
          <b>不要把"凯拉姆"等同于"偶因论"。</b>偶因论是后来艾什尔里派的发展；早期学者多接受"生成"说，许多原子论者并不是偶因论者。偶因论也没有被现代物理学"证实"：它是一个关于"什么是原因"的形而上学主张。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
