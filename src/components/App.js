import React from "react";
import Test from "./Test";
import { Container } from "./styled-components/appComponentStyles";
import GlobalStyle from "./styled-components/globalStyle";
import Header from "./Header";
import Footer from "./Footer";
import GameWindow from "./GameWindow";
import { connect } from "react-redux";

const App = ({ screen }) => {
  return (
    <Container>
      <GlobalStyle />
      <Header screen={screen} />
      <Test />
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

/*
<Container>
  <Header>
  <GameWindow>
  <Footer>
</Container>


*/
