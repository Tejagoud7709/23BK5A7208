import React, { useEffect, useState } from 'react';

function Statistics() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const storedUrls = JSON.parse(localStorage.getItem('shortenedUrls') || '[]');
    setUrls(storedUrls);
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h2>Statistics - All Shortened URLs</h2>
      {urls.length === 0 ? (
        <p>No shortened URLs found.</p>
      ) : (
        <ul>
          {urls.map((url, index) => (
            <li key={index}>
              <a href={url} target="_blank" rel="noreferrer">{url}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Statistics;
