var input = 347991;

var squareSize = Math.ceil(Math.sqrt(input));
if(squareSize%2===0)
    squareSize+=1;

var minStep = (squareSize-1)/2;
var maxStep = squareSize - 1;

var step = maxStep;
var square = Math.pow(squareSize, 2);
var down = true;

while(square != input) 
{ 
    if(step === maxStep)
        down = true;
    else if(step === minStep)
        down = false;
    
    if(down) 
        step--;
    else
        step++;
    
    square--;
}

console.log(step);
