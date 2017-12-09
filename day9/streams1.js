const fs = require("fs");

let input = fs.readFileSync("day9.input", "utf8");

input = input.replace(/(!.)/g, "");
input = input.replace(/(<[^>]*>)/g, "");
input = input.replace(/(,)/g, "");
// console.log(input);

let stack = [];
let answer = 0;
for (let i = 0; i < input.length; i++) {
    if (input[i] === "{") {
        stack.push(input[i]);
    } else { 
        answer += stack.length;
        stack.pop();
    }
}

console.log(answer);
