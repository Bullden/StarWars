import { render, screen, fireEvent } from '@testing-library/react'
import GraphComponent from './GraphComponent'

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver

describe('Graph', () => {
  const filmsWithHero = [
    { id: '1', title: 'A New Hope' },
    { id: '2', title: 'The Empire Strikes Back' },
  ]

  const heroStarships = [
    { id: '1', name: 'Jedi Starfighter', films: ['1', '2'] },
    { id: '2', name: 'Millennium Falcon', films: ['2'] },
  ]

  it('should render nodes correctly', () => {
    render(<GraphComponent heroName='Obi-Wan Kenobi' filmsWithHero={filmsWithHero} heroStarships={heroStarships} />)

    // Check if nodes are rendered
    expect(screen.getByText(/Obi-Wan Kenobi/i)).toBeInTheDocument()
    expect(screen.getByText(/A New Hope/i)).toBeInTheDocument()
    expect(screen.getByText(/Jedi Starfighter/i)).toBeInTheDocument()
  })

  it('should highlight connected nodes when a node is clicked', () => {
    render(<GraphComponent heroName='Obi-Wan Kenobi' filmsWithHero={filmsWithHero} heroStarships={heroStarships} />)

    // Simulate clicking on a film node
    fireEvent.click(screen.getByText(/A New Hope/i))
    // Check if related starship nodes are highlighted
    const highlightedStarship = screen.getByTestId('rf__node-starship-1')
    screen.debug(highlightedStarship) // This will print the DOM structure including the styles
    expect(highlightedStarship).toHaveStyle('color: #ffe919') // Adjust the style check according to your implementation
  })
})
