import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import LetsBuild from "./pages/LetsBuild";
import SalesOpsSystem from "./pages/SalesOpsSystem";
import CustomCommerce from "./pages/CustomCommerce";
import WorkIndex from "./pages/WorkIndex";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Analytics />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/lets-build" element={<LetsBuild />} />
          <Route path="/work" element={<WorkIndex />} />
          <Route path="/work/custom-commerce" element={<CustomCommerce />} />
          <Route path="/work/sales-ops-system" element={<SalesOpsSystem />} />
          <Route path="/case-study" element={<SalesOpsSystem />} />
          <Route path="/proof-of-work" element={<WorkIndex />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
