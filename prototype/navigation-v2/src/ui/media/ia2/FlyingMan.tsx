import { Band, Claim, Limits, OrigSrc, Seg, useSavedIx, Verdict } from '../ia1/shared';

// 五 · after "所以，不要把飞人读成'证明了灵魂不朽'的论证" (the Descartes table
// follows in the text). 1. Build the setup: each condition removes one channel
// of awareness of the body. 2. Which of three conclusions does the passage
// support? 3. The morning-star objection and the reply. The Arabic and
// translations are the chapter's own (Forget 1892, pp. 119–120, notes 29–32).

const ID = 'flying-man';

const SETUP: { k: string; t: string; gone: string }[] = [
  { k: 'new', t: '刚被造出来', gone: '对身体的记忆' },
  { k: 'sound', t: '理智和身体都是健全的', gone: '"他只是昏迷了"的解释' },
  { k: 'see', t: '看不见自己的各个部分', gone: '视觉对身体的感知' },
  { k: 'apart', t: '肢体彼此不相接触，分开', gone: '触觉对身体的感知（手碰到腿）' },
  { k: 'air', t: '悬浮在开阔的空气中', gone: '触觉对外物的感知（没有地面，空气不冷不热）' },
  { k: 'moment', t: '只有"某一刻"', gone: '通过呼吸等方式渐渐感觉到身体' },
];

type Level = 'weak' | 'mid' | 'strong';
const LEVEL: Record<Level, { t: string; ok: boolean; s: string }> = {
  weak: { t: '对自己的意识不依赖于对身体的意识', ok: true, s: '这是飞人最直接支持的结论：在设想中，他意识到"我在"，却意识不到任何身体。' },
  mid: { t: '"我"不等同于身体或身体的任何部分', ok: true, s: '这是第 120 页那段话的意思："你所意识到的，是与这些东西不同的另一个东西"。下面的"晨星"反驳针对的就是这一步。' },
  strong: { t: '灵魂是不依赖身体的非物质实体，死后仍然存在', ok: false, s: '阿维森纳自己把飞人称作一种"提醒"（tanbīh），不是严格的证明；灵魂非物质和不朽，他用别的论证（例如普遍概念不可分）来证明。' },
};

type Reply = 'yes' | 'no';
interface Saved {
  on: Record<string, boolean>;
  level: Level | null;
  reply: Reply | null;
}
const INIT: Saved = { on: {}, level: null, reply: null };

