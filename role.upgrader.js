let creepFn = require("creepFn");

let roleUpgrader = {
  /** @param {Creep} creep **/
  run: function (creep) {
    let source = creep.memory.source.id;
    if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.upgrading = false;
      creep.say("🔄 harvest");
    }
    if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
      creep.memory.upgrading = true;
      creep.say("⚡ upgrade");
    }

    if (creep.memory.upgrading) {
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, {
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

module.exports = roleUpgrader;
