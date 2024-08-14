import { StyledWrapSpin } from './styled'
import spin from '../../assets/spin.svg'

const Loader = () => {
  return (
    <StyledWrapSpin>
      <img src={spin} alt='Loading spinner' />
    </StyledWrapSpin>
  )
}

export default Loader
