import TestAI from "../testAi";
import Player from "../factories/Player";

describe("Test AI functions", () => {
  let testPlayer;
  beforeEach(() => {
    testPlayer = new Player("test");

    testPlayer.gameBoard.receiveAttack(85);
  });

  test("test move", () => {
    TestAI.setSelectedSquare({
      occupied: true,
      shot: false,
      coord: 75,
    });
    console.log(TestAI.move(testPlayer.gameBoard));
  });
});
