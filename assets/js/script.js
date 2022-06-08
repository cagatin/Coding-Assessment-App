// Creating references to variables within the document.
let resultSpan = document.querySelector('#result');
let questionPara = document.querySelector('#question');
let answersContainer = document.querySelector('#answers-container');
let questionsContainer = document.querySelector('#question-container');

let time;

// Array containing question-answer pair objects.
// questions.question --> returns text 
// questions.answers[index] --> Array of len
let questions = [
    {
        question: "What does the Array.slice() method do?",
        answers: [
            {
                text: "Adds an element to the end of an array.",
                answer: false
            },
            {
                text: "Removes and returns the first element in an array.",
                answer: false
            },
            {
                text: "Merges two arrays together.",
                answer: false,
            },
            {
                text: "Returns a shallow copy of a specified portion of an array.",
                answer: true
            }
        ]
    }
]

function randomNumber() {
    return Math.floor(Math.random() * questions.length);
}


function displayAnswers(index) {
    let answers = questions[index].answers;
    for (let i = 0; i < answers.length; i++) {
        let newBtn = document.createElement('button');
        newBtn.setAttribute('class', 'answer-button');
        newBtn.textContent = answers[i].text;
        answersContainer.appendChild(newBtn);
    }
}

function displayQuestion(index) {
    questionPara.textContent = questions[index].question;
}

function init() {
    let randomIndex = randomNumber();

    displayQuestion(randomIndex);
    displayAnswers(randomIndex);
}

init();