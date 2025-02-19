// Bài 1: Khởi Tạo Web Server với Express.js
const express = require('express')
const app = express()
const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

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

app.use((req, res) => {
    res.status(404).send('Page Not Found');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})