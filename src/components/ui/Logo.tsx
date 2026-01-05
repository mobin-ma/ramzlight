import Image from 'next/image'
import logo from '../../../public/Logo-RamzLight.png'

function Logo() {
  return (
    <Image src={logo} alt='LOGO' width={150} height={86} />
  )
}

export default Logo