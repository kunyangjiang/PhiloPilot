import { Band, Claim, Limits, Seg, Src, Tag, useSavedIn } from './shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import '../cn5/cn5.css';
import '../cn7/cn7.css';
import './ip.css';

// 二 · after the four readings (the paragraph 四种读法不一定互相排斥).
// Not a chain machine and not a predictor: it lays the early texts side by side,
// lets the reader see what each one leaves out, and looks at them through the
// chapter's four readings. Everything comes from 二、缘起 and notes 7–19.

const ID = 'do-explorer';

type L = 'avijja' | 'sankhara' | 'vinnana' | 'namarupa' | 'salayatana' | 'phassa' | 'vedana' | 'tanha' | 'upadana' | 'bhava' | 'jati' | 'jaramarana';
const LINK: Record<L, { pi: string; zh: string; t: string; disputed?: boolean }> = {
  avijja: { pi: 'avijjā', zh: '无明', t: '对四谛等真实情况的不知' },
  sankhara: { pi: 'saṅkhārā', zh: '行', t: '有意图的造作，身、语、意的行为倾向', disputed: true },
  vinnana: { pi: 'viññāṇa', zh: '识', t: '认识、意识', disputed: true },
  namarupa: { pi: 'nāmarūpa', zh: '名色', t: '心理的方面与物质的方面，构成一个有情的"名"与"色"', disputed: true },
  salayatana: { pi: 'saḷāyatana', zh: '六处', t: '眼、耳、鼻、舌、身、意六种感官' },
  phassa: { pi: 'phassa', zh: '触', t: '感官、对象和识的相遇' },
  vedana: { pi: 'vedanā', zh: '受', t: '乐、苦、不苦不乐的感受' },
  tanha: { pi: 'taṇhā', zh: '爱', t: '渴爱' },
  upadana: { pi: 'upādāna', zh: '取', t: '执取' },
  bhava: { pi: 'bhava', zh: '有', t: '存在、成为', disputed: true },
  jati: { pi: 'jāti', zh: '生', t: '出生' },
  jaramarana: { pi: 'jarāmaraṇa', zh: '老死', t: '衰老和死亡，以及随之而来的种种苦' },
};
const TWELVE: L[] = ['avijja', 'sankhara', 'vinnana', 'namarupa', 'salayatana', 'phassa', 'vedana', 'tanha', 'upadana', 'bhava', 'jati', 'jaramarana'];
const FROM_NAMARUPA_NO_SIX: L[] = ['phassa', 'vedana', 'tanha', 'upadana', 'bhava', 'jati', 'jaramarana'];

type Text = 'sn12_1' | 'dn15' | 'sn12_65' | 'ak';
interface Lane {
  label: string;
  n: string;
  // the links in order; `loop` marks 识 ⇄ 名色
  seq: L[];
  loop?: boolean;
  periods?: [string, L[]][];
  basis: 'text' | 'school';
  note: string;
}
const LANES: Record<Text, Lane> = {
  sn12_1: { label: '《相应部》12.1', n: '十二支', seq: TWELVE, basis: 'text', note: '最常见的排列。经文先说生起（"这一整团苦的生起"），再反过来说止息：无明彻底离贪而止息，行就止息……' },
  dn15: { label: '《长部》15《大因缘经》', n: '九支', seq: ['vinnana', 'namarupa', ...FROM_NAMARUPA_NO_SIX], loop: true, basis: 'text', note: '从老死往回追问，一直追到"名色以识为条件"，然后又说"识以名色为条件"。佛陀说：这缘起是深奥的，看起来也是深奥的。' },
  sn12_65: { label: '《相应部》12.65', n: '十支', seq: ['vinnana', 'namarupa', 'salayatana', ...FROM_NAMARUPA_NO_SIX], loop: true, basis: 'text', note: '佛陀成道前的思考：从老死往回追到识，发现"这识从名色转回来，不再往更远处去"。' },
  ak: {
    label: '《俱舍论》3.20',
    n: '十二支，分三段',
    seq: TWELVE,
    periods: [
      ['前际（过去世）', ['avijja', 'sankhara']],
      ['中间（现在世）', ['vinnana', 'namarupa', 'salayatana', 'phassa', 'vedana', 'tanha', 'upadana', 'bhava']],
      ['后际（未来世）', ['jati', 'jaramarana']],
    ],
    basis: 'school',
    note: '说一切有部（经世亲整理）的系统解释。这是论书的系统化，不是早期经典本身唯一的说法。',
  },
};
const TEXTS: [Text, string][] = [
  ['sn12_1', '《相应部》12.1'],
  ['dn15', '《长部》15'],
  ['sn12_65', '《相应部》12.65'],
  ['ak', '《俱舍论》3.20'],
];

