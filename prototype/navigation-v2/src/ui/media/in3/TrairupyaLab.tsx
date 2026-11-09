import { Band, Claim, Limits, Seg, Src, Tag, useSavedIn, type Basis } from '../in2/shared';
import '../gr1/gr1.css';
import '../gr4/gr4.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';
import '../cn5/cn5.css';
import '../cn7/cn7.css';
import '../in2/ip.css';

// 四 · after the 九句因 table (the paragraph 九种情况中，只有两种是好的理由).
// 1. Test the examples of the 《因明入正理论》 against the three marks.
// 2. The hetucakra grid as the encyclopedia presents it (no per-cell examples:
//    the chapter did not check them).
// 3. Doctrine and modern presentation kept apart.
// Chinese is Xuanzang's (CBETA T1630, characters kept); all else from 四、 and notes 44–55.

const ID = 'trairupya-lab';

type M = 0 | 1 | 2;
const MARKS: { zh: string; han: string; sa: string; plain: string }[] = [
  { zh: '第一相', han: '遍是宗法性', sa: 'pakṣadharmatva', plain: '理由必须出现在推理的对象中' },
  { zh: '第二相', han: '同品定有性', sa: 'sapakṣe sattva', plain: '理由必须至少出现在某些有所立性质的东西中' },
  { zh: '第三相', han: '異品遍無性', sa: 'vipakṣe asattva', plain: '理由必须完全不出现在没有所立性质的东西中' },
];

interface Case {
  id: string;
  name: string;
  han: string;
  // true = the mark holds
  key: [boolean | null, boolean | null, boolean | null];
  b: Basis;
  why: string;
}
const CASES: Case[] = [
  { id: 'good', name: '正例', han: '「聲無常」……「所作性故」……「若是所作，見彼無常，如瓶等」……「若是其常，見非所作，如虛空」', key: [true, true, true], b: 'text', why: '声音是被造作的（第一相）；瓶是被造作的，也是无常的（第二相）；虚空是常住的，也不是被造作的（第三相）。' },
  { id: 'eye', name: '两俱不成', han: '成立「聲為無常」等，若言「是眼所見性故」', key: [false, null, null], b: 'course', why: '声音不是眼睛看见的；双方都不承认理由在对象上成立，违反第一相。第二、三相本章没有讨论，所以这里不判断。' },
  { id: 'meas', name: '共不定', han: '聲常，所量性故', key: [true, true, false], b: 'course', why: '常住的东西和无常的东西都是可知的；理由在异品中也有，违反第三相。' },
  { id: 'aud', name: '不共不定', han: '聲常，所聞性故', key: [true, false, true], b: 'course', why: '只有声音是可听的，所以没有同品支持它（违反第二相），也没有异品反驳它。' },
  { id: 'made', name: '法自相相违', han: '聲常，所作性故', key: [true, false, false], b: 'course', why: '被造作的东西只出现在异品（无常的东西）中：同品中没有（第二相不满足），异品中有（第三相不满足）。理由反而证明了相反的结论。本章只说了"只出现在异品中"，哪两相不满足是由此推出的。' },
];

type Cell = 'all' | 'none' | 'some';
const CELL: [Cell, string][] = [
  ['all', '全部有'],
  ['none', '全部没有'],
  ['some', '部分有'],
];
const good = (sa: Cell, vi: Cell) => vi === 'none' && sa !== 'none';

type View = 'doc' | 'modern';

interface Saved {
  c: string;
  marks: Record<string, (boolean | null)[] | undefined>;
  checked: Record<string, boolean | undefined>;
  cell: [Cell, Cell] | null;
  view: View | null;
}
const INIT: Saved = { c: 'good', marks: {}, checked: {}, cell: null, view: null };

