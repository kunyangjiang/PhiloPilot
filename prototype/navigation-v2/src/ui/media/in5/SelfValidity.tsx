import { Band, Claim, Limits, Seg, Src, Tag, useSavedIx, Verdict } from '../in4/shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import '../cn5/cn5.css';
import '../cn7/cn7.css';
import '../in2/ip.css';
import '../in4/in4.css';

// 四 · after "对第三种立场，帕尔塔萨拉提的回答是" (和正理派、佛教的比较).
// 1. The regress: what if every cognition had to wait for another? (Sucarita,
//    Pārthasārathi), and the contested step 5 → 6.
// 2. Cases with the two kinds of defeater (shell and silver, the double moon are
//    the course's examples): valid until defeated is not "cannot be wrong".
// 3. The Prābhākara alternative: the yellow conch.
// 4. Nyāya and the Buddhist arthakriyā test, with Pārthasārathi's dream reply.
// The Ślokavārttika verse is not quoted: the chapter knows it only through Sucarita's
// restatement and SEP. Every quotation is the chapter's own (四、, notes 46–60).

const ID = 'self-validity';

type Case = 'silver' | 'moon';
const CASES: Record<Case, { t: string; s1: string; s2: string; kind: string; skt: string }> = {
  silver: {
    t: '贝壳与银子',
    s1: '我远远看见一块发亮的东西，以为是银子。',
    s2: '走近一看，是一片贝壳。"这不是银子。"',
    kind: '认识到对象并非如此',
    skt: 'arthānyathātva-jñāna',
  },
  moon: {
    t: '两个月亮',
    s1: '我看到月亮有两个。',
    s2: '后来知道自己的眼睛有病。即使还没有看清月亮，我已经知道先前的认识不可靠。',
    kind: '认识到原因有缺陷',
    skt: 'kāraṇadoṣa-jñāna',
  },
};

type Err = 'yes' | 'no';
const STMTS: { k: string; t: string; ok: boolean; fb: string }[] = [
  { k: 'a', t: '一个认识一产生，就有资格被当作真的，不需要等待别的认识来证明它。', ok: true, fb: '这是 SEP 对鸠摩利罗主张的介绍。' },
  { k: 'b', t: '自身有效的认识不会错。', ok: false, fb: '鸠摩利罗一系从来没有说过每一个认识都是真的；认识可以被推翻。' },
  { k: 'c', t: '有效性可以被两种认识取消：对象并非如此，以及原因有缺陷。', ok: true, fb: '帕尔塔萨拉提《论灯》1.1.2。' },
  { k: 'd', t: '"有效"的意思就是"是真的"。', ok: false, fb: '按帕尔塔萨拉提的读法，有效性的意思是"显得是真的"；有效性是关于辩护的，不是关于真理的。' },
];

type View = 'bhatta' | 'prabhakara';
const VIEW_ROWS: { q: string; bhatta: string; prabhakara: string }[] = [
  { q: '一个认识产生时', bhatta: '有资格被当作真的，直到被推翻', prabhakara: '作为经验，它本身就是有效的' },
  { q: '错误是什么？', bhatta: '一个认识的对象并非如此（"这不是银子"）', prabhakara: '两个各自真实的经验没有被分辨开，导致行动失败' },
  { q: '有没有"假的经验"？', bhatta: '有：被推翻的认识从一开始就是假的', prabhakara: '严格地说没有；"错误"是行动层面的不相符' },
  { q: '和"自身有效性"的关系', bhatta: '有效性可以被取消', prabhakara: '有效性从不被取消，被纠正的是对两个经验的混同' },
];

type Nyaya = 's5' | 's6' | 'both';
const NY: [Nyaya, string][] = [
  ['both', '第 5 步和第 6 步都接受'],
  ['s5', '接受第 5 步，不接受第 6 步'],
  ['s6', '两步都不接受'],
];

interface Saved {
  layers: number;
  cas: Case;
  stage: 1 | 2;
  err: Err | null;
  stmts: Record<string, boolean>;
  view: View;
  ny: Nyaya | null;
  water: boolean;
}
const INIT: Saved = { layers: 1, cas: 'silver', stage: 1, err: null, stmts: {}, view: 'bhatta', ny: null, water: false };

