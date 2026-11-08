import { Gu, Limits, Seg, useSaved } from './shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn2/cn2.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import '../cn5/cn5.css';

// 四 · after "请看第三行". Three parts:
// 1. 孝的理在哪里？ Four cases (serving a living father; after the parent's
//    death; why bamboo is hollow; names, measures and numbers). For each, the
//    learner guesses where each side puts the 理, then sees both answers side
//    by side, each with what it does well and what the other side worries
//    about. No side wins.
// 2. The chapter's comparison table, row by row, with the third row marked.
// 3. Three short diagnoses: which side's worry does each case illustrate?
// Quoted lines are the chapter's own (《传习录》, 《朱子语类》 etc.).

const ID = 'zhu-wang-workshop';
type Case = 'fuzai' | 'qinmo' | 'zhuzi' | 'mingwu';
type Where = 'obj' | 'xin' | 'both' | 'ask';
type Diag = 'a' | 'b' | 'c';
type Side = 'zhu' | 'wang' | 'neither';
interface Saved {
  c: Case;
  guess: Record<string, Where | undefined>;
  row: number | null;
  diag: Record<string, Side | undefined>;
}
const INIT: Saved = { c: 'fuzai', guess: {}, row: 2, diag: {} };

const WHERE: Record<Where, string> = {
  obj: '在对象（父亲、竹子）身上',
  xin: '在我的心中',
  both: '在物中，也在我心中的性中：是同一个理',
  ask: '"心即理"不管这一类：要向懂的人学',
};

interface Side2 {
  ans: Where;
  src?: string;
  orig?: string;
  say: string;
}
const CASES: Record<Case, { name: string; q: string; zhu: Side2; wang: Side2; note: string }> = {
  fuzai: {
    name: '侍奉在世的父亲',
    q: '侍奉父亲时应当怎样做，这个"孝的理"在哪里？',
    zhu: {
      ans: 'both',
      src: '《朱子語類·卷十五》（本课所引）',
      orig: '事父母，則當盡其孝；處兄弟，則當盡其友。',
      say: '朱熹认为外物的理和我性中的理是同一个理（"理一"）。格物"莫先於五品"：在父子关系中研究应当怎样做、为什么，就是格物，最终也是认识自己的性。',
    },
    wang: {
      ans: 'xin',
      src: '《傳習錄·卷上》',
      orig: '且如事父，不成去父上求個孝的理？',
      say: '孝不是父亲身上的属性，而是我对父亲的态度和义务："都只在此心，心即理也。此心無私欲之蔽，即是天理，不須外面添一分。"',
    },
    note: '注意：朱熹从来没有说孝的理"只"在父亲身上。双方都认为这个理是普遍的、人人相同的；分歧在于认识它的途径。',
  },
  qinmo: {
    name: '父母去世以后',
    q: '父母去世以后，孝的理还在吗？在哪里？',
    zhu: {
      ans: 'both',
      say: '本课的比较表：朱熹的理"在物中，也在心中的性中"。所以这个论证不直接击中他。但它迫使朱熹一方说清楚，"在物中"究竟是什么意思。（这是本课的分析，不是朱熹对王阳明的回答：朱熹早于王阳明三百年。）',
    },
    wang: {
      ans: 'xin',
      src: '《傳習錄·卷中》',
      orig: '假而果在於親之身，則親沒之後，吾心遂無孝之理歟？',
      say: '如果孝的理在父母身上，父母去世，孝的理就不存在了；可是人仍然知道应当祭祀、怀念。所以它不在父母身上。这个论证对道德的理相当有力。',
    },
    note: '这个论证驳倒的是"理只在对象身上"的看法。它对谁有效，取决于对方是否真的持有这个看法。',
  },
  zhuzi: {
    name: '竹子为什么是空心的',
    q: '竹子为什么是空心的？这个"理"在哪里？',
    zhu: {
      ans: 'both',
      say: '朱熹确实说草木器物都有理、都可以格，二程也说"一草一木皆有理，須是察"。但格物的重心是人事；方法是"因其已知之理而益窮之"，不是对着一样东西苦思。',
    },
    wang: {
      ans: 'ask',
      say: '王阳明的"心即理"主要是关于道德的理。对于"名物度數、草木鳥獸之類"，他说"其所當知的，聖人自能問人"：这类知识要向别人学习。',
    },
    note: '格竹子的故事常被用来说明朱熹行不通。但SEP的Wang Yangming条目问：对着竹子苦思七天，真的是朱熹说的格物吗？这个故事也指出了一个真实困难：从一竿竹子的理，怎样过渡到成为一个好人？',
  },
  mingwu: {
    name: '名物度数',
    q: '礼仪器物的具体规定（名物度数），该怎样知道？',
    zhu: {
      ans: 'both',
      say: '读书讲论是格物的一部分：要"窮盡得到十分"。朱熹在"道问学"上说得多一些。',
    },
    wang: {
      ans: 'ask',
      say: '"其所當知的，聖人自能問人"：具体的经验知识，圣人也要向别人学习。这一点常被忽视，却正是"心即理"不等于"主观主义"的关键。',
    },
    note: '在这一类知识上，两人的距离比通常说的小。分歧在于：这类知识和成为好人有什么关系。',
  },
};

