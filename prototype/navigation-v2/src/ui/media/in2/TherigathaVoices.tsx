import { Band, Claim, Limits, Seg, Src, Tag, useSavedIn } from './shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import '../cn5/cn5.css';
import '../cn7/cn7.css';
import './ip.css';

// 七 · after the table 怎样读才不编造立场. Each voice is read in four layers kept
// apart: the verse itself, the attribution (and other canonical mentions), later
// biography, and modern / course interpretation. The later commentarial life
// stories were not read for this course, so they are named but never retold.
// Everything comes from 七、早期女性的声音, 三、瓦吉拉的车喻 and notes 66–80.

const ID = 'therigatha-voices';

type V = 'soma' | 'khema' | 'pajapati' | 'mutta' | 'patacara' | 'vajira';
interface Voice {
  name: string;
  pi: string;
  verse: { src: string; orig: string; zh: string }[];
  said: string;
  attr: string[];
  later: string;
  modern: string[];
}
const VOICES: Record<V, Voice> = {
  soma: {
    name: '苏摩',
    pi: 'Somā',
    verse: [
      { src: '《长老尼偈》3.8，魔罗', orig: '“Yaṁ taṁ isīhi pattabbaṁ, ṭhānaṁ durabhisambhavaṁ; Na taṁ dvaṅgulapaññāya, sakkā pappotumitthiyā”.', zh: '"那是仙人们才能到达的地方，很难达到；一个只有两指智慧的女人，到不了那里。"' },
      { src: '《长老尼偈》3.8，苏摩', orig: '“Itthibhāvo no kiṁ kayirā, cittamhi susamāhite; Ñāṇamhi vattamānamhi, sammā dhammaṁ vipassato.', zh: '"当心已经安定，智慧已经现前，正确地观察法的时候，身为女人，对我们又有什么妨碍呢？"' },
    ],
    said: '心安定、智慧现前时，女性身份没有妨碍。',
    attr: ['《长老尼偈》第三集第八首署名苏摩。', '《相应部》5.2 也记载了这段对话，措辞略有不同，而且多了一首偈：执着于"我是女人"或"我是男人"的人，魔罗才可以对他说这样的话。'],
    later: '后来的注释对"两指智慧"的来历有解释，本课没有核对，这里不复述。',
    modern: ['五步论证的结构是本课的重建，每一步都依据偈中的话。', '第 5 步（性别身份也是一种"我是……"）只见于《相应部》的版本，把苏摩的回答和无我学说联系起来。'],
  },
  khema: {
    name: '讖摩',
    pi: 'Khemā',
    verse: [
      { src: '《长老尼偈》6.3', orig: 'Sattisūlūpamā kāmā, khandhāsaṁ adhikuṭṭanā; Yaṁ ‘tvaṁ kāmaratiṁ’ brūsi, ‘aratī’ dāni sā mama.', zh: '欲乐就像刀和矛，诸蕴是它们的砧板；你所说的"欲乐之喜"，对我来说，现在是"不喜"。' },
      { src: '《长老尼偈》6.3', orig: 'Nakkhattāni namassantā, aggiṁ paricaraṁ vane; Yathābhuccamajānantā, bālā suddhimamaññatha.', zh: '礼拜星宿，在林中侍奉火，却不知道事物如实的样子，愚人们以为这样就能得到清净。' },
    ],
    said: '欲乐如刀矛；批评祭火与星宿崇拜，因为它们不带来如实知。',
    attr: ['《长老尼偈》第六集第三首署名讖摩。', '《增支部》第一集把讖摩列为比丘尼中"大智慧"第一。'],
    later: '注释中有她的生平故事。本课没有阅读这些故事，这里不复述。',
    modern: ['她批评的祭火和星宿崇拜，与前一章读到的吠陀祭祀传统的关系，是本课的推断。'],
  },
  pajapati: {
    name: '大爱道',
    pi: 'Mahāpajāpatī Gotamī',
    verse: [{ src: '《长老尼偈》6.6', orig: 'Sabbadukkhaṁ pariññātaṁ, Hetutaṇhā visositā; Bhāvito aṭṭhaṅgiko maggo, Nirodho phusito mayā.', zh: '一切苦已经彻底了知，作为原因的渴爱已经干涸，八支圣道已经修习，止息已经由我亲身触到。' }],
    said: '以第一人称陈述四谛的完成。',
    attr: ['《长老尼偈》第六集第六首署名大爱道；传统把这首诗归于她。', '律藏《小品》第十章讲述她请求女性出家、接受八敬法的故事；《增支部》第一集把她列为资历最久的比丘尼。这些是诗以外的经典记载，不是这首诗的内容。'],
    later: '律藏故事之外的生平细节，本课没有采用为依据。',
    modern: ['这一节与《转法轮经》"第三转"的对应，是本课的对照。', '律藏故事中"承认能力，但限制地位"的张力：有学者认为八敬法和五百年的预言是后来加进去的，也有学者认为故事整体反映了当时的顾虑。本课没有核对这方面的专门研究，不作判断。'],
  },
  mutta: {
    name: '慕达',
    pi: 'Muttā',
    verse: [{ src: '《长老尼偈》1.11', orig: '“Sumuttā sādhumuttāmhi, tīhi khujjehi muttiyā; Udukkhalena musalena, patinā khujjakena ca; Muttāmhi jātimaraṇā, bhavanetti samūhatā”ti.', zh: '"我解脱了，好好地解脱了，从三样弯曲的东西中解脱了：从臼，从杵，从我那驼背的丈夫。我从生和死中解脱了，引向再生的绳索已被拔除。"' }],
    said: '从臼、杵和驼背的丈夫中解脱，从生死中解脱。',
    attr: ['《长老尼偈》第一集第十一首署名慕达。名字的意思是"解脱了的"。'],
    later: '注释中有她的家庭背景。本课没有阅读，这里不复述。',
    modern: ['社会意义上的解脱与宗教意义上的解脱放在同一行诗里，是本课的读法。一首诗不能代表所有比丘尼的处境，也不能证明当时女性的一般状况。'],
  },
  patacara: {
    name: '帕塔查拉',
    pi: 'Paṭācārā',
    verse: [{ src: '《长老尼偈》5.10', orig: 'Tato sūciṁ gahetvāna, vaṭṭiṁ okassayāmahaṁ; Padīpasseva nibbānaṁ, vimokkho ahu cetaso”ti.', zh: '然后我拿起一根针，把灯芯拨下去；就像灯的熄灭（nibbāna），心得到了解脱。' }],
    said: '熄灭油灯时心得解脱。',
    attr: ['《长老尼偈》第五集第十首署名帕塔查拉。', '《增支部》第一集把她列为比丘尼中"持律"第一。'],
    later: '注释中有她的生平故事。本课没有阅读这些故事，这里不复述。',
    modern: ['nibbāna 的字面义"熄灭"与宗教义的连接；以及与《弥兰王问经》那盏燃了一整夜的灯的对照（那里说明相续，这里说明相续的止息）。这个对照是本课的，不是任何古代文本的说法。'],
  },
  vajira: {
    name: '瓦吉拉',
    pi: 'Vajirā',
    verse: [{ src: '《相应部》5.10（节选）', orig: 'Yathā hi aṅgasambhārā, hoti saddo ratho iti; Evaṁ khandhesu santesu, hoti sattoti sammuti.', zh: '就像各部分组合在一起，才有"车"这个说法；同样，有了诸蕴，才有"众生"这个约定的称呼。' }],
    said: '众生是依诸蕴而有的约定称呼，如车依部分。',
    attr: ['《相应部》第五相应（比丘尼相应）第十篇。情境是瓦吉拉独自禅修时回答魔罗，佛陀并不在场。'],
    later: '《弥兰王问经》引用了这首偈的前半，并说这是"当着世尊的面"说的；这与《相应部》的情境不同，本课无法判断原因。',
    modern: ['把这首偈看作车喻论证的早期来源，是本课的读法。'],
  },
};
const VOPTS: [V, string][] = (Object.keys(VOICES) as V[]).map((k) => [k, VOICES[k].name]);

