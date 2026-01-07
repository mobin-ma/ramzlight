"use client"
import { useState } from 'react'
import { useAuth, useResponsive } from '@/shared/hooks'

function ProfileHeader() {
    // To show the Dropdown menu
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const { logout } = useAuth();
    const { isMobile } = useResponsive();

    const handleLogout = async (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent event bubbling
        await logout();
        setShowMenu(false);
    };

    return (
        <div 
        className='relative inline-block justify-self-end'
        onClick={() => setShowMenu(prev => !prev)}
        >
            {/* Avatar */}
            <div className={`
                ${isMobile ? 'w-9 h-9' : 'w-8 h-8'}
                flex items-center justify-center 
                rounded-full bg-amber-600 
                font-bold 
                cursor-pointer
                transition-all duration-200
            `}>
                M
            </div>

            
            {/* Dropdown */}    
            <ul className={`
                absolute ${isMobile ? 'left-0' : 'left-0'} top-10
                ${isMobile ? 'min-w-[140px]' : 'min-w-[120px]'}
                flex flex-col gap-1
                rounded-xl
                border border-gray-700
                bg-[#121117]
                ${isMobile ? 'px-4 py-3' : 'px-3 py-2'}
                ${isMobile ? 'text-base' : 'text-sm'} text-white
                shadow-lg
                z-50

                opacity-0 scale-95
                transition-all duration-200 ease-out

                ${
                    showMenu ? "opacity-100 scale-100" : "pointer-events-none"
                }
            `}>
                <li className={`cursor-pointer rounded-md ${isMobile ? 'px-3 py-2' : 'px-2 py-1'} hover:bg-white/10 transition-colors`}>
                    پروفایل
                </li>
                <li className={`cursor-pointer rounded-md ${isMobile ? 'px-3 py-2' : 'px-2 py-1'} hover:bg-white/10 transition-colors`}>
                    تنظیمات
                </li>
                <li className={`cursor-pointer rounded-md ${isMobile ? 'px-3 py-2' : 'px-2 py-1'} hover:bg-rose-500/10 transition-colors`}>
                    <button onClick={handleLogout} className='text-rose-500 cursor-pointer w-full text-right'>
                        خروج
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default ProfileHeader;