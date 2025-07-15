let clickPermission = true;

document.getElementById("main").classList.remove("vanish");

function gameStart(){
    document.getElementById("main").classList.add("vanish");
    setTimeout(() => {
        window.location.href = "game.html";
        document.getElementById("main").style.display = "none";
    }, 1500);
}

function courseSelectOpen(){
    document.getElementById("course-button").style.display = "none";
    document.getElementById("recommend").style.display = "none";
    document.getElementById("course-select-all").style.display = "flex";
}

function courseSelectClose(){
    document.getElementById("course-button").style.display = "flex";
    document.getElementById("recommend").style.display = "flex";
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
    document.getElementById("course-button").style.display = "none";
    document.getElementById("recommend").style.display = "none";
    document.getElementById("sankou-saito").style.display = "flex";
}