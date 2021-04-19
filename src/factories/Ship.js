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
    if (this.locations.length === this.hits.length) {
      return true;
    } else {
      return false;
    }
  }
}

export default Ship;
