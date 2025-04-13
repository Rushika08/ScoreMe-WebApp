import { useState } from "react";
import { useNavigate } from "react-router-dom";
import stadiumImage from "../assets/sports_stadium_0.jpg";

export default function RoleSelection() {
  const navigate = useNavigate();
  const [matchCode, setMatchCode] = useState("");

  const handleSpectatorAccess = () => {
    if (matchCode.trim() === "") {
      alert("Please enter a match code.");
      return;
    }
    navigate(`/scoreboard/${matchCode}`);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${stadiumImage})`,
      }}
    >
      <div className="bg-[rgba(0,30,60,0.5)] p-6 rounded-xl shadow-xl w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Welcome to <span className="text-yellow-400">ScoreMe</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Spectator Card */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-2">👀 Spectator</h2>
            <p className="text-gray-600 mb-4 text-center">
              Enter a match code to view the scoreboard.
            </p>
            <input
              type="text"
              placeholder="Enter Match Code"
              className="border border-gray-300 p-2 rounded w-full mb-4"
              value={matchCode}
              onChange={(e) => setMatchCode(e.target.value)}
            />
            <button
              onClick={handleSpectatorAccess}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
            >
              View Scoreboard
            </button>
          </div>

          {/* Ad Publisher Card */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-2">📢 Ad Publisher</h2>
            <p className="text-gray-600 mb-6 text-center">
              Login to manage ads and access analytics.
            </p>
            <button
              onClick={() => navigate("/auth")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
