import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/motion.css'
import './styles/illustrations.css'

const root = document.getElementById("root")!;

// Prerendered pages arrive with markup in #root: hydrate. Anything else mounts fresh.
if (root.hasChildNodes()) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
