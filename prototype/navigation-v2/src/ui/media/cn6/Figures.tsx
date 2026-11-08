import { SHIGUAN_PAGE, TAIJI_TU, ZHUXI_LETTER } from '../assets';
import '../gr4/gr4.css';
import '../cn3/cn3.css';
import '../cn4/cn4.css';

// Images approved by the Product Owner on 2026-11-08
// (content/PHASE13B_IMAGE_APPROVAL_SHEET.md; public/media/cn6/SOURCES.md).

/** 二 · after the paragraph on 自無極而為太極 / 無極而太極. */
export function TaijiTu() {
  const m = TAIJI_TU;
  if (!m.available) return null;
  return (
    <figure className="md g4-fig c3-scroll">
      <img src={m.src} width={m.width} height={m.height} alt={m.alt} loading="lazy" decoding="async" />
      <figcaption>
        <p>
          <b>{m.title}。</b>《太极图说》本来是解释一幅图的文字。这一版本自上而下画出：太极；阳动、阴静；水火木金土五行；乾道成男、坤道成女；万物化生。
        </p>
        <p>
          这是十八世纪初一部官修类书所载的版本，又经过现代重绘，不是周敦颐自己画的图。图的样式在流传中有过变化；图是否源于道教，本课没有讨论（见注释 7）。请注意它最上面一圈只标"太極"：这里看不出"自无极而为太极"和"无极而太极"哪一种读法。
        </p>
        <p className="md-note">
          {m.credit}{' '}
          <a href={m.url} target="_blank" rel="noreferrer">
            Wikimedia Commons 文件页
          </a>
        </p>
      </figcaption>
    </figure>
  );
}

/** 三 · opening, after the note on what kind of text 《朱子语类》 is. */
export function ZhuXiLetter() {
  const m = ZHUXI_LETTER;
  if (!m.available) return null;
  return (
    <figure className="md g4-fig c4-photo">
      <img src={m.src} width={m.width} height={m.height} alt={m.alt} loading="lazy" decoding="async" />
      <figcaption>
        <p>
          <b>朱熹的亲笔信。</b>这封信写于绍熙五年（1194）八月七日。据题名，收信人是一位知郡（州郡长官），信中谈的是官府事务。
        </p>
        <p>
          它和《朱子语类》属于不同层次的文本：语类是学生的笔记，这是朱熹亲手写下的文字。它也提醒我们，朱熹不只是一位讲学的哲学家，同时也是一位处理政务的地方官员。本课没有释读这封信的全文。
        </p>
        <p className="md-note">
          {m.credit}{' '}
          <a href={m.url} target="_blank" rel="noreferrer">
            Wikimedia Commons 文件页
          </a>
          {' · '}
          <a href={m.record} target="_blank" rel="noreferrer">
            国立故宫博物院典藏资料
          </a>
        </p>
      </figcaption>
    </figure>
  );
}

/** 七 · after the 袁枚 evidence paragraph: women's poetry in print. */
export function ShiguanPage() {
  const m = SHIGUAN_PAGE;
  if (!m.available) return null;
  return (
    <figure className="md g4-fig c4-photo">
      <img src={m.src} width={m.width} height={m.height} alt={m.alt} loading="lazy" decoding="async" />
      <figcaption>
        <p>
          <b>一部诗选里的"闺秀别卷"。</b>清初邓汉仪编选当代人的诗，编成《诗观》，并把女性的诗另编为"闺秀别卷"。这一页是二集闺秀别卷的开头：卷名、编选者，然后是第一位女诗人的小传和她的诗。
        </p>
        <p>
          这是一条<b>关于实际活动的证据</b>：早在袁枚之前一百年左右，女性的诗已经被男性编者收集、评点、刻印出版。它不能说明这些女性怎样学诗，也不能说明一般女性能否读写；把女性的诗"另编一卷"，本身也反映了当时的区分。
        </p>
        <p className="md-note">
          {m.credit}{' '}
          <a href={m.url} target="_blank" rel="noreferrer">
            Wikimedia Commons 文件页
          </a>
        </p>
      </figcaption>
    </figure>
  );
}
