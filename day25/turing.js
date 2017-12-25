let steps = 12919244;
let arr = Array(steps).fill(false);
let curr = Math.floor(steps / 2);

const STATE_A = 0;
const STATE_B = 1;
const STATE_C = 2;
const STATE_D = 3;
const STATE_E = 4;
const STATE_F = 5;

let currState = STATE_A;

for (let i = 0; i < steps; i++) { 
    if (currState === STATE_A) {
        if (arr[curr] === false) {
            arr[curr] = true;
            curr++;
            currState = STATE_B;
        } else {
            arr[curr] = false;
            curr--;
            currState = STATE_C;
        }
    } else if (currState === STATE_B) {
        if (arr[curr] === false) {
            arr[curr] = true;
            curr--;
            currState = STATE_A;
        } else {
            arr[curr] = true;
            curr++;
            currState = STATE_D;
        }
    }
    else if (currState === STATE_C) {
        if (arr[curr] === false) {
            arr[curr] = true;
            curr++;
            currState = STATE_A;
        } else {
            arr[curr] = false;
            curr--;
            currState = STATE_E;
        }
    } else if (currState === STATE_D) {
        if (arr[curr] === false) {
            arr[curr] = true;
            currState = STATE_A;
        } else {
            arr[curr] = false;
            currState = STATE_B;
        }
        curr++;
    } else if (currState === STATE_E) {
        if (arr[curr] === false) {
            currState = STATE_F;
        } else {
            currState = STATE_C;
        }
        arr[curr] = true;
        curr--;
    } else if (currState === STATE_F) {
        if (arr[curr] === false) {
            currState = STATE_D;
        } else {
            currState = STATE_A;
        }
        arr[curr] = true;
        curr++;
    }
}

console.log(arr.filter(x => x !== false).length);