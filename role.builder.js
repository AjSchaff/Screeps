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

const roleBuilder = {
  /**
   * @param {Creep} creep
   */
  run(creep) {
    const source = creep.memory.source.id;
    creep.determineIfWorking();

    if (creep.memory.working) {
      const buildTarget = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
      const mostDamagedStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s) => s.hits < s.hitsMax && s.structureType !== STRUCTURE_WALL,
      });

      if (buildTarget) {
        if (creep.build(buildTarget) === ERR_NOT_IN_RANGE) {
          creep.moveTo(buildTarget, {
            visualizePathStyle: { stroke: '#ffffff' },
          });
        }
      } else if (mostDamagedStructure) {
        if (creep.repair(mostDamagedStructure) === ERR_NOT_IN_RANGE) {
          creep.moveTo(mostDamagedStructure, {
            visualizePathStyle: { stroke: '#ffffff' },
          });
        }
      }
    } else {
      creep.gatherEnergy(true, source);
    }
  },
};

module.exports = roleBuilder;
