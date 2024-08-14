import styled from 'styled-components'
import ReactFlow from 'react-flow-renderer'

export const StyledContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  z-index: 10;
  background: linear-gradient(to bottom, #000000, #1a1a1a);

  .react-flow__handle {
    width: 10px;
    height: 2px;
    background: #ffe919;
  }
`

export const StyledReactFlow = styled(ReactFlow)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
    align-items: flex-start;
  }
`
