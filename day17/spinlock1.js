const input = 337;

let currLoc = 0;
let arr = [0];

for (let i = 1; i < 2018; i++) { 
    let loc = ((currLoc + input) % arr.length) + 1;
    arr.splice(loc, 0, i);
    currLoc = loc;
}

console.log(arr[arr.indexOf(2017) + 1]);
