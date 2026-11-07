import { MAHAVIRA_FOLIO as F } from '../assets';
import './in1.css';

// 四 · after the paragraph introducing Mahāvīra and the tīrthaṅkaras. One
// museum object, with its record (public/media/in1/SOURCES.md). The caption
// says what it can and cannot show: a fifteenth-century painting of a later
// tradition, not a likeness, and a page from the age of manuscripts.
export default function MahaviraFolio() {
  if (!F.available) return null;
  return (
    <figure className="md in1-folio">
      <img src={F.src} width={F.width} height={F.height} alt={F.alt} loading="lazy" decoding="async" />
      <figcaption>
        <p>
          <b>后来的传统怎样描绘大雄的出家。</b>这是 1461 年古吉拉特一部《劫波经》（Kalpasūtra）写本中的一页。按收藏馆的标题，右边的小画描绘的是大雄剃发（tonsure）出家的场面。这一页比大雄晚了大约两千年，画中人物的样子是十五世纪画坊的程式，不是历史肖像。它能说明的是两件事：后来的耆那教徒怎样记忆和描绘这段出家的故事；以及经典在写本时代的样子，文字和图画同在一页。本章所说的“离开家庭的沙门”，在这里已经成了被供奉的神圣故事。
        </p>
        <p className="md-note">
          {F.credit}{' '}
          <a href={F.url} target="_blank" rel="noreferrer">
            藏品页面
          </a>
        </p>
      </figcaption>
    </figure>
  );
}
