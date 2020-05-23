import * as tf from '@tensorflow/tfjs-node'


let model: tf.Sequential

async function prepareModel() {
    model = tf.sequential();
    // Add a single input layer
    model.add(tf.layers.dense({ inputShape: [1], units: 1 }));

    model.compile({
        optimizer: tf.train.sgd(1),
        loss: tf.losses.meanSquaredError
    });

    let xData = [-1.0, 0.0, 1.0, 2.0, 3.0, 4.0]
    let yData = [-2.0, 1.0, 4.0, 7.0, 10.0, 13.0]

    let xs = tf.tensor1d(xData, "float32");
    let ys = tf.tensor1d(yData, "float32");


    await model.fit(xs, ys, { epochs: 500 });

    console.log("trained")
    return true
}

prepareModel()
    .then(() => {
        const prediction = model.predict(tf.tensor1d([10]));

        console.log(prediction)
    })

