import { Band, Claim, Limits, Seg, Src, Tag, useSavedIx } from '../in4/shared';
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

// 二 · where the chapter introduces the tattva structure (the former text diagram was removed in V20).
// The whole hierarchy is drawn at once, as nested lists (no monospace art), with
// puruṣa in a panel of its own: it is not a product of prakṛti and no line joins
// it to the tree. Choosing an item opens its verses and the chapter's
// qualifications; the two other views re-read the same tree through verse 3
// (four classes) and verse 40 (the subtle body). The three states of ahaṃkāra are
// marked as states, not further tattvas. Quotations and translations are the
// chapter's own (一、二、三, notes 7, 22–30, 34, 36, 38).

const ID = 'tattva-explorer';

type N = 'prakrti' | 'mahat' | 'ahamkara' | 'sattva' | 'rajas' | 'tamas' | 'manas' | 'jnana' | 'karma' | 'tanmatra' | 'bhuta' | 'purusa';
type Cat = 'p' | 'pv' | 'v' | 'none';
const CAT: Record<Cat, string> = { p: '只是原质', pv: '既是原质又是变异', v: '只是变异', none: '既不是原质也不是变异' };

interface Info {
  name: string;
  skt: string;
  n: number; // how many tattvas this item counts for (0 = a state, not a tattva)
  members?: string;
  cat?: Cat;
  linga?: boolean;
  verses: string;
  says: string;
  quote?: { src: string; orig: string; zh: string };
  caveat?: string;
}

const Q22 = {
  src: '《数论颂》第 22 颂',
  orig: "prakṛter mahāṃs tato 'haṃkāras tasmād gaṇaś ca ṣoḍaśakaḥ / tasmād api ṣoḍaśakāt pañcabhyaḥ pañca bhūtāni",
  zh: '从原质生出"大"，从"大"生出我慢，从我慢生出一组十六个；又从这十六个之中的五个，生出五大。',
};
const Q25 = {
  src: '《数论颂》第 25 颂',
  orig: 'sāttvika ekādaśakaḥ pravartate vaikṛtād ahaṃkārāt / bhūtādes tanmātraḥ sa tāmasas taijasād ubhayam',
  zh: '萨埵性质的那一组十一个，从"变异的"我慢生起；五唯从"大种之初"［的我慢］生起，它是多摩性质的；从"炽盛的"［我慢］生起两者。',
};

