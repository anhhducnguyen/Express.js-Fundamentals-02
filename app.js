// Bài 1: Khởi Tạo Web Server với Express.js
const express = require('express')
const app = express()
const fs = require('fs')

const bodyParser = require('body-parser')
const port = 3000

const questionsURL = require("./routes/questions.route")

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 

// Bài 2: Routing Nâng Cao trong Express.js
app.get('/', (req, res) => {
    res.send('This is home page');
})

app.get('/ask', (req, res) => {
    res.send('This is asking page');
})

app.get('/question-detail/:id', (req, res) => {
    res.send('This is a question detail page');
})

// Bài 3: 
app.use("/api/v1/questions", questionsURL);


app.use((req, res) => {
    res.status(404).send('Page Not Found');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})