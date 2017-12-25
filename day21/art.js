const fs = require("fs");

let input = fs.readFileSync("day21.input", "utf8").split("\n");
let output = `.#.
..#
###`.split("\n");

global.rulesSize2 = Array(10).fill().map(() => Array());
global.rulesSize3 = Array(10).fill().map(() => Array());

class Rule
{
    constructor(rule)
    {
        let rules = rule.split(" => ");
        let inputRuleStr = rules[0];
        let outputRuleStr = rules[1];
        let inputRules = inputRuleStr.split("/");

        this.parts = inputRules.length;
        this.inputRules = inputRules.join("");
        this.outputRules = outputRuleStr.split("/");
        this.poundCount = inputRuleStr.split("#").length - 1;
    }

    match(string2d)
    {
        for (let flips = 0; flips < 2; flips++) {
            for (let rotations = 0; rotations < 4; rotations++) {
                let str = string2d.map((x) => x.join("")).join("");

                if (str === this.inputRules) {
                    return true;
                }
                
                string2d = rotate90(string2d);
            }

            string2d = flip(string2d);
        }

        return false;
    }
}

function getPoundCount(string2d) {
    let total = 0;

    for (let i = 0; i < string2d.length; i++) { 
        total += string2d[i].join("").split("#").length-1;
    }

    return total;
}

function rotate90(string2d)
{
    let output = Array(string2d.length).fill().map(() => Array(string2d.length));

    for (let y = 0; y < string2d.length; y++) { 
        for (let x = 0; x < string2d.length; x++) { 
            output[x][string2d.length - y - 1] = string2d[y][x];
        }
    }

    return output;
}

function flip(string2d)
{
    let output = Array(string2d.length).fill().map(() => Array(string2d.length));

    for (let y = 0; y < string2d.length; y++) {
        for (let x = 0; x < string2d.length; x++) {
            output[x][y] = string2d[y][x];
        }
    }

    return output;
}

function applyRules(string2d)
{ 
    let divisor = string2d.length % 2 === 0 ? 2 : 3;
    let output = Array(string2d.length/divisor*(divisor + 1)).fill("");

    let subArr = Array(divisor).fill().map(() => Array(divisor));
    for (let y = 0; y < string2d.length / divisor; y++) {
        for (let x = 0; x < string2d.length / divisor; x++) {
            for (let yy = 0; yy < divisor; yy++) {
                for (let xx = 0; xx < divisor; xx++) {
                    subArr[yy][xx] = string2d[y * divisor + yy][x * divisor + xx];
                }
            }

            for (let rule of global["rulesSize" + divisor][getPoundCount(subArr)]) {
                if (rule.match(subArr)) {
                    for (let i = 0; i < divisor + 1; i++) {
                        output[i + (y * (divisor + 1))] += rule.outputRules[i];
                    }
                }
            }
        }
    }

    return output;
}

for (let str of input) { 
    let rule = new Rule(str);
    global["rulesSize" + rule.parts][rule.poundCount].push(rule);
}

// change to 5 iterations for part 1
for (let i = 0; i < 18; i++) { 
    output = applyRules(output);
}

console.log(getPoundCount(output.map((x) => x.split(""))));