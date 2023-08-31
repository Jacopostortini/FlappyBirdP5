class LayerDense {
    constructor(inputs, outputs, activationFunction, activationFunctionDerivative){

        if(Math.floor(Number(inputs)) !== inputs){
            throw "Input size must be an integer";
        }

        if(Math.floor(Number(outputs)) !== outputs){
            throw "Output size must be an integer";
        }

        this.inputSize = inputs;
        this.outputSize = outputs;

        this.weights = randomMatrix(this.inputSize, this.outputSize, [-1, 1]);
        this.biases = randomMatrix(1, this.outputSize, [0, 1]);

        this.activationFunction = activationFunction;
        this.activationFunctionDerivative = activationFunctionDerivative;

    }

    feedForward(inputs){
        if(! (inputs instanceof Array)) throw "Inputs must be an array, submitted: "+inputs;

        const inputDims = dims(inputs);
        if(inputDims.columns !== this.inputSize) throw "Input size must be of "+this.inputSize+", submitted: "+inputDims.columns;
        if(inputDims.lines !== 1) throw "Input size must be a row array";

        this.lastInputs = inputs;
        const preactivation = add(multiply(inputs, this.weights), this.biases);
        const activated = this.activationFunction(preactivation);

        this.lastPreactivationOutputs = preactivation;
        this.lastOutputs = activated;

        return activated;
    }

    train(outputError, learningRate=0.1){
        if(! (outputError instanceof Array)) throw "output error parameter must be an array, submitted: "+outputError;

        const outputErrorDims = dims(outputError);
        if(outputErrorDims.columns !== this.outputSize) throw "Output error size must be of "+this.outputSize+", submitted: "+outputErrorDims.columns;
        if(outputErrorDims.lines !== 1) throw "Output error must be a row array";


        if(Number(learningRate) !== learningRate) throw "Learning rate must be a Number, submitted: "+learningRate;

        //Calculate the errors to correct weights, biases and previous layer

        
        //derivative of the error with respect to weight ij = x_i * f'(u_j) * outputerror_j
        const weightsError = multiply(
            transpose(this.lastInputs), 
            elementWiseProduct(outputError, this.activationFunctionDerivative(this.lastPreactivationOutputs))
        );


        const biasesError = elementWiseProduct(outputError, this.activationFunctionDerivative(this.lastPreactivationOutputs));

        //derivative of the error with respect to the input i = sum on the output neurons of outputerror_j * f'(u_j) * w_ij
        const inputError = multiply(
            elementWiseProduct(outputError, this.activationFunctionDerivative(this.lastPreactivationOutputs)), 
            transpose(this.weights)
        );

        //Correct weights and biases
        this.weights = subtract(this.weights, productByScalar(learningRate, weightsError));
        this.biases = subtract(this.biases, productByScalar(learningRate, biasesError));

        this.inputError = inputError;

        return inputError;
    }
}