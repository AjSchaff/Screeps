const listOfRoles = ["harvester", "builder", "upgrader"];

StructureSpawn.prototype.spawnCreepsIfNecessary = function () {
  /**
   * @type {Room}
   */
  let room = this.room;
  console.log('this room is: ', room):

  // find all creeps in room
  /** @type {Array.<Creep>} */
  let creepsInRoom = room.find(FIND_MY_CREEPS);

  // count the number of creeps alive for each role in this room
  // _.sum will count the number of properties in Game.creeps filtered by the
  //  arrow function, which checks for the creep being a specific role
  /** @type {Object.<string, number>} */
  // let numberOfCreeps = {};
  // for (let role of listOfRoles) {
  //   numberOfCreeps[role] = _.sum(creepsInRoom, (c) => c.memory.role == role);
  // }

  // if (numberOfCreeps["harvester"] < Memory.spawns[spawn].minCreeps.harvester) {
  //   Harvester.test();
  // }
};
