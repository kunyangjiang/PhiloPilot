import ConceptMap from './ConceptMap';
import { CN5_MAP } from './data-cn5';

// 六 · after "心、性与下一门课": the shared map with this course's data.
export default function MapCN5() {
  return <ConceptMap cfg={CN5_MAP} />;
}
