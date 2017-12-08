let input = `10	3	15	10	5	15	5	15	9	2	5	8	5	2	3	6`;

let found = false;
let memoryBanks = input.split("\t").map(Number);
let numOrders = [memoryBanks.join(" ")];

while(!found) { 
    let maxVal = Math.max.apply(Math, memoryBanks);
    let startVal = memoryBanks.indexOf(maxVal);
    
    memoryBanks[startVal] = 0;
    for(let i = (startVal + 1) % memoryBanks.length; maxVal > 0; maxVal--,  i = ++i % memoryBanks.length) { 
        memoryBanks[i]++;
    }
    
    let numOrder = memoryBanks.join(" ");
    found = numOrders.includes(numOrder);
    numOrders.push(numOrder);
}

console.log(numOrders.length - 1);
