import { useEffect } from 'react';
import { useAuth } from '@/shared/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLanguage } from '@/shared/lang';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const { language } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      const errorMessage = language === 'en' ? 'Log in to your account!' : 'Войдите в аккаунт!';
      
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
        theme: 'dark',
        toastId: 'auth-required'
      });
    }
  }, [isAuthenticated, isLoading, language]);

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};