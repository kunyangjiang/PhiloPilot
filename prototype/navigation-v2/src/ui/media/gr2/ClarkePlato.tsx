import { CLARKE_PLATO as M } from '../assets';
import './gr2.css';

// 一 · after the paragraph on the Euthyphro's opening. One manuscript page,
// with its record (public/media/gr2/SOURCES.md). The caption says what it can
// and cannot show: a ninth-century Byzantine copy, made some twelve
// centuries after Plato, photographed in 1898; not Plato's own text.
export default function ClarkePlato() {
  if (!M.available) return null;
  return (
    <figure className="md gr2-obj">
      <img src={M.src} width={M.width} height={M.height} alt={M.alt} loading="lazy" decoding="async" />
      <figcaption>
        <p>
          <b>这篇对话是怎样传到我们这里的。</b>这是牛津博德利图书馆所藏一部柏拉图写本（MS. E. D. Clarke 39，通称"克拉克柏拉图"）的第 1 页正面，正文从《游叙弗伦》开头的"<span lang="grc">τί νεώτερον, ὦ Σώκρατες</span>"（本章试译："有什么新鲜事，苏格拉底？"，2a）写起。按图书馆的记录，这部写本于公元 895 年在君士坦丁堡抄成，抄写者是"书法家约翰"（Johannes calligraphus），出资人是后来的凯撒里亚主教阿雷塔斯（Arethas），页边的批注也有他的手笔；它是柏拉图大约一半对话现存最古老的写本（不计纸草残片）。
        </p>
        <p>
          这页写于柏拉图去世（公元前 347 年）一千二百多年以后。我们读到的柏拉图，都经过了这样一代一代的抄写；现代的校勘本，是比较这类中世纪写本和古代纸草残片之后整理出来的。这里用的是 1898 年出版的黑白照相复制本，不是写本今天的彩色照片。
        </p>
        <p className="md-note">
          {M.credit}{' '}
          <a href={M.url} target="_blank" rel="noreferrer">
            复制本扫描
          </a>
          {' · '}
          <a href={M.record} target="_blank" rel="noreferrer">
            博德利图书馆记录
          </a>
        </p>
      </figcaption>
    </figure>
  );
}
