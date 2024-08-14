import { useEffect, useState, useCallback } from 'react'
import { starWarsApi } from '../../services/api'
import { StyledName, StyledButton, StyledButtonsWrap, StyledContainer, StyledHero, StyledImg, StyledWrapHeroes } from './styled'
import Loader from '../../shared/Loader/Loader'
import CreepingText from '../../shared/CreepingText/CreepingText'

const HeroComponent = ({ selectHero, setShowCrawl, showCrawl }) => {
  const [heroesInformation, setHeroesInformation] = useState(null)
  const [param, setParam] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(0)

  const handleShowCreepyText = () => {
    setShowCrawl(true)
    setImagesLoaded(0) // Reset image loading count when go to easter egg
  }

  const trimParam = url => {
    const currentParam = url?.split('?')[1] || null
    setParam(currentParam)
    setImagesLoaded(0) // Reset image loading count when the parameter changes
  }

  const getHeroes = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await starWarsApi.getHeroes(param)
      setHeroesInformation(result)
    } catch (error) {
      console.error('Error fetching heroes:', error)
      setIsLoading(false)
    }
  }, [param])

  useEffect(() => {
    getHeroes()
  }, [getHeroes])

  useEffect(() => {
    if (heroesInformation?.results?.length && imagesLoaded === heroesInformation.results.length) {
      setIsLoading(false)
    } else if (heroesInformation) {
      setIsLoading(true)
    }
  }, [imagesLoaded, heroesInformation])

  const handleImageLoad = () => {
    console.log('imagesLoaded', imagesLoaded)
    setImagesLoaded(prevCount => prevCount + 1)
  }

  if (!heroesInformation?.results?.length) {
    return <Loader />
  }

  return (
    <>
      {showCrawl ? (
        <CreepingText />
      ) : (
        <>
          {isLoading && <Loader />}
          <StyledContainer isLoading={isLoading}>
            <StyledWrapHeroes>
              {heroesInformation.results.map(hero => (
                <StyledHero key={hero.id} onClick={() => selectHero(hero)}>
                  <StyledImg onLoad={handleImageLoad} src={`https://starwars-visualguide.com/assets/img/characters/${hero.id}.jpg`} alt={hero.name} />
                  <StyledName>{hero.name}</StyledName>
                </StyledHero>
              ))}
            </StyledWrapHeroes>
            <StyledButtonsWrap>
              <StyledButton onClick={() => trimParam(heroesInformation.previous)} disabled={!heroesInformation.previous}>
                &lt; Previous
              </StyledButton>
              <StyledButton onClick={() => (heroesInformation.next ? trimParam(heroesInformation.next) : handleShowCreepyText())} disabled={false}>
                {heroesInformation.next ? 'Next >' : 'Easter Egg'}
              </StyledButton>
            </StyledButtonsWrap>
          </StyledContainer>
        </>
      )}
    </>
  )
}

export default HeroComponent
