import { Gu, Seg, SrcToggle, useSaved } from './shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import './cn2.css';

// 三 · after "两种名：看形貌的名与看处所的名". Three tasks, each on passages the
// chapter has just read:
//  一 the four kinds of 同 (经上/经说上), sorting pairs, the last of which
//     ("both have teeth") leads into
//  二 狂举 (经说下, B66): which feature can show that 牛 and 马 are of
//     different kinds, then three everyday arguments;
//  三 naming by 形貌 or by 居运 (大取), with a third standard the text does not
//     mention, and what happens when the context changes.
// Answers come with reasons; where the text is corrupt or the example is the
// course's own, the feedback says so.

const ID = 'classification-lab';
type Task = 'tong' | 'kuang' | 'ming';

type Tong = 'chong' | 'ti' | 'he' | 'lei';
const TONG: [Tong, string][] = [
  ['chong', '重同'],
  ['ti', '体同'],
  ['he', '合同'],
  ['lei', '类同'],
];
const TONG_DEF: Record<Tong, string> = {
  chong: '"二名一實，重同也"：两个名，一个实。',
  ti: '"不外於兼，體同也"：同属一个整体。',
  he: '"俱處於室，合同也"：同在一处。',
  lei: '"有以同，類同也"：有某个方面相同。',
};
const PAIRS: { id: string; t: string; a: Tong; why: string; own?: boolean }[] = [
  { id: 'gou', t: '"狗"与"犬"', a: 'chong', why: '《经下》"知狗而自謂不知犬，過也，說在重"：狗和犬是同一个实的两个名。' },
  { id: 'lx', t: '"鲁迅"与"周树人"', a: 'chong', why: '一个人，两个名字。', own: true },
  { id: 'hand', t: '一只手的五个手指', a: 'ti', why: '它们都是同一只手的部分。', own: true },
  { id: 'room', t: '同一间教室里的学生', a: 'he', why: '他们只是同在一处，不一定有什么共同之处。', own: true },
  { id: 'horse', t: '白马与黑马', a: 'lei', why: '它们在"是马"这一方面相同。', own: true },
  { id: 'teeth', t: '牛与马（都有牙齿）', a: 'lei', why: '有一个方面相同，就可以说"类同"。可是照这个定义，任何两样东西都有某个方面相同。下一项任务看后期墨家怎样处理这个问题。' },
];

type Feat = 'chi' | 'wei' | 'jiao' | 'zu';
const FEAT: [Feat, string][] = [
  ['chi', '牛有齿'],
  ['wei', '马有尾'],
  ['jiao', '牛有角'],
  ['zu', '牛有四足'],
];
const FEAT_TABLE: Record<Feat, [string, boolean, boolean]> = {
  chi: ['齿', true, true],
  wei: ['尾', true, true],
  jiao: ['角', true, false],
  zu: ['四足', true, true],
};
const FEAT_FB: Record<Feat, string> = {
  chi: '牛有齿是真的，但马也有齿。"是俱有，不偏有、偏無有"：两者都有，不是一方有、一方没有，所以不能用来说明牛不是马。用它来分类，就是"狂舉"。',
  wei: '马有尾是真的，但牛也有尾。经说正是用"牛有齒，馬有尾"作为"狂舉"的例子。',
  jiao: '经说的答案："牛與馬不類，用牛有角，馬無角。是類不同也。"一方有、一方没有（"偏有偏無有"），才能用来说明类的不同。',
  zu: '经说没有举这个例子，但道理相同：牛马都有四足，不能用来区分它们。（这一项是本课补充的。）',
};

type K = 'kuang' | 'ok';
const ARGS: { id: string; t: string; a: K; why: string }[] = [
  {
    id: 'firm',
    t: '"甲公司的产品比乙公司的好，因为甲公司的员工很努力。"（已知乙公司的员工也很努力。）',
    a: 'kuang',
    why: '"员工努力"两家都有，没有说出两家的差别，是正文举的"狂举"的例子。',
  },
  {
    id: 'city',
    t: '"这个城市犯罪率高，因为这里有很多年轻人。"（已知犯罪率低的城市，年轻人一样多。）',
    a: 'kuang',
    why: '"年轻人多"两类城市都有，不能用来解释它们的差别。这也是正文的例子。',
  },
  {
    id: 'whale',
    t: '"鲸和鲨鱼不是一类动物：鲸用肺呼吸，鲨鱼用鳃呼吸。"',
    a: 'ok',
    why: '一方有、一方没有，符合"偏有偏無有"的要求。但要注意：后期墨家只说了"狂举"不行，没有说凡是"偏有偏无"的特征都可以用来分类。这个特征是否和我们分类的目的相关，是另一个问题。（例子是本课的。）',
  },
];

