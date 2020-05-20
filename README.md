# Intro:

This Repo is broken into two branches:

- master -> COVID in screeps
- COVID_LLE -> COVID-LLE in screeps

Do all work in COVID_LLE so that if it breaks, I can always run master in the game. Once code is confirmed working in COVID_LLE, it is pulled into master.

### TODO:

- [x] Move tower logic out of main.js and into a tower prototype fn
- [x] Move runCreep logic out of main.js and into creep prototype
- [x] DRY On creep logic, extract the reusable fn's from each creep type and add to creep prototype
- [x] Change screep memory if screepsInArea > 2
- [x] Change check of creepsInArea to check creep memory instead, and only allow 3 to be allocated to source with 2 mining locations
- [x] Set Towers and Builders to repair mostDamagedStructure
- [ ] Set up Harvesters to `harvest` and `drop` in `containers`
- [x] Have creeps withdraw from Storage if sources are empty
  - [x] Set up all other roles to check if a `container` is present, and if yes, `withdraw` from `container` instead of `harvest`
  - [ ] Create new `role` to `withdraw` from container, and `transfer` to `extensions`, `towers`, and `spawn`

If container.id is not assiged to a creeps memory, spawn the next harvester with that id.
creep them moves to that id until in range.
creep then harvests at that container until dead, and drops in it
