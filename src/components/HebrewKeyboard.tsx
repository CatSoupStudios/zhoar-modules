import { HEBREW_ALPHABET, getHebrewColor, type KabbalahSchool } from '../data/kabbalah';
import '../styles/HebrewKeyboard.css';

interface HebrewKeyboardProps {
  currentSchool: KabbalahSchool;
  onCharClick?: (char: string) => void; 
}

export const HebrewKeyboard = ({ currentSchool, onCharClick }: HebrewKeyboardProps) => {
  return (
    <div className="keyboard-container">
      {HEBREW_ALPHABET.map((item) => {
        const bgColor = getHebrewColor(item.char, currentSchool);
        
        return (
          <button
            key={item.char}
            className="keyboard-key"
            onClick={() => onCharClick && onCharClick(item.char)}
            // IMPORTANTE: Pasamos el color como Variable CSS
            style={{ '--key-base': bgColor } as React.CSSProperties} 
            title={item.name}
          >
            <span className="key-char">{item.char}</span>
            <span className="key-val">{item.val}</span>
          </button>
        );
      })}
    </div>
  );
};