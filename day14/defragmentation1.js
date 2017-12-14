let input = "ljoxqyyw";
// let input = "flqrgnkx";

function knotHash(string)
{
    string = [...string].map(x => x.charCodeAt(0));
    string.push(17, 31, 73, 47, 23);
    let numList = [...Array(256).keys()];
    let denseHash = [];
    let currPos = 0;
    let skipSize = 0;

    for (let j = 0; j < 64; j++) {
        for (let i = 0; i < string.length; i++) {
            let length = parseInt(string[i]);
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

    let answer = denseHash.map(x => x < 2 ? "0".concat(x.toString(2)) : x.toString(2)).join("");
    return answer;
}

let sum = 0;

for (let i = 0; i < 128; i++) {
    sum += knotHash(input + "-" + i).match(/1/g || []).length;
}

console.log(sum);