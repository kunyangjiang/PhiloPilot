import { Band, Claim, Limits, Seg, Src, Tag, useSavedIx, Verdict } from '../in4/shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import '../cn5/cn5.css';
import '../cn7/cn7.css';
import '../in2/ip.css';
import '../in4/in4.css';
import '../in6/in6.css';
import './in7.css';

// 三 · after the Descartes comparison (想一想（四） is the next block).
// 1. Sort everyday mental items into puruṣa, buddhi, ahaṃkāra, manas or the
//    senses, as the Sāṃkhyakārikā sorts them; each answer explains why.
// 2. "I am thinking", taken apart (想一想（三）).
// 3. Descartes and Sāṃkhya draw the line in different places.
// 4. Objections: Śaṅkara on the milk, Śāntarakṣita's dilemma, the later
//    reflection theory, and whether puruṣa is strictly unchanging.
// The sorting states what the school claims, not an empirical account of the
// mind; nothing here treats any modern finding as evidence for or against
// puruṣa. Quotations and translations are the chapter's own (三、五, notes 36–47, 75–79).

const ID = 'purusa-workshop';

type Bin = 'buddhi' | 'ahamkara' | 'manas' | 'indriya' | 'purusa';
const BIN: [Bin, string][] = [
  ['buddhi', '大（觉）'],
  ['ahamkara', '我慢'],
  ['manas', '意'],
  ['indriya', '知根或作根'],
  ['purusa', '神我'],
];
const BIN_NAME = Object.fromEntries(BIN) as Record<Bin, string>;
const MIND: Bin[] = ['buddhi', 'ahamkara', 'manas'];

const ITEMS: { k: string; t: string; ok: Bin[]; fb: string }[] = [
  { k: 'decide', t: '作出一个决定', ok: ['buddhi'], fb: '第 23 颂：大（觉）的特征是作决定（adhyavasāya）。它属于原质，本身没有意识。' },
  { k: 'mine', t: '"这是我的"：占有感、自尊', ok: ['ahamkara'], fb: '第 24 颂：我慢就是"认作是我的"。数论中与"心理上的我"最接近的是我慢，不是神我。' },
  { k: 'witness', t: '那个"看见"思考的', ok: ['purusa'], fb: '第 19 颂：神我是见证者、观看者，而且不是行为者。它不思考，只是"看"。' },
  { k: 'eye', t: '眼、耳等感知的能力', ok: ['indriya'], fb: '第 26 颂：眼、耳、鼻、舌、皮是五知根。感官也属于原质，本身不"知道"什么。' },
  { k: 'both', t: '兼属知根和作根两组的那一项', ok: ['manas'], fb: '十一根中的"意"兼属两组（第 26、27 颂）。' },
  { k: 'speak', t: '说话、行走', ok: ['indriya'], fb: '言语、手、足等是五作根（第 26 颂）。' },
  { k: 'doubt', t: '怀疑（笛卡尔所说的"我在怀疑"）', ok: MIND, fb: '笛卡尔把怀疑放在心灵一边；数论却把思维活动放在原质一边（"大"、我慢、意）。本章的表没有把怀疑归入某一项，所以三项都算对；重要的是它不在神我一边。' },
  { k: 'suffer', t: '受苦、轮回', ok: ['buddhi', 'ahamkara', 'manas', 'indriya'], fb: '第 62 颂：实际上没有谁被束缚，也没有谁在轮回；在轮回的是依托于种种身体的原质，具体地说，是细身（从"大"到五唯）。唯一错误的选择是神我。' },
  { k: 'know', t: '解脱时生起的认识："我不存在，没有什么是我的，我不是这个"', ok: ['buddhi'], fb: '"认识"本身是"大"的活动；这个认识仍然是原质的一个状态，是原质对这个神我的最后一个状态（第 64—66 颂）。说出这句话的不可能是神我。' },
];

const DESC: { q: string; d: string; s: string }[] = [
  { q: '两种实在', d: '思维的东西（心灵）和广延的东西（物体）', s: '神我（意识）和原质（包括物质和心智）' },
  { q: '思考、怀疑、意愿、想象属于哪一边', d: '心灵', s: '原质（"大"、我慢、意）' },
  { q: '意识属于哪一边', d: '心灵', s: '神我' },
  { q: '心灵（神我）做什么', d: '思考，也能推动身体', s: '什么也不做，只是"看"' },
  { q: '主要的困难', d: '一个不占空间的心灵怎样推动物体？', s: '一个什么也不做的神我怎样"看"？没有意识的心智怎样"好像有意识"？' },
];

