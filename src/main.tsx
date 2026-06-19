import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Tech Recruiter Console Easter Egg
const asciiArt = `
  ████████╗██╗  ██╗███████╗    ███████╗ ██████╗ ██╗     ██╗   ██╗███████╗██████╗ 
  ╚══██╔══╝██║  ██║██╔════╝    ██╔════╝██╔═══██╗██║     ██║   ██║██╔════╝██╔══██╗
     ██║   ███████║█████╗      ███████╗██║   ██║██║     ██║   ██║█████╗  ██████╔╝
     ██║   ██╔══██║██╔══╝      ╚════██║██║   ██║██║     ╚██╗ ██╔╝██╔══╝  ██╔══██╗
     ██║   ██║  ██║███████╗    ███████║╚██████╔╝███████╗ ╚████╔╝ ███████╗██║  ██║
     ╚═╝   ╚═╝  ╚═╝╚══════╝    ╚══════╝ ╚═════╝ ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝
`;

console.log(
  `%c${asciiArt}`,
  'color: #FF4D00; font-weight: bold; font-family: monospace; text-shadow: 0 0 10px rgba(255,77,0,0.5);'
);

console.log(
  '%c🚀 AH, A FELLOW ENGINEER! LOOKING UNDER THE HOOD? 🚀',
  'color: #00FF66; font-size: 14px; font-weight: bold; font-family: monospace; background: #07090d; padding: 6px 12px; border-radius: 4px; border: 1px solid #00FF66;'
);

console.log(
  `%cSince you're inspecting the technical assembly, you deserve something special.

I'm Sundaram Jaiswal — a developer and mathematician who builds high-performance quantitative data models, physics-driven interaction layers, and crypto utility suites.

💼 Want my full curriculum vitae and mathematical logs?
Direct Resume Connection / Secure Mirror:
↳ https://drive.google.com/file/d/1XgG9Vee_FpGskLg3n9zInshN7I88yYjT/view?usp=sharing

📬 Or ping my operational uplink:
sundaram9336492674@gmail.com
`,
  'color: #c4c4c7; font-size: 11px; font-family: monospace; line-height: 1.6;'
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
