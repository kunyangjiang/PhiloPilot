import { EPICURUS_HEAD as M } from '../assets';
import './gr4.css';

// 二 · at the start of the Epicurean part. One museum object, with its record
// (public/media/gr4/SOURCES.md). The caption says it is a Roman copy made
// centuries later, not a lifetime likeness.
export default function EpicurusHead() {
  if (!M.available) return null;
  return (
    <figure className="md g4-fig">
      <img src={M.src} width={M.width} height={M.height} alt={M.alt} loading="lazy" decoding="async" />
      <figcaption>
        <p>
          <b>后人怎样描绘伊壁鸠鲁。</b>这尊大理石头像现藏纽约大都会艺术博物馆（inv. 11.90）。据博物馆的记录，它是罗马帝国时期、公元 2 世纪的作品，复制的是一尊公元前 3 世纪上半叶的希腊雕像；也就是说，它是伊壁鸠鲁（公元前 341—前 270 年）去世几百年后的复制品，不是他生前的写照。
        </p>
        <p>
          伊壁鸠鲁的肖像在罗马时代被大量复制，这本身说明他的学派延续得很久。但一尊头像只能说明后人怎样记住他的样子，不能说明他想了什么。
        </p>
        <p className="md-note">
          {M.credit}{' '}
          <a href={M.url} target="_blank" rel="noreferrer">
            博物馆记录
          </a>
        </p>
      </figcaption>
    </figure>
  );
}
