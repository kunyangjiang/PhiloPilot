// Data model of the shared concept map (魏晋玄学与中国佛学 ↔ 宋明理学至清代).
// One component, two data configurations. Every link carries one of three
// kinds, and the kind is always written out in words as well as drawn.

export type LinkKind = 'response' | 'contact' | 'comparison';

export const KIND_LABEL: Record<LinkKind, string> = {
  response: '有文献记载的影响或回应',
  contact: '有文献记载的接触',
  comparison: '为教学而作的结构比较',
};

export const KIND_SHORT: Record<LinkKind, string> = {
  response: '影响 / 回应',
  contact: '接触',
  comparison: '比较',
};

export const KIND_EXPLAIN: Record<LinkKind, string> = {
  response: '后来的文本明确提到、引用或回答了前面的说法（实线，箭头指向后来的一方）。',
  contact: '生平材料表明后来的人读过、学过前面的传统，但没有证据指出具体借用了什么（虚线）。',
  comparison: '本课自己把两种说法放在一起比较，没有证据表明一方来自另一方（点线，没有箭头）。',
};

export interface MapNode {
  id: string;
  /** Person, text or school. */
  label: string;
  /** Key phrase. */
  sub: string;
  /** Column (period) and row. */
  col: number;
  row: number;
  /** Where in the course it is read (part name), shown when selected. */
  where: string;
}

export interface MapLink {
  from: string;
  to: string;
  kind: LinkKind;
  /** What the link is, in one sentence, with its evidence or its limit. */
  note: string;
}

export interface MapConfig {
  /** Storage key (per course). */
  code: 'CN5' | 'CN6';
  id: string;
  title: string;
  lede: string;
  cols: string[];
  nodes: MapNode[];
  links: MapLink[];
  /** Node selected when the map is first opened. */
  start: string;
  /** Closing reminder specific to this course. */
  caution: string;
}
