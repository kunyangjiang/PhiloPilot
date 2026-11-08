import ConceptMap from './ConceptMap';
import { CN6_MAP } from './data-cn6';

// 导读 · after the paragraph linking this course to the previous one: the
// shared map with this course's data.
export default function MapCN6() {
  return <ConceptMap cfg={CN6_MAP} />;
}
