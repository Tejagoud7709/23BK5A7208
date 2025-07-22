import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import UrlShortener from './URL/url';
import Statistics from './URL/Statistics';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <nav style={{ padding: 10, backgroundColor: '#eee' }}>
        <Link to="/" style={{ marginRight: 10 }}>URL Shortener</Link>
        <Link to="/statistics">Statistics</Link>
      </nav>
      <Routes>
        <Route path="/" element={<UrlShortener />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
