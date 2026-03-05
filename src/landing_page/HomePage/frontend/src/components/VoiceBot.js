import React, { useState, useEffect } from "react";

const VoiceBot = () => {

  const [messages, setMessages] = useState([]);
  const [language, setLanguage] = useState("en-IN");
  const [voices, setVoices] = useState([]);

   useEffect(() => {
  const synth = window.speechSynthesis;

  const loadVoices = () => {
    const available = synth.getVoices();
    console.log("Voices loaded:", available);
    setVoices(available);
  };

  loadVoices();

  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = loadVoices;
  }
}, []);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.continuous = true; // keep listening after results
  recognition.interimResults = false;

  const startListening = () => {

    recognition.lang = language;
    recognition.start();

  };

  recognition.onresult = async (event) => {
    // after processing a result we can continue listening automatically

    const userSpeech = event.results[0][0].transcript;

    console.log("Detected speech:", userSpeech);
    console.log("Selected language:", language);

    setMessages((prev) => [
      ...prev,
      { sender: "User", text: userSpeech }
    ]);

    const res = await fetch("http://localhost:5000/api/ask", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        message: userSpeech,
        language: language
      }),

    });

    if (!res.ok) {
      console.error("Server returned", res.status);
      return;
    }

    const data = await res.json();

    console.log("AI reply:", data.reply);

    if (data.reply) {
      setMessages((prev) => [
        ...prev,
        { sender: "Bot", text: data.reply }
      ]);
      speak(data.reply);
    } else {
      console.warn("Empty reply received");
    }
  };

  recognition.onend = () => {
    // restart recognition when it naturally stops (e.g. silence timeout)
    console.log('Speech recognition ended, restarting');
    recognition.start();
  };

  const speak = (text) => {
  const synth = window.speechSynthesis;

  if (!synth) {
    console.log("Speech Synthesis not supported");
    return;
  }

  synth.cancel(); // stop previous speech

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language;

  // try using cached voices first
  let availableVoices = voices;
  if (!availableVoices || availableVoices.length === 0) {
    availableVoices = synth.getVoices();
  }

  console.log("Available voices:", availableVoices);

  const selectedVoice = availableVoices.find(
    (voice) => voice.lang === language
  );

  if (selectedVoice) {
    utterance.voice = selectedVoice;
    console.log("Selected voice:", selectedVoice.name);
  } else {
    console.log("No matching voice found for:", language);
  }

  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;

  synth.speak(utterance);
};

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>

      <h2>Multilingual Voice Chatbot</h2>

      {/* Language selector */}

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="en-IN">English</option>
        <option value="kn-IN">Kannada</option>
        <option value="ta-IN">Tamil</option>
        <option value="te-IN">Telugu</option>
        <option value="ml-IN">Malayalam</option>
      </select>

      <br /><br />

      <button onClick={startListening}>
        🎤 Ask Question
      </button>

      <div style={{ marginTop: "30px" }}>

        {messages.map((msg, index) => (
          <p key={index}>
            <b>{msg.sender}:</b> {msg.text}
          </p>
        ))}

      </div>

    </div>
  );
};

export default VoiceBot;