type Read = 'causal' | 'expl' | 'exp' | 'prac';
const READS: Record<Read, { name: string; as: string; support: string; diff: string }> = {
  causal: { name: '因果的读法', as: '前一支在时间上产生后一支，十二支跨越过去、现在、未来三世', support: '《俱舍论》3.20 把十二支分为三段：过去两支、未来两支、现在八支', diff: '早期经典中的识与名色互相依靠（《相应部》12.65、12.67），不像单向的时间顺序' },
  expl: { name: '解释的读法', as: '后一支要成立，必须预设前一支，是一种"依赖"关系，不一定是时间上的产生', support: '公式本身（此有则彼有）没有说时间；《大因缘经》以"如果没有……"的追问来展开', diff: '经文中确实有"生"、"再生"这些时间性的词' },
  exp: { name: '经验的读法', as: '描述每一刻经验是怎样形成的：触生受，受生爱，爱生取', support: '六处、触、受、爱这一段很容易在当下的经验中观察到', diff: '难以解释"生"和"老死"两支' },
  prac: { name: '实践的读法', as: '它的重点是指出在哪里可以切断苦的生起，尤其是"受"与"爱"之间', support: '每一篇缘起经都有"止息"的一半；四圣谛把它和道联系起来', diff: '只说明了它的用途，没有说明它所描述的关系本身是什么' },
};
const READ_OPTS: [Read, string][] = (Object.keys(READS) as Read[]).map((k) => [k, READS[k].name]);
const EXP_SPAN: L[] = ['salayatana', 'phassa', 'vedana', 'tanha', 'upadana'];

const MISSING: L[] = ['avijja', 'sankhara', 'salayatana'];

interface Saved {
  text: Text;
  link: L | null;
  read: Read | null;
  miss: L[];
  checked: boolean;
}
const INIT: Saved = { text: 'sn12_1', link: null, read: null, miss: [], checked: false };

