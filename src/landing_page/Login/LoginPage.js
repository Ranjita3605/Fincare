import React, { useState, useEffect, useRef } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("en-US");
  const [langKey, setLangKey] = useState("en");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const recognitionRef = useRef(null);

  /* ================= CHECK LOGIN STATUS ON LOAD ================= */

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const translations = {
    en: {
      login: "Login",
      username: "Username",
      password: "Password",
      submit: "Submit",
      selectLang:
        "Please say your preferred language. English, Tamil, Telugu, Kannada or Malayalam.",
      askUsername: "Please say your username",
      askPassword: "Please say your password",
      confirm: "You entered username as",
    },
    kn: {
      login: "ಲಾಗಿನ್",
      username: "ಬಳಕೆದಾರ ಹೆಸರು",
      password: "ಪಾಸ್ವರ್ಡ್",
      submit: "ಸಲ್ಲಿಸು",
      askUsername: "ನಿಮ್ಮ ಬಳಕೆದಾರ ಹೆಸರನ್ನು ಹೇಳಿ",
      askPassword: "ನಿಮ್ಮ ಪಾಸ್ವರ್ಡ್ ಹೇಳಿ",
      confirm: "ನೀವು ನೀಡಿದ ಬಳಕೆದಾರ ಹೆಸರು",
    },
    te: {
      login: "లాగిన్",
      username: "వినియోగదారు పేరు",
      password: "పాస్‌వర్డ్",
      submit: "సమర్పించండి",
      askUsername: "మీ వినియోగదారు పేరును చెప్పండి",
      askPassword: "మీ పాస్‌వర్డ్ చెప్పండి",
      confirm: "మీరు ఇచ్చిన వినియోగదారు పేరు",
    },
    ta: {
      login: "உள்நுழைவு",
      username: "பயனர் பெயர்",
      password: "கடவுச்சொல்",
      submit: "சமர்ப்பிக்கவும்",
      askUsername: "உங்கள் பயனர் பெயரை சொல்லவும்",
      askPassword: "உங்கள் கடவுச்சொல்லை சொல்லவும்",
      confirm: "நீங்கள் உள்ளிட்ட பயனர் பெயர்",
    },
    ml: {
      login: "ലോഗിൻ",
      username: "ഉപയോക്തൃ നാമം",
      password: "പാസ്‌വേഡ്",
      submit: "സമർപ്പിക്കുക",
      askUsername: "നിങ്ങളുടെ ഉപയോക്തൃ നാമം പറയുക",
      askPassword: "നിങ്ങളുടെ പാസ്‌വേഡ് പറയുക",
      confirm: "നിങ്ങൾ നൽകിയ ഉപയോക്തൃ നാമം",
    },
  };

  /* ================= SPEAK ================= */

  const speak = (text, lang = language, callback) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;

    utterance.onend = () => {
      if (callback) callback();
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  /* ================= RECOGNITION ================= */

  const startRecognition = (lang, callback) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported");
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.start();
    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript.toLowerCase();
      callback(text);
    };
  };

  /* ================= LANGUAGE SELECTION ================= */

  useEffect(() => {
    if (isLoggedIn) return;

    speak(translations.en.selectLang, "en-US", () => {
      startRecognition("en-US", (spoken) => {
        if (spoken.includes("kannada")) {
          setLanguage("kn-IN");
          setLangKey("kn");
        } else if (spoken.includes("telugu")) {
          setLanguage("te-IN");
          setLangKey("te");
        } else if (spoken.includes("tamil")) {
          setLanguage("ta-IN");
          setLangKey("ta");
        } else if (spoken.includes("malayalam")) {
          setLanguage("ml-IN");
          setLangKey("ml");
        } else {
          setLanguage("en-US");
          setLangKey("en");
        }
      });
    });
  }, [isLoggedIn]);

  /* ================= ASK USERNAME & PASSWORD ================= */

  useEffect(() => {
    if (langKey !== "en" && !isLoggedIn) {
      speak(translations[langKey].askUsername, language, () => {
        startRecognition(language, (text) => {
          setUsername(text);

          speak(
            `${translations[langKey].confirm} ${text}`,
            language,
            () => {
              speak(translations[langKey].askPassword, language, () => {
                startRecognition(language, (pass) => {
                  setPassword(pass);
                  speak("Details captured successfully", language);
                });
              });
            }
          );
        });
      });
    }
  }, [langKey, isLoggedIn]);

  /* ================= SUBMIT ================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);

    speak("Login successful", language);
  };

  /* ================= IF ALREADY LOGGED IN ================= */

  if (isLoggedIn) {
    return (
      <div className="login-page">
        <h1>Welcome {username || "User"} 🎉</h1>
      </div>
    );
  }

  const t = translations[langKey];

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1><b>{t.login}</b></h1>

        <div className="form-group">
          <label>{t.username}</label>
          <input type="text" value={username} readOnly />
        </div>

        <div className="form-group">
          <label>{t.password}</label>
          <input type="password" value={password} readOnly />
        </div>

        <button className="login-btn" type="submit">
          {t.submit}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;