import Ship from "../factories/Ship";
import shipTypes from "../shipTypes";

describe("Test ship functions", () => {
  const carrier = shipTypes.find((ship) => ship.type === "carrier");
  const battleship = shipTypes.find((ship) => ship.type === "battleship");
  let testCarrier, testBattleship;

  beforeEach(() => {
    testCarrier = new Ship(carrier);
    testBattleship = new Ship(battleship);

    testCarrier.locations = [70, 71, 72, 73, 74];
    testBattleship.locations = [13, 14, 15, 16];
  });

  test("check ship properties", () => {
    expect(testCarrier).toEqual({
      adjacentLocations: [],
      length: 5,
      locations: [70, 71, 72, 73, 74],
      type: "carrier",
      hits: [],
    });
  });

  test("accepts a hit", () => {
    testCarrier.hit(70);
    expect(testCarrier.hits).toEqual([70]);
  });

  test("accept multiple hits", () => {
    testBattleship.hit(13);
    testBattleship.hit(14);
    testBattleship.hit(15);
    expect({
      hits: testBattleship.hits,
      isSunk: testBattleship.isSunk(),
    }).toEqual({ hits: [13, 14, 15], isSunk: false });
  });

  test("test if ship is sunk", () => {
    testBattleship.hit(13);
    testBattleship.hit(14);
    testBattleship.hit(15);
    testBattleship.hit(16);
    expect(testBattleship.isSunk()).toBe(true);
  });
});
