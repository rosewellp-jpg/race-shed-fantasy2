export type Driver = { carNumber: number; name: string; team: string };
export type Result = { position: number; carNumber: number };
export type Race = {
  id: number;
  week: number;
  name: string;
  track: string;
  date: string;
  status: 'completed' | 'upcoming';
  winnerCar: number | null;
  results: Result[];
};
export type Pick = { raceId: number; player: string; cars: number[] };
export type LeagueData = {
  league: {
    name: string;
    season: number;
    entryFee: number;
    corePlayers: string[];
    occasionalPlayers: string[];
  };
  pointsTable: Record<string, number>;
  drivers: Driver[];
  races: Race[];
  picks: Pick[];
};
