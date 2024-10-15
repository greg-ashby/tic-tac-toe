export type Player = {
  name: string;
  avatar: 'X' | 'O';
};

export type Square = {
  value: Player | null;
};
