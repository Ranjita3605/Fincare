import React, { useState, useEffect, useRef } from "react";
import "./loan.css";

function LoanForm() {

  const [language, setLanguage] = useState("en-US");
  const [langKey, setLangKey] = useState("en");
  const [languageSelected, setLanguageSelected] = useState(false);
  const [voiceStarted, setVoiceStarted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    income: "",
    loanAmount: "",
  });

  const recognitionRef = useRef(null);

  /* ================= TRANSLATIONS ================= */

  const translations = {

    en: {
      selectLang:
        "Please say your preferred language. English, Kannada, Tamil, Telugu or Malayalam.",
      title: "Loan Application Form",
      name: "Full Name",
      age: "Age",
      income: "Annual Income",
      loanAmount: "Loan Amount Required",
      submit: "Submit Application",
      startVoice: "Start Voice Assistant",
      askName: "Please say your full name",
      askAge: "Please say your age",
      askIncome: "Please say your annual income",
      askLoan: "Please say required loan amount",
      success: "Loan application submitted successfully",
    },

    kn: {
      selectLang:
        "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಹೇಳಿ. ಇಂಗ್ಲಿಷ್, ಕನ್ನಡ, ತಮಿಳು, ತೆಲುಗು ಅಥವಾ ಮಲಯಾಳಂ.",
      title: "ಸಾಲ ಅರ್ಜಿ ಫಾರ್ಮ್",
      name: "ಪೂರ್ಣ ಹೆಸರು",
      age: "ವಯಸ್ಸು",
      income: "ವಾರ್ಷಿಕ ಆದಾಯ",
      loanAmount: "ಬೇಕಾದ ಸಾಲದ ಮೊತ್ತ",
      submit: "ಅರ್ಜಿಯನ್ನು ಸಲ್ಲಿಸಿ",
      startVoice: "ವಾಯ್ಸ್ ಸಹಾಯಕವನ್ನು ಪ್ರಾರಂಭಿಸಿ",
      askName: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ಹೇಳಿ",
      askAge: "ನಿಮ್ಮ ವಯಸ್ಸನ್ನು ಹೇಳಿ",
      askIncome: "ನಿಮ್ಮ ವಾರ್ಷಿಕ ಆದಾಯವನ್ನು ಹೇಳಿ",
      askLoan: "ಬೇಕಾದ ಸಾಲದ ಮೊತ್ತವನ್ನು ಹೇಳಿ",
      success: "ಸಾಲ ಅರ್ಜಿ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ",
    },

    ta: {
      selectLang:
        "தயவுசெய்து உங்கள் மொழியை சொல்லுங்கள். ஆங்கிலம், கன்னடம், தமிழ், தெலுங்கு அல்லது மலையாளம்.",
      title: "கடன் விண்ணப்ப படிவம்",
      name: "முழு பெயர்",
      age: "வயது",
      income: "வருடாந்திர வருமானம்",
      loanAmount: "தேவையான கடன் தொகை",
      submit: "விண்ணப்பத்தை சமர்ப்பிக்கவும்",
      startVoice: "வாய்ஸ் உதவியாளரை தொடங்கவும்",
      askName: "உங்கள் முழு பெயரை சொல்லவும்",
      askAge: "உங்கள் வயதை சொல்லவும்",
      askIncome: "உங்கள் வருடாந்திர வருமானத்தை சொல்லவும்",
      askLoan: "தேவையான கடன் தொகையை சொல்லவும்",
      success: "கடன் விண்ணப்பம் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது",
    },

    te: {
      selectLang:
        "దయచేసి మీ భాషను చెప్పండి. ఇంగ్లీష్, కన్నడ, తమిళం, తెలుగు లేదా మలయాళం.",
      title: "రుణ దరఖాస్తు ఫారం",
      name: "పూర్తి పేరు",
      age: "వయస్సు",
      income: "వార్షిక ఆదాయం",
      loanAmount: "అవసరమైన రుణ మొత్తం",
      submit: "దరఖాస్తును సమర్పించండి",
      startVoice: "వాయిస్ సహాయకాన్ని ప్రారంభించండి",
      askName: "మీ పూర్తి పేరును చెప్పండి",
      askAge: "మీ వయస్సును చెప్పండి",
      askIncome: "మీ వార్షిక ఆదాయాన్ని చెప్పండి",
      askLoan: "అవసరమైన రుణ మొత్తాన్ని చెప్పండి",
      success: "రుణ దరఖాస్తు విజయవంతంగా సమర్పించబడింది",
    },

    ml: {
      selectLang:
        "ദയവായി നിങ്ങളുടെ ഭാഷ പറയുക. ഇംഗ്ലീഷ്, ಕನ್ನಡ, തമിഴ്, തെലുങ്ക് അല്ലെങ്കിൽ മലയാളം.",
      title: "വായ്പ അപേക്ഷ ഫോം",
      name: "പൂർണ്ണ പേര്",
      age: "പ്രായം",
      income: "വാർഷിക വരുമാനം",
      loanAmount: "ആവശ്യമായ വായ്പ തുക",
      submit: "അപേക്ഷ സമർപ്പിക്കുക",
      startVoice: "വോയ്സ് അസിസ്റ്റന്റ് ആരംഭിക്കുക",
      askName: "നിങ്ങളുടെ പൂർണ്ണ പേര് പറയുക",
      askAge: "നിങ്ങളുടെ പ്രായം പറയുക",
      askIncome: "നിങ്ങളുടെ വാർഷിക വരുമാനം പറയുക",
      askLoan: "ആവശ്യമായ വായ്പ തുക പറയുക",
      success: "വായ്പ അപേക്ഷ വിജയകരമായി സമർപ്പിച്ചു",
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

  /* ================= SPEECH RECOGNITION ================= */

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
    recognition.start();

    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript.toLowerCase();
      callback(text);
    };
  };

  /* ================= START VOICE FLOW ================= */

  const startVoiceAssistant = () => {

    setVoiceStarted(true);

    speak(translations.en.selectLang, "en-US", () => {

      startRecognition("en-US", (spoken) => {

        if (spoken.includes("kannada")) {
          setLanguage("kn-IN");
          setLangKey("kn");
        }

        else if (spoken.includes("tamil")) {
          setLanguage("ta-IN");
          setLangKey("ta");
        }

        else if (spoken.includes("telugu")) {
          setLanguage("te-IN");
          setLangKey("te");
        }

        else if (spoken.includes("malayalam")) {
          setLanguage("ml-IN");
          setLangKey("ml");
        }

        else {
          setLanguage("en-US");
          setLangKey("en");
        }

        setLanguageSelected(true);

      });
    });
  };

  /* ================= ASK QUESTIONS ================= */

  useEffect(() => {

    if (!languageSelected) return;

    const t = translations[langKey];

    speak(t.askName, language, () => {

      startRecognition(language, (name) => {

        setFormData((prev) => ({ ...prev, name }));

        speak(t.askAge, language, () => {

          startRecognition(language, (age) => {

            setFormData((prev) => ({ ...prev, age }));

            speak(t.askIncome, language, () => {

              startRecognition(language, (income) => {

                setFormData((prev) => ({ ...prev, income }));

                speak(t.askLoan, language, () => {

                  startRecognition(language, (loan) => {

                    setFormData((prev) => ({
                      ...prev,
                      loanAmount: loan,
                    }));

                  });

                });

              });

            });

          });

        });

      });

    });

  }, [languageSelected]);

  /* ================= SUBMIT ================= */

  const handleSubmit = (e) => {

    e.preventDefault();

    speak(translations[langKey].success, language);

    alert("Application Submitted");
  };

  const t = translations[langKey];

  return (

    <div className="loan-container">

      <form className="loan-form" onSubmit={handleSubmit}>

        {!voiceStarted && (
          <button
            type="button"
            className="voice-start-btn"
            onClick={startVoiceAssistant}
          >
            🎤 {t.startVoice}
          </button>
        )}

        <h1>{t.title}</h1>

        <div className="input-group">
          <label>{t.name}</label>
          <input type="text" value={formData.name} readOnly />
        </div>

        <div className="input-group">
          <label>{t.age}</label>
          <input type="text" value={formData.age} readOnly />
        </div>

        <div className="input-group">
          <label>{t.income}</label>
          <input type="text" value={formData.income} readOnly />
        </div>

        <div className="input-group">
          <label>{t.loanAmount}</label>
          <input type="text" value={formData.loanAmount} readOnly />
        </div>

        <button className="submit-btn">{t.submit}</button>

      </form>

    </div>
  );
}

export default LoanForm;