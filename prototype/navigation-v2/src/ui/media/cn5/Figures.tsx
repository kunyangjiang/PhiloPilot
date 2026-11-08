import { LIANGKAI_BAMBOO, LIANGKAI_SUTRA, P2179_COLOPHON } from '../assets';
import '../gr4/gr4.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';

// Images approved by the Product Owner on 2026-11-08
// (content/PHASE13B_IMAGE_APPROVAL_SHEET.md; public/media/cn5/SOURCES.md).
// The two 梁楷 photographs are CC BY-SA 4.0: each caption names the
// photographer, the title, the licence (linked), the file page (linked) and
// states that the file is unmodified.

type Img = typeof LIANGKAI_BAMBOO;

function CcBySaNote({ m }: { m: Img }) {
  return (
    <p className="md-note">
      {m.credit}{' '}
      <a href={m.url} target="_blank" rel="noreferrer">
        Wikimedia Commons 文件页
      </a>
      {' · '}
      <a href={m.license.url} target="_blank" rel="noreferrer license">
        {m.license.name} 许可协议
      </a>
    </p>
  );
}

/** 二 · after the paragraph on how 罗什's translations became the standard ones. */
export function P2179Colophon() {
  const m = P2179_COLOPHON;
  if (!m.available) return null;
  return (
    <figure className="md g4-fig c4-photo">
      <img src={m.src} width={m.width} height={m.height} alt={m.alt} loading="lazy" decoding="async" />
      <figcaption>
        <p>
          <b>罗什译本的一个早期抄本。</b>这是敦煌写本《成实论》卷八的卷尾。题记写明：北魏延昌三年（514）六月十四日，敦煌镇的经生师令狐崇哲在法海寺抄完了这部论。这时距罗什去世大约一百年。
        </p>
        <p>
          它说明罗什的译本是怎样流传的：由专业的抄经人一卷一卷地抄写，传到了帝国西北边境的军镇。抄本本身不能告诉我们译文是否忠实于梵文原本；本课也没有把这页经文与通行本逐字对勘。
        </p>
        <p className="md-note">
          {m.credit}{' '}
          <a href={m.url} target="_blank" rel="noreferrer">
            Wikimedia Commons 文件页
          </a>
          {' · '}
          <a href={m.record} target="_blank" rel="noreferrer">
            法国国家图书馆目录
          </a>
        </p>
      </figcaption>
    </figure>
  );
}

/** 六 · after "所以，本部分要做的，不是讲述……": how later 禅 pictured 惠能. */
export function LiangKaiBamboo() {
  const m = LIANGKAI_BAMBOO;
  if (!m.available) return null;
  return (
    <figure className="md g4-fig c3-scroll">
      <img src={m.src} width={m.width} height={m.height} alt={m.alt} loading="lazy" decoding="async" />
      <figcaption>
        <p>
          <b>{m.title}。</b>画的是禅宗六祖惠能砍竹子：一个在劳作中的普通人，而不是端坐说法的祖师。
        </p>
        <p>
          这幅画作于惠能（713 年去世）身后大约五百年，作者也只是"传为"梁楷。它不是关于惠能本人的证据，而是宋代禅宗怎样想象自己祖师的证据：和《坛经》一样，"惠能的故事"是后来一步步形成的。
        </p>
        <CcBySaNote m={m} />
      </figcaption>
    </figure>
  );
}

/** 六 · 「不立文字？」, after the paradox paragraph. */
export function LiangKaiSutra() {
  const m = LIANGKAI_SUTRA;
  if (!m.available) return null;
  return (
    <figure className="md g4-fig c3-scroll">
      <img src={m.src} width={m.width} height={m.height} alt={m.alt} loading="lazy" decoding="async" />
      <figcaption>
        <p>
          <b>{m.title}。</b>六祖举起经卷，把它撕碎：这是"不立文字"最直接的图像。
        </p>
        <p>
          但请注意这个悖论在画里也存在：一幅表现"撕掉经卷"的画，本身被珍藏、流传了几百年，成了禅宗文化的一部分。和《斫竹图》一样，它是宋代的想象，不是惠能生平的记录。
        </p>
        <CcBySaNote m={m} />
      </figcaption>
    </figure>
  );
}
