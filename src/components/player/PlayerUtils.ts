export type Player = string;
export type NullablePlayer = Player | null;
export type Players = {
  one: Player;
  two: Player;
};

export function getOpponentOf(thisPlayer: Player, players: Players): Player {
  return thisPlayer === players.one ? players.two : players.one;
}
