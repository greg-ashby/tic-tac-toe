type Props = {
  value: string | null;
  onClick: () => void;
  disabled: boolean;
};

export default function GameSquare({ value, onClick, disabled }: Props) {
  return (
    <button
      type="button"
      className="w-24 h-24 flex items-center justify-center border border-black text-2xl"
      disabled={disabled || value !== null}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
