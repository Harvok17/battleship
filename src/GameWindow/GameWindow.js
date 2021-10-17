import React from "react";
import { ScreenWrapper } from "../components/styled-components/appComponentStyles";
import StartEnd from "../screens/StartEnd";
import Setup from "../screens/Setup";
import Game from "../screens/Game";

const GameWindow = ({ screen }) => {
  const renderScreen = () =>
    screen === "start" || screen === "result" ? (
      <StartEnd screen={screen} />
    ) : screen === "setup" ? (
      <Setup />
    ) : (
      <Game />
    );

  return <ScreenWrapper>{renderScreen()}</ScreenWrapper>;
};

export default GameWindow;
