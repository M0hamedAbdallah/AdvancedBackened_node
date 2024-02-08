import express from 'express'
import { Worker } from 'worker_threads'

const app = express()

app.get('/non-blocking', (req, res) => {
    res.status(200).send("This page is non-blocking")
});

app.get("/blocking", async (req, res) => {
    // let counter = 0;
    // for (let i=0;i<20000000000;i++){
    //     counter++;
    // }
    // res.status(200).send(`result is ${counter}`)

    ////sol
    const worker = new Worker('./worker.ts');
    worker.on('message', (data) => {
        res.status(200).send(`result is ${data}`)
    });

    worker.on('error', (err) => {
        res.status(404).send(`faield ${err}`);
    });
})

app.listen(3000, () => {
    console.log("http://localhost:3000/non-blocking")
    console.log("http://localhost:3000/blocking")
})