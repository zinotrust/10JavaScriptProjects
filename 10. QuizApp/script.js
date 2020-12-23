function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


// Displaying the question
function displayQuestion() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        // show options
        let choices = quiz.getQuestionIndex().choices;
        for(let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
};


function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let ProgressElement = document.getElementById("progress");
    ProgressElement.innerHTML = 
    `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
};

function showScores() {
    let quizEndHTML = 
    `
    <h1>Quiz Completed</h1>
    <h2 id='score'> Your scored: ${quiz.score} of ${quiz.questions.length}</h2>
    <div class="quiz-repeat">
        <a href="index.html">Take Quiz Again</a>
    </div>
    `;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;
};

// create questions here
let questions = [
    new Question(
        "Hyper Text Markup Language Stands For?", 
        ["JQuery", "XHTML","CSS", "HTML"], "HTML"
    ),
    new Question(
        "Cascading Style sheet stands for?", 
        ["HTML", "JQuery", "CSS", "XML"], "CSS"
    ),
    new Question(
        "Which is a JavaScript Framework?", 
        ["React", "Laravel","Django", "Sass"], "React"
        ),
    new Question(
        "Which is a backend language?", 
        ["PHP", "HTML", "React", "All"], "PHP"
        ),
    new Question(
        "Which is best for Artificial intelligence?", 
        ["React", "Laravel","Python", "Sass"], "Python"
        )
];

// Loop through the array and get the answers
// questions.forEach((answer) => {
//     console.log(answer.choice);
//     let quizAnswers = document.getElementById("quiz-answers");
//     // quizAnswers.innerHTML = questions.text;
// })


// create quiz
let quiz = new Quiz(questions);

// display quiz
displayQuestion();

// Add A CountDown for the Quiz
let time = 10;
let quizTimeInMinutes = time * 60 * 60;
let quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down");

function startCountdown(){
    let quizTimer = setInterval(function(){
    if(quizTime <= 0) {
        clearInterval(quizTimer);
        showScores();
    } else {
        quizTime--;
        let sec = Math.floor(quizTime % 60);
        let min = Math.floor(quizTime / 60) % 60;
        counting.innerHTML = `TIME: ${min} : ${sec}`;   
    }
},1000);
}

startCountdown();

