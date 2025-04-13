import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelection from "./components/RoleSelection";
import ScoreboardPage from "./pages/Scoreboard"; // Page to display scoreboard
import AuthPage from "./components/AuthPage"; // Login/Register page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/scoreboard/:matchCode" element={<ScoreboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
