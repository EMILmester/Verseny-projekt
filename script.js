const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const size = 80; // háromszög oldalhossz
let t = 0;

function drawTriangle(x, y, size, up) {
  const h = Math.sqrt(3)/2 * size;
  ctx.beginPath();
  if (up) {
    ctx.moveTo(x, y + h);
    ctx.lineTo(x + size/2, y);
    ctx.lineTo(x + size, y + h);
  } else {
    ctx.moveTo(x, y);
    ctx.lineTo(x + size/2, y + h);
    ctx.lineTo(x + size, y);
  }
  ctx.closePath();

  // Fényhatás
  const glow = (Math.sin((x + y + t * 5) * 0.02) + 1)/2; // gyorsabb fény
  const brightness = 60 + glow*40; // 60-100% fényesség
  ctx.strokeStyle = `hsl(0, 0%, ${brightness}%)`; // fehér-szürke
  ctx.lineWidth = 1.2;
  ctx.shadowColor = `hsl(0, 0%, ${brightness}%)`;
  ctx.shadowBlur = 8;
  ctx.stroke();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Ezüst háttér
  ctx.fillStyle = "#c0c0c0";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const h = Math.sqrt(3)/2 * size;

  for (let y = 0; y < canvas.height + h; y += h) {
    for (let x = 0; x < canvas.width + size/2; x += size/2) {
      const isUp = ((y/h + x/(size/2)) % 2) === 0;
      drawTriangle(x, y, size, isUp);
    }
  }

  t += 1.5;
  requestAnimationFrame(draw);
}

draw();