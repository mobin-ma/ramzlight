"use client";

import { MainArticle } from "@/features/articles/components";
import { Sidebar } from "@/components/layout";
import { SidebarDrawer } from "@/shared/ui";
import { useResponsive } from "@/shared/hooks";

export default function Home() {
  const { isMobile, isTablet } = useResponsive();

  return (
    <div className="flex flex-col lg:flex-row gap-3 sm:gap-5 lg:gap-7 h-[80vh]">
      {/* Desktop Sidebar - Shows beside content on desktop */}
      {!isMobile && !isTablet && (
        <div className="w-80 shrink-0">
          <Sidebar />
        </div>
      )}
      
      {/* Mobile/Tablet Sidebar Drawer */}
      {(isMobile || isTablet) && (
        <SidebarDrawer title="فهرست اخبار">
          <Sidebar />
        </SidebarDrawer>
      )}
      
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <MainArticle />
      </div>
    </div>
  );
}
