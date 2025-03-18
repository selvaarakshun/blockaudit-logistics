
import { useEffect, useRef } from 'react';

interface Block {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  angle: number;
}

const BlockchainAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      }
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Create blocks
    const blocks: Block[] = [];
    const blockCount = 15;
    const colors = ['#3B82F6', '#4F46E5', '#1D4ED8', '#2563EB'];

    for (let i = 0; i < blockCount; i++) {
      blocks.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 10 + Math.random() * 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.5 + Math.random() * 1.5,
        angle: Math.random() * Math.PI * 2,
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections between blocks
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < blocks.length; i++) {
        for (let j = i + 1; j < blocks.length; j++) {
          const dx = blocks[i].x - blocks[j].x;
          const dy = blocks[i].y - blocks[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(blocks[i].x, blocks[i].y);
            ctx.lineTo(blocks[j].x, blocks[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Update and draw blocks
      blocks.forEach(block => {
        // Update position
        block.x += Math.cos(block.angle) * block.speed;
        block.y += Math.sin(block.angle) * block.speed;
        
        // Bounce off edges
        if (block.x <= 0 || block.x >= canvas.width) {
          block.angle = Math.PI - block.angle;
        }
        if (block.y <= 0 || block.y >= canvas.height) {
          block.angle = -block.angle;
        }
        
        // Draw block
        ctx.beginPath();
        ctx.fillStyle = block.color;
        ctx.fillRect(block.x - block.size / 2, block.y - block.size / 2, block.size, block.size);
        
        // Draw halo effect
        const gradient = ctx.createRadialGradient(
          block.x, block.y, 0,
          block.x, block.y, block.size * 2
        );
        gradient.addColorStop(0, `${block.color}30`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(block.x, block.y, block.size * 2, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full"
    />
  );
};

export default BlockchainAnimation;
