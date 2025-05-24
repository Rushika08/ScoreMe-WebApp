import React from "react";

export default function IntermediateScoreboard({
  matchInfo = {},
  teamA = {},
  teamB = {},
  currentInnings = {},
  batsmen = [],
  bowlers = [],
  lastBat = {},
  reviews = {}
}) {
  const safeMatchInfo = {
    type: "",
    location: "",
    date: "",
    totalOvers: "20",
    ...matchInfo
  };

  const safeTeamA = { name: "", score: 0, wickets: 0, overs: "0.0", ...teamA };
  const safeTeamB = { name: "", score: 0, wickets: 0, overs: "0.0", ...teamB };
  const safeCurrentInnings = { battingTeam: "", bowlingTeam: "", ...currentInnings };
  const safeLastBat = { name: "", runs: 0, balls: 0, ...lastBat };
  const safeReviews = {
    teamA: { remaining: 0, total: 0 },
    teamB: { remaining: 0, total: 0 },
    ...reviews
  };

  const battingTeam = safeCurrentInnings.battingTeam === safeTeamA.name ? safeTeamA : safeTeamB;
  const bowlingTeam = safeCurrentInnings.bowlingTeam === safeTeamA.name ? safeTeamA : safeTeamB;

  const isSecondInnings = safeTeamA.score > 0 && safeTeamB.score > 0;
  const target = isSecondInnings
    ? (battingTeam === safeTeamA ? safeTeamB.score : safeTeamA.score) + 1
    : 0;

  const result = isSecondInnings && battingTeam.score >= target
    ? `${battingTeam.name} won by ${10 - battingTeam.wickets} wickets`
    : "";

  function getStrikeRate(runs, balls) {
    return balls > 0 ? ((runs / balls) * 100).toFixed(2) : "0.00";
  }

  return (
    <div className="bg-gradient-to-br from-yellow-100 to-blue-100 p-6 rounded-lg shadow-lg max-w-4xl mx-auto border-2 border-indigo-300">
      <h2 className="text-2xl font-bold mb-2 text-indigo-700 text-center">
        {result || "Live Match"}
      </h2>

      <div className="text-sm text-gray-700 mb-4 text-center">
        {safeMatchInfo.type} • {safeMatchInfo.location} • {safeMatchInfo.date}
      </div>

      {[safeTeamA, safeTeamB].map((team, i) => (
        <div
          key={i}
          className={`flex justify-between py-2 px-4 rounded-md mb-2 text-white ${
            i === 0 ? "bg-red-500" : "bg-blue-600"
          }`}
        >
          <span className="font-semibold">{team.name}</span>
          <span className="font-mono">{team.score}/{team.wickets} ({team.overs} ov)</span>
        </div>
      ))}

      {target > 0 && (
        <div className="text-sm text-gray-800 bg-yellow-200 p-2 rounded-md mb-2">
          🎯 <strong>Target:</strong> {target}
        </div>
      )}

      <div className="mt-4 bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold text-lg mb-2 text-green-600">🧢 Batting</h3>
        <table className="w-full text-sm table-auto">
          <thead>
            <tr className="text-left text-gray-600 border-b border-gray-300">
              <th>Name</th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th>
            </tr>
          </thead>
          <tbody>
            {batsmen.map((bat, idx) => (
              <tr key={idx} className="border-b border-gray-200 hover:bg-green-50">
                <td>{bat.name}{bat.notOut ? "*" : ""}</td>
                <td>{bat.runs}</td>
                <td>{bat.balls}</td>
                <td>{bat.fours}</td>
                <td>{bat.sixes}</td>
                <td className="text-right text-indigo-600 font-medium">{getStrikeRate(bat.runs, bat.balls)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold text-lg mb-2 text-blue-600">🎯 Bowling</h3>
        <table className="w-full text-sm table-auto">
          <thead>
            <tr className="text-left text-gray-600 border-b border-gray-300">
              <th>Name</th><th>O</th><th>R</th><th>W</th><th>Econ</th>
            </tr>
          </thead>
          <tbody>
            {bowlers.map((bowler, idx) => (
              <tr key={idx} className="border-b border-gray-200 hover:bg-blue-50">
                <td>{bowler.name}</td>
                <td>{bowler.overs}</td>
                <td>{bowler.runs}</td>
                <td>{bowler.wickets}</td>
                <td className="text-right text-red-500 font-medium">
                  {(bowler.overs > 0 ? (bowler.runs / bowler.overs).toFixed(2) : "0.00")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm bg-gray-100 p-3 rounded-md text-gray-700">
        <p className="mb-1"><strong>Last Bat:</strong> {safeLastBat.name} {safeLastBat.runs} ({safeLastBat.balls}b)</p>
        <p><strong>DRS:</strong> {safeTeamA.name} - {safeReviews.teamA?.remaining}/{safeReviews.teamA?.total}, {safeTeamB.name} - {safeReviews.teamB?.remaining}/{safeReviews.teamB?.total}</p>
      </div>
    </div>
  );
}
