const {
    parentPort , workerData
  } = require('worker_threads');

let counter = 0;
for (let i = 0; i < 20000000000 / workerData.number_threads ; i++) {
    counter++;
}

parentPort?.postMessage(counter)