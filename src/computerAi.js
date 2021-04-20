const computerAi = (playerBoard) => {
  const validSquares = playerBoard.filter((square) => !square.shot);

  return validSquares[Math.floor(Math.random() * validSquares.length)].coord;
};

export default computerAi;