type M = 'xm' | 'jy' | 'other';
const MING: [M, string][] = [
  ['xm', '以形貌命'],
  ['jy', '以居运命'],
  ['other', '两者都不是'],
];
const NAMES: { id: string; t: string; a: M; why: string; own?: boolean }[] = [
  { id: 'shan', t: '山、丘', a: 'xm', why: '《大取》："諸以形貌命者，若山丘室廟者，皆是也。"' },
  { id: 'qi', t: '齐人、楚人', a: 'jy', why: '《大取》："諸以居運命者，若鄉里齊荆者，皆是。"进入那个地方就是，离开了就不是。' },
  { id: 'tall', t: '儿童票：身高 1.2 米以下', a: 'xm', why: '按身高，看的是长什么样。', own: true },
  { id: 'local', t: '本地居民优惠', a: 'jy', why: '看住在哪里，搬走了就不再是。', own: true },
  { id: 'age', t: '儿童票：12 岁以下', a: 'other', why: '年龄既不是形貌，也不是居处。《大取》只列了两种命名的标准，日常的分类还有许多别的标准。正文的儿童票例子说的就是：两个售票员用的标准不同，争的其实不是同一件事。', own: true },
];

interface Saved {
  task: Task;
  tong: Record<string, Tong>;
  feat: Feat | null;
  args: Record<string, K>;
  ming: Record<string, M>;
  move: 'still' | 'not' | null;
}
const INIT: Saved = { task: 'tong', tong: {}, feat: null, args: {}, ming: {}, move: null };

