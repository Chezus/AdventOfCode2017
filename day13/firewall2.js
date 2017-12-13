const fs = require("fs");
const clone = require("clone");

let input = fs.readFileSync("day13.input", "utf8");
input = input.replace(/:/g, "");
let unprocessedInput = input.split("\n");

class Layer {
    constructor(depth, range) {
        this.depth = depth;
        this.range = range;
        this.scannerLoc = 0;
        this.direction = -1;
        this.severity = depth * range;
    }

    moveScanner() {
        if (this.scannerLoc === this.range - 1 || this.scannerLoc === 0) {
            this.direction *= -1;
        }

        this.scannerLoc += this.direction;
    }
}

let layers = [];

for (let str of unprocessedInput) {
    let subStrArr = str.split(" ").map(Number);
    let depth = subStrArr[0];
    let range = subStrArr[1];

    layers[depth] = new Layer(depth, range);
}

let wait = 0;
let shouldContinue = false;
let found = true;

// below code is ugly and slow! This takes about 4 minutes on my pc
while(found) {
    found = false;

    // cloning so we don't adjust the original values
    // used a node module for this because javascript doesn't know how to deep clone
    let layersCopy = clone(layers);
    for (let i = 0; i < layersCopy.length; i++) {
        if (layersCopy[i] !== undefined) {
            if (layersCopy[i].scannerLoc === 0) {
                found = true;
                break;
            }
        }

        for (let index in layersCopy) {
            layersCopy[index].moveScanner();
        }
    }

    for (let index in layers) {
        layers[index].moveScanner();
    }

    wait++;
}

console.log(wait - 1);