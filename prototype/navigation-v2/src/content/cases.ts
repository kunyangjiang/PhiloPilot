// PhiloPilot Cases (哲学案例): narrative cases, kept apart from the 72-course
// curriculum and never counted in course totals or course progress.
// The eight titles and directions were sealed by the product owner. CASE 02,
// CASE 03, CASE 04, CASE 05 and CASE 06 are written (see caseBooks.ts); the others list title,
// direction and subjects only and open nothing.

export interface CaseEntry {
  /** Two-digit case number, also the route id (#/cases/02). */
  no: string;
  title: string;
  /** Only for written cases (taken from the manuscript). */
  genre?: string;
  /** One sentence, limited to the sealed direction. */
  premise: string;
  subjects: string[];
  available: boolean;
}

export const CASES: CaseEntry[] = [
  {
    no: '01',
    title: '不存在的原作',
    premise: '一位修复师和一名学生面对一项修复决定。',
    subjects: ['艺术作品的同一性', '作者意图', '复制与临摹'],
    available: false,
  },
  {
    no: '02',
    title: '分洪',
    genre: '灾难惊悚 / 政治与道德哲学 / 职场文学',
    premise: '一场虚构的洪水里，水文预报员沈槐要把一个不确定的预报交给决策者；要不要启用蓄洪区，不由她决定。',
    subjects: ['后果主义与权利', '制度与补偿', '墨家与孟子', '道德运气'],
    available: true,
  },
  {
    no: '03',
    title: '白马非马',
    genre: '职场喜剧 / 逻辑与语言哲学 / 职场文学',
    premise: '一个茶叶合作社要把村名"白马"注册成商标，而另一家公司早已注册了 WHITE HORSE；中年商标审查员方怀礼要决定，这个白马是不是那个马。',
    subjects: ['逻辑', '名与实', '公孙龙与墨辩', '指称'],
    available: true,
  },
  {
    no: '04',
    title: '合法的命令',
    genre: '法庭剧 / 法哲学与政治哲学 / 职场文学',
    premise: '旧政权倒台十年后，资深法官伊莲娜·萨巴要审判一位老法官，审的是他二十年前判下的一个案子；她的书记员发现，那场审判的笔录是自己父亲记的。',
    subjects: ['法律与道德', '哈特与富勒', '拉德布鲁赫', '《克里同》'],
    available: true,
  },
  {
    no: '05',
    title: '镜中之城',
    genre: '哲学科幻 / 心灵哲学与伦理学 / 研究所小说',
    premise: '一座用真实街区的数据造出的模拟城市里，有居民在问卷上写下"这是第几次了"；删除期限只剩四个星期，研究组要决定，这座城只是那片街区的证据，还是里面另有其人（设定为虚构推想）。',
    subjects: ['他心', '道德地位', '模型能否作为证据'],
    available: true,
  },
  {
    no: '06',
    title: '失落的第九卷',
    genre: '哲学推理小说 / 知识论 / 手稿之谜',
    premise: '一册题为"卷九"的清代因明手稿即将被大学图书馆收购，一位文献学者和一座寺院藏经楼的守护者，要弄清它是谁写的、怎样离开寺院，以及一句传了四五手的"只有八卷"还能不能信（寺院、人物与手稿均为虚构）。',
    subjects: ['证言与知识来源', '正理派与陈那'],
    available: true,
  },
  {
    no: '07',
    title: '译名之争',
    premise: '历史一线只以文献呈现，另一条线发生在当下。',
    subjects: ['翻译与概念'],
    available: false,
  },
  {
    no: '08',
    title: '最后一座图书馆',
    premise: '时间紧迫，几方力量围绕一座图书馆的去留。',
    subjects: ['财产与正义', '诺齐克与罗尔斯'],
    available: false,
  },
];

/** Case code used for local storage keys (philopilot.v2.case02.…, philopilot.v2.case04.…). */
export const caseCode = (no: string) => 'CASE' + no;
export const caseByNo = (no: string) => CASES.find((c) => c.no === no);
