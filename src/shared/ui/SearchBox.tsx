"use client";

import { IoMdSearch } from 'react-icons/io'
import { useResponsive } from '@/shared/hooks';

// Specify the type for the search box
interface SearchBox {
    className?: string
}

function SearchBox({className = ''}: SearchBox) {
  const { isMobile } = useResponsive();
  
  return (
    <label className={`relative group ${className}`}>
        <input 
          className={`
            bg-[#23232d] w-full rounded-xl 
            ${isMobile ? 'py-3 pr-12 pl-3 text-base' : 'py-2 pr-10 pl-2 text-sm'} 
            focus:outline-0 focus:ring-2 focus:ring-amber-500/50
            transition-all duration-200
          `} 
          type="search" 
          placeholder='جستجو....' 
        />
        <span className={`
          absolute right-3 top-1/2 -translate-y-1/2 
          ${isMobile ? 'text-2xl' : 'text-xl'} 
          group-focus-within:drop-shadow-md 
          group-focus-within:drop-shadow-amber-600 
          group-focus-within:text-amber-500
          transition-all duration-200
        `}>
          <IoMdSearch />
        </span>
    </label>
  )
}

export default SearchBox