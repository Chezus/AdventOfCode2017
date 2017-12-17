const input = 337;

let loc = 0;
let answer = 0;

for (let i = 0; i < 50000000; i++) {
    loc = (loc + input + 1) % (i + 1);
    
    if (loc === 0) {
        answer = i + 1;
    }
}

console.log(answer);