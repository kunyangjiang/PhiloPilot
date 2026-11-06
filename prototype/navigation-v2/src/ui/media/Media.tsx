import { lazy, Suspense } from 'react';
import type { MediaId } from '../../content/cn1-media';
import './media.css';

// Each component is loaded only when its section is opened.
const COMPONENTS = {
  'context-strip': lazy(() => import('./ContextStrip')),
  'ox-mountain': lazy(() => import('./OxMountain')),
  'case-sorter': lazy(() => import('./CaseSorter')),
} satisfies Record<MediaId, unknown>;

export default function Media({ id }: { id: MediaId }) {
  const C = COMPONENTS[id];
  return (
    <Suspense fallback={<div className="md md--loading" aria-hidden="true" />}>
      <C />
    </Suspense>
  );
}
