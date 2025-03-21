
import { useEffect, useRef } from 'react';

interface Block {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  angle: number;
  pulse: number;
  pulseSpeed: number;
  text?: string;
}

interface Connection {
  from: number;
  to: number;
  strength: number;
  color: string;
  data?: number;
  transferring?: boolean;
  transferProgress?: number;
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
    const colors = ['#3B82F6', '#4F46E5', '#1D4ED8', '#2563EB', '#7C3AED', '#4338CA'];
    const blockLabels = ['Data', 'Hash', 'TX', 'Block', 'Node', 'Key', 'Smart', 'Chain', 'NFT'];

    for (let i = 0; i < blockCount; i++) {
      blocks.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 15 + Math.random() * 25,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.3 + Math.random() * 0.8,
        angle: Math.random() * Math.PI * 2,
        pulse: 0,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        text: Math.random() > 0.6 ? blockLabels[Math.floor(Math.random() * blockLabels.length)] : undefined,
      });
    }

    // Create connections
    const connections: Connection[] = [];
    for (let i = 0; i < blocks.length; i++) {
      const connectionsCount = 1 + Math.floor(Math.random() * 3);
      
      for (let j = 0; j < connectionsCount; j++) {
        const targetId = Math.floor(Math.random() * blocks.length);
        if (targetId !== i) {
          connections.push({
            from: i,
            to: targetId,
            strength: 0.1 + Math.random() * 0.9,
            color: `rgba(59, 130, 246, ${0.1 + Math.random() * 0.2})`,
            data: Math.random() > 0.7 ? Math.floor(Math.random() * 10) : undefined,
            transferring: Math.random() > 0.8,
            transferProgress: 0
          });
        }
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw connections
      for (const connection of connections) {
        const fromBlock = blocks[connection.from];
        const toBlock = blocks[connection.to];
        
        const dx = toBlock.x - fromBlock.x;
        const dy = toBlock.y - fromBlock.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 300) {
          // Draw connection line
          ctx.beginPath();
          ctx.strokeStyle = connection.color;
          ctx.lineWidth = 1 + connection.strength;
          ctx.setLineDash([]);
          ctx.moveTo(fromBlock.x, fromBlock.y);
          ctx.lineTo(toBlock.x, toBlock.y);
          ctx.stroke();
          
          // If transferring data, show animation
          if (connection.transferring) {
            connection.transferProgress = (connection.transferProgress || 0) + 0.01;
            if (connection.transferProgress > 1) connection.transferProgress = 0;
            
            const progressX = fromBlock.x + dx * connection.transferProgress;
            const progressY = fromBlock.y + dy * connection.transferProgress;
            
            ctx.beginPath();
            ctx.fillStyle = '#10B981';
            ctx.arc(progressX, progressY, 3, 0, Math.PI * 2);
            ctx.fill();
          }
          
          // If data is attached to connection, show it
          if (connection.data !== undefined) {
            const midX = (fromBlock.x + toBlock.x) / 2;
            const midY = (fromBlock.y + toBlock.y) / 2;
            
            ctx.beginPath();
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.arc(midX, midY, 8, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#3B82F6';
            ctx.font = '8px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(connection.data.toString(), midX, midY);
          }
        }
      }
      
      // Update and draw blocks
      blocks.forEach(block => {
        // Update position
        block.x += Math.cos(block.angle) * block.speed;
        block.y += Math.sin(block.angle) * block.speed;
        
        // Update pulse
        block.pulse += block.pulseSpeed;
        if (block.pulse > Math.PI * 2) block.pulse = 0;
        
        // Bounce off edges
        if (block.x - block.size/2 <= 0 || block.x + block.size/2 >= canvas.width) {
          block.angle = Math.PI - block.angle;
        }
        if (block.y - block.size/2 <= 0 || block.y + block.size/2 >= canvas.height) {
          block.angle = -block.angle;
        }
        
        // Draw glow effect
        const gradient = ctx.createRadialGradient(
          block.x, block.y, 0,
          block.x, block.y, block.size * 2
        );
        gradient.addColorStop(0, `${block.color}30`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(block.x, block.y, block.size * (1 + 0.2 * Math.sin(block.pulse)), 0, Math.PI * 2);
        ctx.fill();
        
        // Draw block
        ctx.beginPath();
        ctx.fillStyle = block.color;
        
        // Draw different shapes based on block id
        if (block.id % 3 === 0) {
          // Square
          const size = block.size * (1 + 0.05 * Math.sin(block.pulse));
          ctx.fillRect(block.x - size/2, block.y - size/2, size, size);
        } else if (block.id % 3 === 1) {
          // Circle
          ctx.arc(block.x, block.y, block.size/2 * (1 + 0.05 * Math.sin(block.pulse)), 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Hexagon
          const size = block.size/2 * (1 + 0.05 * Math.sin(block.pulse));
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const x = block.x + size * Math.cos(angle);
            const y = block.y + size * Math.sin(angle);
            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.closePath();
          ctx.fill();
        }
        
        // Draw text if available
        if (block.text) {
          ctx.fillStyle = 'white';
          ctx.font = '9px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(block.text, block.x, block.y);
        }
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
      className="absolute inset-0 w-full h-full bg-gray-900"
    />
  );
};

export default BlockchainAnimation;
