const mockMatchData = {
    "33": {
      matchInfo: {
        number: "34",
        type: "T20",
        location: "Chennai",
        date: "2025-04-14",
        tournament: "IPL 2025",
        totalOvers: "20"
      },
      teamA: {
        name: "RCB",
        score: 178,
        wickets: 5,
        overs: "20.0"
      },
      teamB: {
        name: "KKR",
        score: 142,
        wickets: 8,
        overs: "20.0"
      },
      currentInnings: {
        battingTeam: "RCB",
        bowlingTeam: "KKR"
      },
      batsmen: [],
      bowlers: [],
      lastBat: null,
      reviews: {
        teamA: { remaining: 1, total: 2 },
        teamB: { remaining: 1, total: 2 }
      }
    },
  
    // Existing entry
    "match-001": {
      // ...
    }
  };
  
  export default mockMatchData;
  