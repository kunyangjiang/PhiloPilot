import { Band, Claim, Limits, OrigSrc, Seg, Step, useSavedIx, Verdict } from '../ia3/shared';

// 二 · in the five-step reconstruction, before its summary table
// ("所以，一个合理的评价是：伊克巴尔不是在复述艾什尔里派…").
// 1. The two propositions Iqbal draws from Ashʿarite atomism: which does he
//    accept? (his own words, p. 66)
// 2. The purpose: classical vs Iqbal's.
// 3. Three supporting arguments: which is weakest? The chapter's evaluation,
//    marked as such.
// The English and translation are the chapter's own (Reconstruction, OUP 1934,
// p. 66, note 15); steps and evaluation are the chapter's reconstruction.

const ID = 'iqbal-method';

type Acc = 'acc' | 'rej';
const PROPS: { k: string; t: string; a: Acc; s: string }[] = [
  { k: 'p1', t: '（一）没有任何东西有一个稳定的本性。', a: 'acc', s: '接受：他说，鉴于艾什尔里派想要确立的"不断创造"的观念，这个命题中有一个真理的成分。' },
  { k: 'p2', t: '（二）只有一种原子的秩序；所谓灵魂，或者是一种更精细的物质，或者只是一个偶性。', a: 'rej', s: '拒绝：它取消了自我，而人的自我在伊克巴尔那里是一种"导向的能量"。' },
];

type Arg = 'text' | 'phil' | 'sci';
const ARG: Record<Arg, { t: string; s: string }> = {
  text: { t: '文本的论证：《古兰经》强调神不断地创造、世界在不断地变化', s: '它依赖于对《古兰经》"反古典精神"的一种整体解读；这个解读本身需要论证，但它至少回答的是同一类问题。' },
  phil: { t: '哲学的论证：柏格森的"绵延"、怀特海的过程哲学', s: '它表明"实在是过程"是一个可以认真辩护的哲学立场；但这些现代哲学本身也有争议。' },
  sci: { t: '科学的论证：现代原子论的"不连续"、怀特海论电子、普朗克的量子理论', s: '本章认为这是最弱的环节：两者只在"不连续"这一点上相似，回答的问题、证据和方法都不同。伊克巴尔本人只说"相似的困难"；把它读成"物理学证实了艾什尔里派"，是把类比当作了结论。' },
};

const STEPS = ['古典的立场', '现代的重新解释', '支持的论证', '一个严肃的反驳', '评价连续与创新'];

interface Saved {
  pick: Record<string, Acc>;
  purpose: boolean;
  weak: Arg | null;
}
const INIT: Saved = { pick: {}, purpose: false, weak: null };

export default function IqbalMethod() {
  const [st, save] = useSavedIx<Saved>('IA5', ID, INIT);
  const set = (x: Partial<Saved>) => save({ ...st, ...x });
  const pick = st.pick ?? {};
  const both = PROPS.every((p) => pick[p.k]);
  const at = st.weak ? 5 : st.purpose ? 4 : both ? 3 : 2;

  return (
    <section className="md c3 c5" aria-labelledby="iq-title">
      <header className="md-head">
        <p className="md-tag">选择性的继承 · 方法</p>
        <h3 id="iq-title" className="md-title">
          伊克巴尔从艾什尔里派那里拿走了什么？
        </h3>
        <p className="md-lede">按本章的五个步骤，看一个现代的论证怎样使用古典的资源：接受了什么，拒绝了什么，改变了什么。</p>
      </header>

      <ol className="v21-steps" aria-label="五个步骤">
        {STEPS.map((t, i) => (
          <Step key={t} n={i + 1} on={i + 1 === at}>
            {t}
          </Step>
        ))}
      </ol>

      <Band>一 · 两个命题</Band>
      <OrigSrc src="伊克巴尔《伊斯兰宗教思想的重建》第三讲，1934 年牛津版，第 66 页" lang="en" orig="(i) Nothing has a stable nature." zh="（一）没有任何东西有一个稳定的本性。" />
      <div className="v22-rows">
        {PROPS.map((p) => (
          <div key={p.k} className="v22-row">
            <p>{p.t}</p>
            <Seg
              name={'iq-' + p.k}
              label={p.t}
              value={pick[p.k] ?? null}
              opts={[
                ['acc', '伊克巴尔接受'],
                ['rej', '伊克巴尔拒绝'],
              ]}
              onPick={(v) => set({ pick: { ...pick, [p.k]: v } })}
            />
            {pick[p.k] && (
              <p className="md-feedback" aria-live="polite">
                <Verdict ok={pick[p.k] === p.a} yes="与原文一致" no="与原文不同" />
                {p.s}
              </p>
            )}
          </div>
        ))}
      </div>

      <Band>二 · 同一个学说，不同的目的</Band>
      <div className="v21-two">
        <div>
          <h4>艾什尔里派</h4>
          <p>"每一瞬间由神重新创造"：受造物没有自己的能力和本性；神是唯一真正的行动者；保住奇迹的可能。</p>
        </div>
        <div>
          <h4>伊克巴尔</h4>
          {st.purpose ? <p>宇宙是一个不断创造的过程；人的自我是一种"导向的能量"，在行动中塑造自己。</p> : <p className="md-muted">先想一想：他会用这个学说来说明什么？</p>}
        </div>
      </div>
      {!st.purpose ? (
        <button type="button" className="v22-btn" onClick={() => set({ purpose: true })}>
          显示伊克巴尔的用法
        </button>
      ) : (
        <Claim b="course" who="本章的反驳（第四步）">
          两个方向几乎是相反的：在艾什尔里派那里，人的行为由神创造，人只是"获取"它；在伊克巴尔那里，人的自我在行动中塑造自己。保留了外形，改变了目的，这还能算是"发展"这个学说吗？
        </Claim>
      )}

      <Band>三 · 哪一个论证最弱？</Band>
      <Seg name="iq-weak" label="选择你认为最弱的论证" value={st.weak} col opts={(Object.keys(ARG) as Arg[]).map((k) => [k, ARG[k].t] as const)} onPick={(v) => set({ weak: v })} />
      {st.weak && (
        <div aria-live="polite">
          <Claim b="course" who="本章的评价">
            {ARG[st.weak].s}
          </Claim>
          <p className="md-muted">本章的结论是"选择性的继承"：它的正当性，取决于是否诚实地说明了在哪里改变了原意，以及新的立场本身是否有充分的论证。你可以不同意这个评价。</p>
        </div>
      )}

      <Limits>
        <p>
          <b>这是本章为示范方法所作的重建，不是伊克巴尔的原文结构。</b>原文只引用了第 66 页的一句；其余是本章的转述。这个例子不代表所有现代穆斯林思想家对古典资源的态度。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
