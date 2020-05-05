/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */

let creepFn = require("creepFn");

var roleBuilder = {
  /** @param {Creep} creep **/
  run: function (creep) {
    let source = creep.memory.source.id;
    if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.building = false;
      creep.say("🔄 harvest");
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
      creep.memory.building = true;
      creep.say("🚧 build");
    }

    if (creep.memory.building) {
      var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
      if (creep.build(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, {
          visualizePathStyle: { stroke: "#ffffff" },
        });
      }
    } else {
      if (creep.harvest(Game.getObjectById(source)) !== OK) {
        creep.moveTo(Game.getObjectById(source), {
          visualizePathStyle: { stroke: "#ffaa00" },
        });
      }
    }
  },
};

module.exports = roleBuilder;
