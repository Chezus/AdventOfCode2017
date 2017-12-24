const fs = require("fs");

let input = fs.readFileSync("day23.input", "utf8");
input = input.split("\n");

let registers = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0
};
let answer = 0;
let position = 0;

class Program {
    set(a, b) {
        registers[a] = this.toNum(b);
    }

    sub(a, b) { 
        registers[a] -= this.toNum(b);
    }

    mul(a, b) {
        registers[a] *= this.toNum(b);
        answer++;
    }

    jnz(a, b) {
        if (this.toNum(a) !== 0)
            position += this.toNum(b) -1;
    }

    toNum(val) {
        if (/\d+/.test(val))
            return parseInt(val);
        return registers[val];
    }

    execute() {
        let func = input[position].substr(0, 3);
        let args = input[position].substr(4).split(" ");
        this[func](...args);
    }
}

program = new Program();

for (; position < input.length || position < 0; position++) {
    program.execute();
}

console.log(answer);