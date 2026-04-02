import { useState, useEffect, useCallback } from 'react';

export default function Toast({ message, type = 'success', visible, onClose }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => onClose(), 4000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <div className={`toast toast--${type} ${visible ? 'toast--visible' : ''}`} id="toast-notification">
      {message}
    </div>
  );
}

// Custom hook for toast
export function useToast() {
  const [toast, setToast] = useState({ message: '', type: 'success', visible: false });

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, visible: true });
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, visible: false }));
  }, []);

  return { toast, showToast, hideToast };
}
