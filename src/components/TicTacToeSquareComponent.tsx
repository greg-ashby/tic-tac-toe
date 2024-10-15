'use client';

import { Square } from '@/lib/Types.ts';
import { useState } from 'react';

type Props = {
  square: Square;
  isGameOver: boolean;
  onSquareClick: () => Square;
};

export default function TicTacToeSquareComponent({
  square,
  isGameOver,
  onSquareClick,
}: Props) {
  const [avatar, setAvatar] = useState(square.value?.avatar);
  return (
    <button
      className="w-24 h-24 flex items-center justify-center border border-black text-2xl"
      type="button"
      disabled={isGameOver || square.value !== null}
      onClickCapture={() => {
        const { value } = onSquareClick();
        setAvatar(value?.avatar);
      }}
    >
      {avatar}
    </button>
  );
}
