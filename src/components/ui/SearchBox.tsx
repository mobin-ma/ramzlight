import { IoMdSearch } from 'react-icons/io'

// Specify the type for the search box
interface SearchBox {
    className: string
}

function SearchBox({className}: SearchBox) {
  return (
    <label className={`relative group ${className}`}>
        <input className='bg-[#23232d] w-full rounded-xl py-2 pr-10 pl-2 focus:outline-0' type="search" placeholder='جستجو....' />
        <span className='absolute right-2 top-1/2 -translate-y-1/2 text-2xl group-focus-within:drop-shadow-md group-focus-within:drop-shadow-amber-600 group-focus-within:text-amber-500'><IoMdSearch /></span>
    </label>
  )
}

export default SearchBox