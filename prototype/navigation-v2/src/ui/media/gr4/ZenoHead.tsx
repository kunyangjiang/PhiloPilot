import { ZENO_HEAD as M } from '../assets';
import './gr4.css';

// 三 · after the table of Stoic periods and the paragraph on how little we
// know of the early Stoa. One museum object, with its record
// (public/media/gr4/SOURCES.md). The caption says the identification and
// the date are reported from the Commons record, not checked against the
// museum's own.
export default function ZenoHead() {
  if (!M.available) return null;
  return (
    <figure className="md g4-fig">
      <img src={M.src} width={M.width} height={M.height} alt={M.alt} loading="lazy" decoding="async" />
      <figcaption>
        <p>
          <b>一尊通常被认作芝诺的胸像。</b>这尊大理石胸像现藏那不勒斯国家考古博物馆（inv. 6128），原属法尔内塞（Farnese）收藏。它是罗马时代的复制品，不是芝诺生前的写照；照片说明认为它复制的是一件公元前 3 世纪的希腊原作，并通过与赫库兰尼姆"纸草别墅"出土的一尊青铜胸像比较，把它认作芝诺。这些说法本课是从图片的说明中读到的，没有核对博物馆自己的记录。
        </p>
        <p>
          这正好呼应上面说的困难：斯多亚派的创立者，我们了解得最少。连他的样子，也要靠几百年后的复制品和后人的辨认。
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
