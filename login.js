const supabase = window.supabase.createClient("https://nugptlthxhdsdknzqucc.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51Z3B0bHRoeGhkc2RrbnpxdWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NDc3MzQsImV4cCI6MjA2ODIyMzczNH0.sfSPF7oVLLYh4eWaUSOyR4rWf4oracLr7W-Wqo88XIc");

if(localStorage.getItem("theme-color") === "black"){
    document.getElementById("main").style.backgroundColor = "rgb(136, 136, 136)";
    document.documentElement.style.backgroundColor = "rgb(57, 57, 57)";
    document.body.style.backgroundColor = "rgb(57, 57, 57)";
    document.getElementById("main").style.border = "solid 0.5vh white";
    document.getElementById("signIn-main").style.backgroundColor = "rgb(151, 151, 151)";
    document.getElementById("signUp-main").style.backgroundColor = "rgb(151, 151, 151)";
}

function signInOpen(){
    document.getElementById("signIn-button").style.display = "none";
    document.getElementById("signUp-button").style.display = "none";
    document.getElementById("main-back").style.display = "none";
    document.getElementById("signIn-gamen").style.display = "flex";
}

function signInClose(){
    document.getElementById("signIn-button").style.display = "flex";
    document.getElementById("signUp-button").style.display = "flex";
    document.getElementById("main-back").style.display = "flex";
    document.getElementById("signIn-gamen").style.display = "none";
}

function signUpOpen(){
    document.getElementById("signIn-button").style.display = "none";
    document.getElementById("signUp-button").style.display = "none";
    document.getElementById("main-back").style.display = "none";
    document.getElementById("signUp-gamen").style.display = "flex";
}

function signUpClose(){
    document.getElementById("signIn-button").style.display = "flex";
    document.getElementById("signUp-button").style.display = "flex";
    document.getElementById("main-back").style.display = "flex";
    document.getElementById("signUp-gamen").style.display = "none";
}

function back(){
    window.location.href = "index.html";
}

function signInCheck(){
    const email = document.getElementById("email").value;
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(email)) {
        alert("メールアドレスの形式が正しくありません。");
        return;
    }
    const password = document.getElementById("password").value;
    const isValid = password.length >= 6 &&
                    /[a-zA-Z]/.test(password) &&
                    /[0-9]/.test(password);
    if (!isValid) {
        alert("パスワードは6文字以上で、英字と数字の両方を含めてください。");
        return;
    }
    signIn(email, password);
}

async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        console.error("ログイン失敗:", error.message);
    } else {
        console.log("ログイン成功:", data);
    }
}

function signUpCheck(){
    const email = document.getElementById("email2").value;
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(email)) {
        alert("メールアドレスの形式が正しくありません。");
        return;
    }
    const password = document.getElementById("password2").value;
    const isValid = password.length >= 6 &&
                    /[a-zA-Z]/.test(password) &&
                    /[0-9]/.test(password);
    if (!isValid) {
        alert("パスワードは6文字以上で、英字と数字の両方を含めてください。");
        return;
    }
    signUp(email, password);
}

async function signUp(email, password) {
const { data, error } = await supabase.auth.signUp({
        email: 'example@example.com',
        password: 'password123'
    });

    if (error) {
        console.error('サインアップ失敗:', error.message);
    } else {
        console.log('確認メールを送信しました');
    }
}