import { Band, Claim, Limits, OrigSrc, Pick, Verdict, useSavedIx } from '../jw1/shared';

// 四 · after the step-by-step deconstructive reading of Saussure on writing
// (content/EA12_SAMPLE_DRAFT.md). The reader sorts four of the chapter's checked
// Saussure passages: does the passage set up the hierarchy (writing is external,
// derived), or does it rely on writing to explain the sign itself? Then picks the
// conclusion of the reading, and finally weighs a rival reading (a view, no right answer).
// Every French line is one of the chapter's own checked passages with its translation;
// the reading itself is the chapter's reconstruction from a common account.

const ID = 'writing-hierarchy';

type K = 'rank' | 'use';
const KS: readonly (readonly [K, string])[] = [
  ['rank', '确立等级：文字是外在的、派生的'],
  ['use', '依赖文字：用文字说明符号本身'],
];

const PASSAGES: { id: string; src: string; orig: string; zh: string; k: K; why: string }[] = [
  {
    id: 'p45',
    src: '《普通语言学教程》第 45 页',
    orig: 'Langue et écriture sont deux systèmes de signes distincts ; l’unique raison d’être du second est de représenter le premier…',
    zh: '语言和文字是两种不同的符号系统；后者存在的唯一理由，是表现前者……',
    k: 'rank',
    why: '文字只是为了"表现"说出的语言而存在；只有说出的词才构成语言学的对象。',
  },
  {
    id: 'p165',
    src: '《普通语言学教程》第 165 页',
    orig: '…1° les signes de l’écriture sont arbitraires ; aucun rapport, par exemple, entre la lettre t et le son qu’elle désigne ; 2° la valeur des lettres est purement négative et différentielle…',
    zh: '……第一，文字的符号是任意的；例如，字母 t 和它所表示的声音之间没有任何联系；第二，字母的价值纯粹是否定的、区别性的……',
    k: 'use',
    why: '为了说明语言符号怎样起作用，索绪尔拿文字作比较：任意性和区别性，正是他归给一切语言符号的特征。',
  },
  {
    id: 'p52',
    src: '《普通语言学教程》第 51—52 页',
    orig: '…l’écriture voile la vue de la langue : elle n’est pas un vêtement, mais un travestissement.',
    zh: '……文字遮蔽了我们对语言的观察：它不是一件衣服，而是一副伪装。',
    k: 'rank',
    why: '文字不只是外在的，还是一种"伪装"，会妨碍我们看清语言。',
  },
  {
    id: 'p53',
    src: '《普通语言学教程》第 53 页',
    orig: '…la tyrannie de la lettre… c’est là proprement un fait pathologique.',
    zh: '……字母的暴政……严格说来，这是一种病理的事实。',
    k: 'rank',
    why: '文字反过来改变了语言的读音，索绪尔称之为"病理的"：文字越出了它应有的从属位置。',
  },
];

type C = 'more' | 'wrong' | 'rein';
const CS: readonly (readonly [C, string])[] = [
  ['more', '文字比说话更重要'],
  ['wrong', '索绪尔的语言学是错的'],
  ['rein', '归给文字的特征属于一切符号，"文字"要在更宽的意义上重新理解'],
];
const CNOTE: Record<C, string> = {
  more: '这只是把等级倒过来。解构的第二个阶段是"重新铭写"：标记说话和书写共同依赖的条件，而不是让低的一方变成高的一方。',
  wrong: '解构不是从外部驳倒索绪尔；它指出的是索绪尔自己的两处文字之间的张力。',
  rein: '这是本章重建的第 3—5 步："原文字"或"踪迹"既不是通常意义上的书写，也不是通常意义上的说话，而是两者共同的条件。',
};

