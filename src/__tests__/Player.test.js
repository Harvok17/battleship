import Player from "../factories/Player";

describe("Test Player functions", () => {
  let testPlayer, testOpponent, testCell;

  beforeEach(() => {
    testPlayer = new Player("human");
    testOpponent = new Player("computer");

    testCell = testOpponent.gameBoard.board.find((cell) => cell.coord === 10);
    testCell.shot = true;
  });

  test("check if shot is valid", () => {
    expect(testPlayer.fire(11, testOpponent.gameBoard)).toBe(true);
  });

  test("check if shot is invalid", () => {
    expect(testPlayer.fire(10, testOpponent.gameBoard)).toBe(false);
  });
});
