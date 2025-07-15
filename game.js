let syurui = 0;
let correctAnswer = 0;
let restHP = 100;
let monsterNumber = 1;
let typeOfQuestion = JSON.parse(localStorage.getItem("course"));
let notCorrect = 0;

if(localStorage.getItem("course") === null){
    alert("コースを選択してください");
    window.location.href = "index.html";
}

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

insert(syurui);

function answerCheck(answer){
    if(typeOfQuestion[syurui][1][answer] === correctAnswer){
        document.querySelector(".moving").classList.remove("moving");
        restHP = restHP - 10;
        document.getElementById("hp").style.width = String(restHP) +  "%";
        document.querySelector("img").classList.add("shake");
        document.getElementById("all-sentakushi").style.display = "none";
        document.getElementById("commentary").style.display = "flex";
        if(restHP <= 0){
            document.getElementById("next-button").style.display = "none";
            document.getElementById("finish-button").style.display = "block";
        }
        document.getElementById("commentary").querySelector("p").innerHTML = typeOfQuestion[syurui][3];
        setTimeout(() => {
            document.querySelector("img").classList.remove("shake");
            if(restHP <= 0){
                monsterVanish();
            }
        }, 400);
    }else{
        notCorrect ++;
        document.getElementById("not-correct").textContent = notCorrect;
        alert("不正解");
    }
}

function monsterVanish(){
    document.querySelector("img").classList.add("vanish");
}

function nextQuestion(){
    document.getElementById("all-sentakushi").style.display = "flex";
    document.getElementById("commentary").style.display = "none";
    document.querySelector("img").classList.add("moving");
    syurui ++;
    if(syurui === 5){
        syurui = 0;
    }
    insert(syurui);
}

function finish(){
    window.location.href = "index.html"
}
