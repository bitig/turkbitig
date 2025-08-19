import { vocabulary } from './vocabulary.js';
import { dialogues } from './dialogues.js';

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  const vocabSection = document.getElementById("vocab-section");
  const dialogueSection = document.getElementById("dialogue-section");
  const vocabTab = document.getElementById("vocab-tab");
  const dialogueTab = document.getElementById("dialogue-tab");
  const categoryFilter = document.getElementById("category-filter");
  const vocabList = document.getElementById("vocab-list");
  const dialogueList = document.getElementById("dialogue-list");

  // Populate category filter
  const categories = ["All", ...new Set(vocabulary.map(word => word.cat))];
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  // Render vocabulary
  function renderVocabulary(cat = "All") {
    vocabList.innerHTML = "";
    const filteredWords = cat === "All" ? vocabulary : vocabulary.filter(word => word.cat === cat);
    filteredWords.forEach(word => {
      const card = document.createElement("div");
      card.className = "card";

      const tur = document.createElement("p");
      const turkishStrong = document.createElement("strong");
      turkishStrong.textContent = "Türkçe: ";
      tur.appendChild(turkishStrong);
      tur.appendChild(document.createTextNode(word.tur));

      const kaz = document.createElement("p");
      const kazakhStrong = document.createElement("strong");
      kazakhStrong.textContent = "Kazakça (Kril): ";
      kaz.appendChild(kazakhStrong);
      kaz.appendChild(document.createTextNode(word.kaz));

      const lat = document.createElement("p");
      const kazakhLatinStrong = document.createElement("strong");
      kazakhLatinStrong.textContent = "Kazakça (Latin): ";
      lat.appendChild(kazakhLatinStrong);
      lat.appendChild(document.createTextNode(word.lat));

      const eng = document.createElement("p");
      const engStrong = document.createElement("strong");
      engStrong.textContent = "English: ";
      eng.appendChild(engStrong);
      eng.appendChild(document.createTextNode(word.eng));

      card.appendChild(tur);
      card.appendChild(lat);
      card.appendChild(kaz);
      card.appendChild(eng);
      vocabList.appendChild(card);
    });
  }

  // Render dialogues
  function renderDialogues() {
    dialogueList.innerHTML = "";
    dialogues.forEach(dialogue => {
      const dialogueDiv = document.createElement("div");
      dialogueDiv.className = "dialogue";

      const title = document.createElement("h3");
      title.textContent = dialogue.title;

      const toggleButton = document.createElement("button");
      toggleButton.textContent = "Göster";
      toggleButton.onclick = () => toggleDialogue(dialogue.id);

      const linesDiv = document.createElement("div");
      linesDiv.id = `dialogue-${dialogue.id}`;
      linesDiv.style.display = "none";

      dialogue.lines.forEach(line => {
        const lineDiv = document.createElement("div");
        lineDiv.className = "line";

        const speaker = document.createElement("p");
        const speakerStrong = document.createElement("strong");
        speakerStrong.textContent = `${line.speaker}: `;
        speaker.appendChild(speakerStrong);
        speaker.appendChild(document.createTextNode(line.tur));

        const kaz = document.createElement("p");
        const kazakhStrong = document.createElement("strong");
        kazakhStrong.textContent = "Kazakça (Kril): ";
        kaz.appendChild(kazakhStrong);
        kaz.appendChild(document.createTextNode(line.kaz));

        const lat = document.createElement("p");
        const kazakhLatinStrong = document.createElement("strong");
        kazakhLatinStrong.textContent = "Kazakça (Latin): ";
        lat.appendChild(kazakhLatinStrong);
        lat.appendChild(document.createTextNode(line.lat));

        const eng = document.createElement("p");
        const engStrong = document.createElement("strong");
        engStrong.textContent = "English: ";
        eng.appendChild(engStrong);
        eng.appendChild(document.createTextNode(line.eng));

        const audioButton = document.createElement("button");
        lineDiv.appendChild(speaker);
        lineDiv.appendChild(lat);
        lineDiv.appendChild(kaz);
        lineDiv.appendChild(eng);
        linesDiv.appendChild(lineDiv);
      });

      dialogueDiv.appendChild(title);
      dialogueDiv.appendChild(toggleButton);
      dialogueDiv.appendChild(linesDiv);
      dialogueList.appendChild(dialogueDiv);
    });
  }

  // Toggle dialogue visibility
  window.toggleDialogue = function(id) {
    const dialogueDiv = document.getElementById(`dialogue-${id}`);
    const button = dialogueDiv.parentElement.querySelector("button");
    dialogueDiv.style.display = dialogueDiv.style.display === "none" ? "block" : "none";
    button.textContent = dialogueDiv.style.display === "none" ? "Göster" : "Gizle";
  };

  // Tab switching
  vocabTab.addEventListener("click", () => {
    vocabSection.style.display = "block";
    dialogueSection.style.display = "none";
    vocabTab.classList.add("active");
    dialogueTab.classList.remove("active");
  });

  dialogueTab.addEventListener("click", () => {
    vocabSection.style.display = "none";
    dialogueSection.style.display = "block";
    vocabTab.classList.remove("active");
    dialogueTab.classList.add("active");
  });

  // Category filter change
  categoryFilter.addEventListener("change", (e) => {
    renderVocabulary(e.target.value);
  });

  // Initial render
  renderVocabulary();
  renderDialogues();
});

  // eng=english, tur=turkish, kaz=kaz-kiril, lat=kaz-latin, cat=category
