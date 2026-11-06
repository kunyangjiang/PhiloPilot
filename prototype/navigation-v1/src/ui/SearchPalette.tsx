import { useEffect, useMemo, useRef, useState } from 'react';
import { COURSES, REGIONS, TOPICS } from '../data/catalog';
import { SECTIONS } from '../content/cn1';
import { navigate, type Route } from '../router';
import { setTrail } from '../state/store';
import { HOME_CRUMB } from './Chrome';

// Discreet global search over regions, questions, prototype courses and the
// real CN1 headings. Opens with Ctrl/⌘+K or “/”.

let opener: (() => void) | null = null;
export const openSearch = () => opener?.();

interface Item {
  group: string;
  label: string;
  sub: string;
  go?: () => void;
}

export default function SearchPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    opener = () => {
      lastFocus.current = document.activeElement as HTMLElement;
      setOpen(true);
    };
    const k = (e: KeyboardEvent) => {
      const typing = /INPUT|TEXTAREA/.test((e.target as HTMLElement).tagName);
      if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !typing)) {
        e.preventDefault();
        opener?.();
      }
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);

  useEffect(() => {
    if (open) {
      setQ('');
      setSel(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    } else lastFocus.current?.focus?.();
  }, [open]);

  const items = useMemo<Item[]>(() => {
    const to = (r: Route, trail = [HOME_CRUMB]) => () => {
      setTrail(trail);
      setOpen(false);
      navigate(r);
    };
    const all: Item[] = [
      ...REGIONS.map((r) => ({
        group: '区域',
        label: r.title,
        sub: r.en,
        go: to(r.id === 'questions' ? { name: 'questions' } : { name: 'region', region: r.id }),
      })),
      ...TOPICS.map((t) => ({
        group: '问题',
        label: `${t.title}：${t.question}`,
        sub: t.implemented ? '已展开' : 'V1 未展开',
        go: t.implemented ? to({ name: 'topic', topic: t.id }) : undefined,
      })),
      ...COURSES.map((c) => ({
        group: '课程',
        label: `${c.code} ${c.title}`,
        sub: c.implemented ? '可阅读（样章草稿）' : 'V1 未实现',
        go: c.implemented ? to({ name: 'course', code: c.code }) : undefined,
      })),
      ...SECTIONS.flatMap((s) => [
        { group: 'CN1 章节', label: s.title, sub: 'CN1', go: to({ name: 'reader', code: 'CN1', section: s.index }) },
        ...s.headings.map((h) => ({
          group: 'CN1 章节',
          label: h.text,
          sub: `CN1 · ${s.title}`,
          go: to({ name: 'reader', code: 'CN1', section: s.index, block: h.block }),
        })),
      ]),
    ];
    const needle = q.trim().toLowerCase();
    const list = needle ? all.filter((i) => (i.label + i.sub).toLowerCase().includes(needle)) : all.filter((i) => i.group !== 'CN1 章节').slice(0, 14);
    return list.slice(0, 40);
  }, [q]);

  if (!open) return null;
  const pick = (i: Item | undefined) => i?.go?.();
  return (
    <div className="palette-backdrop" onClick={() => setOpen(false)}>
      <div className="palette" role="dialog" aria-modal="true" aria-label="搜索" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          value={q}
          placeholder="搜索课程、问题、CN1 章节……（例如：牛山、四端、荀子）"
          aria-label="搜索"
          aria-controls="palette-list"
          onChange={(e) => {
            setQ(e.target.value);
            setSel(0);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setOpen(false);
            if (e.key === 'ArrowDown') (e.preventDefault(), setSel((s) => Math.min(items.length - 1, s + 1)));
            if (e.key === 'ArrowUp') (e.preventDefault(), setSel((s) => Math.max(0, s - 1)));
            if (e.key === 'Enter') pick(items[sel]);
          }}
        />
        <ul id="palette-list" role="listbox">
          {items.length === 0 && <li className="pl-empty">没有找到匹配的内容</li>}
          {items.map((it, i) => (
            <li
              key={it.group + it.label + i}
              role="option"
              aria-selected={i === sel}
              aria-disabled={!it.go}
              className={(i === sel ? 'sel ' : '') + (it.go ? '' : 'disabled')}
              onMouseEnter={() => setSel(i)}
              onClick={() => pick(it)}
            >
              <span className="pl-group">{it.group}</span>
              <span className="pl-label">{it.label}</span>
              <span className="pl-sub">{it.sub}</span>
            </li>
          ))}
        </ul>
        <p className="pl-foot">↑↓ 选择 · Enter 打开 · Esc 关闭 · 灰色条目在 V1 中尚未实现</p>
      </div>
    </div>
  );
}
