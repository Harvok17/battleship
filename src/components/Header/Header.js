import React from "react";
import { HeaderWrapper } from "../styled-components/appComponentStyles";

const Header = ({ screen }) => {
  return (
    <HeaderWrapper>
      {screen === "start" ? null : <h1>Battleship</h1>}
    </HeaderWrapper>
  );
};

export default Header;
