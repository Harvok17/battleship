import React from "react";
import Player from "../../factories/Player";
import {
  Wrapper,
  TitleResultWrapper,
  Text,
  Button,
} from "../styled-components/gameWindowStyles";
import { connect } from "react-redux";
import {
  initializePlayers,
  generateComputerShips,
  setup,
  reset,
} from "../../actions";
import { AiReset } from "../../ComputerAI";

const StartEnd = ({
  screen,
  initializePlayers,
  generateComputerShips,
  setup,
  reset,
  winner,
}) => {
  const handleCreatePlayers = () => {
    const human = new Player("Player");
    const computer = new Player("Enemy");
    initializePlayers({ player1: human, player2: computer });
    generateComputerShips();
    setup();
  };

  const handleReset = () => {
    reset();
    AiReset();
  };
  return (
    <Wrapper>
      <TitleResultWrapper>
        <Text small={screen === "result"}>
          {screen === "result" ? `Winner: ${winner}` : "Battleship"}
        </Text>
      </TitleResultWrapper>
      <Button
        onClick={() => {
          if (screen === "result") {
            handleReset();
            handleCreatePlayers();
          } else {
            handleCreatePlayers();
          }
        }}
      >
        {screen === "result" ? "Play again" : "Start game"}
      </Button>
    </Wrapper>
  );
};

const mapStateToProps = ({ winner }) => ({ winner });

export default connect(mapStateToProps, {
  initializePlayers,
  generateComputerShips,
  setup,
  reset,
})(StartEnd);
