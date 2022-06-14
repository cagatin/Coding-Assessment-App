// Creating references to Container elements.
let mainContainer = document.querySelector('#main-container');
let answersContainer = document.querySelector('#answers-container');
let questionsContainer = document.querySelector('#question-container');
let gameStartContainer = document.querySelector('#game-start-container');
let highScoresContainer = document.querySelector('#high-scores-container');
let saveScoresContainer = document.querySelector('#save-score-container');

// Creating references to buttons
let answerBtn = document.querySelectorAll('.answer-button');
let startBtn = document.querySelector('#start-btn');
let submitNameBtn = document.querySelector('#submit-name-button');
let highScoresBtn = document.querySelector('#hsButton');
let saveScoresBtn = document.querySelector('#save-score');

// Creating references to necessary elements
let resultSpan = document.querySelector('#result');
let questionPara = document.querySelector('#question');
let timeLeftSpan = document.querySelector('#time-left');
let variableStyles = getComputedStyle(document.body);
let mainBorderStyle = variableStyles.getPropertyValue('--mainBorder');
let nameInput = document.querySelector('#nameInput');
let highscoresList = document.querySelector('#highscores');

// Variables used to play the game.
let time = 90;
let playerScore = 0;
let currQuestionIndex;              //tracks the current question being displayed
let usedQuestions = new Set();      //tracks which questions were used
let highScores = [];                //stores high scores of players


// Array containing question-answer pair objects.
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
        question: "What does it mean for JavaScript to be a single threaded language?",
        answers: [
            {
                text: "Javascript runs on a single time interval",
                answer: false
            },
            {
                text: "All JavaScript code runs at the same time",
                answer: false,
            },
            {
                text: "Javascript code runs one one call stack and one memory heap",
                answer: true
            },
            {
                text: "Javascript code runs on multiple call stacks, but one memory heap",
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
    {
        question: "What is a Promise Object?",
        answers: [
            {
                text: "JS Object that stores a variable",
                answer: false
            },
            {
                text: "JS Object which represents the completion or failure of an async operation",
                answer: true
            },
            {
                text: "JS Object which represents higher order functions",
                answer: false
            },
            {
                text: "JS Object which represents the completion of a function",
                answer: false
            },
        ]
    },
    {
        question: "What is the time complexity of a binary search algorithm?",
        answers: [
            {
                text: "exponential",
                answer: false
            },
            {
                text: "linear",
                answer: false
            },
            {
                text: "logarithmic",
                answer: true
            },
            {
                text: "constant",
                answer: false
            },
        ]
    },
    {
        question: "What does the .next method of a linked list reference?",
        answers: [
            {
                text: "the value stored within the list object",
                answer: false
            },
            {
                text: "The reference to the next link",
                answer: true
            },
            {
                text: "An array containing index-object values",
                answer: false
            },
            {
                text: "The head of the linked list",
                answer: false
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
    //Initialize the timeLeft span
    timeLeftSpan.textContent = `Time Left: ${time}`;

    //Create a timer
    let timer = setInterval(() => {
        time--;

        //If the time left reaches 0, end the game
        if (time <= 0) {
            clearInterval(timer);
            endGame();
        }

        //Display the time onto the timeLeftSpan
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

    //If no saved scores exist, alert the user and return.
    if (!savedScores) {
        alert("No saved high scores");
        return;
    }

    //Dynamically create list items 
    for (let i = 0; i < savedScores.length; i++) {
        //create a new li element
        let newLi = document.createElement('li');

        //retrieve the name of the player
        let player = savedScores[i].player;

        //retrieve the score of the player
        let score = savedScores[i].score;

        //add the name and score onto the li
        newLi.textContent = `${player} - ${score}`;

        //append the li onto the high schores ol
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
    //Clear the results span prior to displaying the next question
    resultSpan.textContent = '';

    //if there are still unused questions, keep playing
    if (usedQuestions.size < questions.length) {
        clearDisplay();
        display();
    }
    //otherwise, end the game
    else {
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

    //Reset time
    time = 90;

    //add a border to the main container
    mainContainer.style.border = mainBorderStyle;

    //display the quesitons-container
    gameStartContainer.classList.add('hidden');

    //hide buttons in game-start-container
    hideButtons();

    display();

    startTime();
    displayTime();
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

//Function to handle submitting user score
function handleSubmit(event) {
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
}

// event listener for the submit button when the user submits their score (browser)
submitNameBtn.addEventListener('click', handleSubmit)
submitNameBtn.addEventListener('touchstart', handleSubmit);


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