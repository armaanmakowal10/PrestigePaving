import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './pages/About';
import { ThemeProvider } from './lib/theme';

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </ThemeProvider>
  );
}