const TABLE: [string, string, string][] = [
  ['理在哪里？', '在物中，也在心中的性中（"性即理"）；外物之理和我性之理是同一个理', '在心中（"心即理"）；道德的理不在对象身上'],
  ['心和理的关系', '心能知理，但心不就是理；心可能被气质和私欲遮蔽', '心的本体就是理；被私欲遮蔽的心不是心的本体'],
  ['理是不是人人相同？', '是（"理一"）', '是（"同此心同此理"）'],
  ['修养的方法', '格物穷理，读书讲论，持敬', '先立乎其大者；致良知；在意念上为善去恶'],
  ['"格物"的意思', '至于物、穷尽物的理', '正其不正（端正意念）'],
  ['对对方的担心', '只讲本心，会把私意当作天理，流于禅', '只求外物，会"支离"，知识增加了，德性却没有提高'],
];
const ROWNOTE: Record<number, string> = {
  2: '第三行：双方都认为理是普遍的、人人相同的。所以"主观唯心主义"和"客观唯心主义"的标签不适用。',
  3: '第四、五行是真正的分歧：认识理的途径，是研究事物和经典，还是回到和扩充自己的本心？',
  4: '第四、五行是真正的分歧：认识理的途径，是研究事物和经典，还是回到和扩充自己的本心？',
  5: '第六行：双方各自看到了对方的真实危险。',
};

const DIAGS: { id: Diag; text: string; ans: Side; why: string }[] = [
  {
    id: 'a',
    text: '一个学生读了很多讲孝道的书，能背出各种礼仪规定，对父母却冷淡。',
    ans: 'wang',
    why: '这是陆王对朱熹一方的担心：学问变成书本知识，"支离"，和道德实践脱节。朱熹一方会回答：这样的学生还没有"豁然贯通"，也没有做到"尽其孝"。',
  },
  {
    id: 'b',
    text: '一个人说："我的良知告诉我，这样做就是对的。"其实只是他自己的私意。',
    ans: 'zhu',
    why: '这是朱熹一方对陆王的担心：只讲本心，会把私意当作天理。王阳明一方会回答：被私欲遮蔽的心不是心的本体；谁来检验"良知"是不是真的良知，确实是一个难题。',
  },
  {
    id: 'c',
    text: '两个朋友对着亭前的竹子日夜苦思，七天后都病倒了。',
    ans: 'neither',
    why: '这不是朱熹说的格物："格物，莫先於五品"，而且要从已知的理出发逐步推进。这个故事更多反映了当时一般读书人对格物说的理解（或误解）；它不是陆王对朱熹的公平批评，也不是朱熹一方的担心。',
  },
];
const SIDE: Record<Side, string> = { zhu: '朱熹一方对陆王的担心', wang: '陆王对朱熹一方的担心', neither: '都不是：一个误解' };

