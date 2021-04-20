import Player from "../factories/Player";

describe("Test Player functions", () => {
  let testPlayer, testOpponent, testSquare;

  beforeEach(() => {
    testPlayer = new Player("human");
    testOpponent = new Player("computer");

    testSquare = testOpponent.gameBoard.board.find(
      (square) => square.coord === 10
    );
    testSquare.shot = true;
  });

  test("check if shot is valid", () => {
    expect(testPlayer.fire(11, testOpponent.gameBoard)).toBe(true);
  });

  test("check if shot is invalid", () => {
    expect(testPlayer.fire(10, testOpponent.gameBoard)).toBe(false);
  });
});
