import React, { useState } from 'react';
import axios from 'axios';

function UrlShortener() {
  const [inputUrl, setInputUrl] = useState('');
  const [shortUrls, setShortUrls] = useState([]);
  const [error, setError] = useState('');

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShortUrls([]);
    setError('');
    if (!validateUrl(inputUrl)) {
      setError('Please enter a valid URL');
      return;
    }
    try {
      const response = await axios.get(`https://is.gd/create.php?format=json&url=${encodeURIComponent(inputUrl)}`);
      const url = response.data.shorturl;
      setShortUrls([url]);
      // Save to localStorage for statistics page
      const storedUrls = JSON.parse(localStorage.getItem('shortenedUrls') || '[]');
      const newStoredUrls = [...storedUrls, url];
      localStorage.setItem('shortenedUrls', JSON.stringify(newStoredUrls));
    } catch (err) {
      console.error('Shorten URL error:', err.response || err.message || err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(`Error: ${err.response.data.error}`);
      } else if (err.response && err.response.status === 400) {
        setError('Invalid URL provided.');
      } else {
        setError(`Failed to shorten URL. Please check the URL and try again. Details: ${err.message || 'Unknown error'}`);
      }
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Enter your URL"
          required
        />
        <button type="submit">Shorten</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {shortUrls.length > 0 && (
        <div>
          <p>Shortened URLs:</p>
          <ul>
            {shortUrls.map((url, index) => (
              <li key={index}>
                <a href={url} target="_blank" rel="noreferrer">{url}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UrlShortener;
