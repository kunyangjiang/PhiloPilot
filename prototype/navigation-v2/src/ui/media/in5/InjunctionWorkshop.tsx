import { Band, Claim, Limits, Seg, Src, Tag, useSavedIx, Verdict } from '../in4/shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import '../cn5/cn5.css';
import '../cn7/cn7.css';
import '../in2/ip.css';
import '../in4/in4.css';

// 一 · after "这里可以看到弥曼差派思考命令的方式" (the śyena table).
// 1. One documented injunction, "agnihotraṃ juhuyāt svargakāmaḥ", as Śabara quotes
//    it (its Vedic source is unchecked, note 14): its three parts, and what it does
//    and does not command.
// 2. Śabara's three kinds of Vedic sentence (1.4.1).
// 3. The śyena case (Śabara on 1.1.2): an effective means that is not dharma.
// 4. Duty and consequences; the modern labels are kept apart from the texts.
// Every quotation is the chapter's own (一、, notes 11–19).

const ID = 'injunction-workshop';

type Part = 'adhikarin' | 'act' | 'form';
const PARTS: { k: Part; w: string; role: string; zh: string; read: string }[] = [
  { k: 'act', w: 'agnihotraṃ', role: '行为', zh: '"火祭"（agnihotra）', read: '应当做的事。' },
  { k: 'form', w: 'juhuyāt', role: '命令的形式', zh: '动词的祈愿语气（"应当……"）', read: '推动人去做的力量本身。' },
  { k: 'adhikarin', w: 'svargakāmaḥ', role: '资格者（adhikārin）', zh: '"想要天界的人"', read: '命令针对谁：有这个愿望的人。' },
];

type Cmd = 'everyone' | 'conditional' | 'fact';
const CMDS: [Cmd, string][] = [
  ['everyone', '每个人都必须举行火祭'],
  ['conditional', '如果你想要天界，就应当举行火祭'],
  ['fact', '火祭会带来天界（一个因果事实的报告）'],
];
const CMD_FB: Record<Cmd, { ok: boolean; t: string }> = {
  conditional: { ok: true, t: '命令是有条件的：资格者一栏是条件，不是命令。但弥曼差派也承认另一类经常性的义务（例如每日必行的祭祀），它们不以某个愿望为条件。' },
  everyone: { ok: false, t: '句子没有这样说。"想要天界的人"限定了命令针对谁；没有这个愿望的人，不在这条命令之下。' },
  fact: { ok: false, t: '弥曼差派不把命令句读作一个先知道的因果事实再加上一个推论。我们是从命令句中同时知道"应当做"和"会带来什么"的；普拉巴卡拉派更强调，命令句首先告诉人的是"应做之事"本身。' },
};

type Kind = 'vidhi' | 'arthavada' | 'mantra';
const KINDS: [Kind, string][] = [
  ['vidhi', '命令句（vidhi）'],
  ['arthavada', '释义句（arthavāda）'],
  ['mantra', '祭咒（mantra）'],
];
const SENTS: { k: string; orig: string; zh: string; ans: Kind; fb: string }[] = [
  { k: 'soma', orig: 'somena yajeta', zh: '"应当用苏摩祭祭祀"', ans: 'vidhi', fb: '让人知道原来不知道的、应当做的事；它本身就能告诉我们法。' },
  { k: 'vayu', orig: 'vāyur vai kṣepiṣṭhā devatā', zh: '"风神确实是最迅速的神"', ans: 'arthavada', fb: '它赞美命令句所规定的行为，激发人去做；不能单独告诉我们法，与命令句合成一句时才有意义。它不是在报告一个关于风神的事实。' },
];

type Sy = 'means' | 'command' | 'dharma';
const SY: { k: Sy; q: string; a: string; note: string }[] = [
  { k: 'means', q: '吠陀有没有告诉人这个手段有效？', a: '有', note: '吠陀在这里是可靠的知识来源。' },
  { k: 'command', q: '吠陀有没有命令人去伤害？', a: '没有，它只说"行咒害的人"应当怎样做', note: '命令句的资格者部分是条件，不是命令。' },
  { k: 'dharma', q: '做这件事是不是法？', a: '不是，因为伤害被另一条命令禁止', note: '"法"要求既被命令、又有益。' },
];

type Why = 'result' | 'only';
const WHYS: [Why, string][] = [
  ['result', '因为我们独立地知道它会带来天界，所以应当做'],
  ['only', '它会带来天界，这一点我们只能从命令句知道'],
];

