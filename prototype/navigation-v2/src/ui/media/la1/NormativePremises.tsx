import { Band, Claim, Limits, Pick, Verdict, useSavedIx } from '../jw1/shared';

// 一 · after the side-by-side table of Sepúlveda and Las Casas
// (content/LA1_SAMPLE_DRAFT.md). Seven claims from the chapter's table, to be
// sorted by kind — shared by both sides, normative, or factual — which is the
// chapter's second evaluating question ("which factual and which normative
// claims does it rest on?"). After each pick, who held it is revealed. Then a
// view (no right answer) on the fifth question: once the period's framework is
// set aside, what in the argument can still be tested? Every claim restates a
// cell of the chapter's table, which is the chapter's own reconstruction.

const ID = 'normative-premises';

type K = 'shared' | 'normative' | 'factual';
const KS: readonly (readonly [K, string])[] = [
  ['shared', '双方共享'],
  ['normative', '规范主张'],
  ['factual', '事实主张'],
];
const KNAME: Record<K, string> = Object.fromEntries(KS) as Record<K, string>;

type Who = 'sep' | 'lc' | 'both';
const WHONAME: Record<Who, string> = {
  sep: '塞普尔韦达的一方',
  lc: '拉斯·卡萨斯的一方',
  both: '双方都接受',
};

// Listed out of order on purpose.
const ITEMS: { id: string; text: string; k: K; who: Who; row: string }[] = [
  { id: 'p-natural', text: '天生缺乏理性的人，应当由他人统治。', k: 'normative', who: 'sep', row: '规范前提' },
  { id: 'p-cities', text: '原住民有城市、法律、宗教，有完整的理性。', k: 'factual', who: 'lc', row: '事实前提' },
  { id: 'p-convert', text: '原住民应当成为基督徒。', k: 'shared', who: 'both', row: '共同的目的' },
  { id: 'p-juris', text: '西班牙对未受洗的人没有管辖权。', k: 'normative', who: 'lc', row: '关于惩罚' },
  { id: 'p-barbarous', text: '原住民是野蛮的，缺乏理性的自我统治。', k: 'factual', who: 'sep', row: '事实前提' },
  { id: 'p-frame', text: '论证要在天主教神学、托马斯主义和亚里士多德的框架内进行。', k: 'shared', who: 'both', row: '共同的框架' },
  { id: 'p-peace', text: '只有和平的说服，才符合传教的本意。', k: 'normative', who: 'lc', row: '关于手段' },
];

type T = 'fact' | 'principle' | 'consent';
const TS: readonly (readonly [T, string])[] = [
  ['fact', '事实前提：原住民是否"野蛮"'],
  ['principle', '规范原则："文明的民族有权统治野蛮的民族"'],
  ['consent', '共享前提：传教是正当的目的'],
];
const TNOTE: Record<T, string> = {
  fact:
    '本章认为双方的分歧很大一部分在这里，而且它是可以用证据检验的：拉斯·卡萨斯有几十年的亲身经验，塞普尔韦达从未到过美洲。可是要注意，即使事实前提被驳倒，规范前提本身仍然没有被检验。',
  principle:
    '本章指出，这个原则在后来几百年中不断以新的形式出现，例如十九世纪的"文明使命"。去掉"自然奴隶"的说法，问题仍然在：谁有资格判定别人"不够文明"？拉斯·卡萨斯限制了这个原则的适用，却没有完全否认它。',
  consent:
    '这一条最容易被忽略，因为双方都没有争论它。本章指出：双方都没有问原住民自己是否愿意。这提醒我们，一场辩论中没有被争论的东西，往往和被争论的东西一样需要检验。',
};

interface Saved {
  pick: Record<string, K>;
  test: T | null;
}
const INIT: Saved = { pick: {}, test: null };

export default function NormativePremises() {
  const [st, save] = useSavedIx<Saved>('LA1', ID, INIT);
  const done = ITEMS.filter((x) => x.id in st.pick).length;
  const ok = ITEMS.filter((x) => st.pick[x.id] === x.k).length;
  const allDone = done === ITEMS.length;

  return (
    <section className="md c3 c5" aria-labelledby="np-title">
      <header className="md-head">
        <p className="md-tag">巴利亚多利德 · 前提分类</p>
        <h3 id="np-title" className="md-title">分歧在哪里？</h3>
        <p className="md-lede">
          用"五个问题"中的第二问来读这场辩论：下面七条说法，各是双方共享的、规范的，还是事实的？每选一条，会显示它属于哪一方。最后一步只是你的看法，没有标准答案。
        </p>
      </header>

      <Band>一 · 这是哪一种主张？（已选 {done} / {ITEMS.length}）</Band>
      <ol className="v21-steps" aria-label="七条说法">
        {ITEMS.map((x, i) => {
          const a = st.pick[x.id];
          const has = x.id in st.pick;
          return (
            <li key={x.id} className="v21-step">
              <span className="v21-n" aria-hidden="true">
                {i + 1}
              </span>
              <span>
                <span>{x.text}</span>
                <Pick label={`说法 ${i + 1} 是哪一种主张`} value={a} opts={KS} onPick={(v) => save({ ...st, pick: { ...st.pick, [x.id]: v } })} />
                {has && (
                  <span aria-live="polite">
                    <Verdict ok={a === x.k} yes="与本章一致" no="与本章不一致" />
                    {a === x.k ? '' : ` 本章把它看作${KNAME[x.k]}。`}
                    <span className="md-muted">
                      {' '}
                      {WHONAME[x.who]}；在本章的对比表中，它在"{x.row}"一行。
                    </span>
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ol>
      {allDone && (
        <p className="md-muted" aria-live="polite">
          {ok} / {ITEMS.length} 条与本章一致。两条事实主张正面相对；规范主张却没有一一对应——拉斯·卡萨斯没有直接否认"天生缺乏理性的人应当由他人统治"，而是论证它不适用于他所认识的美洲人，并提出了别的规范主张。
        </p>
      )}

      {allDone && (
        <div aria-live="polite">
          <Band>二 · 第五问：去掉当时的框架，你认为最值得今天检验的是哪一条？</Band>
          <Pick label="最值得今天检验的前提" value={st.test} opts={TS} onPick={(v) => save({ ...st, test: v })} />
          {st.test && (
            <p className="md-muted" aria-live="polite">
              {TNOTE[st.test]}
            </p>
          )}
          {st.test && (
            <Claim b="course">
              辩论没有宣布胜负。把前提分开，不是为了替哪一方判输赢，而是为了看清：哪些分歧可以用证据解决，哪些需要规范论证，哪些根本没有被提出来。
            </Claim>
          )}
        </div>
      )}

      <Limits>
        <p>
          <b>七条说法都复述本章对比表中的内容；那张表是本章的重建，不是两位作者自己的分类，本章也没有读塞普尔韦达的原著。</b>
          "规范"和"事实"的归类按本章导读中第二问的区分；"关于惩罚""关于手段"两行，本章没有标为规范前提，这里按主张的类型归入"规范主张"。辩论中没有原住民发言，本组件也不替他们说话。第二步没有标准答案。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
