let input = 347991;

class Node { 
    constructor(x, y, value) { 
        this.x = x;
        this.y = y;
        this.value = calculateValue(x, y);
    }
}

let nodeArray = [];
let squareSize = 1;
nodeArray.push(new Node(0, 0));

let currNode = nodeArray[nodeArray.length - 1];
currNode.value = 1;

while (currNode.value < input) {
    currNode = nodeArray[nodeArray.length - 1];
    squareSize += 2;
    let maxVal = (squareSize - 1) / 2;
    
    // right
    for (let i = currNode.x; i < maxVal; i++) { 
        nodeArray.push(new Node(i + 1, currNode.y));
    }

    currNode = nodeArray[nodeArray.length - 1];

    // up
    for (let i = currNode.y; i > -maxVal; i--) {
        nodeArray.push(new Node(currNode.x, i - 1));
    }

    currNode = nodeArray[nodeArray.length - 1];

    // left
    for (let i = currNode.x; i > -maxVal; i--) { 
        nodeArray.push(new Node(i - 1, currNode.y));
    }

    currNode = nodeArray[nodeArray.length - 1];

    // down
    for (let i = currNode.y; i < maxVal; i++) { 
        nodeArray.push(new Node(currNode.x, i + 1));
    }
}

for (let i = 0; i < nodeArray.length; i++) { 
    if (nodeArray[i].value > input) {
        console.log(nodeArray[i].value);
        break;
    }    
}

function findValue(x, y) {
    for (obj of nodeArray) {
        if (obj.x === x && obj.y === y)
            return obj.value;
    }

    return 0;
}

function calculateValue(x, y) {
    return findValue(x - 1, y - 1) + findValue(x, y - 1) + findValue(x + 1, y - 1)
         + findValue(x - 1, y)                           + findValue(x + 1, y)
         + findValue(x - 1, y + 1) + findValue(x, y + 1) + findValue(x + 1, y + 1);
}

