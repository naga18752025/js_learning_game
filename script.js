const supabase = window.supabase.createClient("https://nugptlthxhdsdknzqucc.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51Z3B0bHRoeGhkc2RrbnpxdWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NDc3MzQsImV4cCI6MjA2ODIyMzczNH0.sfSPF7oVLLYh4eWaUSOyR4rWf4oracLr7W-Wqo88XIc");

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

function generalClose(){
    document.getElementById("course-button").style.display = "none";
    document.getElementById("recommend").style.display = "none";
    document.getElementById("settei").style.display = "none";
    document.getElementById("log").style.display = "none";
}

function generalOpen(){
    document.getElementById("course-button").style.display = "flex";
    document.getElementById("recommend").style.display = "flex";
    document.getElementById("settei").style.display = "flex";
    document.getElementById("log").style.display = "flex";
}

function logIn(){
    window.location.href = "login.html";
}