// ── 2. sorting statements into layers ────────────────────────────────
type Layer = 'verse' | 'attr' | 'later' | 'modern' | 'cannot';
const LAYERS: [Layer, string][] = [
  ['verse', '诗或经文中直接说的'],
  ['attr', '署名与归属'],
  ['later', '后来的说法'],
  ['modern', '本课或现代的解读'],
  ['cannot', '从这些材料不能确定'],
];
const STMTS: { id: string; t: string; k: Layer; why: string }[] = [
  { id: 's1', t: '身为女人，对觉悟没有妨碍。', k: 'verse', why: '这是苏摩偈中直接说的。' },
  { id: 's2', t: '《长老尼偈》第三集第八首署名苏摩。', k: 'attr', why: '这是诗集给出的署名，说明传统把诗归于她。' },
  { id: 's3', t: '这首诗是苏摩本人写下的。', k: 'cannot', why: '署名不等于作者。诗经过了长期的口头传承和编集，有些偈句还在不同人物之间流动。' },
  { id: 's4', t: '苏摩的回答可以写成一个五步论证。', k: 'modern', why: '论证的结构是本课的重建，虽然每一步都依据偈中的话。' },
  { id: 's5', t: '瓦吉拉的偈是当着世尊的面说的。', k: 'later', why: '这是《弥兰王问经》的说法；《相应部》5.10 中佛陀并不在场。' },
  { id: 's6', t: '早期比丘尼都把婚姻看作一种束缚。', k: 'cannot', why: '不能把一首诗的说法推广为"早期比丘尼的观点"。慕达的诗只说了她自己。' },
  { id: 's7', t: '讖摩批评祭火和星宿崇拜，因为它们不带来如实知。', k: 'verse', why: '偈中说"不知道事物如实的样子"（yathābhuccamajānantā）。' },
  { id: 's8', t: '大爱道的这一节说出了《转法轮经》的"第三转"。', k: 'modern', why: '这是本课把两段文字对照后的读法；诗本身没有提到《转法轮经》。' },
  { id: 's9', t: '帕塔查拉出家前的经历。', k: 'later', why: '这类生平故事见于后来的注释，比诗晚得多，不能当作历史传记；本课没有阅读，也不复述。' },
];

