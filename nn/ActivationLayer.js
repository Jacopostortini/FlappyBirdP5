class ActivationLayer {
    constructor(layer, activationFunction, activationFunctionDerivative){
        if(! (layer instanceof LayerDense)){
            throw "Layer must be instance of LayerDense, submitted: "+layer;
        }

        if(! (activationFunction instanceof Function)){
            throw "Activation function must be a function, submitted: "+activationFunction; 
        }

        if(! (activationFunctionDerivative instanceof Function)){
            throw "Activation function derivative must be a function, submitted: "+activationFunctionDerivative; 
        }

        this.layer = layer;
        this.activationFunction = activationFunction;
        this.activationFunctionDerivative = activationFunctionDerivative;
    }

    feedForward(inputs){
        if(! (inputs instanceof Array)) throw "Inputs must be an array, submitted: "+inputs;
        
        const inputDims = dims(inputs);
        if(inputDims.columns !== this.layer.outputSize) {
            throw "Input size must be of "+this.layer.outputSize+", submitted: "+inputDims.columns;
        }

        this.lastInputs = inputs;
        const outputs = mapMatrix(inputs, this.activationFunction);
        this.lastOutputs = outputs;

        return outputs;
    }

    train(outputError, learningRate=0.1){
        if(! (outputError instanceof Array)) throw "output error parameter must be an array, submitted: "+outputError
        
        const outputErrorDims = dims(outputError);
        if(outputErrorDims.columns !== this.layer.outputSize) throw "Output error size must be of "+this.layer.outputSize+", submitted: "+outputErrorDims.columns;

        if(Number(learningRate) !== learningRate) throw "Learning rate must be a Number, submitted: "+learningRate;

        const inputError = elementWiseProduct(mapMatrix(this.lastInputs, this.activationFunctionDerivative), outputError); 

        this.inputError = inputError;
        return inputError;
    }
}