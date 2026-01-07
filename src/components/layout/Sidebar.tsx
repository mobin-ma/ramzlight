"use client";

import { ArticlesList } from "@/features/articles/components"
import { useResponsive } from "@/shared/hooks";

function Sidebar() {
  const { isMobile, isTablet } = useResponsive();
  const isInDrawer = isMobile || isTablet;
  
  return (
    <div className={`
      ${isInDrawer ? 'w-full h-full' : 'w-80 h-full'} 
      ${isInDrawer ? 'bg-transparent' : 'bg-[#191921] border-r border-[#1f2025] rounded-lg'} 
      flex flex-col
    `}>
      {/* Title - Only show when not in drawer (drawer has its own header) */}
      {!isInDrawer && (
        <div className="p-4 border-b border-[#1f2025] shrink-0">
          <h1 className="text-xl font-bold text-white">
            اخبار
          </h1>
        </div>
      )}

      {/* News List */}
      <div className="flex-1 overflow-auto">
        <ArticlesList />
      </div>
    </div>
  )
}

export default Sidebar;