import Ship from "./Ship";
import shipTypes from "../shipTypes";

class Gameboard {
  constructor() {
    this.boardSize = 10;
    this.board = [];
    this.ships = [];
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

  receiveAttack(coord) {
    const currentCell = this.board.find((cell) => cell.coord === coord);

    this.ships.forEach((ship) => {
      if (ship.locations.includes(coord)) {
        currentCell.shot = true;
        ship.hit(coord);
      } else {
        currentCell.shot = true;
      }
    });
  }

  generateShipLocations() {
    // let locations;
    // this.ships.forEach((ship) => {
    //   do {
    //     locations = this.generateLocations(ship);
    //   } while (this.collision(locations));
    //   ship.locations = locations;
    //   this.addShipLocationsOnBoard(locations);
    // });

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
    });
  }

  generateLocations(ship) {
    // const direction = Math.floor(Math.random() * 2);
    // let row, col;

    // if (direction === 1) {
    //   row = Math.floor(Math.random() * this.boardSize);
    //   col = Math.floor(Math.random() * (this.boardSize - ship.length));
    // } else {
    //   row = Math.floor(Math.random() * (this.boardSize - ship.length));
    //   col = Math.floor(Math.random() * this.boardSize);
    // }

    // const shipLocationArray = [];
    // for (let i = 0; i < ship.length; i++) {
    //   direction === 1
    //     ? shipLocationArray.push(row * 10 + (col + i))
    //     : shipLocationArray.push((row + i) * 10 + col);
    // }

    // return shipLocationArray;

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
    const edge = [9, 19, 29, 39, 49, 59, 69, 79, 89];
    if (locations.some((loc) => !this.board[loc])) {
      return true;
    }
    if (
      edge.some((num) => {
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
      return this.ships.some((ship) => ship.locations.includes(loc));
    });
  }

  manualShipLocations(coord, ship, direction) {
    const locations = this.manualLocations(coord, ship, direction);

    this.addShipLocations(locations, ship.type);
    this.addShipLocationsOnBoard(locations, ship.type, direction);
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
      const currentCell = this.board.find((cell) => cell.coord === loc);

      if (i === 0) {
        currentCell.shipPart = `${shipType}-start-${direction}`;
      } else if (i === array.length - 1) {
        currentCell.shipPart = `${shipType}-end-${direction}`;
      } else {
        currentCell.shipPart = `${shipType}-body-${direction}`;
      }

      currentCell.occupied = true;
    });
  }

  checkAllShipsSank() {
    return this.ships.every((ship) => {
      return ship.isSunk();
    });
  }
}

export default Gameboard;
