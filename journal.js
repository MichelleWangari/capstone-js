document.addEventListener("DOMContentLoaded", () => {
    const journalForm = document.getElementById("journalForm");
    const journalEntry = document.getElementById("journalEntry");
    const entriesContainer = document.getElementById("entriesContainer");
    const searchBar = document.getElementById("searchBar");
  
    let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  
    loadEntries();
  
    journalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const entryText = journalEntry.value.trim();
  
      if (entryText !== "") {
        const timestamp = new Date().toLocaleString();
        const entryData = {
          id: Date.now(),
          text: entryText,
          time: timestamp,
        };
  
        entries.unshift(entryData);
        saveEntries();
        renderEntries(entries);
        journalEntry.value = "";
      }
    });
  
    searchBar.addEventListener("input", () => {
      const searchValue = searchBar.value.toLowerCase();
      const filtered = entries.filter(entry =>
        entry.text.toLowerCase().includes(searchValue)
      );
      renderEntries(filtered);
    });
  
    function saveEntries() {
      localStorage.setItem("journalEntries", JSON.stringify(entries));
    }
  
    function loadEntries() {
      renderEntries(entries);
    }
  
    function renderEntries(entryList) {
      entriesContainer.innerHTML = "";
      entryList.forEach(displayEntry);
    }
  
    function displayEntry(entry) {
      const entryDiv = document.createElement("div");
      entryDiv.className = "entry";
  
      const timeEl = document.createElement("time");
      timeEl.textContent = entry.time;
  
      const textEl = document.createElement("p");
      textEl.textContent = entry.text;
  
      // Edit Button
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className = "mr-2 bg-yellow-400 text-white px-3 py-1 rounded";
      editBtn.style.marginRight = '10px'
      editBtn.onclick = () => editEntry(entry.id);
  
      // Delete Button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "bg-red-500 text-white px-2 py-1 rounded";
      deleteBtn.onclick = () => deleteEntry(entry.id);
  
      const btnGroup = document.createElement("div");
      btnGroup.className = "mt-2";
      btnGroup.appendChild(editBtn);
      btnGroup.appendChild(deleteBtn);
  
      entryDiv.appendChild(timeEl);
      entryDiv.appendChild(textEl);
      entryDiv.appendChild(btnGroup);
      entriesContainer.appendChild(entryDiv);
    }
  
    function deleteEntry(id) {
      entries = entries.filter(entry => entry.id !== id);
      saveEntries();
      renderEntries(entries);
    }
  
    function editEntry(id) {
      const entryToEdit = entries.find(entry => entry.id === id);
      if (entryToEdit) {
        const newText = prompt("Edit your entry:", entryToEdit.text);
        if (newText !== null && newText.trim() !== "") {
          entryToEdit.text = newText.trim();
          entryToEdit.time = new Date().toLocaleString();
          saveEntries();
          renderEntries(entries);
        }
      }
    }
  });
  