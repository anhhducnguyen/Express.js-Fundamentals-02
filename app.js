const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const port = 3000

const questionsURL = require("./routes/questions.route")

app.use(morgan("dev")); 
app.use(express.static("public"));
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 

app.get("/", (req, res) => {
    res.sendFile('public/index.html', { root:__dirname });
})

app.use("/api/v1/questions", questionsURL);

app.use((req, res) => {
    res.status(404).send('Page Not Found');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})