// src/components/Popup.js
export default function Popup({ message, onClose }) {
    return (
      <div className="popup-overlay">
        <div className="popup-box">
          <p>{message}</p>
          <button className="popup-close-btn" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    );
  }
  