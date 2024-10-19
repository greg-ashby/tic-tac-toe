'use client';

type Props = {
  onClick: () => void;
};
export default function NewGameButton({ onClick }: Props) {
  return (
    <button className="text-2xl font-bold" type="button" onClick={onClick}>
      New Game
    </button>
  );
}
