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
};

module.exports = spawnFn;
