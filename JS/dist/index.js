"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const tf = __importStar(require("@tensorflow/tfjs-node"));
let model;
function prepareModel() {
    return __awaiter(this, void 0, void 0, function* () {
        model = tf.sequential();
        // Add a single input layer
        model.add(tf.layers.dense({ inputShape: [1], units: 1 }));
        model.compile({
            optimizer: tf.train.sgd(1),
            loss: tf.losses.meanSquaredError
        });
        let xData = [-1.0, 0.0, 1.0, 2.0, 3.0, 4.0];
        let yData = [-2.0, 1.0, 4.0, 7.0, 10.0, 13.0];
        let xs = tf.tensor1d(xData, "float32");
        let ys = tf.tensor1d(yData, "float32");
        yield model.fit(xs, ys, { epochs: 500 });
        console.log("trained");
        return true;
    });
}
prepareModel()
    .then(() => {
    const prediction = model.predict(tf.tensor1d([10]));
    console.log(prediction);
});
//# sourceMappingURL=index.js.map