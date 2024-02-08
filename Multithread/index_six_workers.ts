import express from 'express'
import { Worker } from 'worker_threads'

const app = express()
const number_threads = 10;

const createWorker = () => {
    return new Promise((reslove, reject) => {
        const worker = new Worker('./six-workers.ts', { workerData: { number_threads } });

        worker.on('message', (data) => {
            reslove(data)
        });

        worker.on('error', (err) => {
            reject(err)
        });
    })
}

app.get('/non-blocking', (req, res) => {
    res.status(200).send("This page is non-blocking")
});

app.get("/blocking", async (req, res) => {
    const workerPromises: Promise<unknown>[] = []

    for (let i = 0; i < number_threads; i++) {
        workerPromises.push(createWorker())
    }

    const thread_results = await Promise.all(workerPromises) as number[]
    for (let i = 1; i < number_threads; i++) {
        thread_results[0] += thread_results[i];
    }
    res.status(200).send(`result is ${thread_results[0]}`)
})

app.listen(3000, () => {
    console.log("http://localhost:3000/non-blocking")
    console.log("http://localhost:3000/blocking")
})