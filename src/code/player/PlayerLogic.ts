export type Player = string;
export type NullablePlayer = Player | null;

export function getOpponentOf(
  thisPlayer: Player,
  playerPair: [Player, Player]
): Player {
  return thisPlayer === playerPair[0] ? playerPair[1] : playerPair[0];
}
