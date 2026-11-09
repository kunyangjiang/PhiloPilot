import { Band, Claim, Limits, Seg, Src, Tag, useSavedIx, Verdict } from '../in4/shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import '../cn5/cn5.css';
import '../cn7/cn7.css';
import '../in2/ip.css';
import '../in4/in4.css';

// 三 · after "对弥曼差派来说，这个争论不只是语言学的问题" (这个争论为什么重要？).
// One shared example, gām ānaya ("把牛带来"), read by both schools:
// 1. Bhāṭṭa abhihitānvaya vs Prābhākara anvitābhidhāna, step by step; Śabara 1.1.25,
//    which both schools claim; lakṣaṇā only as SEP reports it.
// 2. How a child learns words (āvāpa and uddhāra), with the course's added row marked.
// 3. Śālikanātha's count (eight sentences, seven words), the infinite-powers
//    objection and the eye analogy.
// 4. The three conditions; and why the dispute matters for the Veda.
// Every quotation is the chapter's own (三、, notes 35–45; 40–43 checked against print).

const ID = 'sentence-lab';

type School = 'bhatta' | 'prabhakara';
const SCHOOLS: [School, string][] = [
  ['bhatta', '巴陀派：表述后关联（abhihitānvaya）'],
  ['prabhakara', '普拉巴卡拉派：关联中表述（anvitābhidhāna）'],
];
const WORDS: Record<School, { gam: string; anaya: string; steps: { t: string; b: 'text' | 'scholar' | 'school' | 'course'; who?: string }[] }> = {
  bhatta: {
    gam: '牛性（单独的词义）',
    anaya: '带来（单独的词义）',
    steps: [
      { t: '"gām"表达它自己的词义：牛性；"ānaya"表达它自己的词义。', b: 'school', who: '巴陀派' },
      { t: '词语表达了各自的意义之后，就停止了作用。', b: 'text', who: '夏巴拉 1.1.25' },
      { t: '被理解了的词义，再彼此关联起来，让人理解句义："把牛带来"。', b: 'text', who: '夏巴拉 1.1.25' },
      { t: '这个关联不是来自词的直接表达能力，而是来自"转指"（lakṣaṇā）这一种次要的能力。本章没有读到鸠摩利罗本人关于这一点的原文。', b: 'scholar', who: 'SEP《印度哲学中的字面意义与非字面意义》' },
    ],
  },
  prabhakara: {
    gam: '与"带来"相关联的牛',
    anaya: '与"牛"相关联的带来',
    steps: [
      { t: '"gām"表达的已经是处在关联中的词义："与某个行为相关联的牛"。', b: 'school', who: '普拉巴卡拉派' },
      { t: '"ānaya"同样表达处在关联中的意义。', b: 'school', who: '普拉巴卡拉派' },
      { t: '词本身就表达了关联，句义直接由词给出；不需要转指。', b: 'scholar', who: 'SEP 的介绍' },
      { t: '夏利卡那他也引用夏巴拉 1.1.25（"注释家说"），并在自己的理论框架中讨论它。', b: 'text', who: '夏利卡那他《释论五章》' },
    ],
  },
};

const LEARN: { say: string; did: string; diff: string; ours?: boolean }[] = [
  { say: '"把牛带来"', did: '把牛带来', diff: '（起点）' },
  { say: '"把牛拴起来"', did: '把牛拴起来', diff: '换了动词，动作变了，对象没变' },
  { say: '"把马带来"', did: '把马带来', diff: '换了名词，对象变了，动作没变', ours: true },
  { say: '"把白牛带来"', did: '把白色的那头牛带来', diff: '加了一个词，对象的范围变窄了' },
];

const VOC = ['śiśo', 'vatsa', 'arbhaka', 'ḍimbha'];
const VERB = [
  ['gāmānaya', '把牛带来'],
  ['gāṃ badhāna', '把牛拴起来'],
] as const;

