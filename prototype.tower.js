/* eslint-disable no-undef */
StructureTower.prototype.serveAndProtect = function () {
  const closestHostile = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  if (closestHostile) {
    this.attack(closestHostile);
  }
  const closestDamagedStructure = this.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: (s) => s.hits < s.hitsMax && s.structureType !== STRUCTURE_WALL,
  });
  if (closestDamagedStructure && this.store.energy > 500) {
    this.repair(closestDamagedStructure);
  }
};
