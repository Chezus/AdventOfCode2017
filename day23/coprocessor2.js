let b = 106700;
let c = 123700;
let d = 0;
let e = 0;
let f = 0;
let h = 0;

while (true) {
    f = false;
    e = 2;

    for (d = 2; d < b; d++) {
        if ((b % d) === 0) {
            h++;
            break;
        }
    }

    if (b === c) {
        break;
    }
    
    b += 17;
}

console.log(h);