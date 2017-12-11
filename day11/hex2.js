const fs = require("fs");

let input = fs.readFileSync("day11.input", "utf8");
let processedInput = input.split(",");

class Hex {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    length() {
        return Math.trunc((Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)) / 2);
    }

    add(hex) {
        this.x += hex.x;
        this.y += hex.y;
        this.z += hex.z;
    }
}

// DIRECTIONS
// N  = (0, 1, -1)
// NE = (1, 0, -1)
// SE = (1, -1, 0)
// S  = (0, -1, 1)
// SW = (-1, 0, 1)
// NW = (-1, 1, 0)

const northHex = new Hex(0, 1, -1);
const northeastHex = new Hex(1, 0, -1);
const southeastHex = new Hex(1, -1, 0);
const southHex = new Hex(0, -1, 1);
const southwestHex = new Hex(-1, 0, 1);
const northwestHex = new Hex(-1, 1, 0);

let currLoc = new Hex(0, 0, 0);
let highest = -1;

for (direction of processedInput) {
    if (direction === "n") {
        currLoc.add(northHex);
    }
    else if (direction === "ne") {
        currLoc.add(northeastHex);
    }
    else if (direction === "se") {
        currLoc.add(southeastHex);
    }
    else if (direction === "s") {
        currLoc.add(southHex);
    }
    else if (direction === "sw") {
        currLoc.add(southwestHex);
    }
    else if (direction === "nw") {
        currLoc.add(northwestHex);
    }

    if (currLoc.length() > highest)
        highest = currLoc.length();
}

console.log(highest);