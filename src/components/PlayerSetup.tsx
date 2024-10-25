import { Player } from '@/lib/GameLogic.ts';
import { ChangeEvent, useState } from 'react';

type Props = {
  // eslint-disable-next-line no-unused-vars
  onPlayerSetupSubmit: (playerOneValue: Player, playerTwoValue: Player) => void;
};
export default function PlayerSetup({
  onPlayerSetupSubmit: onPlayerSetupSumbit,
}: Props) {
  const [playerOneValue, setPlayerOneValue] = useState('X');
  const [playerTwoValue, setPlayerTwoValue] = useState('O');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'playerOne') {
      setPlayerOneValue(event.target.value);
    } else if (event.target.name === 'playerTwo') {
      setPlayerTwoValue(event.target.value);
    }
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
          onClick={() => {
            onPlayerSetupSumbit(playerOneValue, playerTwoValue);
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
}
