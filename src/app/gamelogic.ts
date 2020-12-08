import { Status } from './game-status';

export class Gamelogic {

    gamefield: Array<number> = [];

    currentPlayer: number;

    gameStatus: Status;

    winConditionP1: Array<Array<number>> = [
        [1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 1],
        [0, 0, 1, 0, 1, 0, 1, 0, 0],
        [1, 0, 0, 0, 1, 0, 0, 0, 1],
    ];

    winConditionP2: Array<Array<number>> = [
        [2, 2, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 0, 0, 2, 0, 0, 2, 0, 0],
        [0, 2, 0, 0, 2, 0, 0, 2, 0],
        [0, 0, 2, 0, 0, 2, 0, 0, 2],
        [0, 0, 2, 0, 2, 0, 2, 0, 0],
        [2, 0, 0, 0, 2, 0, 0, 0, 2],
    ];

    public constructor() {
        this.gameStatus = Status.STOP;
        this.gamefield = [0, 0, 0, 0, 0, 0, 0, 0, 0]

    }

    gameStart(): void {
        this.gamefield = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        this.currentPlayer = this.randomPlayerStart();
        this.gameStatus = Status.START;
    }

    randomPlayerStart(): number {
        const startPlayer = Math.floor(Math.random() * 2) + 1;
        return startPlayer;
    }

    setField(position: number, value: number): void {
        this.gamefield[position] = value;
    }

    getPlayerColorClass(): String {
        const colorClass = (this.currentPlayer === 2) ? "player-two" : "player-one";
        return colorClass;
    }

    changePlayer(): void {
        this.currentPlayer = (this.currentPlayer === 2) ? 1 : 2;
    }

    arrayEquals(a: Array<any>, b: Array<any>): boolean {
        return Array.isArray(a) && Array.isArray(b) && a.length === b.length &&
            a.every((value, index) => value === b[index]);
    }


    async checkWinner(): Promise<boolean> {
        let isWinner = false;

        const checkWinner = (this.currentPlayer === 1) ? this.winConditionP1 : this.winConditionP2;

        const currentArray = [];

        this.gamefield.forEach((subfield, index) => {
            if (subfield !== this.currentPlayer) {
                currentArray[index] = 0;
            } else {
                currentArray[index] = subfield;
            }
        });

        checkWinner.forEach((checkfield, checkindex) => {
            if (this.arrayEquals(checkfield, currentArray)) {
                isWinner = true;
            }
        })

        if (isWinner) {
            this.gameEnds();
            return true
        }

    }


    async checkGameEnd(): Promise<boolean> {
        let gameEnd = false;

        if (!this.gamefield.includes(0)) {
            gameEnd = true
        }

        if (gameEnd) {
            this.gameEnds();
            return true
        }

    }

    gameEnds(): void {
        this.gameStatus = Status.STOP;
    }


}
