const fs = require("fs");

let input = fs.readFileSync("day12.input", "utf8");
input = input.replace(/ <->/g, "");
input = input.replace(/,/g, "");
let unprocessedInput = input.split("\n");

let linksArray = [];
let groups = [];
let group = [];

for (str of unprocessedInput) {
    let subStrArr = str.split(" ");
    linksArray.push(subStrArr.slice(1).map(Number));
}

for (let i = 0; i < linksArray.length; i++) {
    if (inGroup(i))
        continue;
    
    createGroup(i);
    groups.push(group);
    group = [];
}

console.log("Answer part 1: " + group[0].length);
console.log("Answer part 2: " + groups.length);

function inGroup(index)
{
    for (grp of groups) {
        if (grp.includes(index))
            return true;
    }

    return false;
}

function createGroup(index)
{
    if (!group.includes(index))
        group.push(index);
    
    for (link of linksArray[index]) { 
        if (!group.includes(link)) {
            createGroup(link);
        }
    }
}