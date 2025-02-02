import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!text) return;

    setLoading(true);
    try {
      const response = await axios.post('https://translation.googleapis.com/language/translate/v2', {
        q: text,
        source: sourceLang,
        target: targetLang,
        key: 'YOUR_GOOGLE_API_KEY', // Add your Google Cloud API key here
      });
      setTranslatedText(response.data.data.translations[0].translatedText);
    } catch (error) {
      console.error("Error in translation", error);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Real-Time Language Translator</h1>
      <textarea
        placeholder="Enter text to translate"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div>
        <label>Source Language: </label>
        <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          {/* Add more languages here */}
        </select>
      </div>
      <div>
        <label>Target Language: </label>
        <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          {/* Add more languages here */}
        </select>
      </div>
      <button onClick={handleTranslate} disabled={loading}>
        {loading ? 'Translating...' : 'Translate'}
      </button>
      <div>
        <h3>Translated Text:</h3>
        <p>{translatedText}</p>
      </div>
    </div>
  );
}

export default App;
