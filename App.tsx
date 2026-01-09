
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';
import Home from './pages/Home';
import Admin from './pages/Admin';

// Component to handle scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // "redirect on u side of the page" - Scroll to top-left
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

// Wrapper for page transitions "slowlinga anmikated"
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {children}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AdminProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/admin" element={<PageWrapper><Admin /></PageWrapper>} />
        </Routes>
      </AdminProvider>
    </BrowserRouter>
  );
};

export default App;
