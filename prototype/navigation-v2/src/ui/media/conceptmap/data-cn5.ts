import type { MapConfig } from './types';

// 魏晋玄学与中国佛学: the map as seen from this course. Every link restates a
// judgement made in content/CN5_SAMPLE_DRAFT.md (or, for the last column, in
// the shared map of the two production reports); quoted words are the
// chapter's own checked passages.

export const CN5_MAP: MapConfig = {
  code: 'CN5',
  id: 'concept-map-cn5',
  title: '概念地图：从"空"和"无"到下一门课的"心"与"性"',
  lede: '本课追踪的几个概念，经过翻译、争论和重新建构，一直延伸到宋明理学。选一个人物或文本，看它和哪些说法有联系，以及这是哪一种联系。',
  cols: ['印度来源与翻译', '魏晋玄学', '南北朝至唐的佛教', '下一门课：宋明理学'],
  start: 'sengzhao',
  nodes: [
    { id: 'nagarjuna', label: '龙树《中论》偈', sub: '缘起、空、假名、中道', col: 0, row: 0, where: '二、"一个词的旅行"（本课只转述大意）' },
    { id: 'kumarajiva', label: '罗什译偈', sub: '"我說即是無"', col: 0, row: 1, where: '二、"一个词的旅行"' },
    { id: 'qingmu', label: '青目释（罗什译）', sub: '"無自性故空"', col: 0, row: 2, where: '二、"一个词的旅行"' },
    { id: 'wangbi', label: '王弼', sub: '以无为本；得意忘象', col: 1, row: 0, where: '一、玄学' },
    { id: 'guoxiang', label: '郭象', sub: '无不能生有；自生', col: 1, row: 1, where: '一、玄学' },
    { id: 'benwu', label: '本无宗', sub: '万物以"无"为本', col: 1, row: 2, where: '二、"另一个例子：本无"；三、《不真空论》' },
    { id: 'sengzhao', label: '僧肇', sub: '不真空：不有，不无', col: 2, row: 0, where: '三、僧肇：空不是虚无' },
    { id: 'daosheng', label: '竺道生', sub: '顿悟成佛', col: 2, row: 1, where: '六、"顿悟"早已有之' },
    { id: 'zhiyi', label: '智顗', sub: '即空即假即中', col: 2, row: 2, where: '四、天台：空、假、中' },
    { id: 'fazang', label: '法藏', sub: '一即一切；六相', col: 2, row: 3, where: '五、华严：整体与部分' },
    { id: 'tanjing', label: '《坛经》（敦煌本）', sub: '法无顿渐；定慧如灯光', col: 2, row: 4, where: '六、禅：顿与渐' },
    { id: 'zongmi', label: '宗密', sub: '"息妄修心宗"：拂拭', col: 2, row: 5, where: '六、"镜子和拂拭"' },
    { id: 'buddhism', label: '佛教（总称）', sub: '文献与修行', col: 2, row: 6, where: '全课' },
    { id: 'zhangzai', label: '张载', sub: '太虚即气，则无无', col: 3, row: 0, where: '下一门课 二' },
    { id: 'chenghao', label: '程颢', sub: '《定性书》', col: 3, row: 1, where: '下一门课 一' },
    { id: 'chengyi', label: '程颐', sub: '圣人本天，释氏本心', col: 3, row: 2, where: '下一门课 一' },
    { id: 'zhuxi', label: '朱熹', sub: '理一分殊；磨镜', col: 3, row: 3, where: '下一门课 三' },
    { id: 'wangyangming', label: '王阳明', sub: '知行合一', col: 3, row: 4, where: '下一门课 五' },
  ],
  links: [
    { from: 'nagarjuna', to: 'kumarajiva', kind: 'response', note: '罗什在409年前后译出《中论》；偈颂里把这个词译成"無"。' },
    { from: 'kumarajiva', to: 'qingmu', kind: 'response', note: '同一部译本中，青目的注释解释这首偈时用了"空"："無自性故空"。' },
    { from: 'wangbi', to: 'kumarajiva', kind: 'comparison', note: '熟悉玄学的读者，可能把"我說即是無"读成王弼意义上的"无"。这是本课对当时读者的推断，不是有记载的事件。' },
    { from: 'nagarjuna', to: 'sengzhao', kind: 'response', note: '僧肇是罗什的弟子，《不真空论》写"《中觀》云"；但所引的"物從因緣故不有，緣起故不無"，在罗什译本中找不到逐字相同的句子。' },
    { from: 'benwu', to: 'sengzhao', kind: 'response', note: '《不真空论》点名批评本无宗是"好無之談"：把"不是真有"误解成"什么都没有"。' },
    { from: 'guoxiang', to: 'sengzhao', kind: 'comparison', note: '两人都不在万物之外设立根本；但僧肇否认事物"自生"、自足。僧肇没有引用郭象，我们不知道他是否读过郭象的注。' },
    { from: 'wangbi', to: 'daosheng', kind: 'response', note: '《高僧传》记道生说"夫象以盡意，得意則象忘"，几乎就是王弼《周易略例·明象》的话。' },
    { from: 'kumarajiva', to: 'zhiyi', kind: 'response', note: '《摩诃止观》引这首偈，作"我說即是空"，并从中读出空、假、中三谛。' },
    { from: 'sengzhao', to: 'fazang', kind: 'comparison', note: '金子没有自性、随工匠之缘成为狮子，和僧肇"待缘而后有"是同一个道理；但"金体不无"带来了一个僧肇没有的不对称。' },
    { from: 'zhiyi', to: 'tanjing', kind: 'comparison', note: '天台说三谛不是三个阶段，《坛经》说定和慧像灯和光：两者都反对把修行理解为先后的阶梯。' },
    { from: 'daosheng', to: 'tanjing', kind: 'comparison', note: '道生的"顿悟"主要说真理不可分割；它和禅宗的"顿悟"是不是同一个意思，学者有不同看法。' },
    { from: 'tanjing', to: 'zongmi', kind: 'response', note: '宗密把"拂拭"镜子作为"息妄修心宗"的特征，并把神秀一系归入这一宗；"拂拭 = 渐修 = 北宗"的联想很大程度来自这种后来的整理。' },
    { from: 'wangbi', to: 'zhangzai', kind: 'response', note: '张载批评"有生於無"，点名的是"老氏"；他针对的是一般的读法，不是王弼本人的"无"。' },
    { from: 'buddhism', to: 'zhangzai', kind: 'response', note: '张载批评佛教"以山河大地為見病"；本课认为这更像针对一般的理解，僧肇本人反对"以山河大地为虚无"。' },
    { from: 'tanjing', to: 'chengyi', kind: 'response', note: '程颐说"聖人本天，釋氏本心"：禅宗"识心见性"一类的思想，正是理学回应的对象。' },
    { from: 'wangbi', to: 'chenghao', kind: 'comparison', note: '王弼说圣人"應物而無累於物"，程颢《定性书》说"情順萬事而無情"。本课第一部分注释留待下一门课的问题，在那里作为比较来讨论。' },
    { from: 'buddhism', to: 'chenghao', kind: 'contact', note: '据程颐为程颢写的行状，程颢"出入於老、釋者幾十年"。这证明他学过佛教，不证明他借用了哪一种说法。' },
    { from: 'fazang', to: 'zhuxi', kind: 'comparison', note: '华严"一即一切"和朱熹"理一分殊"（海水与一杓一碗）结构相似；有学者认为华严影响了朱熹，这是一种学术观点。两者的"理"内容不同：朱熹的理是仁义礼智，不是空。' },
    { from: 'zongmi', to: 'zhuxi', kind: 'comparison', note: '神秀拂拭的镜子和朱熹"逐旋磨去"的镜子结构相似；但镜子的比喻比佛教更早见于《庄子》，两者擦掉的东西也不同。' },
    { from: 'buddhism', to: 'zhuxi', kind: 'contact', note: '朱熹早年学过禅（戴震所引朱熹《答汪尚书》；本课没有核对原信）。' },
    { from: 'tanjing', to: 'wangyangming', kind: 'comparison', note: '"定慧一体"和"知行合一"都用体用的框架反对分成先后两截；没有证据表明后者是从前者改造来的。' },
  ],
  caution: '最后一栏属于下一门课《宋明理学至清代：理、心与实学》。理学不是佛教的衍生物：那一栏的线大多是"回应"或"比较"，只有两条"接触"，没有一条表示理学的学说来自佛教。',
};
