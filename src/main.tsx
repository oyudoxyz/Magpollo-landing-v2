import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/motion.css'
import './styles/illustrations.css'

const root = document.getElementById("root")!;

// Prerendered pages arrive with markup in #root: hydrate. Anything else mounts
// fresh — including the dev server, where #root holds only the template comment.
if (root.firstElementChild) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