const INFO: Record<N, Info> = {
  prakrti: {
    name: '根本原质',
    skt: 'mūlaprakṛti（avyakta, pradhāna）',
    n: 1,
    cat: 'p',
    verses: '第 3、10、11、14—16 颂',
    says: '唯一；由三德构成；没有意识。看不见，是从结果推出来的。',
    quote: { src: '《数论颂》第 16 颂，下半', orig: 'pariṇāmataḥ salilavat pratipratiguṇāśrayaviśeṣāt', zh: '［未显现者］通过转变［而运作］，就像水一样：由于各个所依的不同，三德［的组合也］各不相同。' },
    caveat: 'IEP 的数论条目提醒，"原质"一词有三种用法：专指根本原质；指"能生出别的东西"的八个；最常见的，指除神我之外的全部二十四个。',
  },
  mahat: {
    name: '大（觉）',
    skt: 'mahat（buddhi）',
    n: 1,
    cat: 'pv',
    linga: true,
    verses: '第 22、23 颂',
    says: '作决定（第 23 颂：adhyavasāya）。属于原质一边，本身没有意识；因与神我结合而"好像有"意识。',
    quote: Q22,
  },
  ahamkara: {
    name: '我慢',
    skt: 'ahaṃkāra',
    n: 1,
    cat: 'pv',
    linga: true,
    verses: '第 22、24、25 颂',
    says: '"认作是我的"：产生"这是我"、"这是我的"的认定。数论中与"心理上的我"最接近的，恰恰是它，而不是神我。',
    quote: { src: '《数论颂》第 24 颂，上半', orig: "abhimāno 'haṃkāras tasmād dvividhaḥ pravartate sargaḥ", zh: '我慢就是"认作是我的"；从它生出两类创造。' },
  },
  sattva: {
    name: '萨埵性质的我慢（"变异的"）',
    skt: 'vaikṛta',
    n: 0,
    verses: '第 25 颂',
    says: '我慢的一种状态，不是另外一谛。十一根从它生起。',
    quote: Q25,
  },
  rajas: {
    name: '罗阇性质的我慢（"炽盛的"）',
    skt: 'taijasa',
    n: 0,
    verses: '第 25 颂',
    says: '我慢的一种状态，不是另外一谛，也没有自己单独的产物。第 25 颂说两组都"从炽盛的［我慢］"生起；乔荼波陀注解释为：萨埵性质和多摩性质的我慢本身不活动，要借助罗阇性质的我慢作为帮手。',
    quote: Q25,
  },
  tamas: {
    name: '多摩性质的我慢（"大种之初"）',
    skt: 'bhūtādi',
    n: 0,
    verses: '第 25 颂',
    says: '我慢的一种状态，不是另外一谛。五唯从它生起。',
    quote: Q25,
  },
  manas: {
    name: '意',
    skt: 'manas',
    n: 1,
    cat: 'v',
    linga: true,
    verses: '第 25、27 颂',
    says: '十一根中兼属知根和作根两组的那一个。',
  },
  jnana: {
    name: '五知根',
    skt: 'buddhīndriya',
    n: 5,
    members: '眼、耳、鼻、舌、皮',
    cat: 'v',
    linga: true,
    verses: '第 26 颂',
    says: '感知的能力。注意：它们也属于原质，没有意识。',
  },
  karma: {
    name: '五作根',
    skt: 'karmendriya',
    n: 5,
    members: '言语、手、足、排泄、生殖',
    cat: 'v',
    linga: true,
    verses: '第 26 颂',
    says: '行动的能力。',
  },
  tanmatra: {
    name: '五唯',
    skt: 'tanmātra',
    n: 5,
    members: '声、触、色、味、香',
    cat: 'pv',
    linga: true,
    verses: '第 22、25、38 颂',
    says: '第 22 颂所说"十六个之中的五个"；第 38 颂说它们是"无差别的"。',
    quote: Q22,
    caveat: '五个名称是注释家和后来文献中的通常说法，颂文本身没有逐一列出。"五唯"究竟是"微细的元素"，还是"单纯的感觉性质"，颂文没有说明；IEP 的数论条目认为后者也许更合适。',
  },
  bhuta: {
    name: '五大',
    skt: 'bhūta',
    n: 5,
    members: '空、风、火、水、地',
    cat: 'v',
    verses: '第 22、38 颂',
    says: '从五唯生出；第 38 颂说它们是"有差别的"，带着平静、猛烈或迷闷的性质。不属于细身。',
    quote: Q22,
    caveat: '五唯中的哪一个生出五大中的哪一个，颂文没有说明，各注释家说法不同；本章不作补充，所以图中只画一条从"五唯"到"五大"的线，不画五条一一对应的线。',
  },
  purusa: {
    name: '神我',
    skt: 'puruṣa',
    n: 1,
    cat: 'none',
    verses: '第 3、11、17—21 颂',
    says: '有意识；众多（第 18 颂）；不生出任何东西，也不是被生出来的；不在这个生成的序列之中。它是见证者、观看者，不是行为者。',
    quote: {
      src: '《数论颂》第 19 颂',
      orig: 'tasmāc ca viparyāsāt siddhaṃ sākṣitvam asya puruṣasya / kaivalyaṃ mādhyasthyaṃ draṣṭṛtvam akartṛbhāvaś ca',
      zh: '由于这种相反，神我被证明是见证者，是独存的，是中立的，是观看者，而且不是行为者。',
    },
    caveat: '神我是否绝对不变，有争论：IEP 的数论条目（Ruzsa）认为，这可能是后来在吠檀多的影响下形成的理解；许多现代学者把神我理解为严格不变的。',
  },
};

