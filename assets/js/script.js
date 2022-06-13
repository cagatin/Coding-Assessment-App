// Creating references to variables within the document.
let resultSpan = document.querySelector('#result');
let questionPara = document.querySelector('#question');
let answersContainer = document.querySelector('#answers-container');
let questionsContainer = document.querySelector('#question-container');
let answerBtn = document.querySelectorAll('.answer-button');
let timeLeftSpan = document.querySelector('#time-left')

let time = 90;
let currScore;
let currQuestionIndex;
let usedQuestions = new Set();


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
        question: "How are elements indexed within an array?",
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
        question: "What does array.pop() do?",
        answers: [
            {
                text: "Returns and removes the first item in the array",
                answer: false
            },
            {
                text: "Returns but does not remove the first item in the array",
                answer: false
            },
            {
                text: "Returns but does not remove the last item in the array",
                answer: false
            },
            {
                text: "Returns and removes the last item in the array",
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
        //contains boolean describing whether answer is true/false
        let answer = answers[i].answer;

        //create a button element
        let newBtn = document.createElement('button');

        //sets its class attribute to answer-button, as well as the true/false boolean
        newBtn.classList.add('answer-button', `${answer}`)

        //set its text to equal the answer text.
        newBtn.textContent = answers[i].text;

        //append the new button to the answers container
        answersContainer.appendChild(newBtn);
    }
}

// Function to display question onto the page
function displayQuestion(index) {
    questionPara.textContent = questions[index].question;
}


// Funciton that displays questions/answers onto the page
function display() {

    // Randomly generate an index from the questions array.
    currQuestionIndex = randomNumber();

    // If the question has already been used, select a new index.
    while (usedQuestions.has(currQuestionIndex)) {
        currQuestionIndex = randomNumber();
    }

    // Display the questions and answers.
    displayQuestion(currQuestionIndex);
    displayAnswers(currQuestionIndex);

    // Store the index into the usedQuestions array.
    usedQuestions.add(currQuestionIndex);

    console.log(usedQuestions.size);
    console.log(questions.length);
    console.log(usedQuestions);
}

// function that clears the questions and answers from the main contianer
function clearDisplay() {
    // Clear the question. 
    questionPara.textContent = '';

    // While there are still answer buttons in the container, remove them.
    while (answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild);
    }
}

// // function which ends the game and displays high score
// function endGame() {

// }

display();

//event listener to determine if the user selected the correct answer.
answersContainer.addEventListener('click', (event) => {
    let element = event.target;

    // If the element is a button
    if (element.matches('button')) {
        // Check if the button is the correct answer (has a class of 'true');
        let isCorrect = event.target.classList.contains('true');

        // If the button has a 'true' class...
        if (isCorrect) {
            event.target.classList.add('correct');              //add a correct class to the button
            resultSpan.textContent = 'Correct!';                //set the text of the result span to 'Correct'
            resultSpan.setAttribute('class', 'correct-text')    //add a correct-text class to the results span
        }
        // Otherwise, if the button contains a 'false' class...
        else {
            event.target.classList.add('incorrect');            //add an incorrect class to the button
            resultSpan.textContent = 'Incorrect!';              //set the text of the results span to 'Incorrect'
            resultSpan.setAttribute('class', 'incorrect-text'); //add a incorrect-text class to the results span
        }
    }

    if (usedQuestions.size < questions.length) {
        clearDisplay();
        display();
        // } else {
        //     endGame();
        // }
    };
});