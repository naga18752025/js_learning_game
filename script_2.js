const supabase = window.supabase.createClient("https://nugptlthxhdsdknzqucc.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51Z3B0bHRoeGhkc2RrbnpxdWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NDc3MzQsImV4cCI6MjA2ODIyMzczNH0.sfSPF7oVLLYh4eWaUSOyR4rWf4oracLr7W-Wqo88XIc");

let clickPermission = true;

async function checkLogin() {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
        console.error("セッション取得エラー:", error.message);
        return false;
    }

    const session = data.session;

    if (session) {
        document.getElementById("learning-log").style.display = "flex";
        document.getElementById("no-learning-log").style.display = "none";
        document.getElementById("log-out").style.display = "flex";
        document.getElementById("log-in").style.display = "none";
        return true;
    } else {
        console.log("ログインしていません");
        return false;
    }
}

checkLogin();

function logIn(){
    window.location.href = "login.html";
}

async function logOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error("ログアウト失敗:", error.message);
        alert("ログアウトに失敗しました");
    } else {
        alert("ログアウトしました");
        window.location.reload();
    }
}

function themeColor(){
    localStorage.setItem("theme-color", document.getElementById("color").value);
    window.location.reload();
}

function numberOfQuestions(){
    localStorage.setItem("number-of-questions", document.getElementById("number-of-questions").value);
    window.location.reload();
}

const modal = document.getElementById("mistake-check-modal");

function modalOpen() {
    modal.classList.add('is-active');
}

function modalClose() {
    modal.classList.remove('is-active');
}

function modalOut(e) {
    if (e.target == modal) {
        modal.classList.remove('is-active');
    }
}

addEventListener('click', modalOut);
