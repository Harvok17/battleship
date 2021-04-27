// 2 Modes: Random Mode and Adjacent Mode

/* Create valid squares array:

const validSquares = playerGameBoard.board.filter((square) => !square.shot);
*/

//Find random valid square
// if square is occupied, switch to Adjacent Mode
// if square is not occupied, continue searching random valid square

/*
Adjacent Mode:

create horizontal array = random square + 1 and random square - 1, check if square coords are included in valid square array

create vertical array = random square + 10 and random square - 10, check if square coords are included in valid square array


*/

class TestAI {
  constructor() {
    this.mode = "random";
    this.selectedSquare = null;
    this.adjacentSquares = [];
    this.validSquares = [];
  }

  setSelectedSquare(squareObject) {
    this.selectedSquare = squareObject;
  }

  move(playerGameBoard) {
    this.validSquares = playerGameBoard.board.filter((square) => !square.shot);

    if (!this.selectedSquare) {
      this.selectedSquare = this.validSquares[
        Math.floor(Math.random() * this.validSquares.length)
      ];
      return this.selectedSquare.coord;
    } else if (this.selectedSquare.occupied) {
      this.adjacentSquares = [
        this.selectedSquare.coord + 1,
        this.selectedSquare.coord - 1,
        this.selectedSquare.coord + 10,
        this.selectedSquare.coord - 10,
      ].filter((coord) => {
        // const validCoords = this.validSquares.map(
        //   (square) => square.coord
        // );

        const filteredValidSquares = this.validSquares.filter(
          (square) => square.occupied
        );
        const validCoords = filteredValidSquares.map((square) => square.coord);

        return validCoords.includes(coord);
      });

      // return this.adjacentSquares;

      // return this.adjacentSquares[
      //   Math.floor(Math.random() * this.adjacentSquares.length)
      // ];

      /*
      const selectedCoord = this.adjacentSquares[
        Math.floor(Math.random() * this.adjacentSquares.length)
      ];

      const selectedSquare = this.validSquares.find(
        (square) => square.coord === selectedCoord
      );

      this.adjacentSquares = this.adjacentSquares.filter(
        (square) => square !== selectedSquare.coord
      );

      if (this.adjacentSquares.length === 0) {
        this.selectedSquare = null;
      }

      if (!selectedSquare) {
        this.selectedSquare = this.validSquares[
          Math.floor(Math.random() * this.validSquares.length)
        ];
        return this.selectedSquare.coord;
      }

      return selectedSquare.coord;

      */

      const selectedCoord = this.adjacentSquares[
        Math.floor(Math.random() * this.adjacentSquares.length)
      ];

      this.selectedSquare = this.validSquares.find(
        (square) => square.coord === selectedCoord
      );

      if (!this.selectedSquare) {
        this.selectedSquare = this.validSquares[
          Math.floor(Math.random() * this.validSquares.length)
        ];
        return this.selectedSquare.coord;
      }

      return this.selectedSquare.coord;
    }

    this.selectedSquare = this.validSquares[
      Math.floor(Math.random() * this.validSquares.length)
    ];
    return this.selectedSquare.coord;
  }
}

export default new TestAI();
