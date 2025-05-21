// src/pages/Scoreboard.jsx

import React from "react";
import { useParams } from "react-router-dom";
import Scoreboard from "../components/Scoreboard";
import mockMatchData from "../data/matchData"; // Adjust path as needed

export default function ScoreboardPage() {
  const { matchCode } = useParams();

  const matchData = mockMatchData[matchCode];

  if (!matchData) {
    return <div className="p-6 text-center text-red-600">Invalid or missing match data for: {matchCode}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-200 p-6">
      <Scoreboard
        matchInfo={matchData.matchInfo}
        teamA={matchData.teamA}
        teamB={matchData.teamB}
        currentInnings={matchData.currentInnings}
        batsmen={matchData.batsmen}
        bowlers={matchData.bowlers}
        lastBat={matchData.lastBat}
        reviews={matchData.reviews}
        ads={{
          top: false,
          middle: true,
          side: false,
          bottom: true
        }}
      />
    </div>
  );
}