type View = 'order' | 'sk3' | 'linga';

interface Saved {
  sel: N | null;
  view: View;
  reading: 'cosmos' | 'person' | null;
}
const INIT: Saved = { sel: null, view: 'order', reading: null };

export default function TattvaExplorer() {
  const [st, save] = useSavedIx<Saved>('IN7', ID, INIT);
  const set = (x: Partial<Saved>) => save({ ...st, ...x });
  const sel = st.sel && INFO[st.sel] ? st.sel : null;
  const view: View = st.view === 'sk3' || st.view === 'linga' ? st.view : 'order';

  const node = (id: N) => {
    const it = INFO[id];
    const mark = view === 'sk3' ? (it.cat ? CAT[it.cat] : '状态，不计入') : view === 'linga' ? (it.n === 0 ? '状态' : it.linga ? '属于细身' : '不属于细身') : it.n === 0 ? '我慢的状态，不是另一谛' : it.n > 1 ? `${it.n} 谛` : '1 谛';
    const dim = view === 'linga' && it.n > 0 && !it.linga;
    return (
      <button
        key={id}
        type="button"
        className={'i7-node' + (sel === id ? ' is-on' : '') + (it.n === 0 ? ' is-state' : '') + (dim ? ' is-out' : '') + (view === 'linga' && it.linga ? ' is-linga' : '')}
        aria-pressed={sel === id}
        onClick={() => set({ sel: sel === id ? null : id })}
      >
        <span className="i7-name">{it.name}</span>
        <span className="i7-skt" lang="sa">
          {it.skt}
        </span>
        {it.members && <span className="i7-mem">{it.members}</span>}
        <span className="i7-mark">{mark}</span>
      </button>
    );
  };

  const info = sel ? INFO[sel] : null;

  return (
    <section className="md c3 c5" aria-labelledby="te-title">
      <header className="md-head">
        <p className="md-tag">二十五谛 · 结构图</p>
        <h3 id="te-title" className="md-title">
          二十四个在一边，一个在另一边
        </h3>
        <p className="md-lede">整张图一开始就全部显示。点任何一项，看它的颂文依据和本章的限定；换一种视图，用第 3 颂的四类或第 40 颂的"细身"重新读同一张图。</p>
      </header>

      <Seg
        name="te-view"
        label="选择视图"
        value={view}
        opts={[
          ['order', '生成次序（第 22、25 颂）'],
          ['sk3', '四类（第 3 颂）'],
          ['linga', '细身（第 40 颂）'],
        ]}
        onPick={(v) => set({ view: v })}
      />

      <div className="i7-map">
        <div className="i7-side" role="group" aria-labelledby="te-pk">
          <p id="te-pk" className="i7-side-h">
            原质一边：二十四谛
            <small>物质的、会变化的自然，包括心智；没有意识</small>
          </p>
          <ul className="i7-tree">
            <li>
              {node('prakrti')}
              <ul>
                <li>
                  {node('mahat')}
                  <ul>
                    <li>
                      {node('ahamkara')}
                      <ul>
                        <li>
                          {node('sattva')}
                          <ul>
                            <li>
                              {node('manas')}
                            </li>
                            <li>
                              {node('jnana')}
                            </li>
                            <li>
                              {node('karma')}
                            </li>
                          </ul>
                        </li>
                        <li>
                          {node('rajas')}
                        </li>
                        <li>
                          {node('tamas')}
                          <ul>
                            <li>
                              {node('tanmatra')}
                              <ul>
                                <li>
                                  {node('bhuta')}
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="i7-side i7-purusa" role="group" aria-labelledby="te-pu">
          <p id="te-pu" className="i7-side-h">
            神我一边：一谛
            <small>不由原质生出，也不生出任何东西；与左边的树之间没有连线</small>
          </p>
          {node('purusa')}
          <p className="i7-note">一个名目，但为数众多：每一个有情生命都有它自己的神我（第 18 颂）。</p>
        </div>
      </div>

      {view === 'sk3' && (
        <div aria-live="polite">
          <Src
            src="《数论颂》第 3 颂"
            lang="sa"
            orig="mūlaprakṛtir avikṛtir mahadādyāḥ prakṛtivikṛtayaḥ sapta / ṣoḍaśakas tu vikāro na prakṛtir na vikṛtiḥ puruṣaḥ"
            zh="根本原质不是［别的东西的］变异；以“大”为首的七个，既是原质，又是变异；十六个则只是变异；神我既不是原质，也不是变异。"
          />
          <p className="md-muted">
            "原质"在这一颂里是"能生出别的东西的东西"，"变异"是"被生出来的东西"。1 + 7 + 16 = 24，加上神我，共二十五。我慢的三种状态不计入。 <Tag b="course" who="四类的整理" />
          </p>
        </div>
      )}
      {view === 'linga' && (
        <div aria-live="polite">
          <Src
            src="《数论颂》第 42 颂"
            lang="sa"
            orig="puruṣārthahetukam idaṃ nimittanaimittikaprasaṅgena / prakṛter vibhutvayogān naṭavad vyavatiṣṭhate liṅgam"
            zh="这个细身以神我的目的为动因，依照原因与结果的联系，借着原质的遍在能力，像演员一样［在各种身体中］出现。"
          />
          <p className="md-muted">
            第 40 颂说细身"从大到五唯"，共十八个（大、我慢、十一根、五唯）；五大不在其中。轮回的是细身，不是神我：神我一边没有任何东西被标为"属于细身"。 <Tag b="text" />
          </p>
        </div>
      )}

      {info && (
        <div className="i7-card" aria-live="polite">
          <p className="i7-card-h">
            <b>{info.name}</b> <span lang="sa">{info.skt}</span>
            {info.members && <>：{info.members}</>}
          </p>
          <p className="md-muted">
            {info.cat ? `第 3 颂的类别：${CAT[info.cat]}。` : '我慢的一种状态，不计入二十五谛。'}主要的颂文依据：{info.verses}。
          </p>
          <p>
            {info.says} <Tag b="course" who="据本章的表和正文" />
          </p>
          {info.quote && <Src src={info.quote.src} lang="sa" orig={info.quote.orig} zh={info.quote.zh} />}
          {info.caveat && (
            <p className="md-muted">
              <b>限定：</b>
              {info.caveat}
            </p>
          )}
        </div>
      )}

      <Band>这张图讲的是宇宙，还是一个人？</Band>
      <Seg
        name="te-reading"
        label="选择一种理解"
        col
        value={st.reading}
        opts={[
          ['cosmos', '宇宙从根本原质中演化出来的过程'],
          ['person', '一个有情生命的构成'],
        ]}
        onPick={(v) => set({ reading: v })}
      />
      {st.reading && (
        <div aria-live="polite">
          <Claim b="scholar" who="IEP《数论》">
            宇宙论的理解可能更古老，在后来的文献中也占主导；但《数论颂》本身对这个问题保持沉默，它似乎更倾向于后一种理解。理由是：如果是整个宇宙的演化，就需要一个"超级的神我"或者所有神我的协同作用来推动它，而古典数论两者都不承认。
          </Claim>
          <p className="md-muted">两种理解都是对同一张图的解释；这里不判定哪一种正确。</p>
        </div>
      )}

      <Limits>
        <p>这张图是本章依据第 3、22、24—27、38、40 颂的整理，不是《数论颂》本身的图。把三种我慢画成三条分支，是依据第 25 颂；五唯和五大之间只画一条线，因为颂文没有说明一一对应。</p>
        <p>
          <b>这不是生物进化论。</b>数论的次序从心智（"大"）到物质元素（五大），由神我的目的推动，由推理和传承得到，与从物质到生命再到心智的现代图景恰好相反。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
