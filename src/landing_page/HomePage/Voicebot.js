const speak = (text) => {
  const speech = new SpeechSynthesisUtterance(text);

  // Auto detect language from text
  if (/[\u0C80-\u0CFF]/.test(text)) speech.lang = "kn-IN"; // Kannada
  else if (/[\u0B80-\u0BFF]/.test(text)) speech.lang = "ta-IN"; // Tamil
  else if (/[\u0C00-\u0C7F]/.test(text)) speech.lang = "te-IN"; // Telugu
  else if (/[\u0D00-\u0D7F]/.test(text)) speech.lang = "ml-IN"; // Malayalam
  else speech.lang = "en-US"; // English

  window.speechSynthesis.speak(speech);
};

const startVoiceBot = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech Recognition not supported in this browser");
    return;
  }

  const recognition = new SpeechRecognition();

  // Browser listens in English but understands Indian accents
  recognition.lang = "en-IN";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.start();

  speak("Hello! I can help you with finance and government schemes.");

  recognition.onresult = async (event) => {
    const userSpeech = event.results[0][0].transcript;
    console.log("User:", userSpeech);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userSpeech
        }),
      });

      const data = await res.json();

      console.log("AI:", data.reply);

      speak(data.reply);

    } catch (err) {
      console.error(err);
      speak("Sorry something went wrong");
    }
  };
};

export default startVoiceBot;