"use client";

import { HiNewspaper, HiSearch, HiMenu } from 'react-icons/hi';
import { useState } from 'react';
import { useResponsive } from '@/shared/hooks';

interface QuickActionsProps {
  onNewsClick?: () => void;
  onSearchClick?: () => void;
  onMenuClick?: () => void;
}

function QuickActions({ onNewsClick, onSearchClick, onMenuClick }: QuickActionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isMobile } = useResponsive();

  if (!isMobile) return null;

  const actions = [
    {
      icon: HiNewspaper,
      label: 'اخبار',
      onClick: onNewsClick,
      color: 'bg-amber-600 hover:bg-amber-700'
    },
    {
      icon: HiSearch,
      label: 'جستجو',
      onClick: onSearchClick,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      icon: HiMenu,
      label: 'منو',
      onClick: onMenuClick,
      color: 'bg-green-600 hover:bg-green-700'
    }
  ];

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* Expanded Actions */}
      {isExpanded && (
        <div className="flex flex-col gap-3 mb-3">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => {
                action.onClick?.();
                setIsExpanded(false);
              }}
              className={`
                w-12 h-12 ${action.color}
                text-white rounded-full shadow-lg
                transition-all duration-300 ease-out
                transform hover:scale-110 active:scale-95
                flex items-center justify-center
                animate-scale-in
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
              aria-label={action.label}
            >
              <action.icon className="w-5 h-5" />
            </button>
          ))}
        </div>
      )}

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          w-14 h-14 bg-gray-700 hover:bg-gray-600
          text-white rounded-full shadow-lg hover:shadow-xl
          transition-all duration-300 ease-out
          transform hover:scale-110 active:scale-95
          flex items-center justify-center
          ${isExpanded ? 'rotate-45' : 'rotate-0'}
        `}
        aria-label={isExpanded ? 'بستن منوی سریع' : 'باز کردن منوی سریع'}
      >
        <div className="relative">
          <div className="w-6 h-0.5 bg-white rounded-full"></div>
          <div className="w-6 h-0.5 bg-white rounded-full rotate-90 absolute top-0"></div>
        </div>
      </button>
    </div>
  );
}

export default QuickActions;