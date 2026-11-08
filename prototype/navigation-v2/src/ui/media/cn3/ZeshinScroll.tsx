import { ZESHIN_BUTTERFLY as M } from '../assets';
import '../gr4/gr4.css';
import './cn3.css';

// 三 · after "读法三：体验与文学的读法". A later Japanese painting of the story
// (public/media/cn3/SOURCES.md). The caption says what the scroll shows and
// that it is a much later artist's picture of the story, not evidence for any
// reading of the text.
export default function ZeshinScroll() {
  if (!M.available) return null;
  return (
    <figure className="md g4-fig c3-scroll">
      <img src={M.src} width={M.width} height={M.height} alt={M.alt} loading="lazy" decoding="async" />
      <figcaption>
        <p>
          <b>两千年后的一幅"梦蝶"。</b>这是日本画家柴田是真（1807—1891）晚年画的《庄子梦蝶图》（1888）。它不是《庄子》时代的东西，也不是对原文的说明：画家把故事画成了一个人伏在石旁打盹，蝴蝶在画面的另一端，中间是大片空白。
        </p>
        <p>
          可以拿它来对照上面三种读法：画面看起来表现的是"梦"这一刻的情境，原文的"俄然覺"、"不知……與"和"必有分矣"都没有画出来。一幅画只能选取故事的一个时刻，这本身就是一种读法。
        </p>
        <p className="md-note">
          {M.credit}{' '}
          <a href={M.url} target="_blank" rel="noreferrer">
            Wikimedia Commons 记录
          </a>
        </p>
      </figcaption>
    </figure>
  );
}
