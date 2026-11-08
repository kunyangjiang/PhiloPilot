import { Gu, Limits, Seg, useSaved } from './shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn2/cn2.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import '../cn5/cn5.css';

// 六 · after "考据：一种新的学问方式". Five small cases the chapter itself
// had to decide. In each, the learner adds the evidence one layer at a time
// (textual variant, philology, historical record, commentary, interpretive
// claim) and watches what can be concluded change, and how firmly. Where the
// chapter leaves a question open, the last step says so. The cases are the
// chapter's own textual decisions, not new ones.

const ID = 'evidential-workshop';
type Kind = 'variant' | 'philology' | 'record' | 'commentary' | 'claim' | 'parallel';
type CaseId = 'taiji' | 'siwen' | 'rizhi' | 'dai' | 'xinfa';
type Firm = 'none' | 'lean' | 'firm' | 'open';
interface Saved {
  c: CaseId;
  n: Record<string, number | undefined>;
  taijiV: 'wiki' | 'zhu';
}
const INIT: Saved = { c: 'taiji', n: {}, taijiV: 'wiki' };

const KIND: Record<Kind, string> = {
  variant: '异文',
  philology: '文字训诂',
  record: '历史记录',
  commentary: '注释',
  claim: '解释性的主张',
  parallel: '同一作者的其他文本',
};
const FIRM: Record<Firm, string> = { none: '还不能判断', lean: '有倾向', firm: '较可靠', open: '仍待核对' };

interface Layer {
  kind: Kind;
  t: string;
  src?: string;
  orig?: string;
  then: string; // what can be concluded once this layer is in
  firm: Firm;
}
interface Case {
  name: string;
  q: string;
  start: string;
  layers: Layer[];
  lesson: string;
}

