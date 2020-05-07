/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
require('./prototype.spawnManager');
require('./prototype.tower');

// eslint-disable-next-line func-names
module.exports.loop = function () {
  /**
   * Memory Cleanup
   * Iterates of Memory, and checks to see if the name in Memory is present in the Game
   * If it is not, it deletes it from Memory.
   */
  Object.keys(Memory.creeps).forEach((name) => {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  });

  // For each Spawn, determine if spawning a new creep is necessary
  Object.keys(Game.spawns).forEach((spawn) => {
    // run spawn logic
    Game.spawns[spawn].spawnCreepsIfNecessary();
  });

  // For each room, run the Tower logic.
  Object.keys(Game.rooms).forEach((room) => {
    const towersInRoom = Game.rooms[room].find(FIND_MY_STRUCTURES, {
      filter: (s) => s.structureType === STRUCTURE_TOWER,
    });
    towersInRoom.forEach((tower) => {
      tower.serveAndProtect();
    });
  });

  Object.keys(Game.creeps).forEach((name) => {
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
  });
};
