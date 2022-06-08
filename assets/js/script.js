// Creating references to variables within the document.
let resultSpan = document.querySelector('#result');
let questionPara = document.querySelector('#question');
let answersContainer = document.querySelector('#answers-container');

let time;

let answer = ["Possible Answer 1", "Possible Answer 2", "Possible Answer 3", "Possible Answer 4",]

function displayAnswers() {
    for (let i = 0; i < answer.length; i++) {
        let newBtn = document.createElement('button');
        newBtn.setAttribute('class', 'answer-button');
        newBtn.textContent = answer[i];
        answersContainer.appendChild(newBtn);
    }
}

displayAnswers();