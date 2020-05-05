const listOfRoles = ["harvester", "builder", "upgrader"];

StructureSpawn.prototype.spawnCreepsIfNecessary = function () {
  /**
   * @type {Room}
   */
  const room = this.room;
  const spawn = this.name;

  // find all creeps in room
  /** @type {Array.<Creep>} */
  const creepsInRoom = room.find(FIND_MY_CREEPS);

  const CreepsInArea = room.lookForAtArea(LOOK_CREEPS, 7, 38, 7, 39, true).length;
  const SourcesInRoom = room.find(FIND_SOURCES);
  let source = undefined;
  if (CreepsInArea > 2) {
    source = SourcesInRoom[0];
  } else {
    source = SourcesInRoom[1];
  }

  // count the number of creeps alive for each role in this room
  // _.sum will count the number of properties in Game.creeps filtered by the
  //  arrow function, which checks for the creep being a specific role
  /** @type {Object.<string, number>} */
  let numberOfCreeps = {};
  for (let role of listOfRoles) {
    numberOfCreeps[role] = _.sum(creepsInRoom, (c) => c.memory.role == role);
    if (numberOfCreeps[`${role}`] < this.memory.minCreeps[role]) {
      let name = `${role}${Game.time.toString().slice(-2)}`;
      Game.spawns[spawn].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE], name, {
        memory: { role: `${role}`, source: source },
      });
    }
  }

  if (Game.spawns[spawn].spawning) {
    var spawningCreep = Game.creeps[Game.spawns[spawn].spawning.name];
    Game.spawns[spawn].room.visual.text(
      "🛠️" + spawningCreep.memory.role,
      Game.spawns[spawn].pos.x + 1,
      Game.spawns[spawn].pos.y,
      { align: "left", opacity: 0.8 }
    );
  }
};
