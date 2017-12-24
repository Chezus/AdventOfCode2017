const fs = require("fs");

let input = fs.readFileSync("day22.input", "utf8");
input = input.split("\n");
let gridSize = 1000;
let maxSize = Math.floor(gridSize / 2);
let nodes = Array(gridSize).fill().map(() => Array(gridSize).fill(false));;
let numInfected = 0;

const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;
let direction = UP;

function switchDirections(turnRight)
{ 
    if (turnRight) { 
        switch (direction) {
            case UP:
                direction = RIGHT;
                currX += 1;
                break;
            case RIGHT:
                direction = DOWN;
                currY += 1;
                break;
            case DOWN:
                direction = LEFT;
                currX -= 1;
                break;
            case LEFT:
                direction = UP;
                currY -= 1;
                break;
        }
    } else { 
        switch (direction) {
            case UP:
                direction = LEFT;
                currX -= 1;
                break;
            case RIGHT:
                direction = UP;
                currY -= 1;
                break;
            case DOWN:
                direction = RIGHT;
                currX += 1;
                break;
            case LEFT:
                direction = DOWN;
                currY += 1;
                break;
        }
    }
}

let centerMin = Math.floor(gridSize / 2) - Math.floor(input.length / 2);
for (let y = centerMin; y < centerMin + input.length; y++) { 
    for (let x = centerMin; x < centerMin + input.length; x++) { 
        let infected = false;
        if (y >= centerMin && y < centerMin + input.length && x >= centerMin && x < centerMin + input.length)
            infected = input[y - centerMin][x - centerMin] === "#";
            
        nodes[y][x] = infected;
    }
}

let currX = Math.floor(gridSize / 2);
let currY = Math.floor(gridSize / 2);
for (let i = 0; i < 10000; i++) { 
    if (nodes[currY][currX]) {
        nodes[currY][currX] = false;
        switchDirections(true);
    } else { 
        nodes[currY][currX] = true;
        numInfected++;
        switchDirections(false);
    }
}

console.log(numInfected);