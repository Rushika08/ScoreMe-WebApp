import React from "react";

export default function Scoreboard({ 
  matchInfo = {}, 
  teamA = {}, 
  teamB = {}, 
  currentInnings = {}, 
  batsmen = [], 
  bowlers = [], 
  lastBat = {}, 
  reviews = {}
}) {
  // Set default values to prevent undefined errors
  const safeMatchInfo = {
    number: "",
    type: "",
    location: "",
    date: "",
    tournament: "",
    totalOvers: "20",
    ...matchInfo
  };
  
  const safeTeamA = {
    name: "",
    score: 0,
    wickets: 0,
    overs: "0.0",
    ...teamA
  };
  
  const safeTeamB = {
    name: "",
    score: 0,
    wickets: 0,
    overs: "0.0",
    ...teamB
  };
  
  const safeCurrentInnings = {
    battingTeam: "",
    bowlingTeam: "",
    ...currentInnings
  };
  
  const safeLastBat = {
    name: "",
    runs: 0,
    balls: 0,
    ...lastBat
  };
  
  const safeReviews = {
    teamA: { remaining: 0, total: 0 },
    teamB: { remaining: 0, total: 0 },
    ...reviews
  };

  // Calculate which team is batting based on currentInnings
  const battingTeam = safeCurrentInnings.battingTeam === safeTeamA.name ? safeTeamA : safeTeamB;
  const bowlingTeam = safeCurrentInnings.bowlingTeam === safeTeamA.name ? safeTeamA : safeTeamB;
  
  // Calculate target if second innings
  const isSecondInnings = (safeTeamA.score > 0 && safeTeamB.score > 0);
  const target = isSecondInnings ? 
    (battingTeam === safeTeamA ? safeTeamB.score + 1 : safeTeamA.score + 1) : 0;
  
  // Calculate current partnership if there are batsmen
  const partnership = batsmen.length >= 2 ? {
    runs: batsmen[0].runs + batsmen[1].runs,
    balls: batsmen[0].balls + batsmen[1].balls,
    runRate: ((batsmen[0].runs + batsmen[1].runs) / (batsmen[0].balls + batsmen[1].balls) * 6).toFixed(2)
  } : { runs: 0, balls: 0, runRate: 0 };
  
  // Calculate fall of wicket
  const fallOfWicket = battingTeam.wickets > 0 ? {
    score: battingTeam.score,
    wicket: battingTeam.wickets,
    overs: battingTeam.overs
  } : { score: 0, wicket: 0, overs: "0.0" };
  
  // Calculate match result
  let result = "";
  if (isSecondInnings) {
    const winningTeam = safeTeamA.score > safeTeamB.score ? safeTeamA : safeTeamB;
    const losingTeam = winningTeam === safeTeamA ? safeTeamB : safeTeamA;
    
    const wicketDifference = 10 - winningTeam.wickets;
    const remainingBalls = calculateRemainingBalls(safeMatchInfo.totalOvers, winningTeam.overs);
    
    if (winningTeam.score > losingTeam.score) {
      result = `${winningTeam.name.substring(0, 3).toUpperCase()} won by ${wicketDifference} wicket${wicketDifference !== 1 ? 's' : ''} (with ${remainingBalls} ball${remainingBalls !== 1 ? 's' : ''} remaining)`;
    }
  }

  // Helper function to calculate remaining balls
  function calculateRemainingBalls(totalOvers, playedOvers) {
    const totalBalls = parseInt(totalOvers) * 6;
    const playedOversParts = playedOvers.toString().split('.');
    const playedFullOvers = parseInt(playedOversParts[0]);
    const playedBalls = playedOversParts.length > 1 ? parseInt(playedOversParts[1]) : 0;
    const playedTotalBalls = (playedFullOvers * 6) + playedBalls;
    return totalBalls - playedTotalBalls;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
      <div className="border-b pb-4">
        <h2 className="text-xl font-bold mb-1">
          {isSecondInnings ? "RESULT" : "LIVE"}
        </h2>
        <div className="text-gray-600">
          {safeMatchInfo.number} Match ({safeMatchInfo.type}), {safeMatchInfo.location}, {safeMatchInfo.date}, {safeMatchInfo.tournament}
        </div>
      </div>

      <div className="py-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="bg-gray-200 rounded-full w-8 h-8 mr-2"></div>
            <span className="font-medium">{safeTeamA.name}</span>
          </div>
          <span className="font-bold">{safeTeamA.score}/{safeTeamA.wickets}</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="bg-yellow-100 rounded-full w-8 h-8 mr-2"></div>
            <span className="font-medium">{safeTeamB.name}</span>
          </div>
          <div>
            <span className="font-bold">{safeTeamB.score}/{safeTeamB.wickets}</span>
            <span className="text-gray-600 text-sm ml-2">
              ({safeTeamB.overs}/{safeMatchInfo.totalOvers} ov{target > 0 && battingTeam === safeTeamB ? `, T:${target}` : ""})
            </span>
          </div>
        </div>

        <div className="text-gray-700">{result}</div>
      </div>

      <div className="flex border-b overflow-x-auto">
        <div className="px-4 py-2 border-b-2 border-blue-500 text-blue-500 font-medium">Live</div>
        <div className="px-4 py-2 text-gray-600">Scorecard</div>
        <div className="px-4 py-2 text-gray-600">MVP</div>
        <div className="px-4 py-2 text-gray-600">Commentary</div>
        <div className="px-4 py-2 text-gray-600">Stats</div>
        <div className="px-4 py-2 text-gray-600">Overs</div>
        <div className="px-4 py-2 text-gray-600">Table</div>
        <div className="px-4 py-2 text-gray-600">Blog</div>
        <div className="px-4 py-2 text-gray-600">News</div>
        <div className="px-4 py-2 text-gray-600">Videos</div>
        <div className="px-4 py-2 text-gray-600">Photos</div>
        <div className="px-4 py-2 text-gray-600">Bet</div>
        <div className="px-4 py-2 text-gray-600">Fan Ratings</div>
      </div>

      <div className="mt-4">
        <div className="text-right text-sm text-gray-600 mb-2">T20 CAREER</div>
        {batsmen.length > 0 && (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="py-2">Batters</th>
                <th className="py-2">R</th>
                <th className="py-2">B</th>
                <th className="py-2">4s</th>
                <th className="py-2">6s</th>
                <th className="py-2">SR</th>
                <th className="py-2">This Bowler</th>
                <th className="py-2">Last 5 Balls</th>
                <th className="py-2">Mat</th>
                <th className="py-2">Runs</th>
                <th className="py-2">HS</th>
                <th className="py-2">Ave</th>
              </tr>
            </thead>
            <tbody>
              {batsmen.map((batter, index) => {
                // Set default values for each batter
                const safeBatter = {
                  name: "",
                  notOut: false,
                  battingStyle: "",
                  runs: 0,
                  balls: 0,
                  fours: 0,
                  sixes: 0,
                  thisBowler: "",
                  lastFiveBalls: "",
                  matches: 0,
                  careerRuns: 0,
                  highestScore: 0,
                  highestScoreNotOut: false,
                  average: 0,
                  ...batter
                };
                
                // Calculate strike rate
                const strikeRate = safeBatter.balls > 0 ? 
                  ((safeBatter.runs / safeBatter.balls) * 100).toFixed(2) : 0;
                
                return (
                  <tr key={index} className="border-b">
                    <td className="py-2 text-blue-600 font-medium">
                      {safeBatter.name}{safeBatter.notOut ? '*' : ''} ({safeBatter.battingStyle})
                    </td>
                    <td className="py-2 font-medium">{safeBatter.runs}</td>
                    <td className="py-2">{safeBatter.balls}</td>
                    <td className="py-2">{safeBatter.fours}</td>
                    <td className="py-2">{safeBatter.sixes}</td>
                    <td className="py-2">{strikeRate}</td>
                    <td className="py-2">{safeBatter.thisBowler}</td>
                    <td className="py-2">{safeBatter.lastFiveBalls}</td>
                    <td className="py-2">{safeBatter.matches}</td>
                    <td className="py-2">{safeBatter.careerRuns}</td>
                    <td className="py-2">{safeBatter.highestScore}{safeBatter.highestScoreNotOut ? '*' : ''}</td>
                    <td className="py-2">{safeBatter.average}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {bowlers.length > 0 && (
          <table className="w-full text-sm mt-4">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="py-2">Bowlers</th>
                <th className="py-2">O</th>
                <th className="py-2">M</th>
                <th className="py-2">R</th>
                <th className="py-2">W</th>
                <th className="py-2">Econ</th>
                <th className="py-2">0s</th>
                <th className="py-2">4s</th>
                <th className="py-2">6s</th>
                <th className="py-2">This Spell</th>
                <th className="py-2">Mat</th>
                <th className="py-2">Wkts</th>
                <th className="py-2">BBI</th>
                <th className="py-2">Ave</th>
              </tr>
            </thead>
            <tbody>
              {bowlers.map((bowler, index) => {
                // Set default values for each bowler
                const safeBowler = {
                  name: "",
                  bowlingStyle: "",
                  overs: 0,
                  maidens: 0,
                  runs: 0,
                  wickets: 0,
                  dots: 0,
                  fours: 0,
                  sixes: 0,
                  thisSpell: "",
                  matches: 0,
                  careerWickets: 0,
                  bestBowling: "",
                  average: 0,
                  ...bowler
                };
                
                // Calculate economy rate
                const oversValue = typeof safeBowler.overs === 'string' 
                  ? parseFloat(safeBowler.overs.replace('.', '.')) 
                  : safeBowler.overs;
                const economy = oversValue > 0 
                  ? (safeBowler.runs / oversValue).toFixed(2) 
                  : 0;
                
                return (
                  <tr key={index} className="border-b">
                    <td className="py-2 text-blue-600 font-medium">
                      {safeBowler.name} ({safeBowler.bowlingStyle})
                    </td>
                    <td className="py-2">{safeBowler.overs}</td>
                    <td className="py-2">{safeBowler.maidens}</td>
                    <td className="py-2">{safeBowler.runs}</td>
                    <td className="py-2">{safeBowler.wickets}</td>
                    <td className="py-2">{economy}</td>
                    <td className="py-2">{safeBowler.dots}</td>
                    <td className="py-2">{safeBowler.fours}</td>
                    <td className="py-2">{safeBowler.sixes}</td>
                    <td className="py-2">{safeBowler.thisSpell}</td>
                    <td className="py-2">{safeBowler.matches}</td>
                    <td className="py-2">{safeBowler.careerWickets}</td>
                    <td className="py-2">{safeBowler.bestBowling}</td>
                    <td className="py-2">{safeBowler.average}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        <div className="mt-4 text-sm text-gray-700">
          <p>
            <span className="font-medium">Partnership:</span> {partnership.runs} Runs, {partnership.balls} B (RR: {partnership.runRate}) • 
            <span className="font-medium"> Last Bat:</span> {safeLastBat.name} {safeLastBat.runs} ({safeLastBat.balls}b) • 
            <span className="font-medium"> FOW:</span> {fallOfWicket.score}/{fallOfWicket.wicket} ({fallOfWicket.overs} Ov)
          </p>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm">
            <span className="font-medium">Reviews Remaining:</span> {safeTeamA.name} - {safeReviews.teamA?.remaining || 0} of {safeReviews.teamA?.total || 0}, 
            {safeTeamB.name} - {safeReviews.teamB?.remaining || 0} of {safeReviews.teamB?.total || 0}
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <span className="bg-gray-200 rounded-full px-2 py-1 mr-2">DRS</span>
          </div>
        </div>
      </div>
    </div>
  );
}