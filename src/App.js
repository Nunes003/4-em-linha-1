import React, { useState } from 'react';
import './App.css';
import './styles/Board.css';
import './styles/Disc.css';
import './styles/Cell.css';
import Layout from './components/layout/layout';
import Board from './components/game-panel/Board';

const ROWS = 6;
const COLS = 7;

const emptyBoard = () =>
  Array(ROWS)
    .fill(null)
    .map(() => Array(COLS).fill(null));

function App() {
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState('red');

  const handleColumnClick = (colIndex) => {
    const newBoard = board.map((row) => [...row]);
    for (let row = ROWS - 1; row >= 0; row--) {
      if (newBoard[row][colIndex] === null) {
        newBoard[row][colIndex] = currentPlayer;
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red');
        break;
      }
    }
  };

  return (
    <Layout>
      <Board board={board} onColumnClick={handleColumnClick} />
    </Layout>
  );
}

export default App;
