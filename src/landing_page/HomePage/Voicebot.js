
// const SARVAM_API_KEY = "sk_6m8htz82_gmm7EeQTCmuWQgeL5AixadbR";

//const API_KEY = "sk_6m8htz82_gmm7EeQTCmuWQgeL5AixadbR";



/* SPEAK FUNCTION */

// function speakText(text) {
//   const speech = new SpeechSynthesisUtterance(text);
//   speech.lang = "auto";
//   speechSynthesis.speak(speech);
// }
// function speakText(text, userInput) {

//   const speech = new SpeechSynthesisUtterance(text);

//   // Detect Kannada in user input
//   const isKannada = /[\u0C80-\u0CFF]/.test(userInput);

//   // Choose language based on input
//   speech.lang = isKannada ? "kn-IN" : "en-IN";

//   const voices = window.speechSynthesis.getVoices();

//   const voice = voices.find(v => v.lang === speech.lang);

//   if (voice) {
//     speech.voice = voice;
//   }

//   window.speechSynthesis.speak(speech);
// }

// /* MAIN VOICE BOT */

// export default function startVoiceBot(setMessages) {

//   const SpeechRecognition =
//     window.SpeechRecognition || window.webkitSpeechRecognition;

//   const recognition = new SpeechRecognition();

//   recognition.lang = "en-IN";
//   recognition.continuous = false;
//   recognition.interimResults = false;

//   console.log("🎤 Listening...");

//   recognition.start();

//   recognition.onresult = async (event) => {

//     const question = event.results[0][0].transcript;

//     console.log("User:", question);

//     setMessages(prev => [
//       ...prev,
//       { sender: "user", text: question }
//     ]);

//     try {

//       const response = await fetch(
//         "https://api.sarvam.ai/v1/chat/completions",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${API_KEY}`,
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//             model: "sarvam-m",
//             messages: [{ role: "user", content: question }]
//           })
//         }
//       );

//       const data = await response.json();

//       const reply = data.choices[0].message.content;

//       console.log("AI:", reply);

//       setMessages(prev => [
//         ...prev,
//         { sender: "ai", text: reply }
//       ]);

//       speakText(reply);

//     } catch (error) {

//       console.error(error);

//       setMessages(prev => [
//         ...prev,
//         { sender: "ai", text: "Something went wrong" }
//       ]);
//     }
//   };

//   recognition.onerror = (err) => {
//     console.error("Speech error:", err);
//   };

//   recognition.onend = () => {
//     console.log("🛑 Stopped listening");
//   };
// }

const SARVAM_API_KEY = "sk_6m8htz82_gmm7EeQTCmuWQgeL5AixadbR"; // move this to backend later

/* ================= STT ================= */

async function speechToText(audioBlob) {
  const formData = new FormData();
  formData.append("file", audioBlob);
  formData.append("model", "saarika:v2.5");
  formData.append("with_timestamps", "false");
  formData.append("language_code", "unknown");

  const response = await fetch("https://api.sarvam.ai/speech-to-text", {
    method: "POST",
    headers: {
      "api-subscription-key": SARVAM_API_KEY,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`STT failed: ${response.status} ${errorText}`);
  }

  const data = await response.json();

  return {
    transcript: data.transcript || data.text,
    language_code: data.language_code || "en-IN",
  };
}

/* ================= TTS ================= */

async function textToSpeech(text, language_code) {
  const response = await fetch("https://api.sarvam.ai/text-to-speech", {
    method: "POST",
    headers: {
      "api-subscription-key": SARVAM_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: text,
      target_language_code: language_code || "en-IN",
      speaker: "anushka",
      model: "bulbul:v2",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`TTS failed: ${response.status} ${errorText}`);
  }

  const data = await response.json();

  console.log("TTS API response:", data);

  if (!data.audios || !data.audios.length) {
    throw new Error("No audio returned from TTS");
  }

  const base64Audio = data.audios[0];

  return "data:audio/wav;base64," + base64Audio;
}

/* ================= VOICE BOT ================= */

const startVoiceBot = (setMessages, setIsChatActive) => {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      let audioChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        audioChunks = [];

        try {
          /* ===== STT ===== */

          console.log("Starting STT...");

          const { transcript, language_code } =
            await speechToText(audioBlob);

          console.log("STT successful:", transcript);

          setMessages((prev) => [
            ...prev,
            { sender: "user", text: transcript },
          ]);

          /* ===== CHAT API ===== */

          console.log("Sending to chat API...");

          console.log("Sending to Sarvam AI...");

const aiReply = await askSarvamAI(transcript);

console.log("AI reply:", aiReply);

          console.log("AI reply:", aiReply);

          setMessages((prev) => [
            ...prev,
            { sender: "ai", text: aiReply },
          ]);

          /* ===== TTS ===== */

          console.log("Starting TTS...");

          const audioSrc = await textToSpeech(aiReply, language_code);

          const audio = new Audio(audioSrc);

          audio.play().catch((err) => {
            console.error("Audio playback failed:", err);
          });

          console.log("Audio playing...");
        } catch (err) {
          console.error("Voice bot error:", err);

          const speech = new SpeechSynthesisUtterance(
            "Sorry, something went wrong"
          );

          window.speechSynthesis.speak(speech);
        }
      };

      /* ===== RECORD ===== */

      mediaRecorder.start();

      setTimeout(() => {
        mediaRecorder.stop();
      }, 5000);
    })
    .catch((err) => {
      console.error("Microphone access denied", err);
      alert("Microphone access is required for voice chat");
    });
};

async function askSarvamAI(message) {

  const response = await fetch("https://api.sarvam.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${SARVAM_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "sarvam-m",
      messages: [
        { role: "user", content: message }
      ]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`LLM failed: ${response.status} ${errorText}`);
  }

  const data = await response.json();

  console.log("Sarvam AI response:", data);

  return data.choices[0].message.content;
}

export { startVoiceBot };