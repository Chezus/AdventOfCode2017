const fs = require("fs");

let input = fs.readFileSync("day16.input", "utf8");
input = input.split(/[,/]/g);

let programs = [...Array(16).keys()];
let programOrders = [];

function spin(val) { 
    for (let i = 0; i < val; i++) { 
        let element = programs.pop();
        programs.unshift(element);
    }
}

function exchange(a, b) { 
    let temp = programs[a];
    programs[a] = programs[b];
    programs[b] = temp;
}

function partner(a, b) { 
    let aVal = a.charCodeAt() - 97;
    let bVal = b.charCodeAt() - 97;

    let aFound = -1;
    let bFound = -1;
    for (let i = 0; i < programs.length; i++) {
        if (programs[i] === aVal) {
            aFound = i;

            if (bFound != -1)
                break;
        } else if (programs[i] === bVal) {
            bFound = i;

            if (aFound != -1)
                break;
        }
    }

    exchange(aFound, bFound);
}

let decreased = false;
for (let j = 0; j < 1000000000; j++) {
    let programOrder = programs.join(" ");

    if (!decreased && programOrders.includes(programOrder)) { 
        j = 1000000000 - (1000000000 % (j - programOrders.indexOf(programOrder)));
        decreased = true;
    }

    programOrders.push(programOrder);
    
    for (let i = 0; i < input.length; i++) {
        let str = input[i];
        if (str[0] == "s") {
            spin(parseInt(str.substr(1)));
        } else if (str[0] == "x") {
            let firstNum = str.substr(1);
            let secondNum = input[++i];

            exchange(parseInt(firstNum), parseInt(secondNum));
        } else {
            let firstChar = str.substr(1);
            let secondChar = input[++i];

            partner(firstChar, secondChar);
        }
    }
}

const answer = programs.map(x => String.fromCharCode(x + 97)).join("");
console.log(answer);