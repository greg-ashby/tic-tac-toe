export type Player = string; // TODO make player a name and avatar value
export type NullablePlayer = Player | null;
export type Players = {
  one: Player;
  two: Player;
};

export function getOpponentOf(thisPlayer: Player, players: Players): Player {
  return thisPlayer === players.one ? players.two : players.one;
}
