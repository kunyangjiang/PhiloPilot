// All 72 course codes and tiers, as listed in planning/CURRICULUM_REFERENCE_DRAFT.md
// (one "#### CODE ● Title" heading per course). Used for the unit chart.
// Chinese names are presentation translations of the curriculum's English
// titles for this prototype only (示意译名), not curriculum text.
import type { RegionId, Tier } from './catalog';

const RAW =
  'A1● A2○ A3● A4○ GR1● GR2● GR3● GR4○ CN1● CN2● CN3● CN4● CN5● CN6● CN7● CN8○ IN1● IN2● IN3● IN4● IN5● IN6● IN7○ IN8○ ' +
  'IA1● IA2● IA3● IA4○ IA5○ JW1◐ EA1● EA2● EA3● EA4● EA5● EA6● EA7○ EA8● EA9● EA10● EA11○ EA12○ AF1● AF2○ AF3◐ JP1◐ KR1◐ LA1◐ ' +
  'S1● S2● S3○ S4● S5● S6● S7● S8○ S9● S10● S11○ S12● S13○ D1● D2○ D3● D4○ D5○ D6● D7○ D8○ D9○ D10○ D11●';

export const NAMES: Record<string, string> = {
  A1: '什么是哲学？问题、论证与阅读',
  A2: '形式推理：命题逻辑与谓词逻辑',
  A3: '概念、案例与思想实验',
  A4: '诠释、翻译与哲学写作',
  GR1: '古希腊哲学的起源：从自然到经省察的人生',
  GR2: '柏拉图：知识、灵魂与正义之城',
  GR3: '亚里士多德：实体、原因、逻辑与美好生活',
  GR4: '希腊化与罗马哲学：作为生活实践的哲学',
  CN1: '孔子、孟子与荀子：修养、礼与人性',
  CN2: '墨家、名家与后期墨经：论证、语言与科学',
  CN3: '道家传统：老子、庄子及其读者',
  CN4: '法家、汉代综合与阴阳五行',
  CN5: '魏晋玄学与中国佛学：空、自然与顿悟',
  CN6: '宋明理学至清代：理、心与实学',
  CN7: '中国哲学与现代：从晚清变法到新文化运动',
  CN8: '哲学体系、马克思主义与当代中国哲学',
  IN1: '起源与早期论争：吠陀、奥义书与沙门诸派',
  IN2: '早期佛教与阿毗达磨：苦、无我与缘起',
  IN3: '知识、推理与辩论：正理、胜论与佛教因明',
  IN4: '大乘哲学：中观与瑜伽行派',
  IN5: '权威、语言与义务：弥曼差派',
  IN6: '梵、自我与世界：吠檀多派',
  IN7: '意识、物质与修行：数论与瑜伽派',
  IN8: '近代与殖民时期的印度哲学',
  IA1: '翻译运动、凯拉姆与哲学的兴起',
  IA2: '法拉比与阿维森纳：存在与灵魂的系统哲学',
  IA3: '安萨里、阿威罗伊与西方伊斯兰思想',
  IA4: '照明学派、苏非形而上学与后古典诸派',
  IA5: '近现代伊斯兰与阿拉伯思想',
  JW1: '犹太哲学：从萨阿迪亚到列维纳斯',
  EA1: '从古代晚期到经院哲学',
  EA2: '近代早期理性主义与新科学',
  EA3: '经验论、启蒙与自由主义的起源',
  EA4: '康德：批判、自主与判断',
  EA5: '德国观念论与浪漫主义',
  EA6: '黑格尔之后：马克思、克尔凯郭尔、叔本华与尼采',
  EA7: '自由主义、功利主义与实用主义',
  EA8: '逻辑、语言与分析哲学的兴起',
  EA9: '现象学、存在主义与诠释学',
  EA10: '1950 年后的分析哲学：自然主义、意义与模态',
  EA11: '1950 年后的道德与政治哲学',
  EA12: '批判理论、结构主义、后结构主义与女性主义理论',
  AF1: '非洲哲学思想：来源、争论与方法',
  AF2: '后殖民与当代非洲哲学',
  AF3: '非洲裔与黑色大西洋哲学',
  JP1: '日本哲学：佛教思想、江户儒学与京都学派',
  KR1: '韩国哲学：佛教、理学论争与现代',
  LA1: '拉丁美洲哲学：征服、独立与解放',
  S1: '知识与怀疑',
  S2: '形而上学：存在、实体、共相与模态',
  S3: '因果、规律与时间',
  S4: '人格、自我与自由意志',
  S5: '心灵哲学与意识',
  S6: '语言、意义与指称',
  S7: '伦理学：对与善、道德修养',
  S8: '元伦理学与道德心理学',
  S9: '政治哲学：权威、正义与权利',
  S10: '科学哲学',
  S11: '逻辑哲学与数学哲学',
  S12: '宗教哲学、死亡与人生意义',
  S13: '美学与艺术哲学',
  D1: '比较哲学：方法与陷阱',
  D2: '自我、人格与无我',
  D3: '跨传统的知识、怀疑与论证规则',
  D4: '德性、关怀与关系：跨传统伦理',
  D5: '跨传统的政治秩序与正当性',
  D6: '哲学中的性别、种族与帝国',
  D7: '技术哲学与人工智能',
  D8: '生命伦理学',
  D9: '环境伦理学',
  D10: '传播与交流：我们实际知道什么',
  D11: '独立哲学研究（毕业项目）',
};

const TIER: Record<string, Tier> = { '●': 'core', '◐': 'elective', '○': 'extended' };
// Short group labels shown under the squares of the history row.
const TRADITION: Record<string, string> = {
  GR: '希腊罗马',
  CN: '中国',
  IN: '印度',
  IA: '伊斯兰与犹太',
  JW: '伊斯兰与犹太',
  EA: '欧洲',
  AF: '非洲',
  JP: '日·韩·拉美',
  KR: '日·韩·拉美',
  LA: '日·韩·拉美',
};

export interface Unit {
  code: string;
  name: string;
  tier: Tier;
  region: RegionId;
  group: string;
}

export const UNITS: Unit[] = RAW.split(' ').map((t) => {
  const code = t.slice(0, -1);
  const prefix = code.replace(/\d+$/, '');
  const region: RegionId = prefix === 'A' ? 'methods' : prefix === 'S' ? 'questions' : prefix === 'D' ? 'dialogue' : 'history';
  const group = region === 'methods' ? '哲学方法' : region === 'questions' ? '系统哲学' : region === 'dialogue' ? '比较与当代' : TRADITION[prefix];
  return { code, name: NAMES[code], tier: TIER[t.slice(-1)], region, group };
});

/** Units of one region, split into consecutive groups (traditions for history). */
export function groupsOf(region: RegionId): { label: string; units: Unit[] }[] {
  const out: { label: string; units: Unit[] }[] = [];
  for (const u of UNITS.filter((x) => x.region === region)) {
    const last = out[out.length - 1];
    if (last && last.label === u.group) last.units.push(u);
    else out.push({ label: u.group, units: [u] });
  }
  return out;
}
