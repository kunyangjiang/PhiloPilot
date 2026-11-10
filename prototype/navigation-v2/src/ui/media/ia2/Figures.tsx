import { FORGET_P142 } from '../assets';
import { Fig } from '../ia1/Fig';

// 法拉比与阿维森纳 (IA2): two images approved 2026-11-09; one removed
// in the final review the same day
// (content/V21_IA2_IMAGE_APPROVAL_SHEET.md; public/media/ia2/SOURCES.md).

/** 四 · 「阿维森纳自己的话」, after the paragraph that introduces the two passages. */
export const ForgetP142 = () => (
  <Fig m={FORGET_P142} kind="page" link="archive.org 扫描本此页">
    下面两段引文就是从这一页录出的：页上前两个以“<bdi lang="ar">إشارة</bdi>”（指要）开头的段落。页底的法文注记载了各抄本的异读，例如注 b 和 d：两个抄本把“<bdi lang="ar">مرتّبة</bdi>”（依次排列的）写作“<bdi lang="ar">مترتّبة</bdi>”（见注释 23）。扫描本的自动文字层错误很多，本章是对着这张页面图像逐字录出的。
  </Fig>
);
