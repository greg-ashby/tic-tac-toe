export type ScoreState = {
  playerOneWins: number;
  playerTwoWins: number;
  ties: number;
};

export function getNewScoreState(): ScoreState {
  return { playerOneWins: 0, playerTwoWins: 0, ties: 0 };
}
