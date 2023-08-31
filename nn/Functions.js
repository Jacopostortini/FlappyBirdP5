function tanh(x){
    if(Number(x) === x){
        return Math.tanh(x);
    } else {
        throw "Cannot calculate tanh in "+x;
    }
}

function tanhPrime(x){
    if(Number(x) === x){
        return 1-Math.tanh(x)**2;
    } else {
        throw "Cannot calculate tanh derivative in "+x;
    }
}

function sigmoid(x){
    if(Number(x) === x){
        return 1 / (1+Math.exp(-x));
    } else {
        throw "Cannot calculate sigmoid in "+x;
    }
}

function sigmoidPrime(x){
    if(Number(x) === x){
        return Math.exp(-x) / (1+Math.exp(-x))**2;
    } else {
        throw "Cannot calculate sigmoid derivative in "+x;
    }
}

function sign(x){
    if(Number(x) === x){
        if(x < 0) return -1;
        else if(x == 0) return 0;
        else return 1;
    } else {
        throw "Cannot calculate sign function in "+x;
    }
}

function zero(x){
    if(Number(x) === x){
        return 0;
    } else {
        throw "Cannot calculate zero function in "+x;
    }
}

function meanSquaredError(output, desired){
    if(output instanceof Array && desired instanceof Array){
        if(output.length === desired.length){
            const difference = subtract(output, desired);
            const squaredDifference = elementWiseProduct(difference, difference);
            return productByScalar(1/2, squaredDifference);
        } else {
            throw "Output has size "+output.length+" and desired output has size "+desired.length;    
        }
        
    } else {
        throw "Cannot calculate mean squared error between "+(typeof output)+" and "+(typeof desired);
    }
}

function meanSquaredErrorPrime(output, desired){
    if(output instanceof Array && desired instanceof Array){
        if(output.length === desired.length){
            const difference = subtract(output, desired);
            return difference;
        } else {
            throw "Output has size "+output.length+" and desired output has size "+desired.length;    
        }
        
    } else {
        throw "Cannot calculate mean squared error prime between "+JSON.stringify(output)+" and "+JSON.stringify(desired);
    }
}