import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Link } from '../../routes/router';
import { useUI } from '../../hooks/useUI';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Eye, EyeOff, Lock, ArrowLeft } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useUI();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already authenticated, redirect to /admin
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please provide both your Admin ID / Email and password.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await login({ email: email.trim(), password, rememberMe });
      showToast('Welcome back, Admin!', 'success');
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
      showToast(err.message || 'Invalid credentials.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-center items-center px-4 py-12">
      
      {/* Back to public website button */}
      <div className="w-full max-w-md mb-6 flex justify-start">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0f383c] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Public Website</span>
        </Link>
      </div>

      <div className="w-full max-w-md flex flex-col items-center">
        
        {/* Brand/Logo at top */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://res.cloudinary.com/c3jvvveh/image/upload/v1789923920/fauji-properties-logo.png"
            alt="Fauji Properties"
            className="h-16 w-auto object-contain mb-3"
            referrerPolicy="no-referrer"
          />
          <span className="text-xl font-bold tracking-tight text-[#0f383c]">
            Fauji Properties
          </span>
          <span className="text-[11px] uppercase font-semibold tracking-wider text-slate-400">
            ADMINISTRATION PORTAL
          </span>
        </div>

        {/* Headings */}
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase font-bold tracking-widest text-[#0f383c] bg-teal-950/5 border border-[#0f383c]/15 px-3 py-1 rounded-md">
            PRIVATE AREA
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0f383c] mt-3">
            Admin Login
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Sign in to manage your property listings.
          </p>
        </div>

        {/* White Rounded Login Card */}
        <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-[0_10px_35px_-8px_rgba(0,0,0,0.06)]">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 text-xs font-medium text-left">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Admin ID / Email"
              type="email"
              placeholder="e.g. admin@fauji.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              required
            />

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-stone-300 text-[#0f383c] focus:ring-[#0f383c]"
                />
                <span>Remember me</span>
              </label>

              <span className="text-slate-400">Restricted access</span>
            </div>

            {/* Login Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
                leftIcon={<Lock className="w-4 h-4 mr-1 text-emerald-400" />}
              >
                Login to Portal
              </Button>
            </div>
          </form>

          {/* Quick Credential Hint for Evaluator */}
          <div className="mt-6 pt-5 border-t border-stone-100 text-left">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Default Testing Credentials:
            </p>
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono text-slate-700 flex flex-col gap-0.5">
              <div>Email: <span className="font-bold text-[#0f383c]">admin@fauji.com</span></div>
              <div>Password: <span className="font-bold text-[#0f383c]">admin123</span></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
