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

    isEqual(vec3)
    {
        return (this.x === vec3.x && this.y === vec3.y && this.z === vec3.z);
    }

    toString()
    { 
        return "(" + this.x + "," + this.y + "," + this.z + ")";
    }
}

class Particle
{
    constructor(position, velocity, acceleration, id) {
        this.position = position;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.id = id;
        this.deleted = false;
    }

    update()
    {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
    }
}

for (let i = 0; i < input.length; i++) {
    let str = input[i].split(",").map(Number);
    let position = new Vector3(str[0], str[1], str[2]);
    let velocity = new Vector3(str[3], str[4], str[5]);
    let acceleration = new Vector3(str[6], str[7], str[8]);

    particles.push(new Particle(position, velocity, acceleration, i));
}

// do some passes
for (let i = 0; i < 100; i++) {
    for (let j = 0; j < particles.length; j++) { 
        let pos = particles[j].position;
        let collision = false;
        for (let k = j + 1; k < particles.length; k++) { 
            if (!particles[k].deleted && pos.isEqual(particles[k].position)) {
                particles[k].deleted = true;
                collision = true;
            }
        }

        if (collision)
            particles[j].deleted = true;
    }

    for (let j = 0; j < particles.length; j++) {
        particles[j].update();
    }
}

let sumNotDeleted = particles.filter(x => !x.deleted).length;
console.log(sumNotDeleted);