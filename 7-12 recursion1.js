const fs = require("fs");

let input = fs.readFileSync("day7.input", "utf8");

let unprocessedList = input.split("\r\n");
let nodeList = [];

class Node {
    constructor(name, weight, head, tail) {
        this.name = name;
        this.weight = weight;
        this.head = head;
        this.tail = tail;
    }
}

function findNode(name) {
    for (let i = 0; i < nodeList.length; i++) {
        let node = nodeList[i];

        if (node.name === name) {
            return node;
        }
    }

    return -1;
}

function updateOrAddNode(name, weight, head, tailNames) {
    for (let i = 0; i < nodeList.length; i++) {
        let node = nodeList[i];

        if (node.name === name) {
            // found, so update it.
            if (weight != -1)
                node.weight = weight;

            if (head !== null) {
                node.head = head;
            }

            if (tailNames !== null) {
                for (let j = 0; j < tailNames.length; j++) {
                    node.tail[j] = updateOrAddNode(tailNames[j], -1, node, null);
                }
            }

            return node;
        }
    }

    // not found, so add it
    let node = new Node(name, weight, head, null);
    let tails = [];

    if (tailNames !== null) {
        for (let i = 0; i < tailNames.length; i++) {
            tails.push(updateOrAddNode(tailNames[i], -1, node, null));
        }
    }
    node.tail = tails;
    nodeList.push(node);

    return node;
}

function findTopNode(node) {
    if (node.head === null)
        return node;

    return findTopNode(node.head);
}


for (str of unprocessedList) {
    str = str.replace(/[()\->,]/g, ""); // remove some characters
    str = str.replace(/  +/g, " "); // replace double space by a normal space
    let substrArr = str.split(" ");

    let name = substrArr[0];
    let weight = substrArr[1];
    let tail = substrArr.slice(2);

    updateOrAddNode(name, parseInt(weight), null, tail);
}

let topNode = findTopNode(nodeList[0]); // random node
console.log(topNode.name);
