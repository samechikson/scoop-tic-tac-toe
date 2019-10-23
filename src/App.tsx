import React from 'react';
import './App.css';
import Board from './components/Board';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        Scoop - Tic Tac Toe
      </header>
      <div>
        <Board></Board>
      </div>
    </div>
  );
}

export default App;
