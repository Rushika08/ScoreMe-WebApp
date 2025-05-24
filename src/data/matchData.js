const mockMatchData = {
  "33": {
    matchInfo: {
      number: "33",
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
    batsmen: [
      {
        name: "Virat Kohli",
        runs: 68,
        balls: 48,
        fours: 6,
        sixes: 2,
        notOut: true
      },
      {
        name: "Faf du Plessis",
        runs: 42,
        balls: 32,
        fours: 5,
        sixes: 1,
        notOut: false
      }
    ],
    bowlers: [
      {
        name: "Sunil Narine",
        overs: 4,
        runs: 22,
        wickets: 2
      },
      {
        name: "Varun Chakravarthy",
        overs: 4,
        runs: 35,
        wickets: 1
      }
    ],
    lastBat: {
      name: "Glenn Maxwell",
      runs: 15,
      balls: 10
    },
    reviews: {
      teamA: { remaining: 1, total: 2 },
      teamB: { remaining: 1, total: 2 }
    }
  },

  "12": {
    matchInfo: {
      number: "12",
      type: "ODI",
      location: "Mumbai",
      date: "2025-03-20",
      tournament: "Champions Trophy",
      totalOvers: "50"
    },
    teamA: {
      name: "India",
      score: 287,
      wickets: 6,
      overs: "50.0"
    },
    teamB: {
      name: "Australia",
      score: 250,
      wickets: 9,
      overs: "50.0"
    },
    currentInnings: {
      battingTeam: "India",
      bowlingTeam: "Australia"
    },
    batsmen: [
      {
        name: "Rohit Sharma",
        runs: 75,
        balls: 61,
        fours: 8,
        sixes: 2,
        notOut: false
      },
      {
        name: "Shubman Gill",
        runs: 58,
        balls: 67,
        fours: 6,
        sixes: 1,
        notOut: true
      }
    ],
    bowlers: [
      {
        name: "Pat Cummins",
        overs: 10,
        runs: 52,
        wickets: 2
      },
      {
        name: "Adam Zampa",
        overs: 10,
        runs: 48,
        wickets: 1
      }
    ],
    lastBat: {
      name: "KL Rahul",
      runs: 34,
      balls: 29
    },
    reviews: {
      teamA: { remaining: 2, total: 2 },
      teamB: { remaining: 1, total: 2 }
    }
  }
};

export default mockMatchData;
