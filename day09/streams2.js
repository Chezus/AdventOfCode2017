const fs = require("fs");

let input = fs.readFileSync("day9.input", "utf8");

input = input.replace(/(!.)/g, "");
let regex = /<([^>]*)>/g;
let arr = [];
let match = regex.exec(input);

while (match !== null) { 
    arr.push(match[1]);
    match = regex.exec(input);
}

console.log(arr.join("").length);