import computerAi from "../computerAi";
import Player from "../factories/Player";

describe("Test computer AI", () => {
  let testPlayer, testOpponent, testSquare;

  beforeEach(() => {
    testPlayer = new Player("human");
    testOpponent = new Player("computer");

    for (let i = 0; i < 99; i++) {
      testSquare = testPlayer.gameBoard.board.find(
        (square) => square.coord === i
      );
      testSquare.shot = true;
    }
  });

  test("test valid squares", () => {
    const computerShot = computerAi(testPlayer.gameBoard.board);
    expect(testOpponent.fire(computerShot, testPlayer.gameBoard)).toBe(true);
  });
});
