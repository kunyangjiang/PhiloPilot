import { useState, type KeyboardEvent } from 'react';
import { getMedia, setMedia } from '../../../state/store';
import './in1.css';

// 二 · after the four Upaniṣadic dialogues. The learner steps through one
// dialogue at a time and says what each move does (asks, claims or answers,
// gives an example, objects, or stops the questioning) before seeing the
// chapter's analysis. Every move, reference, Sanskrit line and translation is
// taken from content/IN1_SAMPLE_DRAFT.md, part 二; no line of dialogue is
// added. The classification is the chapter's analysis of a narrative text,
// so feedback says “本章的分析”, never “correct”. Nothing is scored.

type Kind = 'ask' | 'claim' | 'example' | 'object' | 'stop';
const KINDS: [Kind, string][] = [
  ['ask', '提问或追问'],
  ['claim', '提出主张或回答'],
  ['example', '举例或类推'],
  ['object', '反驳或质疑'],
  ['stop', '制止追问'],
];
const KIND_NAME = Object.fromEntries(KINDS) as Record<Kind, string>;
const KIND_SHORT: Record<Kind, string> = { ask: '提问', claim: '主张', example: '举例', object: '反驳', stop: '制止' };

interface Move {
  ref: string;
  who: string;
  /** What is said, in the chapter's translation or paraphrase. */
  zh: string;
  /** Sanskrit, only where the chapter quotes it. */
  sa?: string;
  /** The chapter's reading of the move; more than one where the move does two things. */
  kind: Kind[];
  why: string;
}

interface Track {
  id: string;
  title: string;
  text: string;
  moves: Move[];
  /** Where the chapter finds the dialogue's reasoning weakest or most open. */
  weak: string;
}

