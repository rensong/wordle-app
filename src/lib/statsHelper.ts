export type StatsData = {
  gamesPlayed: number,
  gamesWon: number,
  currentStreak: number,
  maxStreak: number,
  distribution: number[],
};

export const calculateStatsData = (data: any) => {
  if (!data) {
    return {
      gamesPlayed: 0,
      gamesWon: 0,
      currentStreak: 0,
      maxStreak: 0,
      distribution: [0, 0, 0, 0, 0, 0],
    };
  }
  return {
    gamesPlayed: data["games_played"],
    gamesWon: data["games_won"],
    currentStreak: data["current_streak"],
    maxStreak: data["max_streak"],
    distribution: data["guess_distribution"],
  };
};
