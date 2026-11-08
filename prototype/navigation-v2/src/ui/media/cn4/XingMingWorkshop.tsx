import { Gu, Limits, Seg, useSaved } from './shared';
import { Stages } from '../cn3/shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn2/cn2.css';
import '../cn3/cn3.css';
import './cn4.css';

// 二 · after the 典冠 story and its two readings. Lays out, case by case, the
// four things 《二柄》 compares (the office, what the minister said, what he
// was then charged with, what was actually done) and asks what the ruler does
// under Han Fei's rule. Three cases are the course's own invented
// illustrations; the fourth is the 典冠 story from the chapter. The panel
// says what the reconstruction leaves out: it is not a model of modern
// management and does not suggest punishment solves administrative problems.

const ID = 'xingming-workshop';
type Act = 'shang' | 'fa';
interface Saved {
  c: number;
  picks: (Act | null)[];
  say: number;
  did: number;
}
const INIT: Saved = { c: 0, picks: [null, null, null, null], say: 8000, did: 8000 };

interface Case {
  k: string;
  invented: boolean;
  office: string;
  said: string;
  task: string;
  done: string;
  gap: string;
  han: Act | 'both';
  why: string;
  protects: string;
  cost: string;
}
const CASES: Case[] = [
  {
    k: '言大而功小',
    invented: true,
    office: '掌管一地粮仓的官员',
    said: '"今年我能收储粮食一万石。"',
    task: '君主据此让他负责收储一万石。',
    done: '实际收储六千石。',
    gap: '少了四千石：功不当其言。',
    han: 'fa',
    why: '"其言大而功小者則罰，非罰小功也，罰功不當名也"：罚的不是功小，而是功与言不符。',
    protects: '让臣子不敢夸大自己的能力来争取任务和资源。',
    cost: '收成也受天气等臣子控制不了的因素影响；规则不区分"夸大"和"遇到意外"。',
  },
  {
    k: '言小而功大',
    invented: true,
    office: '掌管另一地粮仓的官员',
    said: '"今年我能收储五千石。"',
    task: '君主据此让他负责收储五千石。',
    done: '实际收储九千石。',
    gap: '多了四千石：功同样不当其言。',
    han: 'fa',
    why: '"其言小而功大者亦罰，非不說於大功也，以爲不當名也害甚於有大功"：君主不是不喜欢大功，而是认为言与功不符的害处更大。',
    protects: '君主要依靠报告来分派任务和资源；故意少报、再"超额完成"的臣子，让君主的判断建立在错误的信息上。',
    cost: '一个真心谨慎、低估了自己的人也会受罚；规则惩罚的是不准确，而不一定是不诚实。',
  },
  {
    k: '言与功相符',
    invented: true,
    office: '掌管第三地粮仓的官员',
    said: '"今年我能收储八千石。"',
    task: '君主据此让他负责收储八千石。',
    done: '实际收储八千石。',
    gap: '没有差距：功当其事，事当其言。',
    han: 'shang',
    why: '"功當其事，事當其言，則賞"：赏的是相符，而不是数量的多少。',
    protects: '臣子最好的策略是如实说出自己能做什么。',
    cost: '谁来核实"实际收储八千石"？核对本身也要依靠别的官员的报告。',
  },
  {
    k: '典冠加衣',
    invented: false,
    office: '典冠（掌管帽子的官员）与典衣（掌管衣服的官员）',
    said: '各自的职分：典冠管帽子，典衣管衣服。',
    task: '韩昭侯醉卧，天冷。',
    done: '典冠给君主加了衣服；典衣没有做自己的事。',
    gap: '典冠越出了自己的职分；典衣没有尽到自己的职分。',
    han: 'both',
    why: '"君因兼罪典衣與典冠。其罪典衣，以爲失其事也；其罪典冠，以爲越其職也。"韩非说："非不惡寒也，以爲侵官之害甚於寒。"',
    protects: '职分的边界：今天能替君主加衣的人，明天就能替君主作决定。',
    cost: '惩罚了一个善意而有益的行为；人人不敢越职一步的组织，遇到意外会很脆弱。',
  },
];

const ACT: Record<Act, string> = { shang: '赏', fa: '罚' };

