import styled from 'styled-components'

export const StyledContainer = styled.div`
  padding-top: 30px;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ isLoading }) =>
    isLoading &&
    `
        display: none
    `}
`

export const StyledWrapHeroes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
`

export const StyledHero = styled.div`
  position: relative;
  width: 20%;
  max-width: 200px;
  min-width: 150px;
  aspect-ratio: 1/1;
  padding-bottom: 10px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;

    img {
      transition: filter 0.5s ease;
      filter: brightness(0.3);
    }
  }

  @media (max-width: 768px) {
    width: 30%;
  }

  @media (max-width: 480px) {
    width: 45%;
  }
`

export const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 20px;
  border: 2px solid #ffe919;
`

export const StyledName = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: opacity 0.5s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffe919;
  font-size: 20px;

  &:hover {
    opacity: 1;
  }
`

export const StyledButtonsWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`

export const StyledButton = styled.button`
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px 20px;
  border: 1px solid #ffe919;
  color: #ffe919;
  background: black;
  border-radius: 10px;
  transition: background 0.3s ease;

  &:hover {
    cursor: pointer;
    background: #ffe919;
    color: black;
  }

  ${({ disabled }) =>
    disabled &&
    `
        cursor: not-allowed;
        pointer-events: none;
        opacity: 0.5;
    `}
`
