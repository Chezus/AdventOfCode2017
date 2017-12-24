const fs = require("fs");
const clone = require("clone");

let input = fs.readFileSync("day24.input", "utf8");

class Component {
    constructor(a, b) {
        this.a = a;
        this.b = b;
        this.totalWeight = a + b;
    }

    getOtherValue(value) { 
        if (this.a === value)
            return this.b;
        return this.a;
    }
}

class ComponentController {
    constructor() {
        this.components = [];
    }

    addComponent(component) {
        this.components.push(component);
        return this;
    }

    removeComponent(component) {
        this.components.splice(this.components.indexOf(component), 1);
        return this;
    }

    removeComponentByIndex(index) { 
        this.components.splice(index, 1);
        return this;
    }

    findComponentsWithValue(val) {
        let arr = [];
        for (let component of this.components) {
            if (component.a === val || component.b === val) {
                arr.push(component);
            }
        }

        if (arr.length === 0)
            return false;

        return arr;
    }

    calculateTotalWeight()
    {
        let total = 0;
        for (let component of this.components)
            total += component.totalWeight;
        return total;
    }

    indexOf(searchString, position = 0)
    { 
        return this.components.indexOf(searchString, position);
    }
}

function buildBridge(nextValue, componentsUsed, componentsLeft) { 
    let possibleParts = componentsLeft.findComponentsWithValue(nextValue);

    if (!possibleParts)
        return componentsUsed;
    
    let arr = [];
    for (let part of possibleParts) { 
        let rmIndex = componentsLeft.indexOf(part);
        let componentsLeftClone = clone(componentsLeft);
        let componentsUsedClone = clone(componentsUsed);
        arr.push(buildBridge(part.getOtherValue(nextValue), componentsUsedClone.addComponent(part), componentsLeftClone.removeComponentByIndex(rmIndex)));
    }

    return arr.reduce(function (a, b) {
        if (a.calculateTotalWeight() > b.calculateTotalWeight())
            return a;
        return b;
    });
}

components = new ComponentController();
input.split("\n").map(function (str) { 
    let arr = str.split("/").map(Number);
    components.addComponent(new Component(arr[0], arr[1]));
});

console.log(buildBridge(0, new ComponentController(), components).calculateTotalWeight());

