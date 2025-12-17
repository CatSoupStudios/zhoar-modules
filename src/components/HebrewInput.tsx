import { getHebrewColor, type KabbalahSchool } from '../data/kabbalah';
import '../styles/HebrewInput.css';

interface HebrewInputProps {
  value: string;
  school: KabbalahSchool;
  onDelete: () => void;
}

export const HebrewInput = ({ value, school, onDelete }: HebrewInputProps) => {
  return (
    <div className="hebrew-input-wrapper">
      
      {/* 1. Visor de Texto (Ahora va primero a la izquierda) */}
      <div className="mystic-display" dir="rtl">
        {value.length === 0 ? (
          <span className="placeholder">Escribe aquí...</span>
        ) : (
          value.split('').map((char, index) => {
            const color = getHebrewColor(char, school);
            return (
              <span 
                key={index} 
                // Pasamos el color como variable CSS para efectos avanzados
                style={{ '--char-color': color } as React.CSSProperties}
                className="mystic-char"
              >
                {char}
              </span>
            );
          })
        )}
      </div>

      {/* 2. Botón de Borrar (Ahora va segundo, a la derecha) */}
      <button className="delete-btn" onClick={onDelete} title="Borrar">
        ⌫
      </button>

    </div>
  );
};