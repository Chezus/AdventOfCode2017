const fs = require("fs");

let input = fs.readFileSync("day8.input", "utf8");
let unprocessedInput = input.split("\n");
let variableArray = [];

class Variable {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

function findOrAdd(name) {
    for (var i = 0; i < variableArray.length; i++) {
        if (variableArray[i].name == name)
            return variableArray[i];
    }

    // Not found, so add.
    let obj = new Variable(name, 0);
    variableArray.push(obj);
    return obj;
}

let highest = 0;

for (str of unprocessedInput) {
    str += ")";
    str = str.replace(/( if )/g, " if( ");
    let subStrArr = str.split(" ");
    let name = subStrArr[0];
    let modifier = subStrArr[1];
    modifier = modifier.replace("inc", "+=");
    modifier = modifier.replace("dec", "-=");

    let condition = subStrArr[3] + "findOrAdd(\"" + subStrArr[4] + "\").value " + subStrArr[5] + " " + subStrArr[6] + " ";
    let statement = "findOrAdd(\"" + name + "\").value " + modifier + " " + subStrArr[2] + ";";
    eval(condition + statement);

    variableArray.sort(function (a, b) {
        return a.value - b.value;
    });
    
    if (variableArray[variableArray.length - 1].value > highest)
        highest = variableArray[variableArray.length - 1].value;
}

console.log(highest);
