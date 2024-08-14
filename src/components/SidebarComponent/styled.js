import styled from 'styled-components'

export const StyledSidebarContainer = styled.div`
  height: 100%;
  width: ${({ isOpen }) => (isOpen ? '100%' : '0')};
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(to bottom, #000000, #1a1a1a);

  transition: 0.3s;
  padding-top: 60px;
  ${({ isMobile }) =>
    isMobile &&
    `
        overflow-x: hidden;

    `}
  @media (max-width: 768px) {
    width: ${({ isOpen }) => (isOpen ? '100%' : '0')};
  }
`

export const StyledCloseButton = styled.a`
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
  color: white;
  cursor: pointer;
`
