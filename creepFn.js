/**
 * Currently unused, need to repurpose for main.js to find sources and assign during the spawning phase
 */

let creepFn = {
  DetermineSource: function (creep) {
    let sources = creep.room.find(FIND_SOURCES);
    let source = undefined;
    const CreepsInArea = Game.rooms["E29N19"].lookForAtArea(LOOK_CREEPS, 7, 38, 7, 39, true).length;
    if (creep.memory.source == undefined || CreepsInArea < 2) {
      creep.memory.source = sources[1];
    } else {
      creep.memory.source = sources[0];
    }
    source = creep.memory.source.id;
    return source;
  },
};

module.exports = creepFn;
