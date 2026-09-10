import { Routes, Route, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Careers from "./pages/Careers";
import Work from "./pages/Work";
import LetsBuild from "./pages/LetsBuild";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/** Providers and routes, shared by the browser entry and the prerender entry. */
const AppRoutes = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner position="bottom-right" closeButton={false} />
      <Analytics />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/lets-build" element={<LetsBuild />} />
        <Route path="/work" element={<Work />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        {/* Retired pages. Their content lives on the home page or in the footer. */}
        <Route path="/systems" element={<Navigate to="/#systems" replace />} />
        <Route path="/how-we-work" element={<Navigate to="/#systems" replace />} />
        <Route path="/company" element={<Navigate to="/" replace />} />
        <Route path="/about" element={<Navigate to="/" replace />} />
        <Route path="/contact" element={<Navigate to="/" replace />} />
        {/* Proof of work is shared on request. Old case-study URLs land on the request page. */}
        <Route path="/work/*" element={<Navigate to="/work" replace />} />
        <Route path="/proof-of-work" element={<Navigate to="/work" replace />} />
        <Route path="/case-study" element={<Navigate to="/work" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default AppRoutes;
