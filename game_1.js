window.downPercent = 10;

function generateMonsterType(){
    let monsterNumber = Math.floor(Math.random() * 5) + 1;
    document.querySelector("img").src = "images/monster" + String(monsterNumber) + ".png";
}

generateMonsterType();

function CourseExistCheck(){
    if(localStorage.getItem("course") === null){
        alert("不正な操作です");
        window.location.href = "index.html";
    }
}

CourseExistCheck();

function darkTheme(){
    if(localStorage.getItem("theme-color") === "black"){
        ["documentElement", "body"].forEach(tag => {
            document[tag].style.backgroundColor = "rgb(57, 57, 57)";
        });
        document.getElementById("not-correct-board").style.color = "white";
        document.getElementById("mondaibun").style.color = "white";
    }
}

darkTheme();

function questionAmount(){
    if(localStorage.getItem("number-of-questions") === "5"){
        window.downPercent = 20;
    }
}

questionAmount();