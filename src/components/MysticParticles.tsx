import { useEffect, useRef } from 'react';
import { getHebrewColor, type KabbalahSchool } from '../data/kabbalah';

// --- CLASE PARTICLE ---
class Particle {
  x: number;
  y: number;
  size: number;
  char: string;
  speedX: number;
  speedY: number;
  angle: number;
  angleSpeed: number;
  oscillationSize: number;

  constructor(char: string, canvasWidth: number, canvasHeight: number) {
    this.char = char;
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    
    // Tamaño grande
    this.size = Math.random() * 30 + 30; 
    
    // Velocidad Ultra Lenta (Modo Zen)
    this.speedX = Math.random() * 0.01 - 0.005; 
    this.speedY = Math.random() * 0.01 - 0.005;

    this.angle = Math.random() * Math.PI * 2;
    this.angleSpeed = Math.random() * 0.0005 + 0.0001; 
    this.oscillationSize = Math.random() * 0.5 + 0.1;
  }

  update(width: number, height: number, mouse: { x: number; y: number }) {
    const mouseRadius = 150;
    
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < mouseRadius) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (mouseRadius - distance) / mouseRadius;
        
        this.x -= forceDirectionX * force * 0.5; 
        this.y -= forceDirectionY * force * 0.5;
    } else {
        this.angle += this.angleSpeed;
        const waveX = Math.cos(this.angle) * this.oscillationSize;
        const waveY = Math.sin(this.angle) * this.oscillationSize;

        this.x += this.speedX + waveX;
        this.y += this.speedY + waveY;
    }

    // Wrap around
    if (this.x < -60) this.x = width + 60;
    if (this.x > width + 60) this.x = -60;
    if (this.y < -60) this.y = height + 60;
    if (this.y > height + 60) this.y = -60;
  }

  draw(ctx: CanvasRenderingContext2D, currentSchool: KabbalahSchool) {
    const color = getHebrewColor(this.char, currentSchool);
    
    ctx.save();
    
    // 1. AUMENTAMOS LA OPACIDAD (De 0.3 a 0.8 para que resalten mucho más)
    ctx.globalAlpha = 0.8; 
    ctx.fillStyle = color; 
    
    ctx.font = `bold ${this.size}px "Times New Roman"`; 
    
    // 2. GLOW INTENSO (Sombra más fuerte y difusa)
    ctx.shadowBlur = 25;
    ctx.shadowColor = color;
    
    // Dibujamos la letra base (Color Neón)
    ctx.fillText(this.char, this.x, this.y);
    
    // 3. TRUCO DE BRILLO EXTRA:
    // Dibujamos una capa blanca semitransparente encima para simular un "núcleo de luz"
    // Esto hace que se vean "encendidas"
    ctx.shadowBlur = 5; // Menos blur para el núcleo
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.fillText(this.char, this.x, this.y);
    
    ctx.restore();
  }
}

// --- COMPONENTE PRINCIPAL ---

interface MysticParticlesProps {
  text: string;
  school: KabbalahSchool;
}

export const MysticParticles = ({ text, school }: MysticParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const prevTextLengthRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particlesPerChar = 8;
    let mouse = { x: -1000, y: -1000 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      // Importante: clearRect borra el frame anterior para que no dejen rastro feo
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        particle.update(canvas.width, canvas.height, mouse);
        particle.draw(ctx, school);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    if (text.length > prevTextLengthRef.current) {
        const newChar = text[text.length - 1];
        for (let i = 0; i < particlesPerChar; i++) {
            particlesRef.current.push(new Particle(newChar, canvas.width, canvas.height));
        }
    } 
    else if (text.length < prevTextLengthRef.current) {
        if (text.length === 0) {
            particlesRef.current = [];
        } else {
            particlesRef.current.splice(-particlesPerChar);
        }
    }

    prevTextLengthRef.current = text.length;

    window.addEventListener('resize', resizeCanvas);
    const mouseHandler = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', mouseHandler);

    if (particlesRef.current.length === 0 && text.length > 0) {
        resizeCanvas();
    } else {
        resizeCanvas();
    }
    
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', mouseHandler);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [text, school]);

  return (
    <canvas 
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }} 
    />
  );
};