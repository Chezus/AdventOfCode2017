let input = "ljoxqyyw";

// slightly altered version of day10 pt2, and now a function
function knotHash(string) {
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

    let answer = denseHash.map(x => x < 16 ? "0".concat(x.toString(16)) : x.toString(16)).join("");
    return answer;
}

function hex2bin(hex) {
    return hex.split("").reduce((a, b) => a + ("000" + parseInt(b, 16).toString(2)).substr(-4, 4), "");
}

function removeGroup(x, y) { 
    if (x < 0 || x > 127 || y < 0 || y > 127)
        return;
    
    if (parseInt(arr[y][x]) === 0)
        return;
    
    arr[y][x] = 0;

    removeGroup(x - 1, y);
    removeGroup(x + 1, y);
    removeGroup(x, y - 1);
    removeGroup(x, y + 1);
}

let arr = [];
let groups = 0; 
for (let i = 0; i < 128; i++) {
    let binaryKnot = hex2bin(knotHash(input + "-" + i));
    arr.push(binaryKnot.split("").map(Number));
}

for (let x = 0; x < 128; x++) { 
    for (let y = 0; y < 128; y++) { 
        if (parseInt(arr[y][x]) === 1) {
            groups++;
            removeGroup(x, y);
        }
    }
}

console.log(groups);