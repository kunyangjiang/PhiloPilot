import { Gu, Limits, Seg, useSaved } from './shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn2/cn2.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import './cn5.css';

// 五 · after "比喻的限度". Three parts:
// 1. 法藏's rafter argument on a drawn house. Remove a rafter and see what
//    follows; switch between the strong definition the argument needs ("房子"
//    = this complete house) and the everyday one, and watch which of the
//    chapter's five reconstructed steps still hold.
// 2. The six marks (六相) on the same house: each button highlights what the
//    mark picks out, so that 异相 and 坏相 visibly keep the parts distinct.
// 3. Models and their limits: gold lion, house, Indra's net, and two modern
//    pictures the chapter warns against (a network of separate dots, a
//    container that is the sum of its parts, everything melting into one).
// All classical lines are the chapter's own (法藏《华严一乘教义分齐章》卷四,
// 《金师子章》); the step texts paraphrase the chapter's reconstruction.

const ID = 'huayan-explorer';
type Def = 'strong' | 'weak';
type Mark = 'zong' | 'bie' | 'tong' | 'yi' | 'cheng' | 'huai';
type Model = 'lion' | 'house' | 'net' | 'graph' | 'sum' | 'melt';
interface Saved {
  gone: number | null;
  def: Def;
  mark: Mark | null;
  model: Model | null;
}
const INIT: Saved = { gone: null, def: 'strong', mark: null, model: null };

const RAFTERS = [0, 1, 2, 3, 4, 5];
const STEPS = [
  { t: '一座完好的房子，是所有的椽、瓦、柱等共同构成的。', weakOk: true },
  { t: '去掉任何一根椽子，剩下的就不再是"这座完好的房子"，而是一座破房子。', weakOk: false },
  { t: '所以，"这座完好的房子"的存在，完全依赖于每一根椽子（不是每根椽子出百分之几的力）。', weakOk: false },
  { t: '每一根椽子之所以是"椽子"，完全依赖于这座房子（离开房子，它只是一根木头）。', weakOk: true },
  { t: '所以，椽子和房子互相完全依赖：从这个意义上说，"椽即是舍"。', weakOk: false },
];

const MARKS: Record<Mark, { name: string; line: string; what: string }> = {
  zong: { name: '总相', line: '总即一舍', what: '一座房子：整体作为"这一个"整体。' },
  bie: { name: '别相', line: '别即诸缘', what: '各个条件：椽、瓦、柱，一个一个分开看。' },
  tong: { name: '同相', line: '同即互不相违', what: '它们互不相违，共同构成房子。' },
  yi: { name: '异相', line: '异即诸缘各别', what: '各个条件各自不同：椽是椽，瓦是瓦，形状和位置都不一样。' },
  cheng: { name: '成相', line: '成即诸缘办果', what: '各个条件成就了房子这个结果。' },
  huai: { name: '坏相', line: '坏即各住自法', what: '每一个条件都保持自己的样子，并没有"变成"房子。不是房子坏了。' },
};