type Obj = 'milk' | 'dilemma' | 'change';

interface Saved {
  ans: Record<string, Bin>;
  side: 'd' | 's' | null;
  obj: Obj;
  reply: Partial<Record<Obj, boolean>>;
}
const INIT: Saved = { ans: {}, side: null, obj: 'milk', reply: {} };

export default function PurusaWorkshop() {
  const [st, save] = useSavedIx<Saved>('IN7', ID, INIT);
  const set = (x: Partial<Saved>) => save({ ...st, ...x });
  const ans = st.ans ?? {};
  const reply = st.reply ?? {};
  const obj: Obj = st.obj === 'dilemma' || st.obj === 'change' ? st.obj : 'milk';
  const sorted = (b: Bin) => ITEMS.filter((it) => ans[it.k] === b);

  return (
    <section className="md c3 c5" aria-labelledby="pw-title">
      <header className="md-head">
        <p className="md-tag">神我与心智 · 工作坊</p>
        <h3 id="pw-title" className="md-title">
          "我在思考"：是谁在思考？
        </h3>
        <p className="md-lede">按《数论颂》的划分，把日常所说的"心理活动"一项一项归位；然后与笛卡尔的划界比较，再看数论受到的几种批评。这里的分类是数论的主张，不是关于意识的经验描述。</p>
      </header>

      <Band>一 · 归位：每一项属于哪一谛？</Band>
      {ITEMS.map((it) => {
        const a = ans[it.k];
        return (
          <div key={it.k} className="c5-row">
            <p>
              <b>{it.t}</b>
            </p>
            <Seg name={'pw-' + it.k} label={it.t} value={a ?? null} opts={BIN} onPick={(v) => set({ ans: { ...ans, [it.k]: v } })} />
            {a && (
              <p className="md-feedback" aria-live="polite">
                <Verdict ok={it.ok.includes(a)} yes="符合《数论颂》的划分" no={it.ok.length === 1 ? `按《数论颂》属于"${BIN_NAME[it.ok[0]]}"` : '按《数论颂》属于原质一边'} />
                {it.fb}
              </p>
            )}
          </div>
        );
      })}
      <div className="i7-bins" aria-live="polite">
        {BIN.map(([b, t]) => (
          <div key={b} className={'i7-bin' + (b === 'purusa' ? ' is-purusa' : '')}>
            <b>{t}</b>
            {b === 'purusa' ? '神我一边' : '原质一边'}
            {sorted(b).length > 0 && (
              <ul>
                {sorted(b).map((it) => (
                  <li key={it.k}>{it.t}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <Src
        src="《数论颂》第 20 颂"
        lang="sa"
        orig="tasmāt tatsaṃyogād acetanaṃ cetanāvad iva liṅgam / guṇakartṛtve ca tathā karteva bhavaty udāsīnaḥ"
        zh="因此，由于与它结合，没有意识的细身好像有意识一样；同样，虽然行为者是三德，那个漠然旁观的［神我］却好像是行为者。"
      />
      <Claim b="course" who="本章的整理">
        "我在思考"：思考是"大"的活动；"我"的感觉是我慢；那个"看见"思考的是神我。我们日常所说的"我"，就是心智"好像有意识"和神我"好像是行为者"这两种"显得"叠在一起的产物。
      </Claim>

      <Band>二 · 与笛卡尔比较：界线划在哪里？</Band>
      <Seg
        name="pw-side"
        label="选择一方"
        value={st.side}
        opts={[
          ['d', '笛卡尔（教科书的概括）'],
          ['s', '《数论颂》'],
        ]}
        onPick={(v) => set({ side: v })}
      />
      {st.side && (
        <table className="ip-sort" aria-live="polite">
          <caption className="visually-hidden">{st.side === 'd' ? '笛卡尔' : '《数论颂》'}</caption>
          <tbody>
            {DESC.map((r) => (
              <tr key={r.q}>
                <th scope="row">{r.q}</th>
                <td>{st.side === 'd' ? r.d : r.s}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p className="md-muted">
        最重要的区别在第二行：两种二元论把"心"和"物"的界线划在了不同的地方。笛卡尔一方是一般教科书的概括，本章没有引用笛卡尔的原文。 <Tag b="course" />
      </p>

      <Band>三 · 批评</Band>
      <Seg
        name="pw-obj"
        label="选择一种批评"
        value={obj}
        opts={[
          ['milk', '商羯罗：乳汁的例子'],
          ['dilemma', '寂护：享受者的两难'],
          ['change', '神我真的完全不变吗？'],
        ]}
        onPick={(v) => set({ obj: v })}
      />
      {obj === 'milk' && (
        <div aria-live="polite">
          <Src
            src="《数论颂》第 57 颂"
            lang="sa"
            orig="vatsavivṛddhinimittaṃ kṣīrasya yathā pravṛttir ajñasya / puruṣavimokṣanimittaṃ tathā pravṛttiḥ pradhānasya"
            zh="正如没有知觉的乳汁，为了小牛的成长而流出；根本因也是这样，为了神我的解脱而活动。"
          />
          <Src
            src="商羯罗《梵经注》2.2.3（已对照 1904 年印本）"
            lang="sa"
            orig="cetanāyāś ca dhenvāḥ snehecchayā payasaḥ pravartakatvopapatteḥ / vatsacoṣaṇena ca payasa ākṛṣyamāṇatvāt"
            zh="因为是有意识的母牛出于爱的欲求，使乳汁流出；也因为乳汁是被小牛的吮吸吸引出来的。"
          />
          <p>
            数论的例子本身就包含了有意识的推动者，所以不能用来证明没有意识的东西能自己有目的地活动。 <Tag b="text" who="有文献的直接批评" />
          </p>
        </div>
      )}
      {obj === 'dilemma' && (
        <div aria-live="polite">
          <p>
            如果意识是唯一的、始终不变的，它怎样能成为种种不同的经验的享受者？如果神我在享受时没有任何变化，它怎能算是享受者？如果有变化，它就不是恒常的。 <Tag b="text" who="寂护《真理纲要》第 285—295 颂，本章转述" />
          </p>
          <p className="md-muted">本章所用的《真理纲要》电子本是逐词分析本，没有连写的颂文，所以只转述，不引原文。</p>
        </div>
      )}
      {obj === 'change' && (
        <div aria-live="polite">
          <Claim b="scholar" who="IEP《数论》（Ruzsa）">
            第 10 颂也用"没有活动"形容根本原质，而根本原质显然会转变；所以"没有活动"也许只是说不能在空间中移动。神我会"受苦"（第 55 颂），会"看见"，这似乎都要求它在某种意义上随时间而不同。条目作者认为，把神我理解为绝对不变，可能是后来在吠檀多的影响下形成的；许多现代学者把神我理解为严格不变的。
          </Claim>
        </div>
      )}
      <button type="button" className="md-disclose" aria-expanded={!!reply[obj]} onClick={() => set({ reply: { ...reply, [obj]: !reply[obj] } })}>
        {reply[obj] ? '收起数论一方的回答' : '数论一方可以怎样回答？'}
      </button>
      {reply[obj] && (
        <div aria-live="polite">
          {obj === 'milk' && (
            <Claim b="course" who="本章的重建">
              乳汁的例子要说明的，不是"没有任何意识参与"，而是"推动者不必是一个作出计划的行为者"：神我不作计划、不下命令，它只是在场。商羯罗预见了这个回答：神我永远在场，原质就会永远活动。数论要依赖第 66 颂回答：原质一旦"被看见了"，就对那个神我停止活动。这个回答是否足够，留给读者判断。
            </Claim>
          )}
          {obj === 'dilemma' && (
            <Claim b="course" who="想一想（六）的提示">
              区分"神我本身发生了变化"和"神我所看见的内容发生了变化"。后来的"映像"说（据 IEP，婆者斯钵底和识比丘）：镜子中的像变了，镜子本身不变。但心智怎样"接收"一个不发出任何作用的东西的映像，仍然没有说清；而且这样形成的数论，已经相当接近不二论的"附加"说。
            </Claim>
          )}
          {obj === 'change' && <Claim b="course">本章在正文中采用通行的理解（神我不变），同时请读者记住，这一理解本身有争议。这个争论与寂护的两难直接相关：神我究竟是绝对不变的，还是在某种意义上会随经验而不同？</Claim>}
        </div>
      )}

      <Limits>
        <p>
          <b>这是一个学派的分类，不是一份意识的经验研究。</b>"作决定属于大"、"看属于神我"是《数论颂》的主张。现代的心理学或冥想研究，也许可以研究注意力和情绪的变化，但不能直接回答"有没有一个不变的神我"；这个组件不把任何现代发现当作神我存在或不存在的证据。
        </p>
        <p>各项的归位依据本章的表和第 19—27、62—66 颂；"怀疑"一项本章没有归入单独一谛。笛卡尔一方是教科书的概括。</p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
