if(localStorage.getItem("theme-color") === "black"){
    document.getElementById("main").style.backgroundColor = "rgb(136, 136, 136)";
    ["documentElement", "body"].forEach(tag => {
        document[tag].style.backgroundColor = "rgb(57, 57, 57)";
    });
    document.getElementById("main").style.border = "solid 0.5vh white";
    ["course-select", "learning-log", "no-learning-log",  "recommend-site", "settei-naiyou"].forEach(id => {
        document.getElementById(id).style.backgroundColor = "rgb(151, 151, 151)";
    });
    document.getElementById("color").value = "black";
}

if(localStorage.getItem("number-of-questions") === "5"){
    document.getElementById("number-of-questions").value = "5";
}

function gameStart(){
    document.getElementById("main").classList.add("vanish");
    setTimeout(() => {
        window.location.href = "game.html";
        document.getElementById("main").style.display = "none";
    }, 1500);
}

function courseSelectOpen(){
    generalClose();
    document.getElementById("course-select-all").style.display = "flex";
}

function courseSelectClose(){
    generalOpen();
    document.getElementById("course-select-all").style.display = "none";
}

function courseLocked(course){
    if(clickPermission === true){
        clickPermission = false;
        localStorage.setItem("course", JSON.stringify(course));
        gameStart();
    }
}

function recommendOpen(){
    generalClose();
    document.getElementById("sankou-saito").style.display = "flex";
}

function recommendClose(){
    generalOpen();
    document.getElementById("sankou-saito").style.display = "none";
}

function setteiOpen(){
    generalClose();
    document.getElementById("settei-gamen").style.display = "flex";
}

function setteiClose(){
    generalOpen();
    document.getElementById("settei-gamen").style.display = "none";
}

function logOpen(){
    generalClose();
    document.getElementById("learning-log-all").style.display = "flex";
}

function logClose(){
    generalOpen();
    document.getElementById("learning-log-all").style.display = "none";
}

function generalClose(){
    ["course-button", "recommend", "settei", "log"].forEach(id => {
        document.getElementById(id).style.display = "none";
    });
}

function generalOpen(){
    ["course-button", "recommend", "settei", "log"].forEach(id => {
        document.getElementById(id).style.display = "flex";
    });
}