import { useEffect, useState } from 'react';

export default function FloatingPiece({ currentPlayer }) {
  const [colIndex, setColIndex] = useState(0);
  const [boardRect, setBoardRect] = useState(null);

  const getPieceClass = (cell) => {
    switch (cell) {
      case 'R':
        return 'red-piece';
      case 'Y':
        return 'yellow-piece';
      case 'G':
        return 'green-piece';
      case 'P':
        return 'purple-piece';
      case 'RGB':
        return 'rainbow-piece';
      default:
        return '';
    }
  };

  useEffect(() => {
    const board = document.getElementById('board');
    if (board) {
      const rect = board.getBoundingClientRect();
      setBoardRect(rect);
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!boardRect) return;
      const relativeX = e.clientX - boardRect.left;
      const colWidth = boardRect.width / 7;
      const index = Math.floor(relativeX / colWidth);
      if (index >= 0 && index < 7) {
        setColIndex(index);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [boardRect]);

  const colWidth = boardRect ? boardRect.width / 7 : 0;
  const pieceLeft = boardRect ? boardRect.left + colIndex * colWidth + colWidth / 2 - 25 : 0;

  return (
    <div
      className={`floating-piece ${getPieceClass(currentPlayer)}`}
      style={{
        position: 'fixed',
        top: boardRect ? boardRect.top - 60 : 0,
        left: pieceLeft,
        width: '50px',
        height: '50px',
        pointerEvents: 'none',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        transition: 'left 0.1s ease',
      }}
    />
  );
}
