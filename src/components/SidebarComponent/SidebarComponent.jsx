import { useEffect, useState, useCallback } from 'react'
import { StyledCloseButton, StyledSidebarContainer } from './styled'
import { starWarsApi } from '../../services/api'
import GraphComponent from '../GraphComponent/GraphComponent'

const SidebarComponent = ({ isOpen, toggleSidebar, selectedHero }) => {
  const [filmsWithHero, setFilmsWithHero] = useState([])
  const [heroStarships, setHeroStarships] = useState([])
  const isMobile = window.innerWidth < 768

  const fetchFilms = useCallback(async () => {
    // Get new films every time when hero changed
    const { films } = selectedHero
    if (films?.length) {
      try {
        const result = await starWarsApi.getFilms(films)
        setFilmsWithHero(result.results)
      } catch (error) {
        console.error('Error fetching films:', error)
        setFilmsWithHero([])
      }
    } else {
      setFilmsWithHero([])
    }
  }, [selectedHero])

  const fetchStarships = useCallback(async () => {
    // Get new starships every time when hero changed
    const { starships } = selectedHero
    if (starships?.length) {
      try {
        const result = await starWarsApi.getStarships(selectedHero.id)
        setHeroStarships(result.results)
      } catch (error) {
        console.error('Error fetching starships:', error)
        setHeroStarships([])
      }
    } else {
      setHeroStarships([])
    }
  }, [selectedHero])

  useEffect(() => {
    setHeroStarships([])
    fetchFilms()
    fetchStarships()
  }, [selectedHero, fetchFilms, fetchStarships])

  return (
    <StyledSidebarContainer isOpen={isOpen} isMobile={isMobile}>
      <StyledCloseButton onClick={toggleSidebar}>×</StyledCloseButton>
      <GraphComponent heroName={selectedHero.name} filmsWithHero={filmsWithHero} heroStarships={heroStarships} />
    </StyledSidebarContainer>
  )
}

export default SidebarComponent
