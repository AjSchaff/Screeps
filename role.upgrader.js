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

const roleUpgrader = {
  /**
   * @param {Creep} creep
   */
  run(creep) {
    const source = creep.memory.source.id;
    creep.determineIfWorking();

    if (creep.memory.working) {
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, {
          visualizePathStyle: { stroke: '#ffffff' },
        });
      }
    } else {
      creep.gatherEnergy(true, source);
    }
  },
};

module.exports = roleUpgrader;
