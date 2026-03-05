const express = require("express");
const router = express.Router();
const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// POST API (accepts either /ask or /chat)
router.post(["/ask", "/chat"], async (req, res) => {
  try {
    const { message, language } = req.body;

    const prompt = `
Reply in the same language as the user.

Supported languages:
Kannada
Tamil
Telugu
Malayalam
English

User Question:
${message}
`;

    // Use one of the currently available Gemini models from the list above.
    // All of the "gemini-2.x" models support the generateContent method.
    // We'll pick the most recent general‑purpose release (gemini-2.5-flash).
    // You can also make the model name configurable via env if desired.

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        // optional parameters like temperature/topP can go here
      }
    );

    // the output structure mirrors the old code; first candidate/part
    const aiResponse =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    res.json({
      reply: aiResponse
    });

  } catch (error) {
    console.error("Gemini Error:", error.response?.data || error.message);

    res.status(500).json({
      error: "AI response failed"
    });
  }
});

module.exports = router;