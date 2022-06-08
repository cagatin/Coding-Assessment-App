// Creating references to variables within the document.
let resultSpan = document.querySelector('#result');
let questionPara = document.querySelector('#question');
let answersContainer = document.querySelector('#answers-container');
let questionsContainer = document.querySelector('#question-container');

let time;

let currQuestionIndex;

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
    },
    {
        question: "What is Mobile First design?",
        answers: [
            {
                text: "Design principle where the smallest viewport is designed first, and breakpoints are created to accomodate larger viewports",
                answer: true,
            },
            {
                text: "Design principle where the largest viewport is designed first, and breakpoints are created to accomodate smalelr viewports",
                answer: false,
            }
        ]
    },
    // {
    //     question: "",
    //     answers: []
    // },
    // {
    //     question: "",
    //     answers: []
    // },
    // {
    //     question: "",
    //     answers: []
    // },
    // {
    //     question: "",
    //     answers: []
    // },
    // {
    //     question: "",
    //     answers: []
    // },
    // {
    //     question: "",
    //     answers: []
    // },
    // {
    //     question: "",
    //     answers: []
    // },
    // {
    //     question: "",
    //     answers: []
    // },
    // {
    //     question: "",
    //     answers: []
    // },
    // {
    //     question: "",
    //     answers: []
    // },
    // {
    //     question: "",
    //     answers: []
    // },
    // {
    //     question: "",
    //     answers: []
    // },
]

// Function to generate random index for selection in questions array.
function randomNumber() {
    return Math.floor(Math.random() * questions.length);
}

// Function to create answer buttons and display them onto the page
function displayAnswers(index) {
    let answers = questions[index].answers;
    for (let i = 0; i < answers.length; i++) {
        let newBtn = document.createElement('button');
        newBtn.setAttribute('class', 'answer-button');
        newBtn.textContent = answers[i].text;
        answersContainer.appendChild(newBtn);
    }
}

// Funciton to display question onto the page
function displayQuestion(index) {
    questionPara.textContent = questions[index].question;
}

//Funciton that displays questions/answers onto the page
function display() {
    currQuestionIndex = randomNumber();

    displayQuestion(currQuestionIndex);
    displayAnswers(currQuestionIndex);
    console.log(currQuestionIndex);
}

display();