import React, { createContext, useState } from "react";

export const LanguageContext = createContext();

export const LANGUAGES = {
  english: { code: "en-IN", label: "English" },
  kannada: { code: "kn-IN", label: "Kannada" },
  telugu: { code: "te-IN", label: "Telugu" },
  tamil: { code: "ta-IN", label: "Tamil" },
  malayalam: { code: "ml-IN", label: "Malayalam" },
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(LANGUAGES.english);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};