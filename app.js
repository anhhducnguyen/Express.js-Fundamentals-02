// Bài 1: Khởi Tạo Web Server với Express.js
const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')
const port = 3000

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

// Bài 3: Xây Dựng API Cho Website CSL
app.get("/api/v1/questions", (req, res) => {
    let questions = fs.readFileSync("./dev-data/questions.json");
    questions = JSON.parse(questions);

    res.json(questions);
})

app.get("/api/v1/questions/:id", (req, res) => {
    let id = req.params.id;
    let questions = fs.readFileSync("./dev-data/questions.json");
    questions = JSON.parse(questions);

    let findQuestion = questions.find(function (e, i) {
        return e.id === +id;
    })

    if (findQuestion) {
        res.json(findQuestion);
    } else {
        res.status(404).json({
            message: 'Question not found'
        });
    }
})

app.post("/api/v1/questions", (req, res) => {
    let question = { ...req.body, id: Math.random() };
    let questions = fs.readFileSync("./dev-data/questions.json");
    questions = JSON.parse(questions);

    let findQuestion = questions.find(function (e, i) {
        return e.content === req.body.content;
    })

    if (!findQuestion) {
        questions.push(question);
        fs.writeFileSync("./dev-data/questions.json", JSON.stringify(questions));
        res.status(200).json({
            message: 'Create successfully',
            question: question
        })
    } else {
        res.status(400).json({
            message: 'Question already exists'
        });
    }
})

app.put("/api/v1/questions/:id", (req, res) => {
    let id = req.params.id;
    let questions = fs.readFileSync("./dev-data/questions.json");
    questions = JSON.parse(questions);

    let findQuestion = questions.findIndex(function (e, i) {
        return e.id === +id;
    })

    if (findQuestion) {
        questions[findQuestion] = { ...req.body, id: +id };
        fs.writeFileSync("./dev-data/questions.json", JSON.stringify(questions));
        res.json({
            message: 'Update successfully',
            question: questions[findQuestion]
        });
    } else {
        res.status(404).json({
            message: 'Question not found'
        });
    }
})

app.delete("/api/v1/questions/:id", (req, res) => {
    let id = req.params.id;
    let questions = fs.readFileSync("./dev-data/questions.json");
    questions = JSON.parse(questions);
    let findQuestion = questions.findIndex(function (e, i) {
        return e.id === +id;
    })
    if (findQuestion >= 0) {
        questions.splice(findQuestion, 1);
        fs.writeFileSync("./dev-data/questions.json", JSON.stringify(questions));
        res.json({
            message: 'Deleted successfully'
        });
    } else {
        res.status(404).json({
            message: 'Question not found'
        });
    }
})

app.use((req, res) => {
    res.status(404).send('Page Not Found');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})