"use client";

import { useState, useEffect } from 'react';
import { HiMenu, HiX, HiNewspaper } from 'react-icons/hi';
import { useResponsive } from '@/shared/hooks';

interface SidebarDrawerProps {
  children: React.ReactNode;
  title?: string;
}

function SidebarDrawer({ children, title = "اخبار" }: SidebarDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile, isTablet } = useResponsive();

  // Close drawer when screen size changes to desktop
  useEffect(() => {
    if (!isMobile && !isTablet) {
      setIsOpen(false);
    }
  }, [isMobile, isTablet]);

  // Close drawer on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isMobile && !isTablet) return null;

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed bottom-6 right-6 z-40
          w-14 h-14 
          bg-amber-600 hover:bg-amber-700
          text-white rounded-full
          shadow-lg hover:shadow-xl
          transition-all duration-300 ease-out
          transform hover:scale-110 active:scale-95
          flex items-center justify-center
          ${isOpen ? 'rotate-180' : 'rotate-0'}
        `}
        aria-label={isOpen ? 'بستن فهرست اخبار' : 'باز کردن فهرست اخبار'}
      >
        {isOpen ? (
          <HiX className="w-6 h-6" />
        ) : (
          <HiNewspaper className="w-6 h-6" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 h-full 
          ${isMobile ? 'w-80 max-w-[85vw]' : 'w-96'}
          bg-[#191921]/95 backdrop-blur-lg border-l border-[#1f2025]
          transform transition-all duration-300 ease-out z-40
          ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
          flex flex-col shadow-2xl
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#1f2025]/50 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-3">
            <HiNewspaper className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-white">{title}</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="بستن"
          >
            <HiX className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1f2025]/50 backdrop-blur-sm bg-[#191921]/80 shrink-0">
          <div className="text-xs text-gray-400 text-center">
            برای بستن، خارج از منو کلیک کنید
          </div>
        </div>
      </div>
    </>
  );
}

export default SidebarDrawer;