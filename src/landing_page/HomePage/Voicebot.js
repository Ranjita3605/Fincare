const speak = (text) => {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
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
  recognition.lang = "en-US";
  recognition.start();

  // Greeting message
  speak("Hello! How can I help you with finance or government schemes?");

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
          message: userSpeech,
          language: "English",
        }),
      });

      const data = await res.json();
      console.log("AI:", data.reply);

      speak(data.reply);
    } catch (err) {
      console.error(err);
      speak("Sorry, something went wrong.");
    }
  };
};

export default startVoiceBot;