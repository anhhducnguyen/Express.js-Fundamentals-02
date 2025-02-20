const express = require('express');
const fs = require('fs');
const router = express.Router();

const checkExist = require("../middlewares/checkExist")
router.use(["/:id", "/"], checkExist);

let questions;

try {
    questions = fs.readFileSync("./dev-data/questions.json");
    questions = JSON.parse(questions);
} catch (error) {
    return res.status(500).json({
        message: 'Error reading questions from file'
    })
}

router.get("/", (req, res) => {
    res.json(questions);
})

router.get("/:id", (req, res) => {
    res.json(req.question);
})

router.post("/", (req, res) => {
    let question = { ...req.body, id: Math.random() };
    questions.push(question);

    fs.writeFileSync("./dev-data/questions.json", JSON.stringify(questions));
    res.status(200).json({
        message: 'Create successfully',
        question: question
    })
})

router.put("/:id", (req, res) => {
    let id = req.params.id;
    questions[req.findIndex] = { ...req.body, id: +id };

    fs.writeFileSync("./dev-data/questions.json", JSON.stringify(questions));
    res.json({
        message: 'Update successfully',
        question: questions[req.findIndex]
    });
});

router.delete("/:id", (req, res) => {
    questions.splice(req.findIndex, 1);
    
    fs.writeFileSync("./dev-data/questions.json", JSON.stringify(questions));
    res.json({
        message: 'Deleted successfully'
    });
    
})

module.exports = router;


