class Ship {
  constructor({ type, length }) {
    this.length = length;
    this.locations = Array(length).fill(-1);
    this.type = type;
    this.hits = [];
  }

  hit(index) {
    this.hits.push(index);
  }

  isSunk() {
    if (this.checkHit()) {
      return true;
    } else {
      return false;
    }
  }

  checkHit() {
    return this.locations.every((loc) => this.hits.includes(loc));
  }
}

export default Ship;

// this.locations.length === this.hits.length &&
