
import React, { useRef, useEffect, useState } from 'react';
import { Ball } from './Ball';
import ColorPickerModal from './ColorPickerModal';

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [balls, setBalls] = useState<Ball[]>([
    new Ball(100, 100, 70, 2, 3, 'blue'),
    new Ball(300, 300, 50, 2, 3, 'green'),
  ]);
  const [selectedBall, setSelectedBall] = useState<Ball | null>(null);
  const [mouseDownPosition, setMouseDownPosition] = useState<{ x: number, y: number } | null>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setMouseDownPosition({ x, y });
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!mouseDownPosition) return;

    const rect = canvasRef.current!.getBoundingClientRect();
    const mouseUpX = event.clientX - rect.left;
    const mouseUpY = event.clientY - rect.top;

    const forceX = mouseUpX - mouseDownPosition.x;
    const forceY = mouseUpY - mouseDownPosition.y;

    balls.forEach(ball => {
      if (ball.isClicked(mouseDownPosition.x, mouseDownPosition.y)) {
        ball.applyForce(forceX * 0.1, forceY * 0.1);
      }
    });

    setMouseDownPosition(null);
  };

  useEffect(() => {
    const ctx = canvasRef.current!.getContext('2d')!;
    let animationFrameId: number;

    const checkAndHandleCollisions = () => {
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const ball1 = balls[i];
          const ball2 = balls[j];
          const dx = ball2.x - ball1.x;
          const dy = ball2.y - ball1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < ball1.radius + ball2.radius) {
            ball1.handleCollision(ball2);
          }
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      checkAndHandleCollisions();
      balls.forEach(ball => {
        ball.update(ctx.canvas.width, ctx.canvas.height);
        ball.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [balls]);

  const handleCanvasClick = (event: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const clickedBall = balls.find(ball => ball.isClicked(mouseX, mouseY));
    if (clickedBall) {
      setSelectedBall(clickedBall);
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} width={800} height={600} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onClick={handleCanvasClick} />

      {selectedBall && (
        <ColorPickerModal
          ball={selectedBall}
          onClose={() => setSelectedBall(null)}
        />
      )}
    </div>
  );
};

export default App;
