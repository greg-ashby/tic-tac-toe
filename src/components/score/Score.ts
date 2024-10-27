export type Score = {
  playerOneWins: number;
  playerTwoWins: number;
  ties: number;
};

export function getNewScore(): Score {
  return { playerOneWins: 0, playerTwoWins: 0, ties: 0 };
}
