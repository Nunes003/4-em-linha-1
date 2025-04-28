export default function PieceSelector({ label, value, onChange, name, onNameChange }) {

  const pieces = ['R', 'Y', 'G', 'P', 'RGB'];

  function getPieceClass(value) {
    switch (value) {
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
  }
  
  return (
    <div className="piece-selector">
      <span>{label}</span>

      <input
        type="text"
        placeholder={`Nome do ${label}`}
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
      />

      <div className="piece-options">
        {pieces.map((piece) => (
          <label key={piece}>
            <input
              type="radio"
              name={`${label}-piece`}
              value={piece}
              checked={value === piece}
              onChange={() => onChange(piece)}
            />
            <span className={`piece ${getPieceClass(piece)}`}></span>
          </label>
        ))}
      </div>
    </div>
  );
}


