import styled, { keyframes } from 'styled-components'

export const crawlAnimation = keyframes`
  0% {
    transform: rotateX(20deg) translateZ(0);
  }
  100% {
    transform: rotateX(20deg) translateZ(-2000px);
  }
`

export const StyledCreepingTextContainer = styled.div`
  position: relative;
  height: 76%;
  overflow: hidden;
  background: transparent;
  color: #ffe919;
  font-family: 'Pathway Gothic One', sans-serif;
  perspective: 400px;
  perspective-origin: 50% 100px;
  z-index: 10;
`

export const StyledCreepingText = styled.div`
  position: absolute;
  top: 100%;
  width: 200%;
  right: -50%;
  transform-origin: 50% 100%;
  margin: 0 auto;
  animation: ${crawlAnimation} 60s linear infinite;
`

export const StyledTitle = styled.div`
  text-align: center;
  margin-bottom: 100px;

  p {
    margin: 0;
    font-size: 2em;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
    font-size: 4em;
    text-transform: uppercase;
  }
`

export const StyledParagraph = styled.p`
  font-size: 1.5em;
  text-align: justify;
  padding-top: 5px;
  margin: 0 auto;
  width: 80%;
`
