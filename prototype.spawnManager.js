/* eslint-disable no-undef */
const listOfRoles = ['harvester', 'builder', 'upgrader'];

StructureSpawn.prototype.spawnCreepsIfNecessary = function () {
  /**
   * @type {Room}
   */
  const { room } = this;
  const spawn = this.name;

  // find all creeps in room
  /** @type {Array.<Creep>} */
  const creepsInRoom = room.find(FIND_MY_CREEPS);
  const SourcesInRoom = room.find(FIND_SOURCES);
  const creepsAtSource = _.sum(creepsInRoom, (c) => c.memory.source.id === SourcesInRoom[1].id);

  let source;
  if (creepsAtSource >= 3) {
    source = SourcesInRoom[0];
  } else {
    source = SourcesInRoom[1];
  }

  const body = [];
  let creepSegments = Math.floor((room.energyAvailable - 50 / 50) / 200);
  creepSegments = creepSegments <= 3 ? undefined : creepSegments > 4 ? 5 : creepSegments;
  for (let i = 0; i < creepSegments; i += 1) {
    body.push(WORK, CARRY, MOVE);
  }
  const numberOfCreeps = {};

  console.log(body);

  // count the number of creeps alive for each role in this room
  // _.sum will count the number of properties in Game.creeps filtered by the
  //  arrow function, which checks for the creep being a specific role
  /** @param role {Object.<string, number>} */
  listOfRoles.forEach((role) => {
    numberOfCreeps[role] = _.sum(creepsInRoom, (c) => c.memory.role === role);
    if (role === 'harvest' && numberOfCreeps[`${role}`] === 0) {
      const name = `${role}${Game.time.toString().slice(-2)}`;
      Game.spawns[spawn].spawnCreep(body || [WORK, CARRY, MOVE], name, {
        memory: { role: `${role}`, source },
      });
    }
    if (numberOfCreeps[`${role}`] < this.memory.minCreeps[role]) {
      const name = `${role}${Game.time.toString().slice(-2)}`;
      Game.spawns[spawn].spawnCreep(body, name, {
        memory: { role: `${role}`, source },
      });
    }
  });

  if (Game.spawns[spawn].spawning) {
    const spawningCreep = Game.creeps[Game.spawns[spawn].spawning.name];
    Game.spawns[spawn].room.visual.text(
      `🛠️ ${spawningCreep.memory.role}`,
      Game.spawns[spawn].pos.x + 1,
      Game.spawns[spawn].pos.y,
      { align: 'left', opacity: 0.8 },
    );
  }
};
