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

// --- Hang lejátszás a gombokhoz dinamikusan ---
document.querySelectorAll('.square-btn').forEach(btn => {
  const soundFile = btn.getAttribute('data-sound');
  if (soundFile) {
    const sound = new Audio(soundFile);
    btn.addEventListener('click', () => {
      sound.currentTime = 0;
      sound.play();
    });
  }
});
