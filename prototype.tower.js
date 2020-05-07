/* eslint-disable no-undef */
StructureTower.prototype.serveAndProtect = function () {
  const closestHostile = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  if (closestHostile) {
    this.attack(closestHostile);
  }
  const closestDamagedStructure = this.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: (structure) => structure.hits < structure.hitsMax && structure.hits < 10000,
  });
  if (closestDamagedStructure && this.store.energy > 500) {
    this.repair(closestDamagedStructure);
  }
};
