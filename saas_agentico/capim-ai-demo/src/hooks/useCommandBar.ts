import { useState, useEffect } from 'react';

export interface UseCommandBarReturn {
  isOpen: boolean;
  openCommandBar: () => void;
  closeCommandBar: () => void;
  toggleCommandBar: () => void;
}

export const useCommandBar = (): UseCommandBarReturn => {
  const [isOpen, setIsOpen] = useState(false);

  const openCommandBar = () => setIsOpen(true);
  const closeCommandBar = () => setIsOpen(false);
  const toggleCommandBar = () => setIsOpen(prev => !prev);

  // Global keyboard listener for Ctrl/Cmd + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleCommandBar();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    isOpen,
    openCommandBar,
    closeCommandBar,
    toggleCommandBar
  };
};