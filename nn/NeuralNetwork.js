class NeuralNetwork {

    constructor(...layers){
        
        this.layers = [];

        for(let i = 0; i < layers.length-1; i++){
            this.layers.push(
                new LayerDense(
                    layers[i], //input neurons
                    layers[i+1], //output neurons
                    (A) => mapMatrix(A, sigmoid), //activation function 
                    (A) => mapMatrix(A, sigmoidPrime) //activation function derivative
                )
            );
        }
        
    }

    feedForward(inputs){
        if(isMalformed(inputs)) throw "Malformed input matrix";

        const inputDims = dims(inputs);

        if(inputDims.columns !== this.layers[0].inputSize) 
        throw "Input must be an array of size "+this.layers[0].inputSize+", submitted: "+inputDims.columns;

        let input = inputs;
        for(const layer of this.layers){
            /*console.log("Input:")
            printMatrix(input);*/

            input = layer.feedForward(input);

            /*console.log("Layer:", layer);
            console.log("Output:")
            printMatrix(input);
            console.log()
            console.log()*/
        }

        return input;
    }

    train(inputs, outputs, learningRate=0.01){
        const prediction = this.feedForward(inputs);
        let error = meanSquaredErrorPrime(prediction, outputs);
        for(let i = this.layers.length - 1; i >=0; i--){
            const layer = this.layers[i];
            /*console.log("Output error:")
            printMatrix(error);*/


            error = layer.train(error, learningRate);
            /*console.log("Layer:", layer);
            console.log("Input error:")
            printMatrix(error);
            console.log()
            console.log()*/
        }
    }

    display(){
        const neuronsGap = 100;
        const layersGap = 100;
        const neuronsRadius = 20;
        translate(850, height/2);
        textAlign(CENTER);
        textSize(16);
        for(let j = 0; j < this.layers.length; j++){
            const layer = this.layers[j];
        
            for(let i = 0; i < layer.inputSize; i++){
                const x = layersGap*j;
                const y = (i - layer.inputSize/2.)*neuronsGap;  
                noStroke();
                fill(255);
                circle(x, y, neuronsRadius);
                stroke(255);
                for(let k = 0; k < layer.outputSize; k++){
                    const nextX = layersGap*(j+1);
                    const nextY = (k - layer.outputSize/2.)*neuronsGap;  
                    line(x, y, nextX, nextY);
                    text(layer.weights[i][k].toFixed(3), (3*x+nextX)/4, (3*y+nextY)/4);
                    text(layer.biases[0][k].toFixed(3), nextX, nextY-neuronsRadius*1.1)
                }
            }

        }
        const lastLayer = this.layers[this.layers.length-1];
        for(let i = 0; i < lastLayer.outputSize; i++){
            const x = layersGap*this.layers.length;
            const y = (i - lastLayer.outputSize/2.)*neuronsGap;  
            noStroke();
            fill(255);
            circle(x, y, neuronsRadius);
        }

        resetMatrix();
    }

    loss(test){
        let mse = 0;

        for(const point of test){
            const prediction = this.feedForward(point.x);
            const error = meanSquaredError(prediction, point.y);
            mse += sum(productByScalar(1/test.length, error));
        }

        return mse;
    }
}