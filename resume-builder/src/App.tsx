import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { HomePage } from './pages/HomePage';
import { ResumeBuilder } from './pages/ResumeBuilder';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/builder" element={<ResumeBuilder />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
