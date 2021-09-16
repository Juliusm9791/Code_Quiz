// Main sections
let highscoreView = document.querySelector("#highscoreView");
let timerView = document.querySelector("#timerView");
let startInfo = document.querySelector("#startInfo");
let allDone = document.querySelector("#allDone");
let fillScore = document.querySelector("#fillScore");
let questionShow = document.querySelector("#questionShow");
let answersShow = document.querySelector("#answersShow");
let correctOrWrong = document.querySelector("#correctOrWrong");

// Buttons
let startButton = document.querySelector("#startButton");
let initialsSubmitButton = document.querySelector("#initialsSubmitButton");
let highScoreGoBackButton = document.querySelector("#highScoreGoBackButton");
let highScoreClearButton = document.querySelector("#highScoreClearButton");

// Text inputs
let initials = document.querySelector("#initials");

let timer = 0;
let questionTime = 5;
let randomNr;
let correctAnswer;

// Quiz questions / answers
let quizArray= [{'question': 'first', 'answers': ["one1", "two1", "three1", "four1", 0]},
                {'question': 'second', 'answers': ["one2", "two2", "three2", "four2", 1]},
                {'question': 'third', 'answers': ["one3", "two3", "three3", "four3", 2]},
                {'question': 'fourth', 'answers': ["one4", "two4", "three4", "four4", 3]},];

startButton.addEventListener("click", startTimer);


function startTimer (event) {
    event.preventDefault();
    createRandomNr();
    setQuestion();
    checkAnsver();
    timerView.append(createHTMLelement(questionTime, "p"));
    timer = setInterval(() => {
        questionTime--;
        timerView.children[1].textContent = questionTime;
        console.log(questionTime);
        if (questionTime === 0) {
            clearInterval(timer);
        } 
    }, 1000);
}

function createHTMLelement(x,elem) {
    let newElement = document.createElement(elem); 
    newElement.textContent = x;
    return newElement;
}

function createRandomNr() {
    randomNr = Math.floor(Math.random() * quizArray.length);
}

function setQuestion() {
    startInfo.style.display = "none";
    allDone.style.display = "none";
    fillScore.style.display = "none";
    questionShow.children[0].remove(); // h1 tag html TEMP
    questionShow.append(createHTMLelement(quizArray[randomNr].question, "p"));
    correctAnswer = quizArray[randomNr].answers[4];
    for (i = 0; i < quizArray[randomNr].answers.length - 1; i++) {
        answersShow.append(createHTMLelement(quizArray[randomNr].answers[i], "button"));
        answersShow.children[i].setAttribute("class", "answerbutton");
        if (correctAnswer === i) {
            answersShow.children[i].setAttribute("data-state", "true");
        }
        else {
            answersShow.children[i].setAttribute("data-state", "false");
        }
    }
    console.log(correctAnswer, "correct")
}

function checkAnsver(){
    let button = document.getElementsByClassName("answerbutton");
    console.log(button.length)
    let correctWrong;
    for (i = 0; i < button.length; i++) {
        let v = button[i].getAttribute("data-state");
            if (button[i].getAttribute("data-state") === "true"){
            console.log(i, "+++++++++");
            corectWrong = true;
            correctOrWrong.appendChild(createHTMLelement("Correct", "p"));
        }
    }
    if (!corectWrong){
        correctOrWrong.appendChild(createHTMLelement("Wrong", "p"));
    }
}


