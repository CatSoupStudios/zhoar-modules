import { useEffect, useRef } from 'react';
import { getHebrewColor, type KabbalahSchool } from '../data/kabbalah';

class GalaxyParticle {
  x: number;
  y: number;
  z: number; 
  size: number;
  angleOffset: number; 

  constructor(width: number, height: number) {
    const maxDim = Math.max(width, height);
    this.x = (Math.random() - 0.5) * maxDim * 1.5;
    this.y = (Math.random() - 0.5) * maxDim * 1.5;
    this.z = Math.random(); 
    this.size = 15 + Math.random() * 25; 
    this.angleOffset = Math.random() * Math.PI * 2; 
  }

  draw(
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number, 
    text: string, 
    school: KabbalahSchool,
    time: number,
    mouse: { x: number; y: number }
  ) {
    if (text.length === 0) return;

    const cx = width / 2;
    const cy = height / 2;
    const depthScale = 0.5 + this.z * 0.5;

    // Rotación suave
    const rotationSpeed = 0.0001; 
    const angle = time * rotationSpeed * (1 + this.z); 
    
    let rx = this.x * Math.cos(angle) - this.y * Math.sin(angle);
    let ry = this.x * Math.sin(angle) + this.y * Math.cos(angle);

    let screenX = cx + rx;
    let screenY = cy + ry;

    // Repulsión
    const dx = mouse.x - screenX;
    const dy = mouse.y - screenY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const repulsionRadius = 300; 

    if (dist < repulsionRadius) {
        const force = (repulsionRadius - dist) / repulsionRadius;
        const pushX = (dx / dist) * force * -100 * this.z; 
        const pushY = (dy / dist) * force * -100 * this.z;
        screenX += pushX;
        screenY += pushY;
    }

    const charIndex = Math.floor(Math.abs(this.x + this.y)) % text.length;
    const charToDraw = text[charIndex];
    const color = getHebrewColor(charToDraw, school);

    if (screenX > -50 && screenX < width + 50 && screenY > -50 && screenY < height + 50) {
        ctx.save();
        ctx.globalAlpha = 0.6 * depthScale; 
        ctx.fillStyle = color;
        const finalSize = this.size * depthScale;
        ctx.font = `bold ${finalSize}px "Times New Roman"`;
        ctx.shadowBlur = finalSize * 0.8;
        ctx.shadowColor = color;

        ctx.fillText(charToDraw, screenX, screenY);

        if (this.z > 0.8) {
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.shadowBlur = 0;
            ctx.fillText(charToDraw, screenX, screenY);
        }
        ctx.restore();
    }
  }
}

interface HebrewGalaxyProps {
  text: string;
  school: KabbalahSchool;
}

export const HebrewGalaxy = ({ text, school }: HebrewGalaxyProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<GalaxyParticle[]>([]);
  
  // USAMOS REFS PARA QUE EL BUCLE LEA SIEMPRE EL VALOR ACTUAL SIN REINICIARSE
  const textRef = useRef(text);
  const schoolRef = useRef(school);

  // 1. Actualizar los refs cuando cambian las props (sin tocar el canvas)
  useEffect(() => {
    textRef.current = text;
    schoolRef.current = school;
  }, [text, school]);

  // 2. Gestionar la cantidad de estrellas (Agregar/Quitar) SIN reiniciar el loop
  useEffect(() => {
    const PARTICLES_PER_CHAR = 25;
    const currentCount = starsRef.current.length;
    const targetCount = text.length * PARTICLES_PER_CHAR;

    if (targetCount > currentCount) {
        // Agregar las que faltan
        const toAdd = targetCount - currentCount;
        const width = window.innerWidth;
        const height = window.innerHeight;
        for (let i = 0; i < toAdd; i++) {
            starsRef.current.push(new GalaxyParticle(width, height));
        }
    } else if (targetCount < currentCount) {
        // Quitar las que sobran
        starsRef.current.splice(targetCount);
    }
  }, [text]); // Solo corre cuando cambia el texto, pero solo modifica el array

  // 3. El Motor Gráfico (Solo corre UNA vez al inicio)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let startTime = Date.now();
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const animate = () => {
      const currentTime = Date.now() - startTime;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Usamos los refs para dibujar con el texto y escuela actuales
      const currentText = textRef.current;
      const currentSchool = schoolRef.current;

      starsRef.current.forEach(star => {
        star.draw(
            ctx, 
            canvas.width, 
            canvas.height, 
            currentText, 
            currentSchool, 
            currentTime, 
            mouse
        );
      });

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []); // Dependencias vacías = NUNCA SE REINICIA

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};