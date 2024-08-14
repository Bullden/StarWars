import { render, screen, fireEvent } from '@testing-library/react'
import HeroComponent from './HeroComponent'
import { starWarsApi } from '../../services/api'

jest.mock('../../services/api')

describe('HeroComponent', () => {
  const mockSelectHero = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should display heroes after fetching', async () => {
    const mockHeroes = { results: [{ name: 'Luke Skywalker', id: 1 }] }
    starWarsApi.getHeroes.mockResolvedValueOnce(mockHeroes)

    render(<HeroComponent selectHero={mockSelectHero} />)

    const heroName = await screen.findByText(/Luke Skywalker/i)
    expect(heroName).toBeInTheDocument()
    expect(starWarsApi.getHeroes).toHaveBeenCalledTimes(1)
  })

  it('should call selectHero when a hero is clicked', async () => {
    const mockHeroes = { results: [{ name: 'Luke Skywalker', id: 1 }] }
    starWarsApi.getHeroes.mockResolvedValueOnce(mockHeroes)

    render(<HeroComponent selectHero={mockSelectHero} />)

    const heroButton = await screen.findByText(/Luke Skywalker/i)
    fireEvent.click(heroButton)

    expect(mockSelectHero).toHaveBeenCalledWith({ name: 'Luke Skywalker', id: 1 })
  })
})
