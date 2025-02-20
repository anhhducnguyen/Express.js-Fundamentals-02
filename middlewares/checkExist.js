const fs = require('fs');

module.exports = (req, res, next) => {
    let id = req.params.id;
    let { content } = req.body;
    let questions;

    try {
        questions = fs.readFileSync("./dev-data/questions.json");
        questions = JSON.parse(questions);
    } catch (error) {
        return res.status(500).json({
            message: 'Error reading questions from file'
        })
    }

    if (id) {
        let findIndex = questions.findIndex(function (e, i) {
            return e.id === +id;
        })

        if (findIndex === -1) {
            return res.status(404).json({
                message: 'Question not found'
            });
        } 
        
        req.question = questions[findIndex]; 
        req.findIndex = findIndex;         
        return next();
    }

    if (content) {
        let findByContent = questions.findIndex(function (e, i) {
            return e.content === content;
        })

        if (findByContent !== -1) {
            return res.status(400).json({
                message: 'Question already exists'
            });
        } 
        return next();
    }
    next();
}