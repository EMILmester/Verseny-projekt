// Canvas háttér (háromszögek)
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

//Ez a része adja az egésznek a háromszögek közötti fényhatást.
  
  const glow = (Math.sin((x + y + t * 5) * 0.02) + 1) / 2;
  const brightness = 60 + glow * 40;
  ctx.strokeStyle = `hsl(0, 0%, ${brightness}%)`;
  ctx.lineWidth = 1.2;
  ctx.shadowColor = `hsl(0, 0%, ${brightness}%)`;
  ctx.shadowBlur = 8;
  ctx.stroke();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#c0c0c0"; // eredeti világos háttérszín
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

  // Itt állíthatjuk be a világításnak a sebességét az érték vátoztatásával.
  t += 1.5;
  requestAnimationFrame(draw);
}

draw();


// Carousel logika
const items = document.querySelectorAll('.carousel-item');
const total = items.length;
let currentIndex = 0;

function updateCarousel() {
  items.forEach((item, i) => {
    let diff = (i - currentIndex + total) % total;

    if (diff === 0) {
      item.style.transform = `translateX(-50%) scale(1)`;
      item.style.opacity = 1;
      item.style.zIndex = 5;
    } else if (diff === 1) {
      item.style.transform = `translateX(60%) scale(0.6)`;
      item.style.opacity = 0.6;
      item.style.zIndex = 4;
    } else if (diff === total - 1) {
      item.style.transform = `translateX(-160%) scale(0.6)`;
      item.style.opacity = 0.6;
      item.style.zIndex = 4;
    } else {
      item.style.transform = `translateX(-50%) scale(0.4)`;
      item.style.opacity = 0;
      item.style.zIndex = 1;
    }
  });
}

document.getElementById('prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + total) % total;
  updateCarousel();
});

document.getElementById('next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % total;
  updateCarousel();
});

// Automatikus váltás
setInterval(() => {
  currentIndex = (currentIndex + 1) % total;
  updateCarousel();
}, 4000);

updateCarousel(); // inicializálás

