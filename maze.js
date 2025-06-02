
const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const message = document.getElementById('message');
const endingScreen = document.getElementById('ending-screen');
let level = 0;

const levels = [
  { wall: 60, speed: 1 },
  { wall: 80, speed: 1.5 },
  { wall: 100, speed: 2 }
];

let ball = { x: 20, y: 20, radius: 10 };
let goal = { x: 260, y: 260, size: 30 };

function drawMaze() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Maze border
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 5;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // Ball
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.fill();

  // Goal
  ctx.fillStyle = 'lightgreen';
  ctx.fillRect(goal.x, goal.y, goal.size, goal.size);
}

function checkGoal() {
  if (
    ball.x > goal.x &&
    ball.x < goal.x + goal.size &&
    ball.y > goal.y &&
    ball.y < goal.y + goal.size
  ) {
    level++;
    if (level < levels.length) {
      message.textContent = `Level ${level + 1}`;
      ball = { x: 20, y: 20, radius: 10 };
    } else {
      canvas.style.display = 'none';
      message.style.display = 'none';
      endingScreen.style.display = 'block';
      window.removeEventListener('deviceorientation', handleOrientation);
    }
  }
}

function handleOrientation(event) {
  const { beta, gamma } = event;
  const speed = levels[level].speed;
  ball.y += beta * 0.05 * speed;
  ball.x += gamma * 0.05 * speed;

  // Collision with walls
  if (
    ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width ||
    ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height
  ) {
    ball = { x: 20, y: 20, radius: 10 };
    message.textContent = 'Oops! Try again.';
  }

  drawMaze();
  checkGoal();
}

message.textContent = 'Tilt your phone to guide the heart!';
drawMaze();
window.addEventListener('deviceorientation', handleOrientation);
