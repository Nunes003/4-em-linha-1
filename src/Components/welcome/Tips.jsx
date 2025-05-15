import { useState, useEffect } from 'react';

const tips = [
  'Comece pelo centro para ter mais opções de vitória!',
  'Observe atentamente as jogadas do adversário para bloquear suas estratégias.',
  'Tente criar múltiplas ameaças ao mesmo tempo para confundir o oponente.',
  'No modo 1 vs PC, o computador é mais vulnerável nas laterais do tabuleiro.',
  'Jogadores experientes sempre verificam diagonais antes de fazer sua jogada.',
  'Controlar o centro do tabuleiro dá mais oportunidades de criar sequências vencedoras.',
  'Às vezes, a melhor jogada é bloquear o adversário em vez de avançar seu próprio jogo.',
];

export default function GameTips() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // Rotação automática das dicas
  useEffect(() => {
    if (!isAutoRotating) return;

    const interval = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 3000); // Muda a cada 3 segundos

    return () => clearInterval(interval);
  }, [isAutoRotating]);

  const goToNextTip = () => {
    setIsAutoRotating(false);
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
  };

  const goToPrevTip = () => {
    setIsAutoRotating(false);
    setCurrentTipIndex(
      (prevIndex) => (prevIndex - 1 + tips.length) % tips.length
    );
  };

  const restartAutoRotation = () => {
    setIsAutoRotating(true);
  };

  return (
    <div
      className="tips-container"
      onMouseEnter={() => setIsAutoRotating(false)}
      onMouseLeave={restartAutoRotation}>
      <div className="tips-header">
        <span className="tips-icon">💡</span>
        <h3>Dicas do Jogo</h3>
      </div>

      <div className="tip-content">
        <p>{tips[currentTipIndex]}</p>
      </div>

      <div className="tips-navigation">
        <button
          className="nav-button prev-button"
          onClick={goToPrevTip}
          aria-label="Dica anterior">
          ◀
        </button>

        <div className="dots-container">
          {tips.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentTipIndex ? 'active' : ''}`}
              onClick={() => {
                setIsAutoRotating(false);
                setCurrentTipIndex(index);
              }}
            />
          ))}
        </div>

        <button
          className="nav-button next-button"
          onClick={goToNextTip}
          aria-label="Próxima dica">
          ▶
        </button>
      </div>
    </div>
  );
}
