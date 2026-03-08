// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const axios = require("axios");
// const fs = require("fs");
// const FormData = require("form-data");

// const app = express();

// app.use(cors());

// const upload = multer({ dest: "uploads/" });

// const SARVAM_API_KEY = "sk_6m8htz82_gmm7EeQTCmuWQgeL5AixadbR";

// /* VOICE ENDPOINT */

// app.post("/api/voice", upload.single("audio"), async (req, res) => {

//   try {

//     const formData = new FormData();

//     formData.append("file", fs.createReadStream(req.file.path));
//     formData.append("model", "saarika:v1");
//     formData.append("language_code", "auto");

//     const stt = await axios.post(
//       "https://api.sarvam.ai/speech-to-text",
//       formData,
//       {
//         headers: {
//           "api-subscription-key": SARVAM_API_KEY,
//           ...formData.getHeaders()
//         }
//       }
//     );

//     const transcript = stt.data.transcript;
//     const language = stt.data.language_code;

//     const reply = "You said: " + transcript;

//     const tts = await axios.post(
//       "https://api.sarvam.ai/text-to-speech",
//       {
//         inputs: [reply],
//         target_language_code: language,
//         speaker: "meera",
//         model: "bulbul:v1"
//       },
//       {
//         headers: {
//           "api-subscription-key": SARVAM_API_KEY
//         }
//       }
//     );

//     const base64 = tts.data.audios[0];

//     const audioBuffer = Buffer.from(base64, "base64");

//     const filePath = `audio_${Date.now()}.wav`;

//     fs.writeFileSync(filePath, audioBuffer);

//     res.json({
//       transcript,
//       reply,
//       audio: "http://localhost:5000/" + filePath
//     });

//   } catch (err) {

//     console.error(err);

//     res.status(500).json({
//       error: "Voice processing failed"
//     });

//   }

// });

// app.use(express.static(__dirname));
// app.post("/chat", async (req, res) => {

//   const { message } = req.body;

//   let language = "en-IN";

//   /* SIMPLE LANGUAGE DETECTION */

//   if (/[ಅ-ಹ]/.test(message)) language = "kn-IN";
//   else if (/[అ-హ]/.test(message)) language = "te-IN";
//   else if (/[அ-ஹ]/.test(message)) language = "ta-IN";
//   else if (/[ऀ-ॿ]/.test(message)) language = "hi-IN";

//   let reply = "";

//   /* SIMPLE DEMO RESPONSES */

//   if (message.toLowerCase().includes("loan")) {
//     reply = "You can apply for a farmer loan in our portal.";
//   } else if (message.toLowerCase().includes("scheme")) {
//     reply = "You can check government schemes available for farmers.";
//   } else {
//     reply = "How can I help you with finance or schemes?";
//   }

//   res.json({
//     reply,
//     language
//   });
// });

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });
