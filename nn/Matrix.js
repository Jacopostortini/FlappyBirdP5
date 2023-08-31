//These functions assume that the inputs are well formed matrices
//A well form matrix is an array that presents the rows of the matrix as values
//E.g. [[a, b], [c, d], [e, f]] is a 3 by 2 matrix
//     [[a], [b]] is a column vector
//     [[a, b]] is a row vector
//     [[a]] is a single element matrix

function isMalformed(A){
    if(! (A instanceof Array)) return true;

    let length;
    for(const el of A){
        if(! (el instanceof Array)) return true;

        if(length){
            if(el.length !== length) return true;
        } else length = el.length;
    }

    return false;
}

function transpose(matrix){
    const Mdims = dims(matrix);
    let transposed = zeros(Mdims.columns, Mdims.lines);
    for(let l = 0; l < Mdims.lines; l++){
        for(let c = 0; c < Mdims.columns; c++){
            transposed[c][l] = matrix[l][c];
        }        
    }
    return transposed;
}

function randomMatrix(lines, columns, [from, to] = [0, 1]){
    if(lines instanceof Object){
        columns = lines.columns;
        lines = lines.lines;
    }
    const matrix = [];

    for(let l = 0; l < lines; l++){
        const line = [];
        for(let c = 0; c < columns; c++){
            line.push(Math.random() * (to-from) + from);
        }
        matrix.push(line);
    }

    return matrix;
}

function multiply(A, B){
    const Adims = dims(A);
    const Bdims = dims(B);

    if(Adims.columns !== Bdims.lines) throw "Dimensions mismatch: first parameter columns: "+Adims.columns+", second parameter lines: "+Bdims.lines;

    const product = zeros(Adims.lines, Bdims.columns);
    for(let l = 0; l < Adims.lines; l++){
        for(let c = 0; c < Bdims.columns; c++){
            const column = B.map(line => [line[c]]);
            product[l][c] = scalarProduct([A[l]], column);
        }    
    }
    return product;
}

function add(A, B){
    const Adims = dims(A);
    const Bdims = dims(B);

    if(Adims.lines !== Bdims.lines) throw "Dimension mismatch on sum between "+JSON.stringify(A) + " and "+JSON.stringify(B);
    if(Adims.columns !== Bdims.columns) throw "Dimension mismatch on sum between "+JSON.stringify(A) + " and "+JSON.stringify(B);
    const sum = zeros(Adims);

    for(let l = 0; l < Adims.lines; l++){
        for(let c = 0; c < Bdims.columns; c++){
            sum[l][c] = A[l][c]+B[l][c];
        }    
    }
    return sum;
}

function subtract(A, B){
    const Adims = dims(A);
    const Bdims = dims(B);

    if(Adims.lines !== Bdims.lines) throw "Dimension mismatch on difference between "+JSON.stringify(A) + " and "+JSON.stringify(B);
    if(Adims.columns !== Bdims.columns) throw "Dimension mismatch on difference between "+JSON.stringify(A) + " and "+JSON.stringify(B);
    const difference = zeros(Adims);

    for(let l = 0; l < Adims.lines; l++){
        for(let c = 0; c < Bdims.columns; c++){
            difference[l][c] = A[l][c]-B[l][c];
        }    
    }
    return difference;
}


function productByScalar(lambda, A){
    const Adims = dims(A);
    const product = clone(A);
    for(let l = 0; l < Adims.lines; l++){
        for(let c = 0; c < Adims.columns; c++){
            product[l][c] *= lambda;
        }    
    }

    return product;
}

function scalarProduct(A, B){
    const Adims = dims(A);
    const Bdims = dims(B);

    if(! (Adims.lines === 1 || Adims.columns === 1)) throw "Cannot perform scalar product on "+JSON.stringify(A);
    if(! (Bdims.lines === 1 || Bdims.columns === 1)) throw "Cannot perform scalar product on "+JSON.stringify(B);

    let Acopy = clone(A);
    let Bcopy = clone(B);
    if(Adims.lines !== 1) Acopy = transpose(A);
    if(Bdims.lines !== 1) Bcopy = transpose(B);

    if(Acopy.length !== Bcopy.length) throw "Cannot perform scalar product on "+JSON.stringify(A)+" and "+JSON.stringify(B);

    return sum(elementWiseProduct(Acopy, Bcopy));
}

function elementWiseProduct(A, B){
    const Adims = dims(A);
    const Bdims = dims(B);

    if(Adims.lines !== Bdims.lines) throw "Dimension mismatch on element wise product between "+JSON.stringify(A) + " and "+JSON.stringify(B);
    if(Adims.columns !== Bdims.columns) throw "Dimension mismatch on element wise product between "+JSON.stringify(A) + " and "+JSON.stringify(B);
    const product = zeros(Adims);

    for(let l = 0; l < Adims.lines; l++){
        for(let c = 0; c < Bdims.columns; c++){
            product[l][c] = A[l][c]*B[l][c];
        }    
    }
    return product;
}

function sum(A){
    const Adims = dims(A);
    let sum = 0;
    for(let l = 0; l < Adims.lines; l++){
        for(let c = 0; c < Adims.columns; c++){
            sum += A[l][c];
        }    
    }

    return sum;
}

function zeros(lines, columns){
    if(lines instanceof Object){
        columns = lines.columns;
        lines = lines.lines;
    }
    const matrix = [];

    for(let l = 0; l < lines; l++){
        const line = [];
        for(let c = 0; c < columns; c++){
            line.push(0);
        }
        matrix.push(line);
    }

    return matrix;
}

function dims(matrix){
    return {
        lines: matrix.length,
        columns: matrix[0].length
    };
}

function length(A){
    const Adims = dims(A);
    if(Adims.lines === 1 || Adims.columns === 1) return Math.max(Adims.lines, Adims.columns);

    throw "Cannot calculate length on "+JSON.stringify(A);
}

function clone(A){
    const Adims = dims(A);
    const copy = zeros(Adims.lines, Adims.columns);
    for(let i = 0; i < Adims.lines; i++){
        for(let j = 0; j < Adims.columns; j++){
            copy[i][j] = A[i][j];
        }
    }

    return copy;
}

function printMatrix(A){
    for(const line of A){
        console.log(line);
    }
}

function mapMatrix(A, fun){
    const Adims = dims(A);
    const copy = zeros(Adims);
    for(let i = 0; i < Adims.lines; i++){
        for(let j = 0; j < Adims.columns; j++){
            copy[i][j] = fun(A[i][j]);
        }
    }

    return copy;
}