let questionNumber = 0;
let correctAnswer = "";
let restHP = 100;
let monsterNumber = 1;
let typeOfQuestion = JSON.parse(localStorage.getItem("course"));
typeOfQuestion = typeOfQuestion.sort(() => Math.random() - 0.5);
let notCorrect = 0;
let downPercent = 10;

monsterNumber = Math.floor(Math.random() * 5) + 1;
document.querySelector("img").src = "monster" + String(monsterNumber) + ".png";

function insert(a){
    let number = 0;
    typeOfQuestion[a][1] = typeOfQuestion[a][1].sort(() => Math.random() - 0.5);
    document.getElementById("mondaibun").textContent = typeOfQuestion[a][0];
    document.querySelectorAll(".sentakushi").forEach(sentaku => {
        sentaku.textContent = typeOfQuestion[a][1][number];
        number ++;
    });
    correctAnswer = typeOfQuestion[a][2];
}

insert(questionNumber);

function answerCheck(answer){
    if(typeOfQuestion[questionNumber][1][answer] === correctAnswer){
        hpDown();
        monsterShaking();

        document.getElementById("all-sentakushi").style.display = "none";
        document.getElementById("commentary").querySelector("p").innerHTML = typeOfQuestion[questionNumber][3];
        document.getElementById("commentary").style.display = "flex";

        if(restHP <= 0){
            monsterVanish();
        }

    }else{
        notCorrect ++;
        document.getElementById("not-correct").textContent = notCorrect;
        alert("不正解");
    }
}

function monsterShaking(){
    document.querySelector(".moving").classList.remove("moving");
    document.querySelector("img").classList.add("shake");
    setTimeout(() => {
        document.querySelector("img").classList.remove("shake");
    }, 400);
}

function hpDown(){
    restHP = restHP - downPercent;
    document.getElementById("hp").style.width = String(restHP) +  "%";
}

function monsterVanish(){
    document.getElementById("next-button").style.display = "none";
    document.getElementById("finish-button").style.display = "block";
    setTimeout(() => {
        document.querySelector("img").classList.add("vanish");
    }, 400);
}

function nextQuestion(){
    document.getElementById("all-sentakushi").style.display = "flex";
    document.getElementById("commentary").style.display = "none";
    document.querySelector("img").classList.add("moving");
    questionNumber ++;
    insert(questionNumber);
}

function finish(){
    window.location.href = "index.html";
}
