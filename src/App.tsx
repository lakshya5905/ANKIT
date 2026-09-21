import React from 'react';
import { RouterProvider, useLocation, matchRoute, RouteParamsProvider, Link } from './routes/router';
import { AuthProvider } from './context/AuthContext';
import { PropertyProvider } from './context/PropertyContext';
import { CompareProvider } from './context/CompareContext';
import { UIProvider } from './context/UIContext';

// Layout components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { EnquiryModal } from './components/layout/EnquiryModal';
import { ToastContainer } from './components/common/ToastContainer';
import { CompareBar } from './components/compare/CompareBar';

// Public pages
import { HomePage } from './pages/HomePage';
import { PropertiesBrowsePage } from './pages/PropertiesBrowsePage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { ComparePage } from './pages/ComparePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

// Admin pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminPropertiesListPage } from './pages/admin/AdminPropertiesListPage';
import { AdminPropertyFormPage } from './pages/admin/AdminPropertyFormPage';
import { AdminEnquiriesPage } from './pages/admin/AdminEnquiriesPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminRouteGuard } from './routes/AdminRouteGuard';
import { Button } from './components/common/Button';
import { ShieldAlert } from 'lucide-react';

const AppContent: React.FC = () => {
  const { pathname } = useLocation();

  // 1. Admin Login Page (Dedicated public login route)
  if (pathname === '/admin/login') {
    return <AdminLoginPage />;
  }

  // 2. Admin Protected Routes
  if (pathname === '/admin') {
    return (
      <AdminRouteGuard>
        <AdminDashboardPage />
      </AdminRouteGuard>
    );
  }

  if (pathname === '/admin/properties') {
    return (
      <AdminRouteGuard>
        <AdminPropertiesListPage />
      </AdminRouteGuard>
    );
  }

  if (pathname === '/admin/properties/new') {
    return (
      <AdminRouteGuard>
        <AdminPropertyFormPage />
      </AdminRouteGuard>
    );
  }

  const editPropMatch = matchRoute('/admin/properties/:id/edit', pathname);
  if (editPropMatch.match) {
    return (
      <AdminRouteGuard>
        <RouteParamsProvider params={editPropMatch.params}>
          <AdminPropertyFormPage />
        </RouteParamsProvider>
      </AdminRouteGuard>
    );
  }

  if (pathname === '/admin/enquiries') {
    return (
      <AdminRouteGuard>
        <AdminEnquiriesPage />
      </AdminRouteGuard>
    );
  }

  if (pathname === '/admin/settings') {
    return (
      <AdminRouteGuard>
        <AdminSettingsPage />
      </AdminRouteGuard>
    );
  }

  // 3. Public Routes (Wrapped with public Header, Footer, WhatsApp & Compare Dock)
  const renderPublicContent = () => {
    if (pathname === '/') {
      return <HomePage />;
    }

    if (pathname === '/properties') {
      return <PropertiesBrowsePage />;
    }

    const propDetailMatch = matchRoute('/properties/:id', pathname);
    if (propDetailMatch.match) {
      return (
        <RouteParamsProvider params={propDetailMatch.params}>
          <PropertyDetailPage />
        </RouteParamsProvider>
      );
    }

    if (pathname === '/compare') {
      return <ComparePage />;
    }

    if (pathname === '/about') {
      return <AboutPage />;
    }

    if (pathname === '/contact') {
      return <ContactPage />;
    }

    // 404 Fallback
    return (
      <div className="py-24 px-4 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-[#0f383c] mb-2">Page Not Found</h1>
        <p className="text-sm text-slate-600 mb-6">
          The page you requested does not exist or has been moved.
        </p>
        <Link to="/">
          <Button variant="primary" size="md">
            Return to Homepage
          </Button>
        </Link>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-slate-800">
      <Header />
      <main className="flex-1">
        {renderPublicContent()}
      </main>
      <Footer />
      <FloatingWhatsApp />
      <CompareBar />
      <EnquiryModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <AuthProvider>
        <PropertyProvider>
          <CompareProvider>
            <UIProvider>
              <AppContent />
            </UIProvider>
          </CompareProvider>
        </PropertyProvider>
      </AuthProvider>
    </RouterProvider>
  );
}