export default function ZhuWangWorkshop() {
  const [st, save] = useSaved<Saved>(ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const c = CASES[st.c] ? st.c : 'fuzai';
  const cs = CASES[c];
  const gz = st.guess[c + ':zhu'];
  const gw = st.guess[c + ':wang'];
  const shown = gz !== undefined && gw !== undefined;

  return (
    <section className="md c3 c5" aria-labelledby="zw-title">
      <header className="md-head">
        <p className="md-tag">比较工作坊 · 同一个问题</p>
        <h3 id="zw-title" className="md-title">
          孝的理在哪里？朱熹和王阳明
        </h3>
        <p className="md-lede">先猜一猜每个人会把"理"放在哪里，再看双方的回答。每一个案例都给出双方的长处和对方的担心：这里不判输赢。</p>
      </header>

      <Seg
        name="zw-case"
        label="选择一个案例"
        value={c}
        opts={(Object.keys(CASES) as Case[]).map((k) => [k, CASES[k].name] as const)}
        onPick={(v) => set({ c: v })}
      />
      <p className="md-fb-k">{cs.q}</p>
      <div className="c3-two">
        {(['zhu', 'wang'] as const).map((side) => (
          <div key={side} className="c2-card">
            <p className="g4-k">{side === 'zhu' ? '朱熹会把理放在哪里？' : '王阳明会把理放在哪里？'}</p>
            <Seg
              name={`zw-${c}-${side}`}
              col
              label={side === 'zhu' ? '朱熹' : '王阳明'}
              value={st.guess[`${c}:${side}`] ?? null}
              opts={(Object.keys(WHERE) as Where[]).map((k) => [k, WHERE[k]] as const)}
              onPick={(v) => set({ guess: { ...st.guess, [`${c}:${side}`]: v } })}
            />
          </div>
        ))}
      </div>

      {shown ? (
        <div aria-live="polite">
          <div className="c3-two">
            {(['zhu', 'wang'] as const).map((side) => {
              const x = cs[side];
              const g = side === 'zhu' ? gz : gw;
              return (
                <div key={side} className="c2-card">
                  <p className="g4-k">
                    {side === 'zhu' ? '朱熹' : '王阳明'}：{WHERE[x.ans]}
                  </p>
                  <p>
                    <span className={'c5-verdict ' + (g === x.ans ? 'c5-verdict--ok' : 'c5-verdict--no')}>{g === x.ans ? '你的猜测和本课一致' : '本课的读法不同'}</span>
                  </p>
                  {x.orig && <Gu src={x.src!} orig={x.orig} />}
                  <p>{x.say}</p>
                </div>
              );
            })}
          </div>
          <div className="md-feedback">
            <p>{cs.note}</p>
          </div>
        </div>
      ) : (
        <p className="md-muted">两边都选好以后，显示双方的回答。</p>
      )}

      <p className="c3-layer-k">比较表：点一行看它说明什么</p>
      <div className="c2-scroll">
        <table className="c2-grid">
          <thead>
            <tr>
              <th scope="col">问题</th>
              <th scope="col">朱熹</th>
              <th scope="col">陆九渊、王阳明</th>
            </tr>
          </thead>
          <tbody>
            {TABLE.map(([q, z, w], i) => (
              <tr key={i} className={st.row === i ? 'is-on' : undefined}>
                <th scope="row">
                  <button type="button" className="md-disclose" aria-pressed={st.row === i} onClick={() => set({ row: st.row === i ? null : i })}>
                    {q}
                  </button>
                </th>
                <td>{z}</td>
                <td>{w}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="md-muted" aria-live="polite">
        {st.row !== null && ROWNOTE[st.row] ? ROWNOTE[st.row] : '点第三行"理是不是人人相同？"。'}
      </p>

      <p className="c3-layer-k">诊断：这是谁的担心？</p>
      <div className="c5-rows">
        {DIAGS.map((d) => {
          const v = st.diag[d.id];
          return (
            <div key={d.id} className="c5-row">
              <p>{d.text}</p>
              <Seg
                name={`zw-d-${d.id}`}
                label="这是谁的担心"
                value={v ?? null}
                opts={(Object.keys(SIDE) as Side[]).map((k) => [k, SIDE[k]] as const)}
                onPick={(x) => set({ diag: { ...st.diag, [d.id]: x } })}
              />
              {v && (
                <p aria-live="polite">
                  <span className={'c5-verdict ' + (v === d.ans ? 'c5-verdict--ok' : 'c5-verdict--no')}>{v === d.ans ? '和本课的读法一致' : `本课的读法：${SIDE[d.ans]}`}</span>
                  {d.why}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <Limits>
        <p>案例中朱熹一方的回应，有的是本课根据朱熹的文本作的推断：朱熹没有读过王阳明。陆九渊和王阳明在表中合为一栏，但两人并不完全相同。</p>
        <p>三个选项是为了比较而作的简化。朱熹说理"在物中"，不是说理是物的一种物理属性；王阳明说"心即理"，也不是说理只是我个人的想法。</p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