const CASES: Record<CaseId, Case> = {
  taiji: {
    name: '《太极图说》第一句',
    q: '周敦颐是否说"无极"在"太极"之先？',
    start: '只凭通行的读法，很多人默认"无极而太极"就是周敦颐的原话。',
    layers: [
      {
        kind: 'variant',
        t: '维基文库本作"自無極而為太極"，朱熹整理的通行本作"無極而太極"。',
        src: '《太極圖說》（维基文库本）',
        orig: '自無極而為太極。',
        then: '两个本子不同。原话是哪一种，单凭这两个本子不能决定。',
        firm: 'none',
      },
      {
        kind: 'philology',
        t: '"自……而为……"读起来像一个先后的过程；"无极而太极"可以读成"无极就是太极"。',
        then: '两个字的差别会改变意思：一种像先后，一种像同一。',
        firm: 'lean',
      },
      {
        kind: 'commentary',
        t: '朱熹采用"无极而太极"，认为"无极"只是形容太极"无形而有理"。',
        then: '通行本的读法和朱熹的解释是一起出现的：读通行本，就已经在读朱熹的解释。',
        firm: 'lean',
      },
      {
        kind: 'claim',
        t: '陆九渊、陆九韶怀疑"无极"二字出自道家，不是儒家的说法；朱陆写了好几封长信辩论。',
        then: '一个词的出处，成了"是不是儒家"的争论焦点。本课没有核对校本，所以不判断哪一个是周敦颐的原文。',
        firm: 'open',
      },
    ],
    lesson: '异文本身不决定结论；决定结论的，是你接受哪一个本子，而接受哪一个本子，又常常已经带着一种解释。',
  },
  siwen: {
    name: '《思问录》的"曰"和"日"',
    q: '王夫之说的是"命曰降，性曰受"，还是"命日降，性日受"？',
    start: '文库本作"命曰降，性曰受"。',
    layers: [
      {
        kind: 'variant',
        t: '文库本作"曰"。"曰"和"日"字形极近，抄刻时容易混。',
        then: '文库本的字可能是误字，但单凭字形不能确定。',
        firm: 'none',
      },
      {
        kind: 'philology',
        t: '下一句是"初生而受性之量，日生而受性之真"。',
        src: '《思問錄》',
        orig: '初生而受性之量，日生而受性之真。',
        then: '上下文讲的是"日生"：从上下文看，"曰"可能是"日"的误字。',
        firm: 'lean',
      },
      {
        kind: 'claim',
        t: '王夫之的主张是"性日生"：性不是出生时一次给定的，而是每天在生成。',
        then: '如果读作"日"，前一句就和"性日生"完全一致。但本课没有核对校本。',
        firm: 'open',
      },
    ],
    lesson: '本课的处理：只引后一句，不引有疑问的前一句。证据不够时，少引一句比改一个字更稳妥。',
  },
  rizhi: {
    name: '《日知录》"心学"条：谁在说话？',
    q: '"《中庸章句》引程子……亦是借用釋氏之言"是顾炎武说的，还是他引的黄震说的？',
    start: '这一条先大段引用南宋黄震的《黄氏日钞》，然后是顾炎武自己的话。',
    layers: [
      {
        kind: 'record',
        t: '黄震是南宋人。他批评的"近世"是南宋的情况，不是明代的王学。',
        src: '《日知錄·卷十八》（黄震语）',
        orig: '近世喜言心學，捨全章本旨而獨論人心道心',
        then: '同一段文字的批评对象，取决于说话的人是谁、在什么时代。',
        firm: 'lean',
      },
      {
        kind: 'variant',
        t: '文库本中，黄震的引文到哪里结束、顾炎武的按语从哪里开始，标点不完全清楚。',
        then: '如果引文边界划错，就会把黄震的话当成顾炎武的，或者反过来。',
        firm: 'none',
      },
      {
        kind: 'claim',
        t: '本课把"《中庸章句》引程子"一句看作顾炎武的按语。',
        src: '《日知錄·卷十八》',
        orig: '《中庸章句》引程子之言曰：「此篇乃孔門傳授心法。」亦是借用釋氏之言，不無可酌。',
        then: '照这样读，顾炎武不只批评王学，也指出程朱有"借用釋氏之言"之处。这一判断有待以校本核对。',
        firm: 'open',
      },
    ],
    lesson: '引文的边界本身就是证据问题：同一句话，算在谁的名下，会改变我们对一个人立场的判断。',
  },
  dai: {
    name: '"以理杀人"：埋和理',
    q: '戴震《与某书》的那句话是什么？',
    start: '文库本《戴东原集》作"酷吏以㳒殺人後儒以埋殺人"。',
    layers: [
      {
        kind: 'variant',
        t: '文库本的原样。',
        src: '《戴東原集》（维基文库本）',
        orig: '酷吏以㳒殺人後儒以埋殺人',
        then: '照字面，"后儒以埋杀人"读不通。',
        firm: 'none',
      },
      {
        kind: 'philology',
        t: '"㳒"是"法"的古字；"埋"和"理"字形相近，显然是"理"的误字。',
        then: '读作"酷吏以法杀人，后儒以理杀人"。',
        firm: 'firm',
      },
      {
        kind: 'parallel',
        t: '《孟子字义疏证》卷上有同一个意思的长段："人死於法，猶有憐之者；死於理，其誰憐之！"',
        src: '《孟子字義疏證·卷上》',
        orig: '人死於法，猶有憐之者；死於理，其誰憐之！',
        then: '同一作者的另一部书说了同样的意思：改"埋"为"理"有了独立的支持。',
        firm: 'firm',
      },
    ],
    lesson: '一个明显的误字，需要两种证据：字形和训诂说明它可能是误字，同一作者的其他文本说明改过以后的意思是他的意思。',
  },
  xinfa: {
    name: '顾炎武："传授心法"是借来的词',
    q: '能否从一个词的来源，推出一种学说的来源？',
    start: '《中庸章句》引程子说《中庸》是"孔門傳授心法"。',
    layers: [
      {
        kind: 'philology',
        t: '顾炎武考察这个说法的来源：《论语》中没有，是佛教的用语。',
        then: '这个说法是借用来的词。这是考据学的典型方法：考察一个词的来源，而不是提出一个哲学论证。',
        firm: 'firm',
      },
      {
        kind: 'claim',
        t: '顾炎武的结论："亦是借用釋氏之言，不無可酌。"',
        then: '他的结论措辞克制："不無可酌"（有可以斟酌的地方），没有说程朱的学说就是佛教。',
        firm: 'lean',
      },
      {
        kind: 'claim',
        t: '比较戴震：他从程朱"学过佛老"（程颢行状、朱熹《答汪尚书》），推到"他们的理论混杂了佛老"。',
        then: '"学过""用了一个词"和"学说来自"之间，还需要进一步的论证。词语的来源是证据的一部分，不是结论本身。',
        firm: 'open',
      },
    ],
    lesson: '考据能证明一个词从哪里来；能不能由此证明一种思想从哪里来，是另一个问题。',
  },
};

