import { lazy, Suspense } from 'react';
import type { MediaId } from '../../content/media';
import './media.css';

// Each component is loaded only when its section is opened.
const COMPONENTS = {
  'context-strip': lazy(() => import('./ContextStrip')),
  'ox-mountain': lazy(() => import('./OxMountain')),
  'case-sorter': lazy(() => import('./CaseSorter')),
  'kant-context': lazy(() => import('./kant/KantContext')),
  'judgment-explorer': lazy(() => import('./kant/JudgmentExplorer')),
  'cognition-explorer': lazy(() => import('./kant/CognitionExplorer')),
  'appearance-explorer': lazy(() => import('./kant/AppearanceExplorer')),
  'ci-workshop': lazy(() => import('./kant/CIWorkshop')),
  'dialogue-explorer': lazy(() => import('./in1/DialogueExplorer')),
  'mahavira-folio': lazy(() => import('./in1/MahaviraFolio')),
  'many-sided': lazy(() => import('./in1/ManySided')),
  'evidence-workshop': lazy(() => import('./in1/EvidenceWorkshop')),
  'parmenides-explorer': lazy(() => import('./gr1/ParmenidesExplorer')),
  'change-explorer': lazy(() => import('./gr1/ChangeExplorer')),
  'sokrates-gem': lazy(() => import('./gr1/SokratesGem')),
  'laches-workshop': lazy(() => import('./gr1/LachesWorkshop')),
} satisfies Record<MediaId, unknown>;

export default function Media({ id }: { code: string; id: MediaId }) {
  const C = COMPONENTS[id];
  return (
    <Suspense fallback={<div className="md md--loading" aria-hidden="true" />}>
      <C />
    </Suspense>
  );
}
