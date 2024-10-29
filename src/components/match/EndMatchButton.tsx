type Props = {
  onEndMatchClick: () => void;
};

export function EndMatchButton({ onEndMatchClick }: Props) {
  const handleClick = () => {
    onEndMatchClick();
  };

  return (
    <button
      className="text-l font-bold bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-200"
      type="button"
      onClick={handleClick}
    >
      End Match
    </button>
  );
}
