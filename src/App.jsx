import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelection from "./components/RoleSelection";
import ScoreboardPage from "./pages/Scoreboard"; // Page to display scoreboard
import AuthPage from "./components/AuthPage"; // Login/Register page
import AdPrices from "./pages/AdPrices";
import AdDashboard from "./pages/AdDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<AdDashboard />} />
        <Route path="/scoreboard/:matchCode" element={<ScoreboardPage />} />
        <Route path="/ad-prices" element={<AdPrices />} />

      </Routes>
    </Router>
  );
}

export default App;
