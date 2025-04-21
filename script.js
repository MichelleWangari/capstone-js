//CAROUSEL FUNCTIONALITY 
let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-img');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

// Function to show the current slide
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });
}

// Next and previous button listeners
nextBtn.addEventListener('click', () => {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
});

prevBtn.addEventListener('click', () => {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
});

// Auto-slide every 5 seconds
setInterval(() => {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}, 5000);

// Initial display
showSlide(slideIndex);


// === SEARCH BAR FUNCTIONALITY ===
const searchBar = document.getElementById('searchBar');

searchBar.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const query = searchBar.value.toLowerCase();

    if (query.includes('goal')) {
      window.location.href = 'goals.html';
    } else if (query.includes('journal')) {
      window.location.href = 'journal.html';
    } else if (query.includes('calendar') || query.includes('planner')) {
      window.location.href = 'calendar.html';
    } else if (query.includes('budget') || query.includes('money')) {
      window.location.href = 'budget.html';
    } else if (query.includes('mood') || query.includes('track')) {
      window.location.href = 'mood.html';
    } else {
      alert('No matching section found.');
    }
  }
});
