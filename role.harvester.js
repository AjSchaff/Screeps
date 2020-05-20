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
    const { source } = creep.memory;
    creep.determineIfWorking();

    // determine the list of container ID's and compare it to the creeps list of memory ID's
    // If the container id is already in memory, don't assign it, if it isn't
    // assign it to the creep and have him harvest there.

    if (creep.memory.working) {
      const dropOffPoint = creep.determineDropOffPoint(source);
      // This isn't quite ready yet, need to create Lorry role to fill up the spawns and extensions
      // So that Harvesters can do this.
      // if (dropOffPoint) {
      //   dropOffPoint.forEach((container) => {
      //     if (container.store.getFreeCapacity() > creep.store.getCapacity()) {
      //       if (creep.pos.isEqualTo(container.pos)) {
      //         creep.drop(RESOURCE_ENERGY);
      //       }
      //       // if (!creep.pos.isEqualTo(container.pos)) {
      //       //   console.log('creep: ', creep);
      //       //   console.log('container: ', container);
      //       // }
      //     }
      //   });
      // }
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
            structure.store.getFreeCapacity(RESOURCE_ENERGY) >= creep.store.getCapacity()
          );
        },
      });
      const TertiaryTargets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) =>
          structure.structureType === STRUCTURE_STORAGE &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0,
      });
      if (PriorityTargets || SecondaryTargets || TertiaryTargets) {
        if (
          creep.transfer(
            PriorityTargets || SecondaryTargets || TertiaryTargets,
            RESOURCE_ENERGY,
          ) === ERR_NOT_IN_RANGE
        ) {
          creep.moveTo(PriorityTargets || SecondaryTargets || TertiaryTargets, {
            visualizePathStyle: { stroke: '#00FF00' },
          });
        }
      }
    } else if (creep.harvest(Game.getObjectById(source.id)) !== OK) {
      creep.moveTo(Game.getObjectById(source.id), {
        visualizePathStyle: { stroke: '#ff0000' },
      });
    }
  },
};

module.exports = roleHarvester;