type Cond = 'akanksa' | 'yogyata' | 'asatti';
const CONDS: [Cond, string][] = [
  ['akanksa', '期待（ākāṅkṣā）'],
  ['yogyata', '适合（yogyatā）'],
  ['asatti', '邻近（āsatti，又作 saṃnidhi）'],
];
const BAD: { k: string; s: string; ans: Cond; fb: string; who: string }[] = [
  { k: 'list', s: '"牛、马、人、象"', ans: 'akanksa', fb: '一串名词，彼此不期待，不成句子。说了"带来"，听者才期待知道带来什么。', who: '本章的例子' },
  { k: 'fire', s: '"用火浇灌"（agninā siñcati）', ans: 'yogyata', fb: '语法上完整，但火不能用来浇灌：词义之间的关联在事实上不可能。', who: 'SEP 所举的标准例子' },
  { k: 'late', s: '今天说"把牛"，明天说"带来"', ans: 'asatti', fb: '相关的词没有在时间上连续说出，不成为一个句子。', who: '本章的例子' },
];

interface Saved {
  school: School;
  step: number;
  learn: number | null;
  count: 'shown' | null;
  obj: boolean;
  cond: Record<string, Cond>;
}
const INIT: Saved = { school: 'bhatta', step: 0, learn: null, count: null, obj: false, cond: {} };