interface Saved {
  part: Part | null;
  cmd: Cmd | null;
  sort: Record<string, Kind>;
  sy: Partial<Record<Sy, 'yes' | 'no'>>;
  why: Why | null;
  modern: boolean;
}
const INIT: Saved = { part: null, cmd: null, sort: {}, sy: {}, why: null, modern: false };

export default function InjunctionWorkshop() {
  const [st, save] = useSavedIx<Saved>('IN5', ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const part = PARTS.find((p) => p.k === st.part);
  const cmdFb = st.cmd ? CMD_FB[st.cmd] : null;
  const sort = st.sort ?? {};
  const sy = st.sy ?? {};

  return (
    <section className="md c3 c5" aria-labelledby="iw-title">
      <header className="md-head">
        <p className="md-tag">命令句 · 工作坊</p>
        <h3 id="iw-title" className="md-title">
          一条吠陀命令：它说了什么，没有命令什么
        </h3>
        <p className="md-lede">先拆开一条有文献根据的命令句，看它的三个部分；再给夏巴拉的例句归类；然后看鹰祭这个难题：吠陀告诉人一个有效的手段，却没有命令人去做。最后看义务与后果。历史上的文句和现代的对照分开标出。</p>
      </header>

      <Band>一 · 命令的三个部分</Band>
      <div className="lw-grc ip-src">
        <p className="pe-src">夏巴拉《弥曼差经注》中多次出现的例句（这句吠陀文句的原始出处，本章没有核对）</p>
        <ul className="ix-words" aria-label="命令句的三个词">
          {PARTS.map((p) => (
            <li key={p.k}>
              <button type="button" className={'ix-word' + (st.part === p.k ? ' is-on' : '')} aria-pressed={st.part === p.k} lang="sa" onClick={() => set({ part: st.part === p.k ? null : p.k })}>
                {p.w}
                <small lang="zh">{p.role}</small>
              </button>
            </li>
          ))}
        </ul>
        <p className="pe-zh">本章试译："想要天界的人应当举行火祭"。</p>
      </div>
      {part ? (
        <p className="md-feedback" aria-live="polite">
          <b>{part.role}</b>：{part.zh}。{part.read} <Tag b="school" who="弥曼差派的理解，据本章的整理" />
        </p>
      ) : (
        <p className="md-muted">点一个词，看它在命令中的作用。</p>
      )}
      <p className="md-fb-k">这句话命令了什么？</p>
      <Seg name="iw-cmd" label="这句话命令了什么" col value={st.cmd} opts={CMDS} onPick={(v) => set({ cmd: v })} />
      {cmdFb && (
        <p className="md-feedback" aria-live="polite">
          <Verdict ok={cmdFb.ok} yes="符合弥曼差派的读法" no="不符合弥曼差派的读法" />
          {cmdFb.t}
        </p>
      )}
      <button type="button" className="md-disclose" aria-expanded={!!st.modern} onClick={() => set({ modern: !st.modern })}>
        {st.modern ? '收起现代的对照' : '现代的对照'}
      </button>
      {st.modern && (
        <Claim b="course" who="现代的标签，不是弥曼差派的术语">
          现代哲学会把"如果你想要天界，就应当这样做"叫作"假言命令"。这个标签帮助现代读者看出命令的条件结构，但弥曼差派自己的区分是"有愿望为条件的"和"每日必行的"义务；这一区分后来怎样发展，本章不展开。
        </Claim>
      )}

      <Band>二 · 吠陀里的句子都是命令吗？</Band>
      <Src
        src="夏巴拉《弥曼差经注》1.4.1"
        lang="sa"
        orig="kaścid asya bhāgo vidhiḥ, yo 'viditam arthaṃ vedayati, yathā - somena yajeteti. kaścid arthavādaḥ, yaḥ prarocayan vidhiṃ stauti, yathā - vāyur vai kṣepiṣṭhā devatā iti. kaścin mantraḥ, yo vihitam arthaṃ prayogakāle prakāśayati"
        zh="圣典的一部分是命令句，它让人知道原来不知道的事，例如“应当用苏摩祭祭祀”；一部分是释义句，它通过激发人的兴趣来赞美命令句，例如“风神确实是最迅速的神”；一部分是祭咒，它在举行祭祀时把已被规定的事表达出来。"
      />
      <p>把夏巴拉的两个例句归类：</p>
      {SENTS.map((s) => {
        const v = sort[s.k];
        return (
          <div key={s.k} className="c5-row">
            <p>
              <span lang="sa">
                <i>{s.orig}</i>
              </span>{' '}
              {s.zh}
            </p>
            <Seg name={'iw-sort-' + s.k} label={s.zh + '属于哪一类'} value={v ?? null} opts={KINDS} onPick={(x) => set({ sort: { ...sort, [s.k]: x } })} />
            {v && (
              <p className="md-feedback" aria-live="polite">
                <Verdict ok={v === s.ans} yes="与夏巴拉的分类一致" no="与夏巴拉的分类不一致" />
                {s.fb}
              </p>
            )}
          </div>
        );
      })}
      <p className="md-muted">
        祭咒在举行祭祀时提示所做之事，服务于行为；夏巴拉在这里举的祭咒例句，本章没有翻译。 <Tag b="text" who="夏巴拉 1.4.1" />
      </p>
      <Src
        src="《弥曼差经》1.2.7"
        lang="sa"
        orig="vidhinā tv ekavākyatvāt stutyarthena vidhīnāṃ syuḥ"
        zh="但是，由于它们与命令句构成同一个句子，它们以赞美为目的，［从属于］命令句。"
      />

      <Band>三 · 鹰祭：有效的手段，不是法</Band>
      <Src
        src="夏巴拉《弥曼差经注》1.1.2"
        lang="sa"
        orig="kathaṃ punar asāv anarthaḥ? hiṃsā hi sā, sā ca pratiṣiddhā. … yo hi hiṃsitum icchet, tasyāyam abhyupāya iti hi teṣām upadeśaḥ. śyenenābhicaran yajeteti hi samāmananti, nābhicaritavyam iti."
        zh="为什么它是有害的？因为它是伤害，而伤害是被禁止的。……对这类祭祀的教导是：“谁想要伤害，这就是他的手段。”因为圣典说的是“行咒害的人应当用鹰祭祭祀”，而不是“应当行咒害”。"
      />
      {SY.map((q) => {
        const v = sy[q.k];
        const right = q.k === 'means' ? 'yes' : 'no';
        return (
          <div key={q.k} className="c5-row">
            <p>
              <b>{q.q}</b>
            </p>
            <Seg
              name={'iw-sy-' + q.k}
              label={q.q}
              value={v ?? null}
              opts={[
                ['yes', q.k === 'dharma' ? '是' : '有'],
                ['no', q.k === 'dharma' ? '不是' : '没有'],
              ]}
              onPick={(x) => set({ sy: { ...sy, [q.k]: x } })}
            />
            {v && (
              <p className="md-feedback" aria-live="polite">
                <Verdict ok={v === right} yes="与夏巴拉一致" no="与夏巴拉不一致" />
                {q.a}。{q.note} <Tag b="course" who="本章的整理" />
              </p>
            )}
          </div>
        );
      })}

      <Band>四 · 义务与后果</Band>
      <p className="md-fb-k">为什么应当举行火祭？</p>
      <Seg name="iw-why" label="为什么应当举行火祭" col value={st.why} opts={WHYS} onPick={(v) => set({ why: v })} />
      {st.why && (
        <div aria-live="polite">
          <p className="md-feedback">
            <Verdict ok={st.why === 'only'} yes="弥曼差派的复杂之处" no="一种后果主义的读法" />
            {st.why === 'only'
              ? '后果（天界、来世的果报）只能从命令句本身知道；"应当做什么"的知识并不建立在独立的后果计算之上。'
              : '这是现代读者最自然的读法，但弥曼差派不这样说：我们不是先知道了"火祭会带来天界"，再推出"应当举行火祭"。'}
          </p>
          <Src
            src="夏利卡那他《句义之母》自注"
            lang="sa"
            orig="kāryasyāpūrvātmano 'nuṣṭhānaṃ vinā kāryatvānupapatteḥ"
            zh="因为以“新得力”为本质的应做之事，如果不被实行，就不成其为应做之事。"
          />
          <Claim b="scholar" who="SEP《鸠摩利罗》">"新得力"（apūrva）连接祭祀和遥远的果报；早期的弥曼差派并不以解脱为目标，关心的是祭祀行为本身的结构。</Claim>
          <Claim b="course" who="现代的范畴">现代"后果主义"与"义务论"的二分，不能直接套用在弥曼差派身上。</Claim>
        </div>
      )}

      <Limits>
        <p>这不是一个吠陀语法分析器。"agnihotraṃ juhuyāt svargakāmaḥ"是夏巴拉注中引用的例句，它在吠陀中的原始出处本章没有核对；三个部分的划分和鹰祭的三个问题，是本章根据夏巴拉的整理。</p>
        <p>"假言命令"、"后果主义"、"义务论"都是现代的标签，在这里只作对照，单独标出。</p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
