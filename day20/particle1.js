const fs = require("fs");

let input = fs.readFileSync("day20.input", "utf8");
input = input.replace(/[pva=<> ]/g, "");
input = input.split("\n");
const particles = [];

class Vector3
{ 
    constructor(x, y, z)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    subtract(vec3)
    {
        this.x -= vec3.x;
        this.y -= vec3.y;
        this.z -= vec3.z;
    }

    add(vec3)
    {
        this.x += vec3.x;
        this.y += vec3.y;
        this.z += vec3.z;
    }

    length()
    {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    }
}

class Particle
{
    constructor(position, velocity, acceleration)
    {
        this.position = position;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.lengths = [];
        this.lengthTotal = 0;
        this.avgLength = 0;
    }

    update()
    {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        let length = this.position.length();
        this.lengthTotal += length;
        this.lengths.push(length);
        this.avgLength = this.lengthTotal / this.lengths.length;
    }
}

for (let i = 0; i < input.length; i++) {
    let str = input[i].split(",").map(Number);
    let position = new Vector3(str[0], str[1], str[2]);
    let velocity = new Vector3(str[3], str[4], str[5]);
    let acceleration = new Vector3(str[6], str[7], str[8]);

    particles.push(new Particle(position, velocity, acceleration));
}

// do some passes
for (let i = 0; i < 10000; i++) { 
    for (let j = 0; j < particles.length; j++) { 
        particles[j].update();
    }
}

let lowest = 100000000;
let index = -1;
for (let i = 0; i < particles.length; i++) { 
    if (lowest > particles[i].avgLength) {
        lowest = particles[i].avgLength;
        index = i;
    }
}

console.log(index);