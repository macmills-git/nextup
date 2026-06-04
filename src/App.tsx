import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { EventStoreProvider } from "@/contexts/EventStore";
import PageTransition from "./components/PageTransition";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import VendorDashboard from "./pages/VendorDashboard";
import FeaturesPage from "./pages/FeaturesPage";
import PricingPage from "./pages/PricingPage";
import DocsPage from "./pages/DocsPage";
import TemplatesPage from "./pages/TemplatesPage";
import EventsNearMePage from "./pages/EventsNearMePage";
import PublicEventDetailPage from "./pages/PublicEventDetailPage";
import EventWorkspacePage from "./pages/dashboard/EventWorkspacePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Send user to the right home based on role
const RoleHome = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (user?.role === "vendor") return <Navigate to="/vendor" replace />;
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <EventStoreProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <PageTransition>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/events-near-me" element={<EventsNearMePage />} />
            <Route path="/events/:id" element={<PublicEventDetailPage />} />
            <Route path="/events/:id/workspace" element={<ProtectedRoute><EventWorkspacePage /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><RoleHome><Dashboard /></RoleHome></ProtectedRoute>} />
            <Route path="/dashboard/*" element={<ProtectedRoute><RoleHome><Dashboard /></RoleHome></ProtectedRoute>} />
            <Route path="/vendor" element={<ProtectedRoute><VendorDashboard /></ProtectedRoute>} />
            <Route path="/vendor/*" element={<ProtectedRoute><VendorDashboard /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </PageTransition>
        </BrowserRouter>
      </TooltipProvider>
      </EventStoreProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
