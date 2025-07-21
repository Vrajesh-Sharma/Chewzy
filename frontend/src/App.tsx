import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Explore from "./pages/Explore";
import RestaurantDetail from "./pages/RestaurantDetail";
import Collab from "./pages/Collab";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const queryClient = new QueryClient();

const ScrollToTopOnNavigate = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTopOnNavigate />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/:slug" element={<RestaurantDetail />} />
          <Route path="/collab" element={<Collab />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
