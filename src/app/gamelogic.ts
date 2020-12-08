import { Status } from './game-status';

export class Gamelogic {

    gamefield: Array<number> = [];

    currentPlayer: number;

    gameStatus: Status;

    public constructor() {
        this.gameStatus = Status.STOP;
        this.gamefield = [0, 0, 0, 0, 0, 0, 0, 0, 0]

    }
}