export default function TrairupyaLab() {
  const [st, save] = useSavedIn<Saved>('IN3', ID, INIT);
  const set = (p: Partial<Saved>) => save({ ...st, ...p });
  const cs = CASES.find((c) => c.id === st.c) ?? CASES[0];
  const mine = st.marks[cs.id] ?? [null, null, null];
  const full = mine.every((x) => x !== null);
  const checked = !!st.checked[cs.id];
  const setMark = (i: M, v: boolean) => {
    const next = [...mine];
    next[i] = v;
    set({ marks: { ...st.marks, [cs.id]: next }, checked: { ...st.checked, [cs.id]: false } });
  };
  const right = checked && cs.key.every((k, i) => k === null || mine[i] === k);

  return (
    <section className="md c3 c5" aria-labelledby="tr-title">
      <header className="md-head">
        <p className="md-tag">因明 · 三相与九句因</p>
        <h3 id="tr-title" className="md-title">
          一个好的理由要满足什么条件？
        </h3>
        <p className="md-lede">先用三相逐一检查《因明入正理论》的几个例子，看每一个毛病违反的是哪一相。再看九句因的九种情况。最后把陈那的说法和现代学者的表述分开来看。</p>
      </header>

      <Src src="商羯罗主《因明入正理论》，玄奘译" lang="zh-Hant" orig="因有三相。何等為三？謂遍是宗法性、同品定有性、異品遍無性。" />
      <Src src="商羯罗主《因明入正理论》梵文本，据师子贤注本" lang="sa" orig="pakṣadharmatvaṃ sapakṣe sattvaṃ vipakṣe cāsattvameva" zh="（理由）是宗的性质；在同品中存在；在异品中必定不存在。" />

      <Band>一 · 用三相检查</Band>
      <Seg name="tr-case" label="选择一个例子" value={cs.id} opts={CASES.map((c) => [c.id, c.name] as const)} onPick={(v) => set({ c: v })} />
      <p className="ip-han" lang="zh-Hant">
        {cs.han}
      </p>
      <div className="ip-marks">
        {MARKS.map((m, i) => (
          <div key={m.zh}>
            <p>
              <b>{m.zh}</b> <span lang="zh-Hant">{m.han}</span>
            </p>
            <p className="md-muted">{m.plain}</p>
            <Seg
              name={`tr-${cs.id}-${i}`}
              label={`${cs.name}：${m.zh}是否满足`}
              value={mine[i] === null ? null : mine[i] ? 'y' : 'n'}
              opts={[
                ['y', '满足'],
                ['n', '不满足'],
              ]}
              onPick={(v) => setMark(i as M, v === 'y')}
            />
            {checked && mine[i] !== null && (
              <p>
                {cs.key[i] === null ? (
                  <span className="c5-verdict c5-verdict--open">本章没有讨论这一相</span>
                ) : (
                  <span className={'c5-verdict ' + (mine[i] === cs.key[i] ? 'c5-verdict--ok' : 'c5-verdict--no')}>{mine[i] === cs.key[i] ? '一致' : cs.key[i] ? '应为：满足' : '应为：不满足'}</span>
                )}
              </p>
            )}
          </div>
        ))}
      </div>
      <button type="button" className="md-disclose" disabled={!full} onClick={() => set({ checked: { ...st.checked, [cs.id]: true } })}>
        {full ? '核对' : '先判断三相'}
      </button>
      {checked && (
        <p className="md-feedback" aria-live="polite">
          <span className={'c5-verdict ' + (right ? 'c5-verdict--ok' : 'c5-verdict--no')}>{right ? '和本章的判断一致' : '有的判断不同'}</span>
          <Tag b={cs.b} />
          {cs.why}
        </p>
      )}
      <Claim b="text" who="商羯罗主">
        还有一种毛病，三相单独检查发现不了：相违决定。一方说"聲是無常，所作性故，譬如瓶等"；对方说"聲常，所聞性故，譬如聲性"。双方各有一个看起来合格的理由，结论相反。
      </Claim>

      <Band>二 · 九句因</Band>
      <p className="md-muted">
        一个理由在同品中的出现情况有三种，在异品中也有三种，合起来是九种。点一格看它的判断。<Tag b="scholar" who="SEP 的表格" />
      </p>
      <svg className="ip-grid" viewBox="0 0 420 250" role="group" aria-label="九句因：行是理由在同品中，列是理由在异品中">
        <text className="ip-axis" x="150" y="16">
          理由在异品中 →
        </text>
        <text className="ip-axis" x="4" y="16">
          在同品中 ↓
        </text>
        {CELL.map(([v, t], j) => (
          <text key={'c' + v} className="ip-axis" x={150 + j * 90 + 45} y="40" textAnchor="middle">
            {t}
          </text>
        ))}
        {CELL.map(([sa, ts], i) => (
          <g key={sa}>
            <text className="ip-axis" x="4" y={52 + i * 64 + 36}>
              {ts}
            </text>
            {CELL.map(([vi, tv], j) => {
              const on = !!st.cell && st.cell[0] === sa && st.cell[1] === vi;
              const g = good(sa, vi);
              return (
                <g
                  key={vi}
                  className={'ip-cell' + (g ? ' is-good' : '') + (on ? ' is-on' : '')}
                  role="button"
                  tabIndex={0}
                  aria-pressed={on}
                  aria-label={`同品中${ts}、异品中${tv}：${g ? '好' : '不好'}`}
                  onClick={() => set({ cell: [sa, vi] })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      set({ cell: [sa, vi] });
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <rect x={150 + j * 90 + 2} y={52 + i * 64} width="86" height="60" />
                  <text x={150 + j * 90 + 45} y={52 + i * 64 + 36} textAnchor="middle">
                    {g ? '好' : '不好'}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
      </svg>
      {st.cell && (
        <p className="md-feedback" aria-live="polite">
          同品中{CELL.find((c) => c[0] === st.cell![0])![1]}、异品中{CELL.find((c) => c[0] === st.cell![1])![1]}：
          {good(st.cell[0], st.cell[1]) ? '好的理由。' : '不好的理由。'}
          {st.cell[1] !== 'none' && '理由在异品中出现了，有反例，第三相不满足。'}
          {st.cell[1] === 'none' && st.cell[0] === 'none' && '没有反例，但也没有任何正面的例子，第二相不满足。'}
          {good(st.cell[0], st.cell[1]) && (st.cell[0] === 'some' ? '第二相只要求同品中"有"，不要求"全部有"。' : '异品中全部没有，同品中全部有。')}
        </p>
      )}
      <p className="md-muted">"九句因"所在的陈那著作只有藏译本保存；本课只依据百科条目的表格，没有核对藏译。每一格中具体的例子本课也没有核对，所以这里不列出。</p>

      <Band>三 · 陈那的说法，和现代的表述</Band>
      <Seg
        name="tr-view"
        label="选择一种视角"
        value={st.view}
        opts={[
          ['doc', '论书中的说法'],
          ['modern', '现代学者的表述'],
        ]}
        onPick={(v) => set({ view: v })}
      />
      {st.view === 'doc' && (
        <div className="c5-row" aria-live="polite">
          <Claim b="text" who="《因明入正理论》">三相；三支论式（宗、因、喻），喻分为同法喻（「若是所作，見彼無常，如瓶等」）和异法喻（「若是其常，見非所作，如虛空」）。每一个喻都有一条规律和一个具体的例子。</Claim>
          <Claim b="scholar" who="SEP，据学者的复原">陈那本人的一个论式：声音是无常的，因为它直接由努力产生；凡直接由努力产生的，都被看到是无常的，例如锅；凡是常住的，都被看到不是直接由努力产生的，例如虚空。</Claim>
        </div>
      )}
      {st.view === 'modern' && (
        <div className="c5-row" aria-live="polite">
          <Claim b="course">第三相实际上说的是"没有反例"；第二相要求至少有一个正面的例子。（本课的解释）</Claim>
          <Claim b="scholar" who="SEP 的介绍">如果喻支中的规律是真的，论式在形式上就是演绎有效的。</Claim>
          <Claim b="scholar" who="Hayes，据 SEP">陈那保留具体的例子，并在规律中加上"被看到"（dṛṣṭa），他关心的是归纳：一条规律怎样从观察中得到支持。</Claim>
          <Claim b="scholar" who="Oetke，据 SEP">陈那的推理是一种可以被推翻的推理。</Claim>
          <Claim b="scholar" who="SEP 条目作者">保留例子的一个好理由，是排除形式有效却毫无说服力的论证，例如"声音是常住的，因为它是可听的"。</Claim>
          <p className="md-muted">把印度的论式直接等同于亚里士多德的三段论，是太快了。</p>
        </div>
      )}

      <Limits>
        <p>三相的汉文据 CBETA《大正藏》第 32 册第 1630 号，字形照录；梵文是本章读到的师子贤注本中的本文。例子中哪一相不满足，"两俱不成"、"共不定"、"不共不定"三条是本章的解释，"法自相相违"的两相是由本章的说明推出的。</p>
        <p>"演绎还是归纳"是现代学者的争论，这里的几种看法都转述自百科条目，本课没有阅读 Hayes 和 Oetke 的原著。</p>
      </Limits>

      <button type="button" className="md-reset" onClick={() => save(INIT)}>
        重新开始
      </button>
    </section>
  );
}