export default function XingMingWorkshop() {
  const [st, save] = useSaved<Saved>(ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const c = Math.max(0, Math.min(CASES.length - 1, st.c));
  const cs = CASES[c];
  const pick = st.picks[c] ?? null;
  const right = pick && (cs.han === 'both' ? pick === 'fa' : pick === cs.han);
  const setPick = (v: Act) => set({ picks: st.picks.map((x, j) => (j === c ? v : x)) });
  const diff = st.did - st.say;

  return (
    <section className="md c3 c4" aria-labelledby="xm-title">
      <header className="md-head">
        <p className="md-tag">论证重构 · 情景练习</p>
        <h3 id="xm-title" className="md-title">
          形名参验：职、言、事、功
        </h3>
        <p className="md-lede">
          《二柄》的方法是把四样东西放在一起核对：臣子的职分，臣子说自己能做什么（言、名），君主据此交给他的事，以及实际的结果（功、形）。逐个看下面的情景，先自己判断君主按韩非的规则应当赏还是罚，再看韩非的理由、这条规则保护了什么、付出了什么代价。
        </p>
      </header>

      <Stages labels={CASES.map((x) => x.k)} cur={c} onPick={(i) => set({ c: i })} label="四个情景" />

      <div className="g4-panel" aria-live="polite">
        <p className="md-muted">{cs.invented ? '本课虚构的情景，用来说明《二柄》的规则；不是史书的记载。' : '《韩非子·二柄》记载的故事（见上文正文）。'}</p>
        <div className="c2-scroll">
          <table className="g4-table c4-xm">
            <tbody>
              <tr>
                <th scope="row">职分</th>
                <td>{cs.office}</td>
              </tr>
              <tr>
                <th scope="row">言（名）</th>
                <td>{cs.said}</td>
              </tr>
              <tr>
                <th scope="row">事</th>
                <td>{cs.task}</td>
              </tr>
              <tr>
                <th scope="row">功（形）</th>
                <td>{cs.done}</td>
              </tr>
              <tr>
                <th scope="row">差距</th>
                <td>{cs.gap}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>按韩非的规则，君主应当怎样做？{cs.han === 'both' ? '（这里问的是典冠。）' : ''}</p>
        <Seg name={`xm-${c}`} label="君主的判断" value={pick} opts={(['shang', 'fa'] as Act[]).map((a) => [a, ACT[a]] as const)} onPick={setPick} />
        {pick && (
          <div className="md-feedback">
            <p className="md-fb-k">{right ? '和韩非的判断一致。' : '韩非的判断不同。'}</p>
            <p>{cs.why}</p>
            <div className="c3-two">
              <div className="c2-card">
                <p className="g4-k">这条规则保护的是</p>
                <p>{cs.protects}</p>
              </div>
              <div className="c2-card c3-card--limit">
                <p className="g4-k">代价</p>
                <p>{cs.cost}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="g4-panel">
        <p className="c3-layer-k">自己改一改数字</p>
        <p>设定一位管粮仓的官员说了多少、实际做了多少，看韩非的规则怎样判断。</p>
        <div className="c4-sliders">
          <label className="c4-slider">
            <span>言：说能收储 {st.say} 石</span>
            <input type="range" min={2000} max={12000} step={500} value={st.say} onChange={(e) => set({ say: Number(e.target.value) })} />
          </label>
          <label className="c4-slider">
            <span>功：实际收储 {st.did} 石</span>
            <input type="range" min={2000} max={12000} step={500} value={st.did} onChange={(e) => set({ did: Number(e.target.value) })} />
          </label>
        </div>
        <div className="md-feedback" aria-live="polite">
          <p className="md-fb-k">{diff === 0 ? '相符：赏。' : diff > 0 ? `多了 ${diff} 石：言小而功大，罚。` : `少了 ${-diff} 石：言大而功小，罚。`}</p>
          <p>
            {diff === 0
              ? '"功當其事，事當其言，則賞。"'
              : '方向不同，结论一样：规则只问言与功是否相符，不问功的大小。这正是它和"多做多赏"的直觉不同的地方。'}
          </p>
          <p className="md-muted">规则本身只说"当"与"不当"，没有说差多少才算不当；把"完全相等"当作相符，是这个演示的简化。</p>
        </div>
      </div>

      <Gu
        src="《韩非子·二柄》"
        orig="爲人臣者陳而言，君以其言授之事，專以其事責其功。功當其事，事當其言，則賞；功不當其事，事不當其言，則罰。"
        zh="做臣子的陈述自己的主张，君主根据他的主张交给他相应的事情，然后专门根据这件事来要求他的功效。功效与事情相符，事情与言论相符，就奖赏；不符，就惩罚。"
      />

      <Limits>
        <p>
          这是本课对《二柄》论证的重构，不是现代绩效管理的模型。粮仓的情景是虚构的。正文已经说明这类类比的界限：韩非的臣子不能辞职，"罚"可能是死刑，君主也不对任何人负责。
        </p>
        <p>
          这个规则也没有回答几个问题：实际的"功"由谁来核实？天灾这类臣子控制不了的因素怎样处理？谁来核对君主自己？惩罚能保证报告准确，却不能保证事情做好；行政上的很多困难，并不能靠赏罚解决。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
