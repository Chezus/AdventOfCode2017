const fs = require("fs");

let input = fs.readFileSync("day22.input", "utf8");
input = input.split("\n");
let gridSize = 1000;
let nodes = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
let numInfected = 0;
let currX = Math.floor(gridSize / 2);
let currY = Math.floor(gridSize / 2);

const CLEAN = 0;
const INFECTED = 1;
const FLAGGED = 2;
const WEAKENED = 3;

const UP = -2;
const RIGHT = -1;
const DOWN = 2;
const LEFT = 1;
let direction = UP;

function switchDirections(turnRight) {
    if (turnRight) {
        switch (direction) {
            case UP:
                direction = RIGHT;
                break;
            case RIGHT:
                direction = DOWN;
                break;
            case DOWN:
                direction = LEFT;
                break;
            case LEFT:
                direction = UP;
                break;
        }
    } else {
        switch (direction) {
            case UP:
                direction = LEFT;
                break;
            case RIGHT:
                direction = UP;
                break;
            case DOWN:
                direction = RIGHT;
                break;
            case LEFT:
                direction = DOWN;
                break;
        }
    }
}

function move() { 
    switch (direction) {
        case UP:
            currY -= 1;
            break;
        case RIGHT:
            currX += 1;
            break;
        case DOWN:
            currY += 1;
            break;
        case LEFT:
            currX -= 1;
            break;
    }
}

let centerMin = Math.floor(gridSize / 2) - Math.floor(input.length / 2);
for (let y = centerMin; y < centerMin + input.length; y++) {
    for (let x = centerMin; x < centerMin + input.length; x++) {
        let state = CLEAN;
        if (y >= centerMin && y < centerMin + input.length && x >= centerMin && x < centerMin + input.length)
            state = input[y - centerMin][x - centerMin] === "#" ? INFECTED : CLEAN;

        nodes[y][x] = state;
    }
}

for (let i = 0; i < 10000000; i++) {
    if (nodes[currY][currX] === INFECTED) {
        nodes[currY][currX] = FLAGGED;
        switchDirections(true);
    } else if (nodes[currY][currX] === CLEAN) {
        nodes[currY][currX] = WEAKENED;
        switchDirections(false);
    } else if (nodes[currY][currX] === WEAKENED) {
        nodes[currY][currX] = INFECTED;
        numInfected++;
    } else {
        //FLAGGED
        nodes[currY][currX] = CLEAN;
        direction *= -1;
    }

    move();
}

console.log(numInfected);