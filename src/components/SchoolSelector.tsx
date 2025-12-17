import { KABBALAH_SCHOOLS, type KabbalahSchool } from '../data/kabbalah';
import '../styles/SchoolSelector.css';

interface SchoolSelectorProps {
  current: KabbalahSchool;
  onChange: (school: KabbalahSchool) => void;
}

export const SchoolSelector = ({ current, onChange }: SchoolSelectorProps) => {
  return (
    <div className="selector-container">
      {KABBALAH_SCHOOLS.map((school) => (
        <button
          key={school.id}
          onClick={() => onChange(school.id)}
          className={`selector-btn ${current === school.id ? 'active' : ''}`}
        >
          {/* Aquí podrías poner un ícono más tarde */}
          {school.name}
        </button>
      ))}
    </div>
  );
};