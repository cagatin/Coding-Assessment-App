// Creating references to variables within the document.
let resultSpan = document.querySelector('#result');
let questionPara = document.querySelector('#question');
let answersContainer = document.querySelector('#answers-container');

let time;

// let answer = ["Possible Answer 1", "Possible Answer 2", "Possible Answer 3", "Possible Answer 4",]
// let questions = ["Placeholder Question"]

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


function displayAnswers() {
    let answers = questions[0].answers;
    for (let i = 0; i < answers.length; i++) {
        let newBtn = document.createElement('button');
        newBtn.setAttribute('class', 'answer-button');
        newBtn.textContent = answers[i].text;
        answersContainer.appendChild(newBtn);
    }
}

function displayQuestion() {
    questionPara.textContent = questions[0].question;
}

function init() {
    displayQuestion();
    displayAnswers();
}

init();