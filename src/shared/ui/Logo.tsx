"use client";

import Image from 'next/image'
import { useResponsive } from '@/shared/hooks';
import logo from '../../../public/Logo-RamzLight.png'

function Logo() {
  const { isMobile, isSmall } = useResponsive();
  
  // Responsive sizing
  const width = isSmall ? 100 : isMobile ? 120 : 150;
  const height = isSmall ? 57 : isMobile ? 69 : 86;
  
  return (
    <div className="shrink-0">
      <Image 
        src={logo} 
        alt='رمز لایت' 
        width={width} 
        height={height}
        className="transition-all duration-200"
        priority
      />
    </div>
  )
}

export default Logo;