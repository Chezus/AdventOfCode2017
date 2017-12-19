const fs = require("fs");

let input = fs.readFileSync("day18.input", "utf8");
input = input.split("\n");

let registers = [];
let answer = 0;
let position = 0;

class Program
{ 
    set(a, b)
    {
        registers[a] = this.toNum(b);
    }

    add(a, b)
    {
        registers[a] += this.toNum(b);
    }

    mul(a, b)
    {
        registers[a] *= this.toNum(b);
    }

    mod(a, b)
    {
        registers[a] %= this.toNum(b);
    }

    jgz(a, b)
    {
        if (this.toNum(a) > 0)
            position += this.toNum(b) - 1;
    }

    snd(x)
    {
        answer = this.toNum(x);
    }

    rcv(x)
    {
        if (this.toNum(x) > 0) {
            position = -1; // break the loop
        }
    }

    toNum(val)
    {
        if (/\d+/.test(val))
            return parseInt(val);
        return registers[val];
    }

    execute()
    {
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