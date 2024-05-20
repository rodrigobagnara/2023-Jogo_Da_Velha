import { Component, OnInit } from '@angular/core';
import { GameLogic } from '../game-logic';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [GameLogic]
})

export class GameComponent implements OnInit {

  constructor(public game: GameLogic) { }

  ngOnInit(): void {
  }

  startGame(): void {
    this.game.gameStart()
    const currentPlayer = "Vez do jogador: " + this.game.currentTurn;
    const information = document.querySelector('.current-status');
    information.innerHTML = currentPlayer;
  }

  async clickSubfield( subfield: any ): Promise<void> {
    if ( this.game.gameStatus === 1 ) {
      const position = subfield.currentTarget.getAttribute('position');
      console.log(position);
      const information = document.querySelector('.current-status');

      this.game.setField(position, this.game.currentTurn);
      const color = this.game.getPlayerColorClass();
      subfield.currentTarget.classList.add(color);

      await this.game.checkGameEndWinner().then( (end: boolean) => {
        if ( this.game.gameStatus === 0 && end ) {
          information.innerHTML = 'O jogador ' + this.game.currentTurn + ' é o vencedor!';
        }
      });

      await this.game.checkGameEndFull().then( (end: boolean) => {
        if ( this.game.gameStatus === 0 && end ) {
          information.innerHTML = 'Empate!';
        }
      });

      this.game.changePlayer();
  
      if ( this.game.gameStatus === 1 ) {
        const currentPlayer = "Vez do jogador: " + this.game.currentTurn;
        information.innerHTML = currentPlayer;
      }
    }
  }

}