export default function DOExplorer() {
  const [st, save] = useSavedIn<Saved>('IN2', ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const lane = LANES[st.text] ?? LANES.sn12_1;
  const link = st.link ? LINK[st.link] : null;
  const inLane = st.link ? lane.seq.includes(st.link) : false;
  const miss = st.miss ?? [];
  const missOk = st.checked && MISSING.every((m) => miss.includes(m)) && miss.length === MISSING.length;

  const mark = (l: L) => (st.read === 'exp' && EXP_SPAN.includes(l)) || (st.read === 'prac' && (l === 'vedana' || l === 'tanha'));

  const chip = (l: L) => (
    <button type="button" className={'ip-chip' + (st.link === l ? ' is-on' : '') + (mark(l) ? ' is-mark' : '')} aria-pressed={st.link === l} onClick={() => set({ link: st.link === l ? null : l })}>
      {LINK[l].zh}
      <small lang="pi">{LINK[l].pi}</small>
    </button>
  );
  const arrow = (from: L, to: L) => {
    const loop = lane.loop && from === 'vinnana' && to === 'namarupa';
    const cut = st.read === 'prac' && from === 'vedana' && to === 'tanha';
    return (
      <span className={'ip-arrow' + (loop || cut ? ' is-loop' : '')} aria-label={loop ? '互相依靠' : cut ? '实践的读法强调在这里切断' : '以前者为条件'}>
        {loop ? '⇄' : cut ? '→ ✂' : '→'}
      </span>
    );
  };

  return (
    <section className="md c3 c5" aria-labelledby="do-title">
      <header className="md-head">
        <p className="md-tag">缘起 · 几种排列与四种读法</p>
        <h3 id="do-title" className="md-title">
          缘起：一种条件分析的方法，不止一条链子
        </h3>
        <p className="md-lede">把早期经典中的三种排列和《俱舍论》的三世解释放在一起看：哪些环节在，哪些不在，哪里出现了回环。然后换用本课整理的四种读法，看同一组环节会被理解成什么关系。这不是一台推演机器，也不预测任何事情。</p>
      </header>

      <Src src="《中部》38" lang="pi" orig="imasmiṁ sati idaṁ hoti, imassuppādā idaṁ uppajjati" zh="此有，则彼有；此生，则彼生。" />

      <Band>一 · 几种排列</Band>
      <Seg name="do-text" label="选择一段文本" value={st.text} opts={TEXTS} onPick={(v) => set({ text: v })} />
      <div className="ip-lane">
        <p className="ip-lane-h">
          {lane.label}
          <span className="md-muted">{lane.n}</span>
          <Tag b={lane.basis} />
        </p>
        {lane.periods ? (
          <div className="ip-seq" role="list">
            {lane.periods.map(([k, ls]) => (
              <div key={k} className="ip-period" role="listitem">
                <p className="ip-period-k">{k}</p>
                {ls.map((l) => (
                  <span key={l}>{chip(l)}</span>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <ol className="ip-seq">
            {lane.seq.map((l, i) => (
              <li key={l}>
                {i > 0 && arrow(lane.seq[i - 1], l)}
                {chip(l)}
              </li>
            ))}
          </ol>
        )}
        <p className="md-muted">{lane.note}</p>
      </div>
      {st.text === 'sn12_65' && <Src src="《相应部》12.65" lang="pi" orig="paccudāvattati kho idaṁ viññāṇaṁ nāmarūpamhā na paraṁ gacchati." zh="这识从名色转回来，不再往更远处去。" />}
      {st.text === 'dn15' && <Src src="《长部》15" lang="pi" orig="Gambhīro cāyaṁ, ānanda, paṭiccasamuppādo gambhīrāvabhāso ca." zh="阿难，这缘起是深奥的，看起来也是深奥的。" />}
      {st.text === 'ak' && <Src src="《俱舍论》3.20" lang="sa" orig="sa pratītyasamutpādo dvādaśāṅgastrikāṇḍakaḥ / pūrvāparāntayordve dve madhye 'ṣṭau paripūriṇaḥ //" zh="这缘起有十二支，分为三段：前际和后际各两支，中间八支，（这是对）完整的（有情而说的）。" />}
      {lane.loop && (
        <>
          <Src src="《相应部》12.67，舍利弗" lang="pi" orig="Seyyathāpi, āvuso, dve naḷakalāpiyo aññamaññaṁ nissāya tiṭṭheyyuṁ." zh="朋友，就好像两捆芦苇，互相依靠而立。" />
          <p className="md-muted">拉开其中一捆，另一捆就会倒。"以识为条件有名色，以名色为条件有识"说的是两样东西互为条件，不是用结论证明结论的循环论证。</p>
        </>
      )}
      {link && (
        <div className="c5-row" aria-live="polite">
          <p>
            <b>
              {link.zh}（<span lang="pi">{link.pi}</span>）
            </b>
            ：{link.t} <Tag b="course" who="本章的简单说明" />
          </p>
          {link.disputed && <p className="md-muted">后来的论书和现代学者对这一支的确切含义有不同的解释。</p>}
          {!inLane && <p className="md-muted">这一支不在{lane.label}的排列中。</p>}
          {st.link === 'vinnana' && <Claim b="text" who="《中部》38">嗏帝比丘以为"就是这个识，在轮回中流转"，佛陀批评他：识是缘起而生的，离开条件，识就不会生起。识不能用来代替被否定的"自我"。</Claim>}
        </div>
      )}

      <Band>二 · 少了哪几支？</Band>
      <p className="md-fb-k">和《相应部》12.1 的十二支相比，《长部》15 的排列中没有哪几支？（可多选）</p>
      <ul className="ip-chips" aria-label="选择缺少的环节">
        {TWELVE.map((l) => {
          const on = miss.includes(l);
          return (
            <li key={l}>
              <button
                type="button"
                className={'ip-chip' + (on ? ' is-on' : '')}
                aria-pressed={on}
                onClick={() => set({ miss: on ? miss.filter((x) => x !== l) : [...miss, l], checked: false })}
              >
                {LINK[l].zh}
              </button>
            </li>
          );
        })}
      </ul>
      <button type="button" className="md-disclose" disabled={miss.length === 0} onClick={() => set({ checked: true })}>
        核对
      </button>
      {st.checked && (
        <p className="md-feedback" aria-live="polite">
          <span className={'c5-verdict ' + (missOk ? 'c5-verdict--ok' : 'c5-verdict--no')}>{missOk ? '和经文一致' : '再看一看'}</span>
          《长部》15 没有"无明"和"行"，也没有"六处"。《相应部》12.65 也没有无明和行，但有六处。本课不认为这些说法彼此矛盾，也不认为可以从中挑出一个"最早、最正确"的版本：不同的经文根据不同的问题，选取不同的环节。
        </p>
      )}

      <Band>三 · 四种读法</Band>
      <p className="md-muted">
        这张表是本课为了比较而整理的，不是历史上某一位作者提出的分类。<Tag b="course" />
      </p>
      <Seg name="do-read" label="选择一种读法" value={st.read} opts={READ_OPTS} onPick={(v) => set({ read: v })} />
      {st.read ? (
        <div className="c5-row" aria-live="polite">
          <p>
            <b>{READS[st.read].name}</b>：{READS[st.read].as}
          </p>
          <p>支持的材料：{READS[st.read].support}</p>
          <p>遇到的困难：{READS[st.read].diff}</p>
          {st.read === 'causal' && (
            <p className="md-muted">
              切换到"《俱舍论》3.20"，看三段的划分。上座部的觉音在《清净道论》中也有一种三世的解释，本课没有核对原文。
              {st.text !== 'ak' && (
                <>
                  {' '}
                  <button type="button" className="md-disclose" onClick={() => set({ text: 'ak' })}>
                    切换到《俱舍论》3.20
                  </button>
                </>
              )}
            </p>
          )}
          {st.read === 'exp' && <p className="md-muted">上面的排列中，六处到取这一段已加外框标出。</p>}
          {st.read === 'prac' && <p className="md-muted">上面的排列中，受和爱已加外框标出，两者之间标了"✂"。这只表示这种读法把重点放在这里，不表示别的环节不能"止息"。</p>}
        </div>
      ) : (
        <p className="md-muted">选一种读法，看它怎样理解同一组环节。</p>
      )}
      <p className="md-muted">四种读法不一定互相排斥。本课的判断是：早期经典中的缘起同时具有解释的、经验的和实践的意义；三世两重因果的读法是后来为了说明轮回而作的系统化。读者可以不同意。</p>

      <Limits>
        <p>这里的箭头只表示"以前者为条件"，不表示机械的推动，也不能用来预测什么。经文说的是一种关系："此有，则彼有"，没有说"此"和"彼"是什么，也没有说时间。</p>
        <p>每一支的"大致意思"是本课的简单说明；三种排列都取自本章读过的经文，《俱舍论》的三段是说一切有部的系统化，标为"论书或注释传统的整理"。</p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
