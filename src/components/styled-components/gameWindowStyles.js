import styled, { keyframes } from "styled-components";

export const Wrapper = styled.div`
  text-align: center;
  font-family: "Press Start 2P", cursive;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const TitleResultWrapper = styled.div`
  margin-bottom: 100px;
  line-height: 2;
`;

export const GridWrapper = styled.div`
  background: ${({ background }) => background};
  height: 550px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  opacity: ${({ opacity }) => opacity};
  transition: 0.7s;

  @media (max-width: 500px) {
    display: ${({ display }) => display};
  }
`;

export const BattlefieldWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 920px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  line-height: 2;

  @media (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }
`;

const fadeUp = keyframes`
  0% {
    transform: translateY(30px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const Text = styled.h1`
  font-size: ${({ small }) => (small ? "2.5em" : "4em")};
  animation: ${fadeUp} 1s ease;

  @media (max-width: 500px) {
    font-size: ${({ small }) => (small ? "1.5em" : "2em")};
  }
`;

export const Button = styled.button`
  border: 2px solid white;
  color: white;
  padding: ${(props) => (props.mini ? "0.9em 1.5em" : "1.5em 2em")};
  border-radius: 5px;
  background: transparent;
  font-family: inherit;
  font-size: ${(props) => (props.mini ? "0.6em" : "")};
  cursor: pointer;
  &:hover {
    background: white;
    color: black;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
`;

export const GridContainer = styled.table`
  border-collapse: collapse;
`;

export const Square = styled.td`
  height: 37px;
  width: 37px;
  border: 1px solid lightgrey;
  cursor: pointer;
  background-color: ${(props) =>
    props.highlight || props.sunk
      ? "lightgrey"
      : props.occupied && !props.sunk
      ? "royalblue"
      : ""};

  &:hover {
    cursor: ${(props) => (props.highlight || props.enemy ? "" : "not-allowed")};
    background-color: ${(props) =>
      props.highlight || props.player || props.occupied || props.sunk
        ? ""
        : props.enemy
        ? "lightgreen"
        : "firebrick"};
  }

  &.carrier-start-horizontal {
    border-right: 0;
  }

  &.carrier-body-horizontal {
    border-left: 0;
    border-right: 0;
  }

  &.carrier-end-horizontal {
    border-left: 0;
  }

  &.carrier-start-vertical {
    border-bottom: 0;
  }

  &.carrier-body-vertical {
    border-top: 0;
    border-bottom: 0;
  }

  &.carrier-end-vertical {
    border-top: 0;
  }

  &.battleship-start-horizontal {
    border-right: 0;
  }

  &.battleship-body-horizontal {
    border-left: 0;
    border-right: 0;
  }

  &.battleship-end-horizontal {
    border-left: 0;
  }

  &.battleship-start-vertical {
    border-bottom: 0;
  }

  &.battleship-body-vertical {
    border-top: 0;
    border-bottom: 0;
  }

  &.battleship-end-vertical {
    border-top: 0;
  }

  &.cruiser-start-horizontal {
    border-right: 0;
  }

  &.cruiser-body-horizontal {
    border-left: 0;
    border-right: 0;
  }

  &.cruiser-end-horizontal {
    border-left: 0;
  }

  &.cruiser-start-vertical {
    border-bottom: 0;
  }

  &.cruiser-body-vertical {
    border-top: 0;
    border-bottom: 0;
  }

  &.cruiser-end-vertical {
    border-top: 0;
  }

  &.submarine-start-horizontal {
    border-right: 0;
  }

  &.submarine-body-horizontal {
    border-left: 0;
    border-right: 0;
  }

  &.submarine-end-horizontal {
    border-left: 0;
  }

  &.submarine-start-vertical {
    border-bottom: 0;
  }

  &.submarine-body-vertical {
    border-top: 0;
    border-bottom: 0;
  }

  &.submarine-end-vertical {
    border-top: 0;
  }

  &.destroyer-start-horizontal {
    border-right: 0;
  }

  &.destroyer-body-horizontal {
    border-left: 0;
    border-right: 0;
  }

  &.destroyer-end-horizontal {
    border-left: 0;
  }

  &.destroyer-start-vertical {
    border-bottom: 0;
  }

  &.destroyer-body-vertical {
    border-top: 0;
    border-bottom: 0;
  }

  &.destroyer-end-vertical {
    border-top: 0;
  }
`;

const shrink = keyframes`
0% {
  transform: scale(5);
}

100% {
  transform: scale(1);
}
`;

export const HitMark = styled.div`
  color: red;
  animation: ${shrink} 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 500px) {
    animation: none;
  }
`;

export const MissMark = styled.div`
  color: grey;
  animation: ${shrink} 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 500px) {
    animation: none;
  }
`;

export const Notifier = styled.span`
  color: ${({ color }) => color};
  @media (max-width: 500px) {
    position: absolute;
    display: ${({ display }) => display};
    font-size: 2em;
  }
`;