export default function EvidentialWorkshop() {
  const [st, save] = useSaved<Saved>(ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const c = CASES[st.c] ? st.c : 'taiji';
  const cs = CASES[c];
  const n = Math.max(0, Math.min(cs.layers.length, st.n[c] ?? 0));
  const cur = n > 0 ? cs.layers[n - 1] : null;
  const setN = (k: number) => set({ n: { ...st.n, [c]: k } });

  return (
    <section className="md c3 c5" aria-labelledby="ev-title">
      <header className="md-head">
        <p className="md-tag">方法工作坊 · 证据怎样改变结论</p>
        <h3 id="ev-title" className="md-title">
          考据：一层一层加入证据
        </h3>
        <p className="md-lede">
          五个小案例，都是本课自己在引用时必须决定的问题。一次加入一层证据，看能得出什么结论、结论有多可靠。证据分五种：异文、文字训诂、历史记录、注释、解释性的主张。
        </p>
      </header>

      <Seg name="ev-case" label="选择一个案例" value={c} opts={(Object.keys(CASES) as CaseId[]).map((k) => [k, CASES[k].name] as const)} onPick={(v) => set({ c: v })} />

      <div className="g4-panel">
        <p className="md-fb-k">问题：{cs.q}</p>
        <p>{cs.start}</p>
        {c === 'taiji' && (
          <Seg
            name="ev-taiji"
            label="按哪一个本子读"
            value={st.taijiV}
            opts={[
              ['wiki', '自無極而為太極'],
              ['zhu', '無極而太極'],
            ]}
            onPick={(v) => set({ taijiV: v })}
          />
        )}
        {c === 'taiji' && (
          <p className="md-muted" aria-live="polite">
            {st.taijiV === 'wiki' ? '按这个本子：先有无极，然后从中产生太极？读过上一门课的人会想起"以无为本"。' : '按这个本子：无极就是太极，只是形容它"无形而有理"（朱熹的解释）。'}
          </p>
        )}

        <ol className="c5-steps">
          {cs.layers.map((l, i) => (
            <li key={i} className={'c5-step' + (i < n ? '' : ' is-off')}>
              <span className="c5-mark">{i + 1}</span>
              <span>
                <span className="c5-layer">{KIND[l.kind]}</span>
                {i < n ? (
                  <>
                    {l.t}
                    {l.orig && <Gu src={l.src!} orig={l.orig} />}
                  </>
                ) : (
                  <span className="md-muted">（还没有加入）</span>
                )}
              </span>
            </li>
          ))}
        </ol>
        <div className="c4-actions">
          <button type="button" className="md-disclose" disabled={n >= cs.layers.length} onClick={() => setN(n + 1)}>
            加入下一层证据
          </button>
          <button type="button" className="md-disclose" disabled={n === 0} onClick={() => setN(n - 1)}>
            拿掉最后一层
          </button>
        </div>

        <div className="md-feedback" aria-live="polite">
          <p className="md-fb-k">
            现在能得出的结论
            {cur && (
              <span className={'c5-verdict ' + (cur.firm === 'firm' ? 'c5-verdict--ok' : 'c5-verdict--open')} style={{ marginLeft: 8 }}>
                {FIRM[cur.firm]}
              </span>
            )}
          </p>
          <p>{cur ? cur.then : '还没有加入证据：现在的看法只是默认。'}</p>
          {n === cs.layers.length && <p className="md-muted">{cs.lesson}</p>}
        </div>
      </div>

      <Limits>
        <p>这些案例的判断都是本课在引用时作的，大多写明"本课没有核对校本"。真正的考据要比对多种版本和校本；这里只演示证据的种类和它们怎样改变结论。</p>
        <p>五种证据的名称是为了教学而作的区分。考据学者自己的工作（校勘文本、考证古音古义、研究名物制度）分得更细，也不完全相同。</p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
