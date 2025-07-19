let questionNumber = 0;
let correctAnswer = "";
let restHP = 100;
let typeOfQuestion = JSON.parse(localStorage.getItem("course")).sort(() => Math.random() - 0.5);
let notCorrect = 0;

function insertQuestion(a){
    document.getElementById("mondaibun").textContent = typeOfQuestion[a][0];
    document.querySelectorAll(".sentakushi").forEach((sentakushi, index) => {
        sentakushi.textContent = typeOfQuestion[a][1][index];
    });
    correctAnswer = typeOfQuestion[a][2];
}

insertQuestion(questionNumber);

function answerCheck(answer){
    if(typeOfQuestion[questionNumber][1][answer] === correctAnswer){
        hpDown();
        monsterShaking();
        commentaryOpen();
        if(restHP <= 0){
            monsterVanish();
        }
    }else{
        countMistake();
    }
}

function countMistake(){
    notCorrect ++;
    document.getElementById("not-correct").textContent = notCorrect;
    alert("不正解");
}

function hpDown(){
    restHP = restHP - window.downPercent;
    document.getElementById("hp").style.width = String(restHP) +  "%";
}

function monsterShaking(){
    document.querySelector(".moving").classList.remove("moving");
    document.querySelector("img").classList.add("shake");
    setTimeout(() => {
        document.querySelector("img").classList.remove("shake");
    }, 400);
}

function commentaryOpen(){
    document.getElementById("all-sentakushi").style.display = "none";
    document.getElementById("commentary").querySelector("p").innerHTML = typeOfQuestion[questionNumber][3];
    document.getElementById("commentary").style.display = "flex";
}

function monsterVanish(){
    document.getElementById("next-button").style.display = "none";
    document.getElementById("finish-button").style.display = "block";
    setTimeout(() => {
        document.querySelector("img").classList.add("vanish");
    }, 400);
}

function nextQuestion(){
    questionNumber ++;
    insertQuestion(questionNumber);
    document.getElementById("commentary").style.display = "none";
    document.getElementById("all-sentakushi").style.display = "flex";
    document.querySelector("img").classList.add("moving");
}

function finish(){
    document.getElementById("loading").style.display = "flex";
    window.location.href = "index.html";
}
