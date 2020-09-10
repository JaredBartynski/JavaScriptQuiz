var startButton = document.getElementById("start");
const questionsContainerElement = document.getElementById("questionsContainer");
const enterInitialsEl = document.getElementById("enterInitials");
var score = 0;
var formEl = document.getElementById("form");
formEl.addEventListener("submit", submitForm);
var highScoresEl = document.querySelector("#highScores");

startButton.addEventListener("click", start);

for (const button of document.querySelectorAll(".buttonAnswer")) {
  button.addEventListener("click", selectGuess);
}

function start() {
  startButton.classList.add("hide");
  questionsContainerElement.classList.remove("hide");
  nextQuestion();
  speedRead();
}

var questionIndex = -1;

function nextQuestion() {
  questionIndex = questionIndex + 1;
  var currentQuestion = questions[questionIndex];
  var questionTitleEl = document.querySelector("#questionTitle");
  questionTitleEl.textContent = currentQuestion.questionTitle;
  var AEl = document.querySelector("#A");
  AEl.textContent = currentQuestion.A;
  var BEl = document.querySelector("#B");
  BEl.textContent = currentQuestion.B;
  var CEl = document.querySelector("#C");
  CEl.textContent = currentQuestion.C;
  var DEl = document.querySelector("#D");
  DEl.textContent = currentQuestion.D;
}

function selectGuess(e) {
  var currentQuestion = questions[questionIndex];
  var correctAnswerEl = document.querySelector("#correctAnswer");
  var scoreEl = document.querySelector("#score");

  if (e.target.id === currentQuestion.correctAnswer) {
    correctAnswerEl.textContent = "Correct!";
    score++;
  } else {
    correctAnswerEl.textContent = "Incorrect!";
    lossTime(5);
  }
  if (questionIndex === 5) {
    questionsContainerElement.classList.add("hide");
    enterInitialsEl.classList.remove("hide");
    scoreEl.textContent = "score= " + score;
    return;
  }
  nextQuestion();
}

function submitForm() {
  var inputBoxEl = document.querySelector("#inputBox");
  var storedScore = inputBoxEl.value;
  var stored = localStorage.getItem("stored");
  if (!stored) {
    stored = [];
  } else {
    stored = JSON.parse(stored);
  }
  stored.push({ name: storedScore, score: score });
  localStorage.setItem("stored", JSON.stringify(stored));
  enterInitialsEl.classList.add("hide");
  highScoresEl.classList.remove("hide");
  highScoresEl.textContent = JSON.stringify(stored);
}

//quiz questions
const questions = [
  {
    questionTitle: "What is javascript?",
    A: "a programming language",
    B: "a fruit",
    C: "a vehicle",
    D: "a place",
    correctAnswer: "A",
  },
  {
    questionTitle: "Inside which HTML element do we put the JavaScript?",
    A: "<scripting>",
    B: "<script>",
    C: "<js>",
    D: "<javascript>",
    correctAnswer: "B",
  },
  {
    questionTitle: "Where is the correct place to insert a JavaScript?",
    A: "in the css file",
    B: "the body section",
    C: "both the head and the body sections are correct",
    D: "the head section",
    correctAnswer: "A",
  },
  {
    questionTitle: "How do you write an IF statement in JavaScript?",
    A: "if i = 5",
    B: "if i = 5 then",
    C: "if i ==5 then",
    D: "if (i == 5)",
    correctAnswer: "D",
  },
  {
    questionTitle:
      "Which event occurs when the user clicks on an HTML element?",
    A: "onmouseclick",
    B: "onchange",
    C: "onclick",
    D: "onmouseover",
    correctAnswer: "C",
  },
  {
    questionTitle: "Which operator is used to assign a value to a variable?",
    A: "*",
    B: "X",
    C: "=",
    D: "===",
    correctAnswer: "C",
  },
];

//this is the countdown
var count = 60;
var countdownTimer;

function speedRead() {
  countdownTimer = setInterval(tikTimer, 1000);
}

function tikTimer() {
  if (count === 0) {
    clearInterval(countdownTimer);
    return;
  }
  lossTime(1);
}

function lossTime(subtractCount) {
  var timerEl = document.querySelector("#timer");
  count = count - subtractCount;
  timerEl.textContent = count;
}
