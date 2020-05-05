let roleHarvester = require("role.harvester");
let roleUpgrader = require("role.upgrader");
let roleBuilder = require("role.builder");
// require("prototype.spawnManager");

module.exports.loop = function () {
  /**
   * Memory Cleanup
   * Iterates of Memory, and checks to see if the name in Memory is present in the Game
   * If it is not, it deletes it from Memory.
   */
  for (let name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log("Clearing non-existing creep memory:", name);
    }
  }

  // // for each spawn
  // for (let spawnName in Game.spawns) {
  //   console.log("Spawns I control: ", spawnName);
  //   // run spawn logic
  //   // Game.spawns[spawnName].spawnCreepsIfNecessary();
  // }

  var tower = Game.getObjectById("5eb0dde217e4ca600b488c16");
  if (tower) {
    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    console.log("closest hostile: ", closestHostile);
    if (closestHostile) {
      tower.attack(closestHostile);
    }
    var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (structure) => structure.hits < structure.hitsMax && structure.hits < 5000,
    });
    if (closestDamagedStructure && tower.store.energy > 500) {
      tower.repair(closestDamagedStructure);
    }
  }

  // TODO:
  // Look at the curent room from memory,
  // determine how mnay screeps can be at each source from memory
  const CreepsInArea = Game.rooms["E29N19"].lookForAtArea(LOOK_CREEPS, 7, 38, 7, 39, true).length;
  console.log("creeps in area: ", CreepsInArea);

  const SourcesInRoom = Game.rooms["E29N19"].find(FIND_SOURCES);
  let source = undefined;
  if (CreepsInArea > 2) {
    source = SourcesInRoom[1];
  } else {
    source = SourcesInRoom[0];
  }

  // TODO:
  /**
   * For now, I'm hard coding the sources for the type of woker so that the
   * builders all go towards the accesible source so they can quickly build a tower
   * Should eventually be changed out with `${source}`
   */
  var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == "harvester");
  if (harvesters.length < 2) {
    var newName = "Harvester" + Game.time;
    console.log("Spawning new harvester: " + newName);
    Game.spawns["Spawn1"].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE], newName, {
      memory: { role: "harvester", source: SourcesInRoom[0] },
    });
  }
  var builders = _.filter(Game.creeps, (creep) => creep.memory.role == "builder");

  if (builders.length < 1) {
    var newName = "Builder" + Game.time;
    console.log("Spawning new builder: " + newName);
    Game.spawns["Spawn1"].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE], newName, {
      memory: { role: "builder", source: SourcesInRoom[1] },
    });
  }

  var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == "upgrader");

  if (upgraders.length < 1) {
    var newName = "Upgrader" + Game.time;
    console.log("Spawning new upgrader: " + newName);
    Game.spawns["Spawn1"].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE], newName, {
      memory: { role: "upgrader", source: SourcesInRoom[1] },
    });
  }

  if (Game.spawns["Spawn1"].spawning) {
    var spawningCreep = Game.creeps[Game.spawns["Spawn1"].spawning.name];
    Game.spawns["Spawn1"].room.visual.text(
      "🛠️" + spawningCreep.memory.role,
      Game.spawns["Spawn1"].pos.x + 1,
      Game.spawns["Spawn1"].pos.y,
      { align: "left", opacity: 0.8 }
    );
  }

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.memory.role == "harvester") {
      roleHarvester.run(creep);
    }
    if (creep.memory.role == "upgrader") {
      roleUpgrader.run(creep);
    }
    if (creep.memory.role == "builder") {
      roleBuilder.run(creep);
    }
  }
};
