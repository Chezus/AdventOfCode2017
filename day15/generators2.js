const inputA = 722;
const inputB = 354;

let answer = 0;
let prefix = "0000000000000000";
let numsA = [];
let numsB = [];

function dec2bin(decimal)
{
    let bin = decimal.toString(2).substr(-16, 16);
    bin = prefix.substr(bin.length) + bin;
    return bin;
}

function fillNumsArray(startNum, factor, condition, array)
{
    let currNum = startNum;
    while (array.length < 5000000) {
        currNum = (currNum * factor) % 2147483647;

        if ((currNum % condition) === 0) {
            let bin = dec2bin(currNum);
            array.push(bin);
        }
    }

    console.log("Done filling");
}

fillNumsArray(inputA, 16807, 4, numsA);
fillNumsArray(inputB, 48271, 8, numsB);

for (let i = 0; i < 5000000; i++) {
    if(numsA[i] === numsB[i])
        answer++;
}

console.log(answer);