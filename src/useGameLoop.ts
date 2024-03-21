// useGameLoop.ts
import { useEffect } from 'react';
import { Ball } from './Ball';

export const useGameLoop = (ctx: CanvasRenderingContext2D, balls: Ball[], setBalls: React.Dispatch<React.SetStateAction<Ball[]>>) => {
    useEffect(() => {
        const render = () => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            balls.forEach(ball => {
                ball.update(ctx.canvas.width, ctx.canvas.height);
                balls.forEach(otherBall => {
                    if (ball !== otherBall && Math.sqrt((ball.x - otherBall.x) ** 2 + (ball.y - otherBall.y) ** 2) <= ball.radius + otherBall.radius) {
                        ball.vx *= -1;
                        ball.vy *= -1;
                        otherBall.vx *= -1;
                        otherBall.vy *= -1;
                    }
                });
                ball.draw(ctx);
            });
            requestAnimationFrame(render);
        };
        render();
    }, [ctx, balls]);
};
