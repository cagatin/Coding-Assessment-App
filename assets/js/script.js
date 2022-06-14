// Creating references to variables within the document.
let mainContainer = document.querySelector('#main-container');
let resultSpan = document.querySelector('#result');
let questionPara = document.querySelector('#question');
let answersContainer = document.querySelector('#answers-container');
let questionsContainer = document.querySelector('#question-container');
let answerBtn = document.querySelectorAll('.answer-button');
let timeLeftSpan = document.querySelector('#time-left');
let gameStartContainer = document.querySelector('#game-start-container');
let startBtn = document.querySelector('#start-btn');
let variableStyles = getComputedStyle(document.body);
let highScoresContainer = document.querySelector('#high-scores-container');
let highScoresBtn = document.querySelector('#hsButton');
let mainBorderStyle = variableStyles.getPropertyValue('--mainBorder');
let saveScoresBtn = document.querySelector('#save-score');
let saveScoresContainer = document.querySelector('#save-score-container');
let submitNameBtn = document.querySelector('#submit-name-button');
let nameInput = document.querySelector('#nameInput');
let highscoresList = document.querySelector('#highscores');

let time = 90;
let playerScore = 0;
let currQuestionIndex;
let usedQuestions = new Set();
let highScores = [];


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

// Function for the timer logic
function startTime() {
    timeLeftSpan.textContent = `Time Left: ${time}`;
    let timer = setInterval(() => {
        time--;
        if (time <= 0) {
            clearInterval(timer);
        }
        timeLeftSpan.textContent = `Time Left: ${time}`;
    }, 1000);
}

// Funciton that displays questions/answers onto the page
function display() {
    currQuestionIndex = randomNumber();         // Randomly generate an index from the questions array.

    // If the question has already been used, select a new index.
    while (usedQuestions.has(currQuestionIndex)) {
        currQuestionIndex = randomNumber();
    }

    // Display the questions and answers.
    displayQuestion(currQuestionIndex);
    displayAnswers(currQuestionIndex);

    // Store the index into the usedQuestions array.
    usedQuestions.add(currQuestionIndex);
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

// Function which hides the buttons in the game-start-container div
function hideButtons() {
    startBtn.classList.add('hidden');
    highScoresBtn.classList.add('hidden');
    saveScoresBtn.classList.add('hidden');
}

// Funciton which displays buttons
function displayButtons() {
    startBtn.classList.remove('hidden');
    highScoresBtn.classList.remove('hidden');
    saveScoresBtn.classList.remove('hidden');
}

// Function to display high scores as list items;
function displayHighScores() {
    //Retrive the scores from the local storage
    let savedScores = JSON.parse(localStorage.getItem('quizApp'));

    for (let i = 0; i < savedScores.length; i++) {
        let newLi = document.createElement('li');
        let player = savedScores[i].player;
        let score = savedScores[i].score;
        newLi.textContent = `${player} - ${score}`;
        highscoresList.appendChild(newLi);
    }
}

//function to display time span
function hideTime() {
    timeLeftSpan.setAttribute('class', 'hidden');
}

//function to display time span
function displayTime() {
    timeLeftSpan.classList.remove('hidden');
}

// Function to clear high scores
function clearHighScores() {
    while (highscoresList.firstChild) {
        highscoresList.removeChild(highscoresList.firstChild);
    }
}

// Function which continues the game
function continueGame() {
    if (usedQuestions.size < questions.length) {
        clearDisplay();
        display();
    } else {
        endGame();
    }
}

// endGame function used to end the game, display the final score, and reset the game board
function endGame() {
    resultSpan.style.color = 'white';
    // Tell the user their score
    resultSpan.textContent = `You Scored a ${playerScore} out of ${questions.length}!`;

    // clear the questions and answers div
    clearDisplay();

    // display buttons container again
    gameStartContainer.classList.remove('hidden');

    //display buttons in game-start-container
    displayButtons();

    // clear the used questions from the game
    usedQuestions.clear();

    // Hide the time left div
    hideTime();

    // remove the border from the main container
    mainContainer.style.border = '';
}

// Function which intializes the local storage
function initScores() {
    let scores = JSON.parse(localStorage.getItem('quizApp'));
    highScores = scores;
}

// Event listener for the start button. Starts the game
startBtn.addEventListener('click', (event) => {
    //if the high scores tab is open, close it
    if (!highScoresContainer.classList.contains('hidden')) {
        highScoresContainer.classList.add('hidden');
        clearHighScores();
    }

    //clear the results if a previous game was played
    resultSpan.textContent = '';

    //reset the player score
    playerScore = 0;

    //add a border to the main container
    mainContainer.style.border = mainBorderStyle;

    //display the quesitons-container
    gameStartContainer.classList.add('hidden');

    //hide buttons in game-start-container
    hideButtons();

    display();

    startTime();
});

// event listener to determine if the user selected the correct answer.
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
            playerScore += 1;
        }

        // Otherwise, if the button contains a 'false' class...
        else {
            event.target.classList.add('incorrect');            //add an incorrect class to the button
            resultSpan.textContent = 'Incorrect!';              //set the text of the results span to 'Incorrect'
            resultSpan.setAttribute('class', 'incorrect-text'); //add a incorrect-text class to the results span
            time -= 10;
        }
    }
    setTimeout(continueGame, 1000);
});

// save score button event listener that displays the form to save their score
saveScoresBtn.addEventListener('click', () => {
    if (playerScore == 0) {
        alert('No score to submit');
        return;
    }

    //hide the buttons
    hideButtons();

    // display the save score container
    saveScoresContainer.classList.remove('hidden');
})


// event listener for the submit button when the user submits their score
submitNameBtn.addEventListener('click', (event) => {
    event.preventDefault();     //stop the form from submitting
    // Retrieve the user input
    let userName = nameInput.value;

    //Object to store name-score pairs
    let player = {
        player: userName,
        score: playerScore
    }

    highScores.push(player)

    // Store the score in the local storage
    localStorage.setItem('quizApp', JSON.stringify(highScores));

    //display buttons
    displayButtons();

    //hide the save score container
    saveScoresContainer.classList.add('hidden');

    //tell the user that their score was saved
    resultSpan.textContent = `Score of ${playerScore} saved for ${userName}!`;

    //Reset the player score so user doesnt submit again
    playerScore = 0;
})

// Toggle the high scores contianer
highScoresBtn.addEventListener('click', () => {
    //function to create high scores list items
    displayHighScores()

    if (highScoresContainer.classList.contains('hidden')) {
        highScoresContainer.classList.remove('hidden');
    } else {
        highScoresContainer.classList.add('hidden');
        //clear the high scores container when hidden
        clearHighScores();
    };
})

initScores();