const TRACKS: Track[] = [
  {
    id: 'uddalaka',
    title: '乌达拉迦与白净',
    text: '《歌者奥义书》第六章',
    moves: [
      {
        ref: '6.1.3',
        who: '乌达拉迦',
        zh: '你现在这样心高气傲……那么，你有没有问过那一种教导：靠着它，没听过的成了听过的，没想过的成了想过的，没认识的成了认识的？',
        sa: "śvetaketo yan nu somyedaṃ mahāmanā anūcānamānī stabdho 'si | uta tam ādeśam aprākṣyaḥ yenāśrutaṃ śrutaṃ bhavaty amataṃ matam avijñātaṃ vijñātam iti |",
        kind: ['ask'],
        why: '父亲用一个问题打开课程：有没有一种知识，认识了它就认识了一切？后面的例子都在回答这个问题。',
      },
      {
        ref: '6.1.4',
        who: '乌达拉迦',
        zh: '正如凭一块泥土，一切泥做的东西都可以被认识：变化只是言语的把握，只是名称；“泥土”才是真实的。',
        sa: 'yathā somyaikena mṛtpiṇḍena sarvaṃ mṛnmayaṃ vijñātaṃ syāt | vācārambhaṇaṃ vikāro nāmadheyaṃ mṛttikety eva satyam ||',
        kind: ['example'],
        why: '这是类推的第一步：从泥土和泥器推到世界和它的根本。本章把它整理成五步论证，关键在第五步的类推。',
      },
      {
        ref: '6.2.1',
        who: '乌达拉迦（引述“有些人”）',
        zh: '起初，这个世界就是“有”，唯一，没有第二个。有些人说：起初，这个世界是“无”……于是从“无”生出了“有”。',
        kind: ['claim'],
        why: '先提出自己的主张，再引述对手的主张。“有些人”是谁，原文没有说，不能和某个已知的学派对上号。',
      },
      {
        ref: '6.2.2',
        who: '乌达拉迦',
        zh: '可是，亲爱的，这怎么可能呢？“有”怎么能从“无”中生出来？',
        sa: 'kutas tu khalu somyaivaṃ syād iti hovāca | katham asataḥ saj jāyeta | sat tv eva somyedam agra āsīd ekam evādvitīyam ||',
        kind: ['object'],
        why: '用一个反问驳倒对手：从无中不能生出有。这是早期奥义书中少有的一段明确的反驳。',
      },
      {
        ref: '6.12.1—2',
        who: '乌达拉迦与白净',
        zh: '剖开榕树的种子，“什么也看不见”。正是从这个看不见的细微之物中，大榕树才得以挺立。“要相信，亲爱的。”',
        kind: ['example'],
        why: '又一个从可见推到不可见的例子。结尾的“要相信”值得注意：类推在这里也许需要信任来补足（这是本章的分析）。',
      },
      {
        ref: '6.13.1—2',
        who: '乌达拉迦与白净',
        zh: '把盐放进水里，第二天找不到了；可是水的每一处都是咸的。“你在这里看不见它，可它确实就在这里。”',
        sa: "lavaṇam etad udake 'vadhāyātha mā prātar upasīdathā iti | sa ha tathā cakāra | taṃ hovāca | yad doṣā lavaṇam udake 'vādhā aṅga tad āhareti | tad dhāvamṛśya na viveda ||",
        kind: ['example'],
        why: '盐“看不见”但“尝得到”：看不见不等于不存在。这是整组类推中最巧妙的一个，也正是缺口所在（见下面的小结）。',
      },
      {
        ref: '6.13.3',
        who: '乌达拉迦',
        zh: '这个最细微的东西，整个世界都以它为自身。它是真实的。它就是自身。那就是你，白净。',
        sa: "sa ya eṣo 'ṇimaitad ātmyam idaṃ sarvam | tat satyam | sa ātmā | tat tvam asi śvetaketo iti ||",
        kind: ['claim'],
        why: '结论。tat tvam asi 至少有三种读法（同一性、本质、生命力），它们是后来的读者提出的，原文本身只说了这一句。',
      },
    ],
    weak: '本章的分析：盐可以用另一种感官（味觉）检验，而乌达拉迦所说的细微本质却没有任何感官可以直接检验。所以类推最多表明“看不见的东西可能存在”，而不能证明“这个看不见的东西存在，而且就是你”。',
  },
  {
    id: 'maitreyi',
    title: '耶若婆佉与弥勒依',
    text: '《大森林奥义书》2.4',
    moves: [
      {
        ref: '2.4.2',
        who: '弥勒依',
        zh: '尊者，假如这整个大地连同它所有的财富都属于我，我会因此不死吗？',
        sa: 'yan nu ma iyaṃ bhagoḥ sarvā pṛthivī vittena pūrṇā syāt kathaṃ tenāmṛtā syām iti |',
        kind: ['ask'],
        why: '耶若婆佉要分配家产，弥勒依却把问题从“分到什么”转到“什么能让人不死”。',
      },
      {
        ref: '2.4.2',
        who: '耶若婆佉',
        zh: '不会。你的生活会像那些家资丰厚的人一样。可是，靠财富，没有希望得到不死。',
        sa: 'neti hovāca yājñavalkyaḥ | yathaivopakaraṇavatāṃ jīvitaṃ tathaiva te jīvitaṃ syāt | amṛtatvasya tu nāśāsti vitteneti ||',
        kind: ['claim'],
        why: '直接的回答，排除了一种可能：财富。',
      },
      {
        ref: '2.4.3',
        who: '弥勒依',
        zh: '不能让我不死的东西，我要它做什么？请把您所知道的告诉我吧。',
        kind: ['ask'],
        why: '整段对话的哲学起点：她拒绝了财产，提出了一个更根本的问题。',
      },
      {
        ref: '2.4.5',
        who: '耶若婆佉',
        zh: '丈夫之所以可爱，不是因为对丈夫的欲求，而是因为对自身的欲求……应当看见、听闻、思考、沉思的，是自身。',
        sa: 'na vā are patyuḥ kāmāya patiḥ priyo bhavaty ātmanas tu kāmāya patiḥ priyo bhavati | … ātmā vā are draṣṭavyaḥ śrotavyo mantavyo nididhyāsitavyo maitreyi |',
        kind: ['claim'],
        why: '核心主张，用一连串结构相同的句子说出。它可以读成“自私论”，也可以读成“一切以自身为根基”，本章认为原文有意利用了这种双关。',
      },
      {
        ref: '2.4.12',
        who: '耶若婆佉',
        zh: '一块盐投入水中就溶解了，无论从哪里取水都是咸的；这个伟大的存在是一团纯粹的认识。死后就没有意识了。',
        kind: ['example', 'claim'],
        why: '先举盐溶于水的例子（和乌达拉迦用的是同一个意象，用法不同），再提出一个令人吃惊的主张：死后没有意识。这一步同时在举例和主张。',
      },
      {
        ref: '2.4.13',
        who: '弥勒依',
        zh: '尊者说死后没有意识，正是在这里让我迷惑了。',
        kind: ['object'],
        why: '弥勒依没有接受，而是指出了困难。本章认为她的困惑是完全合理的。',
      },
      {
        ref: '2.4.13—14',
        who: '耶若婆佉',
        zh: '在仿佛有二元的地方，一个看另一个……当一切都成了自身的时候，凭什么去看谁？凭什么去认识那认识者呢？',
        sa: 'yatra hi dvaitam iva bhavati tad itara itaraṃ jighrati … yenedaṃ sarvaṃ vijānāti taṃ kena vijānīyāt | vijñātāram are kena vijānīyād iti ||',
        kind: ['claim'],
        why: '用一个论证回答质疑：认识需要两方面；一切都成了自身，就没有“另一方”；而认识者本身不能成为认识的对象。本章把它整理成五步。',
      },
    ],
    weak: '本章的分析：如果认识者不能被认识，耶若婆佉又凭什么知道它存在，还能说出这么多关于它的话？一种回答是他说的大多是否定的话（neti neti），另一种是对自身的知道是另一种方式的知道。哪一种成功，是一个开放的问题。',
  },
  {
    id: 'gargi',
    title: '伽尔吉的追问',
    text: '《大森林奥义书》3.6、3.8',
    moves: [
      {
        ref: '3.6.1',
        who: '伽尔吉',
        zh: '这一切都纵横交织在水上，那么水又织在什么上面？',
        kind: ['ask'],
        why: '一个层层递进的追问：每一层都需要一个更深的根基。',
      },
      {
        ref: '3.6.1',
        who: '耶若婆佉',
        zh: '风。（接着依次是空中世界、乾闼婆世界、太阳世界……一直到梵的世界。）',
        kind: ['claim'],
        why: '他一层一层地回答，每个回答都引出下一个“那么它又织在什么上面”。',
      },
      {
        ref: '3.6.1',
        who: '耶若婆佉',
        zh: '伽尔吉，别问得太过了，免得你的头掉下来！你是在追问一个不容再追问的神格。',
        sa: 'gārgi mātiprākṣīḥ | mā te mūrdhā vyapaptat | anatipraśnyāṃ vai devatām atipṛcchasi | gārgi mātiprākṣīr iti | tato ha gārgī vācaknavy upararāma ||',
        kind: ['stop'],
        why: '他用一个警告制止了追问，伽尔吉沉默了。这一步怎样评价，本章整理了两种可能的读法：它可能指出了一条原则（对根基的追问必须在某处停下），也可能是以势压人、用禁令代替论证。',
      },
      {
        ref: '3.8.2',
        who: '伽尔吉',
        zh: '就像迦尸或毗提诃的勇士，手持两支能射穿敌人的箭站起来，我也带着两个问题站到了你面前。',
        kind: ['ask'],
        why: '第二次发问，书中的写法变了：她先宣布辩论的条件，再提问。',
      },
      {
        ref: '3.8',
        who: '伽尔吉与耶若婆佉',
        zh: '天之上、地之下，以及过去、现在和将来，这一切织在什么上面？——在虚空上。那么，虚空又织在什么上面？',
        kind: ['ask', 'claim'],
        why: '一问一答，再追问一层。和第一次不同，这一次耶若婆佉没有制止她。',
      },
      {
        ref: '3.8.8',
        who: '耶若婆佉',
        zh: '伽尔吉，这就是婆罗门们所说的那“不灭者”。它不粗不细，不短不长……它什么也不吃，也没有谁吃它。',
        sa: 'etad vai tad akṣaraṃ gārgi brāhmaṇā abhivadanty asthūlam anaṇv ahrasvam adīrgham … na tad aśnāti kiṃ cana | na tad aśnāti kaś cana ||',
        kind: ['claim'],
        why: '这一次他作出了回答，而且是一连串否定的描述。这样，“无穷后退”在“不灭者”那里停了下来。',
      },
      {
        ref: '3.8.12',
        who: '伽尔吉',
        zh: '你们能向他行个礼脱身，就该知足了，你们谁也不会在关于梵的辩论上胜过他。',
        kind: ['claim'],
        why: '她宣布了辩论的结果。书中的伽尔吉既是敢于追问的辩论者，最终的作用又是确认耶若婆佉的胜利。',
      },
    ],
    weak: '本章的分析：第一次发问在“别问得太过”处中断，第二次在“不灭者”处得到回答。两次合在一起看，问题的形式是“无穷后退”：要么在某处停下，要么没有尽头。“不灭者”能不能真正止住追问，还是只是换了一种方式说“不要再问”，读者可以自己判断。',
  },
  {
    id: 'indra',
    title: '因陀罗与维罗遮那',
    text: '《歌者奥义书》8.7—12',
    moves: [
      {
        ref: '8.7.1',
        who: '生主',
        zh: '那个自身，它摆脱了罪恶，不老、不死、无忧、不饥、不渴……应当寻求它，应当认识它。',
        sa: "ya ātmā apahatapāpmā vijaro vimṛtyur viśoko vijighatso 'pipāsaḥ satyakāmaḥ satyasaṃkalpaḥ so 'nveṣṭavyaḥ sa vijijñāsitavyaḥ |",
        kind: ['claim'],
        why: '生主先给出一个标准：不老、不死、无忧。后面每一个答案，因陀罗都拿它来检验。',
      },
      {
        ref: '8.7.4',
        who: '生主',
        zh: '答案一：在眼睛里看见的那个人，就是自身；在水中、在镜中显现的，也是它。',
        kind: ['claim'],
        why: '第一个答案。维罗遮那接受了它，回去教导阿修罗崇敬身体、照料身体（8.8.4）。',
      },
      {
        ref: '8.9.1',
        who: '因陀罗',
        zh: '身体瞎了，它也就瞎了……身体毁灭，它也就随之毁灭。我看不出这有什么好处。',
        sa: "evam evāyam asminn andhe 'ndho bhavati srāme srāmaḥ parivṛkṇe parivṛkṇaḥ | asyaiva śarīrasya nāśam anv eṣa naśyati | nāham atra bhogyaṃ paśyāmīti ||",
        kind: ['object'],
        why: '用标准检验答案：身体会衰老和毁坏，不符合“不老、不死”。',
      },
      {
        ref: '8.10.1—2',
        who: '生主与因陀罗',
        zh: '答案二：在梦中四处游荡的那个，就是自身。——可是在梦里它仍然像是被人追打，甚至像是在哭泣。',
        kind: ['claim', 'object'],
        why: '第二个答案，以及对它的反驳：梦中的自我仍有忧苦，不符合“无忧”。',
      },
      {
        ref: '8.11.1',
        who: '因陀罗',
        zh: '答案三是深睡无梦的状态。——在这种状态里，他实在不知道自己“这就是我”……他简直进入了毁灭。',
        sa: 'nāha khalv ayam evaṃ saṃpraty ātmānaṃ jānāty ayam aham asmīti | no evemāni bhūtāni | vināśam evāpīto bhavati | nāham atra bhogyaṃ paśyāmīti ||',
        kind: ['object'],
        why: '深睡虽然没有忧苦，却也没有自我意识，于是“不死”变成了一种近乎毁灭的东西。',
      },
      {
        ref: '8.12.1—5',
        who: '生主',
        zh: '答案四：身体是会死的，却是那不死的自身的居所。那个知道“让我闻一闻”“让我想一想”的，是自身。',
        kind: ['claim'],
        why: '最后的答案：自身是一切感知和思考背后的“知者”。',
      },
    ],
    weak: '本章的分析：第四个答案原文说得很简略。“知者”和深睡状态的关系、“知者”离开身体以后是什么样子，书中都没有展开。另外，生主对前三个答案都说过“这就是梵”，他是在有意考验学生，还是故事吸收了不同时期的教导，两种读法都说得通。',
  },
];

