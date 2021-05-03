class ComputerAI {
  constructor() {
    this.selectedSquare = null;
    this.startingSquare = null;
    this.adjacentSquares = [];
    this.validSquares = [];
  }

  makeRandomMove() {
    return this.validSquares[
      Math.floor(Math.random() * this.validSquares.length)
    ];
  }

  setRandomSelectedSquare() {
    this.selectedSquare = this.makeRandomMove();

    if (this.selectedSquare.occupied) {
      this.startingSquare = this.selectedSquare.coord;
    }

    return this.selectedSquare.coord;
  }

  move(playerGameBoard) {
    this.validSquares = playerGameBoard.board.filter((square) => !square.shot);

    if (!this.selectedSquare) {
      this.setRandomSelectedSquare();
    } else if (this.selectedSquare.occupied) {
      this.adjacentSquares = [
        this.selectedSquare.coord + 1,
        this.selectedSquare.coord - 1,
        this.selectedSquare.coord + 10,
        this.selectedSquare.coord - 10,
      ].filter((coord) => {
        const filteredValidSquares = this.validSquares.filter(
          (square) => square.occupied
        );
        const validCoords = filteredValidSquares.map((square) => square.coord);

        return validCoords.includes(coord);
      });

      const selectedCoord = this.adjacentSquares[
        Math.floor(Math.random() * this.adjacentSquares.length)
      ];

      this.selectedSquare = this.validSquares.find(
        (square) => square.coord === selectedCoord
      );

      if (!this.selectedSquare && !this.checkShipSank(playerGameBoard)) {
        this.adjacentSquares = [
          this.startingSquare + 1,
          this.startingSquare - 1,
          this.startingSquare + 10,
          this.startingSquare - 10,
        ].filter((coord) => {
          const filteredValidSquares = this.validSquares.filter(
            (square) => square.occupied
          );
          const validCoords = filteredValidSquares.map(
            (square) => square.coord
          );

          return validCoords.includes(coord);
        });

        const selectedCoord = this.adjacentSquares[
          Math.floor(Math.random() * this.adjacentSquares.length)
        ];

        this.selectedSquare = this.validSquares.find(
          (square) => square.coord === selectedCoord
        );

        if (!this.selectedSquare) {
          this.setRandomSelectedSquare();
        }

        return this.selectedSquare.coord;
      }

      if (!this.selectedSquare) {
        this.setRandomSelectedSquare();
      }

      return this.selectedSquare.coord;
    }

    this.selectedSquare = this.makeRandomMove();

    if (this.selectedSquare.occupied) {
      this.startingSquare = this.selectedSquare.coord;
    }

    return this.selectedSquare.coord;
  }

  checkShipSank(playerGameBoard) {
    let ship;
    ship = playerGameBoard.ships.find((ship) =>
      ship.locations.includes(this.startingSquare)
    );

    return ship.isSunk();
  }
}

export default ComputerAI;
