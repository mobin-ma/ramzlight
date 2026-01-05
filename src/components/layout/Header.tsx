import SearchBox from '../ui/SearchBox'
import Logo from '../ui/Logo'
import MenuHeader from '../ui/MenuHeader'
import ProfileHeader from '../ui/ProfileHeader'

function Header() {
  return (
    <div className="header">
        <Logo />
        <SearchBox className=''/>
        <MenuHeader />
        <ProfileHeader />
    </div>
  )
}

export default Header