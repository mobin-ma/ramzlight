"use client"
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

function ProfileHeader() {
    // To show the Dropdown menu
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const { logout } = useAuth();

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
            <div className='
                w-8 h-8
                flex items-center justify-center 
                rounded-full bg-amber-600 
                font-bold 
                cursor-pointer'
            >
                M
            </div>

            
            {/* Dropdown */}    
            <ul className={`
                absolute left-0 top-10
                min-w-[120px]
                flex flex-col gap-1
                rounded-xl
                border border-gray-700
                bg-[#121117]
                px-3 py-2
                text-sm text-white

                opacity-0 scale-95
                transition-all duration-200 ease-out

                ${
                    showMenu ? "opacity-100 scale-100" : ""
                }
            `}>
                <li className='cursor-pointer rounded-md px-2 py-1 hover:bg-white/10'>پروفایل</li>
                <li className='cursor-pointer rounded-md px-2 py-1 hover:bg-white/10'>تنظیمات</li>
                <li 
                    className='cursor-pointer rounded-md px-2 py-1 hover:bg-rose-500/10'
                >
                    <button onClick={handleLogout} className='text-rose-500 cursor-pointer'>خروج</button>
                </li>
            </ul>
        </div>
    )
}

export default ProfileHeader