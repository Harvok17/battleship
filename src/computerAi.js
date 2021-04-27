const computerAi = (playerGameBoard) => {
  const validSquares = playerGameBoard.board.filter((square) => !square.shot);

  return validSquares[Math.floor(Math.random() * validSquares.length)].coord;
};

export default computerAi;
