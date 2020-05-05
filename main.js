/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
require('./prototype.spawnManager');

// eslint-disable-next-line func-names
module.exports.loop = function () {
  /**
   * Memory Cleanup
   * Iterates of Memory, and checks to see if the name in Memory is present in the Game
   * If it is not, it deletes it from Memory.
   */
  for (const name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }

  // for each spawn
  for (const spawnName in Game.spawns) {
    // run spawn logic
    Game.spawns[spawnName].spawnCreepsIfNecessary();
  }

  const tower = Game.getObjectById('5eb0dde217e4ca600b488c16');
  if (tower) {
    const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (closestHostile) {
      tower.attack(closestHostile);
    }
    const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (structure) => structure.hits < structure.hitsMax && structure.hits < 5000,
    });
    if (closestDamagedStructure && tower.store.energy > 500) {
      tower.repair(closestDamagedStructure);
    }
  }

  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    if (creep.memory.role == 'harvester') {
      roleHarvester.run(creep);
    }
    if (creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep);
    }
    if (creep.memory.role == 'builder') {
      roleBuilder.run(creep);
    }
  }
};
