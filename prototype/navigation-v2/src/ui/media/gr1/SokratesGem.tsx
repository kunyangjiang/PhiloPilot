import { SOKRATES_GEM as G } from '../assets';
import './gr1.css';

// 五 · after the paragraph introducing Socrates. One museum object, with its
// record (public/media/gr1/SOURCES.md). The caption says what it can and
// cannot show: a Roman gem made centuries after Socrates' death, following a
// later type of representation, not a lifetime portrait.
export default function SokratesGem() {
  if (!G.available) return null;
  return (
    <figure className="md gr1-gem">
      <img src={G.src} width={G.width} height={G.height} alt={G.alt} loading="lazy" decoding="async" />
      <figcaption>
        <p>
          <b>后人怎样描绘苏格拉底。</b>这是一枚罗马时代的刻花宝石，按收藏馆的记录，刻的是苏格拉底，年代约在公元前 1 世纪到公元 1 世纪之间，比苏格拉底去世（公元前 399 年）晚了三四百年。宝石实物很小，只有约 1.4 × 1.1 厘米，这里是放大的照片。它不是苏格拉底生前的肖像：我们没有任何一件可以确定作于他生前的像。秃顶、塌鼻、浓须的样子，是苏格拉底死后形成、在希腊化和罗马时代被反复复制的一种“类型”；它常被认为与柏拉图《会饮篇》和色诺芬《会饮》中把苏格拉底比作西勒诺斯（Silenus）的描写有关。它能说明的是：后来的人怎样记忆和想象这位哲学家，甚至把他的像戴在手指上。
        </p>
        <p className="md-note">
          {G.credit}{' '}
          <a href={G.url} target="_blank" rel="noreferrer">
            藏品页面
          </a>
        </p>
      </figcaption>
    </figure>
  );
}
