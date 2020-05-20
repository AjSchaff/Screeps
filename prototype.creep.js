/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
const roles = {
  harvester: require('role.harvester'),
  upgrader: require('role.upgrader'),
  builder: require('role.builder'),
  repairer: require('role.repairer'),
};

Creep.prototype.runRole = function () {
  const creep = this;
  const { role } = creep.memory;
  roles[role].run(this);
};

/**
 * The goal of this function is to determine if any containers are present in the room
 * if they are, the Harvester should only drop resources to the containers
 * if they are not, the Harvester should deliver resources to its Targets.
 */
Creep.prototype.determineHarvestingMethod = function () {
  const { memory } = this;
  const containers = this.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: (s) =>
      s.structureType === STRUCTURE_CONTAINER && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0,
  });

  return containers;
};

Creep.prototype.determineIfWorking = function () {
  const creep = this;
  const { role } = creep.memory;

  if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
    creep.memory.working = false;
    creep.say('🌾 harvest');
  }
  if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
    creep.memory.working = true;
    creep.say(`🔨${role}`);
  }
};

Creep.prototype.harvestEnergy = function () {
  const creep = this;
  const containers = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: (s) => s.structureType === STRUCTURE_CONTAINER,
  });

  // console.log(JSON.stringify(creep.memory));

  // console.log('containers: ', containers.id);

  Object.entries(containers).map(([key, value]) => {
    if (key === 'id') {
      // console.log('key: ', key);
      // console.log('value: ', value);
    }

    return key + value;
  });
};

/** @function
    @param {bool} useStorageSource
    @param {object} source */
Creep.prototype.gatherEnergy = function (useStorageSource, source) {
  let container;
  if (useStorageSource) {
    container = this.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: (s) =>
        (s.structureType === STRUCTURE_CONTAINER || s.structureType === STRUCTURE_STORAGE) &&
        s.store[RESOURCE_ENERGY] > this.store.getCapacity(),
    });
    if (container !== undefined) {
      if (this.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        this.moveTo(container, {
          visualizePathStyle: { stroke: '#C2E6FF' },
        });
      }
    }
  }
  if (container === undefined && source) {
    if (this.harvest(source) === ERR_NOT_IN_RANGE) {
      this.moveTo(source);
    }
  }
};
