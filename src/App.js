import './App.css'
import { useState } from 'react'
import HeroComponent from './components/HeroComponent/HeroComponent'
import SidebarComponent from './components/SidebarComponent/SidebarComponent'
import Logo from './shared/Logo/Logo'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedHero, setSelectedHero] = useState(null)
  const [showCrawl, setShowCrawl] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  const selectHero = hero => {
    setSelectedHero(hero)
    toggleSidebar()
  }

  return (
    <div className='App'>
      <Logo setShowCrawl={setShowCrawl} />
      <HeroComponent selectHero={selectHero} setShowCrawl={setShowCrawl} showCrawl={showCrawl} />
      {selectedHero && <SidebarComponent isOpen={isOpen} toggleSidebar={toggleSidebar} selectedHero={selectedHero} />}
    </div>
  )
}

export default App
