function darkTheme(){
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
}

darkTheme();

function questionAmount(){
    if(localStorage.getItem("number-of-questions") === "5"){
        document.getElementById("number-of-questions").value = "5";
    }
}

questionAmount();

function courseSelectOpen(){
    generalClose();
    document.getElementById("course-select-all").style.display = "flex";
}

function courseSelectClose(){
    generalOpen();
    document.getElementById("course-select-all").style.display = "none";
}

let clickPermission = true;

async function courseLocked(course){
    if(clickPermission === true){
        try {
            document.getElementById("loading").style.display = "flex";
            clickPermission = false;
            await loadTopic(course);
            gameStart();
        } catch (error) {
            alert("エラーが発生しました");
            document.getElementById("loading").style.display = "none";
            clickPermission = true;
        }
    }
}

async function loadTopic(topicName) {
    try {
        const response = await fetch(`./data/${topicName}.json`);
        if (!response.ok) throw new Error("ファイルが見つかりません");
        const questions = await response.json();
        localStorage.setItem("course", JSON.stringify(questions));
        localStorage.setItem("courseName", topicName);
        console.log(questions);
    } catch (err) {
        console.error("読み込み失敗:", err);
        throw err; 
    }
}

function gameStart(){
    document.getElementById("main").classList.add("vanish");
    setTimeout(() => {
        window.location.href = "game.html";
        document.getElementById("main").style.display = "none";
    }, 1500);
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
    ["course-button", "recommend-button", "settei", "log-button"].forEach(id => {
        document.getElementById(id).style.display = "none";
    });
}

function generalOpen(){
    ["course-button", "recommend-button", "settei", "log-button"].forEach(id => {
        document.getElementById(id).style.display = "flex";
    });
}

function logIn(){
    document.getElementById("loading").style.display = "flex";
    window.location.href = "login.html";
}

function themeColor(){
    document.getElementById("loading").style.display = "flex";
    localStorage.setItem("theme-color", document.getElementById("color").value);
    window.location.reload();
}

function numberOfQuestions(){
    document.getElementById("loading").style.display = "flex";
    localStorage.setItem("number-of-questions", document.getElementById("number-of-questions").value);
    window.location.reload();
}