const state = {
  selectedSquare: null,
  startingSquare: null,
  adjacentSquares: [],
  validSquares: [],
};

const makeRandomMove = () => {
  return state.validSquares[
    Math.floor(Math.random() * state.validSquares.length)
  ];
};

const setRandomSelectedSquare = () => {
  state.selectedSquare = makeRandomMove();

  if (state.selectedSquare.occupied) {
    state.startingSquare = state.selectedSquare.coord;
  }

  return state.selectedSquare.coord;
};

const checkShipSank = (GameBoard) => {
  let ship;
  ship = GameBoard.ships.find((ship) =>
    ship.locations.includes(state.startingSquare)
  );

  return ship.isSunk();
};

const reverse = () => {
  state.adjacentSquares = [
    state.startingSquare + 1,
    state.startingSquare - 1,
    state.startingSquare + 10,
    state.startingSquare - 10,
  ].filter((coord) => {
    const filteredValidSquares = state.validSquares.filter(
      (square) => square.occupied
    );
    const validCoords = filteredValidSquares.map((square) => square.coord);

    return validCoords.includes(coord);
  });

  const selectedCoord =
    state.adjacentSquares[
      Math.floor(Math.random() * state.adjacentSquares.length)
    ];

  state.selectedSquare = state.validSquares.find(
    (square) => square.coord === selectedCoord
  );

  if (!state.selectedSquare) {
    setRandomSelectedSquare();
  }

  return state.selectedSquare.coord;
};

export const testMove = (playerGameBoard) => {
  state.validSquares = playerGameBoard.board.filter((square) => !square.shot);

  if (!state.selectedSquare) {
    setRandomSelectedSquare();
  } else if (state.selectedSquare.occupied) {
    state.adjacentSquares = [
      state.selectedSquare.coord + 1,
      state.selectedSquare.coord - 1,
      state.selectedSquare.coord + 10,
      state.selectedSquare.coord - 10,
    ].filter((coord) => {
      const filteredValidSquares = state.validSquares.filter(
        (square) => square.occupied
      );
      const validCoords = filteredValidSquares.map((square) => square.coord);

      return validCoords.includes(coord);
    });

    const selectedCoord =
      state.adjacentSquares[
        Math.floor(Math.random() * state.adjacentSquares.length)
      ];

    state.selectedSquare = state.validSquares.find(
      (square) => square.coord === selectedCoord
    );

    if (!state.selectedSquare && !checkShipSank(playerGameBoard)) {
      return reverse();
    }

    if (!state.selectedSquare) {
      setRandomSelectedSquare();
    }

    return state.selectedSquare.coord;
  }

  state.selectedSquare = makeRandomMove();

  if (state.selectedSquare.occupied) {
    state.startingSquare = state.selectedSquare.coord;
  }

  return state.selectedSquare.coord;
};

export const testReset = () => {
  state.selectedSquare = null;
  state.startingSquare = null;
  state.adjacentSquares = [];
  state.validSquares = [];
};
