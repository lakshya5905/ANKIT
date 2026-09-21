import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from '../../routes/router';
import { useAuth } from '../../hooks/useAuth';
import {
  LayoutDashboard,
  Building,
  PlusCircle,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  actionButton?: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  pageTitle,
  actionButton
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', to: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Properties', to: '/admin/properties', icon: <Building className="w-4 h-4" /> },
    { label: 'Add Property', to: '/admin/properties/new', icon: <PlusCircle className="w-4 h-4" /> },
    { label: 'Enquiries', to: '/admin/enquiries', icon: <Inbox className="w-4 h-4" /> },
    { label: 'Settings', to: '/admin/settings', icon: <Settings className="w-4 h-4" /> }
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const isActive = (to: string) => {
    if (to === '/admin') return pathname === '/admin';
    return pathname.startsWith(to);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F6] flex text-slate-800">
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0a2729] text-white border-r border-teal-950 shrink-0">
        {/* Brand Header */}
        <div className="h-18 px-6 flex items-center gap-3 border-b border-teal-900/60">
          <img
            src="https://res.cloudinary.com/c3jvvveh/image/upload/v1789923920/fauji-properties-logo.png"
            alt="Fauji Properties"
            className="h-9 w-auto object-contain shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col text-left">
            <span className="font-bold text-sm tracking-tight text-white">Fauji Admin</span>
            <span className="text-[10px] uppercase font-semibold text-emerald-400">Portal v1.0</span>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-3 py-6 flex flex-col gap-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-teal-400/80 text-left">
            Management
          </div>
          {navItems.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/20'
                    : 'text-stone-300 hover:text-white hover:bg-teal-900/40'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Footer User Info & Exit */}
        <div className="p-4 border-t border-teal-900/60 flex flex-col gap-3">
          <div className="px-2 text-left">
            <div className="text-xs font-bold text-white truncate">{user?.name || 'Administrator'}</div>
            <div className="text-[11px] text-stone-400 truncate">{user?.email || 'admin@fauji.com'}</div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-teal-900/40">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-emerald-300 transition-colors"
              title="Return to Public Site"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 transition-colors"
              title="Log Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-xs"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-[#0a2729] text-white flex flex-col transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 px-5 flex items-center justify-between border-b border-teal-900/60">
          <div className="flex items-center gap-2.5">
            <img
              src="https://res.cloudinary.com/c3jvvveh/image/upload/v1789923920/fauji-properties-logo.png"
              alt="Fauji Properties"
              className="h-8 w-auto object-contain shrink-0"
              referrerPolicy="no-referrer"
            />
            <span className="font-bold text-sm text-white">Fauji Admin</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="text-stone-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  active
                    ? 'bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/20'
                    : 'text-stone-300 hover:text-white hover:bg-teal-900/40'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-teal-900/60 flex flex-col gap-3">
          <Link
            to="/"
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-2 text-xs text-stone-300 hover:text-emerald-300"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Public Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-rose-400 hover:text-rose-300"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top bar */}
        <header className="h-18 bg-white border-b border-stone-200/90 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg border border-stone-200 text-slate-700 hover:bg-stone-50"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {pageTitle}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {actionButton}
          </div>
        </header>

        {/* Child Views */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

    </div>
  );
};
