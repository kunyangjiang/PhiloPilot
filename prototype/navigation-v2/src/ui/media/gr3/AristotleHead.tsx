import { ARISTOTLE_HEAD as M } from '../assets';
import './gr3.css';

// 一 · after the paragraph on Raphael's School of Athens and the "Plato up,
// Aristotle down" impression. One museum object, with its record
// (public/media/gr3/SOURCES.md). The caption says it is a later Roman copy,
// not a lifetime likeness, and that the mantle is modern.
export default function AristotleHead() {
  if (!M.available) return null;
  return (
    <figure className="md gr3-fig">
      <img src={M.src} width={M.width} height={M.height} alt={M.alt} loading="lazy" decoding="async" />
      <figcaption>
        <p>
          <b>后人怎样描绘亚里士多德。</b>这尊大理石头像现藏罗马国立博物馆阿尔滕普斯宫（Palazzo Altemps，inv. 8575），原属路多维西（Ludovisi）收藏。它是罗马时代的复制品，不是亚里士多德生前的写照；通常认为它复制的是一件公元前四世纪后期的希腊青铜像，这一说法（包括归于雕塑家吕西波斯 Lysippos）本课是从图片的说明中读到的，没有核对。肩上的雪花石膏披风是近代加上去的。
        </p>
        <p>
          和上文说的壁画一样，它是后人对亚里士多德的一种呈现：能说明后人怎样记住他的样子，不能说明他想了什么。
        </p>
        <p className="md-note">
          {M.credit}{' '}
          <a href={M.url} target="_blank" rel="noreferrer">
            照片页面
          </a>
        </p>
      </figcaption>
    </figure>
  );
}
