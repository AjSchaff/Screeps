# Intro:

This Repo is broken into two branches:

- master -> COVID in screeps
- COVID_LLE -> COVID-LLE in screeps

Do all work in COVID_LLE so that if it breaks, I can always run master in the game. Once code is confirmed working in COVID_LLE, it is pulled into master.

### TODO:

- [x] Move tower logic out of main.js and into a tower prototype fn
- [x] Move runCreep logic out of main.js and into creep prototype
- [x] DRY On creep logic, extract the reusable fn's from each creep type and add to creep prototype
- [ ] Have creeps withdraw from Storage if sources are empty
- [ ] Change check of creepsInArea to check creep memory instead, and only allow 3 to be allocated to source with 2 mining locations
- [ ] Set up Harvesters to `harvest` and `drop` in `containers`
  - [ ] Set up all other roles to check if a `container` is present, and if yes, `withdraw` from `container` instead of `harvest`
  - [ ] Create new `role` to `withdraw` from container, and `transfer` to `extensions`, `towers`, and `spawn`
- [ ] Change screep memory if screepsInArea > 2
