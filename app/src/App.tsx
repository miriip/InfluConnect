import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { NotificationsProvider } from '@/contexts/NotificationsContext';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterInfluencerPage } from '@/pages/RegisterInfluencerPage';
import { RegisterBrandPage } from '@/pages/RegisterBrandPage';
import { HomePage } from '@/pages/HomePage';
import { BrandDashboard } from '@/pages/BrandDashboard';
import { InfluencerDashboard } from '@/pages/InfluencerDashboard';
import { SettingsPage } from '@/pages/SettingsPage';
import { AdminDashboard } from '@/pages/AdminDashboard';
import { Toaster } from '@/components/ui/sonner';
import './App.css';

function AppContent() {
  const { currentView } = useAuth();

  switch (currentView) {
    case 'landing':
      return <LandingPage />;
    case 'login':
      return <LoginPage />;
    case 'register-influencer':
      return <RegisterInfluencerPage />;
    case 'register-brand':
      return <RegisterBrandPage />;
    case 'home':
      return <HomePage />;
    case 'brand-dashboard':
      return <BrandDashboard />;
    case 'influencer-dashboard':
      return <InfluencerDashboard />;
    case 'settings':
      return <SettingsPage />;
    case 'admin-dashboard':
      return <AdminDashboard />;
    default:
      return <LandingPage />;
  }
}

function AppWithNotifications() {
  const { user } = useAuth();
  return (
    <NotificationsProvider userId={user?.id ?? null}>
      <AppContent />
    </NotificationsProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppWithNotifications />
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#141414',
            color: '#fff',
            border: '1px solid #2A2A2A',
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
