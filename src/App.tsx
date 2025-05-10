
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { SidebarProvider } from "./components/ui/sidebar";

const queryClient = new QueryClient();

// Composant pour les routes protégées nécessitant une authentification admin
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, userRole } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (userRole !== 'admin') {
    return <Navigate to="/prompt-analyzer" />;
  }
  
  return <SidebarWrapper>{children}</SidebarWrapper>;
};

// Composant pour les routes accessibles aux utilisateurs authentifiés
const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

// Composant pour rediriger les utilisateurs selon leur rôle
const RoleBasedRedirect = () => {
  const { isAuthenticated, userRole } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return userRole === 'admin' ? <Navigate to="/dashboard" /> : <Navigate to="/prompt-analyzer" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirection basée sur le rôle */}
      <Route path="/" element={<RoleBasedRedirect />} />
      
      {/* Routes protégées par admin */}
      <Route path="/dashboard" element={<AdminRoute><Index /></AdminRoute>} />
      <Route path="/agents" element={<AdminRoute><Agents /></AdminRoute>} />
      <Route path="/workflows" element={<AdminRoute><Workflows /></AdminRoute>} />
      <Route path="/storage" element={<AdminRoute><Storage /></AdminRoute>} />
      <Route path="/sources" element={<AdminRoute><Sources /></AdminRoute>} />
      <Route path="/connectors" element={<AdminRoute><Connectors /></AdminRoute>} />
      <Route path="/analytics" element={<AdminRoute><Analytics /></AdminRoute>} />
      <Route path="/settings" element={<AdminRoute><Settings /></AdminRoute>} />
      
      {/* Routes d'analyse de prompt accessibles à tous les utilisateurs authentifiés */}
      <Route path="/prompt-analyzer" element={<AuthRoute><PromptAnalyzer /></AuthRoute>} />
      <Route path="/analysis-results" element={<AuthRoute><AnalysisResults /></AuthRoute>} />
      
      {/* Routes accessibles à tous */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <SidebarProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </SidebarProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
