import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

interface RouterContextValue {
  pathname: string;
  navigate: (to: string) => void;
  params: Record<string, string>;
}

const RouterContext = createContext<RouterContextValue>({
  pathname: '/',
  navigate: () => {},
  params: {}
});

function getCleanPath(): string {
  if (typeof window === 'undefined') return '/';

  // Check hash first if hash routing is used (e.g. #/properties)
  if (window.location.hash.startsWith('#/')) {
    return window.location.hash.slice(1);
  }
  
  // Otherwise standard pathname
  return window.location.pathname || '/';
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pathname, setPathname] = useState<string>(getCleanPath);

  useEffect(() => {
    const handlePopState = () => {
      setPathname(getCleanPath());
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigate = (to: string) => {
    if (to === pathname) return;

    // Use pushState with both path and hash-friendly format
    try {
      window.history.pushState({}, '', to);
    } catch {
      // Fallback for strict iframe origin restrictions
      window.location.hash = `#${to}`;
    }
    setPathname(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const contextValue = useMemo(() => ({
    pathname,
    navigate,
    params: {}
  }), [pathname]);

  return (
    <RouterContext.Provider value={contextValue}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => useContext(RouterContext);

export const useNavigate = () => {
  const { navigate } = useContext(RouterContext);
  return navigate;
};

export const useLocation = () => {
  const { pathname } = useContext(RouterContext);
  return { pathname };
};

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  className?: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ to, className, children, onClick, ...rest }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    // Don't intercept modified clicks (cmd/ctrl click to open new tab)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
};

// Route matching utility helper
export function matchRoute(pattern: string, currentPath: string): { match: boolean; params: Record<string, string> } {
  const patternParts = pattern.split('/').filter(Boolean);
  const pathParts = currentPath.split('/').filter(Boolean);

  if (patternParts.length !== pathParts.length) {
    return { match: false, params: {} };
  }

  const params: Record<string, string> = {};

  for (let i = 0; i < patternParts.length; i++) {
    const pPart = patternParts[i];
    const cPart = pathParts[i];

    if (pPart.startsWith(':')) {
      const paramName = pPart.slice(1);
      params[paramName] = decodeURIComponent(cPart);
    } else if (pPart !== cPart) {
      return { match: false, params: {} };
    }
  }

  return { match: true, params };
}

const RouteParamsContext = createContext<Record<string, string>>({});

export const useRouteParams = () => useContext(RouteParamsContext);

export const RouteParamsProvider: React.FC<{ params: Record<string, string>; children: React.ReactNode }> = ({
  params,
  children
}) => {
  return (
    <RouteParamsContext.Provider value={params}>
      {children}
    </RouteParamsContext.Provider>
  );
};
