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
                text: "Design principle where the largest viewport is designed first, and breakpoints are created to accomodate smaller viewports",
                answer: false,
            },
            {
                text: "Design princple where the middle viewport is designed first, and breakouts are created to accomodate tablet viewports",
                answer: false,
            },
            {
                text: "Design princple where only the moble viewport is considered",
                answer: false
            }
        ]
    },
    {
        question: "What does it mean for JavaScript to be a synchronous language?",
        answers: [
            {
                text: "Javascript runs on a certain time interval",
                answer: false
            },
            {
                text: "All JavaScript code runs at the same time",
                answer: false,
            },
            {
                text: "Javascript code runs from top to bottom, one line at a time",
                answer: true
            },
            {
                text: "Javascript must synch to a data base before running code",
                answer: false
            },
        ]
    },
    {
        question: "What is the technical term for a function without a name?",
        answers: [
            {
                text: "Asynchronous funciton",
                answer: false
            },
            {
                text: "Anonymous function",
                answer: true
            },
            {
                text: "Nameless function",
                answer: false
            },
            {
                text: "Invisible function",
                answer: false
            },
        ]
    },
    {
        question: "How are elements indexed within an array",
        answers: [
            {
                text: "One Indexed",
                answer: false
            },
            {
                text: "Even Indexed",
                answer: false
            },
            {
                text: "Odd Indexed",
                answer: false
            },
            {
                text: "Zero Indexed",
                answer: true
            },
        ]
    },
    {
        question: "How is data stored in a map?",
        answers: [
            {
                text: "Key-Value Pairs",
                answer: true
            },
            {
                text: "In an array",
                answer: false
            },
            {
                text: "Via Objects",
                answer: false
            },
            {
                text: "Via a hash-map",
                answer: false
            },
        ]
    },
    {
        question: "Given the following array, what would array.pop() return? array=[233, 54, 97,0]",
        answers: [
            {
                text: "54",
                answer: false
            },
            {
                text: "97",
                answer: false
            },
            {
                text: "233",
                answer: false
            },
            {
                text: "0",
                answer: true
            },
        ]
    },
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