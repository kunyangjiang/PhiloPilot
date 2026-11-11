import { Band, Claim, Limits, Pick, Verdict, useSavedIx } from '../jw1/shared';

// 六 · after the table "各类证据能证明什么" (content/AF1_SAMPLE_DRAFT.md).
// Source criticism in two steps. First the reader sorts six items from the
// chapter into the chapter's five kinds of material; then, for the Ḥatäta, says
// which authorship position each piece of evidence supports and reads its limit;
// last, a view (no right answer): which new evidence would most change the picture.
// Every item and every limit restates the chapter's own text; nothing new is claimed.

const ID = 'source-weigh';

type K = 'written' | 'oral' | 'ethno' | 'recon' | 'contested';
const KS: readonly (readonly [K, string])[] = [
  ['written', '书面论证'],
  ['oral', '口头传统'],
  ['ethno', '民族志记录'],
  ['recon', '现代重建'],
  ['contested', '有争议的归属'],
];

const ITEMS: { id: string; text: string; k: K; why: string }[] = [
  {
    id: 'proverb',
    text: '"一个人是通过他人才成为人的"（umuntu ngumuntu ngabantu）作为一句在南部非洲流传的格言',
    k: 'oral',
    why: '它能直接证明的是这句话在某些语言群体中流传；它被写成文字、再被发展成伦理理论，是后来的几步。',
  },
  {
    id: 'griaule',
    text: '格里奥尔《水神》（1948）中记录的多贡人讲述者奥戈特美利的宇宙论',
    k: 'ethno',
    why: '它首先证明的是"格里奥尔这样记录了"；范贝克 1991 年的重新调查对其中的天狼星说法提出了质疑。',
  },
  {
    id: 'metz',
    text: '梅茨 2007 年提出的"促进以善意为基础的共享身份"的道德原则',
    k: 'recon',
    why: '这是一位当代哲学家从南部非洲的道德判断中构造出的理论；拉莫塞质疑的正是这种构造。',
  },
  {
    id: 'hountondji',
    text: '洪通基《论"非洲哲学"》（1976）对坦普尔斯的批评',
    k: 'written',
    why: '一位可以确认的作者，在一个可以确定的时间，提出了一个可以被反驳的论证。',
  },
  {
    id: 'hatata',
    text: '《探究》中作者自称生于 1600 年、在 1668 年写下这部作品',
    k: 'contested',
    why: '文本存在，但这些信息出自文本本身；文本是不是十七世纪的作品，正是争论的问题。',
  },
  {
    id: 'onipa',
    text: '阿肯人说一个自私、刻薄的人"他不是一个人"（onnye onipa）',
    k: 'oral',
    why: '这是一种语言中的日常说法；维雷杜和吉耶克从它出发，作出了不同的理论重建。',
  },
];

type P = 'giusto' | 'eth' | 'mixed' | 'none';
const PS: readonly (readonly [P, string])[] = [
  ['giusto', '朱斯托是作者'],
  ['eth', '十七世纪埃塞俄比亚作者'],
  ['mixed', '失传原本或混合作者'],
  ['none', '只要求谨慎，不支持任何一方'],
];

const EVIDENCE: { id: string; text: string; p: P; limit: string }[] = [
  {
    id: 'unici',
    text: '两份文本都是孤本，都经朱斯托之手寄到巴黎。',
    p: 'none',
    limit: '孤本本身不证明伪造：许多真实的文本也只有孤本。它只要求我们格外谨慎。',
  },
  {
    id: 'testimony',
    text: '一位埃塞俄比亚天主教皈依者指控朱斯托是真正的作者（据孔蒂·罗西尼转述）。',
    p: 'giusto',
    limit: '证词是孔蒂·罗西尼多年后转述的；论文集导论对这位证人的可靠性有所保留。',
  },
  {
    id: 'soirees',
    text: '《探究》与朱斯托参与翻译的《迦太基之夜》盖兹语译本之间有许多平行（米特沃赫 1934）。',
    p: 'giusto',
    limit: '平行可以有不同的解释：共同的来源、共同的抄写者，或者抄写者的改动。',
  },
  {
    id: 'genre',
    text: '第一人称的自传在埃塞俄比亚古典文献中极为罕见（维昂）。',
    p: 'giusto',
    limit: '罕见不等于不可能；一部例外的作品本来就会偏离规范。',
  },
  {
    id: 'language',
    text: '文本的盖兹语优雅而注重历史细节，骗过了几代欧洲和埃塞俄比亚学者——如果它是伪作的话。',
    p: 'eth',
    limit: '依赖专家的判断；一位有埃塞俄比亚合作者的作者，也可能做到。',
  },
  {
    id: 'errors',
    text: '抄本中的一系列抄写错误，显示抄写者不熟悉盖兹语（格塔丘·海莱）。',
    p: 'mixed',
    limit: '它指向一个早于朱斯托的原本，但这个原本今天看不到，只能重建。',
  },
];

