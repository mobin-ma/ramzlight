
function MenuHeader() {
  return (
    <ul className='w-full flex items-center justify-center'>
        <li className='cursor-pointer hover:bg-white/20 py-1 px-5 rounded-lg transition-transform duration-300 ease-out'>
            <a href="#" className='font-bold'>
                <span>همه</span> 
            </a>
        </li>
        <li className='cursor-pointer hover:bg-white/20 py-1 px-5 rounded-lg transition-transform duration-300 ease-out'>
            <a href="#" className='font-bold'>
                <span>صعودی</span> 
            </a>
        </li>
        <li className='cursor-pointer hover:bg-white/20 py-1 px-5 rounded-lg transition-transform duration-300 ease-out'>
            <a href="#" className='font-bold'>
                <span>نزولی</span> 
            </a>
        </li>
        <li className='cursor-pointer hover:bg-white/20 py-1 px-5 rounded-lg transition-transform duration-300 ease-out'>
            <a href="#" className='font-bold'>
                <span>مهم</span> 
            </a>
        </li>
    </ul>
  )
}

export default MenuHeader