export default function FlyingMan() {
  const [st, save] = useSavedIx<Saved>('IA2', ID, INIT);
  const set = (x: Partial<Saved>) => save({ ...st, ...x });
  const on = st.on ?? {};
  const left = SETUP.filter((s) => !on[s.k]);
  const all = left.length === 0;

  return (
    <section className="md c3 c5" aria-labelledby="fm-title">
      <header className="md-head">
        <p className="md-tag">飞人 · 思想实验</p>
        <h3 id="fm-title" className="md-title">
          去掉一切对身体的感觉，还剩下什么？
        </h3>
        <p className="md-lede">逐一加上阿维森纳的设定，看每一个设定排除了哪一种对身体的意识；再判断这段话能支持哪一个层次的结论。这是想象中的反省，不是可以做的实验。</p>
      </header>

      <OrigSrc
        src="阿维森纳《指要与诠解》第三指要，Forget 本第 119 页"
        lang="ar"
        orig="ولو توهّمت ذاتك قد خلقت اوّل خلقها صحيحة العقل والهيئة وفرض انّها على جملة من الوضع والهيئة بحيث لا تبصر اجزاؤها ولا تتلامس اعضاؤها بل هي منفرجة ومعلّقة لحظة مّا في هواء طلق وجدتها قد غفلت عن كلّ شيء الّا عن ثبوت انّيّتها"
        zh="如果你设想你自己在刚被造出来的时候，理智和身体都是健全的，并且假定它处在这样的姿势和状态中：它看不见自己的各个部分，它的肢体彼此不相接触，而是分开的，在某一刻悬浮在开阔的空气中；你会发现，它对一切都没有意识，只除了对它自己的“是”的确定。"
      />

      <Band>一 · 加上设定</Band>
      <div className="v21-checks">
        {SETUP.map((s) => (
          <label key={s.k} className="v21-check">
            <input type="checkbox" checked={!!on[s.k]} onChange={(e) => set({ on: { ...on, [s.k]: e.target.checked } })} />
            <span>
              {s.t}
              <small>排除：{s.gone}</small>
            </span>
          </label>
        ))}
      </div>
      <div className="v21-aware" aria-live="polite">
        <p>
          <b>他还可能意识到：</b>
        </p>
        <ul>
          {SETUP.map((s) => (
            <li key={s.k} className={on[s.k] ? 'is-gone' : undefined}>
              {s.gone}
            </li>
          ))}
          <li>自己的"是"（anniyya）</li>
        </ul>
        <p className="md-muted">{all ? '六个设定都加上了：剩下的只有对自己的"是"的确定。' : `还有 ${left.length} 个设定没有加上。`}</p>
      </div>

      <Band>二 · 这段话支持哪一个结论？</Band>
      {all ? (
        <OrigSrc
          src="阿维森纳《指要与诠解》第三指要，Forget 本第 120 页"
          lang="ar"
          orig="فمدركك شيء آخر غير هذه الاشياء التي قد لا تدركها وانت مدرك لذاتك والتي لا تجدها ضروريّة في ان تكون انت انت"
          zh="所以，你所意识到的［那个东西］，是与这些东西不同的另一个东西：这些东西，你在意识到你自己的时候可能意识不到，而且你发现，它们对于“你是你”并不是必需的。"
        />
      ) : (
        <p className="md-muted">先把六个设定都加上。</p>
      )}
      <Seg name="fm-level" label="选择一个层次的结论" value={st.level} col opts={(Object.keys(LEVEL) as Level[]).map((k) => [k, LEVEL[k].t] as const)} onPick={(v) => set({ level: v as Level })} />
      {st.level && (
        <p className="md-feedback" aria-live="polite">
          <Verdict ok={LEVEL[st.level].ok} yes="飞人支持这一层" no="飞人本身不支持这一层" />
          {LEVEL[st.level].s}
        </p>
      )}

      <Band>三 · 晨星与昏星</Band>
      <p>
        一个人可以知道"晨星是明亮的"而不知道"昏星是明亮的"，但晨星和昏星是同一颗星（金星）。同样，飞人可以意识到自己而意识不到自己的身体，这本身能否证明他的"自己"不是他的身体（或大脑）？
      </p>
      <Seg
        name="fm-reply"
        label="你的判断"
        value={st.reply}
        col
        opts={[
          ['no', '不能：意识到 A 而没有意识到 B，推不出 A 不是 B'],
          ['yes', '能：飞人发现身体对"你是你"不是必需的'],
        ]}
        onPick={(v) => set({ reply: v as Reply })}
      />
      {st.reply && (
        <div aria-live="polite">
          <Claim b="course" who={st.reply === 'no' ? '批评者' : '阿维森纳的支持者'}>
            {st.reply === 'no'
              ? '这个批评后来常被用来反对笛卡尔：认识上的区分不等于事物的区分。它对第二层结论构成真正的挑战。'
              : '飞人所说的不只是"没有意识到身体"，而是发现身体“对于‘你是你’并不是必需的”；这已经是关于自我本质的主张。'}
          </Claim>
          <Claim b="course" who="还要回答的问题">
            {st.reply === 'no' ? '阿维森纳的支持者会说，引文说的是"不是必需的"，而不只是"没有意识到"；批评者需要说明这个区别为什么不重要。' : '我们能否通过反省知道什么对于"我是我"是必需的？如果不能，这个回答就不成功。'}
          </Claim>
          <p className="md-muted">这个争论没有定论，这里不判对错。</p>
        </div>
      )}

      <Limits>
        <p>
          <b>飞人不是"证明了灵魂不朽"的论证，也不是一个可以做的实验。</b>它是一种"提醒"，请读者在想象中反省；今天的感觉剥夺实验也不能检验它，因为被试仍有记忆、呼吸和心跳的感觉。与笛卡尔的比较见下文。
        </p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
