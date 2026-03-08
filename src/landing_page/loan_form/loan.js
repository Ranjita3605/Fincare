

// import React, { useState, useRef } from "react";
// import Tesseract from "tesseract.js";

// function LoanForm() {

//   const recognitionRef = useRef(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     dob: "",
//     aadhar: "",
//     occupation: "",
//     income: "",
//     loanAmount: ""
//   });

//   const [uploaded, setUploaded] = useState(false);
//   const language = "en-US";

//   /* ================= OCR ================= */

//   const handleUpload = async (e) => {

//     const file = e.target.files[0];
//     if (!file) return;

//     try {

//       const { data: { text } } = await Tesseract.recognize(file, "eng");

//       console.log("OCR TEXT:", text);

//       const lines = text
//         .split("\n")
//         .map(line => line.trim())
//         .filter(line => line.length > 0);

//       let name = "";
//       let dob = "";
//       let aadhar = "";

//       // Aadhaar Number
//       const aadharMatch = text.match(/\d{4}\s?\d{4}\s?\d{4}/);
//       if (aadharMatch) {
//         aadhar = aadharMatch[0];
//       }

//       // DOB
//       const dobMatch = text.match(/\d{2}\/\d{2}\/\d{4}/);
//       if (dobMatch) {
//         dob = dobMatch[0];

//         // Name is usually above DOB
//         const dobIndex = lines.findIndex(line => line.includes(dob));

//         if (dobIndex > 0) {

//           let candidate = lines[dobIndex - 1]
//             .replace(/[^A-Za-z ]/g, "")
//             .trim();

//           if (
//             candidate.length > 3 &&
//             candidate.length < 40 &&
//             !candidate.toUpperCase().includes("GOVERNMENT") &&
//             !candidate.toUpperCase().includes("INDIA") &&
//             !candidate.toUpperCase().includes("MALE") &&
//             !candidate.toUpperCase().includes("FEMALE")
//           ) {
//             name = candidate;
//           }

//         }
//       }

//       console.log("Extracted Name:", name);

//       setFormData(prev => ({
//         ...prev,
//         name,
//         dob,
//         aadhar
//       }));

//       setUploaded(true);

//       speak("Aadhaar details extracted. Starting voice form.", startVoiceAssistant);

//     } catch (err) {
//       console.error(err);
//       alert("OCR Failed");
//     }

//   };

//   /* ================= SPEAK ================= */

//   const speak = (text, callback) => {

//     const utterance = new SpeechSynthesisUtterance(text);

//     utterance.onend = () => {
//       if (callback) callback();
//     };

//     window.speechSynthesis.cancel();
//     window.speechSynthesis.speak(utterance);

//   };

//   /* ================= RECOGNITION ================= */

//   const startRecognition = (callback) => {

//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert("Speech recognition not supported");
//       return;
//     }

//     const recognition = new SpeechRecognition();

//     recognition.lang = language;
//     recognition.continuous = false;
//     recognition.interimResults = false;

//     recognition.start();

//     recognitionRef.current = recognition;

//     recognition.onresult = (event) => {
//       const text = event.results[0][0].transcript;
//       callback(text);
//     };

//   };

//   /* ================= VOICE FLOW ================= */

//   const startVoiceAssistant = () => {

//     speak("Please say your occupation", () => {

//       startRecognition((occupation) => {

//         setFormData(prev => ({ ...prev, occupation }));

//         speak("Please say your income", () => {

//           startRecognition((income) => {

//             setFormData(prev => ({ ...prev, income }));

//             speak("Please say loan amount", () => {

//               startRecognition((loanAmount) => {

//                 setFormData(prev => ({
//                   ...prev,
//                   loanAmount
//                 }));

//               });

//             });

//           });

//         });

//       });

//     });

//   };

//   return (

//     <div style={{ padding: "40px" }}>

//       <h2>Loan Application</h2>

//       {!uploaded && (
//         <input type="file" onChange={handleUpload} />
//       )}

//       <br /><br />

//       <input value={formData.name} placeholder="Name" readOnly /><br /><br />
//       <input value={formData.dob} placeholder="DOB" readOnly /><br /><br />
//       <input value={formData.aadhar} placeholder="Aadhaar" readOnly /><br /><br />

//       <input value={formData.occupation} placeholder="Occupation" readOnly /><br /><br />
//       <input value={formData.income} placeholder="Income" readOnly /><br /><br />
//       <input value={formData.loanAmount} placeholder="Loan Amount" readOnly /><br /><br />

//     </div>

//   );

// }

// export default LoanForm;

import React, { useState, useRef } from "react";
import Tesseract from "tesseract.js";
import "./loan.css";

