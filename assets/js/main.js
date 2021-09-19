// Main sections
let highscoreView = document.querySelector("#highscoreView");
let timerView = document.querySelector("#timerView");
let startInfo = document.querySelector("#startInfo");
let allDone = document.querySelector("#allDone");
let finalScore = document.querySelector("#finalScore");
let questionShow = document.querySelector("#questionShow");
let answerButtons = document.querySelector("#answerButtons");
let correctOrWrong = document.querySelector("#correctOrWrong");

// Buttons
let startButton = document.querySelector("#startButton");
let initialsSubmitButton = document.querySelector("#initialsSubmitButton");

// Text inputs
let initials = document.querySelector("#initials");

allDone.style.display = "none";
let timer = 0;
let randomNr;
let correctAnswer;

let score = {
    player: "",
    correctAnsw: 0,
    wrongAnsw: 0,
    timeScore: 0,
}

let scoresArray = [];
scoresArray = JSON.parse(localStorage.getItem("scoresArray"));
if (scoresArray === null) {
    scoresArray = [];
}

// Quiz questions / answers - correct
let quizArrayOriginal= [{'question': 'Inside which HTML element do we put the JavaScript?', 
                        'answers': ["<scripting>", "<js>", "<script>", "<javascript>", 2]},
                        {'question': 'How to write an IF statement in JavaScript?', 
                        'answers': ["if i = 5 then", "if i == 5 then", "if i = 5", "if (i == 5)", 3]},
                        {'question': 'How does a FOR loop start?', 
                        'answers': ["for(i = 0; i < 5; i++)", "for(i = 0; i <= 5)", "for(i <= 5; i++)", "for i = 1 to 5", 0]},
                        {'question': 'How do you find the number with the highest value of x and y?', 
                        'answers': ["Math.celi(x,y)", "Math.max(x,y)", "top(x,y)", "celi(x,y)", 1]},
                        {'question': 'How do you round the number 7.25, to the nearest integer?', 
                        'answers': ["Math.round(7.25)", "Math.rnd(7.25)", "rnd(7.25)", "round(7.25)", 0]},];

let questionTime = quizArrayOriginal.length * 10;
// making a quiz array copy to work with
let quizArray = [];
quizArray.push.apply(quizArray, quizArrayOriginal);
         

// checking if the the pressed button is correct answer
answerButtons.addEventListener("click", function(event) {
    let button = event.target;
        if (button.matches("button")) {
            let state = button.getAttribute("data-state");
            if (state === "true") {
                correctOrWrong.appendChild(createHTMLelement("Correct", "p"));
                correctOrWrong.children[0].setAttribute("style", "color: green");
                button.setAttribute("style", "background-color: #98cb00");
                let audioPlay1 = new Audio('./assets/sound/tada.wav');
                audioPlay1.play();
                score.correctAnsw++;
                showCorrectWrongMessageDelay();
            } else {              
                correctOrWrong.appendChild(createHTMLelement("Wrong", "p"));
                correctOrWrong.children[0].setAttribute("style", "color: red");
                button.setAttribute("style", "background-color: #cc6733");
                let audioPlay2 = new Audio('./assets/sound/chord.wav');
                audioPlay2.play();
                questionTime -= 10;
                score.wrongAnsw++;
                showCorrectWrongMessageDelay();
            }
        }
});

// message corect or wrong answer
function showCorrectWrongMessageDelay() {
    correctOrWrong.style.borderTop = "1px solid #3398cc";
    if (quizArray.length === 0) {
        setTimeout(() =>{
            correctOrWrong.innerHTML = "";
            correctOrWrong.style.borderTop = "0px";
            ifNoMoreQuestions();
        },300);
    } else {
        setTimeout(() =>{
            correctOrWrong.innerHTML = "";
            correctOrWrong.style.borderTop = "0px";
            startNextQuestion();
        },300);
    }
}

//start quiz button
startButton.addEventListener("click", startTimer);

function startTimer () {   
    startNextQuestion()
    timerView.append(createHTMLelement(questionTime + " second(s) remaining", "p"));
    timer = setInterval(() => {
        questionTime--;
        if (questionTime < 10) {
            let audioPlay1 = new Audio('./assets/sound/clock.wav');
            audioPlay1.play();
        }
        timerView.innerHTML = questionTime + " second(s) remaining";
        if (questionTime <= 0) {
            ifNoMoreQuestions()
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

// preapare questions and answers
function setQuestion() {
    removingChildrens(questionShow);
    removingChildrens(answerButtons);
    startInfo.style.display = "none";
    allDone.style.display = "none";
    questionShow.append(createHTMLelement(quizArray[randomNr].question, "p"));
    correctAnswer = quizArray[randomNr].answers[4];
    for (i = 0; i < quizArray[randomNr].answers.length - 1; i++) {
        answerButtons.append(createHTMLelement(quizArray[randomNr].answers[i], "button"));
        answerButtons.children[i].setAttribute("class", "amswButtons");
        if (correctAnswer === i) {
            answerButtons.children[i].setAttribute("data-state", "true");
        }
        else {
            answerButtons.children[i].setAttribute("data-state", "false");
        }
    }
}

function removingChildrens(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function startNextQuestion() {
    createRandomNr();
    setQuestion();
    quizArray.splice(randomNr, 1);
}

//collecting and writing score results
function writeScore () {
    initialsSubmitButton.addEventListener("click", function() {
        if (document.getElementById("initials").value.trim() < 1){
            allDone.appendChild(createHTMLelement("You need to enter name", "p"));
            allDone.lastChild.setAttribute("style", "color: red");
        } else {
            score.player = document.getElementById("initials").value;
            scoresArray.push(score);
            localStorage.setItem("scoresArray", JSON.stringify(scoresArray));
            initials.value = "";
            location.href = "./assets/html/highscore.html";
        }     
    });
}

function ifNoMoreQuestions(){
    if (questionTime < 0) {
        questionTime = 0;
    } else {
        score.timeScore = questionTime;
    }
    writeScore();
    clearInterval(timer);
    finalScore.textContent = score.timeScore;
    removingChildrens(timerView);
    allDone.style.display = "block";
    questionShow.style.display = "none";
    answerButtons.style.display = "none";
    correctOrWrong.style.display = "none";
}

