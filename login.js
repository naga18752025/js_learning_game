const supabase = window.supabase.createClient("https://nugptlthxhdsdknzqucc.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51Z3B0bHRoeGhkc2RrbnpxdWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NDc3MzQsImV4cCI6MjA2ODIyMzczNH0.sfSPF7oVLLYh4eWaUSOyR4rWf4oracLr7W-Wqo88XIc");

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