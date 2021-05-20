import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 70px 1fr 70px;
  grid-template-areas:
    "header "
    "main"
    "footer";
`;

export const HeaderWrapper = styled.header`
  font-family: "Press Start 2P", cursive;
  grid-area: header;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FooterWrapper = styled.footer`
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: footer;
  .logo-container {
    margin-right: 1em;
  }

  svg {
    height: 34px;
    width: 34px;
  }

  span {
    font-family: "Press Start 2P", cursive;
    font-size: 0.6em;
  }
`;

export const ScreenWrapper = styled.div`
  grid-area: main;
`;
