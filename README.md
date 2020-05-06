# Intro:

This Repo is broken into two branches:

- master -> COVID in screeps
- COVID_LLE -> COVID-LLE in screeps

Do all work in COVID_LLE so that if it breaks, I can always run master in the game. Once code is confirmed working in COVID_LLE, it is pulled into master.

### TODO:

- [ ] Move tower logic out of main.js and into a tower prototype fn
- [ ] Move runCreep logic out of main.js and into creep prototype
- [ ] DRY On creep logic, extract the reusable fn's from each creep type and add to creep prototype
