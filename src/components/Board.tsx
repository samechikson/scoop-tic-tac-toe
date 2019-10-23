import * as React from 'react';
import BoardSelector from './BoardSelector';
import { Cell } from './Cell';
import './Board.css';
import { determineWinner } from '../utilities/board.util';

export interface IBoardProps {
}

export interface IBoardState {
  size: number;
  game: any[][];
  isCurrentTurnX: boolean;
  isWinner: boolean;
}

export default class Board extends React.Component<IBoardProps, IBoardState> {
  initialState: IBoardState = {
    size: 0,
    game: [],
    isCurrentTurnX: true,
    isWinner: false
  }
  constructor(props: IBoardProps) {
    super(props);

    this.state = {...this.initialState}
  }

  selectBoardSize(size: number) {
    const newGame = Array(size).fill(null).map(_ => Array(size).fill(null));
    this.setState({
      size,
      game: newGame
    })
  }

  clickCell(column: number, row: number) {
    const newColumn = this.state.game[column].slice()
    newColumn[row] = this.state.isCurrentTurnX ? 'x' : 'o';
    const newGame = this.state.game.slice();
    newGame[column] = newColumn;

    if (determineWinner(newGame)) {
      this.setState({
        game: newGame,
        isWinner: true
      })
      return;
    };

    this.setState({
      game: newGame,
      isCurrentTurnX: !this.state.isCurrentTurnX
    })
  }

  renderGameStatus() {
    return this.state.isWinner ? 
      <p>{this.state.isCurrentTurnX ? 'X' : 'O'} is the Winner!</p> :
      <p>Current turn: {this.state.isCurrentTurnX ? 'X' : 'O'} </p>
  }

  renderBoardGame() {
    return <div className="Board-container">
      {this.state.game.map((column: any[], i) =>
        <div key={`board-column-${i}`} className="Board-column">
          {column.map((row, j) => {
            return <Cell
              key={`board-cell-${i}${j}`}
              value={row}
              onClick={() => !this.state.isWinner && this.clickCell(i, j)} />
          })}
        </div>
      )}
      {this.renderGameStatus()}
    </div>
  }

  restart() {
    this.setState({...this.initialState})
  }

  public render() {
    let mainDisplay;
    if (!this.state.game.length) {
      mainDisplay = <BoardSelector onBoardSizeSelect={(size: number) => this.selectBoardSize(size)} />
    } else {
      mainDisplay = this.renderBoardGame()
    }
    return (
      <div className="Game">
        {mainDisplay}
        {this.state.isWinner && <button onClick={() => this.restart()}>Restart</button>}
      </div>
    );
  }
}
