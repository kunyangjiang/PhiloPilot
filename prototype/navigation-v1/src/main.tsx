import { createRoot } from 'react-dom/client';
import '@fontsource/noto-serif-sc/400.css';
import '@fontsource/noto-serif-sc/600.css';
import '@fontsource/noto-serif-sc/700.css';
import '@fontsource/cormorant-garamond/400-italic.css';
import '@fontsource/cormorant-garamond/500.css';
import './styles/base.css';
import './styles/explore.css';
import './styles/course.css';
import './styles/reader.css';
import App from './App';
import { getMotion } from './state/store';

document.documentElement.dataset.motion = getMotion();
createRoot(document.getElementById('root')!).render(<App />);