const MODELS: Record<Model, { name: string; kind: '华严文献' | '现代的图像'; shows: string; fails: string }> = {
  lion: {
    name: '金狮子',
    kind: '华严文献',
    shows: '金没有自性，随工匠之缘成为狮子："师子不有金体不无"。理和事不是两样东西。',
    fails: '金和狮子的关系不对称：金不依赖狮子，狮子依赖金。用它说"理"，容易把理想象成现象背后的实体。',
  },
  house: {
    name: '房子和椽子',
    kind: '华严文献',
    shows: '整体和部分的身份互相规定："椽即是舍"；六相说明这种规定不取消差别。',
    fails: '依赖"房子 = 这座完好的房子"这个很强的定义；而且房子是有设计、有功能的人造物，宇宙是不是这样一个整体，比喻不能证明。',
  },
  net: {
    name: '因陀罗网',
    kind: '华严文献',
    shows: '每一颗宝珠映照所有其他宝珠，映像又映照映像，重重无尽：很好地说明"相入"。',
    fails: '映像毕竟只是映像：宝珠里的映像不是另一颗宝珠本身。华严说的"相即"比"相互映照"更强。',
  },
  graph: {
    name: '网络图：点和连线',
    kind: '现代的图像',
    shows: '一切事物都和别的事物有关系。',
    fails: '太弱。一切佛教学派都承认因缘相关，这不是华严特有的。网络里的点各自独立，连线是外加的：点 A 不"包含"点 B，更不"即是"点 B。华严说的是每一个事物完全地、直接地包含一切事物。',
  },
  sum: {
    name: '容器：整体是部分之和',
    kind: '现代的图像',
    shows: '房子由椽、瓦、柱组成，可以一件件数出来。',
    fails: '这正是法藏反驳的"少力"说：每根椽子出一部分力，合起来成房子。法藏说，若是这样，"去却一椽时舍应犹在"；他认为这种看法有"断常"之过。容器图也看不到部分的身份依赖整体（离开房子，椽子只是一根木头）。',
  },
  melt: {
    name: '融成一体',
    kind: '现代的图像',
    shows: '"一即一切"听起来像一切合而为一。',
    fails: '和六相正好相反。法藏说"秖由不作故。舍法得成"：正因为椽子没有变成房子，房子才能成立。如果椽子、瓦片都"融化"成一个无差别的整体，就没有房子了。',
  },
};

