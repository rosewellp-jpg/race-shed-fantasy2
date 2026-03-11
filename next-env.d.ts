import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const importsDir = path.join(root, 'imports');
const dataFile = path.join(root, 'data', 'league-data.json');

function exists(file) {
  return fs.existsSync(path.join(importsDir, file));
}

const summary = {
  importsFound: ['setup.csv', 'race_schedule.csv', 'weekly_picks.csv', 'race_results.csv', 'drivers.csv'].filter(exists),
  dataFile,
  note: 'Starter sync script only reports import availability. Extend this script to map your exact commissioner workbook columns into league-data.json.',
};

fs.writeFileSync(path.join(root, 'imports', 'last-sync-report.json'), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
