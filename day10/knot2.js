const input = "130,126,1,11,140,2,255,207,18,254,246,164,29,104,0,224";
// const input = "1,2,3";

let processedInput = [...input].map(x => x.charCodeAt(0));
let numList = [...Array(256).keys()];
let denseHash = [];
let currPos = 0;
let skipSize = 0;

processedInput.push(17, 31, 73, 47, 23);

for (let j = 0; j < 64; j++) { 
    for (let i = 0; i < processedInput.length; i++) {
        let length = parseInt(processedInput[i]);
        let firstSwapIndex = currPos;
        let secondSwapIndex = (currPos + length - 1) % numList.length;

        for (let swaps = length; swaps > 1; swaps -= 2) {
            let temp = numList[firstSwapIndex];
            numList[firstSwapIndex] = numList[secondSwapIndex];
            numList[secondSwapIndex] = temp;

            firstSwapIndex = (firstSwapIndex + 1) % numList.length;
            secondSwapIndex = ((secondSwapIndex - 1) + numList.length) % numList.length;
        }

        currPos = (currPos + length + skipSize) % numList.length;
        skipSize++;
    }
}

for (let i = 0; i < 16; i++) {
    let array = numList.slice(i * 16, i * 16 + 16);
    let denseValue = array.reduce((a, b) => a ^ b)
    denseHash.push(denseValue);
}

let answer = denseHash.map(x => x < 16 ? "0".concat(x.toString(16)) : x.toString(16)).join("");

console.log(answer);