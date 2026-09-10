import { BrowserRouter, HashRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

// Static previews (no server rewrites) build with VITE_ROUTER=hash.
const Router = import.meta.env.VITE_ROUTER === "hash" ? HashRouter : BrowserRouter;

const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;
