let selectedVoice = null;
let voices = [];

// Initialize voices and load saved voice on page load
document.addEventListener("DOMContentLoaded", () => {
  loadVoices();
  loadSavedVoice();
});

// Load voices and populate dropdown
function loadVoices() {
  if (typeof speechSynthesis === "undefined") {
    console.log("Speech synthesis not supported in this browser.");
    return;
  }

  speechSynthesis.onvoiceschanged = () => {
    voices = speechSynthesis.getVoices();
    populateVoiceList();
  };
}

// Populate the dropdown with available voices
function populateVoiceList() {
  const voiceSelect = document.getElementById("voiceSelect");
  voiceSelect.innerHTML = ""; // Clear previous options

  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

// Save the selected voice to localStorage
function saveSelectedVoice() {
  const voiceSelect = document.getElementById("voiceSelect");
  const selectedIndex = voiceSelect.value;
  selectedVoice = voices[selectedIndex];
  localStorage.setItem("selectedVoice", JSON.stringify(selectedVoice));
  alert("Voice selection saved!");
}

// Load the saved voice from localStorage
function loadSavedVoice() {
  const savedVoice = JSON.parse(localStorage.getItem("selectedVoice"));
  if (savedVoice) {
    selectedVoice = voices.find(
      (voice) => voice.name === savedVoice.name && voice.lang === savedVoice.lang
    );
  }
}

// Function to speak text using the selected or saved voice
function speak(text) {
  if ('speechSynthesis' in window) {
    const speech = new SpeechSynthesisUtterance(text);
    
    // Set the voice if available
    if (selectedVoice) {
      speech.voice = selectedVoice;
    } else {
      // Default to the first voice if no voice is selected
      speech.voice = voices[0];
    }

    window.speechSynthesis.cancel(); // Cancel any previous speech
    window.speechSynthesis.speak(speech);
  } else {
    console.log("Speech synthesis not supported in this browser.");
  }
}

// Show the voice selection container
function showVoiceSelection() {
  const voiceSelectionContainer = document.getElementById("voiceSelectionContainer");
  voiceSelectionContainer.style.display = "block";
}
