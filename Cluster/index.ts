import express from 'express'

const app = express()

app.get('/heavy', (req, res) => {
    let total = 0 
    for (let index = 0; index < 50000000; index++) {
        total++;
    }
    res.status(200).send(`the reult of the Cpu intensive task is ${total}\n`)
});



app.listen(3000, () => {
    console.log("http://localhost:3000/heavy")
    console.log(`woker pid=${process.pid}`)
})