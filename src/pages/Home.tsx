import { useState } from 'react';
import { HebrewKeyboard } from '../components/HebrewKeyboard';
import { SchoolSelector } from '../components/SchoolSelector';
import { HebrewInput } from '../components/HebrewInput';

// IMPORTACIÓN CORRECTA: Asegúrate de que el archivo se llame HebrewGalaxy.tsx
import { HebrewGalaxy } from '../components/HebrewGalaxy'; 

import type { KabbalahSchool } from '../data/kabbalah';
import '../styles/Home.css';

export const Home = () => {
  const [school, setSchool] = useState<KabbalahSchool>('ari');
  const [inputText, setInputText] = useState('');

  const handleCharClick = (char: string) => {
    setInputText((prev) => prev + char);
  };

  const handleDelete = () => {
    setInputText((prev) => prev.slice(0, -1));
  };

  return (
    <div className="home-page" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* CAPA 0: FONDO DE GALAXIA HEBREA */}
      <HebrewGalaxy text={inputText} school={school} />

      {/* CAPA 10: INTERFAZ DE USUARIO */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        // Esto permite que el mouse interactúe con el fondo en las zonas vacías
        pointerEvents: 'none' 
      }}>
        
        <header className="home-header" style={{ pointerEvents: 'auto' }}>
          <h1 className="home-title">Gematria Genesis</h1>
          <p className="home-subtitle">La energía del lenguaje sagrado</p>
        </header>

        <section className="home-controls" style={{ pointerEvents: 'auto' }}>
          <SchoolSelector current={school} onChange={setSchool} />
        </section>

        <section style={{ width: '100%', display: 'flex', justifyContent: 'center', pointerEvents: 'auto' }}>
          <HebrewInput 
            value={inputText} 
            school={school}       
            onDelete={handleDelete} 
          />
        </section>

        <section className="home-content" style={{ width: '100%', display: 'flex', justifyContent: 'center', pointerEvents: 'auto' }}>
          <HebrewKeyboard 
            currentSchool={school} 
            onCharClick={handleCharClick} 
          />
        </section>

      </div>
    </div>
  );
};