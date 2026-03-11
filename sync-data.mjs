import rawData from '@/data/league-data.json';
import { LeagueData } from '@/lib/types';

const data = rawData as LeagueData;

export function getLeagueData() {
  return data;
}

export function getDriverName(carNumber: number) {
  return data.drivers.find((driver) => driver.carNumber === carNumber)?.name ?? `Car ${carNumber}`;
}

export function getPointsForPosition(position?: number) {
  if (!position) return 0;
  return data.pointsTable[String(position)] ?? 0;
}

export function getRaceById(raceId: number) {
  return data.races.find((race) => race.id === raceId);
}

export function getResultPosition(raceId: number, carNumber: number) {
  const race = getRaceById(raceId);
  return race?.results.find((result) => result.carNumber === carNumber)?.position;
}

export function scorePick(raceId: number, carNumber: number) {
  return getPointsForPosition(getResultPosition(raceId, carNumber));
}

export function buildPlayerStandings() {
  const allPlayers = [...data.league.corePlayers, ...data.league.occasionalPlayers];
  const completedRaces = data.races.filter((race) => race.status === 'completed');

  return allPlayers
    .map((player) => {
      const playerPicks = data.picks.filter((pick) => pick.player === player);
      const totalPoints = playerPicks.reduce((sum, pick) => {
        return sum + pick.cars.reduce((raceSum, car) => raceSum + scorePick(pick.raceId, car), 0);
      }, 0);
      const playedWeeks = playerPicks.length;
      const feesPaid = playedWeeks * data.league.entryFee;
      const wins = completedRaces.filter((race) => {
        const weeklyTotals = data.picks
          .filter((pick) => pick.raceId === race.id)
          .map((pick) => ({
            player: pick.player,
            total: pick.cars.reduce((sum, car) => sum + scorePick(race.id, car), 0),
          }))
          .sort((a, b) => b.total - a.total);
        return weeklyTotals[0]?.player === player;
      }).length;

      return {
        player,
        tier: data.league.corePlayers.includes(player) ? 'Core' : 'Occasional',
        playedWeeks,
        feesPaid,
        wins,
        totalPoints,
        average: playedWeeks ? Number((totalPoints / playedWeeks).toFixed(1)) : 0,
      };
    })
    .filter((row) => row.playedWeeks > 0 || row.tier === 'Core')
    .sort((a, b) => b.totalPoints - a.totalPoints);
}

export function buildWeeklySummary() {
  return data.races
    .filter((race) => race.status === 'completed')
    .map((race) => {
      const entries = data.picks
        .filter((pick) => pick.raceId === race.id)
        .map((pick) => ({
          player: pick.player,
          cars: pick.cars,
          total: pick.cars.reduce((sum, car) => sum + scorePick(race.id, car), 0),
        }))
        .sort((a, b) => b.total - a.total);

      return {
        race,
        winner: entries[0]?.player ?? 'TBD',
        entries,
      };
    });
}

export function buildDriverStats() {
  return data.drivers
    .map((driver) => {
      const finishes = data.races
        .filter((race) => race.status === 'completed')
        .map((race) => race.results.find((result) => result.carNumber === driver.carNumber)?.position)
        .filter((value): value is number => typeof value === 'number');

      const picks = data.picks.flatMap((pick) => pick.cars.filter((car) => car === driver.carNumber));

      return {
        ...driver,
        startsTracked: finishes.length,
        bestFinish: finishes.length ? Math.min(...finishes) : null,
        averageFinish: finishes.length
          ? Number((finishes.reduce((sum, finish) => sum + finish, 0) / finishes.length).toFixed(1))
          : null,
        timesPicked: picks.length,
      };
    })
    .sort((a, b) => (a.bestFinish ?? 999) - (b.bestFinish ?? 999) || b.timesPicked - a.timesPicked);
}
