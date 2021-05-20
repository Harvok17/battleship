const state = {
  randomSquare: null,
  selectedSquare: null,
  startingSquare: null,
  direction: null,
  validSquares: [],
  filteredDirections: [],
  directions: [+1, -1, +10, -10],
};

const leftEdge = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
const rightEdge = [9, 19, 29, 39, 49, 59, 69, 79, 89];

const makeRandomMove = () => {
  return state.validSquares[
    Math.floor(Math.random() * state.validSquares.length)
  ];
};

const createFilteredDirections = () => {
  const validCoords = state.validSquares.map((square) => square.coord);

  state.filteredDirections = state.directions.filter((dir) => {
    let diffRowSquare;
    const currentSquare = dir + state.randomSquare.coord;

    if (
      (leftEdge.includes(state.randomSquare.coord) &&
        rightEdge.includes(currentSquare)) ||
      (rightEdge.includes(state.randomSquare.coord) &&
        leftEdge.includes(currentSquare))
    ) {
      diffRowSquare = currentSquare;
    }

    return (
      validCoords.includes(currentSquare) && currentSquare !== diffRowSquare
    );
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

const resetMove = (GameBoard) => {
  AiReset();
  createValidSquares(GameBoard);
  return setRandomSquare();
};

const reverse = () => {
  state.direction = oppositeDirection(state.direction);

  const selectedCoord = state.startingSquare + state.direction;

  state.selectedSquare = state.validSquares.find(
    (square) => square.coord === selectedCoord
  );
};

export const AiReset = () => {
  state.randomSquare = null;
  state.selectedSquare = null;
  state.startingSquare = null;
  state.direction = null;
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

      if (!selectedSquare) {
        return resetMove(playerGameBoard);
      }

      if (selectedSquare.occupied) {
        state.selectedSquare = selectedSquare;
      }

      return selectedSquare.coord;
    }

    return setRandomSquare();
  } else if (state.selectedSquare.occupied) {
    if (checkShipSank(playerGameBoard)) {
      return resetMove(playerGameBoard);
    }

    let selectedCoord;
    if (
      (leftEdge.includes(state.selectedSquare.coord) &&
        (state.direction === 1 || state.direction === -1)) ||
      (rightEdge.includes(state.selectedSquare.coord) &&
        (state.direction === 1 || state.direction === -1))
    ) {
      state.direction = oppositeDirection(state.direction);
      selectedCoord = state.startingSquare + state.direction;

      state.selectedSquare = state.validSquares.find(
        (square) => square.coord === selectedCoord
      );
    } else {
      selectedCoord = state.selectedSquare.coord + state.direction;

      state.selectedSquare = state.validSquares.find(
        (square) => square.coord === selectedCoord
      );
    }

    state.selectedSquare = state.validSquares.find(
      (square) => square.coord === selectedCoord
    );

    if (!state.selectedSquare && !checkShipSank(playerGameBoard)) {
      reverse();

      if (!state.selectedSquare) {
        return resetMove(playerGameBoard);
      }

      return state.selectedSquare.coord;
    }

    if (!state.selectedSquare) {
      return resetMove(playerGameBoard);
    }

    return state.selectedSquare.coord;
  } else if (!state.selectedSquare.occupied) {
    reverse();

    if (!state.selectedSquare) {
      return resetMove(playerGameBoard);
    }

    return state.selectedSquare.coord;
  }
};
