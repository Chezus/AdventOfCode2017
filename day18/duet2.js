const fs = require("fs");

let input = fs.readFileSync("day18.input", "utf8");
input = input.split("\n");

class Program
{ 
    constructor(id)
    {
        this.id = id;
        this.register = {p: id};
        this.position = 0;
        this.numSent = 0;
        this.queue = [];
    }

    toNum(val)
    {
        if (/\d+/.test(val))
            return parseInt(val);
        return this.register[val];
    }

    set(a, b)
    {
        this.register[a] = this.toNum(b);
    }

    add(a, b)
    {
        this.register[a] += this.toNum(b);
    }

    mul(a, b)
    {
        this.register[a] *= this.toNum(b);
    }

    mod(a, b)
    {
        this.register[a] %= this.toNum(b);
    }

    jgz(a, b)
    {
        if (this.toNum(a) > 0)
            this.position += this.toNum(b) - 1;
    }
    
    rcv(val)
    {
        if (this.queue.length === 0) {
            this.position--;
            this.waiting = true;
        } else { 
            this.register[val] = this.queue.shift();
        }
    }

    snd(val)
    {
        programs[1 - this.id].queue.push(this.toNum(val));
        this.numSent++;
    }

    execute() { 
        this.waiting = false;
        this[input[this.position].substr(0, 3)](...input[this.position].substr(4).split(" "));
        this.position++;
    }
}

const programs = [new Program(0), new Program(1)];

do {
    programs.map(x => x.execute());
} while (!(programs[0].waiting && programs[1].waiting));

console.log(programs[1].numSent);