# RACE-SHED-FANTASY

A NASCAR fantasy league app built to pair with an Excel commissioner workbook and deploy cleanly to GitHub + Vercel.

## What is included

- Dashboard home page
- TV leaderboard page
- Race schedule page
- Weekly picks page
- Race results page
- Driver stats page
- Commissioner admin page
- Starter data model in `data/league-data.json`
- Starter CSV sync workflow in `scripts/sync-data.mjs`

## Current starter data loaded

This build includes a seed version of your 2026 league with:

- League name: `RACE-SHED-FANTASY`
- Core players: Meg, Pat, Darin, Alz, Joe
- Occasional players: Deric, Eve
- Tracked races: COTA and Phoenix
- Picks/results based on the details provided so far

You should replace or expand the starter data with your full commissioner workbook history.

## Local setup

```bash
npm install
npm run dev
```

## Weekly update workflow

1. Update your Excel commissioner workbook.
2. Export updated tabs to CSV.
3. Drop those CSV files into `/imports`.
4. Run `npm run sync:data`.
5. Update `data/league-data.json` directly or extend the sync script to convert CSV files automatically.
6. Commit and push to GitHub.
7. Vercel redeploys the site.

## GitHub setup

```bash
git init
git add .
git commit -m "Initial RACE-SHED-FANTASY build"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## Vercel deployment

1. Import the GitHub repo into Vercel.
2. Framework preset: `Next.js`
3. Build command: `next build`
4. Output setting: leave default for Next.js.
5. Deploy.

## Important note about data updates

This starter version is deploy-ready, but Vercel will not let you edit live data from the browser unless you add a real backend or database.

Right now this project is designed for a commissioner workflow like this:

- Excel is your source of truth
- GitHub stores the latest app data
- Vercel publishes the latest push

That is the fastest and cleanest first version.

## Recommended next upgrades

- Commissioner upload page with CSV parser
- Supabase or Neon database for live updates without commits
- Password-protected admin tools
- Player cards and driver heat maps
- Prize money tracker and weekly payout ledger
