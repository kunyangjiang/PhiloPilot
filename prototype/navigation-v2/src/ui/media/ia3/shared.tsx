import './v22.css';
export { Band, Claim, Limits, OrigSrc, Seg, Step, Tag, useSavedIx, Verdict } from '../ia1/shared';

// Shared by the V22 components: 安萨里、阿威罗伊与西方伊斯兰思想 (IA3),
// 照明学派、苏非形而上学与后古典诸派 (IA4) and 近现代伊斯兰与阿拉伯思想 (IA5).
// Every Arabic or English line quoted in them is one of the chapters' own
// checked passages (content/IA3_, IA4_, IA5_SAMPLE_DRAFT.md) with the chapters'
// own translation; nothing is quoted from anywhere else.

/** A level shown as words and a bar (the bar is decorative; the words carry the meaning). */
export function Level({ label, n, max, word }: { label: string; n: number; max: number; word: string }) {
  return (
    <div className="v22-level">
      <span className="v22-level-k">{label}</span>
      <span className="v22-bar" aria-hidden="true">
        {Array.from({ length: max }, (_, i) => (
          <i key={i} className={i < n ? 'is-on' : undefined} />
        ))}
      </span>
      <b>{word}</b>
    </div>
  );
}
