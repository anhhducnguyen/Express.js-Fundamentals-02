const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get("/", (req, res) => {
    let questions = fs.readFileSync("./dev-data/questions.json");
    questions = JSON.parse(questions);

    res.json(questions);
})

router.get("/:id", (req, res) => {
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

router.post("/", (req, res) => {
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

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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

module.exports = router;