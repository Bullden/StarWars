import { useState } from 'react'
import { StyledContainer, StyledReactFlow } from './styled'

const GraphComponent = ({ heroName, filmsWithHero, heroStarships }) => {
  const isMobile = window.innerWidth < 768
  const [highlightedNodes, setHighlightedNodes] = useState([])
  const [highlightedEdges, setHighlightedEdges] = useState([])

  const handleNodeClick = node => {
    const connectedNodes = []
    const connectedEdges = []

    // Find all edges where the clicked node is either the source or the target
    edges.forEach(edge => {
      if (edge.source === node.id || edge.target === node.id) {
        connectedEdges.push(edge.id)

        // Highlight the connected nodes
        if (edge.source === node.id) {
          connectedNodes.push(edge.target)
        } else if (edge.target === node.id) {
          connectedNodes.push(edge.source)
        }
      }
    })

    // Highlight the clicked node
    connectedNodes.push(node.id)

    setHighlightedNodes(connectedNodes)
    setHighlightedEdges(connectedEdges)
  }

  const calculateNodePosition = (index, total, yOffset) => {
    //calculating positions of nodes
    const padding = isMobile ? 20 : 40
    const nodeWidth = isMobile ? 150 : 180
    const nodeHeight = 120
    const cols = isMobile ? 2 : Math.max(1, Math.floor((window.innerWidth - 2 * padding) / nodeWidth))
    const colWidth = (window.innerWidth - 2 * padding) / cols
    const rowHeight = isMobile ? 100 : nodeHeight + padding

    const totalWidth = Math.min(total, cols) * colWidth
    const centerOffset = (window.innerWidth - totalWidth) / 2

    const x = centerOffset + (index % cols) * colWidth + (colWidth - nodeWidth) / 2
    const y = yOffset + Math.floor(index / cols) * rowHeight

    return { x, y }
  }

  const data = {
    name: heroName,
    films: filmsWithHero,
    starships: heroStarships,
  }

  const NodeLabel = ({ name, title }) => (
    <div>
      <strong>{title}:</strong> {name}
    </div>
  )

  const nodes = [
    {
      id: '1',
      type: 'input',
      data: {
        label: <NodeLabel name={data.name} title='Name' />,
      },
      position: { x: window.innerWidth / 2 - 90, y: 50 },
      style: {
        fontSize: isMobile ? '14px' : '16px',
        padding: '10px',
        border: '2px solid white',
        borderRadius: 10,
        background: 'transparent',
        color: 'white',
      },
    },
    ...data.films.map((film, index) => ({
      id: `film-${film.id}`,

      data: { label: <NodeLabel name={film.title} title='Film' /> },
      position: calculateNodePosition(index, data.films.length, 200),
      style: {
        fontSize: isMobile ? '12px' : '14px',
        padding: '8px',
        border: '2px solid white',
        borderRadius: 10,
        background: 'black',
        color: 'white',
        ...(highlightedNodes.includes(`film-${film.id}`) ? { borderColor: '#ffe919', color: '#ffe919' } : { borderColor: 'white', color: 'white' }),
      },
    })),
    ...data.starships.map((starship, index) => ({
      id: `starship-${starship.id}`,
      data: { label: <NodeLabel name={starship.name} title='Starship' /> },
      position: calculateNodePosition(index, data.starships.length, isMobile ? 500 : 400),
      style: {
        fontSize: isMobile ? '12px' : '14px',
        padding: '8px',
        border: '2px solid white',
        borderRadius: 10,
        background: 'black',
        color: 'white',
        ...(highlightedNodes.includes(`starship-${starship.id}`)
          ? { borderColor: '#ffe919', color: '#ffe919' }
          : { borderColor: 'white', color: 'white' }),
      },
    })),
  ]

  const edges = [
    // Create edges between the main node and each film
    ...data.films.map(film => ({
      id: `e1-${film.id}`,
      source: '1',
      target: `film-${film.id}`,
    })),

    // Create edges between each film and starships
    ...data.starships.flatMap(starship =>
      starship.films.map(filmId => ({
        id: `e2-${starship.id}-${filmId}`,
        source: `film-${filmId}`,
        target: `starship-${starship.id}`,
      })),
    ),
  ].map(edge => ({
    ...edge,
    animated: highlightedEdges.includes(edge.id), // Animate if highlighted
    style: highlightedEdges.includes(edge.id) ? { stroke: '#ffe919' } : {}, // Highlight conditionally
  }))

  return (
    <StyledContainer isMobile={isMobile}>
      <StyledReactFlow
        onNodeClick={(event, node) => handleNodeClick(node)} // Handle node clicks
        nodes={nodes}
        edges={edges}
        panOnDrag={false}
        panOnScroll={false}
        elementsSelectable={false}
        draggable={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        nodesConnectable={false}
      />
    </StyledContainer>
  )
}
export default GraphComponent
