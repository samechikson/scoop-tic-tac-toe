import * as React from 'react';
import './BoardSelector.css';

export interface IBoardSelectorProps {
  onBoardSizeSelect: Function
}

export interface IBoardSelectorState {
  hoverBoardSize: number;
}

export default class BoardSelector extends React.PureComponent<IBoardSelectorProps, IBoardSelectorState> {
  maxSizeBoard = 10;

  constructor(props: IBoardSelectorProps) {
    super(props);

    this.state = {
      hoverBoardSize: 3
    }
  }

  onHoverCell(hoverBoardSize: number) {
    this.setState({ hoverBoardSize })
  }

  isCellInSelection(column: number, row: number): boolean {
    return this.state.hoverBoardSize < row || this.state.hoverBoardSize < column;
  }

  renderCell(column: number, row: number) {
    return <div key={`${column}${row}`}
                className={`Board-cell ${this.isCellInSelection(column, row) && 'Outside-selection'}`}
                onMouseOver={this.onHoverCell.bind(this, column > row ? column : row)}
                onClick={_ => this.props.onBoardSizeSelect((column > row ? column : row) + 1)}>
          </div>
  }

  public render() {
    return (
      <div className="Board-container">
        <p>Select board size: </p>
        { Array(this.maxSizeBoard).fill(0).map((_, i) => {
          return <div key={i} className="Board-column">
            {Array(this.maxSizeBoard).fill(0).map((_, j) => this.renderCell(i, j) )}
          </div>
        })}
      </div>
    );
  }
}
