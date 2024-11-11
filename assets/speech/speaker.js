function speak(text) {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      
      // Set the language to Indian English
      speech.lang = 'en-IN';
      
      // Attempt to select an Indian female voice if available
      const voices = window.speechSynthesis.getVoices();
      speech.voice = voices.find(voice => voice.lang === 'en-IN' && voice.name.toLowerCase().includes('female')) 
                      || voices.find(voice => voice.lang === 'en-IN') 
                      || voices[0]; // Fallback to the first available voice if none found
  
      window.speechSynthesis.cancel(); // Cancel any previous speech
      window.speechSynthesis.speak(speech);
    } else {
      console.log("Speech synthesis not supported in this browser.");
    }
  }
  