export default function ClassificationLab() {
  const [st, save] = useSaved<Saved>(ID, INIT);
  const tongDone = PAIRS.filter((p) => st.tong[p.id]).length;
  const mingDone = NAMES.filter((n) => st.ming[n.id]).length;

  return (
    <section className="md c2" aria-labelledby="cl-title">
      <header className="md-head">
        <p className="md-tag">名与类实验室</p>
        <h3 id="cl-title" className="md-title">
          怎样才算"同类"：同异、狂举与命名的标准
        </h3>
        <p className="md-lede">
          三项任务，都用正文刚读过的经文：先分清四种"同"；再看什么样的特征能把两类东西分开；最后看命名的标准怎样随场合改变。每一步都有理由说明，不只是对错。
        </p>
      </header>

      <Seg
        name="cl-task"
        label="任务"
        value={st.task}
        opts={[
          ['tong', '一、四种"同"'],
          ['kuang', '二、狂举'],
          ['ming', '三、命名的标准'],
        ]}
        onPick={(v) => save({ ...st, task: v })}
      />

      {st.task === 'tong' && (
        <div className="g4-panel">
          <Gu src="《墨子·经说上》" orig="同，二名一實，重同也。不外於兼，體同也。俱處於室，合同也。有以同，類同也。" />
          <p className="md-muted">每一对属于哪一种"同"？已判断 {tongDone} / {PAIRS.length}。</p>
          {PAIRS.map((p) => {
            const v = st.tong[p.id];
            return (
              <fieldset key={p.id} className="cs-group g4-case">
                <legend>
                  {p.t}
                  {p.own && <span className="c2-own">（本课的例子）</span>}
                </legend>
                <Seg name={'cl-t-' + p.id} value={v} opts={TONG} onPick={(t) => save({ ...st, tong: { ...st.tong, [p.id]: t } })} />
                {v && (
                  <div className="md-feedback" aria-live="polite">
                    <p className="md-fb-k">{v === p.a ? `对：${TONG.find((x) => x[0] === p.a)![1]}。` : `更接近"${TONG.find((x) => x[0] === p.a)![1]}"。`}</p>
                    <p>
                      {TONG_DEF[p.a]}
                      {p.why}
                    </p>
                    {v !== p.a && <p className="md-muted">你选的"{TONG.find((x) => x[0] === v)![1]}"是指：{TONG_DEF[v]}</p>}
                  </div>
                )}
              </fieldset>
            );
          })}
          {tongDone === PAIRS.length && (
            <div className="md-feedback">
              <p className="md-fb-k">"一样"有好几种</p>
              <p>当有人说"A 和 B 是一样的"，先问是哪一种一样。两样东西"类同"，不等于"重同"；同在一处（"合同"），也不说明有什么共同之处。"类同"的定义又特别宽：只要有一个方面相同就行。下一项任务看后期墨家怎样防止它变得什么都能装。</p>
              <button type="button" className="btn btn--small" onClick={() => save({ ...st, task: 'kuang' })}>
                去任务二
              </button>
            </div>
          )}
        </div>
      )}

      {st.task === 'kuang' && (
        <div className="g4-panel">
          <Gu
            src="《墨子·经说下》"
            orig="狂，牛與馬惟異，以牛有齒、馬有尾，說牛之非馬也，不可。是俱有，不偏有、偏無有。曰：「牛與馬不類，用牛有角，馬無角。」是類不同也。"
          />
          <table className="g4-table">
            <thead>
              <tr>
                <th scope="col">特征</th>
                <th scope="col">牛</th>
                <th scope="col">马</th>
              </tr>
            </thead>
            <tbody>
              {FEAT.map(([f]) => {
                const [n, a, b] = FEAT_TABLE[f];
                return (
                  <tr key={f} className={st.feat === f ? 'is-mine' : undefined}>
                    <th scope="row">{n}</th>
                    <td>{a ? '有' : '没有'}</td>
                    <td>{b ? '有' : '没有'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <fieldset className="cs-group">
            <legend>要说明"牛和马不是一类"，可以用哪一个理由？</legend>
            <Seg name="cl-feat" value={st.feat} opts={FEAT} onPick={(f) => save({ ...st, feat: f })} />
          </fieldset>
          {st.feat && (
            <div className="md-feedback" aria-live="polite">
              <p className="md-fb-k">{st.feat === 'jiao' ? '对。' : '这是"狂举"。'}</p>
              <p>{FEAT_FB[st.feat]}</p>
            </div>
          )}

          <p className="g4-h">今天的三个说法：是不是"狂举"？</p>
          {ARGS.map((x) => {
            const v = st.args[x.id];
            return (
              <fieldset key={x.id} className="cs-group g4-case">
                <legend>{x.t}</legend>
                <Seg
                  name={'cl-a-' + x.id}
                  value={v}
                  opts={[
                    ['kuang', '是狂举'],
                    ['ok', '不是狂举'],
                  ]}
                  onPick={(k) => save({ ...st, args: { ...st.args, [x.id]: k } })}
                />
                {v && (
                  <div className="md-feedback">
                    <p className="md-fb-k">{v === x.a ? '对。' : x.a === 'kuang' ? '更像是狂举。' : '不算狂举。'}</p>
                    <p>{x.why}</p>
                  </div>
                )}
              </fieldset>
            );
          })}
        </div>
      )}

      {st.task === 'ming' && (
        <div className="g4-panel">
          <Gu
            src="《墨子·大取》（节引）"
            orig="諸以居運命者，苟入於其中者，皆是也；去之，因非也。諸以居運命者，若鄉里齊荆者，皆是。諸以形貌命者，若山丘室廟者，皆是也。"
          />
          <p className="md-muted">这段文字有讹误，前面两句（这里没有引）的读法尤其不确定；这里只用正文认为比较清楚的后几句。已判断 {mingDone} / {NAMES.length}。</p>
          {NAMES.map((n) => {
            const v = st.ming[n.id];
            return (
              <fieldset key={n.id} className="cs-group g4-case">
                <legend>
                  {n.t}
                  {n.own && <span className="c2-own">（本课的例子）</span>}
                </legend>
                <Seg name={'cl-m-' + n.id} value={v} opts={MING} onPick={(m) => save({ ...st, ming: { ...st.ming, [n.id]: m } })} />
                {v && (
                  <div className="md-feedback">
                    <p className="md-fb-k">{v === n.a ? '对。' : `更接近"${MING.find((x) => x[0] === n.a)![1]}"。`}</p>
                    <p>{n.why}</p>
                  </div>
                )}
              </fieldset>
            );
          })}
          <fieldset className="cs-group">
            <legend>场合变了：一个齐人搬到楚国住下，照《大取》的说法，他还是"齐人"吗？</legend>
            <Seg
              name="cl-move"
              value={st.move}
              opts={[
                ['still', '还是齐人'],
                ['not', '不再是齐人'],
              ]}
              onPick={(m) => save({ ...st, move: m })}
            />
          </fieldset>
          {st.move && (
            <div className="md-feedback" aria-live="polite">
              <p className="md-fb-k">{st.move === 'not' ? '照这里的说法，不再是。' : '照这里的说法，他不再是齐人。'}</p>
              <p>"苟入於其中者，皆是也；去之，因非也"：以居运命名的，进入就是，离开就不是。可是一座山搬不走，看它长什么样就够了。日常生活中我们说"他是齐人"，常常指出身而不是现在的住处：这就又换了一个标准。同一个名，在不同的场合按不同的标准使用，争论就容易各说各话。</p>
            </div>
          )}
        </div>
      )}

      <SrcToggle label='看"同"的经文（《经上》）'>
        <Gu src="《墨子·经上》" orig="同，重、體、合、類。" zh="同有四种：重同、体同、合同、类同。《经上》接着列出对应的四种异：二、不体、不合、不类。" />
      </SrcToggle>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        恢复初始状态
      </button>
      <p className="md-note">
        <b>这个练习的限度。</b>后期墨家的经文残缺、讹误很多，这里只用正文认为文字比较清楚的几条；标明"本课的例子"的，是今天的补充，不是经文的内容。后期墨家的分类建立在相似和差异上，不是建立在"本质"或必要充分条件的定义上；这个练习的选项是为了练习而简化的，实际的分类常常需要同时考虑好几个标准。
      </p>
    </section>
  );
}
