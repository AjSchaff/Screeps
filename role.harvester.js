/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */

const roleHarvester = {
  /**
   * @param {Creep} creep
   */
  run(creep) {
    const source = creep.memory.source.id;
    if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.working = false;
      creep.say('🔄 harvest');
    }
    if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
      creep.memory.working = true;
      creep.say('🚧 delivery');
    }

    if (creep.memory.working) {
      const PriorityTargets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) =>
          (structure.structureType === STRUCTURE_EXTENSION ||
            structure.structureType === STRUCTURE_SPAWN) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0,
      });
      // console.log('priority targets: ', PriorityTargets);
      const SecondaryTargets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
          return (
            structure.structureType === STRUCTURE_TOWER &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          );
        },
      });
      if (PriorityTargets) {
        // console.log('here');
        // console.log('free energy: ', creep.store.getCapacity());
        if (creep.transfer(PriorityTargets, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(PriorityTargets, {
            visualizePathStyle: { stroke: '#00FF00' },
          });
        }
      } else if (SecondaryTargets) {
        // console.log('her2e');
        if (creep.transfer(SecondaryTargets, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(SecondaryTargets, {
            visualizePathStyle: { stroke: '#00FF00' },
          });
        }
      }
    } else {
      if (creep.harvest(Game.getObjectById(source)) !== OK) {
        creep.moveTo(Game.getObjectById(source), {
          visualizePathStyle: { stroke: '#ff0000' },
        });
      }
    }
  },
};

module.exports = roleHarvester;
