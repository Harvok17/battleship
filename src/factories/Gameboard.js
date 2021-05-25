import Ship from "./Ship";
import shipTypes from "../shipTypes";

class Gameboard {
  constructor() {
    this.boardSize = 10;
    this.board = [];
    this.ships = [];
    this.adjacentSquares = [];
    this.leftEdge = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
    this.rightEdge = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
    this.shipsLeft = shipTypes.length;
    this.init();
  }

  init() {
    shipTypes.forEach((ship) => {
      this.ships.push(new Ship(ship));
    });

    for (let i = 0; i < this.boardSize * this.boardSize; i++) {
      this.board.push({
        occupied: false,
        shot: false,
        coord: i,
      });
    }
  }

  resetBoard() {
    this.board = [];
    this.ships = [];
    this.adjacentSquares = [];
    this.init();
  }

  receiveAttack(coord) {
    const currentSquare = this.board.find((square) => square.coord === coord);

    this.ships.forEach((ship) => {
      if (ship.locations.includes(coord)) {
        currentSquare.shot = true;
        ship.hit(coord);
        if (ship.isSunk()) {
          this.setShipSankOnBoard(ship);
          this.shipsLeft--;
        }
      } else {
        currentSquare.shot = true;
      }
    });
  }

  generateShipLocations() {
    this.ships.forEach((ship) => {
      let generated;
      do {
        generated = this.generateLocations(ship);
      } while (this.collision(generated.locations));
      ship.locations = generated.locations;
      this.addShipLocationsOnBoard(
        generated.locations,
        ship.type,
        generated.direction
      );
      this.addAdjacentSquares(generated.locations, generated.direction);
    });
  }

  generateLocations(ship) {
    const direction = Math.floor(Math.random() * 2);
    let row, col;

    if (direction === 1) {
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - ship.length));
    } else {
      row = Math.floor(Math.random() * (this.boardSize - ship.length));
      col = Math.floor(Math.random() * this.boardSize);
    }

    const shipLocationArray = [];
    for (let i = 0; i < ship.length; i++) {
      direction === 1
        ? shipLocationArray.push(row * 10 + (col + i))
        : shipLocationArray.push((row + i) * 10 + col);
    }

    return {
      locations: shipLocationArray,
      direction: direction === 1 ? "horizontal" : "vertical",
    };
  }

  outOfBounds(locations) {
    if (locations.some((loc) => !this.board[loc])) {
      return true;
    }
    if (
      this.rightEdge.some((num) => {
        return [num, num + 1].every((combination) =>
          locations.includes(combination)
        );
      })
    ) {
      return true;
    }

    return false;
  }

  collision(locations) {
    return locations.some((loc) => {
      return this.adjacentSquares.includes(loc);
    });
  }

  manualShipLocations(coord, ship, direction) {
    const locations = this.manualLocations(coord, ship, direction);

    this.addShipLocations(locations, ship.type);
    this.addShipLocationsOnBoard(locations, ship.type, direction);
    this.addAdjacentSquares(locations, direction);
  }

  manualLocations(coord, ship, direction) {
    const shipLocationArray = [];
    for (let i = 0; i < ship.length; i++) {
      direction === "horizontal"
        ? shipLocationArray.push(coord + i)
        : shipLocationArray.push(coord + i * 10);
    }
    return shipLocationArray;
  }

  addShipLocations(locations, type) {
    const currentShip = this.ships.find((ship) => ship.type === type);
    currentShip.locations = locations;
  }

  addShipLocationsOnBoard(locations, shipType, direction) {
    locations.forEach((loc, i, array) => {
      const currentSquare = this.board.find((square) => square.coord === loc);

      if (i === 0) {
        currentSquare.shipPart = `${shipType}-start-${direction}`;
      } else if (i === array.length - 1) {
        currentSquare.shipPart = `${shipType}-end-${direction}`;
      } else {
        currentSquare.shipPart = `${shipType}-body-${direction}`;
      }

      currentSquare.occupied = true;
      currentSquare.isSunk = false;
    });
  }

  setShipSankOnBoard(ship) {
    ship.locations.forEach((loc) => {
      const currentSquare = this.board.find((square) => square.coord === loc);

      currentSquare.isSunk = true;
    });
  }

  checkAllShipsSank() {
    return this.ships.every((ship) => {
      return ship.isSunk();
    });
  }

  addAdjacentSquares(locations, direction) {
    const start = locations[0];
    const end = locations[locations.length - 1];

    if (direction === "horizontal") {
      const shipRow = this.leftEdge.includes(start)
        ? [...locations, end + 1]
        : this.rightEdge.includes(end)
        ? [start - 1, ...locations]
        : [start - 1, ...locations, end + 1];
      const upperRow = shipRow.map((loc) => loc - 10);
      const lowerRow = shipRow.map((loc) => loc + 10);
      const allRows = shipRow.concat(upperRow).concat(lowerRow);

      this.adjacentSquares = this.adjacentSquares.concat(allRows);
    }

    if (direction === "vertical") {
      const shipColumn = [start - 10, ...locations, end + 10];
      const leftColumn = this.leftEdge.includes(start)
        ? []
        : shipColumn.map((loc) => loc - 1);
      const rightColumn = this.rightEdge.includes(start)
        ? []
        : shipColumn.map((loc) => loc + 1);
      const allColumns = shipColumn.concat(leftColumn).concat(rightColumn);

      this.adjacentSquares = this.adjacentSquares.concat(allColumns);
    }
  }
}

export default Gameboard;