// ── 3. shared verses ─────────────────────────────────────────────────
const SHARED: { v: string; zh: string; in: string[] }[] = [
  { v: 'A', zh: '欲乐就像刀和矛……', in: ['讖摩（6.3）', '莲花色（11.1）'] },
  { v: 'B', zh: '处处的欢喜都已摧毁，黑暗的聚集已被破除；魔罗，你要这样知道：死神，你已被击败。', in: ['讖摩（6.3 第四偈）', '苏摩（3.8 第三偈）', '莲花色（11.1）'] },
];

interface Saved {
  v: V;
  pick: Record<string, Layer | undefined>;
  checked: boolean;
  shared: 'weak' | 'not' | null;
}
const INIT: Saved = { v: 'soma', pick: {}, checked: false, shared: null };

export default function TherigathaVoices() {
  const [st, save] = useSavedIn<Saved>('IN2', ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const vo = VOICES[st.v] ?? VOICES.soma;
  const all = STMTS.every((s) => st.pick[s.id]);
  const right = STMTS.filter((s) => st.pick[s.id] === s.k).length;

  return (
    <section className="md c3 c5" aria-labelledby="tv-title">
      <header className="md-head">
        <p className="md-tag">《长老尼偈》· 声音与证据</p>
        <h3 id="tv-title" className="md-title">
          诗说了什么，署名说明什么，后来的故事又是什么
        </h3>
        <p className="md-lede">每一位长老尼的材料分四层来看：偈本身；署名和其他经典中的记载；后来的生平故事；本课或现代的解读。四层分开，才能只说诗中说了的话，不替她们编造立场。</p>
      </header>

      <Band>一 · 一位长老尼，四层材料</Band>
      <Seg name="tv-v" label="选择一位长老尼" value={st.v} opts={VOPTS} onPick={(v) => set({ v })} />
      <div className="c5-rows" aria-live="polite">
        <div className="c5-row">
          <p className="ip-col-k">
            一 · 偈 <Tag b="text" />
          </p>
          {vo.verse.map((x, i) => (
            <Src key={i} src={x.src} lang="pi" orig={x.orig} zh={x.zh} />
          ))}
          <p>
            <b>诗中直接说的：</b>
            {vo.said}
          </p>
        </div>
        <div className="c5-row">
          <p className="ip-col-k">
            二 · 署名与归属 <Tag b="text" />
          </p>
          {vo.attr.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
          <p className="md-muted">
            署名说明传统把这首诗归于{vo.name}（<span lang="pi">{vo.pi}</span>），不是一份可靠的作者记录。
          </p>
        </div>
        <div className="c5-row">
          <p className="ip-col-k">
            三 · 后来的说法 <Tag b="later" />
          </p>
          <p>{vo.later}</p>
        </div>
        <div className="c5-row">
          <p className="ip-col-k">
            四 · 本课或现代的解读 <Tag b="course" />
          </p>
          {vo.modern.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </div>
      </div>

      <Band>二 · 这句话属于哪一层？</Band>
      <table className="ip-sort">
        <thead>
          <tr>
            <th scope="col">说法</th>
            <th scope="col">属于</th>
          </tr>
        </thead>
        <tbody>
          {STMTS.map((s) => {
            const v = st.pick[s.id];
            return (
              <tr key={s.id}>
                <th scope="row" style={{ fontWeight: 400 }}>
                  {s.t}
                </th>
                <td>
                  <select aria-label={`${s.t} 属于哪一层`} value={v ?? ''} onChange={(e) => set({ pick: { ...st.pick, [s.id]: (e.target.value || undefined) as Layer | undefined }, checked: false })}>
                    <option value="">（选择）</option>
                    {LAYERS.map(([k, t]) => (
                      <option key={k} value={k}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {st.checked && v && (
                    <p aria-live="polite">
                      <span className={'c5-verdict ' + (v === s.k ? 'c5-verdict--ok' : 'c5-verdict--no')}>{v === s.k ? '一致' : `本课归为：${LAYERS.find((l) => l[0] === s.k)![1]}`}</span>
                      {s.why}
                    </p>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button type="button" className="md-disclose" disabled={!all} onClick={() => set({ checked: true })}>
        {all ? '核对' : '先为每一句选择一层'}
      </button>
      {st.checked && (
        <p className="md-feedback" aria-live="polite">
          {right} / {STMTS.length} 句和本课的分法一致。"不能确定"不是"错"：它说的是，这些材料不足以支持这个说法。
        </p>
      )}

      <Band>三 · 共享的偈句</Band>
      <div style={{ overflowX: 'auto' }}>
        <table className="ip-sort">
          <thead>
            <tr>
              <th scope="col">偈句（本课试译）</th>
              <th scope="col">出现在</th>
            </tr>
          </thead>
          <tbody>
            {SHARED.map((s) => (
              <tr key={s.v}>
                <td>{s.zh}</td>
                <td>{s.in.join('；')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="md-muted">
        讖摩和苏摩的那一偈，两处只有大小写和一个词尾的差异。表中只列本课核对过的共用。<Tag b="text" who="注 79、80" />
      </p>
      <p className="md-fb-k">共享的偈句是否削弱了《长老尼偈》作为女性声音的价值？</p>
      <Seg
        name="tv-shared"
        label="共享的偈句是否削弱了女性声音的价值"
        col
        value={st.shared}
        opts={[
          ['weak', '削弱了：如果偈句可以流动，就不能说是她们的声音'],
          ['not', '不一定：署名不可靠，但声音仍可能是比丘尼群体的'],
        ]}
        onPick={(v) => set({ shared: v })}
      />
      {st.shared && (
        <div aria-live="polite">
          <Claim b="course">本课从这些现象得出三点：有些偈句是可以在不同人物之间流动的"程式"；每一首诗的署名，应当理解为传统把它归于某一位长老尼；但这并不意味着这些诗不是女性的声音，程式化的偈句可能本来就在比丘尼的群体中流传和使用。</Claim>
          <p className="md-feedback">{st.shared === 'weak' ? '你的判断把"作者"和"声音"放在了一起。可以再想一想：一首诗的作者和一首诗的声音是不是同一回事？' : '这和本课的读法接近。但要注意，"可能本来就在比丘尼群体中流传"也是一个推断，诗集本身没有说。'}</p>
        </div>
      )}

      <Limits>
        <p>这里只用本课第七部分（和第三部分瓦吉拉的偈）读过的诗句。后来的注释（传统上归于法护）为每一首诗配了生平故事；这些故事比诗晚得多，本课没有阅读，所以只说明它们存在，不复述内容。</p>
        <p>诗集是由主要由男性主持的僧团保存和编订的；我们读到的女性声音，是经过这个过程保存下来的声音。中文人名是常见的选择之一，并无定译，每个名字都附有巴利文原名。</p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
