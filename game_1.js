function CourseExistCheck(){
    if(localStorage.getItem("course") === null){
        alert("コースを選択してください");
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
        downPercent = 20;
    }
}

questionAmount();