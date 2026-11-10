import { RAMABAI_1887, ROY_MINIATURE, TAGORE_SCHOOL, VIVEKANANDA_1893 } from '../assets';
import { Fig } from '../ia1/Fig';

// 近代与殖民时期的印度哲学 (IN8): five images approved 2026-11-09; one removed
// in the final review the same day
// (content/V21_IN8_IMAGE_APPROVAL_SHEET.md; public/media/in8/SOURCES.md).

/** 一 · 「一场关于学校的争论」, after its first paragraph. */
export const RoyMiniature = () => (
  <Fig m={ROY_MINIATURE}>
    这是一幅十九世纪的象牙细密画，不是照片；本课用的是 1934 年印在杂志上的复制图。画家不详，确切的作画年份也不清楚，不能确定是否据罗伊本人写生。罗伊 1833 年死于英国布里斯托尔。
  </Fig>
);

/** 二 · 「辨喜」, after the first paragraph. */
export const Vivekananda1893 = () => (
  <Fig m={VIVEKANANDA_1893}>
    1893 年 9 月，辨喜在芝加哥世界宗教议会上发表了本章引用的致辞。据 Commons 的记载，这张照片摄于同年的芝加哥。
  </Fig>
);

/** 二 · 「拉玛拜」, after the paragraph on The High-Caste Hindu Woman. */
export const Ramabai1887 = () => (
  <Fig m={RAMABAI_1887}>
    本章引用的《高种姓印度妇女》在美国印行，书前就是这张像和她的签名。这本书用英文写成，读者首先是美国人。
  </Fig>
);


/** 六 · 「一所树下的学校」, after the first paragraph. */
export const TagoreSchool = () => (
  <Fig m={TAGORE_SCHOOL} kind="photo">
    泰戈尔 1901 年在圣蒂尼克坦创办了这所学校，课常常在树下上。照片中各人的身份，包括泰戈尔坐在哪里，本课没有核实。
  </Fig>
);
