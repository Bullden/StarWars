import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

// Mock the HeroComponent and Sidebar
jest.mock('./components/HeroComponent/HeroComponent', () => ({ selectHero }) => (
  <div data-testid='hero-component'>
    <button onClick={() => selectHero('Luke Skywalker')}>Select Luke</button>
    <button onClick={() => selectHero('Darth Vader')}>Select Vader</button>
  </div>
))

jest.mock('./components/SidebarComponent/SidebarComponent', () => ({ isOpen, toggleSidebar, selectedHero }) => (
  <div role='complementary' style={{ display: isOpen ? 'block' : 'none' }}>
    <button onClick={toggleSidebar}>×</button>
    <div>{selectedHero}</div>
  </div>
))

describe('App Component', () => {
  it('renders the Star Wars logo', () => {
    render(<App />)
    const logo = screen.getByAltText('Star Wars Logo')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', 'Star_Wars_Logo.png')
    expect(logo).toHaveStyle({ width: '350px' })
  })

  it('renders the HeroComponent', () => {
    render(<App />)
    const heroComponent = screen.getByTestId('hero-component')
    expect(heroComponent).toBeInTheDocument()
  })

  it('opens the sidebar when a hero is selected', () => {
    render(<App />)

    // Simulate selecting a hero
    fireEvent.click(screen.getByText('Select Luke'))

    // Check if the sidebar is opened and displays the selected hero
    const sidebar = screen.getByRole('complementary')
    expect(sidebar).toBeInTheDocument()
    expect(sidebar).toHaveTextContent('Luke Skywalker')
  })

  it('closes the sidebar when the close button is clicked', () => {
    render(<App />)

    // Simulate selecting a hero to open the sidebar
    fireEvent.click(screen.getByText('Select Luke'))

    // Simulate closing the sidebar
    fireEvent.click(screen.getByText('×'))

    const sidebar = screen.queryByRole('complementary')
    expect(sidebar).not.toBeInTheDocument()
  })
})