const ID = 'dialogue-explorer';
type Saved = { track: string; picks: Record<string, Kind> };

export default function DialogueExplorer() {
  const [st, setSt] = useState<Saved>(() => getMedia<Saved>('IN1', ID, { track: 'uddalaka', picks: {} }));
  const [step, setStep] = useState(0);
  const [showSa, setShowSa] = useState(false);
  const track = TRACKS.find((t) => t.id === st.track) ?? TRACKS[0];
  const m = track.moves[step];
  const key = `${track.id}:${step}`;
  const pick = st.picks[key];
  const done = track.moves.every((_, i) => st.picks[`${track.id}:${i}`]);

  const save = (next: Saved) => {
    setSt(next);
    setMedia('IN1', ID, next);
  };
  const goTrack = (id: string) => {
    save({ ...st, track: id });
    setStep(0);
    setShowSa(false);
  };
  const goStep = (i: number) => {
    setStep(Math.max(0, Math.min(track.moves.length - 1, i)));
    setShowSa(false);
  };
  const onKey = (e: KeyboardEvent<HTMLOListElement>) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const t = Math.max(0, Math.min(track.moves.length - 1, step + d));
    goStep(t);
    e.currentTarget.querySelectorAll('button')[t]?.focus();
  };
  const reset = () => {
    const picks = { ...st.picks };
    track.moves.forEach((_, i) => delete picks[`${track.id}:${i}`]);
    save({ ...st, picks });
    goStep(0);
  };

  return (
    <section className="md dx" aria-labelledby="dx-title">
      <header className="md-head">
        <p className="md-tag">读对话，找论证</p>
        <h3 id="dx-title" className="md-title">
          这一步在做什么？
        </h3>
        <p className="md-lede">
          选一组对话，一步一步往下读。每一步先自己判断它在做什么：提问、主张或回答、举例、反驳，还是制止追问；再对照本章的分析。读完一组，看看本章认为它的推理在哪里最薄弱。不计分；选择只保存在这台设备上。
        </p>
      </header>

      <div className="md-seg dx-tracks" role="group" aria-label="选择一组对话">
        {TRACKS.map((t) => (
          <label key={t.id} className={'md-seg-opt' + (t.id === track.id ? ' is-on' : '')}>
            <input type="radio" name="dx-track" checked={t.id === track.id} onChange={() => goTrack(t.id)} />
            <span>
              {t.title}
              <small className="dx-src">{t.text}</small>
            </span>
          </label>
        ))}
      </div>

      <ol className="dx-steps" aria-label={`${track.title}：对话的步骤`} onKeyDown={onKey}>
        {track.moves.map((x, i) => {
          const p = st.picks[`${track.id}:${i}`];
          return (
            <li key={i}>
              <button
                type="button"
                className={'dx-step' + (i === step ? ' is-cur' : '') + (p ? ' is-done' : '')}
                aria-current={i === step ? 'step' : undefined}
                aria-label={`第 ${i + 1} 步，${x.ref}，${x.who}${p ? '，已判断' : ''}`}
                onClick={() => goStep(i)}
              >
                <span className="dx-n">{i + 1}</span>
                <span className="dx-ref">{x.ref}</span>
                <span className="dx-kind" aria-hidden="true">
                  {p ? x.kind.map((k) => KIND_SHORT[k]).join('·') : '？'}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="dx-move">
        <p className="dx-who">
          <span className="dx-ref-l">
            {track.text.startsWith('《大森林') ? '《大森林奥义书》' : '《歌者奥义书》'}
            {m.ref}
          </span>
          {m.who}
        </p>
        <p className="dx-zh">{m.zh}</p>
        {m.sa && (
          <>
            <button type="button" className="md-disclose" aria-expanded={showSa} onClick={() => setShowSa(!showSa)}>
              {showSa ? '收起梵文原文' : '看梵文原文'}
            </button>
            {showSa && (
              <p className="dx-sa" lang="sa">
                {m.sa}
              </p>
            )}
          </>
        )}
        <p className="md-note">中文是本章的试译或转述；省略号表示本章删去的部分。</p>

        <fieldset className="cs-group dx-q">
          <legend>你认为这一步主要在做什么？</legend>
          <div className="md-seg">
            {KINDS.map(([k, label]) => (
              <label key={k} className={'md-seg-opt' + (pick === k ? ' is-on' : '')}>
                <input type="radio" name={'dx-' + key} checked={pick === k} onChange={() => save({ ...st, picks: { ...st.picks, [key]: k } })} />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="md-feedback" aria-live="polite">
        {!pick ? (
          <p className="md-muted">作出判断以后，可以对照本章的分析。</p>
        ) : (
          <>
            <p className="md-fb-k">
              本章的分析：{m.kind.map((k) => KIND_NAME[k]).join('，同时也在')}
              {m.kind.includes(pick) ? (m.kind.length > 1 ? '（你看到了其中一面）' : '（与你的判断一致）') : ''}
            </p>
            <p>{m.why}</p>
            {!m.kind.includes(pick) && (
              <p className="md-muted">
                你把它看作“{KIND_NAME[pick]}”。这不一定是错的：原文是叙事和对话，不是论证图。请想一想，这一步对后面的对话起了什么作用，再决定要不要改。
              </p>
            )}
          </>
        )}
        <div className="dx-nav">
          <button type="button" className="btn btn--small" onClick={() => goStep(step - 1)} disabled={step === 0}>
            ← 上一步
          </button>
          <button type="button" className="btn btn--small" onClick={() => goStep(step + 1)} disabled={step === track.moves.length - 1}>
            下一步 →
          </button>
        </div>
        {done && (
          <div className="dx-weak">
            <p className="md-fb-k">读完了「{track.title}」：推理在哪里最薄弱？</p>
            <p>{track.weak}</p>
          </div>
        )}
        <button type="button" className="md-reset" onClick={reset}>
          清空这一组
        </button>
      </div>

      <p className="md-note">
        <b>这个练习的限度。</b>对话中的人物是文本中的人物形象，不是历史记录；这些对话是经过编排的文学作品，不是某一次谈话的记录。把每一步归入五类之一，是本章为了练习“从对话中重构论证”所作的分析，原文自己没有这样分类；有些步骤同时在做两件事。步骤的编号只表示阅读的先后，有几步是本章把原文的几句合在一起的。
      </p>
    </section>
  );
}