export default function SelfValidity() {
  const [st, save] = useSavedIx<Saved>('IN5', ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const layers = Math.max(1, Math.min(st.layers ?? 1, 6));
  const c = CASES[st.cas] ?? CASES.silver;
  const stmts = st.stmts ?? {};

  return (
    <section className="md c3 c5" aria-labelledby="sv-title">
      <header className="md-head">
        <p className="md-tag">自身有效性 · 工作坊</p>
        <h3 id="sv-title" className="md-title">
          有效，但可能错：自身有效性的几个案例
        </h3>
        <p className="md-lede">先看如果每个认识都要等另一个认识来证明，会发生什么；再用两个案例看推翻者怎样取消一个认识的有效性；然后比较普拉巴卡拉派对错误的解释，以及正理派和佛教的立场。贯穿全程的一点是：自身有效不等于不会错。</p>
      </header>

      <Band>一 · 如果每个认识都要先被证明</Band>
      <ol className="ix-steps" aria-live="polite">
        {Array.from({ length: layers }, (_, i) => (
          <li key={i} className={i === layers - 1 ? 'is-stop' : undefined}>
            C{i + 1}{i === 0 ? '：我看见了水。' : `：证明 C${i} 的原因（例如眼睛）是健全的认识。`}
            {i === layers - 1 && (layers < 6 ? ` 它本身也要被证明吗？` : ' ……如此以至无穷：没有任何一个认识能被当作有效的。')}
          </li>
        ))}
      </ol>
      <p>
        <button type="button" className="md-disclose" disabled={layers >= 6} onClick={() => set({ layers: layers + 1 })}>
          要求再证明一次
        </button>{' '}
        <button type="button" className="md-disclose" disabled={layers === 1} onClick={() => set({ layers: 1 })}>
          回到 C1
        </button>
      </p>
      {layers >= 3 && (
        <div aria-live="polite">
          <Src
            src="苏遮利多弥湿罗《迦尸迦》，“命令句章”注"
            lang="sa"
            orig="yadi jāte 'pi vijñāne kāraṇaguṇāvadhāraṇādhīnaṃ prāmāṇyaṃ bhavet, tataḥ śuddhijñānotpādaḥ kāraṇāntarāt pratīkṣitavyaḥ."
            zh="如果一个认识产生之后，它的有效性还要依赖于确定它的原因［例如眼睛］是健全的，那么，就必须等待另一个原因来产生“［原因是］健全的”这一认识。"
          />
          <Src
            src="帕尔塔萨拉提《论灯》1.1.2（与 1915 年印本对照）"
            lang="sa"
            orig="yadi hi sarvameva jñānaṃ svaviṣayatathātvāvadhāraṇe svayamasamarthaṃ vijñānāntaramapekṣeta tataḥ kāraṇaguṇasaṃvādārthakriyājñānānyapi svaviṣayabhūtaguṇādyavadhāraṇe paramapekṣeran, aparamapi tatheti na kaścidartho janmasahasreṇāpyadhyavasīyeteti prāmāṇyamevotsīdet"
            zh="如果每一个认识本身都不能确定它的对象确实如此，而要依赖另一个认识，那么，关于原因健全的认识、关于［与其他认识］相符的认识、关于［对象］起作用的认识，在确定它们自己的对象时，也要依赖别的认识，那个别的认识也是这样；于是，即使经过一千次生命，也不能确定任何一件事情，有效性本身就不存在了。"
          />
          <ol className="ix-steps" start={4}>
            <li>但我们确实知道许多事情（这是双方都承认的）。</li>
            <li>所以，至少有些认识不需要别的认识来证明，本身就有资格被当作有效。</li>
            <li className="is-stop">进一步说，没有理由只给某些认识这种资格；所以一切认识都"自身有效"，直到被推翻为止。</li>
          </ol>
          <p className="md-muted">
            分步是本章的重建。第 5 步只证明了<b>有些</b>认识必须是自身有效的；第 6 步推广到<b>一切</b>认识，这是论证最有争议的地方。 <Tag b="course" />
          </p>
          <p className="md-muted">
            鸠摩利罗本人的颂文，本章所用的电子本没有完整录出，只有苏遮利多的复述："本身不存在的能力，不能由别的东西造出来"；主张的介绍据 SEP。 <Tag b="scholar" who="SEP《鸠摩利罗》" />
          </p>
        </div>
      )}

      <Band>二 · 推翻者：有效不等于不会错</Band>
      <Seg name="sv-case" label="选择一个案例" value={st.cas} opts={(Object.keys(CASES) as Case[]).map((k) => [k, CASES[k].t] as const)} onPick={(v) => set({ cas: v, stage: 1, err: null })} />
      <div className="c5-row" aria-live="polite">
        <p>
          <b>第一刻：</b>
          {c.s1} <Tag b="course" who="本章的例子" />
        </p>
        <p className="md-fb-k">此刻相信它，是认识上的错误吗？</p>
        <Seg
          name="sv-err"
          label="此刻相信它是不是认识上的错误"
          value={st.err}
          opts={[
            ['yes', '是'],
            ['no', '不是'],
          ]}
          onPick={(v) => set({ err: v, stage: 2 })}
        />
        {st.stage === 2 && st.err && (
          <>
            <p>
              <b>后来：</b>
              {c.s2}
            </p>
            <p className="md-feedback">
              <Verdict ok={st.err === 'no'} yes="符合帕尔塔萨拉提的读法" no="不符合帕尔塔萨拉提的读法" />
              推翻者：{c.kind}（<i lang="sa">{c.skt}</i>）。先前的认识从一开始就是假的；但在被推翻之前，相信它的人并没有犯认识上的错误。有效性是关于辩护的，不是关于真理的。
            </p>
          </>
        )}
      </div>
      <Src
        src="帕尔塔萨拉提《论灯》1.1.2（与 1915 年印本对照）"
        lang="sa"
        orig="tasmātsvataḥprāmāṇyaṃ prāptamarthānyathātvakāraṇadoṣajñānābhyāmapodyata ityavaśyamaṅgīkaraṇīyam"
        zh="所以必须承认：［一个认识的］有效性是自身得到的，它被两种认识所取消：认识到对象并非如此，以及认识到［产生认识的］原因有缺陷。"
      />
      <p>下面哪些说法符合鸠摩利罗一系的"自身有效性"？</p>
      {STMTS.map((s) => {
        const v = stmts[s.k];
        return (
          <div key={s.k} className="c5-row">
            <p>{s.t}</p>
            <Seg
              name={'sv-st-' + s.k}
              label={s.t}
              value={v === undefined ? null : v ? 'y' : 'n'}
              opts={[
                ['y', '符合'],
                ['n', '不符合'],
              ]}
              onPick={(x) => set({ stmts: { ...stmts, [s.k]: x === 'y' } })}
            />
            {v !== undefined && (
              <p className="md-feedback" aria-live="polite">
                <Verdict ok={v === s.ok} yes="判断正确" no="再想一想" />
                {s.fb}
              </p>
            )}
          </div>
        );
      })}
      <Claim b="scholar" who="SEP，现代学者的类比">用现代认识论的词汇来说，这是一种"可废止的辩护"：一个信念在没有遇到推翻者之前是有辩护的。SEP 把它和里德、阿尔斯顿相比较，也提到与波普尔的相似之处。</Claim>
      <Claim b="scholar" who="SEP 介绍的两种读法">温维迦（约 710 年）偏重认识怎样产生：有效性来自产生这个认识的同一组原因。帕尔塔萨拉提（约 1075 年）偏重认识怎样被辩护：有效性的意思是"显得是真的"。</Claim>

      <Band>三 · 普拉巴卡拉派：错误是没有分辨</Band>
      <Src src="夏利卡那他《释论五章·论量章》" lang="sa" orig="pramāṇamanubhūtiḥ sā smṛteranyā" zh="认识手段，就是经验……它不同于记忆。" />
      <p>眼睛有黄疸病的人，把白色的海螺看成黄色的。</p>
      <Src
        src="同上，自注（与 1961 年印本对照，文字相同）"
        lang="sa"
        orig="ko nāma pītaśaṅkhajñānamapramāṇamāha, pramāṇameva hi tad, yathārthaviṣayatvāt"
        zh="谁会说“黄色的海螺”这一认识是无效的呢？它正是有效的，因为它的对象是真实的。"
      />
      <Src src="同上" lang="sa" orig="vyavahāradaśāyāṃ visamvādamāvahat pramāṇamapi sad bhrāntamityucyate" zh="在实际行动中，它带来了不相符，所以，虽然它是有效的，仍被称为“错误”。" />
      <Seg
        name="sv-view"
        label="选择一派"
        value={st.view}
        opts={[
          ['bhatta', '巴陀派（据帕尔塔萨拉提）'],
          ['prabhakara', '普拉巴卡拉派（据夏利卡那他）'],
        ]}
        onPick={(v) => set({ view: v })}
      />
      <table className="ip-sort" aria-live="polite">
        <caption className="visually-hidden">{st.view === 'bhatta' ? '巴陀派' : '普拉巴卡拉派'}对错误的看法</caption>
        <tbody>
          {VIEW_ROWS.map((r) => (
            <tr key={r.q}>
              <th scope="row">{r.q}</th>
              <td>{st.view === 'bhatta' ? r.bhatta : r.prabhakara}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Claim b="course">普拉巴卡拉派几乎取消了"假的认识"这个概念；代价是，它必须对每一种错误都找出"两个各自真实的经验"，这对梦、幻觉一类的例子尤其困难。夏利卡那他说细节在"正理之路"一章，本章没有阅读那一章。</Claim>

      <Band>四 · 和正理派、佛教的比较</Band>
      <p className="md-fb-k">正理派会怎样对待第一段重建中的第 5、6 步？</p>
      <Seg name="sv-ny" label="正理派怎样对待第 5、6 步" col value={st.ny} opts={NY} onPick={(v) => set({ ny: v })} />
      {st.ny && (
        <p className="md-feedback" aria-live="polite">
          <Verdict ok={st.ny === 's5'} yes="与本章的比较一致" no="与本章的比较不一致" />
          正理派认为有效性由外在的原因得到（例如感官健全），需要另外的检验，例如成功的行动；它会接受第 5 步，但不接受第 6 步的推广。 <Tag b="course" who="据《知识、推理与辩论》的介绍和 SEP" />
        </p>
      )}
      <p>佛教（帕尔塔萨拉提所转述的立场）：由"对象起作用"（arthakriyā）来确认。看见水，走过去，真的能取到水。</p>
      <button type="button" className="md-disclose" aria-expanded={!!st.water} onClick={() => set({ water: !st.water })}>
        {st.water ? '收起帕尔塔萨拉提的回答' : '帕尔塔萨拉提怎样回答？'}
      </button>
      {st.water && (
        <div aria-live="polite">
          <Src src="帕尔塔萨拉提《论灯》1.1.2（按 1915 年印本）" lang="sa" orig="svapnāvasthāyāmasatyapyudakāharaṇe 'rthakriyāvijñānadarśanāt" zh="因为在梦中，即使没有取水，也看到有“［对象］起作用”的认识。" />
          <Claim b="course">确认"对象起作用"的那个认识，本身也是一个认识；梦中也会有"取到水"的经验。这正是第一段无穷后退论证的应用。</Claim>
        </div>
      )}
      <Claim b="scholar" who="SEP">自身有效性学说在逻辑上并不依赖于吠陀永恒的主张；一个不接受吠陀权威的现代读者，仍然可以单独评价它。</Claim>

      <Limits>
        <p>这不是一个"哪个认识是真的"的判定器。贝壳与银子、两个月亮是本章的例子；第一段的六步是本章的重建；《颂释》"命令句章"的颂文本章没有直接读到，只经由苏遮利多的复述和 SEP。</p>
        <p>"自身有效"不等于"不会错"，也不等于"是真的"。帕尔塔萨拉提和夏利卡那他的引文据 GRETIL 电子本，并与印本对照过；这不等于读法已经由校勘本确立。</p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
