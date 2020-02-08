# Project Proposal
A log to keep track of running workouts.

## Project Name
Working name is just Run Log, I'm sure I'll come up with a stupid pun sooner or later

## Description
A simple log for anyone to sign up and keep a log of their running workouts and track their mileage. Express/node/mongoDB/mongoose back-end, React front-end.

## MVC Goals
- Users can create an account or log in to their existing account
- Once logged in, users can create an entry for a new workout, view past workouts on a calendar, and edit or delete old workouts
- Users can see their rolling weekly/monthly total mileage, plus year-to-date and overall totals

## Stretch Goals
- Ability to import tcx files from running apps & watches
- Plot those tcx files on a map using Leaflet
- Ability to run reports on records

## Route structure
- Home: /
- Login: /login
- Signup: /signup
- User: /users/:userId/profile
- Dashboard: /users/:userId
- Runs (all, list view): /users/:userId/runs
- Run (individual, detail): /users/:userId/runs/:runId
- Run (individual, edit): /users/:userId/runs/:runId/edit
- Run (individual, add): /users/:userId/runs/add