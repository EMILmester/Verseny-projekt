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