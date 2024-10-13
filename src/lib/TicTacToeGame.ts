import { Player, Square } from './Types.ts';

export default class TicTacToeGame {
  #firstPlayer: Player;
  #secondPlayer: Player;
  #currentTurn: Player;
  #winner: Player | null;
  #turnsTaken = 0;

  #board: [
    [Square, Square, Square],
    [Square, Square, Square],
    [Square, Square, Square],
  ];

  get firstPlayer(): Player {
    return this.#firstPlayer;
  }

  get secondPlayer(): Player {
    return this.#secondPlayer;
  }

  get currentTurn(): Player {
    return this.#currentTurn;
  }

  get winner(): Player | null {
    return this.#winner;
  }

  constructor(firstPlayer: Player, secondPlayer: Player) {
    this.#firstPlayer = firstPlayer;
    this.#secondPlayer = secondPlayer;
    this.#currentTurn = this.firstPlayer;
    this.#winner = null;
    this.#board = TicTacToeGame.#getEmptyBoard();
  }

  isDraw(): boolean {
    if (this.#turnsTaken === 9 && !this.winner) return true;
    return false;
  }

  makeMove(row: number, column: number) {
    if (this.#board[row][column] !== null) {
      throw new Error('Square already taken');
    }

    this.#board[row][column] = this.currentTurn;
    this.#turnsTaken += 1;
    this.#checkAndSetWinner();
    if (this.winner) return;

    this.#changeTurn();
  }

  #changeTurn() {
    this.#currentTurn =
      this.currentTurn === this.firstPlayer
        ? this.secondPlayer
        : this.firstPlayer;
  }

  #checkAndSetWinner() {
    for (let row = 0; row < 3; row++) {
      if (
        this.#board[row][0] !== null &&
        this.#board[row][0] === this.#board[row][1] &&
        this.#board[row][0] === this.#board[row][2]
      ) {
        // eslint-disable-next-line prefer-destructuring
        this.#winner = this.#board[row][0];
        return;
      }
    }

    for (let column = 0; column < 3; column++) {
      if (
        this.#board[0][column] !== null &&
        this.#board[0][column] === this.#board[1][column] &&
        this.#board[0][column] === this.#board[2][column]
      ) {
        // eslint-disable-next-line prefer-destructuring
        this.#winner = this.#board[0][column];
        return;
      }
    }

    if (
      this.#board[0][0] !== null &&
      this.#board[0][0] === this.#board[1][1] &&
      this.#board[0][0] === this.#board[2][2]
    ) {
      // eslint-disable-next-line prefer-destructuring
      this.#winner = this.#board[0][0];
    } else if (
      this.#board[0][2] !== null &&
      this.#board[0][2] === this.#board[1][1] &&
      this.#board[0][2] === this.#board[2][0]
    ) {
      // eslint-disable-next-line prefer-destructuring
      this.#winner = this.#board[0][2];
    }
  }

  static #getEmptyBoard(): [
    [Square, Square, Square],
    [Square, Square, Square],
    [Square, Square, Square],
  ] {
    return [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  }
}
