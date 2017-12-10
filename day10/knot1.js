const input = "130,126,1,11,140,2,255,207,18,254,246,164,29,104,0,224";

let processedInput = input.split(",");
let numList = [...Array(256).keys()];
let currPos = 0;
let skipSize = 0;

for (let i = 0; i < processedInput.length; i++) { 
    let length = parseInt(processedInput[i]);
    let firstSwapIndex = currPos;
    let secondSwapIndex = (currPos + length-1) % numList.length;

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

console.log(numList[0] * numList[1]);