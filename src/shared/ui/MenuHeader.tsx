
"use client";

import { useState } from 'react';
import { useResponsive } from '@/shared/hooks';

interface MenuItem {
  label: string;
  href: string;
}

function MenuHeader() {
  const { isMobile } = useResponsive();
  const [activeIndex, setActiveIndex] = useState(0); // Default first item is active

  const menuItems: MenuItem[] = [
    { label: 'همه', href: '#' },
    { label: 'صعودی', href: '#' },
    { label: 'نزولی', href: '#' },
    { label: 'مهم', href: '#' }
  ];

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

  if (isMobile) {
    // Mobile vertical layout
    return (
      <ul className='w-full flex flex-col gap-2'>
        {menuItems.map((item, index) => (
          <li 
            key={index} 
            className={`cursor-pointer hover:bg-white/20 py-3 px-4 rounded-lg transition-all duration-300 ease-out ${activeIndex === index ? "bg-amber-600" : ""}`}
            onClick={() => handleItemClick(index)}
          >
            <a href={item.href} className='font-bold text-white block'>
              <span>{item.label}</span> 
            </a>
          </li>
        ))}
      </ul>
    );
  }

  // Desktop horizontal layout
  return (
    <ul className='w-full flex items-center justify-center gap-2 ml-20'>
      {menuItems.map((item, index) => (
        <li 
          key={index} 
          className={`cursor-pointer hover:bg-white/20 py-1 px-5 rounded-lg transition-all duration-300 ease-out ${activeIndex === index ? "bg-amber-600" : ""}`}
          onClick={() => handleItemClick(index)}
        >
          <a href={item.href} className='font-bold'>
            <span>{item.label}</span> 
          </a>
        </li>
      ))}
    </ul>
  );
}

export default MenuHeader;
