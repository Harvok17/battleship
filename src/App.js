import React from "react";
import { Container } from "./components/styled-components/appComponentStyles";
import GlobalStyle from "./components/styled-components/globalStyle";
import GameWindow from "./GameWindow/GameWindow";
import { connect } from "react-redux";
import { Footer, Header } from "./components";

const App = ({ screen }) => {
  return (
    <Container>
      <GlobalStyle />
      <Header screen={screen} />
      <GameWindow screen={screen} />
      <Footer />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    screen: state.screen,
  };
};

export default connect(mapStateToProps)(App);