export default function SentenceLab() {
  const [st, save] = useSavedIx<Saved>('IN5', ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const w = WORDS[st.school] ?? WORDS.bhatta;
  const step = Math.min(st.step ?? 0, w.steps.length - 1);
  const cond = st.cond ?? {};
  const row = st.learn != null ? LEARN[st.learn] : null;

  return (
    <section className="md c3 c5" aria-labelledby="sl-title">
      <header className="md-head">
        <p className="md-tag">句义 · 实验室</p>
        <h3 id="sl-title" className="md-title">
          "把牛带来"：两派怎样从词得到句子
        </h3>
        <p className="md-lede">同一个例子，两种理论。先一步一步看巴陀派和普拉巴卡拉派怎样理解"gām ānaya"；再看孩子怎样学会词义、夏利卡那他的简约性论证和它面临的反驳；最后看句子成立的三个条件，以及这个争论对吠陀权威的意义。</p>
      </header>

      <Band>一 · 同一个句子，两种理论</Band>
      <Seg name="sl-school" label="选择一派" col value={st.school} opts={SCHOOLS} onPick={(v) => set({ school: v, step: 0 })} />
      <ul className="ix-words" aria-label="gām ānaya 的两个词">
        <li className="ix-word" lang="sa">
          gām
          <small lang="zh">{w.gam}</small>
        </li>
        <li className="ix-join">{st.school === 'bhatta' ? '＋ 之后关联' : '已在关联中'}</li>
        <li className="ix-word" lang="sa">
          ānaya
          <small lang="zh">{w.anaya}</small>
        </li>
      </ul>
      <ol className="ix-steps" aria-live="polite">
        {w.steps.slice(0, step + 1).map((s, i) => (
          <li key={i} className={i === step ? 'is-stop' : undefined}>
            {s.t} <Tag b={s.b} who={s.who} />
          </li>
        ))}
      </ol>
      <p>
        <button type="button" className="md-disclose" disabled={step === 0} onClick={() => set({ step: step - 1 })}>
          上一步
        </button>{' '}
        <button type="button" className="md-disclose" disabled={step >= w.steps.length - 1} onClick={() => set({ step: step + 1 })}>
          下一步（{step + 1} / {w.steps.length}）
        </button>
      </p>
      <Src
        src="夏巴拉《弥曼差经注》1.1.25（两派都当作要处理的权威文句）"
        lang="sa"
        orig="padāni hi svaṃ svaṃ padārtham abhidhāya nivṛttavyāpārāṇi. athedānīṃ padārthā avagatāḥ santo vākyārthaṃ gamayanti."
        zh="词语表达了各自的意义之后，就停止了作用。然后，这些被理解了的词义，再让人理解句子的意义。"
      />
      <Claim b="course">一句话被两派都当作要处理的权威文句，说明夏巴拉原文并没有替后来的争论作出裁决。</Claim>
      <p className="md-muted">
        各自的困难：巴陀派要说明词义怎样"自己"关联起来、为什么需要转指；普拉巴卡拉派要回答一个词要表达多少种关联。 <Tag b="course" who="本章的整理" />
      </p>

      <Band>二 · 孩子怎样学会词义</Band>
      <Src
        src="夏利卡那他《句义之母》第 6 颂"
        lang="sa"
        orig="vyavahāreṣu vṛddhānāṃ vākyaśravaṇabhāviṣu / āvāpoddhārabhedena padānāṃ śaktiniścayaḥ"
        zh="在长辈们听到句子之后所作的行动中，通过［词的］加入和去除所造成的差别，［学习者］确定了词的表达能力。"
      />
      <p>孩子在旁边看。点一句长辈的话，看听者做了什么、孩子注意到什么差别：</p>
      <div className="ix-square" role="group" aria-label="长辈说的四句话">
        {LEARN.map((l, i) => (
          <button key={l.say} type="button" className={'ix-corner' + (st.learn === i ? ' is-on' : '')} aria-pressed={st.learn === i} onClick={() => set({ learn: st.learn === i ? null : i })}>
            <small>长辈说{l.ours ? '（本章所加）' : ''}</small>
            <span className="ix-k">{l.say}</span>
          </button>
        ))}
      </div>
      {row && (
        <p className="md-feedback" aria-live="polite">
          听者：{row.did}。孩子注意到：{row.diff}。{' '}
          {row.ours ? <Tag b="course" who="这一行是本章仿照所加" /> : <Tag b="text" who="仿照夏利卡那他的例句" />}
        </p>
      )}
      <Claim b="school" who="普拉巴卡拉派">孩子最先接触的不是单独的词，而是命令句和它引起的行动；所以词从一开始就是作为"某个要做的事情的一部分"被学会的。</Claim>

      <Band>三 · 简约性：八个句子，七个词</Band>
      <table className="ip-sort">
        <caption className="visually-hidden">夏利卡那他的八个例句</caption>
        <thead>
          <tr>
            <th scope="col">称呼</th>
            {VERB.map(([s, z]) => (
              <th key={s} scope="col">
                {z}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {VOC.map((v) => (
            <tr key={v}>
              <th scope="row" lang="sa">
                {v}
              </th>
              {VERB.map(([s]) => (
                <td key={s} lang="sa">
                  {v} ! {s}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" className="md-disclose" aria-expanded={st.count === 'shown'} onClick={() => set({ count: st.count ? null : 'shown' })}>
        {st.count ? '收起计数' : '数一数：要设定多少种表达能力？'}
      </button>
      {st.count && (
        <div aria-live="polite">
          <ul className="ix-words" aria-label="七个词">
            {[...VOC, 'gām', 'ānaya', 'badhāna'].map((x) => (
              <li key={x} className="ix-word" lang="sa">
                {x}
              </li>
            ))}
          </ul>
          <p className="md-feedback">主张句子是表达单位的人，要为这八个句子设定八种能力；主张词是表达单位的人，只需为七个词设定七种能力。每多一个称呼或动词，句子就成倍增加，词只增加一个。</p>
          <Src
            src="夏利卡那他《句义之母》第 6 颂的自注（与印本对照，文字相同）"
            lang="sa"
            orig={'śiśo ! gāmānaya, śiśo ! gāṃ badhāna, vatsa ! gāmānaya, vatsa ! gāṃ badhāna, arbhaka ! gāmānaya, arbhaka ! gāṃ badhāna, ḍimbha ? gāmānaya, ḍimbha ? gāṃ badhāne"tyaṣṭānāṃ vākyānāmaṣṭau vācakaśaktayaḥ kalpyāḥ / padavādinastu, saptānāṃ padānāṃ saptaiva śaktaya iti kalpanālāghavam'}
            zh="“孩子，把牛带来”、“孩子，把牛拴起来”……［用四个不同的称呼各说两句］，［主张句子是表达单位的人］要为这八个句子设定八种表达能力；而主张词是表达单位的人，只需为七个词设定七种能力。这就是设定上的简约。"
          />
          <Claim b="course" who="现代的对照">今天的语言哲学家用"有限的词汇怎样生成无限多的句子"来说同一件事。</Claim>
        </div>
      )}
      <button type="button" className="md-disclose" aria-expanded={!!st.obj} onClick={() => set({ obj: !st.obj })}>
        {st.obj ? '收起反驳' : '反驳：普拉巴卡拉派自己不也需要无穷多的能力吗？'}
      </button>
      {st.obj && (
        <div aria-live="polite">
          <p>如果"牛"表达的是"与某个行为相关联的牛"，它在"把牛带来"和"把牛拴起来"中表达的就不同了。夏利卡那他自己提出了这个反驳，回答是：</p>
          <Src
            src="夏利卡那他《句义之母》自注（与印本对照，文字相同）"
            lang="sa"
            orig="ekayaivā'kāṅkṣita-sannihita-yogyārthānvitasvārthābhidhānaśaktyā pratiyogibhedena kāryabhedopapatteścakṣurādīnāmiva / cakṣuryathaivaikayā darśanaśaktyā ghaṭādipratiyogisahāyabhedājjñānāni bhinnāni janayati, tathā śabdo 'pi pratiyogibhedāditi mantavyam"
            zh="［不需要无穷多的能力，］因为只要一种能力，即“表达与被期待的、邻近的、适合的意义相关联的自身意义”的能力，就可以随着相关项的不同而产生不同的结果，就像眼睛等等一样。眼睛只有一种看的能力，却因为所配合的对象，如瓶子等等的不同，而产生不同的认识；词也是这样，因相关项的不同［而产生不同的句义］。"
          />
        </div>
      )}

      <Band>四 · 句子成立的三个条件</Band>
      <p>夏利卡那他的回答提到三个条件。下面每一个都不成句子，缺的是哪一个条件？</p>
      {BAD.map((b) => {
        const v = cond[b.k];
        return (
          <div key={b.k} className="c5-row">
            <p>
              <b>{b.s}</b>
            </p>
            <Seg name={'sl-cond-' + b.k} label={b.s + '缺哪一个条件'} value={v ?? null} opts={CONDS} onPick={(x) => set({ cond: { ...cond, [b.k]: x } })} />
            {v && (
              <p className="md-feedback" aria-live="polite">
                <Verdict ok={v === b.ans} yes="缺的正是这个条件" no="缺的不是这个条件" />
                {v !== b.ans && `缺的是${CONDS.find(([k]) => k === b.ans)![1]}：`}
                {b.fb} <Tag b={b.k === 'fire' ? 'scholar' : 'course'} who={b.who} />
              </p>
            )}
          </div>
        );
      })}
      <Claim b="course">对弥曼差派来说，这不只是语言学的问题：吠陀的权威建立在语言上，理解命令句的过程必须一步一步说清楚。普拉巴卡拉派的理论还意味着，语言的基本功能是指示行动，而不是描述事实。</Claim>
      <Claim b="scholar" who="SEP，现代的类比">SEP 的作者把普拉巴卡拉派的理论和弗雷格"不饱和"的概念相比较；本章只把它当作对照。</Claim>

      <Limits>
        <p>这不是一个句法分析器。两派的步骤是本章据夏巴拉、夏利卡那他和 SEP 的整理；巴陀派用"转指"说明句子统一，只是转述 SEP 的介绍。"把马带来"一行和三个条件中的两个反例是本章的例子。</p>
        <p>夏利卡那他的引文据 GRETIL 电子本，并与 1961 年印本对照过；这不等于读法已经由校勘本确立。</p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
