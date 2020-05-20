/* eslint-disable no-undef */
/**
 */

const spawnFn = {
  determineSource(room) {
    // find all creeps in room
    /** @type {Array.<Creep>} */
    const creepsInRoom = room.find(FIND_MY_CREEPS);
    const SourcesInRoom = room.find(FIND_SOURCES);
    const creepsAtSource = _.sum(creepsInRoom, (c) => c.memory.source.id === SourcesInRoom[1].id);

    let source;
    if (creepsAtSource >= 3) {
      // eslint-disable-next-line prefer-destructuring
      source = SourcesInRoom[0];
    } else {
      // eslint-disable-next-line prefer-destructuring
      source = SourcesInRoom[1];
    }

    return source;
  },
  determineContainer(room, spawn) {
    /**
     * Determine which container should be set in memory for the harvesters spawned.
     */
    console.log(spawn.memory.minCreeps.harvester);
    const containers = room.find(FIND_STRUCTURES, {
      filter: (s) => s.structureType === STRUCTURE_CONTAINER,
    });
    console.log(containers);
  },
};

module.exports = spawnFn;
