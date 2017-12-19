const fs = require("fs");

let input = fs.readFileSync("test.input", "utf8");
input = input.split("\n");

let x = input[0].indexOf("|");
let y = 0;
let end = false;
let direction = "s";
let path = [...input[y][x]];

while (!end) {
    if (direction === "n") {
        y -= 1;
    } else if (direction === "e") {
        x += 1;
    } else if (direction === "s") { 
        y += 1;
    } else if (direction === "w") { 
        x -= 1;
    }

    path.push(input[y][x]);

    // change direction
    if (input[y][x] === "+") { 
        if (direction === "s" || direction === "n") { 
            if (input[y][x - 1] != " ") {
                direction = "w";
            } else if (input[y][x + 1] != " ") { 
                direction = "e";
            } else { 
                console.log("Something went wrong! 1");
            }
        } else { 
            if (input[y - 1][x] != " ") {
                direction = "n";
            } else if (input[y + 1][x] != " ") {
                direction = "s";
            } else {
                console.log("Something went wrong! 2");
            }
        }
    } else if (input[y][x] === " ") {
        end = true;
        path.pop();
    }
}

let answer1 = path.join("").replace(/[^a-zA-Z]/g, "");
console.log(answer1);

let answer2 = path.join("").length;
console.log(answer2);