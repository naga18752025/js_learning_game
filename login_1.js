function darkTheme(){
    if(localStorage.getItem("theme-color") === "black"){
        document.getElementById("main").style.backgroundColor = "rgb(136, 136, 136)";
        ["documentElement", "body"].forEach(tag => {
            document[tag].style.backgroundColor = "rgb(57, 57, 57)";
        });
        document.getElementById("main").style.border = "solid 0.5vh white";
        ["signIn-main", "signUp-main"].forEach(id => {
            document.getElementById(id).style.backgroundColor = "rgb(151, 151, 151)";
        });
    }
}

darkTheme();

function signInOpen(){
    generalClose();
    document.getElementById("signIn-gamen").style.display = "flex";
}

function signInClose(){
    generalOpen();
    document.getElementById("signIn-gamen").style.display = "none";
}

function signUpOpen(){
    generalClose();
    document.getElementById("signUp-gamen").style.display = "flex";
}

function signUpClose(){
    generalOpen();
    document.getElementById("signUp-gamen").style.display = "none";
}

function generalClose(){
    ["signIn-button", "signUp-button", "main-back"].forEach(id => {
        document.getElementById(id).style.display = "none";
    });
}

function generalOpen(){
    ["signIn-button", "signUp-button", "main-back"].forEach(id => {
        document.getElementById(id).style.display = "flex";
    });
}

function back(){
    document.getElementById("loading").style.display = "flex";
    window.location.href = "index.html";
}