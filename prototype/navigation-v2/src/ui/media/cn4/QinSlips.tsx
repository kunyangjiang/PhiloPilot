import { QIN_LAWS_SLIPS as M } from '../assets';
import '../gr4/gr4.css';
import './cn4.css';

// 三 · after the Shuihudi section ("本课没有直接阅读睡虎地秦简的释文").
// A museum display of the 秦律十八种 slips (public/media/cn4/SOURCES.md).
// The caption does not claim the exhibit is the excavated original, and it
// does not quote the slips: the course has not read their transcription.
export default function QinSlips() {
  if (!M.available) return null;
  return (
    <figure className="md g4-fig c4-photo">
      <img src={M.src} width={M.width} height={M.height} alt={M.alt} loading="lazy" decoding="async" />
      <figcaption>
        <p>
          <b>睡虎地秦简《秦律十八种》的展出。</b>照片中展板下方的说明牌写着：1975 年云梦睡虎地十一号墓出土，共二百零一枚竹简，记录了《田律》《仓律》等十八种秦律。每枚竹简旁边印着的释文是博物馆的展示文字。
        </p>
        <p>
          这张照片只用来说明秦律是怎样被书写和保存下来的：一条条写在竹简上，由一位基层官吏随葬。展品是出土原件还是复制品，本课没能核实；本课也没有阅读或引用这些竹简的释文。
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
