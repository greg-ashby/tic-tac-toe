export type Player = string;
export type NullablePlayer = Player | null;
export type Players = [Player, Player];

export function getOpponentOf(thisPlayer: Player, players: Players): Player {
  return thisPlayer === players[0] ? players[1] : players[0];
}
