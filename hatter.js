// --- Háromszöges háttér ---
const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const size = 80;
let t = 0;

function drawTriangle(x, y, size, up) {
  const h = Math.sqrt(3) / 2 * size;
  ctx.beginPath();
  if (up) {
    ctx.moveTo(x, y + h);
    ctx.lineTo(x + size / 2, y);
    ctx.lineTo(x + size, y + h);
  } else {
    ctx.moveTo(x, y);
    ctx.lineTo(x + size / 2, y + h);
    ctx.lineTo(x + size, y);
  }
  ctx.closePath();

  const glow = (Math.sin((x + y + t * 5) * 0.02) + 1) / 2;
  const brightness = 35 + glow * 40;
  ctx.strokeStyle = `hsl(0, 0%, ${brightness}%)`;
  ctx.lineWidth = 1.2;
  ctx.shadowColor = ctx.strokeStyle;
  ctx.shadowBlur = 8;
  ctx.stroke();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const h = Math.sqrt(3) / 2 * size;
  const cols = Math.ceil(canvas.width / (size / 2)) + 2;
  const rows = Math.ceil(canvas.height / h) + 2;
  const offsetX = (canvas.width - cols * (size / 2)) / 2 - size / 2;
  const offsetY = (canvas.height - rows * h) / 2 - h / 2;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = offsetX + col * (size / 2);
      const y = offsetY + row * h;
      const isUp = (row + col) % 2 === 0;
      drawTriangle(x, y, size, isUp);
    }
  }

  t += 2.5;
  requestAnimationFrame(draw);
}
draw();

// --- Carousel logika ---
const items = document.querySelectorAll('.carousel-item');
let currentIndex = 0;
const total = items.length;

function showSlide(index) {
  items.forEach((item, i) => {
    item.classList.remove('active');
    if (i === index) item.classList.add('active');
  });
}

document.getElementById('prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + total) % total;
  showSlide(currentIndex);
});

document.getElementById('next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % total;
  showSlide(currentIndex);
});


showSlide(currentIndex); // inicializálás