export default function HuayanExplorer() {
  const [st, save] = useSaved<Saved>(ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const gone = st.gone;
  const broken = gone !== null;
  const strong = st.def === 'strong';
  const m = st.mark;
  // which parts a mark lights up: 'whole' | 'each' | 'kinds' | 'none'
  const hiWhole = m === 'zong' || m === 'cheng';
  const hiEach = m === 'bie' || m === 'yi' || m === 'huai' || m === 'tong';
  const showNames = m === 'yi' || m === 'huai';
  const partCls = (base: string) => base + (hiEach ? ' c5-hot' : '');
  const md = st.model ? MODELS[st.model] : null;

  const toggleRafter = (i: number) => set({ gone: gone === i ? null : i });

  return (
    <section className="md c3 c5" aria-labelledby="hy-title">
      <header className="md-head">
        <p className="md-tag">论证与模型 · 整体与部分</p>
        <h3 id="hy-title" className="md-title">
          椽子就是房子？一个论证、六个相、几个比喻
        </h3>
        <p className="md-lede">
          先拿掉一根椽子，看法藏的论证怎样推进，以及它依赖哪一个定义。再看"六相"怎样说明：相即并不取消差别。最后比较几个比喻和现代图像，看每一个在哪里失效。
        </p>
      </header>

      <p className="c3-layer-k">一、拿掉一根椽子</p>
      <div className="g4-panel">
        <svg className="c5-fig" viewBox="0 0 520 250" aria-label={`一座房子，六根椽子，屋顶有瓦，下面有两根柱子。${broken ? `第 ${gone! + 1} 根椽子被拿掉了，放在右边，它现在只是一根木头。` : '六根椽子都在。'}`}>
          {/* roof outline and tiles */}
          <path d="M60,110 L200,40 L340,110" className={hiWhole ? 'c5-hot' : 'c5-thick'} />
          <path d="M80,112 L200,52 L320,112" className={partCls('c5-thin c5-dash')} />
          {showNames && (
            <text x={200} y={36} textAnchor="middle" className="c5-small">
              瓦
            </text>
          )}
          {RAFTERS.map((i) => {
            const x = 96 + i * 42;
            const isGone = gone === i;
            return (
              <g
                key={i}
                role="button"
                tabIndex={-1}
                aria-hidden="true"
                className={'c5-fade' + (isGone ? ' is-gone' : '')}
                onClick={() => toggleRafter(i)}
              >
                <line x1={x} y1={x < 200 ? 110 - (x - 60) / 2 + 4 : 110 - (340 - x) / 2 + 4} x2={x} y2={116} className={partCls('c5-thick')} />
              </g>
            );
          })}
          {/* beam and pillars */}
          <line x1={60} y1={118} x2={340} y2={118} className={partCls('c5-thick')} />
          <line x1={84} y1={118} x2={84} y2={214} className={partCls('c5-thick')} />
          <line x1={316} y1={118} x2={316} y2={214} className={partCls('c5-thick')} />
          <line x1={40} y1={216} x2={360} y2={216} className="c5-thin" />
          {showNames && (
            <>
              <text x={92} y={170} className="c5-small">柱</text>
              <text x={200} y={132} textAnchor="middle" className="c5-small">梁</text>
              <text x={200} y={100} textAnchor="middle" className="c5-small">椽</text>
            </>
          )}
          {hiWhole && (
            <rect x={36} y={30} width={330} height={196} className="c5-hot c5-dash" />
          )}
          <text x={200} y={240} textAnchor="middle" className="c5-label">
            {broken ? (strong ? '破舍：不再是"这座完好的房子"' : '少了一根椽子的房子：仍然是房子') : '好舍：一座完好的房子'}
          </text>
          {/* the removed rafter */}
          <g className="c5-fade" style={{ opacity: broken ? 1 : 0.25 }}>
            <line x1={410} y1={120} x2={500} y2={120} className="c5-thick" />
            <text x={455} y={146} textAnchor="middle" className="c5-small">
              {broken ? '离开房子：只是一根木头' : '（拿掉的椽子会放在这里）'}
            </text>
          </g>
        </svg>

        <div className="c5-chips" role="group" aria-label="拿掉或放回一根椽子">
          {RAFTERS.map((i) => (
            <button key={i} type="button" className={'c5-chip' + (gone === i ? ' is-out' : '')} aria-pressed={gone === i} onClick={() => toggleRafter(i)}>
              {gone === i ? `放回第 ${i + 1} 根椽子` : `拿掉第 ${i + 1} 根椽子`}
            </button>
          ))}
        </div>

        <Seg
          name="hy-def"
          label="什么算"
          value={st.def}
          opts={[
            ['strong', '法藏的定义：房子 = 这座完好的房子'],
            ['weak', '日常的定义：少一根椽子仍然是房子'],
          ]}
          onPick={(v) => set({ def: v })}
        />

        <ol className="c5-steps" aria-live="polite">
          {STEPS.map((s, i) => {
            const ok = strong || s.weakOk;
            return (
              <li key={i} className={'c5-step' + (i === 4 ? ' is-concl' : '') + (ok ? '' : ' is-fail')}>
                <span className="c5-mark">{ok ? `${i + 1} ✓` : `${i + 1} ✗`}</span>
                <span>
                  {s.t}
                  {!ok && <em className="md-muted">　按日常的定义，这一步不成立。</em>}
                </span>
              </li>
            );
          })}
        </ol>

        <div className="md-feedback">
          {strong ? (
            <>
              <p className="md-fb-k">按法藏的定义，五步都成立</p>
              <Gu src="法藏《华严一乘教义分齐章》卷四" orig="问无一椽时岂非舍耶。答但是破舍无好舍也。故知好舍全属一椽。" zh="问：少了一根椽子，难道就不是房子了吗？答：那只是一座破房子，不是一座好房子。所以，好房子完全属于每一根椽子。" />
              <p>论证的力量在第 2 步和第 4 步：整体（作为"这一个"整体）和部分（作为"这一个整体的部分"）的身份是互相规定的，不是部分的"加总"。</p>
            </>
          ) : (
            <>
              <p className="md-fb-k">换成日常的定义，第 2、3、5 步失效</p>
              <p>如果"少一根椽子的房子仍然是房子"，拿掉一根椽子后房子还在，就推不出"房子完全依赖每一根椽子"。第 4 步仍然成立：离开房子，椽子只是一根木头。</p>
              <p>即使接受法藏的定义，还有第二个缺口：从一座房子推广到"一切即一，一即一切"，需要把整个宇宙看作一座"房子"，这一步论证没有给出。</p>
            </>
          )}
        </div>
      </div>

      <p className="c3-layer-k">二、六相：差别不会消失</p>
      <div className="g4-panel">
        <Gu src="法藏《华严一乘教义分齐章》卷四" orig="又总即一舍。别即诸缘。同即互不相违。异即诸缘各别。成即诸缘办果。坏即各住自法。" />
        <div className="c5-chips" role="group" aria-label="选择一相，在上面的房子上看它指的是什么">
          {(Object.keys(MARKS) as Mark[]).map((k) => (
            <button key={k} type="button" className={'c5-chip' + (m === k ? ' is-on' : '')} aria-pressed={m === k} onClick={() => set({ mark: m === k ? null : k })}>
              {MARKS[k].name}
            </button>
          ))}
        </div>
        <div className="md-feedback" aria-live="polite">
          {m ? (
            <>
              <p className="md-fb-k">
                {MARKS[m].name}（{MARKS[m].line}）：{MARKS[m].what}
              </p>
              {(m === 'huai' || m === 'yi') && (
                <>
                  <p>上面的图标出了每个部分的名字：椽仍然是椽，柱仍然是柱。</p>
                  <Gu src="法藏《华严一乘教义分齐章》卷四" orig="问现见椽等诸缘作舍成就。何故乃说本不作耶。答秖由不作故。舍法得成。若作舍去不住自法有舍义即不成。" zh="正因为椽子等没有变成房子，房子才能成立。如果椽子变成了房子，不再保持椽子的样子，房子反而不能成立了。" />
                </>
              )}
              {m === 'tong' && <p>同相不是"变成一样"：各个部分仍然各不相同，只是互不相违、一起构成房子。</p>}
              {(m === 'zong' || m === 'cheng') && <p>总相和成相都看整体；但整体不是在部分之外另加的一件东西。</p>}
              {m === 'bie' && <p>别相把部分一个一个分开看；和总相一起，才是同一座房子的两面。</p>}
            </>
          ) : (
            <p>选一相，上面的房子会标出它指的部分。注意"坏相"不是说房子坏了。</p>
          )}
        </div>
      </div>

      <p className="c3-layer-k">三、比喻和图像：各在哪里失效</p>
      <div className="c5-chips" role="group" aria-label="选择一个比喻或图像">
        {(Object.keys(MODELS) as Model[]).map((k) => (
          <button key={k} type="button" className={'c5-chip' + (st.model === k ? ' is-on' : '')} aria-pressed={st.model === k} onClick={() => set({ model: k })}>
            {MODELS[k].name}
            <small className="md-muted">　{MODELS[k].kind}</small>
          </button>
        ))}
      </div>
      {md ? (
        <div className="c3-two" aria-live="polite">
          <div className="c2-card">
            <p className="g4-k">{md.name}：它说明了什么</p>
            <p>{md.shows}</p>
          </div>
          <div className="c2-card c3-card--limit">
            <p className="g4-k">它在哪里失效</p>
            <p>{md.fails}</p>
          </div>
        </div>
      ) : (
        <p className="md-muted">前三个是华严文献自己的比喻；后三个是现代读者常用的图像，本课认为它们都会误导。</p>
      )}

      <Limits>
        <p>房子的图是为了跟随法藏的论证，不是华严的宇宙模型；本课的五步重构是本课自己的整理。</p>
        <p>"四法界"是澄观在注释中提出的总结，不是法藏本人的说法，所以这里没有用它。六相的按钮只标出房子的部分，不表示六相是六个阶段或六种东西。</p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
