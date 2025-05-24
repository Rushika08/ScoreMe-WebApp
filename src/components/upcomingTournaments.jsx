import React, { useState } from "react";

export default function UpcomingTournaments() {
  const [selectedTournament, setSelectedTournament] = useState(null);

  const dummyTournaments = [
    {
      name: "City Cricket Cup",
      date: "2025-06-15",
      location: "Pune",
      matches: 12,
      fromDate: "2025-06-10",
      toDate: "2025-06-25",
      organizer: "Pune Cricket Board"
    },
    {
      name: "Summer Smash League",
      date: "2025-07-10",
      location: "Mumbai",
      matches: 16,
      fromDate: "2025-07-05",
      toDate: "2025-07-20",
      organizer: "Mumbai Sports Association"
    },
  ];

  const handleCardClick = (tournament) => {
    setSelectedTournament(tournament);
  };

  const closePopup = () => {
    setSelectedTournament(null);
  };

  return (
    <div className="relative">
      <h2 className="text-xl font-semibold mb-4 text-green-600">Upcoming Tournaments</h2>

      <ul className="space-y-3">
        {dummyTournaments.map((tournament, idx) => (
          <li
            key={idx}
            onClick={() => handleCardClick(tournament)}
            className="p-4 border rounded-md bg-green-50 shadow-sm cursor-pointer hover:bg-green-100 transition"
          >
            <p className="font-bold">{tournament.name}</p>
            <p className="text-sm text-gray-700">📅 {tournament.date}</p>
            <p className="text-sm text-gray-700">📍 {tournament.location}</p>
          </li>
        ))}
      </ul>

      {/* Popup */}
      {selectedTournament && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Blur the background */}
          <div
            className="absolute inset-0 backdrop-blur-sm bg-transparent"
            onClick={closePopup}
          ></div>

          {/* Popup card */}
          <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold mb-2 text-green-700">
              {selectedTournament.name}
            </h3>

            <p className="text-gray-800 mb-1">📍 Location: {selectedTournament.location}</p>
            <p className="text-gray-800 mb-1">📅 Start Date: {selectedTournament.fromDate}</p>
            <p className="text-gray-800 mb-1">📅 End Date: {selectedTournament.toDate}</p>
            <p className="text-gray-800 mb-1">🏏 Matches: {selectedTournament.matches}</p>
            <p className="text-gray-800">🏢 Organizer: {selectedTournament.organizer}</p>
          </div>
        </div>
      )}
    </div>
  );
}
