import { Band, Claim, Limits, OrigSrc, Pick, Seg, useSavedIx, Verdict } from './shared';

// 二 · after the table on why negation and affirmation differ in standing.
// 1. The chapter's checked passage (Guide I.58, Munk 1856, fol. 70a/b, note 13).
// 2. Sort five sentences about God: attribute of action, negation, or a
//    positive claim about the essence (the chapter's three kinds, notes 12–17).
// 3. The ship: each negation brings us nearer, none reaches the essence
//    (I.60, paraphrased from Munk's French translation, note 15).
// 4. "Is a double negation not an affirmation?" — the SEP reading (note 17).

const ID = 'negative-theology';

type Kind = 'act' | 'neg' | 'pos';
const KINDS: readonly (readonly [Kind, string])[] = [
  ['act', '行为的属性'],
  ['neg', '否定'],
  ['pos', '关于本质的肯定'],
];
const SENT: { k: string; t: string; a: Kind; s: string }[] = [
  {
    k: 'mercy',
    t: '"神是仁慈的"——意思是：神在世界中的作为，就像一个仁慈的人会做的那样。',
    a: 'act',
    s: '行为的属性。它描述神在世界中的作为，而不是说神身上有"仁慈"这种情感，所以迈蒙尼德可以接受。',
  },
  {
    k: 'feel',
    t: '神身上有"仁慈"这种情感。',
    a: 'pos',
    s: '关于本质的肯定。它把人的一种性质放进神之中，迈蒙尼德认为这是"不严格"的，带有"共有"和欠缺。',
  },
  {
    k: 'body',
    t: '神不是物体。',
    a: 'neg',
    s: '否定。它只排除一种不适合神的东西，不声称神与任何受造物共有什么。',
  },
  {
    k: 'wise',
    t: '神有智慧，就像人有智慧，只是多得多。',
    a: 'pos',
    s: '关于本质的肯定，而且是最直接的一种：它要求"智慧"一词用于神和人时有共同的意义，于是神与人落入同一个类别。',
  },
  {
    k: 'power',
    t: '神不是没有能力的。',
    a: 'neg',
    s: '否定。至于它是不是"等于"说神有能力，见下面第四部分。',
  },
];

const SHIP = ['它不是偶性', '它不是矿物', '它不是植物', '它不是一个连续的整体'];

interface Saved {
  pick: Record<string, Kind>;
  ship: number;
  dbl: 'same' | 'more' | null;
}
const INIT: Saved = { pick: {}, ship: 0, dbl: null };

export default function NegativeTheology() {
  const [st, save] = useSavedIx<Saved>('JW1', ID, INIT);
  const set = (x: Partial<Saved>) => save({ ...st, ...x });
  const pick = st.pick ?? {};
  const ship = Math.min(st.ship ?? 0, SHIP.length);

  return (
    <section className="md c3 c5" aria-labelledby="nt-title">
      <header className="md-head">
        <p className="md-tag">否定神学 · 分类练习</p>
        <h3 id="nt-title" className="md-title">
          哪些话可以说神？以什么方式说？
        </h3>
        <p className="md-lede">先读迈蒙尼德的原话，再把五句关于神的话分到他的三类之中，最后看"否定"怎样增加知识，又为什么到达不了神的本质。</p>
      </header>

      <Band>一 · 原文</Band>
      <OrigSrc
        src="迈蒙尼德《迷途指津》第一部分第五十八章，Munk 1856 年巴黎本，第 70 叶正面"
        lang="jrb"
        orig="אעלם אן וצף אללה עז וג'ל באלסואלב הו אלוצף אלצחיח אלד'י לא ילחקה שי מן אלתסאמח ולא פיה נקץ פי חק אללה ג'מלה ולא עלי חאל."
        zh="你要知道，用否定来描述神（愿他尊大）是正确的描述，其中没有任何不严格之处，也完全没有、在任何意义上都没有关于神的欠缺。"
      />

      <Band>二 · 五句话，三种说法</Band>
      <div className="v22-rows">
        {SENT.map((c) => (
          <div key={c.k} className="v22-row">
            <p>{c.t}</p>
            <Seg name={'nt-' + c.k} label={c.t} value={pick[c.k] ?? null} opts={KINDS} onPick={(v) => set({ pick: { ...pick, [c.k]: v } })} />
            {pick[c.k] && (
              <p className="md-feedback" aria-live="polite">
                <Verdict ok={pick[c.k] === c.a} yes="与本章的分类一致" no="与本章的分类不同" />
                {c.s}
              </p>
            )}
          </div>
        ))}
      </div>

      <Band>三 · 一条船：每一个否定都增加知识</Band>
      <p>一个人知道"船"这个词，却不知道它指什么。每按一次，就为他排除一种可能。</p>
      <div className="v21-aware" aria-live="polite">
        <p>
          <b>已经排除：</b>
          {ship === 0 ? '还没有。' : `${ship} 项`}
        </p>
        {ship > 0 && (
          <ul>
            {SHIP.slice(0, ship).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        )}
        {ship === SHIP.length && <p className="md-muted">……可以一直排除下去。每一步都更接近正确的概念；可是对神而言，否定不会把我们带到"神是什么"。迈蒙尼德在第五十九章引用《诗篇》，读作"对你，静默就是赞美"。</p>}
      </div>
      <div className="v22-btns">
        <button type="button" className="v22-btn" disabled={ship >= SHIP.length} onClick={() => set({ ship: ship + 1 })}>
          再排除一种可能
        </button>
      </div>
      <Claim b="scholar" who="Munk 法译本第 260 页的转述">
        船的例子出自第六十章；这里只是转述，本课没有核对这一章的阿拉伯原文。
      </Claim>

      <Band>四 · "神不是没有能力的"不就是"神有能力"吗？</Band>
      <Pick
        label="双重否定等于肯定吗？"
        value={st.dbl}
        opts={[
          ['same', '是同一回事，只是换了说法'],
          ['more', '不是：否定多说了一件事'],
        ]}
        onPick={(v) => set({ dbl: v })}
      />
      {st.dbl && (
        <div aria-live="polite">
          <p className="md-feedback">
            <Verdict ok={st.dbl === 'more'} yes="这接近 SEP 条目的读法" no="这正是常见的反驳" />
            按 SEP 条目的解释，迈蒙尼德的否定更极端：神不缺乏能力，<b>而且</b>他拥有它的方式与任何其他事物都不可比较。
          </p>
          <Claim b="scholar" who="SEP 条目的例子">
            说"这只狗不缺乏视力"，人们会推出它能看见，因为视力是狗通常具有的能力；可是创造宇宙的"能力"与推动一本书的能力相差太远，任何比较都会误导。否定的形式之所以优越，正在于它没有暗示我们对神的本质有任何洞见。
          </Claim>
        </div>
      )}

      <Limits>
        <p>
          <b>这不是迈蒙尼德的全部理论。</b>三类的划分和五句例句是本章的整理；迈蒙尼德逐一检查的五类肯定的属性（定义、定义的一部分、性质、关系、行为），见本章的分步重建，这里没有展开。阿奎那用"类比"提出的另一种回答，见本章的比较表和《从古代晚期到经院哲学》。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
