import { ChangeEvent, useState } from 'react';
import { usePlayers } from '@/components/player/PlayerContext.tsx';

type Props = {
  onStartMatch: () => void;
};
export default function MatchSetupView({ onStartMatch }: Props) {
  const { players, updatePlayers } = usePlayers();
  const [playerOneValue, setPlayerOneValue] = useState(players.one);
  const [playerTwoValue, setPlayerTwoValue] = useState(players.two);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'playerOne') {
      setPlayerOneValue(event.target.value);
    } else if (event.target.name === 'playerTwo') {
      setPlayerTwoValue(event.target.value);
    }
  };

  const handleStartMatchClick = () => {
    // TODO error checking for player values and only start once ready
    const newPlayers = {
      one: playerOneValue,
      two: playerTwoValue,
    };
    updatePlayers(newPlayers);
    onStartMatch();
  };

  return (
    <div className="max-w-fit mx-auto">
      <h1 className="text-2xl text-center font-bold mt-7 mb-3">PLAYER SETUP</h1>
      <div className="grid grid-cols-2">
        <div className="border border-black text-l font-bold text-right p-2">
          Player One
        </div>
        <div className="border border-black text-center font-bold text-left p-2">
          <input
            className="w-8 border border-black pl-2"
            type="text"
            name="playerOne"
            id="playerOne"
            maxLength={1}
            value={playerOneValue}
            onChange={handleInputChange}
          />
        </div>
        <div className="border border-black text-l font-bold text-right p-2">
          Player Two
        </div>
        <div className="border border-black text-center font-bold text-left p-2">
          <input
            className="w-8 border border-black pl-2"
            type="text"
            name="playerTwo"
            id="playerTwo"
            maxLength={1}
            value={playerTwoValue}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="text-2xl text-center font-bold mt-7 mb-3">
        <button
          type="button"
          className="text-2xl font-bold bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
          onClick={handleStartMatchClick}
        >
          Start
        </button>
      </div>
    </div>
  );
}
