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
  isPlayerX: boolean;
}

export default class Board extends React.Component<IBoardProps, IBoardState> {
  constructor(props: IBoardProps) {
    super(props);

    this.state = {
      size: 0,
      game: [],
      isPlayerX: true
    }
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
    newColumn[row] = this.state.isPlayerX ? 'x' : 'o';
    const newGame = this.state.game.slice();
    newGame[column] = newColumn;

    determineWinner(newGame);

    this.setState({
      game: newGame,
      isPlayerX: !this.state.isPlayerX
    })
  }

  public render() {
    return (
      <div>
        <BoardSelector
          onBoardSizeSelect={(size: number) => this.selectBoardSize(size) }
          ></BoardSelector>
          <hr></hr>
          <div className="Board-container">
            { this.state.game.map((column: any[], i) => 
              <div key={`board-column-${i}`} className="Board-column">
                {column.map((row, j) => {
                  return <Cell 
                          key={`board-cell-${i}${j}`} 
                          value={row} 
                          onClick={() => this.clickCell(i, j)}/>
                })}
              </div>
            )}
          </div>
      </div>
    );
  }
}
