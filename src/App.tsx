import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ProtectedRoute from "./components/ProtectedRoute";
import { EventStoreProvider } from "@/contexts/EventStore";
import PageTransition from "./components/PageTransition";

import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import GoogleAuthPage from "./pages/GoogleAuthPage";

import EventsPage from "./pages/EventsPage";
import PublicEventDetailPage from "./pages/PublicEventDetailPage";

import VendorsDirectoryPage from "./pages/VendorsDirectoryPage";
import VendorProfileDetailPage from "./pages/VendorProfileDetailPage";

import CreateEventPage from "./pages/CreateEventPage";
import CreateVendorPage from "./pages/CreateVendorPage";

import Dashboard from "./pages/Dashboard";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "demo-google-client-id.apps.googleusercontent.com";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <EventStoreProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <PageTransition>
                <Routes>
                  {/* Public Discovery Routes (Section 18) */}
                  <Route path="/" element={<Index />} />
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/explore" element={<Navigate to="/events" replace />} />
                  <Route path="/events-near-me" element={<Navigate to="/events" replace />} />
                  <Route path="/events/:id" element={<PublicEventDetailPage />} />

                  <Route path="/vendors" element={<VendorsDirectoryPage />} />
                  <Route path="/vendors/:id" element={<VendorProfileDetailPage />} />

                  {/* Authentication Routes */}
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/login" element={<Navigate to="/signin" replace />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/auth/google" element={<GoogleAuthPage />} />
                  <Route path="/signin/google" element={<Navigate to="/auth/google" replace />} />

                  {/* Authenticated Creation & Editing Routes */}
                  <Route path="/create/event" element={<ProtectedRoute><CreateEventPage /></ProtectedRoute>} />
                  <Route path="/create-event" element={<Navigate to="/create/event" replace />} />
                  <Route path="/events/:id/edit" element={<ProtectedRoute><CreateEventPage /></ProtectedRoute>} />
                  <Route path="/create/vendor" element={<ProtectedRoute><CreateVendorPage /></ProtectedRoute>} />
                  <Route path="/create-vendor" element={<Navigate to="/create/vendor" replace />} />

                  {/* Authenticated Dashboard Routes */}
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/projects" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/projects/*" element={<Navigate to="/dashboard" replace />} />

                  {/* Admin Moderation Route */}
                  <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />

                  {/* Fallback 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </PageTransition>
            </BrowserRouter>
          </TooltipProvider>
        </EventStoreProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </QueryClientProvider>
);

export default App;
