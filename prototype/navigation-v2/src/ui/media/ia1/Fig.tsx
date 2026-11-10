import type { ReactNode } from 'react';
import '../gr4/gr4.css';
import '../cn4/cn4.css';
import './v21.css';

// One captioned image for the V21 courses (IN8, IA1, IA2). Images approved by
// the Product Owner on 2026-11-09 (content/V21_*_IMAGE_APPROVAL_SHEET.md);
// each file is recorded in public/media/<course>/SOURCES.md.

interface Img {
  available: boolean;
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  credit: string;
  url: string;
}

export function Fig({ m, kind = 'portrait', link = 'Wikimedia Commons 文件页', children }: { m: Img; kind?: 'portrait' | 'photo' | 'page'; link?: string; children: ReactNode }) {
  if (!m.available) return null;
  const cls = 'md g4-fig' + (kind === 'photo' ? ' c4-photo' : kind === 'page' ? ' v21-page' : '');
  return (
    <figure className={cls}>
      <img src={m.src} width={m.width} height={m.height} alt={m.alt} loading="lazy" decoding="async" />
      <figcaption>
        <p>
          <b>{m.title}。</b>
          {children}
        </p>
        <p className="md-note">
          {m.credit}{' '}
          <a href={m.url} target="_blank" rel="noreferrer">
            {link}
          </a>
        </p>
      </figcaption>
    </figure>
  );
}
