// Ball.ts
export class Ball {
    constructor(
        public x: number,
        public y: number,
        public radius: number,
        public vx: number,
        public vy: number,
        public color: string
    ) { }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update(canvasWidth: number, canvasHeight: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x + this.radius > canvasWidth || this.x - this.radius < 0) {
            this.vx *= -0.9;
            if (this.x + this.radius > canvasWidth) {
                this.x = canvasWidth - this.radius;
            } else {
                this.x = this.radius;
            }
        }
        if (this.y + this.radius > canvasHeight || this.y - this.radius < 0) {
            this.vy *= -0.9;
            if (this.y + this.radius > canvasHeight) {
                this.y = canvasHeight - this.radius;
            } else {
                this.y = this.radius;
            }
        }
    }

    isClicked(mouseX: number, mouseY: number): boolean {
        const distance = Math.sqrt((mouseX - this.x) ** 2 + (mouseY - this.y) ** 2);
        return distance < this.radius;
    }

    applyForce(forceX: number, forceY: number) {
        this.vx += forceX;
        this.vy += forceY;
    }

    handleCollision(otherBall: Ball) {
        const dx = otherBall.x - this.x;
        const dy = otherBall.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const nx = dx / distance;
        const ny = dy / distance;

        const p1 = this.vx * nx + this.vy * ny;
        const p2 = otherBall.vx * nx + otherBall.vy * ny;

        const newVx1 = p2;
        const newVy1 = p2;
        const newVx2 = p1;
        const newVy2 = p1;

        const damping = 0.9;
        this.vx = damping * (newVx1 * nx - this.vx * ny);
        this.vy = damping * (newVy1 * ny - this.vy * nx);
        otherBall.vx = damping * (newVx2 * nx - otherBall.vx * ny);
        otherBall.vy = damping * (newVy2 * ny - otherBall.vy * nx);
    }
}
