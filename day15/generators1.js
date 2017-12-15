const inputA = 722;
const inputB = 354;

let numA = inputA;
let numB = inputB;
let answer = 0;
let prefix = "0000000000000000";

function dec2bin(decimal) {
    let bin = decimal.toString(2).substr(-16, 16);
    bin = prefix.substr(bin.length) + bin;
    return bin;
}

for (let i = 0; i < 40000000; i++) {
    numA = (numA * 16807) % 2147483647; // numa numa
    numB = (numB * 48271) % 2147483647;

    let binA = dec2bin(numA);
    let binB = dec2bin(numB);

    if (binA === binB)
        answer++;
}

console.log(answer);