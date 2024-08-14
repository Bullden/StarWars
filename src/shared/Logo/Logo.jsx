import logo from '../../assets/Star_Wars_Logo.png'
import { StyledLogo } from './styled'

const Logo = ({ setShowCrawl }) => {
  return <StyledLogo style={{ width: 350 }} src={logo} alt='Star Wars Logo' onClick={() => setShowCrawl(false)} />
}
export default Logo
