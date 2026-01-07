"use client";

import { SearchBox, MenuHeader, ProfileHeader, Logo, MobileMenu } from '@/shared/ui'
import { useResponsive } from '@/shared/hooks';

function Header() {
  const { isMobile } = useResponsive();

  return (
    <header className="header">
      <Logo />
      
      {/* Desktop Search */}
      {!isMobile && <SearchBox className='min-w-10 flex-1 max-w-md mx-4'/>}
      
      {/* Desktop Menu */}
      {!isMobile && <MenuHeader />}
      
      <div className="flex items-center gap-3">
        {/* Mobile Search - Hidden for now, can be toggled */}
        {isMobile && (
          <SearchBox className='hidden'/>
        )}
        
        <ProfileHeader />
        
        {/* Mobile Menu */}
        <MobileMenu>
          <div className="space-y-4">
            {/* Mobile Navigation */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">دسته‌بندی‌ها</h3>
              <MenuHeader />
            </div>
            
            {/* Mobile Search */}
            <div className="pt-4 border-t border-[#1f2025]">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">جستجو</h3>
              <SearchBox className=''/>
            </div>
          </div>
        </MobileMenu>
      </div>
    </header>
  )
}

export default Header;