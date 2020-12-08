import { Component, OnInit } from '@angular/core';
import { Gamelogic } from '../gamelogic';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css'],
  providers: [Gamelogic]
})
export class SquareComponent implements OnInit {

  constructor(public game: Gamelogic) { }

  ngOnInit(): void {
  }

  startGame(): void {
    this.game.gameStart();
    const currentPlayerText = `Current turn: Player ${this.game.currentPlayer}`;
    const information = document.querySelector(".current-status");
    information.innerHTML = currentPlayerText;

  }

  async clickSubField(subfield: any): Promise<void> {
    if (this.game.gameStatus === 1) {
      const position = subfield.currentTarget.getAttribute("position");

      this.game.setField(position, this.game.currentPlayer);
      const color = this.game.getPlayerColorClass();
      subfield.currentTarget.classList.add(color);
    }

    await this.game.checkWinner().then((end: boolean) => {
      if (this.game.gameStatus === 0 && end) {
        const information = document.querySelector(".current-status");
        information.innerHTML = `The winner is player ${this.game.currentPlayer}`;
      }
    })

    await this.game.checkGameEnd().then((end: boolean) => {
      if (this.game.gameStatus === 0 && end) {
        const information = document.querySelector(".current-status");
        information.innerHTML = `No winner: draw`;
      }
    })



    this.game.changePlayer();

    if (this.game.gameStatus === 1) {
      const currentPlayerText = `Current turn: Player ${this.game.currentPlayer}`;
      const information = document.querySelector(".current-status");
      information.innerHTML = currentPlayerText;
    }
  }
}


