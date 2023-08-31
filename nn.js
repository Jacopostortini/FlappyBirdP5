let nn;
let from = 0;

function setup(){
    createCanvas(1200, 650);
    nn = new NeuralNetwork(2, 2);
    console.log(nn);
    //frameRate(10);
}

function draw(){
    background(0);
    nn.display();

    drawDesiredLine();

    drawPoints();
    //drawGuessedLine();

    trainBatch(from, from+10);
    from += 10;
    from %= points.length;

    fill(255);
    text("Loss: "+nn.loss(testPoints).toFixed(3), height+100, 100)
}


function drawPoints(){
    for(const point of points){
        const prediction = nn.feedForward(point.x)[0];
        const desired = point.y[0];
        const desiredIndex = desired[0] === 1 ? 0: 1;
        let r,g;
        r = prediction[1-desiredIndex]*255;
        g = prediction[desiredIndex]*255;
        
        fill(r, g, 0);
        noStroke();
        ellipse(point.x[0][0]*height, point.x[0][1]*height, 3, 3); 
    }
}


function drawDesiredLine(){
    stroke(0, 0, 255);
    line(0, 0.1*height, height, height/5+0.1*height); 
}

function trainBatch(from, to){
    for(let i = from; i < to; i++){
        train(points[i%points.length]);
    }
}

function train(point){
    nn.train(
        point.x,
        point.y,
        0.5
    );
}

