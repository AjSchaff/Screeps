/* eslint-disable no-undef */
StructureTower.prototype.serveAndProtect = function () {
  const closestHostile = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  const mostDamagedStructure = this.room.find(FIND_STRUCTURES, {
    filter: (s) => s.hits < s.hitsMax,
  });
  mostDamagedStructure.sort((a, b) => a.hits - b.hits);

  if (closestHostile) {
    this.attack(closestHostile);
  } else if (mostDamagedStructure && this.store.energy > 500) {
    this.repair(mostDamagedStructure[0]);
  }
};
