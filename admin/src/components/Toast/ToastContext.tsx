'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import Toast from './Toast';

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface ToastData {
  variant: ToastVariant;
  title: string;
  message: string;
}

interface ToastContextType {
  showToast: (variant: ToastVariant, title: string, message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastData | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const showToast = useCallback((variant: ToastVariant, title: string, message: string) => {
    setToast({ variant, title, message });

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      setToast(null);
    }, 3000);

    setTimeoutId(newTimeoutId);
  }, [timeoutId]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          variant={toast.variant}
          title={toast.title}
          message={toast.message}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
