
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SidebarWrapper from "./components/layout/Sidebar";
import Index from "./pages/Index";
import Agents from "./pages/Agents";
import Workflows from "./pages/Workflows";
import Storage from "./pages/Storage";
import Sources from "./pages/Sources";
import Connectors from "./pages/Connectors";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import Analytics from "./pages/Analytics";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Settings from "./pages/Settings";
import PromptAnalyzer from "./pages/PromptAnalyzer";
import AnalysisResults from "./pages/AnalysisResults";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SidebarWrapper><Index /></SidebarWrapper>} />
          <Route path="/agents" element={<SidebarWrapper><Agents /></SidebarWrapper>} />
          <Route path="/workflows" element={<SidebarWrapper><Workflows /></SidebarWrapper>} />
          <Route path="/storage" element={<SidebarWrapper><Storage /></SidebarWrapper>} />
          <Route path="/sources" element={<SidebarWrapper><Sources /></SidebarWrapper>} />
          <Route path="/connectors" element={<SidebarWrapper><Connectors /></SidebarWrapper>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/analytics" element={<SidebarWrapper><Analytics /></SidebarWrapper>} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/settings" element={<SidebarWrapper><Settings /></SidebarWrapper>} />
          <Route path="/prompt-analyzer" element={<SidebarWrapper><PromptAnalyzer /></SidebarWrapper>} />
          <Route path="/analysis-results" element={<SidebarWrapper><AnalysisResults /></SidebarWrapper>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