type V = 'ms' | 'drafts' | 'philology';
const VS: readonly (readonly [V, string])[] = [
  ['ms', '一份独立的抄本'],
  ['drafts', '朱斯托的草稿或笔记'],
  ['philology', '新的语文学比较'],
];
const VNOTE: Record<V, string> = {
  ms: '长处：一份不经朱斯托之手、年代可以确定的抄本，会直接改变"孤本"的处境。代价：至今没有发现；而且它的年代和来源本身也需要鉴定。',
  drafts: '长处：如果找到朱斯托写作《探究》的草稿，伪作说会得到强有力的支持。代价：没有找到草稿并不能证明他没有写；他的通信已经被研究过。',
  philology: '长处：埃吉德正是希望语文学家重新研究这个问题；它可以在现有的材料上进行。代价：语文学的论证一百年来一直存在，不同的专家对同样的平行作出了不同的判断。',
};

interface Saved {
  kinds: Record<string, K>;
  ev: Record<string, P>;
  view: V | null;
}
const INIT: Saved = { kinds: {}, ev: {}, view: null };

export default function SourceWeigh() {
  const [st, save] = useSavedIx<Saved>('AF1', ID, INIT);
  const sorted = ITEMS.filter((x) => x.id in st.kinds).length;
  const sortedOk = ITEMS.filter((x) => st.kinds[x.id] === x.k).length;
  const weighed = EVIDENCE.filter((x) => x.id in st.ev).length;
  const allSorted = sorted === ITEMS.length;
  const allWeighed = weighed === EVIDENCE.length;

  return (
    <section className="md c3 c5" aria-labelledby="sw-title">
      <header className="md-head">
        <p className="md-tag">来源批判 · 这份证据能证明什么</p>
        <h3 id="sw-title" className="md-title">先分清材料的类型，再衡量《探究》的证据</h3>
        <p className="md-lede">
          第一步：把六条材料归入本章的五类材料。第二步：说出关于《探究》作者的六条证据各自支持哪一种立场，并看它的限度。第三步只是你的看法，没有标准答案。
        </p>
      </header>

      <Band>
        一 · 这是哪一类材料？（已分 {sorted} / {ITEMS.length}）
      </Band>
      <ol className="v21-steps" aria-label="六条材料">
        {ITEMS.map((x, i) => {
          const a = st.kinds[x.id];
          const has = x.id in st.kinds;
          return (
            <li key={x.id} className="v21-step">
              <span className="v21-n" aria-hidden="true">
                {i + 1}
              </span>
              <span>
                <span>{x.text}</span>
                <Pick label={`材料 ${i + 1} 属于哪一类`} value={a} opts={KS} onPick={(v) => save({ ...st, kinds: { ...st.kinds, [x.id]: v } })} />
                {has && (
                  <span aria-live="polite">
                    <Verdict ok={a === x.k} yes="对" no="再想想" />
                    {a === x.k ? x.why : '先问：这条材料直接证明的是什么？是谁讲述、谁记录、谁构造的？'}
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ol>

      {allSorted && (
        <div aria-live="polite">
          <Band>
            二 · 《探究》的证据支持哪一方？（{sortedOk} / {ITEMS.length} 条分类与本章一致；已判断 {weighed} / {EVIDENCE.length}）
          </Band>
          <ol className="v21-steps" aria-label="六条证据">
            {EVIDENCE.map((x, i) => {
              const a = st.ev[x.id];
              const has = x.id in st.ev;
              return (
                <li key={x.id} className="v21-step">
                  <span className="v21-n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span>
                    <span>{x.text}</span>
                    <Pick label={`证据 ${i + 1} 支持哪一种立场`} value={a} opts={PS} onPick={(v) => save({ ...st, ev: { ...st.ev, [x.id]: v } })} />
                    {has && (
                      <span aria-live="polite">
                        <Verdict ok={a === x.p} yes="与本章一致" no="本章的整理不同" />
                        {a === x.p ? '' : `本章把它列为：${PS.find(([k]) => k === x.p)?.[1]}。`}
                        限度：{x.limit}
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      )}

      {allSorted && allWeighed && (
        <div aria-live="polite">
          <Band>三 · 哪一种新证据最能改变现状？</Band>
          <Pick label="哪一种新证据最能改变现状" value={st.view} opts={VS} onPick={(v) => save({ ...st, view: v })} />
          {st.view && (
            <p className="md-muted" aria-live="polite">
              {VNOTE[st.view]}
            </p>
          )}
          {st.view && (
            <Claim b="course">
              每一条证据都有它的限度，没有一条单独就能结束争论。所以本章只说：《探究》的作者和年代至今有争议。
            </Claim>
          )}
        </div>
      )}

      <Limits>
        <p>
          <b>这里的每一条材料和证据，都复述课文第六部分和前几部分的内容；"支持哪一方"一栏是本章的整理，不是学界的统一结论。</b>
          关于《探究》的证据，依据《寻找扎拉·雅各布》（2024，开放获取）的导论和维昂的一章，以及《哈塔塔探究》的年表；本章没有阅读抄本或原文。第三步没有标准答案。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
