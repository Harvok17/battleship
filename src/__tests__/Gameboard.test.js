import Gameboard from "../factories/Gameboard";
import shipTypes from "../shipTypes";

describe("Test Gameboard functions", () => {
  let testGameboard;
  beforeEach(() => {
    testGameboard = new Gameboard();
  });

  test("check if every square of the board has the correct properties", () => {
    const arr = [];
    for (let i = 0; i < 100; i++) {
      arr.push({ occupied: false, shot: false, coord: i });
    }

    expect(
      testGameboard.board.every((square, i) => {
        const { occupied, shot, coord } = square;
        const {
          occupied: testOccupied,
          shot: testShot,
          coord: testCoord,
        } = arr[i];

        if (
          occupied === testOccupied &&
          shot === testShot &&
          coord === testCoord
        )
          return true;
      })
    ).toBe(true);
  });

  test("check if ships are initialized", () => {
    expect(
      testGameboard.ships.every((ship, i) => ship.type === shipTypes[i].type)
    ).toBe(true);
  });

  test("can randomly generate ship locations", () => {
    testGameboard.generateShipLocations();
    const arr = [0, 0, 0, 0, 0];
    expect(
      testGameboard.ships[0].locations.some((loc, i) => loc !== arr[i])
    ).toBe(true);
  });

  test("can check if the index was already taken", () => {
    testGameboard.manualShipLocations(12, shipTypes[0], "horizontal");
    expect(testGameboard.collision([12, 13, 14])).toBe(true);
  });

  test("can check if the locations are out of bounds", () => {
    const locations = [109, 119, 120];
    expect(testGameboard.outOfBounds(locations)).toBe(true);
  });

  test("can manually place ships", () => {
    testGameboard.manualShipLocations(54, shipTypes[1], "vertical");
    const currentShip = testGameboard.ships.find(
      (ship) => ship.type === "battleship"
    );
    expect(currentShip.locations).toEqual([54, 64, 74, 84]);
  });

  test("can manually place ships part 2", () => {
    testGameboard.manualShipLocations(0, shipTypes[0], "horizontal");

    expect(testGameboard.board[0].occupied).toBe(true);
  });

  test("can receive attack", () => {
    testGameboard.receiveAttack(25);
    const testSquare = testGameboard.board.find(
      (square) => square.coord === 25
    );
    expect(testSquare.shot).toBe(true);
  });

  test("check if all ships sank", () => {
    testGameboard.manualShipLocations(70, shipTypes[0], "horizontal");
    testGameboard.manualShipLocations(13, shipTypes[1], "horizontal");
    testGameboard.manualShipLocations(4, shipTypes[2], "horizontal");
    testGameboard.manualShipLocations(30, shipTypes[3], "vertical");
    testGameboard.manualShipLocations(27, shipTypes[4], "vertical");

    for (let i = 0; i < 5; i++) {
      testGameboard.receiveAttack(70 + i);
    }
    for (let i = 0; i < 4; i++) {
      testGameboard.receiveAttack(13 + i);
    }
    for (let i = 0; i < 3; i++) {
      testGameboard.receiveAttack(4 + i);
    }
    for (let i = 0; i < 3; i++) {
      testGameboard.receiveAttack(30 + i * 10);
    }
    for (let i = 0; i < 2; i++) {
      testGameboard.receiveAttack(27 + i * 10);
    }

    expect(testGameboard.checkAllShipsSank()).toBe(false);
  });
});
