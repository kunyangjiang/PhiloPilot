import { BEKKER_1094 as M } from '../assets';
import './gr3.css';

// 导读 · after the paragraph explaining Bekker numbers. One printed page,
// with its record (public/media/gr3/SOURCES.md): p. 1094 of the 1831 Berlin
// edition, where the Nicomachean Ethics begins, so the reader can see the
// page, the two columns (a, b) and the line numbers that "1094a1" refers to.
export default function BekkerPage() {
  if (!M.available) return null;
  return (
    <figure className="md gr3-fig gr3-fig--page">
      <img src={M.src} width={M.width} height={M.height} alt={M.alt} loading="lazy" decoding="async" />
      <figcaption>
        <p>
          <b>"1094a1"指的是什么。</b>这是贝克尔本（柏林，1831 年）第 2 卷的第 1094 页，《尼各马可伦理学》从这里开始。左栏是 a 栏，右栏是 b 栏，栏间每五行印一个行号。所以"1094a1"就是这一页左栏的第一行："Πᾶσα τέχνη……"（"每一种技艺……"）。页面下方的小字是校勘记，记录各个抄本的异文。
        </p>
        <p>
          本课所引的希腊文，大多据更晚的校勘本（见附录），但都沿用这个版本的页码、栏和行号；现代版本的行号与它可能相差一两行。
        </p>
        <p className="md-note">
          {M.credit}{' '}
          <a href={M.url} target="_blank" rel="noreferrer">
            扫描本页面
          </a>
        </p>
      </figcaption>
    </figure>
  );
}
