type Props = {
  value: string | null;
  onClick: () => void;
};

export default function GameSquare({ value, onClick }: Props) {
  return (
    <button
      type="button"
      className="w-24 h-24 flex items-center justify-center border border-black text-2xl"
      onClick={onClick}
    >
      {value}
    </button>
  );
}
