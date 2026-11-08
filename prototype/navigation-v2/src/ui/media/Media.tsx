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
  'clarke-plato': lazy(() => import('./gr2/ClarkePlato')),
  'euthyphro-workshop': lazy(() => import('./gr2/EuthyphroWorkshop')),
  'divided-line': lazy(() => import('./gr2/DividedLine')),
  'cave-explorer': lazy(() => import('./gr2/CaveExplorer')),
  'third-man': lazy(() => import('./gr2/ThirdMan')),
  'plato-head': lazy(() => import('./gr2/PlatoHead')),
  'bekker-page': lazy(() => import('./gr3/BekkerPage')),
  'aristotle-head': lazy(() => import('./gr3/AristotleHead')),
  'syllogism-lab': lazy(() => import('./gr3/SyllogismLab')),
  'matter-form-change': lazy(() => import('./gr3/MatterFormChange')),
  'four-causes': lazy(() => import('./gr3/FourCausesWorkshop')),
  'virtue-mean': lazy(() => import('./gr3/VirtueMean')),
  'epicurus-head': lazy(() => import('./gr4/EpicurusHead')),
  'desire-explorer': lazy(() => import('./gr4/DesireExplorer')),
  'zeno-head': lazy(() => import('./gr4/ZenoHead')),
  'assent-workshop': lazy(() => import('./gr4/AssentWorkshop')),
  'fate-explorer': lazy(() => import('./gr4/FateExplorer')),
  'modes-lab': lazy(() => import('./gr4/ModesLab')),
  'three-standards': lazy(() => import('./cn2/ThreeStandardsWorkshop')),
  'daozang-page': lazy(() => import('./cn2/DaozangPage')),
  'classification-lab': lazy(() => import('./cn2/ClassificationLab')),
  'pinhole-demo': lazy(() => import('./cn2/PinholeDemo')),
  'white-horse': lazy(() => import('./cn2/WhiteHorseExplorer')),
  'wuwei-explorer': lazy(() => import('./cn3/WuweiExplorer')),
  'perspective-lab': lazy(() => import('./cn3/PerspectiveLab')),
  'butterfly-dream': lazy(() => import('./cn3/ButterflyDream')),
  'cook-ding': lazy(() => import('./cn3/CookDing')),
  'zeshin-scroll': lazy(() => import('./cn3/ZeshinScroll')),
} satisfies Record<MediaId, unknown>;

export default function Media({ id }: { code: string; id: MediaId }) {
  const C = COMPONENTS[id];
  return (
    <Suspense fallback={<div className="md md--loading" aria-hidden="true" />}>
      <C />
    </Suspense>
  );
}
