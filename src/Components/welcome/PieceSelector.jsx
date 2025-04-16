export default function PieceSelector({ onChange, value }) {
  return (
    <div className="piece-selector">
      <span>Jogador 1</span>
      <input type="text" placeholder="Nome do Jogador 1" />
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="R">🔴 Vermelho</option>
        <option value="B">🟡 Amarelo</option>
      </select>
    </div>
  );
}
