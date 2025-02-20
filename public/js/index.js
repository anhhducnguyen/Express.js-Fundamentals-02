fetch("http://localhost:3000/api/v1/questions/")
.then(function(res){
    return res.json();
})
.then(function(data){
    const question = data[Math.floor(Math.random()*data.length)];

    document.querySelector('.question-content').innerText = question.content;
    document.querySelector('.question-content').id = question.id;
})
.catch()