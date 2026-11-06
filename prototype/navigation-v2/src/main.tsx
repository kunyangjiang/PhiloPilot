import { createRoot } from 'react-dom/client';
// All fonts are SIL Open Font License, bundled locally via @fontsource.
import '@fontsource/noto-sans-sc/400.css';
import '@fontsource/noto-sans-sc/500.css';
import '@fontsource/noto-sans-sc/700.css';
import '@fontsource/noto-serif-sc/400.css';
import '@fontsource/noto-serif-sc/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import '@fontsource/jost/400.css';
import '@fontsource/jost/500.css';
import '@fontsource/courier-prime/400.css';
import '@fontsource/courier-prime/700.css';
import './styles/base.css';
import './styles/swiss.css';
import './styles/transit.css';
import './styles/catalogue.css';
import App from './App';
import { getMotion, getStyle } from './state/store';

document.documentElement.dataset.motion = getMotion();
document.documentElement.dataset.style = getStyle();
createRoot(document.getElementById('root')!).render(<App />);
