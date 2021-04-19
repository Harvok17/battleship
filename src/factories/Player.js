import Gameboard from "../factories/Gameboard";

class Player {
  constructor(name) {
    this.name = name;
    this.gameBoard = new Gameboard();
  }

  fire(coord, opponentBoard) {
    const currentCell = opponentBoard.board.find(
      (cell) => cell.coord === coord
    );

    if (currentCell.shot) return false;

    opponentBoard.receiveAttack(coord);
    return true;
  }
}

export default Player;
