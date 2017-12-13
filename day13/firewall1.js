const fs = require("fs");

let input = fs.readFileSync("test.input", "utf8");
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
let totalSeverity = 0;

for (let str of unprocessedInput) {
    let subStrArr = str.split(" ").map(Number);
    let depth = subStrArr[0];
    let range = subStrArr[1];

    layers[depth] = new Layer(depth, range);
}

for (let i = 0; i < layers.length; i++) {
    if (layers[i] !== undefined) { 
        if (layers[i].scannerLoc === 0) {
            totalSeverity += layers[i].severity;
        }
    }

    for (let index in layers) { 
        layers[index].moveScanner();
    }
}

console.log(totalSeverity);