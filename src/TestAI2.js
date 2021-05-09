const state = {
  randomSquare: null,
  selectedSquare: null,
  startingSquare: null,
  direction: null,
  adjacentSquares: [],
  validSquares: [],
  filteredDirections: [],
  directions: [+1, -1, +10, -10],
};

const makeRandomMove = () => {
  return state.validSquares[
    Math.floor(Math.random() * state.validSquares.length)
  ];
};

const createFilteredDirections = () => {
  const validCoords = state.validSquares.map((square) => square.coord);

  state.filteredDirections = state.directions.filter((dir) => {
    const currentSquare = dir + state.randomSquare.coord;

    return validCoords.includes(currentSquare);
  });
};

const setRandomSquare = () => {
  state.randomSquare = makeRandomMove();

  if (state.randomSquare.occupied) {
    state.startingSquare = state.randomSquare.coord;
    createFilteredDirections();
  }

  return state.randomSquare.coord;
};

const createValidSquares = (GameBoard) => {
  state.validSquares = GameBoard.board.filter((square) => !square.shot);
};

const setDirection = () => {
  state.direction =
    state.filteredDirections[
      Math.floor(Math.random() * state.filteredDirections.length)
    ];
};

const oppositeDirection = (dir) => -dir;

const checkShipSank = (GameBoard) => {
  let ship;
  ship = GameBoard.ships.find((ship) =>
    ship.locations.includes(state.startingSquare)
  );

  return ship.isSunk();
};

export const AiReset = () => {
  state.randomSquare = null;
  state.selectedSquare = null;
  state.startingSquare = null;
  state.direction = null;
  state.adjacentSquares = [];
  state.validSquares = [];
  state.filteredDirections = [];
  state.directions = [+1, -1, +10, -10];
};

export const AiMove = (playerGameBoard) => {
  createValidSquares(playerGameBoard);

  if (!state.selectedSquare) {
    if (!state.randomSquare) return setRandomSquare();
    else if (state.randomSquare && state.randomSquare.occupied) {
      createFilteredDirections();
      setDirection();

      const selectedCoord = state.randomSquare.coord + state.direction;

      const selectedSquare = state.validSquares.find(
        (square) => square.coord === selectedCoord
      );

      if (selectedSquare.occupied) {
        state.selectedSquare = selectedSquare;
      }

      if (!selectedSquare) {
        AiReset();
        createValidSquares(playerGameBoard);
        return setRandomSquare();
      }

      return selectedSquare.coord;
    }

    return setRandomSquare();
  } else if (state.selectedSquare.occupied) {
    if (checkShipSank(playerGameBoard)) {
      AiReset();
      createValidSquares(playerGameBoard);
      return setRandomSquare();
    }

    let selectedCoord;
    selectedCoord = state.selectedSquare.coord + state.direction;

    state.selectedSquare = state.validSquares.find(
      (square) => square.coord === selectedCoord
    );

    if (!state.selectedSquare && !checkShipSank(playerGameBoard)) {
      state.direction = oppositeDirection(state.direction);

      selectedCoord = state.startingSquare + state.direction;

      state.selectedSquare = state.validSquares.find(
        (square) => square.coord === selectedCoord
      );

      return state.selectedSquare.coord;
    }

    if (!state.selectedSquare) {
      AiReset();
      createValidSquares(playerGameBoard);
      return setRandomSquare();
    }

    return state.selectedSquare.coord;
  } else if (!state.selectedSquare.occupied) {
    state.direction = oppositeDirection(state.direction);

    const selectedCoord = state.startingSquare + state.direction;

    state.selectedSquare = state.validSquares.find(
      (square) => square.coord === selectedCoord
    );

    if (!state.selectedSquare) {
      AiReset();
      createValidSquares(playerGameBoard);
      return setRandomSquare();
    }

    return state.selectedSquare.coord;
  }
};
