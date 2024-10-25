export type Player = string;
export type NullablePlayer = Player | null;

export function switchPlayers(
  thisPlayer: Player,
  thatPlayer: Player
): Player[] {
  return [thatPlayer, thisPlayer];
}

export function getOpponent(
  thisPlayer: Player,
  playerA: Player,
  playerB: Player
): Player {
  return thisPlayer === playerA ? playerB : playerA;
}
