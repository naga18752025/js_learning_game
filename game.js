let syurui = 0;
let correctAnswer = 0;
let restHP = 100;
let monsterNumber = 1;
let typeOfQuestion = JSON.parse(localStorage.getItem("course"));
typeOfQuestion = typeOfQuestion.sort(() => Math.random() - 0.5);
let notCorrect = 0;

if(localStorage.getItem("course") === null){
    alert("コースを選択してください");
    window.location.href = "index.html";
}

if(localStorage.getItem("theme-color") === "black"){
    document.documentElement.style.backgroundColor = "rgb(57, 57, 57)";
    document.body.style.backgroundColor = "rgb(57, 57, 57)";
    document.getElementById("not-correct-board").style.color = "white";
    document.getElementById("mondaibun").style.color = "white";
}

function insert(a){
    let number = 0;
    typeOfQuestion[a][1] = typeOfQuestion[a][1].sort(() => Math.random() - 0.5);
    typeOfQuestion[a][1] = typeOfQuestion[a][1].sort(() => Math.random() - 0.5);
    document.getElementById("mondaibun").textContent = typeOfQuestion[a][0];
    document.querySelectorAll(".sentakushi").forEach(sentaku => {
        sentaku.textContent = typeOfQuestion[a][1][number];
        number ++;
    });
    correctAnswer = typeOfQuestion[a][2];
}

insert(syurui);

function answerCheck(answer){
    if(typeOfQuestion[syurui][1][answer] === correctAnswer){

        hpDown();

        document.querySelector(".moving").classList.remove("moving");
        document.querySelector("img").classList.add("shake");

        document.getElementById("all-sentakushi").style.display = "none";
        document.getElementById("commentary").querySelector("p").innerHTML = typeOfQuestion[syurui][3];
        document.getElementById("commentary").style.display = "flex";

        if(restHP <= 0){
            monsterVanish();
        }

        setTimeout(() => {
            document.querySelector("img").classList.remove("shake");
        }, 400);

    }else{
        notCorrect ++;
        document.getElementById("not-correct").textContent = notCorrect;
        alert("不正解");
    }
}

function hpDown(){
    restHP = restHP - 10;
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
    syurui ++;
    insert(syurui);
}

function finish(){
    window.location.href = "index.html";
}
