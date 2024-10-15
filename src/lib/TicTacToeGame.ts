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

  getSquare(row: number, column: number): Square {
    return this.#board[row][column];
  }

  constructor(firstPlayer: Player, secondPlayer: Player) {
    this.#firstPlayer = firstPlayer;
    this.#secondPlayer = secondPlayer;
    this.#currentTurn = this.firstPlayer;
    this.#winner = null;
    this.#board = TicTacToeGame.#getEmptyBoard();
  }

  get isDraw(): boolean {
    return this.#turnsTaken === 9 && !this.winner;
  }

  get isOver(): boolean {
    return !!this.winner || this.isDraw;
  }

  makeMove(row: number, column: number) {
    if (this.#board[row][column].value !== null) {
      throw new Error('Square already taken');
    }

    (this.#board[row][column] as Square).value = this.currentTurn;
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
        this.#board[row][0].value !== null &&
        this.#board[row][0].value === this.#board[row][1].value &&
        this.#board[row][0].value === this.#board[row][2].value
      ) {
        this.#winner = this.#board[row][0].value;
        return;
      }
    }

    for (let column = 0; column < 3; column++) {
      if (
        this.#board[0][column].value !== null &&
        this.#board[0][column].value === this.#board[1][column].value &&
        this.#board[0][column].value === this.#board[2][column].value
      ) {
        this.#winner = this.#board[0][column].value;
        return;
      }
    }

    if (
      this.#board[0][0].value !== null &&
      this.#board[0][0].value === this.#board[1][1].value &&
      this.#board[0][0].value === this.#board[2][2].value
    ) {
      this.#winner = this.#board[0][0].value;
    } else if (
      this.#board[0][2].value !== null &&
      this.#board[0][2].value === this.#board[1][1].value &&
      this.#board[0][2].value === this.#board[2][0].value
    ) {
      this.#winner = this.#board[0][2].value;
    }
  }

  static #getEmptyBoard(): [
    [Square, Square, Square],
    [Square, Square, Square],
    [Square, Square, Square],
  ] {
    return [
      [{ value: null }, { value: null }, { value: null }],
      [{ value: null }, { value: null }, { value: null }],
      [{ value: null }, { value: null }, { value: null }],
    ];
  }
}
