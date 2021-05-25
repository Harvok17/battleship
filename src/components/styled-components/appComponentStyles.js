import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 70px minmax(500px, 1fr) 75px;
  grid-template-areas:
    "header "
    "main"
    "footer";
`;

export const HeaderWrapper = styled.header`
  font-family: "Press Start 2P", cursive;
  grid-area: header;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FooterWrapper = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: footer;
  border: 2px solid white;
  .logo-container {
    margin-right: 1em;
  }

  svg {
    height: 35px;
    width: 35px;
    background: white;
    border-radius: 50%;
    border: 2px solid white;
  }

  span {
    font-family: "Press Start 2P", cursive;
    font-size: 0.6em;
  }
`;

export const ScreenWrapper = styled.div`
  grid-area: main;
`;
