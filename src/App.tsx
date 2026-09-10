import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import Company from "./pages/Company";
import Careers from "./pages/Careers";
import Work from "./pages/Work";
import LetsBuild from "./pages/LetsBuild";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Static previews (no server rewrites) build with VITE_ROUTER=hash.
const Router = import.meta.env.VITE_ROUTER === "hash" ? HashRouter : BrowserRouter;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner position="bottom-right" closeButton={false} />
      <Analytics />
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/systems" element={<Navigate to="/#systems" replace />} />
          <Route path="/how-we-work" element={<Navigate to="/#systems" replace />} />
          <Route path="/company" element={<Company />} />
          <Route path="/about" element={<Navigate to="/company" replace />} />
          <Route path="/contact" element={<Navigate to="/company" replace />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/lets-build" element={<LetsBuild />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          {/* Proof of work is shared on request. Old case-study URLs land on the request page. */}
          <Route path="/work" element={<Work />} />
          <Route path="/work/*" element={<Navigate to="/work" replace />} />
          <Route path="/proof-of-work" element={<Navigate to="/work" replace />} />
          <Route path="/case-study" element={<Navigate to="/work" replace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
