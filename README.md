# Personal Record
A web application to log running workouts.

## Note:
This was created as part of Juno College's "Full Stack Masterclass", and the front-end was thrown together at the last minute for demo purposes – there's a newer version! V2 has been completely re-written to use Apollo GraphQL on the backend, and has a much more robust front end. It's here: https://github.com/derekmurr/personal-record-v2

## Description
A simple log for anyone to sign up and keep a log of their running workouts and track their mileage. Back-end: API via Express/Node/MongoDB/Mongoose. Front-end: React/Redux/styled-components.

## Updates
July 14, 2020: 
- Dashboard page is now default view on login, showing graph of previous 2 weeks' runs and list of upcoming week's scheduled runs
- Also, scheduled runs are a thing now: any run created with a date in the future is automatically considered a "planned run" which only appears on the calendar and can't have duration/rating/weather/race placement added until it's marked as complete
July 10, 2020: 
- Bug fixes and redesigned run details page, with a graph indicator for rating/effort

## MVP Goals
- Users can create an account or log in to their existing account (done!)
- Once logged in, users can create an entry for a new workout, view past workouts on a calendar, and edit or delete old workouts (done!)

## Next steps
- Dashboard shows rolling weekly/monthly total mileage, plus year-to-date and overall totals (done!)
- Options for Calendar or List views (done!)
- Expand API to allow more data (kilometer splits, heart rate, weather conditions, perceived effort) (done!)
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
