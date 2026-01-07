"use client";

import { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { useResponsive } from '@/shared/hooks';

interface MobileMenuProps {
  children: React.ReactNode;
}

function MobileMenu({ children }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useResponsive();

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  if (!isMobile) return null;

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden  p-2 rounded-lg hover:bg-white/10 transition-colors"
        aria-label="منوی موبایل"
      >
        {isOpen ? (
          <HiX className="w-6 h-6 text-white" />
        ) : (
          <HiMenu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/90 min-h-screen z-45 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`
          fixed top-0 right-0 h-full w-80 max-w-[85vw] min-h-screen
          bg-[#17161c] border-l border-[#1f2025]
          transform transition-transform duration-300 ease-in-out z-50
          md:hidden
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#1f2025]">
          <h2 className="text-lg font-bold text-white">منو</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="بستن منو"
          >
            <HiX className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Menu Content */}
        <div className="h-full p-4 overflow-y-auto bg-black/50">
          {children}
        </div>
      </div>
    </>
  );
}

export default MobileMenu;