function LoanForm() {

  const recognitionRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    aadhar: "",
    occupation: "",
    income: "",
    loanAmount: ""
  });

  const [uploaded, setUploaded] = useState(false);
  const language = "en-US";

  /* ================= OCR ================= */

  const handleUpload = async (e) => {

    const file = e.target.files[0];
    if (!file) return;

    try {

      const { data: { text } } = await Tesseract.recognize(
        file,
        "eng"
      );

      console.log("OCR TEXT:", text);

      /* ===== Aadhaar Detection (ROBUST) ===== */

      let aadhar = "";
      const digits = text.replace(/\D/g, "");
      const aadharMatch = digits.match(/\d{12}/);

      if (aadharMatch) {
        aadhar = aadharMatch[0];
      }

      /* ===== DOB Detection ===== */

      let dob = "";
      const dobMatch = text.match(/\d{2}[\/\-]\d{2}[\/\-]\d{4}/);

      if (dobMatch) {
        dob = dobMatch[0];
      }

      /* ===== Name Detection ===== */

      const lines = text.split("\n").map(l => l.trim()).filter(Boolean);

      let name = "";

      let dobIndex = -1;

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].match(/\d{2}[\/\-]\d{2}[\/\-]\d{4}/)) {
          dobIndex = i;
          break;
        }
      }

      if (dobIndex !== -1) {

        for (let i = dobIndex - 1; i >= 0; i--) {

          let candidate = lines[i]
            .replace(/[^A-Za-z ]/g, "")
            .trim();

          if (
            candidate.length > 3 &&
            candidate.length < 40 &&
            !candidate.toUpperCase().includes("GOVERNMENT") &&
            !candidate.toUpperCase().includes("INDIA") &&
            !candidate.toUpperCase().includes("FEMALE") &&
            !candidate.toUpperCase().includes("MALE") &&
            !candidate.toUpperCase().includes("DOB")
          ) {
            name = candidate;
            break;
          }

        }

      }

      console.log("Extracted Name:", name);
      console.log("Extracted DOB:", dob);
      console.log("Extracted Aadhaar:", aadhar);

      setFormData(prev => ({
        ...prev,
        name,
        dob,
        aadhar
      }));

      setUploaded(true);

      startVoiceAssistant();

    } catch (error) {
      console.error("OCR error:", error);
      alert("OCR failed");
    }

  };

  /* ================= SPEAK ================= */

  const speak = (text, callback) => {

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.onend = () => {
      if (callback) callback();
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);

  };

  /* ================= RECOGNITION ================= */

  const startRecognition = (callback) => {

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = language;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.start();

    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      callback(text);
    };

  };

  /* ================= VOICE FLOW ================= */

  const startVoiceAssistant = () => {

    speak("Please say your occupation", () => {

      startRecognition((occupation) => {

        setFormData(prev => ({ ...prev, occupation }));

        speak("Please say your income", () => {

          startRecognition((income) => {

            setFormData(prev => ({ ...prev, income }));

            speak("Please say loan amount", () => {

              startRecognition((loanAmount) => {

                setFormData(prev => ({
                  ...prev,
                  loanAmount
                }));

              });

            });

          });

        });

      });

    });

  };

  // return (

  //   <div style={{ padding: "40px" }}>

  //     <h2>Loan Application</h2>

  //     {!uploaded && (
  //       <input type="file" onChange={handleUpload} />
  //     )}

  //     <br /><br />

  //     <input value={formData.name} placeholder="Name" readOnly /><br /><br />
  //     <input value={formData.dob} placeholder="DOB" readOnly /><br /><br />
  //     <input value={formData.aadhar} placeholder="Aadhaar" readOnly /><br /><br />

  //     <input value={formData.occupation} placeholder="Occupation" readOnly /><br /><br />
  //     <input value={formData.income} placeholder="Income" readOnly /><br /><br />
  //     <input value={formData.loanAmount} placeholder="Loan Amount" readOnly /><br /><br />

  //   </div>

  // );
  return (

  <div className="loan-container">

    <div className="loan-card">

      <h2 className="loan-title"><b>Loan Application</b></h2>

      {!uploaded && (
        <input
          className="file-upload"
          type="file"
          onChange={handleUpload}
        />
      )}

      <div className="input-group">
        <label>Name</label>
        <input value={formData.name} readOnly />
      </div>

      <div className="input-group">
        <label>DOB</label>
        <input value={formData.dob} readOnly />
      </div>

      <div className="input-group">
        <label>Aadhaar</label>
        <input value={formData.aadhar} readOnly />
      </div>

      <div className="input-group">
        <label>Occupation</label>
        <input value={formData.occupation} readOnly />
      </div>

      <div className="input-group">
        <label>Income</label>
        <input value={formData.income} readOnly />
      </div>

      <div className="input-group">
        <label>Loan Amount</label>
        <input value={formData.loanAmount} readOnly />
      </div>

    </div>

  </div>

);

}

export default LoanForm;