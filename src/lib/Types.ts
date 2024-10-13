export type Player = {
  name: string;
  avatar: 'X' | 'O';
};

export type Square = Player | null;
