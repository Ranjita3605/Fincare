import React, { useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Speak function
  const speak = (text, lang = "en-US") => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    }
  };

  // When login button is clicked
  const handleLoginClick = (e) => {
    e.preventDefault();

    // Always start reading in English
    speak("Login form opened. Please enter your username and password.", "en-US");

    if (username) {
      speak(`Username entered is ${username}`, "en-US");
    }
    if (password) {
      speak("Password entered.", "en-US");
    }

    // Add your login logic here (API call, validation, etc.)
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleLoginClick}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>

        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
