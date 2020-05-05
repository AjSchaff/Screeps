class Worker {
  constructor(work = 1, carry = 1, move = 1) {
    this.work = work;
    this.carry = carry;
    this.move = move;
  }
  test() {
    console.log('hi');
  }
  harvestTarget() {
    const target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
    if (target) {
      if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
    }
  }
  deliverResources() {
    if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(storage);
    }
  }
}

exports.Worker = Worker;