document.addEventListener('DOMContentLoaded', () => {
  // === CAROUSEL FUNCTIONALITY ===
  let slideIndex = 0;
  const slides = document.querySelectorAll('.carousel-img');
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');

  function showSlide(index) {
    if (slides.length === 0) return;
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
      }
    });
  }

  if (nextBtn && prevBtn && slides.length > 0) {
    nextBtn.addEventListener('click', () => {
      slideIndex = (slideIndex + 1) % slides.length;
      showSlide(slideIndex);
    });

    prevBtn.addEventListener('click', () => {
      slideIndex = (slideIndex - 1 + slides.length) % slides.length;
      showSlide(slideIndex);
    });

    setInterval(() => {
      slideIndex = (slideIndex + 1) % slides.length;
      showSlide(slideIndex);
    }, 2000);

    showSlide(slideIndex);
  }

  // === SEARCH BAR FUNCTIONALITY ===
  const searchBar = document.getElementById('searchBar');

  if (searchBar) {
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
        } else if (query.includes('home') || query.includes('dashboard')) {
          window.location.href = 'index.html';
        } else {
          alert('No matching section found.');
        }
      }
    });
  }
});

//Goals script
const goalFilterInput = document.getElementById("goalFilter");

  // Each goal card
  const goalCards = document.querySelectorAll(".goal-card");

  goalFilterInput.addEventListener("input", function () {
    const searchTerm = goalFilterInput.value.toLowerCase();

    goalCards.forEach((card) => {
      const heading = card.querySelector("h3").textContent.toLowerCase();
      const items = Array.from(card.querySelectorAll("li")).map(li => li.textContent.toLowerCase());

      // Check if search term matches the heading or any item
      const matchesHeading = heading.includes(searchTerm);
      const matchesItem = items.some(item => item.includes(searchTerm));

      if (matchesHeading || matchesItem) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const journalForm = document.getElementById("journalForm");
    const journalEntry = document.getElementById("journalEntry");
    const entriesContainer = document.getElementById("entriesContainer");
  
    // Load saved entries from localStorage
    loadEntries();
  
    journalForm.addEventListener("submit", function (e) {
      e.preventDefault(); // prevent form from reloading the page
  
      const entryText = journalEntry.value.trim();
  
      if (entryText !== "") {
        const timestamp = new Date().toLocaleString(); // add time of entry
        const entryData = {
          text: entryText,
          time: timestamp,
        };
  
        // Save to localStorage
        saveEntry(entryData);
        displayEntry(entryData);
  
        journalEntry.value = ""; // clear textarea
      }
    });
  
    function saveEntry(entry) {
      let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
      entries.unshift(entry); // add to top of list
      localStorage.setItem("journalEntries", JSON.stringify(entries));
    }
  
    function loadEntries() {
      let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
      entries.forEach(displayEntry);
    }
  
    function displayEntry(entry) {
      const entryDiv = document.createElement("div");
      entryDiv.className = "p-4 mb-4 bg-white rounded shadow";
  
      const timeEl = document.createElement("p");
      timeEl.className = "text-sm text-gray-500 mb-2";
      timeEl.textContent = entry.time;
  
      const textEl = document.createElement("p");
      textEl.textContent = entry.text;
  
      entryDiv.appendChild(timeEl);
      entryDiv.appendChild(textEl);
      entriesContainer.appendChild(entryDiv);
    }
  });
  