type V = 'analogy' | 'tension' | 'open';
const VS: readonly (readonly [V, string])[] = [
  ['analogy', '第 165 页只是一个类比'],
  ['tension', '张力是真实的'],
  ['open', '要看更多的文本才能判断'],
];
const VNOTE: Record<V, string> = {
  analogy:
    '长处：认真对待了索绪尔的措辞——他说的是拿文字"作为比较的项"。代价：要解释为什么文字恰好具有他归给一切符号的特征，而这并没有使他修改第 45 页的等级。',
  tension:
    '长处：抓住了第 45 页和第 165 页之间的不对称。代价：要说明这个张力能否推广到"一切在场的形而上学"，而不只是这一本书。',
  open: '长处：提醒读法要靠文本证据来判断，《教程》本身是编者根据学生笔记整理的。代价：判断被推迟了；可是哪些文本会改变判断，仍然需要说清楚。',
};

interface Saved {
  ans: Record<string, K>;
  concl: C | null;
  view: V | null;
}
const INIT: Saved = { ans: {}, concl: null, view: null };

export default function WritingHierarchy() {
  const [st, save] = useSavedIx<Saved>('EA12', ID, INIT);
  const done = PASSAGES.filter((x) => x.id in st.ans).length;
  const right = PASSAGES.filter((x) => st.ans[x.id] === x.k).length;
  const all = done === PASSAGES.length;

  return (
    <section className="md c3 c5" aria-labelledby="wh-title">
      <header className="md-head">
        <p className="md-tag">解构 · 读一个文本</p>
        <h3 id="wh-title" className="md-title">索绪尔的这段话，是在贬低文字，还是在依赖文字？</h3>
        <p className="md-lede">
          先把四段原文分一分，再选出解构式读法的结论；最后比较两种对立的读法。四段法文都是本章核对过的原文。
        </p>
      </header>

      <Band>
        一 · 分拣（已分 {done} / {PASSAGES.length}）
      </Band>
      <ol className="v21-steps" aria-label="四段原文">
        {PASSAGES.map((x, i) => {
          const a = st.ans[x.id];
          const has = x.id in st.ans;
          return (
            <li key={x.id} className="v21-step">
              <span className="v21-n" aria-hidden="true">
                {i + 1}
              </span>
              <span>
                <OrigSrc src={x.src} orig={x.orig} lang="fr" zh={x.zh} />
                <Pick label={`${x.src}：这段话在做什么`} value={a} opts={KS} onPick={(v) => save({ ...st, ans: { ...st.ans, [x.id]: v } })} />
                {has && (
                  <span aria-live="polite">
                    <Verdict ok={a === x.k} yes="对" no="再想想" />
                    {a === x.k ? x.why : '先问：这段话说的是文字应当处在什么位置，还是借文字来说明一切符号怎样起作用？'}
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ol>

      {all && (
        <div aria-live="polite">
          <Band>二 · 解构式读法的结论（{right} / {PASSAGES.length} 项分拣与本章一致）</Band>
          <Pick label="解构式读法得出什么结论" value={st.concl} opts={CS} onPick={(v) => save({ ...st, concl: v })} />
          {st.concl && (
            <p aria-live="polite">
              <Verdict ok={st.concl === 'rein'} yes="对" no="再想想" />
              {CNOTE[st.concl]}
            </p>
          )}

          {st.concl === 'rein' && (
            <>
              <Band>三 · 两种读法，你倾向哪一种？</Band>
              <Pick label="你倾向哪一种读法" value={st.view} opts={VS} onPick={(v) => save({ ...st, view: v })} />
              {st.view && (
                <p className="md-muted" aria-live="polite">
                  {VNOTE[st.view]}
                </p>
              )}
              {st.view && (
                <Claim b="course">
                  无论倾向哪一种，争论的方式都一样：回到文本，指出哪一段话支持或反对这个读法。这正是解构不是"随便解释"的理由。
                </Claim>
              )}
            </>
          )}
        </div>
      )}

      <Limits>
        <p>
          <b>四段法文据法语维基文库所录 1971 年 Payot 本，页码已与该本的扫描图像核对；中文是本章试译。</b>这里的读法是本章借用解构框架所作的重建，不是德里达的原话。德里达对索绪尔的读法本身有争议：戴莱特（2011）认为他忽视了索绪尔的价值理论，而这里的重建恰恰用到了这一理论。详见课文第四部分"这种读法的争议"和注 52。第三步的两种读法都只是可能的读法，没有标准答案。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
