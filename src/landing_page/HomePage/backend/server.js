const express = require("express");
const cors = require("cors");
require("dotenv").config();

const voicebotRoutes = require("./voicebot");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", voicebotRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});