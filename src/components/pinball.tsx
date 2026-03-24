import { useEffect, useRef, useState } from 'react';

export default function PinballAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ballLocked, setBallLocked] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Pinball object
    const ball = {
      x: canvas.width / 2,
      y: canvas.height * 0.1,
      radius: 8,
      vx: 0,
      vy: 0,
      locked: false,
    };

    // Flipper objects - joint is highest point, flippers point inward at rest
    const flippers = {
      left: {
        x: canvas.width * 0.25,
        y: canvas.height * 0.75,
        length: 80,
        angle: 0.8, // hangs down-right (inward) at rest
        restAngle: 0.8,
        activeAngle: -0.8, // springs up-right when active
        active: false,
      },
      right: {
        x: canvas.width * 0.75,
        y: canvas.height * 0.75,
        length: 80,
        angle: Math.PI - 0.8, // hangs down-left (inward) at rest
        restAngle: Math.PI - 0.8,
        activeAngle: Math.PI + 0.8, // springs up-left when active
        active: false,
      },
    };

    const gravity = 0.15; // Much slower, rolling motion
    const friction = 0.98;
    const bounce = 0.7;
    const rollResistance = 0.02; // Simulate rolling resistance on incline

    // Launch position (center top)
    const launchX = canvas.width / 2;
    const launchY = canvas.height * 0.1;

    // Draw flipper
    const drawFlipper = (flipper: typeof flippers.left) => {
      const endX = flipper.x + Math.cos(flipper.angle) * flipper.length;
      const endY = flipper.y + Math.sin(flipper.angle) * flipper.length;

      // Calculate perpendicular direction for teardrop width
      const perpAngle = flipper.angle + Math.PI / 2;
      const baseWidth = 22; // wider at joint
      const tipWidth = 15; // narrower at tip

      // Create teardrop shape
      ctx.fillStyle = '#d1d5db'; // soft gray
      ctx.beginPath();

      // Left side of flipper
      ctx.moveTo(
        flipper.x + Math.cos(perpAngle) * (baseWidth / 2),
        flipper.y + Math.sin(perpAngle) * (baseWidth / 2)
      );

      // Curve to left at tip
      const midX = (flipper.x + endX) / 2;
      const midY = (flipper.y + endY) / 2;
      ctx.quadraticCurveTo(
        midX + Math.cos(perpAngle) * (tipWidth / 2),
        midY + Math.sin(perpAngle) * (tipWidth / 2),
        endX,
        endY
      );

      // Right side of flipper
      ctx.quadraticCurveTo(
        midX + Math.cos(perpAngle) * -(tipWidth / 2),
        midY + Math.sin(perpAngle) * -(tipWidth / 2),
        flipper.x + Math.cos(perpAngle) * -(baseWidth / 2),
        flipper.y + Math.sin(perpAngle) * -(baseWidth / 2)
      );

      // Close the shape
      ctx.closePath();
      ctx.fill();

      // Flipper base circle (joint)
      ctx.fillStyle = '#d1d5db';
      ctx.beginPath();
      ctx.arc(flipper.x, flipper.y, 10, 0, Math.PI * 2);
      ctx.fill();
    };

    // Check if ball hits flipper
    const checkFlipperCollision = (flipper: typeof flippers.left) => {
      const endX = flipper.x + Math.cos(flipper.angle) * flipper.length;
      const endY = flipper.y + Math.sin(flipper.angle) * flipper.length;

      const dx = endX - flipper.x;
      const dy = endY - flipper.y;
      const ballDx = ball.x - flipper.x;
      const ballDy = ball.y - flipper.y;

      const len = Math.sqrt(dx * dx + dy * dy);
      const t = Math.max(0, Math.min(1, (ballDx * dx + ballDy * dy) / (len * len)));

      const closestX = flipper.x + t * dx;
      const closestY = flipper.y + t * dy;

      const distX = ball.x - closestX;
      const distY = ball.y - closestY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < ball.radius + 5) {
        const angle = Math.atan2(distY, distX);
        const power = flipper.active ? 20 : 8;
        ball.vx = Math.cos(angle) * power;
        ball.vy = Math.sin(angle) * power;
        ball.x = closestX + Math.cos(angle) * (ball.radius + 5);
        ball.y = closestY + Math.sin(angle) * (ball.radius + 5);
      }
    };

    // Animation loop
    const animate = () => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (!ball.locked) {
        // Apply gravity (rolling down incline)
        ball.vy += gravity;
        
        // Apply friction and rolling resistance
        ball.vx *= friction;
        ball.vy *= (friction - rollResistance);

        // Update position
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Bounce off walls
        if (ball.x - ball.radius < 0) {
          ball.x = ball.radius;
          ball.vx *= -bounce;
        }
        if (ball.x + ball.radius > canvas.width) {
          ball.x = canvas.width - ball.radius;
          ball.vx *= -bounce;
        }
        if (ball.y - ball.radius < 0) {
          ball.y = ball.radius;
          ball.vy *= -bounce;
        }

        // Check if ball falls below flippers (game over)
        if (ball.y - ball.radius > canvas.height) {
          ball.locked = true;
          ball.x = launchX;
          ball.y = launchY;
          
          // Random angled roll ±15 degrees from center
          const centerAngle = Math.PI / 2; // straight down
          const angleRange = 15 * Math.PI / 180; // 15 degrees in radians
          const randomAngle = centerAngle + (Math.random() - 0.5) * angleRange * 2;
          const speed = 8;
          
          ball.vx = Math.cos(randomAngle) * speed;
          ball.vy = Math.sin(randomAngle) * speed;
          setBallLocked(true);
        }

        // Check flipper collisions
        checkFlipperCollision(flippers.left);
        checkFlipperCollision(flippers.right);
      }

      // Control flippers based on held keys
      if (keysPressed['z'] || keysPressed['Z']) {
        flippers.left.active = true;
        flippers.left.angle += (flippers.left.activeAngle - flippers.left.angle) * 0.15;
      } else {
        flippers.left.active = false;
        flippers.left.angle += (flippers.left.restAngle - flippers.left.angle) * 0.15;
      }

      if (keysPressed['/'] || keysPressed['?']) {
        flippers.right.active = true;
        flippers.right.angle += (flippers.right.activeAngle - flippers.right.angle) * 0.15;
      } else {
        flippers.right.active = false;
        flippers.right.angle += (flippers.right.restAngle - flippers.right.angle) * 0.15;
      }

      // Draw flippers
      drawFlipper(flippers.left);
      drawFlipper(flippers.right);

      // Draw pinball (metallic effect)
      const gradient = ctx.createRadialGradient(
        ball.x - 3, ball.y - 3, 0,
        ball.x, ball.y, ball.radius
      );
      gradient.addColorStop(0, '#fbbf24');
      gradient.addColorStop(1, '#d97706');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();

      // Draw highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.beginPath();
      ctx.arc(ball.x - 3, ball.y - 3, ball.radius / 2, 0, Math.PI * 2);
      ctx.fill();

      // Draw launch position (ball holder)
      if (ball.locked) {
        ctx.strokeStyle = '#dc2626';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, 15, 0, Math.PI * 2);
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    };

    // Track which keys are currently held down
    const keysPressed: { [key: string]: boolean } = {};

    // Keyboard controls for flippers
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed[e.key] = true;
      if ((e.key === ' ' || e.key === 'Enter') && ball.locked) {
        ball.locked = false;
        ball.vy = -5;
        setBallLocked(false);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    animate();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-sm">
        <div className="h-[600px] rounded-lg overflow-hidden shadow-2xl mb-4">
          <canvas
            ref={canvasRef}
            className="w-full h-full bg-slate-900"
          />
        </div>
        <div className="flex flex-col gap-4 px-4">
          <div className="text-sm text-gray-600 space-y-1">
            <p><span className="font-bold">Z</span> - Left Flipper</p>
            <p><span className="font-bold">/</span> - Right Flipper</p>
          </div>
          {ballLocked && (
            <button
              onClick={() => {
                const canvas = canvasRef.current;
                if (canvas) {
                  const event = new KeyboardEvent('keydown', {
                    key: ' ',
                    code: 'Space',
                  });
                  window.dispatchEvent(event);
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors w-full"
            >
              LAUNCH BALL
            </button>
          )}
        </div>
      </div>
    </div>
  );
}