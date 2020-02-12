# Personal Record
A web application to log running workouts.

## Description
A simple log for anyone to sign up and keep a log of their running workouts and track their mileage. Back-end: API via Express/Node/MongoDB/Mongoose. Front-end: React/SCSS modules.

## MVP Goals
- Users can create an account or log in to their existing account
- Once logged in, users can create an entry for a new workout, view past workouts on a calendar, and edit or delete old workouts

## Next steps
- Dashboard shows rolling weekly/monthly total mileage, plus year-to-date and overall totals
- Options for Calendar or List views
- Expand API to allow more data (kilometer splits, heart rate, weather conditions, perceived effort)
- Add shoe data type to allow tracking mileage on footwear

## Stretch Goals
- Ability to import tcx files from running apps & watches
- Plot gps routes from those files on a map using Leaflet
- Bulk import and export of records
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