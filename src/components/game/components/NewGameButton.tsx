type Props = {
  onClick: () => void;
};
export default function NewGameButton({ onClick }: Props) {
  return (
    <button
      className="text-2xl font-bold bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
      type="button"
      onClick={onClick}
    >
      New Game
    </button>
  );
}
