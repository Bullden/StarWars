import { render, screen } from '@testing-library/react'
import SidebarComponent from './SidebarComponent'

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver

describe('Sidebar', () => {
  const mockHero = { name: 'Luke Skywalker', height: '172', mass: '77' }
  const mockToggleSidebar = jest.fn()

  it('should not be visible when isOpen is false', () => {
    render(<SidebarComponent isOpen={false} toggleSidebar={mockToggleSidebar} selectedHero={mockHero} />)

    const sidebar = screen.queryByRole('complementary')
    expect(sidebar).not.toBeInTheDocument() // Ensure the sidebar is not rendered at all
  })

  it('should display hero details when isOpen is true', () => {
    render(<SidebarComponent isOpen={true} toggleSidebar={mockToggleSidebar} selectedHero={mockHero} />)

    const heroName = screen.getByText(/Luke Skywalker/i)
    expect(heroName).toBeInTheDocument()
  })
})
