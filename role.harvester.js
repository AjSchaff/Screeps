/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */

let creepFn = require("creepFn");

let roleHarvester = {
  /** @param {Creep} creep **/
  run: function (creep) {
    let source = creep.memory.source.id;
    if (creep.store.getFreeCapacity() > 0) {
      if (creep.harvest(Game.getObjectById(source)) !== OK) {
        console.log(creep.harvest(Game.getObjectById(source)));
        creep.moveTo(Game.getObjectById(source), {
          visualizePathStyle: { stroke: "#ff0000" },
        });
      }
    } else {
      let PriorityTargets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (
            (structure.structureType == STRUCTURE_EXTENSION ||
              structure.structureType == STRUCTURE_SPAWN) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          );
        },
      });
      let SecondaryTargets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (
            structure.structureType == STRUCTURE_TOWER &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          );
        },
      });
      if (PriorityTargets.length > 0) {
        if (creep.transfer(PriorityTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(PriorityTargets[0], {
            visualizePathStyle: { stroke: "#00FF00" },
          });
        }
      } else if (SecondaryTargets.lengty > 0) {
        if (creep.transfer(SecondaryTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(SecondaryTargets[0], {
            visualizePathStyle: { stroke: "#00FF00" },
          });
        }
      } else {
        creep.moveTo(Game.spawns.Spawn1);
      }
    }
  },
};

module.exports = roleHarvester;
